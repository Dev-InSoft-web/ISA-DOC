<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { EditorView, lineNumbers } from "@codemirror/view";
	import { EditorState, Compartment, type Extension } from "@codemirror/state";
	import { sql } from "@codemirror/lang-sql";
	import { javascript } from "@codemirror/lang-javascript";
	import { json } from "@codemirror/lang-json";
	import { syntaxHighlighting, HighlightStyle, foldGutter, defaultHighlightStyle } from "@codemirror/language";
	import { tags as t } from "@lezer/highlight";

	export let value: string = "";
	export let lang: "sql" | "ts" | "json" = "ts";
	export let height: string = "260px";
	export let editable: boolean = false;
	export let onChange: (text: string) => void = () => {};

	let host: HTMLDivElement;
	let view: EditorView | null = null;
	let lastDispatchedText: string = "";
	const langCompartment = new Compartment();
	const heightCompartment = new Compartment();
	const editableCompartment = new Compartment();

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
		{ tag: [t.controlKeyword, t.moduleKeyword, t.definitionKeyword], color: "#c586c0" },
		{ tag: [t.string, t.special(t.string)], color: "#ce9178" },
		{ tag: [t.number, t.bool, t.null], color: "#b5cea8" },
		{ tag: t.operator, color: "#d4d4d4" },
		{ tag: t.comment, color: "#6a9955", fontStyle: "italic" },
		{ tag: t.function(t.variableName), color: "#dcdcaa" },
		{ tag: [t.typeName, t.className], color: "#4ec9b0" },
		{ tag: t.variableName, color: "#9cdcfe" },
		{ tag: t.propertyName, color: "#9cdcfe" },
		{ tag: t.invalid, color: "#f44747" },
		{ tag: [t.punctuation, t.bracket, t.squareBracket, t.brace, t.separator], color: "#d4d4d4" },
	]);

	function langExt(l: typeof lang): Extension {
		if (l === "sql") return sql();
		if (l === "json") return json();
		return javascript({ typescript: true });
	}

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
					vsCodeDark,
					syntaxHighlighting(vsCodeHighlight),
					syntaxHighlighting(defaultHighlightStyle),
					langCompartment.of(langExt(lang)),
					heightCompartment.of(EditorView.theme({ "&": { height, fontSize: "0.78rem" } })),
					editableCompartment.of([
						EditorView.editable.of(editable),
						EditorState.readOnly.of(!editable),
					]),
					EditorView.updateListener.of((u) => {
						if (!editable || !u.docChanged) return;
						const text = u.state.doc.toString();
						if (text === lastDispatchedText) return;
						value = text;
						onChange(text);
					}),
				],
			}),
		});
		lastDispatchedText = value ?? "";
	});

	$: if (view && (value ?? "") !== lastDispatchedText) dispatchUpdate();
	$: if (view) view.dispatch({ effects: langCompartment.reconfigure(langExt(lang)) });
	$: if (view) view.dispatch({ effects: heightCompartment.reconfigure(EditorView.theme({ "&": { height, fontSize: "0.78rem" } })) });
	$: if (view) view.dispatch({ effects: editableCompartment.reconfigure([
		EditorView.editable.of(editable),
		EditorState.readOnly.of(!editable),
	]) });

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
