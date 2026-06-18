import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

function isAdminEmail(email?: string | null) {
  if (!email) return false;

  const raw = process.env.ADMIN_EMAILS ?? "";

  const list = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  return list.includes(email.toLowerCase());
}

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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name ?? null;
      }

      if (trigger === "update" && session?.user?.name) {
        token.name = session.user.name;
      }

      const email = typeof token.email === "string" ? token.email : null;
      token.isAdmin = isAdminEmail(email);

      if (!token.id) {
        token.isPremium = false;
        token.premiumUntil = null;
        token.premiumCheckedAt = 0;
        return token;
      }

      const now = Date.now();
      const last = (token.premiumCheckedAt as number | undefined) ?? 0;
      const REFRESH_EVERY_MS = 15 * 60 * 1000;

      // Важливо для Stripe checkout:
      // useSession().update() має обходити 15-хвилинний кеш JWT.
      // Інакше webhook вже оновив БД, але session ще бачить isPremium=false.
      const shouldRefreshPremium =
        trigger === "update" || !last || now - last >= REFRESH_EVERY_MS;

      if (!shouldRefreshPremium) return token;

      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { isPremium: true, premiumUntil: true },
        });

        const premiumUntil = dbUser?.premiumUntil ?? null;
        const isPremium =
          dbUser?.isPremium === true &&
          (!premiumUntil || premiumUntil > new Date());

        token.isPremium = isPremium;
        token.premiumUntil = premiumUntil;
        token.premiumCheckedAt = now;
      } catch {
        token.isPremium = Boolean(token.isPremium);
        token.premiumUntil = (token.premiumUntil as any) ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = typeof token.name === "string" ? token.name : null;
        session.user.email = typeof token.email === "string" ? token.email : "";
        session.user.isPremium = Boolean(token.isPremium);
        session.user.premiumUntil = token.premiumUntil as Date | null;
        session.user.isAdmin = Boolean(token.isAdmin);
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});