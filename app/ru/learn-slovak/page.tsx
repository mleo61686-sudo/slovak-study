import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Учить словацкий язык онлайн для жизни в Словакии | Flunio",
  description:
    "Учите словацкий язык онлайн без хаоса: первые слова, фразы для магазина, работы, врача, документов, транспорта, аудио, грамматика и упражнения во Flunio.",

  alternates: {
    canonical: `${SITE_URL}/ru/learn-slovak`,
    languages: {
      en: `${SITE_URL}/learn-slovak`,
      ru: `${SITE_URL}/ru/learn-slovak`,
      uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    },
  },

  openGraph: {
    title: "Учить словацкий язык онлайн для жизни в Словакии | Flunio",
    description:
      "Словацкий с нуля без хаоса: короткие уроки, полезные слова, аудио, грамматика и упражнения для реальных ситуаций.",
    url: `${SITE_URL}/ru/learn-slovak`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Можно ли начать учить словацкий язык с нуля онлайн?",
    a: "Да. Во Flunio можно начать с уровня A0: сначала простые слова, базовые фразы, аудио произношение и короткие упражнения, затем постепенный переход к A1, A2, B1 и B2.",
  },
  {
    q: "Что лучше учить первым: слова или грамматику?",
    a: "В самом начале лучше собрать практическую базу: приветствия, числа, еду, город, работу, транспорт, врача и документы. Грамматику проще понимать, когда у вас уже есть живые примеры.",
  },
  {
    q: "Подходит ли Flunio для жизни и работы в Словакии?",
    a: "Да. Страница и курс ориентированы не только на теорию, а на практические ситуации: магазин, работа, транспорт, врач, жильё, документы и повседневное общение.",
  },
  {
    q: "Сколько времени нужно заниматься словацким каждый день?",
    a: "Для старта достаточно 10–20 минут в день. Главное — регулярность: короткий урок, повторение, аудио и несколько упражнений дают лучший результат, чем редкие длинные занятия.",
  },
  {
    q: "Почему словацкий кажется сложным в начале?",
    a: "Новички часто путаются из-за падежей, окончаний, похожих слов и произношения. Но если идти маленькими шагами и учить язык через реальные ситуации, словацкий становится намного понятнее.",
  },
];

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button rounded-xl px-4 py-2 font-semibold";
const secondaryButton =
  "theme-secondary-button rounded-xl px-4 py-2 font-semibold";

const firstWeekPlan = [
  {
    day: "День 1",
    title: "Приветствия и вежливость",
    text: "dobrý deň, ahoj, prosím, ďakujem, prepáčte. Это слова, которые нужны почти везде: в магазине, на работе, в автобусе и в офисе.",
  },
  {
    day: "День 2",
    title: "Числа, цена и время",
    text: "Сколько стоит, когда прийти, во сколько начинается смена, какой номер кабинета или автобуса — без чисел в Словакии быстро становится тяжело.",
  },
  {
    day: "День 3",
    title: "Магазин и еда",
    text: "potraviny, chlieb, voda, mäso, mlieko, účet. Даже если вы пока не говорите свободно, эти слова сразу помогают в обычной жизни.",
  },
  {
    day: "День 4",
    title: "Работа и простые инструкции",
    text: "práca, zmena, prestávka, zajtra, dnes, pomaly, rýchlo. На работе часто важны не красивые фразы, а понимание коротких команд.",
  },
  {
    day: "День 5",
    title: "Город и транспорт",
    text: "autobus, vlak, zastávka, lístok, cesta, vľavo, vpravo. Это база, если вы ездите на работу, в город, к врачу или по документам.",
  },
  {
    day: "День 6",
    title: "Врач и самочувствие",
    text: "bolesť, lekár, liek, teplota, choroba, zdravotná poisťovňa. Эти слова лучше знать заранее, а не искать их в панике.",
  },
  {
    day: "День 7",
    title: "Повторение и первые фразы",
    text: "В конце первой недели не надо гнаться за новыми словами. Лучше повторить базу и научиться собирать простые предложения.",
  },
];

