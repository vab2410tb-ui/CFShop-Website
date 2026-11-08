"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@prisma/client";
import VariantImage from "./product-content/product-image";
import ProductInfo from "@/components/product/product-content/product-info";
import ProductDescription from "./product-content/product-description";

interface VariantProps {
  product: Product;
}

export const ProductDetail = ({ product }: VariantProps) => {
  const router = useRouter();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product?.variants || product.variants.length === 0) {
    return null;
  }
  const selectedVariant = product.variants[selectedVariantIndex];

  const handleSelectVariant = (index: number) => {
    const variant = product.variants[index];
    setSelectedVariantIndex(index);
    router.push(`?variant=${variant.colorCode}`, { scroll: false });
  };

  return (
    <div>
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 ">
        <div className="lg:self-start">
          <VariantImage selectedVariant={selectedVariant} />
        </div>
        <div>
          <ProductInfo
            product={product}
            variants={product.variants}
            selectedVariantIndex={selectedVariantIndex}
            onSelectVariant={handleSelectVariant}
          />
        </div>
      </div>
      <ProductDescription 
        introText={product.description.introText}
        lifeStyleImg ={product.lifestyleImages}
        highlightFeatures={product.description.highlightFeatures}
        essentialFeatures={product.description.essentialFeatures}
      />
    </div>
  );
};
