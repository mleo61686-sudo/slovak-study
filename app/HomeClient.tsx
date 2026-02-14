"use client";

import Link from "next/link";
import WordsStats from "./components/WordsStats";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru";

const t = {
  ua: {
    h1: "Вивчай словацьку мову 🇸🇰 онлайн — для українців",
    heroP:
      "Slovak Study — граматика з прикладами, тематичний словник та вправи для практики. Швидкий старт українською і системне навчання по рівнях.",
    ctaLearning: "Перейти до навчання 🚀",
    ctaDict: "Відкрити словник",
    ctaGrammar: "Перейти до граматики",

    seoH2: "Онлайн курс словацької мови для українців",
    seoP1:
      "Slovak Study — це онлайн платформа для вивчення словацької мови з нуля. Тут ви знайдете граматику словацької мови з прикладами, тематичний словник, вправи для тренування та системне навчання по рівнях A0–B2.",
    seoP2:
      "Сайт підходить для українців, які планують працювати, навчатися або переїхати до Словаччини. Вивчайте словацьку мову онлайн безкоштовно, у зручному форматі з поступовим ускладненням матеріалу.",

    grammarTitle: "Граматика",
    grammarDesc: "Теми коротко й по суті + приклади та міні-вправи.",
    dictTitle: "Словник",
    dictDesc: "Пошук, теми, приклади речень і «в обране».",
    levelsTitle: "Рівні",
    levelsDesc: "Вправи: вибір відповіді, вставити слово, скласти речення.",
    open: "Відкрити →",
    start: "Почати →",
  },
  ru: {
    h1: "Изучай словацкий 🇸🇰 онлайн — для украинцев",
    heroP:
      "Slovak Study — грамматика с примерами, тематический словарь и упражнения для практики. Быстрый старт и системное обучение по уровням.",
    ctaLearning: "Перейти к обучению 🚀",
    ctaDict: "Открыть словарь",
    ctaGrammar: "Перейти к грамматике",

    seoH2: "Онлайн курс словацкого языка для украинцев",
    seoP1:
      "Slovak Study — это онлайн платформа для изучения словацкого языка с нуля. Здесь вы найдёте грамматику с примерами, тематический словарь, упражнения для тренировки и системное обучение по уровням A0–B2.",
    seoP2:
      "Сайт подходит для украинцев, которые планируют работать, учиться или переехать в Словакию. Изучайте словацкий онлайн бесплатно, в удобном формате с постепенным усложнением материала.",

    grammarTitle: "Грамматика",
    grammarDesc: "Темы кратко и по делу + примеры и мини-упражнения.",
    dictTitle: "Словарь",
    dictDesc: "Поиск, темы, примеры предложений и «в избранное».",
    levelsTitle: "Уровни",
    levelsDesc: "Упражнения: выбор ответа, вставить слово, составить предложение.",
    open: "Открыть →",
    start: "Начать →",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function HomeClient() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : "ua";
  const tr = t[L];

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            {tr.h1}
          </h1>

          <p className="max-w-2xl text-slate-700">{tr.heroP}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning" className="bg-black text-white px-4 py-2 rounded-xl">
              {tr.ctaLearning}
            </Link>

            <Link
              href="/dictionary"
              className="rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {tr.ctaDict}
            </Link>

            <Link
              href="/grammar"
              className="rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {tr.ctaGrammar}
            </Link>
          </div>
        </div>
      </section>

      {/* SEO CONTENT BLOCK */}
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">{tr.seoH2}</h2>

        <p className="text-slate-700 mb-3">{tr.seoP1}</p>

        <p className="text-slate-700">{tr.seoP2}</p>
      </section>

      {/* MAIN CARDS */}
      <section className="grid gap-4 sm:grid-cols-3">
        <WordsStats />

        <Link
          href="/grammar"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">📘</div>
          <h2 className="mt-3 text-lg font-semibold">{tr.grammarTitle}</h2>
          <p className="mt-1 text-sm text-slate-700">{tr.grammarDesc}</p>
          <div className="mt-4 text-sm font-semibold">{tr.open}</div>
        </Link>

        <Link
          href="/dictionary"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">📚</div>
          <h2 className="mt-3 text-lg font-semibold">{tr.dictTitle}</h2>
          <p className="mt-1 text-sm text-slate-700">{tr.dictDesc}</p>
          <div className="mt-4 text-sm font-semibold">{tr.open}</div>
        </Link>

        <Link
          href="/learning"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">🏋️</div>
          <h2 className="mt-3 text-lg font-semibold">{tr.levelsTitle}</h2>
          <p className="mt-1 text-sm text-slate-700">{tr.levelsDesc}</p>
          <div className="mt-4 text-sm font-semibold">{tr.start}</div>
        </Link>
      </section>
    </div>
  );
}
