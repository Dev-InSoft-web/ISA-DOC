import { openPool, resolveSettingsPath } from "../src/db.js";

async function main() {
  const pool = await openPool(resolveSettingsPath(process.argv));
  try {
    const tx = pool.transaction();
    await tx.begin();
    try {
      const req = tx.request();

      await req.query(`
        IF OBJECT_ID('dbo.CAPAC_ESTRUCTURAS_CURSOS', 'V') IS NOT NULL
          DROP VIEW dbo.CAPAC_ESTRUCTURAS_CURSOS;
        IF OBJECT_ID('dbo.CAPAC_ESTRUCTURAS_CURSOS', 'U') IS NOT NULL
          DROP TABLE dbo.CAPAC_ESTRUCTURAS_CURSOS;
      `);

      await req.query(`
        CREATE TABLE dbo.CAPAC_ESTRUCTURAS_CURSOS (
          ICURSO VARCHAR(255) NOT NULL,
          QNIVEL TINYINT NOT NULL,
          NNIVEL VARCHAR(255) NULL,
          BACTIVO BIT NULL CONSTRAINT DF_CAPAC_ESTRUCTURAS_CURSOS_BACTIVO DEFAULT (1),
          IUSUARIOCRE VARCHAR(255) NULL,
          IAPPCRE VARCHAR(255) NULL,
          IPCRE VARCHAR(255) NULL,
          FHCRE DATETIME2 NULL CONSTRAINT DF_CAPAC_ESTRUCTURAS_CURSOS_FHCRE DEFAULT (GETDATE()),
          IUSUARIOULT VARCHAR(255) NULL,
          IAPPULT VARCHAR(255) NULL,
          IPULT VARCHAR(255) NULL,
          FHULT DATETIME2 NULL CONSTRAINT DF_CAPAC_ESTRUCTURAS_CURSOS_FHULT DEFAULT (GETDATE()),
          CONSTRAINT PK_CAPAC_ESTRUCTURAS_CURSOS PRIMARY KEY (ICURSO, QNIVEL)
        );
      `);

      await req.query(`
        ;WITH base AS (
          SELECT
            c.ICURSO,
            CASE
              WHEN TRY_CONVERT(int, d.QNIVELES) IS NOT NULL AND TRY_CONVERT(int, d.QNIVELES) > 0
                THEN TRY_CONVERT(int, d.QNIVELES)
              ELSE 2
            END AS qniveles
          FROM dbo.CAPAC_CURSOS c
          LEFT JOIN dbo.CAPAC_DRIVERS d ON d.IDRIVER = c.IDRIVER
          WHERE ISNULL(c.ICURSO, '') <> ''
        )
        INSERT INTO dbo.CAPAC_ESTRUCTURAS_CURSOS (ICURSO, QNIVEL, NNIVEL, BACTIVO)
        SELECT
          b.ICURSO,
          CAST(v.q AS TINYINT) AS QNIVEL,
          NULL AS NNIVEL,
          1 AS BACTIVO
        FROM base b
        CROSS APPLY (
          VALUES (1), (2), (3), (4), (5)
        ) v(q)
        WHERE v.q <= b.qniveles;
      `);

      await tx.commit();
    } catch (e) {
      await tx.rollback();
      throw e;
    }

    const chk = await pool.request().query(`
      SELECT
        (SELECT COUNT(*) FROM dbo.CAPAC_ESTRUCTURAS_CURSOS) AS filas_estructuras,
        (SELECT COUNT(DISTINCT ICURSO) FROM dbo.CAPAC_ESTRUCTURAS_CURSOS) AS cursos_con_estructura;
    `);
    const row = chk.recordset[0] || {};
    console.log(`filas_estructuras=${row.filas_estructuras ?? 0}`);
    console.log(`cursos_con_estructura=${row.cursos_con_estructura ?? 0}`);
  } finally {
    await pool.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
