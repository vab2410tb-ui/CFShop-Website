import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div>
      {/* BEGGIN sections: header */}
      <header className="relative w-full min-h-[570px] md:h-[500px] lg:h-[820px] mb-3">
        <Image
          src="/images/home/home-banner.jpg"
          alt="logo"
          fill
          className="object-cover"
          priority
        />

        <div
          className="absolute top-[100px] left-1/2 -translate-x-1/2 text-center text-white w-full 
                    lg:top-auto lg:bottom-[220px] lg:left-16 lg:translate-x-0 lg:text-left"
        >
          <h1 className="text-4xl font-medium tracking-wide md:text-5xl lg:text-6xl">
            ESPRESSO MACHINE
          </h1>

          <p className="mt-2 text-[16px] md:text-base lg:text-lg">
            Modern Machines for Classic Taste
          </p>
        </div>
      </header>
      {/* END sections: header */}

      {/* Link Panel */}
      <div className="flex flex-col gap-3 md:flex-row md:gap-[10px] md:mx-2">
        {/* Panel 1 */}
        <div className="relative w-full min-h-[500px] md:h-[560px] lg:h-[600px] flex-1 overflow-hidden group">
          <Image
            src="/images/home/LinkMenu1.jpg"
            alt="menu1"
            fill
            className="object-cover"
            priority
          />

          <div
            className="
              absolute z-20 top-12 left-1/2 -translate-x-1/2 w-full text-center text-white
              md:top-auto md:bottom-6 md:left-8 md:translate-x-0 md:w-auto md:text-left
              lg:left-20"
          >
            <h2 className="text-[28px] font-semibold md:text-4xl lg:text-[50px]">
              Coffee At Home
            </h2>

            <p className="text-sm md:text-base md:mr-[30px] md:w-[450px] md:text-[16px]">
              Craft your perfect signature cup with our curated selection of
              espresso machines, premium grinders, and fresh beans.
            </p>

            <Button
              asChild
              className="peer bg-white mt-[20px] py-[20px] px-[15px] rounded-[20px] text-sm text-[#333333] md:text-base hover:bg-gray-200 transition"
            >
              <Link href="/collections/espresso-machine">Explore now</Link>
            </Button>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="relative min-h-[500px] md:h-[560px] lg:h-[600px] flex-1 overflow-hidden group ">
          <Image
            src="/images/home/LinkMenu2.jpg"
            alt="menu2"
            fill
            className="object-cover"
          />

          <div
            className="
              absolute z-20 top-12 left-1/2 -translate-x-1/2 w-full text-center text-white
              md:top-auto md:bottom-6 md:left-8 md:translate-x-0 md:w-auto md:text-left
              lg:left-20"
          >
            <h2 className="text-[28px] font-semibold md:text-4xl lg:text-[50px]">
              New Arrivals
            </h2>

            <p className="text-sm px-[25px] md:text-base md:mr-[30px] md:w-[450px] md:text-[16px] md:px-0">
              Upgrade your brewing setup with the latest innovations in
              specialty coffee gear and freshly roasted whole beans.
            </p>

            <Button
              asChild
              className="bg-white mt-[20px] py-[20px] px-[15px] rounded-[20px] text-sm text-[#333333] md:text-base hover:bg-gray-200 transition"
            >
              <Link href="/collections/all">View products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
