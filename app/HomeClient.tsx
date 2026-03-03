"use client";

import Link from "next/link";
import WordsStats from "./components/WordsStats";
import { useLanguage } from "@/lib/src/useLanguage";
import { UPDATES } from "@/app/updates/updates";

type Lang = "ua" | "ru";

const t = {
  ua: {
    h1: "Вивчи словацьку з нуля до рівня B2 — для роботи та життя в Словаччині",
    heroP:
      "Вивчай словацьку онлайн: уроки A0–B1, словник, граматика та вправи. Почни безкоштовно і займайся всього 10 хвилин на день.",
    ctaLearning: "Перейти до навчання 🚀",
    ctaDict: "Відкрити словник",
    ctaGrammar: "Перейти до граматики",

    // ✅ FREE BLOCK (UA)
    free: [
      "Рівні A0–A2 безкоштовно",
      "700+ слів і фраз",
      "2 нові уроки щодня без оплати",
    ],

    seoH2: "Онлайн курс словацької мови",
    seoP1:
      "Slovak Study — це онлайн платформа для вивчення словацької мови з нуля. Тут ви знайдете граматику словацької мови з прикладами, тематичний словник, вправи для тренування та системне навчання по рівнях A0–B2.",
    seoP2:
      "Сайт підходить для людей, які планують працювати, навчатися або переїхати до Словаччини. Вивчайте словацьку мову онлайн безкоштовно, у зручному форматі з поступовим ускладненням матеріалу.",

    premiumTitle: "Premium — навчання без обмежень 🚀",
    premiumSubtitle:
      "Відкрий усі рівні A0–B2 одразу та проходь уроки без денного ліміту.",
    premiumBullets: [
      "🔓 Всі рівні та уроки відкриті одразу (A0–B2)",
      "🎓 Доступ до рівня B1",
      "🚫 Без денного ліміту на нові уроки",
      "🏋️ Повний доступ до тренажера",
      "🔁 Повторення тільки помилок",
      "📊 Статистика, серії та рекорди",
      "🔊 Озвучка слів (Premium)",
    ],
    premiumPriceNote: "7.99€ / місяць • можна скасувати будь-коли",
    premiumCta: "Спробувати Premium →",
    premiumSecondary: "Подивитись тренажер →",

    grammarTitle: "Граматика",
    grammarDesc: "Теми коротко й по суті + приклади та міні-вправи.",
    dictTitle: "Словник",
    dictDesc: "Пошук, теми, приклади речень і «в обране».",
    levelsTitle: "Рівні",
    levelsDesc: "Вправи: вибір відповіді, вставити слово, скласти речення.",
    open: "Відкрити →",
    start: "Почати →",

    strip: [
      { k: "A0–B2", v: "Навчання по рівнях" },
      { k: "10 хв/день", v: "Короткі уроки" },
      { k: "Практика", v: "Тренажер і повторення" },
    ],
  },

  ru: {
    h1: "Выучи словацкий с нуля до уровня B2 — для работы и жизни в Словакии",
    heroP:
      "Изучай словацкий онлайн: уроки A0–B1, словарь, грамматика и упражнения. Начни бесплатно и занимайся всего 10 минут в день.",
    ctaLearning: "Перейти к обучению 🚀",
    ctaDict: "Открыть словарь",
    ctaGrammar: "Перейти к грамматике",

    // ✅ FREE BLOCK (RU)
    free: [
      "Уровни A0–A2 бесплатно",
      "700+ слов и фраз",
      "2 новых урока ежедневно без оплаты",
    ],

    seoH2: "Онлайн курс словацкого языка",
    seoP1:
      "Slovak Study — это онлайн платформа для изучения словацкого языка с нуля. Здесь вы найдёте грамматику с примерами, тематический словарь, упражнения для тренировки и системное обучение по уровням A0–B2.",
    seoP2:
      "Сайт подходит для людей, которые планируют работать, учиться или переехать в Словакию. Изучайте словацкий онлайн бесплатно, в удобном формате с постепенным усложнением материала.",

    premiumTitle: "Premium — обучение без ограничений 🚀",
    premiumSubtitle:
      "Открой все уровни A0–B2 сразу и проходи уроки без дневного лимита.",
    premiumBullets: [
      "🔓 Все уровни и уроки открыты сразу (A0–B2)",
      "🎓 Доступ до уровня B1",
      "🚫 Без дневного лимита на новые уроки",
      "🏋️ Полный доступ к тренажёру",
      "🔁 Повторять только ошибки",
      "📊 Статистика, серии и рекорды",
      "🔊 Озвучка слов (Premium)",
    ],
    premiumPriceNote: "7.99€ / месяц • можно отменить в любой момент",
    premiumCta: "Попробовать Premium →",
    premiumSecondary: "Посмотреть тренажёр →",

    grammarTitle: "Грамматика",
    grammarDesc: "Темы кратко и по делу + примеры и мини-упражнения.",
    dictTitle: "Словарь",
    dictDesc: "Поиск, темы, примеры предложений и «в избранное».",
    levelsTitle: "Уровни",
    levelsDesc:
      "Упражнения: выбор ответа, вставить слово, составить предложение.",
    open: "Открыть →",
    start: "Начать →",

    strip: [
      { k: "A0–B2", v: "Обучение по уровням" },
      { k: "10 мин/день", v: "Короткие уроки" },
      { k: "Практика", v: "Тренажёр и повторение" },
    ],
  },
} satisfies Record<Lang, any>;

