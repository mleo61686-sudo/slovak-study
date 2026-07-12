import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "12 типових помилок українців у словацькій мові | Flunio",
  description:
    "12 типових помилок українців у словацькій мові: неправильні закінчення, дослівний переклад, відмінки, прийменники та правильні приклади.",

  alternates: {
    canonical: `${SITE_URL}/pomylky-v-slovatskii-movi`,
  },

  openGraph: {
    title: "12 типових помилок українців у словацькій мові | Flunio",
    description:
      "Розбір 12 частих помилок українців у словацькій: неправильні форми, дослівний переклад і природні правильні варіанти.",
    url: `${SITE_URL}/pomylky-v-slovatskii-movi`,
    siteName: "Flunio",
    type: "article",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Які помилки найчастіше роблять українці у словацькій?",
    a: "Найчастіше плутають схожі слова, перекладають фрази дослівно з української, неправильно використовують відмінки, дієслова та прийменники.",
  },
  {
    q: "Чому словацька здається легкою, але викликає помилки?",
    a: "Словацька схожа на українську, тому багато слів здаються знайомими. Але схожість може обманювати: значення, форма або вживання часто відрізняються.",
  },
  {
    q: "Як швидше виправити помилки у словацькій?",
    a: "Вчи слова і фрази в контексті, слухай вимову, повторюй правильні приклади і не покладайся тільки на дослівний переклад.",
  },
];

