<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import mdIntro from "../../lib/bitacora/cleanup-intro.md?raw";
	import mdOutro from "../../lib/bitacora/cleanup-outro.md?raw";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let date: string = "";
	export let inner: boolean = false;

	const sqlCleanup: string = `-- =====================================================================
-- Limpieza · Drivers de prueba (conservar solo IDRIVER 1, 2, 3)
-- ---------------------------------------------------------------------
-- Elimina drivers con IDRIVER = 0 o IDRIVER > 3 y todas sus filas
-- dependientes en CAPAC_ATRIBUTOS_X_DRIVERS. Los IATRIBUTO de prueba
-- 901..999 se borran de paso (en CAPAC_ATRIBUTOS_PLANES y luego en
-- CAPAC_ATRIBUTOS_X_DRIVERS) por si quedaran huérfanos.
-- Orden: dependencias antes que CAPAC_DRIVERS.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

-- 1) Valores en CAPAC_ATRIBUTOS_PLANES con atributos de prueba 9xx
DELETE FROM CAPAC_ATRIBUTOS_PLANES
WHERE IATRIBUTO BETWEEN 900 AND 999;

-- 2) Filas en CAPAC_ATRIBUTOS_X_DRIVERS de drivers que se eliminarán
DELETE FROM CAPAC_ATRIBUTOS_X_DRIVERS
WHERE IDRIVER = 0 OR IDRIVER > 3;

-- 3) Atributos de prueba residuales (9xx) en cualquier driver
DELETE FROM CAPAC_ATRIBUTOS_X_DRIVERS
WHERE IATRIBUTO BETWEEN 900 AND 999;

-- 4) Drivers de prueba
DELETE FROM CAPAC_DRIVERS
WHERE IDRIVER = 0 OR IDRIVER > 3;

COMMIT TRAN;
`;

	const sqlCleanupAtributosPlanes: string = `-- =====================================================================
-- Limpieza · CAPAC_ATRIBUTOS_PLANES (filas vacías o de prueba 9xx)
-- ---------------------------------------------------------------------
-- Elimina filas que no aportan valor:
--   * VALOR es NULL o cadena en blanco (LTRIM(RTRIM(VALOR)) = '').
--   * IATRIBUTO entre 900 y 999 (atributos sintéticos de prueba).
-- Idempotente: si no hay filas que cumplan el filtro, no afecta nada.
-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DELETE FROM CAPAC_ATRIBUTOS_PLANES
WHERE VALOR IS NULL
   OR LTRIM(RTRIM(CONVERT(NVARCHAR(MAX), VALOR))) = ''
   OR IATRIBUTO BETWEEN 900 AND 999;

COMMIT TRAN;
`;

	const sqlDropTablasObsoletas: string = `-- =====================================================================
-- Limpieza · Eliminar tablas obsoletas
-- ---------------------------------------------------------------------
-- CAPAC_TEMAS y CAPAC_PERMISOS ya no se usan con esas nomenclaturas.
-- Idempotente: solo dropea si la tabla existe.
-- =====================================================================
IF OBJECT_ID('CAPAC_TEMAS', 'U') IS NOT NULL
    DROP TABLE CAPAC_TEMAS;

IF OBJECT_ID('CAPAC_PERMISOS', 'U') IS NOT NULL
    DROP TABLE CAPAC_PERMISOS;
`;
</script>

<Toaster />

<AccordionActions
	title={inner
		? "Limpieza · Drivers de prueba (conservar 1, 2, 3)"
		: (date ? `${date} — Limpieza · Drivers de prueba (conservar 1, 2, 3)` : "Limpieza · Drivers de prueba")}
	icon="mdi:broom"
	{inner}
	open={false}
>
	<RevisadoCheck slot="title-extra" keys={["2026-05-04.cleanup.run", "2026-05-04.cleanup.atributos_planes", "2026-05-04.cleanup.drop_obsoletas"]} />
	<BitacoraNote flat mdSource={mdIntro} />

	<SqlExecCard
		title="Eliminar tablas obsoletas (CAPAC_TEMAS, CAPAC_PERMISOS)"
		checkKey="2026-05-04.cleanup.drop_obsoletas"
		sql={sqlDropTablasObsoletas}
		desc="Elimina CAPAC_TEMAS y CAPAC_PERMISOS si existen (ya no se usan con esas nomenclaturas)."
		confirmKind="danger"
		confirmMessage={`Se eliminarán las tablas CAPAC_TEMAS y CAPAC_PERMISOS si existen.\n\n¿Continuar?`}
		{executeSql}
		height="200px"
	/>

	<SqlExecCard
		title="Limpieza datos de prueba"
		checkKey="2026-05-04.cleanup.run"
		sql={sqlCleanup}
		desc="Conserva solo IDRIVER 1, 2 y 3. Elimina IDRIVER = 0 o > 3 y atributos 9xx residuales (idempotente)."
		confirmKind="danger"
		confirmMessage={`Se eliminarán los drivers IDRIVER = 0 o > 3 y todos los atributos 9xx (en CAPAC_ATRIBUTOS_PLANES y CAPAC_ATRIBUTOS_X_DRIVERS).\n\n¿Continuar?`}
		{executeSql}
	/>

	<SqlExecCard
		title="Limpieza CAPAC_ATRIBUTOS_PLANES (vacíos y 9xx)"
		checkKey="2026-05-04.cleanup.atributos_planes"
		sql={sqlCleanupAtributosPlanes}
		desc="Elimina filas con VALOR NULL/'' o IATRIBUTO 900..999 (idempotente)."
		confirmKind="danger"
		confirmMessage={`Se eliminarán filas de CAPAC_ATRIBUTOS_PLANES con VALOR vacío o IATRIBUTO entre 900 y 999.\n\n¿Continuar?`}
		{executeSql}
	/>

	<BitacoraNote flat mdSource={mdOutro} />
</AccordionActions>
