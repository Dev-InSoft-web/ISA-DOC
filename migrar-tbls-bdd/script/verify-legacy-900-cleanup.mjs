import { openPool, resolveSettingsPath } from "../src/db.js";

const pool = await openPool(resolveSettingsPath(process.argv));
try {
  const rs = await pool.request().query(`
    SELECT TOP 20 IATRIBUTO, ICURSO, IPLAN, VALOR
    FROM dbo.CAPAC_ATRIBUTOS_PLANES
    WHERE ICURSO = 'ACT-CP2022'
      AND IPLAN = '10.10'
    ORDER BY IATRIBUTO;

    SELECT COUNT(*) AS legacy900
    FROM dbo.CAPAC_ATRIBUTOS_PLANES ap
    INNER JOIN dbo.CAPAC_CURSOS c
      ON c.ICURSO = ap.ICURSO
    INNER JOIN dbo.CAPAC_DRIVERS d
      ON d.IDRIVER = c.IDRIVER
    WHERE ap.IATRIBUTO >= 900
      AND UPPER(LTRIM(RTRIM(d.NDRIVER))) IN (N'TRES_COLUMNAS', N'SEC_VIDEOS', N'SEC_RELACIONADOS');
  `);
  console.log("ACT-CP2022 / 10.10:");
  console.log(JSON.stringify(rs.recordsets[0] || [], null, 2));
  console.log("legacy900:", rs.recordsets[1]?.[0]?.legacy900 ?? -1);
} finally {
  await pool.close();
}
