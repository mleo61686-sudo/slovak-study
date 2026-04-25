import type { Word } from "@/app/learning/data";
import type { CourseId } from "@/app/learning/courses/registry";
import { UI } from "./practice-texts";
import type { Lang, Mode, SessionMode, SessionQuestionBase } from "./practice-types";
import { getTerm, getTrans, sample, shuffle } from "./practice-utils";

export function getCourseLanguageName(courseId: CourseId, uiLang: Lang): string {
  const names = {
    sk: {
      ua: "словацькою",
      ru: "по-словацки",
      en: "in Slovak",
    },
    cs: {
      ua: "чеською",
      ru: "по-чешски",
      en: "in Czech",
    },
    pl: {
      ua: "польською",
      ru: "по-польски",
      en: "in Polish",
    },
  } as const;

  return names[courseId][uiLang];
}

export function buildSessionBase(
  words: Word[],
  count: number,
  sessionMode: SessionMode,
  sourceTermList?: string[]
): SessionQuestionBase[] {
  const pool = words
    .map((w, idx) => {
      const term = getTerm(w);
      return {
        ...w,
        __term: term,
        __id: `${term || "x"}-${idx}`,
        __ua: getTrans(w, "ua"),
        __ru: getTrans(w, "ru"),
        __en: getTrans(w, "en"),
      };
    })
    .filter((w) => w.__term && w.__ua && w.__ru && w.__en);

  if (pool.length < 4) return [];

  const filteredPool = sourceTermList?.length
    ? pool.filter((w) => sourceTermList.includes(w.__term))
    : pool;

  const picked = sample(filteredPool, count);

  return picked.map((w, i) => {
    let mode: Mode;

    if (sessionMode === "mcq") mode = "mcq";
    else if (sessionMode === "typing") mode = "typing";
    else mode = i % 3 === 0 ? "typing" : "mcq";

    if (mode === "typing") {
      return {
        id: `${w.__id}-typing`,
        mode: "typing",
        sk: w.__term,
        ua: w.__ua!,
        ru: w.__ru!,
        en: w.__en!,
      };
    }

    const distractors = sample(
      pool.filter((x) => x.__term !== w.__term).map((x) => x.__term),
      3
    );

    const options = shuffle([w.__term, ...distractors]).slice(0, 4);

    return {
      id: `${w.__id}-mcq`,
      mode: "mcq",
      sk: w.__term,
      ua: w.__ua!,
      ru: w.__ru!,
      en: w.__en!,
      options,
    };
  });
}

export function makePromptAndHelper(
  q: SessionQuestionBase,
  lang: Lang,
  courseId: CourseId
) {
  const tr = lang === "en" ? q.en : lang === "ru" ? q.ru : q.ua;
  const t = UI[lang];
  const courseLangName = getCourseLanguageName(courseId, lang);

  return {
    prompt:
      lang === "en"
        ? `How do you say “${tr}” ${courseLangName}?`
        : lang === "ru"
        ? `Как сказать «${tr}» ${courseLangName}?`
        : `Як сказати «${tr}» ${courseLangName}?`,
    helper: t.helper(q.sk, tr),
  };
}