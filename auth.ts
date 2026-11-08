import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "./generated/prisma/enums";
import { getUserById } from "./data/user";
import { getTwoFactorTokenByUserId } from "./data/two-factor-confirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorTokenByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) {
          return false;
        }

        await prisma.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isCredentialsUser = token.isCredentialsUser as boolean;
      }

      return session;
    },

    async jwt({ token, user, trigger, account }) {
      // Initial login
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.isTwoFactorEnabled = user.isTwoFactorEnabled;
        token.isCredentialsUser = account?.provider === "credentials";
      }

      // Update session after profile changes
      if (trigger === "update" && token.sub) {
        const existingUser = await getUserById(token.sub);

        if (existingUser) {
          token.name = existingUser.name;
          token.email = existingUser.email;

          token.phone = existingUser.phone;
          token.address = existingUser.address;
          token.ward = existingUser.ward;
          token.province = existingUser.province;

          token.role = existingUser.role;
          token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

          token.isCredentialsUser =
            (existingUser.accounts && existingUser.accounts.length === 0) ||
            !!existingUser.password;
        }
      }

      return token;
    },
  },
});
