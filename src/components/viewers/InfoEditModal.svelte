<!--
	Modal editable de información (descripción + reglas) para un nodo o
	para el panel completo. Persistencia delegada al padre vía
	`bind:description` / `bind:rules` y evento `on:save`.
-->
<script lang="ts">
	import { Button, ButtonIconify, Modal, RichEditor, toastError } from "@ingenieria_insoft/ispsveltecomponents";
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
		const desc = (draftDescription ?? "").replace(/<[^>]*>/g, "").trim();
		if (!desc) {
			toastError("La descripción es obligatoria.");
			return;
		}
		description = draftDescription;
		rules = draftRules;
		dispatch("save", { description: draftDescription, rules: draftRules });
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
		<h2 slot="title" class="info-title">{title}</h2>
		<div class="info-modal-body">
			<RichEditor bind:value={draftDescription} label="Descripción *" />
			<RichEditor bind:value={draftRules} label="Reglas (opcional)" />
			<div class="info-actions">
				<Button variant="outlined" color="neutral" onClick={close}>Cancelar</Button>
				<Button variant="solid" color="primary" onClick={save}>Guardar</Button>
			</div>
		</div>
	</Modal>
{/if}

<style>
	.info-modal-body { display: flex; flex-direction: column; gap: 0.75rem; padding: 0.5rem; }
	.info-title { margin: 0; font-size: 1.1rem; padding: 0.5rem 0; }
	.info-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem; }
</style>
