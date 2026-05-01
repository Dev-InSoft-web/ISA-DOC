<script lang="ts">
	import { onDestroy } from "svelte";
	import { FlexLayout, Text, Iconify } from "@ingenieria_insoft/ispsveltecomponents";
	import Chip from "../_comps/Chip.svelte";
	import TreeView from "../_comps/TreeView/TreeRowView.svelte";
	import type { ParsedTable } from "../../lib/tableSchema";
	import { COMMON_COLUMN_TYPES } from "../../lib/tableSchema";
	import { SqlTreeAdapter } from "./sql-tree/SqlTreeAdapter.svelte";
	import type { TSqlNodeUX } from "./sql-tree/TSqlNodeUX.svelte";

	export let table: ParsedTable;
	export let prefix: string = "";
	export let onChange: (t: ParsedTable) => void = () => {};

	function tableKey(t: ParsedTable): string { return `${t.fragmentId}::${t.originalName}`; }

	let lastKey = tableKey(table);
	let adapter: SqlTreeAdapter = createAdapter(table);

	function createAdapter(t: ParsedTable): SqlTreeAdapter {
		lastKey = tableKey(t);
		return new SqlTreeAdapter(t, (next) => onChange(next));
	}

	$: if (tableKey(table) !== lastKey) {
		adapter = createAdapter(table);
	}

	onDestroy(() => {
		// nothing to teardown explicitly; adapters are GC-friendly
	});

	$: baseName = prefix && table.name.startsWith(prefix) ? table.name.slice(prefix.length) : table.name;
	let baseNameDraft = baseName;
	$: baseNameDraft = baseName;
	let commentDraft = table.comment;
	$: commentDraft = table.comment;

	function commitBaseName(v: string): void {
		const p = prefix && table.name.startsWith(prefix) ? prefix : "";
		const next = (p + v).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
		if (next === table.name) return;
		table.name = next;
		onChange(table);
	}

	function commitComment(v: string): void {
		if (v === table.comment) return;
		table.comment = v;
		onChange(table);
	}

	function isPk(node: TSqlNodeUX): boolean {
		return !!node.primaryKey || table.compositePrimaryKey.includes(node.rowName);
	}

	function dataListId(): string {
		return `sql-tree-types-${table.fragmentId}-${table.originalName}`;
	}

	function autoSize(host: HTMLElement) {
		let raf = 0;
		const measure = () => {
			if (raf) cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const inner = host.querySelector<HTMLElement>(".isp-tree");
				if (!inner) return;
				const h = Math.max(inner.scrollHeight, 240);
				host.style.minHeight = `${h + 16}px`;
			});
		};
		const ro = new ResizeObserver(measure);
		const mo = new MutationObserver(measure);
		requestAnimationFrame(() => {
			const inner = host.querySelector<HTMLElement>(".isp-tree");
			if (inner) ro.observe(inner);
			mo.observe(host, { childList: true, subtree: true });
			measure();
		});
		return {
			destroy() {
				ro.disconnect();
				mo.disconnect();
				if (raf) cancelAnimationFrame(raf);
			},
		};
	}
</script>

