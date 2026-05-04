<script lang="ts" context="module">
	export type ConfirmKind = "info" | "warning" | "danger";
</script>

<script lang="ts">
	import { Modal, FlexLayout, H4, Text, Button, Iconify } from "@ingenieria_insoft/ispsveltecomponents";

	export let open: boolean = false;
	export let title: string = "Confirmar";
	export let message: string = "";
	export let confirmText: string = "Sí";
	export let cancelText: string = "Cancelar";
	export let neutralText: string = "";
	export let kind: ConfirmKind = "warning";
	export let onConfirm: () => void = () => {};
	export let onCancel: () => void = () => {};
	export let onNeutral: () => void = () => {};
	export let onDismiss: (() => void) | null = null;

	function handleConfirm(): void {
		open = false;
		onConfirm();
	}

	function handleCancel(): void {
		open = false;
		onCancel();
	}

	function handleNeutral(): void {
		open = false;
		onNeutral();
	}

	function handleDismiss(): void {
		open = false;
		(onDismiss ?? onCancel)();
	}

	$: confirmColor = (kind === "danger" ? "danger" : kind === "info" ? "primary" : "warning") as "danger" | "primary" | "warning";
	$: titleIcon = kind === "danger" ? "mdi:alert-octagon-outline" : kind === "info" ? "mdi:information-outline" : "mdi:alert-outline";
</script>

<Modal bind:bshow={open} onClose={handleDismiss} style="min-width: 320px; max-width: 520px;">
	<FlexLayout slot="title" items="center" style="color: var(--is-primary);">
		<Iconify icon={titleIcon} />
		<H4 style="color: var(--is-primary); margin: 0;">{title}</H4>
	</FlexLayout>
	<FlexLayout direction="column">
		<Text>
			{#each message.split("\n") as line}
				<div style="text-align: center;"><small>{line}</small></div>
			{/each}
		</Text>
		<hr style="border: none; border-top: 1px solid var(--is-b-color); margin: 0.25rem 0 0.75rem; opacity: 0.6;" />
		<FlexLayout justify="end" items="center">
			{#if neutralText}
				<Button variant="text" color="neutral" on:click={handleNeutral}>{neutralText}</Button>
			{/if}
			<Button variant="outlined" color="neutral" on:click={handleCancel}>{cancelText}</Button>
			<Button color="primary" on:click={handleConfirm}>{confirmText}</Button>
		</FlexLayout>
	</FlexLayout>
</Modal>
