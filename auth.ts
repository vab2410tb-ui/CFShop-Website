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
      console.error(code, message)
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",   
  },

  events: {
    async linkAccount({user}) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()}
      })
    }
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,            

  callbacks: {               
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      
      if(!existingUser || !existingUser.emailVerified) return false;

      if(existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorTokenByUserId(existingUser.id)
        if(!twoFactorConfirmation) return false;
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id}
        });
      };
      return true;
    },

    async session({ token, session }) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }
      if(token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if(session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      return session;
    },

    async jwt({ token, user, trigger }) {
    // Run, first time login
      if (user) {
          token.role = user.role;
          token.isTwoFactorEnabled = user.isTwoFactorEnabled;
          token.sub = user.id;
          return token;
      }

      // refresh from DB update session
      if (trigger === "update" && token.sub) {
          const existingUser = await getUserById(token.sub);
          if (existingUser) {
              token.role = existingUser.role;
              token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
          }
      }

    return token;
    }
  },
})