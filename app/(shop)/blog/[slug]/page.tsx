import { getBLogBySlug } from "@/lib/db/blog/user/get-blog-by-slug";
import { notFound } from "next/navigation";
import  BlogContent from "@/components/blog/blog-content"
import Image from "next/image";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

const BlogDetailPage = async({params}:BlogDetailPageProps) => {
    const {slug} = await params;
    const result = await getBLogBySlug({slug})

    if (!result.success || !result.blog) {
        notFound();
    }

    const {blog} = result;

    return(
    <div>
      <div className="relative isolate after:absolute after:inset-x-0 after:top-0 after:h-[85%] after:bg-[#3333330d] after:content-['']">
        <div className="mx-auto w-full max-w-[1000px]">
          <div className="flex flex-col gap-[14px] py-[40px]">
            <h1 className="text-center text-[40px] font-bold md:text-[52px] lt:text-[64px]">
              {blog.title}
            </h1>

            <p className="text-center">
              {new Date(blog.createdAt).toLocaleDateString("en-US")}
            </p>
          </div>

          <Image
            src={blog.thumbnail}
            alt={blog.title}
            width={1000}
            height={700}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="pt-[64px] pb-[72px] mx-auto w-full max-w-[750px]" >
        <BlogContent content={blog.content} />
      </div>
    </div>
    )
  }
  
  export default BlogDetailPage;