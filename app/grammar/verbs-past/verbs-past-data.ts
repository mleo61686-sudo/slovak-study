import type { Lang } from "@/lib/src/language";

export type CourseId = "sk" | "cs" | "pl";

export type W = {
  sk: string;
  ua: string;
  ru: string;
  en: string;
};

export type PastRow = {
  label: W;
  emoji: string;
  form: string;
  example: W;
};

export type VerbPastBlock = {
  id: string;
  infinitive: string;
  meaning: W;
  rule: W;
  pattern: W;
  rows: PastRow[];
};

export type CoursePastInfo = {
  formulaItems: string[];
  noteItems: string[];
};

export const COURSE_INFO: Record<CourseId, Record<Lang, CoursePastInfo>> = {
  sk: {
    ua: {
      formulaItems: [
        "чоловік → forma na -l: robil, bol, išiel, mal",
        "жінка → forma na -la: robila, bola, išla, mala",
        "ми / вони → forma na -li: robili, boli, išli, mali",
        "у словацькій часто є допоміжне слово: som, si, sme, ste",
      ],
      noteItems: [
        "У словацькій минулий час часто має допоміжне слово: ja som robil / ja som robila.",
        "Для “я” форма залежить від того, хто говорить: чоловік каже robil som, жінка — robila som.",
        "У 3-й особі допоміжне слово зазвичай не ставиться: on robil, ona robila, oni robili.",
        "Заперечення просте: ne- + дієслово. Napríklad: nerobil som, nebola som, nešli sme.",
        "Порядок слів може бути robil som або ja som robil. У звичайному мовленні займенник ja часто можна опустити.",
      ],
    },
    ru: {
      formulaItems: [
        "мужчина → форма на -l: robil, bol, išiel, mal",
        "женщина → форма на -la: robila, bola, išla, mala",
        "мы / они → форма на -li: robili, boli, išli, mali",
        "в словацком часто есть вспомогательное слово: som, si, sme, ste",
      ],
      noteItems: [
        "В словацком прошедшее время часто имеет вспомогательное слово: ja som robil / ja som robila.",
        "Для “я” форма зависит от того, кто говорит: мужчина говорит robil som, женщина — robila som.",
        "В 3-м лице вспомогательное слово обычно не ставится: on robil, ona robila, oni robili.",
        "Отрицание простое: ne- + глагол. Например: nerobil som, nebola som, nešli sme.",
        "Порядок слов может быть robil som или ja som robil. В обычной речи местоимение ja часто можно опустить.",
      ],
    },
    en: {
      formulaItems: [
        "male speaker → form ending in -l: robil, bol, išiel, mal",
        "female speaker → form ending in -la: robila, bola, išla, mala",
        "we / they → form ending in -li: robili, boli, išli, mali",
        "Slovak often uses an auxiliary word: som, si, sme, ste",
      ],
      noteItems: [
        "Slovak past tense often uses an auxiliary word: ja som robil / ja som robila.",
        "For “I”, gender matters: a male speaker says robil som, a female speaker says robila som.",
        "In the 3rd person, the auxiliary is usually not used: on robil, ona robila, oni robili.",
        "Negation is simple: ne- + verb. For example: nerobil som, nebola som, nešli sme.",
        "Word order can be robil som or ja som robil. In everyday speech, ja is often omitted.",
      ],
    },
  },

  cs: {
    ua: {
      formulaItems: [
        "чоловік → forma na -l: dělal, byl, šel, měl",
        "жінка → forma na -la: dělala, byla, šla, měla",
        "ми / вони → forma na -li: dělali, byli, šli, měli",
        "у чеській часто є допоміжне слово: jsem, jsi, jsme, jste",
      ],
      noteItems: [
        "У чеській минулий час часто має допоміжне слово: já jsem dělal / já jsem dělala.",
        "Для “я” форма залежить від мовця: чоловік каже dělal jsem, жінка — dělala jsem.",
        "У 3-й особі допоміжне слово зазвичай не ставиться: on dělal, ona dělala, oni dělali.",
        "Заперечення просте: ne- + дієслово. Například: nedělal jsem, nebyla jsem, nešli jsme.",
        "Порядок слів може бути dělal jsem або já jsem dělal. У живій мові займенник já часто опускається.",
      ],
    },
    ru: {
      formulaItems: [
        "мужчина → форма на -l: dělal, byl, šel, měl",
        "женщина → форма на -la: dělala, byla, šla, měla",
        "мы / они → форма на -li: dělali, byli, šli, měli",
        "в чешском часто есть вспомогательное слово: jsem, jsi, jsme, jste",
      ],
      noteItems: [
        "В чешском прошедшее время часто имеет вспомогательное слово: já jsem dělal / já jsem dělala.",
        "Для “я” форма зависит от говорящего: мужчина говорит dělal jsem, женщина — dělala jsem.",
        "В 3-м лице вспомогательное слово обычно не ставится: on dělal, ona dělala, oni dělali.",
        "Отрицание простое: ne- + глагол. Например: nedělal jsem, nebyla jsem, nešli jsme.",
        "Порядок слов может быть dělal jsem или já jsem dělal. В живой речи местоимение já часто опускается.",
      ],
    },
    en: {
      formulaItems: [
        "male speaker → form ending in -l: dělal, byl, šel, měl",
        "female speaker → form ending in -la: dělala, byla, šla, měla",
        "we / they → form ending in -li: dělali, byli, šli, měli",
        "Czech often uses an auxiliary word: jsem, jsi, jsme, jste",
      ],
      noteItems: [
        "Czech past tense often uses an auxiliary word: já jsem dělal / já jsem dělala.",
        "For “I”, gender matters: a male speaker says dělal jsem, a female speaker says dělala jsem.",
        "In the 3rd person, the auxiliary is usually not used: on dělal, ona dělala, oni dělali.",
        "Negation is simple: ne- + verb. For example: nedělal jsem, nebyla jsem, nešli jsme.",
        "Word order can be dělal jsem or já jsem dělal. In everyday speech, já is often omitted.",
      ],
    },
  },

  pl: {
    ua: {
      formulaItems: [
        "чоловік → форма з -łem: robiłem, byłem, szedłem, miałem",
        "жінка → форма з -łam: robiłam, byłam, szłam, miałam",
        "ми → форма з -liśmy / -łyśmy: zrobiliśmy, byliśmy, szliśmy",
        "у польській немає окремого som / jsem — особа “вшита” в закінчення",
      ],
      noteItems: [
        "У польській не кажемо ja jestem zrobiłem. Правильно просто: zrobiłem / zrobiłam.",
        "Для “я” форма залежить від статі мовця: чоловік каже zrobiłem, жінка — zrobiłam.",
        "У множині форма теж може залежати від групи: zrobiliśmy для групи з чоловіками, zrobiłyśmy для жіночої групи.",
        "Заперечення: nie + дієслово. Наприклад: nie zrobiłem, nie byłam, nie szliśmy.",
        "Польський минулий час дуже важливо вчити через готові фрази, бо закінчення одразу показує особу.",
      ],
    },
    ru: {
      formulaItems: [
        "мужчина → форма с -łem: robiłem, byłem, szedłem, miałem",
        "женщина → форма с -łam: robiłam, byłam, szłam, miałam",
        "мы → форма с -liśmy / -łyśmy: zrobiliśmy, byliśmy, szliśmy",
        "в польском нет отдельного som / jsem — лицо “вшито” в окончание",
      ],
      noteItems: [
        "В польском не говорят ja jestem zrobiłem. Правильно просто: zrobiłem / zrobiłam.",
        "Для “я” форма зависит от пола говорящего: мужчина говорит zrobiłem, женщина — zrobiłam.",
        "Во множественном числе форма тоже может зависеть от группы: zrobiliśmy для группы с мужчинами, zrobiłyśmy для женской группы.",
        "Отрицание: nie + глагол. Например: nie zrobiłem, nie byłam, nie szliśmy.",
        "Польское прошедшее время важно учить через готовые фразы, потому что окончание сразу показывает лицо.",
      ],
    },
    en: {
      formulaItems: [
        "male speaker → form with -łem: robiłem, byłem, szedłem, miałem",
        "female speaker → form with -łam: robiłam, byłam, szłam, miałam",
        "we → form with -liśmy / -łyśmy: zrobiliśmy, byliśmy, szliśmy",
        "Polish has no separate som / jsem — the person is built into the ending",
      ],
      noteItems: [
        "In Polish, you do not say ja jestem zrobiłem. The correct form is simply zrobiłem / zrobiłam.",
        "For “I”, gender matters: a male speaker says zrobiłem, a female speaker says zrobiłam.",
        "Plural forms can also depend on the group: zrobiliśmy for a group with men, zrobiłyśmy for an all-female group.",
        "Negation: nie + verb. For example: nie zrobiłem, nie byłam, nie szliśmy.",
        "Polish past tense is best learned through ready-made phrases because the ending already shows the person.",
      ],
    },
  },
};

