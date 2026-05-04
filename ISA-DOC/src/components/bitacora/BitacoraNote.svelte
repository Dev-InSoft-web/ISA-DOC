<script lang="ts">
	import { marked } from "marked";
	import Accordion from "../_comps/containers/Accordion.svelte";

	export let title: string = "";
	export let mdSource: string;
	export let open: boolean = false;
	export let flat: boolean = false;

	marked.setOptions({ gfm: true, breaks: false });

	$: html = marked.parse(mdSource ?? "") as string;
</script>

{#if flat}
	<div class="bitacora-md">
		{@html html}
	</div>
{:else}
	<Accordion {title} titleIcon="mdi:notebook-edit-outline" bind:open>
		<div class="bitacora-md">
			{@html html}
		</div>
	</Accordion>
{/if}

<style>
	:global {
		.bitacora-md {
			font-size: 0.95rem;
			line-height: 1.55;
			color: var(--is-on-surface, inherit);

			h1, h2, h3, h4 {
				margin: 1.2em 0 0.5em;
				font-weight: 600;
				line-height: 1.25;
			}
			h1 { font-size: 1.45rem; }
			h2 {
				font-size: 1.25rem;
				border-bottom: 1px solid var(--is-outline, #ccc);
				padding-bottom: 0.25rem;
			}
			h3 { font-size: 1.1rem; }
			h4 { font-size: 1rem; }

			p { margin: 0.6em 0; }

			ul, ol { margin: 0.6em 0; padding-left: 1.6em; }
			li { margin: 0.25em 0; }

			code {
				font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
				font-size: 0.88em;
				background: var(--is-surface-container, rgba(127, 127, 127, 0.12));
				padding: 0.1em 0.35em;
				border-radius: 4px;
			}

			pre {
				background: var(--is-surface-container, rgba(127, 127, 127, 0.12));
				padding: 0.85em 1em;
				border-radius: 6px;
				overflow-x: auto;
				font-size: 0.85rem;
				line-height: 1.45;

				code {
					background: transparent;
					padding: 0;
					font-size: inherit;
				}
			}

			blockquote {
				margin: 0.8em 0;
				padding: 0.4em 0.9em;
				border-left: 4px solid var(--is-primary, #5b8def);
				background: var(--is-surface-container, rgba(91, 141, 239, 0.08));
				color: inherit;
			}

			table {
				border-collapse: collapse;
				margin: 0.8em 0;
				width: 100%;
				font-size: 0.9rem;

				th, td {
					border: 1px solid var(--is-outline, #ccc);
					padding: 0.4em 0.7em;
					text-align: left;
				}
				th {
					background: var(--is-surface-container, rgba(127, 127, 127, 0.08));
					font-weight: 600;
				}
			}

			hr {
				border: 0;
				border-top: 1px solid var(--is-outline, #ccc);
				margin: 1.2em 0;
			}

			a {
				color: var(--is-primary, #5b8def);
				text-decoration: underline;
			}
		}
	}
</style>
