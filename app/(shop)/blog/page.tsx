import { getPublishedBlogs } from "@/lib/db/blog/user/get-publish-blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";

const BlogPage = async () => {
    const { blogs } = await getPublishedBlogs();

    return(
        <div>
            <header className="bg-[#212121] pt-[48px] pb-[64px] md:pt-[96px] md:pb-[112px]">
                 <div className="px-[20px] md:px-[max(20px,calc(50%-700px))]">
                    <div>
                        <h1 className="text-white text-[40px] text-center md:text-[52px] font-bold">Blogs</h1>
                    </div>
                </div>
            </header>
 
            <BlogPostCard blogs={blogs}/>
        </div>
    );
}

export default BlogPage;