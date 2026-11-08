"use client"

import { useParams } from "next/navigation";
import { TextContent } from "@prisma/client";
import Image from "next/image";

interface Props {
    introText: TextContent[];
    lifeStyleImg: string[];
    highlightFeatures: TextContent[];
    essentialFeatures: TextContent[];
}

const ProductDescription = ({ introText, lifeStyleImg, highlightFeatures, essentialFeatures }: Props) => {
    const params = useParams();
    const slug = params?.slug;

    const validImages = (lifeStyleImg || []).filter((img) => typeof img === 'string' && img.trim() !== "");
    const len = validImages.length;

    let bottomBannerSrc = null;
    if (len <= 4) {
        bottomBannerSrc = validImages[3];
    } else if (len === 5) {
        bottomBannerSrc = validImages[4];
    } else if (len > 5) {
        bottomBannerSrc = slug === "strada-x-2-group-la-marzocco" ? validImages[6] : validImages[5];
    }

    return (
        <div className="my-[80px] lg:my-[150px]">
            
            {/* --- INTRO TEXT --- */}
            <div>
                {introText?.map((feature, index) => (
                    <div key={index}>
                        <h1 className="text-center text-[24px] lg:text-[40px] font-medium mb-[35px]">{feature.title}</h1>
                        <p className="text-justify text-[18px] lg:text-2xl indent-10">{feature.content}</p>
                    </div>
                ))}
            </div>

            {/* --- TOP BANNER --- */}
            {validImages[0] && (
                <div className="h-full w-full mt-[50px] lg:mt-[130px]">
                        <Image
                            src={validImages[0]}
                            alt="banner"
                            width={1480}
                            height={980}
                            className="object-cover rounded-[20px]"
                        />
                    </div>
            )}

            {/* --- HIGHLIGHT FEATURES --- */}
            <div className="mt-[50px] lg:mt-[130px]">
                {highlightFeatures?.map((feature, index) => (
                    <div key={index}>
                        <h2 className="text-center text-[24px] lg:text-[40px] font-medium mb-[15px] lg:mb-[35px] mt-[30px] lg:mt-[80px]">{feature.title}</h2>
                        <p className="text-center text-[18px] lg:text-2xl">{feature.content}</p>
                    </div>
                ))}
            </div>

            {/* --- MIDDLE GALLERY --- */}
            {/* Case 1: */}
            {len <= 4 && validImages[1] && validImages[2] && (
                slug === "gs3-1-group-av-la-marzocco" ? (
                    <div className="flex gap-[10px] mt-[50px] lg:mt-[130px]">
                        <div className="relative lg:w-[550px] h-[500px]">
                            <Image src={validImages[1]} alt="banner" fill className="object-cover rounded-[20px]" />
                        </div>
                        <div className="relative w-full h-[500px]">
                            <Image src={validImages[2]} alt="banner" fill className="object-cover rounded-[20px]" />
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-[10px] lg:gap-[50px] mt-[50px] lg:mt-[130px]">
                        <div className="w-full h-full">
                            <Image src={validImages[1]} alt="banner" width={825} height={1000} className="w-full h-full object-cover rounded-[20px]" />
                        </div>
                        <div className="w-full h-full">
                            <Image src={validImages[2]} alt="banner" width={825} height={1000} className="w-full h-full object-cover rounded-[20px]" />
                        </div>
                    </div>
                )
            )}

            {/* Case 2: */}
            {len === 5 && validImages[1] && validImages[2] && validImages[3] && (
                <div className="flex gap-[10px] lg:gap-[50px] mt-[50px] lg:mt-[130px]">
                    {[1, 2, 3].map((idx) => (
                        <div key={idx} className="w-full h-full">
                            <Image src={validImages[idx]} alt="banner" width={825} height={1000} className="w-full h-full object-cover rounded-[20px]" />
                        </div>
                    ))}
                </div>
            )}

            {/* Case 3: */}
            {len > 5 && (
                slug === "strada-x-2-group-la-marzocco" ? (
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 gap-[10px] lg:gap-[50px] mt-[50px] lg:mt-[130px]">
                            {[1, 2].map((idx) => validImages[idx] && (
                                <div key={idx} className="w-full h-full">
                                    <Image src={validImages[idx]} alt="banner" width={825} height={1000} className="w-full h-full object-cover rounded-[20px]" />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-7 mt-[50px]">
                            {[3, 4, 5].map((idx) => validImages[idx] && (
                                <div key={idx} className="w-full h-full">
                                    <Image src={validImages[idx]} alt="banner" width={550} height={650} className="w-full h-full object-cover rounded-[20px]" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-[10px] lg:gap-[50px] mt-[50px] lg:mt-[130px]">
                        {[1, 2, 3, 4].map((idx) => validImages[idx] && (
                            <div key={idx} className="w-full h-full">
                                <Image src={validImages[idx]} alt="banner" width={825} height={1000} className="w-full h-full object-cover rounded-[20px]" />
                            </div>
                        ))}
                    </div>
                )
            )}

            {/* --- ESSENTIAL FEATURES --- */}
            {essentialFeatures && essentialFeatures.length > 0 && (
                <div className="mt-[50px] lg:mt-[130px]">
                    <h1 className="text-[32px] lg:text-[40px] text-center font-bold">Essential features</h1>
                    <div className="lg:grid lg:grid-cols-2 gap-[60px] mb-[15px] lg:mb-[35px] mt-[30px] lg:mt-[80px]">
                        {essentialFeatures.map((essential, index) => (
                            <div key={index} className="flex flex-col">
                                <h2 className="text-[24px] lg:text-[40px] font-bold text-center lg:text-left mb-[15px] mt-[30px]">{essential.title}</h2>
                                <span className="text-[18px] lg:text-2xl text-center lg:text-justify">{essential.content}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- BOTTOM BANNER --- */}
            {bottomBannerSrc && (
                <div className="mt-[50px] lg:mt-[150] h-full w-full">
                    <Image
                        src={bottomBannerSrc}
                        alt="banner"
                        width={1480}
                        height={980}
                        className="object-cover rounded-[20px]"
                    />
                </div>
            )}

        </div>
    );
}

export default ProductDescription;
