<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import mdIntro from "../../lib/bitacora/imgdoc-intro.md?raw";
	import mdFase1a from "../../lib/bitacora/imgdoc-fase1a.md?raw";
	import mdFase1b from "../../lib/bitacora/imgdoc-fase1b.md?raw";
	import mdFase2a from "../../lib/bitacora/imgdoc-fase2a.md?raw";
	import mdFase2b from "../../lib/bitacora/imgdoc-fase2b.md?raw";
	import mdFase2c from "../../lib/bitacora/imgdoc-fase2c.md?raw";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let date: string = "";
	export let inner: boolean = false;

	const NATR_IMAGEN: string = "Imagen del profesor";
	const NATR_DOCUMENTO: string = "Documento";

	const sqlSeedImagen: string = `-- =====================================================================
-- Fase 1a · Sembrar atributo "${NATR_IMAGEN}" por driver
-- ---------------------------------------------------------------------
-- "${NATR_IMAGEN}" ya existe en algunos drivers. Reusamos su IATRIBUTO
-- y TDATRIBUTO para mantener el patrón compartido (mismo IATRIBUTO en
-- todos los drivers). Si no existiera en ningún driver todavía, se asigna
-- un IATRIBUTO nuevo con TDATRIBUTO=1 (texto/URL).
--
-- Idempotente: sólo inserta la fila por driver si todavía no existe.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @nImg NVARCHAR(64) = N'${NATR_IMAGEN}';

-- Reusa IATRIBUTO existente o asigna el siguiente disponible (rango bajo).
DECLARE @iAtrImg BIGINT = (
    SELECT TOP 1 IATRIBUTO FROM CAPAC_ATRIBUTOS_X_DRIVERS WHERE NATRIBUTO = @nImg
);
DECLARE @tdImg INT = ISNULL((
    SELECT TOP 1 TDATRIBUTO FROM CAPAC_ATRIBUTOS_X_DRIVERS WHERE NATRIBUTO = @nImg
), 1);

IF @iAtrImg IS NULL
    SET @iAtrImg = ISNULL((SELECT MAX(IATRIBUTO) FROM CAPAC_ATRIBUTOS_X_DRIVERS WHERE IATRIBUTO < 100), 0) + 1;

INSERT INTO CAPAC_ATRIBUTOS_X_DRIVERS
    (IATRIBUTO, IDRIVER, NATRIBUTO, TDATRIBUTO, BREQUERIDO, QNIVEL, JCONFIG)
SELECT @iAtrImg, d.IDRIVER, @nImg, @tdImg, 0, 2, NULL
FROM CAPAC_DRIVERS d
WHERE NOT EXISTS (
    SELECT 1 FROM CAPAC_ATRIBUTOS_X_DRIVERS x
    WHERE x.IDRIVER = d.IDRIVER AND x.NATRIBUTO = @nImg
);

SELECT @iAtrImg AS IATRIBUTO_Imagen;

COMMIT TRAN;
`;

	const sqlSeedDocumento: string = `-- =====================================================================
-- Fase 1b · Crear atributo NUEVO "${NATR_DOCUMENTO}" por driver
-- ---------------------------------------------------------------------
-- Atributo nuevo: se asigna un IATRIBUTO nuevo (siguiente disponible
-- en el rango bajo, < 100) con TDATRIBUTO=1 (URL/texto, mismo patrón
-- que "Url del documento"=22 y "Documento url"=53 en
-- RECURSOS_TDRECURSOSATRIBUTOS).
--
-- Si el atributo ya existe (por una corrida previa) reusa su IATRIBUTO.
-- Idempotente: sólo inserta la fila por driver si todavía no existe.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @nDoc NVARCHAR(64) = N'${NATR_DOCUMENTO}';

DECLARE @iAtrDoc BIGINT = (
    SELECT TOP 1 IATRIBUTO FROM CAPAC_ATRIBUTOS_X_DRIVERS WHERE NATRIBUTO = @nDoc
);
IF @iAtrDoc IS NULL
    SET @iAtrDoc = ISNULL((SELECT MAX(IATRIBUTO) FROM CAPAC_ATRIBUTOS_X_DRIVERS WHERE IATRIBUTO < 100), 0) + 1;

INSERT INTO CAPAC_ATRIBUTOS_X_DRIVERS
    (IATRIBUTO, IDRIVER, NATRIBUTO, TDATRIBUTO, BREQUERIDO, QNIVEL, JCONFIG)
SELECT @iAtrDoc, d.IDRIVER, @nDoc, 1, 0, 2, NULL
FROM CAPAC_DRIVERS d
WHERE NOT EXISTS (
    SELECT 1 FROM CAPAC_ATRIBUTOS_X_DRIVERS x
    WHERE x.IDRIVER = d.IDRIVER AND x.NATRIBUTO = @nDoc
);

SELECT @iAtrDoc AS IATRIBUTO_Documento;

COMMIT TRAN;
`;

	const sqlRollbackImgDoc: string = `-- =====================================================================
-- Fase 2a · Rollback · Borrar valores migrados de Imagen y Documento
-- ---------------------------------------------------------------------
-- Elimina de CAPAC_ATRIBUTOS_PLANES todas las filas asociadas a los
-- atributos "${NATR_IMAGEN}" y "${NATR_DOCUMENTO}". Pensado para
-- deshacer la Fase 2 antes de re-ejecutarla. No toca CAPAC_PLANDECURSO_OLD
-- ni CAPAC_ATRIBUTOS_X_DRIVERS.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DELETE p
FROM CAPAC_ATRIBUTOS_PLANES p
JOIN CAPAC_ATRIBUTOS_X_DRIVERS x ON x.IATRIBUTO = p.IATRIBUTO
WHERE x.NATRIBUTO IN (N'${NATR_IMAGEN}', N'${NATR_DOCUMENTO}');

COMMIT TRAN;
`;

	const sqlMigrarImagen: string = `-- =====================================================================
-- Fase 2b · Migrar IMAGENDRIVER → "${NATR_IMAGEN}"
-- ---------------------------------------------------------------------
-- Lee CAPAC_PLANDECURSO_OLD.IMAGENDRIVER (sólo no nulos / no vacíos) y
-- los inserta en CAPAC_ATRIBUTOS_PLANES referenciando el IATRIBUTO del
-- atributo "${NATR_IMAGEN}" del driver del curso (CAPAC_CURSOS.IDRIVER).
--
-- IPLAN del OLD viene en formato 6+ dígitos ('001002003') y se transforma
-- a notación con puntos ('1.2.3') para coincidir con CAPAC_PLANES_CURSOS.
-- Sólo procesa filas cuyo (ICURSO, IPLAN_dot) EXISTE en
-- CAPAC_PLANES_CURSOS.
-- Idempotente: PK lógica IPLAN+ICURSO+IATRIBUTO.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @nAtributo NVARCHAR(64) = N'${NATR_IMAGEN}';

;WITH posiciones AS (
    SELECT 1 AS pos UNION ALL SELECT 4  UNION ALL SELECT 7  UNION ALL
    SELECT 10        UNION ALL SELECT 13 UNION ALL SELECT 16 UNION ALL
    SELECT 19        UNION ALL SELECT 22 UNION ALL SELECT 25
), src AS (
    SELECT
        o.ICURSO,
        LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.IPLAN))) AS IPLAN_RAW,
        LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.IMAGENDRIVER))) AS VALOR_RAW,
        c.IDRIVER
    FROM CAPAC_PLANDECURSO_OLD o
    JOIN CAPAC_CURSOS c ON c.ICURSO = o.ICURSO
    WHERE o.IMAGENDRIVER IS NOT NULL
      AND LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.IMAGENDRIVER))) <> ''
), transformed AS (
    SELECT
        s.ICURSO,
        s.IDRIVER,
        s.VALOR_RAW AS VALOR,
        CASE
            WHEN s.IPLAN_RAW NOT LIKE '%[^0-9]%' AND LEN(s.IPLAN_RAW) >= 3 AND LEN(s.IPLAN_RAW) % 3 = 0
            THEN STUFF((
                SELECT '.' + CAST(CAST(SUBSTRING(s.IPLAN_RAW, p.pos, 3) AS INT) AS VARCHAR(10))
                FROM posiciones p
                WHERE p.pos <= LEN(s.IPLAN_RAW)
                ORDER BY p.pos
                FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)'), 1, 1, '')
            ELSE s.IPLAN_RAW
        END AS IPLAN
    FROM src s
)
INSERT INTO CAPAC_ATRIBUTOS_PLANES
    (IPLAN, ICURSO, IATRIBUTO, BACTIVO, VALOR)
SELECT
    t.IPLAN, t.ICURSO, x.IATRIBUTO, 1, t.VALOR
FROM transformed t
JOIN CAPAC_PLANES_CURSOS pc ON pc.ICURSO = t.ICURSO AND pc.IPLAN = t.IPLAN
JOIN CAPAC_ATRIBUTOS_X_DRIVERS x
  ON x.IDRIVER = t.IDRIVER AND x.NATRIBUTO = @nAtributo
WHERE NOT EXISTS (
    SELECT 1 FROM CAPAC_ATRIBUTOS_PLANES p
    WHERE p.IPLAN = t.IPLAN AND p.ICURSO = t.ICURSO AND p.IATRIBUTO = x.IATRIBUTO
);

COMMIT TRAN;
`;

	const sqlMigrarDocumento: string = `-- =====================================================================
-- Fase 2c · Migrar DOCUMENTODRIVER → "${NATR_DOCUMENTO}"
-- ---------------------------------------------------------------------
-- Lee CAPAC_PLANDECURSO_OLD.DOCUMENTODRIVER (sólo no nulos / no vacíos)
-- y los inserta en CAPAC_ATRIBUTOS_PLANES referenciando el IATRIBUTO del
-- atributo "${NATR_DOCUMENTO}" del driver del curso (CAPAC_CURSOS.IDRIVER).
--
-- Requiere haber ejecutado la Fase 1b (atributo "${NATR_DOCUMENTO}" debe
-- existir en CAPAC_ATRIBUTOS_X_DRIVERS).
--
-- IPLAN del OLD viene en formato 6+ dígitos ('001002003') y se transforma
-- a notación con puntos ('1.2.3') para coincidir con CAPAC_PLANES_CURSOS.
-- Sólo procesa filas cuyo (ICURSO, IPLAN_dot) EXISTE en
-- CAPAC_PLANES_CURSOS.
-- Idempotente: PK lógica IPLAN+ICURSO+IATRIBUTO.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @nAtributo NVARCHAR(64) = N'${NATR_DOCUMENTO}';

;WITH posiciones AS (
    SELECT 1 AS pos UNION ALL SELECT 4  UNION ALL SELECT 7  UNION ALL
    SELECT 10        UNION ALL SELECT 13 UNION ALL SELECT 16 UNION ALL
    SELECT 19        UNION ALL SELECT 22 UNION ALL SELECT 25
), src AS (
    SELECT
        o.ICURSO,
        LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.IPLAN))) AS IPLAN_RAW,
        LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.DOCUMENTODRIVER))) AS VALOR_RAW,
        c.IDRIVER
    FROM CAPAC_PLANDECURSO_OLD o
    JOIN CAPAC_CURSOS c ON c.ICURSO = o.ICURSO
    WHERE o.DOCUMENTODRIVER IS NOT NULL
      AND LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.DOCUMENTODRIVER))) <> ''
), transformed AS (
    SELECT
        s.ICURSO,
        s.IDRIVER,
        s.VALOR_RAW AS VALOR,
        CASE
            WHEN s.IPLAN_RAW NOT LIKE '%[^0-9]%' AND LEN(s.IPLAN_RAW) >= 3 AND LEN(s.IPLAN_RAW) % 3 = 0
            THEN STUFF((
                SELECT '.' + CAST(CAST(SUBSTRING(s.IPLAN_RAW, p.pos, 3) AS INT) AS VARCHAR(10))
                FROM posiciones p
                WHERE p.pos <= LEN(s.IPLAN_RAW)
                ORDER BY p.pos
                FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)'), 1, 1, '')
            ELSE s.IPLAN_RAW
        END AS IPLAN
    FROM src s
)
INSERT INTO CAPAC_ATRIBUTOS_PLANES
    (IPLAN, ICURSO, IATRIBUTO, BACTIVO, VALOR)
SELECT
    t.IPLAN, t.ICURSO, x.IATRIBUTO, 1, t.VALOR
FROM transformed t
JOIN CAPAC_PLANES_CURSOS pc ON pc.ICURSO = t.ICURSO AND pc.IPLAN = t.IPLAN
JOIN CAPAC_ATRIBUTOS_X_DRIVERS x
  ON x.IDRIVER = t.IDRIVER AND x.NATRIBUTO = @nAtributo
WHERE NOT EXISTS (
    SELECT 1 FROM CAPAC_ATRIBUTOS_PLANES p
    WHERE p.IPLAN = t.IPLAN AND p.ICURSO = t.ICURSO AND p.IATRIBUTO = x.IATRIBUTO
);

COMMIT TRAN;
`;
</script>

