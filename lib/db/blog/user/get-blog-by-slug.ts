
"use server";

import { prisma } from "@/lib/prisma";

export const getBLogBySlug = async ({ slug }: { slug: string }) => {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        slug,
        published: true,
      },
    });

    if (!blog) {
      return {
        success: false as const,
        message: "Blog not found",
        blog: null,
      };
    }

    return {
      success: true as const,
      blog,
    };
  } catch (error) {
    console.error("getBlogBySlug error:", error);

    return {
      success: false as const,
      message: "Failed to load blog",
      blog: null,
    };
  }
};
