<script lang="ts">
	import { marked } from "marked";
	import Accordion from "$comps/ui/containers/Accordion.svelte";

	export let title: string = "";
	export let mdSource: string;
	export let open: boolean = false;
	export let flat: boolean = false;
	export let inner: boolean = false;

	marked.setOptions({ gfm: true, breaks: false });

	$: html = marked.parse(mdSource ?? "") as string;
</script>

{#if flat}
	<div class="bitacora-md">
		{@html html}
	</div>
{:else}
	<Accordion {title} titleIcon="mdi:notebook-edit-outline" bind:open {inner}>
		<div class="bitacora-md">
			{@html html}
		</div>
	</Accordion>
{/if}

<style>
	.bitacora-md {
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--is-on-surface, inherit);
		max-width: 100%;
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.bitacora-md :global(h1),
	.bitacora-md :global(h2),
	.bitacora-md :global(h3),
	.bitacora-md :global(h4) {
		margin: 1.2em 0 0.5em;
		font-weight: 600;
		line-height: 1.25;
	}
	.bitacora-md :global(h1) {
		font-size: 1.45rem;
	}
	.bitacora-md :global(h2) {
		font-size: 1.25rem;
		border-bottom: 1px solid var(--is-outline, #ccc);
		padding-bottom: 0.25rem;
	}
	.bitacora-md :global(h3) {
		font-size: 1.1rem;
	}
	.bitacora-md :global(h4) {
		font-size: 1rem;
	}
	.bitacora-md :global(p) {
		margin: 0.6em 0;
	}
	.bitacora-md :global(ul),
	.bitacora-md :global(ol) {
		margin: 0.6em 0;
		padding-left: 1.6em;
	}
	.bitacora-md :global(li) {
		margin: 0.25em 0;
	}
	.bitacora-md :global(code) {
		font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
		font-size: 0.88em;
		background: var(--is-surface-container, rgba(127, 127, 127, 0.12));
		padding: 0.1em 0.35em;
		border-radius: 4px;
	}
	.bitacora-md :global(pre) {
		background: var(--is-surface-container, rgba(127, 127, 127, 0.12));
		padding: 0.85em 1em;
		border-radius: 6px;
		overflow-x: auto;
		font-size: 0.85rem;
		line-height: 1.45;
	}
	.bitacora-md :global(pre code) {
		background: transparent;
		padding: 0;
		font-size: inherit;
	}
	.bitacora-md :global(blockquote) {
		margin: 0.8em 0;
		padding: 0.4em 0.9em;
		border-left: 4px solid var(--is-primary, #5b8def);
		background: var(--is-surface-container, rgba(91, 141, 239, 0.08));
	}
	.bitacora-md :global(table) {
		border-collapse: collapse;
		margin: 0.8em 0;
		width: 100%;
		font-size: 0.9rem;
		display: block;
		overflow-x: auto;
	}
	.bitacora-md :global(th),
	.bitacora-md :global(td) {
		border: 1px solid var(--is-outline, #ccc);
		padding: 0.4em 0.7em;
		text-align: left;
	}
	.bitacora-md :global(th) {
		background: var(--is-surface-container, rgba(127, 127, 127, 0.08));
		font-weight: 600;
	}
	.bitacora-md :global(hr) {
		border: 0;
		border-top: 1px solid var(--is-outline, #ccc);
		margin: 1.2em 0;
	}
	.bitacora-md :global(a) {
		color: var(--is-primary, #5b8def);
		text-decoration: underline;
	}
</style>
