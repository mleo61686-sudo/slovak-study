/** Opt-in bridge: lessons -> existing SRS store, without resetting card history. */
import type { Word } from "./types";
import { DAILY_NEW_LIMIT, getTerm, initState, SESSION_SIZE } from "@/app/components/words-srs/words-srs-logic";
import {
  getDailySession,
  getDailyState,
  loadDb,
  saveDb,
  setDailySession,
  setDailyState,
} from "@/app/components/words-srs/words-srs-storage";

export function enrollLessonWords(
  userId: string,
  courseId: "sk" | "cs" | "pl",
  words: Word[]
): { added: number; alreadyTracked: number; dailyLimitReached: boolean } {
  if (!userId) return { added: 0, alreadyTracked: 0, dailyLimitReached: false };

  const db = loadDb(userId, courseId);
  const daily = getDailyState(userId, courseId);
  const remaining = Math.max(0, DAILY_NEW_LIMIT - daily.count);
  const ids = [...new Set(words.map((w) => getTerm(w)).filter(Boolean))];
  const untracked = ids.filter((id) => !db[id]);
  const addedIds = untracked.slice(0, remaining);

  for (const id of addedIds) db[id] = initState(id);

  if (addedIds.length > 0) {
    // Keep the SRS key, per-course separation and cross-device sync events.
    saveDb(userId, courseId, db);
    setDailyState(userId, courseId, daily.count + addedIds.length);

    // Do not discard today's existing session when adding lesson vocabulary.
    const savedSession = getDailySession(userId, courseId);
    const sessionIds = [...new Set([...(savedSession?.ids ?? []), ...addedIds])];
    setDailySession(userId, courseId, sessionIds.slice(0, SESSION_SIZE));
  }

  return {
    added: addedIds.length,
    alreadyTracked: ids.length - untracked.length,
    dailyLimitReached: untracked.length > addedIds.length,
  };
}
