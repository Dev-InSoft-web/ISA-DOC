<script lang="ts">
	import { FlexLayout, GridLayout, Input, SelectEnum } from "@ingenieria_insoft/ispsveltecomponents";
	import { marked } from "marked";
	import pricing from "../../lib/patyia/openai-models-pricing.json";

	type ModelEntry = {
		familia: string;
		modelo: string;
		costoEntrada: string;
		cacheEntrada: string;
		costoSalida: string;
		detalle: string;
	};

	const models: ModelEntry[] = pricing;

	const parseCost = (s: string): number => {
		const m = s.match(/\$(\d+(?:\.\d+)?)/);
		return m ? parseFloat(m[1]) : 0;
	};

	const promedio = (m: ModelEntry): number => (parseCost(m.costoEntrada) + parseCost(m.costoSalida)) / 2;
	const fmtMoneda = (v: number): string => `$${v < 1 ? v.toFixed(3) : v.toFixed(2)}`;

	const maxEntrada = Math.max(...models.map((m) => parseCost(m.costoEntrada)));
	const maxCache = Math.max(...models.map((m) => parseCost(m.cacheEntrada)));
	const maxSalida = Math.max(...models.map((m) => parseCost(m.costoSalida)));
	const maxPromedio = Math.max(...models.map(promedio));

	const COLOR_MAGENTA = "rgba(217, 70, 239, 0.28)";
	const COLOR_GRIS = "rgba(160, 160, 160, 0.28)";
	const COLOR_AMBAR = "rgba(245, 158, 11, 0.32)";

	const columnasParaOffset = (offset: number) => [
		{ idx: 1 + offset, max: maxEntrada, color: COLOR_MAGENTA },
		{ idx: 2 + offset, max: maxCache, color: COLOR_GRIS },
		{ idx: 3 + offset, max: maxSalida, color: COLOR_MAGENTA },
		{ idx: 4 + offset, max: maxPromedio, color: COLOR_AMBAR },
	];

	const pintarBg = (td: HTMLTableCellElement, max: number, color: string): void => {
		const v = parseCost(td.textContent ?? "");
		if (!v || !max) {
			td.style.background = "";
			return;
		}
		const pct = Math.min(100, (v / max) * 100);
		td.style.background = `linear-gradient(to right, ${color} ${pct}%, transparent ${pct}%)`;
	};

	function progresoBg(node: HTMLElement, params: { offset: number; key: string }) {
		const aplicar = (off: number): void => {
			const cols = columnasParaOffset(off);
			const filas = node.querySelectorAll<HTMLTableRowElement>("tbody > tr");
			filas.forEach((fila) => {
				const tds = fila.querySelectorAll<HTMLTableCellElement>("td");
				for (const col of cols) {
					const td = tds[col.idx];
					if (td) pintarBg(td, col.max, col.color);
				}
			});
		};
		aplicar(params.offset);

		return { update: (p: { offset: number; key: string }) => aplicar(p.offset) };
	}

	let filterText = "";
	let filterFamilia: string = "__all__";
	let orden: "familia" | "promedio-asc" | "promedio-desc" = "familia";

	const familiasDisponibles: string[] = [...new Set(models.map((m) => m.familia))];

	const enumFamilias: Record<string, string> = { "Todas las familias": "__all__", ...Object.fromEntries(familiasDisponibles.map((f) => [f, f])) };
	const enumOrden: Record<string, string> = {
		"Agrupar por familia": "familia",
		"Costo promedio ↑": "promedio-asc",
		"Costo promedio ↓": "promedio-desc",
	};

	$: filtered = models.filter((m) => {
		if (filterFamilia !== "__all__" && m.familia !== filterFamilia) return false;
		if (!filterText.trim()) return true;
		const q = filterText.toLowerCase();
		return m.modelo.toLowerCase().includes(q) || m.familia.toLowerCase().includes(q) || m.detalle.toLowerCase().includes(q);
	});

	$: filteredOrdered = orden === "familia"
		? filtered
		: [...filtered].sort((a, b) => orden === "promedio-asc" ? promedio(a) - promedio(b) : promedio(b) - promedio(a));

	$: familias = orden === "familia" ? [...new Set(filteredOrdered.map((m) => m.familia))] : ["__flat__"];

	const escCell = (s: string): string => s.replace(/\|/g, "\\|").replace(/\n+/g, " ");

	const tablaMd = (familia: string): string => {
		const rows = familia === "__flat__" ? filteredOrdered : filteredOrdered.filter((m) => m.familia === familia);
		const head = orden === "familia"
			? "| Modelo (API ID) | Entrada | Caché | Salida | Promedio | Detalle |\n| --- | --- | --- | --- | --- | --- |"
			: "| Modelo (API ID) | Familia | Entrada | Caché | Salida | Promedio | Detalle |\n| --- | --- | --- | --- | --- | --- | --- |";
		const body = rows
			.map((m) => orden === "familia"
				? `| \`${escCell(m.modelo)}\` | ${escCell(m.costoEntrada)} | ${escCell(m.cacheEntrada)} | ${escCell(m.costoSalida)} | ${fmtMoneda(promedio(m))} | ${escCell(m.detalle)} |`
				: `| \`${escCell(m.modelo)}\` | ${escCell(m.familia)} | ${escCell(m.costoEntrada)} | ${escCell(m.cacheEntrada)} | ${escCell(m.costoSalida)} | ${fmtMoneda(promedio(m))} | ${escCell(m.detalle)} |`
			)
			.join("\n");

		return `${head}\n${body}`;
	};

	$: tablasHtml = familias.map((f) => ({ familia: f, html: marked.parse(tablaMd(f)) as string }));
