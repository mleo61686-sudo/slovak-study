import type { Lang } from "@/lib/src/language";

export type LocalizedText = Partial<Record<Lang, string>>;

export type LetterRow = {
    value: string;
    label: LocalizedText;
    example: string;
};

export type AlphabetQuestion = {
    question: LocalizedText;
    options: string[];
    correct: string;
};

export const SK_VOWELS: LetterRow[] = [
    { value: "a", label: { ua: "а", ru: "а", en: "a" }, example: "auto" },
    {
        value: "á",
        label: { ua: "а (довга)", ru: "а (долгая)", en: "a (long)" },
        example: "máš",
    },
    {
        value: "ä",
        label: {
            ua: "переважно близько до е",
            ru: "чаще близко к э/е",
            en: "usually close to e",
        },
        example: "päť",
    },
    { value: "e", label: { ua: "е", ru: "е", en: "e" }, example: "mesto" },
    {
        value: "é",
        label: { ua: "е (довга)", ru: "е (долгая)", en: "e (long)" },
        example: "téma",
    },
    { value: "i", label: { ua: "і", ru: "и", en: "i" }, example: "list" },
    {
        value: "í",
        label: { ua: "і (довга)", ru: "и (долгая)", en: "i (long)" },
        example: "píše",
    },
    { value: "o", label: { ua: "о", ru: "о", en: "o" }, example: "dom" },
    {
        value: "ó",
        label: { ua: "о (довга)", ru: "о (долгая)", en: "o (long)" },
        example: "móda",
    },
    { value: "ô", label: { ua: "уо", ru: "уо", en: "uo" }, example: "stôl" },
    { value: "u", label: { ua: "у", ru: "у", en: "u" }, example: "ulica" },
    {
        value: "ú",
        label: { ua: "у (довга)", ru: "у (долгая)", en: "u (long)" },
        example: "dúfať",
    },
    { value: "y", label: { ua: "и", ru: "ы/и", en: "y" }, example: "syn" },
    {
        value: "ý",
        label: { ua: "и (довга)", ru: "ы/и (долгая)", en: "y (long)" },
        example: "býva",
    },
];

export const CS_VOWELS: LetterRow[] = [
    { value: "a", label: { ua: "а", ru: "а", en: "a" }, example: "auto" },
    {
        value: "á",
        label: { ua: "а (довга)", ru: "а (долгая)", en: "a (long)" },
        example: "mám",
    },
    { value: "e", label: { ua: "е", ru: "е", en: "e" }, example: "ten" },
    {
        value: "é",
        label: { ua: "е (довга)", ru: "е (долгая)", en: "e (long)" },
        example: "mléko",
    },
    { value: "i", label: { ua: "і", ru: "и", en: "i" }, example: "kino" },
    {
        value: "í",
        label: { ua: "і (довга)", ru: "и (долгая)", en: "i (long)" },
        example: "bílý",
    },
    { value: "o", label: { ua: "о", ru: "о", en: "o" }, example: "okno" },
    {
        value: "ó",
        label: { ua: "о (довга)", ru: "о (долгая)", en: "o (long)" },
        example: "móda",
    },
    { value: "u", label: { ua: "у", ru: "у", en: "u" }, example: "ulice" },
    {
        value: "ú",
        label: { ua: "у (довга)", ru: "у (долгая)", en: "u (long)" },
        example: "úkol",
    },
    {
        value: "ů",
        label: {
            ua: "у (довга, з кружечком)",
            ru: "у (долгая, с кружком)",
            en: "u (long, with ring)",
        },
        example: "dům",
    },
    { value: "y", label: { ua: "и", ru: "ы/и", en: "y" }, example: "syn" },
    {
        value: "ý",
        label: { ua: "и (довга)", ru: "ы/и (долгая)", en: "y (long)" },
        example: "dobrý",
    },
    {
        value: "ě",
        label: {
            ua: "е / пом’якшує попередній звук",
            ru: "е / смягчает предыдущий звук",
            en: "e / softens the previous sound",
        },
        example: "město",
    },
];

