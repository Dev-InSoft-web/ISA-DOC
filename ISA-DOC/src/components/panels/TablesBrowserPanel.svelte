<script lang="ts">
	import { onMount } from "svelte";
	import { ActionDrawer, Button, ButtonIconify, Card, FlexLayout, H2, H4, Iconify, Modal, TabItem, Tabs, Text, Toaster, toastError, toastSuccess } from "@ingenieria_insoft/ispsveltecomponents";
	import {
		emitDropTable,
		emitTable,
		type ParsedTable,
	} from "../../lib/tableSchema.ts";
	import { generateResourcesFromTables } from "../../lib/codeGen/autogen.ts";
	import { genClient, genModelo, genServer } from "../../lib/codeGen/generators.ts";
	import SqlTreeEditor from "../editors/SqlTreeEditor.svelte";
	import CodeViewer from "../viewers/CodeViewer.svelte";
	import CodeModal from "../viewers/CodeModal.svelte";
	import TreeView from "../_comps/TreeView/TreeRowView.svelte";
	import { TablesBrowserAdapter, type TablesBrowserState } from "./tables-browser/TablesBrowserAdapter.svelte";

	let tables: ParsedTable[] = [];
	let loading = true;
	let saving = false;
	let generating = false;
	let dirty = false;
	let selectedKey: string | null = null;
	let prodTsMap: Record<string, any[]> = {};

	let modalShow = false;
	let modalTitle = "";
	let modalValue = "";
	let modalLanguage: "sql" | "ts" = "sql";
	let modalCompare: string | null = null;
	let modalCompareLabel = "Prod";

	let runUnlocked: Record<string, boolean> = {};
	let runBusy: Record<string, boolean> = {};

	let bshowSettings: boolean = false;
	let bshowTreeModal: boolean = false;
	let syncingRegions: boolean = false;
	let filterText: string = "";

	type Category = "principales" | "pivote" | "historial" | "otras";
	const CATEGORIES: { id: Category; label: string; icon: string }[] = [
		{ id: "principales", label: "Tablas principales", icon: "mdi:table" },
		{ id: "pivote", label: "Tablas pivote / detalle", icon: "mdi:table-multiple" },
		{ id: "historial", label: "Tablas de historial", icon: "mdi:history" },
		{ id: "otras", label: "Otras", icon: "mdi:dots-horizontal" },
	];

	function inferCategory(fragmentName: string): Category {
		const n = (fragmentName ?? "").toUpperCase();
		if (/(HISTORIAL|AUDITOR)/.test(n)) return "historial";
		if (/(PIVOTE|DETALLES|PIVOT)/.test(n)) return "pivote";
		if (/(PRINCIPAL|TABLAS)/.test(n)) return "principales";
		return "otras";
	}

	function normalizePrefix(raw: string): string {
		const v = (raw ?? "").trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");
		if (!v) return "";
		return v.endsWith("_") ? v : v + "_";
	}

	function openSettings(): void { bshowSettings = true; }
	function closeSettings(): void { bshowSettings = false; }
	function openTreeModal(): void { bshowTreeModal = true; }
	function closeTreeModal(): void { bshowTreeModal = false; }

	function renamePrefix(oldPrefix: string, rawNext: string): void {
		const next = normalizePrefix(rawNext);
		if (next === oldPrefix) return;
		const exists = tables.some((t) => detectPrefix(t.name) === next);
		if (exists && next !== "") {
			toastError(`Ya existe el prefijo "${next}".`);
			return;
		}
		const nextTables = tables.map((t) => {
			if (detectPrefix(t.name) !== oldPrefix) return t;
			return { ...t, name: next + t.name.slice(oldPrefix.length) };
		});
		tables = nextTables;
		adapter.setTables(tables);
		dirty = true;
		void save(true);
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

	function toggleRunLock(key: string): void {
		runUnlocked = { ...runUnlocked, [key]: !runUnlocked[key] };
	}

	async function runCode(key: string, code: string, language: "sql" | "ts"): Promise<void> {
		if (!runUnlocked[key] || runBusy[key]) return;
		runBusy = { ...runBusy, [key]: true };
		try {
			const r = await fetch("/api/run", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ key, code, language }),
			});
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			toastSuccess(`Ejecutado: ${key}`);
		} catch (err) {
			toastError(`Error ejecutando ${key}: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			runBusy = { ...runBusy, [key]: false };
			runUnlocked = { ...runUnlocked, [key]: false };
		}
	}

	const adapter = new TablesBrowserAdapter([], onAdapterChange);
	adapter.onTableSelect = (key) => { selectedKey = key; };
	const adapterAny = adapter as any;

	function tableKey(t: ParsedTable): string {
		return `${t.fragmentId}::${t.originalName}`;
	}

	function detectPrefix(name: string): string {
		const m = /^([A-Z][A-Z0-9]*_)/.exec(name);
		return m ? m[1] : "";
	}

	function setTables(list: ParsedTable[]): void {
		tables = list;
		adapter.setTables(tables);
		if (selectedKey && !tables.some((t) => tableKey(t) === selectedKey)) selectedKey = null;
		if (!selectedKey && tables[0]) selectedKey = tableKey(tables[0]);
	}

	function onAdapterChange(state: TablesBrowserState): void {
		if (state.prefixRenames.length === 0) return;
		tables = state.tables;
		dirty = true;
		void save(true);
	}

	$: selected = (() => {
		if (!selectedKey) return null;
		const idx = tables.findIndex((t) => tableKey(t) === selectedKey);
		if (idx < 0) return null;
		return { table: tables[idx], index: idx };
	})();

	$: autogen = generateResourcesFromTables(tables);
	$: resByTable = new Map(autogen.resources.map((r) => [r.tableName.toUpperCase(), r]));

	function onTableChange(idx: number, t: ParsedTable): void {
		tables[idx] = { ...t };
		tables = tables;
		adapter.setTables(tables);
		dirty = true;
		void save(true);
	}

	async function load(): Promise<void> {
		try {
			loading = true;
			dirty = false;
			const r = await fetch("/api/tables");
			const data = (await r.json()) as { ok?: boolean; tables?: ParsedTable[]; error?: string };
			if (!r.ok || !data.ok || !data.tables) throw new Error(data.error ?? `HTTP ${r.status}`);
			setTables(data.tables);
		} catch (err) {
			toastError(`Error cargando tablas: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			loading = false;
		}
	}

	async function save(silent = false): Promise<void> {
		if (saving) return;
		saving = true;
		try {
			const r = await fetch("/api/tables", {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ tables }),
			});
			const data = (await r.json()) as { ok?: boolean; error?: string };
			if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
			if (!silent) toastSuccess(`Tablas guardadas (${tables.length})`);
			dirty = false;
		} catch (err) {
			toastError(`Error guardando: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			saving = false;
		}
	}

	async function generateSql(): Promise<void> {
		if (generating) return;
		generating = true;
		try {
			if (dirty) await save(true);
			const r = await fetch("/api/sql/generate", { method: "POST" });
			const data = (await r.json()) as { ok?: boolean; full?: string; count?: number; error?: string };
			if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
			toastSuccess(`SQL regenerado (${data.count ?? tables.length} tablas)`);
			if (data.full) openCodeModal("init_capacitacion.sql · Resumen generado", data.full, "sql");
		} catch (err) {
			toastError(`Error generando SQL: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			generating = false;
		}
	}

	function openCodeModal(title: string, value: string, language: "sql" | "ts" = "ts", compareValue: string | null = null, compareLabel: string = "Prod"): void {
		modalTitle = title;
		modalValue = value;
		modalLanguage = language;
		modalCompare = compareValue;
		modalCompareLabel = compareLabel;
		modalShow = true;
	}

	async function loadProdTs(): Promise<void> {
		try {
			const res = await fetch("/api/ts/fragments");
			if (!res.ok) return;
			const data = await res.json();
			if (data && data.ok && data.map) prodTsMap = data.map as Record<string, any[]>;
		} catch { /* ignore */ }
	}

	onMount(() => {
		void load();
		void loadProdTs();
	});
