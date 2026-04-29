"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type Lang = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

type W = { sk: string; ua: string; ru: string; en: string };

type FutureRow = {
    emoji: string;
    label: W;
    form: string;
    example: W;
};

type VerbFutureBlock = {
    id: string;
    infinitive: string;
    meaning: W;
    rule: W;
    pattern: W;
    rows: FutureRow[];
};

function tr(w: W, lang: Lang) {
    return w[lang] ?? w.ua;
}

const UI: Record<
    Lang,
    {
        title: string;
        subtitle: string;
        s1: string;
        s2: string;
        s3: string;
        s4: string;
        chooseVerb: string;
        infinitive: string;
        rule: string;
        pattern: string;
        practice: string;
        show: string;
        next: string;
        answer: string;
        noteTitle: string;
        examplesHint: string;
    }
> = {
    ua: {
        title: "Майбутній час",
        subtitle:
            "Навчися говорити: я буду робити, я зроблю, я буду, ми підемо — простими прикладами.",
        s1: "1) Як це працює",
        s2: "2) Обери дієслово",
        s3: "3) Приклади",
        s4: "4) Міні-практика 🧠",
        chooseVerb: "Обери дієслово",
        infinitive: "Інфінітив",
        rule: "Форма майбутнього часу",
        pattern: "Патерн",
        practice: "Переклади речення",
        show: "Показати відповідь",
        next: "Наступне",
        answer: "Відповідь",
        noteTitle: "Шпаргалка",
        examplesHint:
            "Подивись на різницю: буду робити = процес, зроблю = результат.",
    },
    ru: {
        title: "Будущее время",
        subtitle:
            "Научись говорить: я буду делать, я сделаю, я буду, мы пойдём — на простых примерах.",
        s1: "1) Как это работает",
        s2: "2) Выбери глагол",
        s3: "3) Примеры",
        s4: "4) Мини-практика 🧠",
        chooseVerb: "Выбери глагол",
        infinitive: "Инфинитив",
        rule: "Форма будущего времени",
        pattern: "Паттерн",
        practice: "Переведи предложение",
        show: "Показать ответ",
        next: "Следующее",
        answer: "Ответ",
        noteTitle: "Шпаргалка",
        examplesHint:
            "Посмотри на разницу: буду делать = процесс, сделаю = результат.",
    },
    en: {
        title: "Future tense",
        subtitle:
            "Learn how to say: I will be doing, I will finish, I will be, we will go.",
        s1: "1) How it works",
        s2: "2) Choose a verb",
        s3: "3) Examples",
        s4: "4) Mini practice 🧠",
        chooseVerb: "Choose a verb",
        infinitive: "Infinitive",
        rule: "Future tense form",
        pattern: "Pattern",
        practice: "Translate the sentence",
        show: "Show answer",
        next: "Next",
        answer: "Answer",
        noteTitle: "Cheat sheet",
        examplesHint:
            "Notice the difference: will be doing = process, will finish = result.",
    },
};

const COURSE_INFO: Record<
    CourseId,
    Record<Lang, { formulaItems: string[]; noteItems: string[] }>
