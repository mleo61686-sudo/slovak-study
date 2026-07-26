/**
 * API route для реєстрації нового користувача у Flunio.
 *
 * Новий акаунт отримує лист підтвердження. Premium на 24 години
 * активується лише після переходу за посиланням у листі.
 */

import { randomBytes } from "crypto";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { sendEmailVerification } from "@/lib/email";
import {
  createEmailVerificationToken,
  getRequestIp,
  hashRequestIp,
  hashTrialDeviceId,
  normalizeTrialDeviceId,
  VERIFICATION_TOKEN_TTL_MS,
} from "@/lib/premium-trial";
import { prisma } from "@/lib/prisma";

type EmailLanguage = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password: string) {
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
        { ok: false, code: "CONTENT_TYPE" },
        { status: 415 },
      );
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, code: "INVALID_JSON" },
        { status: 400 },
      );
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { ok: false, code: "INVALID_JSON" },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const email = String(payload.email ?? "").trim().toLowerCase();
    const password = String(payload.password ?? "");
    const name =
      typeof payload.name === "string" && payload.name.trim()
        ? payload.name.trim()
        : null;
    const emailRemindersEnabled = payload.emailRemindersEnabled === true;
    const emailLanguage = isEmailLanguage(payload.emailLanguage)
      ? payload.emailLanguage
      : "ua";
    const preferredCourse = isCourseId(payload.preferredCourse)
      ? payload.preferredCourse
      : "sk";
    const trialDeviceId = normalizeTrialDeviceId(payload.trialDeviceId);

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, code: "MISSING_FIELDS" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, code: "INVALID_EMAIL" },
        { status: 400 },
      );
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { ok: false, code: "WEAK_PASSWORD" },
        { status: 400 },
      );
    }

    if (!trialDeviceId) {
      return NextResponse.json(
        { ok: false, code: "DEVICE_ID_REQUIRED" },
        { status: 400 },
      );
    }

    const exists = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (exists) {
      return NextResponse.json(
        { ok: false, code: "USER_EXISTS" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();
    const { token, tokenHash } = createEmailVerificationToken();
    const deviceHash = hashTrialDeviceId(trialDeviceId);
    const ipHash = hashRequestIp(getRequestIp(req));
    const expiresAt = new Date(now.getTime() + VERIFICATION_TOKEN_TTL_MS);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        emailRemindersEnabled,
        emailLanguage,
        preferredCourse,
        updatesEmailSentAt: emailRemindersEnabled ? now : null,
        unsubscribeToken: emailRemindersEnabled
          ? randomBytes(32).toString("hex")
          : null,
        verificationTokens: {
          create: {
            tokenHash,
            deviceHash,
            ipHash,
            expiresAt,
          },
        },
      },
      select: { id: true },
    });

    const appUrl = (process.env.APP_URL || "http://localhost:3000").replace(
      /\/$/,
      "",
    );
    const link = `${appUrl}/api/verify-email?token=${encodeURIComponent(token)}`;

    try {
      await sendEmailVerification(email, link, emailLanguage);
    } catch (error) {
      console.error("REGISTER VERIFICATION EMAIL ERROR:", error);
      await prisma.user.delete({ where: { id: user.id } }).catch(() => null);

      return NextResponse.json(
        { ok: false, code: "EMAIL_SEND_FAILED" },
        { status: 503 },
      );
    }

    return NextResponse.json({
      ok: true,
      verificationRequired: true,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return NextResponse.json(
      { ok: false, code: "SERVER_ERROR" },
      { status: 500 },
    );
  }
}