const realLifeTopics = [
  {
    title: "Словацкий в магазине",
    text: "Понять цену, спросить пакет, выбрать оплату картой, услышать вопрос на кассе и не зависнуть от неожиданной фразы.",
  },
  {
    title: "Словацкий на работе",
    text: "Понимать смены, инструкции, просьбы, замечания, расписание, перерывы и короткие разговоры с коллегами.",
  },
  {
    title: "Словацкий у врача",
    text: "Объяснить, что болит, понять направление, лекарство, дату осмотра, страховку и базовые вопросы медсестры.",
  },
  {
    title: "Словацкий для документов",
    text: "Разобраться в словах вроде adresa, podpis, pobyt, žiadosť, doklad, potvrdenie и не бояться формуляров.",
  },
  {
    title: "Словацкий в транспорте",
    text: "Понять остановку, билет, направление, опоздание, пересадку и простые объявления.",
  },
  {
    title: "Словацкий для общения",
    text: "Не обязательно сразу говорить идеально. Важно начать отвечать коротко, понятно и уверенно.",
  },
];

const avoidAtStart = [
  {
    title: "Не учите все падежи сразу",
    text: "Падежи важны, но в первый день они легко убивают мотивацию. Сначала нужны примеры, фразы и частые слова.",
  },
  {
    title: "Не собирайте 500 случайных слов",
    text: "Большой список выглядит полезно, но без повторения и контекста он быстро забывается.",
  },
  {
    title: "Не пытайтесь говорить идеально",
    text: "На старте важнее быть понятным. Ошибки — нормальная часть обучения, особенно в живом разговоре.",
  },
  {
    title: "Не прыгайте между десятью источниками",
    text: "YouTube, PDF, приложения и таблицы могут помогать, но без порядка они часто создают только шум.",
  },
];

