import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email:string) => {
    try{
        const user = await prisma.user.findUnique({ where: {email}});
        return user
    } catch {
        return null
    }
}

export const getUserById = async (
    id: string | undefined | null
) => {
    try {
        if (!id) return null;

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                accounts: {
                    select: {
                        provider: true,
                    },
                },
            },
        });

        if (!user) {
            return null;
        }

        const isCredentialsUser = user.accounts.length === 0 || !!user.password;

        return {
            ...user,
            isCredentialsUser,
        };
    } catch {
        return null;
    }
};