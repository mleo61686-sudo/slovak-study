"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import type { CefrBand, Lang, LocalizedText } from "./data";
import type { LessonsProgress, LessonProgressValue } from "@/lib/src/progress";
import { getLessonsProgress } from "@/lib/src/progress";
import { useLanguage } from "@/lib/src/useLanguage";

const dict = {
  ua: {
    title: "Навчання 📚",
    subtitle: "Обирай рівень (A0 → B2) і проходь уроки по 10 слів.",
    done: "Пройдено уроків:",
    lessons: "Уроків:",
    words: "Слів:",
    allLessons: "Всі уроки →",
    soon: "Скоро додамо уроки для цього рівня ✅",
    wordsCount: (n: number) => `${n} слів`,
    repeat: "Повторити",
    start: "Почати",
    locked: "Закрито 🔒",
    premiumOnly: "Доступно лише для Premium ⭐",
    buyPremium: "Купити Premium",
    premiumActive: "⭐ Premium активний — безліміт доступу",
    availableNow: "Доступний зараз:",
    lastDone: "Останній пройдений:",
  },
  ru: {
    title: "Обучение 📚",
    subtitle: "Выбирай уровень (A0 → B2) и проходи уроки по 10 слов.",
    done: "Пройдено уроков:",
    lessons: "Уроков:",
    words: "Слов:",
    allLessons: "Все уроки →",
    soon: "Скоро добавим уроки для этого уровня ✅",
    wordsCount: (n: number) => `${n} слов`,
    repeat: "Повторить",
    start: "Начать",
    locked: "Закрыто 🔒",
    premiumOnly: "Доступно только для Premium ⭐",
    buyPremium: "Купить Premium",
    premiumActive: "⭐ Premium активен — безлимитный доступ",
    availableNow: "Доступно сейчас:",
    lastDone: "Последний пройденный:",
  },
  en: {
    title: "Learning 📚",
    subtitle: "Choose a level (A0 → B2) and complete lessons with 10 words each.",
    done: "Completed lessons:",
    lessons: "Lessons:",
    words: "Words:",
    allLessons: "All lessons →",
    soon: "Lessons for this level will be added soon ✅",
    wordsCount: (n: number) => `${n} words`,
    repeat: "Repeat",
    start: "Start",
    locked: "Locked 🔒",
    premiumOnly: "Available only for Premium ⭐",
    buyPremium: "Buy Premium",
    premiumActive: "⭐ Premium active — unlimited access",
    availableNow: "Available now:",
    lastDone: "Last completed:",
  },
} satisfies Record<Lang, any>;

// ✅ Тут задаємо, скільки уроків "офіційно" показувати в UI для рівня
const LESSONS_LIMITS: Partial<Record<string, number>> = {
  b1: 35,
  b2: 50,
};

// ===== Глобальна логіка порядку =====

function parseLevelId(id: string) {
  const m = /^(a0|a1|a2|b1|b2)-(\d+)$/i.exec(String(id).toLowerCase());
  if (!m) return null;
  return { band: m[1].toLowerCase(), n: Number(m[2]) };
}

function bandOrder(band: string) {
  const b = String(band).toLowerCase();
  if (b === "a0") return 0;
  if (b === "a1") return 1;
  if (b === "a2") return 2;
  if (b === "b1") return 3;
  if (b === "b2") return 4;
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

  if (p.band === "a0" && Number.isFinite(p.n) && p.n >= 30) return "a1-1";
  if (p.band === "a1" && Number.isFinite(p.n) && p.n >= 40) return "a2-1";
  if (p.band === "a2" && Number.isFinite(p.n) && p.n >= 50) return "b1-1";
  if (p.band === "b1" && Number.isFinite(p.n) && p.n >= 35) return "b2-1";

  return `${p.band}-${p.n + 1}`;
}

function getLastDone(progress: LessonsProgress) {
  let best: string | null = null;

  for (const [idRaw, val] of Object.entries(progress ?? {})) {
    const id = String(idRaw).toLowerCase();
    const p = parseLevelId(id);
    if (!p) continue;

    const done =
      val === true ||
      (val && typeof val === "object" && (val as any).done === true);

    if (!done) continue;

    if (!best) best = id;
    else if (compareLevel(id, best) === 1) best = id;
  }

  return best;
}

function isDoneId(progress: LessonsProgress, id: string) {
  const key = id.toLowerCase();
  const v: LessonProgressValue | undefined =
    (progress as any)[key] ?? (progress as any)[id];

  return v === true || (typeof v === "object" && v?.done === true);
}

function getAllowedSequential(progress: LessonsProgress, bands: CefrBand[]) {
  const allIds = bands
    .flatMap((b) => b.lessons.map((l) => l.id))
    .sort((a, b) => compareLevel(a, b));

  for (const id of allIds) {
    if (!isDoneId(progress, id)) return id.toLowerCase();
  }

  // якщо всі видимі уроки пройдені, просто лишаємо останній доступним
  const last = allIds[allIds.length - 1];
  return last ? last.toLowerCase() : "a0-1";
}

function getLocalized(value: LocalizedText, lang: Lang) {
  return value[lang] ?? value.ua ?? value.ru ?? "";
}

