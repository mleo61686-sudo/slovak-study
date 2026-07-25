"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CourseId } from "@/app/learning/courses/registry";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import {
  createEmptyMistakeStore,
  getActiveMistakes,
  getResolvedMistakes,
  MISTAKE_CORRECT_STREAK_TO_RESOLVE,
  reopenMistake,
  type PracticeMistakeStore,
} from "../practice-mistakes";
import {
  hydrateMistakeStore,
  loadLocalMistakeStore,
  PRACTICE_MISTAKES_UPDATED_EVENT,
  saveLocalMistakeStore,
  syncMistakeStore,
} from "../practice-mistakes-storage";

const COPY = {
  ua: {
    eyebrow: "Персональна практика",
    title: "Мої помилки",
    subtitle:
      "Тут зберігаються слова, у яких ти помилявся. Три правильні відповіді поспіль — і слово переходить у виправлені.",
    active: "Потрібно виправити",
    resolved: "Виправлено",
    totalErrors: "Усього помилок",
    train: "Виправити помилки",
    back: "До тренажера",
    emptyTitle: "Поки що помилок немає",
    emptyText: "Почни тренування — неправильні відповіді автоматично зʼявляться тут.",
    emptyCta: "Почати тренування",
    errors: "Помилок",
    streak: "Правильно поспіль",
    yourAnswer: "Остання відповідь",
    corrected: "Виправлено",
    restore: "Повернути до практики",
    activeList: "Слова для виправлення",
    resolvedList: "Виправлені слова",
    syncing: "Синхронізація…",
  },
  ru: {
    eyebrow: "Персональная практика",
    title: "Мои ошибки",
    subtitle:
      "Здесь сохраняются слова, в которых ты ошибался. Три правильных ответа подряд — и слово переходит в исправленные.",
    active: "Нужно исправить",
    resolved: "Исправлено",
    totalErrors: "Всего ошибок",
    train: "Исправить ошибки",
    back: "К тренажёру",
    emptyTitle: "Пока ошибок нет",
    emptyText: "Начни тренировку — неправильные ответы автоматически появятся здесь.",
    emptyCta: "Начать тренировку",
    errors: "Ошибок",
    streak: "Правильно подряд",
    yourAnswer: "Последний ответ",
    corrected: "Исправлено",
    restore: "Вернуть в практику",
    activeList: "Слова для исправления",
    resolvedList: "Исправленные слова",
    syncing: "Синхронизация…",
  },
  en: {
    eyebrow: "Personal practice",
    title: "My mistakes",
    subtitle:
      "Words you miss are saved here. Get one right three times in a row and it moves to corrected.",
    active: "To correct",
    resolved: "Corrected",
    totalErrors: "Total mistakes",
    train: "Fix my mistakes",
    back: "Back to trainer",
    emptyTitle: "No mistakes yet",
    emptyText: "Start a session and wrong answers will automatically appear here.",
    emptyCta: "Start training",
    errors: "Mistakes",
    streak: "Correct in a row",
    yourAnswer: "Last answer",
    corrected: "Corrected",
    restore: "Return to practice",
    activeList: "Words to correct",
    resolvedList: "Corrected words",
    syncing: "Syncing…",
  },
} as const;

function formatDate(value: string, lang: "ua" | "ru" | "en") {
  try {
    return new Intl.DateTimeFormat(
      lang === "en" ? "en-GB" : lang === "ru" ? "ru-RU" : "uk-UA",
      { day: "2-digit", month: "short" }
    ).format(new Date(value));
  } catch {
    return "";
  }
}

