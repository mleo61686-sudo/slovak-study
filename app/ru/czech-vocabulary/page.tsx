import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Чешские слова с переводом по темам | Flunio",
  description:
    "Чешские слова с переводом для начинающих: магазин, работа, транспорт, врач, документы, еда, город, первые глаголы, похожие слова, аудио и упражнения во Flunio.",

  alternates: {
    canonical: `${SITE_URL}/ru/czech-vocabulary`,
    languages: {
      en: `${SITE_URL}/czech-vocabulary`,
      ru: `${SITE_URL}/ru/czech-vocabulary`,
      "x-default": `${SITE_URL}/czech-vocabulary`,
    },
  },

  openGraph: {
    title: "Чешские слова с переводом по темам | Flunio",
    description:
      "Практические чешские слова для жизни в Чехии: магазин, работа, транспорт, врач, документы, еда, город, похожие слова и упражнения.",
    url: `${SITE_URL}/ru/czech-vocabulary`,
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
    q: "Какие чешские слова учить первыми?",
    a: "Сначала лучше учить слова для реальной жизни: приветствия, числа, еда, магазин, транспорт, работа, врач, документы и простые глаголы.",
  },
  {
    q: "Сколько чешских слов нужно знать начинающему?",
    a: "Для старта достаточно 100–150 самых частых слов и фраз. Но важнее не количество, а повторение, аудио и умение узнавать слова в упражнениях.",
  },
  {
    q: "Почему чешские слова иногда легко спутать?",
    a: "Чешский похож на другие славянские языки, поэтому некоторые слова кажутся знакомыми. Но похожесть может обманывать: значение или употребление иногда отличается.",
  },
  {
    q: "Можно ли учить чешские слова только списком?",
    a: "Список помогает увидеть лексику, но этого мало. Слово нужно услышать, повторить, увидеть в примере и проверить в упражнении.",
  },
  {
    q: "Есть ли во Flunio словарь чешских слов?",
    a: "Да. Во Flunio есть словарь, уроки по уровням, аудио произношение и упражнения, которые помогают не просто читать слова, а запоминать их.",
  },
];

const vocabularyGroups = [
  {
    title: "Приветствия и вежливость",
    words: [
      ["dobrý den", "добрый день"],
      ["ahoj", "привет"],
      ["prosím", "пожалуйста"],
      ["děkuji", "спасибо"],
      ["promiňte", "извините"],
      ["na shledanou", "до свидания"],
    ],
    text: "Эти слова нужны сразу: в магазине, транспорте, офисе, на работе или в обычном разговоре.",
  },
  {
    title: "Магазин и еда",
    words: [
      ["obchod", "магазин"],
      ["chléb", "хлеб"],
      ["voda", "вода"],
      ["mléko", "молоко"],
      ["maso", "мясо"],
      ["účet", "чек / счёт"],
    ],
    text: "Магазин — одна из первых ситуаций, где чешский нужен не в теории, а прямо сейчас: касса, продукты, пакет, карта, цена.",
  },
  {
    title: "Работа и смены",
    words: [
      ["práce", "работа"],
      ["směna", "смена"],
      ["přestávka", "перерыв"],
      ["dnes", "сегодня"],
      ["zítra", "завтра"],
      ["hotovo", "готово"],
    ],
    text: "Если вы работаете в Чехии, сначала важны короткие слова, которые часто повторяются в графике, инструкциях и разговорах.",
  },
  {
    title: "Город и транспорт",
    words: [
      ["autobus", "автобус"],
      ["vlak", "поезд"],
      ["zastávka", "остановка"],
      ["jízdenka", "билет"],
      ["cesta", "дорога"],
      ["vpravo", "направо"],
    ],
    text: "Эти слова помогают ехать на работу, искать остановку, покупать билет, понимать направление и не теряться в городе.",
  },
  {
    title: "Врач и здоровье",
    words: [
      ["lékař", "врач"],
      ["lék", "лекарство"],
      ["bolest", "боль"],
      ["teplota", "температура"],
      ["nemoc", "болезнь"],
      ["lékárna", "аптека"],
    ],
    text: "Медицинские слова лучше знать заранее. Когда плохо, переводить всё в последний момент намного тяжелее.",
  },
  {
    title: "Документы и учреждения",
    words: [
      ["doklad", "документ"],
      ["adresa", "адрес"],
      ["podpis", "подпись"],
      ["žádost", "заявление"],
      ["pobyt", "пребывание"],
      ["potvrzení", "подтверждение"],
    ],
    text: "Эта лексика встречается в формах, письмах, банках, офисах, школах и государственных учреждениях.",
  },
];

const verbs = [
  ["být", "быть"],
  ["mít", "иметь"],
  ["jít", "идти"],
  ["jet", "ехать"],
  ["dělat", "делать / работать"],
  ["chtít", "хотеть"],
  ["potřebovat", "нуждаться / требоваться"],
  ["vědět", "знать"],
  ["umět", "уметь"],
  ["mluvit", "говорить"],
  ["rozumět", "понимать"],
  ["bydlet", "жить / проживать"],
];

