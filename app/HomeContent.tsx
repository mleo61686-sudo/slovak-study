import Link from "next/link";

import WordsStatsClient from "./components/home/WordsStatsClient";
import LeaderboardBlock from "./components/LeaderboardBlock";

type Lang = "ua" | "ru" | "en";

type IconName =
  | "lessons"
  | "courses"
  | "practice"
  | "dictionary"
  | "grammar"
  | "progress"
  | "updates"
  | "premium";

type HomeTranslations = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;

  currentCourse: string;
  levels: string;
  freeLevel: string;
  continueLearning: string;

  quickTitle: string;
  quickSubtitle: string;

  lessons: string;
  lessonsDesc: string;

  courses: string;
  coursesDesc: string;

  practice: string;
  practiceDesc: string;

  dictionary: string;
  dictionaryDesc: string;

  grammar: string;
  grammarDesc: string;

  progress: string;
  progressDesc: string;

  updates: string;
  updatesDesc: string;

  premium: string;
  premiumDesc: string;

  planEyebrow: string;
  planTitle: string;
  planSubtitle: string;
  planLesson: string;
  planWords: string;
  planReview: string;
  planLessonValue: string;
  planWordsValue: string;
  planReviewValue: string;
  planCta: string;

  premiumEyebrow: string;
  premiumTitle: string;
  premiumText: string;
  premiumCta: string;

  aboutTitle: string;
  seoH2: string;
  seoP1: string;
  seoP2: string;
};

