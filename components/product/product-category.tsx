import Image from "next/image";
import Link from "next/link";
import { categories } from "@/constants/product-data"
import { Category } from "@/generated/prisma/enums";


interface Props {
  selectedCategory?: Category;
}

const ProductCategory = ( {selectedCategory}:Props) => {
     
    return (
        <div className="hidden lg:block border-t-[1px] pr-10">
            <div className="text-16px font-bold py-[20px]">
                <span>Category:</span>
            </div>
            <div className="grid grid-cols-2 gap-5">
                {categories.map((category) => {
                    const isActive = selectedCategory === category.value;

                    return (
                        <Link
                            href={`/collections/all?category=${category.value}`}
                            key={category.value}
                            scroll={false}
                            className="flex flex-col items-center"
                        >
                            <div 
                                className={`
                                    border-[1px] rounded-[10px] p-5 w-full  max-w-[85px]
                                    ${isActive? "border-black border-[2px]" : "border-gray-200 hover:border-gray-400"}
                                `}>
                                <div className="items-center aspect-[85/85]">
                                    <Image
                                        src={category.imageIcon}
                                        alt={category.name}
                                        width={85}
                                        height={85}
                                        className="object-contain"
                                    />  
                                </div>
                            </div>
                            <span className="text-[14px] wrap w-fit">{category.name}</span>
                        </Link>

                    )
                })}
            </div>
        </div>
    );
}

export default ProductCategory;