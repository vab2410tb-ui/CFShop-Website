
import { getBlogById } from "@/lib/db/blog/admin/get-blog-by-id";
import { BlogForm } from "@/app/admin/_components/blog/blog-form";
import { notFound } from "next/navigation";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditBlogPage = async ({ params }: EditBlogPageProps) => {
  const { id } = await params;

  const result = await getBlogById(id);

  if (!result.success || !result.blog) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Blog</h1>
        <p className="text-sm text-muted-foreground">
          Update your blog post.
        </p>
      </div>

      <BlogForm initialData={result.blog} />
    </div>
  );
};

export default EditBlogPage;
