<script lang="ts">
	import { ButtonIconify, Card, FlexLayout, H2, H4, Iconify, Text, Toaster, toastError } from "@ingenieria_insoft/ispsveltecomponents";
	import { onMount } from "svelte";
	import type { SqlColumnNode, SqlDatabaseNode, SqlSchemaController, SqlTableNode } from "./sqlController";

	export let controller: SqlSchemaController;

	let databases: SqlDatabaseNode[] = [];
	let loading: boolean = true;
	let errorMsg: string = "";
	let selectedTable: SqlTableNode | null = null;
	let selectedDb: SqlDatabaseNode | null = null;

	const formatType = (c: SqlColumnNode): string => {
		const lengthTypes = new Set(["varchar", "nvarchar", "char", "nchar"]);
		if (lengthTypes.has(c.dataType) && c.maxLen != null) {
			return c.maxLen === -1 ? `${c.dataType}(max)` : `${c.dataType}(${c.maxLen})`;
		}
		return c.dataType;
	};

	const pkIcon = (c: SqlColumnNode): string => (c.isPk ? "mdi:key" : c.nullable ? "mdi:circle-outline" : "mdi:circle-medium");
	const pkColor = (c: SqlColumnNode): string => (c.isPk ? "var(--is-warning)" : c.nullable ? "var(--is-text-muted, #888)" : "var(--is-info)");

	const toggleDb = (d: SqlDatabaseNode): void => {
		d.expanded = !d.expanded;
		databases = databases;
	};

	const toggleTable = (t: SqlTableNode): void => {
		t.expanded = !t.expanded;
		databases = databases;
	};

	const selectTable = (d: SqlDatabaseNode, t: SqlTableNode): void => {
		selectedDb = d;
		selectedTable = t;
	};

	const buildDDL = (db: SqlDatabaseNode, t: SqlTableNode): string => {
		const pkCols = t.columns.filter((c) => c.isPk).map((c) => c.name);
		const colLines = t.columns.map((c) => {
			const nullPart = c.nullable ? "NULL" : "NOT NULL";
			return `   ${c.name} ${formatType(c).toUpperCase()} ${nullPart}`;
		});
		const pkLine = pkCols.length > 0 ? `,\n   CONSTRAINT PK_${t.name} PRIMARY KEY (${pkCols.join(", ")})` : "";
		return `-- ${db.name}.${t.name}\nCREATE TABLE ${t.name} (\n${colLines.join(",\n")}${pkLine}\n);`;
	};

	async function load(): Promise<void> {
		loading = true;
		errorMsg = "";
		selectedTable = null;
		selectedDb = null;
		try {
			databases = await controller.loadSchema();
			const firstDb = databases[0];
			const firstTable = firstDb?.tables[0];
			if (firstDb && firstTable) selectTable(firstDb, firstTable);
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : String(e);
			toastError(`No se pudo cargar el esquema: ${errorMsg}`);
		} finally {
			loading = false;
		}
	}

	onMount(load);

	$: ddl = selectedDb && selectedTable ? buildDDL(selectedDb, selectedTable) : "";
</script>

<Toaster />

