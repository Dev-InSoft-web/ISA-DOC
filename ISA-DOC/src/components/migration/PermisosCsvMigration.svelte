<script lang="ts">
	import {
		Card, Button, H4, Text, Toaster, toastError, toastSuccess,
		FlexLayout, Iconify,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import SqlViewer from "../viewers/SqlViewer.svelte";
	import CodeModal from "../viewers/CodeModal.svelte";
	import { PERMISOS_CSV } from "../../lib/permisosCsv.ts";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let tableName: string = "PERMISOS";

	type Row = Record<string, string>;

	let csvText: string = PERMISOS_CSV;
	let headers: string[] = [];
	let rows: Row[] = [];
	let parseError: string = "";
	let colIpermiso: string = "IMODULOVRT";
	let colNpermiso: string = "NMODULO";
	let approved: boolean = false;
	let executing: boolean = false;
	let modalShow: boolean = false;
	let modalTitle: string = "";
	let modalValue: string = "";

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
		if (!clean) return { headers: [], rows: [], error: "CSV vacÃ­o" };
		const lines = clean.split("\n").filter((l) => l.trim().length > 0);
		if (lines.length < 2) return { headers: [], rows: [], error: "Se requiere encabezado y al menos una fila" };
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
		if (headers.length > 0) {
			if (!headers.includes(colIpermiso)) colIpermiso = headers[0];
			if (!headers.includes(colNpermiso)) colNpermiso = headers[Math.min(1, headers.length - 1)];
		}
	}

	function escapeSql(v: string): string {
		return `'${(v ?? "").replace(/'/g, "''")}'`;
	}

	function buildSql(): string {
		if (!rows.length) return "-- Sin filas para migrar";
		if (!colIpermiso || !colNpermiso) return "-- Selecciona las columnas de origen";
		const lines: string[] = [];
		lines.push("-- MigraciÃ³n de PERMISOS desde CSV");
		lines.push(`-- Origen: ${colIpermiso} â†’ ipermiso, ${colNpermiso} â†’ npermiso`);
		lines.push(`-- Filas: ${rows.length}`);
		lines.push("");
		const values: string[] = [];
		const seen = new Set<string>();
		for (const r of rows) {
			const ip = (r[colIpermiso] ?? "").trim();
			const np = (r[colNpermiso] ?? "").trim();
			if (!ip) continue;
			if (seen.has(ip)) continue;
			seen.add(ip);
			values.push(`    (${escapeSql(ip)}, ${escapeSql(np)})`);
		}
		if (!values.length) return "-- No se encontraron valores vÃ¡lidos en la columna ipermiso";
		lines.push(`INSERT INTO ${tableName} (ipermiso, npermiso)`);
		lines.push("VALUES");
		lines.push(values.join(",\n") + ";");
		return lines.join("\n");
	}

	$: generatedSql = buildSql();

	function openInModal(): void {
		modalTitle = `SQL Â· MigraciÃ³n ${tableName}`;
		modalValue = generatedSql;
		modalShow = true;
	}

	function copySql(): void {
		navigator.clipboard?.writeText(generatedSql);
		toastSuccess("SQL copiado");
	}

	async function runSequence(): Promise<void> {
		if (!approved) { toastError("Aprueba la ejecuciÃ³n antes de continuar"); return; }
		if (!executeSql) { toastError("Ejecutor SQL no disponible"); return; }
		const ok = confirm(`âš ï¸ Se va a ejecutar el INSERT contra ${tableName} (${rows.length} filas).\n\nÂ¿Continuar?`);
		if (!ok) return;
		executing = true;
		try {
			const res = await executeSql(generatedSql);
			if (res.ok) toastSuccess(`Secuencia ejecutada Â· ${rows.length} filas`);
			else toastError(`FallÃ³: ${res.error ?? res.output ?? "desconocido"}`);
		} catch (err) {
			toastError(`Error: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			executing = false;
		}
	}
</script>

<Toaster />

<AccordionActions
	title="Permisos Â· MigraciÃ³n desde CSV"
	icon="mdi:file-delimited"
	count={rows.length}
	open={false}
	actions={[
		{ icon: "mdi:content-copy", label: "Copiar SQL", onClick: copySql },
		{ icon: "mdi:eye-outline", label: "Ver SQL", onClick: openInModal },
	]}
>
	<Card variant="flat">
		<FlexLayout direction="column">
			<H4>Origen Â· CSV</H4>
			<Text color="neutral"><small>Encabezado + filas separadas por coma. Edita aquÃ­ el contenido si se necesita ajustar.</small></Text>
			<textarea class="csv-input" bind:value={csvText} spellcheck="false"></textarea>
			{#if parseError}
				<Text color="error">{parseError}</Text>
			{:else}
				<Text color="neutral"><small>{rows.length} filas Â· {headers.length} columnas</small></Text>
			{/if}
		</FlexLayout>
	</Card>

	{#if !parseError && rows.length > 0}
		<Card variant="flat">
			<FlexLayout direction="column">
				<H4>Mapeo de columnas â†’ tabla <code>{tableName}</code></H4>
				<FlexLayout items="center">
					<label class="field">
						<Text color="neutral"><small>ipermiso</small></Text>
						<select class="input-field" bind:value={colIpermiso}>
							{#each headers as h}<option value={h}>{h}</option>{/each}
						</select>
					</label>
					<label class="field">
						<Text color="neutral"><small>npermiso</small></Text>
						<select class="input-field" bind:value={colNpermiso}>
							{#each headers as h}<option value={h}>{h}</option>{/each}
						</select>
					</label>
				</FlexLayout>
			</FlexLayout>
		</Card>

		<Card variant="flat">
			<FlexLayout direction="column">
				<H4>Vista previa del CSV</H4>
				<div class="table-wrap">
					<table class="csv-table">
						<thead>
							<tr>
								{#each headers as h}
									<th class:hl={h === colIpermiso || h === colNpermiso}>{h}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each rows as r}
								<tr>
									{#each headers as h}
										<td class:hl={h === colIpermiso || h === colNpermiso}>{r[h] ?? ""}</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</FlexLayout>
		</Card>

		<Card variant="flat">
			<FlexLayout direction="column">
				<FlexLayout items="center" justify="between">
					<H4>SQL generado</H4>
					<Button variant="outlined" style="width: fit-content;" onClick={openInModal}>
						<Iconify icon="mdi:eye-outline" /> Abrir
					</Button>
				</FlexLayout>
				<SqlViewer value={generatedSql} height="240px" />
			</FlexLayout>
		</Card>

		<Card variant="flat">
			<FlexLayout direction="column">
				<H4>EjecuciÃ³n</H4>
				<Text color="neutral"><small>La secuencia <b>no</b> se ejecuta automÃ¡ticamente. Aprueba y pulsa <b>Ejecutar secuencia</b> para enviar los datos a la tabla.</small></Text>
				<label class="approve">
					<input type="checkbox" bind:checked={approved} />
					<Text>Aprobado para ejecutar contra la BD</Text>
				</label>
				<FlexLayout items="center">
					<Button
						color="warning"
						style="width: fit-content;"
						disabled={!approved || executing || !executeSql}
						onClick={runSequence}
					>
						<Iconify icon={executing ? "mdi:loading" : "mdi:play"} />
						{executing ? "Ejecutandoâ€¦" : "Ejecutar secuencia"}
					</Button>
					{#if !executeSql}
						<Text color="error"><small>Sin canal de ejecuciÃ³n (socket no disponible)</small></Text>
					{/if}
				</FlexLayout>
			</FlexLayout>
		</Card>
	{/if}
</AccordionActions>

<CodeModal bind:bshow={modalShow} title={modalTitle} value={modalValue} language="sql" />

<style>
	.csv-input {
		width: 100%;
		min-height: 8rem;
		max-height: 16rem;
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		font-size: 0.78rem;
		background: var(--is-bg-readonly);
		color: var(--is-color);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		padding: 0.5rem;
		resize: vertical;
	}
	.field { display: flex; flex-direction: column; gap: 0.2rem; min-width: 12rem; }
	.input-field {
		background: var(--is-bg-secondary);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		padding: 0.25rem 0.5rem;
		font-size: 0.85rem;
		color: var(--is-color);
		outline: none;
	}
	.table-wrap {
		max-height: 22rem;
		overflow: auto;
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
	}
	.csv-table {
		border-collapse: collapse;
		font-size: 0.78rem;
		width: max-content;
		min-width: 100%;
	}
	.csv-table th, .csv-table td {
		border-bottom: 1px solid var(--is-b-color);
		padding: 0.25rem 0.5rem;
		text-align: left;
		white-space: nowrap;
		max-width: 32rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.csv-table th { background: var(--is-bg-readonly); position: sticky; top: 0; }
	.csv-table th.hl, .csv-table td.hl { background: rgba(78, 201, 176, 0.12); }
	.approve { display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; }
</style>
