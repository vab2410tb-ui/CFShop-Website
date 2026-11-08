
import { z } from "zod";

export const BlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please enter a title.")
    .max(200, "Title must be at most 200 characters."),

  slug: z.string().trim().optional().default(""),

  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters.")
    .optional()
    .default(""),

  content: z
    .string()
    .trim()
    .min(1, "Please enter the blog content."),

  thumbnail: z
    .string()
    .trim()
    .optional()
    .default(""),

  published: z.boolean().default(false),
});

export type BlogInput = z.infer<typeof BlogSchema>;
