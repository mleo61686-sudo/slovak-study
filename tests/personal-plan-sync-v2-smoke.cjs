/* Guard the existing lesson/XP synchronization against stale mission progress. */
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const src = fs.readFileSync('app/api/progress/route.ts', 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
let saved = { byCourse: {
  sk: { 'a0-1': { done: true }, __missions: { shop: { attempts: 4, bestPercent: 100, mastered: true } }, __stories: { 'lost-keys': { attempts: 3, bestPercent: 100, mastered: true } } },
  cs: { 'a0-1': { done: true }, __missions: { 'cs-shop': { attempts: 6, bestPercent: 100 } }, __stories: { 'cs-lost-keys': { attempts: 5, bestPercent: 100 } } },
  pl: { __missions: { 'pl-shop': { attempts: 2, bestPercent: 100 } } },
} };
const user = { id: 'u1' };
const prisma = {
  user: { findUnique: async () => user },
  userProgress: {
    findUnique: async () => ({ lessonsProgress: saved, xp: 45, lastUnlockedLevel: 'a0-1' }),
    upsert: async ({ update }) => {
      saved = update.lessonsProgress;
      return { updatedAt: new Date(), xp: update.xp, lastUnlockedLevel: update.lastUnlockedLevel || 'a0-1', dailyCount: 0 };
    },
  },
  $transaction: async (fn) => fn(prisma),
};
const modules = {
  'next/server': { NextResponse: { json: (body, opts = {}) => ({ body, status: opts.status || 200 }) } },
  '@/auth': { auth: async () => ({ user: { email: 'test@example.com' } }) },
  '@/lib/prisma': { prisma },
};
const context = { exports: {}, require: name => { if (!(name in modules)) throw Error(name); return modules[name]; }, console, setTimeout, Promise, URL, Date };
vm.runInNewContext(js, context, { filename: 'progress/route.ts' });
const sync = (lessons, courseId = 'sk') => context.exports.PUT({ json: async () => ({ userId: 'u1', courseId, lessonsProgress: lessons, xpTotal: 60 }) });
(async () => {
  const response = await sync({ 'a0-2': { done: true }, __missions: { shop: { attempts: 1, bestPercent: 20, mastered: false } }, __stories: { 'lost-keys': { attempts: 1, bestPercent: 0, mastered: false } } });
  assert.equal(response.status, 200);
  assert.equal(saved.byCourse.sk.__missions.shop.bestPercent, 100);
  assert.equal(saved.byCourse.sk.__missions.shop.attempts, 4);
  assert.equal(saved.byCourse.sk.__stories['lost-keys'].bestPercent, 100);
  assert.equal(saved.byCourse.sk.__stories['lost-keys'].attempts, 3);
  assert.equal(saved.byCourse.sk['a0-2'].done, true);
  assert.equal(saved.byCourse.cs['a0-1'].done, true);
  const incoming = { __missions: { doctor: { bestPercent: 100 } }, __stories: { 'building-meeting': { bestPercent: 100 } } };
  const response2 = await sync(incoming);
  assert.equal(response2.status, 200);
  assert.equal(saved.byCourse.sk.__missions.doctor, undefined);
  assert.equal(saved.byCourse.sk.__stories['building-meeting'], undefined);
  await sync({ 'a0-2': true, __missions: { 'cs-shop': { bestPercent: 0 } }, __stories: { 'cs-lost-keys': { bestPercent: 0 } } }, 'cs');
  assert.equal(saved.byCourse.cs.__missions['cs-shop'].bestPercent, 100);
  assert.equal(saved.byCourse.cs.__stories['cs-lost-keys'].attempts, 5);
  await sync({ __missions: { 'pl-shop': { bestPercent: 0 } } }, 'pl');
  assert.equal(saved.byCourse.pl.__missions['pl-shop'].bestPercent, 100);
  console.log('Flunio progress sync: PASS (mission and story results stay server-authoritative; lessons and other courses intact)');
})().catch(err => { console.error(err); process.exitCode = 1; });
