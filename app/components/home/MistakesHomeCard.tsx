"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CourseId } from "@/app/learning/courses/registry";
import {
  createEmptyMistakeStore,
  getActiveMistakes,
  type PracticeMistakeStore,
} from "@/app/practice/practice-mistakes";
import {
  hydrateMistakeStore,
  loadLocalMistakeStore,
  PRACTICE_MISTAKES_UPDATED_EVENT,
} from "@/app/practice/practice-mistakes-storage";

type Lang = "ua" | "ru" | "en";

const COPY = {
  ua: {
    eyebrow: "Персональне повторення",
    title: "Мої помилки",
    none: "Невиправлених помилок поки немає.",
    one: "У тебе 1 слово для виправлення.",
    many: (count: number) => `У тебе ${count} слів для виправлення.`,
    cta: "Виправити помилки",
    view: "Переглянути список",
  },
  ru: {
    eyebrow: "Персональное повторение",
    title: "Мои ошибки",
    none: "Неисправленных ошибок пока нет.",
    one: "У тебя 1 слово для исправления.",
    many: (count: number) => `У тебя ${count} слов для исправления.`,
    cta: "Исправить ошибки",
    view: "Посмотреть список",
  },
  en: {
    eyebrow: "Personal review",
    title: "My mistakes",
    none: "No unresolved mistakes yet.",
    one: "You have 1 word to correct.",
    many: (count: number) => `You have ${count} words to correct.`,
    cta: "Fix mistakes",
    view: "View list",
  },
} as const;

function normalizeCourseId(value: string): CourseId {
  return value === "cs" || value === "pl" ? value : "sk";
}

export default function MistakesHomeCard({
  lang,
  courseId,
}: {
  lang: Lang;
  courseId: string;
}) {
  const normalizedCourseId = normalizeCourseId(courseId);
  const [store, setStore] = useState<PracticeMistakeStore>(() =>
    createEmptyMistakeStore()
  );
  const t = COPY[lang];

  useEffect(() => {
    const local = loadLocalMistakeStore(normalizedCourseId);
    setStore(local);

    let cancelled = false;

    void hydrateMistakeStore(normalizedCourseId).then((next) => {
      if (!cancelled) setStore(next);
    });

    const onUpdated = (event: Event) => {
      const detail = (event as CustomEvent<{ courseId?: CourseId; store?: PracticeMistakeStore }>).detail;
      if (detail?.courseId === normalizedCourseId && detail.store) {
        setStore(detail.store);
      }
    };

    window.addEventListener(PRACTICE_MISTAKES_UPDATED_EVENT, onUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener(PRACTICE_MISTAKES_UPDATED_EVENT, onUpdated);
    };
  }, [normalizedCourseId]);

  const active = useMemo(
    () => getActiveMistakes(store, normalizedCourseId),
    [store, normalizedCourseId]
  );
  const count = active.length;
  const message = count === 0 ? t.none : count === 1 ? t.one : t.many(count);

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-rose-400/20 bg-gradient-to-r from-rose-500/12 via-fuchsia-500/10 to-cyan-500/10 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] sm:p-6">
      <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-rose-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/3 h-36 w-36 rounded-full bg-cyan-400/12 blur-3xl" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-400/10 text-2xl">
            🎯
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-rose-400">
              {t.eyebrow}
            </div>
            <h2 className="theme-text mt-1 text-2xl font-black">{t.title}</h2>
            <p className="theme-text-muted mt-2 text-sm leading-6">{message}</p>
            {count ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {active.slice(0, 3).map((item) => (
                  <span key={item.id} className="theme-pill rounded-full px-3 py-1 text-xs font-semibold">
                    {item.sk}
                  </span>
                ))}
                {count > 3 ? (
                  <span className="theme-pill rounded-full px-3 py-1 text-xs font-semibold">
                    +{count - 3}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            href="/practice/mistakes"
            className="theme-secondary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold"
          >
            {t.view}
          </Link>
          <Link
            href={count ? "/practice?mistakes=1" : "/practice"}
            className="theme-primary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5"
          >
            {t.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
