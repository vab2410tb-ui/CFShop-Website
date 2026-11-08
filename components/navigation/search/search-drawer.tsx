import { X, Search } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

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

export const SearchDrawer = ({
    keyword,
    setKeyword,
    loading,
    showProducts,
    searchOpen,
    onClose
}: SearchProps) => {
    const linkListSearch = "relative inline-block after:absolute after:left-0 after:bottom-[1px] after:h-[2px] after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";

    useEffect(() => {
        if (!searchOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [searchOpen]);

    return (
        <>
            {/* OVERLAY */}
            <div
                aria-hidden={!searchOpen}
                onClick={onClose}
                className={`
                    fixed inset-0 z-40
                    bg-black/50
                    transition-opacity duration-300
                    ${searchOpen ? "visible opacity-100" : "invisible opacity-0"}
                `}
            />

            {/* DRAWER*/}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Search"
                className={`
                    fixed z-50
                    flex flex-col
                    overflow-hidden
                    bg-white

                    /* Mobile */
                    inset-0
                    h-[100dvh] /* Ép chiều cao tuyệt đối trên Mobile */
                    rounded-none
                    transition-transform duration-300 ease-out

                    ${searchOpen ? "translate-y-0" : "-translate-y-full"}

                    /* Desktop */
                    mb:left-auto
                    mb:right-[10px]
                    mb:top-[10px]
                    mb:bottom-[10px]
                    mb:w-[650px]
                    mb:h-[calc(100vh-20px)] /* Ép chiều cao trên Desktop bằng đúng màn hình trừ đi 20px viền */
                    mb:rounded-xl
                    mb:shadow-2xl
                    mb:translate-y-0

                    ${searchOpen ? "mb:translate-x-0" : "mb:translate-x-[110%]"}
                `}
            >
                {/* HEADER (Search Input) */}
                <header className="flex shrink-0 items-center justify-between border-b px-5 py-4 mb:px-6">
                    <div className="flex flex-1 items-center gap-3 pr-4">
                        <Search className="h-5 w-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search for..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full bg-transparent text-base outline-none placeholder:text-neutral-400"
                        />
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close search"
                        className="rounded-full shrink-0"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </header>

                {/* BODY (Search Results) */}
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 mb:px-6">
                    {keyword.trim() === "" ? (
                        <div className="mt-4 text-[20px] font-bold">
                            <ul className='flex flex-col gap-5'>
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
                        <div className="flex flex-col gap-4">
                            {loading ? (
                                // Loading Skeletons
                                Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 pb-4 border-b last:border-0"
                                    >
                                        <Skeleton className="h-16 w-16 rounded-xl" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-4 w-1/3" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Product Results
                                showProducts.length > 0 ? (
                                    showProducts.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/products/${item.slug}`}
                                            onClick={onClose}
                                            className="flex items-center gap-4 border-b pb-4 last:border-0 hover:bg-neutral-50 transition-colors rounded-lg p-2 -mx-2"
                                        >
                                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                                                <Image
                                                    src={item.mainImage}
                                                    alt={item.name}
                                                    fill
                                                    sizes="64px"
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <p className="text-sm font-medium text-neutral-900 line-clamp-2">
                                                    {item.name}
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-neutral-700">
                                                    {item.price.toLocaleString("vi-VN")} đ
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="mt-10 text-center text-neutral-500">
                                        No products found for &quot;{keyword}&quot;
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}