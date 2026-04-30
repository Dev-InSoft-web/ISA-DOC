<script lang="ts">
	import { onMount } from "svelte";
	import {
		Card, Button, H2, H4, Text, Toaster, toastError, toastSuccess,
		FlexLayout, Iconify,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import SqlTreeEditor from "../editors/SqlTreeEditor.svelte";
	import CodeModal from "../viewers/CodeModal.svelte";
	import CodeViewer from "../viewers/CodeViewer.svelte";
	import PermisosCsvMigration from "../migration/PermisosCsvMigration.svelte";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import type { ParsedTable } from "../../lib/tableSchema.ts";
	import { parseTableFragment, emitTable, emitDropTable, emitTablesAsBody } from "../../lib/tableSchema.ts";
	import { generateResourcesFromTables } from "../../lib/codeGen/autogen.ts";
	import { genModelo, genServer, genClient } from "../../lib/codeGen/generators.ts";
	import ConfirmExecuteButton from "../_comps/especial/ConfirmExecuteButton.svelte";
	import {
		fragmentsStore, refreshFragments, setFragmentsAfterSave, startFragmentsSocket,
		executeSqlViaSocket,
		type SqlFragment, type SqlFragmentKind,
	} from "../../lib/fragmentsStore.ts";

	type Kind = SqlFragmentKind;

	type Category = "principales" | "pivote" | "historial" | "otras";

	type ProdRole = "pojo" | "server" | "client";
	interface ProdTsFragment { role: ProdRole; region: string; sourceFile: string; body: string; }
	let prodTsMap: Record<string, ProdTsFragment[]> = {};
	let syncingRegions: boolean = false;

	let fragments: SqlFragment[] = [];
	let tables: ParsedTable[] = [];
	type PrefixEntry = { detected: string; current: string };
	let prefixEntries: PrefixEntry[] = [];
	let loading = true;
	let revalidating = false;
	let saving = false;
	let dirty = false;
	let filterText = "";
	let modalShow = false;
	let modalTitle = "";
	let modalValue = "";
	let modalLanguage: "sql" | "ts" = "sql";

	let executing: Record<string, boolean> = {};

	function tableKey(t: ParsedTable): string { return t.fragmentId + "::" + t.originalName; }

	async function runSql(label: string, sql: string, key: string): Promise<boolean> {
		if (executing[key]) return false;
		executing = { ...executing, [key]: true };
		try {
			const res = await executeSqlViaSocket(sql);
			if (res.ok) {
				toastSuccess(`${label} OK`);
				return true;
			}
			toastError(`${label} fallÃ³: ${res.error ?? "error desconocido"}`);
			return false;
		} finally {
			executing = { ...executing, [key]: false };
		}
	}

	async function execRecreateOne(t: ParsedTable): Promise<void> {
		const k = tableKey(t);
		const dropOk = await runSql(`DROP ${t.name}`, emitDropTable(t), `recreate:${k}`);
		if (!dropOk) return;
		await runSql(`CREATE ${t.name}`, emitTable(t), `recreate:${k}`);
	}

	async function execSeqRecreate(_pkey: string, list: ParsedTable[]): Promise<void> {
		const dropOrder = [...list].reverse();
		let dropOk = 0;
		for (const t of dropOrder) {
			const ok = await runSql(`DROP ${t.name}`, emitDropTable(t), `recreate:${tableKey(t)}`);
			if (ok) dropOk++;
		}
		let createOk = 0;
		for (const t of list) {
			const ok = await runSql(`CREATE ${t.name}`, emitTable(t), `recreate:${tableKey(t)}`);
			if (ok) createOk++;
		}
		toastSuccess(`Secuencia DROP+CREATE: ${dropOk}/${list.length} dropped, ${createOk}/${list.length} created`);
	}

	function prefixEntryIndex(pkey: string): number {
		return prefixEntries.findIndex((e) => e.detected === pkey);
	}

	function rebuildFromFragments(list: SqlFragment[]): void {
		fragments = list;
		const all: ParsedTable[] = [];
		for (const f of list) {
			if (f.kind !== "table") continue;
			const ts = parseTableFragment(f.id, f.name, f.body);
			for (const t of ts) all.push(t);
		}
		tables = all;
		syncPrefixesFromTables();
	}

	const unsubFragments = fragmentsStore.subscribe((s) => {
		loading = !s.loaded;
		revalidating = s.revalidating;
		if (dirty) return;
		rebuildFromFragments(s.fragments);
	});

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

	$: byPrefix = (() => {
		const map: Record<string, { table: ParsedTable; index: number; category: Category }[]> = {};
		tables.forEach((t, i) => {
			if (filterText.trim()) {
				const q = filterText.toLowerCase();
				if (!t.name.toLowerCase().includes(q) && !t.columns.some((c) => c.name.toLowerCase().includes(q))) return;
			}
			const p = detectPrefix(t.name);
			if (!map[p]) map[p] = [];
			map[p].push({ table: t, index: i, category: inferCategory(t.fragmentName) });
		});
		return map;
	})();

	$: prefixOrder = (() => {
		const keys = Object.keys(byPrefix);
		keys.sort((a, b) => {
			if (a === b) return 0;
			if (a === "") return 1;
			if (b === "") return -1;
			return a.localeCompare(b);
		});
		return keys;
	})();

	function detectPrefix(name: string): string {
		const m = /^([A-Z][A-Z0-9]*_)/.exec(name);
		return m ? m[1] : "";
	}

	function tablePrefix(t: ParsedTable): string { return detectPrefix(t.name); }

	function syncPrefixesFromTables(): void {
		const detected = Array.from(new Set(tables.map((t) => detectPrefix(t.name))));
		detected.sort();
		const byKey = new Map(prefixEntries.map((e) => [e.detected, e]));
		// Mantener cualquier entrada que el usuario haya aÃ±adido manualmente aunque no haya tablas todavÃ­a.
		const manual = prefixEntries.filter((e) => !detected.includes(e.detected) && e.current !== e.detected);
		prefixEntries = [...detected.map((d) => byKey.get(d) ?? { detected: d, current: d }), ...manual];
	}

	async function load(): Promise<void> {
		try {
			dirty = false;
			await refreshFragments();
		} catch (err) {
			toastError(`Error cargando tablas: ${err instanceof Error ? err.message : String(err)}`);
		}
	}

	function markDirty(): void { dirty = true; }

	function onTableChange(idx: number, t: ParsedTable): void {
		tables[idx] = { ...t };
		tables = tables;
		markDirty();
		void save(true);
	}

	let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;
	const AUTO_SAVE_DELAY_MS = 1000;
	function scheduleAutoSave(): void {
		if (autoSaveTimer) clearTimeout(autoSaveTimer);
		autoSaveTimer = setTimeout(() => {
			autoSaveTimer = null;
			if (dirty) void save(true);
		}, AUTO_SAVE_DELAY_MS);
	}

	function normalizePrefix(raw: string): string {
		const v = (raw ?? "").trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");
		if (!v) return "";
		return v.endsWith("_") ? v : v + "_";
	}

	function onPrefixInput(idx: number, raw: string): void {
		const entry = prefixEntries[idx];
		if (!entry) return;
		const old = entry.detected;
		const next = normalizePrefix(raw);
		entry.current = raw;
		prefixEntries = prefixEntries;
		if (next === old) return;
		if (prefixEntries.some((e, i) => i !== idx && e.detected === next)) return;
		tables = tables.map((t) => {
			if (detectPrefix(t.name) !== old) return t;
			return { ...t, name: next + t.name.slice(old.length) };
		});
		prefixEntries = prefixEntries.map((e, i) => (i === idx ? { detected: next, current: next } : e));
		markDirty();
		scheduleAutoSave();
	}

	function addPrefixEntry(): void {
		prefixEntries = [...prefixEntries, { detected: `__nuevo_${prefixEntries.length}`, current: "" }];
	}

	function removePrefixEntry(idx: number): void {
		const entry = prefixEntries[idx];
		if (!entry) return;
		if (tables.some((t) => detectPrefix(t.name) === entry.detected)) {
			toastError(`No se puede eliminar: hay tablas con prefijo "${entry.detected || '(vacÃ­o)'}".`);
			return;
		}
		prefixEntries = prefixEntries.filter((_, i) => i !== idx);
	}

	async function save(silent = false): Promise<void> {
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
			setFragmentsAfterSave(nextFragments);
			if (!silent) toastSuccess(`Tablas guardadas (${tables.length})`);
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
		modalLanguage = "sql";
		modalShow = true;
	}

	function openCodeModal(title: string, value: string, language: "sql" | "ts" = "ts"): void {
		modalTitle = title;
		modalValue = value;
		modalLanguage = language;
		modalShow = true;
	}

	onMount(() => {
		startFragmentsSocket();
		void refreshFragments();
		void loadProdTs();
		return () => { unsubFragments(); };
	});

	async function loadProdTs(): Promise<void> {
		try {
			const res = await fetch("/api/ts/fragments");
			if (!res.ok) return;
			const data = await res.json();
			if (data && data.ok && data.map) prodTsMap = data.map as Record<string, ProdTsFragment[]>;
		} catch {
			// ignorar â€” la comparativa simplemente no se mostrarÃ¡
		}
	}

	async function syncRegions(): Promise<void> {
		if (syncingRegions) return;
		syncingRegions = true;
		try {
			const tableNames = Array.from(new Set(tables.map((t) => t.name.toUpperCase())));
			const res = await fetch("/api/ts/sync-regions", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ tables: tableNames }),
			});
			const data = (await res.json()) as { ok?: boolean; error?: string; filesChanged?: string[]; renames?: { from: string; to: string }[] };
			if (!res.ok || !data.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
			const nRen = data.renames?.length ?? 0;
			const nFiles = data.filesChanged?.length ?? 0;
			toastSuccess(`Regiones sincronizadas: ${nRen} renombradas en ${nFiles} archivos.`);
			await loadProdTs();
		} catch (err) {
			toastError(`Error sincronizando regiones: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			syncingRegions = false;
		}
	}
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
				<Button variant="outlined" style="width: fit-content;" disabled={syncingRegions} onClick={syncRegions}>
					<Iconify icon={syncingRegions ? "mdi:loading" : "mdi:sync"} /> Sincronizar regiones
				</Button>
				<Button color="primary" style="width: fit-content;" disabled={!dirty || saving} onClick={save}>
					<Iconify icon={saving ? "mdi:loading" : "mdi:content-save"} /> Guardar
				</Button>
			</FlexLayout>
		</FlexLayout>
	</Card>

	<Card variant="flat">
		<FlexLayout direction="column">
			<label class="field">
				<Text color="neutral"><small>Filtrar tabla / columna</small></Text>
				<input class="input-field" type="text" placeholder="Buscarâ€¦" bind:value={filterText} />
			</label>
		</FlexLayout>
	</Card>

	{#if loading}
		<Card variant="flat"><Text color="neutral">Cargandoâ€¦</Text></Card>
	{:else if tables.length === 0}
		<Card variant="flat"><Text color="neutral">No se detectaron fragmentos <code>kind=table</code>.</Text></Card>
	{:else}
		{@const autogen = generateResourcesFromTables(tables)}
		{@const resByTable = new Map(autogen.resources.map((r) => [r.tableName.toUpperCase(), r]))}
		{#each prefixOrder as pkey (pkey)}
			{@const items = byPrefix[pkey] ?? []}
			{@const pIdx = prefixEntryIndex(pkey)}
			{@const pEntry = pIdx >= 0 ? prefixEntries[pIdx] : null}
			{#if items.length > 0}
				<AccordionActions
					title={pkey ? `Prefijo Â· ${pkey}` : "Sin prefijo"}
					icon={pkey ? "mdi:label" : "mdi:label-off-outline"}
					count={items.length}
					open={false}
				>
					<Card variant="flat">
						<FlexLayout direction="column">
							<FlexLayout items="center">
								<Iconify icon="mdi:label-outline" />
								<H4>Prefijo</H4>
								{#if pEntry}
									<input
										class="input-field prefix-input"
										type="text"
										value={pEntry.current}
										on:input={(e) => onPrefixInput(pIdx, (e.currentTarget as HTMLInputElement).value)}
										placeholder="(sin prefijo)"
									/>
									<Text color="neutral"><small>actual: <code>{pEntry.detected || '(vacÃ­o)'}</code></small></Text>
								{/if}
							</FlexLayout>

							<FlexLayout items="center">
								<Text color="neutral"><small>Recrear en serie ({items.length}): DROP (orden inverso) + CREATE</small></Text>
								<span class="flex-grow"></span>
								<ConfirmExecuteButton
									color="primary"
									icon="mdi:database-refresh"
									label="Recrear tablas"
									onExecute={() => execSeqRecreate(pkey, items.map((it) => it.table))}
								/>
							</FlexLayout>
						</FlexLayout>
					</Card>

					{#each CATEGORIES as cat}
						{@const catItems = items.filter((it) => it.category === cat.id)}
						{#if catItems.length > 0}
							<Card variant="flat">
								<FlexLayout items="center">
									<Iconify icon={cat.icon} />
									<H4>{cat.label}</H4>
									<Text color="neutral"><small>({catItems.length})</small></Text>
								</FlexLayout>
								<FlexLayout direction="column">
									{#each catItems as entry (entry.table.fragmentId + "::" + entry.table.originalName)}
										{@const tk = tableKey(entry.table)}
										<AccordionActions
											inner
											title={entry.table.name}
											titleIcon="mdi:table"
											open={false}
										>
<SqlTreeEditor
												table={entry.table}
												prefix={tablePrefix(entry.table)}
												onChange={(t) => onTableChange(entry.index, t)}
											/>

											<div class="sql-block">
												<FlexLayout items="center" justify="between">
													<FlexLayout items="center">
														<Iconify icon="mdi:database-refresh" />
														<Text color="neutral"><small>Recrear tabla Â· DROP + CREATE</small></Text>
													</FlexLayout>
													<ConfirmExecuteButton
														color="primary"
														icon="mdi:database-refresh"
														label="Recrear tabla"
														busy={executing[`recreate:${tk}`]}
														onExecute={() => execRecreateOne(entry.table)}
													/>
												</FlexLayout>
												<CodeViewer value={`${emitDropTable(entry.table)}\n\n${emitTable(entry.table)}`} lang="sql" height="220px" />
											</div>

											{@const cfg = resByTable.get(entry.table.name.toUpperCase())}
											{#if cfg}
												{@const modelCode = genModelo(cfg, autogen.resources)}
												{@const serverCode = genServer(cfg, autogen.resources)}
												{@const clientCode = genClient(cfg)}
												{@const prodFrags = prodTsMap[entry.table.name.toUpperCase()] ?? []}
												{@const prodPojo = prodFrags.filter((p) => p.role === "pojo")}
												{@const prodServer = prodFrags.filter((p) => p.role === "server")}
												{@const prodClient = prodFrags.filter((p) => p.role === "client")}
												<AccordionActions
													inner
													title="TypeScript"
													titleIcon="mdi:language-typescript"
													open={false}
												>
													<div class="cmp-row">
														<div class="cmp-col cmp-local">
															<FlexLayout items="center" justify="between">
																<FlexLayout items="center">
																	<Iconify icon="mdi:cube-outline" />
																	<Text color="neutral"><small>Modelo Â· Local (ISA)</small></Text>
																</FlexLayout>
																<Button variant="outlined" style="width: fit-content;" onClick={() => openCodeModal(`${cfg.className} Â· Local`, modelCode)}>
																	<Iconify icon="mdi:eye-outline" /> Ver
																</Button>
															</FlexLayout>
															<CodeViewer value={modelCode} lang="ts" height="260px" />
														</div>
														<div class="cmp-col cmp-prod">
															{#if prodPojo.length === 0}
																<FlexLayout items="center">
																	<Iconify icon="mdi:alert-outline" />
																	<Text color="neutral"><small>Modelo Â· Prod ISP â€” sin fragmento</small></Text>
																</FlexLayout>
																<CodeViewer value="" lang="ts" height="260px" />
															{:else}
																{@const pf = prodPojo[0]}
																<FlexLayout items="center" justify="between">
																	<FlexLayout items="center">
																		<Iconify icon="mdi:source-branch" />
																		<Text color="neutral"><small>Modelo Â· Prod ISP Â· <code>{pf.sourceFile}</code></small></Text>
																	</FlexLayout>
																	<Button variant="outlined" style="width: fit-content;" onClick={() => openCodeModal(`${entry.table.name} Â· Prod Modelo`, pf.body)}>
																		<Iconify icon="mdi:eye-outline" /> Ver
																	</Button>
																</FlexLayout>
																<CodeViewer value={pf.body} lang="ts" height="260px" />
															{/if}
														</div>
													</div>

													<div class="cmp-row">
														<div class="cmp-col cmp-local">
															<FlexLayout items="center" justify="between">
																<FlexLayout items="center">
																	<Iconify icon="mdi:server" />
																	<Text color="neutral"><small>Server Â· Local (ISA)</small></Text>
																</FlexLayout>
																<Button variant="outlined" style="width: fit-content;" onClick={() => openCodeModal(`${cfg.className} Â· Server`, serverCode)}>
																	<Iconify icon="mdi:eye-outline" /> Ver
																</Button>
															</FlexLayout>
															<CodeViewer value={serverCode} lang="ts" height="260px" />
														</div>
														<div class="cmp-col cmp-prod">
															{#if prodServer.length === 0}
																<FlexLayout items="center">
																	<Iconify icon="mdi:alert-outline" />
																	<Text color="neutral"><small>Server Â· Prod ISP â€” sin fragmento</small></Text>
																</FlexLayout>
																<CodeViewer value="" lang="ts" height="260px" />
															{:else}
																{@const pf = prodServer[0]}
																<FlexLayout items="center" justify="between">
																	<FlexLayout items="center">
																		<Iconify icon="mdi:source-branch" />
																		<Text color="neutral"><small>Server Â· Prod ISP Â· <code>{pf.sourceFile}</code></small></Text>
																	</FlexLayout>
																	<Button variant="outlined" style="width: fit-content;" onClick={() => openCodeModal(`${entry.table.name} Â· Prod Server`, pf.body)}>
																		<Iconify icon="mdi:eye-outline" /> Ver
																	</Button>
																</FlexLayout>
																<CodeViewer value={pf.body} lang="ts" height="260px" />
															{/if}
														</div>
													</div>

													<div class="cmp-row">
														<div class="cmp-col cmp-local">
															<FlexLayout items="center" justify="between">
																<FlexLayout items="center">
																	<Iconify icon="mdi:monitor" />
																	<Text color="neutral"><small>Client Â· Local (ISA)</small></Text>
																</FlexLayout>
																<Button variant="outlined" style="width: fit-content;" onClick={() => openCodeModal(`${cfg.className} Â· Client`, clientCode)}>
																	<Iconify icon="mdi:eye-outline" /> Ver
																</Button>
															</FlexLayout>
															<CodeViewer value={clientCode} lang="ts" height="260px" />
														</div>
														<div class="cmp-col cmp-prod">
															{#if prodClient.length === 0}
																<FlexLayout items="center">
																	<Iconify icon="mdi:alert-outline" />
																	<Text color="neutral"><small>Client Â· Prod ISP â€” sin fragmento</small></Text>
																</FlexLayout>
																<CodeViewer value="" lang="ts" height="260px" />
															{:else}
																{@const pf = prodClient[0]}
																<FlexLayout items="center" justify="between">
																	<FlexLayout items="center">
																		<Iconify icon="mdi:source-branch" />
																		<Text color="neutral"><small>Client Â· Prod ISP Â· <code>{pf.sourceFile}</code></small></Text>
																	</FlexLayout>
																	<Button variant="outlined" style="width: fit-content;" onClick={() => openCodeModal(`${entry.table.name} Â· Prod Client`, pf.body)}>
																		<Iconify icon="mdi:eye-outline" /> Ver
																	</Button>
																</FlexLayout>
																<CodeViewer value={pf.body} lang="ts" height="260px" />
															{/if}
														</div>
													</div>
												</AccordionActions>
											{/if}

											{#if entry.table.name.toUpperCase() === "PERMISOS"}
												<PermisosCsvMigration executeSql={executeSqlViaSocket} tableName={entry.table.name} />
											{/if}
										</AccordionActions>
									{/each}
								</FlexLayout>
							</Card>
						{/if}
					{/each}
				</AccordionActions>
			{/if}
		{/each}
	{/if}
</section>

<CodeModal bind:bshow={modalShow} title={modalTitle} value={modalValue} language={modalLanguage} />

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
	.sql-block {
		margin-top: 0.5rem;
		border-top: 1px dashed var(--is-b-color);
		padding-top: 0.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.cmp-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
	.cmp-col {
		border-radius: 6px;
		padding: 0.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		border: 2px solid;
		min-width: 0;
	}
	.cmp-local { border-color: var(--is-success, #2e7d32); }
	.cmp-prod { border-color: var(--is-danger, #c62828); }
	@media (max-width: 1100px) {
		.cmp-row { grid-template-columns: 1fr; }
	}
</style>
