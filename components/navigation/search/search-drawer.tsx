import { X } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

type Product = {
    id: string;
    name: string;
    price: number;
    slug: string;
    mainImage: string;
}

type SearchProps = {
    keyword: string;
    setKeyword: (value: string) => void;
    showProducts: Product[];
    loading: boolean;
    searchOpen: boolean;
    onClose: () => void;
};

export const SearchDrawer = ( {keyword, setKeyword, loading, showProducts, searchOpen, onClose}:SearchProps ) => {

    const linkListSearch="relative inline-block after:absolute after:left-0 after:bottom-[1px] after:h-[2px] after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";
    
    const SearchContent = (
        <>
             <div className="m-[40px] pb-1 relative">
                    <div className="flex ">
                        <input 
                            type="text" 
                            placeholder="Search for" 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value) }
                            className="w-full pb-2 border-b-2 outline-none focus:border-b-black"
                        />
                        <button onClick={onClose} className="hover:cursor-pointer"> <X/> </button>
                    </div>
                
                    {keyword.trim() === "" ? (
                        <div className="mt-[50px] text-[20px] font-bold">
                            <ul className='flex flex-col gap-3'>
                                <li>
                                    <Link href="#" className={linkListSearch}>
                                        <span>Products</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={linkListSearch}>
                                        <span>Warranty</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={linkListSearch}>
                                        <span>Contact</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={linkListSearch}>
                                        <span>News</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={linkListSearch}>
                                        <span>Display</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                    ) : (
                    <div className='w-full'>
                        {loading ? (
                            <div className="mb:mx-10 mt-2 rounded-lg border bg-white shadow-lg z-50">
                                {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3"
                                >
                                    <Skeleton className="h-12 w-12 rounded" />

                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/3" />
                                    </div>
                                </div>
                                ))}
                            </div>
                            ) : ( 
                                showProducts.length > 0 && (
                                    <div className="mb:mx-10 mt-2 rounded-lg border bg-white shadow-lg z-50">
                                        {showProducts.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/products/${item.slug}`}
                                                className="flex items-center gap-3 p-3 hover:bg-gray-100"
                                            >
                                                <Image
                                                    src={item.mainImage}
                                                    alt={item.name}
                                                    width={100}
                                                    height={100}
                                                    className="w-12 h-12 rounded object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p>{item.price.toLocaleString("vi-VN")} đ</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
        </>
    )

    return(
        <>
            <div 
                className={`fixed inset-0 bg-black/50 z-10 ${searchOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}    
            />
            <div
                className={`
                    mb:hidden
                    h-[400px]
                    fixed inset-0
                    z-50
                    bg-white
                    transition-transform
                    duration-500
                    ease-in-out
                    ${searchOpen ? "translate-y-0" : "-translate-y-full"}
                `}
            >
                {SearchContent}
            </div>
            <div className= {`hidden mb:block fixed right-[10px] top-1/2 -translate-y-1/2 max-h-[900px] h-full w-[650px] rounded-[10px] z-50 bg-white transition-transform duration-500 ease-in-out ${searchOpen ? "translate-x-0" : "translate-x-[110%]"} `}>
               {SearchContent}
            </div>
        </>
    )
}