import type { CefrBandId } from "@/app/learning/data";
import type { CourseId } from "@/app/learning/courses/registry";
import { CZECH_AUDIO_PRACTICE_ITEMS } from "./data-cs";
import { POLISH_AUDIO_PRACTICE_ITEMS } from "./data-pl";
import { SLOVAK_AUDIO_PRACTICE_ITEMS } from "./data-sk";
import type { AudioPracticeItem } from "./types";

export type { AudioPracticeItem, AudioPracticeQuestion } from "./types";

const COURSE_IDS = ["sk", "cs", "pl"] as const;
const BAND_IDS = ["a0", "a1", "a2", "b1", "b2"] as const;

export function isAudioCourseId(value: string): value is CourseId {
  return (COURSE_IDS as readonly string[]).includes(value);
}

export function isAudioBandId(value: string): value is CefrBandId {
  return (BAND_IDS as readonly string[]).includes(value);
}

export const AUDIO_PRACTICE_ITEMS: AudioPracticeItem[] = [
  ...SLOVAK_AUDIO_PRACTICE_ITEMS,
  ...POLISH_AUDIO_PRACTICE_ITEMS,
  ...CZECH_AUDIO_PRACTICE_ITEMS,
];

export function getAudioPracticeItems(
  courseId: CourseId,
  band: CefrBandId,
): AudioPracticeItem[] {
  return AUDIO_PRACTICE_ITEMS.filter(
    (item) => item.courseId === courseId && item.band === band,
  );
}

export function getAudioPracticeItem(
  courseId: CourseId,
  band: CefrBandId,
  slug: string,
): AudioPracticeItem | undefined {
  return AUDIO_PRACTICE_ITEMS.find(
    (item) => item.courseId === courseId && item.band === band && item.slug === slug,
  );
}
