export function getDailyLessonsUsed(userId: string) {
  if (typeof window === "undefined") return 0;

  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const key = `slovakStudy.dailyLessons.${userId}.${y}-${m}-${day}`;

  const raw = localStorage.getItem(key);
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) ? n : 0;
}

export function incDailyLessonsUsed(userId: string) {
  if (typeof window === "undefined") return;

  const cur = getDailyLessonsUsed(userId);

  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const key = `slovakStudy.dailyLessons.${userId}.${y}-${m}-${day}`;

  localStorage.setItem(key, String(cur + 1));
}
