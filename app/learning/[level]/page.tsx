import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LevelClient from "./LevelClient";
import { getLessonsByBand, type CourseId } from "../courses/registry";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  getLockedLessonReason,
  isPremiumLesson,
} from "@/app/learning/access/lessonAccess";

type LessonsProgress = Record<string, any>;
type LessonsProgressByCourse = Partial<Record<CourseId, LessonsProgress>>;

type CourseAwareProgress = {
  byCourse: LessonsProgressByCourse;
};

const COURSE_IDS: CourseId[] = ["sk", "cs", "pl"];

const BAND_LIMITS: Record<string, number> = {
  a0: 30,
  a1: 40,
  a2: 50,
  b1: 35,
  b2: 50,
};

function isPlainObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCourseAwareProgress(value: unknown): value is CourseAwareProgress {
  return isPlainObject(value) && isPlainObject((value as any).byCourse);
}

function normalizeProgressStore(raw: unknown): CourseAwareProgress {
  if (isCourseAwareProgress(raw)) {
    const byCourse: LessonsProgressByCourse = {};

    for (const courseId of COURSE_IDS) {
      const lessons = (raw as any).byCourse?.[courseId];
      byCourse[courseId] = isPlainObject(lessons) ? lessons : {};
    }

    return { byCourse };
  }

  if (isPlainObject(raw)) {
    return {
      byCourse: {
        sk: raw as LessonsProgress,
        cs: {},
        pl: {},
      },
    };
  }

  return {
    byCourse: {
      sk: {},
      cs: {},
      pl: {},
    },
  };
}

function getLessonsForCourse(raw: unknown, courseId: CourseId): LessonsProgress {
  const store = normalizeProgressStore(raw);
  const lessons = store.byCourse[courseId];

  return isPlainObject(lessons) ? lessons : {};
}

function getLessonFromLessonsByBand(
  lessonsByBand: Record<string, any[]>,
  id: string
) {
  const raw = String(id).toLowerCase();
  const m = /^(a0|a1|a2|b1|b2)-(\d+)$/.exec(raw);
  if (!m) return null;

  const band = m[1];
  const n = Number(m[2]);

  const list = lessonsByBand[band] ?? [];
  return list[n - 1] ?? null;
}

function parseLevelId(id: string) {
  const m = /^([a-z]\d)-(\d+)$/.exec(id.toLowerCase());
  if (!m) return null;

  return {
    band: m[1],
    n: Number(m[2]),
  };
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

  if (p.band === "a0" && Number.isFinite(p.n) && p.n >= (limit ?? 30)) {
    return "a1-1";
  }

  if (p.band === "a1" && Number.isFinite(p.n) && p.n >= (limit ?? 40)) {
    return "a2-1";
  }

  if (p.band === "a2" && Number.isFinite(p.n) && p.n >= (limit ?? 50)) {
    return "b1-1";
  }

  if (p.band === "b1" && Number.isFinite(p.n) && p.n >= (limit ?? 35)) {
    return "b2-1";
  }

  return `${p.band}-${p.n + 1}`;
}

function isDone(lp: LessonsProgress | null | undefined, id: string) {
  if (!lp || typeof lp !== "object") return false;

  const key = id.toLowerCase();
  const v = (lp as any)[key] ?? (lp as any)[id];

  return v === true || (v && typeof v === "object" && (v as any).done === true);
}

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

function getLastDoneMax(lp: LessonsProgress | null | undefined) {
  if (!lp || typeof lp !== "object") return null;

  let best: string | null = null;

  for (const [idRaw, val] of Object.entries(lp)) {
    const id = String(idRaw).toLowerCase();
    const p = parseLevelId(id);

    if (!p) continue;

    const done =
      val === true ||
      (val && typeof val === "object" && (val as any).done === true);

    if (!done) continue;

    if (!best) {
      best = id;
      continue;
    }

    if (compareLevel(id, best) === 1) best = id;
  }

  return best;
}

function chooseBetterLastUnlocked(
  current: string | null,
  recovered: string | null
) {
  if (!current) return recovered;
  if (!recovered) return current;

  return compareLevel(recovered, current) === 1 ? recovered : current;
}

function redirectToLessonLogin(levelId: string): never {
  const callbackUrl = `/learning/${encodeURIComponent(levelId)}`;

  redirect(
    `/login?reason=lesson&callbackUrl=${encodeURIComponent(callbackUrl)}`
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level: levelIdRaw } = await params;
  const levelId = String(levelIdRaw).toLowerCase();

  const cookieStore = await cookies();
  const cookieCourse = cookieStore.get("slovakStudyActiveCourse")?.value as
    | CourseId
    | undefined;

  const activeCourseId: CourseId =
    cookieCourse === "cs" || cookieCourse === "sk" || cookieCourse === "pl"
      ? cookieCourse
      : "sk";

  const lessonsByBand = getLessonsByBand(activeCourseId);
  const lesson = getLessonFromLessonsByBand(lessonsByBand, levelId);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 theme-text">
        <div className="flunio-card rounded-3xl p-6">
          <h1 className="text-2xl font-semibold theme-text">
            Урок не знайдено 😢
          </h1>

          <p className="mt-2 theme-text-muted">id = {levelId}</p>

          <Link
            href="/learning"
            className="theme-secondary-button mt-4 inline-flex rounded-xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            ← Назад
          </Link>
        </div>
      </div>
    );
  }

  const session = await auth();

  const sessionUserId = session?.user?.id ?? null;
  const email = session?.user?.email ?? null;

  if (!sessionUserId && !email) {
    return redirectToLessonLogin(levelId);
  }

  const user = await prisma.user.findUnique({
    where: sessionUserId ? { id: sessionUserId } : { email: email as string },
    select: {
      id: true,
      email: true,
      isPremium: true,
      premiumUntil: true,
    },
  });

  if (!user) {
    return redirectToLessonLogin(levelId);
  }

  const hasPremium =
    user.isPremium === true && (!user.premiumUntil || user.premiumUntil > new Date());

  if (!hasPremium && isPremiumLesson(levelId)) {
    redirect("/premium");
  }

  // Важливо для швидкості:
  // на відкритті сторінки уроку тільки читаємо прогрес.
  // Не робимо upsert/update у GET-рендері, бо це сповільнює /learning/[level].
  const progressRow = await prisma.userProgress.findUnique({
    where: { userId: user.id },
    select: {
      lastUnlockedLevel: true,
      lessonsProgress: true,
    },
  });

  const courseLessons = getLessonsForCourse(
    progressRow?.lessonsProgress ?? null,
    activeCourseId
  );

  const recovered = hasPremium
    ? getLastDoneMax(courseLessons)
    : getLastDoneSequential(courseLessons, lessonsByBand);

  const lastUnlockedLevel = chooseBetterLastUnlocked(
    progressRow?.lastUnlockedLevel ?? null,
    recovered
  );

  const allowed = lastUnlockedLevel ? nextLevelId(lastUnlockedLevel) : "a0-1";

  if (!hasPremium && compareLevel(levelId, allowed) === 1) {
    redirect(`/learning/${allowed}`);
  }

  const nextId = nextLevelId(levelId);

  let canGoNext = true;
  let lockedReason: string | undefined = undefined;

  if (!hasPremium) {
    if (nextId === levelId) {
      canGoNext = false;
      lockedReason = "unknown_lesson";
    } else if (isPremiumLesson(nextId)) {
      canGoNext = false;
      lockedReason = getLockedLessonReason(nextId);
    } else if (compareLevel(nextId, allowed) === 1) {
      canGoNext = false;
      lockedReason = "sequence_locked";
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