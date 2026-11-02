# Flunio Learning Hub V2 — dimensional editorial design

## Scope
Only `/learning`, opened by the "go to learning" button. This is NOT a home-page redesign.

## What changed
- Four custom light-weight *illustrated dimensional SVG objects* (book, review cards, speech bubbles, open book). These are built as source SVG; no external image requests, no AI-generated imagery or WebGL runtime.
- An original compass-style fifth graphic for the top recommendation.
- A 2 × 2 editorial grid on tablets and desktop; single-column mobile navigation with the visual to the left and text to the right. On very narrow screens, spacing and progress display adapt further.
- Simplified top header with actual lesson progress and unobtrusive progress bar.
- Current recommendation stays visible; other recommendations, the profile, and all CEFR levels remain expandable.
- Existing UA/RU/EN translations, links, Free/Premium gating, personal plans, guest/authenticated progress stay intact.
- No changes to missions, stories, SRS, ElevenLabs, audio, database, main landing page or global CSS theme files.

## Installation
Install ON TOP of the user's currently installed **Learning Hub V1** patch in the `courses-ui` branch. Unpack archive into project root, preserving structure and replacing three existing files:
- `app/learning/LearningClient.tsx`
- `app/learning/personal-plan/DailyLearningPlan.tsx`
- `tests/learning-hub-ui-smoke.cjs`

And add:
- `app/learning/LearningHubV2.module.css`
- `public/learning/hub/*.svg` (5 assets)

Before installing, create a local backup of changed files. To reject, restore the backed-up files. New CSS/SVG assets may be removed afterward. Do NOT use `git reset --hard` if you have uncommitted work.

Run `node tests/learning-hub-ui-smoke.cjs` then `npm run build`. Test `/learning` at 360px, 390px, 768px and desktop widths in both `theme-flunio` and `theme-simple`. Validate the expandable A0–B2 submenu and route navigation. This patch has been source- and syntax-checked but **has not passed a complete local Next.js build**.
