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
	export let confirmVariant: "solid" | "outlined" | "ghost" | "text" = "solid";
	export let cancelVariant: "solid" | "outlined" | "ghost" | "text" = "outlined";
	export let neutralVariant: "solid" | "outlined" | "ghost" | "text" = "text";
	export let confirmColorOverride: "primary" | "neutral" | "success" | "warning" | "danger" | "" = "";
	export let cancelColorOverride: "primary" | "neutral" | "success" | "warning" | "danger" | "" = "";
	export let neutralColorOverride: "primary" | "neutral" | "success" | "warning" | "danger" | "" = "";
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

	$: confirmColor = (confirmColorOverride || (kind === "danger" ? "danger" : kind === "info" ? "primary" : "warning")) as "danger" | "primary" | "warning" | "neutral" | "success";
	$: cancelColor = (cancelColorOverride || "neutral") as "danger" | "primary" | "warning" | "neutral" | "success";
	$: neutralColor = (neutralColorOverride || "neutral") as "danger" | "primary" | "warning" | "neutral" | "success";
	$: titleIcon = kind === "danger" ? "mdi:alert-octagon-outline" : kind === "info" ? "mdi:information-outline" : "mdi:alert-outline";
</script>

<Modal bind:bshow={open} onClose={handleDismiss} style="min-width: 360px; max-width: 560px;">
	<FlexLayout slot="title" items="center" style="color: var(--is-primary);">
		<Iconify icon={titleIcon} />
		<H4 style="color: var(--is-primary); margin: 0;">{title}</H4>
	</FlexLayout>
	<FlexLayout direction="column" style="padding: 1.25rem 1.5rem 1rem;">
		<Text>
			{#each message.split("\n") as line}
				<div style="text-align: center;"><small>{line}</small></div>
			{/each}
		</Text>
		<hr style="border: none; border-top: 1px solid var(--is-b-color); margin: 0.75rem 0; opacity: 0.6;" />
		<FlexLayout justify="end" items="center">
			{#if neutralText}
				<div class="btn-fit"><Button variant={neutralVariant} color={neutralColor} on:click={handleNeutral}>{neutralText}</Button></div>
			{/if}
			<div class="btn-fit"><Button variant={cancelVariant} color={cancelColor} on:click={handleCancel}>{cancelText}</Button></div>
			<div class="btn-fit"><Button variant={confirmVariant} color={confirmColor} on:click={handleConfirm}>{confirmText}</Button></div>
		</FlexLayout>
	</FlexLayout>
</Modal>

<style>
	.btn-fit {
		display: inline-flex;
		width: fit-content;
	}
	.btn-fit :global(button) {
		width: fit-content;
		padding-left: 1rem;
		padding-right: 1rem;
	}
</style>
