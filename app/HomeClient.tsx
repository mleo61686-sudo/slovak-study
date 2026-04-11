"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type Lang = "ua" | "ru" | "en";
type SeoCourseId = "sk" | "cs" | "pl";

type PopularCard = {
  href: string;
  title: string;
  desc: string;
};

type StatItem = {
  k: string;
  v: string;
};

type HomeTranslations = {
  h1: string;
  heroP: string;
  ctaLearning: string;
  ctaDict: string;
  ctaGrammar: string;

  free: string[];

  seoH2: string;
  seoP1: string;
  seoP2: string;

  premiumTitle: string;
  premiumSubtitle: string;
  premiumBullets: string[];
  premiumPriceNote: string;
  premiumCta: string;
  trainerLocked: string;

  grammarTitle: string;
  grammarDesc: string;
  dictTitle: string;
  dictDesc: string;
  levelsTitle: string;
  levelsDesc: string;
  open: string;
  start: string;
  whatsNew: string;

  popularTitleByCourse: Record<SeoCourseId, string>;
  popularDescByCourse: Record<SeoCourseId, string>;
  popularCardsByCourse: Record<SeoCourseId, PopularCard[]>;

  strip: StatItem[];
};

const WordsStats = dynamic(() => import("./components/WordsStats"), {
  ssr: false,
  loading: () => <WordsStatsSkeleton />,
});

