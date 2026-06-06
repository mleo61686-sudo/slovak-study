import Link from "next/link";
import WordsStatsClient from "./components/home/WordsStatsClient";

type Lang = "ua" | "ru" | "en";

type StatItem = {
  k: string;
  v: string;
};

type HomeTranslations = {
  h1: string;
  heroP: string;
  ctaLearning: string;
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

  open: string;
  whatsNew: string;

  strip: StatItem[];
};

const t: Record<Lang, HomeTranslations> = {
  ua: {
    h1: "Вивчай словацьку, чеську та польську з нуля до B2 — для роботи, життя та переїзду",
    heroP:
      "Flunio — онлайн платформа для вивчення словацької, чеської та польської мов: короткі уроки, словник, граматика, озвучка та вправи для щоденної практики.",

    ctaLearning: "Перейти до навчання 🚀",

    starterBadge: "🚀 A0 безкоштовний — почни навчання без оплати",

    free: [
      "A0 відкритий безкоштовно для старту з нуля",
      "Словник, граматика та приклади речень в одному місці",
      "Короткі уроки, озвучка та вправи для щоденної практики",
    ],

    telegramTitle: "Flunio в Telegram 📢",
    telegramDesc:
      "Новини платформи, плани розвитку, апдейти та корисний контент для вивчення мов.",
    telegramCta: "Підписатися →",

    seoH2: "Онлайн курс словацької, чеської та польської мов",
    seoP1:
      "Flunio — це онлайн платформа для вивчення словацької, чеської та польської мов з нуля. Тут ви знайдете граматику з прикладами, тематичний словник, вправи для тренування та системне навчання по рівнях A0–B2.",
    seoP2:
      "Сайт підходить для людей, які планують працювати, навчатися або жити в Європі. Вивчайте словацьку, чеську та польську онлайн у зручному форматі, з короткими уроками, поступовим ускладненням матеріалу та практикою для реального життя.",

    premiumTitle: "Premium — повний шлях після A0 🚀",
    premiumSubtitle:
      "A0 доступний безкоштовно. Premium відкриває A1–B2, тренажер, повторення слів і всі активні курси Flunio в одній підписці.",

    premiumBullets: [
      "🔓 Доступ до преміум-рівнів A1–B2",
      "🌍 Усі активні курси в одній підписці",
      "🇸🇰 Словацький курс",
      "🇨🇿 Чеський курс",
      "🇵🇱 Польський курс",
      "🏋️ Повний доступ до тренажера",
      "🔁 Розширене повторення слів",
      "📊 Статистика, серії та рекорди",
    ],

    premiumPriceNote:
      "EUR / USD / UAH / PLN / CZK • місячний і річний план • можна скасувати будь-коли",

    premiumCta: "Спробувати Premium →",
    trainerLocked: "Тренажер 🔒",

    grammarTitle: "Граматика",
    grammarDesc: "Теми коротко й по суті + приклади та міні-вправи.",

    dictTitle: "Словник",
    dictDesc: "Пошук, теми, приклади речень і «в обране».",

    open: "Відкрити →",
    whatsNew: "Що нового",

    strip: [
      {
        k: "3 мови",
        v: "Словацька, чеська та польська",
      },
      {
        k: "A0–B2",
        v: "Навчання по рівнях",
      },
      {
        k: "10 хв/день",
        v: "Короткі уроки",
      },
    ],
  },

  ru: {
    h1: "Изучай словацкий, чешский и польский с нуля до B2 — для работы, жизни и переезда",
    heroP:
      "Flunio — онлайн платформа для изучения словацкого, чешского и польского языков: короткие уроки, словарь, грамматика, озвучка и упражнения для ежедневной практики.",

    ctaLearning: "Перейти к обучению 🚀",

    starterBadge: "🚀 A0 бесплатный — начни обучение без оплаты",

    free: [
      "A0 открыт бесплатно для старта с нуля",
      "Словарь, грамматика и примеры предложений в одном месте",
      "Короткие уроки, озвучка и упражнения для ежедневной практики",
    ],

    telegramTitle: "Flunio в Telegram 📢",
    telegramDesc:
      "Новости платформы, планы развития, апдейты и полезный контент для изучения языков.",
    telegramCta: "Подписаться →",

    seoH2: "Онлайн курс словацкого, чешского и польского языков",
    seoP1:
      "Flunio — это онлайн платформа для изучения словацкого, чешского и польского языков с нуля. Здесь вы найдёте грамматику с примерами, тематический словарь, упражнения для тренировки и системное обучение по уровням A0–B2.",
    seoP2:
      "Сайт подходит для людей, которые планируют работать, учиться или жить в Европе. Изучайте словацкий, чешский и польский онлайн в удобном формате: короткие уроки, постепенное усложнение материала и практика для реальной жизни.",

    premiumTitle: "Premium — полный путь после A0 🚀",
    premiumSubtitle:
      "A0 доступен бесплатно. Premium открывает A1–B2, тренажёр, повторение слов и все активные курсы Flunio в одной подписке.",

    premiumBullets: [
      "🔓 Доступ к премиум-уровням A1–B2",
      "🌍 Все активные курсы в одной подписке",
      "🇸🇰 Словацкий курс",
      "🇨🇿 Чешский курс",
      "🇵🇱 Польский курс",
      "🏋️ Полный доступ к тренажёру",
      "🔁 Расширенное повторение слов",
      "📊 Статистика, серии и рекорды",
    ],

    premiumPriceNote:
      "EUR / USD / UAH / PLN / CZK • месячный и годовой план • можно отменить в любой момент",

    premiumCta: "Попробовать Premium →",
    trainerLocked: "Тренажёр 🔒",

    grammarTitle: "Грамматика",
    grammarDesc: "Темы кратко и по делу + примеры и мини-упражнения.",

    dictTitle: "Словарь",
    dictDesc: "Поиск, темы, примеры предложений и «в избранное».",

    open: "Открыть →",
    whatsNew: "Что нового",

    strip: [
      {
        k: "3 языка",
        v: "Словацкий, чешский и польский",
      },
      {
        k: "A0–B2",
        v: "Обучение по уровням",
      },
      {
        k: "10 мин/день",
        v: "Короткие уроки",
      },
    ],
  },

  en: {
    h1: "Learn Slovak, Czech, and Polish from zero to B2 — for work, life, and relocation",
    heroP:
      "Flunio is an online platform for learning Slovak, Czech, and Polish: short lessons, dictionary, grammar, audio, and exercises for daily practice.",

    ctaLearning: "Go to learning 🚀",

    starterBadge: "🚀 A0 is free — start learning without payment",

    free: [
      "A0 is open for free, so you can start from zero",
      "Dictionary, grammar, and example sentences in one place",
      "Short lessons, audio, and exercises for daily practice",
    ],

    telegramTitle: "Flunio on Telegram 📢",
    telegramDesc:
      "Platform news, development plans, updates, and useful language-learning content.",
    telegramCta: "Subscribe →",

    seoH2: "Online Slovak, Czech, and Polish course",
    seoP1:
      "Flunio is an online platform for learning Slovak, Czech, and Polish from scratch. Here you will find grammar with examples, a thematic dictionary, practice exercises, and structured learning across A0–B2 levels.",
    seoP2:
      "The website is suitable for people who plan to work, study, or live in Europe. Learn Slovak, Czech, and Polish online in a convenient format with short lessons, gradual progression, and practice for real life.",

    premiumTitle: "Premium — continue after A0 🚀",
    premiumSubtitle:
      "A0 is free. Premium unlocks A1–B2, the trainer, word review, and all active Flunio courses in one subscription.",

    premiumBullets: [
      "🔓 Access to premium levels A1–B2",
      "🌍 All active courses in one subscription",
      "🇸🇰 Slovak course",
      "🇨🇿 Czech course",
      "🇵🇱 Polish course",
      "🏋️ Full access to the trainer",
      "🔁 Advanced word review",
      "📊 Statistics, streaks, and records",
    ],

    premiumPriceNote:
      "EUR / USD / UAH / PLN / CZK • monthly and yearly plans • cancel anytime",

    premiumCta: "Try Premium →",
    trainerLocked: "Trainer 🔒",

    grammarTitle: "Grammar",
    grammarDesc: "Topics kept short and clear + examples and mini exercises.",

    dictTitle: "Dictionary",
    dictDesc: "Search, topics, example sentences, and favorites.",

    open: "Open →",
    whatsNew: "What’s new",

    strip: [
      {
        k: "3 languages",
        v: "Slovak, Czech, and Polish",
      },
      {
        k: "A0–B2",
        v: "Level-based learning",
      },
      {
        k: "10 min/day",
        v: "Short lessons",
      },
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
      className="theme-home-soft-card group relative block overflow-hidden rounded-2xl p-5 transition hover:-translate-y-0.5"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="theme-text text-lg font-bold">{title}</h2>

          <p className="theme-text-muted mt-1 text-sm leading-6">{desc}</p>

          <div className="theme-action-link mt-3 text-sm font-semibold transition group-hover:translate-x-1">
            {action}
          </div>
        </div>
      </div>
    </Link>
  );
}

function CourseCard({
  href,
  flag,
  title,
  description,
  badge,
  action,
  active,
}: {
  href: string;
  flag: string;
  title: string;
  description: string;
  badge: string;
  action: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "theme-home-soft-card group relative block overflow-hidden rounded-3xl p-6",
        "transition hover:-translate-y-1",
        active
          ? "ring-2 ring-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.14)]"
          : "shadow-[0_0_24px_rgba(34,211,238,0.07)]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="text-4xl" aria-hidden="true">
            {flag}
          </div>

          <div className="theme-pill rounded-full px-3 py-1 text-xs font-bold">
            {badge}
          </div>
        </div>

        <h2 className="theme-text mt-5 text-xl font-bold">{title}</h2>

        <p className="theme-text-muted mt-2 min-h-[72px] text-sm leading-6">
          {description}
        </p>

        <div className="theme-action-link mt-5 text-sm font-bold transition group-hover:translate-x-1">
          {action}
        </div>
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

          <div className="pt-1">
            <Link
              href="/learning"
              className="theme-primary-button inline-flex min-h-12 items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {tr.ctaLearning}
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
            {tr.strip.map((item) => (
              <StatPill key={item.k} k={item.k} v={item.v} />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2 text-center">
          <h2 className="theme-text text-2xl font-bold sm:text-3xl">
            {lang === "ua"
              ? "Обери мову, яку хочеш вивчати"
              : lang === "ru"
                ? "Выбери язык, который хочешь изучать"
                : "Choose the language you want to learn"}
          </h2>

          <p className="theme-text-muted mx-auto max-w-2xl">
            {lang === "ua"
              ? "Кожен курс має послідовні уроки від A0 до B2. Повний рівень A0 доступний безкоштовно."
              : lang === "ru"
                ? "Каждый курс содержит последовательные уроки от A0 до B2. Полный уровень A0 доступен бесплатно."
                : "Every course contains structured lessons from A0 to B2. The complete A0 level is free."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <CourseCard
            href="/learn"
            flag="🇸🇰"
            title={
              lang === "ua"
                ? "Словацька мова"
                : lang === "ru"
                  ? "Словацкий язык"
                  : "Learn Slovak"
            }
            description={
              lang === "ua"
                ? "Для життя, роботи, навчання та щоденного спілкування у Словаччині."
                : lang === "ru"
                  ? "Для жизни, работы, учёбы и ежедневного общения в Словакии."
                  : "For everyday life, work, study, and communication in Slovakia."
            }
            badge={
              lang === "ua"
                ? "A0 безкоштовно"
                : lang === "ru"
                  ? "A0 бесплатно"
                  : "A0 free"
            }
            action={
              lang === "ua"
                ? "Обрати словацький курс →"
                : lang === "ru"
                  ? "Выбрать словацкий курс →"
                  : "Select the Slovak course →"
            }
            active={courseId === "sk"}
          />

          <CourseCard
            href="/learn"
            flag="🇨🇿"
            title={
              lang === "ua"
                ? "Чеська мова"
                : lang === "ru"
                  ? "Чешский язык"
                  : "Learn Czech"
            }
            description={
              lang === "ua"
                ? "Для життя, роботи, навчання та повсякденного спілкування в Чехії."
                : lang === "ru"
                  ? "Для жизни, работы, учёбы и повседневного общения в Чехии."
                  : "For everyday life, work, study, and communication in Czechia."
            }
            badge={
              lang === "ua"
                ? "A0 безкоштовно"
                : lang === "ru"
                  ? "A0 бесплатно"
                  : "A0 free"
            }
            action={
              lang === "ua"
                ? "Обрати чеський курс →"
                : lang === "ru"
                  ? "Выбрать чешский курс →"
                  : "Select the Czech course →"
            }
            active={courseId === "cs"}
          />

          <CourseCard
            href="/learn"
            flag="🇵🇱"
            title={
              lang === "ua"
                ? "Польська мова"
                : lang === "ru"
                  ? "Польский язык"
                  : "Learn Polish"
            }
            description={
              lang === "ua"
                ? "Для роботи, переїзду, подорожей та щоденного спілкування в Польщі."
                : lang === "ru"
                  ? "Для работы, переезда, путешествий и ежедневного общения в Польше."
                  : "For work, relocation, travel, and everyday communication in Poland."
            }
            badge={
              lang === "ua"
                ? "A0 безкоштовно"
                : lang === "ru"
                  ? "A0 бесплатно"
                  : "A0 free"
            }
            action={
              lang === "ua"
                ? "Обрати польський курс →"
                : lang === "ru"
                  ? "Выбрать польский курс →"
                  : "Select the Polish course →"
            }
            active={courseId === "pl"}
          />
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

      <section className="grid items-start gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="min-w-0">
          <WordsStatsClient />
        </div>

        <div className="grid gap-4">
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
        </div>
      </section>

      <section className="flunio-card rounded-3xl p-8">
        <h2 className="theme-text mb-3 text-xl font-semibold">{tr.seoH2}</h2>

        <p className="theme-text-muted mb-3">{tr.seoP1}</p>

        <p className="theme-text-muted">{tr.seoP2}</p>
      </section>
    </div>
  );
}