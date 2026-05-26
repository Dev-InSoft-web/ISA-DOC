<script lang="ts">
	import { Card, FlexLayout, Iconify, Text, Toaster, toastError } from "@ingenieria_insoft/ispsveltecomponents";
	import { onMount } from "svelte";

	interface ColumnRow {
		TABLE_NAME: string;
		COLUMN_NAME: string;
		DATA_TYPE: string;
		CHARACTER_MAXIMUM_LENGTH: number | null;
		IS_NULLABLE: "YES" | "NO";
		ORDINAL_POSITION: number;
	}

	interface ConstraintRow {
		TABLE_NAME: string;
		CONSTRAINT_TYPE: "PRIMARY KEY" | "UNIQUE" | "FOREIGN KEY";
		COLUMN_NAME: string;
	}

	interface RowCountRow {
		TABLE_NAME: string;
		ROWS: number;
	}

	interface ColumnNode {
		name: string;
		dataType: string;
		maxLen: number | null;
		nullable: boolean;
		isPk: boolean;
	}

	interface TableNode {
		name: string;
		columns: ColumnNode[];
		rows: number | null;
		expanded: boolean;
	}

	const DB_NAME = "AYUDASCP_IA";
	const TABLES = ["CONVERSACIONES", "MENSAJESCALIFICADOS", "TIQUETESCONVERSACION", "PROPIETARIOXTERCERO"];

	let tables: TableNode[] = [];
	let loading: boolean = true;
	let dbExpanded: boolean = true;
	let errorMsg: string = "";

	async function execGet<T>(sql: string): Promise<T[]> {
		const res = await fetch("/api/patyia/db/exec", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ sql }),
		});
		const data = (await res.json()) as { ok: boolean; error?: string; rows?: T[] };
		if (!data.ok) throw new Error(data.error ?? "Error desconocido");
		return data.rows ?? [];
	}

	function tableList(): string {
		return TABLES.map((t) => `'${t}'`).join(",");
	}

	const formatType = (c: ColumnNode): string => {
		const lengthTypes = new Set(["varchar", "nvarchar", "char", "nchar"]);
		if (lengthTypes.has(c.dataType) && c.maxLen != null) {
			return c.maxLen === -1 ? `${c.dataType}(max)` : `${c.dataType}(${c.maxLen})`;
		}
		return c.dataType;
	};

	const pkIcon = (c: ColumnNode): string => (c.isPk ? "mdi:key" : c.nullable ? "mdi:circle-outline" : "mdi:circle-medium");
	const pkColor = (c: ColumnNode): string => (c.isPk ? "var(--is-warning)" : c.nullable ? "var(--is-text-muted, #888)" : "var(--is-info)");

	async function loadSchema(): Promise<void> {
		loading = true;
		errorMsg = "";
		try {
			const list = tableList();
			const colsSql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME IN (${list}) ORDER BY TABLE_NAME, ORDINAL_POSITION`;
			const consSql = `SELECT tc.TABLE_NAME, tc.CONSTRAINT_TYPE, kcu.COLUMN_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME WHERE tc.TABLE_NAME IN (${list})`;
			const rowsSql = `SELECT t.name AS TABLE_NAME, SUM(p.rows) AS ROWS FROM sys.tables t JOIN sys.partitions p ON t.object_id = p.object_id WHERE p.index_id IN (0, 1) AND t.name IN (${list}) GROUP BY t.name`;

			const [cols, cons, rows] = await Promise.all([
				execGet<ColumnRow>(colsSql),
				execGet<ConstraintRow>(consSql),
				execGet<RowCountRow>(rowsSql),
			]);

			const pkSet: Set<string> = new Set();
			for (const c of cons) {
				if (c.CONSTRAINT_TYPE === "PRIMARY KEY") pkSet.add(`${c.TABLE_NAME}.${c.COLUMN_NAME}`);
			}
			const rowCount: Map<string, number> = new Map();
			for (const r of rows) rowCount.set(r.TABLE_NAME, Number(r.ROWS));

			const byTable: Map<string, ColumnNode[]> = new Map();
			for (const t of TABLES) byTable.set(t, []);
			for (const c of cols) {
				const arr = byTable.get(c.TABLE_NAME);

				if (!arr) continue;
				arr.push({
					name: c.COLUMN_NAME,
					dataType: c.DATA_TYPE,
					maxLen: c.CHARACTER_MAXIMUM_LENGTH,
					nullable: c.IS_NULLABLE === "YES",
					isPk: pkSet.has(`${c.TABLE_NAME}.${c.COLUMN_NAME}`),
				});
			}

			tables = TABLES.map((name) => ({
				name,
				columns: byTable.get(name) ?? [],
				rows: rowCount.has(name) ? rowCount.get(name)! : null,
				expanded: true,
			}));
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : String(e);
			toastError(`No se pudo cargar el esquema: ${errorMsg}`);
		} finally {
			loading = false;
		}
	}

	const toggleTable = (t: TableNode): void => {
		t.expanded = !t.expanded;
		tables = tables;
	};

	onMount(loadSchema);
</script>

<Toaster />

<div class="sql-tree-wrap custom-scrollbar">
	<header class="sql-head">
		<FlexLayout direction="row" items="center" style="gap:0.5rem;">
			<Iconify icon="mdi:database" style="font-size:1.5rem; color:var(--is-info);" />
			<Text variant="h2">PatyIA · Árbol SQL</Text>
		</FlexLayout>
		<Text color="neutral">Esquema en vivo de <code>{DB_NAME}</code> obtenido vía <code>SELECT</code> sobre <code>INFORMATION_SCHEMA</code>. Solo lectura.</Text>
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
				<li>
					<button type="button" class="row db" on:click={() => (dbExpanded = !dbExpanded)}>
						<Iconify icon={dbExpanded ? "mdi:menu-down" : "mdi:menu-right"} />
						<Iconify icon="mdi:database" style="color:var(--is-info);" />
						<span class="db-name">{DB_NAME}</span>
						<span class="muted">({tables.length} tablas)</span>
					</button>
					{#if dbExpanded}
						<ul class="tree">
							{#each tables as t (t.name)}
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
			</ul>
		{/if}
	</Card>

	<footer class="sql-foot">
		<Text color="neutral">
			<Iconify icon="mdi:information-outline" /> Consultas readonly: <code>INFORMATION_SCHEMA.COLUMNS</code>, <code>INFORMATION_SCHEMA.TABLE_CONSTRAINTS</code>, <code>sys.partitions</code>.
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