const t: Record<Lang, HomeTranslations> = {
  ua: {
    heroEyebrow: "Твій навчальний простір",
    heroTitle: "Продовжуй навчання",
    heroSubtitle:
      "Повернися до свого курсу або обери потрібний інструмент для практики.",

    currentCourse: "Поточний курс",
    levels: "Рівні A0–B2",
    freeLevel: "A0 безкоштовний",
    continueLearning: "Продовжити навчання",

    quickTitle: "Швидкий доступ",
    quickSubtitle: "Усі головні розділи Flunio на одному екрані.",

    lessons: "Уроки",
    lessonsDesc: "Продовжити навчання",

    courses: "Курси",
    coursesDesc: "Змінити мову",

    practice: "Тренажер",
    practiceDesc: "Закріпити знання",

    dictionary: "Словник",
    dictionaryDesc: "Знайти слово",

    grammar: "Граматика",
    grammarDesc: "Повторити правила",

    progress: "Прогрес",
    progressDesc: "Переглянути статистику",

    updates: "Новини",
    updatesDesc: "Останні зміни",

    premium: "Premium",
    premiumDesc: "Відкрити всі рівні",

    planEyebrow: "Рекомендований темп",
    planTitle: "План на сьогодні",
    planSubtitle:
      "Короткий щоденний план допомагає не втрачати темп і краще запамʼятовувати матеріал.",

    planLesson: "Новий матеріал",
    planWords: "Практика слів",
    planReview: "Повторення",

    planLessonValue: "1 урок",
    planWordsValue: "10 слів",
    planReviewValue: "5 хвилин",

    planCta: "Почати тренування",

    premiumEyebrow: "Flunio Premium",
    premiumTitle: "Повний доступ від A1 до B2",
    premiumText:
      "Усі рівні, тренажер, повторення слів, розширена статистика та всі активні курси в одній підписці.",
    premiumCta: "Переглянути Premium",

    aboutTitle: "Більше про Flunio",

    seoH2: "Онлайн курс словацької, чеської та польської мов",
    seoP1:
      "Flunio — це онлайн платформа для вивчення словацької, чеської та польської мов з нуля. Тут ви знайдете граматику з прикладами, тематичний словник, вправи для тренування та системне навчання по рівнях A0–B2.",
    seoP2:
      "Сайт підходить для людей, які планують працювати, навчатися або жити в Європі. Вивчайте словацьку, чеську та польську онлайн у зручному форматі, з короткими уроками, поступовим ускладненням матеріалу та практикою для реального життя.",
  },

  ru: {
    heroEyebrow: "Твоё учебное пространство",
    heroTitle: "Продолжай обучение",
    heroSubtitle:
      "Вернись к своему курсу или выбери нужный инструмент для практики.",

    currentCourse: "Текущий курс",
    levels: "Уровни A0–B2",
    freeLevel: "A0 бесплатный",
    continueLearning: "Продолжить обучение",

    quickTitle: "Быстрый доступ",
    quickSubtitle: "Все основные разделы Flunio на одном экране.",

    lessons: "Уроки",
    lessonsDesc: "Продолжить обучение",

    courses: "Курсы",
    coursesDesc: "Сменить язык",

    practice: "Тренажёр",
    practiceDesc: "Закрепить знания",

    dictionary: "Словарь",
    dictionaryDesc: "Найти слово",

    grammar: "Грамматика",
    grammarDesc: "Повторить правила",

    progress: "Прогресс",
    progressDesc: "Посмотреть статистику",

    updates: "Новости",
    updatesDesc: "Последние изменения",

    premium: "Premium",
    premiumDesc: "Открыть все уровни",

    planEyebrow: "Рекомендуемый темп",
    planTitle: "План на сегодня",
    planSubtitle:
      "Короткий ежедневный план помогает не терять темп и лучше запоминать материал.",

    planLesson: "Новый материал",
    planWords: "Практика слов",
    planReview: "Повторение",

    planLessonValue: "1 урок",
    planWordsValue: "10 слов",
    planReviewValue: "5 минут",

    planCta: "Начать тренировку",

    premiumEyebrow: "Flunio Premium",
    premiumTitle: "Полный доступ от A1 до B2",
    premiumText:
      "Все уровни, тренажёр, повторение слов, расширенная статистика и все активные курсы в одной подписке.",
    premiumCta: "Посмотреть Premium",

    aboutTitle: "Больше о Flunio",

    seoH2: "Онлайн курс словацкого, чешского и польского языков",
    seoP1:
      "Flunio — это онлайн платформа для изучения словацкого, чешского и польского языков с нуля. Здесь вы найдёте грамматику с примерами, тематический словарь, упражнения для тренировки и системное обучение по уровням A0–B2.",
    seoP2:
      "Сайт подходит для людей, которые планируют работать, учиться или жить в Европе. Изучайте словацкий, чешский и польский онлайн в удобном формате: короткие уроки, постепенное усложнение материала и практика для реальной жизни.",
  },

  en: {
    heroEyebrow: "Your learning space",
    heroTitle: "Continue learning",
    heroSubtitle:
      "Return to your current course or choose the tool you need for practice.",

    currentCourse: "Current course",
    levels: "Levels A0–B2",
    freeLevel: "A0 is free",
    continueLearning: "Continue learning",

    quickTitle: "Quick access",
    quickSubtitle: "Every important Flunio section on one screen.",

    lessons: "Lessons",
    lessonsDesc: "Continue learning",

    courses: "Courses",
    coursesDesc: "Change language",

    practice: "Trainer",
    practiceDesc: "Practise your skills",

    dictionary: "Dictionary",
    dictionaryDesc: "Find a word",

    grammar: "Grammar",
    grammarDesc: "Review the rules",

    progress: "Progress",
    progressDesc: "View your statistics",

    updates: "Updates",
    updatesDesc: "Latest changes",

    premium: "Premium",
    premiumDesc: "Unlock all levels",

    planEyebrow: "Recommended pace",
    planTitle: "Today’s plan",
    planSubtitle:
      "A short daily plan helps you stay consistent and remember more.",

    planLesson: "New material",
    planWords: "Word practice",
    planReview: "Review",

    planLessonValue: "1 lesson",
    planWordsValue: "10 words",
    planReviewValue: "5 minutes",

    planCta: "Start training",

    premiumEyebrow: "Flunio Premium",
    premiumTitle: "Full access from A1 to B2",
    premiumText:
      "Every level, the trainer, word review, advanced statistics, and all active courses in one subscription.",
    premiumCta: "View Premium",

    aboutTitle: "More about Flunio",

    seoH2: "Online Slovak, Czech, and Polish course",
    seoP1:
      "Flunio is an online platform for learning Slovak, Czech, and Polish from scratch. Here you will find grammar with examples, a thematic dictionary, practice exercises, and structured learning across A0–B2 levels.",
    seoP2:
      "The website is suitable for people who plan to work, study, or live in Europe. Learn Slovak, Czech, and Polish online in a convenient format with short lessons, gradual progression, and practice for real life.",
  },
};