</script>

<Toaster />

<section class="browser">
	<Card>
		<FlexLayout items="center" justify="between">
			<div>
				<H2>Editor visual de tablas · v2</H2>
				<Text color="neutral"><small>Árbol con prefijos como carpetas (visual) y tablas como nodos. Los cambios se guardan automáticamente.</small></Text>
			</div>
			<FlexLayout items="center">
				<Button variant="outlined" style="width: fit-content;" onClick={load}>
					<Iconify icon="mdi:refresh" /> Recargar
				</Button>
				<Button variant="solid" color="primary" style="width: fit-content;" disabled={generating} onClick={generateSql}>
					<Iconify icon="mdi:database-export" /> Generar resumen SQL
				</Button>
				{#if saving}
					<FlexLayout items="center"><Iconify icon="mdi:loading" /><Text color="neutral"><small>Guardando…</small></Text></FlexLayout>
				{/if}
			</FlexLayout>
		</FlexLayout>
	</Card>

	<div class="layout">
		<div class="tree-pane">
			<div class="pane-scroll">
			{#if loading}
				<Text color="neutral">Cargando…</Text>
			{:else if tables.length === 0}
				<Text color="neutral">Sin tablas.</Text>
			{:else}
				<div class="tables-tree-host">
					<TreeView
						Obj={adapter.obj}
						itdForm="edit"
						brapido={true}
						small={true}
						readonly={false}
						bdrag={true}
						showToolbar={true}
						CatalogoController={adapterAny.catalogoController}
						TreeController={adapter}
						objWorking={adapterAny.objWorking}
					>
						<svelte:fragment slot="row" let:node>
							{#if node.obj.kind === "prefix"}
								<span class="tree-row">
									<strong class="tree-row-name">{node.obj.rowName}</strong>
									<span class="tree-row-meta">{node.obj.colCount}</span>
								</span>
							{:else}
								<span class="tree-row">
									<span class="tree-row-name">{node.obj.rowName.startsWith(node.obj.prefix) ? node.obj.rowName.slice(node.obj.prefix.length) : node.obj.rowName}</span>
									<span class="tree-row-meta">{node.obj.colCount}</span>
								</span>
							{/if}
						</svelte:fragment>
					</TreeView>
				</div>
			{/if}
			</div>
		</div>

		<div class="form-pane">
			<div class="pane-scroll">
			{#if !selected}
				<Card variant="flat"><Text color="neutral">Selecciona una tabla del árbol.</Text></Card>
			{:else}
				{@const t = selected.table}
				{@const idx = selected.index}
				{@const cfg = resByTable.get(t.name.toUpperCase())}
				{@const prodFrags = prodTsMap[t.name.toUpperCase()] ?? []}
				{@const prodPojo = prodFrags.filter((p: any) => p.role === "pojo")}
				{@const prodServer = prodFrags.filter((p: any) => p.role === "server")}
				{@const prodClient = prodFrags.filter((p: any) => p.role === "client")}

				{#key tableKey(t)}
					<Card>
						<FlexLayout items="center" justify="between">
							<FlexLayout items="center">
								<Iconify icon="mdi:table" />
								<H4>{t.name}</H4>
							</FlexLayout>
							<FlexLayout items="center">
								<ButtonIconify icon="mdi:cog-outline" title="Personalizar entidad" on:click={openSettings} />
								<ButtonIconify icon="mdi:eye-outline" title="Editor visual completo" on:click={openTreeModal} />
							</FlexLayout>
						</FlexLayout>
						<SqlTreeEditor table={t} prefix={detectPrefix(t.name)} onChange={(nt) => onTableChange(idx, nt)} />
					</Card>
				{/key}
			{/if}
			</div>
		</div>

		<div class="code-pane">
			<div class="pane-scroll">
			{#if selected}
				{@const t = selected.table}
				{@const cfg = resByTable.get(t.name.toUpperCase())}
				{@const prodFrags = prodTsMap[t.name.toUpperCase()] ?? []}
				{@const prodPojo = prodFrags.filter((p: any) => p.role === "pojo")}
				{@const prodServer = prodFrags.filter((p: any) => p.role === "server")}
				{@const prodClient = prodFrags.filter((p: any) => p.role === "client")}

				{#key tableKey(t)}
					{@const sqlCode = `${emitDropTable(t)}\n\n${emitTable(t)}`}
					{@const modelCode = cfg ? genModelo(cfg, autogen.resources) : ""}
					{@const serverCode = cfg ? genServer(cfg, autogen.resources) : ""}
					{@const clientCode = cfg ? genClient(cfg) : ""}
					<Card>
						<Tabs class="code-tabs" contentClass="code-tabs-content">
						<TabItem open title="SQL">
							<div class="code-card">
								<FlexLayout items="center" justify="between">
									<FlexLayout items="center"><Iconify icon="mdi:database" /><Text color="neutral"><small>DROP + CREATE</small></Text></FlexLayout>
									<FlexLayout items="center">
										<div class="run-group">
										<ButtonIconify icon={runUnlocked[`${t.name}::sql`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${t.name}::sql`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${t.name}::sql`)} />
										<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${t.name}::sql`] || runBusy[`${t.name}::sql`]} on:click={() => runCode(`${t.name}::sql`, sqlCode, "sql")} />
									</div>
										<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${t.name} · SQL`, sqlCode, "sql")} />
									</FlexLayout>
								</FlexLayout>
								<CodeViewer value={sqlCode} lang="sql" height="100%" />
							</div>
						</TabItem>
						{#if cfg}
							<TabItem title="Modelo">
								<div class="code-card">
									<FlexLayout items="center" justify="between">
										<FlexLayout items="center"><Iconify icon="mdi:cube-outline" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
										<FlexLayout items="center">
											<div class="run-group">
											<ButtonIconify icon={runUnlocked[`${cfg.className}::model`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::model`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::model`)} />
											<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::model`] || runBusy[`${cfg.className}::model`]} on:click={() => runCode(`${cfg.className}::model`, modelCode, "ts")} />
										</div>
											<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Modelo`, modelCode, "ts", prodPojo[0]?.body ?? "", prodPojo[0] ? `Prod · ${prodPojo[0].sourceFile}` : "Prod — sin fragmento")} />
										</FlexLayout>
									</FlexLayout>
									<CodeViewer value={modelCode} lang="ts" height="100%" />
								</div>
							</TabItem>
							<TabItem title="Server">
								<div class="code-card">
									<FlexLayout items="center" justify="between">
										<FlexLayout items="center"><Iconify icon="mdi:server" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
										<FlexLayout items="center">
											<div class="run-group">
											<ButtonIconify icon={runUnlocked[`${cfg.className}::server`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::server`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::server`)} />
											<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::server`] || runBusy[`${cfg.className}::server`]} on:click={() => runCode(`${cfg.className}::server`, serverCode, "ts")} />
										</div>
											<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Server`, serverCode, "ts", prodServer[0]?.body ?? "", prodServer[0] ? `Prod · ${prodServer[0].sourceFile}` : "Prod — sin fragmento")} />
										</FlexLayout>
									</FlexLayout>
									<CodeViewer value={serverCode} lang="ts" height="100%" />
								</div>
							</TabItem>
							<TabItem title="Client">
								<div class="code-card">
									<FlexLayout items="center" justify="between">
										<FlexLayout items="center"><Iconify icon="mdi:monitor" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
										<FlexLayout items="center">
											<div class="run-group">
											<ButtonIconify icon={runUnlocked[`${cfg.className}::client`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::client`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::client`)} />
											<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::client`] || runBusy[`${cfg.className}::client`]} on:click={() => runCode(`${cfg.className}::client`, clientCode, "ts")} />
										</div>
											<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Client`, clientCode, "ts", prodClient[0]?.body ?? "", prodClient[0] ? `Prod · ${prodClient[0].sourceFile}` : "Prod — sin fragmento")} />
										</FlexLayout>
									</FlexLayout>
									<CodeViewer value={clientCode} lang="ts" height="100%" />
								</div>
							</TabItem>
						{/if}
						</Tabs>
					</Card>
				{/key}
			{/if}
			</div>
		</div>
	</div>
