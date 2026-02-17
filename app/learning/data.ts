// app/learning/data.ts
import { WORDS } from "../data/words";
import { A1_ALL } from "./levels/a1";
import { A2_ALL } from "./levels/a2";
import { B1_ALL } from "./levels/b1";
import { A0_PHRASES } from "./phrases/a0";
import { A1_PHRASES } from "./phrases/a1";
import { phraseKey } from "./phrases/phraseKey";

export type Lang = "ua" | "ru";


export type Word = {
  sk: string;
  ua: string;
  ru?: string;
  ipa?: string;
  img?: string;
  imgCredit?: string;

  // ✅ приклад для вправи 6 (необов'язково)
  phrase?: {
    sk: string;
    ua: string;
    ru?: string;
    tokens: string[]; // без крапки: ["Ja","pracujem","v","práci"]
  };
};

// ✅ внутрішній тип: у джерелі title може бути старим string
type LessonSource = {
  id: string; // "1" або "a0-1"
  title: string | Record<Lang, string>;
  words: Word[];
};

export type Lesson = {
  id: string; // "1" або "a0-1"
  title: Record<Lang, string>;
  words: Word[];
};

export type CefrBandId = "a0" | "a1" | "a2" | "b1" | "b2";

export type CefrBand = {
  id: CefrBandId;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  lessons: { id: string; title: Record<Lang, string>; wordsCount: number }[];
};

// ✅ скільки уроків у кожному рівні
const LESSONS_PER_BAND: Record<CefrBandId, number> = {
  a0: 30,
  a1: 40,
  a2: 50,
  b1: 60,
  b2: 60,
};

const WORDS_PER_LESSON = 10;

const BAND_META: Record<
  CefrBandId,
  { title: Record<Lang, string>; subtitle: Record<Lang, string> }
> = {
  a0: {
    title: { ua: "A0 — Початківець", ru: "A0 — Новичок" },
    subtitle: {
      ua: "Старт із нуля: базові слова та фрази",
      ru: "Старт с нуля: базовые слова и фразы",
    },
  },
  a1: {
    title: { ua: "A1 — Початковий", ru: "A1 — Начальный" },
    subtitle: {
      ua: "Побутові теми: магазин, робота, місто",
      ru: "Бытовые темы: магазин, работа, город",
    },
  },
  a2: {
    title: { ua: "A2 — Базовий", ru: "A2 — Базовый" },
    subtitle: {
      ua: "Більше словника + впевнене спілкування",
      ru: "Больше словаря + уверенное общение",
    },
  },
  b1: {
    title: { ua: "B1 — Середній", ru: "B1 — Средний" },
    subtitle: {
      ua: "Діалоги, описи, розмовні теми",
      ru: "Диалоги, описания, разговорные темы",
    },
  },
  b2: {
    title: { ua: "B2 — Вище середнього", ru: "B2 — Выше среднего" },
    subtitle: {
      ua: "Складніші теми, нюанси, швидкість",
      ru: "Более сложные темы, нюансы, скорость",
    },
  },
};

// ✅ Назви для всіх 30 уроків A0 (UA/RU)
const A0_TITLES: Record<number, Record<Lang, string>> = {
  1: { ua: "Базові слова", ru: "Базовые слова" },
  2: { ua: "Люди та сімʼя", ru: "Люди и семья" },
  3: { ua: "Дім і кімнати", ru: "Дом и комнаты" },
  4: { ua: "Магазин і покупки", ru: "Магазин и покупки" },
  5: { ua: "Їжа та напої", ru: "Еда и напитки" },
  6: { ua: "Місто", ru: "Город" },
  7: { ua: "Транспорт", ru: "Транспорт" },
  8: { ua: "Час і дні", ru: "Время и дни" },
  9: { ua: "Робота", ru: "Работа" },
  10: { ua: "Школа", ru: "Школа" },
  11: { ua: "Числа", ru: "Числа" },
  12: { ua: "Кольори", ru: "Цвета" },
  13: { ua: "Одяг", ru: "Одежда" },
  14: { ua: "Тіло людини", ru: "Тело человека" },
  15: { ua: "Здоровʼя", ru: "Здоровье" },
  16: { ua: "Погода", ru: "Погода" },
  17: { ua: "Природа", ru: "Природа" },
  18: { ua: "Побут", ru: "Быт" },
  19: { ua: "Дії та дієслова", ru: "Действия и глаголы" },
  20: { ua: "Питання і відповіді", ru: "Вопросы и ответы" },
  21: { ua: "Місця", ru: "Места" },
  22: { ua: "Емоції", ru: "Эмоции" },
  23: { ua: "Хобі", ru: "Хобби" },
  24: { ua: "Спілкування", ru: "Общение" },
  25: { ua: "Подорожі", ru: "Путешествия" },
  26: { ua: "Готель і ресторан", ru: "Отель и ресторан" },
  27: { ua: "Гроші", ru: "Деньги" },
  28: { ua: "Технології", ru: "Технологии" },
  29: { ua: "Повсякденні фрази", ru: "Повседневные фразы" },
  30: { ua: "Повторення бази", ru: "Повторение базы" },
};

// =============================
// RU логіка — твоя
// =============================
const RU_OVERRIDES: Record<string, string> = {
  "дім": "дом",
  "гроші": "деньги",
  "чоловік": "мужчина",
  "жінка": "женщина",
  "дитина": "ребёнок",
  "батько": "отец",
  "мати": "мать",
  "донька": "дочь",
  "ліжко": "кровать",
  "рушник": "полотенце",
  "взуття": "обувь",
};

function addRu(words: Word[]): Word[] {
  return words.map((w) => ({
    ...w,
    ru: w.ru ?? RU_OVERRIDES[w.ua] ?? w.ua,
  }));
}

