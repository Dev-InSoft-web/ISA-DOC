import { openPool, resolveSettingsPath } from "../core/db.js";

async function main() {
  const settingsPath = resolveSettingsPath(process.argv);
  const pool = await openPool(settingsPath);
  try {
    const sql = `
      SELECT
        DB_NAME() AS dbname,
        c.name,
        c.is_nullable,
        dc.name AS df_name
      FROM sys.columns c
      LEFT JOIN sys.default_constraints dc
        ON dc.parent_object_id = c.object_id
       AND dc.parent_column_id = c.column_id
      WHERE c.object_id = OBJECT_ID('dbo.CAPAC_CURSOS')
        AND c.name = 'BGENERACERTIFICADO'
    `;
    const result = await pool.request().query(sql);
    console.log(JSON.stringify(result.recordset, null, 2));
  } finally {
    await pool.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
