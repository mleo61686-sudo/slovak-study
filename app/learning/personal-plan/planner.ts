import { scenarioCatalog, availableScenarios } from "./scenarioCatalog";
/**
 * Flunio learning coach, phase 3. Pure projections of existing progress.
 * No new storage keys, progress mutations, XP writes or CEFR claims.
 */
export type Course = "sk" | "cs" | "pl";
export type StudyTask = {
  key: "reviews" | "weak" | "lesson" | "mission" | "story";
  href: string;
  minutes: number;
  count?: number;
  detail?: string;
};

export type LessonRecord = boolean | {
  done?: boolean;
  mastered?: boolean;
  lastResultPercent?: number;
  lastCorrect?: number;
  lastTotal?: number;
  attempts?: number;
};
export type MissionRecord = {
  done?: boolean;
  mastered?: boolean;
  bestPercent?: number;
};
export type SrsSnapshot = {
  tracked: number;
  learned: number;
  mastered: number;
  due: number;
  weakDue: number;
  reviewedToday: number;
};
export type PlanInput = {
  course: Course;
  lessonIds: string[];
  lessons: Record<string, LessonRecord>;
  missions: Record<string, MissionRecord>;
  stories?: Record<string, MissionRecord>;
  srs: SrsSnapshot | null;
  hasPremium: boolean;
};
export type PlanSummary = {
  tasks: StudyTask[];
  completed: number;
  measurable: number;
  mastered: number;
  needsPractice: number;
  nextLesson: string | null;
  missionsCompleted: number;
  missionsMastered: number;
  storiesCompleted: number;
  storiesMastered: number;
  lastLessonAccuracy: number | null;
};

function percent(record: LessonRecord): number | null {
  if (!record || typeof record !== "object") return null;
  if (Number.isFinite(record.lastResultPercent)) return Math.max(0, Math.min(100, Math.round(record.lastResultPercent!)));
  if (typeof record.lastCorrect === "number" && typeof record.lastTotal === "number" && record.lastTotal > 0) {
    return Math.max(0, Math.min(100, Math.round((record.lastCorrect / record.lastTotal) * 100)));
  }
  return null;
}
function isDone(record: LessonRecord | undefined) {
  return record === true || Boolean(record && typeof record === "object" && record.done === true);
}
function needsPractice(record: LessonRecord | undefined): boolean {
  return isDone(record) && percent(record!) !== null && percent(record!)! < 80 && !(typeof record === "object" && record?.mastered === true);
}

export function buildPersonalPlan(input: PlanInput): PlanSummary {
  const ids = [...new Set(input.lessonIds.filter(id => /^(a0|a1|a2|b1|b2)-\d+$/i.test(id)))];
  const completedIds = ids.filter(id => isDone(input.lessons[id]));
  const scored = completedIds.map(id => percent(input.lessons[id])).filter((value): value is number => value !== null);
  // Legacy boolean completions have no measured mastery; never call them "mastered".
  const mastered = completedIds.filter(id => {
    const record = input.lessons[id];
    return Boolean(record && typeof record === "object" && record.mastered === true);
  }).length;
  const struggling = completedIds.filter(id => needsPractice(input.lessons[id]));
  const fresh = ids.find(id => !isDone(input.lessons[id])) ?? null;
  const available = (id: string) => input.hasPremium || id.toLowerCase().startsWith("a0-");
  const nextLesson = struggling.slice().reverse().find(available) ?? (fresh && available(fresh) ? fresh : null);

  const tasks: StudyTask[] = [];
  const srs = input.srs;
  if (srs && srs.due > 0) {
    const batch = Math.min(30, srs.due);
    tasks.push({ key: "reviews", href: "/words", minutes: Math.min(10, Math.max(3, Math.ceil(batch / 5))), count: batch });
  }
  if (nextLesson) {
    tasks.push({ key: struggling.includes(nextLesson) ? "weak" : "lesson", href: `/learning/${nextLesson}`, minutes: 8, detail: nextLesson.toUpperCase() });
  }
  const catalogMissions = scenarioCatalog(input.course, "mission");
  const catalogStories = scenarioCatalog(input.course, "story");
  const missionsCompleted = catalogMissions.filter(item => input.missions[item.slug]?.done).length;
  const missionsMastered = catalogMissions.filter(item => input.missions[item.slug]?.mastered).length;
  const recommendedMission = availableScenarios(input.course, "mission", completedIds, input.hasPremium)
    .find(item => !input.missions[item.slug]?.mastered);
  if (recommendedMission) tasks.push({ key: "mission", href: `/learning/missions/${recommendedMission.slug}`, minutes: recommendedMission.minutes, detail: recommendedMission.slug });
  const storiesCompleted = catalogStories.filter(item => input.stories?.[item.slug]?.done).length;
  const storiesMastered = catalogStories.filter(item => input.stories?.[item.slug]?.mastered).length;
  const recommendedStory = availableScenarios(input.course, "story", completedIds, input.hasPremium)
    .find(item => !input.stories?.[item.slug]?.mastered);
  if (recommendedStory) tasks.push({ key: "story", href: `/learning/stories/${recommendedStory.slug}`, minutes: recommendedStory.minutes, detail: recommendedStory.slug });
  return {
    tasks: tasks.slice(0, 3),
    completed: completedIds.length,
    measurable: scored.length,
    mastered,
    needsPractice: struggling.length,
    nextLesson,
    missionsCompleted,
    missionsMastered,
    storiesCompleted,
    storiesMastered,
    lastLessonAccuracy: scored.length > 0 ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : null,
  };
}
