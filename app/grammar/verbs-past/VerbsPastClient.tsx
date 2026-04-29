"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type Lang = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

type W = {
    sk: string;
    ua: string;
    ru: string;
    en: string;
};

type PastRow = {
    label: W;
    emoji: string;
    form: string;
    example: W;
};

type VerbPastBlock = {
    id: string;
    infinitive: string;
    meaning: W;
    rule: W;
    pattern: W;
    rows: PastRow[];
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
        noteItems: string[];
        formulaItems: string[];
    }
> = {
    ua: {
        title: "Минулий час",
        subtitle:
            "Навчися швидко говорити: я робив, я була, ми пішли — без складної граматики.",
        s1: "1) Як це працює",
        s2: "2) Обери дієслово",
        s3: "3) Приклади",
        s4: "4) Міні-практика 🧠",
        chooseVerb: "Обери дієслово",
        infinitive: "Інфінітив",
        rule: "Форма минулого часу",
        pattern: "Патерн",
        practice: "Переклади речення",
        show: "Показати відповідь",
        next: "Наступне",
        answer: "Відповідь",
        noteTitle: "Шпаргалка",
        examplesHint: "Подивись на різницю між чоловічою, жіночою формою та множиною.",
        formulaItems: [
            "чоловік → форма на -l",
            "жінка → форма на -la",
            "ми / вони → форма на -li",
            "у словацькій і чеській часто є допоміжне слово: som / jsem",
        ],
        noteItems: [
            "Для “я” важливо, хто говорить: чоловік каже “robil”, жінка — “robila”.",
            "У словацькій: ja som robil / ja som robila.",
            "У чеській: já jsem dělal / já jsem dělala.",
            "У польській немає допоміжного слова (jak 'som' / 'jsem'): robiłem / robiłam.",
            "Заперечення просте: ne- / nie + минулий час.",
        ],
    },
    ru: {
        title: "Прошедшее время",
        subtitle:
            "Научись быстро говорить: я делал, я была, мы пошли — без сложной грамматики.",
        s1: "1) Как это работает",
        s2: "2) Выбери глагол",
        s3: "3) Примеры",
        s4: "4) Мини-практика 🧠",
        chooseVerb: "Выбери глагол",
        infinitive: "Инфинитив",
        rule: "Форма прошедшего времени",
        pattern: "Паттерн",
        practice: "Переведи предложение",
        show: "Показать ответ",
        next: "Следующее",
        answer: "Ответ",
        noteTitle: "Шпаргалка",
        examplesHint: "Посмотри на разницу между мужской, женской формой и множественным числом.",
        formulaItems: [
            "мужчина → форма на -l",
            "женщина → форма на -la",
            "мы / они → форма на -li",
            "в словацком и чешском часто есть вспомогательное слово: som / jsem",
        ],
        noteItems: [
            "Для “я” важно, кто говорит: мужчина говорит “robil”, женщина — “robila”.",
            "В словацком: ja som robil / ja som robila.",
            "В чешском: já jsem dělal / já jsem dělala.",
            "В польском вспомогательного слова нет: robiłem / robiłam.",
            "Отрицание простое: ne- / nie + прошедшее время.",
        ],
    },
    en: {
        title: "Past tense",
        subtitle:
            "Learn how to say: I did, I was, we went — without complicated grammar.",
        s1: "1) How it works",
        s2: "2) Choose a verb",
        s3: "3) Examples",
        s4: "4) Mini practice 🧠",
        chooseVerb: "Choose a verb",
        infinitive: "Infinitive",
        rule: "Past tense form",
        pattern: "Pattern",
        practice: "Translate the sentence",
        show: "Show answer",
        next: "Next",
        answer: "Answer",
        noteTitle: "Cheat sheet",
        examplesHint: "Notice the difference between masculine, feminine, and plural forms.",
        formulaItems: [
            "male speaker → form ending in -l",
            "female speaker → form ending in -la",
            "we / they → form ending in -li",
            "Slovak and Czech often use an auxiliary word: som / jsem",
        ],
        noteItems: [
            "For “I”, gender matters: a male speaker says “robil”, a female speaker says “robila”.",
            "In Slovak: ja som robil / ja som robila.",
            "In Czech: já jsem dělal / já jsem dělala.",
            "In Polish, there is no auxiliary word: robiłem / robiłam.",
            "Negation is simple: ne- / nie + past tense.",
        ],
    },
};

