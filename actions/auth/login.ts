"use server"

import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/index";
import { signIn } from "@/auth"
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/auth/tokens";
import { sendTwoFactorTokenEmail, sendVerificaitonEmail } from "@/lib/services/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorTokenByUserId } from "@/data/two-factor-confirmation";


type LoginValues = z.infer<typeof LoginSchema>;

export const login = async (data: LoginValues) => {
    const validatedFields = LoginSchema.safeParse(data);
    
    if(!validatedFields.success)
        return { error: "invalid fields"}

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exits!"}
    }

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        )
        await sendVerificaitonEmail(
            verificationToken.email,
            verificationToken.token,
        );
        return { success: "Confirmation email sent!"}
    }

    if (existingUser.isTwoFactorEnabled &&  existingUser.email) {
        if(code) {
            // TODO: verify code
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email
            );

            if(!twoFactorToken) {
                return { error: "Invalid code!"}
            }

            if(twoFactorToken.token !== code) {
                return { error: "Invalid code!"}
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if(hasExpired) {
                return { error: "Code expired!"}
            };

            await prisma.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });

            const existingConfirmation = await getTwoFactorTokenByUserId(existingUser.id);

            if(existingConfirmation) {
                await prisma.twoFactorConfirmation.delete({
                    where: {id : existingConfirmation.id}
                })
            };

            await prisma.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });


        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            );
            
            return { twoFactor: true };
        }

    }

    try {
        const redirectPath = existingUser.role === "ADMIN" ? "/admin/product" : "/settings";

        await signIn("credentials", {
            email, 
            password,
            redirectTo: redirectPath
        });
    } catch (error) {
        if (error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        
        throw error;
    }
}