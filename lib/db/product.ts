import { prisma } from '@/lib/prisma';
import { Category, Prisma, Product, Variant } from '@/generated/prisma/client';

interface GetProductsParams {
  category?: string;
  sort?: "price-asc" | "price-desc" | "default";
}

export interface RandomProductProps {
  id: string;
  name: string;
  price: number;
  slug: string;
  category: Category; 
  mainImage: string;
  variants: Variant[]; 
}

export interface ProductDetailProps{
  product: Product
}



export const getRandomProducts = async () => {
  try {
    const products = await prisma.product.aggregateRaw({
      pipeline: [
        {
          $match: {
            "variants.stock": { $gt: 0 },
          },
        },
        {
          $sample: {
            size: 10,
          },
        },
        {
          $project: {
            _id: 1,
            id: { $toString: "$_id" },
            name: 1,
            slug: 1,
            price: 1,
            mainImage: 1,
            category: 1,
            variants: 1,
          },
        },
      ],
    });

    return products as unknown as RandomProductProps[];
  } catch (error) {
    console.error("Get random products failed:", error);
    return [];
  }
};

export const getAllProducts = async ({
  category,
  sort,
}: GetProductsParams) => {
  try {
    const categoryEnum = category
      ? (category.toUpperCase().replace(/-/g, "_") as Category)
      : undefined;

    let orderByCondition: Prisma.ProductOrderByWithRelationInput = {
      createdAt: "desc",
    };

    if (sort === "price-asc") {
      orderByCondition = { price: "asc" };
    } else if (sort === "price-desc") {
      orderByCondition = { price: "desc" };
    } else if (sort === "default") {
      orderByCondition = { createdAt: "desc" };
    }

    const whereCondition = categoryEnum
      ? { category: categoryEnum }
      : undefined;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereCondition,
        orderBy: orderByCondition,
      }),

      prisma.product.count({
        where: whereCondition,
      }),
    ]);

    return {
      products,
      total,
    };
  } catch (error) {
    console.error("Failed to load products:", error);

    return {
      products: [],
      total: 0,
    };
  }
};

export const getProductBySlug = async ({slug} : {slug: string}): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });
    return product;
  } catch (error) {
    console.error("Failed to load products by slug:", error);
    return null;
  }
};