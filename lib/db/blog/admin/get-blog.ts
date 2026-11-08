"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getBlogs(page = 1, pageSize = 10) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return {
      success: false,
      message: "You do not have permission to access this resource.",
      blogs: [],
      total: 0,
      totalPages: 0,
    };
  }

  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(
    50,
    Math.max(1, Math.floor(pageSize))
  );

  try {
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
        skip: (safePage - 1) * safePageSize,
        take: safePageSize,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          thumbnail: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blog.count(),
    ]);

    return {
      success: true,
      blogs,
      total,
      totalPages: Math.ceil(total / safePageSize),
    };
  } catch (error) {
    console.error("getBlogs error:", error);

    return {
      success: false,
      message: "Failed to load the blog list.",
      blogs: [],
      total: 0,
      totalPages: 0,
    };
  }
}