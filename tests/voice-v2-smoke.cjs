const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root,'app/learning/audio/voiceManifest.json'),'utf8'));
assert.ok(manifest && typeof manifest === 'object' && !Array.isArray(manifest));
for (const [key, url] of Object.entries(manifest)) {
  const [course, speaker, text] = JSON.parse(key);
  assert.ok(['sk','cs','pl'].includes(course));
  assert.equal(typeof speaker, 'string');
  assert.ok(typeof text === 'string' && text.length > 0);
  assert.match(url, /^\/audio\/flunio-voice\/(?:sk|cs|pl)\/[0-9a-f]{24}\.mp3$/);
  assert.ok(fs.existsSync(path.join(root,'public',url.slice(1))), `Missing MP3: ${url}`);
}
const adapter = fs.readFileSync(path.join(root,'app/learning/audio/practiceAudio.ts'),'utf8');
assert.match(adapter, /recordedPracticeAudio\(course, text, speaker\)/);
assert.match(adapter, /speechSynthesis/);
const generator = fs.readFileSync(path.join(root,'scripts/tts-learning-voice.ts'),'utf8');
assert.match(generator, /if \(!generate\)/);
assert.match(generator, /Safety: use --limit=N/);
console.log(`Voice v2 smoke check passed (${Object.keys(manifest).length} recorded MP3 references).`);