export const PL_VOWELS: LetterRow[] = [
    { value: "a", label: { ua: "а", ru: "а", en: "a" }, example: "auto" },
    {
        value: "ą",
        label: {
            ua: "носова голосна",
            ru: "носовая гласная",
            en: "nasal vowel",
        },
        example: "mąż",
    },
    { value: "e", label: { ua: "е", ru: "е", en: "e" }, example: "ser" },
    {
        value: "ę",
        label: {
            ua: "носова голосна",
            ru: "носовая гласная",
            en: "nasal vowel",
        },
        example: "język",
    },
    { value: "i", label: { ua: "і", ru: "и", en: "i" }, example: "igła" },
    { value: "o", label: { ua: "о", ru: "о", en: "o" }, example: "dom" },
    {
        value: "ó",
        label: { ua: "у", ru: "у", en: "u sound" },
        example: "góra",
    },
    { value: "u", label: { ua: "у", ru: "у", en: "u" }, example: "ulica" },
    { value: "y", label: { ua: "и", ru: "ы/и", en: "y" }, example: "syn" },
];

export const SK_CONSONANTS: LetterRow[] = [
    { value: "č", label: { ua: "ч", ru: "ч", en: "ch" }, example: "čaj" },
    { value: "š", label: { ua: "ш", ru: "ш", en: "sh" }, example: "škola" },
    { value: "ž", label: { ua: "ж", ru: "ж", en: "zh" }, example: "žena" },
    {
        value: "ď",
        label: { ua: "м’яке дь", ru: "мягкое дь", en: "soft d" },
        example: "ďakujem",
    },
    {
        value: "ť",
        label: { ua: "м’яке ть", ru: "мягкое ть", en: "soft t" },
        example: "ťa",
    },
    {
        value: "ň",
        label: { ua: "нь", ru: "нь", en: "soft n" },
        example: "ňho",
    },
    {
        value: "ľ",
        label: { ua: "ль", ru: "ль", en: "soft l" },
        example: "ľudia",
    },
    { value: "ch", label: { ua: "х", ru: "х", en: "kh / h" }, example: "chlieb" },
    { value: "dz", label: { ua: "дз", ru: "дз", en: "dz" }, example: "medzi" },
    { value: "dž", label: { ua: "дж", ru: "дж", en: "j / dzh" }, example: "džús" },
];

export const CS_CONSONANTS: LetterRow[] = [
    { value: "č", label: { ua: "ч", ru: "ч", en: "ch" }, example: "čaj" },
    { value: "š", label: { ua: "ш", ru: "ш", en: "sh" }, example: "škola" },
    { value: "ž", label: { ua: "ж", ru: "ж", en: "zh" }, example: "žena" },
    {
        value: "ď",
        label: { ua: "м’яке дь", ru: "мягкое дь", en: "soft d" },
        example: "ďábel",
    },
    {
        value: "ť",
        label: { ua: "м’яке ть", ru: "мягкое ть", en: "soft t" },
        example: "ťuknout",
    },
    {
        value: "ň",
        label: { ua: "нь", ru: "нь", en: "soft n" },
        example: "kůň",
    },
    {
        value: "ř",
        label: {
            ua: "особливий чеський звук",
            ru: "особый чешский звук",
            en: "special Czech sound",
        },
        example: "řeka",
    },
    { value: "ch", label: { ua: "х", ru: "х", en: "kh / h" }, example: "chléb" },
];

