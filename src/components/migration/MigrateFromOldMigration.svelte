<script lang="ts">
	import SqlExecCard from "$comps/actions/SqlExecCard.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import noteMd from "../../lib/bitacora/daily/2026-05/04/migrate-from-old.md?raw";
	import type { RebuildTableConfig } from "../../lib/migration/oldRebuildTables.ts";

	export let config: RebuildTableConfig;
	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;

	function buildSelectExpr(name: string): string {
		const ov = config.columnOverrides?.[name];
		if (ov) return `${ov} AS [${name}]`;
		return `src.[${name}]`;
	}

	$: insertCols = config.columns.map((c) => `[${c.name}]`).join(", ");
	$: selectExprs = config.columns.map((c) => "    " + buildSelectExpr(c.name)).join(",\n");

	$: sql = `-- =====================================================================
-- Migrar ${config.tableName} desde ${config.oldTableName} (solo si está vacía)
-- ---------------------------------------------------------------------
-- Inserta directamente desde la tabla OLD si la tabla destino no tiene
-- filas. Idempotente: si ya hay registros, no hace nada.
${config.columnOverrides ? `--\n-- Overrides activos:\n${Object.entries(config.columnOverrides).map(([k, v]) => `--   ${k} := ${v}`).join("\n")}\n` : ""}-- =====================================================================
SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @cnt INT;
SELECT @cnt = COUNT(*) FROM ${config.tableName};
IF @cnt > 0
BEGIN
    PRINT CONCAT(N'${config.tableName} ya tiene ', @cnt, N' filas. No se inserta nada.');
    COMMIT TRAN;
    RETURN;
END;

INSERT INTO ${config.tableName} (${insertCols})
SELECT
${selectExprs}
FROM ${config.oldTableName} src;

PRINT CONCAT(N'Filas insertadas en ${config.tableName}: ', @@ROWCOUNT);
COMMIT TRAN;
`;
</script>

<hr class="subtle-sep" />

<BitacoraNote
	flat
	mdSource={noteMd.replace(/\{table\}/g, config.tableName).replace(/\{old\}/g, config.oldTableName)}
/>

<SqlExecCard
	title="{config.tableName} ← {config.oldTableName} (si está vacía)"
	{sql}
	desc="Inserta directamente desde la tabla OLD si la destino no tiene filas. Idempotente."
	confirmKind="warning"
	confirmMessage={`Se insertarán filas en ${config.tableName} desde ${config.oldTableName} (solo si está vacía).\n\n¿Continuar?`}
	checkKey={`migrate-from-old.${config.tableName}`}
	{executeSql}
	height="280px"
/>

<style>
	.subtle-sep {
		border: 0;
		border-top: 1px dashed var(--is-b-color, #8885);
		margin: 0.75rem 0 0.25rem;
		opacity: 0.6;
	}
</style>
