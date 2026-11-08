"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteBlog } from "@/actions/blog/delete-blog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
type BlogItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface BlogTableProps {
  blogs: BlogItem[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const BlogTable = ({
  blogs,
  total,
}: BlogTableProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async(id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the blog post "${title}"?`
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      const result = await deleteBlog(id);

      if (!result.success) {
        toast.error("Failed to delete the blog post.");
        return;
      }

      toast.success("Blog post deleted successfully.");
      router.refresh();
    } catch {
      toast.error("An error occurred while deleting the blog post.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Total {total} blog posts
      </p>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm ">
          <thead className="bg-slate-50 ">
            <tr className="text-left border-b-[1px]">
              <th className="p-4">Title</th>
              <th className="p-4">Slug</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4">Created At</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-muted-foreground"
                >
                  No blog posts found.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-t">
                  <td className="max-w-[280px] p-4 font-medium">
                    <span className="line-clamp-2">
                      {blog.title}
                    </span>
                  </td>

                  <td className="max-w-[220px] truncate p-4 text-muted-foreground">
                    {blog.slug}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={
                        blog.published
                          ? "rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                          : "rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                      }
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap p-4">
                    {new Date(blog.createdAt).toLocaleDateString(
                      "en-US"
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/blog/${blog.id}/edit`}>
                          Edit
                        </Link>
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deletingId === blog.id}
                        onClick={() =>
                          handleDelete(blog.id, blog.title)
                        }
                      >
                        {deletingId === blog.id
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}