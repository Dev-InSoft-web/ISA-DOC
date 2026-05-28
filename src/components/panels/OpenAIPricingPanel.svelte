<script lang="ts">
	import { FlexLayout } from "@ingenieria_insoft/ispsveltecomponents";
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

	let filterText = "";

	$: filtered = filterText.trim()
		? models.filter((m) => {
				const q = filterText.toLowerCase();
				return m.modelo.toLowerCase().includes(q)
					|| m.familia.toLowerCase().includes(q)
					|| m.detalle.toLowerCase().includes(q);
			})
		: models;

	$: familias = [...new Set(filtered.map((m) => m.familia))];

	function modelsByFamilia(familia: string): ModelEntry[] {
		return filtered.filter((m) => m.familia === familia);
	}
</script>

<FlexLayout direction="column" style="padding: 1rem; height: 100%; min-height: 0; overflow: auto;">
	<h2 style="margin: 0 0 0.25rem;">Modelos OpenAI — Pricing</h2>
	<p style="margin: 0 0 0.75rem; color: #888; font-size: 0.85rem;">
		Costos por 1M tokens. Fuente: OpenAI API pricing (mayo 2026).
	</p>

	<input
		type="text"
		placeholder="Filtrar por modelo, familia o descripción…"
		bind:value={filterText}
		style="
			padding: 0.5rem 0.75rem;
			border: 1px solid var(--is-border-color, rgba(0,0,0,0.15));
			border-radius: 6px;
			font-size: 0.85rem;
			margin-bottom: 0.75rem;
			max-width: 400px;
			background: var(--is-bg-primary, #fff);
			color: var(--is-text-primary, #222);
		"
	/>

	{#each familias as familia}
		<h3 style="margin: 0.75rem 0 0.25rem; font-size: 1rem; color: var(--is-text-secondary, #555);">{familia}</h3>
		<div style="overflow-x: auto; margin-bottom: 0.5rem;">
			<table class="pricing-table">
				<thead>
					<tr>
						<th>Modelo (API ID)</th>
						<th>Entrada</th>
						<th>Caché</th>
						<th>Salida</th>
						<th>Detalle</th>
					</tr>
				</thead>
				<tbody>
					{#each modelsByFamilia(familia) as m}
						<tr>
							<td><code>{m.modelo}</code></td>
							<td>{m.costoEntrada}</td>
							<td>{m.cacheEntrada}</td>
							<td>{m.costoSalida}</td>
							<td class="detalle">{m.detalle}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/each}

	{#if filtered.length === 0}
		<p style="color: #888; font-style: italic;">Sin resultados para «{filterText}».</p>
	{/if}

	<p style="margin-top: 1rem; color: #aaa; font-size: 0.75rem;">
		Total: {filtered.length} modelos · JSON: <code>src/lib/patyia/openai-models-pricing.json</code>
	</p>
</FlexLayout>

<style>
	.pricing-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.82rem;
	}
	.pricing-table th,
	.pricing-table td {
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--is-border-color, rgba(0, 0, 0, 0.12));
		text-align: left;
		white-space: nowrap;
	}
	.pricing-table th {
		background: var(--is-bg-secondary, #f5f5f5);
		font-weight: 600;
		position: sticky;
		top: 0;
	}
	.pricing-table td.detalle {
		white-space: normal;
		min-width: 200px;
	}
	.pricing-table tbody tr:hover {
		background: var(--is-bg-hover, rgba(0, 0, 0, 0.04));
	}
	.pricing-table code {
		font-size: 0.8rem;
		background: var(--is-bg-code, rgba(0, 0, 0, 0.06));
		padding: 0.1rem 0.3rem;
		border-radius: 3px;
	}
</style>
