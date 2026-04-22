/**
 * Expresión T-SQL: código jerárquico por grupos de 3 caracteres (p. ej. "001005")
 * → notación por niveles con puntos ("1.5"). Rellena a la izquierda si la longitud
 * no es múltiplo de 3 antes de trocear.
 *
 * @param {string} srcExpr Expresión que referencia la fila origen, p. ej. s.[IPLAN]
 */
export function sqlPaddedTripletPathToDotted(srcExpr) {
   const trimmed = `RTRIM(LTRIM(${srcExpr}))`;
   const padded = `(REPLICATE(N'0', (3 - LEN(${trimmed}) % 3) % 3) + ${trimmed})`;
   return `CASE
   WHEN ${srcExpr} IS NULL OR RTRIM(LTRIM(${srcExpr})) = N'' THEN NULL
   ELSE STUFF((
      SELECT N'.' + COALESCE(
         CAST(TRY_CAST(SUBSTRING(${padded}, (t.n - 1) * 3 + 1, 3) AS INT) AS nvarchar(20)),
         LTRIM(RTRIM(SUBSTRING(${padded}, (t.n - 1) * 3 + 1, 3)))
      )
      FROM (VALUES
         (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),
         (21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32)
      ) AS t(n)
      WHERE t.n <= (LEN(${padded}) + 2) / 3
      ORDER BY t.n
      FOR XML PATH(N''), TYPE
   ).value(N'(./text())[1]', N'nvarchar(max)'), 1, 1, N'')
END`;
}

/** Padre jerárquico a partir de una ruta ya en puntos (columna IPLAN del destino). */
export const sqlUpdateIplanPadreFromDottedIplan = `
UPDATE [dbo].[CAPAC_PLANES_CURSOS]
SET [IPLANPADRE] = CASE
   WHEN [IPLAN] IS NULL OR CHARINDEX(N'.', [IPLAN]) = 0 THEN NULL
   ELSE LEFT([IPLAN], LEN([IPLAN]) - CHARINDEX(N'.', REVERSE([IPLAN])))
END
WHERE [IPLAN] IS NOT NULL
  AND [IPLANPADRE] IS NULL;
`.trim();

/** Crea/actualiza atributos base para los 3 drivers de video. */
export const sqlUpsertVideoDriverAttributes = `
WITH req AS (
  SELECT v.NDRIVER, v.IATRIBUTO, v.NATRIBUTO
  FROM (VALUES
    (N'TRES_COLUMNAS', CAST(1 AS BIGINT), N'URL DIAPOSITIVAS'),
    (N'TRES_COLUMNAS', CAST(2 AS BIGINT), N'IMAGEN DEL PROFESOR'),
    (N'TRES_COLUMNAS', CAST(3 AS BIGINT), N'DRIVER DE VÍDEO'),
    (N'TRES_COLUMNAS', CAST(4 AS BIGINT), N'DIFICULTAD'),
    (N'SEC_VIDEOS', CAST(1 AS BIGINT), N'URL DIAPOSITIVAS'),
    (N'SEC_VIDEOS', CAST(2 AS BIGINT), N'IMAGEN DEL PROFESOR'),
    (N'SEC_VIDEOS', CAST(3 AS BIGINT), N'DRIVER DE VÍDEO'),
    (N'SEC_VIDEOS', CAST(4 AS BIGINT), N'DIFICULTAD'),
    (N'SEC_RELACIONADOS', CAST(1 AS BIGINT), N'URL DIAPOSITIVAS'),
    (N'SEC_RELACIONADOS', CAST(2 AS BIGINT), N'IMAGEN DEL PROFESOR'),
    (N'SEC_RELACIONADOS', CAST(3 AS BIGINT), N'DRIVER DE VÍDEO'),
    (N'SEC_RELACIONADOS', CAST(4 AS BIGINT), N'DIFICULTAD')
  ) v(NDRIVER, IATRIBUTO, NATRIBUTO)
),
drivers AS (
  SELECT d.IDRIVER, d.NDRIVER
  FROM dbo.CAPAC_DRIVERS d
  WHERE UPPER(LTRIM(RTRIM(d.NDRIVER))) IN (N'TRES_COLUMNAS', N'SEC_VIDEOS', N'SEC_RELACIONADOS')
),
src AS (
  SELECT d.IDRIVER, r.IATRIBUTO, CAST(2 AS INT) AS QNIVEL, r.NATRIBUTO
  FROM req r
  INNER JOIN drivers d
    ON UPPER(LTRIM(RTRIM(d.NDRIVER))) = r.NDRIVER
)
MERGE dbo.CAPAC_ATRIBUTOS_X_DRIVERS AS target
USING src
  ON target.IDRIVER = src.IDRIVER
 AND target.IATRIBUTO = src.IATRIBUTO
WHEN MATCHED THEN
  UPDATE SET
    target.QNIVEL = src.QNIVEL,
    target.NATRIBUTO = src.NATRIBUTO,
    target.BREQUERIDO = ISNULL(target.BREQUERIDO, 0),
    target.TDATRIBUTO = ISNULL(target.TDATRIBUTO, 1)
WHEN NOT MATCHED THEN
  INSERT (IDRIVER, IATRIBUTO, QNIVEL, NATRIBUTO, BREQUERIDO, TDATRIBUTO)
  VALUES (src.IDRIVER, src.IATRIBUTO, src.QNIVEL, src.NATRIBUTO, 0, 1);

DELETE axd
FROM dbo.CAPAC_ATRIBUTOS_X_DRIVERS axd
INNER JOIN dbo.CAPAC_DRIVERS d
  ON d.IDRIVER = axd.IDRIVER
WHERE axd.IATRIBUTO BETWEEN 901 AND 904
  AND UPPER(LTRIM(RTRIM(d.NDRIVER))) IN (N'TRES_COLUMNAS', N'SEC_VIDEOS', N'SEC_RELACIONADOS');
`.trim();