export default function MistakesClient({ courseId }: { courseId: CourseId }) {
  const { lang } = useLanguage();
  const uiLang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = COPY[uiLang];
  const [store, setStore] = useState<PracticeMistakeStore>(() =>
    createEmptyMistakeStore()
  );
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    const local = loadLocalMistakeStore(courseId);
    setStore(local);

    let cancelled = false;

    void hydrateMistakeStore(courseId).then((next) => {
      if (cancelled) return;
      setStore(next);
      setSyncing(false);
    });

    const onUpdated = (event: Event) => {
      const detail = (event as CustomEvent<{ courseId?: CourseId; store?: PracticeMistakeStore }>).detail;
      if (detail?.courseId === courseId && detail.store) {
        setStore(detail.store);
      }
    };

    window.addEventListener(PRACTICE_MISTAKES_UPDATED_EVENT, onUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener(PRACTICE_MISTAKES_UPDATED_EVENT, onUpdated);
    };
  }, [courseId]);

  const active = useMemo(() => getActiveMistakes(store, courseId), [store, courseId]);
  const resolved = useMemo(() => getResolvedMistakes(store, courseId), [store, courseId]);
  const totalErrors = useMemo(
    () => [...active, ...resolved].reduce((sum, item) => sum + item.wrongCount, 0),
    [active, resolved]
  );

  function restore(term: string) {
    const next = reopenMistake(store, courseId, term);
    setStore(next);
    saveLocalMistakeStore(next, courseId);
    void syncMistakeStore(courseId, next);
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 theme-text">
      <section className="flunio-card relative overflow-hidden rounded-[32px] p-5 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-rose-500/20 blur-[70px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-14 h-48 w-48 rounded-full bg-cyan-400/15 blur-[70px]" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-rose-400">
            <span>🎯</span> {t.eyebrow}
          </div>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black sm:text-4xl">{t.title}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 theme-text-muted sm:text-base">
                {t.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/practice"
                className="theme-secondary-button rounded-2xl px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5"
              >
                ← {t.back}
              </Link>
              <Link
                href="/practice?mistakes=1"
                aria-disabled={active.length === 0}
                className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                  active.length
                    ? "theme-primary-button hover:-translate-y-0.5"
                    : "pointer-events-none border border-white/10 bg-white/5 opacity-40"
                }`}
              >
                {t.train} →
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatCard label={t.active} value={active.length} icon="⚠️" />
            <StatCard label={t.resolved} value={resolved.length} icon="✅" />
            <StatCard label={t.totalErrors} value={totalErrors} icon="📊" />
          </div>

          {syncing ? (
            <div className="mt-3 text-xs theme-text-subtle">{t.syncing}</div>
          ) : null}
        </div>
      </section>

      {active.length === 0 ? (
        <section className="flunio-card rounded-[30px] p-7 text-center sm:p-10">
          <div className="text-5xl">✨</div>
          <h2 className="mt-4 text-2xl font-bold">{t.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 theme-text-muted">
            {t.emptyText}
          </p>
          <Link
            href="/practice"
            className="theme-primary-button mt-5 inline-flex rounded-2xl px-5 py-3 text-sm font-bold"
          >
            {t.emptyCta} →
          </Link>
        </section>
      ) : (
        <section className="flunio-card rounded-[30px] p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">{t.activeList}</h2>
            <span className="theme-pill rounded-full px-3 py-1 text-xs font-bold">
              {active.length}
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {active.map((item) => {
              const translation =
                uiLang === "en" ? item.en : uiLang === "ru" ? item.ru : item.ua;

              return (
                <article key={item.id} className="theme-home-soft-card rounded-3xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-lg font-black">{item.sk}</div>
                      <div className="mt-1 text-sm theme-text-muted">{translation}</div>
                    </div>
                    <SpeakButton text={item.sk} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="theme-pill rounded-2xl px-3 py-2.5">
                      <div className="text-xs theme-text-subtle">{t.errors}</div>
                      <div className="mt-1 font-black text-rose-400">{item.wrongCount}</div>
                    </div>
                    <div className="theme-pill rounded-2xl px-3 py-2.5">
                      <div className="text-xs theme-text-subtle">{t.streak}</div>
                      <div className="mt-1 font-black text-emerald-400">
                        {item.correctStreak}/{MISTAKE_CORRECT_STREAK_TO_RESOLVE}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/15 theme-simple:bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (item.correctStreak / MISTAKE_CORRECT_STREAK_TO_RESOLVE) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  {item.lastAnswer ? (
                    <div className="mt-3 text-xs theme-text-subtle">
                      {t.yourAnswer}: <span className="font-semibold theme-text-muted">{item.lastAnswer}</span>
                    </div>
                  ) : null}
                  <div className="mt-1 text-xs theme-text-subtle">
                    {formatDate(item.lastWrongAt, uiLang)}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {resolved.length ? (
        <details className="flunio-card overflow-hidden rounded-[30px]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-bold sm:px-6">
            <span>{t.resolvedList}</span>
            <span className="theme-pill rounded-full px-3 py-1 text-xs">{resolved.length}</span>
          </summary>
          <div className="grid gap-3 border-t border-white/10 p-5 sm:grid-cols-2 sm:p-6">
            {resolved.slice(0, 50).map((item) => {
              const translation =
                uiLang === "en" ? item.en : uiLang === "ru" ? item.ru : item.ua;
              return (
                <div key={item.id} className="theme-home-soft-card rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold">{item.sk}</div>
                      <div className="mt-1 text-sm theme-text-muted">{translation}</div>
                      <div className="mt-2 text-xs text-emerald-400">
                        {t.corrected}: {formatDate(item.resolvedAt ?? item.updatedAt, uiLang)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => restore(item.sk)}
                      className="theme-secondary-button rounded-xl px-3 py-2 text-xs font-bold"
                    >
                      {t.restore}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      ) : null}
    </main>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="theme-home-soft-card rounded-3xl p-4">
      <div className="text-2xl">{icon}</div>
      <div className="mt-3 text-3xl font-black">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wide theme-text-subtle">
        {label}
      </div>
    </div>
  );
}
