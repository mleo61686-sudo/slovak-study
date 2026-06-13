import type { LocalizedText } from "@/app/learning/data";

export type DictationItem = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  audioSrc: string;
  text: string;
};

export const CS_A0_DICTATIONS: DictationItem[] = [
  {
    id: "cs-a0-1",
    title: {
      ua: "Диктант 1 — Мій день",
      ru: "Диктант 1 — Мой день",
      en: "Dictation 1 — My day",
    },
    description: {
      ua: "Короткий чеський A0 диктант для тренування слуху й письма.",
      ru: "Короткий чешский A0 диктант для тренировки слуха и письма.",
      en: "A short Czech A0 dictation for listening and writing practice.",
    },
    audioSrc: "/audio/dictations/cs/a0/dictation-1.mp3",
    text: `Dobrý den.
Jmenuji se Adam.
Jsem doma v malém bytě.
Ráno mám vodu, chléb a kávu.
Potom jdu do školy.
Ve škole mám češtinu a jednu hodinu matematiky.
Po škole jdu do obchodu.
Kupuji ovoce, vodu a čaj.
Doma mám čas.
Volám kamarádovi a poslouchám hudbu.
Večer čtu krátký text a odpočívám.
V sobotu nejdu do školy.
Jdu do parku a potom do restaurace.
Můj den je dobrý.`,
  },
];