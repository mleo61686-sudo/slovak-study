/**
 * API route для реєстрації нового користувача у Flunio.
 *
 * Що робить:
 * Приймає email, password, optional name та згоду на листи,
 * валідовує дані, перевіряє чи користувач уже існує,
 * хешує пароль і створює користувача у Prisma.
 *
 * Пов’язані файли:
 * - сторінка /register і її form submit
 * - auth.ts / NextAuth credentials login
 * - lib/prisma.ts
 * - Prisma model User
 */

import { randomBytes } from "crypto";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type EmailLanguage = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password: string) {
  // Мінімум: 8 символів + 1 цифра + 1 велика літера
  return (
    password.length >= 8 &&
    /\d/.test(password) &&
    /[A-ZÀ-Ý]/.test(password)
  );
}

function isEmailLanguage(value: unknown): value is EmailLanguage {
  return value === "ua" || value === "ru" || value === "en";
}

function isCourseId(value: unknown): value is CourseId {
  return value === "sk" || value === "cs" || value === "pl";
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          ok: false,
          code: "CONTENT_TYPE",
        },
        {
          status: 415,
        },
      );
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_JSON",
        },
        {
          status: 400,
        },
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_JSON",
        },
        {
          status: 400,
        },
      );
    }

    const payload = body as Record<string, unknown>;

    const email = String(payload.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(payload.password ?? "");

    const name =
      typeof payload.name === "string" && payload.name.trim()
        ? payload.name.trim()
        : null;

    const emailRemindersEnabled =
      payload.emailRemindersEnabled === true;

    const emailLanguage = isEmailLanguage(payload.emailLanguage)
      ? payload.emailLanguage
      : "ua";

    const preferredCourse = isCourseId(payload.preferredCourse)
      ? payload.preferredCourse
      : "sk";

    if (!email || !password) {
      return NextResponse.json(
        {
          ok: false,
          code: "MISSING_FIELDS",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_EMAIL",
        },
        {
          status: 400,
        },
      );
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        {
          ok: false,
          code: "WEAK_PASSWORD",
        },
        {
          status: 400,
        },
      );
    }

    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          ok: false,
          code: "USER_EXISTS",
        },
        {
          status: 409,
        },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();

    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,

        emailRemindersEnabled,
        emailLanguage,
        preferredCourse,

        /*
         * Якщо користувач погодився на листи,
         * перший лист про оновлення буде можливий через 3 дні.
         */
        updatesEmailSentAt: emailRemindersEnabled ? now : null,

        unsubscribeToken: emailRemindersEnabled
          ? randomBytes(32).toString("hex")
          : null,
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return NextResponse.json(
      {
        ok: false,
        code: "SERVER_ERROR",
      },
      {
        status: 500,
      },
    );
  }
}