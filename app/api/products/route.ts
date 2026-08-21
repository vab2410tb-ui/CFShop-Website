import { NextResponse } from "next/server";
import { getRandomProducts } from "@/lib/db/product";

export async function GET() {
    const randomProducts = await getRandomProducts();

    return NextResponse.json(randomProducts);
}