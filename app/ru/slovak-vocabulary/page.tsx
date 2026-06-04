import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Словацкие слова с переводом по темам | Flunio",
  description:
    "Словацкие слова с переводом для начинающих: магазин, работа, транспорт, врач, документы, еда, город, первые глаголы, аудио, словарь и упражнения во Flunio.",

  alternates: {
    canonical: `${SITE_URL}/ru/slovak-vocabulary`,
    languages: {
      ru: `${SITE_URL}/ru/slovak-vocabulary`,
      en: `${SITE_URL}/slovak-vocabulary`,
      uk: `${SITE_URL}/slovatski-slova-z-perekladom`,
    },
  },

  openGraph: {
    title: "Словацкие слова с переводом по темам | Flunio",
    description:
      "Практические словацкие слова для жизни в Словакии: магазин, работа, транспорт, врач, документы, еда, город и упражнения.",
    url: `${SITE_URL}/ru/slovak-vocabulary`,
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
    q: "Какие словацкие слова учить первыми?",
    a: "Сначала лучше учить слова для реальной жизни: приветствия, числа, еда, магазин, транспорт, работа, врач, документы и простые глаголы.",
  },
  {
    q: "Сколько словацких слов нужно знать начинающему?",
    a: "Для старта достаточно 100–150 самых частых слов и фраз. Но важнее не количество, а повторение, аудио и умение узнавать слова в упражнениях.",
  },
  {
    q: "Можно ли учить словацкие слова только по спискам?",
    a: "Списки помогают, но этого мало. Слово нужно услышать, повторить, увидеть в примере и проверить в упражнении, иначе оно быстро забывается.",
  },
  {
    q: "Есть ли во Flunio словарь словацких слов?",
    a: "Да. Во Flunio есть словарь, уроки по уровням, аудио произношение и упражнения, которые помогают не просто читать слова, а запоминать их.",
  },
  {
    q: "Чем эта страница отличается от страницы курса?",
    a: "Эта страница сфокусирована именно на лексике: какие слова учить первыми, как группировать слова по темам и как продолжить практику во Flunio.",
  },
];

const vocabularyGroups = [
  {
    title: "Приветствия и вежливость",
    words: [
      ["dobrý deň", "добрый день"],
      ["ahoj", "привет"],
      ["prosím", "пожалуйста"],
      ["ďakujem", "спасибо"],
      ["prepáčte", "извините"],
      ["dovidenia", "до свидания"],
    ],
    text: "Эти слова нужны с первого дня. Даже если вы пока не строите длинные предложения, вежливые слова уже помогают чувствовать себя увереннее.",
  },
  {
    title: "Магазин и еда",
    words: [
      ["obchod", "магазин"],
      ["chlieb", "хлеб"],
      ["voda", "вода"],
      ["mlieko", "молоко"],
      ["mäso", "мясо"],
      ["účet", "чек / счёт"],
    ],
    text: "Магазин — одна из первых ситуаций, где словацкий нужен вживую: касса, продукты, пакет, оплата картой и короткие вопросы.",
  },
  {
    title: "Работа и смены",
    words: [
      ["práca", "работа"],
      ["zmena", "смена"],
      ["prestávka", "перерыв"],
      ["dnes", "сегодня"],
      ["zajtra", "завтра"],
      ["hotovo", "готово"],
    ],
    text: "Если вы работаете в Словакии, сначала важны не сложные фразы, а короткие слова, которые постоянно повторяются на смене.",
  },
  {
    title: "Город и транспорт",
    words: [
      ["autobus", "автобус"],
      ["vlak", "поезд"],
      ["zastávka", "остановка"],
      ["lístok", "билет"],
      ["cesta", "дорога"],
      ["vpravo", "направо"],
    ],
    text: "Эта лексика помогает доехать на работу, найти адрес, понять остановку, купить билет или спросить направление.",
  },
  {
    title: "Врач и здоровье",
    words: [
      ["lekár", "врач"],
      ["liek", "лекарство"],
      ["bolesť", "боль"],
      ["teplota", "температура"],
      ["choroba", "болезнь"],
      ["lekáreň", "аптека"],
    ],
    text: "Медицинские слова лучше знать заранее. В стрессовой ситуации вспоминать перевод намного сложнее.",
  },
  {
    title: "Документы и учреждения",
    words: [
      ["doklad", "документ"],
      ["adresa", "адрес"],
      ["podpis", "подпись"],
      ["žiadosť", "заявление"],
      ["pobyt", "пребывание"],
      ["potvrdenie", "подтверждение"],
    ],
    text: "Слова для документов часто встречаются в письмах, формах, офисах, банках и государственных учреждениях.",
  },
];

const verbs = [
  ["byť", "быть"],
  ["mať", "иметь"],
  ["ísť", "идти / ехать"],
  ["robiť", "делать / работать"],
  ["chcieť", "хотеть"],
  ["potrebovať", "нуждаться / требоваться"],
  ["vedieť", "знать / уметь"],
  ["hovoriť", "говорить"],
  ["rozumieť", "понимать"],
  ["bývať", "жить / проживать"],
  ["čakať", "ждать"],
  ["kúpiť", "купить"],
];

const learningRules = [
  {
    title: "Учите слова группами",
    text: "Слова лучше запоминаются не случайно, а по ситуациям: магазин, работа, врач, транспорт, документы.",
  },
  {
    title: "Слушайте каждое слово",
    text: "Если вы знаете слово только глазами, вы можете не узнать его в живой речи. Аудио нужно с первых уроков.",
  },
  {
    title: "Проверяйте себя",
    text: "Просто перечитать список мало. Нужно выбрать перевод, вспомнить слово, услышать его и повторить.",
  },
  {
    title: "Возвращайтесь к старому",
    text: "Слова забываются не потому, что вы “плохой ученик”, а потому что мозгу нужно повторение.",
  },
];

