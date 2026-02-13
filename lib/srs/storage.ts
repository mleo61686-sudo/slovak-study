import { initState } from "./algorithm";
import { SrsState } from "./types";

const KEY = "slovak-srs";

export function loadSrs(): Record<string, SrsState> {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

export function saveSrs(data: Record<string, SrsState>) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getState(id: string): SrsState {
  const db = loadSrs();
  if (!db[id]) {
    db[id] = initState(id);
    saveSrs(db);
  }
  return db[id];
}

export function getDueWords(words: { sk: string }[]) {
  const db = loadSrs();
  const now = Date.now();

  return words.filter(w => {
    const s = db[w.sk] || initState(w.sk);
    return s.dueAt <= now;
  });
}