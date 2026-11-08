"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"
import { UpdateUserSchema, UpdateUserInput } from "@/schemas/user.schema";

export const updateUser = async ( data:UpdateUserInput) => {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    
    const validated = UpdateUserSchema.safeParse(data);

    if (!validated.success) {
        return {
            error: validated.error.issues[0].message,
        };
    }
    const user = validated.data;

    const updatedUser = await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: user
    });

    return {
        success: true,
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            ward: updatedUser.ward,
            isTwoFactorEnabled: data.isTwoFactorEnabled,
        },
    };
};