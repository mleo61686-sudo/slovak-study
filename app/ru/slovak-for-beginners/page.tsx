import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Словацкий язык для начинающих с нуля | Flunio",
  description:
    "Словацкий язык для начинающих: что учить первым, как не запутаться в падежах, первые слова, план на 7 и 30 дней, ошибки новичков и уроки во Flunio.",

  alternates: {
    canonical: `${SITE_URL}/ru/slovak-for-beginners`,
    languages: {
      ru: `${SITE_URL}/ru/slovak-for-beginners`,
      en: `${SITE_URL}/slovak-for-beginners`,
      uk: `${SITE_URL}/yak-vyvchyty-slovatsku-movu`,
    },
  },

  openGraph: {
    title: "Словацкий язык для начинающих с нуля | Flunio",
    description:
      "Что учить в словацком первым: первые слова, фразы, ошибки новичков, план на месяц и путь от A0 к реальному общению.",
    url: `${SITE_URL}/ru/slovak-for-beginners`,
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
    q: "С чего начать учить словацкий язык с нуля?",
    a: "Начните не с большой грамматики, а с базы: приветствия, числа, магазин, транспорт, работа, врач, документы и простые фразы. После этого грамматика будет понятнее.",
  },
  {
    q: "Можно ли выучить словацкий без преподавателя?",
    a: "Да, если есть структура, аудио, упражнения и регулярное повторение. Flunio помогает идти по урокам маленькими шагами, а не прыгать между случайными видео и списками слов.",
  },
  {
    q: "Что сложнее всего в словацком для начинающих?",
    a: "Обычно новичков пугают падежи, окончания, глаголы и понимание речи на слух. Но эти темы не нужно учить все сразу — лучше добавлять их постепенно.",
  },
  {
    q: "Сколько слов нужно знать для старта?",
    a: "Для первого уверенного старта достаточно 100–150 самых частых слов и фраз. Важно не просто увидеть слова, а слышать их, повторять и использовать в упражнениях.",
  },
  {
    q: "Чем эта страница отличается от обычной страницы курса?",
    a: "Эта страница — дорожная карта для новичка: что учить первым, чего не делать, как пройти первые 7 дней и как продолжить обучение во Flunio.",
  },
];

const first100Groups = [
  {
    title: "1. Вежливость и контакт",
    words: "dobrý deň, ahoj, prosím, ďakujem, prepáčte, áno, nie",
    text: "Это слова, с которых начинается почти любой контакт. Они нужны даже тогда, когда вы ещё не умеете строить длинные предложения.",
  },
  {
    title: "2. Числа, время и цена",
    words: "jeden, dva, tri, dnes, zajtra, hodina, koľko, euro",
    text: "Без чисел сложно понять цену, время смены, номер кабинета, автобус, этаж или дату.",
  },
  {
    title: "3. Магазин и еда",
    words: "chlieb, voda, mlieko, mäso, syr, účet, taška, karta",
    text: "Эти слова сразу встречаются в обычной жизни: в супермаркете, кафе, столовой или на кассе.",
  },
  {
    title: "4. Работа и простые инструкции",
    words: "práca, zmena, prestávka, pomaly, rýchlo, hotovo, zajtra",
    text: "Если вы работаете в Словакии, вам важно понимать короткие команды и базовые рабочие слова.",
  },
  {
    title: "5. Город и транспорт",
    words: "autobus, vlak, zastávka, lístok, cesta, vľavo, vpravo",
    text: "Эта лексика помогает ориентироваться в городе, ехать на работу, искать адрес или пересадку.",
  },
  {
    title: "6. Врач и самочувствие",
    words: "lekár, liek, bolesť, teplota, choroba, poisťovňa",
    text: "Такие слова лучше знать заранее. В стрессовой ситуации искать перевод намного сложнее.",
  },
];

