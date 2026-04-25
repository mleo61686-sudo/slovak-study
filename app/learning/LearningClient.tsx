"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import type { CefrBand, Lang, LocalizedText } from "./data";
import type {
  LessonsProgress,
  LessonProgressObj,
  LessonProgressValue,
} from "@/lib/src/progress";
import { getLessonsProgress } from "@/lib/src/progress";
import { useLanguage } from "@/lib/src/useLanguage";

type LearningDict = {
  title: string;
  subtitle: string;
  done: string;
  lessons: string;
  words: string;
  allLessons: string;
  soon: string;
  wordsCount: (n: number) => string;
  repeat: string;
  start: string;
  locked: string;
  premiumOnly: string;
  buyPremium: string;
  premiumActive: string;
  availableNow: string;
  lastDone: string;
  dailyLimit: string;
};

type SessionUserLike = {
  email?: string | null;
  isPremium?: boolean;
};

type LessonStats = {
  lastCorrect: number;
  lastWrong: number;
  lastTotal: number;
};

const DAILY_FREE_LIMIT = 2;

const PROGRESS_EVENT = "slovakStudy:progressChanged";
const SYNC_EVENT = "slovakStudy:syncState";

const dict: Record<Lang, LearningDict> = {
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
    dailyLimit: "Ліміт на сьогодні вичерпано 🔒",
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
    dailyLimit: "Лимит на сегодня исчерпан 🔒",
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
    dailyLimit: "Daily limit reached 🔒",
  },
};

const FREE_A2_LESSONS = 10;

// Тут задаємо, скільки уроків "офіційно" показувати в UI для рівня
const LESSONS_LIMITS: Partial<Record<string, number>> = {
  b1: 35,
  b2: 50,
};

function parseLevelId(id: string) {
  const m = /^(a0|a1|a2|b1|b2)-(\d+)$/i.exec(String(id).toLowerCase());
  if (!m) return null;
  return { band: m[1].toLowerCase(), n: Number(m[2]) };
}

