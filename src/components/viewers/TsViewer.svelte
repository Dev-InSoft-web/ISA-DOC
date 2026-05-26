<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { EditorView, lineNumbers } from "@codemirror/view";
	import { EditorState } from "@codemirror/state";
	import { javascript } from "@codemirror/lang-javascript";
	import { defaultHighlightStyle, syntaxHighlighting, foldGutter, HighlightStyle } from "@codemirror/language";
	import { oneDark, oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
	import { tags as t } from "@lezer/highlight";

	export let value: string = "";
	export let height: string = "300px";

	let host: HTMLDivElement;
	let view: EditorView | null = null;

	const tsHighlight = HighlightStyle.define([
		{ tag: t.keyword, color: "#c586c0" },
		{ tag: [t.controlKeyword, t.moduleKeyword, t.definitionKeyword], color: "#569cd6" },
		{ tag: [t.string, t.special(t.string)], color: "#ce9178" },
		{ tag: [t.number, t.bool, t.null], color: "#b5cea8" },
		{ tag: t.comment, color: "#6a9955", fontStyle: "italic" },
		{ tag: t.function(t.variableName), color: "#dcdcaa" },
		{ tag: [t.typeName, t.className], color: "#4ec9b0" },
		{ tag: t.variableName, color: "#9cdcfe" },
		{ tag: t.propertyName, color: "#9cdcfe" },
		{ tag: t.operator, color: "#d4d4d4" },
		{ tag: t.invalid, color: "#f44747" },
	]);

	onMount(() => {
		view = new EditorView({
			parent: host,
			state: EditorState.create({
				doc: value ?? "",
				extensions: [
					lineNumbers(),
					foldGutter(),
					javascript({ typescript: true }),
					oneDark,
					syntaxHighlighting(tsHighlight),
					syntaxHighlighting(oneDarkHighlightStyle),
					syntaxHighlighting(defaultHighlightStyle),
					EditorView.editable.of(false),
					EditorState.readOnly.of(true),
					EditorView.theme({ "&": { height, fontSize: "0.78rem" } }),
				],
			}),
		});
	});

	$: if (view) {
		const next = value ?? "";
		const cur = view.state.doc.toString();
		if (next !== cur) view.dispatch({ changes: { from: 0, to: cur.length, insert: next } });
	}

	onDestroy(() => { view?.destroy(); view = null; });
</script>

<div class="cm-host" bind:this={host}></div>

<style>
	.cm-host {
		height: 100%;
		min-height: 0;
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.cm-host :global(.cm-editor) { border-radius: 6px; flex: 1 1 auto; min-height: 0; max-height: 100%; }
	.cm-host :global(.cm-scroller) {
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--is-primary) 55%, transparent) transparent;
	}
	.cm-host :global(.cm-scroller::-webkit-scrollbar) { width: 8px; height: 8px; }
	.cm-host :global(.cm-scroller::-webkit-scrollbar-thumb) {
		background: color-mix(in srgb, var(--is-primary) 55%, transparent);
		border-radius: 6px;
		border: 2px solid transparent;
		background-clip: padding-box;
	}
	.cm-host :global(.cm-scroller::-webkit-scrollbar-thumb:hover) {
		background: var(--is-primary);
		background-clip: padding-box;
		border: 2px solid transparent;
	}
	.cm-host :global(.cm-scroller::-webkit-scrollbar-track) { background: transparent; }
</style>
