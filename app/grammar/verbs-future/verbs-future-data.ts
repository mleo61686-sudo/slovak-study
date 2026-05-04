import type { Lang } from "@/lib/src/language";

export type CourseId = "sk" | "cs" | "pl";

export type W = {
  sk: string;
  ua: string;
  ru: string;
  en: string;
};

export type FutureRow = {
  emoji: string;
  label: W;
  form: string;
  example: W;
};

export type VerbFutureBlock = {
  id: string;
  infinitive: string;
  meaning: W;
  rule: W;
  pattern: W;
  rows: FutureRow[];
};

export type CourseFutureInfo = {
  formulaItems: string[];
  noteItems: string[];
};

export const COURSE_INFO: Record<CourseId, Record<Lang, CourseFutureInfo>> = {
  sk: {
    ua: {
      formulaItems: [
        "Недоконаний вид → budem + інфінітив",
        "robiť → budem robiť = буду робити / працювати",
        "Доконаний вид → форма теперішнього часу часто має значення майбутнього",
        "urobiť → urobím = зроблю",
      ],
      noteItems: [
        "Budem robiť = я буду робити / працювати. Тут важливий процес.",
        "Urobím = я зроблю. Тут важливий результат або завершення дії.",
        "Byť має окремі форми майбутнього часу: budem, budeš, bude, budeme.",
        "Ísť має окрему майбутню форму: pôjdem, pôjdeš, pôjde, pôjdeme.",
      ],
    },
    ru: {
      formulaItems: [
        "Несовершенный вид → budem + инфинитив",
        "robiť → budem robiť = буду делать / работать",
        "Совершенный вид → форма настоящего времени часто имеет значение будущего",
        "urobiť → urobím = сделаю",
      ],
      noteItems: [
        "Budem robiť = я буду делать / работать. Здесь важен процесс.",
        "Urobím = я сделаю. Здесь важен результат или завершение действия.",
        "Byť имеет отдельные формы будущего времени: budem, budeš, bude, budeme.",
        "Ísť имеет отдельную будущую форму: pôjdem, pôjdeš, pôjde, pôjdeme.",
      ],
    },
    en: {
      formulaItems: [
        "Imperfective verb → budem + infinitive",
        "robiť → budem robiť = I will be doing / working",
        "Perfective verb → the present-tense form often has future meaning",
        "urobiť → urobím = I will do / finish",
      ],
      noteItems: [
        "Budem robiť = I will be doing / working. The process is important.",
        "Urobím = I will do / finish. The result or completion is important.",
        "Byť has separate future forms: budem, budeš, bude, budeme.",
        "Ísť has a special future form: pôjdem, pôjdeš, pôjde, pôjdeme.",
      ],
    },
  },

  cs: {
    ua: {
      formulaItems: [
        "Недоконаний вид → budu + інфінітив",
        "dělat → budu dělat = буду робити / працювати",
        "Доконаний вид → форма теперішнього часу часто має значення майбутнього",
        "udělat → udělám = зроблю",
      ],
      noteItems: [
        "Budu dělat = я буду робити / працювати. Тут важливий процес.",
        "Udělám = я зроблю. Тут важливий результат або завершення дії.",
        "Být має окремі форми майбутнього часу: budu, budeš, bude, budeme.",
        "Jít має окрему майбутню форму: půjdu, půjdeš, půjde, půjdeme.",
      ],
    },
    ru: {
      formulaItems: [
        "Несовершенный вид → budu + инфинитив",
        "dělat → budu dělat = буду делать / работать",
        "Совершенный вид → форма настоящего времени часто имеет значение будущего",
        "udělat → udělám = сделаю",
      ],
      noteItems: [
        "Budu dělat = я буду делать / работать. Здесь важен процесс.",
        "Udělám = я сделаю. Здесь важен результат или завершение действия.",
        "Být имеет отдельные формы будущего времени: budu, budeš, bude, budeme.",
        "Jít имеет отдельную будущую форму: půjdu, půjdeš, půjde, půjdeme.",
      ],
    },
    en: {
      formulaItems: [
        "Imperfective verb → budu + infinitive",
        "dělat → budu dělat = I will be doing / working",
        "Perfective verb → the present-tense form often has future meaning",
        "udělat → udělám = I will do / finish",
      ],
      noteItems: [
        "Budu dělat = I will be doing / working. The process is important.",
        "Udělám = I will do / finish. The result or completion is important.",
        "Být has separate future forms: budu, budeš, bude, budeme.",
        "Jít has a special future form: půjdu, půjdeš, půjde, půjdeme.",
      ],
    },
  },

  pl: {
    ua: {
      formulaItems: [
        "Недоконаний вид → będę + інфінітив або форма з -ł/-ła",
        "pracować → będę pracować = буду працювати",
        "Доконаний вид → форма теперішнього часу часто має значення майбутнього",
        "zrobić → zrobię = зроблю",
      ],
      noteItems: [
        "Będę pracować = я буду працювати. Тут важливий процес.",
        "Zrobię = я зроблю. Тут важливий результат або завершення дії.",
        "Być має окремі форми майбутнього часу: będę, będziesz, będzie, będziemy.",
        "Iść має окрему майбутню форму: pójdę, pójdziesz, pójdzie, pójdziemy.",
      ],
    },
    ru: {
      formulaItems: [
        "Несовершенный вид → będę + инфинитив или форма с -ł/-ła",
        "pracować → będę pracować = буду работать",
        "Совершенный вид → форма настоящего времени часто имеет значение будущего",
        "zrobić → zrobię = сделаю",
      ],
      noteItems: [
        "Będę pracować = я буду работать. Здесь важен процесс.",
        "Zrobię = я сделаю. Здесь важен результат или завершение действия.",
        "Być имеет отдельные формы будущего времени: będę, będziesz, będzie, będziemy.",
        "Iść имеет отдельную будущую форму: pójdę, pójdziesz, pójdzie, pójdziemy.",
      ],
    },
    en: {
      formulaItems: [
        "Imperfective verb → będę + infinitive or a form with -ł/-ła",
        "pracować → będę pracować = I will work / be working",
        "Perfective verb → the present-tense form often has future meaning",
        "zrobić → zrobię = I will do / finish",
      ],
      noteItems: [
        "Będę pracować = I will work / be working. The process is important.",
        "Zrobię = I will do / finish. The result or completion is important.",
        "Być has separate future forms: będę, będziesz, będzie, będziemy.",
        "Iść has a special future form: pójdę, pójdziesz, pójdzie, pójdziemy.",
      ],
    },
  },
};