<Toaster />

<AccordionActions
	title={inner
		? "Capacitación · IMAGENDRIVER / DOCUMENTODRIVER → atributos plan"
		: (date ? `${date} — Capacitación · IMAGENDRIVER / DOCUMENTODRIVER → atributos plan` : "Capacitación · IMAGENDRIVER / DOCUMENTODRIVER → atributos plan")}
	icon="mdi:image-multiple-outline"
	count={5}
	{inner}
	open={false}
>
	<RevisadoCheck
		slot="title-extra"
		keys={[
			"2026-05-05.imgdoc.fase1a",
			"2026-05-05.imgdoc.fase1b",
			"2026-05-05.imgdoc.fase2a",
			"2026-05-05.imgdoc.fase2b",
			"2026-05-05.imgdoc.fase2c",
		]}
	/>

	<BitacoraNote flat mdSource={mdIntro} />

	<BitacoraNote flat mdSource={mdFase1a} />
	<SqlExecCard
		title={`Fase 1a · Sembrar "${NATR_IMAGEN}" por driver`}
		sql={sqlSeedImagen}
		desc="Reusa el IATRIBUTO existente de Imagen del profesor; si no existe en ningún driver, asigna uno nuevo."
		confirmKind="warning"
		checkKey="2026-05-05.imgdoc.fase1a"
		{executeSql}
		height="280px"
	/>

	<BitacoraNote flat mdSource={mdFase1b} />
	<SqlExecCard
		title={`Fase 1b · Crear atributo NUEVO "${NATR_DOCUMENTO}" por driver`}
		sql={sqlSeedDocumento}
		desc="Atributo nuevo: asigna IATRIBUTO en rango bajo (<100) con TDATRIBUTO=1 para todos los drivers."
		confirmKind="warning"
		checkKey="2026-05-05.imgdoc.fase1b"
		{executeSql}
		height="280px"
	/>

	<BitacoraNote flat mdSource={mdFase2a} />
	<SqlExecCard
		title="Fase 2a · Rollback · Borrar valores Imagen / Documento"
		sql={sqlRollbackImgDoc}
		desc="Elimina filas previas de CAPAC_ATRIBUTOS_PLANES asociadas a los atributos Imagen del profesor y Documento."
		confirmKind="danger"
		checkKey="2026-05-05.imgdoc.fase2a"
		{executeSql}
		height="220px"
	/>

	<BitacoraNote flat mdSource={mdFase2b} />
	<SqlExecCard
		title={`Fase 2b · Migrar IMAGENDRIVER → "${NATR_IMAGEN}"`}
		sql={sqlMigrarImagen}
		desc="Inserta en CAPAC_ATRIBUTOS_PLANES los valores de IMAGENDRIVER para los planes existentes."
		confirmKind="warning"
		checkKey="2026-05-05.imgdoc.fase2b"
		{executeSql}
		height="320px"
	/>

	<BitacoraNote flat mdSource={mdFase2c} />
	<SqlExecCard
		title={`Fase 2c · Migrar DOCUMENTODRIVER → "${NATR_DOCUMENTO}"`}
		sql={sqlMigrarDocumento}
		desc="Inserta en CAPAC_ATRIBUTOS_PLANES los valores de DOCUMENTODRIVER para los planes existentes."
		confirmKind="warning"
		checkKey="2026-05-05.imgdoc.fase2c"
		{executeSql}
		height="320px"
	/>
</AccordionActions>
