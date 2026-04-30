<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { BlockLayout, Button, Card, FlexLayout, H2, H4, Iconify, Text, Toaster, toastError, toastSuccess } from "@ingenieria_insoft/ispsveltecomponents";
	import {
		fragmentsStore,
		refreshFragments,
		setFragmentsAfterSave,
		startFragmentsSocket,
		type SqlFragment,
	} from "../../lib/fragmentsStore.ts";
	import {
		emitDropTable,
		emitTable,
		emitTablesAsBody,
		parseTableFragment,
		type ParsedTable,
	} from "../../lib/tableSchema.ts";
	import { generateResourcesFromTables } from "../../lib/codeGen/autogen.ts";
	import { genClient, genModelo, genServer } from "../../lib/codeGen/generators.ts";
	import SqlTreeEditor from "../editors/SqlTreeEditor.svelte";
	import CodeViewer from "../viewers/CodeViewer.svelte";
	import CodeModal from "../viewers/CodeModal.svelte";
	import TreeView from "../_comps/TreeView/TreeRowView.svelte";
	import { TablesBrowserAdapter, type TablesBrowserState } from "./tables-browser/TablesBrowserAdapter.svelte";

	let fragments: SqlFragment[] = [];
	let tables: ParsedTable[] = [];
	let loading = true;
	let saving = false;
	let dirty = false;
	let selectedKey: string | null = null;
	let prodTsMap: Record<string, any[]> = {};

	let modalShow = false;
	let modalTitle = "";
	let modalValue = "";
	let modalLanguage: "sql" | "ts" = "sql";
	let modalCompare: string | null = null;
	let modalCompareLabel = "Prod";

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

	const unsub = fragmentsStore.subscribe((s) => {
		loading = !s.loaded;
		if (dirty) return;
		rebuildFromFragments(s.fragments);
	});

	function rebuildFromFragments(list: SqlFragment[]): void {
		fragments = list;
		const all: ParsedTable[] = [];
		for (const f of list) {
			if (f.kind !== "table") continue;
			const ts = parseTableFragment(f.id, f.name, f.body);
			for (const t of ts) all.push(t);
		}
		tables = all;
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
			dirty = false;
			await refreshFragments();
		} catch (err) {
			toastError(`Error cargando tablas: ${err instanceof Error ? err.message : String(err)}`);
		}
	}

	async function save(silent = false): Promise<void> {
		if (saving) return;
		saving = true;
		try {
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
		startFragmentsSocket();
		void refreshFragments();
		void loadProdTs();
	});

	onDestroy(() => unsub());
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
				{#if saving}
					<FlexLayout items="center"><Iconify icon="mdi:loading" /><Text color="neutral"><small>Guardando…</small></Text></FlexLayout>
				{/if}
			</FlexLayout>
		</FlexLayout>
	</Card>

	<div class="layout">
		<BlockLayout cscroll class="tree-pane">
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
						showToolbar={false}
						CatalogoController={adapterAny.catalogoController}
						TreeController={adapter}
						objWorking={adapterAny.objWorking}
					>
						<svelte:fragment slot="row" let:node>
							{#if node.obj.kind === "prefix"}
								<span class="tree-row">
									<Iconify icon={node.obj.prefix ? "mdi:folder-outline" : "mdi:folder-off-outline"} />
									<strong class="tree-row-name">{node.obj.rowName}</strong>
									<span class="tree-row-meta">{node.obj.colCount}</span>
								</span>
							{:else}
								<span class="tree-row">
									<Iconify icon="mdi:table" />
									<span class="tree-row-name">{node.obj.rowName.startsWith(node.obj.prefix) ? node.obj.rowName.slice(node.obj.prefix.length) : node.obj.rowName}</span>
									<span class="tree-row-meta">{node.obj.colCount}</span>
								</span>
							{/if}
						</svelte:fragment>
					</TreeView>
				</div>
			{/if}
		</BlockLayout>

		<BlockLayout cscroll class="form-pane">
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
						<FlexLayout items="center">
							<Iconify icon="mdi:table" />
							<H4>{t.name}</H4>
						</FlexLayout>
						<SqlTreeEditor table={t} prefix={detectPrefix(t.name)} onChange={(nt) => onTableChange(idx, nt)} />
					</Card>
				{/key}
			{/if}
		</BlockLayout>

		<BlockLayout cscroll class="code-pane">
			{#if selected}
				{@const t = selected.table}
				{@const cfg = resByTable.get(t.name.toUpperCase())}
				{@const prodFrags = prodTsMap[t.name.toUpperCase()] ?? []}
				{@const prodPojo = prodFrags.filter((p: any) => p.role === "pojo")}
				{@const prodServer = prodFrags.filter((p: any) => p.role === "server")}
				{@const prodClient = prodFrags.filter((p: any) => p.role === "client")}

				{#key tableKey(t)}
					<div class="code-card">
						<FlexLayout items="center" justify="between">
							<FlexLayout items="center">
								<Iconify icon="mdi:database" />
								<Text color="neutral"><small>SQL · DROP + CREATE</small></Text>
							</FlexLayout>
							<Button variant="outlined" style="width: fit-content;" onClick={() => openCodeModal(`${t.name} · SQL`, `${emitDropTable(t)}\n\n${emitTable(t)}`, "sql")}>
								<Iconify icon="mdi:open-in-new" /> Abrir
							</Button>
						</FlexLayout>
						<CodeViewer value={`${emitDropTable(t)}\n\n${emitTable(t)}`} lang="sql" height="180px" />
					</div>

					{#if cfg}
						{@const modelCode = genModelo(cfg, autogen.resources)}
						{@const serverCode = genServer(cfg, autogen.resources)}
						{@const clientCode = genClient(cfg)}

						<div class="code-card">
							<FlexLayout items="center" justify="between">
								<FlexLayout items="center"><Iconify icon="mdi:cube-outline" /><Text color="neutral"><small>Modelo</small></Text></FlexLayout>
								<Button variant="outlined" style="width:fit-content;" onClick={() => openCodeModal(`${cfg.className} · Modelo`, modelCode, "ts", prodPojo[0]?.body ?? "", prodPojo[0] ? `Prod · ${prodPojo[0].sourceFile}` : "Prod — sin fragmento")}>
									<Iconify icon="mdi:open-in-new" /> Abrir
								</Button>
							</FlexLayout>
							<CodeViewer value={modelCode} lang="ts" height="180px" />
						</div>

						<div class="code-card">
							<FlexLayout items="center" justify="between">
								<FlexLayout items="center"><Iconify icon="mdi:server" /><Text color="neutral"><small>Server</small></Text></FlexLayout>
								<Button variant="outlined" style="width:fit-content;" onClick={() => openCodeModal(`${cfg.className} · Server`, serverCode, "ts", prodServer[0]?.body ?? "", prodServer[0] ? `Prod · ${prodServer[0].sourceFile}` : "Prod — sin fragmento")}>
									<Iconify icon="mdi:open-in-new" /> Abrir
								</Button>
							</FlexLayout>
							<CodeViewer value={serverCode} lang="ts" height="180px" />
						</div>

						<div class="code-card">
							<FlexLayout items="center" justify="between">
								<FlexLayout items="center"><Iconify icon="mdi:monitor" /><Text color="neutral"><small>Client</small></Text></FlexLayout>
								<Button variant="outlined" style="width:fit-content;" onClick={() => openCodeModal(`${cfg.className} · Client`, clientCode, "ts", prodClient[0]?.body ?? "", prodClient[0] ? `Prod · ${prodClient[0].sourceFile}` : "Prod — sin fragmento")}>
									<Iconify icon="mdi:open-in-new" /> Abrir
								</Button>
							</FlexLayout>
							<CodeViewer value={clientCode} lang="ts" height="180px" />
						</div>
					{/if}
				{/key}
			{/if}
		</BlockLayout>
	</div>
</section>

<CodeModal bind:bshow={modalShow} title={modalTitle} value={modalValue} language={modalLanguage} compareValue={modalCompare} compareLabel={modalCompareLabel} valueLabel="Local" />

<style>
	.browser {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-height: 0;
	}
	.layout {
		display: grid;
		grid-template-columns: minmax(140px, 12rem) minmax(0, 1.4fr) minmax(0, 1fr);
		gap: 0.5rem;
		min-height: 0;
		height: calc(100vh - 14rem);
	}
	:global(.tree-pane) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		border: 1px solid var(--is-b-color);
		border-radius: 0.25rem;
		background: var(--is-bg-primary);
		overflow: auto;
		min-height: 0;
		height: 100%;
	}
	.tables-tree-host {
		display: flex;
		flex-direction: column;
		min-height: 280px;
		font-size: 0.6em;
	}
	.tables-tree-host :global(.trvwr-itm-children) {
		padding-inline-start: 0.6rem !important;
	}
	.tree-row {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		flex: 1;
		min-width: 0;
		white-space: nowrap;
	}
	.tree-row-name {
		white-space: nowrap;
		overflow: visible;
	}
	.tree-row-meta {
		color: var(--is-text-neutral, #888);
		font-size: 0.75rem;
		margin-left: auto;
		padding-left: 0.5rem;
	}
	:global(.form-pane), :global(.code-pane) {
		min-width: 0;
		min-height: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		overflow: auto;
		height: 100%;
	}
	.code-card {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	@media (max-width: 900px) {
		.layout { grid-template-columns: 1fr; max-height: none; }
		:global(.tree-pane), :global(.form-pane), :global(.code-pane) { height: auto; max-height: none; }
	}
</style>
