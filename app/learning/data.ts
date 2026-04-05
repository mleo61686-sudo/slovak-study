// app/learning/data.ts
import { WORDS } from "../data/words";
import { A0_REAL_SOURCE } from "./levels/a0";
import { A1_ALL } from "./levels/a1";
import { A2_ALL } from "./levels/a2";
import { B1_ALL } from "./levels/b1";
import { B2_ALL } from "./levels/b2";
import { phraseKey } from "./phrases/phraseKey";
import {
  getPhrasesByBand,
  type PhraseDict,
} from "./phrases/registry";

export type Lang = "ua" | "ru" | "en";
export type ContentLang = "ua" | "ru";

export type LocalizedText = {
  ua: string;
  ru: string;
  en?: string;
};

export type Word = {
  // універсальне слово курсу (Slovak / Czech / Polish)
  term?: string;

  // legacy (поки використовується у коді)
  sk: string;

  ua: string;
  ru?: string;
  en?: string;

  ipa?: string;
  img?: string;
  imgCredit?: string;

  phrase?: {
    sk: string;
    ua: string;
    ru?: string;
    en?: string;
    tokens: string[];
  };
};

type LessonSource = {
  id: string;
  title: string | LocalizedText;
  words: Word[];
};

export type Lesson = {
  id: string;
  title: LocalizedText;
  words: Word[];
};

export type CefrBandId = "a0" | "a1" | "a2" | "b1" | "b2";

export type CefrBand = {
  id: CefrBandId;
  title: LocalizedText;
  subtitle: LocalizedText;
  lessons: { id: string; title: LocalizedText; wordsCount: number }[];
};

const LESSONS_PER_BAND: Record<CefrBandId, number> = {
  a0: 30,
  a1: 40,
  a2: 50,
  b1: 35,
  b2: 50,
};

const WORDS_PER_LESSON = 10;

const BAND_META: Record<
  CefrBandId,
  { title: LocalizedText; subtitle: LocalizedText }
> = {
  a0: {
    title: {
      ua: "A0 — Початківець",
      ru: "A0 — Новичок",
      en: "A0 — Beginner",
    },
    subtitle: {
      ua: "Старт із нуля: базові слова та фрази",
      ru: "Старт с нуля: базовые слова и фразы",
      en: "Start from zero: basic words and phrases",
    },
  },
  a1: {
    title: {
      ua: "A1 — Початковий",
      ru: "A1 — Начальный",
      en: "A1 — Elementary",
    },
    subtitle: {
      ua: "Побутові теми: магазин, робота, місто",
      ru: "Бытовые темы: магазин, работа, город",
      en: "Everyday topics: shop, work, city",
    },
  },
  a2: {
    title: {
      ua: "A2 — Базовий",
      ru: "A2 — Базовый",
      en: "A2 — Basic",
    },
    subtitle: {
      ua: "Більше словника + впевнене спілкування",
      ru: "Больше словаря + уверенное общение",
      en: "More vocabulary + more confident communication",
    },
  },
  b1: {
    title: {
      ua: "B1 — Середній",
      ru: "B1 — Средний",
      en: "B1 — Intermediate",
    },
    subtitle: {
      ua: "Діалоги, описи, розмовні теми",
      ru: "Диалоги, описания, разговорные темы",
      en: "Dialogs, descriptions, speaking topics",
    },
  },
  b2: {
    title: {
      ua: "B2 — Вище середнього",
      ru: "B2 — Выше среднего",
      en: "B2 — Upper Intermediate",
    },
    subtitle: {
      ua: "Складніші теми, нюанси, швидкість",
      ru: "Более сложные темы, нюансы, скорость",
      en: "More advanced topics, nuance and speed",
    },
  },
};

const A0_TITLES: Record<number, LocalizedText> = {
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
    term: w.term ?? w.sk,
    ru: w.ru ?? RU_OVERRIDES[w.ua] ?? w.ua,
  }));
}

function toTitle(title: string | LocalizedText): LocalizedText {
  if (typeof title === "string") return { ua: title, ru: title, en: title };
  return {
    ua: title.ua,
    ru: title.ru,
    en: title.en,
  };
}

export function pickLocalizedText(value: LocalizedText, lang: Lang): string {
  return value[lang] ?? value.ua ?? value.ru ?? "";
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
    en: "—",
  }));
  return [...words, ...fillers];
}

const A0_REAL: Lesson[] = (A0_REAL_SOURCE as LessonSource[]).map((l) => ({
  ...l,
  title: toTitle(l.title),
  words: addRu(l.words),
}));

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

function makeLessonTitle(n: number, topic: LocalizedText): LocalizedText {
  return {
    ua: `Урок ${n} — ${topic.ua}`,
    ru: `Урок ${n} — ${topic.ru}`,
    en: topic.en ? `Lesson ${n} — ${topic.en}` : undefined,
  };
}

