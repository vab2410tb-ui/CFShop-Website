"use client"

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className="bg-white flex justify-between items-center p-4 w-full shadow-sm px-[max(48px,calc(50%-600px))]">
           <Link href="/">
                <div className="relative w-[90px] h-[50px]">
                    <Image
                        src="/images/logo.png"
                        alt="Product"
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>
 
            <div className="flex gap-x-2">
                <Button
                    asChild
                    variant={pathname.startsWith("/orders") ? "default" : "outline"}
                >
                    <Link href="/orders">
                        Orders
                    </Link>
                </Button>

                <Button
                    asChild
                    variant={pathname === "/profile" ? "default" : "outline"}
                >
                    <Link href="/profile">
                        Profile
                    </Link>
                </Button>
            </div>  
          
            <UserButton/>

        </nav>
    );
};
