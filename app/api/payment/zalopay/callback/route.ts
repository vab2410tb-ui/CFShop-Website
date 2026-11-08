import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/services/zalopay";

interface ZaloPayCallbackRequest {
  data: string;
  mac: string;
  type?: number;
}

interface ZaloPayCallbackData {
  app_id: number;
  app_trans_id: string;
  app_time: number;
  app_user: string;
  amount: number;
  embed_data: string;
  item: string;
  zp_trans_id: number;
  server_time: number;
  channel: number;
  merchant_user_id?: string;
  user_fee_amount?: number;
  discount_amount?: number;
}

export async function POST(req: Request) {
  try {
    const body =
      (await req.json()) as ZaloPayCallbackRequest;

    const { data, mac } = body;

    if (!data || !mac) {
      return NextResponse.json(
        {
          return_code: -1,
          return_message: "Missing callback data",
        },
        { status: 400 }
      );
    }

    /**
     * 1. Verify MAC
     */
    const expectedMac = crypto
      .createHmac("sha256", config.key2)
      .update(data)
      .digest("hex");

    if (expectedMac !== mac) {
      console.error("ZaloPay callback MAC mismatch");

      return NextResponse.json({
        return_code: -1,
        return_message: "mac not equal",
      });
    }

    /**
     * 2. Parse callback data
     */
    const callbackData =
      JSON.parse(data) as ZaloPayCallbackData;

    /**
     * 3. Parse embed_data
     */
    const embedData = JSON.parse(
      callbackData.embed_data
    ) as {
      orderId?: string;
      redirecturl?: string;
    };

    const orderId = embedData.orderId;

    if (!orderId) {
      console.error(
        "ZaloPay callback missing orderId",
        callbackData
      );

      return NextResponse.json({
        return_code: 0,
        return_message: "Missing orderId",
      });
    }

    /**
     * 4. Find order
     */
    const order = await prisma.order.findUnique({
      where: {
        orderId,
      },
    });

    if (!order) {
      console.error("Order not found:", orderId);

      return NextResponse.json({
        return_code: 0,
        return_message: "Order not found",
      });
    }

    /**
     * 5. Idempotency
     *
     * ZaloPay may send the callback multiple times.
     * If the order is already PAID, never deduct stock again.
     */
    if (order.paymentStatus === "PAID") {
      return NextResponse.json({
        return_code: 1,
        return_message: "success",
      });
    }

    /**
     * 6. Validate amount
     */
    if (callbackData.amount !== order.totalPrice) {
      console.error("ZaloPay amount mismatch", {
        orderId,
        orderAmount: order.totalPrice,
        callbackAmount: callbackData.amount,
      });

      /**
       * Do not change the status to FAILED here.
       *
       * Keep the status as UNPAID to avoid
       * incorrectly updating the order status.
       */
      return NextResponse.json({
        return_code: -1,
        return_message: "Amount mismatch",
      });
    }

    /**
     * 7. CHECK STOCK
     *
     * Stock is not deducted at this stage.
     *
     * Purpose:
     * Check all products first.
     * If even one product is out of stock, stop immediately.
     */
    for (const item of order.orderItems) {
      if (!item.productId) {
        console.error(
          "Order item missing productId",
          {
            orderId,
            item,
          }
        );

        return NextResponse.json({
          return_code: -1,
          return_message:
            "Order item missing productId",
        });
      }

      const product =
        await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
        });

      if (!product) {
        console.error(
          "Product not found",
          {
            orderId,
            productId: item.productId,
          }
        );

        return NextResponse.json({
          return_code: -1,
          return_message: "Product not found",
        });
      }

      /**
       * Find the variant by color.
       */
      const variantIndex = product.variants.findIndex((variant) => {
        // Products without actual color variants
        if (item.color === "Default") {
          return variant.color === "";
        }

        // Products with color variants
        return variant.color === item.color;
      });

      if (variantIndex === -1) {
        console.error("Product variant not found", {
          orderId,
          productId: item.productId,
          color: item.color,
        });

        return NextResponse.json({
          return_code: 0,
          return_message: "Product variant not found",
        });
      }

      const variant =
        product.variants[variantIndex];

      /**
       * Check available stock.
       */
      if (variant.stock < item.quantity) {
        console.error(
          "Insufficient stock",
          {
            orderId,
            productId: item.productId,
            color: item.color,
            requested: item.quantity,
            available: variant.stock,
          }
        );

        return NextResponse.json({
          return_code: -1,
          return_message:
            "Insufficient stock",
        });
      }
    }

    /**
     * 8. DEDUCT STOCK
     *
     * At this point:
     * - MAC is valid
     * - Order exists
     * - Order is not PAID
     * - Amount is correct
     * - All products have sufficient stock
     *
     * Now it is safe to deduct stock.
     */
    for (const item of order.orderItems) {
      if (!item.productId) {
        continue;
      }

      const product =
        await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
        });

      if (!product) {
        continue;
      }

      const variantIndex = product.variants.findIndex((variant) => {
        if (item.color === "Default") {
          return variant.color === "";
        }

        return variant.color === item.color;
      });

      if (variantIndex === -1) {
        continue;
      }

      const variants = [
        ...product.variants,
      ];

      const currentStock =
        variants[variantIndex].stock;

      variants[variantIndex] = {
        ...variants[variantIndex],
        stock:
          currentStock - item.quantity,
      };

      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          variants,
        },
      });

      console.log(
        `Stock deducted: ${item.productId} / ${item.color} / -${item.quantity}`
      );
    }

    /**
     * 9. Update payment + order status
     */
    await prisma.order.update({
      where: {
        orderId,
      },
      data: {
        paymentStatus: "PAID",

        paymentTransactionId:
          String(callbackData.zp_trans_id),

        status: "PROCESSING",
      },
    });

    console.log(
      `ZaloPay payment successful: ${orderId}`
    );

    console.log(
      `ZaloPay transaction: ${callbackData.zp_trans_id}`
    );

    /**
     * 10. Notify ZaloPay that the callback was processed
     */
    return NextResponse.json({
      return_code: 1,
      return_message: "success",
    });
  } catch (error) {
    console.error(
      "ZaloPay callback error:",
      error
    );

    /**
     * return_code = 0
     *
     * Allow ZaloPay to retry the callback.
     */
    return NextResponse.json({
      return_code: 0,
      return_message:
        "Internal server error",
    });
  }
}