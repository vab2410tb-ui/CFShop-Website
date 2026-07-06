import { prisma } from "@/lib/prisma";

export const getTwoFactorTokenByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmaiton = await prisma.twoFactorConfirmation.findUnique({
            where: {userId}
        });
        return twoFactorConfirmaiton;
    } catch {
        return null;
    }
}