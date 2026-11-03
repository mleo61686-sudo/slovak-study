import type { Mission } from "./data";
import type { Course } from "../personal-plan/planner";

export type MissionResult = {
  done: boolean;
  bestPercent: number;
  lastPercent: number;
  attempts: number;
  mastered: boolean;
  updatedAt: string;
};

export type MissionProgress = Record<string, MissionResult>;

const guestKey = (course: Course) => course === "sk" ? "flunio:missions:guest:v1" : `flunio:missions:guest:v1:${course}`;

export function readGuestProgress(course: Course = "sk"): MissionProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = JSON.parse(window.localStorage.getItem(guestKey(course)) || "{}");
    return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  } catch { return {}; }
}

export function saveGuestResult(mission: Mission, percent: number): MissionProgress {
  const prev = readGuestProgress(mission.course);
  const old = prev[mission.slug];
  const next = {
    ...prev,
    [mission.slug]: {
      done: true,
      bestPercent: Math.max(old?.bestPercent || 0, percent),
      lastPercent: percent,
      attempts: (old?.attempts || 0) + 1,
      mastered: Boolean(old?.mastered || percent >= 80),
      updatedAt: new Date().toISOString(),
    },
  };
  window.localStorage.setItem(guestKey(mission.course), JSON.stringify(next));
  return next;
}
