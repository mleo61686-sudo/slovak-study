export type SlangCategory =
  | "daily"
  | "work"
  | "friends"
  | "street"
  | "reactions";

export type SlangItem = {
  id: string;
  sk: string;
  ua: string;
  ru: string;
  en: string;

  exampleSk: string;
  exampleUa: string;
  exampleRu: string;
  exampleEn: string;

  category: SlangCategory;
  level: "A1" | "A2" | "B1" | "B2";

  caution?: {
    ua: string;
    ru: string;
    en: string;
  };
};

import { SLANG_SK } from "./slang-sk";
import { SLANG_CS } from "./slang-cs";
import { SLANG_PL } from "./slang-pl";

export { SLANG_SK, SLANG_CS, SLANG_PL };

export function getSlangByCourse(courseId: string): SlangItem[] {
  if (courseId === "cs") return SLANG_CS;
  if (courseId === "pl") return SLANG_PL;
  return SLANG_SK;
}