/**
 * Phase 5. Read-only learning pathway built from the same inputs as My Daily Plan.
 * This is a route through existing activities, NOT a CEFR assessment or new progress store.
 * All links are constrained to the user's current course and entitlement.
 */
import { buildPersonalPlan, type PlanInput, type StudyTask } from "./planner";
import { scenarioCatalog, availableScenarios } from "./scenarioCatalog";

export type JourneyArea = "lesson" | "reviews" | "mission" | "story";
export type JourneyStatus = "ready" | "caught-up" | "not-started" | "locked";
export type JourneyStep = {
  area: JourneyArea;
  status: JourneyStatus;
  href: string | null;
  completed: number | null;
  total: number | null;
  detail: string | null;
};
export type LearningJourney = {
  steps: JourneyStep[];
  focus: StudyTask | null;
};

const ID = /^(a0|a1|a2|b1|b2)-(\d+)$/i;
function availableScenarioSlugs(input: PlanInput, kind: "mission" | "story"): string[] {
  const completed = Object.keys(input.lessons).filter(id =>
    ID.test(id) && (input.lessons[id] === true || (typeof input.lessons[id] === "object" && input.lessons[id]?.done === true))
  );
  return availableScenarios(input.course, kind, completed, input.hasPremium).map(item => item.slug);
}

export function buildLearningJourney(input: PlanInput): LearningJourney {
  const plan = buildPersonalPlan(input);
  const lessonIds = [...new Set(input.lessonIds.filter(id => ID.test(id)))];
  const accessibleLessonIds = lessonIds.filter(id => input.hasPremium || id.toLowerCase().startsWith("a0-"));
  const lessonStep: JourneyStep = {
    area: "lesson",
    status: plan.nextLesson ? "ready" : accessibleLessonIds.length > 0 && plan.completed >= lessonIds.length ? "caught-up" : "locked",
    href: plan.nextLesson ? `/learning/${plan.nextLesson}` : null,
    completed: accessibleLessonIds.filter(id => {
      const record = input.lessons[id];
      return record === true || (typeof record === "object" && record?.done === true);
    }).length,
    total: accessibleLessonIds.length,
    detail: plan.nextLesson?.toUpperCase() ?? null,
  };

  // A review queue being empty means 'caught up for now', not that all words are mastered.
  const reviews: JourneyStep = input.srs === null ? {
    area: "reviews", status: "not-started", href: null, completed: null, total: null, detail: null,
  } : {
    area: "reviews", status: input.srs.due > 0 ? "ready" : input.srs.tracked > 0 ? "caught-up" : "not-started",
    href: "/words", completed: input.srs.reviewedToday, total: input.srs.due,
    detail: input.srs.due > 0 ? String(input.srs.due) : null,
  };

  function scenarioStep(area: "mission" | "story"): JourneyStep {
    const all = scenarioCatalog(input.course, area);
    const results = area === "mission" ? input.missions : input.stories ?? {};
    const available = availableScenarioSlugs(input, area);
    const next = available.find(slug => !results[slug]?.mastered);
    return {
      area,
      status: next ? "ready" : available.length > 0 ? "caught-up" : "locked",
      href: next ? `/learning/${area === "mission" ? "missions" : "stories"}/${next}` : null,
      completed: all.filter(item => results[item.slug]?.done).length,
      total: all.length,
      detail: next ?? null,
    };
  }

  return {
    steps: [lessonStep, reviews, scenarioStep("mission"), scenarioStep("story")],
    focus: plan.tasks[0] ?? null,
  };
}
