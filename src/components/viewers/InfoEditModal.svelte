<!--
	Modal editable de información (descripción + reglas) para un nodo o
	para el panel completo. Persistencia delegada al padre vía
	`bind:description` / `bind:rules` y evento `on:save`.
-->
<script lang="ts">
	import { ButtonIconify, Modal, Text, toastError } from "@ingenieria_insoft/ispsveltecomponents";
	import { createEventDispatcher } from "svelte";

	export let title: string = "Información";
	export let description: string = "";
	export let rules: string = "";
	export let buttonTitle: string = "Información";

	const dispatch = createEventDispatcher<{ save: { description: string; rules: string } }>();

	let bshow = false;
	let draftDescription = "";
	let draftRules = "";

	function open(): void {
		draftDescription = description;
		draftRules = rules;
		bshow = true;
	}

	function close(): void { bshow = false; }

	function save(): void {
		const desc = (draftDescription ?? "").trim();
		if (!desc) {
			toastError("La descripción es obligatoria.");
			return;
		}
		description = desc;
		rules = draftRules;
		dispatch("save", { description: desc, rules: draftRules });
		bshow = false;
	}
</script>

<ButtonIconify
	icon="mdi:information-outline"
	color="primary"
	variant="text"
	title={buttonTitle}
	on:click={open}
/>

{#if bshow}
	<Modal bind:bshow onClose={close} style="width: 80dvw; max-width: 720px;">
		<div class="info-modal-body">
			<h2 class="info-title">{title}</h2>
			<label class="info-field">
				<Text color="neutral"><small>Descripción <span style="color: var(--is-error);">*</span></small></Text>
				<textarea class="info-input" rows="4" required bind:value={draftDescription} placeholder="Describe el propósito y contenido de este elemento."></textarea>
			</label>
			<label class="info-field">
				<Text color="neutral"><small>Reglas <span style="opacity: 0.6;">(opcional)</span></small></Text>
				<textarea class="info-input" rows="6" bind:value={draftRules} placeholder="Reglas de negocio, restricciones e invariantes."></textarea>
			</label>
			<div class="info-actions">
				<button type="button" class="btn-cancel" on:click={close}>Cancelar</button>
				<button type="button" class="btn-save" on:click={save}>Guardar</button>
			</div>
		</div>
	</Modal>
{/if}

<style>
	.info-modal-body { display: flex; flex-direction: column; gap: 0.75rem; padding: 0.5rem; }
	.info-title { margin: 0 0 0.5rem 0; font-size: 1.1rem; }
	.info-field { display: flex; flex-direction: column; gap: 0.25rem; }
	.info-input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem;
		font-family: inherit;
		font-size: 0.9rem;
		border: 1px solid var(--is-color-border, #ccc);
		border-radius: 0.25rem;
		resize: vertical;
	}
	.info-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem; }
	.btn-cancel, .btn-save {
		padding: 0.4rem 0.9rem;
		border: 1px solid var(--is-color-border, #ccc);
		border-radius: 0.25rem;
		cursor: pointer;
		font-family: inherit;
		font-size: 0.9rem;
	}
	.btn-save { background: var(--is-color-primary, #2563eb); color: #fff; border-color: transparent; }
</style>
