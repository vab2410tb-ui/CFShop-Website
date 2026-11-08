"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

type HamberButtonProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
};

export const HamberButton = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: HamberButtonProps) => {
  const [productsOpen, setProductsOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
  };

  return (
    <div>
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden -ml-2 rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100">
            <Menu size={24} />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[300px] overflow-y-auto px-6 pt-10 pb-6 text-[22px] sm:w-[350px]"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>

          <ul className="flex flex-col gap-4 font-bold">
            {/* PRODUCTS */}
            <li>
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className="flex w-full items-center gap-2"
              >
                <span>Products</span>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* SUBMENU */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  productsOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="mt-4 flex flex-col gap-4">
                    <li>
                      <Link
                        href="/collections/espresso-machine"
                        onClick={closeMenu}
                        className="block pl-4 font-medium text-gray-500 transition-colors hover:text-black"
                      >
                        Espresso machine
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/collections/grinder-machine"
                        onClick={closeMenu}
                        className="block pl-4 font-medium text-gray-500 transition-colors hover:text-black"
                      >
                        Grinder machine
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/collections/coffee-beans"
                        onClick={closeMenu}
                        className="block pl-4 font-medium text-gray-500 transition-colors hover:text-black"
                      >
                        Coffee Beans
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/collections/accessories"
                        onClick={closeMenu}
                        className="block pl-4 font-medium text-gray-500 transition-colors hover:text-black"
                      >
                        Accessories
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* OTHER MENU */}
            <li className="mt-2">
              <Link href="/warranty" onClick={closeMenu}>
                Warranty
              </Link>
            </li>

            <li>
              <Link href="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>

            <li>
              <Link href="/blog" onClick={closeMenu}>
                Blog
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};