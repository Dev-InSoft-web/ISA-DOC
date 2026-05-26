<script lang="ts">
	import { Modal } from "@ingenieria_insoft/ispsveltecomponents";
	import { formatearUsd } from "../../lib/patyia/openaiPricing";

	export let bshow: boolean = false;
	export let src: string = "";
	export let alt: string = "";
	export let metadata: Record<string, string | number | null | undefined> = {};

	function onClose() {
		bshow = false;
	}

	function entradas(obj: Record<string, string | number | null | undefined>): Array<[string, string]> {
		const out: Array<[string, string]> = [];
		for (const k of Object.keys(obj)) {
			const v = obj[k];
			if (v == null || v === "") continue;
			out.push([k, String(v)]);
		}
		return out;
	}

	$: filas = entradas(metadata);
	$: costo = typeof metadata.costoUsd === "number" ? formatearUsd(metadata.costoUsd) : null;
</script>

{#if bshow}
	<Modal bind:bshow {onClose}>
		<h3 slot="title">{alt || "Imagen"}</h3>
		<div class="iv-body custom-scrollbar">
			<div class="iv-img-wrap">
				<a href={src} target="_blank" rel="noopener noreferrer" title="Abrir en nueva pesta\u00f1a">
					<img src={src} alt={alt} />
				</a>
			</div>
			<aside class="iv-meta">
				<h4>Metadatos</h4>
				{#if costo}
					<div class="iv-costo">Costo estimado: <strong>{costo}</strong></div>
				{/if}
				<table>
					<tbody>
						{#each filas as [k, v]}
							<tr>
								<th>{k}</th>
								<td><code>{v}</code></td>
							</tr>
						{/each}
					</tbody>
				</table>
				<div class="iv-actions">
					<a class="iv-link" href={src} target="_blank" rel="noopener noreferrer">Abrir original</a>
					<a class="iv-link" href={src} download={alt || ""}>Descargar</a>
				</div>
			</aside>
		</div>
	</Modal>
{/if}

<style>
	.iv-body {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr);
		gap: 1rem;
		padding: 1rem 1.25rem 1.25rem;
		max-width: min(1100px, 92vw);
		max-height: 80vh;
		overflow: auto;
	}
	.iv-img-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		border-radius: 6px;
		overflow: hidden;
		min-height: 0;
	}
	.iv-img-wrap img {
		max-width: 100%;
		max-height: 70vh;
		height: auto;
		display: block;
	}
	.iv-meta {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		font-size: 0.85rem;
	}
	.iv-meta h4 {
		margin: 0;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
	}
	.iv-costo {
		padding: 0.4rem 0.6rem;
		background: color-mix(in srgb, var(--is-primary), transparent 85%);
		border: 1px solid color-mix(in srgb, var(--is-primary), transparent 60%);
		border-radius: 4px;
	}
	.iv-meta table { width: 100%; border-collapse: collapse; }
	.iv-meta th,
	.iv-meta td {
		text-align: left;
		vertical-align: top;
		padding: 0.3rem 0.5rem;
		border-bottom: 1px solid rgba(255,255,255,0.08);
		font-size: 0.78rem;
	}
	.iv-meta th {
		font-weight: 500;
		opacity: 0.7;
		text-transform: capitalize;
		width: 38%;
	}
	.iv-meta code {
		font-size: 0.74rem;
		padding: 0.05rem 0.3rem;
		background: rgba(255,255,255,0.06);
		border-radius: 3px;
		word-break: break-all;
	}
	.iv-actions {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.25rem;
		flex-wrap: wrap;
	}
	.iv-link {
		font-size: 0.8rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid color-mix(in srgb, var(--is-primary), transparent 60%);
		border-radius: 4px;
		color: color-mix(in srgb, var(--is-primary), white 20%);
		text-decoration: none;
	}
	.iv-link:hover {
		background: color-mix(in srgb, var(--is-primary), transparent 85%);
	}
	@media (max-width: 760px) {
		.iv-body { grid-template-columns: 1fr; }
	}
</style>
