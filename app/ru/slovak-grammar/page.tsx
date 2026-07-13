import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Словацкая грамматика для начинающих без паники | Flunio",
  description:
    "Словацкая грамматика для начинающих: алфавит, произношение, род, глаголы, падежи, порядок слов, типичные ошибки и практика во Flunio.",

  alternates: {
    canonical: `${SITE_URL}/ru/slovak-grammar`,
    languages: {
      en: `${SITE_URL}/slovak-grammar`,
      ru: `${SITE_URL}/ru/slovak-grammar`,
      "x-default": `${SITE_URL}/slovak-grammar`,
    },
  },

  openGraph: {
    title: "Словацкая грамматика для начинающих без паники | Flunio",
    description:
      "Что учить в словацкой грамматике первым, что отложить, как понять падежи, глаголы и порядок слов через примеры и упражнения.",
    url: `${SITE_URL}/ru/slovak-grammar`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button rounded-xl px-4 py-2 font-semibold";
const secondaryButton =
  "theme-secondary-button rounded-xl px-4 py-2 font-semibold";

const FAQ = [
  {
    q: "С чего начать словацкую грамматику?",
    a: "Начните с алфавита, произношения, рода существительных, простых предложений и настоящего времени. Падежи лучше добавлять постепенно, когда уже есть запас слов и фраз.",
  },
  {
    q: "Нужно ли сразу учить все словацкие падежи?",
    a: "Нет. Если начать с полной таблицы падежей, легко потерять мотивацию. Лучше сначала видеть падежи в простых фразах и только потом разбирать правило.",
  },
  {
    q: "Словацкая грамматика сложная?",
    a: "Она может казаться сложной из-за окончаний, падежей и форм глаголов. Но если учить её через примеры, короткие уроки и упражнения, она становится намного понятнее.",
  },
  {
    q: "Можно ли учить грамматику без учебника?",
    a: "Да, если есть понятная структура, примеры, аудио и практика. Во Flunio грамматику можно связывать с уроками, словарём и упражнениями.",
  },
  {
    q: "Чем эта страница отличается от обычного курса?",
    a: "Эта страница объясняет порядок изучения грамматики: что учить первым, чего не трогать слишком рано и как закреплять правила в практике.",
  },
];

const grammarOrder = [
  {
    step: "1",
    title: "Алфавит и звуки",
    text: "Сначала нужно привыкнуть к буквам и звукам: č, š, ž, ľ, ň, ô, ä. Не обязательно говорить идеально, но важно узнавать слова на слух.",
    href: "/grammar/alphabet",
    cta: "Открыть алфавит",
  },
  {
    step: "2",
    title: "Простое предложение",
    text: "Кто? Что делает? Где? Новичку важно научиться собирать короткие фразы: Я работаю. Я иду домой. Это моя семья.",
    href: "/learning/a0-1",
    cta: "Начать с A0",
  },
  {
    step: "3",
    title: "Род существительных",
    text: "В словацком слова имеют род. Это влияет на окончания и формы. Лучше замечать род на частых словах, а не учить сухое правило отдельно.",
    href: "/grammar/cases",
    cta: "Посмотреть грамматику",
  },
  {
    step: "4",
    title: "Глаголы в настоящем времени",
    text: "Глаголы дают движение: я хочу, я работаю, я понимаю, мне нужно. Настоящее время — одна из самых полезных тем для старта.",
    href: "/grammar/verbs-present",
    cta: "Глаголы сейчас",
  },
  {
    step: "5",
    title: "Падежи через фразы",
    text: "Падежи лучше не атаковать всей таблицей. Начните с фраз: do práce, v obchode, s kamarátom, nemám čas.",
    href: "/grammar/cases",
    cta: "Падежи без паники",
  },
  {
    step: "6",
    title: "Прошедшее и будущее время",
    text: "Когда настоящее время уже не пугает, можно добавлять прошлое и будущее: что было, что будет, что вы сделали или планируете.",
    href: "/grammar/verbs-past",
    cta: "Прошедшее время",
  },
];

const panicTopics = [
  {
    title: "Падежи",
    text: "Они выглядят как огромная таблица, но в жизни сначала нужны частые модели: в городе, на работе, у врача, с другом, без времени.",
  },
  {
    title: "Окончания",
    text: "Окончания пугают, когда их учат отдельно. Но если видеть их в фразах, мозг постепенно начинает узнавать повторяющиеся формы.",
  },
  {
    title: "Глагольные формы",
    text: "Не нужно сразу знать все времена и исключения. Начните с настоящего времени и самых частых глаголов: byť, mať, ísť, robiť, chcieť.",
  },
  {
    title: "Порядок слов",
    text: "Словацкий порядок слов гибче, чем кажется. Для старта достаточно простых моделей, а нюансы придут позже.",
  },
];

const grammarMistakes = [
  {
    title: "Учить правило без слов",
    text: "Правило без примеров почти не держится в памяти. Сначала нужны слова и фразы, потом объяснение.",
  },
  {
    title: "Открыть таблицу падежей в первый день",
    text: "Это быстрый способ решить, что язык невозможный. Таблица пригодится позже, когда уже есть контекст.",
  },
  {
    title: "Пытаться говорить без ошибок",
    text: "Идеальная грамматика на старте невозможна. Цель новичка — быть понятным и постепенно исправлять ошибки.",
  },
  {
    title: "Не повторять старые темы",
    text: "Грамматика не закрепляется одним прочтением. Её нужно встречать снова в словах, упражнениях и фразах.",
  },
  {
    title: "Разделять слова и грамматику",
    text: "На самом деле они работают вместе. Слово показывает материал, грамматика объясняет, почему форма изменилась.",
  },
  {
    title: "Учить слишком много за раз",
    text: "Лучше одна маленькая тема и практика, чем пять правил без закрепления.",
  },
];

const practicalExamples = [
  {
    title: "Настоящее время",
    examples: [
      ["Ja pracujem.", "Я работаю."],
      ["Ty rozumieš.", "Ты понимаешь."],
      ["On býva v meste.", "Он живёт в городе."],
    ],
    text: "Настоящее время нужно почти сразу: работа, жизнь, привычки, простые действия.",
  },
  {
    title: "Место и направление",
    examples: [
      ["Som doma.", "Я дома."],
      ["Idem do práce.", "Я иду на работу."],
      ["Som v obchode.", "Я в магазине."],
    ],
    text: "Такие фразы помогают почувствовать падежи без сухой таблицы.",
  },
  {
    title: "Нужда и желание",
    examples: [
      ["Potrebujem vodu.", "Мне нужна вода."],
      ["Chcem lístok.", "Я хочу билет."],
      ["Nemám čas.", "У меня нет времени."],
    ],
    text: "Это практические конструкции, которые полезны в реальном общении.",
  },
];

const premiumGrammarReasons = [
  {
    title: "Больше примеров",
    text: "Грамматика становится понятной, когда вы видите её много раз в разных словах и ситуациях.",
  },
  {
    title: "Больше упражнений",
    text: "Прочитать правило мало. Нужно выбрать, вспомнить, услышать, написать и повторить.",
  },
  {
    title: "Путь по уровням",
    text: "Грамматика должна усложняться постепенно: A0, A1, A2, B1. Иначе она превращается в стену.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10 theme-text">
      <Script
        id="faq-schema-slovak-grammar-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Грамматика без паники
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Словацкая грамматика для начинающих: что учить первым, а что
            оставить на потом
          </h1>

          <p className="theme-text-muted">
            Словацкая грамматика пугает не потому, что она невозможная, а потому
            что её часто начинают не с того места. Новичок открывает таблицу
            падежей, видит окончания, исключения, глаголы — и решает, что язык
            слишком тяжёлый.
          </p>

          <p className="theme-text-muted">
            Правильный путь другой: сначала звуки и простые слова, потом короткие
            фразы, затем глаголы и только после этого падежи через реальные
            примеры. Во Flunio грамматика должна не блокировать обучение, а
            объяснять то, что вы уже видите в уроках и упражнениях.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning/a0-1" className={primaryButton}>
              Начать с уроков A0
            </Link>

            <Link href="/grammar" className={secondaryButton}>
              Открыть грамматику
            </Link>

            <Link href="/practice" className={secondaryButton}>
              Практика
            </Link>

            <Link href="/premium" className={secondaryButton}>
              Premium →
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          [
            "Не начинайте с полной таблицы",
            "Падежи важны, но новичку сначала нужны слова, фразы и живые примеры.",
          ],
          [
            "Грамматика должна объяснять",
            "Правило легче понять, когда вы уже видели похожую фразу в уроке или упражнении.",
          ],
          [
            "Слова и грамматика идут вместе",
            "Лексика даёт материал, грамматика показывает, почему слово меняет форму.",
          ],
          [
            "Премиум — для продолжения системы",
            "Когда базовые темы понятны, нужны новые уровни, больше примеров и больше практики.",
          ],
        ].map(([title, text]) => (
          <div key={title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-accent-text">{title}</h2>
            <p className="mt-2 theme-text-muted">{text}</p>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Почему грамматика кажется страшной
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Большинство людей не бросает словацкий из-за одного сложного правила.
            Они бросают из-за ощущения, что правил слишком много и непонятно, за
            что хвататься. Сегодня алфавит, завтра падежи, потом глаголы,
            окончания, исключения — и всё смешивается.
          </p>

          <p>
            Но грамматика не обязана быть первым препятствием. Она может быть
            навигатором. Вы сначала встречаете фразу, слышите её, пробуете
            использовать, а уже потом открываете правило и понимаете, почему
            форма именно такая.
          </p>

          <p>
            Поэтому во Flunio грамматику лучше воспринимать не как экзамен, а
            как подсказку к урокам, словам и упражнениям.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          В каком порядке учить словацкую грамматику
        </h2>

        <p className="theme-text-muted">
          Если вы начинаете с нуля, порядок важнее скорости. Вот спокойный путь,
          который не ломает мотивацию.
        </p>

        <div className="grid gap-4">
          {grammarOrder.map((item) => (
            <div key={item.step} className={`${softCard} p-4`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide theme-accent-text">
                    Шаг {item.step}
                  </div>
                  <h3 className="mt-1 font-bold theme-text">{item.title}</h3>
                  <p className="mt-2 theme-text-muted">{item.text}</p>
                </div>

                <Link
                  href={item.href}
                  className={`${secondaryButton} shrink-0 text-center`}
                >
                  {item.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Темы, которые пугают новичков
        </h2>

        <p className="theme-text-muted">
          Эти темы действительно важны. Но они становятся понятнее, если не
          учить их отдельно от слов и жизни.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {panicTopics.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Грамматика на живых примерах
        </h2>

        <p className="theme-text-muted">
          Вот почему лучше учить грамматику через короткие фразы. Вы сразу
          видите не только правило, но и ситуацию, где оно работает.
        </p>

        <div className="grid gap-4">
          {practicalExamples.map((group) => (
            <div key={group.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{group.title}</h3>

              <div className="mt-3 grid gap-2">
                {group.examples.map(([sk, ru]) => (
                  <div
                    key={sk}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    <span className="font-semibold theme-text">{sk}</span>
                    <span className="theme-text-muted"> — {ru}</span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-sm theme-text-muted">{group.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Ошибки при изучении словацкой грамматики
        </h2>

        <p className="theme-text-muted">
          Если убрать эти ошибки, грамматика станет не лёгкой магически, но
          намного спокойнее и понятнее.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {grammarMistakes.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Когда грамматика начинает требовать больше практики
        </h2>

        <p className="theme-text-muted">
          На первых уроках можно двигаться бесплатно и спокойно понять, подходит
          ли вам формат. Но когда вы хотите идти дальше, грамматику нужно
          встречать чаще: в новых уроках, фразах, упражнениях и повторении.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {premiumGrammarReasons.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Продолжить уроки
          </Link>

          <Link href="/premium" className={secondaryButton}>
            Посмотреть Premium →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Связанные страницы
        </h2>

        <p className="theme-text-muted">
          Грамматику лучше не учить отдельно от слов. Сначала соберите базовую
          лексику, затем возвращайтесь к правилам и закрепляйте их в практике.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/ru/slovak-for-beginners" className={secondaryButton}>
            Словацкий для начинающих
          </Link>

          <Link href="/ru/slovak-vocabulary" className={secondaryButton}>
            Словацкие слова
          </Link>

          <Link href="/ru/learn-slovak" className={secondaryButton}>
            Курс словацкого
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Упражнения
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className={`${softCard} p-4`}>
              <div className="font-semibold theme-accent-text">{item.q}</div>
              <div className="mt-2 theme-text-muted">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}