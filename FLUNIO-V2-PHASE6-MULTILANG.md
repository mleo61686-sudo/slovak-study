# Flunio 2.0 — Phase 6: Czech and Polish parity

## Scope

- Adds 3 **original Czech missions**, 3 **original Polish missions** (each with 5 graded objective exercises and an ungraded production task).
- Adds 3 **Czech interactive stories**, 3 **Polish interactive stories**, each with 2 complete choice paths and 3 comprehension questions.
- Existing Slovak missions and stories retain their names and data; new content uses `cs-*` and `pl-*` slugs.
- Home pages, pathway and daily plan work for all three courses. Free/Premium eligibility remains unchanged.
- Server saves mission/story results under `byCourse.sk`, `byCourse.cs`, or `byCourse.pl` in existing `userProgress.lessonsProgress` JSON. No Prisma schema migration or XP changes.
- Guest storage uses separate locale-specific keys; legacy Slovak storage key remains unchanged.
- All courses are protected from stale lesson/XP sync overwriting server-graded outcomes.
- SpeechSynthesis / SpeechRecognition use correct locale per course (`sk-SK`, `cs-CZ`, `pl-PL`).
- A reusable playback adapter accepts **optional author-curated static `audioSrc`** paths for recorded audio. Existing browser TTS remains fallback. No ElevenLabs requests, paid generations, API key, or credential is included.
- No CSS, theme, or other global styling files modified.

## Installation

Install on top of the **Flunio 2.0 Phase 1–5 audited** version in the `courses-ui` branch. Replace same-path files from the Phase 6 patch ZIP. Make a backup / commit before overwrite. Keep `main` untouched.

### Verify locally (project dependencies installed)

```powershell
npm run test:multilang-v2
npm run test:missions-v2
npm run test:stories-v2
npm run test:personal-plan-v2
npm run test:journey-v2
npm run test:final-audit-v2
npm run build
```

## Validation in preparation environment

- Ten test scripts passed (lesson, missions, mission API, personal plan, progress sync, stories, story API, journey, final audit, multilanguage).
- 18 modified TS / TSX files parsed successfully with TypeScript AST; zero syntax diagnostics.
- Full Next.js production build **not available here** because the extracted project's `node_modules` contains empty package directories; build should be run in VS Code locally.
- No browser/device manual review performed. Narration naturalness still depends on user's browser, pending future reviewed audio assets.

## Audio integration later

For approved ElevenLabs-generated recordings, add an `audioSrc` absolute local path (e.g. `/learning-audio/cs/cs-shop/s1.mp3`) to a mission dialogue step or story scene, and place the static asset at the corresponding `public/` path. For a choice step's follow-up, use `nextAudioSrc`. No ElevenLabs secrets must be put in the browser code or committed to Git.