<section class="browser">
	<Card>
		<FlexLayout items="center" justify="between">
			<div>
				<H2>{controller.title}</H2>
				<Text color="neutral"><small>{@html controller.subtitle}</small></Text>
			</div>
			<FlexLayout items="center">
				{#if loading}
					<FlexLayout items="center"><Iconify icon="mdi:loading" /><Text color="neutral"><small>Cargando…</small></Text></FlexLayout>
				{/if}
				<ButtonIconify icon="mdi:refresh" title="Recargar esquema" on:click={load} />
			</FlexLayout>
		</FlexLayout>
	</Card>

	<div class="layout">
		<div class="tree-pane">
			<div class="pane-scroll custom-scrollbar">
				{#if loading}
					<Text color="neutral">Cargando…</Text>
				{:else if errorMsg}
					<Text color="error">{errorMsg}</Text>
				{:else if databases.length === 0}
					<Text color="neutral">Sin bases de datos.</Text>
				{:else}
					<ul class="tree">
						{#each databases as d (d.name)}
							<li>
								<button type="button" class="row db" on:click={() => toggleDb(d)}>
									<Iconify icon={d.expanded ? "mdi:menu-down" : "mdi:menu-right"} />
									<Iconify icon="mdi:database" style="color:var(--is-info);" />
									<span class="db-name">{d.name}</span>
									<span class="muted">({d.tables.length} tablas)</span>
								</button>
								{#if d.expanded}
									<ul class="tree">
										{#each d.tables as t (t.name)}
											<li>
												<div class="row-wrap" class:selected={selectedTable === t}>
													<button type="button" class="caret" on:click={() => toggleTable(t)} title={t.expanded ? "Contraer" : "Expandir"}>
														<Iconify icon={t.expanded ? "mdi:menu-down" : "mdi:menu-right"} />
													</button>
													<button type="button" class="row table" on:click={() => selectTable(d, t)}>
														<Iconify icon="mdi:table" style="color:var(--is-primary);" />
														<span class="table-name">{t.name}</span>
														<span class="muted">
															{t.columns.length}c
															{#if t.rows != null} · {t.rows.toLocaleString("es-CO")}f{/if}
														</span>
													</button>
												</div>
												{#if t.expanded}
													<ul class="cols">
														{#each t.columns as c (c.name)}
															<li class="col-row">
																<Iconify icon={pkIcon(c)} style="color:{pkColor(c)};" />
																<span class="col-name" class:pk={c.isPk}>{c.name}</span>
																<span class="col-type">{formatType(c)}</span>
															</li>
														{/each}
													</ul>
												{/if}
											</li>
										{/each}
									</ul>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<div class="form-pane">
			<div class="pane-scroll custom-scrollbar">
				{#if !selectedTable}
					<Card variant="flat"><Text color="neutral">Selecciona una tabla del árbol.</Text></Card>
				{:else}
					{@const t = selectedTable}
					<Card>
						<FlexLayout items="center" justify="between">
							<FlexLayout items="center">
								<Iconify icon="mdi:table" />
								<H4>{t.name}</H4>
							</FlexLayout>
							<Text color="neutral"><small>{t.columns.length} columnas{#if t.rows != null} · {t.rows.toLocaleString("es-CO")} filas{/if}</small></Text>
						</FlexLayout>
						<div class="frm" style="margin-top: 0.5rem;">
							<ul class="cols-detail">
								{#each t.columns as c (c.name)}
									<li class="col-detail-row">
										<Iconify icon={pkIcon(c)} style="color:{pkColor(c)};" />
										<span class="col-name" class:pk={c.isPk}>{c.name}</span>
										<span class="col-type">{formatType(c)}</span>
										<span class="col-null" class:nullable={c.nullable}>{c.nullable ? "NULL" : "NOT NULL"}</span>
									</li>
								{/each}
							</ul>
						</div>
					</Card>
				{/if}
			</div>
		</div>

		<div class="code-pane">
			<div class="pane-scroll custom-scrollbar">
				{#if !selectedTable}
					<Card variant="flat"><Text color="neutral">Sin selección.</Text></Card>
				{:else}
					<Card>
						<FlexLayout items="center" justify="between">
							<FlexLayout items="center">
								<Iconify icon="mdi:database-cog-outline" />
								<Text><strong>DDL inferido</strong></Text>
							</FlexLayout>
							<Text color="neutral"><small>read-only</small></Text>
						</FlexLayout>
						<pre class="ddl-code">{ddl}</pre>
					</Card>
				{/if}
			</div>
		</div>
	</div>

	<footer class="sql-foot">
		<Text color="neutral">
			<Iconify icon="mdi:information-outline" /> <small>{@html controller.footnote}</small>
		</Text>
	</footer>
</section>

<style>
	.browser {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-height: 0;
	}
	.layout {
		display: grid;
		grid-template-columns: minmax(358px, calc(14.4rem + 190px)) minmax(0, 0.86fr) minmax(0, 1.07fr);
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
	:global(.tree-pane) {
		padding: 0.5rem;
		border: 1px solid var(--is-b-color);
		border-radius: 0.25rem;
		background: var(--is-bg-primary);
		overflow: hidden;
	}
	ul.tree,
	ul.cols,
	ul.cols-detail {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul.tree ul.tree {
		padding-left: 1rem;
		border-left: 1px dashed color-mix(in srgb, currentColor 25%, transparent);
		margin-left: 0.45rem;
	}
	ul.cols {
		padding-left: 2rem;
		display: flex;
		flex-direction: column;
	}
	.row-wrap {
		display: inline-flex;
		align-items: center;
		width: 100%;
		gap: 0.1rem;
	}
	.row-wrap.selected {
		background: color-mix(in srgb, var(--is-primary) 18%, transparent);
		border-radius: 4px;
	}
	.caret {
		background: transparent;
		border: none;
		color: inherit;
		cursor: pointer;
		padding: 0.1rem;
		display: inline-flex;
		align-items: center;
	}
	.row {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: transparent;
		border: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		padding: 0.2rem 0.35rem;
		border-radius: 4px;
		text-align: left;
		flex: 1;
		min-width: 0;
	}
	.row:hover {
		background: color-mix(in srgb, var(--is-primary) 12%, transparent);
	}
	.db-name {
		font-weight: 600;
	}
	.table-name {
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 0;
		flex: 1;
	}
	.muted {
		color: var(--is-text-muted, #888);
		font-size: 0.78em;
		margin-left: auto;
		padding-left: 0.4rem;
	}
	.col-row {
		display: grid;
		grid-template-columns: 1.2rem minmax(120px, 1fr) auto;
		align-items: center;
		gap: 0.4rem;
		padding: 0.1rem 0.35rem;
		font-family: ui-monospace, Menlo, Consolas, monospace;
		font-size: 0.78rem;
	}
	.col-detail-row {
		display: grid;
		grid-template-columns: 1.2rem minmax(180px, 1fr) minmax(120px, auto) auto;
		align-items: center;
		gap: 0.5rem;
		padding: 0.2rem 0.35rem;
		font-family: ui-monospace, Menlo, Consolas, monospace;
		font-size: 0.85rem;
	}
	.col-detail-row:hover {
		background: color-mix(in srgb, currentColor 6%, transparent);
		border-radius: 3px;
	}
	.col-name.pk {
		font-weight: 700;
		color: var(--is-warning);
	}
	.col-type {
		color: var(--is-info);
	}
	.col-null {
		color: var(--is-success);
		font-size: 0.78rem;
	}
	.col-null.nullable {
		color: var(--is-text-muted, #888);
	}
	.ddl-code {
		margin: 0.5rem 0 0;
		padding: 0.75rem;
		background: var(--is-bg-secondary, #1e1e1e);
		border: 1px solid var(--is-b-color);
		border-radius: 0.25rem;
		font-family: ui-monospace, Menlo, Consolas, monospace;
		font-size: 0.8rem;
		line-height: 1.4;
		white-space: pre;
		overflow: auto;
	}
	.sql-foot {
		font-size: 0.82rem;
	}
	:global(.browser code) {
		background: color-mix(in srgb, currentColor 10%, transparent);
		padding: 0.05rem 0.3rem;
		border-radius: 3px;
		font-size: 0.85em;
	}
	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
			height: auto;
		}
	}
</style>
