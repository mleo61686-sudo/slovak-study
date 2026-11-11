const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Lightweight deterministic smoke test that uses the repository's TypeScript devDependency.
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname, '../app/daily/question-bank.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const moduleExports = {};
vm.runInNewContext(js, { exports: moduleExports, module: { exports: moduleExports } }, { filename: 'question-bank.js' });
const { DAILY_BANK, dailyQuestionIndexes, dailyChoiceIndexes, utcDayIndex } = moduleExports;
for (const lang of ['sk', 'cs', 'pl']) {
  assert.ok(DAILY_BANK[lang].length >= 30, `${lang} needs 30+ questions`);
  assert.equal(new Set(DAILY_BANK[lang].map((q) => q.phrase)).size, DAILY_BANK[lang].length);
  for (const entry of DAILY_BANK[lang]) {
    assert.ok(entry.phrase && entry.answer && entry.example);
    assert.equal(new Set([entry.answer, ...entry.wrong]).size, 3, `ambiguous options: ${entry.phrase}`);
    for (const locale of ['ua', 'ru', 'en']) assert.ok(entry.meaning[locale], `no ${locale} meaning: ${entry.phrase}`);
  }
  for (let date = 1; date <= 28; date++) {
    const day = `2026-11-${String(date).padStart(2, '0')}`;
    const indexes = dailyQuestionIndexes(lang, day);
    assert.equal(indexes.length, 3);
    assert.equal(new Set(indexes).size, 3);
    assert.deepEqual(indexes, dailyQuestionIndexes(lang, day));
    for (const i of indexes) assert.ok(i >= 0 && i < DAILY_BANK[lang].length);
    for (let n = 0; n < 3; n++) {
      const choices = dailyChoiceIndexes(day, n);
      assert.equal(choices.length, 3);
      assert.equal(new Set(choices).size, 3);
    }
  }
}
assert.equal(utcDayIndex('2026-11-12') - utcDayIndex('2026-11-11'), 1);
assert.throws(() => utcDayIndex('2026-02-30'));
console.log('Daily challenge smoke OK: banks, choices, dates, deterministic rotation');

const progressSource = fs.readFileSync(path.join(__dirname, '../app/daily/progress.ts'), 'utf8');
const progressJs = ts.transpileModule(progressSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const fakeStorage = new Map();
const mockWindow = { localStorage: {
  getItem(key) { return fakeStorage.get(key) || null; },
  setItem(key, val) { fakeStorage.set(key, val); },
} };
const progressExports = {};
vm.runInNewContext(progressJs, { exports: progressExports, module: { exports: progressExports }, window: mockWindow }, { filename: 'progress.js' });
const { readStats, saveStats } = progressExports;
const first = saveStats('sk', readStats('sk'), '2026-11-09', 2);
assert.equal(first.streak, 1);
assert.equal(first.sessions, 1);
const second = saveStats('sk', first, '2026-11-10', 3);
assert.equal(second.streak, 2);
assert.equal(second.bestStreak, 2);
assert.equal(second.sessions, 2);
const dup = saveStats('sk', second, '2026-11-10', 0);
assert.equal(dup.sessions, 2);
const afterGap = saveStats('sk', second, '2026-11-12', 1);
assert.equal(afterGap.streak, 1);
assert.equal(afterGap.bestStreak, 2);
assert.equal(readStats('sk').lastDate, '2026-11-12');
console.log('Daily progress smoke OK: streak, duplicate prevention, gaps, persistence');
