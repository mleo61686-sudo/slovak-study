import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { CourseId } from "@/app/learning/courses/registry";
import { normalizeMistakeStore } from "@/app/practice/practice-mistakes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeCourseId(value: unknown): CourseId {
  return value === "cs" || value === "pl" ? value : "sk";
}

function getCourseIdFromRequest(req: Request, body?: unknown): CourseId {
  const fromQuery = new URL(req.url).searchParams.get("courseId");
  if (fromQuery === "sk" || fromQuery === "cs" || fromQuery === "pl") {
    return fromQuery;
  }

  if (body && typeof body === "object") {
    return normalizeCourseId((body as Record<string, unknown>).courseId);
  }

  return "sk";
}

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const courseId = getCourseIdFromRequest(req);

  try {
    const row = await prisma.practiceMistakeProgress.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { data: true, updatedAt: true },
    });

    const normalized = normalizeMistakeStore(row?.data ?? null, courseId);
    const data = normalizeMistakeStore(
      {
        ...normalized,
        items: normalized.items.filter((item) => item.courseId === courseId),
      },
      courseId
    );

    return NextResponse.json({
      ok: true,
      courseId,
      data,
      updatedAt: row?.updatedAt ?? null,
    });
  } catch {
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_JSON" }, { status: 400 });
  }

  const courseId = getCourseIdFromRequest(req, body);
  const rawData =
    body && typeof body === "object"
      ? (body as Record<string, unknown>).data
      : null;
  const normalized = normalizeMistakeStore(rawData, courseId);
  const data = normalizeMistakeStore(
    {
      ...normalized,
      items: normalized.items.filter((item) => item.courseId === courseId),
    },
    courseId
  );

  if (JSON.stringify(data).length > 750_000) {
    return NextResponse.json({ ok: false, code: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  try {
    const row = await prisma.practiceMistakeProgress.upsert({
      where: { userId_courseId: { userId, courseId } },
      create: { userId, courseId, data },
      update: { data },
      select: { updatedAt: true },
    });

    return NextResponse.json({
      ok: true,
      courseId,
      updatedAt: row.updatedAt,
    });
  } catch {
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}
