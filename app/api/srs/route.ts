/**
 * ⚠️ CRITICAL FILE — SRS PROGRESS SYNC (НЕ ЛАМАТИ БЕЗ РОЗУМІННЯ)
 *
 * Цей файл відповідає за синхронізацію SRS (повторення слів) між:
 * - браузером (localStorage)
 * - сервером (Prisma / база даних)
 *
 * ЩО САМЕ ТУТ ЗБЕРІГАЄТЬСЯ:
 * - srs (інтервали, повторення, алгоритм)
 * - dailySession (сьогоднішня сесія)
 * - dailyNewWords (нові слова за день)
 * - updatedAt (для синхронізації)
 *
 * ЯК ПРАЦЮЄ:
 * - GET → віддає SRS з БД
 * - PUT → перезаписує SRS у БД (source of truth = клієнт)
 * - курс визначається через:
 *    1. URL (?courseId=)
 *    2. body
 *    3. cookie (fallback)
 *
 * ⚠️ ДУЖЕ ВАЖЛИВО:
 *
 * ❌ НЕ МІНЯТИ структуру `srs`, `dailySession`, `dailyNewWords`
 * ❌ НЕ МІНЯТИ ключ userId_courseId (це composite key)
 * ❌ НЕ видаляти updatedAt (потрібен для sync логіки)
 *
 * ❌ НЕ робити merge логіку тут без повного контролю
 *    → зараз модель: "клієнт перезаписує сервер"
 *
 * ❌ НЕ міняти спосіб визначення courseId без перевірки всього SrsSync
 *
 * ⚠️ Якщо зламати цей файл:
 * - користувачі можуть втратити повторення слів
 * - SRS може “відкотитись назад”
 * - різні пристрої будуть мати різні дані
 *
 * ✅ ПІСЛЯ БУДЬ-ЯКИХ ЗМІН ТУТ ОБОВʼЯЗКОВО:
 * 1. npm run build
 * 2. перевір:
 *    - ПК → зробив повторення
 *    - мобілка → підтягнуло
 *
 * Пов’язані критичні файли:
 * - app/components/SrsSync.tsx
 * - prisma/schema.prisma (model SrsProgress)
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type CourseId = "sk" | "cs" | "pl";

function isCourseId(raw: unknown): raw is CourseId {
  return raw === "sk" || raw === "cs" || raw === "pl";
}

function normalizeCourseId(raw: unknown): CourseId {
  if (isCourseId(raw)) return raw;
  return "sk";
}

async function getCourseIdFromCookie(): Promise<CourseId> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("slovakStudyActiveCourse")?.value;
  return normalizeCourseId(raw);
}

async function getCourseIdFromRequest(req: Request, body?: any): Promise<CourseId> {
  const url = new URL(req.url);
  const queryCourseId = url.searchParams.get("courseId");

  if (isCourseId(queryCourseId)) return queryCourseId;
  if (isCourseId(body?.courseId)) return body.courseId;

  return getCourseIdFromCookie();
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const userId = session.user.id;
  const courseId = await getCourseIdFromRequest(req);

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

  const courseId = await getCourseIdFromRequest(req, body);

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