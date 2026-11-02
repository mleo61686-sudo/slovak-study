/** Lightweight static regression tests for integration-only behavior.
 * Run without a database or browser: npm run test:final-audit-v2
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname,'..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const mission = read('app/learning/missions/MissionRunner.tsx');
const story = read('app/learning/stories/StoryRunner.tsx');
const sync = read('app/api/progress/route.ts');
const journey = read('app/learning/personal-plan/journey.ts');
const content = read('app/learning/LearningClient.tsx');
assert.match(mission, /flunio:mission:draft:v2:\$\{draftUser\}:\$\{mission\.slug\}/, 'Mission drafts must be per-user');
assert.match(mission, /hydratedKey !== draftKey/, 'Must not save a stale user draft after account switch');
assert.match(mission, /if \(status === "loading"\) return/, 'Must not restore guest draft while account is loading');
assert.doesNotMatch(mission, /flunio:mission:draft:\$\{mission\.slug\}/, 'Legacy shared draft key is unsafe');
for(const text of [mission,story]) {
  assert.match(text, /retrySave/, 'Saving should be retryable from the finished screen');
  assert.match(text, /saveStatus === "failed"/, 'Saving failures must be visible');
  assert.match(text, /\/learning#learning-journey/, 'Finished flow should return to path');
}
for(const key of ['__missions','__stories']) assert.ok(sync.includes(key), `General sync must preserve server-owned ${key}`);
assert.match(journey, /scenarioCatalog\(input\.course, area\)/, 'Journey must scope scenarios to selected course');
assert.doesNotMatch(content, /courseId === "sk"/, 'Mission and story sections must be available for all courses');
for (const f of ['app/learning/missions/MissionRunner.tsx','app/learning/stories/StoryRunner.tsx']) {
  const src=read(f);
  const file=ts.createSourceFile(f,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  assert.equal(file.parseDiagnostics.length,0, `${f} syntax parse failed: ${file.parseDiagnostics.map(d=>d.messageText).join('; ')}`);
}
console.log('Flunio final audit smoke: PASS (per-user drafts, retryable saving, sync isolation, navigation, TSX syntax)');