export default function LearningPage({ bands }: { bands: CefrBand[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isPremium = (session?.user as any)?.isPremium === true;
  const arePremiumBandsLocked = !isPremium;

  const adminEmails = useMemo(() => {
    return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const myEmail = (session?.user?.email ?? "").toLowerCase();
  const isAdmin = myEmail !== "" && adminEmails.includes(myEmail);

  const DISABLED_BANDS = useMemo(() => {
    const s = new Set<string>();

    if (arePremiumBandsLocked && !isAdmin) {
      s.add("b1");
      s.add("b2");
    }

    return s;
  }, [arePremiumBandsLocked, isAdmin]);

  const [progress, setProgress] = useState<LessonsProgress>({});
  const { lang } = useLanguage() as { lang: Lang };
  const t = dict[lang];

  useEffect(() => {
    const refresh = () => setProgress(getLessonsProgress());

    refresh();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const isDone = (id: string) => isDoneId(progress, id);

  const getStats = (id: string) => {
    const key = id.toLowerCase();
    const v = (progress as any)[key] ?? (progress as any)[id];
    if (!v || v === true || typeof v !== "object") return null;

    if (typeof v.lastTotal === "number" && v.lastTotal > 0) {
      const lastCorrect = Number(v.lastCorrect ?? 0);
      const lastWrong =
        typeof v.lastWrong === "number"
          ? v.lastWrong
          : Math.max(0, v.lastTotal - Number(v.lastCorrect ?? 0));

      return { lastCorrect, lastWrong, lastTotal: v.lastTotal };
    }

    return null;
  };

  const completedCount = useMemo(
    () =>
      Object.values(progress).filter(
        (v) => v === true || (typeof v === "object" && v?.done === true)
      ).length,
    [progress]
  );

  const visibleBands = useMemo(() => {
    return bands;
  }, [bands]);

  const allowed = useMemo(() => {
    return getAllowedSequential(progress, visibleBands);
  }, [progress, visibleBands]);

  const lastDone = useMemo(() => getLastDone(progress), [progress]);

  function isLessonUnlockedGlobal(lessonId: string) {
    if (isPremium) return true;
    return compareLevel(lessonId, allowed) <= 0;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-2 text-slate-600">{t.subtitle}</p>

      <p className="mt-3 text-sm text-slate-500">
        {t.done} <span className="font-medium">{completedCount}</span>
      </p>

      {isPremium && (
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
          {t.premiumActive}
        </div>
      )}

      <div className="mt-2 text-xs text-slate-500">
        {t.availableNow} <span className="font-medium">{allowed}</span>
        {lastDone ? (
          <span className="ml-2 text-slate-400">
            · {t.lastDone} {lastDone}
          </span>
        ) : null}
      </div>

      <div className="mt-8 space-y-8">
        {visibleBands.map((band) => {
          const limit = LESSONS_LIMITS[band.id] ?? band.lessons.length;
          const lessonsTotal = Math.min(band.lessons.length, limit);
          const wordsTotal = lessonsTotal * 10;

          const isBandDisabled = DISABLED_BANDS.has(band.id);

          return (
            <section
              key={band.id}
              className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {getLocalized(band.title, lang)}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {getLocalized(band.subtitle, lang)}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {t.lessons} {lessonsTotal} · {t.words} {wordsTotal}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isBandDisabled ? (
                    <Link
                      href="/premium"
                      className="rounded-xl bg-black px-3 py-1 text-xs font-medium text-white"
                    >
                      {t.buyPremium}
                    </Link>
                  ) : (
                    <Link
                      href={`/learning/levels/${band.id}`}
                      className="rounded-xl border px-3 py-1 text-xs font-medium hover:bg-slate-50"
                    >
                      {t.allLessons}
                    </Link>
                  )}

                  <span className="rounded-full border px-3 py-1 text-xs text-slate-600">
                    {band.id.toUpperCase()}
                  </span>
                </div>
              </div>

              {band.lessons.length === 0 ? (
                <div className="mt-5 rounded-2xl border bg-slate-50 p-4 text-sm text-slate-600">
                  {t.soon}
                </div>
              ) : isBandDisabled ? (
                <div className="mt-5 flex items-center justify-between rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-medium">🔒 {t.premiumOnly}</div>

                  <Link
                    href="/premium"
                    className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
                  >
                    {t.buyPremium}
                  </Link>
                </div>
              ) : (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {band.lessons.slice(0, 4).map((lesson) => {
                    const unlocked = isLessonUnlockedGlobal(lesson.id);
                    const done = isDone(lesson.id);
                    const stats = getStats(lesson.id);

                    const isStart = lesson.id === allowed && !done;

                    return (
                      <div
                        key={lesson.id}
                        className={`rounded-2xl border p-4 ${
                          unlocked ? "hover:bg-slate-50" : "opacity-60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {getLocalized(lesson.title, lang)} {done ? "✅" : ""}
                          </div>
                          <div className="text-sm text-slate-500">
                            {t.wordsCount(lesson.wordsCount)}
                          </div>
                        </div>

                        {stats && (
                          <div className="mt-1 text-xs text-slate-500">
                            ✅ {stats.lastCorrect} • ❌ {stats.lastWrong} /{" "}
                            {stats.lastTotal}
                          </div>
                        )}

                        <div className="mt-3 flex justify-end">
                          {unlocked ? (
                            isStart ? (
                              <button
                                onClick={() => router.push(`/learning/${lesson.id}`)}
                                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
                              >
                                {t.start}
                              </button>
                            ) : (
                              <Link
                                href={`/learning/${lesson.id}`}
                                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
                              >
                                {t.repeat}
                              </Link>
                            )
                          ) : (
                            <button
                              disabled
                              className="rounded-xl border px-4 py-2 text-sm text-slate-600"
                            >
                              {t.locked}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}