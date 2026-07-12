import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Учить польский язык онлайн с нуля без страха | Flunio",
  description:
    "Учите польский язык онлайн с нуля без хаоса: произношение sz, cz, rz, ł, ą, ę, первые слова, падежи, аудио, упражнения и план обучения во Flunio.",

  alternates: {
    canonical: `${SITE_URL}/ru/learn-polish`,
    languages: {
      en: `${SITE_URL}/learn-polish`,
      ru: `${SITE_URL}/ru/learn-polish`,
      uk: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
      "x-default": `${SITE_URL}/learn-polish`,
    },
  },

  openGraph: {
    title: "Учить польский язык онлайн с нуля без страха | Flunio",
    description:
      "Польский с нуля: как привыкнуть к произношению, падежам, длинным словам и начать учиться маленькими шагами.",
    url: `${SITE_URL}/ru/learn-polish`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли начать учить польский язык онлайн с нуля?",
    a: "Да. Во Flunio можно начать с уровня A0: простые слова, базовые фразы, аудио произношение и упражнения. Не нужно сразу знать грамматику или читать сложные тексты.",
  },
  {
    q: "Почему польский кажется таким сложным?",
    a: "Польский пугает новичков буквосочетаниями вроде sz, cz, rz, szcz, а также падежами и длинными словами. Но если разобрать язык маленькими частями, он становится намного понятнее.",
  },
  {
    q: "Что учить первым в польском языке?",
    a: "Сначала лучше учить приветствия, числа, еду, город, транспорт, работу, семью, простые вопросы и фразы для повседневной жизни. Грамматику стоит добавлять постепенно.",
  },
  {
    q: "Нужно ли сразу учить польские падежи?",
    a: "Нет. Падежи важны, но в самом начале лучше не пытаться выучить всю таблицу. Сначала полезнее видеть готовые примеры и привыкать к окончаниям через слова и фразы.",
  },
  {
    q: "Подходит ли Flunio для жизни, работы или учебы в Польше?",
    a: "Да. Курс помогает учить практическую лексику для магазина, транспорта, работы, документов, учебы, общения и повседневной жизни в Польше.",
  },
];

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button rounded-xl px-4 py-2 font-semibold";
const secondaryButton =
  "theme-secondary-button rounded-xl px-4 py-2 font-semibold";

const scarySounds = [
  {
    title: "sz, cz, rz, ż",
    text: "На письме польский может выглядеть страшно, но многие сочетания просто передают знакомые шипящие звуки. Их нужно не зубрить глазами, а слушать и повторять.",
  },
  {
    title: "ą и ę",
    text: "Носовые звуки часто пугают новичков. На старте не нужно произносить их идеально — важнее узнавать их в словах и постепенно привыкать к звучанию.",
  },
  {
    title: "ł",
    text: "Польская ł звучит не как обычная l. Это одна из тех букв, которую легче понять через аудио, чем через сухое описание.",
  },
  {
    title: "szcz",
    text: "Слова с szcz выглядят как пароль от Wi-Fi, но после нескольких примеров они перестают быть монстрами. Главное — разбивать слово на части.",
  },
];

const firstWeekPlan = [
  {
    day: "День 1",
    title: "Приветствия и вежливость",
    text: "dzień dobry, cześć, proszę, dziękuję, przepraszam. Эти слова нужны сразу: в магазине, транспорте, на работе и в обычном разговоре.",
  },
  {
    day: "День 2",
    title: "Числа, цена и время",
    text: "Числа помогают понимать цену, время встречи, номер автобуса, кабинет, этаж, дату и расписание.",
  },
  {
    day: "День 3",
    title: "Еда и магазин",
    text: "chleb, woda, mleko, mięso, ser, sklep, rachunek. Это простая лексика, которую можно встретить уже в первый день в Польше.",
  },
  {
    day: "День 4",
    title: "Город и транспорт",
    text: "autobus, pociąg, przystanek, bilet, droga, lewo, prawo. Эти слова помогают не теряться в городе.",
  },
  {
    day: "День 5",
    title: "Работа и учеба",
    text: "praca, szkoła, zmiana, przerwa, dzisiaj, jutro, zadanie. Начните с коротких слов, которые часто повторяются.",
  },
  {
    day: "День 6",
    title: "Самочувствие и врач",
    text: "ból, lekarz, lek, gorączka, choroba, apteka. Эти слова лучше знать заранее, а не искать в стрессовой ситуации.",
  },
  {
    day: "День 7",
    title: "Повторение и первые фразы",
    text: "Повторите слова недели и соберите первые фразы: кто вы, что хотите, куда идёте, что вам нужно.",
  },
];

