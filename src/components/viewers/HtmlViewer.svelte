<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { EditorView, lineNumbers } from "@codemirror/view";
	import { EditorState } from "@codemirror/state";
	import { html } from "@codemirror/lang-html";
	import { syntaxHighlighting, HighlightStyle, foldGutter, indentOnInput, bracketMatching } from "@codemirror/language";
	import { tags as t } from "@lezer/highlight";

	export let value: string = "";
	export let height: string = "70dvh";
	export let editable: boolean = false;

	let host: HTMLDivElement;
	let view: EditorView | null = null;
	let lastDispatchedText: string = "";

	const vsCodeDark = EditorView.theme(
		{
			"&": { color: "#d4d4d4", backgroundColor: "#1e1e1e" },
			".cm-content": { caretColor: "#aeafad" },
			".cm-cursor, .cm-dropCursor": { borderLeftColor: "#aeafad" },
			"&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
				backgroundColor: "#264f78",
			},
			".cm-gutters": { backgroundColor: "#1e1e1e", color: "#858585", border: "none" },
			".cm-activeLineGutter": { backgroundColor: "#2a2d2e", color: "#c6c6c6" },
			".cm-activeLine": { backgroundColor: "#2a2d2e" },
			".cm-foldPlaceholder": { backgroundColor: "transparent", border: "none", color: "#858585" },
			".cm-scroller": { fontFamily: 'ui-monospace, "Cascadia Code", Menlo, monospace' },
		},
		{ dark: true },
	);

	const vsCodeHighlight = HighlightStyle.define([
		{ tag: t.keyword, color: "#569cd6" },
		{ tag: [t.tagName, t.angleBracket], color: "#569cd6" },
		{ tag: t.attributeName, color: "#9cdcfe" },
		{ tag: [t.attributeValue, t.string, t.special(t.string)], color: "#ce9178" },
		{ tag: [t.number, t.bool, t.null], color: "#b5cea8" },
		{ tag: t.comment, color: "#6a9955", fontStyle: "italic" },
		{ tag: [t.processingInstruction, t.meta, t.documentMeta], color: "#808080" },
		{ tag: t.operator, color: "#d4d4d4" },
		{ tag: t.invalid, color: "#f44747" },
		{ tag: [t.punctuation, t.bracket, t.squareBracket, t.brace, t.separator], color: "#d4d4d4" },
	]);

	function dispatchUpdate(): void {
		if (!view) return;
		const cur = view.state.doc.toString();
		const next = value ?? "";
		if (next === cur) return;
		lastDispatchedText = next;
		view.dispatch({ changes: { from: 0, to: cur.length, insert: next } });
	}

	onMount(() => {
		view = new EditorView({
			parent: host,
			state: EditorState.create({
				doc: value ?? "",
				extensions: [
					lineNumbers(),
					foldGutter(),
					indentOnInput(),
					bracketMatching(),
					html(),
					vsCodeDark,
					syntaxHighlighting(vsCodeHighlight),
					EditorView.editable.of(editable),
					EditorView.lineWrapping,
					EditorView.theme({ "&": { height, fontSize: "0.78rem" } }),
					EditorView.updateListener.of((u) => {
						if (!editable || !u.docChanged) return;
						const text = u.state.doc.toString();
						if (text === lastDispatchedText) return;
						value = text;
					}),
				],
			}),
		});
		lastDispatchedText = value ?? "";
	});

	$: if (view && (value ?? "") !== lastDispatchedText) dispatchUpdate();

	onDestroy(() => { view?.destroy(); view = null; });
</script>

<div class="cm-host" bind:this={host}></div>

<style>
	.cm-host {
		width: 100%;
		height: 100%;
		min-height: 0;
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.cm-host :global(.cm-editor) { border-radius: 6px; flex: 1 1 auto; min-height: 0; max-height: 100%; width: 100%; }
	.cm-host :global(.cm-scroller) { overflow: auto; }
</style>