function StatPill({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm ring-1 ring-black/5 backdrop-blur">
      <div className="text-sm font-semibold text-slate-900">{k}</div>
      <div className="text-xs text-slate-600">{v}</div>
    </div>
  );
}

export default function HomeClient() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : "ua";
  const tr = t[L];
  const latestDate = UPDATES[0]?.date; // "YYYY-MM-DD"
  const latestBadge = latestDate ? latestDate.slice(5).replace("-", ".") : null; // "MM.DD"

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 ring-1 ring-black/5">
        {/* controlled highlights (не лізуть вниз) */}
        <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-amber-200/20 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-slate-200/35 blur-2xl" />

        <div className="relative space-y-5">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {tr.h1}
          </h1>

          <p className="max-w-2xl text-base text-slate-700 sm:text-lg">
            {tr.heroP}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/learning"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-black"
            >
              {tr.ctaLearning}
            </Link>

            <Link
              href="/dictionary"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {tr.ctaDict}
            </Link>

            <Link
              href="/grammar"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {tr.ctaGrammar}
            </Link>
          </div>

          {/* FREE BLOCK (UA/RU via t.free) */}
          <div className="mt-4 text-sm text-slate-700 space-y-1">
            {tr.free.map((item: string) => (
              <div key={item}>✅ {item}</div>
            ))}
          </div>

          <div className="mt-3">
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              ✨ {L === "ru" ? "Что нового" : "Що нового"}
              {latestBadge && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 bg-amber-200 font-bold text-amber-900">
                  {latestBadge.split(".").reverse().join(".")}
                </span>
              )}
            </Link>
          </div>

          {/* value strip */}
          <div className="grid gap-3 pt-3 sm:grid-cols-3">
            {tr.strip.map((it: any) => (
              <StatPill key={it.k} k={it.k} v={it.v} />
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM (без fade і без overlap) */}
      <section className="relative">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 shadow-sm text-white">
          {/* glow */}
          <div className="pointer-events-none absolute -top-24 left-10 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
          {/* top highlight line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                Premium
              </div>

              <h2 className="text-2xl font-semibold">{tr.premiumTitle}</h2>
              <p className="max-w-2xl text-white/80">{tr.premiumSubtitle}</p>

              <ul className="grid gap-2 sm:grid-cols-2">
                {tr.premiumBullets.map((item: string) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="text-sm text-white/70">{tr.premiumPriceNote}</div>
            </div>

            <div className="flex flex-col gap-3 sm:pt-2">
              <Link
                href="/premium"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-amber-400 px-6 text-sm font-semibold text-black hover:opacity-90"
              >
                {tr.premiumCta}
              </Link>

              <Link
                href="/premium"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/15"
              >
                Тренажер 🔒
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CARDS */}
      <section className="grid gap-4 sm:grid-cols-3">
        <WordsStats />

        <Link
          href="/grammar"
          className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:bg-slate-50"
        >
          <div className="text-2xl">📘</div>
          <h2 className="mt-3 text-lg font-semibold">{tr.grammarTitle}</h2>
          <p className="mt-1 text-sm text-slate-700">{tr.grammarDesc}</p>
          <div className="mt-4 text-sm font-semibold">{tr.open}</div>
        </Link>

        <Link
          href="/dictionary"
          className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:bg-slate-50"
        >
          <div className="text-2xl">📚</div>
          <h2 className="mt-3 text-lg font-semibold">{tr.dictTitle}</h2>
          <p className="mt-1 text-sm text-slate-700">{tr.dictDesc}</p>
          <div className="mt-4 text-sm font-semibold">{tr.open}</div>
        </Link>

        <Link
          href="/learning"
          className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:bg-slate-50"
        >
          <div className="text-2xl">🏋️</div>
          <h2 className="mt-3 text-lg font-semibold">{tr.levelsTitle}</h2>
          <p className="mt-1 text-sm text-slate-700">{tr.levelsDesc}</p>
          <div className="mt-4 text-sm font-semibold">{tr.start}</div>
        </Link>
      </section>

      {/* SEO CONTENT */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h2 className="mb-3 text-xl font-semibold">{tr.seoH2}</h2>
        <p className="mb-3 text-slate-700">{tr.seoP1}</p>
        <p className="text-slate-700">{tr.seoP2}</p>
      </section>
    </div>
  );
}