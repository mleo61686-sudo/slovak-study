/** Offline verification for the 12 new Flunio scenarios; no ElevenLabs requests. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function extras(kind) {
  const file = path.join(root, 'app', 'learning', kind, 'content-extra.ts');
  const source = fs.readFileSync(file, 'utf8');
  const start = source.indexOf('= [');
  const end = source.lastIndexOf(']');
  if (start < 0 || end < start) throw new Error(`Unsupported extra content format: ${file}`);
  return JSON.parse(source.slice(start + 2, end + 1));
}
function normalize(text) { return text.normalize('NFC').replace(/\s+/g, ' ').trim(); }
const lines = new Map();
for (const mission of extras('missions')) {
  for (const step of mission.steps) {
    const text = step.kind === 'dialogue' ? step.sk : step.kind === 'choice' ? step.nextLine : null;
    if (text) lines.set(JSON.stringify([mission.course, step.speaker, normalize(text)]), mission.course);
  }
}
for (const story of extras('stories')) {
  for (const node of story.nodes) {
    if (node.kind === 'scene') lines.set(JSON.stringify([story.course, node.speaker, normalize(node.sk)]), story.course);
  }
}
const manifestPath = path.join(root, 'app', 'learning', 'audio', 'voiceManifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const results = Object.fromEntries(['sk', 'cs', 'pl'].map(lang => [lang, { expected: 0, found: 0, missing: 0 }]));
const missing = [];
for (const [key, course] of lines) {
  const row = results[course];
  row.expected++;
  const src = manifest[key];
  const prefix = `/audio/flunio-voice/${course}/`;
  if (typeof src !== 'string' || !src.startsWith(prefix) || !/\.mp3$/.test(src)) {
    row.missing++; missing.push(`${course}: missing manifest entry ${key.slice(0, 110)}`); continue;
  }
  const local = path.join(root, 'public', ...src.slice(1).split('/'));
  if (!fs.existsSync(local) || fs.statSync(local).size < 1000) {
    row.missing++; missing.push(`${course}: MP3 missing or too short ${src}`); continue;
  }
  row.found++;
}
console.log('FLUNIO NEW VOICES CHECK (offline; no API calls)');
for (const [course, counts] of Object.entries(results)) console.log(`${course}: ${counts.found}/${counts.expected} ready; missing ${counts.missing}`);
if (missing.length) {
  for (const problem of missing.slice(0, 12)) console.error(problem);
  if (missing.length > 12) console.error(`...plus ${missing.length - 12} others`);
  process.exitCode = 1;
} else console.log(`PASS: all ${lines.size} new recordings found in manifest and public/audio.`);
