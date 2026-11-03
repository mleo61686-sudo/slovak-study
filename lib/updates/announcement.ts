import { UPDATES, type UpdateItem } from "@/app/updates/updates";

// Don't notify visitors about historical updates published before this feature.
// New entries dated 2026-11-03 or later automatically activate the owl.
export const FIRST_ANNOUNCEMENT_DATE = "2026-11-03";

export function latestAnnouncedUpdateKey(updates: UpdateItem[] = UPDATES): string | null {
  const latest = [...updates].sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!latest || latest.date < FIRST_ANNOUNCEMENT_DATE) return null;
  // Title differentiates separate entries published on the same date.
  const stableTitle = latest.title.ua ?? latest.title.en ?? latest.title.ru ?? "";
  return `${latest.date}::${stableTitle}`;
}
