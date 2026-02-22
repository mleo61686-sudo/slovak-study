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

  // ✅ FREE: збільшуємо ліміт тільки для нових уроків
  // ✅ PREMIUM: ліміт не важливий
  const nextCount = currentCount + (hasPremium ? 0 : 1);

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
      dailyCount: hasPremium ? currentCount : nextCount,
      lastUnlockedLevel: id,
    },
  });

  return NextResponse.json({
    ok: true,
    dailyCount: hasPremium ? currentCount : nextCount,
    alreadyDone: false,
  });
}