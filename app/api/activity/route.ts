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

export async function POST(request: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email?.trim();

    if (!email) {
      return NextResponse.json(
        {
          ok: false,
          code: "UNAUTHORIZED",
        },
        {
          status: 401,
        },
      );
    }

    let body: unknown = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const payload =
      typeof body === "object" &&
      body !== null &&
      !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : {};

    const emailLanguage = isEmailLanguage(payload.emailLanguage)
      ? payload.emailLanguage
      : null;

    const preferredCourse = isCourseId(payload.preferredCourse)
      ? payload.preferredCourse
      : null;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          code: "USER_NOT_FOUND",
        },
        {
          status: 404,
        },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastActiveAt: new Date(),

        /*
         * Користувач повернувся — стара серія
         * неактивності завершилася.
         */
        inactivityReminderSentAt: null,

        ...(emailLanguage
          ? {
              emailLanguage,
            }
          : {}),

        ...(preferredCourse
          ? {
              preferredCourse,
            }
          : {}),
      },
      select: {
        lastActiveAt: true,
        emailLanguage: true,
        preferredCourse: true,
      },
    });

    return NextResponse.json({
      ok: true,
      ...updatedUser,
    });
  } catch (error) {
    console.error("POST /api/activity failed:", error);

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