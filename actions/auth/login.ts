"use server"

import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/auth.schema";
import { signIn } from "@/auth"
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { verifyCredentials } from "@/lib/auth/verify-credentials";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/auth/tokens";
import { sendTwoFactorTokenEmail, sendVerificaitonEmail } from "@/lib/services/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorTokenByUserId } from "@/data/two-factor-confirmation";


type LoginValues = z.infer<typeof LoginSchema>;

export const login = async (data: LoginValues) => {
    // Validate input
    const validatedFields = LoginSchema.safeParse(data);
    
    if(!validatedFields.success)
        return { error: "invalid fields"}

    const { email, password, code } = validatedFields.data;

    // Find user

    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Invalid email or password!"}
    }
    
    // Verify password before sending 2FA
    const verifiedUser =await verifyCredentials(email,password);

    if (!verifiedUser) {
        return {
            error: "Invalid email or password!",
        };
    }
    // Verify email
    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        )
        const emailResult = await sendVerificaitonEmail(
            verificationToken.email,
            verificationToken.token,
        );

        if (emailResult.error) {
            return { error: "Could not send the confirmation email. Please try again later." };
        }

        return { success: "Email not verified. New confirmation email sent!"}
    }

    // Two factor authentication
    if (existingUser.isTwoFactorEnabled &&  existingUser.email) {

        // User submitted OTP
        if(code) {
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

            // OTP is valid - Remove used OTP
            await prisma.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });

            // Remove old confirmation
            const existingConfirmation = await getTwoFactorTokenByUserId(existingUser.id);

            if(existingConfirmation) {
                await prisma.twoFactorConfirmation.delete({
                    where: {id : existingConfirmation.id}
                })
            };
            
            // Create new confirmation
            await prisma.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });

        // User has not entered OTP yet
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            try {
                await sendTwoFactorTokenEmail(
                    twoFactorToken.email,
                    twoFactorToken.token,
                );
            } catch (error) {
                console.error("SEND TWO-FACTOR EMAIL ERROR:", error);
                return { error: "Could not send the verification code. Please try again later." };
            }
            
            return { twoFactor: true };
        }

    }
    // Login with Auth
    try {
        await signIn("credentials", {
            email, 
            password,
            redirect: false,
        });

        const redirectPath = existingUser.role === "ADMIN" ? "/admin/products" : "/profile";

        return {
            success: "Login successful!",
            redirectPath
        }
    } catch (error) {
        if (error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        
        console.error("LOGIN_ERROR:", error);

        return {error:"Something went wrong!",};
    }
}
