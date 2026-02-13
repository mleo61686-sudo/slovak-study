import Link from "next/link";
import { redirect } from "next/navigation";
import LevelClient from "./LevelClient";
import { getLesson } from "../data";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type LessonsProgress = Record<string, any>;

function parseLevelId(id: string) {
  const m = /^([a-z]\d)-(\d+)$/.exec(id.toLowerCase());
  if (!m) return null;
  return { band: m[1], n: Number(m[2]) };
}

function bandOrder(band: string) {
  // "a0" -> 0, "a1" -> 1 ...
  const m = /^a(\d)$/.exec(band.toLowerCase());
  return m ? Number(m[1]) : 0;
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

  if (p.band === "a0" && Number.isFinite(p.n) && p.n >= 30) return "a1-1";
  return `${p.band}-${p.n + 1}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getLastDoneFromLessonsProgress(lp: LessonsProgress | null | undefined) {
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

  // ✅ user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) redirect("/login");

  // ✅ progress row (беремо також lessonsProgress для бекап-відновлення)
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

  // ✅ якщо це старий акаунт і lastUnlockedLevel ще null — відновлюємо з lessonsProgress
  let lastUnlockedLevel = row.lastUnlockedLevel;
  if (!lastUnlockedLevel) {
    const recovered = getLastDoneFromLessonsProgress(
      (row.lessonsProgress ?? null) as any
    );
    if (recovered) {
      lastUnlockedLevel = recovered;

      // збережемо в БД, щоб наступні запити були швидші
      await prisma.userProgress.update({
        where: { userId: user.id },
        data: { lastUnlockedLevel: recovered },
      });
    }
  }

  const allowed = lastUnlockedLevel ? nextLevelId(lastUnlockedLevel) : "a0-1";

  console.log("[LOCK]", {
  levelId,
  allowed,
  cmp: compareLevel(levelId, allowed),
  lastUnlockedLevel,
});

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
  if (compareLevel(levelId, allowed) === 1) {
    redirect(`/learning/${allowed}`);
  }

  // ✅ ліміт 2/день: застосовуємо ТІЛЬКИ коли користувач заходить саме в "allowed" (новий урок)
  const today = new Date();
  const dailyCount =
    row.dailyDate && isSameDay(row.dailyDate, today) ? row.dailyCount : 0;

  if (levelId === allowed && dailyCount >= 2) {
    redirect("/learning/limit");
  }

  return <LevelClient levelId={levelId} words={lesson.words} />;
}
