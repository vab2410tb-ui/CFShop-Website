import Image from "next/image";
import Link from "next/link";
import { getRandomProducts } from "@/lib/db/product";
import { getProductDefaultConfig, cn } from "@/lib/utils";
import AddToCartButton from "@/components/product/add-to-cart-btn";

const RecommendedProducts = async () => {
  const products = await getRandomProducts();

  const formatText = (text: string) => {
        return text
            .replace(/_/g, " ")
            .toLocaleLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };
  return (
    <div className="px-[20px] md:px-[max(20px,calc(50%-700px))] pb-[64px]">
        <h2 className="text-2xl lg:text-[40px] font-bold pb-[40px]">Recommended Products</h2>
        <div className="grid grid-cols-2 gap-x-[8px] gap-y-[32px] lg:grid-cols-5 md:gap-x-6 md:gap-y-12">
            {products.map((product) => {
                const { displayImage, cartItemPayload } = getProductDefaultConfig(product);
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
        <div className="pt-10 underline underline-offset-2 [text-decoration-skip-ink:none] text-right">
            <Link href="/collections/all">
                View all products
            </Link>

        </div>
    </div>
  );
};

export default RecommendedProducts
