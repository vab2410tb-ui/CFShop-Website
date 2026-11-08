"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BlogSchema } from "@/schemas/blog-schema";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createBlog = async (input: unknown) => {
  try {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
      return {
        success: false,
        message: "You do not have permission to perform this action.",
      };
    }

    const parsed = BlogSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid input data.",
      };
    }

    const data = parsed.data;
    const baseSlug = generateSlug(data.slug || data.title);

    if (!baseSlug) {
      return {
        success: false,
        message: "Unable to generate slug from title.",
      };
    }

    // Automatically generate a unique slug
    let slug = baseSlug;
    let suffix = 1;

    while (await prisma.blog.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    const blog = await prisma.blog.create({
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
    revalidatePath("/blog");

    return {
      success: true,
      message: "Blog post created successfully.",
      blogId: blog.id,
    };
  } catch (error) {
    console.error("createBlog error:", error);

    return {
      success: false,
      message: "An error occurred while creating the blog post.",
    };
  }
}