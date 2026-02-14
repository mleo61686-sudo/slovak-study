import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      isPremium?: boolean;
      premiumUntil?: Date | null;
    };
  }

  interface User {
    id: string;
    isPremium?: boolean;
    premiumUntil?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isPremium?: boolean;
    premiumUntil?: Date | null;
  }
}
