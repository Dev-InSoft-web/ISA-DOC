<script lang="ts">
	import { Form, Input } from "$lib";
	import Button from "$lib/primitives/iconized/Button.svelte";
	import { fly } from "svelte/transition";

	let visible: boolean = false;
</script>

<article>
	<button on:click={() => (visible = !visible)}>
		Formulario {visible ? "▲" : "▼"}
	</button>
	{#if visible}
		<div in:fly={{ y: -50 }}>
			<h3>Previsualizacion</h3>
			<Form itdForm="edit" onSubmit={() => {}} onCancel={() => {}}>
				<h2 slot="header">Titulo del formulario</h2>
				<div slot="content">
					<Input label="Campos del formulario" />
				</div>
				<Button slot="pre-buttons">Pre-Boton</Button>
				<Button slot="post-buttons">Post-Boton</Button>
			</Form>
		</div>
	{/if}
</article>
