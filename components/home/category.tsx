import Image from "next/image";
import Link from "next/link";
import { CircleArrowRight } from 'lucide-react';
import { categories } from "@/constants/product-data";

const Category = () => {
    return(
        <div className="px-5 py-[50px] lg:py-16 lg:px-[max(20px,calc(50%-700px))] ">
            <div>
                <h3 className="mb-5 text-[14px] md:text-[16px]">
                    Discover Our Collection
                </h3>

                <h1 className="text-[24px] font-bold md:text-[32px] lg:text-[40px]">
                    Product categories
                </h1>
            </div>
            <div className="flex gap-[25px] overflow-x-auto pb-4 lg:mt-16 xl:overflow-visible justify-between">
                {categories.map((category) => (
                    <Link 
                        key={category.value}
                        href={`/collections/${category.value}`}   
                    >
                        <div className="group relative w-[260px] lg:w-full lg:max-w-[330px] overflow-hidden rounded-[20px] cursor-pointer">
                            <Image
                                src={category.categoryImage}
                                alt={category.name}
                                width={330}
                                height={500}
                                className="w-full h-auto object-contain"
                            />
                            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[#333333]">
                                <h2 className="text-[16px] font-bold">{category.name}</h2>
                                <CircleArrowRight className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Category