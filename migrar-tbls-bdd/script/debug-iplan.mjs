import { openPool, resolveSettingsPath } from "../src/db.js";

const pool = await openPool(resolveSettingsPath([]));

const cols = await pool.request().query(`
  SELECT c.TABLE_NAME, c.COLUMN_NAME, c.DATA_TYPE, c.IS_NULLABLE
  FROM INFORMATION_SCHEMA.COLUMNS c
  WHERE c.TABLE_SCHEMA = N'dbo'
    AND c.TABLE_NAME IN (N'CAPAC_PLANDECURSO_OLD', N'CAPAC_PLANES_CURSOS')
    AND c.COLUMN_NAME = N'IPLAN'
  ORDER BY c.TABLE_NAME;
`);

const counts = await pool.request().query(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN [IPLAN] IS NULL THEN 1 ELSE 0 END) AS null_iplan,
    SUM(
      CASE
        WHEN [IPLAN] IS NOT NULL
          AND TRY_CAST([IPLAN] AS int) IS NULL
        THEN 1
        ELSE 0
      END
    ) AS trycast_int_fails
  FROM dbo.CAPAC_PLANDECURSO_OLD;
`);

console.log("IPLAN columns:", JSON.stringify(cols.recordset, null, 2));
console.log("Source stats:", JSON.stringify(counts.recordset[0], null, 2));

const srcLen = await pool.request().query(`
  SELECT CHARACTER_MAXIMUM_LENGTH AS src_max_len
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = N'dbo' AND TABLE_NAME = N'CAPAC_PLANDECURSO_OLD' AND COLUMN_NAME = N'IPLAN';
`);
const dstLen = await pool.request().query(`
  SELECT CHARACTER_MAXIMUM_LENGTH AS dst_max_len
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = N'dbo' AND TABLE_NAME = N'CAPAC_PLANES_CURSOS' AND COLUMN_NAME = N'IPLAN';
`);

const maxLen = dstLen.recordset[0]?.dst_max_len ?? 50;
const castProbe = await pool.request().query(`
  SELECT TOP 20
    s.[IPLAN],
    LEN(s.[IPLAN]) AS len_val,
    TRY_CAST(s.[IPLAN] AS varchar(${maxLen === -1 ? "max" : maxLen})) AS try_cast_sample
  FROM dbo.CAPAC_PLANDECURSO_OLD s
  WHERE s.[IPLAN] IS NULL OR TRY_CAST(s.[IPLAN] AS varchar(${maxLen === -1 ? "max" : maxLen})) IS NULL;
`);

console.log("Lengths:", { src: srcLen.recordset[0], dst: dstLen.recordset[0] });
console.log("Bad IPLAN rows sample:", JSON.stringify(castProbe.recordset, null, 2));

await pool.close();