const premiumVocabularyReasons = [
  {
    title: "Больше тем",
    text: "Когда базовые слова уже знакомы, нужно идти дальше: работа, документы, здоровье, бытовые ситуации, действия и фразы.",
  },
  {
    title: "Больше практики",
    text: "Слова становятся активными только после повторения. Premium помогает не ограничиваться первыми уроками.",
  },
  {
    title: "Путь по уровням",
    text: "Лексика должна расти постепенно: A0 → A1 → A2 → B1. Так слова не превращаются в хаотичный список.",
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
        id="faq-schema-slovak-vocabulary-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Словацкие слова по темам
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Словацкие слова с переводом: что учить первым, чтобы слова не
            забывались через день
          </h1>

          <p className="theme-text-muted">
            Большая ошибка — начинать словацкий с огромного списка случайных
            слов. Сегодня кажется, что вы выучили много, а завтра половина уже
            исчезла. Лексика запоминается лучше, когда она связана с реальной
            ситуацией: магазин, работа, врач, транспорт, документы, город.
          </p>

          <p className="theme-text-muted">
            На этой странице собраны практические группы словацких слов для
            начинающих. Но главное — не просто прочитать список. Во Flunio вы
            можете учить слова в уроках, слушать произношение, проверять себя в
            упражнениях и возвращаться к повторению.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning/a0-1" className={primaryButton}>
              Учить слова в первом уроке
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Открыть словарь
            </Link>

            <Link href="/practice" className={secondaryButton}>
              Практиковать слова
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
            "Слова по ситуациям",
            "Учить dom, práca, lekár, autobus полезнее, когда вы понимаете, где это слово реально встретится.",
          ],
          [
            "Аудио важнее, чем кажется",
            "Слово нужно не только читать. Его нужно услышать, иначе в живой речи оно может пройти мимо.",
          ],
          [
            "Повторение решает",
            "Список без повторения быстро забывается. Упражнения помогают превратить слово в активную память.",
          ],
          [
            "Премиум — когда хочется идти дальше",
            "После базовых тем важно не остановиться: больше уровней, больше слов, больше практики.",
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
          Почему списки слов часто не работают
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Список слов сам по себе создаёт ощущение прогресса. Вы видите много
            переводов, быстро проходите глазами десятки строк и кажется, что
            обучение идёт. Но через день начинается проблема: слова похожи друг
            на друга, произношение не вспоминается, а в реальной ситуации вы не
            успеваете их узнать.
          </p>

          <p>
            Чтобы слово запомнилось, ему нужен контекст. Не просто{" "}
            <strong>lekár = врач</strong>, а ситуация: записаться к врачу,
            объяснить боль, купить лекарство, понять вопрос медсестры. Тогда
            слово становится частью жизни, а не строкой в таблице.
          </p>

          <p>
            Поэтому во Flunio слова лучше учить через уроки, аудио и упражнения:
            увидеть, услышать, выбрать, вспомнить и повторить позже.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Словацкие слова по темам
        </h2>

        <p className="theme-text-muted">
          Ниже — не “все словацкие слова”, а стартовые группы, которые реально
          полезны начинающему. Их удобно учить по очереди, а не всё сразу.
        </p>

        <div className="grid gap-4">
          {vocabularyGroups.map((group) => (
            <div key={group.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{group.title}</h3>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {group.words.map(([sk, ru]) => (
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

        <div className="pt-2">
          <Link href="/dictionary" className={primaryButton}>
            Искать слова в словаре →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Первые словацкие глаголы
        </h2>

        <p className="theme-text-muted">
          Глаголы важны, потому что без них слова остаются отдельными кусками.
          Даже несколько частых глаголов помогают строить первые фразы:
          “я хочу”, “мне нужно”, “я иду”, “я понимаю”.
        </p>

        <div className="grid gap-2 sm:grid-cols-3">
          {verbs.map(([sk, ru]) => (
            <div
              key={sk}
              className={`${softCard} px-3 py-3 text-sm`}
            >
              <span className="font-semibold theme-accent-text">{sk}</span>
              <span className="theme-text-muted"> — {ru}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/grammar/verbs-present" className={secondaryButton}>
            Глаголы в настоящем времени
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Закрепить в практике
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Как учить слова, чтобы они оставались в памяти
        </h2>

        <p className="theme-text-muted">
          Хорошая лексика — это не “сколько слов вы посмотрели”, а сколько слов
          вы сможете узнать, вспомнить и использовать позже.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {learningRules.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Когда стоит открыть больше слов и уровней
        </h2>

        <p className="theme-text-muted">
          Первые слова дают старт, но язык не заканчивается на A0. Если вы уже
          начали узнавать базовые слова и хотите двигаться дальше, нужен новый
          материал и регулярная практика.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {premiumVocabularyReasons.map((item) => (
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
          Если вы только начинаете, сначала откройте дорожную карту. Если уже
          знаете первые слова, переходите к курсу, грамматике и практике.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/ru/slovak-for-beginners" className={secondaryButton}>
            Словацкий для начинающих
          </Link>

          <Link href="/ru/learn-slovak" className={secondaryButton}>
            Курс словацкого
          </Link>

          <Link href="/grammar" className={secondaryButton}>
            Грамматика
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