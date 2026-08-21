"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { CartItem } from "@/types/cart";
import { Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  product: CartItem;
  className?: string; 
  showIconOnlyOnMobile?: boolean; 
  disabled?: boolean;
  showDisabledBadge?: boolean;
};

export default function AddToCartButton({ 
  product, 
  className, 
  showIconOnlyOnMobile = false,
  disabled = false,
  showDisabledBadge = false
}: Props) {
  const addItem = useCartStore((state) => state.incrementItem);
  const cartItems = useCartStore((state) => state.items); 
  const [loading, setLoading] = useState(false);

  const itemInCart = cartItems.find(
    (item) => item.id === product.id && item.color === product.color
  );
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;
  
  const isOutOfStock = product.stock === 0;
  const isMaxInCart = quantityInCart >= product.stock && product.stock > 0;
  const shouldDisable = isOutOfStock || isMaxInCart || disabled;

  let buttonText = "Add to cart";
  if (isOutOfStock) {
    buttonText = "Sold out";
  } else if (isMaxInCart) {
    buttonText = "Max in cart";
  }

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const status = addItem(product);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (status === "max_stock") {
        toast.error("Maximum available stock reached!");
      } else {
        toast.success("Added to cart!");
      }
    } finally {
      setLoading(false);
    }
  };
 if (shouldDisable && !loading && showDisabledBadge) {
  return (
    <div
      className={cn(
        "absolute left-3 top-3 z-20",
        "inline-flex items-center justify-center",
        "w-fit rounded-full",
        "bg-black/70 px-2.5 py-1",
        "text-[11px] font-semibold text-white",
        "border border-white/20",
        "backdrop-blur-md shadow-sm",
        "pointer-events-none select-none"
      )}
    >
      {buttonText}
    </div>
  );
}
return (
  <Button
    disabled={loading || shouldDisable}
    onClick={handleAddToCart}
    className={cn(
      "rounded-[20px] bg-black text-white",
      "transition-all duration-300 ease-out",
      "hover:bg-[#3d3d3d]",
      className,
      loading &&
        "cursor-wait !bg-black !text-white hover:!bg-black"
    )}
  >
    {loading ? (
      <Loader2 className="h-5 w-5 animate-spin text-white md:h-4 md:w-4" />
    ) : (
      <>
        {showIconOnlyOnMobile && (
          <Plus className="block h-5 w-5 lg:hidden" />
        )}

        <span
          className={cn(
            "text-[15px]",
            showIconOnlyOnMobile
              ? "hidden lg:inline"
              : ""
          )}
        >
          {buttonText}
        </span>
      </>
    )}
  </Button>
);
}

