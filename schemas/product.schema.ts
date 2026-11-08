
import * as z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(5, "Product name must be at least 5 characters long"),

  brand: z.string().min(2, "Brand name is required"),

  sku: z.string().min(3, "SKU is required"),

  price: z.coerce.number().min(1, "Price must be greater than 0"),

  category: z.enum([
    "",
    "ESPRESSO_MACHINE",
    "GRINDER_MACHINE",
    "COFFEE_BEANS",
    "ACCESSORIES",
  ]),

  mainImage: z.string().min(1, "Please upload a main product image"),

  lifestyleImages: z.array(z.string()).optional(),

  detailImages: z.array(z.string()).optional(),

  variants: z
    .array(
      z.object({
        color: z.string().min(0, "Color name is required"),
        colorCode: z.string(),
        stock: z.coerce.number().min(1, "Invalid stock quantity"),
        images: z.array(z.string()),
      }),
    )
    .min(1, "The product must have at least one variant"),

  description: z.object({
    productFeatures: z.array(z.string()),

    introText: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    ),

    highlightFeatures: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    ),

    essentialFeatures: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    ),

    middleBannerImage: z.array(z.string().url()).default([]),
  }),

  techSpecs: z.record(z.string(), z.unknown()).optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Variant = Product["variants"][number];
export type ProductDescription = Product["description"];
