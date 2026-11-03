/** Tiny metadata catalog; the planner should not bundle full story/mission text. */
import type { Course } from "./planner";
export type ScenarioType = "mission" | "story";
export type ScenarioInfo = { slug: string; level: "A0–A1" | "A1" | "A2" | "B1" | "B2"; premium: boolean; minutes: number };
export function scenarioCatalog(course: Course, type: ScenarioType): ScenarioInfo[] {
  const prefix = course === "sk" ? "" : `${course}-`;
  if (type === "mission") return [
    { slug: `${prefix}shop`, level: "A0–A1", premium: false, minutes: 8 },
    { slug: `${prefix}doctor`, level: "A2", premium: true, minutes: 10 },
    { slug: `${prefix}work`, level: "B1", premium: true, minutes: 12 },
  ];
  return [
    { slug: `${prefix}lost-keys`, level: "A1", premium: false, minutes: 6 },
    { slug: `${prefix}shift-change`, level: "B1", premium: true, minutes: 8 },
    { slug: `${prefix}building-meeting`, level: "B2", premium: true, minutes: 9 },
  ];
}
export function availableScenarios(course: Course, type: ScenarioType, completed: string[], hasPremium: boolean): ScenarioInfo[] {
  const reached = (band: string[]) => completed.some(id => band.includes(id.split("-")[0].toLowerCase()));
  return scenarioCatalog(course, type).filter(scenario => {
    if (!scenario.premium) return true;
    if (!hasPremium) return false;
    if (scenario.level === "A2") return reached(["a2","b1","b2"]);
    if (scenario.level === "B1") return reached(["b1","b2"]);
    if (scenario.level === "B2") return reached(["b2"]);
    return true;
  });
}
