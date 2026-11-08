
import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),

  code: z.string().optional(),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

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
      message: "Please enter a valid email address",
    }),

    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),

    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),

    name: z.string().min(3, {
      message: "Name must be at least 3 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ResetInput = z.infer<typeof ResetSchema>;
export type NewPasswordInput = z.infer<typeof NewPasswordSchema>;