/** Sincroniza CAPAC_ATRIBUTOS_PLANES para driver-de-video desde DRIVERVIDEO del _OLD. */
export const sqlSyncDriverVideoPlanAttributes = `
WITH src AS (
  SELECT
    o.ICURSO,
    ${sqlPaddedTripletPathToDotted("o.[IPLAN]")} AS IPLAN,
    LTRIM(RTRIM(o.DRIVERVIDEO)) AS VALOR
  FROM dbo.CAPAC_PLANDECURSO_OLD o
  WHERE o.ICURSO IS NOT NULL
    AND o.IPLAN IS NOT NULL
    AND LTRIM(RTRIM(ISNULL(o.DRIVERVIDEO, N''))) <> N''
),
src_attr AS (
  SELECT s.ICURSO, s.IPLAN, axd.IATRIBUTO, s.VALOR
  FROM src s
  INNER JOIN dbo.CAPAC_CURSOS c
    ON c.ICURSO = s.ICURSO
  INNER JOIN dbo.CAPAC_ATRIBUTOS_X_DRIVERS axd
    ON axd.IDRIVER = c.IDRIVER
   AND axd.IATRIBUTO = 3
)
MERGE dbo.CAPAC_ATRIBUTOS_PLANES AS target
USING src_attr AS src
  ON target.ICURSO = src.ICURSO
 AND target.IPLAN = src.IPLAN
 AND target.IATRIBUTO = src.IATRIBUTO
WHEN MATCHED THEN
  UPDATE SET
    target.BACTIVO = 1,
    target.VALOR = src.VALOR
WHEN NOT MATCHED THEN
  INSERT (IPLAN, ICURSO, IATRIBUTO, BACTIVO, VALOR)
  VALUES (src.IPLAN, src.ICURSO, src.IATRIBUTO, 1, src.VALOR);
`.trim();

/** Sincroniza CAPAC_ATRIBUTOS_PLANES para dificultad desde DATO1 del _OLD. */
export const sqlSyncDificultadPlanAttributes = `
WITH src AS (
  SELECT
    o.ICURSO,
    ${sqlPaddedTripletPathToDotted("o.[IPLAN]")} AS IPLAN,
    UPPER(LTRIM(RTRIM(o.DATO1))) AS VALOR
  FROM dbo.CAPAC_PLANDECURSO_OLD o
  WHERE o.ICURSO IS NOT NULL
    AND o.IPLAN IS NOT NULL
    AND UPPER(LTRIM(RTRIM(ISNULL(o.DATO1, N'')))) IN (N'B', N'M', N'A')
),
src_attr AS (
  SELECT s.ICURSO, s.IPLAN, axd.IATRIBUTO, s.VALOR
  FROM src s
  INNER JOIN dbo.CAPAC_CURSOS c
    ON c.ICURSO = s.ICURSO
  INNER JOIN dbo.CAPAC_ATRIBUTOS_X_DRIVERS axd
    ON axd.IDRIVER = c.IDRIVER
   AND axd.IATRIBUTO = 4
)
MERGE dbo.CAPAC_ATRIBUTOS_PLANES AS target
USING src_attr AS src
  ON target.ICURSO = src.ICURSO
 AND target.IPLAN = src.IPLAN
 AND target.IATRIBUTO = src.IATRIBUTO
WHEN MATCHED THEN
  UPDATE SET
    target.BACTIVO = 1,
    target.VALOR = src.VALOR
WHEN NOT MATCHED THEN
  INSERT (IPLAN, ICURSO, IATRIBUTO, BACTIVO, VALOR)
  VALUES (src.IPLAN, src.ICURSO, src.IATRIBUTO, 1, src.VALOR);
`.trim();

/** Limpia atributos legacy (900+) en CAPAC_ATRIBUTOS_PLANES para cursos con drivers de video. */
export const sqlCleanupLegacy900PlanAttributes = `
DELETE ap
FROM dbo.CAPAC_ATRIBUTOS_PLANES ap
INNER JOIN dbo.CAPAC_CURSOS c
  ON c.ICURSO = ap.ICURSO
INNER JOIN dbo.CAPAC_DRIVERS d
  ON d.IDRIVER = c.IDRIVER
WHERE ap.IATRIBUTO >= 900
  AND UPPER(LTRIM(RTRIM(d.NDRIVER))) IN (N'TRES_COLUMNAS', N'SEC_VIDEOS', N'SEC_RELACIONADOS');
`.trim();
