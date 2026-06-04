import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Учить чешский язык онлайн с нуля без хаоса | Flunio",
  description:
    "Учите чешский язык онлайн с нуля: произношение ř, долгие гласные, падежи, ложные друзья, первые слова, аудио, упражнения и план обучения во Flunio.",

  alternates: {
    canonical: `${SITE_URL}/ru/learn-czech`,
    languages: {
      en: `${SITE_URL}/learn-czech`,
      ru: `${SITE_URL}/ru/learn-czech`,
      uk: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Учить чешский язык онлайн с нуля без хаоса | Flunio",
    description:
      "Чешский с нуля: как не утонуть в ř, долгих гласных, падежах, похожих словах и начать учиться маленькими шагами.",
    url: `${SITE_URL}/ru/learn-czech`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли начать учить чешский язык онлайн с нуля?",
    a: "Да. Во Flunio можно начать с уровня A0: простые слова, базовые фразы, аудио произношение и упражнения. Курс подходит тем, кто ещё не знает чешский или когда-то начинал и бросил.",
  },
  {
    q: "Почему чешский кажется одновременно лёгким и сложным?",
    a: "Чешский может выглядеть знакомо для носителей славянских языков, но сложности появляются в произношении, долгих гласных, падежах, формах слов и ложных друзьях.",
  },
  {
    q: "Что учить первым в чешском языке?",
    a: "Сначала лучше учить приветствия, числа, еду, город, транспорт, работу, семью, простые вопросы и полезные фразы. Грамматику стоит добавлять постепенно через примеры.",
  },
  {
    q: "Нужно ли сразу учить чешские падежи?",
    a: "Нет. Падежи важны, но в самом начале лучше не учить всю таблицу сразу. Полезнее привыкать к частым формам через готовые фразы и упражнения.",
  },
  {
    q: "Подходит ли Flunio для жизни, работы или учёбы в Чехии?",
    a: "Да. Flunio помогает учить практическую лексику для магазина, транспорта, работы, документов, учёбы, общения и повседневной жизни в Чехии.",
  },
];

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button rounded-xl px-4 py-2 font-semibold";
const secondaryButton =
  "theme-secondary-button rounded-xl px-4 py-2 font-semibold";

const czechTraps = [
  {
    title: "Буква ř",
    text: "Самый известный страх новичков. Не нужно произносить ř идеально в первый день. Сначала важно научиться узнавать звук на слух и не останавливаться из-за одной буквы.",
  },
  {
    title: "Долгие гласные",
    text: "В чешском длина гласной может менять звучание и ощущение слова. Поэтому важно слушать аудио, а не только читать слова глазами.",
  },
  {
    title: "Похожие слова",
    text: "Некоторые чешские слова кажутся понятными, но значение может отличаться. Это ловушка: язык вроде знакомый, но требует внимательности.",
  },
  {
    title: "Падежи и окончания",
    text: "Слова меняют форму, и новичок быстро теряется. Но падежи легче понимать через живые фразы, а не через огромную таблицу в начале.",
  },
];

const firstWeekPlan = [
  {
    day: "День 1",
    title: "Приветствия и вежливость",
    text: "dobrý den, ahoj, prosím, děkuji, promiňte. Это слова, которые нужны сразу: в магазине, транспорте, на работе и в обычном разговоре.",
  },
  {
    day: "День 2",
    title: "Числа, цена и время",
    text: "Числа нужны для цены, времени, даты, номера автобуса, кабинета, этажа, расписания и простых договорённостей.",
  },
  {
    day: "День 3",
    title: "Еда и магазин",
    text: "chléb, voda, mléko, maso, sýr, obchod, účet. Простая лексика, которую можно встретить в Чехии почти каждый день.",
  },
  {
    day: "День 4",
    title: "Город и транспорт",
    text: "autobus, vlak, zastávka, jízdenka, cesta, vlevo, vpravo. Эти слова помогают не теряться в городе и понимать объявления.",
  },
  {
    day: "День 5",
    title: "Работа и учёба",
    text: "práce, škola, směna, přestávka, dnes, zítra, úkol. На старте важны короткие слова, которые постоянно повторяются.",
  },
  {
    day: "День 6",
    title: "Самочувствие и врач",
    text: "bolest, lékař, lék, teplota, nemoc, lékárna. Эти слова лучше знать заранее, а не искать в стрессовой ситуации.",
  },
  {
    day: "День 7",
    title: "Повторение и первые фразы",
    text: "Повторите слова недели и начните собирать короткие фразы: кто вы, что хотите, куда идёте, что вам нужно.",
  },
];

