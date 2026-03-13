/**
 * API route для ініціювання скидання пароля (Forgot Password).
 *
 * Що робить:
 * Приймає email, створює одноразовий reset-token і відправляє користувачу
 * лист із посиланням для зміни пароля (/reset-password?token=...).
 *
 * Як працює:
 * 1. Нормалізує email і шукає користувача у Prisma
 * 2. Видаляє старі passwordResetToken для цього userId
 * 3. Генерує новий token + tokenHash через makeResetToken()
 * 4. Зберігає tokenHash і expiresAt (30 хв)
 * 5. Відправляє email через sendResetEmail()
 *
 * Безпека:
 * Завжди повертає {ok:true}, щоб не розкривати чи існує акаунт.
 *
 * Пов’язані файли:
 * - lib/src/passwordReset.ts
 * - lib/email.ts
 * - Prisma models: user, passwordResetToken
 * - сторінка /reset-password
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { makeResetToken } from "@/lib/src/passwordReset";
import { sendResetEmail } from "@/lib/email";

export const runtime = "nodejs";

function normalizeEmail(e: string) {
  return String(e || "").trim().toLowerCase();
}

export async function POST(req: Request) {
  console.log("[forgot-password] HIT");

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const email = normalizeEmail(body?.email);
  console.log("[forgot-password] email:", email);

  // ✅ завжди ok:true, щоб не палити існування акаунта
  if (!email) return NextResponse.json({ ok: true }, { status: 200 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ ok: true }, { status: 200 });

  // ✅ тільки один активний токен
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const { token, tokenHash } = makeResetToken();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  const appUrl = (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const link = `${appUrl}/reset-password?token=${token}`;

  try {
    await sendResetEmail(email, link);
    console.log("[forgot-password] email sent");
  } catch (e) {
    console.error("[forgot-password] sendResetEmail error:", e);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}