export const DATA: Record<CourseId, VerbPastBlock[]> = {
  sk: [
    {
      id: "urobit",
      infinitive: "urobiť",
      meaning: {
        sk: "urobiť",
        ua: "зробити",
        ru: "сделать",
        en: "to do / to make",
      },
      rule: {
        sk: "urobiť → urobil / urobila / urobili",
        ua: "зробив / зробила / зробили",
        ru: "сделал / сделала / сделали",
        en: "did / completed",
      },
      pattern: {
        sk: "urobil som · urobila som · urobili sme",
        ua: "я зробив · я зробила · ми зробили",
        ru: "я сделал · я сделала · мы сделали",
        en: "I did · I did · we did",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "ja muž",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "urobil som",
          example: {
            sk: "Urobil som úlohu.",
            ua: "Я зробив завдання.",
            ru: "Я сделал задание.",
            en: "I did the task.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "ja žena",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "urobila som",
          example: {
            sk: "Urobila som úlohu.",
            ua: "Я зробила завдання.",
            ru: "Я сделала задание.",
            en: "I did the task.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "urobili sme",
          example: {
            sk: "Urobili sme úlohu.",
            ua: "Ми зробили завдання.",
            ru: "Мы сделали задание.",
            en: "We did the task.",
          },
        },
      ],
    },
    {
      id: "byt",
      infinitive: "byť",
      meaning: { sk: "byť", ua: "бути", ru: "быть", en: "to be" },
      rule: {
        sk: "byť → bol / bola / boli",
        ua: "був / була / були",
        ru: "был / была / были",
        en: "was / were",
      },
      pattern: {
        sk: "bol som · bola som · boli sme",
        ua: "я був · я була · ми були",
        ru: "я был · я была · мы были",
        en: "I was · I was · we were",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "ja muž",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "bol som",
          example: {
            sk: "Bol som doma.",
            ua: "Я був удома.",
            ru: "Я был дома.",
            en: "I was at home.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "ja žena",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "bola som",
          example: {
            sk: "Bola som v práci.",
            ua: "Я була на роботі.",
            ru: "Я была на работе.",
            en: "I was at work.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "boli sme",
          example: {
            sk: "Boli sme v meste.",
            ua: "Ми були в місті.",
            ru: "Мы были в городе.",
            en: "We were in the city.",
          },
        },
      ],
    },
    {
      id: "ist",
      infinitive: "ísť",
      meaning: { sk: "ísť", ua: "йти", ru: "идти", en: "to go" },
      rule: {
        sk: "ísť → išiel / išla / išli",
        ua: "йшов / йшла / йшли",
        ru: "шёл / шла / шли",
        en: "went",
      },
      pattern: {
        sk: "išiel som · išla som · išli sme",
        ua: "я йшов · я йшла · ми йшли",
        ru: "я шёл · я шла · мы шли",
        en: "I went · I went · we went",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "ja muž",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "išiel som",
          example: {
            sk: "Išiel som do práce.",
            ua: "Я йшов на роботу.",
            ru: "Я шёл на работу.",
            en: "I went to work.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "ja žena",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "išla som",
          example: {
            sk: "Išla som domov.",
            ua: "Я йшла додому.",
            ru: "Я шла домой.",
            en: "I went home.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "išli sme",
          example: {
            sk: "Išli sme do mesta.",
            ua: "Ми йшли в місто.",
            ru: "Мы шли в город.",
            en: "We went to the city.",
          },
        },
      ],
    },
    {
      id: "mat",
      infinitive: "mať",
      meaning: { sk: "mať", ua: "мати", ru: "иметь", en: "to have" },
      rule: {
        sk: "mať → mal / mala / mali",
        ua: "мав / мала / мали",
        ru: "имел / имела / имели",
        en: "had",
      },
      pattern: {
        sk: "mal som · mala som · mali sme",
        ua: "я мав · я мала · ми мали",
        ru: "у меня было · у меня было · у нас было",
        en: "I had · I had · we had",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "ja muž",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "mal som",
          example: {
            sk: "Mal som čas.",
            ua: "Я мав час.",
            ru: "У меня было время.",
            en: "I had time.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "ja žena",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "mala som",
          example: {
            sk: "Mala som otázku.",
            ua: "У мене було питання.",
            ru: "У меня был вопрос.",
            en: "I had a question.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "mali sme",
          example: {
            sk: "Mali sme prácu.",
            ua: "Ми мали роботу.",
            ru: "У нас была работа.",
            en: "We had a job.",
          },
        },
      ],
    },
  ],

  cs: [
    {
      id: "udelat",
      infinitive: "udělat",
      meaning: {
        sk: "udělat",
        ua: "зробити",
        ru: "сделать",
        en: "to do / to make",
      },
      rule: {
        sk: "udělat → udělal / udělala / udělali",
        ua: "зробив / зробила / зробили",
        ru: "сделал / сделала / сделали",
        en: "did / completed",
      },
      pattern: {
        sk: "udělal jsem · udělala jsem · udělali jsme",
        ua: "я зробив · я зробила · ми зробили",
        ru: "я сделал · я сделала · мы сделали",
        en: "I did · I did · we did",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "já muž",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "udělal jsem",
          example: {
            sk: "Udělal jsem úkol.",
            ua: "Я зробив завдання.",
            ru: "Я сделал задание.",
            en: "I did the task.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "já žena",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "udělala jsem",
          example: {
            sk: "Udělala jsem úkol.",
            ua: "Я зробила завдання.",
            ru: "Я сделала задание.",
            en: "I did the task.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "udělali jsme",
          example: {
            sk: "Udělali jsme úkol.",
            ua: "Ми зробили завдання.",
            ru: "Мы сделали задание.",
            en: "We did the task.",
          },
        },
      ],
    },
    {
      id: "byt",
      infinitive: "být",
      meaning: { sk: "být", ua: "бути", ru: "быть", en: "to be" },
      rule: {
        sk: "být → byl / byla / byli",
        ua: "був / була / були",
        ru: "был / была / были",
        en: "was / were",
      },
      pattern: {
        sk: "byl jsem · byla jsem · byli jsme",
        ua: "я був · я була · ми були",
        ru: "я был · я была · мы были",
        en: "I was · I was · we were",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "já muž",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "byl jsem",
          example: {
            sk: "Byl jsem doma.",
            ua: "Я був удома.",
            ru: "Я был дома.",
            en: "I was at home.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "já žena",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "byla jsem",
          example: {
            sk: "Byla jsem v práci.",
            ua: "Я була на роботі.",
            ru: "Я была на работе.",
            en: "I was at work.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "byli jsme",
          example: {
            sk: "Byli jsme ve městě.",
            ua: "Ми були в місті.",
            ru: "Мы были в городе.",
            en: "We were in the city.",
          },
        },
      ],
    },
    {
      id: "jit",
      infinitive: "jít",
      meaning: { sk: "jít", ua: "йти", ru: "идти", en: "to go" },
      rule: {
        sk: "jít → šel / šla / šli",
        ua: "йшов / йшла / йшли",
        ru: "шёл / шла / шли",
        en: "went",
      },
      pattern: {
        sk: "šel jsem · šla jsem · šli jsme",
        ua: "я йшов · я йшла · ми йшли",
        ru: "я шёл · я шла · мы шли",
        en: "I went · I went · we went",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "já muž",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "šel jsem",
          example: {
            sk: "Šel jsem do práce.",
            ua: "Я йшов на роботу.",
            ru: "Я шёл на работу.",
            en: "I went to work.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "já žena",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "šla jsem",
          example: {
            sk: "Šla jsem domů.",
            ua: "Я йшла додому.",
            ru: "Я шла домой.",
            en: "I went home.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "šli jsme",
          example: {
            sk: "Šli jsme do města.",
            ua: "Ми йшли в місто.",
            ru: "Мы шли в город.",
            en: "We went to the city.",
          },
        },
      ],
    },
    {
      id: "mit",
      infinitive: "mít",
      meaning: { sk: "mít", ua: "мати", ru: "иметь", en: "to have" },
      rule: {
        sk: "mít → měl / měla / měli",
        ua: "мав / мала / мали",
        ru: "имел / имела / имели",
        en: "had",
      },
      pattern: {
        sk: "měl jsem · měla jsem · měli jsme",
        ua: "я мав · я мала · ми мали",
        ru: "у меня было · у меня было · у нас было",
        en: "I had · I had · we had",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "já muž",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "měl jsem",
          example: {
            sk: "Měl jsem čas.",
            ua: "Я мав час.",
            ru: "У меня было время.",
            en: "I had time.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "já žena",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "měla jsem",
          example: {
            sk: "Měla jsem otázku.",
            ua: "У мене було питання.",
            ru: "У меня был вопрос.",
            en: "I had a question.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "měli jsme",
          example: {
            sk: "Měli jsme práci.",
            ua: "Ми мали роботу.",
            ru: "У нас была работа.",
            en: "We had a job.",
          },
        },
      ],
    },
  ],

  pl: [
    {
      id: "zrobic",
      infinitive: "zrobić",
      meaning: {
        sk: "zrobić",
        ua: "зробити",
        ru: "сделать",
        en: "to do / to make",
      },
      rule: {
        sk: "zrobić → zrobiłem / zrobiłam / zrobiliśmy",
        ua: "зробив / зробила / зробили",
        ru: "сделал / сделала / сделали",
        en: "did / completed",
      },
      pattern: {
        sk: "zrobiłem · zrobiłam · zrobiliśmy",
        ua: "я зробив · я зробила · ми зробили",
        ru: "я сделал · я сделала · мы сделали",
        en: "I did · I did · we did",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "ja mężczyzna",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "zrobiłem",
          example: {
            sk: "Zrobiłem zadanie.",
            ua: "Я зробив завдання.",
            ru: "Я сделал задание.",
            en: "I did the task.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "ja kobieta",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "zrobiłam",
          example: {
            sk: "Zrobiłam zadanie.",
            ua: "Я зробила завдання.",
            ru: "Я сделала задание.",
            en: "I did the task.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "zrobiliśmy",
          example: {
            sk: "Zrobiliśmy zadanie.",
            ua: "Ми зробили завдання.",
            ru: "Мы сделали задание.",
            en: "We did the task.",
          },
        },
      ],
    },
    {
      id: "byc",
      infinitive: "być",
      meaning: { sk: "być", ua: "бути", ru: "быть", en: "to be" },
      rule: {
        sk: "być → byłem / byłam / byliśmy",
        ua: "був / була / були",
        ru: "был / была / были",
        en: "was / were",
      },
      pattern: {
        sk: "byłem · byłam · byliśmy",
        ua: "я був · я була · ми були",
        ru: "я был · я была · мы были",
        en: "I was · I was · we were",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "ja mężczyzna",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "byłem",
          example: {
            sk: "Byłem w domu.",
            ua: "Я був удома.",
            ru: "Я был дома.",
            en: "I was at home.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "ja kobieta",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "byłam",
          example: {
            sk: "Byłam w pracy.",
            ua: "Я була на роботі.",
            ru: "Я была на работе.",
            en: "I was at work.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "byliśmy",
          example: {
            sk: "Byliśmy w mieście.",
            ua: "Ми були в місті.",
            ru: "Мы были в городе.",
            en: "We were in the city.",
          },
        },
      ],
    },
    {
      id: "isc",
      infinitive: "iść",
      meaning: { sk: "iść", ua: "йти", ru: "идти", en: "to go" },
      rule: {
        sk: "iść → szedłem / szłam / szliśmy",
        ua: "йшов / йшла / йшли",
        ru: "шёл / шла / шли",
        en: "went",
      },
      pattern: {
        sk: "szedłem · szłam · szliśmy",
        ua: "я йшов · я йшла · ми йшли",
        ru: "я шёл · я шла · мы шли",
        en: "I went · I went · we went",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "ja mężczyzna",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "szedłem",
          example: {
            sk: "Szedłem do pracy.",
            ua: "Я йшов на роботу.",
            ru: "Я шёл на работу.",
            en: "I went to work.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "ja kobieta",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "szłam",
          example: {
            sk: "Szłam do domu.",
            ua: "Я йшла додому.",
            ru: "Я шла домой.",
            en: "I went home.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "szliśmy",
          example: {
            sk: "Szliśmy do miasta.",
            ua: "Ми йшли в місто.",
            ru: "Мы шли в город.",
            en: "We went to the city.",
          },
        },
      ],
    },
    {
      id: "miec",
      infinitive: "mieć",
      meaning: { sk: "mieć", ua: "мати", ru: "иметь", en: "to have" },
      rule: {
        sk: "mieć → miałem / miałam / mieliśmy",
        ua: "мав / мала / мали",
        ru: "имел / имела / имели",
        en: "had",
      },
      pattern: {
        sk: "miałem · miałam · mieliśmy",
        ua: "я мав · я мала · ми мали",
        ru: "у меня было · у меня было · у нас было",
        en: "I had · I had · we had",
      },
      rows: [
        {
          emoji: "👨",
          label: {
            sk: "ja mężczyzna",
            ua: "я чоловік",
            ru: "я мужчина",
            en: "I, male",
          },
          form: "miałem",
          example: {
            sk: "Miałem czas.",
            ua: "Я мав час.",
            ru: "У меня было время.",
            en: "I had time.",
          },
        },
        {
          emoji: "👩",
          label: {
            sk: "ja kobieta",
            ua: "я жінка",
            ru: "я женщина",
            en: "I, female",
          },
          form: "miałam",
          example: {
            sk: "Miałam pytanie.",
            ua: "У мене було питання.",
            ru: "У меня был вопрос.",
            en: "I had a question.",
          },
        },
        {
          emoji: "👥",
          label: { sk: "my", ua: "ми", ru: "мы", en: "we" },
          form: "mieliśmy",
          example: {
            sk: "Mieliśmy pracę.",
            ua: "Ми мали роботу.",
            ru: "У нас была работа.",
            en: "We had a job.",
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