import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Variant, Product, productSchema } from "@/schemas";
import { saveProduct, getProductById } from "@/actions/product";
import { useRouter } from 'next/navigation';


export const useProductForm = () => {

    const router = useRouter()
    const searchParams = useSearchParams();
    const editId = searchParams.get('editId');

    const [isSubmitting, setIsSubmitting] = useState(false);
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
            middleBannerImage: []
        },
    });
    
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

    const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setProduct((prev) => ({
            ...prev,
            mainImage: imageUrl,
        }));
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

    const handleImageUploadVariant = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setProduct(prev => {
            const newVariants = [...prev.variants];
            const currentImages = newVariants[index].images || [];
            newVariants[index].images = [...currentImages, imageUrl];
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

    // ─── HANDLE: DESCRIPTION SECTION ──────────────────────────────────────

    const handleProductFeature = (index: number, value: string) => {
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

    const handleAddPF = () => {
        setProduct(prev => ({
            ...prev,
                description: {
                    ...prev.description,
                    productFeatures: [...(prev.description?.productFeatures || []), ""]
                }
        }));
    };
    
    // ─── HANDLE: SUBMIT ───────────────────────────────────────────────────
    const handleSubmit = async (e?: React.SyntheticEvent) => {
        if (e) e.preventDefault();
    
        const validationResult = productSchema.safeParse(product);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.issues
                .map((err) => `- ${err.path.join(".")}: ${err.message}`)
                .join("\n");

            alert("Please check your information again:\n" + errorMessages);
            return;
        }   

        setIsSubmitting(true);

        try {
            const result = await saveProduct(product, editId || undefined);

            if (result.error) {
                throw new Error(result.error);
            }
            alert("Product saved successfully!");
            router.push("/admin/products/all")
        } catch (error: unknown) {
            console.error("Error while submitting:", error);
            
            const errorMessage = error instanceof Error 
                ? error.message 
                : "An unknown error occurred while saving the product!";
                
            alert("Error: " + errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    useEffect(() => {
        if (editId) {
            getProductById(editId).then(oldData => {
                setProduct(oldData.data); 
            })
        } 
    }, [editId])

    return{
        product,
        setProduct,
        isSubmitting,
        handler: {
            basicInfo: handleBasicInfoChange,
            mainImage: handleMainImageUpload,
            variant: { add: handleAddVariant, remove: handleRemoveVariant, change: handleChangeVariant, uploadImg: handleImageUploadVariant, rmv: handleImageRemoveVariant },
            description: { add: handleAddPF, changePF: handleProductFeature  },
            handleSubmit
        }
      

    }

    
}