import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Products from '../../../models/products.model';

export async function GET() {
    await dbConnect(); 
    
    try {
        const products = await Products.find({});
        return NextResponse.json({
            success: true,
            data: products
        }, { status: 200 });
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error";
        return NextResponse.json({ 
            success: false, 
            message: errorMessage 
        }, { status: 500 });
    }
}