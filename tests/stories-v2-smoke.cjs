/** Story content graph / server-authoritative traversal; no web or database required. */
const assert = require('node:assert/strict');
const { loadTS } = require('./ts-module-loader.cjs');
const ctx = { exports: loadTS('app/learning/stories/data.ts') };
const { STORIES, getStory, gradeStory, getNode } = ctx.exports;
assert.equal(STORIES.length,3);
assert.deepEqual([...STORIES.map(s => s.level)], ['A1','B1','B2']);
assert.equal(STORIES.filter(s => !s.premium).length,1);
function traverse(story, forkOption = 0, invalidAt = null) {
  const choices = {};
  const path = [];
  let id = story.start;
  for(let k=0;k<30;k++) {
    const n = getNode(story,id);
    assert.ok(n,`missing node ${story.slug}:${id}`);
    assert.ok(!path.includes(id), `cycle in ${story.slug}:${id}`);
    path.push(id);
    if(n.kind==='ending') break;
    if(n.kind==='fork') { choices[n.id] = n.options[forkOption].id; id = n.options[forkOption].next; }
    else if(n.kind==='question') {
      choices[n.id] = invalidAt === n.id ? n.choices.find(c=>c.id!==n.correctId).id : n.correctId;
      id=n.next;
    } else id=n.next;
  }
  return { choices, path };
}
for(const story of STORIES) {
  assert.equal(getStory(story.slug), story);
  assert.equal(new Set(story.nodes.map(n=>n.id)).size, story.nodes.length);
  for(const l of ['ua','ru','en']) assert.ok(story.title[l] && story.goal[l] && story.summary[l]);
  for(const node of story.nodes) {
    if(node.kind==='scene' || node.kind==='ending') {
      assert.ok(node.sk.length>20);
      for(const l of ['ua','ru','en']) assert.ok(node.translation[l]);
    }
    if(node.kind==='scene') for(const g of node.glossary||[]) for(const l of ['ua','ru','en']) assert.ok(g.meaning[l]);
    if(node.kind==='question') {
      assert.ok(node.choices.length>=3);
      assert.ok(node.choices.some(c=>c.id===node.correctId));
      assert.equal(new Set(node.choices.map(c=>c.id)).size,node.choices.length);
      for(const l of ['ua','ru','en']) assert.ok(node.explanation[l] && node.prompt[l]);
    }
  }
  for(const which of [0,1]) {
    const path = traverse(story,which);
    const score = gradeStory(story,path.choices);
    assert.ok(score,`valid story path rejected ${story.slug}`);
    assert.equal(score.total,3);
    assert.equal(score.percent,100);
    assert.equal(score.path.join('|'),path.path.join('|'));
    const question = story.nodes.find(n=>n.kind==='question');
    const minus = gradeStory(story,{...path.choices,[question.id]:question.choices.find(c=>c.id!==question.correctId).id});
    assert.equal(minus.correct,2);
    assert.equal(minus.percent,67);
    assert.equal(gradeStory(story,{...path.choices,garbage:'x'}),null, 'extra answers rejected');
    assert.equal(gradeStory(story,{...path.choices,[question.id]:'not-an-option'}),null);
    const incomplete = {...path.choices}; delete incomplete[question.id];
    assert.equal(gradeStory(story,incomplete),null, 'incomplete answers rejected');
    const fork = story.nodes.find(n=>n.kind==='fork');
    assert.equal(gradeStory(story,{...path.choices,[fork.id]:'wrong'}),null, 'invalid branch rejected');
  }
}
console.log('Stories v2 smoke: PASS (3 localized stories, 2 complete valid branches each, 3 graded questions per path, invalid attempts rejected)');
