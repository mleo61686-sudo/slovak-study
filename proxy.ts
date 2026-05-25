import { auth } from "@/auth";
import { NextResponse } from "next/server";

type LoginReason = "lesson" | "practice";

function getA2LessonNumber(pathname: string) {
  const match = pathname.match(/^\/learning\/a2-(\d+)(?:\/)?$/);
  return match ? Number(match[1]) : null;
}

function isLessonPage(pathname: string) {
  return /^\/learning\/(?:a0|a1|a2|b1|b2)-\d+(?:\/)?$/.test(pathname);
}

function redirectToLogin(
  req: {
    url: string;
    nextUrl: {
      pathname: string;
      search: string;
    };
  },
  reason: LoginReason
) {
  const loginUrl = new URL("/login", req.url);

  loginUrl.searchParams.set("reason", reason);
  loginUrl.searchParams.set(
    "callbackUrl",
    req.nextUrl.pathname + req.nextUrl.search
  );

  return NextResponse.redirect(loginUrl);
}

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // 🔒 Усі конкретні уроки A0/A1/A2/B1/B2 — тільки після входу
  // Важливо: це дає гарний банер на login через reason=lesson
  if (isLessonPage(pathname) && !req.auth) {
    return redirectToLogin(req, "lesson");
  }

  // 🔒 Premium only — тренажер
  if (pathname.startsWith("/practice")) {
    if (!req.auth) {
      return redirectToLogin(req, "practice");
    }

    if (!req.auth.user?.isPremium) {
      return NextResponse.redirect(new URL("/premium", req.url));
    }
  }

  // 🔒 Premium only — B1/B2 списки рівнів
  if (
    pathname.startsWith("/learning/levels/b1") ||
    pathname.startsWith("/learning/levels/b2")
  ) {
    if (!req.auth) {
      return redirectToLogin(req, "lesson");
    }

    if (!req.auth.user?.isPremium) {
      return NextResponse.redirect(new URL("/premium", req.url));
    }
  }

  // 🔒 Premium only — A2 після 10 уроку
  const a2LessonNumber = getA2LessonNumber(pathname);
  const isPaidA2Lesson =
    typeof a2LessonNumber === "number" && a2LessonNumber > 10;

  // 🔒 Premium only — платні уроки
  if (
    isPaidA2Lesson ||
    pathname.startsWith("/learning/b1-") ||
    pathname.startsWith("/learning/b2-")
  ) {
    if (!req.auth) {
      return redirectToLogin(req, "lesson");
    }

    if (!req.auth.user?.isPremium) {
      return NextResponse.redirect(new URL("/premium", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/practice/:path*", "/learning/:path*"],
};