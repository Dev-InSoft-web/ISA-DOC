<script lang="ts">
	import { Button, FlexLayout, Iconify, Text } from "@ingenieria_insoft/ispsveltecomponents";
	import Switch_ from "./_comps/especial/_Switch.svelte";
	import FloatingCard from "./_comps/containers/FloatingCard.svelte";
	import type { ParsedTable, TableColumn, TableRow, TableSection } from "../lib/tableSchema.ts";
	import { COMMON_COLUMN_TYPES, isSectionRow } from "../lib/tableSchema.ts";

	const DEFAULT_OPTIONS: { label: string; value: string }[] = [
		{ label: "—", value: "" },
		{ label: "0", value: "0" },
		{ label: "1", value: "1" },
		{ label: "'' (cadena vacía)", value: "''" },
		{ label: "GETDATE()", value: "GETDATE()" },
		{ label: "NEWID()", value: "NEWID()" },
	];
	function defaultIsCustom(v: string): boolean {
		return !!v && !DEFAULT_OPTIONS.some((o) => o.value === v);
	}

	export let table: ParsedTable;
	export let prefix: string = "";
	export let onChange: (t: ParsedTable) => void = () => {};

	$: baseName = prefix && table.name.startsWith(prefix) ? table.name.slice(prefix.length) : table.name;

	function emit(): void { onChange(table); }

	function setBaseName(v: string): void {
		const p = prefix && table.name.startsWith(prefix) ? prefix : "";
		table.name = (p + v).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
		emit();
	}

	function addColumn(): void {
		table.columns = [
			...table.columns,
			{ name: "NUEVA_COLUMNA", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" } satisfies TableColumn,
		];
		emit();
	}

	function addSection(): void {
		table.columns = [
			...table.columns,
			{ kind: "section", name: "NUEVA_SECCION" } satisfies TableSection,
		];
		emit();
	}

	function removeRow(idx: number): void {
		const row = table.columns[idx];
		if (!row) return;
		if (isSectionRow(row)) {
			table.columns = table.columns.filter((_, i) => i !== idx);
			emit();
			return;
		}
		if (!confirm(`Eliminar columna "${row.name}"?`)) return;
		table.columns = table.columns.filter((_, i) => i !== idx);
		table.compositePrimaryKey = table.compositePrimaryKey.filter((c) => table.columns.some((cc) => !isSectionRow(cc) && cc.name === c));
		emit();
	}

	function setSectionName(idx: number, value: string): void {
		const row = table.columns[idx];
		if (!row || !isSectionRow(row)) return;
		const next = table.columns.slice();
		next[idx] = { kind: "section", name: value.toUpperCase().replace(/[^A-Z0-9_]/g, "_") };
		table.columns = next;
		emit();
	}

	function moveColumn(idx: number, delta: number): void {
		const j = idx + delta;
		if (j < 0 || j >= table.columns.length) return;
		const next = table.columns.slice();
		const [it] = next.splice(idx, 1);
		next.splice(j, 0, it);
		table.columns = next;
		emit();
	}

	function setColField<K extends keyof TableColumn>(idx: number, key: K, value: TableColumn[K]): void {
		const row = table.columns[idx];
		if (!row || isSectionRow(row)) return;
		const next = table.columns.slice();
		next[idx] = { ...(row as TableColumn), [key]: value };
		table.columns = next;
		emit();
	}

	function toggleCompositePk(colName: string, checked: boolean): void {
		const set = new Set(table.compositePrimaryKey);
		if (checked) set.add(colName); else set.delete(colName);
		table.compositePrimaryKey = [...set];
		emit();
	}
</script>

<div class="table-card">
	<FlexLayout items="center" justify="between">
		<FlexLayout items="center">
			<Iconify icon="mdi:table" />
			<div class="name-row">
				<span class="prefix">{prefix}</span>
				<input
					class="input-field name-input"
					type="text"
					value={baseName}
					on:input={(e) => setBaseName((e.currentTarget as HTMLInputElement).value)}
				/>
			</div>
		</FlexLayout>
	</FlexLayout>

	<label class="field">
		<Text color="neutral"><small>Comentario (línea sobre la tabla)</small></Text>
		<input
			class="input-field"
			type="text"
			value={table.comment}
			on:input={(e) => { table.comment = (e.currentTarget as HTMLInputElement).value; emit(); }}
		/>
	</label>

	<div class="columns">
		<div class="col-row col-head">
			<span>#</span>
			<span>Nombre</span>
			<span>Tipo</span>
			<span>Not null</span>
			<span>Default</span>
			<span>PK</span>
			<span></span>
		</div>
		{#each table.columns as row, idx}
			{#if isSectionRow(row)}
				<div class="section-row">
					<Iconify icon="mdi:folder-outline" />
					<span class="section-label"><small>Sección</small></span>
					<input
						class="input-field section-name"
						type="text"
						value={row.name}
						on:input={(e) => setSectionName(idx, (e.currentTarget as HTMLInputElement).value)}
					/>
					<button class="icon-btn" title="Subir" on:click={() => moveColumn(idx, -1)} disabled={idx === 0}>
						<Iconify icon="mdi:arrow-up" />
					</button>
					<button class="icon-btn" title="Bajar" on:click={() => moveColumn(idx, 1)} disabled={idx === table.columns.length - 1}>
						<Iconify icon="mdi:arrow-down" />
					</button>
					<button class="icon-btn danger" title="Eliminar sección" on:click={() => removeRow(idx)}>
						<Iconify icon="mdi:trash-can-outline" />
					</button>
				</div>
			{:else}
				{@const col = row as TableColumn}
			<FloatingCard horizontal="right" vertical="center">
				<div class="col-row">
					<span class="idx">{idx + 1}</span>
					<input
						class="input-field"
						type="text"
						value={col.name}
						on:input={(e) => setColField(idx, "name", (e.currentTarget as HTMLInputElement).value.toUpperCase().replace(/[^A-Z0-9_]/g, "_"))}
					/>
					<input
						class="input-field"
						type="text"
						list="col-types-{table.fragmentId}-{table.originalName}"
						value={col.type}
						on:input={(e) => setColField(idx, "type", (e.currentTarget as HTMLInputElement).value.toUpperCase().replace(/\s+/g, ""))}
					/>
					<label class="notnull-cell" title="NOT NULL">
						<input
							type="checkbox"
							checked={col.nullable === "NOT NULL"}
							on:change={(e) => setColField(idx, "nullable", (e.currentTarget as HTMLInputElement).checked ? "NOT NULL" : "")}
						/>
					</label>
					<FlexLayout items="center">
						<select
							class="input-field"
							value={defaultIsCustom(col.defaultValue) ? "__custom__" : col.defaultValue}
							on:change={(e) => {
								const v = (e.currentTarget as HTMLSelectElement).value;
								if (v === "__custom__") {
									if (!defaultIsCustom(col.defaultValue)) setColField(idx, "defaultValue", "");
									return;
								}
								setColField(idx, "defaultValue", v);
							}}
						>
							{#each DEFAULT_OPTIONS as opt}
								<option value={opt.value}>{opt.label}</option>
							{/each}
							<option value="__custom__">Personalizado…</option>
						</select>
						{#if defaultIsCustom(col.defaultValue) || (col.defaultValue && !DEFAULT_OPTIONS.some((o) => o.value === col.defaultValue))}
							<input
								class="input-field"
								type="text"
								placeholder="expresión…"
								value={col.defaultValue}
								on:input={(e) => setColField(idx, "defaultValue", (e.currentTarget as HTMLInputElement).value)}
							/>
						{/if}
					</FlexLayout>
					<label class="pk-cell">
						<input
							type="checkbox"
							checked={col.primaryKey || table.compositePrimaryKey.includes(col.name)}
							on:change={(e) => {
								const checked = (e.currentTarget as HTMLInputElement).checked;
								if (table.compositePrimaryKey.length > 0) toggleCompositePk(col.name, checked);
								else setColField(idx, "primaryKey", checked);
							}}
						/>
					</label>
					<button class="icon-btn danger" title="Eliminar" on:click={() => removeRow(idx)}>
						<Iconify icon="mdi:trash-can-outline" />
					</button>
				</div>
				<FlexLayout slot="float" direction="column">
					<button class="icon-btn" title="Subir" on:click={() => moveColumn(idx, -1)} disabled={idx === 0}>
						<Iconify icon="mdi:arrow-up" />
					</button>
					<button class="icon-btn" title="Bajar" on:click={() => moveColumn(idx, 1)} disabled={idx === table.columns.length - 1}>
						<Iconify icon="mdi:arrow-down" />
					</button>
				</FlexLayout>
			</FloatingCard>
			{/if}
		{/each}
	</div>

	<datalist id="col-types-{table.fragmentId}-{table.originalName}">
		{#each COMMON_COLUMN_TYPES as t}
			<option value={t}></option>
		{/each}
	</datalist>

	<FlexLayout items="center" justify="between">
		<FlexLayout items="center">
			<Button variant="outlined" style="width: fit-content;" onClick={addColumn}>
				<Iconify icon="mdi:plus" /> Agregar columna
			</Button>
			<Button variant="outlined" style="width: fit-content;" onClick={addSection}>
				<Iconify icon="mdi:folder-plus-outline" /> Agregar sección
			</Button>
		</FlexLayout>
		{#if table.compositePrimaryKey.length > 0}
			<Text color="neutral"><small>PK compuesta: {table.compositePrimaryKey.join(", ")}</small></Text>
		{/if}
	</FlexLayout>

	{#if table.extraStatements.length > 0}
		<details>
			<summary><Text color="neutral"><small>Sentencias adicionales ({table.extraStatements.length})</small></Text></summary>
			<ul class="extra-list">
				{#each table.extraStatements as s}<li><code>{s}</code></li>{/each}
			</ul>
		</details>
	{/if}
</div>

<style>
	.table-card {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 0.75rem;
		border: 1px solid var(--is-b-color);
		border-radius: 6px;
		background: color-mix(in srgb, var(--is-bg-secondary), white 0.5%);
	}
	.name-row {
		display: inline-flex;
		align-items: center;
		gap: 0.15rem;
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
	}
	.prefix {
		opacity: 0.6;
		padding: 0.2rem 0.35rem;
		border-right: 1px solid var(--is-b-color);
		background: var(--is-bg-readonly);
		border-radius: 4px 0 0 4px;
	}
	.name-input {
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		min-width: 18rem;
		border-radius: 0 4px 4px 0;
	}
	.field { display: flex; flex-direction: column; gap: 0.2rem; }
	.input-field {
		background: var(--is-bg-secondary);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		padding: 0.25rem 0.45rem;
		font-size: 0.78rem;
		color: var(--is-color);
		outline: none;
		font-family: inherit;
	}
	.input-field:focus { border-color: var(--is-primary); }

	.columns {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		overflow-x: auto;
	}
	.col-row {
		display: grid;
		grid-template-columns: 2rem 1.4fr 1.2fr 0.9fr 1.4fr 0.5rem 7rem;
		align-items: center;
		gap: 0.35rem;
		min-width: 48rem;
	}
	.col-head {
		font-size: 0.7rem;
		text-transform: uppercase;
		opacity: 0.7;
		padding: 0 0.25rem;
	}
	.col-head span { letter-spacing: 0.04em; }
	.section-row {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.3rem 0.4rem;
		border-radius: 4px;
		background: color-mix(in srgb, var(--is-primary, #3b82f6) 12%, transparent);
		border: 1px dashed color-mix(in srgb, var(--is-primary, #3b82f6) 50%, transparent);
		margin: 0.25rem 0;
	}
	.section-label { opacity: 0.7; text-transform: uppercase; letter-spacing: 0.04em; }
	.section-name {
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		font-weight: 600;
		flex: 1;
		min-width: 8rem;
	}
	.idx { opacity: 0.5; font-family: ui-monospace, Menlo, monospace; font-size: 0.75rem; text-align: center; }
	.pk-cell { display: flex; justify-content: center; align-items: center; }
	.notnull-cell { display: flex; justify-content: center; align-items: center; }
	.icon-btn {
		background: transparent;
		border: 1px solid transparent;
		border-radius: 4px;
		padding: 0.15rem 0.3rem;
		cursor: pointer;
		color: var(--is-color);
		display: inline-flex;
		align-items: center;
	}
	.icon-btn:hover:not([disabled]) { background: var(--is-bg-readonly); border-color: var(--is-b-color); }
	.icon-btn[disabled] { opacity: 0.35; cursor: not-allowed; }
	.icon-btn.danger:hover { color: var(--is-danger); }

	.extra-list {
		margin: 0.35rem 0 0 1rem;
		font-family: ui-monospace, Menlo, monospace;
		font-size: 0.75rem;
		opacity: 0.85;
	}
	.extra-list li { margin: 0.15rem 0; }
</style>
