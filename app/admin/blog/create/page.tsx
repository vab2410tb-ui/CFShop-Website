
import Link from "next/link";

import { BlogForm } from "@/app/admin/_components/blog/blog-form";
import { Button } from "@/components/ui/button";

export  const CreateBlogPage = () => {
  return (
    <div className="mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Create Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a new article for Nab Coffee.
          </p>
        </div>

        <Button variant="outline" asChild>
          <Link href="/admin/blog">Back to Blogs</Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-background p-6">
        <BlogForm />
      </div>
    </div>
  );
}

export default CreateBlogPage;
