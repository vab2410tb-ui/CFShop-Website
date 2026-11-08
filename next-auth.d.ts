import { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isCredentialsUser: boolean;
  phone?: string;
  address?: string;
  province?: string;
  ward?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    phone?: string | null;
    address?: string | null;
    province?: string | null;
    ward?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    isTwoFactorEnable?: boolean;
    phone?: string | null;
    address?: string | null;
    province?: string | null;
    ward?: string | null;
  }
}
