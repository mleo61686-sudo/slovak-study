import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // 🔒 Premium only — тренажер
  if (pathname.startsWith("/practice")) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium)
      return NextResponse.redirect(new URL("/premium", req.url));
  }

  // 🔒 Premium only — A1, A2, B1 рівні (списки уроків)
  if (
    pathname.startsWith("/learning/levels/a1") ||
    pathname.startsWith("/learning/levels/a2") ||
    pathname.startsWith("/learning/levels/b1")
  ) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium)
      return NextResponse.redirect(new URL("/premium", req.url));
  }

  // 🔒 Premium only — A1, A2, B1 уроки (конкретні уроки)
  if (
    pathname.startsWith("/learning/a1-") ||
    pathname.startsWith("/learning/a2-") ||
    pathname.startsWith("/learning/b1-")
  ) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium)
      return NextResponse.redirect(new URL("/premium", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/practice/:path*",

    // Premium protection (levels pages)
    "/learning/levels/a1/:path*",
    "/learning/levels/a2/:path*",
    "/learning/levels/b1/:path*",

    // Premium protection (lesson pages)
    "/learning/a1-:path*",
    "/learning/a2-:path*",
    "/learning/b1-:path*",
  ],
};