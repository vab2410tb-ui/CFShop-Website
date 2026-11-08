"use client";

import { Product } from "@/schemas/product.schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface BasicInfoFormPros {
  product: Product;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onImageUpload: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onLifestyleImageUpload?: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  onLifestyleImageRemove?: (indexToRemove: number) => void;
}
const BasicInfoForm = ({
  product,
  onChange,
  onImageUpload,
  onLifestyleImageUpload,
  onLifestyleImageRemove,
}: BasicInfoFormPros) => {
  console.log(product.name);
  return (
    <div>
      <h3 className="border-b border-gray-300 pb-[10px] mt-[50px] font-semibold text-lg">
        Product Information:
      </h3>
      <div className="grid grid-cols-2 gap-6 pt-5 flex flex-wrap gap-4 my-5 p-4 bg-gray-50 rounded-md items-start">
        <div>
          <h3>Product Name:</h3>
          <Input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            className="w-full"
          />
        </div>
        <div>
          <h3>Brand:</h3>
          <Input
            type="text"
            name="brand"
            value={product.brand}
            onChange={onChange}
            className="w-full"
          />
        </div>
        <div>
          <h3>Price:</h3>
          <Input
            type="text"
            name="price"
            value={product.price}
            onChange={onChange}
            className="w-full"
          />
        </div>

        <div>
          <h3>Sku:</h3>
          <Input
            type="text"
            name="sku"
            value={product.sku}
            onChange={onChange}
            className="w-full"
          />
        </div>
        <div>
          <h3>Main Image:</h3>

          <Input
            type="file"
            accept="image/*"
            name="main"
            onChange={onImageUpload}
            className="w-full cursor-pointer"
          />

          {product.mainImage && (
            <Image
              src={product.mainImage}
              alt="Main product"
              width={160}
              height={160}
              className="mt-2 h-32 w-32 rounded-md object-cover"
            />
          )}
        </div>
        <div>
          <h3>Life Style Image:</h3>
          <Input
            type="file"
            accept="image/*"
            name="main"
            onChange={onLifestyleImageUpload}
            className="w-full cursor-pointer"
          />
          {product.lifestyleImages?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-3">
              {product.lifestyleImages.map((url, index) => (
                <div key={`${url}-${index}`} className="relative h-20 w-20">
                  <Image
                    src={url}
                    alt={`Lifestyle ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full rounded-md object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => onLifestyleImageRemove?.(index)}
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3>Category:</h3>
          <Select
            value={product.category}
            onValueChange={(value) =>
              onChange({
                target: {
                  name: "category",
                  value: value,
                },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Select Category --" />
            </SelectTrigger>

            <SelectContent position="popper" side="bottom" sideOffset={4}>
              <SelectItem value="ESPRESSO_MACHINE">Espresso Machine</SelectItem>
              <SelectItem value="GRINDER_MACHINE">Grinder Machine</SelectItem>
              <SelectItem value="COFFEE_BEANS">Coffee Beans</SelectItem>
              <SelectItem value="ACCESSORIES">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
