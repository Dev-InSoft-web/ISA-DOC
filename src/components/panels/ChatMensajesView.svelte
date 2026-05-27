<script lang="ts" context="module">
	export interface ArchivoCita {
		marcador: string;
		file_id: string;
		filename?: string;
	}

	export interface MsgVista {
		idMsg: string;
		rol: string;
		contenido: string;
		fecha: string;
		esUsuario: boolean;
		archivos: ArchivoCita[];
	}

	export interface OpenFileDetail {
		fileId: string;
		filename: string;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Card, FlexLayout } from "@ingenieria_insoft/ispsveltecomponents";
	import { marked } from "marked";

	export let mensajes: MsgVista[] = [];

	const dispatch = createEventDispatcher<{ openFile: OpenFileDetail }>();

	marked.setOptions({ gfm: true, breaks: true });

	function escaparHtml(s: string): string {
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
	}

	function mdToHtml(src: string): string {
		if (!src) return "";
		try {
			return marked.parse(src, { async: false }) as string;
		} catch {
			return escaparHtml(src);
		}
	}

	function insertarCitas(html: string, archivos: ArchivoCita[]): string {
		let out = html;
		const vistos = new Set<string>();
		for (const a of archivos) {
			if (vistos.has(a.marcador)) continue;
			vistos.add(a.marcador);
			const escMarcador = escaparHtml(a.marcador);
			const re = new RegExp(escMarcador.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
			const filename = a.filename ?? "archivo";
			const btn = `<button type="button" class="cita-archivo" data-file-id="${escaparHtml(a.file_id)}" data-filename="${escaparHtml(filename)}" title="Abrir ${escaparHtml(filename)}">📎 ${escaparHtml(filename)}</button>`;
			out = out.replace(re, btn);
		}

		return out.replace(/【[^】]*】/g, (m) => {
			const inner = m.slice(1, -1);
			const partes = inner.split("\u2020");
			const filename = partes[1]?.trim() || inner;
			return `<span class="cita-sin-id" title="Sin file_id en annotations">📎 ${escaparHtml(filename)}</span>`;
		});
	}

	function onChatClick(e: MouseEvent): void {
		const t = e.target as HTMLElement | null;
		const btn = t?.closest?.(".cita-archivo") as HTMLButtonElement | null;
		if (!btn) return;
		e.preventDefault();
		const fileId = btn.getAttribute("data-file-id");
		const filename = btn.getAttribute("data-filename") ?? "archivo";
		if (!fileId) return;
		dispatch("openFile", { fileId, filename });
	}
</script>

<div class="chat-historial custom-scrollbar" on:click={onChatClick} role="presentation">
	{#each mensajes as m}
		<FlexLayout justify={m.esUsuario ? "end" : "start"} items="start" style="width: 100%;">
			<div class="msg-wrap">
				<Card
					variant="solid"
					style={m.esUsuario ? "background-color: var(--is-primary); color: #fff;" : ""}
				>
					<div class="msg-head">#{m.idMsg} · {m.rol}{m.fecha ? ` · ${m.fecha}` : ""}</div>
					<div class="msg-body prose">{@html insertarCitas(mdToHtml(m.contenido), m.archivos)}</div>
				</Card>
			</div>
		</FlexLayout>
	{/each}
</div>

<style>
	.chat-historial {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		overflow: auto;
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		height: 100%;
	}
	.msg-wrap {
		max-width: 80%;
	}
	.msg-head {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.75;
		margin-bottom: 0.4rem;
	}
	.msg-body {
		font-size: 0.92rem;
		line-height: 1.55;
		word-break: break-word;
	}
	.msg-body :global(p) { margin: 0 0 0.5rem; }
	.msg-body :global(p:last-child) { margin-bottom: 0; }
	.msg-body :global(ul),
	.msg-body :global(ol) { margin: 0.25rem 0 0.5rem 1.25rem; padding: 0; }
	.msg-body :global(li) { margin: 0.15rem 0; }
	.msg-body :global(h1),
	.msg-body :global(h2),
	.msg-body :global(h3),
	.msg-body :global(h4) { margin: 0.5rem 0 0.35rem; font-weight: 600; }
	.msg-body :global(h1) { font-size: 1.15rem; }
	.msg-body :global(h2) { font-size: 1.05rem; }
	.msg-body :global(h3) { font-size: 1rem; }
	.msg-body :global(h4) { font-size: 0.95rem; }
	.msg-body :global(code) {
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
		font-size: 0.85em;
		background: rgba(255, 255, 255, 0.1);
		padding: 0.05rem 0.3rem;
		border-radius: 3px;
	}
	.msg-body :global(pre) {
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		padding: 0.6rem 0.75rem;
		overflow: auto;
		font-size: 0.85rem;
		margin: 0.35rem 0;
	}
	.msg-body :global(pre code) {
		background: transparent;
		padding: 0;
	}
	.msg-body :global(blockquote) {
		border-left: 3px solid rgba(255, 255, 255, 0.25);
		margin: 0.35rem 0;
		padding: 0.1rem 0.6rem;
		opacity: 0.85;
	}
	.msg-body :global(a) { color: #60a5fa; text-decoration: underline; }
	.msg-body :global(table) {
		border-collapse: collapse;
		margin: 0.4rem 0;
		font-size: 0.85rem;
	}
	.msg-body :global(th),
	.msg-body :global(td) {
		border: 1px solid rgba(255, 255, 255, 0.15);
		padding: 0.25rem 0.5rem;
	}
	.msg-body :global(img) { max-width: 100%; height: auto; }
	.msg-body :global(.cita-archivo) {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		background: rgba(96, 165, 250, 0.18);
		border: 1px solid rgba(96, 165, 250, 0.5);
		color: inherit;
		font: inherit;
		font-size: 0.82em;
		padding: 0.05rem 0.45rem;
		border-radius: 999px;
		cursor: pointer;
		margin: 0 0.1rem;
	}
	.msg-body :global(.cita-archivo:hover) {
		background: rgba(96, 165, 250, 0.32);
	}
	.msg-body :global(.cita-sin-id) {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px dashed rgba(255, 255, 255, 0.25);
		font-size: 0.82em;
		padding: 0.05rem 0.45rem;
		border-radius: 999px;
		opacity: 0.8;
	}
</style>