> = {
    sk: {
        ua: {
            formulaItems: [
                "nedokonavý vid → budem + інфінітив",
                "robiť → budem robiť = буду робити / працювати",
                "dokonavý vid → форма теперішнього часу має значення майбутнього",
                "urobiť → urobím = зроблю",
            ],
            noteItems: [
                "Budem robiť = я буду робити / працювати.",
                "Urobím = я зроблю, тобто дія буде завершена.",
                "Byť має окрему форму: budem, budeš, bude.",
                "Ísť має окрему майбутню форму: pôjdem, pôjdeš, pôjde.",
            ],
        },
        ru: {
            formulaItems: [
                "nedokonavý vid → budem + инфинитив",
                "robiť → budem robiť = буду делать / работать",
                "dokonavý vid → форма настоящего времени имеет значение будущего",
                "urobiť → urobím = сделаю",
            ],
            noteItems: [
                "Budem robiť = я буду делать / работать.",
                "Urobím = я сделаю, то есть действие будет завершено.",
                "Byť имеет отдельную форму: budem, budeš, bude.",
                "Ísť имеет отдельную будущую форму: pôjdem, pôjdeš, pôjde.",
            ],
        },
        en: {
            formulaItems: [
                "imperfective verb → budem + infinitive",
                "robiť → budem robiť = I will be doing / working",
                "perfective verb → present form has future meaning",
                "urobiť → urobím = I will do / finish",
            ],
            noteItems: [
                "Budem robiť = I will be doing / working.",
                "Urobím = I will do / finish the action.",
                "Byť has its own future form: budem, budeš, bude.",
                "Ísť has a special future form: pôjdem, pôjdeš, pôjde.",
            ],
        },
    },
    cs: {
        ua: {
            formulaItems: [
                "nedokonavý vid → budu + інфінітив",
                "dělat → budu dělat = буду робити / працювати",
                "dokonavý vid → форма теперішнього часу має значення майбутнього",
                "udělat → udělám = зроблю",
            ],
            noteItems: [
                "Budu dělat = я буду робити / працювати.",
                "Udělám = я зроблю, тобто дія буде завершена.",
                "Být має окрему форму: budu, budeš, bude.",
                "Jít має окрему майбутню форму: půjdu, půjdeš, půjde.",
            ],
        },
        ru: {
            formulaItems: [
                "nedokonavý vid → budu + инфинитив",
                "dělat → budu dělat = буду делать / работать",
                "dokonavý vid → форма настоящего времени имеет значение будущего",
                "udělat → udělám = сделаю",
            ],
            noteItems: [
                "Budu dělat = я буду делать / работать.",
                "Udělám = я сделаю, то есть действие будет завершено.",
                "Být имеет отдельную форму: budu, budeš, bude.",
                "Jít имеет отдельную будущую форму: půjdu, půjdeš, půjde.",
            ],
        },
        en: {
            formulaItems: [
                "imperfective verb → budu + infinitive",
                "dělat → budu dělat = I will be doing / working",
                "perfective verb → present form has future meaning",
                "udělat → udělám = I will do / finish",
            ],
            noteItems: [
                "Budu dělat = I will be doing / working.",
                "Udělám = I will do / finish the action.",
                "Být has its own future form: budu, budeš, bude.",
                "Jít has a special future form: půjdu, půjdeš, půjde.",
            ],
        },
    },
    pl: {
        ua: {
            formulaItems: [
                "czasownik niedokonany → będę + інфінітив",
                "robić → będę robić = буду робити / працювати",
                "czasownik dokonany → форма теперішнього часу має значення майбутнього",
                "zrobić → zrobię = зроблю",
            ],
            noteItems: [
                "Będę robić = я буду робити / працювати.",
                "Zrobię = я зроблю, тобто дія буде завершена.",
                "Być має окрему форму: będę, będziesz, będzie.",
                "Iść має окрему майбутню форму: pójdę, pójdziesz, pójdzie.",
            ],
        },
        ru: {
            formulaItems: [
                "czasownik niedokonany → będę + инфинитив",
                "robić → będę robić = буду делать / работать",
                "czasownik dokonany → форма настоящего времени имеет значение будущего",
                "zrobić → zrobię = сделаю",
            ],
            noteItems: [
                "Będę robić = я буду делать / работать.",
                "Zrobię = я сделаю, то есть действие будет завершено.",
                "Być имеет отдельную форму: będę, będziesz, będzie.",
                "Iść имеет отдельную будущую форму: pójdę, pójdziesz, pójdzie.",
            ],
        },
        en: {
            formulaItems: [
                "imperfective verb → będę + infinitive",
                "robić → będę robić = I will be doing / working",
                "perfective verb → present form has future meaning",
                "zrobić → zrobię = I will do / finish",
            ],
            noteItems: [
                "Będę robić = I will be doing / working.",
                "Zrobię = I will do / finish the action.",
                "Być has its own future form: będę, będziesz, będzie.",
                "Iść has a special future form: pójdę, pójdziesz, pójdzie.",
            ],
        },
    },
};

