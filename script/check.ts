import { prisma } from "@/lib/prisma";
import {
  PaymentStatus,
} from "@/generated/prisma/enums";

interface OrderItem {
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

const ORDER_ID = "ORD-NAB-1790932505911";

const testOnlinePayment = async () => {
  console.log("\n========================================");
  console.log("      TEST ONLINE PAYMENT");
  console.log("========================================\n");

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Find order
      const order = await tx.order.findUnique({
        where: {
          orderId: ORDER_ID,
        },
      });

      if (!order) {
        throw new Error(`Order ${ORDER_ID} does not exist`);
      }

      console.log("Order:", order.orderId);
      console.log("Payment method:", order.paymentMethod);
      console.log("Payment status:", order.paymentStatus);
      console.log("Total price:", order.totalPrice);

      // 2. Idempotency check
      if (order.paymentStatus === PaymentStatus.PAID) {
        console.log("\nPayment has already been completed.");
        console.log("Stock will NOT be decreased again.");

        return;
      }

      const orderItems = order.orderItems as OrderItem[];

      // 3. Process every order item
      for (const item of orderItems) {
        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new Error(
            `Product ${item.productId} does not exist`,
          );
        }

        const variants: VariantItem[] =
          product.variants as VariantItem[];

        // Normalize "Default" to ""
        const orderColor =
          item.color === "Default"
            ? ""
            : (item.color ?? "");

        // Find variant
        const variantIndex = variants.findIndex(
          (variant) =>
            (variant.color ?? "") === orderColor,
        );

        if (variantIndex === -1) {
          throw new Error(
            `Variant "${orderColor}" does not exist for ${product.name}`,
          );
        }

        const variant = variants[variantIndex];

        console.log("\n----------------------------------------");
        console.log("Product:", product.name);
        console.log("Color:", orderColor || "Default");
        console.log("Stock before:", variant.stock);
        console.log("Quantity:", item.quantity);

        // 4. Check stock
        if (variant.stock < item.quantity) {
          throw new Error(
            `${product.name} only has ${variant.stock} item(s) available`,
          );
        }

        // 5. Decrease stock
        variants[variantIndex] = {
          ...variant,
          stock: variant.stock - item.quantity,
        };

        // 6. Calculate total stock
        const totalStock = variants.reduce(
          (total, currentVariant) =>
            total + currentVariant.stock,
          0,
        );

        // 7. Update product
        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            variants,
            inStock: totalStock > 0,
          },
        });

        console.log("Stock after:", variants[variantIndex].stock);
        console.log("Total product stock:", totalStock);
      }

      // 8. Mark payment as PAID
      await tx.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentStatus: PaymentStatus.PAID,
        },
      });

      console.log("\nPayment status: UNPAID → PAID");
    });

    console.log("\n========================================");
    console.log("       PAYMENT TEST SUCCESS");
    console.log("========================================\n");
  } catch (error) {
    console.error("\n========================================");
    console.error("        PAYMENT TEST FAILED");
    console.error("========================================\n");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  } finally {
    await prisma.$disconnect();
  }
};

testOnlinePayment();