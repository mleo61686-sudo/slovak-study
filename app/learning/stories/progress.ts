import type { Story } from "./data";
import type { Course } from "../personal-plan/planner";

export type StoryResult = {
  done: boolean;
  attempts: number;
  bestPercent: number;
  lastPercent: number;
  mastered: boolean;
  updatedAt: string;
};
export type StoryProgress = Record<string, StoryResult>;
const guestKey = (course: Course) => course === "sk" ? "flunio:stories:guest:v1" : `flunio:stories:guest:v1:${course}`;

export function readGuestStoryProgress(course: Course = "sk"): StoryProgress {
  if (typeof window === "undefined") return {};
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(guestKey(course)) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as StoryProgress : {};
  } catch { return {}; }
}

export function saveGuestStory(story: Story, percent: number): StoryProgress {
  const all = readGuestStoryProgress(story.course);
  const old = all[story.slug];
  const record: StoryResult = {
    done: true, attempts: (old?.attempts || 0) + 1,
    bestPercent: Math.max(old?.bestPercent || 0, percent),
    lastPercent: percent,
    mastered: Boolean(old?.mastered || percent >= 80),
    updatedAt: new Date().toISOString(),
  };
  const next = { ...all, [story.slug]: record };
  window.localStorage.setItem(guestKey(story.course), JSON.stringify(next));
  return next;
}
