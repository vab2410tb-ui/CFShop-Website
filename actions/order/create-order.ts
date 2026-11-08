"use server";

import { getAppUrl } from "@/lib/config/app-url";
import { sendTransactionalEmail } from "@/lib/services/mail";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth/auth";
import { CreateOrderSchema } from "@/schemas/order.schema";
import {
  PaymentMethod,
  OrderStatus,
  PaymentStatus,
} from "@prisma/client";

interface CartItemInput {
  productId: string;
  quantity: number;
  color?: string | null;
}

interface ShippingInfo {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  province: string;
  note?: string;
}

interface CreateOrderActionInput {
  shippingInfo: ShippingInfo;
  orderItems: CartItemInput[];
  paymentMethod: PaymentMethod;
}

// 2. Internal interfaces
interface FinalOrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  color: string | null;
}

interface VariantItem {
  color: string | null;
  colorCode: string | null;
  stock: number;
  images: string[];
}

// Interface for email data
interface OrderEmailData {
  orderId: string;
  paymentMethod: string;
  totalPrice: number;
}

export const createOrder = async (data: CreateOrderActionInput) => {
  try {
    // Validate input data
    const result = CreateOrderSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: "Invalid order data",
        errors: result.error.flatten(),
      };
    }

    const { orderItems, shippingInfo, paymentMethod } = result.data;

    const user = await currentUser();

    // Only COD orders should decrease stock immediately.
    // Online payments will decrease stock after successful payment confirmation.
    const shouldDecreaseStock = paymentMethod === PaymentMethod.COD;

    // Use Prisma transaction to create the order.
    const orderData = await prisma.$transaction(async (tx) => {
      let totalPrice = 0;

      const finalOrderItems: FinalOrderItem[] = [];

      // Check every product and calculate the order total.
      for (const item of orderItems) {
        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new Error("Product does not exist");
        }

        if (!product.inStock) {
          throw new Error(
            `${product.name} is currently unavailable or out of stock`,
          );
        }

        const currentVariants: VariantItem[] =
          product.variants as VariantItem[];

        // Normalize the color value.
        // "Default" is treated as an empty color.
        const cartColor =
          item.color === "Default" ? "" : (item.color ?? "");

        // Find the corresponding product variant.
        const variantIndex = currentVariants.findIndex(
          (variant) => (variant.color ?? "") === cartColor,
        );

        if (variantIndex === -1) {
          throw new Error(
            `Variant of ${product.name} does not exist`,
          );
        }

        const variant = currentVariants[variantIndex];

        // Always check stock before creating the order.
        if (variant.stock < item.quantity) {
          throw new Error(
            `${product.name} only has ${variant.stock} item(s) available`,
          );
        }

        // Decrease stock immediately only for COD.
        //
        // For ZaloPay/VNPay:
        // The stock will be decreased after the payment gateway
        // confirms the payment successfully.
        if (shouldDecreaseStock) {
          currentVariants[variantIndex] = {
            ...variant,
            stock: variant.stock - item.quantity,
          };

          const totalStock = currentVariants.reduce(
            (total, currentVariant) =>
              total + currentVariant.stock,
            0,
          );

          await tx.product.update({
            where: {
              id: product.id,
            },
            data: {
              variants: currentVariants,
              inStock: totalStock > 0,
            },
          });
        }

        // Calculate total price using the database price.
        totalPrice += product.price * item.quantity;

        // Save a snapshot of the product information inside the order.
        finalOrderItems.push({
          productId: product.id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          image: product.mainImage || "",
          color: item.color || null,
        });
      }

      // Generate unique order ID.
      const orderId = `NAB-${Date.now()}`;

      // Create the order.
      const newOrder = await tx.order.create({
        data: {
          orderId,

          userId: user?.id ?? null,

          shippingInfo: {
            fullName: shippingInfo.fullName,
            email: shippingInfo.email,
            phone: shippingInfo.phone,
            address: shippingInfo.address,
            ward: shippingInfo.ward,
            province: shippingInfo.province,
            note: shippingInfo.note || "",
          },

          orderItems: finalOrderItems,

          paymentMethod,

          totalPrice,

          status: OrderStatus.PENDING,

          paymentStatus: PaymentStatus.UNPAID,
        },
      });

      return newOrder;
    });

    // Send confirmation email after the transaction is committed.
    try {
      await sendTransactionalEmail({
        to: shippingInfo.email,
        subject: `[${orderData.orderId}] Thank you for your order!`,
        html: generateEmailTemplate(
          {
            orderId: orderData.orderId,
            paymentMethod: orderData.paymentMethod,
            totalPrice: orderData.totalPrice,
          },
          shippingInfo,
        ),
      });
    } catch (emailError) {
      // Email failure should not make the order fail.
      console.error(
        "Failed to send order confirmation email:",
        emailError,
      );
    }

    return {
      success: true,
      message: "Order created successfully",

      data: {
        orderId: orderData.orderId,
        totalPrice: orderData.totalPrice,
      },
    };
  } catch (error: unknown) {
    console.error("Failed to create order:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "An error occurred while processing the order",
    };
  }
};

const generateEmailTemplate = ( 
  orderData: OrderEmailData,
  shippingInfo: ShippingInfo,
): string =>{
  return `
    <div style="max-width:480px;margin:0 auto;padding:20px;border:1px solid #eaeaea;border-radius:8px;font-family:Arial,sans-serif;text-align:left">
      <h2 style="margin:0;text-align:center;font-size:24px;font-weight:600;color:#111">
        Thank you for shopping with us!
      </h2>
      <div style="margin:40px 0;text-align:center">
        <img src="${getAppUrl()}/images/linea-mini-new-color-all-desktop.png" alt="Linea Mini" width="480" style="display:block;width:100%;max-width:480px;height:auto;object-fit:contain">
      </div>
      <p style="margin:8px 0;font-size:16px;line-height:1.6">
        Nothing makes us happier than seeing you support NAB Coffee not just once, your trust means so much to us and inspires us to keep doing what we love.
      </p>
      <div style="margin:20px 0;padding:15px;border-radius:6px;background:#f9fafb;font-size:14px">
        <p style="margin:5px 0"><strong>Order ID:</strong> ${orderData.orderId}</p>
        <p style="margin:5px 0"><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
        <p style="margin:5px 0"><strong>Total Amount:</strong> ${orderData.totalPrice.toLocaleString("VN")} đ</p>
      </div>
      <h3 style="margin:0;font-size:18px;font-weight:600;color:#374151">Shipping Information:</h3>
      <div style="margin-top:8px;font-size:14px;line-height:1.6">
        <p style="margin:4px 0"><strong>Full Name:</strong> ${shippingInfo.fullName}</p>
        <p style="margin:4px 0"><strong>Phone Number:</strong> ${shippingInfo.phone}</p>
        <p style="margin:4px 0"><strong>Address:</strong> ${shippingInfo.address}, ${shippingInfo.ward}, ${shippingInfo.province}</p>
      </div>
      <p style="margin-top:30px;font-size:14px;color:#6b7280;line-height:1.5">
        We will contact you as soon as possible to confirm your delivery.
      </p>
    </div>
  `;
}