const DATA: Record<CourseId, VerbFutureBlock[]> = {
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
                        ru: "Ты будешь работать сегодня?",
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
                ua: "буду робити / будеш робити / будемо робити",
                ru: "буду делать / будешь делать / будем делать",
                en: "will be doing / working",
            },
            pattern: {
                sk: "będę pracować · będziesz pracować · będziemy pracować",
                ua: "я буду робити · ти будеш робити · ми будемо робити",
                ru: "я буду делать · ты будешь делать · мы будем делать",
                en: "I will be doing · you will be doing · we will be doing",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja", ua: "я", ru: "я", en: "I" },
                    form: "będę pracować",
                    example: {
                        sk: "Będę robić jutro.",
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
                        sk: "Będziesz robić dzisiaj?",
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
                        sk: "Będziemy robić razem.",
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

function normalizeCourse(courseId: string): CourseId {
    if (courseId === "cs" || courseId === "pl") return courseId;
    return "sk";
}

export default function VerbsFutureClient() {
    const { lang } = useLanguage();
    const { courseId } = useActiveCourse();

    const uiLang: Lang = lang === "ru" || lang === "en" ? lang : "ua";
    const ui = UI[uiLang];

    const grammarCourseId = normalizeCourse(courseId);
    const verbs = DATA[grammarCourseId];
    const courseInfo = COURSE_INFO[grammarCourseId][uiLang];

    const [activeId, setActiveId] = useState(verbs[0].id);
    const [practiceIndex, setPracticeIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        setActiveId(verbs[0].id);
        setPracticeIndex(0);
        setShowAnswer(false);
    }, [grammarCourseId, verbs]);

    const active = useMemo(
        () => verbs.find((v) => v.id === activeId) ?? verbs[0],
        [activeId, verbs]
    );

    const allPracticeRows = useMemo(
        () => verbs.flatMap((v) => v.rows.map((row) => ({ ...row, verb: v.infinitive }))),
        [verbs]
    );

    const currentPractice = allPracticeRows[practiceIndex] ?? allPracticeRows[0];

    function nextPractice() {
        setShowAnswer(false);
        setPracticeIndex((i) => (i + 1) % allPracticeRows.length);
    }

    return (
        <div className="space-y-10">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold">{ui.title}</h1>
                <p className="max-w-3xl text-slate-700">{ui.subtitle}</p>
            </div>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">{ui.s1}</h2>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border bg-white p-5">
                        <div className="font-semibold">{ui.pattern}</div>

                        <div className="mt-4 grid gap-3">
                            {courseInfo.formulaItems.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border bg-slate-50 px-4 py-3 text-slate-700"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-white p-5">
                        <div className="font-semibold">{ui.noteTitle}</div>

                        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                            {courseInfo.noteItems.slice(0, 3).map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">{ui.s2}</h2>

                <div className="rounded-2xl border bg-white p-5">
                    <div className="text-sm text-slate-500">{ui.chooseVerb}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {verbs.map((v) => (
                            <button
                                key={v.id}
                                type="button"
                                onClick={() => {
                                    setActiveId(v.id);
                                    setPracticeIndex(0);
                                    setShowAnswer(false);
                                }}
                                className={[
                                    "rounded-xl border px-3 py-2 text-sm transition",
                                    active.id === v.id
                                        ? "border-slate-900 bg-slate-900 text-white"
                                        : "hover:bg-slate-50",
                                ].join(" ")}
                            >
                                {v.infinitive}
                            </button>
                        ))}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border p-4">
                            <div className="text-sm text-slate-500">{ui.infinitive}</div>
                            <div className="text-lg font-semibold">{active.infinitive}</div>
                            <div className="mt-1 text-slate-600">{tr(active.meaning, uiLang)}</div>
                        </div>

                        <div className="rounded-xl border p-4">
                            <div className="text-sm text-slate-500">{ui.rule}</div>
                            <div className="text-lg font-semibold">{active.rule.sk}</div>
                            <div className="mt-1 text-slate-600">{tr(active.rule, uiLang)}</div>
                        </div>

                        <div className="rounded-xl border p-4">
                            <div className="text-sm text-slate-500">{ui.pattern}</div>
                            <div className="font-semibold">{active.pattern.sk}</div>
                            <div className="mt-1 text-slate-600">{tr(active.pattern, uiLang)}</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">{ui.s3}</h2>
                <p className="text-slate-600">{ui.examplesHint}</p>

                <div className="grid gap-4 md:grid-cols-3">
                    {active.rows.map((row) => (
                        <div key={row.form} className="rounded-2xl border bg-white p-5">
                            <div className="text-2xl">{row.emoji}</div>
                            <div className="mt-2 text-sm text-slate-500">{tr(row.label, uiLang)}</div>
                            <div className="mt-1 text-lg font-semibold">{row.form}</div>

                            <div className="mt-4 rounded-xl border bg-slate-50 p-4">
                                <div className="font-medium">{row.example.sk}</div>
                                <div className="mt-1 text-sm text-slate-500">
                                    {tr(row.example, uiLang)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">{ui.s4}</h2>

                <div className="rounded-2xl border bg-white p-5">
                    <div className="text-sm text-slate-500">{ui.practice}</div>
                    <div className="mt-2 text-lg font-semibold">
                        {tr(currentPractice.example, uiLang)}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setShowAnswer(true)}
                            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
                        >
                            {ui.show}
                        </button>

                        <button
                            type="button"
                            onClick={nextPractice}
                            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
                        >
                            {ui.next}
                        </button>
                    </div>

                    {showAnswer && (
                        <div className="mt-4 rounded-xl border bg-slate-50 p-4">
                            <div className="text-sm text-slate-500">{ui.answer}</div>
                            <div className="font-semibold">{currentPractice.example.sk}</div>
                            <div className="mt-1 text-sm text-slate-500">
                                {currentPractice.form}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">{ui.noteTitle}</h2>

                <div className="rounded-2xl border bg-white p-5 text-slate-700">
                    <ul className="list-disc space-y-2 pl-5">
                        {courseInfo.noteItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}