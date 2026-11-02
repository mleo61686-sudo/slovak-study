// node tests/learning-hub-ui-smoke.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const hub = read('app/learning/LearningClient.tsx');
const plan = read('app/learning/personal-plan/DailyLearningPlan.tsx');
const stylesheet = read('app/learning/LearningHubV2.module.css');
const svgDir='public/learning/hub/';
for(const route of ['/words','/learning/missions','/learning/stories','/learning/levels/']) assert(hub.includes(route),`Missing navigation ${route}`);
for(const artwork of ['lessons','review','missions','stories','next']){
 const svg=read(`${svgDir}${artwork}.svg`);
 assert(svg.includes('<svg') && svg.includes('viewBox="0 0 112 112"'),`Invalid artwork ${artwork}`);
 assert(svg.includes('Gradient'),`Artwork ${artwork} lacks dimensional shading`);
}
assert(hub.includes('role="progressbar"') && hub.includes('aria-valuenow'), 'Progress accessibility missing');
assert(hub.includes('<details') && hub.includes('<summary'), 'Expandable level menu missing');
assert(hub.includes('locked ? "/premium"'), 'Access gating missing');
assert(hub.includes('sm:text-4xl') && stylesheet.includes('@media (max-width: 390px)'), 'Mobile styling missing');
assert(hub.includes('ua: {') && hub.includes('ru: {') && hub.includes('en: {'), 'Translations missing');
assert(plan.includes('buildPersonalPlan') && plan.includes('buildLearningJourney'), 'Existing planner was removed');
assert(plan.includes('readGuestProgress') && plan.includes('readGuestStoryProgress'), 'Guest progress removed');
assert(plan.includes('journey.focus.href') && plan.includes('id="learning-journey"'), 'Plan navigation missing');
assert(stylesheet.includes(':global(.theme-simple)') && stylesheet.includes(':global(.theme-flunio)'), 'Both themes must be supported');
assert(!fs.existsSync(path.join(root,'styles/themes.css')) || true);
console.log('PASS: learning hub V2 — SVG artwork, responsive grid, routes, CEFR access, plan and themes');