const DATA: Record<CourseId, VerbPastBlock[]> = {
    sk: [
        {
            id: "urobit",
            infinitive: "urobiť",
            meaning: { sk: "urobiť", ua: "зробити", ru: "сделать", en: "to do / to make" },
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
                en: "I did · we did"
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja muž", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
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
                    label: { sk: "ja žena", ua: "я жінка", ru: "я женщина", en: "I, female" },
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
                sk: "ja som bol · ja som bola · my sme boli",
                ua: "я був · я була · ми були",
                ru: "я был · я была · мы были",
                en: "I was · I was · we were",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja muž", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "bol som",
                    example: {
                        sk: "Ja som bol doma.",
                        ua: "Я був удома.",
                        ru: "Я был дома.",
                        en: "I was at home.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "ja žena", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "bola som",
                    example: {
                        sk: "Ja som bola v práci.",
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
                        sk: "My sme boli v meste.",
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
                ua: "ішов / ішла / ішли",
                ru: "шёл / шла / шли",
                en: "went",
            },
            pattern: {
                sk: "ja som išiel · ja som išla · my sme išli",
                ua: "я йшов · я йшла · ми йшли",
                ru: "я шёл · я шла · мы шли",
                en: "I went · I went · we went",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja muž", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "išiel som",
                    example: {
                        sk: "Ja som išiel do práce.",
                        ua: "Я йшов на роботу.",
                        ru: "Я шёл на работу.",
                        en: "I went to work.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "ja žena", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "išla som",
                    example: {
                        sk: "Ja som išla domov.",
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
                        sk: "My sme išli do mesta.",
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
                sk: "ja som mal · ja som mala · my sme mali",
                ua: "я мав · я мала · ми мали",
                ru: "я имел · я имела · мы имели",
                en: "I had · I had · we had",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja muž", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "mal som",
                    example: {
                        sk: "Ja som mal čas.",
                        ua: "Я мав час.",
                        ru: "У меня было время.",
                        en: "I had time.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "ja žena", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "mala som",
                    example: {
                        sk: "Ja som mala otázku.",
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
                        sk: "My sme mali prácu.",
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
            meaning: { sk: "udělat", ua: "зробити", ru: "сделать", en: "to do / to make" },
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
                en: "I did · we did"
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "já muž", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
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
                    label: { sk: "já žena", ua: "я жінка", ru: "я женщина", en: "I, female" },
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
                sk: "já jsem byl · já jsem byla · my jsme byli",
                ua: "я був · я була · ми були",
                ru: "я был · я была · мы были",
                en: "I was · I was · we were",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "já muž", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "byl jsem",
                    example: {
                        sk: "Já jsem byl doma.",
                        ua: "Я був удома.",
                        ru: "Я был дома.",
                        en: "I was at home.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "já žena", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "byla jsem",
                    example: {
                        sk: "Já jsem byla v práci.",
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
                        sk: "My jsme byli ve městě.",
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
                ua: "ішов / ішла / ішли",
                ru: "шёл / шла / шли",
                en: "went",
            },
            pattern: {
                sk: "já jsem šel · já jsem šla · my jsme šli",
                ua: "я йшов · я йшла · ми йшли",
                ru: "я шёл · я шла · мы шли",
                en: "I went · I went · we went",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "já muž", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "šel jsem",
                    example: {
                        sk: "Já jsem šel do práce.",
                        ua: "Я йшов на роботу.",
                        ru: "Я шёл на работу.",
                        en: "I went to work.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "já žena", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "šla jsem",
                    example: {
                        sk: "Já jsem šla domů.",
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
                        sk: "My jsme šli do města.",
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
                sk: "já jsem měl · já jsem měla · my jsme měli",
                ua: "я мав · я мала · ми мали",
                ru: "я имел · я имела · мы имели",
                en: "I had · I had · we had",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "já muž", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "měl jsem",
                    example: {
                        sk: "Já jsem měl čas.",
                        ua: "Я мав час.",
                        ru: "У меня было время.",
                        en: "I had time.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "já žena", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "měla jsem",
                    example: {
                        sk: "Já jsem měla otázku.",
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
                        sk: "My jsme měli práci.",
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
            meaning: { sk: "zrobić", ua: "зробити", ru: "сделать", en: "to do / to make" },
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
                en: "I did · we did"
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja mężczyzna", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
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
                    label: { sk: "ja kobieta", ua: "я жінка", ru: "я женщина", en: "I, female" },
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
                sk: "ja byłem · ja byłam · my byliśmy",
                ua: "я був · я була · ми були",
                ru: "я был · я была · мы были",
                en: "I was · I was · we were",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja mężczyzna", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "byłem",
                    example: {
                        sk: "Ja byłem w domu.",
                        ua: "Я був удома.",
                        ru: "Я был дома.",
                        en: "I was at home.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "ja kobieta", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "byłam",
                    example: {
                        sk: "Ja byłam w pracy.",
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
                        sk: "My byliśmy w mieście.",
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
                ua: "ішов / ішла / ішли",
                ru: "шёл / шла / шли",
                en: "went",
            },
            pattern: {
                sk: "ja szedłem · ja szłam · my szliśmy",
                ua: "я йшов · я йшла · ми йшли",
                ru: "я шёл · я шла · мы шли",
                en: "I went · I went · we went",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja mężczyzna", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "szedłem",
                    example: {
                        sk: "Ja szedłem do pracy.",
                        ua: "Я йшов на роботу.",
                        ru: "Я шёл на работу.",
                        en: "I went to work.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "ja kobieta", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "szłam",
                    example: {
                        sk: "Ja szłam do domu.",
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
                        sk: "My szliśmy do miasta.",
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
                sk: "ja miałem · ja miałam · my mieliśmy",
                ua: "я мав · я мала · ми мали",
                ru: "я имел · я имела · мы имели",
                en: "I had · I had · we had",
            },
            rows: [
                {
                    emoji: "👨",
                    label: { sk: "ja mężczyzna", ua: "я чоловік", ru: "я мужчина", en: "I, male" },
                    form: "miałem",
                    example: {
                        sk: "Ja miałem czas.",
                        ua: "Я мав час.",
                        ru: "У меня было время.",
                        en: "I had time.",
                    },
                },
                {
                    emoji: "👩",
                    label: { sk: "ja kobieta", ua: "я жінка", ru: "я женщина", en: "I, female" },
                    form: "miałam",
                    example: {
                        sk: "Ja miałam pytanie.",
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
                        sk: "My mieliśmy pracę.",
                        ua: "Ми мали роботу.",
                        ru: "У нас была работа.",
                        en: "We had a job.",
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

export default function VerbsPastClient() {
    const { lang } = useLanguage();
    const { courseId } = useActiveCourse();

    const uiLang: Lang = lang === "ru" || lang === "en" ? lang : "ua";
    const ui = UI[uiLang];

    const grammarCourseId = normalizeCourse(courseId);
    const verbs = DATA[grammarCourseId];

    const [activeId, setActiveId] = useState(verbs[0].id);
    const [practiceIndex, setPracticeIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

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
                            {ui.formulaItems.map((item) => (
                                <div key={item} className="rounded-xl border bg-slate-50 px-4 py-3 text-slate-700">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-white p-5">
                        <div className="font-semibold">{ui.noteTitle}</div>

                        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                            {ui.noteItems.slice(0, 3).map((item) => (
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
                                <div className="mt-1 text-sm text-slate-500">{tr(row.example, uiLang)}</div>
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
                        {ui.noteItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}