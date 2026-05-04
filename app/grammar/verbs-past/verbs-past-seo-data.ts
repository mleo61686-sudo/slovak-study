import type { Lang } from "@/lib/src/language";

export type PastSeoSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type PastSeoContent = {
  title: string;
  intro: string[];
  sections: PastSeoSection[];
};

type CourseKey = "sk" | "cs" | "pl";

export const PAST_SEO_CONTENT: Record<Lang, Record<CourseKey, PastSeoContent>> =
  {
    ua: {
      sk: {
        title:
          "Минулий час у словацькій мові: robil som, bola som, išli sme",
        intro: [
          "У словацькій мові минулий час часто будується з двох частин: форма дієслова в минулому часі + допоміжне слово som, si, sme, ste.",
          "Найважливіше для початківця — зрозуміти, що форма минулого часу залежить від роду: чоловік каже robil som, жінка каже robila som, а група людей — robili sme.",
        ],
        sections: [
          {
            heading: "Коротко: головна логіка",
            bullets: [
              "robil som — я робив / працював, якщо говорить чоловік",
              "robila som — я робила / працювала, якщо говорить жінка",
              "robili sme — ми робили / працювали",
              "bol som — я був",
              "bola som — я була",
              "boli sme — ми були",
            ],
          },
          {
            heading: "1) Форма залежить від того, хто говорить",
            body: [
              "У словацькій мові в минулому часі важливо, хто виконував дію. Якщо говорить чоловік, форма часто закінчується на -l. Якщо говорить жінка — на -la. Якщо говоримо про групу — часто -li.",
              "Тому українське «я робив» і «я робила» у словацькій передаються різними формами.",
            ],
            bullets: [
              "Ja som robil. — Я робив. / сказав чоловік",
              "Ja som robila. — Я робила. / сказала жінка",
              "My sme robili. — Ми робили.",
            ],
          },
          {
            heading: "2) Допоміжне слово som / si / sme / ste",
            body: [
              "У 1-й і 2-й особі словацька зазвичай використовує допоміжне слово від дієслова byť: som, si, sme, ste.",
              "У живій мові займенник ja часто можна опустити, але som залишається.",
            ],
            bullets: [
              "Robil som. — Я робив.",
              "Robila som. — Я робила.",
              "Robili sme. — Ми робили.",
              "Bol si doma? — Ти був удома?",
            ],
          },
          {
            heading: "3) У 3-й особі допоміжного слова зазвичай немає",
            body: [
              "Коли говоримо «він робив», «вона була», «вони пішли», допоміжне слово som/si/sme не використовується.",
            ],
            bullets: [
              "On robil. — Він робив.",
              "Ona robila. — Вона робила.",
              "Oni robili. — Вони робили.",
              "On bol doma. — Він був удома.",
            ],
          },
          {
            heading: "4) Byť: bol som, bola som, boli sme",
            body: [
              "Дієслово byť у минулому часі дуже важливе, бо воно потрібне в багатьох базових фразах.",
            ],
            bullets: [
              "Bol som doma. — Я був удома.",
              "Bola som v práci. — Я була на роботі.",
              "Boli sme v meste. — Ми були в місті.",
            ],
          },
          {
            heading: "5) Ísť: išiel som, išla som, išli sme",
            body: [
              "Дієслово ísť має нерегулярні форми минулого часу. Їх краще вивчити як готові фрази.",
            ],
            bullets: [
              "Išiel som do práce. — Я йшов на роботу. / чоловік",
              "Išla som domov. — Я йшла додому. / жінка",
              "Išli sme do mesta. — Ми йшли у місто.",
            ],
          },
          {
            heading: "6) Заперечення в минулому часі",
            body: [
              "Заперечення у словацькій зазвичай утворюється через префікс ne- перед дієсловом.",
            ],
            bullets: [
              "Nerobil som. — Я не робив.",
              "Nebola som doma. — Я не була вдома.",
              "Nešli sme do práce. — Ми не йшли на роботу.",
            ],
          },
          {
            heading: "Типові помилки",
            bullets: [
              "Не забувай som у 1-й особі: правильно robil som, а не просто ja robil.",
              "Не плутай чоловічу й жіночу форму: robil som ≠ robila som.",
              "Не став som у 3-й особі: on robil, а не on som robil.",
              "Не перекладай «у мене було» буквально через ja som bol. Для mať буде mal som / mala som.",
            ],
          },
        ],
      },

      cs: {
        title:
          "Минулий час у чеській мові: dělal jsem, byla jsem, šli jsme",
        intro: [
          "У чеській мові минулий час дуже схожий на словацький: часто використовується форма дієслова + допоміжне слово jsem, jsi, jsme, jste.",
          "Форма минулого часу залежить від роду: чоловік каже dělal jsem, жінка — dělala jsem, а група — dělali jsme.",
        ],
        sections: [
          {
            heading: "Коротко: головна логіка",
            bullets: [
              "dělal jsem — я робив / працював, якщо говорить чоловік",
              "dělala jsem — я робила / працювала, якщо говорить жінка",
              "dělali jsme — ми робили / працювали",
              "byl jsem — я був",
              "byla jsem — я була",
              "byli jsme — ми були",
            ],
          },
          {
            heading: "1) Чоловіча, жіноча форма і множина",
            body: [
              "У чеському минулому часі форма дієслова змінюється залежно від роду та числа. Це дуже важливо саме для форми «я».",
            ],
            bullets: [
              "Já jsem dělal. — Я робив. / сказав чоловік",
              "Já jsem dělala. — Я робила. / сказала жінка",
              "My jsme dělali. — Ми робили.",
            ],
          },
          {
            heading: "2) Допоміжне слово jsem / jsi / jsme / jste",
            body: [
              "У 1-й і 2-й особі чеська часто використовує допоміжне слово від být: jsem, jsi, jsme, jste.",
            ],
            bullets: [
              "Dělal jsem. — Я робив.",
              "Dělala jsem. — Я робила.",
              "Dělali jsme. — Ми робили.",
              "Byl jsi doma? — Ти був удома?",
            ],
          },
          {
            heading: "3) У 3-й особі допоміжного слова зазвичай немає",
            bullets: [
              "On dělal. — Він робив.",
              "Ona dělala. — Вона робила.",
              "Oni dělali. — Вони робили.",
              "On byl doma. — Він був удома.",
            ],
          },
          {
            heading: "4) Být: byl jsem, byla jsem, byli jsme",
            bullets: [
              "Byl jsem doma. — Я був удома.",
              "Byla jsem v práci. — Я була на роботі.",
              "Byli jsme ve městě. — Ми були в місті.",
            ],
          },
          {
            heading: "5) Jít: šel jsem, šla jsem, šli jsme",
            body: [
              "Дієслово jít має нерегулярні форми минулого часу: šel, šla, šli.",
            ],
            bullets: [
              "Šel jsem do práce. — Я йшов на роботу. / чоловік",
              "Šla jsem domů. — Я йшла додому. / жінка",
              "Šli jsme do města. — Ми йшли в місто.",
            ],
          },
          {
            heading: "6) Заперечення",
            bullets: [
              "Nedělal jsem. — Я не робив.",
              "Nebyla jsem doma. — Я не була вдома.",
              "Nešli jsme do práce. — Ми не йшли на роботу.",
            ],
          },
          {
            heading: "Типові помилки",
            bullets: [
              "Не забувай jsem у 1-й особі: dělal jsem.",
              "Не плутай dělal jsem і dělala jsem.",
              "Не став jsem у 3-й особі: on dělal, а не on jsem dělal.",
              "Для «я мав» краще вчити готово: měl jsem / měla jsem.",
            ],
          },
        ],
      },

      pl: {
        title:
          "Минулий час у польській мові: zrobiłem, zrobiłam, byliśmy",
        intro: [
          "У польській мові минулий час відрізняється від словацької та чеської тим, що тут немає окремого допоміжного слова som або jsem.",
          "Особа й рід часто вже заховані в закінченні: zrobiłem означає «я зробив», zrobiłam — «я зробила», zrobiliśmy — «ми зробили».",
        ],
        sections: [
          {
            heading: "Коротко: головна логіка",
            bullets: [
              "zrobiłem — я зробив, якщо говорить чоловік",
              "zrobiłam — я зробила, якщо говорить жінка",
              "zrobiliśmy — ми зробили",
              "byłem — я був",
              "byłam — я була",
              "byliśmy — ми були",
            ],
          },
          {
            heading: "1) У польській немає окремого som / jsem",
            body: [
              "У словацькій і чеській ми бачимо допоміжне слово: robil som, dělal jsem. У польській цього немає, бо інформація про особу вже в закінченні.",
              "Тому не треба казати ja jestem zrobiłem. Правильно просто zrobiłem або ja zrobiłem.",
            ],
            bullets: [
              "Zrobiłem zadanie. — Я зробив завдання.",
              "Zrobiłam zadanie. — Я зробила завдання.",
              "Zrobiliśmy zadanie. — Ми зробили завдання.",
            ],
          },
          {
            heading: "2) Чоловіча і жіноча форма для «я»",
            body: [
              "Якщо говорить чоловік, часто буде закінчення -łem. Якщо говорить жінка — -łam.",
            ],
            bullets: [
              "Byłem w domu. — Я був удома. / чоловік",
              "Byłam w pracy. — Я була на роботі. / жінка",
              "Miałem czas. — Я мав час. / чоловік",
              "Miałam pytanie. — У мене було питання. / жінка",
            ],
          },
          {
            heading: "3) Множина: -liśmy і -łyśmy",
            body: [
              "У польській множина теж може залежати від складу групи. Форма -liśmy використовується для групи з чоловіками або змішаної групи. Форма -łyśmy — для жіночої групи.",
            ],
            bullets: [
              "Zrobiliśmy zadanie. — Ми зробили завдання. / група з чоловіком або змішана група",
              "Zrobiłyśmy zadanie. — Ми зробили завдання. / тільки жінки",
              "Byliśmy w mieście. — Ми були в місті. / група з чоловіком або змішана група",
              "Byłyśmy w mieście. — Ми були в місті. / тільки жінки",
            ],
          },
          {
            heading: "4) Iść: szedłem, szłam, szliśmy",
            body: [
              "Дієслово iść має нерегулярні форми минулого часу. Їх краще вивчити окремо.",
            ],
            bullets: [
              "Szedłem do pracy. — Я йшов на роботу. / чоловік",
              "Szłam do domu. — Я йшла додому. / жінка",
              "Szliśmy do miasta. — Ми йшли в місто.",
            ],
          },
          {
            heading: "5) Заперечення",
            body: [
              "У польській заперечення ставиться окремо через nie перед дієсловом.",
            ],
            bullets: [
              "Nie zrobiłem tego. — Я цього не зробив.",
              "Nie byłam w domu. — Я не була вдома.",
              "Nie szliśmy do pracy. — Ми не йшли на роботу.",
            ],
          },
          {
            heading: "Типові помилки",
            bullets: [
              "Не кажи ja jestem zrobiłem. Правильно: zrobiłem або ja zrobiłem.",
              "Не плутай zrobiłem і zrobiłam: перше каже чоловік, друге — жінка.",
              "Не забувай, що zrobiliśmy і zrobiłyśmy можуть відрізнятися залежно від групи.",
              "Не перекладай «у мене було» дослівно. Часто буде miałem / miałam.",
            ],
          },
        ],
      },
    },

    ru: {
      sk: {
        title:
          "Прошедшее время в словацком языке: robil som, bola som, išli sme",
        intro: [
          "В словацком языке прошедшее время часто состоит из формы глагола + вспомогательного слова som, si, sme, ste.",
          "Важно понимать, что форма зависит от рода: мужчина говорит robil som, женщина — robila som, группа людей — robili sme.",
        ],
        sections: [
          {
            heading: "Кратко: главная логика",
            bullets: [
              "robil som — я делал / работал, если говорит мужчина",
              "robila som — я делала / работала, если говорит женщина",
              "robili sme — мы делали / работали",
              "bol som — я был",
              "bola som — я была",
              "boli sme — мы были",
            ],
          },
          {
            heading: "1) Форма зависит от говорящего",
            bullets: [
              "Ja som robil. — Я делал. / сказал мужчина",
              "Ja som robila. — Я делала. / сказала женщина",
              "My sme robili. — Мы делали.",
            ],
          },
          {
            heading: "2) Вспомогательное слово som / si / sme / ste",
            bullets: [
              "Robil som. — Я делал.",
              "Robila som. — Я делала.",
              "Robili sme. — Мы делали.",
              "Bol si doma? — Ты был дома?",
            ],
          },
          {
            heading: "3) В 3-м лице вспомогательного слова обычно нет",
            bullets: [
              "On robil. — Он делал.",
              "Ona robila. — Она делала.",
              "Oni robili. — Они делали.",
            ],
          },
          {
            heading: "Типичные ошибки",
            bullets: [
              "Не забывай som в 1-м лице: robil som.",
              "Не путай мужскую и женскую форму: robil som / robila som.",
              "Не ставь som в 3-м лице: on robil, а не on som robil.",
            ],
          },
        ],
      },

      cs: {
        title:
          "Прошедшее время в чешском языке: dělal jsem, byla jsem, šli jsme",
        intro: [
          "В чешском прошедшее время часто строится через форму глагола + вспомогательное слово jsem, jsi, jsme, jste.",
          "Форма зависит от рода: мужчина говорит dělal jsem, женщина — dělala jsem.",
        ],
        sections: [
          {
            heading: "Кратко: главная логика",
            bullets: [
              "dělal jsem — я делал / работал, если говорит мужчина",
              "dělala jsem — я делала / работала, если говорит женщина",
              "dělali jsme — мы делали / работали",
              "byl jsem — я был",
              "byla jsem — я была",
            ],
          },
          {
            heading: "Примеры",
            bullets: [
              "Dělal jsem. — Я делал.",
              "Dělala jsem. — Я делала.",
              "Byl jsem doma. — Я был дома.",
              "Šla jsem domů. — Я шла домой.",
            ],
          },
          {
            heading: "Типичные ошибки",
            bullets: [
              "Не забывай jsem в 1-м лице: dělal jsem.",
              "Не путай dělal jsem и dělala jsem.",
              "В 3-м лице: on dělal, без jsem.",
            ],
          },
        ],
      },

      pl: {
        title:
          "Прошедшее время в польском языке: zrobiłem, zrobiłam, byliśmy",
        intro: [
          "В польском прошедшем времени нет отдельного som / jsem. Лицо и род часто уже встроены в окончание.",
          "Zrobiłem значит «я сделал», zrobiłam — «я сделала», zrobiliśmy — «мы сделали».",
        ],
        sections: [
          {
            heading: "Кратко: главная логика",
            bullets: [
              "zrobiłem — я сделал, если говорит мужчина",
              "zrobiłam — я сделала, если говорит женщина",
              "zrobiliśmy — мы сделали",
              "byłem — я был",
              "byłam — я была",
            ],
          },
          {
            heading: "Примеры",
            bullets: [
              "Zrobiłem zadanie. — Я сделал задание.",
              "Zrobiłam zadanie. — Я сделала задание.",
              "Byłem w domu. — Я был дома.",
              "Byłam w pracy. — Я была на работе.",
            ],
          },
          {
            heading: "Типичные ошибки",
            bullets: [
              "Не говори ja jestem zrobiłem. Правильно: zrobiłem.",
              "Не путай zrobiłem и zrobiłam.",
              "Zrobiliśmy и zrobiłyśmy могут отличаться по составу группы.",
            ],
          },
        ],
      },
    },

    en: {
      sk: {
        title: "Past tense in Slovak: robil som, bola som, išli sme",
        intro: [
          "Slovak past tense often uses a past form of the verb plus an auxiliary word such as som, si, sme, ste.",
          "The form depends on gender: a male speaker says robil som, a female speaker says robila som.",
        ],
        sections: [
          {
            heading: "Quick logic",
            bullets: [
              "robil som — I did / worked, said by a male speaker",
              "robila som — I did / worked, said by a female speaker",
              "robili sme — we did / worked",
              "bol som — I was",
              "bola som — I was, said by a female speaker",
            ],
          },
          {
            heading: "Examples",
            bullets: [
              "Robil som. — I was doing / working.",
              "Robila som. — I was doing / working.",
              "Bol som doma. — I was at home.",
              "Išla som domov. — I went home.",
            ],
          },
        ],
      },

      cs: {
        title: "Past tense in Czech: dělal jsem, byla jsem, šli jsme",
        intro: [
          "Czech past tense often uses a past form of the verb plus an auxiliary word such as jsem, jsi, jsme, jste.",
          "Gender matters: a male speaker says dělal jsem, a female speaker says dělala jsem.",
        ],
        sections: [
          {
            heading: "Quick logic",
            bullets: [
              "dělal jsem — I did / worked, said by a male speaker",
              "dělala jsem — I did / worked, said by a female speaker",
              "dělali jsme — we did / worked",
              "byl jsem — I was",
              "byla jsem — I was, said by a female speaker",
            ],
          },
          {
            heading: "Examples",
            bullets: [
              "Dělal jsem. — I was doing / working.",
              "Dělala jsem. — I was doing / working.",
              "Byl jsem doma. — I was at home.",
              "Šla jsem domů. — I went home.",
            ],
          },
        ],
      },

      pl: {
        title: "Past tense in Polish: zrobiłem, zrobiłam, byliśmy",
        intro: [
          "Polish past tense does not use a separate som / jsem. Person and gender are usually built into the ending.",
          "Zrobiłem means “I did” said by a man. Zrobiłam means “I did” said by a woman.",
        ],
        sections: [
          {
            heading: "Quick logic",
            bullets: [
              "zrobiłem — I did, said by a male speaker",
              "zrobiłam — I did, said by a female speaker",
              "zrobiliśmy — we did",
              "byłem — I was, said by a male speaker",
              "byłam — I was, said by a female speaker",
            ],
          },
          {
            heading: "Examples",
            bullets: [
              "Zrobiłem zadanie. — I did the task.",
              "Zrobiłam zadanie. — I did the task.",
              "Byłem w domu. — I was at home.",
              "Byłam w pracy. — I was at work.",
            ],
          },
        ],
      },
    },
  };