export const DATA: Record<CourseId, VerbFutureBlock[]> = {
  sk: [
    {
      id: "robit",
      infinitive: "robiť",
      meaning: {
        sk: "robiť",
        ua: "робити / працювати",
        ru: "делать / работать",
        en: "to do / to work",
      },
      rule: {
        sk: "budem robiť / budeš robiť / budeme robiť",
        ua: "буду робити / будеш робити / будемо робити",
        ru: "буду делать / будешь делать / будем делать",
        en: "will be doing / working",
      },
      pattern: {
        sk: "budem robiť · budeš robiť · budeme robiť",
        ua: "я буду робити · ти будеш робити · ми будемо робити",
        ru: "я буду делать · ты будешь делать · мы будем делать",
        en: "I will be doing · you will be doing · we will be doing",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "ja", ua: "я", ru: "я", en: "I" },
          form: "budem robiť",
          example: {
            sk: "Budem robiť zajtra.",
            ua: "Я буду працювати завтра.",
            ru: "Я буду работать завтра.",
            en: "I will work tomorrow.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "budeš robiť",
          example: {
            sk: "Budeš robiť dnes?",
            ua: "Ти будеш працювати сьогодні?",
            ru: "Ты будешь работать today?",
            en: "Will you work today?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "budeme robiť",
          example: {
            sk: "Budeme robiť spolu.",
            ua: "Ми будемо працювати разом.",
            ru: "Мы будем работать вместе.",
            en: "We will work together.",
          },
        },
      ],
    },
    {
      id: "urobit",
      infinitive: "urobiť",
      meaning: {
        sk: "urobiť",
        ua: "зробити",
        ru: "сделать",
        en: "to do / to finish",
      },
      rule: {
        sk: "urobím / urobíš / urobíme",
        ua: "зроблю / зробиш / зробимо",
        ru: "сделаю / сделаешь / сделаем",
        en: "will do / will finish",
      },
      pattern: {
        sk: "urobím · urobíš · urobíme",
        ua: "я зроблю · ти зробиш · ми зробимо",
        ru: "я сделаю · ты сделаешь · мы сделаем",
        en: "I will do · you will do · we will do",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "ja", ua: "я", ru: "я", en: "I" },
          form: "urobím",
          example: {
            sk: "Urobím úlohu zajtra.",
            ua: "Я зроблю завдання завтра.",
            ru: "Я сделаю задание завтра.",
            en: "I will do the task tomorrow.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "urobíš",
          example: {
            sk: "Urobíš to dnes?",
            ua: "Ти це зробиш сьогодні?",
            ru: "Ты это сделаешь сегодня?",
            en: "Will you do it today?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "urobíme",
          example: {
            sk: "Urobíme to spolu.",
            ua: "Ми це зробимо разом.",
            ru: "Мы это сделаем вместе.",
            en: "We will do it together.",
          },
        },
      ],
    },
    {
      id: "byt",
      infinitive: "byť",
      meaning: { sk: "byť", ua: "бути", ru: "быть", en: "to be" },
      rule: {
        sk: "budem / budeš / budeme",
        ua: "буду / будеш / будемо",
        ru: "буду / будешь / будем",
        en: "will be",
      },
      pattern: {
        sk: "budem · budeš · budeme",
        ua: "я буду · ти будеш · ми будемо",
        ru: "я буду · ты будешь · мы будем",
        en: "I will be · you will be · we will be",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "ja", ua: "я", ru: "я", en: "I" },
          form: "budem",
          example: {
            sk: "Budem doma.",
            ua: "Я буду вдома.",
            ru: "Я буду дома.",
            en: "I will be at home.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "budeš",
          example: {
            sk: "Budeš v práci?",
            ua: "Ти будеш на роботі?",
            ru: "Ты будешь на работе?",
            en: "Will you be at work?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "budeme",
          example: {
            sk: "Budeme v meste.",
            ua: "Ми будемо в місті.",
            ru: "Мы будем в городе.",
            en: "We will be in the city.",
          },
        },
      ],
    },
    {
      id: "ist",
      infinitive: "ísť",
      meaning: { sk: "ísť", ua: "йти", ru: "идти", en: "to go" },
      rule: {
        sk: "pôjdem / pôjdeš / pôjdeme",
        ua: "піду / підеш / підемо",
        ru: "пойду / пойдёшь / пойдём",
        en: "will go",
      },
      pattern: {
        sk: "pôjdem · pôjdeš · pôjdeme",
        ua: "я піду · ти підеш · ми підемо",
        ru: "я пойду · ты пойдёшь · мы пойдём",
        en: "I will go · you will go · we will go",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "ja", ua: "я", ru: "я", en: "I" },
          form: "pôjdem",
          example: {
            sk: "Pôjdem do práce.",
            ua: "Я піду на роботу.",
            ru: "Я пойду на работу.",
            en: "I will go to work.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "pôjdeš",
          example: {
            sk: "Pôjdeš domov?",
            ua: "Ти підеш додому?",
            ru: "Ты пойдёшь домой?",
            en: "Will you go home?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "pôjdeme",
          example: {
            sk: "Pôjdeme do mesta.",
            ua: "Ми підемо в місто.",
            ru: "Мы пойдём в город.",
            en: "We will go to the city.",
          },
        },
      ],
    },
  ],

  cs: [
    {
      id: "delat",
      infinitive: "dělat",
      meaning: {
        sk: "dělat",
        ua: "робити / працювати",
        ru: "делать / работать",
        en: "to do / to work",
      },
      rule: {
        sk: "budu dělat / budeš dělat / budeme dělat",
        ua: "буду робити / будеш робити / будемо робити",
        ru: "буду делать / будешь делать / будем делать",
        en: "will be doing / working",
      },
      pattern: {
        sk: "budu dělat · budeš dělat · budeme dělat",
        ua: "я буду робити · ти будеш робити · ми будемо робити",
        ru: "я буду делать · ты будешь делать · мы будем делать",
        en: "I will be doing · you will be doing · we will be doing",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "já", ua: "я", ru: "я", en: "I" },
          form: "budu dělat",
          example: {
            sk: "Budu dělat zítra.",
            ua: "Я буду працювати завтра.",
            ru: "Я буду работать завтра.",
            en: "I will work tomorrow.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "budeš dělat",
          example: {
            sk: "Budeš dělat dnes?",
            ua: "Ти будеш працювати сьогодні?",
            ru: "Ты будешь работать сегодня?",
            en: "Will you work today?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "budeme dělat",
          example: {
            sk: "Budeme dělat spolu.",
            ua: "Ми будемо працювати разом.",
            ru: "Мы будем работать вместе.",
            en: "We will work together.",
          },
        },
      ],
    },
    {
      id: "udelat",
      infinitive: "udělat",
      meaning: {
        sk: "udělat",
        ua: "зробити",
        ru: "сделать",
        en: "to do / to finish",
      },
      rule: {
        sk: "udělám / uděláš / uděláme",
        ua: "зроблю / зробиш / зробимо",
        ru: "сделаю / сделаешь / сделаем",
        en: "will do / will finish",
      },
      pattern: {
        sk: "udělám · uděláš · uděláme",
        ua: "я зроблю · ти зробиш · ми зробимо",
        ru: "я сделаю · ты сделаешь · мы сделаем",
        en: "I will do · you will do · we will do",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "já", ua: "я", ru: "я", en: "I" },
          form: "udělám",
          example: {
            sk: "Udělám úkol zítra.",
            ua: "Я зроблю завдання завтра.",
            ru: "Я сделаю задание завтра.",
            en: "I will do the task tomorrow.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "uděláš",
          example: {
            sk: "Uděláš to dnes?",
            ua: "Ти це зробиш сьогодні?",
            ru: "Ты это сделаешь сегодня?",
            en: "Will you do it today?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "uděláme",
          example: {
            sk: "Uděláme to spolu.",
            ua: "Ми це зробимо разом.",
            ru: "Мы это сделаем вместе.",
            en: "We will do it together.",
          },
        },
      ],
    },
    {
      id: "byt",
      infinitive: "být",
      meaning: { sk: "být", ua: "бути", ru: "быть", en: "to be" },
      rule: {
        sk: "budu / budeš / budeme",
        ua: "буду / будеш / будемо",
        ru: "буду / будешь / будем",
        en: "will be",
      },
      pattern: {
        sk: "budu · budeš · budeme",
        ua: "я буду · ти будеш · ми будемо",
        ru: "я буду · ты будешь · мы будем",
        en: "I will be · you will be · we will be",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "já", ua: "я", ru: "я", en: "I" },
          form: "budu",
          example: {
            sk: "Budu doma.",
            ua: "Я буду вдома.",
            ru: "Я буду дома.",
            en: "I will be at home.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "budeš",
          example: {
            sk: "Budeš v práci?",
            ua: "Ти будеш на роботі?",
            ru: "Ты будешь на работе?",
            en: "Will you be at work?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "budeme",
          example: {
            sk: "Budeme ve městě.",
            ua: "Ми будемо в місті.",
            ru: "Мы будем в городе.",
            en: "We will be in the city.",
          },
        },
      ],
    },
    {
      id: "jit",
      infinitive: "jít",
      meaning: { sk: "jít", ua: "йти", ru: "идти", en: "to go" },
      rule: {
        sk: "půjdu / půjdeš / půjdeme",
        ua: "піду / підеш / підемо",
        ru: "пойду / пойдёшь / пойдём",
        en: "will go",
      },
      pattern: {
        sk: "půjdu · půjdeš · půjdeme",
        ua: "я піду · ти підеш · ми підемо",
        ru: "я пойду · ты пойдёшь · мы пойдём",
        en: "I will go · you will go · we will go",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "já", ua: "я", ru: "я", en: "I" },
          form: "půjdu",
          example: {
            sk: "Půjdu do práce.",
            ua: "Я піду на роботу.",
            ru: "Я пойду на работу.",
            en: "I will go to work.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "půjdeš",
          example: {
            sk: "Půjdeš domů?",
            ua: "Ти підеш додому?",
            ru: "Ты пойдёшь домой?",
            en: "Will you go home?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "půjdeme",
          example: {
            sk: "Půjdeme do města.",
            ua: "Ми підемо в місто.",
            ru: "Мы пойдём в город.",
            en: "We will go to the city.",
          },
        },
      ],
    },
  ],

  pl: [
    {
      id: "pracowac",
      infinitive: "pracować",
      meaning: {
        sk: "pracować",
        ua: "працювати",
        ru: "работать",
        en: "to work",
      },
      rule: {
        sk: "będę pracować / będziesz pracować / będziemy pracować",
        ua: "буду працювати / будеш працювати / будемо працювати",
        ru: "буду работать / будешь работать / будем работать",
        en: "will work / will be working",
      },
      pattern: {
        sk: "będę pracować · będziesz pracować · będziemy pracować",
        ua: "я буду працювати · ти будеш працювати · ми будемо працювати",
        ru: "я буду работать · ты будешь работать · мы будем работать",
        en: "I will work · you will work · we will work",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "ja", ua: "я", ru: "я", en: "I" },
          form: "będę pracować",
          example: {
            sk: "Będę pracować jutro.",
            ua: "Я буду працювати завтра.",
            ru: "Я буду работать завтра.",
            en: "I will work tomorrow.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "będziesz pracować",
          example: {
            sk: "Będziesz pracować dzisiaj?",
            ua: "Ти будеш працювати сьогодні?",
            ru: "Ты будешь работать сегодня?",
            en: "Will you work today?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "będziemy pracować",
          example: {
            sk: "Będziemy pracować razem.",
            ua: "Ми будемо працювати разом.",
            ru: "Мы будем работать вместе.",
            en: "We will work together.",
          },
        },
      ],
    },
    {
      id: "zrobic",
      infinitive: "zrobić",
      meaning: {
        sk: "zrobić",
        ua: "зробити",
        ru: "сделать",
        en: "to do / to finish",
      },
      rule: {
        sk: "zrobię / zrobisz / zrobimy",
        ua: "зроблю / зробиш / зробимо",
        ru: "сделаю / сделаешь / сделаем",
        en: "will do / will finish",
      },
      pattern: {
        sk: "zrobię · zrobisz · zrobimy",
        ua: "я зроблю · ти зробиш · ми зробимо",
        ru: "я сделаю · ты сделаешь · мы сделаем",
        en: "I will do · you will do · we will do",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "ja", ua: "я", ru: "я", en: "I" },
          form: "zrobię",
          example: {
            sk: "Zrobię zadanie jutro.",
            ua: "Я зроблю завдання завтра.",
            ru: "Я сделаю задание завтра.",
            en: "I will do the task tomorrow.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "zrobisz",
          example: {
            sk: "Zrobisz to dzisiaj?",
            ua: "Ти це зробиш сьогодні?",
            ru: "Ты это сделаешь сегодня?",
            en: "Will you do it today?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "zrobimy",
          example: {
            sk: "Zrobimy to razem.",
            ua: "Ми це зробимо разом.",
            ru: "Мы это сделаем вместе.",
            en: "We will do it together.",
          },
        },
      ],
    },
    {
      id: "byc",
      infinitive: "być",
      meaning: { sk: "być", ua: "бути", ru: "быть", en: "to be" },
      rule: {
        sk: "będę / będziesz / będziemy",
        ua: "буду / будеш / будемо",
        ru: "буду / будешь / будем",
        en: "will be",
      },
      pattern: {
        sk: "będę · będziesz · będziemy",
        ua: "я буду · ти будеш · ми будемо",
        ru: "я буду · ты будешь · мы будем",
        en: "I will be · you will be · we will be",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "ja", ua: "я", ru: "я", en: "I" },
          form: "będę",
          example: {
            sk: "Będę w domu.",
            ua: "Я буду вдома.",
            ru: "Я буду дома.",
            en: "I will be at home.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "będziesz",
          example: {
            sk: "Będziesz w pracy?",
            ua: "Ти будеш на роботі?",
            ru: "Ты будешь на работе?",
            en: "Will you be at work?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "będziemy",
          example: {
            sk: "Będziemy w mieście.",
            ua: "Ми будемо в місті.",
            ru: "Мы будем в городе.",
            en: "We will be in the city.",
          },
        },
      ],
    },
    {
      id: "isc",
      infinitive: "iść",
      meaning: { sk: "iść", ua: "йти", ru: "идти", en: "to go" },
      rule: {
        sk: "pójdę / pójdziesz / pójdziemy",
        ua: "піду / підеш / підемо",
        ru: "пойду / пойдёшь / пойдём",
        en: "will go",
      },
      pattern: {
        sk: "pójdę · pójdziesz · pójdziemy",
        ua: "я піду · ти підеш · ми підемо",
        ru: "я пойду · ты пойдёшь · мы пойдём",
        en: "I will go · you will go · we will go",
      },
      rows: [
        {
          emoji: "👨",
          label: { sk: "ja", ua: "я", ru: "я", en: "I" },
          form: "pójdę",
          example: {
            sk: "Pójdę do pracy.",
            ua: "Я піду на роботу.",
            ru: "Я пойду на работу.",
            en: "I will go to work.",
          },
        },
        {
          emoji: "👤",
          label: { sk: "ty", ua: "ти", ru: "ты", en: "you" },
          form: "pójdziesz",
          example: {
            sk: "Pójdziesz do domu?",
            ua: "Ти підеш додому?",
            ru: "Ты пойдёшь домой?",
            en: "Will you go home?",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "pójdziemy",
          example: {
            sk: "Pójdziemy do miasta.",
            ua: "Ми підемо в місто.",
            ru: "Мы пойдём в город.",
            en: "We will go to the city.",
          },
        },
      ],
    },
  ],
};

export function normalizeCourse(courseId: string): CourseId {
  if (courseId === "cs" || courseId === "pl") return courseId;
  return "sk";
}

export function tr(w: W, lang: Lang) {
  return w[lang] ?? w.ua;
}