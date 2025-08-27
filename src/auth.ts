import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "./generated/prisma/index";
import Resend from "next-auth/providers/resend";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Resend,
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Runs once at sign in
      if (user) {
        token.id = user.id;
      }

      // Save provider's access_token (e.g. Google, GitHub)
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }

      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }

      return session; // 👈 must return
    },
  },
  secret: process.env.AUTH_SECRET,
});
