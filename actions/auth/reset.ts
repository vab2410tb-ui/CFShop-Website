"use server"

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/auth/tokens";
import { sendPasswordResetEmail } from "@/lib/services/mail";

export const reset = async (data: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(data);

    if(!validatedFields.success) {
        return {error: "invalid email!"}
    }

    const { email } = validatedFields.data;

    const existingUser  = await getUserByEmail(email)

    if(!existingUser) {
        return {error: "Email not found!"}
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    );


    return {success: "Reset email sent!"}
}