const COURSE_META: Record<
  string,
  {
    flag: string;
    code: string;
    name: Record<Lang, string>;
  }
> = {
  sk: {
    flag: "🇸🇰",
    code: "SK",
    name: {
      ua: "Словацька мова",
      ru: "Словацкий язык",
      en: "Slovak",
    },
  },

  cs: {
    flag: "🇨🇿",
    code: "CZ",
    name: {
      ua: "Чеська мова",
      ru: "Чешский язык",
      en: "Czech",
    },
  },

  pl: {
    flag: "🇵🇱",
    code: "PL",
    name: {
      ua: "Польська мова",
      ru: "Польский язык",
      en: "Polish",
    },
  },
};

function Glyph({ name }: { name: IconName }) {
  const sharedProps = {
    width: 31,
    height: 31,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "lessons":
      return (
        <svg {...sharedProps}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
          <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
          <path d="M7 7h2" />
          <path d="M15 7h2" />
        </svg>
      );

    case "courses":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>
      );

    case "practice":
      return (
        <svg {...sharedProps}>
          <path d="M5 8v8" />
          <path d="M8 6v12" />
          <path d="M16 6v12" />
          <path d="M19 8v8" />
          <path d="M8 12h8" />
          <path d="M3 10v4" />
          <path d="M21 10v4" />
        </svg>
      );

    case "dictionary":
      return (
        <svg {...sharedProps}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 4v16" />
          <path d="M11 8h5" />
          <path d="M11 12h5" />
          <path d="M11 16h3" />
        </svg>
      );

    case "grammar":
      return (
        <svg {...sharedProps}>
          <path d="M5 19 10.5 5h3L19 19" />
          <path d="M7 14h10" />
          <path d="M5 22h14" />
        </svg>
      );

    case "progress":
      return (
        <svg {...sharedProps}>
          <path d="M5 20V11" />
          <path d="M12 20V4" />
          <path d="M19 20v-6" />
          <path d="M3 20h18" />
        </svg>
      );

    case "updates":
      return (
        <svg {...sharedProps}>
          <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4z" />
          <path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" />
          <path d="m6 14 .7 1.8 1.8.7-1.8.7L6 19l-.7-1.8-1.8-.7 1.8-.7z" />
        </svg>
      );

    case "premium":
      return (
        <svg {...sharedProps}>
          <path d="m3 7 4 4 5-7 5 7 4-4-2 11H5z" />
          <path d="M5 18h14" />
          <path d="M6 21h12" />
        </svg>
      );

    default:
      return null;
  }
}

type AppItem = {
  href: string;
  icon: IconName;
  title: string;
  description: string;
  iconClass: string;
  glowClass: string;
  badge?: string | null;
};

