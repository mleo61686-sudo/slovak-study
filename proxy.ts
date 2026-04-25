import { auth } from "@/auth";
import { NextResponse } from "next/server";

// helper для A2
function getA2LessonNumber(pathname: string) {
  const match = pathname.match(/^\/learning\/a2-(\d+)(?:\/)?$/);
  return match ? Number(match[1]) : null;
}

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // 🔒 Premium only — тренажер
  if (pathname.startsWith("/practice")) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium) {
      return NextResponse.redirect(new URL("/premium", req.url));
    }
  }

  // 🔒 Premium only — B1/B2 списки рівнів
  if (
    pathname.startsWith("/learning/levels/b1") ||
    pathname.startsWith("/learning/levels/b2")
  ) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium) {
      return NextResponse.redirect(new URL("/premium", req.url));
    }
  }

  // 🔒 Premium only — A2 після 10 уроку
  const a2LessonNumber = getA2LessonNumber(pathname);
  const isPaidA2Lesson =
    typeof a2LessonNumber === "number" && a2LessonNumber > 10;

  // 🔒 Premium only — уроки
  if (
    isPaidA2Lesson ||
    pathname.startsWith("/learning/b1-") ||
    pathname.startsWith("/learning/b2-")
  ) {
    if (!req.auth) return NextResponse.redirect(new URL("/login", req.url));
    if (!req.auth.user?.isPremium) {
      return NextResponse.redirect(new URL("/premium", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/practice/:path*",

    // списки рівнів
    "/learning/levels/a2/:path*",
    "/learning/levels/b1/:path*",
    "/learning/levels/b2/:path*",

    // уроки
    "/learning/a2-:path*",
    "/learning/b1-:path*",
    "/learning/b2-:path*",
  ],
};