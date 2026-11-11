// Flunio Arcade 4: zero-dependency smoke checks for the local source tree.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const client = read('app/daily/DailyClient.tsx');
const coursePage = read('app/daily/[course]/page.tsx');
const homePage = read('app/daily/page.tsx');
const css = read('app/daily/daily.css');
const checks = [
  ['SEO page embeds the game directly', /<DailyClient\s*\/>/.test(coursePage)],
  ['SEO pages keep three localized metadata entries', /slovak:/.test(coursePage) && /czech:/.test(coursePage) && /polish:/.test(coursePage)],
  ['No SEO-only doorway button to /daily', !/href="\/daily"/.test(coursePage)],
  ['Game uses active profile course', /useActiveCourse\(\)/.test(client) && /const course: DailyCourse = courseId/.test(client)],
  ['No in-game course picker', !/setActiveCourse\s*\(/.test(client) && !/href="\/daily\/(?:slovak|czech|polish)"/.test(client)],
  ['Daily game remains interactive', /onClick=\{startDaily\}/.test(client) && /onClick=\{startPractice\}/.test(client) && /onClick=\{startReview\}/.test(client)],
  ['Gameplay still supports all six mechanics', ['meaning','order','gap','truth','pairs','type'].every(mode => client.includes(`round.mode === "${mode}"`))],
  ['Progress survives', /finishGame\(/.test(client) && /readGameStats\(/.test(client) && /readWeak\(/.test(client)],
  ['Game has differentiated mode visuals', /data-mode=\{round.mode\}/.test(client) && /daily-mode-symbol/.test(css)],
  ['Both site themes supported', /body\.theme-flunio \.daily-arcade/.test(css) && /body\.theme-simple \.daily-arcade/.test(css)],
  ['Responsive styles present', /@media\(max-width:640px\)/.test(css)],
  ['Main page links directly to the game', /return <DailyClient\s*\/>/.test(homePage)],
];
for (const [label, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  assert.ok(ok, label);
}
try {
  const ts = require('typescript');
  for (const name of ['app/daily/DailyClient.tsx','app/daily/page.tsx','app/daily/[course]/page.tsx']) {
    const file = path.join(root,name);
    const parsed = ts.createSourceFile(file, read(name), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    assert.equal(parsed.parseDiagnostics.length,0,`Syntax error in ${name}`);
  }
  console.log('PASS TypeScript JSX parser');
} catch(e) {
  if (e.code !== 'MODULE_NOT_FOUND') throw e;
  console.log('SKIP TypeScript parser (dependencies are not installed here)');
}
console.log('Arcade v4 static smoke checks passed.');
