/**
 * API route для реєстрації нового користувача у Slovak Study.
 *
 * Що робить:
 * Приймає email, password і optional name, валідовує їх,
 * перевіряє чи користувач уже існує, хешує пароль і створює user у Prisma.
 *
 * Як працює:
 * Перевіряє content-type, парсить JSON, валідовує email і силу пароля
 * (мінімум 8 символів, цифра, велика літера), після чого через bcrypt
 * створює passwordHash і зберігає нового користувача в базі.
 *
 * Пов’язані файли:
 * - сторінка /register і її form submit
 * - auth.ts / NextAuth credentials login
 * - lib/prisma.ts
 * - Prisma model: user
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password: string) {
  // мінімум: 8 символів + 1 цифра + 1 велика літера
  return (
    password.length >= 8 &&
    /\d/.test(password) &&
    /[A-ZÀ-Ý]/.test(password) // базово для латиниці з діакритикою
  );
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, code: "CONTENT_TYPE" },
        { status: 415 }
      );
    }

    let body: any = null;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, code: "INVALID_JSON" }, { status: 400 });
    }

    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");
    const name = body?.name ? String(body.name).trim() : null;

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, code: "MISSING_FIELDS" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, code: "INVALID_EMAIL" },
        { status: 400 }
      );
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { ok: false, code: "WEAK_PASSWORD" },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { ok: false, code: "USER_EXISTS" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, name, passwordHash },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { ok: false, code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}