export const PL_CONSONANTS: LetterRow[] = [
    { value: "cz", label: { ua: "тверде ч", ru: "твёрдое ч", en: "hard ch" }, example: "czas" },
    { value: "sz", label: { ua: "тверде ш", ru: "твёрдое ш", en: "hard sh" }, example: "szkoła" },
    { value: "ż", label: { ua: "ж", ru: "ж", en: "zh" }, example: "żona" },
    { value: "rz", label: { ua: "часто як ж", ru: "часто как ж", en: "often zh" }, example: "rzeka" },
    { value: "ć", label: { ua: "м’яке ч", ru: "мягкое ч", en: "soft ch" }, example: "ćma" },
    { value: "ś", label: { ua: "м’яке ш", ru: "мягкое ш", en: "soft sh" }, example: "śniadanie" },
    { value: "ź", label: { ua: "м’яке ж/зь", ru: "мягкое ж/зь", en: "soft zh / z" }, example: "źle" },
    { value: "ń", label: { ua: "нь", ru: "нь", en: "soft n" }, example: "koń" },
    { value: "ł", label: { ua: "в / ў", ru: "в / ў", en: "w-like sound" }, example: "łódź" },
    { value: "ch", label: { ua: "х", ru: "х", en: "kh / h" }, example: "chleb" },
    { value: "dz", label: { ua: "дз", ru: "дз", en: "dz" }, example: "dzwon" },
    { value: "dź", label: { ua: "м’яке дзь", ru: "мягкое дзь", en: "soft dz" }, example: "dźwięk" },
    { value: "dż", label: { ua: "дж", ru: "дж", en: "j / dzh" }, example: "dżem" },
];

export const SK_PRACTICE_WORDS = [
    "práca",
    "škola",
    "človek",
    "život",
    "ďakujem",
    "chlieb",
    "mesto",
    "učiteľ",
];

export const CS_PRACTICE_WORDS = [
    "práce",
    "škola",
    "člověk",
    "život",
    "děkuju",
    "chléb",
    "město",
    "učitel",
];

export const PL_PRACTICE_WORDS = [
    "praca",
    "szkoła",
    "człowiek",
    "życie",
    "dziękuję",
    "chleb",
    "miasto",
    "nauczyciel",
];

export const SK_LETTER_QUESTIONS: AlphabetQuestion[] = [
    {
        question: {
            ua: "Обери букву для звука «ч»",
            ru: "Выбери букву для звука «ч»",
            en: 'Choose the letter for the sound "ch"',
        },
        options: ["č", "š", "ž", "ch"],
        correct: "č",
    },
    {
        question: {
            ua: "Обери букву для звука «ш»",
            ru: "Выбери букву для звука «ш»",
            en: 'Choose the letter for the sound "sh"',
        },
        options: ["č", "š", "ž", "dz"],
        correct: "š",
    },
    {
        question: {
            ua: "Обери букву для звука «ж»",
            ru: "Выбери букву для звука «ж»",
            en: 'Choose the letter for the sound "zh"',
        },
        options: ["ž", "š", "ď", "ť"],
        correct: "ž",
    },
    {
        question: {
            ua: "Як пишеться звук «х» у словацькій?",
            ru: "Как пишется звук «х» в словацком?",
            en: 'How is the "kh / h" sound written in Slovak?',
        },
        options: ["h", "ch", "x", "kh"],
        correct: "ch",
    },
    {
        question: {
            ua: "Обери сполучення для звука «дз»",
            ru: "Выбери сочетание для звука «дз»",
            en: 'Choose the combination for the sound "dz"',
        },
        options: ["dz", "dž", "ž", "z"],
        correct: "dz",
    },
    {
        question: {
            ua: "Обери сполучення для звука «дж»",
            ru: "Выбери сочетание для звука «дж»",
            en: 'Choose the combination for the sound "j / dzh"',
        },
        options: ["dz", "dž", "ď", "ž"],
        correct: "dž",
    },
];

