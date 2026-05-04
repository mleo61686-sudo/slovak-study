import type { Lang } from "@/lib/src/language";

export type FutureSeoSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type FutureSeoContent = {
  title: string;
  intro: string[];
  sections: FutureSeoSection[];
};

type CourseKey = "sk" | "cs" | "pl";

export const FUTURE_SEO_CONTENT: Record<Lang, Record<CourseKey, FutureSeoContent>> = {
  ua: {
    sk: {
      title: "Майбутній час у словацькій мові: як сказати «буду робити» і «зроблю»",
      intro: [
        "У словацькій мові майбутній час тісно пов’язаний з видом дієслова. Це означає, що важливо розуміти різницю між процесом і завершеним результатом.",
        "Якщо дія триватиме або повторюватиметься, часто використовується форма budem + інфінітив. Якщо дія має бути завершена, часто використовується доконане дієслово у формі теперішнього часу, але зі значенням майбутнього.",
      ],
      sections: [
        {
          heading: "Коротко: головна логіка",
          bullets: [
            "budem robiť — я буду робити / працювати, тобто важливий процес",
            "urobím — я зроблю, тобто важливий результат",
            "budem čítať — я буду читати",
            "prečítam — я прочитаю",
            "budem písať — я буду писати",
            "napíšem — я напишу",
          ],
        },
        {
          heading: "1) Недоконаний вид: budem + інфінітив",
          body: [
            "Недоконані дієслова описують процес: робити, працювати, читати, писати, чекати, вчитися. У майбутньому часі вони часто будуються через допоміжне дієслово byť у майбутній формі + інфінітив.",
            "Тобто схема проста: ja budem robiť, ty budeš robiť, on bude robiť, my budeme robiť.",
          ],
          bullets: [
            "Budem pracovať zajtra. — Я буду працювати завтра.",
            "Budeš čakať doma? — Ти будеш чекати вдома?",
            "Budeme sa učiť večer. — Ми будемо вчитися ввечері.",
          ],
        },
        {
          heading: "2) Доконаний вид: форма теперішнього часу = майбутнє",
          body: [
            "Доконані дієслова показують завершену дію або результат. У словацькій вони часто мають форму, схожу на теперішній час, але значення буде майбутнє.",
            "Саме тому urobím — це не «я роблю», а «я зроблю».",
          ],
          bullets: [
            "Urobím to zajtra. — Я зроблю це завтра.",
            "Napíšem správu. — Я напишу повідомлення.",
            "Kúpim chlieb. — Я куплю хліб.",
          ],
        },
        {
          heading: "3) Дієслово byť: окрема майбутня форма",
          body: [
            "Дієслово byť не будується як budem byť. Воно має власні форми майбутнього часу.",
          ],
          bullets: [
            "ja budem — я буду",
            "ty budeš — ти будеш",
            "on / ona bude — він / вона буде",
            "my budeme — ми будемо",
            "Budem doma. — Я буду вдома.",
          ],
        },
        {
          heading: "4) Дієслово ísť: pôjdem, pôjdeš, pôjde",
          body: [
            "Для дієслова ísť у майбутньому часі найчастіше використовується форма pôjdem, pôjdeš, pôjde. Її краще запам’ятати окремо.",
          ],
          bullets: [
            "Pôjdem do práce. — Я піду на роботу.",
            "Pôjdeš domov? — Ти підеш додому?",
            "Pôjdeme do mesta. — Ми підемо в місто.",
          ],
        },
        {
          heading: "Типові помилки",
          bullets: [
            "Не кажи budem urobiť для значення «я зроблю». Правильно: urobím.",
            "Не перекладай усе через budem. У словацькій доконані дієслова часто самі дають майбутнє значення.",
            "Не плутай robiť і urobiť: robiť = процес, urobiť = завершити / зробити.",
            "Не кажи budem ísť як основний варіант для «я піду». У більшості звичайних ситуацій краще pôjdem.",
          ],
        },
      ],
    },

    cs: {
      title: "Майбутній час у чеській мові: budu dělat, udělám, půjdu",
      intro: [
        "У чеській мові майбутній час дуже схожий за логікою на словацький: недоконані дієслова часто мають конструкцію budu + інфінітив, а доконані дієслова використовують форму теперішнього часу з майбутнім значенням.",
        "Головне для початківця — не намагатися перекладати кожне «буду» буквально. Іноді чеською буде budu dělat, а іноді просто udělám.",
      ],
      sections: [
        {
          heading: "Коротко: головна логіка",
          bullets: [
            "budu dělat — я буду робити / працювати",
            "udělám — я зроблю",
            "budu číst — я буду читати",
            "přečtu — я прочитаю",
            "budu psát — я буду писати",
            "napíšu — я напишу",
          ],
        },
        {
          heading: "1) Недоконаний вид: budu + інфінітив",
          body: [
            "Якщо дія описує процес, тривалість або повторення, чеська часто використовує форму budu + інфінітив.",
            "Схема: já budu dělat, ty budeš dělat, on bude dělat, my budeme dělat.",
          ],
          bullets: [
            "Budu pracovat zítra. — Я буду працювати завтра.",
            "Budeš čekat doma? — Ти будеш чекати вдома?",
            "Budeme se učit večer. — Ми будемо вчитися ввечері.",
          ],
        },
        {
          heading: "2) Доконаний вид: теперішня форма з майбутнім значенням",
          body: [
            "Доконане дієслово показує результат або завершення. У чеській така форма часто виглядає як теперішній час, але означає майбутнє.",
          ],
          bullets: [
            "Udělám to zítra. — Я зроблю це завтра.",
            "Napíšu zprávu. — Я напишу повідомлення.",
            "Koupím chleba. — Я куплю хліб.",
          ],
        },
        {
          heading: "3) Být: окрема майбутня форма",
          bullets: [
            "já budu — я буду",
            "ty budeš — ти будеш",
            "on / ona bude — він / вона буде",
            "my budeme — ми будемо",
            "Budu doma. — Я буду вдома.",
          ],
        },
        {
          heading: "4) Jít: půjdu, půjdeš, půjde",
          body: [
            "Дієслово jít у майбутньому часі має спеціальні форми. Їх краще вивчити окремо.",
          ],
          bullets: [
            "Půjdu do práce. — Я піду на роботу.",
            "Půjdeš domů? — Ти підеш додому?",
            "Půjdeme do města. — Ми підемо в місто.",
          ],
        },
        {
          heading: "Типові помилки",
          bullets: [
            "Не кажи budu udělat для «я зроблю». Правильно: udělám.",
            "Не плутай dělat і udělat: dělat = процес, udělat = зробити до кінця.",
            "Для «я піду» в більшості ситуацій використовуй půjdu, а не буду jít.",
          ],
        },
      ],
    },

    pl: {
      title: "Майбутній час у польській мові: będę pracować, zrobię, pójdę",
      intro: [
        "У польській мові майбутній час теж залежить від виду дієслова. Недоконані дієслова описують процес, а доконані — завершений результат.",
        "Для недоконаних дієслів польська має конструкцію będę + інфінітив або форму з -ł/-ła. Для початківця достатньо спочатку добре зрозуміти варіант będę + інфінітив.",
      ],
      sections: [
        {
          heading: "Коротко: головна логіка",
          bullets: [
            "będę pracować — я буду працювати",
            "zrobię — я зроблю",
            "będę czytać — я буду читати",
            "przeczytam — я прочитаю",
            "będę pisać — я буду писати",
            "napiszę — я напишу",
          ],
        },
        {
          heading: "1) Недоконаний вид: będę + інфінітив",
          body: [
            "Якщо дія буде тривати або повторюватися, польська часто використовує форму będę + інфінітив.",
            "Схема: ja będę pracować, ty będziesz pracować, on będzie pracować, my będziemy pracować.",
          ],
          bullets: [
            "Będę pracować jutro. — Я буду працювати завтра.",
            "Będziesz czekać w domu? — Ти будеш чекати вдома?",
            "Będziemy się uczyć wieczorem. — Ми будемо вчитися ввечері.",
          ],
        },
        {
          heading: "2) Другий варіант: będę robił / będę robiła",
          body: [
            "У польській є ще один варіант майбутнього часу для недоконаних дієслів: będę + форма на -ł/-ła. Він теж дуже вживаний.",
            "Для чоловіка: będę robił. Для жінки: będę robiła. На старті можна користуватися простішою формою będę robić / będę pracować, але цю конструкцію теж треба впізнавати.",
          ],
          bullets: [
            "Będę robić. — Я буду робити.",
            "Będę robił. — Я буду робити. / сказав чоловік",
            "Będę robiła. — Я буду робити. / сказала жінка",
          ],
        },
        {
          heading: "3) Доконаний вид: теперішня форма з майбутнім значенням",
          body: [
            "Доконані дієслова в польській часто мають форму, схожу на теперішній час, але значення майбутнє.",
          ],
          bullets: [
            "Zrobię to jutro. — Я зроблю це завтра.",
            "Napiszę wiadomość. — Я напишу повідомлення.",
            "Kupię chleb. — Я куплю хліб.",
          ],
        },
        {
          heading: "4) Być: będę, będziesz, będzie",
          bullets: [
            "ja będę — я буду",
            "ty będziesz — ти будеш",
            "on / ona będzie — він / вона буде",
            "my będziemy — ми будемо",
            "Będę w domu. — Я буду вдома.",
          ],
        },
        {
          heading: "5) Iść: pójdę, pójdziesz, pójdzie",
          bullets: [
            "Pójdę do pracy. — Я піду на роботу.",
            "Pójdziesz do domu? — Ти підеш додому?",
            "Pójdziemy do miasta. — Ми підемо в місто.",
          ],
        },
        {
          heading: "Типові помилки",
          bullets: [
            "Не кажи będę zrobić для «я зроблю». Правильно: zrobię.",
            "Не плутай robić/pracować і zrobić: перше — процес, друге — завершений результат.",
            "У польській форма będę robić і będę robił/robiła можуть передавати майбутній процес.",
            "Для «я піду» використовуй pójdę.",
          ],
        },
      ],
    },
  },

  ru: {
    sk: {
      title: "Будущее время в словацком языке: budem robiť и urobím",
      intro: [
        "В словацком языке будущее время связано с видом глагола. Важно понимать разницу между процессом и завершённым результатом.",
        "Если действие будет длиться, часто используется budem + инфинитив. Если действие будет завершено, часто используется совершенный глагол в форме настоящего времени, но со значением будущего.",
      ],
      sections: [
        {
          heading: "Кратко: главная логика",
          bullets: [
            "budem robiť — я буду делать / работать, важен процесс",
            "urobím — я сделаю, важен результат",
            "budem čítať — я буду читать",
            "prečítam — я прочитаю",
            "budem písať — я буду писать",
            "napíšem — я напишу",
          ],
        },
        {
          heading: "1) Несовершенный вид: budem + инфинитив",
          body: [
            "Несовершенные глаголы описывают процесс: делать, работать, читать, писать, ждать, учиться.",
            "Схема: ja budem robiť, ty budeš robiť, on bude robiť, my budeme robiť.",
          ],
          bullets: [
            "Budem pracovať zajtra. — Я буду работать завтра.",
            "Budeš čakať doma? — Ты будешь ждать дома?",
            "Budeme sa učiť večer. — Мы будем учиться вечером.",
          ],
        },
        {
          heading: "2) Совершенный вид: форма настоящего времени = будущее",
          body: [
            "Совершенный глагол показывает результат или завершение. Поэтому urobím означает не «я делаю», а «я сделаю».",
          ],
          bullets: [
            "Urobím to zajtra. — Я сделаю это завтра.",
            "Napíšem správu. — Я напишу сообщение.",
            "Kúpim chlieb. — Я куплю хлеб.",
          ],
        },
        {
          heading: "Byť и ísť",
          bullets: [
            "budem, budeš, bude, budeme — формы будущего времени глагола byť",
            "pôjdem, pôjdeš, pôjde, pôjdeme — формы будущего времени глагола ísť",
            "Budem doma. — Я буду дома.",
            "Pôjdem do práce. — Я пойду на работу.",
          ],
        },
        {
          heading: "Типичные ошибки",
          bullets: [
            "Не говори budem urobiť для «я сделаю». Правильно: urobím.",
            "Не переводи каждое «буду» через budem.",
            "robiť = процесс, urobiť = завершить / сделать.",
          ],
        },
      ],
    },

    cs: {
      title: "Будущее время в чешском языке: budu dělat, udělám, půjdu",
      intro: [
        "В чешском языке будущее время работает похоже на словацкий: несовершенные глаголы часто используют budu + инфинитив, а совершенные глаголы дают будущее значение формой настоящего времени.",
      ],
      sections: [
        {
          heading: "Кратко: главная логика",
          bullets: [
            "budu dělat — я буду делать / работать",
            "udělám — я сделаю",
            "budu číst — я буду читать",
            "přečtu — я прочитаю",
            "budu psát — я буду писать",
            "napíšu — я напишу",
          ],
        },
        {
          heading: "Несовершенный вид: budu + инфинитив",
          bullets: [
            "Budu pracovat zítra. — Я буду работать завтра.",
            "Budeš čekat doma? — Ты будешь ждать дома?",
            "Budeme se učit večer. — Мы будем учиться вечером.",
          ],
        },
        {
          heading: "Совершенный вид: форма настоящего времени = будущее",
          bullets: [
            "Udělám to zítra. — Я сделаю это завтра.",
            "Napíšu zprávu. — Я напишу сообщение.",
            "Koupím chleba. — Я куплю хлеб.",
          ],
        },
        {
          heading: "Být и jít",
          bullets: [
            "budu, budeš, bude, budeme — формы будущего времени глагола být",
            "půjdu, půjdeš, půjde, půjdeme — формы будущего времени глагола jít",
          ],
        },
        {
          heading: "Типичные ошибки",
          bullets: [
            "Не говори budu udělat для «я сделаю». Правильно: udělám.",
            "dělat = процесс, udělat = сделать до конца.",
            "Для «я пойду» обычно используется půjdu.",
          ],
        },
      ],
    },

    pl: {
      title: "Будущее время в польском языке: będę pracować, zrobię, pójdę",
      intro: [
        "В польском языке будущее время зависит от вида глагола. Несовершенные глаголы описывают процесс, а совершенные — завершённый результат.",
        "Для несовершенных глаголов есть форма będę + инфинитив, а также форма с -ł/-ła.",
      ],
      sections: [
        {
          heading: "Кратко: главная логика",
          bullets: [
            "będę pracować — я буду работать",
            "zrobię — я сделаю",
            "będę czytać — я буду читать",
            "przeczytam — я прочитаю",
            "będę pisać — я буду писать",
            "napiszę — я напишу",
          ],
        },
        {
          heading: "Несовершенный вид: będę + инфинитив",
          bullets: [
            "Będę pracować jutro. — Я буду работать завтра.",
            "Będziesz czekać w domu? — Ты будешь ждать дома?",
            "Będziemy się uczyć wieczorem. — Мы будем учиться вечером.",
          ],
        },
        {
          heading: "Вариант с -ł/-ła",
          bullets: [
            "Będę robić. — Я буду делать.",
            "Będę robił. — Я буду делать. / сказал мужчина",
            "Będę robiła. — Я буду делать. / сказала женщина",
          ],
        },
        {
          heading: "Совершенный вид: форма настоящего времени = будущее",
          bullets: [
            "Zrobię to jutro. — Я сделаю это завтра.",
            "Napiszę wiadomość. — Я напишу сообщение.",
            "Kupię chleb. — Я куплю хлеб.",
          ],
        },
        {
          heading: "Być и iść",
          bullets: [
            "będę, będziesz, będzie, będziemy — формы будущего времени глагола być",
            "pójdę, pójdziesz, pójdzie, pójdziemy — формы будущего времени глагола iść",
          ],
        },
      ],
    },
  },

  en: {
    sk: {
      title: "Future tense in Slovak: budem robiť and urobím",
      intro: [
        "In Slovak, the future tense is closely connected with verb aspect. The key difference is process versus completed result.",
        "Imperfective verbs often use budem + infinitive. Perfective verbs often use a present-tense-looking form with future meaning.",
      ],
      sections: [
        {
          heading: "Quick logic",
          bullets: [
            "budem robiť — I will be doing / working",
            "urobím — I will do / finish",
            "budem čítať — I will be reading",
            "prečítam — I will read / finish reading",
            "budem písať — I will be writing",
            "napíšem — I will write",
          ],
        },
        {
          heading: "Imperfective verbs: budem + infinitive",
          bullets: [
            "Budem pracovať zajtra. — I will work tomorrow.",
            "Budeš čakať doma? — Will you wait at home?",
            "Budeme sa učiť večer. — We will study in the evening.",
          ],
        },
        {
          heading: "Perfective verbs: present form with future meaning",
          bullets: [
            "Urobím to zajtra. — I will do it tomorrow.",
            "Napíšem správu. — I will write a message.",
            "Kúpim chlieb. — I will buy bread.",
          ],
        },
        {
          heading: "Byť and ísť",
          bullets: [
            "budem, budeš, bude, budeme — future forms of byť",
            "pôjdem, pôjdeš, pôjde, pôjdeme — future forms of ísť",
          ],
        },
      ],
    },

    cs: {
      title: "Future tense in Czech: budu dělat, udělám, půjdu",
      intro: [
        "Czech future tense follows the same basic logic: imperfective verbs often use budu + infinitive, while perfective verbs often use a present-tense-looking form with future meaning.",
      ],
      sections: [
        {
          heading: "Quick logic",
          bullets: [
            "budu dělat — I will be doing / working",
            "udělám — I will do / finish",
            "budu číst — I will be reading",
            "přečtu — I will read / finish reading",
          ],
        },
        {
          heading: "Examples",
          bullets: [
            "Budu pracovat zítra. — I will work tomorrow.",
            "Udělám to zítra. — I will do it tomorrow.",
            "Budu doma. — I will be at home.",
            "Půjdu do práce. — I will go to work.",
          ],
        },
      ],
    },

    pl: {
      title: "Future tense in Polish: będę pracować, zrobię, pójdę",
      intro: [
        "Polish future tense depends on verb aspect. Imperfective verbs describe a process, while perfective verbs describe a completed result.",
        "For imperfective verbs, Polish can use będę + infinitive or a form with -ł/-ła.",
      ],
      sections: [
        {
          heading: "Quick logic",
          bullets: [
            "będę pracować — I will work / be working",
            "zrobię — I will do / finish",
            "będę czytać — I will be reading",
            "przeczytam — I will read / finish reading",
          ],
        },
        {
          heading: "Two imperfective future forms",
          bullets: [
            "Będę robić. — I will be doing.",
            "Będę robił. — I will be doing. / said by a man",
            "Będę robiła. — I will be doing. / said by a woman",
          ],
        },
        {
          heading: "Examples",
          bullets: [
            "Będę pracować jutro. — I will work tomorrow.",
            "Zrobię to jutro. — I will do it tomorrow.",
            "Będę w domu. — I will be at home.",
            "Pójdę do pracy. — I will go to work.",
          ],
        },
      ],
    },
  },
};