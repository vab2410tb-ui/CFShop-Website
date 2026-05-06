import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Products from '@/models/products.model';

interface RouteParams {
    params: { categoryName: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    await dbConnect();
    const resolvedParams = await params;
    
    try {
        const categoryName = resolvedParams.categoryName;
        console.log("Category received:", `"${categoryName}"`);
        
        const sort = request.nextUrl.searchParams.get('sort');  

        const filter = { category: categoryName };

        let sortCondition: Record<string, 1 | -1>;
        
        if (sort === 'price_asc') {
            sortCondition = { price: 1 };
        } else if (sort === 'price_desc') {
            sortCondition = { price: -1 };
        } else if (sort === 'name_asc') {
            sortCondition = { name: 1 };
        } else if (sort === 'name_desc') {
            sortCondition = { name: -1 };
        } else {
            sortCondition = { createdAt: -1 };
        }

        const products = await Products.find(filter).sort(sortCondition);

        return NextResponse.json({
            success: true,
            count: products.length,
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