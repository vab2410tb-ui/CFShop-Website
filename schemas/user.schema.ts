
import * as z from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().optional(),

  email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),

  phone: z.string().optional(),

  address: z.string().optional(),

  ward: z.string().optional(),

  province: z.string().optional(),

  isTwoFactorEnabled: z.boolean(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