const first7Days = [
  {
    day: "День 1",
    title: "Не учите всё. Выберите 20 слов.",
    text: "Начните с приветствий, вежливости, да/нет, спасибо, извините. Цель — открыть первый урок и почувствовать, что словацкий не враг.",
  },
  {
    day: "День 2",
    title: "Добавьте звук",
    text: "Слушайте слова вслух. Не пытайтесь произносить идеально, но повторяйте. Словацкий нужно слышать, иначе он останется текстом.",
  },
  {
    day: "День 3",
    title: "Сделайте первые упражнения",
    text: "После слов сразу нужна проверка: выбрать перевод, вспомнить слово, услышать и узнать. Так мозг понимает, что слово важно.",
  },
  {
    day: "День 4",
    title: "Соберите первые фразы",
    text: "Не просто dom = дом. Лучше: toto je dom, idem domov, som doma. Фразы быстрее превращают слова в язык.",
  },
  {
    day: "День 5",
    title: "Возьмите тему из жизни",
    text: "Магазин, работа, транспорт или врач. Выберите то, что реально нужно вам, а не абстрактную тему из учебника.",
  },
  {
    day: "День 6",
    title: "Повторите старое",
    text: "Новички часто всё время бегут дальше. Но язык растёт не от количества открытых уроков, а от повторения.",
  },
  {
    day: "День 7",
    title: "Проверьте себя",
    text: "Откройте уроки ещё раз: какие слова узнаёте без подсказки, какие слышите на аудио, какие можете написать или выбрать в упражнении.",
  },
];

const beginnerMistakes = [
  {
    title: "Ошибка 1: начинать с падежей",
    text: "Падежи важны, но если начать с таблиц, многие бросают уже на первой неделе. Сначала нужны слова, фразы и слуховая база.",
  },
  {
    title: "Ошибка 2: учить слова без звука",
    text: "Можно знать перевод, но не узнать слово в реальной речи. Поэтому аудио — не украшение, а обязательная часть обучения.",
  },
  {
    title: "Ошибка 3: собирать случайные списки",
    text: "500 слов из интернета выглядят мощно, но без порядка они быстро забываются. Лучше 20 слов, которые вы реально повторили.",
  },
  {
    title: "Ошибка 4: ждать идеального произношения",
    text: "На старте цель — быть понятным и привыкать к языку. Идеальность придёт позже, если вы не бросите.",
  },
  {
    title: "Ошибка 5: смотреть много видео и ничего не делать",
    text: "Видео создают ощущение прогресса, но язык закрепляется через активное вспоминание: упражнения, письмо, выбор, повторение.",
  },
  {
    title: "Ошибка 6: не иметь маршрута",
    text: "Сегодня видео, завтра PDF, послезавтра таблица — и через неделю хаос. Нужен путь: урок → аудио → упражнение → повторение.",
  },
];

const premiumReasons = [
  {
    title: "Больше уроков без тупика",
    text: "Когда базовые темы пройдены, важно не останавливаться. Premium открывает дальнейшие уровни и помогает идти дальше, а не застревать на старте.",
  },
  {
    title: "Регулярная практика",
    text: "Слова забываются, если их не возвращать. Чем больше практики и повторения, тем быстрее язык перестаёт быть чужим.",
  },
  {
    title: "Словацкий по системе",
    text: "Premium нужен не ради красивой кнопки, а чтобы продолжать путь: больше уроков, больше тем, больше контакта с языком.",
  },
];

