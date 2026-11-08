"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteBlog = async(id: string) => {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  // Validate ObjectId format (24 hexadecimal characters)
  if (!/^[a-f\d]{24}$/i.test(id)) {
    return {
      success: false,
      error: "INVALID_ID",
    };
  }

  try {
    // Delete the post and return data (slug)
    const deletedBlog = await prisma.blog.delete({
      where: { id },
      select: { slug: true },
    });

    // Revalidate cache for related routes
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    if (deletedBlog.slug) {
      revalidatePath(`/blog/${deletedBlog.slug}`);
    }

    return { success: true };
  } catch (error) {
    console.error("deleteBlog error:", error);

    // Handled when Prisma throws an error if the record does not exist
    return {
      success: false,
      error: "NOT_FOUND_OR_FAILED",
    };
  }
}