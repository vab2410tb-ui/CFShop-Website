import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/product/add-to-cart-btn";
import { getAllProducts } from "@/lib/db/product";
import { cn, formatText, getProductDefaultConfig } from "@/lib/utils";

interface Props {
  category?: string;
  sort?: "price-asc" | "price-desc" | "default";
}

const ProductList = async ({ sort, category }: Props) => {
  const { products, total } = await getAllProducts({ category, sort });
  
  return (
    <div>
      <p className="block md:hidden text-[14px] pb-[24px] text-center">
        {total} products
      </p>
      <div className="grid grid-cols-2 gap-x-[8px] gap-y-[32px] lg:grid-cols-4 lg:gap-y-[48px] lg:gap-x-[24px]">
        {products.map((product) => {
          const { displayImage, cartItemPayload } = getProductDefaultConfig(product);
            
          return (
            <div key={product.id} className="w-full max-w-[460px] lg:max-w-[245px]">
              <div className="relative w-full aspect-[460/460] lg:aspect-[245/245] overflow-hidden group">
                <Link
                  href={`/products/${product.slug}`}
                  className="overflow-hidden block w-full h-full rounded-[10px]"
                >
                  <Image
                    src={displayImage}
                    alt={product.name}
                    width={245}
                    height={245}
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
                <span className="text-[12px]">
                  {formatText(product.category)}
                </span>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-[16px] text-[#1A1A1A] font-bold"
                >
                  {formatText(product.name)}
                </Link>
                <p>{product.price.toLocaleString("vi-VN")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;