const falseFriends = [
  {
    title: "Познакомиться ≠ понять всё",
    text: "Из-за сходства славянских языков кажется, что чешский можно просто угадывать. Иногда это помогает, но иногда ведёт к ошибкам.",
  },
  {
    title: "Читать легче, чем говорить",
    text: "Многие сначала узнают слова в тексте, но не могут быстро ответить вслух. Поэтому нужны аудио и упражнения, а не только чтение.",
  },
  {
    title: "Похожие корни, разные формы",
    text: "Слово может быть знакомым по корню, но форма в предложении меняется. Это особенно заметно в падежах и глаголах.",
  },
  {
    title: "Не все слова переводятся дословно",
    text: "Некоторые фразы в чешском звучат естественно только в своём порядке и контексте. Их лучше учить как готовые куски речи.",
  },
];

const realLifeTopics = [
  {
    title: "Чешский в магазине",
    text: "Цена, карта, чек, пакет, продукты, скидка, вопрос кассира и короткие ответы без паники.",
  },
  {
    title: "Чешский на работе",
    text: "Смена, перерыв, инструкции, график, просьбы, замечания и обычные фразы с коллегами.",
  },
  {
    title: "Чешский в транспорте",
    text: "Остановка, билет, поезд, автобус, направление, пересадка, опоздание и объявления.",
  },
  {
    title: "Чешский для документов",
    text: "Adresa, podpis, doklad, žádost, pobyt, potvrzení — слова, которые часто встречаются в официальных ситуациях.",
  },
  {
    title: "Чешский для учёбы",
    text: "Предметы, расписание, преподаватель, задание, группа, экзамен и простая коммуникация в школе или университете.",
  },
  {
    title: "Чешский для общения",
    text: "Представиться, задать вопрос, переспросить, поблагодарить и объяснить, что вы пока учите язык.",
  },
];

