const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const get = file => fs.readFileSync(path.join(root, file), 'utf8');

test('update announcements ignore historical releases', () => {
  const source = get('lib/updates/announcement.ts');
  assert.match(source, /FIRST_ANNOUNCEMENT_DATE = "2026-11-03"/);
  assert.match(source, /latest\.date < FIRST_ANNOUNCEMENT_DATE/);
  assert.match(source, /latest\.date.*stableTitle/);
});
test('the home updates tile includes the owl outside its clipped icon', () => {
  const source = get('app/HomeContent.tsx');
  const owl = source.indexOf('<UpdatesOwl latestKey=');
  const text = source.indexOf('<div className="mt-2 min-w-0 max-w-full">');
  assert(owl > 0 && owl < text);
  assert.match(source, /icon === "updates"/);
});
test('visiting updates marks the latest release as seen', () => {
  assert.match(get('app/updates/page.tsx'), /mode="mark-seen"/);
});
test('database receipt field and migration exist', () => {
  assert.match(get('prisma/schema.prisma'), /lastSeenUpdateKey\s+String\?/);
  assert.match(get('prisma/migrations/20261103120000_add_last_seen_update_key/migration.sql'), /ALTER TABLE "User" ADD COLUMN "lastSeenUpdateKey"/);
});
test('logged-in users have a server-side receipt and it is validated', () => {
  const source = get('app/api/updates/seen/route.ts');
  assert.match(source, /session\.user\.id/);
  assert.match(source, /body\?\.key !== latestKey/);
  assert.match(source, /lastSeenUpdateKey: latestKey/);
});
test('the owl respects reduced motion and supports development preview', () => {
  assert.match(get('app/components/UpdatesOwl.module.css'), /prefers-reduced-motion/);
  assert.match(get('app/components/UpdatesOwl.tsx'), /owlPreview/);
});
