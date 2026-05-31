<script lang="ts">
	import { ButtonIconify } from "@ingenieria_insoft/ispsveltecomponents";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";

	type MaybePromise<T> = T | Promise<T>;
	type ButtonVariant = "solid" | "soft" | "ghost" | "outlined" | "text";
	type CopyGetter = () => MaybePromise<string>;

	export let text: string = "";
	export let getText: CopyGetter | undefined = undefined;
	export let icon: string = "mdi:content-copy";
	export let successIcon: string = "mdi:check";
	export let title: string = "Copiar";
	export let successTitle: string = "Copiado";
	export let variant: ButtonVariant | undefined = undefined;
	export let successVariant: ButtonVariant | undefined = undefined;
	export let disabled: boolean = false;
	export let flashMs: number = 1600;

	let copied = false;
	let busy = false;
	let mounted = false;
	let timer: number | undefined;

	const dispatch = createEventDispatcher<{ copied: string; error: unknown }>();

	async function copyToClipboard(value: string): Promise<void> {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(value);
			return;
		}

		const textarea = document.createElement("textarea");
		textarea.value = value;
		textarea.setAttribute("readonly", "");
		textarea.style.position = "fixed";
		textarea.style.left = "-9999px";
		document.body.appendChild(textarea);
		textarea.select();
		const ok = document.execCommand("copy");
		document.body.removeChild(textarea);
		if (!ok) throw new Error("No se pudo copiar al portapapeles");
	}

	function flashCopied(): void {
		copied = true;
		if (timer) window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			copied = false;
		}, flashMs);
	}

	async function copy(): Promise<void> {
		if (busy || disabled) return;
		busy = true;
		try {
			const value = getText ? await getText() : text;
			await copyToClipboard(value);
			flashCopied();
			dispatch("copied", value);
		} catch (error) {
			dispatch("error", error);
		} finally {
			busy = false;
		}
	}

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		if (timer && typeof window !== "undefined") window.clearTimeout(timer);
	});
</script>

{#if mounted}
	<ButtonIconify
		icon={copied ? successIcon : icon}
		color={copied ? "success" : undefined}
		variant={copied && successVariant ? successVariant : variant}
		title={copied ? successTitle : title}
		disabled={disabled || busy}
		on:click={copy}
	/>
{/if}