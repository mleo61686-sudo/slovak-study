import type { Metadata } from "next";
import LocalizedVocabularyGuide, { type GuideData } from "@/app/components/LocalizedVocabularyGuide";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Польские слова с переводом на русский: словарь для начинающих | Flunio",
  description: "Практические польские слова с примерами: магазин, работа, транспорт, вежливое общение. Смотрите не только перевод, но и живую короткую фразу.",
  alternates: {
    canonical: `${SITE_URL}/ru/polish-vocabulary`,
    languages: {
      uk: `${SITE_URL}/polski-slova-z-perekladom`,
      ru: `${SITE_URL}/ru/polish-vocabulary`,
      en: `${SITE_URL}/polish-vocabulary`,
      "x-default": `${SITE_URL}/polish-vocabulary`,
    },
  },
  openGraph: {
    title: "Польские слова с переводом на русский: словарь для начинающих",
    description: "Практические польские слова с примерами: магазин, работа, транспорт, вежливое общение. Смотрите не только перевод, но и живую короткую фразу.",
    url: `${SITE_URL}/ru/polish-vocabulary`,
    siteName: "Flunio",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const data: GuideData = {
  "lang": "ru",
  "courseLang": "pl",
  "eyebrow": "Польский язык • слова с переводом",
  "title": "Польские слова с переводом на русский: словарь для начинающих",
  "lead": "Практические польские слова с примерами: магазин, работа, транспорт, вежливое общение. Смотрите не только перевод, но и живую короткую фразу.",
  "introduction": "Польские слова иногда кажутся русскоговорящим знакомыми, но похожее написание может обмануть. Начните с выражений, которые пригодятся в первый день, и учите слова вместе с предложениями. Ниже — компактный тематический словарь, а не случайная подборка.",
  "courseHref": "/ru/learn-polish",
  "languageUrls": {
    "uk": "/polski-slova-z-perekladom",
    "ru": "/ru/polish-vocabulary",
    "en": "/polish-vocabulary"
  },
  "topics": [
    {
      "heading": "Приветствия и вежливость",
      "context": "Основные выражения для знакомства, магазина, работы и разговора с незнакомым человеком.",
      "words": [
        {
          "word": "Dzień dobry",
          "translation": "Здравствуйте / добрый день",
          "example": "Dzień dobry, czy mogę zapytać?",
          "exampleTranslation": "Добрый день, можно спросить?"
        },
        {
          "word": "Cześć",
          "translation": "Привет",
          "example": "Cześć, jak się masz?",
          "exampleTranslation": "Привет, как дела?"
        },
        {
          "word": "Dziękuję",
          "translation": "Спасибо",
          "example": "Dziękuję bardzo.",
          "exampleTranslation": "Большое спасибо."
        },
        {
          "word": "Proszę",
          "translation": "Пожалуйста / прошу",
          "example": "Proszę, tędy.",
          "exampleTranslation": "Прошу, сюда."
        },
        {
          "word": "Przepraszam",
          "translation": "Извините",
          "example": "Przepraszam, nie rozumiem.",
          "exampleTranslation": "Извините, я не понимаю."
        },
        {
          "word": "Do widzenia",
          "translation": "До свидания",
          "example": "Do widzenia, miłego dnia!",
          "exampleTranslation": "До свидания, хорошего дня!"
        }
      ]
    },
    {
      "heading": "Магазин и покупки",
      "context": "Короткие слова для покупок, оплаты и разговора у кассы.",
      "words": [
        {
          "word": "sklep",
          "translation": "магазин",
          "example": "Gdzie jest sklep?",
          "exampleTranslation": "Где магазин?"
        },
        {
          "word": "chleb",
          "translation": "хлеб",
          "example": "Poproszę chleb.",
          "exampleTranslation": "Мне хлеб, пожалуйста."
        },
        {
          "word": "mleko",
          "translation": "молоко",
          "example": "Kupuję mleko.",
          "exampleTranslation": "Покупаю молоко."
        },
        {
          "word": "cena",
          "translation": "цена",
          "example": "Jaka jest cena?",
          "exampleTranslation": "Какая цена?"
        },
        {
          "word": "paragon",
          "translation": "чек",
          "example": "Poproszę paragon.",
          "exampleTranslation": "Чек, пожалуйста."
        },
        {
          "word": "karta",
          "translation": "карта",
          "example": "Zapłacę kartą.",
          "exampleTranslation": "Оплачу картой."
        }
      ]
    },
    {
      "heading": "Работа и документы",
      "context": "Выражения для смен, разговора с руководителем и оформления документов.",
      "words": [
        {
          "word": "praca",
          "translation": "работа",
          "example": "Szukam pracy.",
          "exampleTranslation": "Я ищу работу."
        },
        {
          "word": "zmiana",
          "translation": "смена",
          "example": "Mam dziś zmianę.",
          "exampleTranslation": "У меня сегодня смена."
        },
        {
          "word": "przerwa",
          "translation": "перерыв",
          "example": "Kiedy jest przerwa?",
          "exampleTranslation": "Когда перерыв?"
        },
        {
          "word": "umowa",
          "translation": "договор",
          "example": "Podpisuję umowę.",
          "exampleTranslation": "Подписываю договор."
        },
        {
          "word": "kierownik",
          "translation": "руководитель",
          "example": "Kierownik jest tutaj.",
          "exampleTranslation": "Руководитель здесь."
        },
        {
          "word": "podpis",
          "translation": "подпись",
          "example": "Potrzebny jest podpis.",
          "exampleTranslation": "Нужна подпись."
        }
      ]
    },
    {
      "heading": "Транспорт и город",
      "context": "Слова, которые помогут разобраться с билетами и дорогой.",
      "words": [
        {
          "word": "przystanek",
          "translation": "остановка",
          "example": "Przystanek jest blisko.",
          "exampleTranslation": "Остановка близко."
        },
        {
          "word": "bilet",
          "translation": "билет",
          "example": "Gdzie kupię bilet?",
          "exampleTranslation": "Где я куплю билет?"
        },
        {
          "word": "pociąg",
          "translation": "поезд",
          "example": "Pociąg odjeżdża o ósmej.",
          "exampleTranslation": "Поезд отправляется в восемь."
        },
        {
          "word": "dworzec",
          "translation": "вокзал",
          "example": "Idę na dworzec.",
          "exampleTranslation": "Я иду на вокзал."
        },
        {
          "word": "prawo",
          "translation": "право",
          "example": "Skręć w prawo.",
          "exampleTranslation": "Поверни направо."
        },
        {
          "word": "prosto",
          "translation": "прямо",
          "example": "Idź prosto.",
          "exampleTranslation": "Иди прямо."
        }
      ]
    }
  ],
  "phrases": [
    {
      "phrase": "Nie rozumiem.",
      "translation": "Я не понимаю.",
      "usage": "Если собеседник говорит слишком быстро."
    },
    {
      "phrase": "Proszę mówić wolniej.",
      "translation": "Говорите, пожалуйста, медленнее.",
      "usage": "В разговоре с незнакомым человеком."
    },
    {
      "phrase": "Ile to kosztuje?",
      "translation": "Сколько это стоит?",
      "usage": "В магазине."
    },
    {
      "phrase": "Czy mogę zapłacić kartą?",
      "translation": "Могу оплатить картой?",
      "usage": "У кассы."
    },
    {
      "phrase": "Gdzie jest przystanek?",
      "translation": "Где остановка?",
      "usage": "Когда ищете транспорт."
    },
    {
      "phrase": "Potrzebuję pomocy.",
      "translation": "Мне нужна помощь.",
      "usage": "В учреждении или на улице."
    }
  ],
  "notes": [
    {
      "title": "Zapomnieć — значит забыть",
      "explanation": "Польский глагол zapomnieć означает «забыть», а не русское «запомнить». Это частая ловушка для русскоговорящих."
    },
    {
      "title": "Uroda — это красота",
      "explanation": "Польское uroda означает «красота, внешность», а не русское «урод». Не угадывайте перевод по звучанию."
    },
    {
      "title": "Ł не равно русскому л",
      "explanation": "Стандартное польское ł по звучанию напоминает английское w. Например, słowo не стоит читать по-русски «слово»."
    },
    {
      "title": "Sz, cz, rz и ż",
      "explanation": "Эти сочетания и буквы требуют отдельной тренировки произношения. Лучше слушать примеры, а не переносить русские правила чтения."
    }
  ],
  "faqs": [
    {
      "q": "Какие польские слова нужны начинающему?",
      "a": "Сначала выучите приветствия, базовые вопросы, слова для покупок, дороги, работы и самые частые глаголы."
    },
    {
      "q": "Можно ли учить польский по русской транскрипции?",
      "a": "Транскрипция русскими буквами не передаёт все польские звуки. Лучше слушать польское произношение и повторять короткие фразы."
    },
    {
      "q": "Как перейти от слов к простому разговору?",
      "a": "Учите целые фразы, заменяйте в них существительные и повторяйте материал на следующий день."
    }
  ]
};

export default function Page() {
  return <LocalizedVocabularyGuide data={data} />;
}
