"use server";

import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { getVerrificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerrificationTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Token does not exist!",
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Token has expired!",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {
            error: "Email does not exist!",
        };
    }

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
        },
    });

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return {
        success: "Email verified!",
    };
};

