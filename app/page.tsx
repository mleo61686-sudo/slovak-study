"use client";

import Link from "next/link";
import WordsStats from "./components/WordsStats";
import { useLanguage } from "@/lib/src/useLanguage";

export default function HomePage() {
  const { lang } = useLanguage();

  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            {t(
              "Вивчай словацьку 🇸🇰 просто й системно",
              "Учи словацкий 🇸🇰 просто и системно"
            )}
          </h1>

          <p className="max-w-2xl text-slate-700">
            {t(
              "Граматика з прикладами, зручний словник і тренажер вправ. Інтерфейс українською — щоб було легко стартувати.",
              "Грамматика с примерами, удобный словарь и тренажёр упражнений. Интерфейс на русском — чтобы было легко стартовать."
            )}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/learning"
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              {t("Перейти до навчання 🚀", "Перейти к обучению 🚀")}
            </Link>

            <Link
              href="/dictionary"
              className="rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {t("Відкрити словник", "Открыть словарь")}
            </Link>

            <Link
              href="/grammar"
              className="rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {t("Перейти до граматики", "Перейти к грамматике")}
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CARDS */}
      <section className="grid gap-4 sm:grid-cols-3">
        {/* WORDS STATS */}
        <WordsStats />

        {/* GRAMMAR */}
        <Link
          href="/grammar"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">📘</div>
          <h2 className="mt-3 text-lg font-semibold">
            {t("Граматика", "Грамматика")}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {t(
              "Теми коротко й по суті + приклади та міні-вправи.",
              "Темы коротко и по сути + примеры и мини-упражнения."
            )}
          </p>

          <div className="mt-4 text-sm font-semibold">
            {t("Відкрити →", "Открыть →")}
          </div>
        </Link>

        {/* DICTIONARY */}
        <Link
          href="/dictionary"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">📚</div>
          <h2 className="mt-3 text-lg font-semibold">
            {t("Словник", "Словарь")}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {t(
              "Пошук, теми, приклади речень і «в обране».",
              "Поиск, темы, примеры предложений и «в избранное»."
            )}
          </p>

          <div className="mt-4 text-sm font-semibold">
            {t("Відкрити →", "Открыть →")}
          </div>
        </Link>

        {/* TRAINER */}
        <Link
          href="/learning"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">🏋️</div>
          <h2 className="mt-3 text-lg font-semibold">
            {t("Рівні", "Уровни")}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {t(
              "Вправи: вибір відповіді, вставити слово, скласти речення.",
              "Упражнения: выбор ответа, вставить слово, составить предложение."
            )}
          </p>

          <div className="mt-4 text-sm font-semibold">
            {t("Почати →", "Начать →")}
          </div>
        </Link>
      </section>
    </div>
  );
}