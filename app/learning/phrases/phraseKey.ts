function normalizeKeyPart(value: string | number) {
  return String(value)
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1");
}

/**
 * Stable phrase key.
 *
 * New canonical format:
 *   "<normalized sk>||<normalized lessonId>"
 *
 * Backward-compatible call forms:
 *   phraseKey(sk, lessonId)
 *   phraseKey(sk, ua, lessonId) // ua is ignored on purpose
 */
export function phraseKey(
  sk: string,
  uaOrLessonId: string | number,
  maybeLessonId?: string | number
) {
  const lessonId = maybeLessonId ?? uaOrLessonId;

  return `${normalizeKeyPart(sk)}||${normalizeKeyPart(lessonId)}`;
}