"use server"

import { prisma } from "@/lib/prisma"

export const deleteUser = async (id: string) => {
        try {
            await prisma.user.delete({
              where: { id }
            });
            return { success: true };
          } catch (error) {
            console.error("Delete failed:", error);
            return { error: "Failed to delete User!" };
          }
}