const mistakes = [
  {
    wrong: "Ja mám 25 rokov starý.",
    correct: "Mám 25 rokov.",
    ua: "Мені 25 років.",
    note: "У словацькій не треба дослівно казати «я маю 25 років старий». Достатньо: Mám 25 rokov.",
  },
  {
    wrong: "Ja som hladný na kávu.",
    correct: "Mám chuť na kávu.",
    ua: "Я хочу кави / маю бажання випити каву.",
    note: "Hladný означає голодний. Для бажання чогось краще використовувати mám chuť na...",
  },
  {
    wrong: "Ja idem do práca.",
    correct: "Idem do práce.",
    ua: "Я йду на роботу.",
    note: "Після do часто змінюється форма слова. Práca → do práce.",
  },
  {
    wrong: "Som na Slovensko.",
    correct: "Som na Slovensku.",
    ua: "Я у Словаччині.",
    note: "Коли говоримо про перебування у країні, потрібна форма na Slovensku.",
  },
  {
    wrong: "Ja robím chyba.",
    correct: "Robím chybu.",
    ua: "Я роблю помилку.",
    note: "Слово chyba змінює форму: robiť chybu.",
  },
  {
    wrong: "Mám rád Slovensko jazyk.",
    correct: "Mám rád slovenský jazyk.",
    ua: "Мені подобається словацька мова.",
    note: "Slovensko — це країна, а slovenský — словацький.",
  },
  {
    wrong: "Ja chcem učiť slovenský.",
    correct: "Chcem sa učiť slovenčinu.",
    ua: "Я хочу вчити словацьку.",
    note: "Мову як предмет краще називати slovenčina. Також потрібно sa učiť.",
  },
  {
    wrong: "Ja neviem hovoriť po slovenský.",
    correct: "Neviem hovoriť po slovensky.",
    ua: "Я не вмію говорити словацькою.",
    note: "Правильна форма: po slovensky.",
  },
  {
    wrong: "To je dobrá človek.",
    correct: "To je dobrý človek.",
    ua: "Це хороша людина.",
    note: "Človek — чоловічий рід, тому dobrý človek.",
  },
  {
    wrong: "Ja idem v obchod.",
    correct: "Idem do obchodu.",
    ua: "Я йду в магазин.",
    note: "Коли є рух кудись, часто потрібно do + правильна форма: do obchodu.",
  },
  {
    wrong: "Ja som v autobus.",
    correct: "Som v autobuse.",
    ua: "Я в автобусі.",
    note: "Коли говоримо де саме, форма змінюється: v autobuse.",
  },
  {
    wrong: "Ja mám rád káva.",
    correct: "Mám rád kávu.",
    ua: "Я люблю каву.",
    note: "Після mám rád об’єкт часто змінює форму: káva → kávu.",
  },
];

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const secondaryButton =
  "theme-secondary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const textLink = "font-semibold theme-accent-text underline-offset-4 hover:underline";

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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Вивчення словацької",
        item: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Типові помилки у словацькій",
        item: `${SITE_URL}/pomylky-v-slovatskii-movi`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-pomylky-v-slovatskii-movi"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Script
        id="breadcrumb-schema-pomylky-v-slovatskii-movi"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-7 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Slovak mistakes · grammar · beginner repair
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight theme-text sm:text-4xl">
            Типові помилки в словацькій мові
          </h1>

          <p className="theme-text-muted">
            Словацька мова здається близькою до української, але саме через цю
            схожість часто виникають помилки. Людина думає, що можна перекласти
            фразу дослівно, але словацькою це звучить неприродно або неправильно.
          </p>

          <p className="theme-text-muted">
            Нижче — часті помилки у словацькій мові, які роблять початківці:
            неправильні форми слів, дослівний переклад, плутанина між схожими
            словами та типові проблеми з прийменниками.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning/a0-1" className={primaryButton}>
              Почати з A0 →
            </Link>

            <Link href="/yak-vyvchyty-slovatsku-movu" className={secondaryButton}>
              Як вивчити словацьку
            </Link>

            <Link href="/slovatski-slova-z-perekladom" className={secondaryButton}>
              Словацькі слова
            </Link>

            <Link href="/slovak-grammar" className={secondaryButton}>
              Граматика
            </Link>
          </div>
        </div>
      </section>

      <section className={`${card} p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Чому виникають помилки у словацькій?
        </h2>

        <div className="mt-4 space-y-3 theme-text-muted">
          <p>
            Багато українців швидко впізнають словацькі слова, бо мови мають
            спільне слов’янське коріння. Але схожість не означає, що можна
            завжди перекладати буквально.
          </p>

          <p>
            Найкращий спосіб уникати помилок — вчити не тільки окремі слова, а й
            готові приклади речень. Так ти бачиш, як слово реально працює у
            фразі. Якщо ти ще тільки стартуєш, спочатку відкрий{" "}
            <Link className={textLink} href="/slovak-for-beginners">
              словацьку для початківців
            </Link>
            , а потім повернися до цієї сторінки як до чекліста помилок.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Як працювати з цією сторінкою
        </h2>

        <p className="theme-text-muted">
          Не треба просто один раз прочитати список помилок. Краще взяти одну
          помилку, подивитися правильний варіант, повторити фразу вголос і потім
          закріпити її через урок або вправу.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/slovak-for-beginners" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Почни з правильної бази →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Beginner-roadmap допоможе не починати з хаосу: перші слова,
              вимова, перші 7 і 30 днів.
            </p>
          </Link>

          <Link href="/yak-vyvchyty-slovatsku-movu" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Побудуй план навчання →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Покроковий план показує, коли вчити слова, коли граматику, а коли
              просто повторювати.
            </p>
          </Link>

          <Link href="/slovatski-slova-z-perekladom" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Перевір базову лексику →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Багато помилок виникає через слабку базу слів або дослівний
              переклад знайомих фраз.
            </p>
          </Link>

          <Link href="/practice" className={`${softCard} block p-4`}>
            <h3 className="font-semibold theme-text">
              Закріпи через вправи →
            </h3>
            <p className="mt-2 text-sm theme-text-muted">
              Помилки виправляються швидше, коли ти не тільки читаєш правило, а
              регулярно бачиш правильну форму у вправах.
            </p>
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold theme-text">
          Часті помилки: неправильно → правильно
        </h2>

        <div className="space-y-4">
          {mistakes.map((item) => (
            <div key={item.wrong} className={`${card} p-5`}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-red-400/25 bg-red-500/10 p-4">
                  <div className="text-sm font-semibold text-red-300">
                    Неправильно
                  </div>
                  <div className="mt-1 text-lg font-bold text-red-300">
                    {item.wrong}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4">
                  <div className="text-sm font-semibold text-emerald-300">
                    Правильно
                  </div>
                  <div className="mt-1 text-lg font-bold text-emerald-300">
                    {item.correct}
                  </div>
                </div>
              </div>

              <p className="mt-3 theme-text-muted">
                <strong className="theme-text">Переклад:</strong> {item.ua}
              </p>

              <p className="mt-2 theme-text-muted">
                <strong className="theme-text">Пояснення:</strong> {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          5 правил, які допоможуть уникати помилок
        </h2>

        <ol className="mt-4 list-decimal space-y-3 pl-5 theme-text-muted">
          <li>
            <strong className="theme-text">Не перекладай усе дослівно.</strong>{" "}
            Фраза, яка звучить нормально українською, може бути неприродною
            словацькою.
          </li>
          <li>
            <strong className="theme-text">Вчи слова у реченнях.</strong> Окреме
            слово — це тільки половина знання. Важливо бачити його форму у
            фразі. Для старту відкрий{" "}
            <Link className={textLink} href="/slovatski-slova-z-perekladom">
              словацькі слова з перекладом
            </Link>
            .
          </li>
          <li>
            <strong className="theme-text">Слухай вимову.</strong> Деякі слова
            легко впізнати на письмі, але важче зрозуміти на слух.
          </li>
          <li>
            <strong className="theme-text">Звертай увагу на прийменники.</strong>{" "}
            Наприклад: do práce, v autobuse, na Slovensku.
          </li>
          <li>
            <strong className="theme-text">Повторюй правильні приклади.</strong>{" "}
            Краще запам’ятати одну правильну фразу, ніж десять окремих слів без
            контексту. Закріплюй це у{" "}
            <Link className={textLink} href="/practice">
              практиці
            </Link>
            .
          </li>
        </ol>

        <div className="flex flex-wrap gap-3 pt-5">
          <Link href="/learning" className={primaryButton}>
            Практикуватися у Flunio →
          </Link>

          <Link href="/learning/a0-1" className={secondaryButton}>
            Почати перший урок →
          </Link>
        </div>
      </section>

      <section className={`${card} p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Які теми найчастіше викликають труднощі?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Відмінки",
              text: "Форми слів змінюються залежно від ролі у реченні: do práce, v autobuse, mám kávu.",
              href: "/slovak-grammar",
              link: "Дивитися граматику →",
            },
            {
              title: "Дієслова",
              text: "Не всі дієслова працюють так само, як в українській. Наприклад: učiť sa slovenčinu.",
              href: "/slovak-grammar",
              link: "Розібрати правила →",
            },
            {
              title: "Схожі слова",
              text: "Деякі слова схожі на українські, але мають інше значення або інше вживання.",
              href: "/dictionary",
              link: "Перевірити у словнику →",
            },
          ].map((item) => (
            <div key={item.title} className={`${softCard} p-4 transition`}>
              <h3 className="font-semibold theme-text">{item.title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{item.text}</p>
              <Link href={item.href} className={`mt-3 inline-flex text-sm ${textLink}`}>
                {item.link}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Коли читати цю сторінку під час навчання?
        </h2>

        <p className="mt-3 theme-text-muted">
          Найкраще повернутися до цієї сторінки після перших уроків A0. Тоді
          приклади вже не будуть виглядати абстрактно: ти побачиш знайомі слова,
          форми й ситуації. Якщо ти ще не проходив уроки, почни з{" "}
          <Link className={textLink} href="/learning/a0-1">
            A0-1
          </Link>
          .
        </p>

        <p className="mt-3 theme-text-muted">
          Якщо хочеш спочатку зрозуміти загальну систему навчання, відкрий{" "}
          <Link className={textLink} href="/vyvchennia-slovatskoi-movy-online">
            вивчення словацької онлайн
          </Link>{" "}
          або сторінку{" "}
          <Link className={textLink} href="/learn-slovak">
            Learn Slovak online
          </Link>
          .
        </p>
      </section>

      <section className={`${card} p-6`}>
        <h2 className="text-2xl font-bold theme-text">Що вчити далі?</h2>

        <p className="mt-3 theme-text-muted">
          Щоб робити менше помилок, варто поєднувати лексику, граматику і
          практику. Почни з базових слів, потім додавай короткі фрази, а
          граматику вчи через приклади.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            {
              href: "/slovak-for-beginners",
              label: "Словацька для початківців →",
            },
            {
              href: "/slovatski-slova-z-perekladom",
              label: "Словацькі слова з перекладом →",
            },
            {
              href: "/yak-vyvchyty-slovatsku-movu",
              label: "Як вивчити словацьку з нуля →",
            },
            {
              href: "/slovak-grammar",
              label: "Словацька граматика →",
            },
            {
              href: "/dictionary",
              label: "Словацький словник →",
            },
            {
              href: "/practice",
              label: "Вправи для повторення →",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${softCard} p-4 transition hover:-translate-y-0.5`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className={`${card} p-6`}>
        <h2 className="text-2xl font-bold theme-text">FAQ</h2>

        <div className="mt-4 space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className={`${softCard} p-4`}>
              <div className="font-semibold theme-text">{item.q}</div>
              <div className="mt-2 theme-text-muted">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Виправляй помилки через практику
        </h2>

        <p className="mt-3 theme-text-muted">
          Помилки зникають не від одного прочитання правила, а від повторення
          правильних прикладів. Почни з короткого уроку, потім відкрий словник і
          закріпи матеріал у вправах.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/learning/a0-1" className={primaryButton}>
            Почати A0-1 →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Відкрити словник
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Перейти до практики
          </Link>
        </div>
      </section>
    </main>
  );
}