const falseFriendNotes = [
  {
    title: "Похожее слово ≠ точный перевод",
    text: "Чешский часто кажется знакомым, но похожесть может вести к ошибке. Лучше проверять слово в словаре и примере.",
  },
  {
    title: "Контекст важнее догадки",
    text: "Одно слово может быть понятным в списке, но иначе работать во фразе. Учите не только перевод, но и употребление.",
  },
  {
    title: "Слушайте, а не только читайте",
    text: "В тексте слово может быть узнаваемым, но на слух пройти мимо. Чешские долгие гласные и ř нужно слышать.",
  },
  {
    title: "Фразы спасают от ошибки",
    text: "Когда слово стоит в короткой фразе, меньше риска запомнить его мёртвым переводом без реального смысла.",
  },
];

const learningRules = [
  {
    title: "Учите слова темами",
    text: "Магазин, работа, транспорт, врач, документы — так слова быстрее получают смысл.",
  },
  {
    title: "Добавляйте аудио",
    text: "Чешское слово нужно услышать. Особенно если в нём есть ř, č, š, ž, ě или долгие гласные.",
  },
  {
    title: "Проверяйте себя",
    text: "Просто прочитать список мало. Нужно выбирать перевод, вспоминать слово и узнавать его на слух.",
  },
  {
    title: "Не доверяйте только похожести",
    text: "Если слово похоже на знакомое, это не значит, что его можно использовать так же.",
  },
];

const premiumVocabularyReasons = [
  {
    title: "Больше тем",
    text: "После базовых слов нужно идти дальше: работа, документы, здоровье, учеба, бытовые ситуации, действия и фразы.",
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
        id="faq-schema-czech-vocabulary-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Чешские слова по темам
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Чешские слова с переводом: что учить первым и почему похожие слова
            могут обманывать
          </h1>

          <p className="theme-text-muted">
            Чешские слова часто выглядят знакомо. Это помогает начать, но иногда
            создаёт ловушку: кажется, что перевод очевиден, а в реальной фразе
            слово работает иначе. Поэтому лексику лучше учить не случайным
            списком, а по темам и с примерами.
          </p>

          <p className="theme-text-muted">
            На этой странице — практические группы чешских слов для начинающих:
            магазин, работа, транспорт, врач, документы, город и первые глаголы.
            Во Flunio эти слова можно учить в уроках, слушать с аудио,
            закреплять упражнениями и повторять.
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
            "Учить obchod, práce, lékař, autobus полезнее, когда вы понимаете, где это слово встретится.",
          ],
          [
            "Похожесть может обманывать",
            "Чешский кажется знакомым, но некоторые слова и фразы нужно проверять, а не угадывать.",
          ],
          [
            "Аудио обязательно",
            "Слово нужно не только читать. Его нужно услышать, особенно из-за ř и долгих гласных.",
          ],
          [
            "Premium — когда база уже пошла",
            "После первых тем важно не остановиться: больше уровней, больше слов, больше практики.",
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
          Почему обычные списки чешских слов быстро забываются
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Список слов создаёт ощущение быстрого прогресса: вы видите десятки
            переводов и кажется, что обучение идёт. Но если слово не связано с
            ситуацией, звуком и упражнением, оно быстро исчезает из памяти.
          </p>

          <p>
            Например, <strong>lékař</strong> — это не просто “врач”. Это
            ситуация: записаться к врачу, объяснить боль, понять время приёма,
            купить лекарство в аптеке. Когда слово связано с жизнью, оно
            запоминается лучше.
          </p>

          <p>
            Поэтому чешские слова стоит учить через связку: тема → слово →
            аудио → фраза → упражнение → повторение.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Чешские слова по темам
        </h2>

        <p className="theme-text-muted">
          Ниже — стартовые группы слов для начинающих. Не учите всё за один
          вечер. Лучше пройти одну тему, услышать слова, потренироваться и
          вернуться к повторению.
        </p>

        <div className="grid gap-4">
          {vocabularyGroups.map((group) => (
            <div key={group.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{group.title}</h3>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {group.words.map(([cs, ru]) => (
                  <div
                    key={cs}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    <span className="font-semibold theme-text">{cs}</span>
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
          Первые чешские глаголы
        </h2>

        <p className="theme-text-muted">
          Глаголы превращают отдельные слова в фразы. Даже несколько частых
          глаголов помогают сказать: я хочу, мне нужно, я иду, я понимаю, я
          живу.
        </p>

        <div className="grid gap-2 sm:grid-cols-3">
          {verbs.map(([cs, ru]) => (
            <div key={cs} className={`${softCard} px-3 py-3 text-sm`}>
              <span className="font-semibold theme-accent-text">{cs}</span>
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
          Почему похожие слова лучше проверять
        </h2>

        <p className="theme-text-muted">
          Чешская лексика часто кажется понятной. Но именно это может мешать:
          мозг угадывает значение слишком быстро и иногда ошибается.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {falseFriendNotes.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Как учить чешские слова, чтобы они оставались в памяти
        </h2>

        <p className="theme-text-muted">
          Хорошая лексика — это не количество слов, которые вы посмотрели, а
          слова, которые вы сможете узнать, вспомнить и использовать позже.
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
          Первые чешские слова дают старт, но язык не заканчивается на A0. Если
          вы уже начали узнавать базовые слова и хотите двигаться дальше, нужен
          новый материал и регулярная практика.
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
        <h2 className="text-2xl font-bold theme-text">Связанные страницы</h2>

        <p className="theme-text-muted">
          Если вы только начинаете, сначала откройте дорожную карту. Если уже
          знаете первые слова, переходите к курсу, грамматике и практике.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/ru/czech-for-beginners" className={secondaryButton}>
            Чешский для начинающих
          </Link>

          <Link href="/ru/learn-czech" className={secondaryButton}>
            Курс чешского
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