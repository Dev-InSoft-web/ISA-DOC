<script lang="ts">
	import {
		Card, H4, Text, Toaster, FlexLayout, Button, Modal, Iconify,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import SwitchComp from "../_comps/especial/_Switch.svelte";
	import type { RebuildTableConfig, RebuildColumn } from "../../lib/migration/oldRebuildTables.ts";
	import noteMd from "../../lib/bitacora/2026-05-04-rebuild-old-table.md?raw";

	interface Snapshot { file: string; date: string; content: string; }

	const csvModules = import.meta.glob("../../lib/migration/csv/*.csv", {
		query: "?raw",
		import: "default",
		eager: true,
	}) as Record<string, string>;

	const snapshotsByTable: Record<string, Snapshot[]> = {};
	for (const [p, text] of Object.entries(csvModules)) {
		const m = /\/(\d{8}(?:\d{6})?)-(.+)\.csv$/.exec(p);
		if (!m) continue;
		const date = m[1];
		const table = m[2];
		const file = `${date}-${table}.csv`;
		if (!snapshotsByTable[table]) snapshotsByTable[table] = [];
		snapshotsByTable[table].push({ file, date, content: text });
	}
	for (const arr of Object.values(snapshotsByTable)) arr.sort((a, b) => b.date.localeCompare(a.date));

	export let config: RebuildTableConfig;
	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let stamp: string = "";

	type Row = Record<string, string>;

	const snapshots: Snapshot[] = snapshotsByTable[config.tableName] ?? [];

	$: activeSnapshot = (() => {
		if (stamp) {
			const hit = snapshots.find((s) => s.date === stamp);
			if (hit) return hit;
		}
		return snapshots[0];
	})();
	$: csvText = activeSnapshot?.content ?? config.csvDefault;
	$: selectedFile = activeSnapshot?.file ?? "";

	let parseError: string = "";
	let headers: string[] = [];
	let rows: Row[] = [];

	let mdModalShow: boolean = false;
	let decorateMd: boolean = true;

	function parseCsvLine(line: string): string[] {
		const out: string[] = [];
		let cur = "";
		let inQuotes = false;
		for (let i = 0; i < line.length; i++) {
			const ch = line[i];
			if (inQuotes) {
				if (ch === '"') {
					if (line[i + 1] === '"') { cur += '"'; i++; }
					else { inQuotes = false; }
				} else { cur += ch; }
			} else {
				if (ch === ",") { out.push(cur); cur = ""; }
				else if (ch === '"' && cur === "") { inQuotes = true; }
				else { cur += ch; }
			}
		}
		out.push(cur);
		return out;
	}

	function parseCsv(text: string): { headers: string[]; rows: Row[]; error: string } {
		const clean = (text ?? "").replace(/\r/g, "").trim();
		if (!clean) return { headers: [], rows: [], error: "" };
		const lines = clean.split("\n").filter((l) => l.trim().length > 0);
		if (lines.length < 1) return { headers: [], rows: [], error: "CSV vacío" };
		const hdrs = parseCsvLine(lines[0]).map((h) => h.trim());
		const data: Row[] = [];
		for (let i = 1; i < lines.length; i++) {
			const cells = parseCsvLine(lines[i]);
			const row: Row = {};
			for (let j = 0; j < hdrs.length; j++) row[hdrs[j]] = (cells[j] ?? "").trim();
			data.push(row);
		}
		return { headers: hdrs, rows: data, error: "" };
	}

	$: {
		const r = parseCsv(csvText);
		headers = r.headers;
		rows = r.rows;
		parseError = r.error;
	}

	function escapeStr(v: string): string {
		return `N'${(v ?? "").replace(/'/g, "''")}'`;
	}

	function isEmpty(v: string): boolean {
		return v === "" || v === undefined || v === null;
	}

	function castValue(value: string, type: string): string {
		if (isEmpty(value) || value.toUpperCase() === "NULL") return "NULL";
		return `TRY_CAST(${escapeStr(value)} AS ${type})`;
	}

	function buildDropSql(): string {
		return `-- Paso 1 · Eliminar tabla destino ${config.tableName}\n` +
			`IF OBJECT_ID('${config.tableName}', 'U') IS NOT NULL\n    DROP TABLE ${config.tableName};\n`;
	}

	function buildInsertSql(): string {
		if (!rows.length) return `-- Sin filas para insertar (CSV vacío)`;
		const cols = config.columns;
		const colNames = cols.map((c) => c.name).join(", ");
		const valuesLines: string[] = [];
		for (const row of rows) {
			const vals = cols.map((c: RebuildColumn) => castValue(row[c.name] ?? "", c.type));
			valuesLines.push(`    (${vals.join(", ")})`);
		}
		const lines: string[] = [];
		lines.push(`-- Paso 3 · Insertar ${rows.length} filas en ${config.tableName} desde CSV (solo si la tabla está vacía)`);
		lines.push(`SET XACT_ABORT ON;`);
		lines.push(`BEGIN TRAN;`);
		lines.push(``);
		lines.push(`IF NOT EXISTS (SELECT 1 FROM ${config.tableName})`);
		lines.push(`BEGIN`);
		lines.push(`    INSERT INTO ${config.tableName} (${colNames})`);
		lines.push(`    VALUES`);
		lines.push(valuesLines.join(",\n") + ";");
		lines.push(`END;`);
		lines.push(``);
		lines.push(`COMMIT TRAN;`);
		return lines.join("\n");
	}

	$: dropSql = buildDropSql();
	$: createSql = config.createSql;
	$: insertSql = buildInsertSql();

	$: csvHeaderMatches =
		headers.length === 0
		|| (headers.length === config.columns.length
			&& headers.every((h, i) => h === config.columns[i].name));

	function mdEscape(s: string): string {
		return (s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
	}

	$: csvAsMarkdown = (() => {
		if (!headers.length) return "_Sin datos_";
		const head = `| ${headers.join(" | ")} |`;
		const sep = `| ${headers.map(() => "---").join(" | ")} |`;
		const body = rows.map((r) => `| ${headers.map((h) => mdEscape(r[h] ?? "")).join(" | ")} |`);
		return [head, sep, ...body].join("\n");
	})();
</script>

<Toaster />

<AccordionActions
	title="{config.tableName} · Reconstrucción desde CSV"
	icon={config.icon}
	count={rows.length}
	inner
	open={false}
>
	<RevisadoCheck
		slot="title-extra"
		keys={[
			`2026-05-04.rebuild.${config.tableName}.drop`,
			`2026-05-04.rebuild.${config.tableName}.create`,
			`2026-05-04.rebuild.${config.tableName}.insert`,
		]}
	/>
	<BitacoraNote flat mdSource={noteMd.replace(/\{table\}/g, config.tableName).replace(/\{old\}/g, config.oldTableName || "snapshot de tabla viva")} />

	<Card variant="flat">
		<FlexLayout direction="column">
			<FlexLayout items="center" justify="between">
				<H4>CSV de {config.tableName}</H4>
				<Button
					variant="solid"
					color="primary"
					disabled={!rows.length}
					style="width: fit-content;"
					on:click={() => (mdModalShow = true)}
				>
					<Iconify slot="icon" icon="mdi:table-eye" />
					Ver CSV
				</Button>
			</FlexLayout>
			{#if snapshots.length === 0}
				<Text color="warning">
					<small>No hay fotografías guardadas para <code>{config.tableName}</code>. Usa <strong>Descargar estado</strong> arriba para crear la primera.</small>
				</Text>
			{/if}
			<Text color="neutral">
				<small>
					Columnas: <code>{config.columns.map((c) => c.name).join(", ")}</code>
				</small>
			</Text>
			{#if parseError}
				<Text color="error">{parseError}</Text>
			{:else}
				<FlexLayout items="center" justify="between">
					<Text color="neutral"><small>{rows.length} filas · {headers.length} columnas{selectedFile ? ` · src/lib/migration/csv/${selectedFile}` : ""}</small></Text>
					{#if !csvHeaderMatches && headers.length > 0}
						<Text color="warning">
							<small>El encabezado no coincide con las columnas destino esperadas.</small>
						</Text>
					{/if}
				</FlexLayout>
			{/if}
		</FlexLayout>
	</Card>

	<Modal bind:bshow={mdModalShow} onClose={() => (mdModalShow = false)} style="width: 96dvw; height: 96dvh;">
		<svelte:fragment slot="title">
			<FlexLayout items="center" justify="between" style="width:100%;">
				<FlexLayout items="center">
					<Iconify icon="mdi:table" />
					<Text><strong>{config.tableName} · {rows.length} filas</strong></Text>
				</FlexLayout>
				<SwitchComp label="Decorar en MD" bind:checked={decorateMd} />
			</FlexLayout>
		</svelte:fragment>
		<div class="md-modal-body">
			{#if decorateMd}
				<BitacoraNote flat mdSource={csvAsMarkdown} />
			{:else}
				<pre class="csv-raw">{csvText}</pre>
			{/if}
		</div>
	</Modal>

	<SqlExecCard
		title="Paso 1 · DROP TABLE {config.tableName}"
		checkKey={`2026-05-04.rebuild.${config.tableName}.drop`}
		sql={dropSql}
		desc="Elimina la tabla destino si existe (idempotente)."
		confirmKind="danger"
		confirmMessage={`Se eliminará la tabla ${config.tableName} (DROP TABLE).\n\n¿Continuar?`}
		{executeSql}
		height="120px"
	/>

	<SqlExecCard
		title="Paso 2 · CREATE TABLE {config.tableName}"
		checkKey={`2026-05-04.rebuild.${config.tableName}.create`}
		sql={createSql}
		desc="Recrea la tabla destino con la DDL canónica."
		confirmKind="warning"
		confirmMessage={`Se creará la tabla ${config.tableName} (CREATE TABLE).\n\n¿Continuar?`}
		{executeSql}
		height="320px"
	/>

	{#if rows.length === 0}
		<Card variant="flat">
			<FlexLayout items="center">
				<Iconify icon="mdi:information-outline" />
				<Text color="neutral">
					Sin filas para insertar — la tabla <code>{config.tableName}</code> no tiene fotografía guardada en CSV.
				</Text>
			</FlexLayout>
		</Card>
	{:else}
		<SqlExecCard
			title="Paso 3 · INSERT desde CSV ({rows.length} filas)"
			checkKey={`2026-05-04.rebuild.${config.tableName}.insert`}
			sql={insertSql}
			desc="Inserta filas tipadas vía TRY_CAST solo si la tabla destino está vacía (idempotente)."
			confirmKind="warning"
			confirmMessage={`Se insertarán ${rows.length} filas en ${config.tableName} (solo si está vacía).\n\n¿Continuar?`}
			{executeSql}
			height="320px"
		/>
	{/if}
</AccordionActions>

<style>
	.md-modal-body {
		flex: 1 1 auto;
		min-height: 0;
		overflow: auto;
		padding: 0.5rem 1rem;
	}
	.csv-raw {
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		font-size: 0.8rem;
		white-space: pre;
		margin: 0;
		color: var(--is-color);
	}
	:global(.md-modal-body table) {
		border-collapse: collapse;
		width: 100%;
		font-size: 0.85rem;
	}
	:global(.md-modal-body th),
	:global(.md-modal-body td) {
		border: 1px solid var(--is-b-color);
		padding: 0.25rem 0.5rem;
		text-align: left;
		vertical-align: top;
	}
	:global(.md-modal-body th) {
		background: var(--is-bg-secondary);
		position: sticky;
		top: 0;
	}
</style>
