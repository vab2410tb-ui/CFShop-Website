import { prisma } from "@/lib/prisma";

export const getUserProfile = async (userId: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        address: true,
        ward: true,
        province: true,
        isTwoFactorEnabled: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};