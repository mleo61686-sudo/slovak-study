import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LevelClient from "./LevelClient";
import { getLessonsByBand, type CourseId } from "../courses/registry";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type LessonsProgress = Record<string, any>;

const FREE_A2_LESSONS = 10;

function getLessonFromLessonsByBand(lessonsByBand: Record<string, any[]>, id: string) {
  const raw = String(id).toLowerCase();
  const m = /^(a0|a1|a2|b1|b2)-(\d+)$/.exec(raw);
  if (!m) return null;

  const band = m[1];
  const n = Number(m[2]);

  const list = lessonsByBand[band] ?? [];
  return list[n - 1] ?? null;
}

const BAND_LIMITS: Record<string, number> = {
  a0: 30,
  a1: 40,
  a2: 50,
  b1: 35,
  b2: 50,
};

function parseLevelId(id: string) {
  const m = /^([a-z]\d)-(\d+)$/.exec(id.toLowerCase());
  if (!m) return null;
  return { band: m[1], n: Number(m[2]) };
}

function isPremiumLevel(id: string) {
  const parsed = parseLevelId(id);
  if (!parsed) return false;

  if (parsed.band === "b1" || parsed.band === "b2") return true;
  if (parsed.band === "a2" && parsed.n > FREE_A2_LESSONS) return true;

  return false;
}
function isFreeStarterUnlimitedLesson(id: string) {
  const parsed = parseLevelId(id);
  return parsed?.band === "a0" && parsed.n >= 1 && parsed.n <= 10;
}

function bandOrder(band: string) {
  const m = /^([ab])(\d)$/.exec(band.toLowerCase());
  if (!m) return 0;

  const letter = m[1];
  const n = Number(m[2]);

  if (letter === "a") return n;
  if (letter === "b") return 10 + n;
  return 0;
}

function compareLevel(a: string, b: string) {
  const pa = parseLevelId(a);
  const pb = parseLevelId(b);
  if (!pa || !pb) return 0;

  const ba = bandOrder(pa.band);
  const bb = bandOrder(pb.band);
  if (ba !== bb) return ba < bb ? -1 : 1;

  if (pa.n === pb.n) return 0;
  return pa.n < pb.n ? -1 : 1;
}

