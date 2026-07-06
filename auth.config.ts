
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { UserRole } from "@/generated/prisma/enums";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import Google from "next-auth/providers/google"

export default {
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    username: profile.email.split("@")[0], 
                }
    }
        }),

        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if(validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password, 
                        user.password,
                    )
                    
                    if(passwordMatch) return user;
                }
                return null;

            }
        })
    ],
    callbacks: {                          
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.isTwoFactorEnabled = user.isTwoFactorEnabled;
                if (user.email) {
                    token.username = user.email.split("@")[0];
                } 
            }
            return token;
        },
        async session({ token, session }) {
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
                
                if (token.username) {
                    session.user.username = token.username as string;
                }
            }
            return session;
        }
    }
} satisfies NextAuthConfig