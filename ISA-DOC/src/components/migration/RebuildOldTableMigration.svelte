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

	const tsvModules = import.meta.glob("../../lib/migration/tsv/**/*.tsv", {
		query: "?raw",
		import: "default",
		eager: true,
	}) as Record<string, string>;

	const snapshotsByTable: Record<string, Snapshot[]> = {};
	for (const [p, text] of Object.entries(tsvModules)) {
		const m = /(?:^|\/)((?:\d{4}-\d{2}-\d{2}\/)?)(\d{8}(?:\d{6})?)-(.+)\.tsv$/.exec(p);
		if (!m) continue;
		const dir = m[1];
		const date = m[2];
		const table = m[3];
		const file = `${dir}${date}-${table}.tsv`;
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
	$: tsvText = activeSnapshot?.content ?? config.csvDefault;
	$: selectedFile = activeSnapshot?.file ?? "";

	let parseError: string = "";
	let headers: string[] = [];
	let rows: Row[] = [];

	let mdModalShow: boolean = false;
	let decorateMd: boolean = true;

	function unescapeTsvCell(s: string): string {
		// Inverso del escape del endpoint: \\ \t \r \n
		let out = "";
		for (let i = 0; i < s.length; i++) {
			const ch = s[i];
			if (ch === "\\" && i + 1 < s.length) {
				const next = s[i + 1];
				if (next === "\\") { out += "\\"; i++; continue; }
				if (next === "t")  { out += "\t"; i++; continue; }
				if (next === "r")  { out += "\r"; i++; continue; }
				if (next === "n")  { out += "\n"; i++; continue; }
			}
			out += ch;
		}
		return out;
	}

	function parseTsv(text: string): { headers: string[]; rows: Row[]; error: string } {
		const clean = (text ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		if (!clean.trim()) return { headers: [], rows: [], error: "" };
		const lines = clean.split("\n");
		// quitar líneas totalmente vacías al final
		while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
		if (lines.length < 1) return { headers: [], rows: [], error: "TSV vacío" };
		const hdrs = lines[0].split("\t").map((h) => unescapeTsvCell(h).trim());
		const data: Row[] = [];
		for (let i = 1; i < lines.length; i++) {
			if (lines[i] === "") continue;
			const cells = lines[i].split("\t");
			const row: Row = {};
			for (let j = 0; j < hdrs.length; j++) row[hdrs[j]] = unescapeTsvCell(cells[j] ?? "");
			data.push(row);
		}
		return { headers: hdrs, rows: data, error: "" };
	}

	$: {
		const r = parseTsv(tsvText);
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

	const INSERT_BATCH_SIZE = 900;

	const reInt = /^-?\d+$/;
	const reDec = /^-?\d+(\.\d+)?$/;
	const reIso = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,7}))?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

	function isStringType(type: string): boolean {
		const t = type.toUpperCase();
		return t.startsWith("VARCHAR") || t.startsWith("NVARCHAR")
			|| t.startsWith("CHAR") || t.startsWith("NCHAR")
			|| t === "TEXT" || t === "NTEXT";
	}

	function isIntType(type: string): boolean {
		const t = type.toUpperCase();
		return t === "INT" || t === "BIGINT" || t === "SMALLINT" || t === "TINYINT";
	}

	function isDecimalType(type: string): boolean {
		const t = type.toUpperCase();
		return t.startsWith("DECIMAL") || t.startsWith("NUMERIC")
			|| t === "FLOAT" || t === "REAL" || t.startsWith("MONEY");
	}

	function isDateType(type: string): boolean {
		const t = type.toUpperCase();
		return t === "DATE" || t === "DATETIME" || t === "DATETIME2"
			|| t === "SMALLDATETIME" || t === "DATETIMEOFFSET" || t === "TIME";
	}

	function formatDateLiteral(value: string, type: string): string | null {
		const m = reIso.exec(value.trim());
		if (!m) return null;
		const [, y, mo, d, hh, mi, ss, frac, tz] = m;
		const t = type.toUpperCase();
		if (t === "DATE") return `'${y}-${mo}-${d}'`;
		const time = `${hh ?? "00"}:${mi ?? "00"}:${ss ?? "00"}`;
		const fracPart = frac ? `.${frac.padEnd(7, "0").slice(0, 7)}` : "";
		if (t === "DATETIMEOFFSET") {
			let off = tz ?? "+00:00";
			if (off === "Z") off = "+00:00";
			else if (/^[+-]\d{4}$/.test(off)) off = `${off.slice(0, 3)}:${off.slice(3)}`;
			return `'${y}-${mo}-${d} ${time}${fracPart} ${off}'`;
		}
		if (t === "SMALLDATETIME" || t === "DATETIME") {
			return `'${y}-${mo}-${d} ${time}'`;
		}
		// DATETIME2
		return `'${y}-${mo}-${d} ${time}${fracPart}'`;
	}

	function castValue(value: string, type: string): string {
		if (isEmpty(value) || value.toUpperCase() === "NULL") return "NULL";
		if (isStringType(type)) return escapeStr(value);
		if (type.toUpperCase() === "BIT") {
			const v = value.trim().toUpperCase();
			if (v === "1" || v === "TRUE")  return "1";
			if (v === "0" || v === "FALSE") return "0";
			return `TRY_CAST(${escapeStr(value)} AS BIT)`;
		}
		if (isIntType(type) && reInt.test(value.trim())) return value.trim();
		if (isDecimalType(type) && reDec.test(value.trim())) return value.trim();
		if (isDateType(type)) {
			const lit = formatDateLiteral(value, type);
			if (lit) return lit;
		}
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
		const batches: string[][] = [];
		for (let i = 0; i < valuesLines.length; i += INSERT_BATCH_SIZE) {
			batches.push(valuesLines.slice(i, i + INSERT_BATCH_SIZE));
		}
		const lines: string[] = [];
		lines.push(`-- Paso 3 · Insertar ${rows.length} filas en ${config.tableName} desde CSV (solo si la tabla está vacía)`);
		lines.push(`-- ${batches.length} lote(s) de hasta ${INSERT_BATCH_SIZE} filas (límite SQL Server: 1000 por INSERT)`);
		lines.push(`SET XACT_ABORT ON;`);
		lines.push(`BEGIN TRAN;`);
		lines.push(``);
		lines.push(`IF NOT EXISTS (SELECT 1 FROM ${config.tableName})`);
		lines.push(`BEGIN`);
		batches.forEach((batch, idx) => {
			if (idx > 0) lines.push(``);
			lines.push(`    -- Lote ${idx + 1}/${batches.length} (${batch.length} filas)`);
			lines.push(`    INSERT INTO ${config.tableName} (${colNames})`);
			lines.push(`    VALUES`);
			lines.push(batch.join(",\n") + ";");
		});
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
	title="{config.tableName} · Construcción desde CSV"
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
					<Text color="neutral"><small>{rows.length} filas · {headers.length} columnas{selectedFile ? ` · src/lib/migration/tsv/${selectedFile}` : ""}</small></Text>
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
				<pre class="csv-raw">{tsvText}</pre>
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

	<slot />
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
