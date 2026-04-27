import sql from "mssql";
import { openPool, resolveSettingsPath } from "../core/db.js";

/**
 * Inspector consolidado para consultas de soporte en tablas CAPAC_*.
 *
 * Uso:
 *   tsx src/lib/migration/inspect/inspect-capac.ts --mode list-aplic-tables
 *   tsx src/lib/migration/inspect/inspect-capac.ts --mode columns --tables CAPAC_PLANDECURSO_OLD,CAPAC_PLANES_CURSOS
 *   tsx src/lib/migration/inspect/inspect-capac.ts --mode sample-iplan --top 12
 */

function parseArgs(argv: string[]) {
  const modeIdx = argv.indexOf("--mode");
  const tablesIdx = argv.indexOf("--tables");
  const topIdx = argv.indexOf("--top");
  return {
    mode: modeIdx >= 0 ? String(argv[modeIdx + 1]) : "list-aplic-tables",
    tables:
      tablesIdx >= 0
        ? String(argv[tablesIdx + 1] || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    top: topIdx >= 0 ? Number(argv[topIdx + 1]) || 10 : 10,
  };
}

async function listAplicTables(pool: sql.ConnectionPool) {
  const r = await pool.request().query(`
    SELECT TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = N'dbo'
      AND TABLE_NAME LIKE N'%APLIC%'
    ORDER BY TABLE_NAME;
  `);
  console.log(r.recordset.map((x: { TABLE_NAME: string }) => x.TABLE_NAME).join("\n"));
}

async function listColumns(pool: sql.ConnectionPool, tables: string[]) {
  const targets =
    tables.length > 0 ? tables : ["CAPAC_PLANDECURSO_OLD", "CAPAC_PLANES_CURSOS"];
  for (const t of targets) {
    const r = await pool.request().input("t", t).query(`
      SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = N'dbo' AND TABLE_NAME = @t
      ORDER BY ORDINAL_POSITION;
    `);
    console.log(`\n== ${t} ==`);
    for (const row of r.recordset) {
      console.log(row.COLUMN_NAME, row.DATA_TYPE, row.CHARACTER_MAXIMUM_LENGTH, row.IS_NULLABLE);
    }
  }
}

async function sampleIplan(pool: sql.ConnectionPool, top: number) {
  const n = Number.isFinite(top) && top > 0 ? top : 10;
  const r = await pool.request().query(`
    SELECT TOP (${n}) IPLAN, IPLANPADRE, TITULO
    FROM dbo.CAPAC_PLANES_CURSOS
    ORDER BY IPLAN;
  `);
  console.log(JSON.stringify(r.recordset, null, 2));
}

async function main() {
  const args = parseArgs(process.argv);
  const pool = await openPool(resolveSettingsPath(process.argv));
  try {
    switch (args.mode) {
      case "list-aplic-tables":
        await listAplicTables(pool);
        break;
      case "columns":
        await listColumns(pool, args.tables);
        break;
      case "sample-iplan":
        await sampleIplan(pool, args.top);
        break;
      default:
        throw new Error(`Modo no soportado: ${args.mode}`);
    }
  } finally {
    await pool.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
