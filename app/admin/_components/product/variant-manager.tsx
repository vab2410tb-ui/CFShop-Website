"use client";

import React from "react";
import { Variant } from "@/schemas/product.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VariantManagerProps {
  variants: Variant[];
  onChange: <K extends keyof Variant>(index: number, field: K, value: Variant[K]) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onImageUpload: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (vIndex: number, imgIndex: number) => void;
}

const VariantManager = ({ variants, onChange, onAdd, onRemove, onImageUpload, onImageRemove }: VariantManagerProps) => {
  return (
    <div>
      <h3 className="border-b border-gray-300 pb-[10px] mt-[50px] font-semibold text-lg">
        Color Category:
      </h3>
      
      {variants.map((variant, index) => (
        <div key={index} className="flex flex-wrap gap-4 my-5 p-4 bg-gray-50 rounded-md items-start">
          
          {/* Color Name */}
          <div className="flex-1 min-w-[150px]">
            <label className="text-xs text-gray-600 block mb-1">Color name:</label>
            <Input 
              type="text" 
              value={variant.color} 
              onChange={(e) => onChange(index, "color", e.target.value)} 
              className="w-full p-2 border border-gray-300  focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          {/* Color Code */}
          <div className="w-[70px]">
            <label className="text-xs text-gray-600 block mb-1">Color code</label>
            <Input 
              type="color" 
              value={variant.colorCode} 
              onChange={(e) => onChange(index, "colorCode", e.target.value)} 
              className="w-full h-[32px] cursor-pointer bg-transparent " 
            />
          </div>

          {/* Stock */}
          <div className="w-[120px]">
            <label className="text-xs text-gray-600 block mb-1">Stock Quantity:</label>
            <Input 
              type="number" 
              min="0" 
              value={variant.stock} 
              onChange={(e) => onChange(index, "stock", Number(e.target.value))} 
              className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
              required 
            />
          </div>

          {/* Images */}
          <div className="flex-[2] min-w-[200px]">
            <label className="text-xs text-gray-600 block mb-1">Images ({variant.images?.length || 0}):</label>
            <Input 
              type="file" 
              onChange={(e) => onImageUpload(index, e)} 
              className="w-full text-xs text-gray-500 file:mr-2 file:rounded file:border-0 hover:file:bg-gray-300 cursor-pointer" 
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {variant.images?.map((url, imgIdx) => (
                <div key={imgIdx} className="relative">
                  <img src={url} className="w-[40px] h-[40px] object-cover rounded" alt="" />
                  <Button 
                    onClick={() => onImageRemove(index, imgIdx)} 
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Remove Button */}
          {variants.length > 1 && (
            <Button 
              onClick={() => onRemove(index)} 
              className="mt-6 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button 
        onClick={onAdd} 
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
      >
        + Add color category
      </Button>
    </div>
  );
};

export default VariantManager;