import { openPool, resolveSettingsPath } from "../core/db.js";

const pool = await openPool(resolveSettingsPath(process.argv));
try {
  const rs = await pool.request().query(`
    SELECT
      t.name AS tabla,
      CAST(ep.value AS NVARCHAR(4000)) AS comentario
    FROM sys.tables t
    INNER JOIN sys.schemas s
      ON s.schema_id = t.schema_id
    LEFT JOIN sys.extended_properties ep
      ON ep.major_id = t.object_id
     AND ep.minor_id = 0
     AND ep.name = N'MS_Description'
    WHERE s.name = N'dbo'
      AND t.name IN (
        N'CAPAC_CURSOS',
        N'CAPAC_DRIVERS',
        N'CAPAC_PLANES_CURSOS',
        N'CAPAC_ATRIBUTOS_X_DRIVERS',
        N'CAPAC_ATRIBUTOS_PLANES',
        N'CAPAC_SEGURIDADES_CURSOS',
        N'CAPAC_ESTRUCTURAS_CURSOS',
        N'CAPAC_CURSOS_DE_PLANES_ESTUDIO',
        N'CAPAC_TEMAS'
      )
    ORDER BY t.name;
  `);
  console.log(JSON.stringify(rs.recordset, null, 2));
} finally {
  await pool.close();
}
