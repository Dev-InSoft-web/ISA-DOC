<script lang="ts">
	import { onMount } from "svelte";
	import {
		Button,
		ButtonIconify,
		Card,
		FlexLayout,
		Input,
		toastError,
		toastSuccess,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import ConfirmDialog from "$comps/overlays/ConfirmDialog.svelte";

	interface PromptEntry { id: string; version: string; label: string; description: string }
	interface PromptsConfig { updated: string; prompts: Record<string, PromptEntry> }

	let cfg: PromptsConfig = { updated: "", prompts: {} };
	let cargando: boolean = false;
	let guardando: Set<string> = new Set();

	let tab: "crud" | "probar" = "crud";

	let nuevoOpen: boolean = false;
	let nuevoKey: string = "";
	let nuevoId: string = "";
	let nuevoVersion: string = "";
	let nuevoLabel: string = "";
	let nuevoDesc: string = "";

	let confirmOpen: boolean = false;
	let confirmTitle: string = "Confirmar";
	let confirmMessage: string = "";
	let confirmText: string = "Confirmar";
	let confirmKind: "info" | "warning" | "danger" = "warning";
	let confirmCb: () => void | Promise<void> = () => {};

	// Probar
	let probarKey: string = "PR_CLASIFICADOR_MODULO";
	let probarInput: string = "";
	let probarLoading: boolean = false;
	let probarResultado: string = "";
	let probarMeta: { id: string; version: string; model: string } | null = null;

	// Editor de contenido (markdown del prompt)
	interface ContentSnapshot { id: string; version: string; model: string; fetched_at: string }
	let editorOpen: boolean = false;
	let editorKey: string = "";
	let editorMd: string = "";
	let editorMdOriginal: string = "";
	let editorSnapshot: ContentSnapshot | null = null;
	let editorLoading: boolean = false;
	let editorSaving: boolean = false;
	let editorPublishing: boolean = false;
	let editorCached: boolean = false;
	$: editorDirty = editorMd !== editorMdOriginal;

	function pedirConfirmacion(opts: {
		title?: string;
		message: string;
		confirmText?: string;
		kind?: "info" | "warning" | "danger";
		onConfirm: () => void | Promise<void>;
	}): void {
		confirmTitle = opts.title ?? "Confirmar";
		confirmMessage = opts.message;
		confirmText = opts.confirmText ?? "Confirmar";
		confirmKind = opts.kind ?? "warning";
		confirmCb = opts.onConfirm;
		confirmOpen = true;
	}

	async function cargar(): Promise<void> {
		cargando = true;
		try {
			const r = await fetch("/api/patyia/prompts");
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			cfg = { updated: j.updated ?? "", prompts: j.prompts ?? {} };
			if (!cfg.prompts[probarKey]) {
				const primera = Object.keys(cfg.prompts)[0];
				if (primera) probarKey = primera;
			}
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			cargando = false;
		}
	}

	async function guardar(key: string): Promise<void> {
		const entry = cfg.prompts[key];
		if (!entry) return;
		guardando = new Set([...guardando, key]);
		try {
			const r = await fetch(`/api/patyia/prompts/${encodeURIComponent(key)}`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(entry),
			});
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			toastSuccess(`Guardado · ${key}`);
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			const next = new Set(guardando);
			next.delete(key);
			guardando = next;
		}
	}

	function eliminar(key: string): void {
		pedirConfirmacion({
			title: "Eliminar prompt",
			message: `Se eliminará la entrada ${key} de la configuración local. ¿Continuar?`,
			confirmText: "Eliminar",
			kind: "danger",
			onConfirm: () => ejecutarEliminar(key),
		});
	}

	async function ejecutarEliminar(key: string): Promise<void> {
		try {
			const r = await fetch(`/api/patyia/prompts/${encodeURIComponent(key)}`, { method: "DELETE" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			delete cfg.prompts[key];
			cfg = { ...cfg };
			toastSuccess(`Eliminado · ${key}`);
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		}
	}

	function abrirNuevo(): void {
		nuevoKey = "";
		nuevoId = "";
		nuevoVersion = "";
		nuevoLabel = "";
		nuevoDesc = "";
		nuevoOpen = true;
	}

	async function crearNuevo(): Promise<void> {
		try {
			const r = await fetch("/api/patyia/prompts", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					key: nuevoKey.trim(),
					id: nuevoId.trim(),
					version: nuevoVersion.trim(),
					label: nuevoLabel.trim(),
					description: nuevoDesc.trim(),
				}),
			});
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			cfg.prompts[j.key] = j.entry;
			cfg = { ...cfg };
			nuevoOpen = false;
			toastSuccess(`Creado · ${j.key}`);
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		}
	}

	async function probarPrompt(): Promise<void> {
		if (!probarInput.trim()) {
			toastError("Escribe un input para clasificar");
			return;
		}
		probarLoading = true;
		probarResultado = "";
		probarMeta = null;
		try {
			const r = await fetch("/api/patyia/prompts/run", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ key: probarKey, input: probarInput }),
			});
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			probarResultado = j.output_text ?? "";
			probarMeta = { id: j.prompt?.id ?? "", version: j.prompt?.version ?? "", model: j.model ?? "" };
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			probarLoading = false;
		}
	}

	$: keys = Object.keys(cfg.prompts).sort();
	$: promptKeysList = keys.map((k) => ({ value: k, label: cfg.prompts[k]?.label || k }));

	async function cargarContenido(key: string, refresh: boolean): Promise<void> {
		editorLoading = true;
		try {
			const url = `/api/patyia/prompts/${encodeURIComponent(key)}/content${refresh ? "?refresh=1" : ""}`;
			const r = await fetch(url);
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			editorMd = j.markdown ?? "";
			editorMdOriginal = editorMd;
			editorCached = !!j.cached;
			editorSnapshot = j.snapshot
				? {
					id: j.snapshot.id,
					version: j.snapshot.version,
					model: j.snapshot.model ?? "",
					fetched_at: j.snapshot.fetched_at ?? "",
				}
				: null;
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			editorLoading = false;
		}
	}

	async function abrirEditor(key: string): Promise<void> {
		editorKey = key;
		editorMd = "";
		editorMdOriginal = "";
		editorSnapshot = null;
		editorCached = false;
		editorOpen = true;
		await cargarContenido(key, false);
	}

	async function refrescarDeOpenAI(): Promise<void> {
		if (!editorKey) return;
		await cargarContenido(editorKey, true);
		toastSuccess("Contenido recargado desde OpenAI");
	}

	async function guardarContenidoLocal(): Promise<void> {
		if (!editorKey) return;
		editorSaving = true;
		try {
			const r = await fetch(`/api/patyia/prompts/${encodeURIComponent(editorKey)}/content`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ markdown: editorMd }),
			});
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			editorMdOriginal = editorMd;
			toastSuccess(`Guardado local · ${j.messages} mensaje(s)`);
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			editorSaving = false;
		}
	}

	function publicarNuevaVersion(): void {
		if (!editorKey) return;
		pedirConfirmacion({
			title: "Publicar nueva versión",
			message: `Se enviará el contenido local a OpenAI como nueva versión de ${editorKey}. ¿Continuar?`,
			confirmText: "Publicar",
			kind: "warning",
			onConfirm: ejecutarPublicar,
		});
	}

	async function ejecutarPublicar(): Promise<void> {
		if (!editorKey) return;
		editorPublishing = true;
		try {
			if (editorDirty) await guardarContenidoLocal();
			const r = await fetch(`/api/patyia/prompts/${encodeURIComponent(editorKey)}/content?publish=1`, { method: "POST" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			toastSuccess(`Publicada versión ${j.version}`);
			await cargarContenido(editorKey, true);
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			editorPublishing = false;
		}
	}

	onMount(() => { void cargar(); });
</script>

<div class="prompts-panel">
	<FlexLayout items="center" class="tabs-bar">
		<Button
			style="width: fit-content;"
			variant={tab === "crud" ? "solid" : "soft"}
			on:click={() => (tab = "crud")}
		>CRUD</Button>
		<Button
			style="width: fit-content;"
			variant={tab === "probar" ? "solid" : "soft"}
			on:click={() => (tab = "probar")}
		>Probar</Button>
		<div style="flex: 1;"></div>
		{#if tab === "crud"}
			<ButtonIconify icon="mdi:refresh" title="Recargar" on:click={() => void cargar()} />
			<Button style="width: fit-content;" on:click={abrirNuevo}>Nuevo prompt</Button>
		{/if}
	</FlexLayout>

	{#if tab === "crud"}
		<div class="lista">
			{#if cargando && !keys.length}
				<p class="hint">Cargando…</p>
			{:else if !keys.length}
				<p class="hint">Sin prompts configurados.</p>
			{/if}
			{#each keys as k (k)}
				{@const entry = cfg.prompts[k]}
				<Card class="prompt-card">
					<FlexLayout direction="column">
						<FlexLayout items="center">
							<strong style="font-family: ui-monospace, monospace;">{k}</strong>
							<div style="flex:1;"></div>
							<Button style="width: fit-content;" variant="soft" on:click={() => void abrirEditor(k)}>Contenido</Button>
							<Button style="width: fit-content;" disabled={guardando.has(k)} on:click={() => void guardar(k)}>
								{guardando.has(k) ? "Guardando…" : "Guardar"}
							</Button>
							<ButtonIconify icon="mdi:delete-outline" title="Eliminar" on:click={() => eliminar(k)} />
						</FlexLayout>
						<label class="campo">
							<span>Label</span>
							<Input bind:value={entry.label} placeholder="Nombre legible" />
						</label>
						<label class="campo">
							<span>Prompt ID</span>
							<Input bind:value={entry.id} placeholder="pmpt_..." />
						</label>
						<label class="campo">
							<span>Versión</span>
							<Input bind:value={entry.version} placeholder="(opcional) ej: 2" />
						</label>
						<label class="campo">
							<span>Descripción</span>
							<Input bind:value={entry.description} placeholder="Qué hace este prompt" />
						</label>
					</FlexLayout>
				</Card>
			{/each}
		</div>
		{#if cfg.updated}
			<p class="hint">Actualizado: {cfg.updated}</p>
		{/if}
	{:else}
		<Card class="prompt-card">
			<FlexLayout direction="column">
				<label class="campo">
					<span>Prompt a ejecutar</span>
					<select bind:value={probarKey}>
						{#each promptKeysList as p}
							<option value={p.value}>{p.label} ({p.value})</option>
						{/each}
					</select>
				</label>
				<label class="campo">
					<span>Input (mensaje del usuario)</span>
					<textarea
						bind:value={probarInput}
						placeholder="Texto a clasificar / procesar por el prompt"
						rows="6"
						class="textarea"
					></textarea>
				</label>
				<FlexLayout items="center">
					<Button style="width: fit-content;" disabled={probarLoading} on:click={() => void probarPrompt()}>
						{probarLoading ? "Ejecutando…" : "Ejecutar prompt"}
					</Button>
					{#if probarMeta}
						<small class="meta">id: <code>{probarMeta.id}</code>{probarMeta.version ? ` · v${probarMeta.version}` : ""}{probarMeta.model ? ` · model ${probarMeta.model}` : ""}</small>
					{/if}
				</FlexLayout>
				{#if probarResultado}
					<div class="resultado">
						<strong>Resultado:</strong>
						<pre>{probarResultado}</pre>
					</div>
				{/if}
			</FlexLayout>
		</Card>
	{/if}
</div>

{#if nuevoOpen}
	<div class="modal-overlay" on:click={() => (nuevoOpen = false)}>
		<div class="modal-content" on:click|stopPropagation>
			<h3>Nuevo prompt</h3>
			<label class="campo">
				<span>Key (UPPER_SNAKE_CASE)</span>
				<Input bind:value={nuevoKey} placeholder="PR_NUEVA_ETIQUETA" />
			</label>
			<label class="campo">
				<span>Prompt ID</span>
				<Input bind:value={nuevoId} placeholder="pmpt_..." />
			</label>
			<label class="campo">
				<span>Versión</span>
				<Input bind:value={nuevoVersion} placeholder="(opcional)" />
			</label>
			<label class="campo">
				<span>Label</span>
				<Input bind:value={nuevoLabel} placeholder="Nombre legible" />
			</label>
			<label class="campo">
				<span>Descripción</span>
				<Input bind:value={nuevoDesc} placeholder="Qué hace" />
			</label>
			<FlexLayout justify="end" items="center">
				<Button style="width: fit-content;" on:click={() => (nuevoOpen = false)}>Cancelar</Button>
				<Button style="width: fit-content;" on:click={() => void crearNuevo()}>Crear</Button>
			</FlexLayout>
		</div>
	</div>
{/if}

{#if editorOpen}
	<div class="modal-overlay" on:click={() => (editorOpen = false)}>
		<div class="modal-content editor" on:click|stopPropagation>
			<FlexLayout items="center">
				<h3 style="margin: 0;">Contenido · <code>{editorKey}</code></h3>
				<div style="flex:1;"></div>
				<ButtonIconify icon="mdi:close" title="Cerrar" on:click={() => (editorOpen = false)} />
			</FlexLayout>
			{#if editorSnapshot}
				<small class="meta">
					id: <code>{editorSnapshot.id}</code>
					{editorSnapshot.version ? ` · v${editorSnapshot.version}` : ""}
					{editorSnapshot.model ? ` · model ${editorSnapshot.model}` : ""}
					{editorSnapshot.fetched_at ? ` · sync ${editorSnapshot.fetched_at.slice(0, 19).replace("T", " ")}` : ""}
					{editorCached ? " · (cache local)" : ""}
				</small>
			{/if}
			<p class="hint" style="margin: 0;">
				Cada bloque del prompt va entre <code>&lt;!--role: system|developer|user|assistant--&gt;</code> y <code>&lt;!--/role--&gt;</code>.
			</p>
			<textarea
				bind:value={editorMd}
				class="textarea editor-area"
				rows="20"
				placeholder={"<!--role: system-->\n...\n<!--/role-->"}
				disabled={editorLoading}
			></textarea>
			<FlexLayout items="center">
				<Button style="width: fit-content;" variant="soft" disabled={editorLoading} on:click={() => void refrescarDeOpenAI()}>
					{editorLoading ? "Cargando…" : "Refrescar de OpenAI"}
				</Button>
				<Button style="width: fit-content;" disabled={editorSaving || !editorDirty} on:click={() => void guardarContenidoLocal()}>
					{editorSaving ? "Guardando…" : (editorDirty ? "Guardar local" : "Sin cambios")}
				</Button>
				<div style="flex:1;"></div>
				<Button style="width: fit-content;" variant="outlined" disabled={editorPublishing} on:click={publicarNuevaVersion}>
					{editorPublishing ? "Publicando…" : "Publicar nueva versión"}
				</Button>
				<Button style="width: fit-content;" variant="soft" on:click={() => (editorOpen = false)}>Cerrar</Button>
			</FlexLayout>
		</div>
	</div>
{/if}

<ConfirmDialog
	bind:open={confirmOpen}
	title={confirmTitle}
	message={confirmMessage}
	confirmText={confirmText}
	kind={confirmKind}
	onConfirm={() => { void confirmCb(); }}
/>

<style>
	.prompts-panel {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.prompts-panel :global(.tabs-bar) {
		gap: 0.4rem;
	}
	.lista {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.prompts-panel :global(.prompt-card) {
		padding: 0.75rem;
	}
	.campo {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		margin: 0.25rem 0;
	}
	.campo > span {
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--is-color) 70%, transparent);
	}
	.textarea {
		width: 100%;
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		font-size: 0.85rem;
		padding: 0.5rem;
		border: 1px solid color-mix(in srgb, var(--is-primary) 35%, transparent);
		border-radius: 4px;
		background: var(--is-bg-readonly, var(--is-bg-secondary));
		color: var(--is-color);
		resize: vertical;
	}
	.resultado {
		margin-top: 0.5rem;
		padding: 0.5rem;
		border: 1px solid color-mix(in srgb, var(--is-primary) 35%, transparent);
		border-radius: 4px;
		background: color-mix(in srgb, var(--is-primary) 8%, transparent);
	}
	.resultado pre {
		white-space: pre-wrap;
		word-break: break-word;
		font-size: 0.85rem;
		margin: 0.25rem 0 0;
	}
	.meta {
		color: color-mix(in srgb, var(--is-color) 65%, transparent);
		font-size: 0.75rem;
	}
	.hint {
		font-size: 0.85rem;
		color: color-mix(in srgb, var(--is-color) 65%, transparent);
		margin: 0.5rem 0;
	}
	select {
		padding: 0.4rem;
		background: var(--is-bg-readonly, var(--is-bg-secondary));
		color: var(--is-color);
		border: 1px solid color-mix(in srgb, var(--is-primary) 35%, transparent);
		border-radius: 4px;
	}
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	.modal-content {
		background: var(--is-bg-secondary, #041c34);
		color: var(--is-color);
		border: 1px solid color-mix(in srgb, var(--is-primary) 35%, transparent);
		border-radius: 8px;
		padding: 1rem;
		width: min(480px, 90vw);
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.modal-content.editor {
		width: min(960px, 95vw);
		max-height: 90vh;
	}
	.editor-area {
		min-height: 50vh;
		font-size: 0.8rem;
	}
	.modal-content h3 {
		margin: 0 0 0.5rem;
		color: var(--is-primary);
	}
</style>
