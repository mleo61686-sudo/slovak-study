import { auth } from "@/auth";
import { NextResponse } from "next/server";

function isAdmin(req: any) {
  const email = req.auth?.user?.email?.toLowerCase?.() ?? "";
  const list =
    process.env.ADMIN_EMAILS?.split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean) ?? [];
  return email && list.includes(email);
}

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // 🔒 Premium only — тренажер
  if (pathname.startsWith("/practice")) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium)
      return NextResponse.redirect(new URL("/premium", req.url));
  }

  // 🚧 B1 тимчасово закритий для всіх, КРІМ адміна
  const isB1 =
    pathname.startsWith("/learning/levels/b1") ||
    pathname.startsWith("/learning/b1-");
  if (isB1 && !isAdmin(req)) {
    return NextResponse.redirect(new URL("/learning", req.url));
  }

  // 🔒 Premium only — A1 та A2 рівні (списки уроків)
  if (
    pathname.startsWith("/learning/levels/a1") ||
    pathname.startsWith("/learning/levels/a2")
  ) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium)
      return NextResponse.redirect(new URL("/premium", req.url));
  }

  // 🔒 Premium only — A1 та A2 уроки (конкретні уроки)
  if (pathname.startsWith("/learning/a1-") || pathname.startsWith("/learning/a2-")) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium)
      return NextResponse.redirect(new URL("/premium", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/practice/:path*",

    // A1/A2 premium protection (levels page + lesson pages)
    "/learning/levels/a1/:path*",
    "/learning/levels/a2/:path*",
    "/learning/a1-:path*",
    "/learning/a2-:path*",

    // B1 closed for everyone (except admin)
    "/learning/levels/b1/:path*",
    "/learning/b1-:path*",
  ],
};