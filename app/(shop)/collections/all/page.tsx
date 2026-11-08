import Image from "next/image";
import CardProduct from "@/components/product/product-list";
import CategoryProduct from "@/components/product/product-category";
import { Category } from "@prisma/client";
import { SlidersHorizontal } from 'lucide-react';
import FilterProduct from "@/components/product/product-filter";

interface ProductsPageProps {
    searchParams: Promise<{category?: string; sort?: string;}>
    total: number
}

const ProductsPage = async({searchParams, total}: ProductsPageProps) => {
    const { category, sort } = await searchParams;
    const validCategory = category;

    const validSort = sort === "price-asc" || sort === "price-desc" ? sort : undefined;
    
    return(
        <div>
            <div className="relative w-full h-[460px] lg:h-[700px]">
                <Image
                    src="/images/product/all-products-banner.jpg"
                    alt="product-banner"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl w-full text-center lg:text-[48px] font-bold text-white drop-shadow-md">
                        All Products
                    </h1>
                </div>
            </div>

            <div className="flex flex-col gap-[24px] px-[max(20px,calc(50%-700px))] pt-[24px] pb-[64px]">
                <div className="flex justify-between items-center">
                    <div className="hidden md:flex gap-4">
                        <SlidersHorizontal />
                        Filter
                    </div>
                    <FilterProduct sort={validSort}/>
                </div>
                
                {/* Products List */}
                <div className="flex justify-between">
                    <aside className="sticky top-[90px] h-fit self-start">
                        <CategoryProduct selectedCategory={validCategory as Category}/>
                    </aside>
                    <CardProduct sort={validSort} category={validCategory}/>
                </div>
            </div>
        </div>
    )
}               

export default ProductsPage;