function nextLevelId(id: string) {
  const p = parseLevelId(id);
  if (!p) return id;

  const limit = BAND_LIMITS[p.band];

  if (p.band === "a0" && Number.isFinite(p.n) && p.n >= (limit ?? 30)) return "a1-1";
  if (p.band === "a1" && Number.isFinite(p.n) && p.n >= (limit ?? 40)) return "a2-1";
  if (p.band === "a2" && Number.isFinite(p.n) && p.n >= (limit ?? 50)) return "b1-1";
  if (p.band === "b1" && Number.isFinite(p.n) && p.n >= (limit ?? 35)) return "b2-1";

  return `${p.band}-${p.n + 1}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDone(lp: LessonsProgress | null | undefined, id: string) {
  if (!lp || typeof lp !== "object") return false;
  const v = (lp as any)[id] ?? (lp as any)[id.toLowerCase()];
  return v === true || (v && typeof v === "object" && (v as any).done === true);
}

/**
 * SAFE для FREE:
 * рахуємо прогрес тільки послідовно: a0-1, a0-2, ... поки done.
 * перший не-done = стоп. повертаємо останній done.
 */
function getLastDoneSequential(
  lp: LessonsProgress | null | undefined,
  lessonsByBand: Record<string, any[]>
) {
  let current = "a0-1";
  let lastDone: string | null = null;

  for (let i = 0; i < 10000; i++) {
    const lesson = getLessonFromLessonsByBand(lessonsByBand, current);
    if (!lesson) break;

    if (!isDone(lp, current)) break;

    lastDone = current;

    const next = nextLevelId(current);
    if (next === current) break;

    current = next;
  }

  return lastDone;
}

/**
 * MAX done (можна лишити для premium / діагностики)
 */
function getLastDoneMax(lp: LessonsProgress | null | undefined) {
  if (!lp || typeof lp !== "object") return null;

  let best: string | null = null;

  for (const [idRaw, val] of Object.entries(lp)) {
    const id = String(idRaw).toLowerCase();
    const p = parseLevelId(id);
    if (!p) continue;

    const done =
      val === true || (val && typeof val === "object" && (val as any).done === true);

    if (!done) continue;

    if (!best) {
      best = id;
      continue;
    }

    if (compareLevel(id, best) === 1) best = id;
  }

  return best;
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelIdRaw } = await params;
  const levelId = String(levelIdRaw).toLowerCase();

  const cookieStore = await cookies();
  const cookieCourse = cookieStore.get("slovakStudyActiveCourse")?.value as CourseId | undefined;

  const activeCourseId: CourseId =
    cookieCourse === "cs" || cookieCourse === "sk" || cookieCourse === "pl"
      ? cookieCourse
      : "sk";

  const lessonsByBand = getLessonsByBand(activeCourseId);

  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      isPremium: true,
      premiumUntil: true,
    },
  });
  if (!user) redirect("/login");

  const hasPremium =
    user.isPremium && (!user.premiumUntil || user.premiumUntil > new Date());

  if (!hasPremium && isPremiumLevel(levelId)) {
    redirect("/premium");
  }

  const row = await prisma.userProgress.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      lessonsProgress: {},
      dailyCount: 0,
      dailyDate: null,
      lastUnlockedLevel: null,
    },
    select: {
      lastUnlockedLevel: true,
      dailyDate: true,
      dailyCount: true,
      lessonsProgress: true,
    },
  });

  const lp = (row.lessonsProgress ?? {}) as any;

  let lastUnlockedLevel = row.lastUnlockedLevel;

  if (!lastUnlockedLevel) {
    const recovered = hasPremium
      ? getLastDoneMax(lp)
      : getLastDoneSequential(lp, lessonsByBand);

    if (recovered) {
      lastUnlockedLevel = recovered;

      await prisma.userProgress.update({
        where: { userId: user.id },
        data: { lastUnlockedLevel: recovered },
      });
    }
  }

  const allowed = lastUnlockedLevel ? nextLevelId(lastUnlockedLevel) : "a0-1";

  const lesson = getLessonFromLessonsByBand(lessonsByBand, levelId);
  if (!lesson) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Урок не знайдено 😢</h1>
        <p className="text-slate-600">id = {levelId}</p>
        <Link href="/learning" className="underline">
          ← Назад
        </Link>
      </div>
    );
  }

  if (!hasPremium && compareLevel(levelId, allowed) === 1) {
    redirect(`/learning/${allowed}`);
  }

  const today = new Date();
  const dailyCount =
    row.dailyDate && isSameDay(row.dailyDate, today) ? row.dailyCount : 0;

  if (
    !hasPremium &&
    compareLevel(levelId, allowed) === 0 &&
    !isFreeStarterUnlimitedLesson(levelId) &&
    dailyCount >= 2
  ) {
    redirect("/learning/limit");
  }
  const nextId = nextLevelId(levelId);

  let canGoNext = true;
  let lockedReason: string | undefined = undefined;

  if (!hasPremium) {
    if (nextId === levelId) {
      canGoNext = false;
      lockedReason = "Скоро додамо наступний рівень/уроки.";
    } else if (isPremiumLevel(nextId)) {
      canGoNext = false;
      lockedReason = "Наступні уроки доступні лише з Premium.";
    } else if (compareLevel(nextId, allowed) === 1) {
      canGoNext = false;
      lockedReason = "Спочатку пройди попередні уроки/рівні (послідовно).";
    }

    if (
      canGoNext &&
      nextId === allowed &&
      !isFreeStarterUnlimitedLesson(nextId) &&
      dailyCount >= 2
    ) {
      canGoNext = false;
      lockedReason = "Ліміт 2 нових уроки на день для безкоштовної версії.";
    }
  }

  return (
    <LevelClient
      levelId={levelId}
      words={lesson.words}
      courseId={activeCourseId}
      canGoNext={canGoNext}
      lockedReason={lockedReason}
      onLockedNextRedirect="/learning"
    />
  );
}