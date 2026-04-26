/**
 * API route для фіксації завершення уроку користувачем.
 *
 * Що робить:
 * Позначає урок (levelId) як done у userProgress, оновлює lessonsProgress,
 * рахує dailyCount і застосовує ліміт 2 нових уроки/день для FREE користувачів.
 *
 * Як працює:
 * 1. Отримує сесію через auth() і знаходить user у Prisma
 * 2. Перевіряє чи користувач має Premium (isPremium / premiumUntil)
 * 3. Через upsert отримує або створює userProgress
 * 4. Якщо урок уже done → нічого не змінює
 * 5. Якщо ні → додає done=true, doneAt, updatedAt і збільшує dailyCount
 *
 * Пов’язані файли:
 * - Prisma models: user, userProgress
 * - клієнтські компоненти learning/LevelClient
 * - /api/progress (синхронізація прогресу)
 *
 * Роль у Flunio:
 * Серверна логіка прогресу уроків і денного ліміту для free-користувачів.
 */

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toDayKey(d: Date) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}
function isFreeStarterUnlimitedLesson(id: string) {
  const m = /^a0-(\d+)$/i.exec(String(id).toLowerCase());
  if (!m) return false;

  const n = Number(m[1]);
  return n >= 1 && n <= 10;
}

export async function POST(req: Request) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return NextResponse.json({ ok: false }, { status: 401 });

  const { levelId } = await req.json().catch(() => ({}));
  const id = String(levelId || "").toLowerCase();
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, isPremium: true, premiumUntil: true },
  });
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  const hasPremium =
    !!user.isPremium && (!user.premiumUntil || user.premiumUntil > new Date());

  const today = new Date();
  const todayKey = toDayKey(today);
  const nowIso = new Date().toISOString();

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
      lessonsProgress: true,
      dailyCount: true,
      dailyDate: true,
      lastUnlockedLevel: true,
    },
  });

  const lp = (row.lessonsProgress ?? {}) as Record<string, any>;

  const wasDone =
    lp?.[id] === true ||
    (lp?.[id] && typeof lp[id] === "object" && lp[id].done === true);

  // ✅ якщо вже було done — нічого не рахуємо, просто повертаємо стан
  if (wasDone) {
    return NextResponse.json({
      ok: true,
      dailyCount:
        row.dailyDate && isSameDay(row.dailyDate, today) ? row.dailyCount : 0,
      alreadyDone: true,
    });
  }

  // ✅ по даті рахуємо current dailyCount
  const currentCount =
    row.dailyDate && isSameDay(row.dailyDate, today) ? row.dailyCount : 0;
  const shouldCountDaily = !hasPremium && !isFreeStarterUnlimitedLesson(id);

  // ✅ Серверний ліміт для FREE (преміум байпас)
  if (shouldCountDaily && currentCount >= 2) {
    return NextResponse.json({ ok: false, code: "DAILY_LIMIT", limit: 2 }, { status: 429 });
  }

  // ✅ FREE: збільшуємо ліміт тільки для нових уроків
  // ✅ PREMIUM: ліміт не важливий
  const nextCount = currentCount + (shouldCountDaily ? 1 : 0);

  // ✅ позначаємо урок як done + фіксуємо дату (для streak/records)
  const prevObj =
    typeof lp[id] === "object" && lp[id] ? lp[id] : (lp[id] === true ? { done: true } : {});

  const nextLp = {
    ...lp,
    [id]: {
      ...prevObj,
      done: true,
      doneAt: todayKey,   // ✅ ключ для streak
      updatedAt: nowIso,  // ✅ на всякий
    },
  };

  await prisma.userProgress.update({
    where: { userId: user.id },
    data: {
      lessonsProgress: nextLp,
      dailyDate: today,
      dailyCount: nextCount,
      lastUnlockedLevel: id,
    },
  });

  return NextResponse.json({
    ok: true,
    dailyCount: nextCount,
    alreadyDone: false,
  });
}