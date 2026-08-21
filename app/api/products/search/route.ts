import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
    const s = req.nextUrl.searchParams.get("s") ?? "";
    const products = await prisma.product.findMany({
    where: {
      name: {
        contains: s,
        mode: "insensitive",
      },
    },
    take: 8,
  });

  return NextResponse.json(products);
}