const monthPlan = [
  {
    week: "1 неделя",
    title: "База для выживания",
    text: "Приветствия, числа, магазин, транспорт, еда, город, работа. Цель — начать узнавать слова вокруг себя.",
  },
  {
    week: "2 неделя",
    title: "Первые предложения",
    text: "Учитесь говорить коротко: кто вы, где живёте, что хотите, что нужно, когда работаете, куда едете.",
  },
  {
    week: "3 неделя",
    title: "Грамматика через примеры",
    text: "Добавляйте настоящее время, род существительных, простые вопросы и частые глаголы. Без перегруза теорией.",
  },
  {
    week: "4 неделя",
    title: "Повторение и уверенность",
    text: "Повторяйте слова, слушайте аудио, делайте упражнения и возвращайтесь к темам, которые реально нужны в жизни.",
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
        id="faq-schema-slovak-ru"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Словацкий для реальной жизни
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Учить словацкий язык онлайн без хаоса — для жизни, работы и общения
            в Словакии
          </h1>

          <p className="theme-text-muted">
            Словацкий часто начинают учить неправильно: открывают случайный
            список из сотен слов, смотрят несколько видео, пугаются падежей и
            через неделю бросают. Проблема обычно не в языке, а в отсутствии
            понятного порядка.
          </p>

          <p className="theme-text-muted">
            Flunio помогает идти маленькими шагами: сначала самые нужные слова и
            фразы, затем аудио, упражнения, словарь и грамматика тогда, когда
            она действительно помогает. Цель — не просто “пройти урок”, а
            начать понимать словацкий в магазине, на работе, у врача, в
            транспорте и в обычном разговоре.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning" className={primaryButton}>
              Начать учить словацкий
            </Link>

            <Link href="/learning/a0-1" className={secondaryButton}>
              Первый урок A0 →
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Словацкий словарь
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
            "Не с теории, а с жизни",
            "На старте важнее понимать простые слова вокруг себя: работа, еда, транспорт, документы, врач, магазин.",
          ],
          [
            "Короткие уроки вместо перегруза",
            "Лучше 10–20 минут каждый день, чем один длинный рывок раз в неделю и ощущение, что язык снова забыт.",
          ],
          [
            "Аудио с первых дней",
            "Словацкий нужно слышать. Аудио помогает привыкнуть к звукам, ударению и реальному звучанию слов.",
          ],
          [
            "Грамматика без паники",
            "Падежи и окончания легче понимать, когда вы уже знаете слова и видите их в понятных примерах.",
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
          Почему словацкий кажется сложным в начале
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            У многих новичков есть одинаковая ситуация: вроде бы словацкий
            похож на другие славянские языки, отдельные слова можно угадать, но
            в реальной жизни всё равно сложно. Кассир говорит быстро, коллега
            использует короткую фразу, врач задаёт вопрос, а в голове пусто.
          </p>

          <p>
            Это происходит потому, что пассивное узнавание слов и реальное
            понимание речи — разные вещи. Можно увидеть знакомое слово в тексте,
            но не распознать его на слух. Можно знать перевод, но не успеть
            ответить. Поэтому обучение должно соединять четыре вещи: слово,
            звук, пример и упражнение.
          </p>

          <p>
            Именно поэтому во Flunio словацкий лучше учить не как огромную
            грамматическую таблицу, а как набор маленьких ситуаций, которые
            постепенно складываются в систему.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Что учить в первые 7 дней
        </h2>

        <p className="theme-text-muted">
          В первую неделю не нужно пытаться “выучить словацкий”. Нужна другая
          цель: перестать бояться языка и собрать минимальную базу для жизни.
          Вот пример разумного старта.
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
          Что не стоит учить слишком рано
        </h2>

        <p className="theme-text-muted">
          Одна из причин, почему люди бросают язык, — неправильный старт. Они
          пытаются сразу закрыть все правила, все исключения и все темы. Но
          новичку нужна не энциклопедия, а маршрут.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {avoidAtStart.map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Словацкий для реальных ситуаций в Словакии
        </h2>

        <p className="theme-text-muted">
          Если вы живёте, работаете или планируете переезд в Словакию, вам нужен
          не абстрактный “учебный словацкий”, а язык для конкретных моментов.
          Поэтому полезно учить темы не только по грамматике, но и по ситуациям.
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
          Почему одних видео и списков слов обычно мало
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            Видео может хорошо объяснить тему, а список слов может дать быстрый
            старт. Но если после этого нет повторения, проверки и практики,
            знания быстро распадаются. Сегодня кажется, что всё понятно, а через
            несколько дней слова уже смешались.
          </p>

          <p>
            Для языка важна связка: увидеть слово, услышать его, попробовать
            вспомнить, выбрать перевод, написать, повторить позже. Поэтому в
            обучении нужен не только контент, но и маленькая система, которая
            заставляет возвращаться к словам.
          </p>

          <p>
            Flunio как раз строится вокруг этой идеи: короткий урок, аудио,
            упражнения, словарь, грамматика и повторение. Это не магия, но это
            намного спокойнее, чем каждый день начинать “с нуля” в новом
            источнике.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/practice" className={secondaryButton}>
            Перейти к практике
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Открыть словарь
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Мини-план на первый месяц
        </h2>

        <p className="theme-text-muted">
          Не нужно ждать идеального момента или покупать десять учебников. Лучше
          выбрать простой план и пройти первый месяц без перегруза.
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
          Как Flunio помогает учить словацкий маленькими шагами
        </h2>

        <div className="space-y-4 theme-text-muted">
          <p>
            В Flunio обучение построено так, чтобы не перегружать новичка.
            Уроки идут по уровням, слова подаются короткими группами, а после
            знакомства с лексикой можно сразу перейти к упражнениям.
          </p>

          <p>
            Такой формат особенно полезен, если вы учите язык после работы,
            между сменами, в дороге или вечером, когда нет сил открывать большой
            учебник. Даже короткое занятие может быть полезным, если оно
            повторяется регулярно.
          </p>

          <p>
            Словацкий не нужно “побеждать” за неделю. Его нужно приручить:
            каждый день немного слышать, читать, вспоминать и использовать.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className={primaryButton}>
            Открыть уроки
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
        <h2 className="text-2xl font-bold theme-text">
          Кому подойдёт эта страница и курс
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "Вы только приехали в Словакию",
              "И хотите понимать хотя бы базовые слова в магазине, транспорте, на работе и в учреждениях.",
            ],
            [
              "Вы работаете в словацкой среде",
              "И хотите лучше понимать коллег, инструкции, график, просьбы и обычные рабочие фразы.",
            ],
            [
              "Вы учите язык для документов",
              "И хотите постепенно привыкнуть к словам, которые встречаются в формах, письмах и официальных ситуациях.",
            ],
            [
              "Вы уже начинали, но бросили",
              "И теперь хотите вернуться к словацкому без давления, огромных таблиц и хаотичных списков.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
          ))}
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