"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import AudioPracticeTeaser from "@/app/learning/audio-practice/AudioPracticeTeaser";
import { CEFR_LEVELS } from "../../data";
import type { LessonsProgress, LessonProgressValue } from "@/lib/src/progress";
import { getLessonsProgress } from "@/lib/src/progress";
import { useLanguage } from "@/lib/src/useLanguage";
import { isPremiumLesson } from "@/app/learning/access/lessonAccess";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

const PROGRESS_EVENT = "slovakStudy:progressChanged";
const SYNC_EVENT = "slovakStudy:syncState";

function parseLevelId(lessonId: string) {
  const match = /^(a0|a1|a2|b1|b2)-(\d+)$/i.exec(
    String(lessonId).toLowerCase()
  );

  if (!match) return null;

  return {
    band: match[1].toLowerCase(),
    n: Number(match[2]),
  };
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

function isDoneId(progress: LessonsProgress, id: string) {
  const key = id.toLowerCase();
  const v: LessonProgressValue | undefined =
    (progress as any)[key] ?? (progress as any)[id];

  return v === true || (typeof v === "object" && (v as any)?.done === true);
}

function getAllowedSequential(progress: LessonsProgress, lessonIds: string[]) {
  const sortedIds = [...lessonIds].sort((a, b) => compareLevel(a, b));

  for (const id of sortedIds) {
    if (isPremiumLesson(id)) {
      return id.toLowerCase();
    }

    if (!isDoneId(progress, id)) {
      return id.toLowerCase();
    }
  }

  const last = sortedIds[sortedIds.length - 1];
  return last ? last.toLowerCase() : "a0-1";
}

export default function BandPage() {
  const params = useParams<{ band?: string }>();
  const bandId = String(params?.band || "").trim().toLowerCase();

  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();
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

  useEffect(() => {
    const refresh = () => {
      setProgress(getLessonsProgress());
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

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener(SYNC_EVENT, onSyncState);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const isDone = (id: string) => {
    return isDoneId(progress, id);
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
      <div className="mx-auto max-w-3xl px-4 py-10 theme-text">
        <div className="flunio-card rounded-3xl p-6">
          <h1 className="text-2xl font-semibold theme-text">
            {lang === "ua"
              ? "Рівень не знайдено"
              : lang === "ru"
                ? "Уровень не найден"
                : "Level not found"}
          </h1>

          <p className="mt-2 theme-text-muted">
            {lang === "ua"
              ? "Спробуй повернутися назад."
              : lang === "ru"
                ? "Попробуй вернуться назад."
                : "Try going back."}
          </p>

          <div className="theme-inner-card mt-4 rounded-2xl p-4 text-sm theme-text-muted">
            <div>
              <span className="font-medium theme-text">bandId:</span>{" "}
              {bandId || "(порожньо)"}
            </div>

            <div className="mt-2">
              <span className="font-medium theme-text">
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
            className="theme-secondary-button mt-4 inline-flex min-h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
            href="/learning"
          >
            ← {lang === "ua" ? "Назад" : lang === "ru" ? "Назад" : "Back"}
          </Link>
        </div>
      </div>
    );
  }

  const doneCount = band.lessons.filter((l) => isDone(l.id)).length;
  const allowed = getAllowedSequential(
    progress,
    band.lessons.map((lesson) => lesson.id)
  );

  const bandIsPremiumOnly = band.id !== "a0";
  const bandLockedByPremium = bandIsPremiumOnly && !isPremium && !isAdmin;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 theme-text">
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight theme-text">
              {band.title[lang] ?? band.title.ua}
            </h1>

            <p className="mt-2 theme-text-muted">
              {band.subtitle[lang] ?? band.subtitle.ua}
            </p>

            <p className="mt-2 text-sm theme-text-subtle">
              {lang === "ua"
                ? "Прогрес"
                : lang === "ru"
                  ? "Прогресс"
                  : "Progress"}
              : {doneCount}/{band.lessons.length} ·{" "}
              {lang === "ua" ? "Слів" : lang === "ru" ? "Слов" : "Words"}:{" "}
              {band.lessons.length * 10}
            </p>

            {band.id === "a0" && !isPremium && !isAdmin && (
              <div className="theme-pill mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                {lang === "ua"
                  ? "A0 безкоштовно — без денного ліміту"
                  : lang === "ru"
                    ? "A0 бесплатно — без дневного лимита"
                    : "A0 is free — no daily limit"}
              </div>
            )}

            {(isPremium || isAdmin) && (
              <div className="theme-premium-badge mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                ⭐{" "}
                {lang === "ua"
                  ? "Premium активний — всі уроки відкриті"
                  : lang === "ru"
                    ? "Premium активен — все уроки открыты"
                    : "Premium active — all lessons are unlocked"}
              </div>
            )}

            {bandLockedByPremium && (
              <div className="theme-pill mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                {lang === "ua"
                  ? "Цей рівень входить у Premium 🔒"
                  : lang === "ru"
                    ? "Этот уровень входит в Premium 🔒"
                    : "This level is included in Premium 🔒"}
              </div>
            )}
          </div>

          <Link
            href="/learning"
            className="theme-secondary-button inline-flex min-h-10 shrink-0 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
          >
            ← {lang === "ua" ? "Назад" : lang === "ru" ? "Назад" : "Back"}
          </Link>
        </div>

        <div className="theme-progress-track relative mt-6 h-2 w-full overflow-hidden rounded-full">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 shadow-[0_0_18px_rgba(59,130,246,0.35)]"
            style={{
              width:
                band.lessons.length === 0
                  ? "0%"
                  : `${Math.round((doneCount / band.lessons.length) * 100)}%`,
            }}
          />
        </div>
      </div>

      {bandLockedByPremium ? (
        <div className="flunio-card mt-8 rounded-3xl p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold theme-text">
                {lang === "ua"
                  ? "Продовження курсу доступне в Premium"
                  : lang === "ru"
                    ? "Продолжение курса доступно в Premium"
                    : "Continue this course with Premium"}
              </h2>

              <p className="mt-2 text-sm theme-text-muted">
                {lang === "ua"
                  ? "A0 можна пройти безкоштовно. A1, A2, B1 і B2 відкриваються з Premium."
                  : lang === "ru"
                    ? "A0 можно пройти бесплатно. A1, A2, B1 и B2 открываются с Premium."
                    : "A0 is free. A1, A2, B1 and B2 unlock with Premium."}
              </p>
            </div>

            <Link
              href="/premium"
              className="theme-primary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {lang === "ua"
                ? "Відкрити Premium"
                : lang === "ru"
                  ? "Открыть Premium"
                  : "Unlock Premium"}
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {band.lessons.map((lesson, idx) => {
          const done = isDone(lesson.id);
          const stats = getStats(lesson.id);

          const prev = band.lessons[idx - 1];

          const lockedByProgress =
            !isPremium && !isAdmin && idx > 0 && prev && !isDone(prev.id);

          const lockedByPremium =
            !isPremium && !isAdmin && isPremiumLesson(lesson.id);

          const locked = lockedByProgress || lockedByPremium;

          const cardClass =
            "theme-inner-card rounded-2xl p-4 shadow-[0_0_18px_rgba(34,211,238,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-400/40";

          const lessonTitle = lesson.title[lang] ?? lesson.title.ua;

          const lockedText = lockedByPremium
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
                className={`${cardClass} cursor-not-allowed opacity-60 hover:translate-y-0`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium theme-text">{lessonTitle}</div>

                  <div className="text-xs theme-text-subtle">
                    {lesson.wordsCount}{" "}
                    {lang === "ua" ? "слів" : lang === "ru" ? "слов" : "words"}
                  </div>
                </div>

                <div className="mt-2 text-xs theme-text-subtle">{lesson.id}</div>

                {stats && (
                  <div className="mt-1 text-xs theme-text-subtle">
                    ✅ {stats.lastCorrect} • ❌ {stats.lastWrong} /{" "}
                    {stats.lastTotal}
                  </div>
                )}

                <div className="theme-pill mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
                  {lockedText} 🔒
                </div>

                {lockedByPremium && (
                  <Link
                    href="/premium"
                    className="theme-primary-button mt-3 inline-flex rounded-xl px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {lang === "ua"
                      ? "Відкрити Premium"
                      : lang === "ru"
                        ? "Открыть Premium"
                        : "Unlock Premium"}
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
                <div className="font-medium theme-text">
                  {lessonTitle} {done ? "✅" : ""}
                </div>

                <div className="text-xs theme-text-subtle">
                  {lesson.wordsCount}{" "}
                  {lang === "ua" ? "слів" : lang === "ru" ? "слов" : "words"}
                </div>
              </div>

              <div className="mt-2 text-xs theme-text-subtle">{lesson.id}</div>

              {stats && (
                <div className="mt-1 text-xs theme-text-subtle">
                  ✅ {stats.lastCorrect} • ❌ {stats.lastWrong} /{" "}
                  {stats.lastTotal}
                </div>
              )}

              {!done && lesson.id === allowed && (
                <div className="theme-pill mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
                  {lang === "ua"
                    ? "Наступний урок"
                    : lang === "ru"
                      ? "Следующий урок"
                      : "Next lesson"}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <AudioPracticeTeaser band={band.id} />
    </div>
  );
}