const commonMistakes = [
  {
    title: "Пытаться читать польский как русский",
    text: "Из-за похожих букв мозг пытается читать по привычке. Но польское произношение нужно слушать отдельно, особенно sz, cz, rz, ł, ą, ę.",
  },
  {
    title: "Сразу лезть в полную таблицу падежей",
    text: "Падежи важны, но новичку легко утонуть. Лучше сначала увидеть частые формы в готовых фразах.",
  },
  {
    title: "Учить только отдельные слова",
    text: "Слово без примера быстро забывается. Лучше учить маленькими блоками: слово, перевод, звук, фраза, упражнение.",
  },
  {
    title: "Бояться длинных слов",
    text: "Польские слова часто выглядят длинными, но внутри есть знакомые части. Их проще воспринимать, если разбивать на куски.",
  },
];

const realLifeTopics = [
  {
    title: "Польский в магазине",
    text: "Цена, оплата картой, пакет, чек, продукты, вес, скидка, вопрос кассира — это нужно почти сразу.",
  },
  {
    title: "Польский на работе",
    text: "Смена, перерыв, инструкции, документы, график, просьбы, простые фразы с коллегами.",
  },
  {
    title: "Польский в транспорте",
    text: "Билет, остановка, поезд, автобус, направление, пересадка, опоздание и объявления.",
  },
  {
    title: "Польский для документов",
    text: "Adres, podpis, dokument, wniosek, pobyt, zaświadczenie — слова, которые часто встречаются в официальных ситуациях.",
  },
  {
    title: "Польский для учебы",
    text: "Предметы, задания, расписание, преподаватель, группа, экзамен, сообщение и базовая коммуникация.",
  },
  {
    title: "Польский для общения",
    text: "Коротко представиться, задать вопрос, поблагодарить, переспросить и объяснить, что вы пока учите язык.",
  },
];

