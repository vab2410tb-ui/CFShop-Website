import Image from "next/image";
import Link from "next/link";

interface BlogPostCard {  
    id: string;
    thumbnail: string;
    title: string;
    slug: string;
    content: string;
    description: string;
    createdAt: Date;
}

interface BlogPostCardProps {
    blogs: BlogPostCard[]
}

export const BlogPostCard = ( {blogs}:BlogPostCardProps ) => {
    return(
        <div 
            className="
                grid grid-cols-1 gap-[32px]
                mt-[40px] mx-[max(20px,calc(50%-700px))] mb-[64px] 
                md:mx-[max(32px,calc(50%-700px))] 
                lg:mx-[max(48px,calc(50%-700px))] 
                lt:lg:mx-[max(70px,calc(50%-700px))] 
            "
        >
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <div className="grid lg:grid-cols-[6fr_4fr] rounded-[18px] overflow-hidden bg-[#3333330D]">
                        <Link href={`/blog/${blog.slug}`}>
                            <Image 
                                src={blog.thumbnail}
                                alt={blog.title}
                                width={353}
                                height={353}
                                className="w-full h-full"
                            />
                        </Link>
                        <div className="flex flex-col p-[20px] md:p-[48px] lt:p-[64px] gap-[12px] md:gap-[20px]">
                                <Link href={`/blog/${blog.slug}`}>
                                    <p className="text-[24px] md:text-[28px] lt:text-[40px] font-bold">
                                        {blog.title}
                                    </p>
                                </Link>
                            
                            <p className="text-[18px] md:text-[20px] ">{blog.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}