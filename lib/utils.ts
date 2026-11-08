import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product, Variant } from "@/generated/prisma/client";
import { CartItem } from "@/types/cart";
import slugify from "slugify"

export type ProductBase = Pick<Product, "id" | "name" | "slug" | "price" | "mainImage"> & {
  variants: Variant[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatText = (text: string) => {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .toLocaleLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const generateSlug = (title: string) => {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: "vi",
  });
}

export const getProductDefaultConfig = (product:ProductBase) => {
  const defaultVariant = product.variants?.find((v) => 
    v.images && product.mainImage ? v.images.includes(product.mainImage) : false
  ) || product.variants?.[0];

  const displayImage = defaultVariant?.images?.[1] || product.mainImage || null;
  
  const cartItemPayload: CartItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: displayImage || "/placeholder.png",
    stock: defaultVariant?.stock || 0,
    quantity: 1,
    color: defaultVariant?.color || "Default",
    colorCode: defaultVariant?.colorCode || "#000000"
  };

  return { defaultVariant, displayImage, cartItemPayload };
}