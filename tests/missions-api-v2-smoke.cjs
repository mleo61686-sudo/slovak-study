/* Isolated API test: no database, network, account or external side effects. */
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');

function load(file, fakeRequire) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const context = { exports: {}, require: fakeRequire, process, Date, Error, URL };
  vm.runInNewContext(code, context, { filename: file });
  return context.exports;
}
const data = require('./ts-module-loader.cjs').loadTS('app/learning/missions/data.ts');
let user = { id: 'u1', email: 'someone@example.org', isPremium: true, premiumUntil: null };
let session = { user: { email: user.email } };
let progress = { byCourse: { sk: { 'a0-1': { done: true, mastered: true } }, cs: { 'a0-1': { done: true } }, pl: {} } };
const fake = {
  user: { findUnique: async () => user },
  userProgress: {
    findUnique: async () => ({ lessonsProgress: progress }),
    upsert: async () => ({ lessonsProgress: progress }),
    update: async ({ data }) => { progress = data.lessonsProgress; return { lessonsProgress: progress }; },
  },
  $transaction: async fn => fn(fake),
};
const mod = load('app/api/learning/missions/route.ts', name => {
  if (name === 'next/server') return { NextResponse: { json: (value, options = {}) => ({ data: value, status: options.status || 200 }) } };
  if (name === '@/auth') return { auth: async () => session };
  if (name === '@/lib/prisma') return { prisma: fake };
  if (name === '@/app/learning/missions/data') return data;
  throw new Error('Unexpected module: ' + name);
});
const post = (slug, answers) => mod.POST({ json: async () => ({ slug, answers }) });
(async () => {
  assert.equal((await mod.GET()).status, 200);
  assert.equal((await post('unknown', {})).status, 404);
  assert.equal((await post('shop', { bad: 'x' })).status, 400);
  const mission = data.getMission('shop');
  const answers = {};
  for (const item of data.objectiveSteps(mission)) {
    answers[item.id] = item.kind === 'choice' ? item.correctId : item.solution.join(' ');
  }
  const oneWrong = { ...answers, [data.objectiveSteps(mission)[0].id]: 'wrong' };
  assert.equal((await post('shop', oneWrong)).data.result.percent, 80);
  assert.equal((await post('shop', answers)).data.progress.bestPercent, 100);
  assert.equal((await post('shop', oneWrong)).data.progress.bestPercent, 100);
  assert.equal((await post('shop', oneWrong)).data.progress.attempts, 4);
  assert.equal(progress.byCourse.sk['a0-1'].done, true);
  assert.equal(progress.byCourse.cs['a0-1'].done, true);
  assert.equal(progress.byCourse.sk.__missions.shop.mastered, true);
  assert.equal((await mod.GET()).data.progress.shop.bestPercent, 100);
  // Every language has its own server-owned progress namespace.
  for (const course of ['cs','pl']) {
    const slug = `${course}-shop`;
    const m = data.getMission(slug);
    const perfect = Object.fromEntries(data.objectiveSteps(m).map(step => [step.id, step.kind==='choice' ? step.correctId : step.solution.join(' ')]));
    assert.equal((await post(slug, perfect)).status, 200);
    assert.equal(progress.byCourse[course].__missions[slug].bestPercent, 100);
    assert.equal((await mod.GET({url:`https://example.test/api/learning/missions?course=${course}`})).data.progress[slug].bestPercent,100);
    assert.equal((await mod.GET({url:`https://example.test/api/learning/missions?course=${course}`})).data.progress.shop,undefined);
  }
  assert.equal((await mod.GET({url:'https://example.test/api/learning/missions?course=xx'})).status,400);
  assert.equal(progress.byCourse.sk.__missions.shop.bestPercent,100);
  user = { ...user, isPremium: false };
  assert.equal((await post('doctor', Object.fromEntries(data.objectiveSteps(data.getMission('doctor')).map(item => [item.id, 'wrong'])))).status, 403);
  session = null;
  assert.equal((await mod.GET()).status, 401);
  assert.equal((await post('shop', answers)).status, 401);
  console.log('Mission API smoke tests: PASS (auth, premium, grading, best score, existing lessons retained)');
})().catch(err => { console.error(err); process.exitCode = 1; });
