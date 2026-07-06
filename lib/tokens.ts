import crypto from "crypto"
import { v4 as uuid } from "uuid";
import { prisma } from "./prisma";
import { getVerrificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    // TODO: Later change to 5 mimutes
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken) {
        await prisma.twoFactorToken.delete({
            
            where: {
                id: existingToken.id,
            }
        });
    }

    const twoFactorToken = await prisma.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return twoFactorToken;
}
export const generatePasswordResetToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const exstingToken = await getPasswordResetTokenByEmail(email);

    if(exstingToken) {
        await prisma.passwordResetToken.delete({
            where: { id: exstingToken.id}
        });
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken;

}

export const generateVerificationToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerrificationTokenByEmail(email)

    if(existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            },
        });
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return verificationToken;
}