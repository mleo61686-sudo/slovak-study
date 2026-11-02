/** Story scores: server-authoritative comprehension checks, separate from XP
 * and legacy lessons. Stored under byCourse[course].__stories, no DB migration.
 */
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getStory, gradeStory } from "@/app/learning/stories/data";
import type { Course } from "@/app/learning/personal-plan/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function object(raw: unknown): raw is Record<string, unknown> { return !!raw && typeof raw === "object" && !Array.isArray(raw); }
function normalize(raw: unknown): Record<string, unknown> {
  return object(raw) && object(raw.byCourse) ? { ...raw, byCourse: { ...raw.byCourse } } :
    { byCourse: { sk: object(raw) ? raw : {}, cs: {}, pl: {} } };
}
function getSaved(raw: unknown, course: Course): Record<string, unknown> {
  const store = normalize(raw);
  const courses = store.byCourse as Record<string, unknown>;
  const bucket = (object(courses[course]) ? courses[course] : {}) as Record<string, unknown>;
  return object(bucket.__stories) ? bucket.__stories : {};
}
async function resolveUser() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  return prisma.user.findUnique({ where: { email }, select: { id: true, email: true, isPremium: true, premiumUntil: true } });
}
export async function GET(request: Request) {
  const course = request ? new URL(request.url).searchParams.get("course") || "sk" : "sk";
  if (course !== "sk" && course !== "cs" && course !== "pl") return NextResponse.json({ ok: false, code: "INVALID_COURSE" }, { status: 400 });
  const user = await resolveUser();
  if (!user) return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  const row = await prisma.userProgress.findUnique({ where: { userId: user.id }, select: { lessonsProgress: true } });
  return NextResponse.json({ ok: true, progress: getSaved(row?.lessonsProgress, course) }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(req: Request) {
  const user = await resolveUser();
  if (!user) return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  const raw: unknown = await req.json().catch(() => null);
  if (!object(raw) || typeof raw.slug !== "string" || !object(raw.selections)) {
    return NextResponse.json({ ok: false, code: "INVALID_BODY" }, { status: 400 });
  }
  const story = getStory(raw.slug);
  if (!story) return NextResponse.json({ ok: false, code: "UNKNOWN_STORY" }, { status: 404 });
  const isAdmin = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).includes(user.email.toLowerCase());
  const premium = user.isPremium && (!user.premiumUntil || user.premiumUntil > new Date());
  if (story.premium && !isAdmin && !premium) return NextResponse.json({ ok: false, code: "PREMIUM_REQUIRED" }, { status: 403 });

  const entries = Object.entries(raw.selections);
  if (entries.length > 24 || entries.some(([id, value]) => id.length > 60 || typeof value !== "string" || value.length > 80)) {
    return NextResponse.json({ ok: false, code: "INVALID_ANSWERS" }, { status: 400 });
  }
  const selections = Object.fromEntries(entries) as Record<string, string>;
  const graded = gradeStory(story, selections);
  if (!graded) return NextResponse.json({ ok: false, code: "INVALID_PATH" }, { status: 400 });
  const now = new Date().toISOString();

  let record: Record<string, unknown> | null = null;
  for (let retry = 0; retry < 4; retry++) {
    try {
      record = await prisma.$transaction(async tx => {
        const row = await tx.userProgress.upsert({
          where: { userId: user.id },
          create: { userId: user.id, lessonsProgress: { byCourse: { sk: {}, cs: {}, pl: {} } }, dailyCount: 0 },
          update: {}, select: { lessonsProgress: true },
        });
        const store = normalize(row.lessonsProgress);
        const courses = store.byCourse as Record<string, unknown>;
        const bucket = (object(courses[story.course]) ? courses[story.course] : {}) as Record<string, unknown>;
        const saved = getSaved(row.lessonsProgress, story.course);
        const previous = saved[story.slug];
        const old = (object(previous) ? previous : {}) as Record<string, unknown>;
        const oldAttempts = typeof old.attempts === "number" && Number.isSafeInteger(old.attempts) ? Math.max(0, old.attempts) : 0;
        const oldBest = typeof old.bestPercent === "number" && Number.isFinite(old.bestPercent) ? Math.max(0, Math.min(100, old.bestPercent)) : 0;
        const nextRecord = {
          done: true, attempts: oldAttempts + 1, lastPercent: graded.percent,
          bestPercent: Math.max(oldBest, graded.percent),
          mastered: old.mastered === true || graded.percent >= 80, updatedAt: now,
        };
        const next = { ...store, byCourse: { ...courses, [story.course]: { ...bucket, __stories: { ...saved, [story.slug]: nextRecord } } } };
        await tx.userProgress.update({ where: { userId: user.id }, data: { lessonsProgress: next as unknown as Prisma.InputJsonValue } });
        return nextRecord;
      }, { isolationLevel: "Serializable" });
      break;
    } catch (error: unknown) {
      if (retry === 3 || !object(error) || error.code !== "P2034") throw error;
    }
  }
  return NextResponse.json({ ok: true, graded: { correct: graded.correct, total: graded.total, percent: graded.percent }, progress: record });
}
