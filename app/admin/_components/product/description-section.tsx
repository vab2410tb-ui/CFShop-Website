"use client"

import React from "react";
import { ProductDescription } from "@/schemas/product.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DescriptionSectionProps {
  description: ProductDescription;
  onChange: (updatedDescription: ProductDescription) => void; 
  onChangePF: (index: number, value: string) => void;
  onBannerUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function DescriptionSection({ description, onChange, onChangePF, onBannerUpload, onAdd, onRemove }: DescriptionSectionProps) {
  const handleObjArrayChange = (
    field: "introText" | "highlightFeatures" | "essentialFeatures",
    index: number,
    key: "title" | "content",
    value: string
  ) => {
    const newArray = [...description[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    onChange({ ...description, [field]: newArray });
  };

  const addObjArrayItem = (field: "introText" | "highlightFeatures" | "essentialFeatures") => {
    onChange({ ...description, [field]: [...description[field], { title: "", content: "" }] });
  };

  const removeObjArrayItem = (field: "introText" | "highlightFeatures" | "essentialFeatures", index: number) => {
    onChange({ ...description, [field]: description[field].filter((_, i) => i !== index) });
  };

 

  return (
    <div>
      <h3 className="mt-12 border-b border-gray-300 pb-2 text-lg font-semibold">
        Landing Page Content
      </h3>

      <div className="mt-10 rounded-lg">
          {/* 1. Intro Text */}
          <div className="my-5 rounded-md bg-gray-50 p-4">
              <h4 className="mb-4 font-medium">1. Intro Text</h4>
            {description.introText.map((item, index) => (
              <div key={index} className="mb-4 flex items-start gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Title (e.g., The Perfect Grind)"
                    value={item.title}
                    onChange={(e) => handleObjArrayChange("introText", index, "title", e.target.value)}
                    className="mb-2"
                  />
                  <textarea
                    rows={3}
                    placeholder="Content..."
                    value={item.content}
                    onChange={(e) => handleObjArrayChange("introText", index, "content", e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>

                <Button type="button" variant="destructive" onClick={() => removeObjArrayItem("introText", index)}>
                  ✕
                </Button>
              </div>
            ))}

            <Button type="button" onClick={() => addObjArrayItem("introText")}>
              + Add Intro Paragraph
            </Button>
          </div>

          {/* 2. Banner */}
          <div className="my-5 rounded-md bg-gray-50 p-4">
            <h4 className="mb-4 font-medium">2. Middle Banner Image</h4>
            <Input type="file" multiple onChange={onBannerUpload} />

            {description.middleBannerImage && description.middleBannerImage.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {description.middleBannerImage.map((url, index) => (
                  <div key={index} className="relative inline-block overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={url}
                      alt={`Banner ${index + 1}`}
                      width={288} 
                      height={162} 
                      className="object-cover"
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full p-0"
                      onClick={() => {
                        const newBanners = description.middleBannerImage.filter((_, i) => i !== index);
                        onChange({ ...description, middleBannerImage: newBanners });
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Highlight Features */}
          <div className="my-5 rounded-md bg-gray-50 p-4">
            <h4 className="mb-4 font-medium">3. Highlight Features</h4>

            {description.highlightFeatures.map((item, index) => (
              <div key={index} className="mb-3 flex gap-3">
                <Input
                  className="flex-1"
                  type="text"
                  placeholder="Feature Title"
                  value={item.title}
                  onChange={(e) => handleObjArrayChange("highlightFeatures", index, "title", e.target.value)}
                />

                <Input
                  className="flex-[2]"
                  type="text"
                  placeholder="Short description"
                  value={item.content}
                  onChange={(e) => handleObjArrayChange("highlightFeatures", index, "content", e.target.value)}
                />

                <Button type="button" variant="destructive" onClick={() => removeObjArrayItem("highlightFeatures", index)}>
                  ✕
                </Button>
              </div>
            ))}

            <Button type="button" onClick={() => addObjArrayItem("highlightFeatures")}>
              + Add Feature
            </Button>
          </div>

          {/* 4. Essential Features */}
          <div className="my-5 rounded-md bg-gray-50 p-4">
            <h4 className="mb-4 font-medium">4. Essential Features</h4>

            {description.essentialFeatures.map((item, index) => (
              <div key={index} className="mb-3 flex gap-3">
                <Input
                  className="flex-1"
                  type="text"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => handleObjArrayChange("essentialFeatures", index, "title", e.target.value)}
                />

                <Input
                  className="flex-[2]"
                  type="text"
                  placeholder="Content"
                  value={item.content}
                  onChange={(e) => handleObjArrayChange("essentialFeatures", index, "content", e.target.value)}
                />

                <Button type="button" variant="destructive" onClick={() => removeObjArrayItem("essentialFeatures", index)}>
                  ✕
                </Button>
              </div>
            ))}

            <Button type="button" onClick={() => addObjArrayItem("essentialFeatures")}>
              + Add Essential
            </Button>
          </div>

          {/* 5. Product Features */}
          <div className="my-5 rounded-md bg-gray-50 p-4">
            <h4 className="mb-4 font-medium">5. Product Features</h4>

            {description.productFeatures.map((item, index) => (
              <div key={index} className="mb-3 flex items-center gap-3">
                <Input
                  className="flex-1"
                  type="text"
                  placeholder="Feature"
                  value={item}
                  onChange={(e) => onChangePF(index, e.target.value)}
                />

                <Button type="button" variant="destructive" onClick={() => onRemove(index)}>
                  ✕
                </Button>
              </div>
            ))}

            <Button type="button" onClick={onAdd}>
              + Add Feature
            </Button>
          </div>
      </div>
    </div>
  );
}