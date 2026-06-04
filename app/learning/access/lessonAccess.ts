export type LessonBand = "a0" | "a1" | "a2" | "b1" | "b2";

export type LessonLockReasonCode =
  | "premium_a1"
  | "premium_advanced"
  | "premium_lesson"
  | "unknown_lesson";

export function parseLessonId(levelId: string): {
  band: LessonBand | null;
  number: number | null;
} {
  const match = String(levelId)
    .trim()
    .toLowerCase()
    .match(/^(a0|a1|a2|b1|b2)-(\d+)$/);

  if (!match) {
    return {
      band: null,
      number: null,
    };
  }

  return {
    band: match[1] as LessonBand,
    number: Number(match[2]),
  };
}

/**
 * Current monetization model:
 *
 * Free:
 * - A0 lessons are free.
 * - No daily limit for A0.
 *
 * Premium:
 * - A1, A2, B1, B2.
 */
export function isFreeLesson(levelId: string): boolean {
  const { band } = parseLessonId(levelId);
  return band === "a0";
}

export function isPremiumLesson(levelId: string): boolean {
  const { band } = parseLessonId(levelId);

  if (!band) return true;

  return band !== "a0";
}

export function getLessonLockReasonCode(
  levelId: string
): LessonLockReasonCode {
  const { band } = parseLessonId(levelId);

  if (!band) return "unknown_lesson";

  if (band === "a1") {
    return "premium_a1";
  }

  if (band === "a2" || band === "b1" || band === "b2") {
    return "premium_advanced";
  }

  return "premium_lesson";
}

/**
 * Backward-compatible export.
 * This returns a CODE, not translated UI text.
 */
export function getLockedLessonReason(levelId: string): LessonLockReasonCode {
  return getLessonLockReasonCode(levelId);
}