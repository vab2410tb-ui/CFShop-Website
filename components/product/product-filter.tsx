"use client";

import { useCallback, useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; // Import Button từ Shadcn UI
import { ChevronDown, Loader2, SlidersHorizontal, X } from "lucide-react";

type SortValue = "price-asc" | "price-desc" | "default";

interface SearchFiltersProps {
  sort?: SortValue;
}

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "default", label: "Sort by: Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ProductFilter = ({ sort = "default" }: SearchFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams?.get("category") || "";
  const isAllProductsPage = pathname === "/collections/all";

  // logic for desktop
  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === sort)?.label || "Sort by: Newest";

  const handleDesktopSortChange = useCallback(
    (value: SortValue) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (value === "default") params.delete("sort");
      else params.set("sort", value);

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams, pathname]
  );

  // logic for mobile
  const [isOpen, setIsOpen] = useState(false);
  const [tempCategory, setTempCategory] = useState<string>(currentCategory);
  const [tempSort, setTempSort] = useState<SortValue>(sort);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpenMobileMenu = () => {
    setTempCategory(searchParams?.get("category") || "");
    setTempSort(sort);
    setIsOpen(true);
  };

  const handleMobileApply = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");

    if (tempCategory) params.set("category", tempCategory);
    else params.delete("category");

    if (tempSort === "default") params.delete("sort");
    else params.set("sort", tempSort);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
    setIsOpen(false);
  }, [tempCategory, tempSort, router, searchParams, pathname]);

  return (
    <div className="w-full">

      {/* Responsive: DESKTOP */}
      <div className="hidden md:flex justify-end items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              disabled={isPending}
              className="flex items-center gap-2"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {currentSortLabel}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[190px] border-0 bg-white p-1 shadow-md"
          >
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleDesktopSortChange(option.value)}
                className="cursor-pointer rounded-md outline-none focus:bg-slate-100"
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Responsive: Mobile */}
      <div className="sm:hidden flex w-full">
        <Button
          variant="outline"
          onClick={handleOpenMobileMenu}
          disabled={isPending}
          className="w-full justify-center gap-2"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
          Filter & Sort
        </Button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 animate-in fade-in "
              onClick={() => setIsOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
            />
            <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white mx-[5px] rounded-[10px] max-h-[85vh] animate-in slide-in-from-bottom-1/2 duration-300">
              <div className="flex items-center justify-between border-b p-4 shrink-0">
                <h2 className="text-lg font-semibold">Filter & Sort</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4 flex-1 flex flex-col gap-6 overflow-y-auto">
                {isAllProductsPage && (
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-slate-500 uppercase">
                      Categories
                    </h3>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={
                          tempCategory === "espresso-machine"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setTempCategory(
                            tempCategory === "espresso-machine"
                              ? ""
                              : "espresso-machine"
                          )
                        }
                        className="w-full justify-start py-6 text-sm"
                      >
                        Espresso Machine
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="mb-3 text-sm font-medium text-slate-500 uppercase">
                    Sort By
                  </h3>
                  <div className="flex flex-col gap-2">
                    {SORT_OPTIONS.map((option) => (
                      <Button
                        key={option.value}
                        variant={
                          tempSort === option.value ? "default" : "outline"
                        }
                        onClick={() => setTempSort(option.value)}
                        className="w-full justify-start py-6 text-sm"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-t p-4 flex gap-3 bg-white shrink-0 pb-safe">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTempCategory("");
                    setTempSort("default");
                  }}
                  className="flex-1 py-6"
                >
                  Clear
                </Button>
                <Button
                  onClick={handleMobileApply}
                  className="flex-1 py-6"
                >
                  Apply
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductFilter;