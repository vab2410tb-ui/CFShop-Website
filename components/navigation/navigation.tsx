"use client"

import Image from "next/image";
import Link from "next/link";
import SearchButton from "@/components/navigation/search-button"
import UserButton from "@/components/navigation/user-button";
import CartButton from "@/components/navigation/cart-button";
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from "react";
import { SearchDrawer } from "./search/search-drawer";
import { CartDrawer } from "./cart/cart-drawer";
import { HamberButton } from "./hamber-button";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/lib/api/product";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname } from 'next/navigation';

const Navigation = () => {
    const navLinkClass="relative inline-block after:absolute after:left-0 after:bottom-[1px] after:h-[1px] after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";
   
    const pathname = usePathname();
    const [keyword, setKeyword] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [drawer, setDrawer] = useState<"search" | "cart" | null>(null);
   
    const debouncedKeyword = useDebounce(keyword, 300);

    const openSearch = () => setDrawer("search");
    const openCart = () => setDrawer("cart");
    const closeDrawer = () => {
        setDrawer(null);
        setKeyword("");
    };

    useEffect(() => {
        document.body.style.overflow = drawer ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [drawer]);
    
    const {data: products = [], isLoading, } = 
        useQuery({
            queryKey: ["search-products", debouncedKeyword],
            queryFn: () => searchProducts(debouncedKeyword),
            enabled: debouncedKeyword.trim().length > 0,
            staleTime: 1000 * 60 * 5,
        }); 
    
    const showProducts = keyword.trim() ? products : [];

    if (pathname.startsWith("/checkout")) {
        return null;
    }    

    return(
        <>
            <header className="fixed z-10 w-full bg-white/50 backdrop-blur-xl shadow-lg h-[90px] py-[24px] px-[max(48px,calc(50%-700px))]">
                <div
                    className="
                        flex justify-between items-center
                        lg:grid
                        lg:grid-cols-[auto_1fr_max-content]
                        lg:items-center
                        lg:gap-x-14
                        "
                >
                    <div className="block lg:hidden">
                        <HamberButton mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>
                    </div>

                    <div className="hidden lg:flex w-[70px] h-12 items-center">     
                        <div className="hidden lg:block">
                            <HamberButton mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>
                        </div>

                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={80}
                                height={60}
                                className="h-full w-full object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    <nav className="hidden lg:block">
                        <ul className="flex items-center gap-[50px] font-bold">
                            <li className="relative group">
                                <span className="inline-flex items-center gap-1 cursor-pointer">
                                    <Link href="/collections/all">Products</Link>
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180"/>
                                </span>
                                <div className="absolute left-0 top-full h-3 w-full"/>
                                <ul className="absolute p-[20px] left-[-20px] bg-white shadow-sm bg-background/80 mt-3 top-full w-max border-[1px] rounded-[20px] invisible opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                                    <li className="px-3 py-[5px]">
                                        <Link href="/collections/espresso-machine" className={navLinkClass}>Espresso machine</Link>
                                    </li>
                                    <li className="px-3 py-[5px]">
                                        <Link href="/collections/grinder-machine" className={navLinkClass}>Grinder machine</Link>
                                    </li>
                                    <li className="px-3 py-[5px]">
                                        <Link href="/collections/coffee-beans" className={navLinkClass}>Coffee beans</Link>
                                    </li>
                                    <li className="px-3 py-[5px]">
                                        <Link href="/collections/accessories" className={navLinkClass}>Accessories</Link>
                                    </li>
                                </ul>
                            </li>
                            <li><Link href="/warranty" className={navLinkClass}>Warranty</Link></li>
                            <li><Link href="/contact" className={navLinkClass}>Contact</Link></li>
                            <li><Link href="/blog" className={navLinkClass}>Blogs</Link></li>
                        </ul>
                    </nav>

                    <div className="block lg:hidden w-[60px]">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={70}
                                height={50}
                                className="h-full w-full object-contain"
                                priority
                            />
                        </Link>
                    </div>
                    
                    <div className="flex gap-2 lg:gap-[40px] items-center ">
                        <SearchButton setSearchOpen={openSearch}/>
                        <UserButton/>
                        <CartButton setCartOpen={openCart}/>
                    </div>
                </div>
            </header>

            <SearchDrawer
                keyword={keyword}
                setKeyword={setKeyword}
                showProducts={showProducts}
                loading={isLoading}
                searchOpen={drawer === "search"}
                onClose={closeDrawer}
            />

            <CartDrawer
                cartOpen={drawer === "cart"}
                onClose={closeDrawer}
            />
        </>
        
    );
}

export default Navigation;