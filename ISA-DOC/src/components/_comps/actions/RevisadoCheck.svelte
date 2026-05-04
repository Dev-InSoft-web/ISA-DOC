<script lang="ts">
	import { CheckboxIcon, Iconify } from "@ingenieria_insoft/ispsveltecomponents";
	import { revisadoStore, setRevisado, setRevisadoMany } from "../../../lib/bitacora/revisadoStore";
	import ConfirmDialog from "../overlays/ConfirmDialog.svelte";

	export let key: string = "";
	export let keys: string[] = [];
	export let titleTrue: string = "Desmarcar";
	export let titleFalse: string = "Marcar como revisada";
	export let titleIndeterminate: string = "Marcar todas como revisadas";

	$: aggregate = keys.length > 0;
	$: effectiveKeys = aggregate ? keys : (key ? [key] : []);
	$: trueCount = effectiveKeys.reduce((acc, k) => acc + ($revisadoStore[k] ? 1 : 0), 0);
	$: total = effectiveKeys.length;
	$: allTrue = total > 0 && trueCount === total;
	$: anyTrue = trueCount > 0;
	$: indeterminate = aggregate && anyTrue && !allTrue;
	$: titleAttr = allTrue ? titleTrue : (indeterminate ? titleIndeterminate : titleFalse);

	let confirmOpen: boolean = false;
	let pendingTrueCount: number = 0;
	let pendingTotal: number = 0;
	let pendingKeys: string[] = [];

	function stopOnly(e: Event): void {
		e.stopPropagation();
	}

	function applyToggle(): void {
		// Sólo afecta a las keys propias (hijos directos del accordeon).
		if (indeterminate) {
			pendingKeys = effectiveKeys.slice();
			pendingTrueCount = trueCount;
			pendingTotal = total;
			confirmOpen = true;
			return;
		}
		const next = !allTrue;
		if (aggregate) setRevisadoMany(effectiveKeys, next);
		else if (key) setRevisado(key, next);
	}

	function confirmMarkAll(): void {
		setRevisadoMany(pendingKeys, true);
	}

	function confirmUnmarkAll(): void {
		setRevisadoMany(pendingKeys, false);
	}

	function handleClick(e: MouseEvent): void {
		e.stopPropagation();
		e.preventDefault();
		applyToggle();
	}

	function handleKey(e: KeyboardEvent): void {
		e.stopPropagation();
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			applyToggle();
		}
	}
</script>

<span
	class="revisado-check"
	role="presentation"
	on:click={handleClick}
	on:keydown={handleKey}
	on:mousedown={stopOnly}
	title={titleAttr}
>
	<CheckboxIcon
		checked={allTrue}
		color="success"
		colorFalse={indeterminate ? "warning" : "neutral"}
		style_wrap_icon="font-size: 1.2em; line-height: 1;"
	>
		<Iconify slot="iconTrue" icon="mdi:check-circle" />
		<Iconify
			slot="iconFalse"
			icon={indeterminate ? "mdi:minus-circle-outline" : "mdi:circle-outline"}
		/>
	</CheckboxIcon>
</span>

<ConfirmDialog
	bind:open={confirmOpen}
	title="Estado mixto"
	kind="warning"
	message={`Hay ${pendingTrueCount} de ${pendingTotal} elementos marcados.\n¿Qué deseas hacer?`}
	confirmText="Marcar todos"
	cancelText="Desmarcar todos"
	neutralText="Cancelar"
	onConfirm={confirmMarkAll}
	onCancel={confirmUnmarkAll}
	onDismiss={() => {}}
/>

<style>
	.revisado-check {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
	}
</style>
