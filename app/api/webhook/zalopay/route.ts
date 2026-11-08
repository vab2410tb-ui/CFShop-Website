import { NextResponse } from "next/server";
import { config, createMac } from "@/lib/services/zalopay";
import {
  ZaloPayCallbackRequestBody,
  ZaloPayCallbackData,
  ZaloPayCallbackResponse,
} from "@/types/payment";

export async function POST(
  req: Request
): Promise<NextResponse<ZaloPayCallbackResponse>> {
  try {
    const body = (await req.json()) as Partial<ZaloPayCallbackRequestBody>;
    const { data: dataStr, mac: reqMac } = body;

    if (!dataStr || !reqMac) {
      return NextResponse.json(
        { return_code: -1, return_message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify the data signature using key2
    const generatedMac = createMac(dataStr, config.key2);

    if (reqMac !== generatedMac) {
      return NextResponse.json(
        { return_code: -1, return_message: "mac not equal" },
        { status: 400 }
      );
    }

    // Parse callback data
    const dataJson: ZaloPayCallbackData = JSON.parse(dataStr);
    const { app_trans_id, amount, zp_trans_id } = dataJson;

    // TODO: Update the order status in the database (Prisma/Mongoose/...)
    // await prisma.order.update({
    //   where: { id: app_trans_id },
    //   data: { status: "PAID", paymentGatewayId: String(zp_trans_id) }
    // });

    return NextResponse.json({
      return_code: 1,
      return_message: "success",
    });
  } catch (error: unknown) {
    const errorMsg =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("ZaloPay Callback Error:", errorMsg);

    return NextResponse.json(
      { return_code: 0, return_message: "Internal Server Error" },
      { status: 500 }
    );
  }
}