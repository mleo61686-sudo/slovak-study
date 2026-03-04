import fs from "node:fs";
import path from "node:path";

type TermRow = { sk: string; ua: string; ru: string; count: number };

function main() {
  const termsPath = path.join(process.cwd(), "tmp", "sk-terms.json");
  const mapPath = path.join(process.cwd(), "tmp", "sk-to-cs.json");

  if (!fs.existsSync(termsPath)) {
    console.error(`❌ Missing ${termsPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(mapPath)) {
    console.error(`❌ Missing ${mapPath}`);
    process.exit(1);
  }

  const rows = JSON.parse(fs.readFileSync(termsPath, "utf8")) as TermRow[];
  const map = JSON.parse(fs.readFileSync(mapPath, "utf8")) as Record<string, string>;

  const todo = rows
    .filter((r) => {
      const k = String(r.sk ?? "").trim();
      if (!k) return false;
      const v = String(map[k] ?? "").trim();
      return !v; // порожнє = не перекладено
    })
    .slice(0, 50);

  const out = todo.map((r) => ({
    sk: r.sk,
    ua: r.ua,
    ru: r.ru,
    cs: "", // 👈 сюди заповнюєш
  }));

  const outPath = path.join(process.cwd(), "tmp", "cs-batch-50.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");

  console.log(`✅ Wrote ${outPath}`);
  console.log(`👉 Fill "cs" for each row, then run: npx tsx scripts/apply-cs-batch.ts`);
}

main();