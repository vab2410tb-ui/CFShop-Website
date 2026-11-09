import { NextResponse } from "next/server";
import { config, createMac } from "@/lib/services/zalopay";
import { getAppUrl } from "@/lib/config/app-url";
import {
  ZaloPayOrderPayload,
  ZaloPayCreateResponse,
} from "@/types/payment";
import { prisma } from "@/lib/prisma";

interface RequestBody {
  orderId: string;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { orderId } = body;

    // 1. Validate orderId
    if (!orderId) {
      return NextResponse.json(
        {
          error: "Missing orderId",
        },
        { status: 400 },
      );
    }

    // 2. Retrieve the order from the database
    const orderFromDb = await prisma.order.findUnique({
      where: {
        orderId,
      },
    });

    if (!orderFromDb) {
      return NextResponse.json(
        {
          error: "Order not found",
        },
        { status: 404 },
      );
    }

    // 3. Validate payment method
    if (orderFromDb.paymentMethod !== "ZALOPAY") {
      return NextResponse.json(
        {
          error: "This order does not use ZaloPay",
        },
        { status: 400 },
      );
    }

    // 4. Prevent duplicate payments for PAID orders
    if (orderFromDb.paymentStatus === "PAID") {
      return NextResponse.json(
        {
          error: "This order has already been paid",
        },
        { status: 400 },
      );
    }

    // 5. Get the amount from the database
    // Never trust the amount sent from the frontend
    const amount = Math.round(orderFromDb.totalPrice);

    if (amount <= 0) {
      return NextResponse.json(
        {
          error: "Invalid order amount",
        },
        { status: 400 },
      );
    }

    // 6. Determine the redirect URL
    let appUrl: string;
    try {
      appUrl = getAppUrl();
    } catch {
      console.error(
        "APP_URL is not configured",
      );

      return NextResponse.json(
        {
          error: "APP_URL is not configured",
        },
        { status: 500 },
      );
    }

    const callbackUrl =
      `${appUrl}/api/payment/zalopay/callback`;

    // 7. Embed payment data
    const embed_data = {
      preferred_payment_method: [],
      redirecturl:
        `${appUrl}/checkout/success?orderId=${encodeURIComponent(
          orderId,
        )}`,
      orderId,
    };

    // 8. Generate a unique app_trans_id
    const cleanOrderId = orderId
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(-10);

    const uniqueSuffix = Date.now()
      .toString()
      .slice(-4);

    // ZaloPay requires the transaction ID date prefix to use Vietnam time
    // (GMT+7); Vercel's server timezone is typically UTC.
    const vietnamDatePrefix = new Date(Date.now() + 7 * 60 * 60 * 1000)
      .toISOString()
      .slice(2, 10)
      .replaceAll("-", "");

    const app_trans_id =
      `${vietnamDatePrefix}_${cleanOrderId}${uniqueSuffix}`;

    // 9. Create the ZaloPay order payload
    const order: ZaloPayOrderPayload = {
      app_id: Number(config.app_id),
      app_trans_id,
      app_user: "nab_coffee_user",
      app_time: Date.now(),
      expire_duration_seconds: 1800,
      // ZaloPay expects a valid JSON array string; use [] when no line items
      // are being passed to the gateway.
      item: JSON.stringify([]),
      embed_data: JSON.stringify(embed_data),
      amount,
      description:
        `Payment for order ${cleanOrderId}`,
      bank_code: "",
      mac: "",
      callback_url: callbackUrl,
    };

    // 10. Generate MAC using KEY1
    const dataForMac =
      `${order.app_id}|` +
      `${order.app_trans_id}|` +
      `${order.app_user}|` +
      `${order.amount}|` +
      `${order.app_time}|` +
      `${order.embed_data}|` +
      `${order.item}`;

    order.mac = createMac(
      dataForMac,
      config.key1,
    );

    // 11. Create URL-encoded form data
    const formParams = new URLSearchParams();

    Object.entries(order).forEach(
      ([key, val]) => {
        formParams.append(key, String(val));
      },
    );

    // 12. Send payment request to ZaloPay
    const response = await fetch(
      config.endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: formParams.toString(),
      },
    );

    const result: ZaloPayCreateResponse =
      await response.json();

    // 13. Handle successful payment order creation
    if (
      result.return_code === 1 &&
      result.order_url
    ) {
      return NextResponse.json({
        url: result.order_url,
      });
    }

    // 14. Handle ZaloPay API errors
    console.error(
      "ZaloPay Error Response:",
      result,
    );

    return NextResponse.json(
      {
        error:
          result.return_message ||
          result.sub_return_message ||
          "Failed to create ZaloPay payment",
      },
      { status: 400 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Internal Server Error";

    console.error(
      "Internal Server Error:",
      error,
    );

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
