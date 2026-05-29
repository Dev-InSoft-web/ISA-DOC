<script lang="ts" context="module">
	export interface ArchivoCita {
		marcador: string;
		file_id: string;
		filename?: string;
	}

	export interface MsgTokens {
		input?: number;
		cached?: number;
		output?: number;
		reasoning?: number;
		total?: number;
	}

	export interface MsgMeta {
		ts?: string;
		response_id?: string;
		model?: string;
		usage?: Record<string, unknown>;
		tokens?: MsgTokens;
		prompt_id?: string;
		prompt_version?: string;
		prompt_variables?: Record<string, unknown>;
		itdconsulta?: string;
		instrucciones?: string[];
		vectorStoreIds?: string[];
		premisas?: string[];
		prompt_text?: string;
		response_text?: string;
		extra?: Record<string, unknown>;
	}

	export interface MsgVista {
		idMsg: string;
		rol: string;
		contenido: string;
		fecha: string;
		esUsuario: boolean;
		archivos: ArchivoCita[];
		meta?: MsgMeta | null;
	}

	export interface OpenFileDetail {
		fileId: string;
		filename: string;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Card, FlexLayout, Modal, Button } from "@ingenieria_insoft/ispsveltecomponents";
	import { marked } from "marked";

	export let mensajes: MsgVista[] = [];

	const dispatch = createEventDispatcher<{ openFile: OpenFileDetail }>();

	let metaModalOpen = false;
	let metaModalData: MsgMeta | null = null;
	let metaModalTitle = "";

	function abrirMetaModal(m: MsgVista): void {
		metaModalData = m.meta ?? null;
		metaModalTitle = `Trazabilidad · #${m.idMsg}`;
		metaModalOpen = true;
	}

	function shortId(s: string | undefined, head = 10, tail = 4): string {
		if (!s) return "";
		return s.length <= head + tail + 1 ? s : `${s.slice(0, head)}…${s.slice(-tail)}`;
	}

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
					style={m.esUsuario ? "background-color: color-mix(in srgb, var(--is-paper) 60%, var(--is-primary)); color: #fff;" : ""}
				>
					<div class="msg-head">
						<span>#{m.idMsg} · {m.rol}{m.fecha ? ` · ${m.fecha}` : ""}</span>
						{#if m.meta}
							<span class="meta-badges">
								{#if m.meta.itdconsulta}
									<span class="badge badge-itd" title="itdconsulta">{m.meta.itdconsulta}</span>
								{/if}
								{#if m.meta.prompt_id}
									<span class="badge badge-pmpt" title={`prompt_id: ${m.meta.prompt_id}`}>pmpt:{shortId(m.meta.prompt_id, 6, 4)}</span>
								{/if}
								{#if m.meta.model}
									<span class="badge badge-model" title={`model: ${m.meta.model}`}>{m.meta.model}</span>
								{/if}
								{#if m.meta.tokens?.total}
									<span class="badge badge-tokens" title={`in:${m.meta.tokens.input ?? 0} (cached:${m.meta.tokens.cached ?? 0}) · out:${m.meta.tokens.output ?? 0} (reason:${m.meta.tokens.reasoning ?? 0}) · total:${m.meta.tokens.total}`}>{m.meta.tokens.total}t</span>
								{/if}
								{#if m.meta.premisas?.length}
									{#each m.meta.premisas as p}
										<span class="badge badge-premisa" title={`premisa: ${p}`}>{p}</span>
									{/each}
								{/if}
								<button type="button" class="meta-info-btn" on:click|stopPropagation={() => abrirMetaModal(m)} title="Ver trazabilidad completa">ⓘ</button>
							</span>
						{/if}
					</div>
					<div class="msg-body prose">{@html insertarCitas(mdToHtml(m.contenido), m.archivos)}</div>
				</Card>
			</div>
		</FlexLayout>
	{/each}
</div>

<Modal bind:bshow={metaModalOpen} onClose={() => (metaModalOpen = false)} style="width: 80dvw; max-width: 880px;">
	<svelte:fragment slot="title">
		<div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; width:100%;">
			<strong>{metaModalTitle}</strong>
			<Button variant="outlined" onClick={() => (metaModalOpen = false)} style="width: fit-content;">Cerrar</Button>
		</div>
	</svelte:fragment>
	{#if metaModalData}
		<div class="meta-grid">
			{#if metaModalData.ts}<div class="meta-row"><span class="meta-k">ts</span><span class="meta-v">{metaModalData.ts}</span></div>{/if}
			{#if metaModalData.itdconsulta}<div class="meta-row"><span class="meta-k">itdconsulta</span><span class="meta-v"><span class="badge badge-itd">{metaModalData.itdconsulta}</span></span></div>{/if}
			{#if metaModalData.prompt_id}<div class="meta-row"><span class="meta-k">prompt_id</span><span class="meta-v"><code>{metaModalData.prompt_id}</code></span></div>{/if}
			{#if metaModalData.prompt_version}<div class="meta-row"><span class="meta-k">prompt_version</span><span class="meta-v"><code>{metaModalData.prompt_version}</code></span></div>{/if}
			{#if metaModalData.model}<div class="meta-row"><span class="meta-k">model</span><span class="meta-v"><code>{metaModalData.model}</code></span></div>{/if}
			{#if metaModalData.response_id}<div class="meta-row"><span class="meta-k">response_id</span><span class="meta-v"><code>{metaModalData.response_id}</code></span></div>{/if}
			{#if metaModalData.tokens}<div class="meta-row"><span class="meta-k">tokens</span><span class="meta-v">
				<div class="tokens-grid">
					<div class="tok"><span class="tok-k">input</span><span class="tok-v">{metaModalData.tokens.input ?? 0}</span></div>
					<div class="tok"><span class="tok-k">cached</span><span class="tok-v">{metaModalData.tokens.cached ?? 0}</span></div>
					<div class="tok"><span class="tok-k">output</span><span class="tok-v">{metaModalData.tokens.output ?? 0}</span></div>
					<div class="tok"><span class="tok-k">reasoning</span><span class="tok-v">{metaModalData.tokens.reasoning ?? 0}</span></div>
					<div class="tok tok-total"><span class="tok-k">total</span><span class="tok-v">{metaModalData.tokens.total ?? 0}</span></div>
				</div>
			</span></div>{/if}
			{#if metaModalData.usage}<div class="meta-row"><span class="meta-k">usage</span><span class="meta-v"><pre>{JSON.stringify(metaModalData.usage, null, 2)}</pre></span></div>{/if}
			{#if metaModalData.prompt_variables}<div class="meta-row"><span class="meta-k">prompt_variables</span><span class="meta-v"><pre>{JSON.stringify(metaModalData.prompt_variables, null, 2)}</pre></span></div>{/if}
			{#if metaModalData.instrucciones?.length}<div class="meta-row"><span class="meta-k">instrucciones</span><span class="meta-v"><pre>{(metaModalData.instrucciones ?? []).join("\n\n----\n\n")}</pre></span></div>{/if}
			{#if metaModalData.vectorStoreIds?.length}<div class="meta-row"><span class="meta-k">vectorStoreIds</span><span class="meta-v">{metaModalData.vectorStoreIds.join(", ")}</span></div>{/if}
			{#if metaModalData.premisas?.length}<div class="meta-row"><span class="meta-k">premisas</span><span class="meta-v">{#each metaModalData.premisas as p}<span class="badge badge-premisa" style="margin-right:0.25rem;">{p}</span>{/each}</span></div>{/if}
		</div>
	{:else}
		<p>Sin metadatos disponibles para este mensaje.</p>
	{/if}
</Modal>

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
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		align-items: center;
		justify-content: space-between;
	}
	.meta-badges {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		align-items: center;
		text-transform: none;
		letter-spacing: normal;
	}
	.badge {
		display: inline-flex;
		align-items: center;
		font-size: 0.7rem;
		padding: 0.05rem 0.45rem;
		border-radius: 999px;
		font-weight: 600;
		border: 1px solid transparent;
	}
	.badge-itd {
		background: rgba(168, 85, 247, 0.2);
		border-color: rgba(168, 85, 247, 0.5);
		color: #d8b4fe;
	}
	.badge-pmpt {
		background: rgba(34, 197, 94, 0.18);
		border-color: rgba(34, 197, 94, 0.5);
		color: #86efac;
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
	}
	.badge-model {
		background: rgba(96, 165, 250, 0.18);
		border-color: rgba(96, 165, 250, 0.5);
		color: #93c5fd;
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
	}
	.badge-tokens {
		background: rgba(251, 191, 36, 0.18);
		border-color: rgba(251, 191, 36, 0.5);
		color: #fde68a;
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
	}
	.badge-premisa {
		background: rgba(244, 114, 182, 0.18);
		border-color: rgba(244, 114, 182, 0.5);
		color: #fbcfe8;
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
	}
	.meta-info-btn {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: inherit;
		font: inherit;
		font-size: 0.78rem;
		width: 1.4rem;
		height: 1.4rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		cursor: pointer;
		padding: 0;
	}
	.meta-info-btn:hover {
		background: rgba(255, 255, 255, 0.18);
	}
	.meta-grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 70dvh;
		overflow: auto;
	}
	.meta-row {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 0.5rem;
		align-items: start;
		padding: 0.35rem 0;
		border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
	}
	.meta-k {
		font-weight: 600;
		opacity: 0.85;
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.meta-v {
		font-size: 0.88rem;
		word-break: break-word;
	}
	.meta-v pre {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 4px;
		padding: 0.5rem 0.6rem;
		margin: 0;
		font-size: 0.78rem;
		max-height: 30dvh;
		overflow: auto;
		white-space: pre-wrap;
	}
	.meta-v code {
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
		font-size: 0.85em;
		background: rgba(255, 255, 255, 0.08);
		padding: 0.05rem 0.3rem;
		border-radius: 3px;
	}
	.tokens-grid {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 0.4rem;
	}
	.tok {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		padding: 0.45rem 0.3rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		background: rgba(0, 0, 0, 0.25);
	}
	.tok-k {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
	}
	.tok-v {
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
		font-size: 1rem;
		font-weight: 700;
	}
	.tok-total {
		background: rgba(251, 191, 36, 0.12);
		border-color: rgba(251, 191, 36, 0.4);
	}
	.tok-total .tok-v { color: #fde68a; }
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

