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



export async function getRandomProducts(): Promise<RandomProductProps[]> {
  try {
    const products = await prisma.product.findMany({
      take: 10, 
      orderBy: {
        createdAt: 'desc' 
      },
      select: {
        id: true,
        name: true,
        slug:true,
        price: true,
        mainImage: true,
        category: true,
        variants: true,
      },
    });

    return products as unknown as RandomProductProps[];
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}

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