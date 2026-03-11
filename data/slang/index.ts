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
  exampleSk: string;
  exampleUa: string;
  exampleRu: string;
  category: SlangCategory;
  level: "A1" | "A2" | "B1";
  caution?: { ua: string; ru: string };
};

import { SLANG_SK } from "./slang-sk";
import { SLANG_CS } from "./slang-cs";

export { SLANG_SK, SLANG_CS };

export function getSlangByCourse(courseId: string): SlangItem[] {
  if (courseId === "cs") return SLANG_CS;
  return SLANG_SK;
}