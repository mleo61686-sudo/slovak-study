import fs from "node:fs";
import path from "node:path";

type TermRow = { sk: string; ua: string; ru: string; count: number };

function main() {
  const inPath = path.join(process.cwd(), "tmp", "sk-terms.json");
  if (!fs.existsSync(inPath)) {
    console.error(`❌ Missing ${inPath}. Run export-sk-terms.ts first.`);
    process.exit(1);
  }

  const rows = JSON.parse(fs.readFileSync(inPath, "utf8")) as TermRow[];

  const map: Record<string, string> = {};
  for (const r of rows) {
    const key = String(r.sk ?? "").trim();
    if (!key) continue;
    map[key] = "";
  }

  const outPath = path.join(process.cwd(), "tmp", "sk-to-pl.json");
  fs.writeFileSync(outPath, JSON.stringify(map, null, 2), "utf8");

  console.log(`✅ Created ${outPath}`);
  console.log(`✅ Keys: ${Object.keys(map).length}`);
  console.log(`👉 Fill values with Polish translations (e.g. "dom": "dom")`);
}

main();