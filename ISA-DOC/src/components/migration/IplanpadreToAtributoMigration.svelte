<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import mdIntro from "../../lib/bitacora/iplan-intro.md?raw";
	import mdFase1 from "../../lib/bitacora/iplan-fase1.md?raw";
	import mdFase2a from "../../lib/bitacora/iplan-fase2a.md?raw";
	import mdFase2 from "../../lib/bitacora/iplan-fase2.md?raw";
	import mdFase3 from "../../lib/bitacora/iplan-fase3.md?raw";
	import mdFase4 from "../../lib/bitacora/iplan-fase4.md?raw";
	import mdFase5 from "../../lib/bitacora/iplan-fase5.md?raw";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let date: string = "";
	export let inner: boolean = false;

	const NATRIBUTO = "iplanpadre";

	const sqlSeedAtributo: string = `-- =====================================================================
-- Fase 1 · Sembrar atributo "${NATRIBUTO}" en cada driver
-- ---------------------------------------------------------------------
-- Crea (idempotente) una fila en CAPAC_ATRIBUTOS_X_DRIVERS por cada
-- driver existente, con NATRIBUTO = '${NATRIBUTO}'. Este atributo
-- reemplaza la antigua columna CAPAC_PLANES_CURSOS.IPLANPADRE.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @nAtributo NVARCHAR(64) = '${NATRIBUTO}';
-- IATRIBUTO compartido entre drivers (mismo número en todas las filas, igual que el resto de atributos)
DECLARE @iAtributo BIGINT = ISNULL((SELECT MAX(IATRIBUTO) FROM CAPAC_ATRIBUTOS_X_DRIVERS WHERE IATRIBUTO < 100), 0) + 1;

INSERT INTO CAPAC_ATRIBUTOS_X_DRIVERS
    (IATRIBUTO, IDRIVER, NATRIBUTO, TDATRIBUTO, BREQUERIDO, QNIVEL, JCONFIG)
SELECT
    @iAtributo,
    d.IDRIVER,
    @nAtributo,
    1, -- TTDAtributo.Texto
    0,
    2,
    NULL
FROM CAPAC_DRIVERS d
WHERE NOT EXISTS (
    SELECT 1 FROM CAPAC_ATRIBUTOS_X_DRIVERS x
    WHERE x.IDRIVER = d.IDRIVER AND x.NATRIBUTO = @nAtributo
);

COMMIT TRAN;
`;

	const sqlRollbackDato2: string = `-- =====================================================================
-- Fase 2a · Rollback · Eliminar IPLAN erróneos del atributo "${NATRIBUTO}"
-- ---------------------------------------------------------------------
-- Borra de CAPAC_ATRIBUTOS_PLANES TODAS las filas asociadas al atributo
-- "${NATRIBUTO}" (en cualquier driver). Pensado para deshacer una
-- ejecución previa incorrecta de la Fase 2 antes de re-ejecutarla.
-- No toca CAPAC_PLANES_CURSOS ni CAPAC_PLANDECURSO_OLD.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @nAtributo NVARCHAR(64) = '${NATRIBUTO}';

DELETE p
FROM CAPAC_ATRIBUTOS_PLANES p
JOIN CAPAC_ATRIBUTOS_X_DRIVERS x ON x.IATRIBUTO = p.IATRIBUTO
WHERE x.NATRIBUTO = @nAtributo;

COMMIT TRAN;
`;

	const sqlMigrarDato2: string = `-- =====================================================================
-- Fase 2 · Migrar CAPAC_PLANDECURSO_OLD.DATO2 → CAPAC_ATRIBUTOS_PLANES
-- ---------------------------------------------------------------------
-- Sólo se conservan filas con DATO2 con valor (no NULL, no vacío trim).
-- IPLAN del OLD viene en 6-dígitos (ej. '055009'); CAPAC_PLANES_CURSOS
-- guarda el IPLAN ya en formato dot-notation ('55.9'), por lo que se
-- aplica la misma transformación (3 dígitos = 1 nivel) tanto al IPLAN
-- como al DATO2 antes de filtrar y cruzar contra la tabla viva.
-- Sólo procesa filas cuyo (ICURSO, IPLAN_dot) EXISTE en
-- CAPAC_PLANES_CURSOS.
-- Idempotente: omite filas ya migradas (PK lógica IPLAN+ICURSO+IATRIBUTO).
-- Pobla audit fields y BACTIVO=1.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @nAtributo NVARCHAR(64) = '${NATRIBUTO}';
DECLARE @user NVARCHAR(255) = N'migration-iplanpadre';
DECLARE @app  NVARCHAR(255) = N'ISA-DOC';
DECLARE @ip   NVARCHAR(255) = ISNULL(CONVERT(NVARCHAR(255), CONNECTIONPROPERTY('client_net_address')), N'127.0.0.1');

;WITH posiciones AS (
    SELECT 1 AS pos UNION ALL SELECT 4  UNION ALL SELECT 7  UNION ALL
    SELECT 10        UNION ALL SELECT 13 UNION ALL SELECT 16 UNION ALL
    SELECT 19        UNION ALL SELECT 22 UNION ALL SELECT 25
), src AS (
    SELECT
        o.ICURSO,
        LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.IPLAN))) AS IPLAN_RAW,
        LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.DATO2))) AS DATO2_RAW,
        c.IDRIVER
    FROM CAPAC_PLANDECURSO_OLD o
    JOIN CAPAC_CURSOS c ON c.ICURSO = o.ICURSO
    WHERE o.DATO2 IS NOT NULL
      AND LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), o.DATO2))) <> ''
), transformed AS (
    SELECT
        s.ICURSO,
        s.IDRIVER,
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
        END AS IPLAN,
        CASE
            WHEN s.DATO2_RAW NOT LIKE '%[^0-9]%' AND LEN(s.DATO2_RAW) >= 3 AND LEN(s.DATO2_RAW) % 3 = 0
            THEN STUFF((
                SELECT '.' + CAST(CAST(SUBSTRING(s.DATO2_RAW, p.pos, 3) AS INT) AS VARCHAR(10))
                FROM posiciones p
                WHERE p.pos <= LEN(s.DATO2_RAW)
                ORDER BY p.pos
                FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)'), 1, 1, '')
            ELSE s.DATO2_RAW
        END AS VALOR
    FROM src s
)
INSERT INTO CAPAC_ATRIBUTOS_PLANES
    (IPLAN, ICURSO, IATRIBUTO, BACTIVO, VALOR,
     IUSUARIOCRE, IAPPCRE, IPCRE, FHCRE,
     IUSUARIOULT, IAPPULT, IPULT, FHULT)
SELECT
    t.IPLAN, t.ICURSO, x.IATRIBUTO, 1, t.VALOR,
    @user, @app, @ip, GETDATE(),
    @user, @app, @ip, GETDATE()
FROM transformed t
JOIN CAPAC_PLANES_CURSOS pc ON pc.ICURSO = t.ICURSO AND pc.IPLAN = t.IPLAN
JOIN CAPAC_ATRIBUTOS_X_DRIVERS x
  ON x.IDRIVER = t.IDRIVER AND x.NATRIBUTO = @nAtributo
WHERE t.VALOR IS NOT NULL
  AND LTRIM(RTRIM(t.VALOR)) <> ''
  AND NOT EXISTS (
    SELECT 1 FROM CAPAC_ATRIBUTOS_PLANES p
    WHERE p.IPLAN = t.IPLAN AND p.ICURSO = t.ICURSO AND p.IATRIBUTO = x.IATRIBUTO
);

COMMIT TRAN;
`;

	const sqlDropColumna: string = `-- =====================================================================
-- Fase 3 · Eliminar columna CAPAC_PLANES_CURSOS.IPLANPADRE
-- ---------------------------------------------------------------------
-- Quita FK e índices dependientes y dropea la columna.
-- Idempotente: sólo opera si la columna/constraint todavía existe.
-- EJECUTAR sólo después de validar Fase 1 y Fase 2.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @sql NVARCHAR(MAX);

-- Drop FK que apunten a IPLANPADRE
DECLARE @fk NVARCHAR(256);
DECLARE cur_fk CURSOR LOCAL FAST_FORWARD FOR
    SELECT fk.name
    FROM sys.foreign_keys fk
    JOIN sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
    JOIN sys.columns c
      ON c.object_id = fkc.parent_object_id AND c.column_id = fkc.parent_column_id
    WHERE fk.parent_object_id = OBJECT_ID('CAPAC_PLANES_CURSOS')
      AND c.name = 'IPLANPADRE';
OPEN cur_fk;
FETCH NEXT FROM cur_fk INTO @fk;
WHILE @@FETCH_STATUS = 0
BEGIN
    SET @sql = N'ALTER TABLE CAPAC_PLANES_CURSOS DROP CONSTRAINT ' + QUOTENAME(@fk);
    EXEC sp_executesql @sql;
    FETCH NEXT FROM cur_fk INTO @fk;
END
CLOSE cur_fk; DEALLOCATE cur_fk;

-- Drop índices no-PK que incluyan IPLANPADRE
DECLARE @ix NVARCHAR(256);
DECLARE cur_ix CURSOR LOCAL FAST_FORWARD FOR
    SELECT DISTINCT i.name
    FROM sys.indexes i
    JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id
    JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
    WHERE i.object_id = OBJECT_ID('CAPAC_PLANES_CURSOS')
      AND c.name = 'IPLANPADRE'
      AND i.is_primary_key = 0
      AND i.is_unique_constraint = 0
      AND i.name IS NOT NULL;
OPEN cur_ix;
FETCH NEXT FROM cur_ix INTO @ix;
WHILE @@FETCH_STATUS = 0
BEGIN
    SET @sql = N'DROP INDEX ' + QUOTENAME(@ix) + N' ON CAPAC_PLANES_CURSOS';
    EXEC sp_executesql @sql;
    FETCH NEXT FROM cur_ix INTO @ix;
END
CLOSE cur_ix; DEALLOCATE cur_ix;

-- Drop default constraint sobre IPLANPADRE (si existe)
DECLARE @df NVARCHAR(256);
SELECT @df = dc.name
FROM sys.default_constraints dc
JOIN sys.columns c
  ON c.object_id = dc.parent_object_id AND c.column_id = dc.parent_column_id
WHERE dc.parent_object_id = OBJECT_ID('CAPAC_PLANES_CURSOS')
  AND c.name = 'IPLANPADRE';
IF @df IS NOT NULL
BEGIN
    SET @sql = N'ALTER TABLE CAPAC_PLANES_CURSOS DROP CONSTRAINT ' + QUOTENAME(@df);
    EXEC sp_executesql @sql;
END

-- Drop columna
IF COL_LENGTH('CAPAC_PLANES_CURSOS', 'IPLANPADRE') IS NOT NULL
    ALTER TABLE CAPAC_PLANES_CURSOS DROP COLUMN IPLANPADRE;

COMMIT TRAN;
`;

	const sqlJConfigDificultad: string = `-- =====================================================================
-- Fase 4 · JConfig para atributos de dificultad → select B / M / A
-- ---------------------------------------------------------------------
-- Setea JCONFIG = {"options":["B","M","A"]} en todo atributo cuyo
-- NATRIBUTO contenga "dificultad" (case-insensitive) y que aún no
-- tenga options definidas.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = N'{"options":["B","M","A"]}'
WHERE LOWER(NATRIBUTO) LIKE N'%dificultad%'
  AND (JCONFIG IS NULL OR JCONFIG NOT LIKE N'%"options"%');

COMMIT TRAN;
`;

	const sqlLimpiarAuditMigracion: string = `-- =====================================================================
-- Fase 5 · Vaciar audit fields dejados por la migración
-- ---------------------------------------------------------------------
-- Pone a NULL las columnas IUSUARIOCRE / IAPPCRE / IUSUARIOULT / IAPPULT
-- en CAPAC_ATRIBUTOS_PLANES cuando contengan los marcadores que dejó
-- la Fase 2 ('migration-iplanpadre' / 'ISA-DOC'). Las filas se conservan;
-- sólo se limpian esas columnas. Idempotente.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

UPDATE CAPAC_ATRIBUTOS_PLANES
SET
    IUSUARIOCRE = CASE WHEN IUSUARIOCRE IN (N'migration-iplanpadre', N'ISA-DOC') THEN NULL ELSE IUSUARIOCRE END,
    IAPPCRE     = CASE WHEN IAPPCRE     IN (N'migration-iplanpadre', N'ISA-DOC') THEN NULL ELSE IAPPCRE     END,
    IUSUARIOULT = CASE WHEN IUSUARIOULT IN (N'migration-iplanpadre', N'ISA-DOC') THEN NULL ELSE IUSUARIOULT END,
    IAPPULT     = CASE WHEN IAPPULT     IN (N'migration-iplanpadre', N'ISA-DOC') THEN NULL ELSE IAPPULT     END
WHERE
       IUSUARIOCRE IN (N'migration-iplanpadre', N'ISA-DOC')
    OR IAPPCRE     IN (N'migration-iplanpadre', N'ISA-DOC')
    OR IUSUARIOULT IN (N'migration-iplanpadre', N'ISA-DOC')
    OR IAPPULT     IN (N'migration-iplanpadre', N'ISA-DOC');

COMMIT TRAN;
`;
</script>

