import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type CourseId = "sk" | "cs" | "pl";

function normalizeCourseId(raw: unknown): CourseId {
  if (raw === "cs" || raw === "pl") return raw;
  return "sk";
}

async function getCourseIdFromCookie(): Promise<CourseId> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("slovakStudyActiveCourse")?.value;
  return normalizeCourseId(raw);
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const userId = session.user.id;
  const courseId = await getCourseIdFromCookie();

  try {
    const row = await prisma.srsProgress.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: {
        data: true,
        dailySession: true,
        dailyNewWords: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      ok: true,
      courseId,
      srs: row?.data ?? null,
      dailySession: row?.dailySession ?? null,
      dailyNewWords: row?.dailyNewWords ?? null,
      updatedAt: row?.updatedAt ?? null,
    });
  } catch {
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const userId = session.user.id;

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_JSON" }, { status: 400 });
  }

  const courseId = normalizeCourseId(body?.courseId) ?? (await getCourseIdFromCookie());

  const srs = body?.srs ?? {};
  const dailySession = body?.dailySession ?? null;
  const dailyNewWords = body?.dailyNewWords ?? null;

  try {
    const row = await prisma.srsProgress.upsert({
      where: { userId_courseId: { userId, courseId } },
      create: {
        userId,
        courseId,
        data: srs,
        dailySession,
        dailyNewWords,
      },
      update: {
        data: srs,
        dailySession,
        dailyNewWords,
      },
      select: { updatedAt: true },
    });

    return NextResponse.json({ ok: true, courseId, updatedAt: row.updatedAt });
  } catch {
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}