import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { verifyLoginTicket } from "@/lib/login-ticket";

import { authConfig } from "./auth.config";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },

        loginTicket: {
          label: "Login Ticket",
          type: "text",
        },
      },

      async authorize(credentials) {
        /**
         * Login Ticket
         */
        if (credentials?.loginTicket) {
          const payload = await verifyLoginTicket(
            String(credentials.loginTicket)
          );

          if (!payload) {
            return null;
          }

          const user =
            await prisma.user.findUnique({
              where: {
                id: payload.userId,
              },
            });

          return user;
        }

        /**
         * Email + Password
         */
        const email = String(
          credentials?.email ?? ""
        )
          .trim()
          .toLowerCase();

        const password = String(
          credentials?.password ?? ""
        );

        if (!email || !password) {
          return null;
        }

        const user =
          await prisma.user.findUnique({
            where: {
              email,
            },
          });

        if (!user) {
          return null;
        }

        const passwordsMatch =
          await bcrypt.compare(
            password,
            user.passwordHash
          );

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const user =
        await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
        });

      if (!user) {
        return token;
      }

      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;

      token.emailVerified =
        user.emailVerified;

      token.isTwoFactorEnabled =
        user.isTwoFactorEnabled;

      return token;
    },

    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.id =
          token.id as string;

        session.user.name =
          token.name as string;

        session.user.email =
          token.email as string;

        session.user.image =
          token.picture as string | null;

        session.user.emailVerified =
          token.emailVerified as Date | null;

        session.user.isTwoFactorEnabled =
          token.isTwoFactorEnabled as boolean;
      }

      return session;
    },
  },
});