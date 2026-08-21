"use client"

import { Product } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image";

interface BasicInfoFormPros {
    product: Product,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onLifestyleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    onLifestyleImageRemove?: (indexToRemove: number) => void;
}
const BasicInfoForm = ({product, onChange,  onImageUpload, onLifestyleImageUpload, onLifestyleImageRemove}:BasicInfoFormPros) => {
    console.log(product.name)
    return(
        <div>
            <h3 className="border-b border-gray-300 pb-[10px] mt-[50px] font-semibold text-lg">
                Product Information:
            </h3>
            <div className="grid grid-cols-2 gap-6 pt-5 flex flex-wrap gap-4 my-5 p-4 bg-gray-50 rounded-md items-start"> 
                <div >
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
                </div>
                <div>
                    <h3>Life Style Image:</h3>
                    <Input 
                        type="file"
                        accept="image/*"
                        name="main"
                        onChange={onImageUpload} 
                        className="w-full cursor-pointer"
                    /> 
                </div>
                <div>
                    <h3>Category</h3>
                    <Select
                        value={product.category}
                        onValueChange={(value) =>
                            onChange({
                                target: {
                                    name: 'category',
                                    value: value
                                }
                            }as React.ChangeEvent<HTMLSelectElement>)
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
            <div>
                <label>Lifestyle Images</label>
                <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={onLifestyleImageUpload}
                />
                {product.lifestyleImages && product.lifestyleImages.length > 0 && (
                <div className="flex gap-2 mt-2">
                    {product.lifestyleImages?.map((url, index) => (
                        <div key={index} className="relative w-20 h-20">
                            <Image 
                                src={url} 
                                alt="Lifestyle" 
                                width={288}
                                height={162}
                                className="w-full h-full object-cover" 
                            />
                            
                            <button 
                                type="button"
                                onClick={() => onLifestyleImageRemove?.(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

export default BasicInfoForm;