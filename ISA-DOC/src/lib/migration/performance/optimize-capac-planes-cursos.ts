import { openPool, resolveSettingsPath } from "../core/db.js";

async function main() {
  const pool = await openPool(resolveSettingsPath(process.argv));
  try {
    await pool.request().query(`
      IF NOT EXISTS (
        SELECT 1
        FROM sys.indexes
        WHERE name = 'IX_CAPAC_PLANES_CURSOS_ICURSO'
          AND object_id = OBJECT_ID('dbo.CAPAC_PLANES_CURSOS')
      )
      CREATE INDEX IX_CAPAC_PLANES_CURSOS_ICURSO
      ON dbo.CAPAC_PLANES_CURSOS (ICURSO)
      INCLUDE (IPLAN, IPLANPADRE, TITULO, ITEMA, IRECURSO, BACTIVO);
    `);

    const rs = await pool.request().query(`
      SELECT name
      FROM sys.indexes
      WHERE object_id = OBJECT_ID('dbo.CAPAC_PLANES_CURSOS')
      ORDER BY name;
    `);
    console.log("indices CAPAC_PLANES_CURSOS:", rs.recordset.map((r) => r.name));
  } finally {
    await pool.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