const t: Record<Lang, HomeTranslations> = {
  ua: {
    h1: "Вивчай словацьку, чеську та польську з нуля до B2 — для роботи, життя та переїзду",
    heroP:
      "Flunio — це онлайн платформа для вивчення словацької, чеської та польської мов: уроки A0–B2, словник, граматика та вправи. Почни безкоштовно і займайся всього 10 хвилин на день.",
    ctaLearning: "Перейти до навчання 🚀",
    ctaDict: "Відкрити словник",
    ctaGrammar: "Перейти до граматики",

    free: [
      "Словацький, чеський і польський курси вже доступні",
      "Рівні A0–A2 безкоштовно",
      "2 нові уроки щодня без оплати",
    ],

    seoH2: "Онлайн курс словацької, чеської та польської мов",
    seoP1:
      "Flunio — це онлайн платформа для вивчення словацької, чеської та польської мов з нуля. Тут ви знайдете граматику з прикладами, тематичний словник, вправи для тренування та системне навчання по рівнях A0–B2.",
    seoP2:
      "Сайт підходить для людей, які планують працювати, навчатися або жити в Європі. Вивчайте словацьку, чеську та польську онлайн у зручному форматі, з короткими уроками, поступовим ускладненням матеріалу та практикою для реального життя.",

    premiumTitle: "Premium — навчання без обмежень 🚀",
    premiumSubtitle:
      "Відкрий усі рівні A0–B2 та отримай повний доступ до всіх доступних курсів без денного ліміту.",
    premiumBullets: [
      "🔓 Усі рівні та уроки відкриті одразу (A0–B2)",
      "🇸🇰 Повний доступ до словацького курсу",
      "🇨🇿 Повний доступ до чеського курсу",
      "🇵🇱 Повний доступ до польського курсу",
      "🚫 Без денного ліміту на нові уроки",
      "🏋️ Повний доступ до тренажера",
      "🔁 Повторення тільки помилок",
      "📊 Статистика, серії та рекорди",
      "🔊 Озвучка слів (Premium)",
    ],
    premiumPriceNote: "7.99€ / місяць • можна скасувати будь-коли",
    premiumCta: "Спробувати Premium →",
    trainerLocked: "Тренажер 🔒",

    grammarTitle: "Граматика",
    grammarDesc: "Теми коротко й по суті + приклади та міні-вправи.",
    dictTitle: "Словник",
    dictDesc: "Пошук, теми, приклади речень і «в обране».",
    levelsTitle: "Рівні",
    levelsDesc: "Вправи: вибір відповіді, вставити слово, скласти речення.",
    open: "Відкрити →",
    start: "Почати →",
    whatsNew: "Що нового",

    popularTitleByCourse: {
      sk: "Популярні сторінки для старту",
      cs: "Популярні сторінки для старту",
      pl: "Популярні сторінки для старту",
    },

    popularDescByCourse: {
      sk: "Якщо хочеш швидко почати або знайти корисні матеріали, ось найважливіші сторінки по словацькій.",
      cs: "Якщо хочеш швидко почати або знайти корисні матеріали, ось найважливіші сторінки по чеській.",
      pl: "Якщо хочеш швидко почати або знайти корисні матеріали, ось найважливіші сторінки по польській.",
    },

    popularCardsByCourse: {
      sk: [
        {
          href: "/vyvchennia-slovatskoi-movy-online",
          title: "Вивчення словацької онлайн",
          desc: "Огляд онлайн-курсу словацької: рівні, вправи, словник, граматика та озвучка.",
        },
        {
          href: "/learn-slovak",
          title: "Learn Slovak",
          desc: "Англомовна сторінка про платформу та вивчення словацької онлайн.",
        },
      ],
      cs: [
        {
          href: "/vyvchennia-cheskoi-movy-online",
          title: "Вивчення чеської онлайн",
          desc: "Огляд онлайн-курсу чеської: рівні, вправи, словник, граматика та озвучка.",
        },
        {
          href: "/learn-czech",
          title: "Learn Czech",
          desc: "Англомовна сторінка про платформу та вивчення чеської онлайн.",
        },
      ],
      pl: [
        {
          href: "/vyvchennia-polskoi-movy-online",
          title: "Вивчення польської онлайн",
          desc: "Огляд онлайн-курсу польської: рівні, вправи, словник, граматика та озвучка.",
        },
        {
          href: "/learn-polish",
          title: "Learn Polish",
          desc: "Англомовна сторінка про платформу та вивчення польської онлайн.",
        },
      ],
    },

    strip: [
      { k: "3 мови", v: "Словацька, чеська та польська" },
      { k: "A0–B2", v: "Навчання по рівнях" },
      { k: "10 хв/день", v: "Короткі уроки" },
    ],
  },

  ru: {
    h1: "Изучай словацкий, чешский и польский с нуля до B2 — для работы, жизни и переезда",
    heroP:
      "Flunio — это онлайн платформа для изучения словацкого, чешского и польского языков: уроки A0–B2, словарь, грамматика и упражнения. Начни бесплатно и занимайся всего 10 минут в день.",
    ctaLearning: "Перейти к обучению 🚀",
    ctaDict: "Открыть словарь",
    ctaGrammar: "Перейти к грамматике",

    free: [
      "Словацкий, чешский и польский курсы уже доступны",
      "Уровни A0–A2 бесплатно",
      "2 новых урока ежедневно без оплаты",
    ],

    seoH2: "Онлайн курс словацкого, чешского и польского языков",
    seoP1:
      "Flunio — это онлайн платформа для изучения словацкого, чешского и польского языков с нуля. Здесь вы найдёте грамматику с примерами, тематический словарь, упражнения для тренировки и системное обучение по уровням A0–B2.",
    seoP2:
      "Сайт подходит для людей, которые планируют работать, учиться или жить в Европе. Изучайте словацкий, чешский и польский онлайн в удобном формате: короткие уроки, постепенное усложнение материала и практика для реальной жизни.",

    premiumTitle: "Premium — обучение без ограничений 🚀",
    premiumSubtitle:
      "Открой все уровни A0–B2 и получи полный доступ ко всем доступным курсам без дневного лимита.",
    premiumBullets: [
      "🔓 Все уровни и уроки открыты сразу (A0–B2)",
      "🇸🇰 Полный доступ к словацкому курсу",
      "🇨🇿 Полный доступ к чешскому курсу",
      "🇵🇱 Полный доступ к польскому курсу",
      "🚫 Без дневного лимита на новые уроки",
      "🏋️ Полный доступ к тренажёру",
      "🔁 Повторять только ошибки",
      "📊 Статистика, серии и рекорды",
      "🔊 Озвучка слов (Premium)",
    ],
    premiumPriceNote: "7.99€ / месяц • можно отменить в любой момент",
    premiumCta: "Попробовать Premium →",
    trainerLocked: "Тренажёр 🔒",

    grammarTitle: "Грамматика",
    grammarDesc: "Темы кратко и по делу + примеры и мини-упражнения.",
    dictTitle: "Словарь",
    dictDesc: "Поиск, темы, примеры предложений и «в избранное».",
    levelsTitle: "Уровни",
    levelsDesc:
      "Упражнения: выбор ответа, вставить слово, составить предложение.",
    open: "Открыть →",
    start: "Начать →",
    whatsNew: "Что нового",

    popularTitleByCourse: {
      sk: "Популярные страницы для старта",
      cs: "Популярные страницы для старта",
      pl: "Популярные страницы для старта",
    },

    popularDescByCourse: {
      sk: "Если хочешь быстро начать или найти полезные материалы, вот самые важные страницы по словацкому.",
      cs: "Если хочешь быстро начать или найти полезные материалы, вот самые важные страницы по чешскому.",
      pl: "Если хочешь быстро начать или найти полезные материалы, вот самые важные страницы по польскому.",
    },

    popularCardsByCourse: {
      sk: [
        {
          href: "/ru/vyvchennia-slovatskoi-movy-online",
          title: "Изучение словацкого онлайн",
          desc: "Обзор онлайн-курса словацкого: уровни, упражнения, словарь, грамматика и озвучка.",
        },
        {
          href: "/learn-slovak",
          title: "Learn Slovak",
          desc: "Англоязычная страница о платформе и изучении словацкого онлайн.",
        },
      ],
      cs: [
        {
          href: "/ru/vyvchennia-cheskoi-movy-online",
          title: "Изучение чешского онлайн",
          desc: "Обзор онлайн-курса чешского: уровни, упражнения, словарь, грамматика и озвучка.",
        },
        {
          href: "/learn-czech",
          title: "Learn Czech",
          desc: "Англоязычная страница о платформе и изучении чешского онлайн.",
        },
      ],
      pl: [
        {
          href: "/ru/vyvchennia-polskoi-movy-online",
          title: "Изучение польского онлайн",
          desc: "Обзор онлайн-курса польского: уровни, упражнения, словарь, грамматика и озвучка.",
        },
        {
          href: "/learn-polish",
          title: "Learn Polish",
          desc: "Англоязычная страница о платформе и изучении польского онлайн.",
        },
      ],
    },

    strip: [
      { k: "3 языка", v: "Словацкий, чешский и польский" },
      { k: "A0–B2", v: "Обучение по уровням" },
      { k: "10 мин/день", v: "Короткие уроки" },
    ],
  },

  en: {
    h1: "Learn Slovak, Czech, and Polish from zero to B2 — for work, life, and relocation",
    heroP:
      "Flunio is an online platform for learning Slovak, Czech, and Polish: A0–B2 lessons, dictionary, grammar, and exercises. Start for free and study in just 10 minutes a day.",
    ctaLearning: "Go to learning 🚀",
    ctaDict: "Open dictionary",
    ctaGrammar: "Go to grammar",

    free: [
      "Slovak, Czech, and Polish courses are already available",
      "A0–A2 levels are free",
      "2 new lessons daily without payment",
    ],

    seoH2: "Online Slovak, Czech, and Polish course",
    seoP1:
      "Flunio is an online platform for learning Slovak, Czech, and Polish from scratch. Here you will find grammar with examples, a thematic dictionary, practice exercises, and structured learning across A0–B2 levels.",
    seoP2:
      "The website is suitable for people who plan to work, study, or live in Europe. Learn Slovak, Czech, and Polish online in a convenient format with short lessons, gradual progression, and practice for real life.",

    premiumTitle: "Premium — learning without limits 🚀",
    premiumSubtitle:
      "Unlock all A0–B2 levels and get full access to all available courses with no daily limit.",
    premiumBullets: [
      "🔓 All levels and lessons unlocked instantly (A0–B2)",
      "🇸🇰 Full access to the Slovak course",
      "🇨🇿 Full access to the Czech course",
      "🇵🇱 Full access to the Polish course",
      "🚫 No daily limit on new lessons",
      "🏋️ Full access to the trainer",
      "🔁 Review only mistakes",
      "📊 Statistics, streaks, and records",
      "🔊 Word audio (Premium)",
    ],
    premiumPriceNote: "€7.99 / month • cancel anytime",
    premiumCta: "Try Premium →",
    trainerLocked: "Trainer 🔒",

    grammarTitle: "Grammar",
    grammarDesc: "Topics kept short and clear + examples and mini exercises.",
    dictTitle: "Dictionary",
    dictDesc: "Search, topics, example sentences, and favorites.",
    levelsTitle: "Levels",
    levelsDesc: "Exercises: choose the answer, insert the word, build a sentence.",
    open: "Open →",
    start: "Start →",
    whatsNew: "What’s new",

    popularTitleByCourse: {
      sk: "Popular pages to start with",
      cs: "Popular pages to start with",
      pl: "Popular pages to start with",
    },

    popularDescByCourse: {
      sk: "If you want to start quickly or find useful materials, here are the most important Slovak pages.",
      cs: "If you want to start quickly or find useful materials, here are the most important Czech pages.",
      pl: "If you want to start quickly or find useful materials, here are the most important Polish pages.",
    },

    popularCardsByCourse: {
      sk: [
        {
          href: "/learn-slovak",
          title: "Learn Slovak",
          desc: "An English overview of the Slovak online course: levels, exercises, dictionary, grammar, and audio.",
        },
        {
          href: "/vyvchennia-slovatskoi-movy-online",
          title: "Learn Slovak Online",
          desc: "Overview of the Slovak learning platform, lessons, dictionary, grammar, and practice tools.",
        },
      ],
      cs: [
        {
          href: "/learn-czech",
          title: "Learn Czech",
          desc: "An English overview of the Czech online course: levels, exercises, dictionary, grammar, and audio.",
        },
        {
          href: "/vyvchennia-cheskoi-movy-online",
          title: "Learn Czech Online",
          desc: "Overview of the Czech learning platform, lessons, dictionary, grammar, and practice tools.",
        },
      ],
      pl: [
        {
          href: "/learn-polish",
          title: "Learn Polish",
          desc: "An English overview of the Polish online course: levels, exercises, dictionary, grammar, and audio.",
        },
        {
          href: "/vyvchennia-polskoi-movy-online",
          title: "Learn Polish Online",
          desc: "Overview of the Polish learning platform, lessons, dictionary, grammar, and practice tools.",
        },
      ],
    },

    strip: [
      { k: "3 languages", v: "Slovak, Czech, and Polish" },
      { k: "A0–B2", v: "Level-based learning" },
      { k: "10 min/day", v: "Short lessons" },
    ],
  },
};

