import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // 1) Забороняємо індексацію vercel.app і жорстко 301 на основний домен
  if (host.endsWith(".vercel.app")) {
    const target = new URL(url.pathname + url.search, "https://flunio.com");
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}

// Важливо: не чіпати _next і файли
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};