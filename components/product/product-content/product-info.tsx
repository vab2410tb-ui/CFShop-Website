"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Plus, Minus, } from "lucide-react";
import { cn, formatText } from "@/lib/utils";
import { Variant, Product } from "@prisma/client";
import { useCartStore } from "@/stores/cart-store";
import AddToCartButton from "@/components/product/add-to-cart-btn";
import ProductFeature from "./product-feature";

interface ProductInfoProps {
  variants: Variant[];
  selectedVariantIndex: number;
  onSelectVariant: (index: number) => void;
  product: Product;
}

const ProductInfo = ({
  product,
  variants,
  selectedVariantIndex,
  onSelectVariant,
}: ProductInfoProps) => {
  
  const [openFeature, setOpenFeature] = useState<string | null>(null);
  const currentVariant = variants[selectedVariantIndex];
  const currentColor = currentVariant.color || "Default";
  const cartItems = useCartStore((state) => state.items);

  const itemInCart = cartItems.find(
    (item) => item.id === product.id && (item.color || "Default") === currentColor
  );
  
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  const availableStock = Math.max(0, currentVariant.stock - quantityInCart);

  const [quantity, setQuantity] = useState(1);

  const displayQuantity = availableStock === 0 
    ? 0 
    : Math.min(quantity, availableStock);

  const cartItemPayloadInfo = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: currentVariant.images?.[1] || product.mainImage!,
    stock: currentVariant.stock,
    quantity: displayQuantity,
    color: currentColor,
    colorCode: currentVariant.colorCode || "#000000",
  };

  const handleIncrease = () => {
    if (quantity < availableStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Name product */}
      <div className="w-full">
        <span className="text-[12px] text-[#333333B2]">
          {formatText(product.category)} | Sku: {product.sku}
        </span>
        <h1 className="text-[24px] lg:text-4xl ">{product.name}</h1>
        <p className="text-[20px] text-[#333333B2] mt-[16px]">{product.price.toLocaleString("vi-VN")}</p>
      </div>

      {/* Name color */}
      <div className="text-[16px] text-[#333333B2] flex gap-2">
        Color:
        <span className="text-[#333333]">{currentColor}</span>
      </div>

      {/* Select color */}
      <div className="flex gap-4">
        {variants.map((variant, index) => {
          const isSelected = selectedVariantIndex === index;
          const isOutOfStock = variant.stock === 0;
          return (
            <div key={variant.color || index} className="group relative">
              <span
                className={cn(
                  "pointer-events-none absolute bottom-full left-1/2 z-10 mb-2",
                  "-translate-x-1/2 whitespace-nowrap rounded bg-gray-900",
                  "px-2 py-1 text-[10px] text-white",
                  "opacity-0 group-hover:opacity-100"
                )}
              >
                {variant.color || "Default"}
                {isOutOfStock && " (Out of stock)"}
              </span>

              {/* Color Button */}
              <Button
                type="button"
                variant="ghost"
                disabled={isOutOfStock}
                onClick={() => {
                  onSelectVariant(index);
                  setQuantity(1); 
                }}
                aria-label={`Select ${variant.color}`}
                aria-pressed={isSelected}
                className={cn(
                  "relative flex h-7 w-7 items-center justify-center",
                  "rounded-full border border-gray-300 p-0",
                  "transition-transform",
                  isSelected && "ring-2 ring-black",
                  isOutOfStock && "cursor-not-allowed opacity-40 grayscale-30"
                )}
              >
                <span
                  className="h-5 w-5 rounded-full"
                  style={{
                    backgroundColor: variant.colorCode || "#000000",
                  }}
                />

                {isOutOfStock && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <span className="h-0.5 w-full rotate-45 bg-red-500" />
                  </span>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Controls: Quantity & Add To Cart */}
      <div className="flex gap-4">
        <div className="flex items-center">
          <div className="flex items-center border border-gray-300 rounded-[20px] py-2.5">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={displayQuantity <= 1 || availableStock === 0}
              className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-[20px]"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-12 text-center font-medium text-[15px]">
              {displayQuantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={displayQuantity >= availableStock || availableStock === 0}
              className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-[20px]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full">
          <AddToCartButton
            product={cartItemPayloadInfo}
            className="w-full rounded-[20px] h-13.5"
          />
        </div>
      </div>
      
      {/*FEATURE */}
      <ProductFeature product={product} openFeature={openFeature} setOpenFeature={setOpenFeature}/>
    </div>
  );
};

export default ProductInfo;
