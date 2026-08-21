import Image from "next/image";

const Expolore = () => {
  return (
    <div className="px-[20px] md:px-[max(48px,calc(50%-700px))] lg:py-[40px] ">
        <h2 className="text-2xl lg:text-[40px] pb-[40px] font-bold">EXPOLORE#NABCOFFEE</h2>

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

        <div className="py-[64px]">
            <h2 className="text-2xl lg:text-[40px] font-bold pb-[40px]">Blog pots</h2>
            <div className="flex gap-8 overflow-x-auto lg:justify-between">
                <div className="shrink-0 w-[280px] lg:w-[415px] ">
                    <div className="relative aspect-[390/275] overflow-hidden rounded-[20px]">
                        <Image
                            src="/images/home/blog-1.jpeg"
                            alt="blog-1"
                            width={390}
                            height={450}
                            className="object-cover w-full lg:h-[275px] rounded-[20px]"
                        />
                    </div>
                    <p>Day</p>
                    <h3 className="text-[20px] font-bold ">
                        How to clean the linea mini coffee machine.
                    </h3>
                    <p>Read more</p>

                </div>
                <div className="shrink-0 w-[280px] lg:w-[415px]">
                    <div className="relative aspect-[390/275] overflow-hidden rounded-[20px]">
                        <Image
                            src="/images/home/blog-2.jpg"
                            alt="blog-2"
                            width={390}
                            height={450}
                            className="object-cover  w-full lg:h-[275px]  rounded-[20px]"
                        />
                    </div>
                    <p>Day</p>
                    <h3 className="text-[20px] font-bold ">
                        How to clean the linea mini coffee machine.
                    </h3>
                    <p>Read more</p>
                </div>
                <div className="shrink-0 w-[280px] lg:w-[415px]">
                    <div className="relative aspect-[390/275] overflow-hidden rounded-[20px]">
                        <Image
                            src="/images/home/blog-3.jpg"
                            alt="blog-3"
                            width={390}
                            height={450}
                            className="object-cover w-full lg:h-[275px] rounded-[20px]"
                        />
                    </div>
                    <p>Day</p>
                    <h3 className="text-[20px] font-bold ">
                        How to clean the linea mini coffee machine.
                    </h3>
                    <p>Read more</p>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Expolore