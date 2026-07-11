import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type EmailLanguage = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

function isEmailLanguage(value: unknown): value is EmailLanguage {
  return value === "ua" || value === "ru" || value === "en";
}

function isCourseId(value: unknown): value is CourseId {
  return value === "sk" || value === "cs" || value === "pl";
}

async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        emailRemindersEnabled: true,
        emailLanguage: true,
        preferredCourse: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      emailRemindersEnabled: user.emailRemindersEnabled,
      emailLanguage: user.emailLanguage,
      preferredCourse: user.preferredCourse,
    });
  } catch (error) {
    console.error("GET /api/email-reminders failed:", error);

    return NextResponse.json(
      { error: "Could not load email reminder settings" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 },
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const enabled = payload.emailRemindersEnabled;

    if (typeof enabled !== "boolean") {
      return NextResponse.json(
        {
          error: "emailRemindersEnabled must be boolean",
        },
        { status: 400 },
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        unsubscribeToken: true,
        emailLanguage: true,
        preferredCourse: true,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    const emailLanguage = isEmailLanguage(payload.emailLanguage)
      ? payload.emailLanguage
      : isEmailLanguage(currentUser.emailLanguage)
        ? currentUser.emailLanguage
        : "ua";

    const preferredCourse = isCourseId(payload.preferredCourse)
      ? payload.preferredCourse
      : isCourseId(currentUser.preferredCourse)
        ? currentUser.preferredCourse
        : "sk";

    const unsubscribeToken =
      enabled && !currentUser.unsubscribeToken
        ? randomBytes(32).toString("hex")
        : currentUser.unsubscribeToken;

    const now = new Date();

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailRemindersEnabled: enabled,
        emailLanguage,
        preferredCourse,
        unsubscribeToken,

        ...(enabled
          ? {
              /*
               * Відлік трьох днів починається з моменту,
               * коли користувач увімкнув листи.
               */
              updatesEmailSentAt: now,

              /*
               * Після повторного ввімкнення можна знову
               * надіслати майбутнє нагадування про неактивність.
               */
              inactivityReminderSentAt: null,
            }
          : {}),
      },
      select: {
        emailRemindersEnabled: true,
        emailLanguage: true,
        preferredCourse: true,
      },
    });

    return NextResponse.json({
      success: true,
      ...updatedUser,
    });
  } catch (error) {
    console.error("PUT /api/email-reminders failed:", error);

    return NextResponse.json(
      { error: "Could not update email reminder settings" },
      { status: 500 },
    );
  }
}