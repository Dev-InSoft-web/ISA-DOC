<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { EditorView, lineNumbers } from "@codemirror/view";
	import { EditorState } from "@codemirror/state";
	import { json } from "@codemirror/lang-json";
	import { syntaxHighlighting, HighlightStyle, foldGutter } from "@codemirror/language";
	import { tags as t } from "@lezer/highlight";

	export let value: string = "";
	export let height: string = "320px";

	let host: HTMLDivElement;
	let view: EditorView | null = null;

	// Tema VS Code Dark+ (fondo #1e1e1e)
	const vsCodeDark = EditorView.theme(
		{
			"&": { color: "#d4d4d4", backgroundColor: "#1e1e1e" },
			".cm-content": { caretColor: "#aeafad" },
			".cm-cursor, .cm-dropCursor": { borderLeftColor: "#aeafad" },
			"&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
				backgroundColor: "#264f78",
			},
			".cm-gutters": {
				backgroundColor: "#1e1e1e",
				color: "#858585",
				border: "none",
			},
			".cm-activeLineGutter": { backgroundColor: "#2a2d2e", color: "#c6c6c6" },
			".cm-activeLine": { backgroundColor: "#2a2d2e" },
			".cm-foldPlaceholder": { backgroundColor: "transparent", border: "none", color: "#858585" },
			".cm-scroller": { fontFamily: 'ui-monospace, "Cascadia Code", Menlo, monospace' },
		},
		{ dark: true },
	);

	const vsCodeHighlight = HighlightStyle.define([
		{ tag: t.propertyName, color: "#9cdcfe" },
		{ tag: [t.string, t.special(t.string)], color: "#ce9178" },
		{ tag: [t.number, t.bool, t.null], color: "#b5cea8" },
		{ tag: t.bool, color: "#569cd6" },
		{ tag: t.null, color: "#569cd6" },
		{ tag: [t.keyword, t.operator], color: "#569cd6" },
		{ tag: [t.punctuation, t.bracket, t.squareBracket, t.brace, t.separator], color: "#d4d4d4" },
		{ tag: t.comment, color: "#6a9955", fontStyle: "italic" },
		{ tag: t.invalid, color: "#f44747" },
	]);

	function pretty(raw: string): string {
		const src = (raw ?? "").trim();
		if (!src) return "";
		try { return JSON.stringify(JSON.parse(src), null, 2); }
		catch { return src; }
	}

	onMount(() => {
		view = new EditorView({
			parent: host,
			state: EditorState.create({
				doc: pretty(value),
				extensions: [
					lineNumbers(),
					foldGutter(),
					json(),
					vsCodeDark,
					syntaxHighlighting(vsCodeHighlight),
					EditorView.editable.of(false),
					EditorView.theme({ "&": { height, fontSize: "0.78rem" } }),
				],
			}),
		});
	});

	$: if (view) {
		const next = pretty(value);
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
	.cm-host :global(.cm-scroller) { overflow: auto; }
</style>