const monthPlan = [
  {
    week: "1 неделя",
    title: "Запуск",
    text: "A0, первые слова, аудио, базовые упражнения. Цель — перестать бояться языка.",
  },
  {
    week: "2 неделя",
    title: "Повседневные темы",
    text: "Магазин, еда, транспорт, работа, семья, город. Цель — узнавать слова вокруг себя.",
  },
  {
    week: "3 неделя",
    title: "Первые фразы",
    text: "Я хочу, мне нужно, где находится, сколько стоит, я не понимаю, повторите пожалуйста.",
  },
  {
    week: "4 неделя",
    title: "Грамматика без паники",
    text: "Настоящее время, род, простые предложения, первые падежные формы через знакомые примеры.",
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
        id="faq-schema-slovak-beginners-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Дорожная карта для новичка
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Словацкий язык для начинающих: что учить первым, чтобы не бросить
            через неделю
          </h1>

          <p className="theme-text-muted">
            Самая частая ошибка новичка — пытаться выучить словацкий “целиком”.
            Открыть грамматику, испугаться падежей, скачать список на 500 слов,
            посмотреть три видео и всё равно не понимать кассира, коллегу или
            врача.
          </p>

          <p className="theme-text-muted">
            Эта страница — нормальный стартовый маршрут. Что учить в первые дни,
            какие темы не трогать слишком рано, какие слова нужны для жизни в
            Словакии и как перейти от хаоса к урокам, аудио и упражнениям во
            Flunio.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning/a0-1" className={primaryButton}>
              Начать с первого урока A0
            </Link>

            <Link href="/ru/learn-slovak" className={secondaryButton}>
              Страница курса →
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Словарь
            </Link>

            <Link href="/practice" className={secondaryButton}>
              Практика
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          [
            "Не начинайте с хаоса",
            "Новичку нужен не список всех правил, а простой маршрут: слова, звук, фразы, упражнения, повторение.",
          ],
          [
            "Учите то, что встретите завтра",
            "Магазин, работа, транспорт, врач, документы и простое общение полезнее, чем редкие слова из учебника.",
          ],
          [
            "Слушайте с первого дня",
            "Если слово не звучит в голове, его трудно узнать в реальной речи. Аудио должно быть частью старта.",
          ],
          [
            "Премиум имеет смысл после старта",
            "Когда первые уроки пройдены, важно не упереться в стену. Дальше нужны уровни, темы и регулярная практика.",
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
          Главная проблема новичка — не словацкий, а неправильный старт
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Словацкий не такой невозможный, как кажется в первый день. Но он
            быстро становится тяжёлым, если начать не с того места. Большая
            грамматика, случайные видео, таблицы падежей и огромные списки слов
            создают ощущение, что языка слишком много.
          </p>

          <p>
            На самом деле новичку нужна маленькая победа: открыть первый урок,
            выучить несколько полезных слов, услышать их, узнать в упражнении и
            повторить завтра. Именно так появляется чувство: “Я могу это
            продолжать”.
          </p>

          <p>
            Поэтому хороший старт — это не “сразу всё”, а правильная
            последовательность. Сначала частые слова и простые ситуации, потом
            фразы, потом грамматика, которая объясняет уже знакомые примеры.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Первые 100 слов: не список, а набор для жизни
        </h2>

        <p className="theme-text-muted">
          Первые слова должны быть не красивыми, а полезными. Если вы живёте,
          работаете или планируете переезд в Словакию, начинайте с тем, которые
          встретятся в реальности.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {first100Groups.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold theme-text">
                {item.words}
              </p>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Учить первые слова в уроках →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          План на первые 7 дней
        </h2>

        <p className="theme-text-muted">
          За неделю нельзя выучить язык, но можно сделать самое важное —
          запустить привычку и убрать страх перед первым шагом.
        </p>

        <div className="grid gap-4">
          {first7Days.map((item) => (
            <div key={item.day} className={`${softCard} p-4`}>
              <div className="text-xs font-semibold uppercase tracking-wide theme-accent-text">
                {item.day}
              </div>
              <h3 className="mt-1 font-bold theme-text">{item.title}</h3>
              <p className="mt-2 theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Ошибки, из-за которых бросают словацкий
        </h2>

        <p className="theme-text-muted">
          Эти ошибки выглядят безобидно, но именно они часто убивают мотивацию.
          Если убрать их в начале, учиться намного легче.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {beginnerMistakes.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Когда уже есть смысл брать Premium
        </h2>

        <p className="theme-text-muted">
          Премиум не нужен человеку, который даже не сделал первый шаг. Но он
          начинает иметь смысл, когда вы прошли первые уроки и поняли: “Ок, я
          хочу продолжать”. Тогда важно не потерять темп и не закончить на
          базовых словах.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {premiumReasons.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Продолжить обучение
          </Link>

          <Link href="/premium" className={secondaryButton}>
            Посмотреть Premium →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          План на первый месяц
        </h2>

        <p className="theme-text-muted">
          Первый месяц должен не выжать из вас все силы, а доказать, что
          словацкий можно учить регулярно и без паники.
        </p>

        <div className="grid gap-4">
          {monthPlan.map((item) => (
            <div key={item.week} className={`${softCard} p-4`}>
              <div className="text-xs font-semibold uppercase tracking-wide theme-accent-text">
                {item.week}
              </div>
              <h3 className="mt-1 font-bold theme-text">{item.title}</h3>
              <p className="mt-2 theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Как продолжить во Flunio
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Самый простой путь: начните с A0, проходите уроки по порядку,
            слушайте слова, делайте упражнения и возвращайтесь к повторению.
            Не нужно решать всё сразу. Важно не выпадать из процесса.
          </p>

          <p>
            Когда базовые уроки уже не пугают, переходите дальше: больше тем,
            больше слов, больше практики. Именно в этот момент Premium начинает
            работать как продолжение маршрута, а не как случайная покупка.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Начать A0 сейчас
          </Link>

          <Link href="/ru/learn-slovak" className={secondaryButton}>
            О курсе словацкого
          </Link>

          <Link href="/premium" className={secondaryButton}>
            Premium
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