import Link from "next/link";
import WordsStatsClient from "./components/home/WordsStatsClient";

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
  starterBadge: string;
  free: string[];
  telegramTitle: string;
  telegramDesc: string;
  telegramCta: string;

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

const t: Record<Lang, HomeTranslations> = {
  ua: {
    h1: "Вивчай словацьку, чеську та польську з нуля до B2 — для роботи, життя та переїзду",
    heroP:
      "Flunio — онлайн платформа для вивчення словацької, чеської та польської мов: короткі уроки, словник, граматика, озвучка та вправи для щоденної практики.",
    ctaLearning: "Перейти до навчання 🚀",
    ctaDict: "Відкрити словник",
    ctaGrammar: "Перейти до граматики",
    starterBadge: "🚀 Перші 10 уроків у кожному курсі — без ліміту",
    free: [
      "Короткі уроки по 10 слів без перевантаження",
      "Словник, граматика та приклади речень в одному місці",
      "Практика з озвучкою, прогресом і повторенням помилок",
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
    premiumPriceNote:
      "EUR / USD / UAH / PLN / CZK • місячний і річний план • можна скасувати будь-коли",
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
    telegramTitle: "Flunio в Telegram 📢",
    telegramDesc:
      "Новини платформи, плани розвитку, апдейти та корисний контент для вивчення мов.",
    telegramCta: "Підписатися →",

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
      "Flunio — онлайн платформа для изучения словацкого, чешского и польского языков: короткие уроки, словарь, грамматика, озвучка и упражнения для ежедневной практики.",
    ctaLearning: "Перейти к обучению 🚀",
    ctaDict: "Открыть словарь",
    ctaGrammar: "Перейти к грамматике",
    starterBadge: "🚀 Первые 10 уроков в каждом курсе — без лимита",
    free: [
      "Короткие уроки по 10 слов без перегруза",
      "Словарь, грамматика и примеры предложений в одном месте",
      "Практика с озвучкой, прогрессом и повторением ошибок",
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
    premiumPriceNote:
      "EUR / USD / UAH / PLN / CZK • месячный и годовой план • можно отменить в любой момент",
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
    telegramTitle: "Flunio в Telegram 📢",
    telegramDesc:
      "Новости платформы, планы развития, апдейты и полезный контент для изучения языков.",
    telegramCta: "Подписаться →",

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
      "Flunio is an online platform for learning Slovak, Czech, and Polish: short lessons, dictionary, grammar, audio, and exercises for daily practice.",
    ctaLearning: "Go to learning 🚀",
    ctaDict: "Open dictionary",
    ctaGrammar: "Go to grammar",
    starterBadge: "🚀 First 10 lessons in each course — unlimited",
    free: [
      "Short 10-word lessons without overload",
      "Dictionary, grammar, and example sentences in one place",
      "Practice with audio, progress tracking, and mistake review",
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
    premiumPriceNote:
      "EUR / USD / UAH / PLN / CZK • monthly and yearly plans • cancel anytime",
    premiumCta: "Try Premium →",
    trainerLocked: "Trainer 🔒",

    grammarTitle: "Grammar",
    grammarDesc: "Topics kept short and clear + examples and mini exercises.",
    dictTitle: "Dictionary",
    dictDesc: "Search, topics, example sentences, and favorites.",
    levelsTitle: "Levels",
    levelsDesc:
      "Exercises: choose the answer, insert the word, build a sentence.",
    open: "Open →",
    start: "Start →",
    whatsNew: "What’s new",
    telegramTitle: "Flunio on Telegram 📢",
    telegramDesc:
      "Platform news, development plans, updates, and useful language-learning content.",
    telegramCta: "Subscribe →",

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
    <div className="theme-home-soft-card rounded-2xl px-4 py-3 shadow-sm transition hover:-translate-y-0.5">
      <div className="theme-text text-sm font-semibold">{k}</div>
      <div className="theme-text-muted text-xs">{v}</div>
    </div>
  );
}

function FeatureCard({
  href,
  icon,
  title,
  desc,
  action,
}: {
  href: string;
  icon: string;
  title: string;
  desc: string;
  action: string;
}) {
  return (
    <Link
      href={href}
      className="theme-home-soft-card group block rounded-3xl p-6 shadow-[0_0_24px_rgba(34,211,238,0.08)] transition hover:-translate-y-0.5"
    >
      <div className="text-2xl">{icon}</div>
      <h2 className="theme-text mt-3 text-lg font-semibold">{title}</h2>
      <p className="theme-text-muted mt-1 text-sm">{desc}</p>
      <div className="theme-action-link mt-4 text-sm font-semibold transition">
        {action}
      </div>
    </Link>
  );
}

export default function HomeContent({
  latestBadge,
  lang,
  courseId,
}: {
  latestBadge: string | null;
  lang: Lang;
  courseId: string;
}) {
  const tr = t[lang];
  const showSeoBlock =
    courseId === "sk" || courseId === "cs" || courseId === "pl";

  const seoCourseId: SeoCourseId =
    courseId === "cs" ? "cs" : courseId === "pl" ? "pl" : "sk";

  return (
    <div className="space-y-8">
      <section className="flunio-card relative overflow-hidden rounded-3xl p-7 sm:p-8">
        <div className="theme-home-glow-border pointer-events-none absolute inset-0 rounded-3xl" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <h1 className="theme-text text-[31px] font-semibold leading-tight tracking-tight sm:text-5xl">
            {tr.h1}
          </h1>

          <p className="theme-text-muted max-w-2xl text-base sm:text-lg">
            {tr.heroP}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/learning"
              className="theme-primary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {tr.ctaLearning}
            </Link>

            <Link
              href="/dictionary"
              className="theme-secondary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {tr.ctaDict}
            </Link>

            <Link
              href="/grammar"
              className="theme-secondary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {tr.ctaGrammar}
            </Link>
          </div>

          <div className="mt-4 flex flex-col items-start gap-3">
            <div className="theme-home-soft-card inline-flex max-w-2xl items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm">
              <span>{tr.starterBadge}</span>
            </div>

            <div className="theme-home-soft-card inline-flex max-w-2xl items-center gap-2 rounded-2xl px-4 py-3 text-sm">
              <span>💡</span>
              <span>
                {lang === "ua"
                  ? "Щоб змінити курс, натисни на аватар зверху праворуч і обери «Обрати курс»."
                  : lang === "ru"
                    ? "Чтобы сменить курс, нажми на аватар сверху справа и выбери «Выбрать курс»."
                    : "To change the course, click your avatar in the top right and choose “Select course”."}
              </span>
            </div>
          </div>

          <div className="theme-text-muted mt-4 space-y-1 text-sm">
            {tr.free.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 min-h-[44px]">
            <Link
              href="/updates"
              className="theme-secondary-button inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
            >
              ✨ {tr.whatsNew}
              {latestBadge && (
                <span className="theme-latest-badge rounded-full px-2 py-0.5 font-bold">
                  {latestBadge}
                </span>
              )}
            </Link>
          </div>

          <div className="theme-home-soft-card mt-3 rounded-2xl px-4 py-4 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="theme-text text-sm font-bold">
                  {tr.telegramTitle}
                </div>
                <div className="theme-text-muted mt-1 max-w-2xl text-sm">
                  {tr.telegramDesc}
                </div>
              </div>

              <a
                href="https://t.me/flunio_languages"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5 active:translate-y-0"
              >
                {tr.telegramCta}
              </a>
            </div>
          </div>

          <div className="grid gap-3 pt-3 sm:grid-cols-3">
            {tr.strip.map((it) => (
              <StatPill key={it.k} k={it.k} v={it.v} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flunio-card relative overflow-hidden rounded-3xl p-8">
          <div className="pointer-events-none absolute -top-20 left-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <div className="theme-home-soft-card inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
                Premium
              </div>

              <h2 className="theme-text text-2xl font-semibold">
                {tr.premiumTitle}
              </h2>
              <p className="theme-text-muted max-w-2xl">
                {tr.premiumSubtitle}
              </p>

              <ul className="grid gap-2 sm:grid-cols-2">
                {tr.premiumBullets.map((item) => (
                  <li
                    key={item}
                    className="theme-home-soft-card rounded-2xl px-4 py-2.5 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="theme-text-subtle text-sm">
                {tr.premiumPriceNote}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:pt-2">
              <Link
                href="/premium"
                className="theme-primary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
              >
                {tr.premiumCta}
              </Link>

              <Link
                href="/premium"
                className="theme-secondary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
              >
                {tr.trainerLocked}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <WordsStatsClient />

        <FeatureCard
          href="/grammar"
          icon="📘"
          title={tr.grammarTitle}
          desc={tr.grammarDesc}
          action={tr.open}
        />

        <FeatureCard
          href="/dictionary"
          icon="📚"
          title={tr.dictTitle}
          desc={tr.dictDesc}
          action={tr.open}
        />

        <FeatureCard
          href="/learning"
          icon="🏋️"
          title={tr.levelsTitle}
          desc={tr.levelsDesc}
          action={tr.start}
        />
      </section>

      {showSeoBlock && (
        <section className="flunio-card rounded-3xl p-8">
          <div className="mb-6">
            <h2 className="theme-text text-xl font-semibold">
              {tr.popularTitleByCourse[seoCourseId]}
            </h2>
            <p className="theme-text-muted mt-2">
              {tr.popularDescByCourse[seoCourseId]}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tr.popularCardsByCourse[seoCourseId].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="theme-home-soft-card block rounded-2xl p-5 transition hover:-translate-y-0.5"
              >
                <h3 className="theme-text text-base font-semibold">
                  {card.title}
                </h3>
                <p className="theme-text-muted mt-2 text-sm">{card.desc}</p>
                <div className="theme-action-link mt-4 text-sm font-semibold">
                  {tr.open}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="flunio-card rounded-3xl p-8">
        <h2 className="theme-text mb-3 text-xl font-semibold">{tr.seoH2}</h2>
        <p className="theme-text-muted mb-3">{tr.seoP1}</p>
        <p className="theme-text-muted">{tr.seoP2}</p>
      </section>
    </div>
  );
}