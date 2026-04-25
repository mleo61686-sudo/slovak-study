"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { CEFR_LEVELS } from "../../data";
import type { LessonsProgress, LessonProgressValue } from "@/lib/src/progress";
import { getLessonsProgress } from "@/lib/src/progress";
import { useLanguage } from "@/lib/src/useLanguage";

const FREE_A2_LESSONS = 10;
const DAILY_FREE_LIMIT = 2;

const PROGRESS_EVENT = "slovakStudy:progressChanged";
const SYNC_EVENT = "slovakStudy:syncState";

function isPremiumLesson(lessonId: string) {
  const match = /^(a0|a1|a2|b1|b2)-(\d+)$/i.exec(
    String(lessonId).toLowerCase()
  );

  if (!match) return false;

  const band = match[1].toLowerCase();
  const n = Number(match[2]);

  if (band === "b1" || band === "b2") return true;
  if (band === "a2" && n > FREE_A2_LESSONS) return true;

  return false;
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

export default function BandPage() {
  const params = useParams<{ band?: string }>();
  const bandId = String(params?.band || "").trim().toLowerCase();

  const { lang } = useLanguage();

  const { data: session } = useSession();
  const user = session?.user as any;
  const isPremium = user?.isPremium === true;

  const adminEmails = useMemo(() => {
    return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const myEmail = String(user?.email ?? "").toLowerCase();
  const isAdmin = myEmail !== "" && adminEmails.includes(myEmail);

  const band = useMemo(() => {
    return CEFR_LEVELS.find((b) => b.id === bandId) ?? null;
  }, [bandId]);

  const visibleBandIds = useMemo(() => {
    return CEFR_LEVELS.map((b) => b.id);
  }, []);

  const [progress, setProgress] = useState<LessonsProgress>({});
  const [dailyCount, setDailyCount] = useState<number | null>(null);

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

  const hasReachedDailyLimit =
    !isPremium &&
    !isAdmin &&
    (dailyCount === null || dailyCount >= DAILY_FREE_LIMIT);

  const isDone = (id: string) => {
    const key = id.toLowerCase();
    const v: LessonProgressValue | undefined =
      (progress as any)[key] ?? (progress as any)[id];
    return v === true || (typeof v === "object" && (v as any)?.done === true);
  };

  const getStats = (id: string) => {
    const key = id.toLowerCase();
    const v = (progress as any)[key] ?? (progress as any)[id];
    if (!v || v === true || typeof v !== "object") return null;

    if (typeof v.lastTotal === "number" && v.lastTotal > 0) {
      const lastCorrect = Number(v.lastCorrect ?? 0);
      const lastWrong =
        typeof v.lastWrong === "number"
          ? v.lastWrong
          : Math.max(0, v.lastTotal - lastCorrect);

      return { lastCorrect, lastWrong, lastTotal: v.lastTotal };
    }

    return null;
  };

  if (!band) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">
          {lang === "ua"
            ? "Рівень не знайдено"
            : lang === "ru"
              ? "Уровень не найден"
              : "Level not found"}
        </h1>
        <p className="mt-2 text-slate-600">
          {lang === "ua"
            ? "Спробуй повернутися назад."
            : lang === "ru"
              ? "Попробуй вернуться назад."
              : "Try going back."}
        </p>

        <div className="mt-4 rounded-2xl border bg-slate-50 p-4 text-sm text-slate-700">
          <div>
            <span className="font-medium">bandId:</span>{" "}
            {bandId || "(порожньо)"}
          </div>
          <div className="mt-2">
            <span className="font-medium">
              {lang === "ua"
                ? "Доступні рівні:"
                : lang === "ru"
                  ? "Доступные уровни:"
                  : "Available levels:"}
            </span>{" "}
            {visibleBandIds.join(", ")}
          </div>
        </div>

        <Link
          className="mt-4 inline-block rounded-xl bg-black px-4 py-2 text-white"
          href="/learning"
        >
          ← {lang === "ua" ? "Назад" : lang === "ru" ? "Назад" : "Back"}
        </Link>
      </div>
    );
  }

  const doneCount = band.lessons.filter((l) => isDone(l.id)).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {band.title[lang] ?? band.title.ua}
          </h1>
          <p className="mt-2 text-slate-600">
            {band.subtitle[lang] ?? band.subtitle.ua}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {lang === "ua"
              ? "Прогрес"
              : lang === "ru"
                ? "Прогресс"
                : "Progress"}
            : {doneCount}/{band.lessons.length} ·{" "}
            {lang === "ua" ? "Слів" : lang === "ru" ? "Слов" : "Words"}:{" "}
            {band.lessons.length * 10}
          </p>

          {isPremium && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
              ⭐{" "}
              {lang === "ua"
                ? "Premium активний — всі уроки відкриті"
                : lang === "ru"
                  ? "Premium активен — все уроки открыты"
                  : "Premium active — all lessons are unlocked"}
            </div>
          )}

          {hasReachedDailyLimit && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {lang === "ua"
                ? "Ліміт на сьогодні вичерпано 🔒"
                : lang === "ru"
                  ? "Лимит на сегодня исчерпан 🔒"
                  : "Daily limit reached 🔒"}
            </div>
          )}
        </div>

        <Link
          href="/learning"
          className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
        >
          ← {lang === "ua" ? "Назад" : lang === "ru" ? "Назад" : "Back"}
        </Link>
      </div>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-black"
          style={{
            width:
              band.lessons.length === 0
                ? "0%"
                : `${Math.round((doneCount / band.lessons.length) * 100)}%`,
          }}
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {band.lessons.map((lesson, idx) => {
          const done = isDone(lesson.id);
          const stats = getStats(lesson.id);

          const prev = band.lessons[idx - 1];
          const lockedByProgress =
            !isPremium && !isAdmin && idx > 0 && prev && !isDone(prev.id);

          const lockedByPremium =
            !isPremium && !isAdmin && isPremiumLesson(lesson.id);

          const lockedByDailyLimit = hasReachedDailyLimit && !done;

          const locked =
            lockedByProgress || lockedByPremium || lockedByDailyLimit;

          const cardClass = "rounded-2xl border bg-white p-4 hover:bg-slate-50";
          const lessonTitle = lesson.title[lang] ?? lesson.title.ua;

          const lockedText = lockedByDailyLimit
            ? lang === "ua"
              ? "Ліміт на сьогодні"
              : lang === "ru"
                ? "Лимит на сегодня"
                : "Daily limit"
            : lockedByPremium
              ? "Premium"
              : lang === "ua"
                ? "Закрито"
                : lang === "ru"
                  ? "Закрыто"
                  : "Locked";

          if (locked) {
            return (
              <div
                key={lesson.id}
                className={`${cardClass} cursor-not-allowed opacity-60`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium">{lessonTitle}</div>
                  <div className="text-xs text-slate-500">
                    {lesson.wordsCount}{" "}
                    {lang === "ua" ? "слів" : lang === "ru" ? "слов" : "words"}
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-500">{lesson.id}</div>

                {stats && (
                  <div className="mt-1 text-xs text-slate-500">
                    ✅ {stats.lastCorrect} • ❌ {stats.lastWrong} /{" "}
                    {stats.lastTotal}
                  </div>
                )}

                <div className="mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
                  {lockedText} 🔒
                </div>

                {lockedByPremium && (
                  <Link
                    href="/premium"
                    className="mt-3 inline-flex rounded-xl bg-black px-3 py-2 text-sm font-medium text-white"
                  >
                    {lang === "ua"
                      ? "Купити Premium"
                      : lang === "ru"
                        ? "Купить Premium"
                        : "Buy Premium"}
                  </Link>
                )}
              </div>
            );
          }

          return (
            <Link
              key={lesson.id}
              href={`/learning/${lesson.id}`}
              className={cardClass}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium">
                  {lessonTitle} {done ? "✅" : ""}
                </div>
                <div className="text-xs text-slate-500">
                  {lesson.wordsCount}{" "}
                  {lang === "ua" ? "слів" : lang === "ru" ? "слов" : "words"}
                </div>
              </div>

              <div className="mt-2 text-xs text-slate-500">{lesson.id}</div>

              {stats && (
                <div className="mt-1 text-xs text-slate-500">
                  ✅ {stats.lastCorrect} • ❌ {stats.lastWrong} /{" "}
                  {stats.lastTotal}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}