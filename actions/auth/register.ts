"use server"

import bcrypt from "bcryptjs"
import * as z from "zod";
import { RegisterSchema } from "@/schemas/index";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/auth/tokens";
import { sendVerificaitonEmail } from "@/lib/services/mail";
type RegisterValues = z.infer<typeof RegisterSchema>;

export const register = async (data: RegisterValues) => {
    const validatedFields = RegisterSchema.safeParse(data);

    if(!validatedFields.success) {
        return { error: "Invalid fields!", success: undefined}
    }
    
    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser)
        return { error: "Email already in use!"}

    await prisma.user.create({
        data: {
            name, 
            email, 
            password: hashedPassword,
        } 
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificaitonEmail(
        verificationToken.email,
        verificationToken.token,
    );
    return { success: "Confirmation email sent!", error: undefined}

}