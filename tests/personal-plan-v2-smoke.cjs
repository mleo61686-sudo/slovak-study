/** Run: npm run test:personal-plan-v2 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const file = path.join(__dirname, '../app/learning/personal-plan/planner.ts');
const mod = { exports: require('./ts-module-loader.cjs').loadTS(file) };
const { buildPersonalPlan } = mod.exports;
const defaultLessons = ['a0-1','a0-2','a1-1','a2-1','b1-1'];
const base = { course: 'sk', lessonIds: defaultLessons, lessons: {}, missions: {}, srs: null, hasPremium: false };
const start = buildPersonalPlan(base);
assert.equal(start.completed, 0);
assert.deepEqual(start.tasks.map(x => x.key), ['lesson', 'mission', 'story']);
assert.equal(start.tasks[0].href, '/learning/a0-1');
assert.equal(start.tasks[1].href, '/learning/missions/shop');
assert.equal(start.lastLessonAccuracy, null);
assert.equal(start.missionsMastered, 0);

const due = buildPersonalPlan({ ...base, lessons: { 'a0-1': { done: true, mastered: false, lastResultPercent: 60 }, 'a0-2': true, 'a1-1': { done: true, mastered: true, lastResultPercent: 92 } },
  srs: { tracked: 24, learned: 12, mastered: 5, due: 8, weakDue: 3, reviewedToday: 2 } });
assert.deepEqual(due.tasks.map(x => x.key), ['reviews', 'weak', 'mission']);
assert.equal(due.tasks[0].count, 8);
assert.equal(due.tasks[1].href, '/learning/a0-1');
assert.equal(due.completed, 3);
assert.equal(due.mastered, 1, 'legacy boolean completion is not invented mastery');
assert.equal(due.needsPractice, 1);
assert.equal(due.lastLessonAccuracy, 76);
assert.ok(due.tasks.every(x => !/learning\/(a1|a2|b1|b2)-/.test(x.href)), 'free users never directed into locked lessons');

const premium = buildPersonalPlan({ ...base, hasPremium: true,
  lessons: { 'a0-1': { done: true, mastered: true, lastResultPercent: 100 }, 'a0-2': true, 'a1-1': true, 'a2-1': true },
  missions: { shop: { done: true, mastered: true }, doctor: { done: true, mastered: false } } });
assert.equal(premium.tasks.some(x => x.href === '/learning/missions/doctor'), true);
assert.equal(premium.missionsCompleted, 2);
assert.equal(premium.missionsMastered, 1);

const crossCourse = buildPersonalPlan({ ...base, course: 'pl', lessons: { 'a0-1': true }, missions: { shop: { done: true, mastered: true } } });
assert.ok(crossCourse.tasks.some(x => x.href === '/learning/missions/pl-shop'));
assert.equal(crossCourse.missionsCompleted, 0, 'Slovak mission progress must not count in Polish');
const czech = buildPersonalPlan({ ...base, course: 'cs', stories: {} });
assert.ok(czech.tasks.some(x => x.href === '/learning/stories/cs-lost-keys'));
const allCompleted = buildPersonalPlan({ ...base, lessonIds: ['a0-1'], lessons: { 'a0-1': true }, missions: { shop: { done: true, mastered: true } } });
assert.ok(allCompleted.tasks.some(x=>x.href==='/learning/stories/lost-keys'));
assert.ok(allCompleted.tasks.every(x=>x.href!=='/learning/missions/shop'), 'do not recommend mastered mission');
const withStories = buildPersonalPlan({ ...base, stories: {} });
assert.equal(withStories.tasks.some(x => x.key === 'story' && x.href === '/learning/stories/lost-keys'), true);
const premiumStories = buildPersonalPlan({ ...base, hasPremium: true,
  lessons: { 'a0-1': true, 'b1-1': true },
  missions: { shop: { done: true, mastered: true }, work: { done: true, mastered: true } },
  stories: { 'lost-keys': { done: true, mastered: true } },
});
assert.equal(premiumStories.tasks.some(x => x.href === '/learning/stories/shift-change'), true);
assert.equal(premiumStories.storiesCompleted,1);
const polishStories = buildPersonalPlan({ ...base, course: 'pl', stories: { 'lost-keys': { done: true, mastered: true } } });
assert.equal(polishStories.storiesCompleted,0);
assert.ok(polishStories.tasks.some(x => x.href === '/learning/stories/pl-lost-keys'));
console.log('Flunio personal-plan v2: PASS (free/Premium access, legacy progress, due reviews, weak lessons, course isolation, honest mastery)');
