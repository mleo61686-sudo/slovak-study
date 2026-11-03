# Flunio – Learning Hub, version 1 (UI experiment)

**Target:** `/learning` – the page opened from the main website by selecting "Go to learning". This is not a redesign of the home page.

## What changes

- One short recommendation with a single primary action.
- Four compact horizontal navigation rows with icons on the left, a title and a short description on the right: lessons / word review / real-life missions / interactive stories.
- CEFR A0–B2 levels are inside an expandable "Lessons by level" row; they still link to the existing level pages and respect the Free/Premium access rule.
- Detailed progress, learning route and other recommendations are available inside collapsed details. No existing progress-writing logic, SRS, Premium access, missions or stories is removed.
- Designed mobile-first: readable 320px+ layouts, 44px+ interactive targets and no side-scroll within the new hub.
- UA/RU/EN interface strings preserved. The course content still follows the currently selected Slovak/Czech/Polish course.

## What does NOT change

- No global CSS/theme files changed. The existing dark `theme-flunio` and light `theme-simple` styles remain untouched.
- No database, API, XP, SRS algorithms, audio files, or home page changes.
- No new package dependency.

## Installation and rollback

1. Be on the `courses-ui` Git branch.
2. Create a backup or commit your current work first.
3. Unpack the archive **at your project root**, preserving the directory structure and replacing the two existing TSX files. The new icon component and smoke test are additional files.
4. Run `node tests/learning-hub-ui-smoke.cjs` then `npm run build` and open `/learning` on desktop and a phone viewport.
5. If you don't like the redesign, undo the patch with Git (if the prior changes were committed) or restore the two files from your backup. Do not reset unrelated, uncommitted changes.

## Files included

- `app/learning/LearningClient.tsx`
- `app/learning/personal-plan/DailyLearningPlan.tsx`
- `app/learning/components/LearningHubIcon.tsx` (new)
- `tests/learning-hub-ui-smoke.cjs` (new)

This is a candidate layout for user approval, **not yet validated by a full Next.js browser test**.
