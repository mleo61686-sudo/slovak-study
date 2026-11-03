const assert = require('node:assert/strict');
const {loadTS} = require('./ts-module-loader.cjs');
const {getMissionsForCourse,gradeMission} = loadTS('app/learning/missions/data.ts');
const {getStoriesForCourse,gradeStory} = loadTS('app/learning/stories/data.ts');
const {scenarioCatalog}=loadTS('app/learning/personal-plan/scenarioCatalog.ts');
for(const course of ['sk','cs','pl']){
  const missions=getMissionsForCourse(course),stories=getStoriesForCourse(course);
  assert.equal(missions.length,5); assert.equal(stories.length,5);
  assert.deepEqual(missions.map(x=>x.slug), scenarioCatalog(course,'mission').map(x=>x.slug));
  assert.deepEqual(stories.map(x=>x.slug), scenarioCatalog(course,'story').map(x=>x.slug));
  for(const m of missions){
    assert.equal(new Set(m.steps.map(x=>x.id)).size,m.steps.length);
    if(!m.slug.endsWith('cafe')&&!m.slug.endsWith('apartment'))continue;
    assert.ok(m.steps.length>=9);
    const answers={}; for(const step of m.steps){
      if(step.kind==='choice') answers[step.id]=step.correctId;
      if(step.kind==='arrange') answers[step.id]=step.solution.join(' ');
      for(const field of ['title','summary','goal']) assert.ok(m[field].ua && m[field].ru && m[field].en);
    }
    assert.equal(gradeMission(m,answers).total,5);assert.equal(gradeMission(m,answers).percent,100);
  }
  for(const s of stories){
    if(!s.slug.endsWith('train')&&!s.slug.endsWith('interview')) continue;
    assert.equal(new Set(s.nodes.map(n=>n.id)).size,s.nodes.length);
    for(const branch of [0,1]){
      let id=s.start,answers={},visited=new Set();
      while(true){const n=s.nodes.find(n=>n.id===id);assert.ok(n && !visited.has(id),`broken path ${s.slug}:${id}`);visited.add(id);
        if(n.kind==='ending')break;
        if(n.kind==='fork'){answers[n.id]=n.options[branch].id;id=n.options[branch].next;}
        else if(n.kind==='question'){answers[n.id]=n.correctId;id=n.next;}
        else id=n.next;
      }
      assert.equal(gradeStory(s,answers).total,3);assert.equal(gradeStory(s,answers).percent,100);
    }
  }
}
console.log('PASS: 12 new scenarios, 3 languages, grading, both story branches, catalogs');
