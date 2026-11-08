import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { verifyCredentials } from "@/lib/auth/verify-credentials"
import { LoginSchema } from "@/schemas/auth.schema";


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
                }
    }
        }),

        Credentials({
                async authorize(credentials) {
                    const validatedFields = LoginSchema.safeParse(credentials);

                    if (!validatedFields.success) {
                        return null;
                    }

                    const { email, password } = validatedFields.data;

                    const user = await verifyCredentials(
                        email,
                        password
                    );

                    if (!user) {
                        return null;
                    }

                    return user;
                },
            }),
    ],
} satisfies NextAuthConfig