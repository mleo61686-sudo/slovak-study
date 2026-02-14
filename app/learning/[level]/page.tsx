import Link from "next/link";
import { redirect } from "next/navigation";
import LevelClient from "./LevelClient";
import { getLesson } from "../data";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type LessonsProgress = Record<string, any>;

const BAND_LIMITS: Record<string, number> = {
  "a0": 30,
  "a1": 40,
  "a2": 50,
  // далі можна додати: b1, b2...
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
  if (p.band === "a0" && Number.isFinite(p.n) && p.n >= (limit ?? 30))
    return "a1-1";
  if (p.band === "a1" && Number.isFinite(p.n) && p.n >= (limit ?? 40))
    return "a2-1";
  if (p.band === "a2" && Number.isFinite(p.n) && p.n >= (limit ?? 50))
    return "b1-1";

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
  return (
    v === true || (v && typeof v === "object" && (v as any).done === true)
  );
}

/**
 * ✅ SAFE для FREE:
 * Рахуємо прогрес тільки послідовно: a0-1, a0-2, ... поки done.
 * Перший не-done = стоп. Повертаємо останній done.
 */
function getLastDoneSequential(lp: LessonsProgress | null | undefined) {
  let current = "a0-1";
  let lastDone: string | null = null;

  // захист від нескінченного циклу
  for (let i = 0; i < 10000; i++) {
    const lesson = getLesson(current);
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

export default async function Page({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level: levelIdRaw } = await params;
  const levelId = String(levelIdRaw).toLowerCase();

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
  // ВАЖЛИВО: для FREE — ТІЛЬКИ послідовно (не MAX).
  let lastUnlockedLevel = row.lastUnlockedLevel;

  if (!lastUnlockedLevel) {
    const recovered = hasPremium ? getLastDoneMax(lp) : getLastDoneSequential(lp);
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
  const lesson = getLesson(levelId);
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

  // ✅ строгий порядок: забороняємо ТІЛЬКИ “вперед”
  // (попередні уроки відкривати можна — повторення)
  if (!hasPremium && compareLevel(levelId, allowed) === 1) {
    redirect(`/learning/${allowed}`);
  }

  // ✅ ліміт 2/день — тільки коли користувач заходить саме в "allowed" (новий урок)
  const today = new Date();
  const dailyCount =
    row.dailyDate && isSameDay(row.dailyDate, today) ? row.dailyCount : 0;

  // якщо користувач намагається відкрити новий урок (allowed)
  // і ліміт вичерпано
  if (
    !hasPremium &&
    compareLevel(levelId, allowed) === 0 &&
    dailyCount >= 2
  ) {
    redirect("/learning/limit");
  }

  // ✅ блокування кнопки "далі" в LevelClient (щоб не протягувало free)
  const nextId = nextLevelId(levelId);

  let canGoNext = true;
  let lockedReason: string | undefined = undefined;

  if (!hasPremium) {
    // якщо наступний урок був би "вперед" від allowed — блокуємо
    if (compareLevel(nextId, allowed) === 1) {
      canGoNext = false;
      lockedReason = "Спочатку пройди попередні уроки/рівні (послідовно).";
    }

    // якщо наступний = allowed, але ліміт 2/день вже вичерпаний — теж блокуємо
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