const monthPlan = [
  {
    week: "1 неделя",
    title: "Привыкнуть к звучанию",
    text: "Слушайте короткие слова, повторяйте вслух, не требуйте от себя идеального произношения. Цель — перестать бояться польской записи.",
  },
  {
    week: "2 неделя",
    title: "Собрать базовые темы",
    text: "Еда, город, семья, работа, транспорт, числа, время. Это основа, которую вы будете встречать постоянно.",
  },
  {
    week: "3 неделя",
    title: "Добавить первые предложения",
    text: "Учитесь говорить коротко: я хочу, мне нужно, где находится, сколько стоит, когда будет, я не понимаю.",
  },
  {
    week: "4 неделя",
    title: "Подключить грамматику",
    text: "Начинайте разбирать род, настоящее время, частые глаголы и первые падежные формы через примеры, а не через сухую таблицу.",
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
        id="faq-schema-polish-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Польский без паники
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Учить польский язык онлайн с нуля — без страха перед sz, cz, rz и
            падежами
          </h1>

          <p className="theme-text-muted">
            Польский часто пугает ещё до первого урока. Слова выглядят длинными,
            буквосочетания вроде <strong>sz</strong>, <strong>cz</strong>,{" "}
            <strong>rz</strong> и <strong>szcz</strong> кажутся невозможными, а
            падежи создают ощущение, будто язык состоит только из исключений.
          </p>

          <p className="theme-text-muted">
            Но польский становится намного спокойнее, если учить его не через
            хаотичные списки и огромные таблицы, а маленькими шагами: сначала
            звук и первые слова, потом простые фразы, затем упражнения,
            повторение и грамматика тогда, когда она уже объясняет знакомые
            примеры.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning" className={primaryButton}>
              Начать учить польский
            </Link>

            <Link href="/learning/a0-1" className={secondaryButton}>
              Первый урок A0 →
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Польский словарь
            </Link>

            <Link href="/grammar" className={secondaryButton}>
              Грамматика
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          [
            "Сначала звук, потом страх исчезает",
            "Польская запись выглядит сложнее, чем звучит. Аудио помогает привыкнуть к словам быстрее, чем чтение правил.",
          ],
          [
            "Короткие уроки вместо перегруза",
            "Не нужно брать 200 слов за раз. Лучше маленький урок, повторение и упражнения каждый день.",
          ],
          [
            "Падежи через примеры",
            "Падежи легче понимать не как таблицу, а как изменения в знакомых фразах.",
          ],
          [
            "Практические темы",
            "Магазин, транспорт, работа, документы, учеба и общение — то, что реально нужно в Польше.",
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
          Почему польский выглядит страшнее, чем он есть
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            У польского есть особенность: он может выглядеть очень сложным на
            письме. Новичок видит слово с несколькими шипящими буквами подряд и
            сразу думает: “Я это никогда не произнесу”. Но часто проблема не в
            самом слове, а в том, что его пытаются понять только глазами.
          </p>

          <p>
            Польский нужно слушать. Когда вы слышите слово несколько раз,
            повторяете его вслух и видите перевод, длинная запись постепенно
            перестаёт быть хаосом. Буквы превращаются в знакомые звуки, а слова
            — в нормальные фразы.
          </p>

          <p>
            Поэтому хороший старт в польском — это не зубрёжка всех правил
            сразу, а спокойное привыкание к звуку, базовой лексике и самым
            частым ситуациям.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Звуки и буквы, которые пугают новичков
        </h2>

        <p className="theme-text-muted">
          Не нужно становиться экспертом по фонетике в первый день. Но полезно
          понимать, какие элементы польского будут встречаться постоянно.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {scarySounds.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Что учить в первую неделю
        </h2>

        <p className="theme-text-muted">
          В первую неделю задача не в том, чтобы “разобраться во всём польском”.
          Задача проще: привыкнуть к звучанию, выучить первые полезные слова и
          почувствовать, что язык можно разобрать на части.
        </p>

        <div className="grid gap-4">
          {firstWeekPlan.map((item) => (
            <div key={item.day} className={`${softCard} p-4`}>
              <div className="text-xs font-semibold uppercase tracking-wide theme-accent-text">
                {item.day}
              </div>
              <h3 className="mt-1 font-bold theme-text">{item.title}</h3>
              <p className="mt-2 theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Начать с первого урока →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Частые ошибки при изучении польского
        </h2>

        <p className="theme-text-muted">
          Польский становится сложнее, когда его начинают учить слишком резко:
          много правил, много слов, мало повторения и почти нет аудио. Вот чего
          лучше избегать.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {commonMistakes.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Польский для реальных ситуаций
        </h2>

        <p className="theme-text-muted">
          Если польский нужен для жизни, работы, учебы или переезда, учить язык
          лучше через ситуации. Так слова быстрее получают смысл и не остаются
          мёртвым списком в тетради.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {realLifeTopics.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Как относиться к польским падежам
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Падежи — одна из тем, из-за которых польский кажется тяжёлым. Но
            главная ошибка — пытаться выучить всю систему сразу. Новичку не
            нужно в первый день знать все окончания и исключения.
          </p>

          <p>
            Лучше идти от частых примеров: “у меня есть”, “я иду в магазин”, “я
            говорю с другом”, “мне нужно”, “нет времени”. Когда такие фразы
            повторяются в разных уроках, формы начинают восприниматься
            естественнее.
          </p>

          <p>
            Грамматика должна объяснять то, что вы уже встречали, а не
            превращаться в стену перед первым разговором.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/grammar" className={secondaryButton}>
            Открыть грамматику
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Перейти к упражнениям
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Мини-план на первый месяц
        </h2>

        <p className="theme-text-muted">
          Первый месяц в польском должен не ломать, а втягивать. Вот простой
          маршрут без перегруза.
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
          Как Flunio помогает учить польский маленькими шагами
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Flunio помогает не прыгать между случайными источниками. Вы
            проходите короткие уроки, слушаете слова, выполняете упражнения,
            возвращаетесь к повторению и постепенно собираете польский в
            систему.
          </p>

          <p>
            Это особенно полезно, если вы учите язык после работы, перед учёбой,
            в дороге или просто не хотите перегружать себя большими учебниками.
            Даже маленькое занятие имеет смысл, если оно повторяется регулярно.
          </p>

          <p>
            Польский не обязан быть страшным. Его можно учить спокойно: звук за
            звуком, слово за словом, фраза за фразой.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Открыть уроки
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Польский словарь
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Практика
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