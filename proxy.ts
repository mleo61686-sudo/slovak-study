import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // 🔒 Premium only — тренажер
  if (pathname.startsWith("/practice")) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!req.auth.user?.isPremium) {
      return NextResponse.redirect(new URL("/premium", req.url));
    }
  }

  // 🔒 Premium only — A1 та A2 рівні
  if (
    pathname.startsWith("/learning/levels/a1") ||
    pathname.startsWith("/learning/levels/a2")
  ) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!req.auth.user?.isPremium) {
      return NextResponse.redirect(new URL("/premium", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/practice/:path*",
    "/learning/levels/a1/:path*",
    "/learning/levels/a2/:path*",
  ],
};