<div class="sql-tree-card">
	<FlexLayout items="center">
		<div class="name-row">
			<span class="prefix">{prefix}</span>
			<input
				class="input-field name-input"
				type="text"
				bind:value={baseNameDraft}
				on:change={(e) => commitBaseName((e.currentTarget).value)}
			/>
		</div>
	</FlexLayout>

	<label class="field">
		<Text color="neutral"><small>Comentario (línea sobre la tabla)</small></Text>
		<input
			class="input-field"
			type="text"
			bind:value={commentDraft}
			on:change={(e) => commitComment((e.currentTarget).value)}
		/>
	</label>

	<datalist id={dataListId()}>
		{#each COMMON_COLUMN_TYPES as t}
			<option value={t}></option>
		{/each}
	</datalist>

	<div class="tree-host" use:autoSize>
		<TreeView
			Obj={adapter.obj}
			itdForm="edit"
			brapido={true}
			small={false}
			readonly={false}
			bdrag={true}
			showToolbar={true}
			CatalogoController={adapter.catalogoController}
			TreeController={adapter}
			objWorking={adapter.objWorking}
		>
			<svelte:fragment slot="row" let:node>
				{#if node.obj.kind === "section"}
					<FlexLayout items="center" style="flex:1; min-width:0; gap:0.4rem;">
						<Chip>{node.id}</Chip>
						<span class="badge badge-section">Sección</span>
						<Text style="font-weight:bold;" lines={1}>{node.obj.rowName || "(sin nombre)"}</Text>
					</FlexLayout>
				{:else}
					<FlexLayout items="center" justify="between" style="flex:1; min-width:0; gap:0.5rem;">
						<FlexLayout items="center" style="flex: 0 1 auto; min-width: 0; gap:0.4rem;">
							<Chip>{node.id}</Chip>
							<Text style="font-weight:600; min-width: 6rem;" lines={1}>{node.obj.rowName || "(columna)"}</Text>
							<Text color="neutral" lines={1}><code>{node.obj.colType || "—"}</code></Text>
							{#if node.obj.nullable === "NOT NULL"}
								<span class="tag tag-nn">NN</span>
							{/if}
							{#if isPk(node.obj)}
								<span class="tag tag-pk">PK</span>
							{/if}
						</FlexLayout>
					</FlexLayout>
				{/if}
			</svelte:fragment>

			<svelte:fragment slot="Frm" let:frmObj>
				{#if frmObj}
					{#if frmObj.kind === "section"}
						<div class="frm">
							<label class="field">
								<Text color="neutral"><small>Nombre de la sección</small></Text>
								<input
									class="input-field"
									type="text"
									bind:value={frmObj.rowName}
									on:input={(e) => { frmObj.rowName = (e.currentTarget).value.toUpperCase().replace(/[^A-Z0-9_ ]/g, "_"); }}
								/>
							</label>
						</div>
					{:else}
						<div class="frm">
							<label class="field">
								<Text color="neutral"><small>Nombre</small></Text>
								<input
									class="input-field"
									type="text"
									bind:value={frmObj.rowName}
									on:input={(e) => { frmObj.rowName = (e.currentTarget).value.toUpperCase().replace(/[^A-Z0-9_]/g, "_"); }}
								/>
							</label>
							<label class="field">
								<Text color="neutral"><small>Tipo</small></Text>
								<input
									class="input-field"
									type="text"
									list={dataListId()}
									bind:value={frmObj.colType}
									on:input={(e) => { frmObj.colType = (e.currentTarget).value.toUpperCase().replace(/\s+/g, ""); }}
								/>
							</label>
							<label class="field row">
								<input
									type="checkbox"
									checked={frmObj.nullable === "NOT NULL"}
									on:change={(e) => { frmObj.nullable = (e.currentTarget).checked ? "NOT NULL" : ""; }}
								/>
								<Text>NOT NULL</Text>
							</label>
							<label class="field">
								<Text color="neutral"><small>DEFAULT</small></Text>
								<input
									class="input-field"
									type="text"
									bind:value={frmObj.defaultValue}
								/>
							</label>
							<label class="field row">
								<input
									type="checkbox"
									checked={!!frmObj.primaryKey}
									on:change={(e) => { frmObj.primaryKey = (e.currentTarget).checked; }}
								/>
								<Text>PRIMARY KEY</Text>
							</label>
							<label class="field">
								<Text color="neutral"><small>Extra (IDENTITY, CHECK…)</small></Text>
								<input
									class="input-field"
									type="text"
									bind:value={frmObj.colExtra}
								/>
							</label>
						</div>
					{/if}
				{/if}
			</svelte:fragment>
		</TreeView>
	</div>
</div>

<style>
	.sql-tree-card { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem; }
	.tree-host {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 320px;
		border: 1px solid var(--is-b-color);
		border-radius: 0.25rem;
		background: var(--is-bg-primary);
		padding: 0.25rem;
		font-size: 0.85rem;
	}
	.tree-host :global(.trvwr-itm > summary) { padding-top: 0.1rem; padding-bottom: 0.1rem; }
	.name-row { display: inline-flex; align-items: center; gap: 0.25rem; }
	.prefix { color: var(--is-color); opacity: 0.7; font-family: monospace; }
	.input-field {
		padding: 0.2rem 0.4rem;
		border: 1px solid var(--is-b-color);
		border-radius: 0.25rem;
		font-family: inherit;
		font-size: 0.9rem;
		background: var(--is-bg-secondary);
		color: var(--is-color);
		outline: none;
	}
	.input-field:focus { border-color: var(--is-primary); }
	.name-input { font-weight: bold; min-width: 12rem; }
	.field { display: flex; flex-direction: column; gap: 0.15rem; }
	.field.row { flex-direction: row; align-items: center; gap: 0.5rem; }
	.frm { display: flex; flex-direction: column; gap: 0.6rem; padding: 1rem; }
	.tag {
		padding: 0 0.35rem;
		border-radius: 0.2rem;
		font-size: 0.7rem;
		font-weight: bold;
		line-height: 1.4;
	}
	.tag-nn { background: color-mix(in srgb, var(--is-info) 25%, transparent); color: var(--is-info); }
	.tag-pk { background: color-mix(in srgb, var(--is-success) 25%, transparent); color: var(--is-success); }
	.badge {
		padding: 0.1rem 0.4rem;
		border-radius: 0.2rem;
		font-size: 0.75rem;
		font-weight: bold;
	}
	.badge-section { background: color-mix(in srgb, var(--is-warning) 25%, transparent); color: var(--is-warning); }
</style>
