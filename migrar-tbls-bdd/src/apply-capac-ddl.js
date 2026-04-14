import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { openPool, resolveSettingsPath } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Ejecuta script/alter-capac-ddl-2026.sql por lotes (separador GO).
 * Uso: node src/apply-capac-ddl.js [--settings ruta/local.settings.json]
 */
async function main() {
  const settingsPath = resolveSettingsPath(process.argv);
  const sqlPath = path.join(__dirname, "../script/alter-capac-ddl-2026.sql");
  let raw = fs.readFileSync(sqlPath, "utf8");
  raw = raw.replace(/^\/\*[\s\S]*?\*\/\s*/, "").trim();
  const batches = raw
    .split(/\r?\nGO\r?\n/i)
    .map((s) =>
      s
        .split(/\r?\n/)
        .filter((line) => String(line).trim().toUpperCase() !== "GO")
        .join("\n")
        .trim()
    )
    .filter(Boolean);

  const pool = await openPool(settingsPath);
  try {
    for (let i = 0; i < batches.length; i += 1) {
      const b = batches[i];
      if (/^USE\s+/i.test(b)) {
        await pool.request().query(b);
        continue;
      }
      console.log(`[apply-capac-ddl] batch ${i + 1}/${batches.length}`);
      await pool.request().query(b);
    }
    console.log("[apply-capac-ddl] OK");
  } finally {
    await pool.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
