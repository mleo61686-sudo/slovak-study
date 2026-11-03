/* Read TypeScript mission data without starting Next or touching user data. */
const assert = require('node:assert/strict');
const { loadTS } = require('./ts-module-loader.cjs');
const context = { module: { exports: loadTS('app/learning/missions/data.ts') } };
const { MISSIONS, getMission, gradeMission, objectiveSteps } = context.module.exports;
assert.equal(MISSIONS.length, 3);
assert.deepEqual(Array.from(MISSIONS, (m) => m.slug), ['shop', 'doctor', 'work']);
for (const mission of MISSIONS) {
  assert.ok(mission.steps.length >= 9);
  assert.equal(getMission(mission.slug), mission);
  assert.equal(new Set(mission.steps.map(s => s.id)).size, mission.steps.length);
  assert.equal(objectiveSteps(mission).length, 5);
  for (const l of ['ua', 'ru', 'en']) {
    assert.ok(mission.title[l] && mission.summary[l] && mission.goal[l]);
  }
  let perfect = {};
  let wrong = {};
  for (const step of mission.steps) {
    if (step.kind === 'dialogue') {
      assert.ok(step.sk && step.speaker);
      for (const l of ['ua', 'ru', 'en']) assert.ok(step.translation[l]);
    }
    if (step.kind === 'choice') {
      assert.equal(new Set(step.choices.map(c => c.id)).size, step.choices.length);
      assert.ok(step.choices.some(c => c.id === step.correctId));
      assert.ok(step.choices.length >= 3);
      for (const l of ['ua', 'ru', 'en']) assert.ok(step.prompt[l] && step.explanation[l]);
      perfect[step.id] = step.correctId;
      wrong[step.id] = step.choices.find(c => c.id !== step.correctId).id;
    }
    if (step.kind === 'arrange') {
      const sorted = a => [...a].sort().join('|');
      assert.equal(sorted(step.tokens), sorted(step.solution));
      perfect[step.id] = step.solution.join(' ');
      wrong[step.id] = step.tokens.join(' ') === perfect[step.id] ? 'wrong' : step.tokens.join(' ');
    }
    if (step.kind === 'produce') {
      assert.ok(step.sample && step.prompt.ua && step.translation.ua);
    }
  }
  assert.equal(gradeMission(mission, perfect).percent, 100);
  assert.equal(gradeMission(mission, wrong).percent, 0);
  const oneError = { ...perfect, [objectiveSteps(mission)[0].id]: 'incorrect' };
  assert.equal(gradeMission(mission, oneError).percent, 80);
}
console.log('Mission v2 smoke tests: PASS (3 localized missions; 5 graded tasks each; scoring; content)');