function StatPill({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{k}</div>
      <div className="text-xs text-slate-600">{v}</div>
    </div>
  );
}

function WordsStatsSkeleton() {
  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-40 rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
        </div>
        <div className="h-2 w-full rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </section>
  );
}

export default function HomeClient({
  latestBadge,
}: {
  latestBadge: string | null;
}) {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const tr = t[L];

  const showSeoBlock =
    courseId === "sk" || courseId === "cs" || courseId === "pl";
  const seoCourseId: SeoCourseId =
    courseId === "cs" ? "cs" : courseId === "pl" ? "pl" : "sk";

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
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
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              {tr.ctaLearning}
            </Link>

            <Link
              href="/dictionary"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {tr.ctaDict}
            </Link>

            <Link
              href="/grammar"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {tr.ctaGrammar}
            </Link>
          </div>

          <div className="mt-4 space-y-1 text-sm text-slate-700">
            {tr.free.map((item) => (
              <div key={item}>✅ {item}</div>
            ))}
          </div>

          <div className="mt-3 min-h-[44px]">
            <Link
              href="/updates"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              ✨ {tr.whatsNew}
              {latestBadge && (
                <span className="rounded-full bg-amber-200 px-2 py-0.5 font-bold text-amber-900">
                  {latestBadge}
                </span>
              )}
            </Link>
          </div>

          <div className="grid gap-3 pt-3 sm:grid-cols-3">
            {tr.strip.map((it) => (
              <StatPill key={it.k} k={it.k} v={it.v} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-sm">
          <div className="pointer-events-none absolute -top-24 left-10 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                Premium
              </div>

              <h2 className="text-2xl font-semibold">{tr.premiumTitle}</h2>
              <p className="max-w-2xl text-white/80">{tr.premiumSubtitle}</p>

              <ul className="grid gap-2 sm:grid-cols-2">
                {tr.premiumBullets.map((item) => (
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
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                {tr.premiumCta}
              </Link>

              <Link
                href="/premium"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                {tr.trainerLocked}
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      {showSeoBlock && (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              {tr.popularTitleByCourse[seoCourseId]}
            </h2>
            <p className="mt-2 text-slate-700">
              {tr.popularDescByCourse[seoCourseId]}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tr.popularCardsByCourse[seoCourseId].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700">{card.desc}</p>
                <div className="mt-4 text-sm font-semibold">{tr.open}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold">{tr.seoH2}</h2>
        <p className="mb-3 text-slate-700">{tr.seoP1}</p>
        <p className="text-slate-700">{tr.seoP2}</p>
      </section>
    </div>
  );
}