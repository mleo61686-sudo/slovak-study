"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type Section = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

type Content = {
  title: string;
  intro: string[];
  sections: Section[];
  nextLabel: string;
  nextLinks: { href: string; label: string }[];
  outro: string;
};

type CourseContent = Record<"sk" | "cs" | "pl", Content>;

const CONTENT: Record<Lang, CourseContent> = {
  ua: {
    sk: {
      title: "Словацький алфавіт: повний гід з вимови",
      intro: [
        "Словацький алфавіт — це основа вивчення словацької мови. Якщо ти хочеш правильно читати, говорити та розуміти словацьку, потрібно знати літери, правила вимови та наголос.",
        "На цій сторінці ти знайдеш пояснення букв словацького алфавіту, особливості діакритики, правила читання, приклади та практичний тренажер.",
      ],
      sections: [
        {
          heading: "Скільки букв у словацькому алфавіті",
          body: [
            "Словацька мова використовує латиницю з діакритичними знаками. Окрім стандартних букв (a, b, c, d...), існують спеціальні літери: á, ä, č, ď, é, í, ľ, ň, ó, ô, š, ť, ú, ý, ž.",
            "Довгі голосні позначаються рискою над літерою (á, é, í, ó, ú, ý). Вони вимовляються довше, ніж короткі голосні.",
          ],
        },
        {
          heading: "Діакритика в словацькій мові",
          bullets: [
            "č — як українське «ч»",
            "š — як «ш»",
            "ž — як «ж»",
            "ď, ť, ň — м’які приголосні",
            "ľ — м’яке «ль»",
            "ô — вимовляється як «уо»",
          ],
          body: [
            "Ці літери часто викликають труднощі у початківців, але після кількох вправ вимова стає природною.",
          ],
        },
        {
          heading: "Сполучення CH, DZ, DŽ",
          body: ["У словацькій мові існують особливі сполучення букв:"],
          bullets: [
            "ch — вимовляється як «х» (chlieb)",
            "dz — як «дз» (medzi)",
            "dž — як «дж» (džús)",
          ],
        },
        {
          heading: "Наголос у словацькій мові",
          body: [
            "У словацькій мові наголос майже завжди падає на перший склад. Наприклад: PRÁ-ca, ŠKO-la, DO-mo-v.",
            "Це правило значно спрощує навчання, адже не потрібно запам’ятовувати наголос для кожного слова окремо.",
          ],
        },
        {
          heading: "Типові помилки українців",
          bullets: [
            "Плутання i та y у письмі",
            "Ігнорування довготи голосних",
            "Неправильна вимова ch",
            "Змішування č і c",
          ],
        },
      ],
      nextLabel: "Що вивчати після алфавіту",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Дієслова теперішнього часу" },
        { href: "/grammar/cases", label: "Відмінки в словацькій мові" },
      ],
      outro:
        "Нижче на сторінці ти можеш пройти вправи, послухати вимову та закріпити знання на практиці.",
    },
    cs: {
      title: "Чеський алфавіт: повний гід з вимови",
      intro: [
        "Чеський алфавіт — це основа вивчення чеської мови. Якщо ти хочеш правильно читати, говорити та розуміти чеську, потрібно знати літери, правила вимови та наголос.",
        "На цій сторінці ти знайдеш пояснення букв чеського алфавіту, особливості діакритики, правила читання, приклади та практичний тренажер.",
      ],
      sections: [
        {
          heading: "Скільки букв у чеському алфавіті",
          body: [
            "Чеська мова використовує латиницю з діакритичними знаками. Окрім стандартних букв, є спеціальні літери: á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž.",
            "Довгі голосні позначаються рискою над літерою або кружечком у букві ů. Вони вимовляються довше, ніж короткі голосні.",
          ],
        },
        {
          heading: "Діакритика в чеській мові",
          bullets: [
            "č — як українське «ч»",
            "š — як «ш»",
            "ž — як «ж»",
            "ď, ť, ň — м’які приголосні",
            "ř — особливий чеський звук між «р» і «ж»",
            "ě — пом’якшує попередній приголосний",
          ],
          body: [
            "Саме літери ř, ě і ů найчастіше викликають труднощі у початківців.",
          ],
        },
        {
          heading: "Сполучення CH",
          body: ["У чеській мові є особливе сполучення букв:"],
          bullets: ["ch — вимовляється як «х» (chléb)"],
        },
        {
          heading: "Наголос у чеській мові",
          body: [
            "У чеській мові наголос майже завжди падає на перший склад. Наприклад: PRA-ha, ČES-ko, DO-mov.",
            "Це правило теж сильно спрощує навчання, бо наголос у більшості слів передбачуваний.",
          ],
        },
        {
          heading: "Типові помилки українців",
          bullets: [
            "Плутання í / y / ý",
            "Ігнорування різниці між ú та ů",
            "Складна вимова ř",
            "Неправильне читання ě",
          ],
        },
      ],
      nextLabel: "Що вивчати після алфавіту",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Дієслова теперішнього часу" },
        { href: "/grammar/cases", label: "Відмінки в чеській мові" },
      ],
      outro:
        "Нижче на сторінці ти можеш пройти вправи, послухати вимову та закріпити знання на практиці.",
    },
    pl: {
      title: "Польський алфавіт: повний гід з вимови",
      intro: [
        "Польський алфавіт — це основа вивчення польської мови. Якщо ти хочеш правильно читати, говорити та розуміти польську, потрібно знати літери, правила вимови та наголос.",
        "На цій сторінці ти знайдеш пояснення букв польського алфавіту, особливості діакритики, правила читання, приклади та практичний тренажер.",
      ],
      sections: [
        {
          heading: "Скільки букв у польському алфавіті",
          body: [
            "Польська мова використовує латиницю з діакритичними знаками. Окрім стандартних букв, є спеціальні літери: ą, ć, ę, ł, ń, ó, ś, ź, ż, а також характерні сполучення cz, sz, rz, ch.",
            "У польській мові важливу роль відіграють носові голосні ą та ę, а також літера ł, яка часто звучить як «в».",
          ],
        },
        {
          heading: "Діакритика в польській мові",
          bullets: [
            "ą — носовий звук",
            "ę — носовий звук",
            "ć, ś, ń, ź — м’які приголосні",
            "ł — звучить подібно до «в»",
            "ó — зазвичай звучить як «у»",
            "ż / rz — часто передають звук «ж»",
          ],
          body: [
            "Саме ці літери й сполучення найчастіше викликають труднощі у початківців.",
          ],
        },
        {
          heading: "Сполучення CZ, SZ, RZ, CH",
          body: ["У польській мові є дуже важливі сполучення букв:"],
          bullets: [
            "cz — вимовляється як «ч» (czas)",
            "sz — як «ш» (szkoła)",
            "rz — часто як «ж» (rzeka)",
            "ch — як «х» (chleb)",
          ],
        },
        {
          heading: "Наголос у польській мові",
          body: [
            "У польській мові наголос у більшості слів падає на передостанній склад. Наприклад: wa-KA-cje, ko-BIE-ta, nau-CZY-ciel.",
            "Це важлива відмінність від словацької та чеської мов, де наголос зазвичай стоїть на першому складі.",
          ],
        },
        {
          heading: "Типові помилки українців",
          bullets: [
            "Плутання sz і ś",
            "Плутання cz і ć",
            "Неправильне читання ł",
            "Ігнорування носових голосних ą та ę",
          ],
        },
      ],
      nextLabel: "Що вивчати після алфавіту",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Дієслова теперішнього часу" },
        { href: "/grammar/cases", label: "Відмінки в польській мові" },
      ],
      outro:
        "Нижче на сторінці ти можеш пройти вправи, послухати вимову та закріпити знання на практиці.",
    },
  },

  ru: {
    sk: {
      title: "Словацкий алфавит: полный гид по произношению",
      intro: [
        "Словацкий алфавит — основа изучения словацкого языка. Если ты хочешь правильно читать, говорить и понимать словацкий, нужно знать буквы, правила произношения и ударение.",
        "На этой странице ты найдёшь объяснение букв словацкого алфавита, особенности диакритики, правила чтения, примеры и практический тренажёр.",
      ],
      sections: [
        {
          heading: "Сколько букв в словацком алфавите",
          body: [
            "Словацкий язык использует латиницу с диакритическими знаками. Кроме стандартных букв (a, b, c, d...), есть специальные буквы: á, ä, č, ď, é, í, ľ, ň, ó, ô, š, ť, ú, ý, ž.",
            "Долгие гласные обозначаются чертой над буквой (á, é, í, ó, ú, ý). Они произносятся дольше, чем краткие гласные.",
          ],
        },
        {
          heading: "Диакритика в словацком языке",
          bullets: [
            "č — как «ч»",
            "š — как «ш»",
            "ž — как «ж»",
            "ď, ť, ň — мягкие согласные",
            "ľ — мягкое «ль»",
            "ô — произносится как «уо»",
          ],
          body: [
            "Эти буквы часто вызывают трудности у начинающих, но после нескольких упражнений произношение становится естественным.",
          ],
        },
        {
          heading: "Сочетания CH, DZ, DŽ",
          body: ["В словацком языке есть особые сочетания букв:"],
          bullets: [
            "ch — произносится как «х» (chlieb)",
            "dz — как «дз» (medzi)",
            "dž — как «дж» (džús)",
          ],
        },
        {
          heading: "Ударение в словацком языке",
          body: [
            "В словацком языке ударение почти всегда падает на первый слог. Например: PRÁ-ca, ŠKO-la, DO-mo-v.",
            "Это правило сильно упрощает обучение: не нужно запоминать ударение для каждого слова отдельно.",
          ],
        },
        {
          heading: "Типичные ошибки",
          bullets: [
            "Путаница i и y на письме",
            "Игнорирование долготы гласных",
            "Неправильное произношение ch",
            "Смешивание č и c",
          ],
        },
      ],
      nextLabel: "Что учить после алфавита",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Глаголы настоящего времени" },
        { href: "/grammar/cases", label: "Падежи в словацком языке" },
        { href: "/learning/a0", label: "Уровень A0 — базовые слова" },
      ],
      outro:
        "Ниже на странице ты можешь пройти упражнения, послушать произношение и закрепить знания на практике.",
    },
    cs: {
      title: "Чешский алфавит: полный гид по произношению",
      intro: [
        "Чешский алфавит — основа изучения чешского языка. Если ты хочешь правильно читать, говорить и понимать чешский, нужно знать буквы, правила произношения и ударение.",
        "На этой странице ты найдёшь объяснение букв чешского алфавита, особенности диакритики, правила чтения, примеры и практический тренажёр.",
      ],
      sections: [
        {
          heading: "Сколько букв в чешском алфавите",
          body: [
            "Чешский язык использует латиницу с диакритическими знаками. Кроме стандартных букв, есть специальные: á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž.",
            "Долгие гласные обозначаются чертой над буквой или кружком в букве ů. Они произносятся дольше, чем краткие гласные.",
          ],
        },
        {
          heading: "Диакритика в чешском языке",
          bullets: [
            "č — как «ч»",
            "š — как «ш»",
            "ž — как «ж»",
            "ď, ť, ň — мягкие согласные",
            "ř — особый чешский звук",
            "ě — смягчает предыдущую согласную",
          ],
          body: [
            "Именно буквы ř, ě и ů чаще всего вызывают трудности у начинающих.",
          ],
        },
        {
          heading: "Сочетание CH",
          body: ["В чешском языке есть особое сочетание букв:"],
          bullets: ["ch — произносится как «х» (chléb)"],
        },
        {
          heading: "Ударение в чешском языке",
          body: [
            "В чешском языке ударение почти всегда падает на первый слог. Например: PRA-ha, ČES-ko, DO-mov.",
            "Это правило тоже сильно упрощает обучение.",
          ],
        },
        {
          heading: "Типичные ошибки",
          bullets: [
            "Путаница í / y / ý",
            "Игнорирование различия между ú и ů",
            "Сложное произношение ř",
            "Неправильное чтение ě",
          ],
        },
      ],
      nextLabel: "Что учить после алфавита",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Глаголы настоящего времени" },
        { href: "/grammar/cases", label: "Падежи в чешском языке" },
      ],
      outro:
        "Ниже на странице ты можешь пройти упражнения, послушать произношение и закрепить знания на практике.",
    },
    pl: {
      title: "Польский алфавит: полный гид по произношению",
      intro: [
        "Польский алфавит — основа изучения польского языка. Если ты хочешь правильно читать, говорить и понимать польский, нужно знать буквы, правила произношения и ударение.",
        "На этой странице ты найдёшь объяснение букв польского алфавита, особенности диакритики, правила чтения, примеры и практический тренажёр.",
      ],
      sections: [
        {
          heading: "Сколько букв в польском алфавите",
          body: [
            "Польский язык использует латиницу с диакритическими знаками. Кроме стандартных букв, есть специальные: ą, ć, ę, ł, ń, ó, ś, ź, ż, а также характерные сочетания cz, sz, rz, ch.",
            "В польском языке важную роль играют носовые гласные ą и ę, а также буква ł, которая часто звучит как «в».",
          ],
        },
        {
          heading: "Диакритика в польском языке",
          bullets: [
            "ą — носовой звук",
            "ę — носовой звук",
            "ć, ś, ń, ź — мягкие согласные",
            "ł — часто звучит как «в»",
            "ó — обычно звучит как «у»",
            "ż / rz — часто передают звук «ж»",
          ],
          body: [
            "Именно эти буквы и сочетания чаще всего вызывают трудности у начинающих.",
          ],
        },
        {
          heading: "Сочетания CZ, SZ, RZ, CH",
          body: ["В польском языке есть очень важные сочетания букв:"],
          bullets: [
            "cz — произносится как «ч» (czas)",
            "sz — как «ш» (szkoła)",
            "rz — часто как «ж» (rzeka)",
            "ch — как «х» (chleb)",
          ],
        },
        {
          heading: "Ударение в польском языке",
          body: [
            "В польском языке ударение в большинстве слов падает на предпоследний слог. Например: wa-KA-cje, ko-BIE-ta, nau-CZY-ciel.",
            "Это важное отличие от словацкого и чешского языков, где ударение обычно стоит на первом слоге.",
          ],
        },
        {
          heading: "Типичные ошибки",
          bullets: [
            "Путаница sz и ś",
            "Путаница cz и ć",
            "Неправильное чтение ł",
            "Игнорирование носовых гласных ą и ę",
          ],
        },
      ],
      nextLabel: "Что учить после алфавита",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Глаголы настоящего времени" },
        { href: "/grammar/cases", label: "Падежи в польском языке" },
      ],
      outro:
        "Ниже на странице ты можешь пройти упражнения, послушать произношение и закрепить знания на практике.",
    },
  },

  en: {
    sk: {
      title: "Slovak alphabet: complete pronunciation guide",
      intro: [
        "The Slovak alphabet is the foundation of learning Slovak. If you want to read, speak, and understand Slovak correctly, you need to know the letters, pronunciation rules, and stress.",
        "On this page, you will find an explanation of Slovak alphabet letters, diacritics, reading rules, examples, and practical exercises.",
      ],
      sections: [
        {
          heading: "How many letters are in the Slovak alphabet",
          body: [
            "Slovak uses the Latin alphabet with diacritical marks. In addition to standard letters (a, b, c, d...), there are special letters: á, ä, č, ď, é, í, ľ, ň, ó, ô, š, ť, ú, ý, ž.",
            "Long vowels are marked with an accent above the letter (á, é, í, ó, ú, ý). They are pronounced longer than short vowels.",
          ],
        },
        {
          heading: "Diacritics in Slovak",
          bullets: [
            "č — pronounced like “ch” in “chair”",
            "š — pronounced like “sh”",
            "ž — pronounced like “s” in “measure”",
            "ď, ť, ň — soft consonants",
            "ľ — soft “l” sound",
            "ô — pronounced like “uo”",
          ],
          body: [
            "These letters often cause difficulties for beginners, but after a few exercises their pronunciation becomes natural.",
          ],
        },
        {
          heading: "Letter combinations CH, DZ, DŽ",
          body: ["In Slovak, there are several special letter combinations:"],
          bullets: [
            "ch — pronounced like “h”/“kh” (chlieb)",
            "dz — pronounced like “dz” (medzi)",
            "dž — pronounced like “j” in “jungle” (džús)",
          ],
        },
        {
          heading: "Stress in Slovak",
          body: [
            "In Slovak, stress almost always falls on the first syllable. For example: PRÁ-ca, ŠKO-la, DO-mo-v.",
            "This rule makes learning much easier because you do not need to memorize stress for every word separately.",
          ],
        },
        {
          heading: "Typical mistakes learners make",
          bullets: [
            "Confusing i and y in spelling",
            "Ignoring vowel length",
            "Mispronouncing ch",
            "Mixing up č and c",
          ],
        },
      ],
      nextLabel: "What to study after the alphabet",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Present tense verbs" },
        { href: "/grammar/cases", label: "Cases in Slovak" },
      ],
      outro:
        "Below on this page, you can complete exercises, listen to pronunciation, and reinforce what you have learned in practice.",
    },
    cs: {
      title: "Czech alphabet: complete pronunciation guide",
      intro: [
        "The Czech alphabet is the foundation of learning Czech. If you want to read, speak, and understand Czech correctly, you need to know the letters, pronunciation rules, and stress.",
        "On this page, you will find an explanation of Czech alphabet letters, diacritics, reading rules, examples, and practical exercises.",
      ],
      sections: [
        {
          heading: "How many letters are in the Czech alphabet",
          body: [
            "Czech uses the Latin alphabet with diacritical marks. In addition to standard letters, there are special letters: á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž.",
            "Long vowels are marked with an accent above the letter or with a ring in the letter ů. They are pronounced longer than short vowels.",
          ],
        },
        {
          heading: "Diacritics in Czech",
          bullets: [
            "č — pronounced like “ch” in “chair”",
            "š — pronounced like “sh”",
            "ž — pronounced like “s” in “measure”",
            "ď, ť, ň — soft consonants",
            "ř — a special Czech sound between “r” and “zh”",
            "ě — softens the preceding consonant",
          ],
          body: [
            "The letters ř, ě, and ů are the ones that most often cause difficulties for beginners.",
          ],
        },
        {
          heading: "The CH combination",
          body: ["In Czech, there is a special letter combination:"],
          bullets: ["ch — pronounced like “h”/“kh” (chléb)"],
        },
        {
          heading: "Stress in Czech",
          body: [
            "In Czech, stress almost always falls on the first syllable. For example: PRA-ha, ČES-ko, DO-mov.",
            "This rule also makes learning easier because stress is predictable in most words.",
          ],
        },
        {
          heading: "Typical mistakes learners make",
          bullets: [
            "Confusing í / y / ý",
            "Ignoring the difference between ú and ů",
            "Difficulty pronouncing ř",
            "Reading ě incorrectly",
          ],
        },
      ],
      nextLabel: "What to study after the alphabet",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Present tense verbs" },
        { href: "/grammar/cases", label: "Cases in Czech" },
      ],
      outro:
        "Below on this page, you can complete exercises, listen to pronunciation, and reinforce what you have learned in practice.",
    },
    pl: {
      title: "Polish alphabet: complete pronunciation guide",
      intro: [
        "The Polish alphabet is the foundation of learning Polish. If you want to read, speak, and understand Polish correctly, you need to know the letters, pronunciation rules, and stress.",
        "On this page, you will find an explanation of Polish alphabet letters, diacritics, reading rules, examples, and practical exercises.",
      ],
      sections: [
        {
          heading: "How many letters are in the Polish alphabet",
          body: [
            "Polish uses the Latin alphabet with diacritical marks. In addition to standard letters, there are special letters: ą, ć, ę, ł, ń, ó, ś, ź, ż, as well as characteristic combinations cz, sz, rz, ch.",
            "In Polish, nasal vowels ą and ę play an important role, as well as the letter ł, which often sounds like “w”.",
          ],
        },
        {
          heading: "Diacritics in Polish",
          bullets: [
            "ą — nasal sound",
            "ę — nasal sound",
            "ć, ś, ń, ź — soft consonants",
            "ł — often sounds like “w”",
            "ó — usually sounds like “u”",
            "ż / rz — often represent a “zh” sound",
          ],
          body: [
            "These letters and combinations are the ones that most often cause difficulties for beginners.",
          ],
        },
        {
          heading: "Combinations CZ, SZ, RZ, CH",
          body: ["In Polish, there are several very important letter combinations:"],
          bullets: [
            "cz — pronounced like “ch” (czas)",
            "sz — like “sh” (szkoła)",
            "rz — often like “zh” (rzeka)",
            "ch — like “kh”/“h” (chleb)",
          ],
        },
        {
          heading: "Stress in Polish",
          body: [
            "In Polish, stress in most words falls on the penultimate syllable. For example: wa-KA-cje, ko-BIE-ta, nau-CZY-ciel.",
            "This is an important difference from Slovak and Czech, where stress is usually on the first syllable.",
          ],
        },
        {
          heading: "Typical mistakes learners make",
          bullets: [
            "Confusing sz and ś",
            "Confusing cz and ć",
            "Reading ł incorrectly",
            "Ignoring nasal vowels ą and ę",
          ],
        },
      ],
      nextLabel: "What to study after the alphabet",
      nextLinks: [
        { href: "/grammar/verbs-present", label: "Present tense verbs" },
        { href: "/grammar/cases", label: "Cases in Polish" },
      ],
      outro:
        "Below on this page, you can complete exercises, listen to pronunciation, and reinforce what you have learned in practice.",
    },
  },
};

function SectionBlock({ section }: { section: Section }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{section.heading}</h3>

      {section.body?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {section.bullets ? (
        <ul className="list-disc space-y-2 pl-6">
          {section.bullets.map((item) => (
            <li key={item}>
              <b>{item.split(" — ")[0]}</b>
              {item.includes(" — ")
                ? ` — ${item.split(" — ").slice(1).join(" — ")}`
                : ""}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function AlphabetSeo() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const safeLang: Lang = lang === "ru" || lang === "en" ? lang : "ua";
  const course: "sk" | "cs" | "pl" =
    courseId === "cs" ? "cs" : courseId === "pl" ? "pl" : "sk";
  const content = CONTENT[safeLang][course];

  return (
    <section className="space-y-10 text-slate-800">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold">{content.title}</h2>

        {content.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {content.sections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{content.nextLabel}</h3>

        <ul className="list-disc space-y-2 pl-6">
          {content.nextLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p>{content.outro}</p>
      </div>
    </section>
  );
}