function toTitle(title: string | Record<Lang, string>): Record<Lang, string> {
  if (typeof title === "string") return { ua: title, ru: title };
  return title;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function keyOf(w: Word) {
  return `${w.sk}||${w.ua}`.toLowerCase();
}

function fillTo10(words: Word[], lessonNum: number): Word[] {
  if (words.length >= WORDS_PER_LESSON) return words.slice(0, WORDS_PER_LESSON);

  const missing = WORDS_PER_LESSON - words.length;
  const fillers: Word[] = Array.from({ length: missing }, (_, i) => ({
    sk: `TODO-${lessonNum}-${i + 1}`,
    ua: "—",
    ru: "—",
  }));
  return [...words, ...fillers];
}

// =============================
// 1) ТВОЇ РЕАЛЬНІ УРОКИ A0 (1..30)
// =============================
export const A0_REAL_SOURCE: LessonSource[] = [
  {
    id: "1",
    title: { ua: "Урок 1 — Базові слова", ru: "Урок 1 — Базовые слова" },
    words: [
      { sk: "dom", ua: "дім", ru: "дом", img: "/words/dom.jpg", imgCredit: "Wikimedia Commons (CC BY-SA)" },
      { sk: "auto", ua: "авто", ru: "авто", img: "/words/car.jpg", imgCredit: "Photo: Richard Smith, CC BY 2.0 (Wikimedia Commons)" },
      { sk: "voda", ua: "вода", ru: "вода", img: "/words/water.jpg", imgCredit: "Photo: Roger McLassus, CC BY-SA 3.0 (Wikimedia Commons)" },
      { sk: "chlieb", ua: "хліб", ru: "хлеб", img: "/words/bread.jpg", imgCredit: "Photo: Dmitry Makeev, CC BY-SA 4.0 (Wikimedia Commons)" },
      { sk: "škola", ua: "школа", ru: "школа", img: "/words/school.jpg", imgCredit: "Photo: G. Edward Johnson, CC BY 4.0 (Wikimedia Commons)" },
      { sk: "mesto", ua: "місто", ru: "город", img: "/words/city.jpg", imgCredit: "Photo: Daniel Schwen, CC BY-SA 2.5 (Wikimedia Commons)" },
      { sk: "čas", ua: "час", ru: "время", img: "/words/time.jpg", imgCredit: "Public Domain (Wikimedia Commons)" },
      { sk: "deň", ua: "день", ru: "день", img: "/words/day.jpg", imgCredit: "Photo: Basile Morin, CC BY-SA 4.0 (Wikimedia Commons)" },
      { sk: "dobrý", ua: "добрий", ru: "хороший", img: "/words/good.jpg", imgCredit: "Wikimedia Commons" },
      { sk: "peniaze", ua: "гроші", ru: "деньги", img: "/words/money.jpg", imgCredit: "Wikimedia Commons" },
    ],
  },
  {
    id: "2",
    title: { ua: "Урок 2 — люди", ru: "Урок 2 — люди" },
    words: [
      { sk: "človek", ua: "людина", ru: "человек", img: "/words/human.jpg", imgCredit: "Photo: Hans Hillewaert, CC BY-SA 3.0 (Wikimedia Commons)" },
      { sk: "muž", ua: "чоловік", ru: "мужчина", img: "/words/man.jpg", imgCredit: "Wikimedia Commons" },
      { sk: "žena", ua: "жінка", ru: "женщина", img: "/words/woman.jpg", imgCredit: "Wikimedia Commons" },
      { sk: "dieťa", ua: "дитина", ru: "ребёнок", img: "/words/child.jpg", imgCredit: "Photo: Arkady Zarubin, CC BY-SA 3.0 (Wikimedia Commons)" },
      { sk: "priateľ", ua: "друг", ru: "друг", img: "/words/male-friend.jpg", imgCredit: "Photo: Random Institute (Unsplash License)" },
      { sk: "priateľka", ua: "подруга", ru: "подруга", img: "/words/female-friend.jpg", imgCredit: "Photo: John Doe, Unsplash" },
      { sk: "otec", ua: "батько", ru: "отец", img: "/words/father.jpg", imgCredit: "Photo: Derek Thomson (Unsplash License)" },
      { sk: "matka", ua: "мати", ru: "мать", img: "/words/mother.jpg" },
      { sk: "brat", ua: "брат", ru: "брат", img: "/words/brother.jpg" },
      { sk: "sestra", ua: "сестра", ru: "сестра", img: "/words/sister.jpg" },
    ],
  },
  {
    id: "3",
    title: { ua: "Урок 3 — дім", ru: "Урок 3 — дом" },
    words: [
      { sk: "byt", ua: "квартира", ru: "квартира", img: "/words/byt.jpg" },
      { sk: "izba", ua: "кімната", ru: "комната", img: "/words/izba.jpg" },
      { sk: "kuchyňa", ua: "кухня", ru: "кухня", img: "/words/kuchyňa.jpg" },
      { sk: "kúpeľňa", ua: "ванна кімната", ru: "ванная", img: "/words/kúpeľňa.jpg" },
      { sk: "dvere", ua: "двері", ru: "дверь", img: "/words/dvere.jpg" },
      { sk: "okno", ua: "вікно", ru: "окно", img: "/words/okno.jpg" },
      { sk: "stôl", ua: "стіл", ru: "стол", img: "/words/stôl.jpg" },
      { sk: "stolička", ua: "стілець", ru: "стул", img: "/words/stôl.jpg" },
      { sk: "posteľ", ua: "ліжко", ru: "кровать", img: "/words/posteľ.jpg" },
      { sk: "skriňa", ua: "шафа", ru: "шкаф", img: "/words/skriňa.jpg" },
    ],
  },
  {
    id: "4",
    title: { ua: "Урок 4 — магазин", ru: "Урок 4 — магазин" },
    words: [
      { sk: "obchod", ua: "магазин", ru: "магазин", img: "/words/obchod.jpg" },
      { sk: "pokladňa", ua: "каса", ru: "касса", img: "/words/cena.jpg" },
      { sk: "cena", ua: "ціна", ru: "цена", img: "/words/cena.jpg" },
      { sk: "zľava", ua: "знижка", ru: "скидка", img: "/words/zľava.jpg" },
      { sk: "taška", ua: "пакет/сумка", ru: "пакет/сумка", img: "/words/taška.jpg" },
      { sk: "blok", ua: "чек", ru: "чек", img: "/words/blok.jpg" },
      { sk: "hotovosť", ua: "готівка", ru: "наличные", img: "/words/hotovosť.jpg" },
      { sk: "karta", ua: "картка", ru: "карта", img: "/words/karta.jpg" },
      { sk: "kúpiť", ua: "купити", ru: "купить", img: "/words/kupiť.jpg" },
      { sk: "platiť", ua: "платити", ru: "платить", img: "/words/platiť.jpg" },
    ],
  },
  {
    id: "5",
    title: { ua: "Урок 5 — Їжа та напої", ru: "Урок 5 — Еда и напитки" },
    words: [
      { sk: "jedlo", ua: "їжа", ru: "еда", img: "/words/jedlo.jpg" },
      { sk: "nápoj", ua: "напій", ru: "напиток", img: "/words/nápoj.jpg" },
      { sk: "chlieb", ua: "хліб", ru: "хлеб", img: "/words/chlieb.jpg" },
      { sk: "mäso", ua: "м'ясо", ru: "мясо", img: "/words/mäso.jpg" },
      { sk: "polievka", ua: "суп", ru: "суп", img: "/words/polievka.jpg" },
      { sk: "ovocie", ua: "фрукти", ru: "фрукты", img: "/words/ovocie.jpg" },
      { sk: "zelenina", ua: "овочі", ru: "овощи", img: "/words/zelenina.jpg" },
      { sk: "voda", ua: "вода", ru: "вода", img: "/words/water.jpg" },
      { sk: "káva", ua: "кава", ru: "кофе", img: "/words/káva.jpg" },
      { sk: "čaj", ua: "чай", ru: "чай", img: "/words/čaj.jpg" },
    ],
  },

  {
    id: "6",
    title: "Місто",
    words: [
      { sk: "mesto", ua: "місто", ru: "город", img: "/words/mesto.jpg" },
      { sk: "ulica", ua: "вулиця", ru: "улица", img: "/words/ulica.jpg" },
      { sk: "námestie", ua: "площа", ru: "площадь", img: "/words/námestie.jpg" },
      { sk: "dom", ua: "будинок", ru: "дом", img: "/words/dom.jpg" },
      { sk: "byt", ua: "квартира", ru: "квартира", img: "/words/byt.jpg" },
      { sk: "škola", ua: "школа", ru: "школа", img: "/words/school.jpg" },
      { sk: "nemocnica", ua: "лікарня", ru: "больница", img: "/words/nemocnica.jpg" },
      { sk: "zastávka", ua: "зупинка", ru: "остановка", img: "/words/zastávka.jpg" },
      { sk: "park", ua: "парк", ru: "парк", img: "/words/park.jpg" },
      { sk: "stanica", ua: "станція/вокзал", ru: "станция / вокзал", img: "/words/stanica.jpg" },
    ],
  },
  {
    id: "7",
    title: "Транспорт",
    words: [
      { sk: "doprava", ua: "транспорт", ru: "транспорт", img: "/words/doprava.jpg" },
      { sk: "auto", ua: "авто", ru: "авто", img: "/words/car.jpg" },
      { sk: "autobus", ua: "автобус", ru: "автобус", img: "/words/autobus.jpg" },
      { sk: "vlak", ua: "поїзд", ru: "поезд", img: "/words/vlak.jpg" },
      { sk: "električka", ua: "трамвай", ru: "трамвай", img: "/words/električka.jpg" },
      { sk: "metro", ua: "метро", ru: "метро", img: "/words/stanica.jpg" },
      { sk: "taxík", ua: "таксі", ru: "такси", img: "/words/taxík.jpg" },
      { sk: "zastávka", ua: "зупинка", ru: "остановка", img: "/words/zastávka.jpg" },
      { sk: "lístok", ua: "квиток", ru: "билет", img: "/words/lístok.jpg" },
      { sk: "letisko", ua: "аеропорт", ru: "аэропорт", img: "/words/letisko.jpg" },
    ],
  },
  {
    id: "8",
    title: "Час і дні",
    words: [
      { sk: "čas", ua: "час", ru: "время", img: "/words/time.jpg" },
      { sk: "deň", ua: "день", ru: "день", img: "/words/day.jpg" },
      { sk: "noc", ua: "ніч", ru: "ночь", img: "/words/noc.jpg" },
      { sk: "týždeň", ua: "тиждень", ru: "неделя", img: "/words/týždeň.jpg" },
      { sk: "mesiac", ua: "місяць", ru: "месяц", img: "/words/mesiac.jpg" },
      { sk: "rok", ua: "рік", ru: "год", img: "/words/rok.jpg" },
      { sk: "dnes", ua: "сьогодні", ru: "сегодня", img: "/words/dnes.jpg" },
      { sk: "zajtra", ua: "завтра", ru: "завтра", img: "/words/dnes.jpg" },
      { sk: "včera", ua: "вчора", ru: "вчера", img: "/words/včera.jpg" },
      { sk: "hodina", ua: "година", ru: "час / час (ед.)", img: "/words/hodina.jpg" },
    ],
  },
  {
    id: "9",
    title: "Робота",
    words: [
      { sk: "práca", ua: "робота", ru: "работа", img: "/words/práca.jpg" },
      { sk: "zamestnanie", ua: "зайнятість / робота", ru: "занятость / работа", img: "/words/zamestnanie.jpg" },
      { sk: "firma", ua: "фірма", ru: "фирма", img: "/words/firma.jpg" },
      { sk: "šéf", ua: "начальник", ru: "начальник", img: "/words/šéf.jpg" },
      { sk: "kolega", ua: "колега", ru: "коллега", img: "/words/kolega.jpg" },
      { sk: "mzda", ua: "зарплата", ru: "зарплата", img: "/words/hotovosť.jpg" },
      { sk: "zmluva", ua: "договір", ru: "договор", img: "/words/kolega.jpg" },
      { sk: "pracovať", ua: "працювати", ru: "работать", img: "/words/pracovať.jpg" },
      { sk: "brigáda", ua: "підробіток", ru: "подработка", img: "/words/brigáda.jpg" },
      { sk: "dovolenka", ua: "відпустка", ru: "отпуск", img: "/words/dovolenka.jpg" },
    ],
  },
  {
    id: "10",
    title: "Школа",
    words: [
      { sk: "škola", ua: "школа", ru: "школа", img: "/words/school.jpg" },
      { sk: "žiak", ua: "учень", ru: "ученик", img: "/words/žiak.jpg" },
      { sk: "učiteľ", ua: "вчитель", ru: "учитель", img: "/words/učiteľ.jpg" },
      { sk: "trieda", ua: "клас", ru: "класс", img: "/words/trieda.jpg" },
      { sk: "predmet", ua: "предмет", ru: "предмет", img: "/words/predmet.jpg" },
      { sk: "hodina", ua: "урок", ru: "урок", img: "/words/hodina.jpg" },
      { sk: "úloha", ua: "завдання / домашня робота", ru: "задание / домашняя работа", img: "/words/úloha.jpg" },
      { sk: "test", ua: "тест", ru: "тест", img: "/words/zošit.jpg" },
      { sk: "zošit", ua: "зошит", ru: "тетрадь", img: "/words/zoshit.jpg" },
      { sk: "učebnica", ua: "підручник", ru: "учебник", img: "/words/učebnica.jpg" },
    ],
  },
  {
    id: "11",
    title: "Числа",
    words: [
      { sk: "nula", ua: "нуль", ru: "ноль", img: "/words/nula.jpg" },
      { sk: "jeden", ua: "один", ru: "один", img: "/words/jeden.jpg" },
      { sk: "dva", ua: "два", ru: "два", img: "/words/dva.jpg" },
      { sk: "tri", ua: "три", ru: "три", img: "/words/tri.jpg" },
      { sk: "štyri", ua: "чотири", ru: "четыре", img: "/words/štyri.jpg" },
      { sk: "päť", ua: "п’ять", ru: "пять", img: "/words/päť.jpg" },
      { sk: "šesť", ua: "шість", ru: "шесть", img: "/words/šesť.jpg" },
      { sk: "sedem", ua: "сім", ru: "семь", img: "/words/sedem.jpg" },
      { sk: "osem", ua: "вісім", ru: "восемь", img: "/words/osem.jpg" },
      { sk: "deväť", ua: "дев’ять", ru: "девять", img: "/words/deväť.jpg" },
    ],
  },
  {
    id: "12",
    title: "Кольори",
    words: [
      { sk: "farba", ua: "колір", ru: "цвет", img: "/words/farba.jpg" },
      { sk: "biely", ua: "білий", ru: "белый", img: "/words/biely.jpg" },
      { sk: "čierny", ua: "чорний", ru: "чёрный", img: "/words/čierny.jpg" },
      { sk: "červený", ua: "червоний", ru: "красный", img: "/words/červený.jpg" },
      { sk: "modrý", ua: "синій", ru: "синий", img: "/words/modrý.jpg" },
      { sk: "zelený", ua: "зелений", ru: "зелёный", img: "/words/zelený.jpg" },
      { sk: "žltý", ua: "жовтий", ru: "жёлтый", img: "/words/žltý.jpg" },
      { sk: "oranžový", ua: "помаранчевий", ru: "оранжевый", img: "/words/oranžový.jpg" },
      { sk: "ružový", ua: "рожевий", ru: "розовый", img: "/words/ružový.jpg" },
      { sk: "hnedý", ua: "коричневий", ru: "коричневый", img: "/words/hnedý.jpg" },
    ],
  },
  {
    id: "13",
    title: "Одяг",
    words: [
      { sk: "oblečenie", ua: "одяг", ru: "одежда", img: "/words/oblečenie.jpg" },
      { sk: "tričko", ua: "футболка", ru: "футболка", img: "/words/tričko.jpg" },
      { sk: "nohavice", ua: "штани", ru: "брюки", img: "/words/nohavice.jpg" },
      { sk: "bunda", ua: "куртка", ru: "куртка", img: "/words/bunda.jpg" },
      { sk: "topánky", ua: "взуття", ru: "обувь", img: "/words/topánky.jpg" },
      { sk: "kabát", ua: "пальто", ru: "пальто", img: "/words/kabát.jpg" },
      { sk: "šaty", ua: "сукня", ru: "платье", img: "/words/šaty.jpg" },
      { sk: "čiapka", ua: "шапка", ru: "шапка", img: "/words/čiapka.jpg" },
      { sk: "ponožky", ua: "шкарпетки", ru: "носки", img: "/words/ponožky.jpg" },
      { sk: "sveter", ua: "светр", ru: "свитер", img: "/words/sveter.jpg" },
    ],
  },
  {
    id: "14",
    title: "Тіло людини",
    words: [
      { sk: "telo", ua: "тіло", ru: "тело", img: "/words/telo.jpg" },
      { sk: "hlava", ua: "голова", ru: "голова", img: "/words/hlava.jpg" },
      { sk: "oko", ua: "око", ru: "глаз", img: "/words/oko.jpg" },
      { sk: "nos", ua: "ніс", ru: "нос", img: "/words/nos.jpg" },
      { sk: "ústa", ua: "рот", ru: "рот", img: "/words/ústa.jpg" },
      { sk: "ruka", ua: "рука", ru: "рука", img: "/words/ruka.jpg" },
      { sk: "noha", ua: "нога", ru: "нога", img: "/words/noha.jpg" },
      { sk: "chrbát", ua: "спина", ru: "спина", img: "/words/chrbát.jpg" },
      { sk: "brucho", ua: "живіт", ru: "живот", img: "/words/brucho.jpg" },
      { sk: "srdce", ua: "серце", ru: "сердце", img: "/words/srdce.jpg" },
    ],
  },
  {
    id: "15",
    title: "Здоров’я",
    words: [
      { sk: "zdravie", ua: "здоров’я", ru: "здоровье", img: "/words/zdravie.jpg" },
      { sk: "choroba", ua: "хвороба", ru: "болезнь", img: "/words/choroba.jpg" },
      { sk: "lekár", ua: "лікар", ru: "врач", img: "/words/lekár.jpg" },
      { sk: "nemocnica", ua: "лікарня", ru: "больница", img: "/words/nemocnica.jpg" },
      { sk: "liek", ua: "ліки", ru: "лекарство / лекарства", img: "/words/liek.jpg" },
      { sk: "bolesť", ua: "біль", ru: "боль", img: "/words/bolesť.jpg" },
      { sk: "teplota", ua: "температура", ru: "температура", img: "/words/teplota.jpg" },
      { sk: "kašeľ", ua: "кашель", ru: "кашель", img: "/words/kašeľ.jpg" },
      { sk: "prechladnutie", ua: "застуда", ru: "простуда", img: "/words/prechladnutie.jpg" },
      { sk: "uzdraviť sa", ua: "одужати", ru: "выздороветь", img: "/words/uzdraviť sa.jpg" },
    ],
  },
  {
    id: "16",
    title: "Погода",
    words: [
      { sk: "počasie", ua: "погода", ru: "погода", img: "/words/počasie.jpg" },
      { sk: "slnko", ua: "сонце", ru: "солнце", img: "/words/slnko.jpg" },
      { sk: "dážď", ua: "дощ", ru: "дождь", img: "/words/dážď.jpg" },
      { sk: "sneh", ua: "сніг", ru: "снег", img: "/words/sneh.jpg" },
      { sk: "vietor", ua: "вітер", ru: "ветер", img: "/words/vietor.jpg" },
      { sk: "oblak", ua: "хмара", ru: "облако", img: "/words/oblak.jpg" },
      { sk: "teplo", ua: "тепло", ru: "тепло", img: "/words/teplo.jpg" },
      { sk: "zima", ua: "холод", ru: "холод", img: "/words/zima.jpg" },
      { sk: "búrka", ua: "буря", ru: "буря / гроза", img: "/words/búrka.jpg" },
      { sk: "teplota", ua: "температура", ru: "температура", img: "/words/teplota.jpg" },
    ],
  },
  {
    id: "17",
    title: "Природа",
    words: [
      { sk: "príroda", ua: "природа", ru: "природа", img: "/words/príroda.jpg" },
      { sk: "strom", ua: "дерево", ru: "дерево", img: "/words/strom.jpg" },
      { sk: "les", ua: "ліс", ru: "лес", img: "/words/les.jpg" },
      { sk: "rieka", ua: "річка", ru: "река", img: "/words/rieka.jpg" },
      { sk: "jazero", ua: "озеро", ru: "озеро", img: "/words/jazero.jpg" },
      { sk: "hora", ua: "гора", ru: "гора", img: "/words/hora.jpg" },
      { sk: "kvet", ua: "квітка", ru: "цветок", img: "/words/kvet.jpg" },
      { sk: "tráva", ua: "трава", ru: "трава", img: "/words/tráva.jpg" },
      { sk: "zviera", ua: "тварина", ru: "животное", img: "/words/zviera.jpg" },
      { sk: "zem", ua: "земля", ru: "земля", img: "/words/zem.jpg" },
    ],
  },
  {
    id: "18",
    title: "Побут",
    words: [
      { sk: "domácnosť", ua: "побут", ru: "быт", img: "/words/domácnosť.jpg" },
      { sk: "dom", ua: "дім", ru: "дом", img: "/words/dom.jpg" },
      { sk: "byt", ua: "квартира", ru: "квартира", img: "/words/byt.jpg" },
      { sk: "izba", ua: "кімната", ru: "комната", img: "/words/izba.jpg" },
      { sk: "posteľ", ua: "ліжко", ru: "кровать", img: "/words/posteľ.jpg" },
      { sk: "stôl", ua: "стіл", ru: "стол", img: "/words/stôl.jpg" },
      { sk: "stolička", ua: "стілець", ru: "стул", img: "/words/stolička.jpg" },
      { sk: "kuchyňa", ua: "кухня", ru: "кухня", img: "/words/kuchyňa.jpg" },
      { sk: "chladnička", ua: "холодильник", ru: "холодильник", img: "/words/chladnička.jpg" },
      { sk: "upratovať", ua: "прибирати", ru: "убирать / прибираться", img: "/words/upratovať.jpg" },
    ],
  },
  {
    id: "19",
    title: "Дії та дієслова",
    words: [
      { sk: "robiť", ua: "робити", ru: "делать", img: "/words/robiť.jpg" },
      { sk: "ísť", ua: "йти", ru: "идти", img: "/words/ísť.jpg" },
      { sk: "prísť", ua: "прийти", ru: "прийти", img: "/words/prísť.jpg" },
      { sk: "vidieť", ua: "бачити", ru: "видеть", img: "/words/vidieť.jpg" },
      { sk: "hovoriť", ua: "говорити", ru: "говорить", img: "/words/hovoriť.jpg" },
      { sk: "jesť", ua: "їсти", ru: "есть", img: "/words/jesť.jpg" },
      { sk: "piť", ua: "пити", ru: "пить", img: "/words/piť.jpg" },
      { sk: "spať", ua: "спати", ru: "спать", img: "/words/spať.jpg" },
      { sk: "pracovať", ua: "працювати", ru: "работать", img: "/words/pracovať.jpg" },
      { sk: "učiť sa", ua: "вчитися", ru: "учиться", img: "/words/učiť sa.jpg" },
    ],
  },
  {
    id: "20",
    title: "Питання і відповіді",
    words: [
      { sk: "kto", ua: "хто", ru: "кто", img: "/words/kto.jpg" },
      { sk: "čo", ua: "що", ru: "что", img: "/words/čo.jpg" },
      { sk: "kde", ua: "де", ru: "где", img: "/words/kde.jpg" },
      { sk: "kedy", ua: "коли", ru: "когда", img: "/words/kedy.jpg" },
      { sk: "prečo", ua: "чому", ru: "почему", img: "/words/prečo.jpg" },
      { sk: "ako", ua: "як", ru: "как", img: "/words/ako.jpg" },
      { sk: "koľko", ua: "скільки", ru: "сколько", img: "/words/koľko.jpg" },
      { sk: "áno", ua: "так", ru: "да", img: "/words/áno.jpg" },
      { sk: "nie", ua: "ні", ru: "нет", img: "/words/nie.jpg" },
      { sk: "možno", ua: "можливо", ru: "возможно", img: "/words/možno.jpg" },
    ],
  },
  {
    id: "21",
    title: "Місця",
    words: [
      { sk: "miesto", ua: "місце", ru: "место", img: "/words/miesto.jpg" },
      { sk: "centrum", ua: "центр", ru: "центр", img: "/words/centrum.jpg" },
      { sk: "obchod", ua: "магазин", ru: "магазин", img: "/words/obchod.jpg" },
      { sk: "reštaurácia", ua: "ресторан", ru: "ресторан", img: "/words/reštaurácia.jpg" },
      { sk: "kaviareň", ua: "кафе", ru: "кафе", img: "/words/kaviareň.jpg" },
      { sk: "park", ua: "парк", ru: "парк", img: "/words/park.jpg" },
      { sk: "banka", ua: "банк", ru: "банк", img: "/words/banka.jpg" },
      { sk: "pošta", ua: "пошта", ru: "почта", img: "/words/pošta.jpg" },
      { sk: "polícia", ua: "поліція", ru: "полиция", img: "/words/polícia.jpg" },
      { sk: "stanica", ua: "станція / вокзал", ru: "станция / вокзал", img: "/words/stanica.jpg" },
    ],
  },
  {
    id: "22",
    title: "Емоції",
    words: [
      { sk: "radosť", ua: "радість", ru: "радость", img: "/words/radosť.jpg" },
      { sk: "smútok", ua: "смуток", ru: "грусть / печаль", img: "/words/smútok.jpg" },
      { sk: "strach", ua: "страх", ru: "страх", img: "/words/strach.jpg" },
      { sk: "hnev", ua: "злість", ru: "злость / гнев", img: "/words/hnev.jpg" },
      { sk: "láska", ua: "любов", ru: "любовь", img: "/words/láska.jpg" },
      { sk: "šťastie", ua: "щастя", ru: "счастье", img: "/words/šťastie.jpg" },
      { sk: "únava", ua: "втома", ru: "усталость", img: "/words/únava.jpg" },
      { sk: "stres", ua: "стрес", ru: "стресс", img: "/words/stres.jpg" },
      { sk: "pokoj", ua: "спокій", ru: "покой / спокойствие", img: "/words/pokoj.jpg" },
      { sk: "prekvapenie", ua: "здивування", ru: "удивление", img: "/words/prekvapenie.jpg" },
    ],
  },
  {
    id: "23",
    title: "Хобі",
    words: [
      { sk: "hobby", ua: "хобі", ru: "хобби", img: "/words/hobby.jpg" },
      { sk: "šport", ua: "спорт", ru: "спорт", img: "/words/šport.jpg" },
      { sk: "futbal", ua: "футбол", ru: "футбол", img: "/words/futbal.jpg" },
      { sk: "hudba", ua: "музика", ru: "музыка", img: "/words/hudba.jpg" },
      { sk: "film", ua: "фільм", ru: "фильм", img: "/words/film.jpg" },
      { sk: "čítanie", ua: "читання", ru: "чтение", img: "/words/čítanie.jpg" },
      { sk: "cestovanie", ua: "подорожі", ru: "путешествия", img: "/words/cestovanie.jpg" },
      { sk: "hra", ua: "гра", ru: "игра", img: "/words/hra.jpg" },
      { sk: "maľovanie", ua: "малювання", ru: "рисование", img: "/words/maľovanie.jpg" },
      { sk: "tanec", ua: "танець", ru: "танец", img: "/words/tanec.jpg" },
    ],
  },
  {
    id: "24",
    title: "Спілкування",
    words: [
      { sk: "hovoriť", ua: "говорити", ru: "говорить", img: "/words/hovoriť.jpg" },
      { sk: "rozprávať", ua: "розповідати", ru: "рассказывать", img: "/words/rozprávať.jpg" },
      { sk: "počúvať", ua: "слухати", ru: "слушать", img: "/words/počúvať.jpg" },
      { sk: "pýtať sa", ua: "питати", ru: "спрашивать", img: "/words/pýtať sa.jpg" },
      { sk: "odpovedať", ua: "відповідати", ru: "отвечать", img: "/words/odpovedať.jpg" },
      { sk: "telefonovať", ua: "телефонувати", ru: "звонить / разговаривать по телефону", img: "/words/telefonovať.jpg" },
      { sk: "správa", ua: "повідомлення", ru: "сообщение", img: "/words/správa.jpg" },
      { sk: "stretnutie", ua: "зустріч", ru: "встреча", img: "/words/stretnutie.jpg" },
      { sk: "diskusia", ua: "обговорення", ru: "обсуждение / дискуссия", img: "/words/diskusia.jpg" },
      { sk: "pozdrav", ua: "привітання", ru: "приветствие", img: "/words/pozdrav.jpg" },
    ],
  },
  {
    id: "25",
    title: "Подорожі",
    words: [
      { sk: "cesta", ua: "подорож", ru: "путешествие / дорога", img: "/words/cesta.jpg" },
      { sk: "cestovať", ua: "подорожувати", ru: "путешествовать", img: "/words/cestovať.jpg" },
      { sk: "kufor", ua: "валіза", ru: "чемодан", img: "/words/kufor.jpg" },
      { sk: "pas", ua: "паспорт", ru: "паспорт", img: "/words/pas.jpg" },
      { sk: "letenka", ua: "авіаквиток", ru: "авиабилет", img: "/words/letenka.jpg" },
      { sk: "vlak", ua: "поїзд", ru: "поезд", img: "/words/vlak.jpg" },
      { sk: "autobus", ua: "автобус", ru: "автобус", img: "/words/autobus.jpg" },
      { sk: "letisko", ua: "аеропорт", ru: "аэропорт", img: "/words/letisko.jpg" },
      { sk: "mapa", ua: "карта", ru: "карта", img: "/words/mapa.jpg" },
      { sk: "rezervácia", ua: "бронювання", ru: "бронирование", img: "/words/rezervácia.jpg" },
    ],
  },
  {
    id: "26",
    title: "Готель і ресторан",
    words: [
      { sk: "hotel", ua: "готель", ru: "отель", img: "/words/hotel.jpg" },
      { sk: "izba", ua: "кімната", ru: "комната / номер", img: "/words/izba.jpg" },
      { sk: "recepcia", ua: "ресепшн", ru: "ресепшн", img: "/words/recepcia.jpg" },
      { sk: "reštaurácia", ua: "ресторан", ru: "ресторан", img: "/words/reštaurácia.jpg" },
      { sk: "menu", ua: "меню", ru: "меню", img: "/words/menu.jpg" },
      { sk: "objednať", ua: "замовити", ru: "заказать", img: "/words/objednať.jpg" },
      { sk: "raňajky", ua: "сніданок", ru: "завтрак", img: "/words/raňajky.jpg" },
      { sk: "obed", ua: "обід", ru: "обед", img: "/words/obed.jpg" },
      { sk: "večera", ua: "вечеря", ru: "ужин", img: "/words/večera.jpg" },
      { sk: "účet", ua: "рахунок", ru: "счёт", img: "/words/účet.jpg" },
    ],
  },
  {
    id: "27",
    title: "Гроші",
    words: [
      { sk: "peniaze", ua: "гроші", ru: "деньги", img: "/words/peniaze.jpg" },
      { sk: "euro", ua: "євро", ru: "евро", img: "/words/euro.jpg" },
      { sk: "cena", ua: "ціна", ru: "цена", img: "/words/cena.jpg" },
      { sk: "platba", ua: "платіж", ru: "платёж", img: "/words/platba.jpg" },
      { sk: "hotovosť", ua: "готівка", ru: "наличные", img: "/words/hotovosť.jpg" },
      { sk: "karta", ua: "картка", ru: "карта", img: "/words/karta.jpg" },
      { sk: "účet", ua: "рахунок", ru: "счёт", img: "/words/účet.jpg" },
      { sk: "banka", ua: "банк", ru: "банк", img: "/words/banka.jpg" },
      { sk: "zľava", ua: "знижка", ru: "скидка", img: "/words/zľava.jpg" },
      { sk: "výdavky", ua: "витрати", ru: "расходы", img: "/words/výdavky.jpg" },
    ],
  },
  {
    id: "28",
    title: "Технології",
    words: [
      { sk: "technológia", ua: "технологія", ru: "технология", img: "/words/technológia.jpg" },
      { sk: "počítač", ua: "комп’ютер", ru: "компьютер", img: "/words/počítač.jpg" },
      { sk: "telefón", ua: "телефон", ru: "телефон", img: "/words/telefón.jpg" },
      { sk: "internet", ua: "інтернет", ru: "интернет", img: "/words/internet.jpg" },
      { sk: "aplikácia", ua: "додаток", ru: "приложение", img: "/words/aplikácia.jpg" },
      { sk: "program", ua: "програма", ru: "программа", img: "/words/program.jpg" },
      { sk: "systém", ua: "система", ru: "система", img: "/words/systém.jpg" },
      { sk: "sieť", ua: "мережа", ru: "сеть", img: "/words/sieť.jpg" },
      { sk: "dáta", ua: "дані", ru: "данные", img: "/words/dáta.jpg" },
      { sk: "heslo", ua: "пароль", ru: "пароль", img: "/words/heslo.jpg" },
    ],
  },
  {
    id: "29",
    title: "Повсякденні фрази",
    words: [
      { sk: "dobrý deň", ua: "добрий день", ru: "добрый день", img: "/words/dobrý deň.jpg" },
      { sk: "ahoj", ua: "привіт", ru: "привет", img: "/words/ahoj.jpg" },
      { sk: "ďakujem", ua: "дякую", ru: "спасибо", img: "/words/ďakujem.jpg" },
      { sk: "prosím", ua: "будь ласка", ru: "пожалуйста", img: "/words/prosím.jpg" },
      { sk: "prepáč", ua: "вибач", ru: "извини", img: "/words/prepáč.jpg" },
      { sk: "rozumiem", ua: "розумію", ru: "понимаю", img: "/words/rozumiem.jpg" },
      { sk: "nerozumiem", ua: "не розумію", ru: "не понимаю", img: "/words/nerozumiem.jpg" },
      { sk: "pomôžte", ua: "допоможіть", ru: "помогите", img: "/words/pomôžte.jpg" },
      { sk: "jasné", ua: "ясно", ru: "ясно", img: "/words/jasné.jpg" },
      { sk: "dobre", ua: "добре", ru: "хорошо", img: "/words/dobre.jpg" },
    ],
  },
  {
    id: "30",
    title: "Повторення бази",
    words: [
      { sk: "ja", ua: "я", ru: "я", img: "/words/ja.jpg" },
      { sk: "ty", ua: "ти", ru: "ты", img: "/words/ty.jpg" },
      { sk: "on", ua: "він", ru: "он", img: "/words/on.jpg" },
      { sk: "ona", ua: "вона", ru: "она", img: "/words/ona.jpg" },
      { sk: "my", ua: "ми", ru: "мы", img: "/words/my.jpg" },
      { sk: "vy", ua: "ви", ru: "вы", img: "/words/vy.jpg" },
      { sk: "oni", ua: "вони", ru: "они", img: "/words/oni.jpg" },
      { sk: "byť", ua: "бути", ru: "быть", img: "/words/byť.jpg" },
      { sk: "mať", ua: "мати", ru: "иметь", img: "/words/mať.jpg" },
      { sk: "ísť", ua: "йти", ru: "идти", img: "/words/ísť.jpg" },
    ],
  },
];

// ✅ нормалізуємо A0_REAL: title -> {ua,ru} + додаємо ru у слова
const A0_REAL: Lesson[] = A0_REAL_SOURCE.map((l) => ({
  ...l,
  title: toTitle(l.title),
  words: addRu(l.words),
}));

// =============================
// 4) Генеруємо з WORDS без дублювання
// =============================
const realUsed = new Set<string>(A0_REAL.flatMap((l) => l.words.map(keyOf)));

const BANK = addRu(WORDS)
  .filter((w) => w.sk && w.ua)
  .filter((w, idx, arr) => {
    const k = keyOf(w);
    return idx === arr.findIndex((x) => keyOf(x) === k);
  })
  .filter((w) => !realUsed.has(keyOf(w)));

const neededLessons = LESSONS_PER_BAND.a0 - A0_REAL.length;
const neededWords = neededLessons * WORDS_PER_LESSON;

const bankSlice = BANK.slice(0, neededWords);
const bankChunks = chunk(bankSlice, WORDS_PER_LESSON);

// =============================
// 5) Будуємо A0_ALL: 30 уроків (1..30)
// =============================
const A0_ALL: Lesson[] = Array.from({ length: LESSONS_PER_BAND.a0 }, (_, i) => {
  const n = i + 1;

  const real = A0_REAL.find((l) => Number(l.id) === n);
  const topic = A0_TITLES[n] ?? { ua: "Тема", ru: "Тема" };

  if (real) {
    return {
      ...real,
      title: { ua: `Урок ${n} — ${topic.ua}`, ru: `Урок ${n} — ${topic.ru}` },
      words: addRu(real.words),
    };
  }

  const chunkIndex = n - (A0_REAL.length + 1);
  const words = fillTo10(bankChunks[chunkIndex] ?? [], n);

  return {
    id: String(n),
    title: { ua: `Урок ${n} — ${topic.ua}`, ru: `Урок ${n} — ${topic.ru}` },
    words,
  };
});

// ✅ B2 поки порожній
const B2_ALL: Lesson[] = [];

// ✅ нормалізація A1/A2/B1 (щоб не ламалось, якщо title там string)
function normalizeLessonList(list: any[]): Lesson[] {
  return list.map((l) => ({
    id: String(l.id),
    title: toTitle(l.title ?? ""),
    words: addRu((l.words ?? []) as Word[]),
  }));
}


function findPhrase(
  dict: Record<string, any>,
  sk: string,
  ua: string,
  lessonId: string
) {
  // 1) exact match (як було)
  const exact = dict[phraseKey(sk, ua, lessonId)];
  if (exact) return exact;

  // 2) fallback: якщо ua мінявся — знайдемо будь-який ключ для цього sk + lessonId
  const skNorm = sk.trim().toLowerCase();
  const lid = String(lessonId).trim().toLowerCase();

  const prefix = `${skNorm}||`;
  const suffix = `||${lid}`;

  const hitKey = Object.keys(dict).find(
    (k) => k.startsWith(prefix) && k.endsWith(suffix)
  );

  return hitKey ? dict[hitKey] : undefined;
}

function attachPhrases(words: Word[], dict: Record<string, any>, lessonId: string) {
  return words.map((w) => {
    const p = findPhrase(dict, w.sk, w.ua, lessonId);
    return { ...w, phrase: p ?? undefined };
  });
}

const A1_LIST = normalizeLessonList(A1_ALL as any);
const A2_LIST = normalizeLessonList(A2_ALL as any);
const B1_LIST = normalizeLessonList(B1_ALL as any);



const PHRASES_BY_BAND: Partial<Record<CefrBandId, Record<string, any>>> = {
  a0: A0_PHRASES,
  a1: A1_PHRASES,
};

// =============================
// 6) CEFR_LEVELS
// =============================
export const CEFR_LEVELS: CefrBand[] = (["a0", "a1", "a2", "b1", "b2"] as CefrBandId[]).map((id) => {
  const meta = BAND_META[id];

  const lessonsSource: Lesson[] =
    id === "a0" ? A0_ALL :
      id === "a1" ? A1_LIST :
        id === "a2" ? A2_LIST :
          id === "b1" ? B1_LIST :
            B2_ALL;

  return {
    id,
    title: meta.title,
    subtitle: meta.subtitle,
    lessons: lessonsSource.map((l, idx) => {
      const n = idx + 1;
      return {
        id: `${id}-${n}`,
        title: l.title,
        wordsCount: l.words.length > 0 ? l.words.length : WORDS_PER_LESSON,
      };
    }),
  };
});


// =============================
// 7) getLesson: "a0-1" / "a1-3" / ...
// =============================
export function getLesson(id: string) {
  const raw = String(id);

  const match = raw.match(/^(a0|a1|a2|b1|b2)-(\d+)$/i);
  if (match) {
    const band = match[1].toLowerCase() as CefrBandId;
    const num = Number(match[2]);

    const sources: Record<CefrBandId, Lesson[]> = {
      a0: A0_ALL,
      a1: A1_LIST,
      a2: A2_LIST,
      b1: B1_LIST,
      b2: B2_ALL,
    };

    const lesson = sources[band][num - 1] ?? null;
    if (!lesson) return null;

    const withRu = addRu(lesson.words);

    const dict = PHRASES_BY_BAND[band];

    return {
      ...lesson,
      words: dict ? attachPhrases(withRu, dict, raw) : withRu,
    };

  }

  // старий формат "1" (підтримка A0)
  const lesson = A0_ALL.find((l) => l.id === raw) ?? null;
  if (!lesson) return null;

  const withRu = addRu(lesson.words);

  return {
    ...lesson,
    words: attachPhrases(withRu, A0_PHRASES, `a0-${raw}`),
  };
}
