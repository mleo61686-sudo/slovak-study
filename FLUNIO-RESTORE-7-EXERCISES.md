# Flunio — restore the seven classic vocabulary exercises

This patch restores the seven kinds of exercises to every standard vocabulary lesson for Slovak, Czech and Polish, without reverting Flunio 2.0.

Sequence (same as the original course):
1. Choose translation
2. Choose target-language word
3. Type the word
4. Audio quiz
5. Match pairs (one board containing all lesson words)
6. Build a sentence
7. Build the translation

For a ten-word lesson the initial score is out of 70: 40 points from the first four types, up to 10 from the matching board, and 20 from the two sentence types. The matching board runs once, not ten times. Mistake-review exercises occur afterward and do not inflate the original score. Existing SRS integration, lesson progress, XP, missions, stories, voice library, Learning Hub V2 and both themes are unaffected.

When an authored example is missing, the two sentence types use a grammatically safe neutral phrase based on the dictionary term in quotation marks. This avoids the former incorrect `To je + verb` fallback, but these neutral examples are less valuable than fully authored contexts. Improving example coverage is a separate content task.

Installation: extract the ZIP over the project in `courses-ui`, preserving folder structure, after making a backup. No file outside `app/learning/components/LevelClient/` or `tests/` is replaced.

Local checks:
- `npm run test:lesson-v2`
- `npm run build`

This archive was validated with independent smoke tests and TypeScript/TSX syntax transpilation. The full Next.js build has not been run in this environment and must be checked on the user's machine.
