<script lang="ts">
	// Botón compuesto reutilizable: candado (toggle) + play (ejecutar).
	// Réplica del patrón usado en TreeSQLTables (.run-group).
	import { ButtonIconify } from "@ingenieria_insoft/ispsveltecomponents";
	import { createEventDispatcher } from "svelte";

	export let unlocked: boolean = false;
	export let busy: boolean = false;
	export let disabled: boolean = false;
	export let runTitle: string = "Ejecutar";
	export let lockTitle: string = "Desbloquear ejecución";
	export let unlockTitle: string = "Bloquear ejecución";

	const dispatch = createEventDispatcher<{ run: void; toggle: boolean }>();

	function toggle(): void {
		unlocked = !unlocked;
		dispatch("toggle", unlocked);
	}

	function run(): void {
		if (!unlocked || busy || disabled) return;
		dispatch("run");
	}
</script>

<div class="run-group">
	<ButtonIconify
		icon={unlocked ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"}
		title={unlocked ? unlockTitle : lockTitle}
		on:click={toggle}
	/>
	<ButtonIconify
		color="success"
		icon={busy ? "mdi:loading" : "mdi:play"}
		title={runTitle}
		disabled={!unlocked || busy || disabled}
		on:click={run}
	/>
</div>

<style>
	.run-group {
		display: inline-flex;
		align-items: center;
		gap: 0.15rem;
		border: 1px solid var(--is-b-color);
		border-radius: 999px;
		padding: 0.1rem 0.25rem;
	}
</style>
