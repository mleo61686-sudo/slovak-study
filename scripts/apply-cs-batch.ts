import fs from "node:fs";
import path from "node:path";

type Row = { sk: string; cs: string };

function main() {
  const batchPath = path.join(process.cwd(), "tmp", "cs-batch-50.json");
  const mapPath = path.join(process.cwd(), "tmp", "sk-to-cs.json");

  if (!fs.existsSync(batchPath)) {
    console.error(`❌ Missing ${batchPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(mapPath)) {
    console.error(`❌ Missing ${mapPath}`);
    process.exit(1);
  }

  const batch = JSON.parse(fs.readFileSync(batchPath, "utf8")) as Row[];
  const map = JSON.parse(fs.readFileSync(mapPath, "utf8")) as Record<string, string>;

  let applied = 0;
  let skipped = 0;

  for (const r of batch) {
    const sk = String(r.sk ?? "").trim();
    const cs = String((r as any).cs ?? "").trim();
    if (!sk) continue;

    if (!cs) {
      skipped += 1;
      continue;
    }

    map[sk] = cs;
    applied += 1;
  }

  fs.writeFileSync(mapPath, JSON.stringify(map, null, 2), "utf8");

  console.log(`✅ Applied: ${applied}`);
  console.log(`⚠️ Skipped (empty cs): ${skipped}`);
  console.log(`👉 Now run: npx tsx scripts/build-cs-levels.ts`);
}

main();