import { type DefaultSession} from "next-auth";
import { UserRole } from "./generated/prisma/enums";

export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    role: UserRole;
    username: string;
    isTwoFactorEnabled: boolean;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }

    interface User {
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    isTwoFactorEnable?: boolean;
  }
}