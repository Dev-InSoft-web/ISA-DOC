<script lang="ts">
	import { onDestroy } from "svelte";
	import { FlexLayout, Text } from "@ingenieria_insoft/ispsveltecomponents";
	import TreeView from "../_comps/TreeView/TreeRowView.svelte";
	import type { ParsedTable } from "../../lib/tableSchema";
	import { COMMON_COLUMN_TYPES } from "../../lib/tableSchema";
	import { SqlTreeAdapter } from "./sql-tree/SqlTreeAdapter.svelte";
	import type { TSqlNodeUX } from "./sql-tree/TSqlNodeUX.svelte";

	export let table: ParsedTable;
	export let prefix: string = "";
	export let onChange: (t: ParsedTable) => void = () => {};

	let lastTableRef: ParsedTable | null = null;
	let adapter: SqlTreeAdapter = createAdapter(table);

	function createAdapter(t: ParsedTable): SqlTreeAdapter {
		lastTableRef = t;
		return new SqlTreeAdapter(t, (next) => onChange(next));
	}

	$: if (table !== lastTableRef) {
		adapter = createAdapter(table);
	}

	onDestroy(() => {
		// nothing to teardown explicitly; adapters are GC-friendly
	});

	$: baseName = prefix && table.name.startsWith(prefix) ? table.name.slice(prefix.length) : table.name;

	function setBaseName(v: string): void {
		const p = prefix && table.name.startsWith(prefix) ? prefix : "";
		table.name = (p + v).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
		onChange(table);
	}

	function setComment(v: string): void {
		table.comment = v;
		onChange(table);
	}

	function patchNode(node: TSqlNodeUX, patch: Partial<TSqlNodeUX>): void {
		adapter.commitInlineEdit(node, patch);
	}

	function togglePk(node: TSqlNodeUX, checked: boolean): void {
		const composite = table.compositePrimaryKey;
		if (composite.length > 0) {
			const set = new Set(composite);
			if (checked) set.add(node.rowName); else set.delete(node.rowName);
			table.compositePrimaryKey = [...set];
			onChange(table);
		} else {
			patchNode(node, { primaryKey: checked });
		}
	}

	function isPk(node: TSqlNodeUX): boolean {
		return !!node.primaryKey || table.compositePrimaryKey.includes(node.rowName);
	}

	function dataListId(): string {
		return `sql-tree-types-${table.fragmentId}-${table.originalName}`;
	}
</script>

<div class="sql-tree-card">
	<FlexLayout items="center">
		<div class="name-row">
			<span class="prefix">{prefix}</span>
			<input
				class="input-field name-input"
				type="text"
				value={baseName}
				on:input={(e) => setBaseName((e.currentTarget).value)}
			/>
		</div>
	</FlexLayout>

	<label class="field">
		<Text color="neutral"><small>Comentario (línea sobre la tabla)</small></Text>
		<input
			class="input-field"
			type="text"
			value={table.comment}
			on:input={(e) => setComment((e.currentTarget).value)}
		/>
	</label>

	<datalist id={dataListId()}>
		{#each COMMON_COLUMN_TYPES as t}
			<option value={t}></option>
		{/each}
	</datalist>

	<TreeView
		Obj={adapter.obj}
		itdForm="edit"
		brapido={true}
		small={false}
		readonly={false}
		bdrag={true}
		bAllowed={{ Crear: true, Modificar: true, Eliminar: true, Visualizar: true }}
		showToolbar={true}
		CatalogoController={adapter.catalogoController}
		TreeController={adapter}
		objWorking={adapter.objWorking}
	>
		<svelte:fragment slot="row" let:node>
			{#if node.obj.kind === "section"}
				<FlexLayout items="center" style="flex:1; min-width:0;">
					<span class="badge badge-section">Sección</span>
					<input
						class="input-field section-name"
						type="text"
						value={node.obj.rowName}
						on:input={(e) => patchNode(node.obj, { rowName: (e.currentTarget).value.toUpperCase().replace(/[^A-Z0-9_]/g, "_") })}
					/>
				</FlexLayout>
			{:else}
				<FlexLayout items="center" style="flex:1; min-width:0; gap:0.4rem;">
					<span class="idx">{node.id}</span>
					<input
						class="input-field col-name"
						type="text"
						value={node.obj.rowName}
						placeholder="NOMBRE"
						on:input={(e) => patchNode(node.obj, { rowName: (e.currentTarget).value.toUpperCase().replace(/[^A-Z0-9_]/g, "_") })}
					/>
					<input
						class="input-field col-type"
						type="text"
						list={dataListId()}
						value={node.obj.colType}
						placeholder="TIPO"
						on:input={(e) => patchNode(node.obj, { colType: (e.currentTarget).value.toUpperCase().replace(/\s+/g, "") })}
					/>
					<label class="cell" title="NOT NULL">
						<input
							type="checkbox"
							checked={node.obj.nullable === "NOT NULL"}
							on:change={(e) => patchNode(node.obj, { nullable: (e.currentTarget).checked ? "NOT NULL" : "" })}
						/>
						<small>NN</small>
					</label>
					<input
						class="input-field col-default"
						type="text"
						placeholder="DEFAULT…"
						value={node.obj.defaultValue}
						on:input={(e) => patchNode(node.obj, { defaultValue: (e.currentTarget).value })}
					/>
					<label class="cell" title="Primary Key">
						<input
							type="checkbox"
							checked={isPk(node.obj)}
							on:change={(e) => togglePk(node.obj, (e.currentTarget).checked)}
						/>
						<small>PK</small>
					</label>
				</FlexLayout>
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="Frm"></svelte:fragment>
	</TreeView>
</div>

<style>
	.sql-tree-card { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem; }
	.name-row { display: inline-flex; align-items: center; gap: 0.25rem; }
	.prefix { color: var(--is-neutral); font-family: monospace; }
	.input-field {
		padding: 0.2rem 0.4rem;
		border: 1px solid var(--is-border, #ccc);
		border-radius: 0.25rem;
		font-family: inherit;
		font-size: 0.9rem;
		background: var(--is-surface, #fff);
	}
	.name-input { font-weight: bold; min-width: 12rem; }
	.col-name { min-width: 8rem; }
	.col-type { min-width: 9rem; }
	.col-default { min-width: 8rem; flex: 1; }
	.section-name { font-weight: bold; min-width: 14rem; flex: 1; }
	.idx { font-family: monospace; min-width: 2.5rem; color: var(--is-neutral, #666); font-size: 0.8rem; }
	.cell { display: inline-flex; align-items: center; gap: 0.2rem; }
	.badge {
		padding: 0.1rem 0.4rem;
		border-radius: 0.2rem;
		font-size: 0.75rem;
		font-weight: bold;
	}
	.badge-section { background: var(--is-warning-soft, #fff3cd); color: var(--is-warning, #C9A227); }
	.field { display: flex; flex-direction: column; gap: 0.15rem; }
</style>
