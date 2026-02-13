type SrsState = {
  id: string;
  dueAt: number;
  interval: number;
  ease: number;
  reps: number;
};

const KEY = "slovakStudy.srsWords";

function loadDb(): Record<string, SrsState> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function getSrsStats(totalWords: number) {
  const db = loadDb();
  const now = Date.now();

  const allStates = Object.values(db);

  const learned = allStates.filter((s) => s.reps >= 1).length; // хоч раз правильно
  const mastered = allStates.filter((s) => s.reps >= 5 && s.interval >= 14).length; // “вивчені добре”
  const due = allStates.filter((s) => s.dueAt <= now).length;
  const newWords = totalWords - allStates.filter((s) => s.reps >= 1).length;

  return {
    total: totalWords,
    learned,
    mastered,
    due,
    newWords: Math.max(0, newWords),
  };
}