export const CS_LETTER_QUESTIONS: AlphabetQuestion[] = [
    {
        question: {
            ua: "Обери букву для звука «ч»",
            ru: "Выбери букву для звука «ч»",
            en: 'Choose the letter for the sound "ch"',
        },
        options: ["č", "š", "ž", "ch"],
        correct: "č",
    },
    {
        question: {
            ua: "Обери букву для звука «ш»",
            ru: "Выбери букву для звука «ш»",
            en: 'Choose the letter for the sound "sh"',
        },
        options: ["č", "š", "ž", "ř"],
        correct: "š",
    },
    {
        question: {
            ua: "Обери букву для звука «ж»",
            ru: "Выбери букву для звука «ж»",
            en: 'Choose the letter for the sound "zh"',
        },
        options: ["ž", "š", "ď", "ť"],
        correct: "ž",
    },
    {
        question: {
            ua: "Як пишеться звук «х» у чеській?",
            ru: "Как пишется звук «х» в чешском?",
            en: 'How is the "kh / h" sound written in Czech?',
        },
        options: ["h", "ch", "x", "kh"],
        correct: "ch",
    },
    {
        question: {
            ua: "Яка літера є особливою для чеської мови?",
            ru: "Какая буква является особой для чешского языка?",
            en: "Which letter is special in Czech?",
        },
        options: ["ľ", "ř", "dz", "dž"],
        correct: "ř",
    },
    {
        question: {
            ua: "Яка літера часто впливає на попередній приголосний?",
            ru: "Какая буква часто влияет на предыдущую согласную?",
            en: "Which letter often affects the previous consonant?",
        },
        options: ["ě", "ô", "ä", "ľ"],
        correct: "ě",
    },
];

export const PL_LETTER_QUESTIONS: AlphabetQuestion[] = [
    {
        question: {
            ua: "Обери сполучення для твердого «ч»",
            ru: "Выбери сочетание для твёрдого «ч»",
            en: 'Choose the combination for hard "ch"',
        },
        options: ["cz", "ć", "sz", "ch"],
        correct: "cz",
    },
    {
        question: {
            ua: "Обери сполучення для твердого «ш»",
            ru: "Выбери сочетание для твёрдого «ш»",
            en: 'Choose the combination for hard "sh"',
        },
        options: ["cz", "sz", "ś", "ż"],
        correct: "sz",
    },
    {
        question: {
            ua: "Що часто звучить подібно до ż?",
            ru: "Что часто звучит похоже на ż?",
            en: "What often sounds similar to ż?",
        },
        options: ["rz", "sz", "ć", "ń"],
        correct: "rz",
    },
    {
        question: {
            ua: "Яка буква в польській часто звучить близько до «в/ў»?",
            ru: "Какая буква в польском часто звучит близко к «в/ў»?",
            en: "Which Polish letter often sounds close to English w?",
        },
        options: ["ł", "l", "ń", "ź"],
        correct: "ł",
    },
    {
        question: {
            ua: "Яка голосна є носовою?",
            ru: "Какая гласная является носовой?",
            en: "Which vowel is nasal?",
        },
        options: ["ą", "ó", "y", "u"],
        correct: "ą",
    },
    {
        question: {
            ua: "Як пишеться звук «х» у польській?",
            ru: "Как пишется звук «х» в польском?",
            en: 'How is the "kh / h" sound written in Polish?',
        },
        options: ["h", "ch", "x", "kh"],
        correct: "ch",
    },
];

