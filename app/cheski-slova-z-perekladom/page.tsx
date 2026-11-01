import type { Metadata } from "next";
import LocalizedVocabularyGuide, { type GuideData } from "@/app/components/LocalizedVocabularyGuide";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Чеські слова з українським перекладом: базова лексика за темами | Flunio",
  description: "Почни з чеських слів, які справді потрібні в магазині, транспорті, на роботі та в повсякденних розмовах. Кожне слово має короткий приклад і переклад українською.",
  alternates: {
    canonical: `${SITE_URL}/cheski-slova-z-perekladom`,
    languages: {
      uk: `${SITE_URL}/cheski-slova-z-perekladom`,
      ru: `${SITE_URL}/ru/czech-vocabulary`,
      en: `${SITE_URL}/czech-vocabulary`,
      "x-default": `${SITE_URL}/czech-vocabulary`,
    },
  },
  openGraph: {
    title: "Чеські слова з українським перекладом: базова лексика за темами",
    description: "Почни з чеських слів, які справді потрібні в магазині, транспорті, на роботі та в повсякденних розмовах. Кожне слово має короткий приклад і переклад українською.",
    url: `${SITE_URL}/cheski-slova-z-perekladom`,
    siteName: "Flunio",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const data: GuideData = {
  "lang": "uk",
  "courseLang": "cs",
  "eyebrow": "Чеська мова • словник для початківців",
  "title": "Чеські слова з українським перекладом: базова лексика за темами",
  "lead": "Почни з чеських слів, які справді потрібні в магазині, транспорті, на роботі та в повсякденних розмовах. Кожне слово має короткий приклад і переклад українською.",
  "introduction": "Чеська схожа на українську, але впізнати слово — ще не означає правильно його використати. Особливо важливі вимова ř, довгі голосні та слова, які мають несподіване значення. Нижче — тематичний стартовий словник із реченнями, а не випадковий перелік.",
  "courseHref": "/vyvchennia-cheskoi-movy-online",
  "languageUrls": {
    "uk": "/cheski-slova-z-perekladom",
    "ru": "/ru/czech-vocabulary",
    "en": "/czech-vocabulary"
  },
  "topics": [
    {
      "heading": "Привітання і ввічливість",
      "context": "Короткі вислови для першої розмови в магазині, на роботі або в установі.",
      "words": [
        {
          "word": "Dobrý den",
          "translation": "Добрий день",
          "example": "Dobrý den, máte chvilku?",
          "exampleTranslation": "Добрий день, маєте хвилинку?"
        },
        {
          "word": "Ahoj",
          "translation": "Привіт",
          "example": "Ahoj, jak se máš?",
          "exampleTranslation": "Привіт, як справи?"
        },
        {
          "word": "Děkuji",
          "translation": "Дякую",
          "example": "Děkuji za pomoc.",
          "exampleTranslation": "Дякую за допомогу."
        },
        {
          "word": "Prosím",
          "translation": "Будь ласка / прошу",
          "example": "Prosím, pojďte dál.",
          "exampleTranslation": "Прошу, проходьте далі."
        },
        {
          "word": "Promiňte",
          "translation": "Вибачте",
          "example": "Promiňte, nerozumím.",
          "exampleTranslation": "Вибачте, не розумію."
        },
        {
          "word": "Na shledanou",
          "translation": "До побачення",
          "example": "Na shledanou, hezký den!",
          "exampleTranslation": "До побачення, гарного дня!"
        }
      ]
    },
    {
      "heading": "Магазин та покупки",
      "context": "Ці слова допоможуть зрозуміти запитання біля каси та попросити потрібний товар.",
      "words": [
        {
          "word": "obchod",
          "translation": "магазин",
          "example": "Obchod je otevřený.",
          "exampleTranslation": "Магазин відкритий."
        },
        {
          "word": "cena",
          "translation": "ціна",
          "example": "Jaká je cena?",
          "exampleTranslation": "Яка ціна?"
        },
        {
          "word": "chléb",
          "translation": "хліб",
          "example": "Potřebuji chléb.",
          "exampleTranslation": "Мені потрібен хліб."
        },
        {
          "word": "mléko",
          "translation": "молоко",
          "example": "Máte mléko?",
          "exampleTranslation": "У вас є молоко?"
        },
        {
          "word": "účtenka",
          "translation": "чек",
          "example": "Potřebuji účtenku.",
          "exampleTranslation": "Мені потрібен чек."
        },
        {
          "word": "karta",
          "translation": "картка",
          "example": "Můžu platit kartou?",
          "exampleTranslation": "Можна заплатити карткою?"
        }
      ]
    },
    {
      "heading": "Робота і розклад",
      "context": "Лексика для зміни, перерви, начальника та простих робочих доручень.",
      "words": [
        {
          "word": "práce",
          "translation": "робота",
          "example": "Jdu do práce.",
          "exampleTranslation": "Іду на роботу."
        },
        {
          "word": "směna",
          "translation": "зміна",
          "example": "Dnes mám ranní směnu.",
          "exampleTranslation": "Сьогодні в мене ранкова зміна."
        },
        {
          "word": "přestávka",
          "translation": "перерва",
          "example": "Kdy je přestávka?",
          "exampleTranslation": "Коли перерва?"
        },
        {
          "word": "vedoucí",
          "translation": "керівник",
          "example": "Vedoucí je v kanceláři.",
          "exampleTranslation": "Керівник в офісі."
        },
        {
          "word": "zítra",
          "translation": "завтра",
          "example": "Zítra mám volno.",
          "exampleTranslation": "Завтра в мене вихідний."
        },
        {
          "word": "hotovo",
          "translation": "готово",
          "example": "Už je to hotovo.",
          "exampleTranslation": "Це вже готово."
        }
      ]
    },
    {
      "heading": "Місто і транспорт",
      "context": "Слова для дороги, автобусів та орієнтування в незнайомому місці.",
      "words": [
        {
          "word": "zastávka",
          "translation": "зупинка",
          "example": "Kde je zastávka?",
          "exampleTranslation": "Де зупинка?"
        },
        {
          "word": "jízdenka",
          "translation": "квиток",
          "example": "Potřebuji jízdenku.",
          "exampleTranslation": "Мені потрібен квиток."
        },
        {
          "word": "vlak",
          "translation": "поїзд",
          "example": "Vlak přijede za deset minut.",
          "exampleTranslation": "Поїзд прибуде за десять хвилин."
        },
        {
          "word": "nádraží",
          "translation": "вокзал",
          "example": "Jdu na nádraží.",
          "exampleTranslation": "Іду на вокзал."
        },
        {
          "word": "vpravo",
          "translation": "праворуч",
          "example": "Odbočte vpravo.",
          "exampleTranslation": "Поверніть праворуч."
        },
        {
          "word": "rovně",
          "translation": "прямо",
          "example": "Jděte pořád rovně.",
          "exampleTranslation": "Ідіть увесь час прямо."
        }
      ]
    }
  ],
  "phrases": [
    {
      "phrase": "Můžete to zopakovat?",
      "translation": "Можете це повторити?",
      "usage": "Якщо не розчув пояснення."
    },
    {
      "phrase": "Mluvím jen trochu česky.",
      "translation": "Я говорю чеською лише трохи.",
      "usage": "Корисно на початку спілкування."
    },
    {
      "phrase": "Kolik to stojí?",
      "translation": "Скільки це коштує?",
      "usage": "Питання в магазині."
    },
    {
      "phrase": "Kde je nejbližší zastávka?",
      "translation": "Де найближча зупинка?",
      "usage": "Коли шукаєш транспорт."
    },
    {
      "phrase": "Kdy začíná směna?",
      "translation": "Коли починається зміна?",
      "usage": "Запитання на роботі."
    },
    {
      "phrase": "Potřebuji pomoc.",
      "translation": "Мені потрібна допомога.",
      "usage": "У побуті чи установі."
    }
  ],
  "notes": [
    {
      "title": "Ř — окремий звук",
      "explanation": "У ř немає точного українського відповідника. Не підмінюй його звичайним «р»; краще слухати чеські слова на зразок řeka та повторювати."
    },
    {
      "title": "Ovoce — не овочі",
      "explanation": "Чеське ovoce означає «фрукти», а не українські «овочі». Чеські овочі — zelenina."
    },
    {
      "title": "Čerstvý означає «свіжий»",
      "explanation": "Слово čerstvý схоже на українське «черствий», але має протилежне побутове значення: свіжий."
    },
    {
      "title": "Довгі голосні важливі",
      "explanation": "Наприклад, á, í, ú/ů позначають довгі голосні. Довготу не варто ігнорувати, коли вчиш нові слова."
    }
  ],
  "faqs": [
    {
      "q": "Які чеські слова вчити першими?",
      "a": "Привітання, покупки, транспорт, роботу, базові дієслова та короткі речення. Почни зі слів, які потрібні тобі щодня."
    },
    {
      "q": "Чи легко українцям запам’ятати чеські слова?",
      "a": "Деякі слова дуже схожі, але вимова та значення можуть відрізнятися. Вчи їх у реченнях і перевіряй переклад."
    },
    {
      "q": "Як перейти від слів до розмови?",
      "a": "Повторюй короткі фрази, міняй у них одне слово та тренуйся відповідати на прості запитання."
    }
  ]
};

export default function Page() {
  return <LocalizedVocabularyGuide data={data} />;
}
