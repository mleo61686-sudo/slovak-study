import type { Lang } from "@/lib/src/language";
import type { CaseBlock, W } from "./cases-data";

export type SentencePart = {
  id: string;
  text: string;
};

export type QuizQ = {
  caseId: string;
  prompt: W;
  correct: string;
  options: string[];
};

export function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function makeSentenceParts(example: string): SentencePart[] {
  return shuffle(example.replace(/[.!?]$/, "").split(" ")).map((text, index) => ({
    id: `${text}-${index}`,
    text,
  }));
}

export function makeCaseQuiz(cases: CaseBlock[], lang: Lang): QuizQ[] {
  const picks = shuffle(cases).slice(0, 4);

  return picks.map((c) => {
    const correct = c.examples[0].sk;
    const opts = new Set<string>([correct]);

    while (opts.size < 4) {
      const anyCase = cases[Math.floor(Math.random() * cases.length)];
      const ex =
        anyCase.examples[Math.floor(Math.random() * anyCase.examples.length)].sk;
      opts.add(ex);
    }

    const prompt =
      lang === "ru"
        ? {
          sk: c.questions.sk,
          ua: "",
          ru: `${c.name.ru}: ${c.questions.ru}`,
          en: "",
        }
        : lang === "en"
          ? {
            sk: c.questions.sk,
            ua: "",
            ru: "",
            en: `${c.name.en}: ${c.questions.en}`,
          }
          : {
            sk: c.questions.sk,
            ua: `${c.name.ua}: ${c.questions.ua}`,
            ru: "",
            en: "",
          };

    return {
      caseId: c.id,
      prompt,
      correct,
      options: shuffle(Array.from(opts)),
    };
  });
}