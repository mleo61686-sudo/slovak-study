import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      isPremium?: boolean;
      premiumUntil?: Date | null;
      isAdmin?: boolean;
    };
  }

  interface User {
    id: string;
    isPremium?: boolean;
    premiumUntil?: Date | null;
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    isPremium?: boolean;
    premiumUntil?: Date | null;
    premiumCheckedAt?: number;
    isAdmin?: boolean;
  }
}