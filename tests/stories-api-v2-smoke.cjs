const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const compile = p => ts.transpileModule(fs.readFileSync(p,'utf8'), { compilerOptions: {module: ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022} }).outputText;
const dataModule = { exports: require('./ts-module-loader.cjs').loadTS('app/learning/stories/data.ts') };
const {getStory} = dataModule.exports;
let current = {byCourse:{ sk:{ 'a0-1':{done:true}, __missions:{shop:{bestPercent:100}} }, cs:{'a0-1':{done:true}}, pl:{} }};
let premium=false, session=true;
const row = { id:'u1', email:'test@site.test', isPremium:false, premiumUntil:null };
const prisma = {
  user: { findUnique: async () => session ? {...row,isPremium:premium} : null },
  userProgress: {
    findUnique: async () => ({ lessonsProgress:current }),
    upsert: async () => ({lessonsProgress:current}),
    update: async ({data}) => {current=data.lessonsProgress; return {};},
  },
  $transaction: async fn => fn(prisma),
};
const context = {
  exports: {},
  require: name => {
    const deps = {'next/server':{NextResponse:{json:(body,opts={})=>({body,status:opts.status||200})}},
    '@/auth':{auth:async()=>session?{user:{email:row.email}}:null},
    '@/lib/prisma':{prisma},
    '@/app/learning/stories/data':dataModule.exports};
    if (!(name in deps)) throw Error(name);
    return deps[name];
  },
  process:{env:{}}, Date, Object, console, URL,
};
vm.runInNewContext(compile('app/api/learning/stories/route.ts'), context);
const {GET,POST}=context.exports;
function perfect(slug) {
  const story=getStory(slug);
  let id=story.start; const choices={};
  for(let i=0;i<20;i++) {
    const node=story.nodes.find(n=>n.id===id);
    if(node.kind==='ending') return choices;
    if(node.kind==='fork') {choices[id]=node.options[0].id;id=node.options[0].next;}
    else if(node.kind==='question') {choices[id]=node.correctId;id=node.next;}
    else id=node.next;
  }
  throw Error('bad graph');
}
const post=(slug,selections)=>POST({json:async()=>({slug,selections})});
(async()=>{
  let out=await post('lost-keys',perfect('lost-keys'));
  assert.equal(out.status,200);
  assert.equal(current.byCourse.sk.__stories['lost-keys'].bestPercent,100);
  assert.equal(current.byCourse.sk.__missions.shop.bestPercent,100);
  assert.equal(current.byCourse.cs['a0-1'].done,true);
  assert.equal((await GET()).body.progress['lost-keys'].attempts,1);
  out=await post('lost-keys',{});
  assert.equal(out.status,400);
  const wrong=perfect('lost-keys'); wrong['first-check']='a';
  out=await post('lost-keys',wrong);
  assert.equal(out.status,200);
  assert.equal(current.byCourse.sk.__stories['lost-keys'].lastPercent,67);
  assert.equal(current.byCourse.sk.__stories['lost-keys'].bestPercent,100);
  assert.equal(current.byCourse.sk.__stories['lost-keys'].attempts,2);
  assert.equal((await post('shift-change',perfect('shift-change'))).status,403);
  premium=true;
  assert.equal((await post('shift-change',perfect('shift-change'))).status,200);
  assert.equal(current.byCourse.sk.__stories['shift-change'].done,true);
  for(const course of ['cs','pl']) {
    const slug = `${course}-lost-keys`;
    assert.equal((await post(slug, perfect(slug))).status,200);
    assert.equal(current.byCourse[course].__stories[slug].bestPercent,100);
    assert.equal((await GET({url:`https://example.test/api/learning/stories?course=${course}`})).body.progress[slug].bestPercent,100);
    assert.equal((await GET({url:`https://example.test/api/learning/stories?course=${course}`})).body.progress['lost-keys'],undefined);
  }
  assert.equal((await GET({url:'https://example.test/api/learning/stories?course=invalid'})).status,400);
  assert.equal(current.byCourse.sk.__stories['lost-keys'].attempts,2);
  session=false;
  assert.equal((await GET()).status,401);
  assert.equal((await post('lost-keys',perfect('lost-keys'))).status,401);
  console.log('Stories API smoke: PASS (auth, Premium, trusted scoring, attempt merge, progress isolation)');
})().catch(err=>{console.error(err);process.exitCode=1;});
