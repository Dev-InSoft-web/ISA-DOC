<script lang="ts">
	import { Card, FlexLayout, Iconify, Text, Toaster, toastError } from "@ingenieria_insoft/ispsveltecomponents";
	import { onMount } from "svelte";
	import type { SqlColumnNode, SqlDatabaseNode, SqlSchemaController, SqlTableNode } from "./sqlController";

	export let controller: SqlSchemaController;

	let databases: SqlDatabaseNode[] = [];
	let loading: boolean = true;
	let errorMsg: string = "";

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

	async function load(): Promise<void> {
		loading = true;
		errorMsg = "";
		try {
			databases = await controller.loadSchema();
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : String(e);
			toastError(`No se pudo cargar el esquema: ${errorMsg}`);
		} finally {
			loading = false;
		}
	}

	onMount(load);
</script>

<Toaster />

<div class="sql-tree-wrap custom-scrollbar">
	<header class="sql-head">
		<FlexLayout direction="row" items="center" style="gap:0.5rem;">
			<Iconify icon="mdi:database" style="font-size:1.5rem; color:var(--is-info);" />
			<Text variant="h2">{controller.title}</Text>
		</FlexLayout>
		<Text color="neutral">{@html controller.subtitle}</Text>
	</header>

	<Card variant="solid" style="padding:0.75rem 1rem;">
		{#if loading}
			<FlexLayout direction="row" items="center" style="gap:0.5rem;">
				<Iconify icon="mdi:loading" style="animation: spin 1s linear infinite;" />
				<Text>Consultando esquema…</Text>
			</FlexLayout>
		{:else if errorMsg}
			<FlexLayout direction="row" items="center" style="gap:0.5rem; color:var(--is-danger);">
				<Iconify icon="mdi:alert-circle-outline" />
				<Text color="danger">{errorMsg}</Text>
			</FlexLayout>
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
										<button type="button" class="row table" on:click={() => toggleTable(t)}>
											<Iconify icon={t.expanded ? "mdi:menu-down" : "mdi:menu-right"} />
											<Iconify icon="mdi:table" style="color:var(--is-primary);" />
											<span class="table-name">{t.name}</span>
											<span class="muted">
												{t.columns.length} cols
												{#if t.rows != null} · {t.rows.toLocaleString("es-CO")} filas{/if}
											</span>
										</button>
										{#if t.expanded}
											<ul class="cols">
												{#each t.columns as c (c.name)}
													<li class="col-row">
														<Iconify icon={pkIcon(c)} style="color:{pkColor(c)};" />
														<span class="col-name" class:pk={c.isPk}>{c.name}</span>
														<span class="col-type">{formatType(c)}</span>
														<span class="col-null" class:nullable={c.nullable}>{c.nullable ? "NULL" : "NOT NULL"}</span>
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
	</Card>

	<footer class="sql-foot">
		<Text color="neutral">
			<Iconify icon="mdi:information-outline" /> {@html controller.footnote}
		</Text>
	</footer>
</div>

<style>
	.sql-tree-wrap {
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 1rem 1.5rem 2rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.sql-head {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	ul.tree,
	ul.cols {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul.tree ul.tree {
		padding-left: 1.25rem;
		border-left: 1px dashed color-mix(in srgb, currentColor 25%, transparent);
		margin-left: 0.45rem;
	}
	ul.cols {
		padding-left: 2.25rem;
		display: flex;
		flex-direction: column;
	}
	.row {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: transparent;
		border: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		padding: 0.2rem 0.35rem;
		border-radius: 4px;
		text-align: left;
		width: 100%;
	}
	.row:hover {
		background: color-mix(in srgb, var(--is-primary) 12%, transparent);
	}
	.db-name {
		font-weight: 600;
	}
	.table-name {
		font-weight: 500;
	}
	.muted {
		color: var(--is-text-muted, #888);
		font-size: 0.85em;
		margin-left: 0.25rem;
	}
	.col-row {
		display: grid;
		grid-template-columns: 1.2rem minmax(180px, 1fr) minmax(120px, auto) auto;
		align-items: center;
		gap: 0.5rem;
		padding: 0.15rem 0.35rem 0.15rem 0.35rem;
		font-family: ui-monospace, Menlo, Consolas, monospace;
		font-size: 0.85rem;
	}
	.col-row:hover {
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
	.sql-foot {
		font-size: 0.82rem;
	}
	:global(.sql-tree-wrap code) {
		background: color-mix(in srgb, currentColor 10%, transparent);
		padding: 0.05rem 0.3rem;
		border-radius: 3px;
		font-size: 0.85em;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
