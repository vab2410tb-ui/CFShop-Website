import Image from "next/image"
import { Variant } from "@prisma/client";

interface VariantImageProps {
  selectedVariant: Variant;
}
const VariantImage = ({selectedVariant}: VariantImageProps) => {
    return(
        <div>
           
                <div className="flex gap-6 overflow-x-auto justify-between lg:grid lg:grid-cols-2">
                    {selectedVariant.images.map((imageUrl, index) => (
                        <div
                            key={`${selectedVariant.color}-${index}`}
                            className="w-[260px] shrink-0 overflow-hidden rounded-[20px] lg:w-full lg:max-w-[330px] lg:max-h-[330px]"
                        >
                        <Image
                            src={imageUrl}
                            alt={`${selectedVariant.color} ${index + 1}`}
                            width={330}
                            height={330}
                            className="h-full w-full object-contain"
                            priority={index === 0} 
                        />
                        </div>
                    ))}
                </div>
         
            {/* {selectedVariant.images.length < 4 && (
                <div className="flex justify-center">
                    {selectedVariant.images.map((imageUrl, index) => (
                        <div
                            key={`${selectedVariant.color}-${index}`}
                            className="w-[260px] shrink-0 overflow-hidden rounded-[20px] lg:w-full lg:max-w-[792px] lg:max-h-[792px]"
                        >
                        <Image
                            src={imageUrl}
                            alt={`${selectedVariant.color} ${index + 1}`}
                            height={792}
                            width={792}
                            className="h-full w-full object-contain"
                            priority={index === 0} 
                        />
                        </div>
                    ))}
                </div>
            )} */}
        </div>
        
    )
}

export default VariantImage
