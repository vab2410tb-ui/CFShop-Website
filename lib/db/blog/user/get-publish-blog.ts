"use server";

import { prisma } from "@/lib/prisma";

export const getPublishedBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        thumbnail: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      blogs,
    };
  } catch (error) {
    console.error("getPublishedBlogs error:", error);

    return {
      success: false,
      blogs: [],
    };
  }
};