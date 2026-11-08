"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getBlogById(id: string) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return {
      success: false,
      message: "You do not have permission to access this resource.",
      blog: null,
    };
  }

  if (!/^[a-f\d]{24}$/i.test(id)) {
    return {
      success: false,
      message: "Invalid blog ID format.",
      blog: null,
    };
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return {
        success: false,
        message: "Blog post not found.",
        blog: null,
      };
    }

    return {
      success: true,
      blog,
    };
  } catch (error) {
    console.error("getBlogById error:", error);

    return {
      success: false,
      message: "Failed to load the blog post.",
      blog: null,
    };
  }
}