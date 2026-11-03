const assert = require('node:assert/strict');
const fs = require('node:fs');
const {loadTS} = require('./ts-module-loader.cjs');
const {getMission, getMissionsForCourse, objectiveSteps, gradeMission, ALL_MISSIONS} = loadTS('app/learning/missions/data.ts');
const {getStory, getStoriesForCourse, gradeStory, getNode, ALL_STORIES} = loadTS('app/learning/stories/data.ts');
const {scenarioCatalog} = loadTS('app/learning/personal-plan/scenarioCatalog.ts');
assert.equal(ALL_MISSIONS.length, 15);
assert.equal(ALL_STORIES.length, 15);
assert.equal(new Set(ALL_MISSIONS.map(m=>m.slug)).size,15);
assert.equal(new Set(ALL_STORIES.map(s=>s.slug)).size,15);
for (const course of ['sk','cs','pl']) {
  assert.equal(getMissionsForCourse(course).length,5);
  assert.equal(getStoriesForCourse(course).length,5);
  assert.deepEqual(getMissionsForCourse(course).map(m=>m.slug),scenarioCatalog(course,'mission').map(m=>m.slug));
  assert.deepEqual(getStoriesForCourse(course).map(s=>s.slug),scenarioCatalog(course,'story').map(s=>s.slug));
  for(const mission of getMissionsForCourse(course)) {
    assert.equal(getMission(mission.slug),mission);
    assert.equal(objectiveSteps(mission).length,5);
    assert.equal(new Set(mission.steps.map(step=>step.id)).size,mission.steps.length);
    const perfect = {};
    for (const step of mission.steps) {
      if(step.kind==='choice') { assert.equal(step.choices.length,3); assert.ok(step.choices.find(c=>c.id===step.correctId)); perfect[step.id]=step.correctId; }
      if(step.kind==='arrange') {assert.deepEqual([...step.tokens].sort(),[...step.solution].sort());perfect[step.id]=step.solution.join(' ');}
      if(step.kind==='dialogue') for(const lang of ['ua','ru','en']) assert.ok(step.translation[lang]);
      if(step.kind==='produce') for(const lang of ['ua','ru','en']) assert.ok(step.prompt[lang] && step.translation[lang]);
    }
    assert.equal(gradeMission(mission,perfect).percent,100);
    assert.equal(gradeMission(mission,{...perfect,[objectiveSteps(mission)[0].id]:'wrong'}).percent,80);
  }
  for(const story of getStoriesForCourse(course)) {
    assert.equal(getStory(story.slug),story);
    assert.equal(new Set(story.nodes.map(n=>n.id)).size, story.nodes.length);
    for (const branch of [0,1]) {
      let id=story.start; const answers={};const seen=new Set();
      for(let n=0;n<25;n++){
        assert.ok(!seen.has(id), `loop at ${story.slug}:${id}`); seen.add(id);
        const node=getNode(story,id); assert.ok(node,`missing node ${story.slug}:${id}`);
        if(node.kind==='ending') break;
        if(node.kind==='fork') {answers[id]=node.options[branch].id;id=node.options[branch].next;}
        else if(node.kind==='question') {assert.equal(node.choices.length,3); answers[id]=node.correctId;id=node.next;}
        else id=node.next;
      }
      assert.equal(gradeStory(story,answers)?.percent,100,`${story.slug}: branch ${branch}`);
      assert.equal(gradeStory(story,{...answers,invalid:'bad'}),null);
    }
  }
}
const audio=fs.readFileSync('app/learning/audio/practiceAudio.ts','utf8');
assert.match(audio,/cs-CZ/);assert.match(audio,/pl-PL/);
for(const path of ['app/learning/missions/MissionRunner.tsx','app/learning/stories/StoryRunner.tsx'])assert.match(fs.readFileSync(path,'utf8'),/playPracticeAudio/);
console.log('Multilanguage v2 PASS: 15 missions, 15 stories, language isolation, branches, scoring, audio locales.');
