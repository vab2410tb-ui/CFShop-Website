import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogs } from "@/lib/db/blog/user/get-publish-blog";

const Expolore = async () => {
  const { blogs } = await getPublishedBlogs();

  return (
    <div className="px-[20px] md:px-[max(48px,calc(50%-700px))] lg:py-[40px] ">
      <h2 className="text-2xl lg:text-[40px] font-bold">
        EXPOLORE#NABCOFFEE
      </h2>

      <div className="space-y-[10px] lg:mt-16">
        <div className="flex gap-[10px]">
          <div className="flex-[850]">
            <Image
              src="/images/home/anh3.jpg"
              alt="anh3"
              width={850}
              height={330}
              className="h-[200px] w-full rounded-[20px] object-cover md:h-[250px] lg:h-[330px]"
            />
          </div>
          <div className="flex-[540]">
            <Image
              src="/images/home/anh2.jpg"
              alt="anh2"
              width={540}
              height={330}
              className="h-[200px] w-full rounded-[20px] object-cover md:h-[250px] lg:h-[330px]"
            />
          </div>
        </div>

        <div className="flex gap-[10px]">
          <div className="flex-[540]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-[200px] w-full rounded-[20px] object-cover md:h-[250px] lg:h-[330px]"
            >
              <source src="/videos/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex-[850]">
            <Image
              src="/images/home/anh4.jpg"
              alt="anh4"
              width={850}
              height={330}
              className="h-[200px] w-full rounded-[20px] object-cover md:h-[250px] lg:h-[330px]"
            />
          </div>
        </div>
      </div>

      {/* BLOG */}
      <div className="py-[64px]">
        <h2 className="text-2xl lg:text-[40px] font-bold pb-[40px]">
          Blog pots
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:justify-between md:overflow-x-visible md:gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="w-[85%] shrink-0 md:w-[100%]">
              {/* Image */}
              <Link
                href={`/blog/${blog.slug}`}
                className="relative block aspect-[4/3] w-full md:aspect-[4/3] "
              >
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 767px) 85vw, 33vw"
                  className="rounded-lg object-cover"
                />
              </Link>
              <div>
                <Link  href={`/blog/${blog.slug}`}>
                  <h3 className="font-bold text-[16px] lg:text-[20px] mt-[10px]">{blog.title}</h3>
                </Link>
                <p className="mt-3 break-words">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expolore;
