/**
 * NextAuth API endpoint для аутентифікації у Flunio.
 *
 * Окремо перехоплюємо старі посилання /api/auth/verify-email,
 * щоб уже надіслані листи не потрапляли в catch-all NextAuth.
 */
import { handlers } from "@/auth";
import { handleEmailVerification } from "@/lib/email-verification";

export const GET = async (...args: Parameters<typeof handlers.GET>) => {
  const req = args[0];
  const pathname = new URL(req.url).pathname.replace(/\/$/, "");

  if (pathname === "/api/auth/verify-email") {
    return handleEmailVerification(req);
  }

  return handlers.GET(...args);
};

export const POST = handlers.POST;
