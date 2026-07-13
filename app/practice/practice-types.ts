import type { Word } from "@/app/learning/data";
import type { CourseId } from "@/app/learning/courses/registry";

export type Lang = "ua" | "ru" | "en";
export type Mode = "mcq" | "typing" | "listening";
export type SessionMode = "mixed" | "mcq" | "typing" | "listening" | "blitz";

export type ListeningOption = {
  sk: string;
  ua: string;
  ru: string;
  en: string;
};

export type SessionQuestionBase =
  | {
      id: string;
      mode: "mcq";
      sk: string;
      ua: string;
      ru: string;
      en: string;
      options: string[];
    }
  | {
      id: string;
      mode: "typing";
      sk: string;
      ua: string;
      ru: string;
      en: string;
    }
  | {
      id: string;
      mode: "listening";
      sk: string;
      ua: string;
      ru: string;
      en: string;
      options: ListeningOption[];
    };

export type PracticeClientProps = {
  initialCourseId: CourseId;
  initialWords: Word[];
  pack: string | null;
  slangLevel: string | null;
  slangCat: string | null;
};

export type PracticeStats = {
  bestAccuracyPct: number;
  bestStreak: number;
  bestScore: number;
  bestBlitzPoints: number;
};

export type PracticeMistake = {
  sk: string;
  ua: string;
  ru: string;
  en: string;
  mode: Mode;
  your?: string;
};