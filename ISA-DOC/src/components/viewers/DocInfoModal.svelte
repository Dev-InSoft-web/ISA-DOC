<!--
	Bot\u00f3n de informaci\u00f3n + modal que muestra documentaci\u00f3n contextual del
	\u00e1rbol/nodo. Pensado para humanos y como contrato para agentes IA.

	Props:
	- `query`: par\u00e1metros que se pasan a `/api/tables/doc` (ej. `{ table: "X" }`).
	- `label`: t\u00edtulo del modal.
-->
<script lang="ts">
	import { ButtonIconify, Modal, Text } from "@ingenieria_insoft/ispsveltecomponents";

	export let query: Record<string, string> = {};
	export const label: string = "Documentaci\u00f3n";
	export let title: string = "Documentaci\u00f3n";

	let bshow = false;
	let loading = false;
	let payload: Record<string, unknown> | null = null;
	let errorMsg: string = "";

	$: queryString = new URLSearchParams(query).toString();

	async function open(): Promise<void> {
		bshow = true;
		errorMsg = "";
		payload = null;
		loading = true;
		try {
			const r = await fetch(`/api/tables/doc${queryString ? `?${queryString}` : ""}`);
			const data = await r.json();
			if (!r.ok || data.ok === false) {
				errorMsg = String(data.error ?? `HTTP ${r.status}`);
			} else {
				payload = data;
			}
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	}

	function close(): void { bshow = false; }

	function asArray(v: unknown): string[] {
		return Array.isArray(v) ? v.map((x) => String(x)) : [];
	}
	function asObj(v: unknown): Record<string, unknown> | null {
		return v && typeof v === "object" ? v as Record<string, unknown> : null;
	}
</script>

<ButtonIconify
	icon="mdi:information-outline"
	color="primary"
	variant="text"
	on:click={open}
/>

{#if bshow}
	<Modal bind:bshow onClose={close} style="width: 80dvw; max-width: 900px;">
		<div class="doc-modal-body">
			<h2 class="doc-title">{title}</h2>
			{#if loading}
				<Text color="neutral">Cargando documentaci\u00f3n\u2026</Text>
			{:else if errorMsg}
				<Text color="danger">{errorMsg}</Text>
			{:else if payload}
				{@const treeDoc = asObj(payload.treeDoc)}
				{@const rootDoc = asObj(payload.rootDoc)}
				{@const nodeDoc = asObj(payload.doc)}
				{@const tableMeta = asObj(payload.tableMeta)}

				{#if tableMeta}
					<section class="doc-section">
						<h3>Metadatos</h3>
						<dl>
							<dt>Tabla</dt><dd>{payload.tableRef ?? ""}</dd>
							{#if tableMeta.effectivePrefix}<dt>Prefijo efectivo</dt><dd>{tableMeta.effectivePrefix}</dd>{/if}
							{#if tableMeta.originalName}<dt>Nombre original</dt><dd>{tableMeta.originalName}</dd>{/if}
						</dl>
					</section>
				{/if}

				{#if treeDoc?.description}
					<section class="doc-section">
						<h3>Descripci\u00f3n del \u00e1rbol</h3>
						<p>{treeDoc.description}</p>
					</section>
				{/if}

				{#if asArray(treeDoc?.rules).length}
					<section class="doc-section">
						<h3>Reglas globales</h3>
						<ul>
							{#each asArray(treeDoc?.rules) as r}<li>{r}</li>{/each}
						</ul>
					</section>
				{/if}

				{#if treeDoc?.entities}
					<section class="doc-section">
						<h3>Entidades</h3>
						{#each Object.entries(asObj(treeDoc.entities) ?? {}) as [k, v]}
							{@const ent = asObj(v)}
							<div class="entity">
								<h4><code>{k}</code> {#if ent?.label}\u2014 {ent.label}{/if}</h4>
								{#if ent?.description}<p>{ent.description}</p>{/if}
								{#if asArray(ent?.rules).length}
									<ul>{#each asArray(ent?.rules) as r}<li>{r}</li>{/each}</ul>
								{/if}
								{#if ent?.objShape}
									<p><small>Forma de <code>obj</code>:</small></p>
									<ul class="shape">
										{#each Object.entries(asObj(ent.objShape) ?? {}) as [field, type]}
											<li><code>{field}</code>: <em>{type}</em></li>
										{/each}
									</ul>
								{/if}
							</div>
						{/each}
					</section>
				{/if}

				{#if rootDoc}
					<section class="doc-section">
						<h3>Ra\u00edz</h3>
						{#if rootDoc.description}<p>{rootDoc.description}</p>{/if}
						{#if asArray(rootDoc.rules).length}
							<ul>{#each asArray(rootDoc.rules) as r}<li>{r}</li>{/each}</ul>
						{/if}
					</section>
				{/if}

				{#if nodeDoc}
					<section class="doc-section">
						<h3>Documentaci\u00f3n del nodo</h3>
						{#if nodeDoc.description}<p>{nodeDoc.description}</p>{/if}
						{#if asArray(nodeDoc.rules).length}
							<h4>Reglas</h4>
							<ul>{#each asArray(nodeDoc.rules) as r}<li>{r}</li>{/each}</ul>
						{/if}
						{#if asArray(nodeDoc.notes).length}
							<h4>Notas</h4>
							<ul>{#each asArray(nodeDoc.notes) as r}<li>{r}</li>{/each}</ul>
						{/if}
					</section>
				{/if}

				{#if !treeDoc && !rootDoc && !nodeDoc && !tableMeta}
					<Text color="neutral">No hay documentaci\u00f3n redactada para este \u00e1mbito.</Text>
				{/if}
			{/if}
		</div>
	</Modal>
{/if}

<style>
	.doc-modal-body {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		max-height: 75vh;
		overflow: auto;
		padding: 0.5rem 0.6rem;
	}
	.doc-title { margin: 0 0 0.25rem 0; font-size: 1.15rem; }
	.doc-section h3 {
		margin: 0 0 0.4rem 0;
		font-size: 1rem;
	}
	.doc-section h4 {
		margin: 0.6rem 0 0.25rem 0;
		font-size: 0.92rem;
	}
	.doc-section p { margin: 0 0 0.35rem 0; line-height: 1.45; }
	.doc-section ul { margin: 0 0 0.35rem 1.1rem; padding: 0; }
	.doc-section ul.shape { font-size: 0.88rem; color: #555; }
	.doc-section dl { display: grid; grid-template-columns: max-content 1fr; gap: 0.15rem 0.6rem; margin: 0; }
	.doc-section dt { font-weight: 600; }
	.entity { padding: 0.4rem 0.5rem; border-left: 3px solid #e2e2e2; margin-bottom: 0.45rem; }
	.entity h4 { margin: 0 0 0.25rem 0; }
	code { background: #f3f3f3; padding: 0 0.25rem; border-radius: 3px; }
</style>
