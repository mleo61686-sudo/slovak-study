/* Zero-dependency smoke test: compiles only the pure game modules using the local TypeScript installation.
   Run with: node tests/daily-arcade-v2-smoke.cjs (typescript is a devDependency). */
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname,'..');
let ts;
try {ts=require('typescript');} catch { // CI or diagnostic environment with TypeScript globally installed
  try {ts=require(path.join(require('child_process').execFileSync('npm',['root','-g'],{encoding:'utf8'}).trim(),'typescript'));}
  catch {throw new Error('Install dependencies first: npm ci');}
}
const moduleCache = new Map();
function load(relative) {
  let filename = path.resolve(root,relative);
  if (!filename.endsWith('.ts')) filename += '.ts';
  if (moduleCache.has(filename)) return moduleCache.get(filename).exports;
  const source = fs.readFileSync(filename,'utf8');
  const ast = ts.createSourceFile(filename,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
  assert.equal(ast.parseDiagnostics.length,0,`Parse errors in ${relative}`);
  const js=ts.transpileModule(source,{fileName:filename,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const mod={exports:{}};moduleCache.set(filename,mod);
  const fn=new Function('require','module','exports','window',js);
  const fakeRequire=(dep)=>dep.startsWith('.')?load(path.join(path.dirname(relative),dep)):require(dep);
  fn(fakeRequire,mod,mod.exports,global.window);
  return mod.exports;
}
const store=new Map();
global.window={localStorage:{getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)}};
const {EXPRESSIONS,GAPS}=load('app/daily/game-data');
const {createDailyRounds,ROUND_COUNT,checkOrder,normalizedWord}=load('app/daily/game-engine');
const {finishGame,readDraft,saveDraft,readGameStats,effectiveStreak}=load('app/daily/game-progress');
assert.equal(ROUND_COUNT,12);
const days=[];
for(let i=0;i<365;i++) days.push(new Date(Date.UTC(2026,10,11+i)).toISOString().slice(0,10));
let sessions=0;
for(const course of ['sk','cs','pl']) for(const level of ['starter','everyday','advanced']) {
  assert(EXPRESSIONS[course][level].length>=20,`Expression pool too small ${course}/${level}`);
  assert(GAPS[course][level].length>=9,`Gap pool too small ${course}/${level}`);
  const signatures=new Set();
  for(const date of days) {
    const r=createDailyRounds(course,level,date);
    assert.deepEqual(r,createDailyRounds(course,level,date),'non-deterministic day');
    assert.equal(r.length,ROUND_COUNT);
    assert.deepEqual(new Set(r.map(x=>x.mode)),new Set(['meaning','order','gap','truth','pairs','type']));
    signatures.add(r.map(x=>x.expression?.phrase??x.gap?.before??x.pairs?.map(p=>p.phrase).join('|')).join('~~'));
    for(const round of r) {
      if(round.mode==='meaning') {assert(round.choices.includes(round.expression.answer));assert.equal(round.choices.length,3);assert.equal(new Set(round.choices).size,3);assert.equal(round.choices[round.correctChoice],round.expression.answer);}
      if(round.mode==='gap') {assert.equal(round.choices[round.correctChoice],round.gap.answer); assert(round.gap.before.includes('___'));assert.equal(new Set(round.choices).size,3);}
      if(round.mode==='type') {assert(round.gap.before.includes('___'));assert(normalizedWord(round.gap.answer).length>0);}
      if(round.mode==='order'){assert(round.tokens.length>=3);assert(checkOrder(round,round.tokens.map((_,i)=>i)));assert(!checkOrder(round,round.tokens.map(t=>t.id)),'not actually scrambled');}
      if(round.mode==='pairs'){assert.equal(round.pairs.length,3);assert.equal(new Set(round.pairs.map(p=>p.phrase)).size,3);assert.equal(new Set(round.pairs.map(p=>p.answer)).size,3,`ambiguous matching pairs for ${course}/${level}/${date}`);}
      if(round.mode==='truth'){assert.equal(typeof round.isTrue,'boolean');}
    }
    sessions++;
  }
  assert(signatures.size>=20,`Not enough daily variety: ${course}/${level} ${signatures.size}`);
}
// A day only counts once, regardless of which level is played. Replays retain the best score.
let stats=finishGame('sk','starter','2026-11-11',9,12);
assert.equal(stats.streak,1);assert.equal(stats.activeDays,1);
stats=finishGame('sk','everyday','2026-11-11',7,12);
assert.equal(stats.streak,1);assert.equal(stats.activeDays,1);
stats=finishGame('sk','starter','2026-11-11',11,12);
assert.equal(stats.results['2026-11-11'].starter.score,11);assert.equal(stats.activeDays,1);
stats=finishGame('sk','starter','2026-11-11',3,12);
assert.equal(stats.results['2026-11-11'].starter.score,11);
stats=finishGame('sk','starter','2026-11-12',10,12);
assert.equal(stats.streak,2);assert.equal(stats.activeDays,2);assert.equal(effectiveStreak(stats,'2026-11-13'),2);
assert.equal(effectiveStreak(stats,'2026-11-14'),0);
stats=finishGame('sk','starter','2026-11-14',9,12);
assert.equal(stats.streak,1);assert.equal(stats.bestStreak,2);
saveDraft('cs','advanced',{date:'2026-11-11',step:5,score:4,mistakes:1});
assert.equal(readDraft('cs','advanced','2026-11-11').step,5);
assert.equal(readDraft('cs','advanced','2026-11-12'),null);
assert.equal(readGameStats('pl').activeDays,0);
// Navbar must not be a second random promotional slot; primary launcher owns discovery.
const home=fs.readFileSync(path.join(root,'app/HomeContent.tsx'),'utf8');
assert(home.includes('icon: "daily"'));
assert(home.includes('xl:grid-cols-9'));
assert(!home.includes('Flunio Daily · B1–C1'));
for(const slug of ['slovak','czech','polish']) assert(fs.readFileSync(path.join(root,'app/sitemap.ts'),'utf8').includes(`/daily/${slug}`));
console.log(`Flunio Arcade v2 OK: ${sessions} simulated course/day/level sessions; 12 rounds, 6 types, content, scoring, resume and routes.`);
