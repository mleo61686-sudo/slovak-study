import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // 1) при логіні записуємо id
      if (user) {
        token.id = user.id;
      }

      // 2) якщо є id — підтягнути premium з БД
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            isPremium: true,
            premiumUntil: true,
          },
        });

        token.isPremium = dbUser?.isPremium ?? false;
        token.premiumUntil = dbUser?.premiumUntil ?? null;
      } else {
        token.isPremium = false;
        token.premiumUntil = null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isPremium = Boolean(token.isPremium);
        session.user.premiumUntil = token.premiumUntil as Date | null;
      }

      return session;
    },
  },



  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
