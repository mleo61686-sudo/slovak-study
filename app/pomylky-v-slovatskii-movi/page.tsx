import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Типові помилки в словацькій мові | Flunio",
  description:
    "Типові помилки в словацькій мові для українців: неправильні слова, схожі форми, переклад дослівно, вимова, дієслова та приклади правильного вживання.",

  alternates: {
    canonical: `${SITE_URL}/pomylky-v-slovatskii-movi`,
  },

  openGraph: {
    title: "Типові помилки в словацькій мові | Flunio",
    description:
      "Розбір частих помилок у словацькій: як не перекладати дослівно, які слова не плутати і як говорити природніше.",
    url: `${SITE_URL}/pomylky-v-slovatskii-movi`,
    siteName: "Flunio",
    type: "website",
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
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 text-white">
      <Script
        id="faq-schema-pomylky-v-slovatskii-movi"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-7 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur">
            Flunio Grammar
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Типові помилки в словацькій мові
          </h1>

          <p className="text-white/70">
            Словацька мова здається близькою до української, але саме через цю
            схожість часто виникають помилки. Людина думає, що можна перекласти
            фразу дослівно, але словацькою це звучить неприродно або неправильно.
          </p>

          <p className="text-white/70">
            Нижче — часті помилки у словацькій мові, які роблять початківці:
            неправильні форми слів, дослівний переклад, плутанина між схожими
            словами та типові проблеми з прийменниками.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/learning/a0-1"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
            >
              Почати з A0 →
            </Link>

            <Link
              href="/yak-vyvchyty-slovatsku-movu"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-400/40 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Як вивчити словацьку
            </Link>

            <Link
              href="/slovatski-slova-z-perekladom"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-400/40 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Словацькі слова
            </Link>

            <Link
              href="/slovak-grammar"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-400/40 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Граматика
            </Link>
          </div>
        </div>
      </section>

      <section className="flunio-card rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-white">
          Чому виникають помилки у словацькій?
        </h2>

        <div className="mt-4 space-y-3 text-white/70">
          <p>
            Багато українців швидко впізнають словацькі слова, бо мови мають
            спільне слов’янське коріння. Але схожість не означає, що можна
            завжди перекладати буквально.
          </p>

          <p>
            Найкращий спосіб уникати помилок — вчити не тільки окремі слова, а й
            готові приклади речень. Так ти бачиш, як слово реально працює у
            фразі.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Часті помилки: неправильно → правильно
        </h2>

        <div className="space-y-4">
          {mistakes.map((item) => (
            <div
              key={item.wrong}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_20px_rgba(34,211,238,0.08)] backdrop-blur"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-red-400/25 bg-red-500/10 p-4">
                  <div className="text-sm font-semibold text-red-300">
                    Неправильно
                  </div>
                  <div className="mt-1 text-lg font-bold text-red-100">
                    {item.wrong}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4">
                  <div className="text-sm font-semibold text-emerald-300">
                    Правильно
                  </div>
                  <div className="mt-1 text-lg font-bold text-emerald-100">
                    {item.correct}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-white/70">
                <strong className="text-white">Переклад:</strong> {item.ua}
              </p>

              <p className="mt-2 text-white/70">
                <strong className="text-white">Пояснення:</strong> {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flunio-card rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-white">
          5 правил, які допоможуть уникати помилок
        </h2>

        <ol className="mt-4 list-decimal space-y-3 pl-5 text-white/70">
          <li>
            <strong className="text-white">Не перекладай усе дослівно.</strong>{" "}
            Фраза, яка звучить нормально українською, може бути неприродною
            словацькою.
          </li>
          <li>
            <strong className="text-white">Вчи слова у реченнях.</strong> Окреме
            слово — це тільки половина знання. Важливо бачити його форму у
            фразі.
          </li>
          <li>
            <strong className="text-white">Слухай вимову.</strong> Деякі слова
            легко впізнати на письмі, але важче зрозуміти на слух.
          </li>
          <li>
            <strong className="text-white">Звертай увагу на прийменники.</strong>{" "}
            Наприклад: do práce, v autobuse, na Slovensku.
          </li>
          <li>
            <strong className="text-white">Повторюй правильні приклади.</strong>{" "}
            Краще запам’ятати одну правильну фразу, ніж десять окремих слів без
            контексту.
          </li>
        </ol>

        <div className="pt-5">
          <Link
            href="/learning"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Практикуватися у Flunio →
          </Link>
        </div>
      </section>

      <section className="flunio-card rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-white">
          Які теми найчастіше викликають труднощі?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Відмінки",
              text: "Форми слів змінюються залежно від ролі у реченні: do práce, v autobuse, mám kávu.",
            },
            {
              title: "Дієслова",
              text: "Не всі дієслова працюють так само, як в українській. Наприклад: učiť sa slovenčinu.",
            },
            {
              title: "Схожі слова",
              text: "Деякі слова схожі на українські, але мають інше значення або інше вживання.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/35 hover:bg-white/10"
            >
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/65">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flunio-card rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-white">Що вчити далі?</h2>

        <p className="mt-3 text-white/70">
          Щоб робити менше помилок, варто поєднувати лексику, граматику і
          практику. Почни з базових слів, потім додавай короткі фрази, а
          граматику вчи через приклади.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
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
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="flunio-card rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-white">FAQ</h2>

        <div className="mt-4 space-y-4">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="font-semibold text-white">{item.q}</div>
              <div className="mt-2 text-white/65">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}