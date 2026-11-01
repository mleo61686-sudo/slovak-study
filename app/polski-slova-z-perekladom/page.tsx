import type { Metadata } from "next";
import LocalizedVocabularyGuide, { type GuideData } from "@/app/components/LocalizedVocabularyGuide";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Польські слова з перекладом українською для початківців | Flunio",
  description: "Вивчай польські слова за темами: привітання, магазин, робота, транспорт. Прості речення допоможуть одразу зрозуміти, як використовувати лексику.",
  alternates: {
    canonical: `${SITE_URL}/polski-slova-z-perekladom`,
    languages: {
      uk: `${SITE_URL}/polski-slova-z-perekladom`,
      ru: `${SITE_URL}/ru/polish-vocabulary`,
      en: `${SITE_URL}/polish-vocabulary`,
      "x-default": `${SITE_URL}/polish-vocabulary`,
    },
  },
  openGraph: {
    title: "Польські слова з перекладом українською для початківців",
    description: "Вивчай польські слова за темами: привітання, магазин, робота, транспорт. Прості речення допоможуть одразу зрозуміти, як використовувати лексику.",
    url: `${SITE_URL}/polski-slova-z-perekladom`,
    siteName: "Flunio",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const data: GuideData = {
  "lang": "uk",
  "courseLang": "pl",
  "eyebrow": "Польська мова • український переклад",
  "title": "Польські слова з перекладом українською для початківців",
  "lead": "Вивчай польські слова за темами: привітання, магазин, робота, транспорт. Прості речення допоможуть одразу зрозуміти, як використовувати лексику.",
  "introduction": "Польська та українська мають багато схожих слів, але написання, наголос і значення не завжди збігаються. Замість довгого списку без контексту почни з чотирьох життєвих тем, прочитай приклади та повтори їх уголос.",
  "courseHref": "/vyvchennia-polskoi-movy-online",
  "languageUrls": {
    "uk": "/polski-slova-z-perekladom",
    "ru": "/ru/polish-vocabulary",
    "en": "/polish-vocabulary"
  },
  "topics": [
    {
      "heading": "Привітання і перше знайомство",
      "context": "Базові польські слова для вітання, подяки, вибачення й короткої розмови.",
      "words": [
        {
          "word": "Dzień dobry",
          "translation": "Добрий день",
          "example": "Dzień dobry, pani Anno.",
          "exampleTranslation": "Добрий день, пані Анно."
        },
        {
          "word": "Cześć",
          "translation": "Привіт",
          "example": "Cześć, co słychać?",
          "exampleTranslation": "Привіт, як справи?"
        },
        {
          "word": "Dziękuję",
          "translation": "Дякую",
          "example": "Dziękuję za pomoc.",
          "exampleTranslation": "Дякую за допомогу."
        },
        {
          "word": "Proszę",
          "translation": "Прошу / будь ласка",
          "example": "Proszę, oto bilet.",
          "exampleTranslation": "Прошу, ось квиток."
        },
        {
          "word": "Przepraszam",
          "translation": "Вибачте",
          "example": "Przepraszam, gdzie jest sklep?",
          "exampleTranslation": "Вибачте, де магазин?"
        },
        {
          "word": "Do widzenia",
          "translation": "До побачення",
          "example": "Do widzenia, do jutra!",
          "exampleTranslation": "До побачення, до завтра!"
        }
      ]
    },
    {
      "heading": "У магазині та кафе",
      "context": "Слова, які зустрічаються на касі, у продуктовому магазині та при замовленні.",
      "words": [
        {
          "word": "sklep",
          "translation": "магазин",
          "example": "Sklep jest blisko.",
          "exampleTranslation": "Магазин близько."
        },
        {
          "word": "chleb",
          "translation": "хліб",
          "example": "Poproszę chleb.",
          "exampleTranslation": "Дайте, будь ласка, хліб."
        },
        {
          "word": "woda",
          "translation": "вода",
          "example": "Chcę kupić wodę.",
          "exampleTranslation": "Хочу купити воду."
        },
        {
          "word": "cena",
          "translation": "ціна",
          "example": "Jaka jest cena?",
          "exampleTranslation": "Яка ціна?"
        },
        {
          "word": "paragon",
          "translation": "чек",
          "example": "Czy mogę dostać paragon?",
          "exampleTranslation": "Можна отримати чек?"
        },
        {
          "word": "gotówka",
          "translation": "готівка",
          "example": "Płacę gotówką.",
          "exampleTranslation": "Плачу готівкою."
        }
      ]
    },
    {
      "heading": "Робота і графік",
      "context": "Слова для спілкування з колегами та розуміння робочого розкладу.",
      "words": [
        {
          "word": "praca",
          "translation": "робота",
          "example": "Idę do pracy.",
          "exampleTranslation": "Іду на роботу."
        },
        {
          "word": "zmiana",
          "translation": "зміна",
          "example": "Dziś mam drugą zmianę.",
          "exampleTranslation": "Сьогодні в мене друга зміна."
        },
        {
          "word": "przerwa",
          "translation": "перерва",
          "example": "Przerwa zaczyna się o dwunastej.",
          "exampleTranslation": "Перерва починається о дванадцятій."
        },
        {
          "word": "umowa",
          "translation": "договір",
          "example": "Czy mam podpisać umowę?",
          "exampleTranslation": "Мені потрібно підписати договір?"
        },
        {
          "word": "kierownik",
          "translation": "керівник",
          "example": "Kierownik jest w biurze.",
          "exampleTranslation": "Керівник в офісі."
        },
        {
          "word": "jutro",
          "translation": "завтра",
          "example": "Jutro pracuję.",
          "exampleTranslation": "Завтра працюю."
        }
      ]
    },
    {
      "heading": "Місто і транспорт",
      "context": "Короткий словник для поїздок містом, пошуку зупинки та купівлі квитка.",
      "words": [
        {
          "word": "przystanek",
          "translation": "зупинка",
          "example": "Gdzie jest przystanek?",
          "exampleTranslation": "Де зупинка?"
        },
        {
          "word": "bilet",
          "translation": "квиток",
          "example": "Potrzebuję biletu.",
          "exampleTranslation": "Мені потрібен квиток."
        },
        {
          "word": "pociąg",
          "translation": "поїзд",
          "example": "Pociąg jest spóźniony.",
          "exampleTranslation": "Поїзд запізнюється."
        },
        {
          "word": "dworzec",
          "translation": "вокзал",
          "example": "Dworzec jest niedaleko.",
          "exampleTranslation": "Вокзал неподалік."
        },
        {
          "word": "lewo",
          "translation": "ліво",
          "example": "Skręć w lewo.",
          "exampleTranslation": "Поверни ліворуч."
        },
        {
          "word": "prosto",
          "translation": "прямо",
          "example": "Idź prosto.",
          "exampleTranslation": "Іди прямо."
        }
      ]
    }
  ],
  "phrases": [
    {
      "phrase": "Ile to kosztuje?",
      "translation": "Скільки це коштує?",
      "usage": "У магазині або кафе."
    },
    {
      "phrase": "Czy mogę zapłacić kartą?",
      "translation": "Можу заплатити карткою?",
      "usage": "На касі."
    },
    {
      "phrase": "Nie rozumiem.",
      "translation": "Я не розумію.",
      "usage": "Коли потрібно пояснення."
    },
    {
      "phrase": "Proszę powtórzyć.",
      "translation": "Повторіть, будь ласка.",
      "usage": "Коли не розчув фразу."
    },
    {
      "phrase": "Kiedy zaczyna się zmiana?",
      "translation": "Коли починається зміна?",
      "usage": "На роботі."
    },
    {
      "phrase": "Szukam mieszkania.",
      "translation": "Я шукаю квартиру.",
      "usage": "Для оренди житла."
    }
  ],
  "notes": [
    {
      "title": "Sz і cz — не однакові звуки",
      "explanation": "Польські sz і cz не варто автоматично читати як українські літери. Корисно почути пари слів і повторити повільно."
    },
    {
      "title": "Ł читається інакше, ніж л",
      "explanation": "У сучасній стандартній польській ł приблизно відповідає звуку [w], наприклад у слові ławka."
    },
    {
      "title": "Sklep — це магазин",
      "explanation": "Польське sklep означає магазин. Українське «склеп» має інше значення — це хибний друг перекладача."
    },
    {
      "title": "Носові голосні ą і ę",
      "explanation": "Звуки в словах są і będę можуть змінювати звучання залежно від позиції. Навчайся на слух, а не лише за написанням."
    }
  ],
  "faqs": [
    {
      "q": "З яких польських слів почати?",
      "a": "Вчи слова, потрібні в магазині, транспорті та на роботі, а також привітання й короткі фрази з дієсловами."
    },
    {
      "q": "Чому польські слова схожі на українські, але звучать інакше?",
      "a": "Мови споріднені, однак мають різні правила вимови та історію змін звуків. Особливу увагу приділяй sz, cz, rz, ł, ą та ę."
    },
    {
      "q": "Як не забувати нові слова?",
      "a": "Повторюй невеликими порціями, використовуй їх у реченнях і перевіряй себе наступного дня."
    }
  ]
};

export default function Page() {
  return <LocalizedVocabularyGuide data={data} />;
}
