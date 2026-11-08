"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Product} from "@/schemas/product.schema"; 

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9]+/g, "-") 
    .replace(/^-+|-+$/g, "");
};


export const saveProduct = async (data: Product, id?: string) => {
  try {
    const inStock = data.variants.some(
      (variant) => variant.stock > 0
    );

    const productData = {
      name: data.name,
      slug: generateSlug(data.name),
      price: Number(data.price),
      sku: data.sku,
      brand: data.brand,
      category: data.category as
        | "ESPRESSO_MACHINE"
        | "GRINDER_MACHINE"
        | "COFFEE_BEANS"
        | "ACCESSORIES",
      mainImage: data.mainImage,
      variants: data.variants,
      detailImages: data.detailImages,
      lifestyleImages: data.lifestyleImages,
      description: {
        productFeatures: data.description.productFeatures,
        introText: data.description.introText,
        highlightFeatures: data.description.highlightFeatures,
        essentialFeatures: data.description.essentialFeatures,
      },
      techSpecs: data.techSpecs || {},
      inStock,
    };

    if (id) {
      await prisma.product.update({
        where: { id },
        data: productData,
      });
    } else {
      await prisma.product.create({
        data: productData,
      });
    }

    revalidatePath("/admin/products/all");

    return { success: true };
  } catch (error: unknown) {
    console.error("Save product failed:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to save product!";

    return { error: errorMessage };
  }
};


export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: { id }
    });
    revalidatePath("/admin/products/all"); 
    return { success: true };
  } catch (error: unknown) { 
    console.error("Delete failed:", error);
    return { error: "Failed to delete product!" };
  }
};

export const getProductById = async (id: string) => { 
  try {
    const oldProduct = await prisma.product.findUnique({ 
      where: { id }
    });

    if (!oldProduct) {
      return { error: "Product not found!" };
    }

    return { success: true, data: oldProduct };
  } catch (error: unknown) {
    console.error("Get fail:", error);
    return { error: "Failed to get product!" };
  }
}