</script>

<FlexLayout direction="column" style="padding: 1rem;">
	<h2 style="margin: 0 0 0.25rem;">Modelos OpenAI — Pricing</h2>
	<p style="margin: 0 0 0.75rem; color: #888; font-size: 0.85rem;">
		Costos por 1M tokens. Fuente: OpenAI API pricing (mayo 2026).
	</p>

	<GridLayout cells={3} items="end" style="margin-bottom: 0.75rem; column-gap: 0.75rem;">
		<Input label="Filtrar" bind:value={filterText} />
		<SelectEnum label="Familia" required={false} enumValue={enumFamilias} bind:value={filterFamilia} />
		<SelectEnum label="Orden" required={false} enumValue={enumOrden} bind:value={orden} />
	</GridLayout>

	{#each tablasHtml as t}
		{#if t.familia !== "__flat__"}
			<h3 style="margin: 0.75rem 0 0.25rem; font-size: 1rem; color: var(--is-text-secondary, #555);">{t.familia}</h3>
		{/if}
		<div class="md-table" use:progresoBg={{ offset: orden === "familia" ? 0 : 1, key: t.html }}>{@html t.html}</div>
	{/each}

	{#if filtered.length === 0}
		<p style="color: #888; font-style: italic;">Sin resultados para «{filterText}».</p>
	{/if}

	<p style="margin-top: 1rem; color: #aaa; font-size: 0.75rem;">
		Total: {filtered.length} modelos · JSON: <code>src/lib/patyia/openai-models-pricing.json</code>
	</p>
</FlexLayout>

<style>
	.md-table :global(table) {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.82rem;
		margin: 0 0 0.5rem;
	}
	.md-table :global(th),
	.md-table :global(td) {
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--is-border-color, rgba(0, 0, 0, 0.12));
		text-align: left;
		vertical-align: top;
	}
	.md-table :global(th) {
		background: var(--is-bg-secondary, #f5f5f5);
		font-weight: 600;
	}
	.md-table :global(tbody tr:hover) {
		background: var(--is-bg-hover, rgba(0, 0, 0, 0.04));
	}
	.md-table :global(code) {
		font-size: 0.8rem;
		background: var(--is-bg-code, rgba(0, 0, 0, 0.06));
		padding: 0.1rem 0.3rem;
		border-radius: 3px;
	}
</style>