export const UI: Record<string, LocalizedText> = {
    titleSk: {
        ua: "Словацький алфавіт і вимова 🔤",
        ru: "Словацкий алфавит и произношение 🔤",
        en: "Slovak alphabet and pronunciation 🔤",
    },
    titleCs: {
        ua: "Чеський алфавіт і вимова 🔤",
        ru: "Чешский алфавит и произношение 🔤",
        en: "Czech alphabet and pronunciation 🔤",
    },
    titlePl: {
        ua: "Польський алфавіт і вимова 🔤",
        ru: "Польский алфавит и произношение 🔤",
        en: "Polish alphabet and pronunciation 🔤",
    },
    introSk: {
        ua: "Словацька мова використовує латиницю з діакритикою. Наголос майже завжди на першому складі.",
        ru: "Словацкий язык использует латиницу с диакритикой. Ударение почти всегда на первом слоге.",
        en: "Slovak uses the Latin alphabet with diacritics. Stress is almost always on the first syllable.",
    },
    introCs: {
        ua: "Чеська мова використовує латиницю з діакритикою. Наголос майже завжди на першому складі.",
        ru: "Чешский язык использует латиницу с диакритикой. Ударение почти всегда на первом слоге.",
        en: "Czech uses the Latin alphabet with diacritics. Stress is almost always on the first syllable.",
    },
    introPl: {
        ua: "Польська мова використовує латиницю з діакритикою. Наголос у більшості слів падає на передостанній склад.",
        ru: "Польский язык использует латиницу с диакритикой. Ударение в большинстве слов падает на предпоследний слог.",
        en: "Polish uses the Latin alphabet with diacritics. In most words, stress falls on the penultimate syllable.",
    },
    section1: { ua: "1) Алфавіт", ru: "1) Алфавит", en: "1) Alphabet" },
    section2: { ua: "2) Голосні", ru: "2) Гласные", en: "2) Vowels" },
    section3: {
        ua: "3) Особливі приголосні",
        ru: "3) Особые согласные",
        en: "3) Special consonants",
    },
    section4: { ua: "4) Наголос", ru: "4) Ударение", en: "4) Stress" },
    section5: {
        ua: "5) Тренування вимови 🧠",
        ru: "5) Тренировка произношения 🧠",
        en: "5) Pronunciation practice 🧠",
    },
    section6: {
        ua: "6) Міні-тренажер 🔥",
        ru: "6) Мини-тренажёр 🔥",
        en: "6) Mini trainer 🔥",
    },
    example: { ua: "Приклад:", ru: "Пример:", en: "Example:" },
    stressSk: {
        ua: "У словацькій мові наголос майже завжди на першому складі:",
        ru: "В словацком языке ударение почти всегда на первом слоге:",
        en: "In Slovak, stress is almost always on the first syllable:",
    },
    stressCs: {
        ua: "У чеській мові наголос майже завжди на першому складі:",
        ru: "В чешском языке ударение почти всегда на первом слоге:",
        en: "In Czech, stress is almost always on the first syllable:",
    },
    stressPl: {
        ua: "У польській мові наголос у більшості слів падає на передостанній склад:",
        ru: "В польском языке ударение в большинстве слов падает на предпоследний слог:",
        en: "In Polish, stress in most words falls on the penultimate syllable:",
    },
    miniIntro: {
        ua: "Тут можна потренуватись: тести, слухання і диктант.",
        ru: "Здесь можно потренироваться: тесты, слушание и диктант.",
        en: "Here you can practise: quiz, listening, and dictation.",
    },
    quiz: { ua: "Тест", ru: "Тест", en: "Quiz" },
    listen: { ua: "Слухання", ru: "Слушание", en: "Listening" },
    type: { ua: "Диктант", ru: "Диктант", en: "Dictation" },
    question: { ua: "Питання", ru: "Вопрос", en: "Question" },
    round: { ua: "Раунд", ru: "Раунд", en: "Round" },
    score: { ua: "Рахунок", ru: "Счёт", en: "Score" },
    word: { ua: "Слово", ru: "Слово", en: "Word" },
    restart: { ua: "Почати заново", ru: "Начать заново", en: "Start over" },
    done: { ua: "Готово! 🎉", ru: "Готово! 🎉", en: "Done! 🎉" },
    result: { ua: "Результат", ru: "Результат", en: "Result" },
    retry: { ua: "Пройти ще раз", ru: "Пройти ещё раз", en: "Try again" },
    listenPrompt: {
        ua: "Знайди слово з літерою:",
        ru: "Найди слово с буквой:",
        en: "Find the word with the letter:",
    },
    dictationPrompt: {
        ua: "Прослухай і напиши слово:",
        ru: "Прослушай и напиши слово:",
        en: "Listen and type the word:",
    },
    inputPlaceholder: {
        ua: "Введи слово...",
        ru: "Введи слово...",
        en: "Type the word...",
    },
    check: { ua: "Перевірити", ru: "Проверить", en: "Check" },
    correct: { ua: "Правильно!", ru: "Правильно!", en: "Correct!" },
    wrongPrefix: {
        ua: "Неправильно. Правильно:",
        ru: "Неправильно. Правильно:",
        en: "Incorrect. Correct answer:",
    },
    next: { ua: "Далі →", ru: "Далее →", en: "Next →" },
    tryAgain: { ua: "Спробувати знову", ru: "Попробовать снова", en: "Try again" },
};