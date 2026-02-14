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
    lp?.[id] === true || (lp?.[id] && typeof lp[id] === "object" && lp[id].done === true);

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
  // ✅ PREMIUM: ліміт не важливий, але можемо теж вести лічильник — не шкодить
  const nextCount = currentCount + (hasPremium ? 0 : 1);

  // ✅ позначаємо урок як done (мінімально), щоб наступний раз не рахувався
  const nextLp = { ...lp, [id]: { ...(typeof lp[id] === "object" ? lp[id] : {}), done: true } };

  await prisma.userProgress.update({
    where: { userId: user.id },
    data: {
      lessonsProgress: nextLp,
      dailyDate: today,
      dailyCount: hasPremium ? currentCount : nextCount,
      // lastUnlockedLevel можна оновлювати на максимум — але навіть без цього ліміт працюватиме
      lastUnlockedLevel: id,
    },
  });

  return NextResponse.json({
    ok: true,
    dailyCount: hasPremium ? currentCount : nextCount,
    alreadyDone: false,
  });
}
