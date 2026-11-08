"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BlogSchema } from "@/schemas/blog-schema";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function updateBlog(id: string, input: unknown) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return {
      success: false,
      message: "You do not have permission to perform this action.",
    };
  }

  if (!/^[a-f\d]{24}$/i.test(id)) {
    return {
      success: false,
      message: "Invalid blog ID format.",
    };
  }

  const parsed = BlogSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid input data.",
    };
  }

  try {
    const existing = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Blog post not found.",
      };
    }

    const data = parsed.data;
    const baseSlug = generateSlug(data.slug || data.title);

    if (!baseSlug) {
      return {
        success: false,
        message: "Invalid slug format.",
      };
    }

    let slug = baseSlug;
    let suffix = 1;

    while (true) {
      const conflict = await prisma.blog.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (!conflict || conflict.id === id) break;

      slug = `${baseSlug}-${suffix++}`;
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        description: data.description || null,
        content: data.content,
        thumbnail: data.thumbnail || null,
        published: data.published,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}/edit`);
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    revalidatePath(`/blog/${blog.slug}`);

    return {
      success: true,
      message: "Blog post updated successfully.",
    };
  } catch (error) {
    console.error("updateBlog error:", error);

    return {
      success: false,
      message: "Failed to update the blog post.",
    };
  }
}