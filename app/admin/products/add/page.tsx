"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { Variant, Product, productSchema } from "@/schemas";
import { saveProduct, getProductById } from "@/actions/product";
import { Button } from "@/components/ui/button";
import VariantManager from "@/app/admin/_components/variant-manager";
import BasicInfoForm from "@/app/admin/_components/basic-info-form";
import DescriptionSection from "../../_components/description-section";

const AddProduct = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('editId');

    const [product, setProduct] = useState<Product>({
        name: "",
        price: 0,
        sku: "",
        brand: "",
        category: "" as Product["category"] | "",
        mainImage: "",
        variants: [
            { color: "", colorCode: "#000000", stock: 0, images: [] }, 
        ],
        detailImages: [],
        lifestyleImages: [],
        description: {
            productFeatures: [""],
            introText: [{ title: "", content: "" }],
            highlightFeatures: [{ title: "", content: "" }],
            essentialFeatures: [{ title: "", content: "" }], 
            middleBannerImage: [],
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    // ─── Call API CLOUDINARY  ──────────────────────────────────
    const uploadToCloudinary = async (file: File): Promise<string | null> => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            alert("Configuration Error: Cloud Name or Upload Preset is missing.");
            return null;
        }

        setIsUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");
            
            const data = await response.json(); 
            return data.secure_url; 
        } catch (error) {
            console.error("Upload Failed:", error);
            alert("Unable to upload the image. Please try again.");
            return null;
        } finally {
            setIsUploadingImage(false);
        }
    };

    // ─── HANDLE: BASIC INFO FORM ──────────────────────────────────────────
    const handleBasicInfoChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === "price" 
                ? Number(value) 
                : name === "category" 
                    ? (value as Product["category"]) 
                    : value,
        }));
    };

    const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const permanentUrl = await uploadToCloudinary(file);
        if (permanentUrl) {
            setProduct((prev) => ({ ...prev, mainImage: permanentUrl }));
        }
    };
    
    // ─── HANDLE: VARIANTS MANAGER ──────────────────────────────────────────
    const handleAddVariant = () => {
        setProduct(prev => ({
            ...prev,
            variants: [
                ...prev.variants,
                { color: "", colorCode: "#000000", stock: 0, images: [] }
            ]
        }));
    };

    const handleRemoveVariant = (index: number) => {
        setProduct(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };

    const handleChangeVariant = <K extends keyof Variant>(
        index: number,
        field: K,
        value: Variant[K]
    ) => {
        setProduct(prev => {
            const newVariants = [...prev.variants];
            newVariants[index][field] = value;
            return { ...prev, variants: newVariants };
        });
    };
    
    const handleImageUploadVariant = async (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const permanentUrl = await uploadToCloudinary(file);
        if (!permanentUrl) return;

        setProduct(prev => {
            const newVariants = [...prev.variants];
            newVariants[index] = {
                ...newVariants[index],
                images: [...(newVariants[index].images || []), permanentUrl]
            };
            return { ...prev, variants: newVariants };
        });
    };

    const handleImageRemoveVariant = (vIndex: number, imgIndex: number) => {
        setProduct(prev => {
            const newVariants = [...prev.variants];
            newVariants[vIndex].images = newVariants[vIndex].images?.filter(
                (_, i) => i !== imgIndex
            );
            return { ...prev, variants: newVariants };
        });
    };
    // ─── HANDLE: LIFESTYLE IMAGES ──────────────────────────────────────────
    const handleUploadLifestyleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        e.target.value = "";

        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const urls = await Promise.all(uploadPromises);

        const validUrls = urls.filter((url): url is string => url !== null);
        if (validUrls.length === 0) return;

        setProduct(prev => ({
            ...prev,
            lifestyleImages: [
                ...(prev.lifestyleImages || []), 
                ...validUrls
            ]
        }));
    };

    const handleRemoveLifestyleImage = (indexToRemove: number) => {
        setProduct(prev => ({
            ...prev,
            lifestyleImages: prev.lifestyleImages.filter((_, index) => index !== indexToRemove)
        }));
    };
    // ─── HANDLE: DESCRIPTION SECTION ──────────────────────────────────────
    const handleUploadBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const permanentUrl = await uploadToCloudinary(file);
    if (!permanentUrl) return;

    setProduct(prev => ({
        ...prev,
        description: {
            ...prev.description,
            middleBannerImage: [...(prev.description.middleBannerImage || []), permanentUrl]
        }
    }));
};

    const handleProductFeatureChange = (index: number, value: string) => {
        setProduct(prev => {
            const newFeature = [...prev.description.productFeatures];
            newFeature[index] = value;
            return {
                ...prev,
                description: {
                    ...prev.description,
                    productFeatures: newFeature
                }
            }
        })
    }

    const handleAddProductFeature = () => {
        setProduct(prev => ({
            ...prev,
            description: {
                ...prev.description,
                productFeatures: [...(prev.description?.productFeatures || []), ""]
            }
        }));
    };

    const handleRemoveProductFeature =(index: number) => {
        setProduct(prev => ({
            ...prev,
            description: {
                ...prev.description,
                productFeatures: prev.description.productFeatures.filter(
                    (_, i) => i !== index
                )
            }
        }))
    }
    
    // ─── HANDLE: SUBMIT & USE EFFECT ──────────────────────────────────────
    const handleSubmit = async (e?: React.SyntheticEvent) => {
        if (e) e.preventDefault();
       
        const validationResult = productSchema.safeParse(product);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.issues
                .map((err) => `- ${err.path.join(".")}: ${err.message}`)
                .join("\n");
            alert("Please check the information and try again:\n" + errorMessages);
            return;
        }   

        setIsSubmitting(true);

        try {
            const result = await saveProduct(product, editId || undefined);
            if (result.error) throw new Error(result.error);
            
            alert("Product saved successfully!");
            router.push("/admin/products/all");
        } catch (error: unknown) {
            console.error("Failed to save the product:", error);
            const errorMessage = error instanceof Error 
                ? error.message 
                : "An unexpected error occurred!";
            alert("Error: " + errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    useEffect(() => {
        if (editId) {
            getProductById(editId).then(oldData => {
                if(oldData?.data) setProduct(oldData.data); 
            })
        } 
    }, [editId])

    return (
        <div>
            <form 
                onSubmit={handleSubmit} 
                className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6"
            >
                <h1>{editId ? "Edit Product" : "Add New Product"}</h1>
                
                <BasicInfoForm
                    product={product}
                    onChange={handleBasicInfoChange}
                    onImageUpload={handleMainImageUpload}
                    onLifestyleImageUpload={handleUploadLifestyleImages}
                    onLifestyleImageRemove={handleRemoveLifestyleImage}
                />

                <VariantManager
                    variants={product.variants} 
                    onChange={handleChangeVariant}
                    onAdd={handleAddVariant}
                    onRemove={handleRemoveVariant}
                    onImageUpload={handleImageUploadVariant}
                    onImageRemove={handleImageRemoveVariant}
                />

                <DescriptionSection 
                    description={product.description} 
                    onChangePF={handleProductFeatureChange}
                    onChange={(updatedDescription) => setProduct(prev => ({
                        ...prev,
                        description: updatedDescription
                    }))}
                    onBannerUpload={handleUploadBanner}
                    onAdd={handleAddProductFeature}
                    onRemove={handleRemoveProductFeature}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting || isUploadingImage}
                    className="mt-4"
                >
                    {isUploadingImage ? "Uploading image..." : isSubmitting ? "Saving..." : "Save Product"}
                </Button>  
            </form>
        </div>
    );
};

export default AddProduct;