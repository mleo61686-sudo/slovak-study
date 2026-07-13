import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Чешский язык для начинающих с нуля | Flunio",
  description:
    "Чешский язык для начинающих: что учить первым, как привыкнуть к ř, долгим гласным, падежам, похожим словам, первые 7 дней и уроки во Flunio.",

  alternates: {
    canonical: `${SITE_URL}/ru/czech-for-beginners`,
    languages: {
      en: `${SITE_URL}/czech-for-beginners`,
      ru: `${SITE_URL}/ru/czech-for-beginners`,
      "x-default": `${SITE_URL}/czech-for-beginners`,
    },
  },

  openGraph: {
    title: "Чешский язык для начинающих с нуля | Flunio",
    description:
      "Как начать учить чешский без хаоса: первые слова, произношение, ř, похожие слова, падежи, ошибки новичков и план на месяц.",
    url: `${SITE_URL}/ru/czech-for-beginners`,
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
    q: "С чего начать учить чешский язык с нуля?",
    a: "Начните с приветствий, чисел, еды, города, транспорта, работы и простых фраз. Параллельно слушайте аудио, чтобы привыкать к произношению и долгим гласным.",
  },
  {
    q: "Чешский язык сложный для начинающих?",
    a: "Чешский может казаться знакомым, но сложности появляются в произношении ř, долгих гласных, падежах, окончаниях и похожих словах. Если идти маленькими шагами, он становится понятнее.",
  },
  {
    q: "Нужно ли сразу учить букву ř?",
    a: "Не нужно добиваться идеального произношения ř в первый день. Важно сначала научиться узнавать звук на слух и не бросать язык из-за одной буквы.",
  },
  {
    q: "Можно ли учить чешский без преподавателя?",
    a: "Да, если есть структура: уроки по уровням, аудио, упражнения, словарь и регулярное повторение. Flunio помогает идти по маршруту, а не прыгать между случайными источниками.",
  },
  {
    q: "Когда имеет смысл брать Premium?",
    a: "После первых уроков, когда вы поняли, что хотите продолжать. Premium помогает не остановиться на базе: больше уровней, больше тем и больше практики.",
  },
];

const firstWordsGroups = [
  {
    title: "Вежливость и контакт",
    words: "dobrý den, ahoj, prosím, děkuji, promiňte, na shledanou",
    text: "Эти слова нужны сразу. Даже если вы пока не говорите свободно, они помогают начать контакт в магазине, транспорте, офисе или на работе.",
  },
  {
    title: "Числа, время и цена",
    words: "jeden, dva, tři, dnes, zítra, hodina, kolik, koruna",
    text: "Числа нужны для цены, времени, расписания, адресов, кабинетов, автобусов и простых договорённостей.",
  },
  {
    title: "Магазин и еда",
    words: "obchod, chléb, voda, mléko, maso, sýr, účet, taška",
    text: "Магазин — одна из первых реальных ситуаций, где чешский нужен не в учебнике, а прямо сейчас.",
  },
  {
    title: "Работа и учеба",
    words: "práce, škola, směna, přestávka, úkol, dnes, zítra",
    text: "Если чешский нужен для жизни в Чехии, рабочие и учебные слова нужно добавлять уже на старте.",
  },
  {
    title: "Город и транспорт",
    words: "autobus, vlak, zastávka, jízdenka, cesta, vlevo, vpravo",
    text: "Эти слова помогают не теряться в городе, покупать билет, искать остановку и понимать направление.",
  },
  {
    title: "Врач и самочувствие",
    words: "lékař, lék, bolest, teplota, nemoc, lékárna",
    text: "Медицинские слова лучше знать заранее, потому что в стрессовой ситуации перевод вспоминается хуже.",
  },
];

