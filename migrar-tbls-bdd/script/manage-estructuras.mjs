import { openPool, resolveSettingsPath } from "../src/db.js";

function parseArgs(argv) {
  const actionIdx = argv.indexOf("--action");
  return {
    action: actionIdx >= 0 ? String(argv[actionIdx + 1] || "").trim() : "check",
  };
}

async function actionCheck(pool) {
  const rs = await pool.request().query(`
    SELECT OBJECT_ID('dbo.CAPAC_ESTRUCTURAS_CURSOS','U') AS oid;
    SELECT COUNT(*) AS n FROM dbo.CAPAC_ESTRUCTURAS_CURSOS;
    SELECT TOP 5 * FROM dbo.CAPAC_ESTRUCTURAS_CURSOS ORDER BY ICURSO, QNIVEL;
  `);
  console.log("oid:", rs.recordsets[0]?.[0]?.oid ?? null);
  console.log("rows:", rs.recordsets[1]?.[0]?.n ?? 0);
  console.log("sample:", rs.recordsets[2] || []);
}

async function actionDrop(pool) {
  await pool
    .request()
    .query("IF OBJECT_ID('dbo.CAPAC_ESTRUCTURAS_CURSOS','U') IS NOT NULL DROP TABLE dbo.CAPAC_ESTRUCTURAS_CURSOS;");
  const chk = await pool
    .request()
    .query("SELECT CASE WHEN OBJECT_ID('dbo.CAPAC_ESTRUCTURAS_CURSOS','U') IS NULL THEN 0 ELSE 1 END AS existe;");
  console.log(`CAPAC_ESTRUCTURAS_CURSOS existe=${chk.recordset[0]?.existe ?? 1}`);
}

async function actionCreateMirror(pool) {
  await pool.request().query(`
    IF OBJECT_ID('dbo.CAPAC_ESTRUCTURAS_CURSOS', 'U') IS NOT NULL
      DROP TABLE dbo.CAPAC_ESTRUCTURAS_CURSOS;
    IF OBJECT_ID('dbo.CAPAC_ESTRUCTURAS_CURSOS', 'V') IS NOT NULL
      DROP VIEW dbo.CAPAC_ESTRUCTURAS_CURSOS;
  `);
  await pool.request().query(`
    SELECT *
    INTO dbo.CAPAC_ESTRUCTURAS_CURSOS
    FROM dbo.CAPAC_PLANES_CURSOS;
  `);
  const chk = await pool.request().query(`
    SELECT
      OBJECT_ID('dbo.CAPAC_ESTRUCTURAS_CURSOS', 'U') AS table_id,
      (SELECT COUNT(*) FROM dbo.CAPAC_ESTRUCTURAS_CURSOS) AS filas_espejo,
      (SELECT COUNT(*) FROM dbo.CAPAC_PLANES_CURSOS) AS filas_origen;
  `);
  const row = chk.recordset[0] || {};
  console.log(`table_id=${row.table_id ?? 0}`);
  console.log(`filas_espejo=${row.filas_espejo ?? 0}`);
  console.log(`filas_origen=${row.filas_origen ?? 0}`);
} 

async function actionReseed2Levels(pool) {
  await pool.request().query(`
    DELETE FROM dbo.CAPAC_ESTRUCTURAS_CURSOS;
    INSERT INTO dbo.CAPAC_ESTRUCTURAS_CURSOS (ICURSO, QNIVEL, NNIVEL, BACTIVO)
    SELECT c.ICURSO, v.QNIVEL, NULL, 1
    FROM dbo.CAPAC_CURSOS c
    CROSS JOIN (VALUES (CAST(1 AS TINYINT)), (CAST(2 AS TINYINT))) v(QNIVEL)
    WHERE ISNULL(c.ICURSO, '') <> '';
  `);
  const chk = await pool.request().query(`
    SELECT
      COUNT(*) AS filas,
      COUNT(DISTINCT ICURSO) AS cursos,
      MIN(QNIVEL) AS min_nivel,
      MAX(QNIVEL) AS max_nivel
    FROM dbo.CAPAC_ESTRUCTURAS_CURSOS;
  `);
  console.log(chk.recordset[0] || {});
}

async function main() {
  const { action } = parseArgs(process.argv);
  const pool = await openPool(resolveSettingsPath(process.argv));
  try {
    switch (action) {
      case "check":
        await actionCheck(pool);
        break;
      case "drop":
        await actionDrop(pool);
        break;
      case "create-mirror":
        await actionCreateMirror(pool);
        break;
      case "reseed-2levels":
        await actionReseed2Levels(pool);
        break;
      default:
        throw new Error(`Acción no soportada: ${action}`);
    }
  } finally {
    await pool.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