function isPremiumLesson(lessonId: string) {
  const parsed = parseLevelId(lessonId);
  if (!parsed) return false;

  if (parsed.band === "b1" || parsed.band === "b2") return true;
  if (parsed.band === "a2" && parsed.n > FREE_A2_LESSONS) return true;

  return false;
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

function getLessonProgressValue(
  progress: LessonsProgress,
  id: string
): LessonProgressValue | undefined {
  const key = id.toLowerCase();
  return progress[key] ?? progress[id];
}

function getLessonProgressObj(
  progress: LessonsProgress,
  id: string
): LessonProgressObj | null {
  const value = getLessonProgressValue(progress, id);
  if (!value || value === true || typeof value !== "object") return null;
  return value;
}

function getLastDone(progress: LessonsProgress) {
  let best: string | null = null;

  for (const [idRaw, val] of Object.entries(progress ?? {})) {
    const id = String(idRaw).toLowerCase();
    const p = parseLevelId(id);
    if (!p) continue;

    const done = val === true || (typeof val === "object" && val.done === true);
    if (!done) continue;

    if (!best) best = id;
    else if (compareLevel(id, best) === 1) best = id;
  }

  return best;
}

function isDoneId(progress: LessonsProgress, id: string) {
  const value = getLessonProgressValue(progress, id);
  return value === true || (typeof value === "object" && value?.done === true);
}

function getAllowedSequential(progress: LessonsProgress, bands: CefrBand[]) {
  const allIds = bands
    .flatMap((b) => b.lessons.map((l) => l.id))
    .sort((a, b) => compareLevel(a, b));

  for (const id of allIds) {
    if (!isDoneId(progress, id)) return id.toLowerCase();
  }

  const last = allIds[allIds.length - 1];
  return last ? last.toLowerCase() : "a0-1";
}

function getLocalized(value: LocalizedText, lang: Lang) {
  return value[lang] ?? value.ua ?? value.ru ?? "";
}

async function getServerDailyCount() {
  try {
    const res = await fetch("/api/progress", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return 0;

    const data = await res.json();

    return typeof data?.dailyCount === "number" ? data.dailyCount : 0;
  } catch {
    return 0;
  }
}

export default function LearningPage({ bands }: { bands: CefrBand[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as SessionUserLike | undefined;
  const isPremium = user?.isPremium === true;
  const arePremiumBandsLocked = !isPremium;
  const [isPending, startTransition] = useTransition();

  const adminEmails = useMemo(() => {
    return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const myEmail = (user?.email ?? "").toLowerCase();
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
  const [dailyCount, setDailyCount] = useState<number | null>(null);

  const { lang } = useLanguage() as { lang: Lang };
  const t = dict[lang];

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      setProgress(getLessonsProgress());

      const count = await getServerDailyCount();
      if (!cancelled) setDailyCount(count);
    };

    refresh();

    const onSyncState = (event: Event) => {
      const detail = (event as CustomEvent<{ state?: string }>).detail;

      if (detail?.state === "idle") {
        refresh();
      }
    };

    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener(SYNC_EVENT, onSyncState);
    document.addEventListener("visibilitychange", refresh);

    const interval = window.setInterval(refresh, 3000);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener(SYNC_EVENT, onSyncState);
      document.removeEventListener("visibilitychange", refresh);
      window.clearInterval(interval);
    };
  }, []);

  const isDone = (id: string) => isDoneId(progress, id);

  const getStats = (id: string): LessonStats | null => {
    const value = getLessonProgressObj(progress, id);
    if (!value) return null;

    if (typeof value.lastTotal === "number" && value.lastTotal > 0) {
      const lastCorrect = Number(value.lastCorrect ?? 0);
      const lastWrong =
        typeof value.lastWrong === "number"
          ? value.lastWrong
          : Math.max(0, value.lastTotal - Number(value.lastCorrect ?? 0));

      return { lastCorrect, lastWrong, lastTotal: value.lastTotal };
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

  const allowed = useMemo(() => {
    return getAllowedSequential(progress, bands);
  }, [progress, bands]);

  const lastDone = useMemo(() => getLastDone(progress), [progress]);

  const hasReachedDailyLimit =
    !isPremium &&
    !isAdmin &&
    (dailyCount === null || dailyCount >= DAILY_FREE_LIMIT);

  function isLessonUnlockedGlobal(lessonId: string) {
    if (isPremium || isAdmin) return true;

    const done = isDone(lessonId);

    // Уже пройдені уроки можна повторювати навіть після daily limit.
    if (done) return true;

    if (hasReachedDailyLimit) return false;
    if (isPremiumLesson(lessonId)) return false;

    return compareLevel(lessonId, allowed) <= 0;
  }

  function goTo(path: string) {
    startTransition(() => {
      router.push(path);
    });
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

      {hasReachedDailyLimit && (
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {t.dailyLimit}
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
        {bands.map((band) => {
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
                    <button
                      type="button"
                      onClick={() => goTo("/premium")}
                      disabled={isPending}
                      className="rounded-xl bg-black px-3 py-1 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {t.buyPremium}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goTo(`/learning/levels/${band.id}`)}
                      disabled={isPending}
                      className="rounded-xl border px-3 py-1 text-xs font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {t.allLessons}
                    </button>
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

                  <button
                    type="button"
                    onClick={() => goTo("/premium")}
                    disabled={isPending}
                    className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {t.buyPremium}
                  </button>
                </div>
              ) : (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {band.lessons.slice(0, 4).map((lesson) => {
                    const unlocked = isLessonUnlockedGlobal(lesson.id);
                    const done = isDone(lesson.id);
                    const stats = getStats(lesson.id);
                    const isStart = lesson.id === allowed && !done;
                    const lessonPath = `/learning/${lesson.id}`;

                    const lockedText =
                      hasReachedDailyLimit && !done
                        ? t.dailyLimit
                        : isPremiumLesson(lesson.id)
                          ? t.premiumOnly
                          : t.locked;

                    return (
                      <div
                        key={lesson.id}
                        className={`rounded-2xl border p-4 ${unlocked ? "hover:bg-slate-50" : "opacity-60"
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
                            <button
                              type="button"
                              onClick={() => goTo(lessonPath)}
                              disabled={isPending}
                              className={[
                                "rounded-xl px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60",
                                "bg-black",
                              ].join(" ")}
                            >
                              {isStart ? t.start : t.repeat}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="rounded-xl border px-4 py-2 text-sm text-slate-600"
                            >
                              {lockedText}
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