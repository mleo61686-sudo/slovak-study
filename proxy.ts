import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // якщо користувач НЕ залогінений — кидаємо на /login
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/grammar/:path*", "/dictionary/:path*", "/practice/:path*"],
};
