/** Mission results are stored inside the existing per-course lessonsProgress JSON.
 * No migration, XP, leaderboard score or legacy lesson field changes.
 */
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getMission, gradeMission } from "@/app/learning/missions/data";
import type { Course } from "@/app/learning/personal-plan/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalize(raw: unknown): Record<string, unknown> {
  if (isObject(raw) && isObject(raw.byCourse)) {
    return { ...raw, byCourse: { ...raw.byCourse } };
  }
  // Legacy lesson progress is the Slovak course.
  return { byCourse: { sk: isObject(raw) ? raw : {}, cs: {}, pl: {} } };
}

function getSaved(raw: unknown, course: Course): Record<string, unknown> {
  const data = normalize(raw);
  const byCourse = data.byCourse as Record<string, unknown>;
  const bucket = (isObject(byCourse[course]) ? byCourse[course] : {}) as Record<string, unknown>;
  return isObject(bucket.__missions) ? bucket.__missions : {};
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

export async function POST(request: Request) {
  const user = await resolveUser();
  if (!user) return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  const body: unknown = await request.json().catch(() => null);
  if (!isObject(body) || typeof body.slug !== "string" || !isObject(body.answers)) {
    return NextResponse.json({ ok: false, code: "INVALID_BODY" }, { status: 400 });
  }
  const mission = getMission(body.slug);
  if (!mission) return NextResponse.json({ ok: false, code: "UNKNOWN_MISSION" }, { status: 404 });
  const isAdmin = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",")
    .map((e) => e.trim().toLowerCase()).includes(user.email.toLowerCase());
  if (mission.premium && !isAdmin && !(user.isPremium && (!user.premiumUntil || user.premiumUntil > new Date()))) {
    return NextResponse.json({ ok: false, code: "PREMIUM_REQUIRED" }, { status: 403 });
  }

  const validStepIds = new Set(mission.steps.filter((s) => s.kind === "choice" || s.kind === "arrange").map((s) => s.id));
  const answerEntries = Object.entries(body.answers);
  if (answerEntries.length !== validStepIds.size || answerEntries.some(([id, val]) => !validStepIds.has(id) || typeof val !== "string" || val.length > 300)) {
    return NextResponse.json({ ok: false, code: "INVALID_ANSWERS" }, { status: 400 });
  }
  const answers = Object.fromEntries(answerEntries) as Record<string, string>;
  const result = gradeMission(mission, answers);
  const now = new Date().toISOString();

  // Serializable retry prevents lost updates when lessons and missions finish together.
  let saved: Record<string, unknown> | null = null;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      saved = await prisma.$transaction(async (tx) => {
        const row = await tx.userProgress.upsert({
          where: { userId: user.id },
          create: { userId: user.id, lessonsProgress: { byCourse: { sk: {}, cs: {}, pl: {} } }, dailyCount: 0 },
          update: {},
          select: { lessonsProgress: true },
        });
        const store = normalize(row.lessonsProgress);
        const byCourse = store.byCourse as Record<string, unknown>;
        const bucket = (isObject(byCourse[mission.course]) ? byCourse[mission.course] : {}) as Record<string, unknown>;
        const history = getSaved(row.lessonsProgress, mission.course);
        const previous = history[mission.slug];
        const old = (isObject(previous) ? previous : {}) as Record<string, unknown>;
        const attempts = typeof old.attempts === "number" && Number.isSafeInteger(old.attempts) ? Math.max(0, old.attempts) : 0;
        const best = typeof old.bestPercent === "number" ? Math.min(100, Math.max(0, old.bestPercent)) : 0;
        const record = {
          done: true,
          lastPercent: result.percent,
          bestPercent: Math.max(best, result.percent),
          attempts: attempts + 1,
          mastered: old.mastered === true || result.percent >= 80,
          updatedAt: now,
        };
        const next = { ...store, byCourse: { ...byCourse, [mission.course]: { ...bucket, __missions: { ...history, [mission.slug]: record } } } };
        await tx.userProgress.update({ where: { userId: user.id }, data: { lessonsProgress: next as unknown as Prisma.InputJsonValue } });
        return record;
      }, { isolationLevel: "Serializable" });
      break;
    } catch (err: unknown) {
      if (attempt === 3 || !isObject(err) || err.code !== "P2034") throw err;
    }
  }
  return NextResponse.json({ ok: true, result, progress: saved });
}
