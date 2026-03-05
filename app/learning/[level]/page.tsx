import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LevelClient from "./LevelClient";
import { getLessonsByBand, type CourseId } from "../courses/registry";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type LessonsProgress = Record<string, any>;

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
  // далі можна додати: b2...
};

function parseLevelId(id: string) {
  const m = /^([a-z]\d)-(\d+)$/.exec(id.toLowerCase());
  if (!m) return null;
  return { band: m[1], n: Number(m[2]) };
}

function bandOrder(band: string) {
  // a0->0, a1->1, a2->2, b1->11, b2->12 ...
  const m = /^([ab])(\d)$/.exec(band.toLowerCase());
  if (!m) return 0;

  const letter = m[1];
  const n = Number(m[2]);

  if (letter === "a") return n; // a0..a9
  if (letter === "b") return 10 + n; // b0..b9
  return 0;
}

function compareLevel(a: string, b: string) {
  // -1 якщо a < b, 0 якщо рівні, 1 якщо a > b
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

  // ✅ якщо дійшли до кінця бенду — переходимо на наступний
  if (p.band === "a0" && Number.isFinite(p.n) && p.n >= (limit ?? 30)) return "a1-1";
  if (p.band === "a1" && Number.isFinite(p.n) && p.n >= (limit ?? 40)) return "a2-1";
  if (p.band === "a2" && Number.isFinite(p.n) && p.n >= (limit ?? 50)) return "b1-1";
  if (p.band === "b1" && Number.isFinite(p.n) && p.n >= (limit ?? 35)) return "b2-1";

  return `${p.band}-${p.n + 1}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isDone(lp: LessonsProgress | null | undefined, id: string) {
  if (!lp || typeof lp !== "object") return false;
  const v = (lp as any)[id] ?? (lp as any)[id.toLowerCase()];
  return v === true || (v && typeof v === "object" && (v as any).done === true);
}

/**
 * ✅ SAFE для FREE:
 * Рахуємо прогрес тільки послідовно: a0-1, a0-2, ... поки done.
 * Перший не-done = стоп. Повертаємо останній done.
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
    current = nextLevelId(current);
  }

  return lastDone;
}

/**
 * ✅ MAX done (можна лишити для premium / діагностики)
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

  // ✅ active course from cookie (server-side)
  const cookieStore = await cookies();
  const cookieCourse = cookieStore.get("slovakStudyActiveCourse")?.value as CourseId | undefined;

  const activeCourseId: CourseId =
    cookieCourse === "cs" || cookieCourse === "sk" || cookieCourse === "pl"
      ? cookieCourse
      : "sk";

  const lessonsByBand = getLessonsByBand(activeCourseId);

  // ✅ session
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  // ✅ user (беремо premium поля теж)
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

  // ✅ progress row
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

  // ✅ якщо старий акаунт і lastUnlockedLevel null — відновлюємо
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

  // ✅ урок існує?
  const lesson = getLessonFromLessonsByBand(lessonsByBand, levelId);
  if (!lesson) {
    const p = parseLevelId(levelId);

    const isB2OrHigher = !!p && bandOrder(p.band) >= bandOrder("b2");

    if (isB2OrHigher) {
      return (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Рівень B2 ще не готовий 🛠️</h1>
          <p className="text-slate-600">Ми над ним працюємо. Скоро додамо уроки для B2 ✅</p>

          <div className="flex gap-3">
            <Link href="/learning" className="underline">
              ← Назад до рівнів
            </Link>

            <Link href="/learning/b1-35" className="underline">
              Повторити останній урок B1 →
            </Link>
          </div>

          <p className="text-xs text-slate-400">id = {levelId}</p>
        </div>
      );
    }

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

  // ✅ строгий порядок: забороняємо ТІЛЬКИ “вперед”
  if (!hasPremium && compareLevel(levelId, allowed) === 1) {
    redirect(`/learning/${allowed}`);
  }

  // ✅ ліміт 2/день — тільки коли користувач заходить саме в "allowed"
  const today = new Date();
  const dailyCount =
    row.dailyDate && isSameDay(row.dailyDate, today) ? row.dailyCount : 0;

  if (!hasPremium && compareLevel(levelId, allowed) === 0 && dailyCount >= 2) {
    redirect("/learning/limit");
  }

  // ✅ блокування кнопки "далі"
  const nextId = nextLevelId(levelId);

  let canGoNext = true;
  let lockedReason: string | undefined = undefined;

  if (!hasPremium) {
    if (compareLevel(nextId, allowed) === 1) {
      canGoNext = false;
      lockedReason = "Спочатку пройди попередні уроки/рівні (послідовно).";
    }

    if (canGoNext && nextId === allowed && dailyCount >= 2) {
      canGoNext = false;
      lockedReason = "Ліміт 2 нових уроки на день для безкоштовної версії.";
    }
  }

  return (
    <LevelClient
      levelId={levelId}
      words={lesson.words}
      canGoNext={canGoNext}
      lockedReason={lockedReason}
      onLockedNextRedirect="/learning"
    />
  );
}