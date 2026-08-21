import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/product/add-to-cart-btn";
import FilterProduct from "@/components/product/product-filter";
import { notFound } from "next/navigation";
import { categories } from "@/constants/product-data";
import { getAllProducts } from "@/lib/db/product";
import { SlidersHorizontal } from 'lucide-react';
import { cn, getProductDefaultConfig } from "@/lib/utils";
interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    sort?: "price-asc" | "price-desc";
  }>;
}

const formatText = (text: string) => {
  if (!text) return "";
  return text
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .toLocaleLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const [{ category }, { sort }] = await Promise.all([params, searchParams]);
  const {products, total} = await getAllProducts({ category, sort });
  const categoryValue = categories.find((item) => item.value === category);

  const validSort = sort === "price-asc" || sort === "price-desc" ? sort : "default";
  
  if (!categoryValue) notFound();

  return (
    <div>
      {/* Header */}
      <div className="relative w-full h-[460px] lg:h-[700px]"> 
        <Image
          src={categoryValue.categoryBanner}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          alt={categoryValue.name}
        />
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl w-full text-center lg:text-[48px] font-bold text-white drop-shadow-md">
          {formatText(category)}
        </h2>
      </div>
      
      <div className="flex flex-col gap-[24px] px-[max(20px,calc(50%-700px))] pt-[24px] pb-[64px]">
        <div className="flex justify-between items-center">
            <div className="hidden md:flex gap-4">
                <SlidersHorizontal />
                <div>
                  <span>Filter</span>
                  <span>
                    <Link href="/">Home</Link>
                    <Link href="/">Collection</Link>
                    <Link href="/"></Link>

                  </span>
                </div>
            </div>
            <FilterProduct sort={validSort}/>
        </div>

        <p className="block md:hidden text-[14px] text-center">{total} products</p>
        
        <div className="grid grid-cols-2 gap-[10px] lg:grid-cols-5 lg:gap-x-[24px] lg:gap-[48px]">
          {products.map((product) => {
            const { displayImage, cartItemPayload } = getProductDefaultConfig(product);
            // Products list 
            return(
              <div key={product.id} className="w-full max-w-[460px] lg:max-w-[260px]">
                  <div className="relative w-full aspect-[460/460]  lg:aspect-[260/260] overflow-hidden group">
                      <Link href={`/products/${product.slug}`} className="overflow-hidden block relative w-full h-full rounded-[10px]">
                          <Image
                              src={displayImage}
                              alt={product.name}
                              width={260}
                              height={260}
                              className="object-contain w-full h-full transition-transform duration-300 hover:scale-110"
                          />
                      </Link>
                      <AddToCartButton
                        showIconOnlyOnMobile={true}
                        showDisabledBadge={true}
                        product={cartItemPayload}
                        className={cn(
                          "absolute bottom-[20px] right-[10px] z-10",
                          "bg-white text-black lg:bg-black lg:text-white rounded-[20px]",
                          "lg:px-3 lg:py-5 lg:left-1/2 lg:-translate-x-1/2",
                          "opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3",
                          "lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                        )}
                      />
                  </div>
                      
                  <div className="flex flex-col pt-[24px] gap-1.5">
                      <span className="text-[12px] text-gray-500">{formatText(product.category)}</span>
                      <Link href={`/products/${product.slug}`} className="text-[16px] text-[#1A1A1A] font-bold">
                          {formatText(product.name)}
                      </Link>
                      <p>{product.price.toLocaleString("vi-VN")}</p>
                  </div>
              </div>
            )
          })}
        </div> 
      </div>
    </div>
  );
};

export default CategoryPage;