<Toaster />

<AccordionActions
	title={inner
		? "Capacitación · IPLANPADRE → atributo plan"
		: (date ? `${date} — Capacitación · IPLANPADRE → atributo plan` : "Capacitación · IPLANPADRE → atributo plan")}
	icon="mdi:database-sync"
	count={6}
	{inner}
	open={false}
>
	<RevisadoCheck
		slot="title-extra"
		keys={[
			"2026-05-04.iplanpadre.fase1",
			"2026-05-04.iplanpadre.fase2a",
			"2026-05-04.iplanpadre.fase2",
			"2026-05-04.iplanpadre.fase3",
			"2026-05-04.iplanpadre.fase4",
			"2026-05-04.iplanpadre.fase5",
		]}
	/>
	<BitacoraNote flat mdSource={mdIntro} />

	<BitacoraNote flat mdSource={mdFase1} />
	<SqlExecCard
		title="Fase 1 · Sembrar atributo iplanpadre por driver"
		sql={sqlSeedAtributo}
		desc="Inserta el atributo en CAPAC_ATRIBUTOS_X_DRIVERS para cada driver (idempotente)."
		confirmKind="warning"
		checkKey="2026-05-04.iplanpadre.fase1"
		{executeSql}
		height="280px"
	/>

	<BitacoraNote flat mdSource={mdFase2a} />
	<SqlExecCard
		title="Fase 2a · Rollback · Borrar IPLAN erróneos"
		sql={sqlRollbackDato2}
		desc="Elimina filas previas de CAPAC_ATRIBUTOS_PLANES asociadas al atributo iplanpadre."
		confirmKind="danger"
		checkKey="2026-05-04.iplanpadre.fase2a"
		{executeSql}
		height="200px"
	/>

	<BitacoraNote flat mdSource={mdFase2} />
	<SqlExecCard
		title="Fase 2 · Migrar dato2 → CAPAC_ATRIBUTOS_PLANES"
		sql={sqlMigrarDato2}
		desc="Transforma '001002003' → '1.2.3' y lo guarda como valor del atributo (sólo IPLAN existentes)."
		confirmKind="warning"
		checkKey="2026-05-04.iplanpadre.fase2"
		{executeSql}
		height="320px"
	/>

	<BitacoraNote flat mdSource={mdFase3} />
	<SqlExecCard
		title="Fase 3 · Drop CAPAC_PLANES_CURSOS.IPLANPADRE"
		sql={sqlDropColumna}
		desc="Elimina FK, índices y la columna IPLANPADRE (irreversible)."
		confirmKind="danger"
		checkKey="2026-05-04.iplanpadre.fase3"
		{executeSql}
		height="320px"
	/>

	<BitacoraNote flat mdSource={mdFase4} />
	<SqlExecCard
		title="Fase 4 · JConfig dificultad → select B/M/A"
		sql={sqlJConfigDificultad}
		desc="Setea options=['B','M','A'] en JCONFIG para atributos de dificultad."
		confirmKind="warning"
		checkKey="2026-05-04.iplanpadre.fase4"
		{executeSql}
		height="200px"
	/>

	<BitacoraNote flat mdSource={mdFase5} />
	<SqlExecCard
		title="Fase 5 · Limpiar audit fields de migración"
		sql={sqlLimpiarAuditMigracion}
		desc="Vacía IUSUARIOCRE/IAPPCRE/IUSUARIOULT/IAPPULT en CAPAC_ATRIBUTOS_PLANES cuando contengan 'migration-iplanpadre' o 'ISA-DOC'."
		confirmKind="warning"
		checkKey="2026-05-04.iplanpadre.fase5"
		{executeSql}
		height="240px"
	/>
</AccordionActions>