</section>

<CodeModal bind:bshow={modalShow} title={modalTitle} value={modalValue} language={modalLanguage} compareValue={modalCompare} compareLabel={modalCompareLabel} valueLabel="Local" />

<ActionDrawer bind:bshow={bshowSettings} onclose={closeSettings} style="width: 720px; max-width: 95vw;">
	{#if !selected}
		<Card variant="flat"><Text color="neutral">Selecciona una tabla.</Text></Card>
	{:else}
		{@const t = selected.table}
		{@const currentPrefix = detectPrefix(t.name)}
		{@const cfg = resByTable.get(t.name.toUpperCase())}
		{@const prodFrags = prodTsMap[t.name.toUpperCase()] ?? []}
		{@const prodPojo = prodFrags.filter((p: any) => p.role === "pojo")}
		{@const prodServer = prodFrags.filter((p: any) => p.role === "server")}
		{@const prodClient = prodFrags.filter((p: any) => p.role === "client")}
		<Card>
			<FlexLayout items="center">
				<Iconify icon="mdi:cog-outline" />
				<H4>Personalizar · {t.name}</H4>
			</FlexLayout>
		</Card>
		<Tabs>
			<TabItem open title="Filtro y prefijo">
				<div class="drawer-section">
					<label class="field">
						<Text color="neutral"><small>Filtrar tabla / columna</small></Text>
						<input class="input-field" type="text" placeholder="Buscar…" bind:value={filterText} />
					</label>
					<label class="field">
						<Text color="neutral"><small>Prefijo actual: <code>{currentPrefix || "(vacío)"}</code></small></Text>
						<input class="input-field" type="text" value={currentPrefix} placeholder="(sin prefijo)" on:change={(e) => renamePrefix(currentPrefix, (e.currentTarget as HTMLInputElement).value)} />
					</label>
				</div>
			</TabItem>
			<TabItem title="Categorización">
				<div class="drawer-section">
					{#if true}
						{@const cat = inferCategory(t.fragmentName)}
						{@const meta = CATEGORIES.find((c) => c.id === cat)}
						<FlexLayout items="center">
							<Iconify icon={meta?.icon ?? "mdi:tag-outline"} />
							<Text><strong>{meta?.label ?? cat}</strong></Text>
						</FlexLayout>
						<Text color="neutral"><small>Inferida desde el nombre del fragmento <code>{t.fragmentName}</code>.</small></Text>
					{/if}
				</div>
			</TabItem>
			<TabItem title="Acciones">
				<div class="drawer-section">
					<FlexLayout items="center">
						<Button variant="outlined" style="width: fit-content;" onClick={load}>
							<Iconify icon="mdi:refresh" /> Recargar
						</Button>
						<Button variant="outlined" style="width: fit-content;" disabled={syncingRegions} onClick={syncRegions}>
							<Iconify icon={syncingRegions ? "mdi:loading" : "mdi:sync"} /> Sincronizar regiones
						</Button>
						<Button color="primary" style="width: fit-content;" disabled={!dirty || saving} onClick={() => save()}>
							<Iconify icon={saving ? "mdi:loading" : "mdi:content-save"} /> Guardar
						</Button>
					</FlexLayout>
				</div>
			</TabItem>
			<TabItem title="Comparación prod ISP">
				<div class="drawer-section">
					{#if !cfg}
						<Text color="neutral">Sin configuración generada.</Text>
					{:else}
						{#each [{ role: "pojo", label: "Modelo", frags: prodPojo }, { role: "server", label: "Server", frags: prodServer }, { role: "client", label: "Client", frags: prodClient }] as block}
							<FlexLayout items="center" justify="between">
								<FlexLayout items="center">
									<Iconify icon="mdi:source-branch" />
									<Text color="neutral"><small>{block.label} · Prod ISP {block.frags[0] ? `· ${block.frags[0].sourceFile}` : "— sin fragmento"}</small></Text>
								</FlexLayout>
								{#if block.frags[0]}
									<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${t.name} · Prod ${block.label}`, block.frags[0].body, "ts")} />
								{/if}
							</FlexLayout>
							<CodeViewer value={block.frags[0]?.body ?? ""} lang="ts" height="220px" />
						{/each}
					{/if}
				</div>
			</TabItem>
		</Tabs>
	{/if}
</ActionDrawer>

<Modal bind:bshow={bshowTreeModal} onClose={closeTreeModal} style="width: 96dvw; height: 96dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center">
			<Iconify icon="mdi:file-tree-outline" />
			<Text><strong>Editor visual · {selected ? selected.table.name : ""}</strong></Text>
		</FlexLayout>
	</svelte:fragment>
	<div class="tree-modal-body">
		{#if !selected}
			<Text color="neutral">Selecciona una tabla.</Text>
		{:else}
			{@const t = selected.table}
			{@const idx = selected.index}
			{#key tableKey(t)}
				<SqlTreeEditor table={t} prefix={detectPrefix(t.name)} onChange={(nt) => onTableChange(idx, nt)} />
			{/key}
		{/if}
	</div>
</Modal>

<style>
	.browser {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-height: 0;
	}
	.layout {
		display: grid;
		grid-template-columns: minmax(168px, 14.4rem) minmax(0, 0.756fr) minmax(0, 1fr);
		gap: 0.5rem;
		height: calc(100dvh - 13rem);
		align-items: stretch;
	}
	:global(.tree-pane),
	:global(.form-pane),
	:global(.code-pane) {
		width: 100%;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.pane-scroll {
		flex: 1 1 auto;
		min-height: 0;
		width: 100%;
		overflow: auto;
		display: block;
	}
	:global(.code-pane) > .pane-scroll {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	:global(.tree-pane) {
		padding: 0.5rem;
		border: 1px solid var(--is-b-color);
		border-radius: 0.25rem;
		background: var(--is-bg-primary);
		overflow: hidden;
	}
	.tables-tree-host {
		display: block;
		width: 100%;
		font-size: 0.8em;
	}
	.tree-row {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
	}
	.tree-row-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 0;
		flex: 1;
	}
	.tree-row-meta {
		color: var(--is-text-neutral, #888);
		font-size: 0.75rem;
		margin-left: auto;
		padding-left: 0.5rem;
	}
	:global(.code-pane) > :global(.pane-scroll) > :global(.card-root) {
		width: 100%;
		min-width: 0;
		min-height: 0;
		flex: 1 1 auto;
		display: flex !important;
		flex-direction: column;
	}
	:global(.code-pane) > :global(.pane-scroll) {
		overflow: hidden;
	}
	:global(.code-pane .code-tabs),
	:global(.code-pane .code-tabs-content),
	:global(.form-pane .card-root > *) {
		width: 100%;
		min-width: 0;
	}
	:global(.form-pane), :global(.code-pane) {
		min-width: 0;
		min-height: 0;
	}
	:global(.code-pane) {
		padding: 1rem;
		gap: 1rem;
	}
	:global(.tree-pane .fc-panel),
	:global(.tables-tree-host .fc-panel) {
		zoom: 0.8;
		transform-origin: top right;
	}
	:global(body) {
		overflow: hidden;
	}
	.code-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		min-height: 0;
		flex: 1 1 auto;
	}
	.run-group {
		display: inline-flex;
		align-items: center;
		gap: 0.15rem;
		border: 1px solid var(--is-b-color);
		border-radius: 999px;
		padding: 0.1rem 0.25rem;
	}
	.code-card :global(.cm-wrap) {
		display: block;
		min-height: 0;
		flex: 1 1 auto;
	}
	:global(.code-pane .tabs-content) {
		flex: 1 1 auto;
		min-height: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	:global(.code-pane .tabs-content) > :global(.tab-item) {
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 900px) {
		.layout { grid-template-columns: 1fr; max-height: none; }
		:global(.tree-pane), :global(.form-pane), :global(.code-pane) { height: auto; max-height: none; }
	}
	.drawer-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.input-field {
		background: var(--is-bg-secondary);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		padding: 0.25rem 0.5rem;
		font-size: 0.85rem;
		color: var(--is-color);
		outline: none;
	}
	.input-field:focus {
		border-color: var(--is-primary);
	}
	.tree-modal-body {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
		height: 100%;
		overflow: auto;
	}
</style>
