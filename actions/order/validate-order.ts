"use server";

import { OrderSchema } from "@/schemas/order.schema";
import * as z from "zod";

type OrderValues = z.infer<typeof OrderSchema>;

export const validateOrder = async (data: OrderValues) => {
  const validatedFields = OrderSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false as const,
      error: "Invalid Field!",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {
    success: true as const,
    data: validatedFields.data,
  };
};