const A0_ALL: Lesson[] = Array.from({ length: LESSONS_PER_BAND.a0 }, (_, i) => {
  const n = i + 1;

  const real = A0_REAL.find((l) => Number(l.id) === n);
  const topic = A0_TITLES[n] ?? { ua: "Тема", ru: "Тема" };

  if (real) {
    return {
      ...real,
      title: makeLessonTitle(n, topic),
      words: addRu(real.words),
    };
  }

  const chunkIndex = n - (A0_REAL.length + 1);
  const words = fillTo10(bankChunks[chunkIndex] ?? [], n);

  return {
    id: String(n),
    title: makeLessonTitle(n, topic),
    words,
  };
});

function normalizeLessonList(list: LessonSource[]): Lesson[] {
  return list.map((l) => ({
    id: String(l.id),
    title: toTitle(l.title ?? ""),
    words: addRu(l.words ?? []),
  }));
}

function findPhrase(
  dict: PhraseDict,
  sk: string,
  ua: string,
  lessonId: string
) {
  const exact = dict[phraseKey(sk, ua, lessonId)];
  if (exact) return exact;

  const skNorm = sk.trim().toLowerCase();
  const lid = String(lessonId).trim().toLowerCase();

  const prefix = `${skNorm}||`;
  const suffix = `||${lid}`;

  const hitKey = Object.keys(dict).find((k) => k.startsWith(prefix) && k.endsWith(suffix));
  return hitKey ? dict[hitKey] : undefined;
}

function attachPhrases(words: Word[], dict: PhraseDict, lessonId: string) {
  return words.map((w) => {
    const p = findPhrase(dict, w.sk, w.ua, lessonId);
    return { ...w, phrase: p ?? undefined };
  });
}

const A1_LIST = normalizeLessonList(A1_ALL as LessonSource[]);
const A2_LIST = normalizeLessonList(A2_ALL as LessonSource[]);
const B1_LIST = normalizeLessonList(B1_ALL as LessonSource[]);
const B2_LIST = normalizeLessonList(B2_ALL as LessonSource[]);

export const CEFR_LEVELS: CefrBand[] = (["a0", "a1", "a2", "b1", "b2"] as CefrBandId[]).map(
  (id) => {
    const meta = BAND_META[id];

    const lessonsSource: Lesson[] =
      id === "a0"
        ? A0_ALL
        : id === "a1"
          ? A1_LIST
          : id === "a2"
            ? A2_LIST
            : id === "b1"
              ? B1_LIST
              : B2_LIST;

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
  }
);

export function getLesson(id: string, courseId: string = "sk") {
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
      b2: B2_LIST,
    };

    const lesson = sources[band][num - 1] ?? null;
    if (!lesson) return null;

    const withRu = addRu(lesson.words);
    const dict = getPhrasesByBand(courseId, band);

    return {
      ...lesson,
      words: dict ? attachPhrases(withRu, dict, raw) : withRu,
    };
  }

  const lesson = A0_ALL.find((l) => l.id === raw) ?? null;
  if (!lesson) return null;

  const withRu = addRu(lesson.words);
  const a0Dict = getPhrasesByBand(courseId, "a0");

  return {
    ...lesson,
    words: a0Dict ? attachPhrases(withRu, a0Dict, `a0-${raw}`) : withRu,
  };
}

export const LESSONS_BY_BAND: Record<CefrBandId, Lesson[]> = {
  a0: A0_ALL,
  a1: A1_LIST,
  a2: A2_LIST,
  b1: B1_LIST,
  b2: B2_LIST,
};

export type DictionaryEntry = Word & {
  key: string;
  refs: {
    band: CefrBandId;
    lessonId: string;
    lessonTitle: LocalizedText;
  }[];
};

function dictKey(w: Word) {
  return String(w.sk).trim().toLowerCase();
}

export function buildDictionaryFromLessonsByBand(
  lessonsByBand: Record<CefrBandId, Lesson[]>
): DictionaryEntry[] {
  const map = new Map<string, DictionaryEntry>();

  (Object.keys(lessonsByBand) as CefrBandId[]).forEach((band) => {
    const lessons = lessonsByBand[band];

    lessons.forEach((lesson, idx) => {
      const lessonId = `${band}-${idx + 1}`;

      lesson.words.forEach((w) => {
        if (!w?.sk || !w?.ua) return;

        const key = dictKey(w);
        const existing = map.get(key);

        const ref = { band, lessonId, lessonTitle: lesson.title };

        if (!existing) {
          map.set(key, {
            ...addRu([w])[0],
            key,
            refs: [ref],
          });
          return;
        }

        const already = existing.refs.some((r) => r.lessonId === ref.lessonId);
        if (!already) existing.refs.push(ref);

        if (!existing.img && w.img) existing.img = w.img;
        if (!existing.ipa && w.ipa) existing.ipa = w.ipa;
        if (!existing.imgCredit && w.imgCredit) existing.imgCredit = w.imgCredit;

        if (!existing.ua && w.ua) existing.ua = w.ua;
        if (!existing.ru && w.ru) existing.ru = w.ru;
        if (!existing.en && w.en) existing.en = w.en;
      });
    });
  });

  return Array.from(map.values()).sort((a, b) => a.sk.localeCompare(b.sk, "sk"));
}

export function buildSrsWordsFromLessonsByBand(
  lessonsByBand: Record<CefrBandId, Lesson[]>
): Word[] {
  return buildDictionaryFromLessonsByBand(lessonsByBand).map(({ key, refs, ...w }) => w);
}