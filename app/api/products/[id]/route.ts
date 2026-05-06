import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Products from '@/models/products.model';

interface RouteParams {
    params: { id: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
    await dbConnect();
    
    const resolvedParams = await params;

    try {
        const product = await Products.findById(resolvedParams.id);
        
        if (!product) {
            return NextResponse.json({ 
                success: false, 
                message: "Product not found" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            data: product 
        }, { status: 200 });
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error";
        return NextResponse.json({ 
            success: false, 
            message: errorMessage 
        }, { status: 500 });
    }
}