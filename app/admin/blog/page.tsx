
import Link from "next/link";
import { getBlogs } from "@/lib/db/blog/admin/get-blog";
import { BlogTable } from "@/app/admin/_components/blog/blog-table";
import { Button } from "@/components/ui/button";

export default async function AdminBlogPage() {
  const result = await getBlogs(1, 10);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage posts and publication status.
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/blog/create">
            Create Post
          </Link>
        </Button>
      </div>

      {!result.success ? (
        <p className="text-sm text-destructive">
          {result.message ?? "Unable to load posts."}
        </p>
      ) : (
        <BlogTable
          blogs={result.blogs}
          total={result.total}
          totalPages={result.totalPages}
          currentPage={1}
        />
      )}
    </div>
  );
}