const monthPlan = [
  {
    week: "1 неделя",
    title: "Привыкнуть к звучанию",
    text: "Слушайте короткие слова, повторяйте вслух, привыкайте к ř, č, š, ž, ě и долгим гласным без давления.",
  },
  {
    week: "2 неделя",
    title: "Собрать базовые темы",
    text: "Еда, город, семья, работа, транспорт, числа, время. Это основа, которую вы будете постоянно встречать.",
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
        id="faq-schema-czech-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Чешский без хаоса
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Учить чешский язык онлайн с нуля — без паники перед ř, падежами и
            похожими словами
          </h1>

          <p className="theme-text-muted">
            Чешский часто кажется обманчиво лёгким. Многие слова выглядят
            знакомо, часть фраз можно угадать, а алфавит не выглядит совсем
            чужим. Но потом появляются <strong>ř</strong>, долгие гласные,
            падежи, окончания и слова, которые вроде бы знакомые, но значат не
            совсем то, что ожидалось.
          </p>

          <p className="theme-text-muted">
            Поэтому чешский лучше учить не хаотично, а маленькими шагами:
            сначала звук и первые слова, потом простые фразы, упражнения,
            повторение и грамматика тогда, когда она объясняет уже знакомые
            примеры.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning" className={primaryButton}>
              Начать учить чешский
            </Link>

            <Link href="/learning/a0-1" className={secondaryButton}>
              Первый урок A0 →
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Чешский словарь
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
            "Знакомый язык, но не копия",
            "Чешский может казаться понятным, но похожесть иногда обманывает. Нужны примеры, звук и практика.",
          ],
          [
            "Произношение с первых дней",
            "ř, č, š, ž, ě и долгие гласные легче воспринимать через аудио, а не через сухое описание.",
          ],
          [
            "Падежи через фразы",
            "Не нужно начинать с полной таблицы. Лучше видеть формы в коротких понятных предложениях.",
          ],
          [
            "Темы для реальной жизни",
            "Магазин, транспорт, работа, документы, учёба и общение — то, что действительно нужно в Чехии.",
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
          Почему чешский сначала кажется знакомым, а потом сложным
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            У чешского есть интересная особенность: новичок часто чувствует, что
            язык “почти понятен”. Некоторые слова похожи на русские, украинские
            или словацкие, часть фраз можно угадать по контексту. Это помогает
            начать, но может создать ложное чувство безопасности.
          </p>

          <p>
            В реальном общении всё сложнее. Чехи говорят быстро, слова меняют
            форму, ударение и долгота звуков влияют на восприятие, а знакомое на
            вид слово не всегда значит то, что хочется угадать. Поэтому одного
            “примерно понимаю” недостаточно.
          </p>

          <p>
            Хороший старт в чешском — это не попытка выучить всё сразу, а
            спокойное привыкание к звучанию, частым словам и фразам, которые вы
            действительно можете встретить в Чехии.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Главные ловушки чешского для новичков
        </h2>

        <p className="theme-text-muted">
          Эти темы не должны останавливать обучение. Их просто нужно проходить
          постепенно, через звук, примеры и повторение.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {czechTraps.map((item) => (
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
          В первую неделю не нужно пытаться “закрыть чешскую грамматику”.
          Гораздо полезнее собрать минимальную базу: звуки, частые слова и
          простые фразы, которые сразу встречаются в жизни.
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
          Почему похожие слова могут мешать
        </h2>

        <p className="theme-text-muted">
          Похожесть чешского — это плюс, но не гарантия. Иногда она помогает
          догадаться о смысле, а иногда подталкивает к неправильному переводу или
          странной фразе.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {falseFriends.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Чешский для реальных ситуаций
        </h2>

        <p className="theme-text-muted">
          Если чешский нужен для жизни, работы, учёбы или переезда, учить язык
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
          Как относиться к чешским падежам
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Падежи — одна из тем, из-за которых чешский кажется тяжёлым. Но
            главная ошибка — пытаться выучить всю систему сразу. Новичку не
            нужно в первый день знать все окончания и исключения.
          </p>

          <p>
            Лучше идти от частых фраз: “я иду в магазин”, “у меня есть”, “я
            говорю с коллегой”, “мне нужно”, “нет времени”. Когда формы
            повторяются в знакомом контексте, грамматика перестаёт быть
            абстрактной.
          </p>

          <p>
            Грамматика должна объяснять то, что вы уже видели в словах и
            предложениях, а не становиться стеной перед первым разговором.
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
          Первый месяц в чешском должен дать чувство опоры. Не нужно гнаться за
          идеальным произношением и всеми правилами сразу.
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
          Как Flunio помогает учить чешский маленькими шагами
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Flunio помогает не прыгать между случайными источниками. Вы
            проходите короткие уроки, слушаете слова, выполняете упражнения,
            возвращаетесь к повторению и постепенно собираете чешский в систему.
          </p>

          <p>
            Это особенно полезно, если вы учите язык после работы, перед учёбой,
            в дороге или просто не хотите перегружать себя большими учебниками.
            Даже маленькое занятие имеет смысл, если оно повторяется регулярно.
          </p>

          <p>
            Чешский не нужно “побеждать” за неделю. Его можно приручать
            спокойно: звук за звуком, слово за словом, фраза за фразой.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Открыть уроки
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Чешский словарь
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