<script lang="ts">
	const ROWS = [
		{ label: "Texto de respuesta", nano: "Sí", mini: "Sí" },
		{ label: "Imágenes adjuntas", nano: "No", mini: "Sí" },
		{ label: "Video embebido", nano: "No", mini: "Sí" },
		{ label: "Conversación", nano: "1862", mini: "1863" },
	] as const;
</script>

<div class="discovery">
	<p class="lead">
		Misma consulta y mismo flujo RAG; solo cambia <strong>MODELO</strong> en la respuesta final (TK-1431662).
	</p>

	<div class="cmp-table-wrap">
		<table class="cmp-table">
			<thead>
				<tr>
					<th>Aspecto</th>
					<th class="col-nano">gpt-5-nano</th>
					<th class="col-mini">gpt-5-mini</th>
				</tr>
			</thead>
			<tbody>
				{#each ROWS as r}
					<tr>
						<td>{r.label}</td>
						<td class="col-nano">{r.nano}</td>
						<td class="col-mini">{r.mini}</td>
					</tr>
				{/each}
				<tr>
					<td>Resultado</td>
					<td class="col-nano"><span class="pill pill-warn">Sin adjuntos</span></td>
					<td class="col-mini"><span class="pill pill-ok">Con adjuntos</span></td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="cols">
		<div class="col-card">
			<div class="col-head">
				<strong>Conv. 1862</strong>
				<span class="pill pill-model">gpt-5-nano</span>
				<span class="pill pill-warn">Sin imagen / video</span>
			</div>
			<p class="col-body">Instrucciones en texto; el RAG no se refleja como adjunto en el mensaje de Paty.</p>
		</div>
		<div class="col-card">
			<div class="col-head">
				<strong>Conv. 1863</strong>
				<span class="pill pill-model">gpt-5-mini</span>
				<span class="pill pill-ok">Imagen + video</span>
			</div>
			<p class="col-body">Mismo guion textual, con captura de pantalla y video tutorial en la respuesta.</p>
		</div>
	</div>

	<div class="impact">
		<strong>Hallazgo:</strong>
		<code class="mono">gpt-5-nano</code> no sustituye a
		<code class="mono">gpt-5-mini</code> cuando el producto debe mostrar documentación visual en el chat.
		No conviene un <code class="mono">UPDATE</code> global a nano sin matriz por tipo de instrucción.
	</div>

	<p class="footer-note"><small>Registrado por Jeff-Aporta · 2026-06-03 · QA: conv. 1862 y 1863</small></p>
</div>

<style>
	.discovery {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 0.92rem;
		line-height: 1.5;
		max-width: 100%;
		min-width: 0;
	}
	.lead {
		margin: 0;
		opacity: 0.92;
	}
	.mono {
		font-family: ui-monospace, Consolas, monospace;
		font-size: 0.88em;
		padding: 0.1em 0.35em;
		border-radius: 4px;
		background: var(--is-surface-container, rgba(127, 127, 127, 0.12));
	}
	.cmp-table-wrap {
		overflow-x: auto;
		border-radius: 6px;
		border: 1px solid var(--is-outline, rgba(255, 255, 255, 0.12));
	}
	.cmp-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.88rem;
	}
	.cmp-table th,
	.cmp-table td {
		padding: 0.45rem 0.65rem;
		text-align: left;
		border-bottom: 1px solid var(--is-outline, rgba(255, 255, 255, 0.1));
	}
	.cmp-table th {
		font-weight: 600;
		background: var(--is-surface-container, rgba(127, 127, 127, 0.1));
	}
	.col-nano,
	.col-mini {
		width: 28%;
	}
	.pill {
		display: inline-block;
		padding: 0.12rem 0.5rem;
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 600;
		line-height: 1.3;
	}
	.pill-warn {
		background: rgba(180, 83, 9, 0.25);
		color: #fbbf24;
		border: 1px solid rgba(180, 83, 9, 0.45);
	}
	.pill-ok {
		background: rgba(21, 128, 61, 0.25);
		color: #4ade80;
		border: 1px solid rgba(21, 128, 61, 0.45);
	}
	.pill-model {
		background: rgba(96, 165, 250, 0.15);
		color: #93c5fd;
		border: 1px solid rgba(96, 165, 250, 0.35);
		font-family: ui-monospace, Consolas, monospace;
	}
	.cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	@media (max-width: 720px) {
		.cols {
			grid-template-columns: 1fr;
		}
	}
	.col-card {
		padding: 0.75rem;
		border-radius: 6px;
		border: 1px solid var(--is-outline, rgba(255, 255, 255, 0.12));
		background: var(--is-surface-container, rgba(127, 127, 127, 0.06));
		min-width: 0;
	}
	.col-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
		margin-bottom: 0.5rem;
	}
	.col-body {
		margin: 0;
		font-size: 0.86rem;
		opacity: 0.9;
	}
	.impact {
		padding: 0.65rem 0.75rem;
		border-radius: 6px;
		border-left: 4px solid var(--is-primary, #5b8def);
		background: var(--is-surface-container, rgba(91, 141, 239, 0.08));
		font-size: 0.88rem;
		line-height: 1.45;
	}
	.footer-note {
		margin: 0;
		opacity: 0.55;
	}
</style>
