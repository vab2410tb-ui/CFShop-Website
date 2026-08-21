import * as z from "zod"

export const LoginSchema = z.object({
    email: z
        .string()
        .email({message: "Email is required"})
        .min(1, "Email is required"),
    password: z.string({
        message: "Password is required"
    }),
    code: z.optional(z.string()),
})


export const ResetSchema = z.object({
    email: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .email("Please enter a valid email address")
})

export const NewPasswordSchema = z
    .object({
        password: z.string().min(6, {
        message: "Minimum of 6 characters required",
        }),
        confirmPassword: z.string().min(6, {
        message: "Minimum of 6 characters required",
        }),
    })

    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match!",
        path: ["confirmPassword"],
    });

export const RegisterSchema = z
    .object({
        email: z.string().email({
            message: "Email is required"
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long"
        }),
        confirmPassword: z.string().min(6, {
            message: "Password must be at least 6 characters long",
            }),
        name: z.string().min(3,{
            message: "Name must be at least 3 characters long"
        }),
        
    })
    .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match!",
            path: ["confirmPassword"],
        });

export const productSchema = z.object({
    name: z.string().min(5, "Product name must be at least 5 characters long"),
    brand: z.string().min(2, "Brand name is required"),
    sku: z.string().min(3, "SKU is required"),
    price: z.coerce.number().min(1, "Price must be greater than 0"), 
    category: z.enum(["","ESPRESSO_MACHINE", "GRINDER_MACHINE", "COFFEE_BEANS", "ACCESSORIES"]),
    mainImage: z.string().min(1, "Please upload a main product image"),
    lifestyleImages: z.array(z.string()).optional(),
    detailImages: z.array(z.string()).optional(),
    
    variants: z.array(
        z.object({
            color: z.string().min(0, "Color name is required"),
            colorCode: z.string(),
            stock: z.coerce.number().min(1, "Invalid stock quantity"),
            images: z.array(z.string())
        })
    ).min(1, "The product must have at least one variant"),

    description: z.object({
        productFeatures: z.array(z.string()),
        introText: z.array(z.object({ title: z.string(), content: z.string() })),
        highlightFeatures: z.array(z.object({ title: z.string(), content: z.string() })),
        essentialFeatures: z.array(z.object({ title: z.string(), content: z.string() })),
        middleBannerImage: z.array(z.string()),
    }),

    techSpecs: z.record(z.string(), z.unknown()).optional()

});


export type Product = z.infer<typeof productSchema>;
export type Variant = Product["variants"][number]; 
export type ProductDescription = Product["description"];