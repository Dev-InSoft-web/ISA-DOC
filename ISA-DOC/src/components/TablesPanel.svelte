<script lang="ts">
	import { onMount } from "svelte";
	import {
		Card, Button, H2, H4, Text, Toaster, toastError, toastSuccess,
		FlexLayout, Iconify,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import TableEditor from "./TableEditor.svelte";
	import CodeModal from "./CodeModal.svelte";
	import type { ParsedTable } from "../lib/tableSchema.ts";
	import { parseTableFragment, emitTable, emitTablesAsBody } from "../lib/tableSchema.ts";

	type Kind = "table" | "index" | "fk" | "seed" | "raw";
	interface SqlFragment {
		id: string;
		name: string;
		description: string;
		kind: Kind;
		body: string;
	}

	type Category = "principales" | "pivote" | "historial" | "otras";

	let fragments: SqlFragment[] = [];
	let tables: ParsedTable[] = [];
	let prefix: string = "CAPAC_";
	let loading = true;
	let saving = false;
	let dirty = false;
	let filterText = "";
	let modalShow = false;
	let modalTitle = "";
	let modalValue = "";

	function inferCategory(fragmentName: string): Category {
		const n = fragmentName.toUpperCase();
		if (/(HISTORIAL|AUDITOR)/.test(n)) return "historial";
		if (/(PIVOTE|DETALLES|PIVOT)/.test(n)) return "pivote";
		if (/(PRINCIPAL|TABLAS)/.test(n)) return "principales";
		return "otras";
	}

	const CATEGORIES: { id: Category; label: string; icon: string }[] = [
		{ id: "principales", label: "Tablas principales", icon: "mdi:table" },
		{ id: "pivote", label: "Tablas pivote / detalle", icon: "mdi:table-multiple" },
		{ id: "historial", label: "Tablas de historial", icon: "mdi:history" },
		{ id: "otras", label: "Otras", icon: "mdi:dots-horizontal" },
	];

	$: byCategory = (() => {
		const map: Record<Category, { table: ParsedTable; index: number }[]> = {
			principales: [], pivote: [], historial: [], otras: [],
		};
		tables.forEach((t, i) => {
			if (filterText.trim()) {
				const q = filterText.toLowerCase();
				if (!t.name.toLowerCase().includes(q) && !t.columns.some((c) => c.name.toLowerCase().includes(q))) return;
			}
			map[inferCategory(t.fragmentName)].push({ table: t, index: i });
		});
		return map;
	})();

	$: detectedPrefix = (() => {
		if (!tables.length) return "";
		const m = /^([A-Z][A-Z0-9]*_)/.exec(tables[0].name);
		return m ? m[1] : "";
	})();

	async function load(): Promise<void> {
		loading = true;
		try {
			const r = await fetch("/api/sql/fragments");
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			const data = (await r.json()) as { fragments: SqlFragment[] };
			fragments = data.fragments ?? [];
			const all: ParsedTable[] = [];
			for (const f of fragments) {
				if (f.kind !== "table") continue;
				const ts = parseTableFragment(f.id, f.name, f.body);
				for (const t of ts) all.push(t);
			}
			tables = all;
			if (detectedPrefix) prefix = detectedPrefix;
			dirty = false;
		} catch (err) {
			toastError(`Error cargando tablas: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			loading = false;
		}
	}

	function markDirty(): void { dirty = true; }

	function onTableChange(idx: number, t: ParsedTable): void {
		tables[idx] = { ...t };
		tables = tables;
		markDirty();
	}

	function applyPrefix(): void {
		const newPrefix = prefix.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
		if (newPrefix && !newPrefix.endsWith("_")) prefix = newPrefix + "_";
		else prefix = newPrefix;
		const old = detectedPrefix;
		if (!old || old === prefix) return;
		tables = tables.map((t) => t.name.startsWith(old) ? { ...t, name: prefix + t.name.slice(old.length) } : t);
		markDirty();
		toastSuccess(`Prefijo cambiado: ${old} → ${prefix}`);
	}

	async function save(): Promise<void> {
		if (saving) return;
		saving = true;
		try {
			// agrupar tablas por fragmento de origen y reemitir el body completo
			const grouped: Record<string, ParsedTable[]> = {};
			for (const t of tables) {
				if (!grouped[t.fragmentId]) grouped[t.fragmentId] = [];
				grouped[t.fragmentId].push(t);
			}
			const nextFragments = fragments.map((f) => {
				if (f.kind !== "table") return f;
				const ts = grouped[f.id];
				if (!ts || ts.length === 0) return f;
				return { ...f, body: emitTablesAsBody(ts).trimEnd() };
			});
			const r = await fetch("/api/sql/fragments", {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ fragments: nextFragments }),
			});
			const data = (await r.json()) as { ok?: boolean; error?: string };
			if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
			fragments = nextFragments;
			toastSuccess(`Tablas guardadas (${tables.length})`);
			dirty = false;
		} catch (err) {
			toastError(`Error guardando: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			saving = false;
		}
	}

	function openTableSql(t: ParsedTable): void {
		modalTitle = t.name;
		modalValue = emitTable(t);
		modalShow = true;
	}

	onMount(load);
</script>

<Toaster />

<section class="tables-section">
	<Card>
		<FlexLayout items="center" justify="between">
			<div>
				<H2>Editor visual de tablas</H2>
				<Text color="neutral"><small>Edita nombres, prefijo, columnas y tipos. Al guardar se reescriben los fragmentos <code>kind=table</code>.</small></Text>
			</div>
			<FlexLayout items="center">
				<Button variant="outlined" style="width: fit-content;" onClick={load}>
					<Iconify icon="mdi:refresh" /> Recargar
				</Button>
				<Button color="primary" style="width: fit-content;" disabled={!dirty || saving} onClick={save}>
					<Iconify icon={saving ? "mdi:loading" : "mdi:content-save"} /> Guardar
				</Button>
			</FlexLayout>
		</FlexLayout>
	</Card>

	<Card variant="flat">
		<FlexLayout items="center">
			<label class="field">
				<Text color="neutral"><small>Prefijo global</small></Text>
				<FlexLayout items="center">
					<input class="input-field prefix-input" type="text" bind:value={prefix} placeholder="CAPAC_" />
					<Button variant="outlined" style="width: fit-content;" onClick={applyPrefix}>
						<Iconify icon="mdi:check" /> Aplicar prefijo
					</Button>
				</FlexLayout>
			</label>
			<label class="field flex-grow">
				<Text color="neutral"><small>Filtrar tabla / columna</small></Text>
				<input class="input-field" type="text" placeholder="Buscar…" bind:value={filterText} />
			</label>
		</FlexLayout>
	</Card>

	{#if loading}
		<Card variant="flat"><Text color="neutral">Cargando…</Text></Card>
	{:else if tables.length === 0}
		<Card variant="flat"><Text color="neutral">No se detectaron fragmentos <code>kind=table</code>.</Text></Card>
	{:else}
		{#each CATEGORIES as cat}
			{#if byCategory[cat.id].length > 0}
				<Card variant="flat">
					<FlexLayout items="center">
						<Iconify icon={cat.icon} />
						<H4>{cat.label}</H4>
						<Text color="neutral"><small>({byCategory[cat.id].length})</small></Text>
					</FlexLayout>
					<FlexLayout direction="column">
						{#each byCategory[cat.id] as entry (entry.table.fragmentId + "::" + entry.table.originalName)}
							<TableEditor
								table={entry.table}
								{prefix}
								onChange={(t) => onTableChange(entry.index, t)}
								onOpenSql={openTableSql}
							/>
						{/each}
					</FlexLayout>
				</Card>
			{/if}
		{/each}
	{/if}
</section>

<CodeModal bind:bshow={modalShow} title={modalTitle} value={modalValue} language="sql" />

<style>
	.tables-section {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.field { display: flex; flex-direction: column; gap: 0.2rem; }
	.flex-grow { flex: 1; }
	.input-field {
		background: var(--is-bg-secondary);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		padding: 0.25rem 0.5rem;
		font-size: 0.85rem;
		color: var(--is-color);
		outline: none;
	}
	.input-field:focus { border-color: var(--is-primary); }
	.prefix-input {
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		max-width: 12rem;
	}
</style>