const first7Days = [
  {
    day: "День 1",
    title: "Не начинайте с падежей",
    text: "Откройте первые слова: приветствия, да/нет, спасибо, извините, простые вопросы. Цель — начать, а не победить всю грамматику.",
  },
  {
    day: "День 2",
    title: "Слушайте чешский вслух",
    text: "Обратите внимание на ř, č, š, ž, ě и долгие гласные. Не пытайтесь произносить идеально, просто привыкайте к звуку.",
  },
  {
    day: "День 3",
    title: "Добавьте первые темы из жизни",
    text: "Магазин, еда, транспорт, работа. Учите то, что можно встретить уже завтра, а не случайные редкие слова.",
  },
  {
    day: "День 4",
    title: "Собирайте короткие фразы",
    text: "Не только voda = вода, а chci vodu, nemám vodu, kde je voda. Фразы делают слово живым.",
  },
  {
    day: "День 5",
    title: "Осторожно с похожими словами",
    text: "Чешский часто кажется понятным, но похожесть может обманывать. Не угадывайте всё подряд — проверяйте значение.",
  },
  {
    day: "День 6",
    title: "Повторите, а не бегите дальше",
    text: "Новички часто открывают новые уроки, но не закрепляют старые. Повторение важнее количества просмотренных слов.",
  },
  {
    day: "День 7",
    title: "Проверьте себя упражнениями",
    text: "Выберите перевод, узнайте слово на слух, попробуйте вспомнить его без подсказки. Так появляется реальный прогресс.",
  },
];

const beginnerTraps = [
  {
    title: "Ловушка 1: “чешский и так похож”",
    text: "Похожесть помогает начать, но может привести к ошибкам. Некоторые слова выглядят знакомо, но значат не то, что вы ожидаете.",
  },
  {
    title: "Ловушка 2: бояться ř",
    text: "Буква ř известная, но не должна останавливать обучение. Понимание и регулярность важнее идеального произношения в первый месяц.",
  },
  {
    title: "Ловушка 3: игнорировать долгие гласные",
    text: "Долгота звука в чешском важна. Поэтому аудио нужно не как бонус, а как часть обучения.",
  },
  {
    title: "Ловушка 4: начинать с таблицы падежей",
    text: "Падежи лучше подключать через фразы. Полная таблица в начале часто ломает мотивацию.",
  },
  {
    title: "Ловушка 5: только читать, но не говорить",
    text: "Можно узнавать слова в тексте, но зависать в разговоре. Нужны аудио, повторение и активные упражнения.",
  },
  {
    title: "Ловушка 6: каждый день новый источник",
    text: "Сегодня видео, завтра PDF, послезавтра приложение — и нет системы. Нужен маршрут: урок → звук → упражнение → повторение.",
  },
];

const czechSounds = [
  {
    title: "ř",
    text: "Не делайте из ř босса финального уровня. Сначала слушайте и узнавайте звук, а произношение улучшайте постепенно.",
  },
  {
    title: "Dlouhé samohlásky",
    text: "Долгие гласные á, é, í, ó, ú, ů, ý меняют звучание слова. Их лучше тренировать через аудио.",
  },
  {
    title: "č, š, ž",
    text: "Эти звуки не самые страшные, но их нужно регулярно слышать, чтобы не читать чешский по привычке.",
  },
  {
    title: "ě",
    text: "Буква ě может сбивать новичков. Не зубрите отдельно — встречайте её в словах и фразах.",
  },
];

const premiumReasons = [
  {
    title: "Не остановиться после A0",
    text: "Первые уроки дают старт, но дальше нужны новые темы, уровни и больше живых слов.",
  },
  {
    title: "Больше повторения",
    text: "Чешский не закрепляется от одного просмотра. Нужны упражнения и возвращение к словам.",
  },
  {
    title: "Путь без хаоса",
    text: "Premium помогает продолжать обучение по системе, а не собирать куски из разных источников.",
  },
];

