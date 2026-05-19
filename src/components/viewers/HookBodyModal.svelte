<script lang="ts">
	import { onDestroy, onMount, createEventDispatcher, tick } from "svelte";
	import { Modal, FlexLayout, Iconify, Text, Button } from "@ingenieria_insoft/ispsveltecomponents";
	import { EditorView, lineNumbers, keymap } from "@codemirror/view";
	import { EditorState } from "@codemirror/state";
	import { javascript } from "@codemirror/lang-javascript";
	import { defaultHighlightStyle, syntaxHighlighting, foldGutter, HighlightStyle, indentOnInput, bracketMatching, indentUnit } from "@codemirror/language";
	import { oneDark, oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
	import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
	import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
	import { tags as t } from "@lezer/highlight";

	export let bshow: boolean = false;
	export let title: string = "";
	export let value: string = "";

	const dispatch = createEventDispatcher<{ save: { value: string }; close: void }>();

	let host: HTMLDivElement;
	let view: EditorView | null = null;
	let initial: string = "";

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

	function mount(): void {
		if (view || !host) return;
		initial = value ?? "";
		view = new EditorView({
			parent: host,
			state: EditorState.create({
				doc: initial,
				extensions: [
					lineNumbers(),
					foldGutter(),
					history(),
					indentOnInput(),
					bracketMatching(),
					closeBrackets(),
					indentUnit.of("\t"),
					javascript({ typescript: true }),
					oneDark,
					syntaxHighlighting(tsHighlight),
					syntaxHighlighting(oneDarkHighlightStyle),
					syntaxHighlighting(defaultHighlightStyle),
					keymap.of([...defaultKeymap, ...historyKeymap, ...closeBracketsKeymap, indentWithTab]),
					EditorView.theme({ "&": { height: "100%", fontSize: "0.85rem" } }),
				],
			}),
		});
	}

	function destroy(): void {
		view?.destroy();
		view = null;
	}

	$: if (bshow) tick().then(mount);
	$: if (!bshow) destroy();

	function save(): void {
		const next = view?.state.doc.toString() ?? "";
		dispatch("save", { value: next });
		bshow = false;
		dispatch("close");
	}
	function close(): void {
		bshow = false;
		dispatch("close");
	}

	onMount(() => {
		if (bshow) tick().then(mount);
	});
	onDestroy(destroy);
</script>

<Modal bind:bshow onClose={close} style="width: 96dvw; height: 96dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center">
			<Iconify icon="mdi:language-typescript" />
			<Text><strong>{title || "Editar cuerpo"}</strong></Text>
		</FlexLayout>
	</svelte:fragment>

	<div class="cm-wrap">
		<div class="cm-host" bind:this={host}></div>
	</div>

	<div class="cm-footer">
		<FlexLayout justify="end">
			<Button variant="outlined" onClick={close}>
				<Iconify icon="mdi:close" /> Cancelar
			</Button>
			<Button onClick={save}>
				<Iconify icon="mdi:content-save" /> Guardar
			</Button>
		</FlexLayout>
	</div>
</Modal>

<style>
	.cm-wrap {
		flex: 1 1 auto;
		min-height: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.cm-host {
		flex: 1 1 auto;
		min-height: 0;
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.cm-host :global(.cm-editor) { border-radius: 6px; flex: 1 1 auto; min-height: 0; max-height: 100%; height: 100%; }
	.cm-host :global(.cm-scroller) { overflow: auto; }
	.cm-footer { margin-top: 0.5rem; }
</style>
