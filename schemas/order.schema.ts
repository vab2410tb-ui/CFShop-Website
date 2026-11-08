
import * as z from "zod";
import { PaymentMethod } from "@prisma/client";

export const OrderSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name")
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .regex(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, "Invalid phone number"),

  address: z
    .string()
    .trim()
    .min(1, "Please enter your address")
    .min(2, "Address is too short"),

  ward: z
    .string()
    .trim()
    .min(1, "Please enter your ward")
    .min(5, "Ward name is too short"),

  province: z
    .string()
    .trim()
    .min(1, "Please enter your province/city")
    .min(5, "Province/city name is too short"),

  note: z.string().optional(),
});

export const CreateOrderSchema = z.object({
  shippingInfo: OrderSchema,

  orderItems: z
    .array(
      z.object({
        productId: z.string(),

        quantity: z.number().int().positive(),

        color: z.string().optional(),
      }),
    )
    .min(1, "Order must contain at least one item"),

  paymentMethod: z.preprocess(
    (val) => (typeof val === "string" ? val.toUpperCase() : val),
    z.nativeEnum(PaymentMethod),
  ),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type OrderFormData = z.infer<typeof OrderSchema>;