const monthPlan = [
  {
    week: "1 неделя",
    title: "Звук и первые слова",
    text: "Привыкните к чешскому звучанию, выучите приветствия, числа, еду, город и первые фразы.",
  },
  {
    week: "2 неделя",
    title: "Повседневные ситуации",
    text: "Магазин, транспорт, работа, учеба, врач, документы. Учите то, что встретите в реальности.",
  },
  {
    week: "3 неделя",
    title: "Простые предложения",
    text: "Я хочу, мне нужно, где находится, сколько стоит, я не понимаю, повторите пожалуйста.",
  },
  {
    week: "4 неделя",
    title: "Грамматика через примеры",
    text: "Настоящее время, род, первые падежные формы и частые глаголы — без перегруза таблицами.",
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
        id="faq-schema-czech-beginners-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Чешский для новичка
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Чешский язык для начинающих: как стартовать без хаоса, страха перед
            ř и ловушки “я вроде понимаю”
          </h1>

          <p className="theme-text-muted">
            Чешский часто обманывает новичка. Он кажется знакомым: похожие
            слова, понятные корни, не совсем чужой алфавит. Но потом появляются
            <strong> ř</strong>, долгие гласные, падежи, окончания и фразы,
            которые не переводятся дословно.
          </p>

          <p className="theme-text-muted">
            Эта страница — дорожная карта для старта. Что учить первым, какие
            ошибки не делать, как пройти первые 7 дней и как продолжить во
            Flunio через уроки, аудио, упражнения и повторение.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning/a0-1" className={primaryButton}>
              Начать с первого урока A0
            </Link>

            <Link href="/ru/learn-czech" className={secondaryButton}>
              Страница курса →
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Словарь
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
            "Не доверяйте только похожести",
            "Похожий корень не всегда означает точный перевод. Чешский нужно проверять примерами.",
          ],
          [
            "Слушайте с первого дня",
            "ř и долгие гласные лучше понимать через аудио, а не через сухие описания.",
          ],
          [
            "Учите фразы, не только слова",
            "Слово быстрее запоминается, когда вы видите его в короткой живой фразе.",
          ],
          [
            "Продолжайте после старта",
            "Когда первые уроки пройдены, Premium помогает не застрять и идти дальше по уровням.",
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
          Главная ловушка чешского: он кажется проще, чем есть
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Если вы знаете русский, украинский или словацкий, чешский сначала
            может выглядеть дружелюбно. Некоторые слова угадываются, часть
            грамматики кажется знакомой, а текст иногда можно примерно понять.
          </p>

          <p>
            Но в реальной речи этого мало. Чехи говорят быстро, долгие гласные
            меняют звучание, формы слов меняются, а похожие слова иногда ведут к
            неправильному пониманию. Поэтому старт должен быть не “я угадаю”, а
            “я услышу, проверю и закреплю”.
          </p>

          <p>
            Flunio помогает учить чешский не догадками, а маленькими шагами:
            слово, звук, пример, упражнение, повторение.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Первые слова: что реально нужно новичку
        </h2>

        <p className="theme-text-muted">
          Не начинайте с редких слов. Начинайте с того, что встретите в жизни:
          магазин, транспорт, работа, учёба, врач, документы и простое общение.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {firstWordsGroups.map((item) => (
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
          Что делать в первые 7 дней
        </h2>

        <p className="theme-text-muted">
          За неделю нельзя выучить чешский, но можно убрать хаос и запустить
          нормальную привычку.
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
          Звуки, которые не надо бояться
        </h2>

        <p className="theme-text-muted">
          Чешское произношение лучше воспринимать через звук. Не пытайтесь
          объяснить всё теорией — слушайте и повторяйте.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {czechSounds.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Ошибки, из-за которых бросают чешский
        </h2>

        <p className="theme-text-muted">
          Эти ошибки не выглядят страшно, но именно они часто превращают старт в
          хаос.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {beginnerTraps.map((item) => (
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
          Premium не нужен, чтобы просто посмотреть на первый урок. Но он имеет
          смысл, когда вы прошли старт и хотите продолжать без остановки:
          больше уровней, больше тем, больше повторения.
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
          Первый месяц должен дать ощущение опоры. Не гонимся за идеальным
          произношением и всеми правилами сразу.
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
            Так чешский не превращается в набор случайных заметок.
          </p>

          <p>
            Когда база уже не пугает, переходите дальше: новые темы, больше
            слов, грамматика через примеры и практика. Именно в этот момент
            Premium становится продолжением маршрута, а не случайной покупкой.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Начать A0 сейчас
          </Link>

          <Link href="/ru/learn-czech" className={secondaryButton}>
            О курсе чешского
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