function AppLauncherItem({
  href,
  icon,
  title,
  description,
  iconClass,
  glowClass,
  badge,
}: AppItem) {
  return (
    <Link
      href={href}
      aria-label={`${title}. ${description}`}
      className={[
        "group relative flex min-w-0 flex-col items-center rounded-3xl px-1 py-1 text-center",
        "transition duration-200 hover:-translate-y-1",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute top-4 h-14 w-14 rounded-full opacity-0 blur-2xl",
          "transition duration-300 group-hover:opacity-60",
          glowClass,
        ].join(" ")}
      />

      <div
        className={[
          "relative flex h-[68px] w-[68px] items-center justify-center overflow-hidden",
          "rounded-[22px] border border-white/15 text-white",
          "shadow-[0_12px_26px_rgba(0,0,0,0.2)]",
          "transition duration-200 group-hover:scale-[1.05]",
          "sm:h-[74px] sm:w-[74px] sm:rounded-[24px]",
          iconClass,
        ].join(" ")}
      >
        <div className="pointer-events-none absolute -right-5 -top-5 h-12 w-12 rounded-full bg-white/25 blur-xl" />

        <div className="pointer-events-none absolute inset-x-2 top-1 h-px bg-white/25" />

        <span className="relative">
          <Glyph name={icon} />
        </span>

        {badge && (
          <span className="absolute right-1 top-1 rounded-full border border-white/20 bg-rose-500 px-1.5 py-0.5 text-[9px] font-extrabold leading-none text-white shadow-lg">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2 min-w-0 max-w-full">
        <div className="theme-text truncate text-[11px] font-semibold sm:text-sm">
          {title}
        </div>

        <div className="theme-text-subtle mt-0.5 hidden truncate text-[10px] xl:block">
          {description}
        </div>
      </div>
    </Link>
  );
}

function PlanRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/10 px-3.5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg">
          {icon}
        </div>

        <span className="theme-text-muted truncate text-sm">{label}</span>
      </div>

      <span className="theme-text shrink-0 text-sm font-bold">{value}</span>
    </div>
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
  const course = COURSE_META[courseId] ?? COURSE_META.sk;

  const apps: AppItem[] = [
    {
      href: "/learning",
      icon: "lessons",
      title: tr.lessons,
      description: tr.lessonsDesc,
      iconClass:
        "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
      glowClass: "bg-cyan-400",
    },
    {
      href: "/learn",
      icon: "courses",
      title: tr.courses,
      description: tr.coursesDesc,
      iconClass:
        "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
      glowClass: "bg-emerald-400",
    },
    {
      href: "/practice",
      icon: "practice",
      title: tr.practice,
      description: tr.practiceDesc,
      iconClass:
        "bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500",
      glowClass: "bg-orange-400",
    },
    {
      href: "/dictionary",
      icon: "dictionary",
      title: tr.dictionary,
      description: tr.dictionaryDesc,
      iconClass:
        "bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600",
      glowClass: "bg-violet-400",
    },
    {
      href: "/grammar",
      icon: "grammar",
      title: tr.grammar,
      description: tr.grammarDesc,
      iconClass:
        "bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600",
      glowClass: "bg-sky-400",
    },
    {
      href: "#stats",
      icon: "progress",
      title: tr.progress,
      description: tr.progressDesc,
      iconClass:
        "home-progress-icon bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600",
      glowClass: "bg-yellow-400",
    },
    {
      href: "/updates",
      icon: "updates",
      title: tr.updates,
      description: tr.updatesDesc,
      iconClass:
        "bg-gradient-to-br from-pink-400 via-fuchsia-500 to-purple-600",
      glowClass: "bg-fuchsia-400",
      badge: latestBadge,
    },
    {
      href: "/premium",
      icon: "premium",
      title: tr.premium,
      description: tr.premiumDesc,
      iconClass:
        "bg-gradient-to-br from-amber-300 via-orange-500 to-fuchsia-600",
      glowClass: "bg-amber-400",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="flunio-card relative overflow-hidden rounded-[32px] p-5 sm:p-7">
        <div className="theme-home-glow-border pointer-events-none absolute inset-0 rounded-[32px]" />

        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/22 blur-[80px]" />

        <div className="pointer-events-none absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-cyan-400/18 blur-[80px]" />

        <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_430px]">
          <div>
            <div className="theme-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              {tr.heroEyebrow}
            </div>

            <h1 className="theme-text mt-4 max-w-2xl text-[32px] font-semibold leading-[1.12] tracking-tight sm:text-[42px]">
              {tr.heroTitle}
            </h1>

            <p className="theme-text-muted mt-3 max-w-xl text-sm leading-6 sm:text-base sm:leading-7">
              {tr.heroSubtitle}
            </p>

            <div className="mt-5">
              <Link
                href="/learning"
                className="theme-primary-button inline-flex min-h-11 w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
              >
                {tr.continueLearning}
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] border border-white/12 bg-black/15 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-5">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative">
              <div className="theme-text-subtle text-[11px] font-semibold uppercase tracking-[0.15em]">
                {tr.currentCourse}
              </div>

              <div className="mt-3 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[21px] border border-white/15 bg-white/10 text-3xl shadow-sm">
                  {course.flag}
                </div>

                <div className="min-w-0">
                  <div className="theme-text truncate text-xl font-bold">
                    {course.name[lang]}
                  </div>

                  <div className="theme-text-muted mt-1 text-sm">
                    {course.code} · {tr.levels}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3">
                  <div className="theme-text-subtle text-[10px] font-semibold uppercase tracking-wide">
                    Level
                  </div>

                  <div className="theme-text mt-1 font-bold">A0–B2</div>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                    Start
                  </div>

                  <div className="mt-1 text-sm font-bold text-emerald-300">
                    {tr.freeLevel}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <span className="h-1.5 flex-1 rounded-full bg-cyan-400" />
                <span className="h-1.5 flex-1 rounded-full bg-blue-500" />
                <span className="h-1.5 flex-1 rounded-full bg-fuchsia-500" />
                <span className="h-1.5 flex-1 rounded-full bg-white/15" />
                <span className="h-1.5 flex-1 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="flunio-card relative overflow-hidden rounded-[32px] p-4 sm:p-6">
        <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-[70%] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5 px-1">
            <h2 className="theme-text text-xl font-bold sm:text-2xl">
              {tr.quickTitle}
            </h2>

            <p className="theme-text-muted mt-1 text-sm">
              {tr.quickSubtitle}
            </p>
          </div>

          <div className="rounded-[27px] border border-white/10 bg-black/10 px-2 py-4 shadow-inner sm:px-4">
            <div className="grid grid-cols-6 gap-x-1 gap-y-5 sm:grid-cols-4 sm:gap-x-3 xl:grid-cols-8">
              {apps.map((app, index) => (
                <div
                  key={app.href}
                  className={[
                    "col-span-2 sm:col-span-1",
                    index === 6
                      ? "col-start-2 sm:col-start-auto"
                      : "",
                    index === 7
                      ? "col-start-4 sm:col-start-auto"
                      : "",
                  ].join(" ")}
                >
                  <AppLauncherItem {...app} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="stats"
        className="grid scroll-mt-24 items-stretch gap-5 xl:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="min-w-0">
          <WordsStatsClient />
        </div>

        <div className="flunio-card relative flex h-full flex-col overflow-hidden rounded-[30px] p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative flex h-full flex-col">
            <div className="theme-pill inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
              <span>⚡</span>
              {tr.planEyebrow}
            </div>

            <h2 className="theme-text mt-4 text-2xl font-bold">
              {tr.planTitle}
            </h2>

            <p className="theme-text-muted mt-2 text-sm leading-6">
              {tr.planSubtitle}
            </p>

            <div className="mt-5 grid gap-2.5">
              <PlanRow
                icon="📖"
                label={tr.planLesson}
                value={tr.planLessonValue}
              />

              <PlanRow
                icon="🧠"
                label={tr.planWords}
                value={tr.planWordsValue}
              />

              <PlanRow
                icon="🔁"
                label={tr.planReview}
                value={tr.planReviewValue}
              />
            </div>

            <div className="mt-auto pt-5">
              <Link
                href="/practice"
                className="theme-primary-button inline-flex min-h-11 w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
              >
                {tr.planCta}
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[30px] border border-amber-300/20 bg-gradient-to-r from-amber-400/15 via-fuchsia-500/14 to-cyan-500/12 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:p-6">
        <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-fuchsia-500/25 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-36 w-36 rounded-full bg-amber-400/15 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="home-premium-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-200">
              <Glyph name="premium" />
            </div>

            <div>
              <div className="home-premium-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">
                {tr.premiumEyebrow}
              </div>

              <h2 className="theme-text mt-1 text-2xl font-bold">
                {tr.premiumTitle}
              </h2>

              <p className="theme-text-muted mt-2 max-w-3xl text-sm leading-6">
                {tr.premiumText}
              </p>
            </div>
          </div>

          <Link
            href="/premium"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_28px_rgba(251,191,36,0.2)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
          >
            {tr.premiumCta}
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <section id="leaderboard" className="scroll-mt-24">
        <LeaderboardBlock
          lang={lang}
          limit={3}
          period="all"
          compact
        />
      </section>

      <details className="flunio-card group overflow-hidden rounded-[28px]">
        <summary className="theme-text flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
          <span>{tr.aboutTitle}</span>

          <span className="theme-text-muted text-xl transition group-open:rotate-45">
            +
          </span>
        </summary>

        <div className="border-t border-white/10 px-5 pb-6 pt-5">
          <h2 className="theme-text text-xl font-semibold">
            {tr.seoH2}
          </h2>

          <p className="theme-text-muted mt-3 text-sm leading-7">
            {tr.seoP1}
          </p>

          <p className="theme-text-muted mt-3 text-sm leading-7">
            {tr.seoP2}
          </p>
        </div>
      </details>
    </div>
  );
}