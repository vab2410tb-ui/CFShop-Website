import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return getUserById(session.user.id);
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};