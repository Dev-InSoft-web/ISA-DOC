<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { io, type Socket } from "socket.io-client";
	import {
		Card, Button, H2, H4, Text, Loading, Modal,
		Toaster, toastError, toastSuccess,
		FlexLayout, GridLayout, Iconify,
	} from "@ingenieria_insoft/ispsveltecomponents";

	type EntityMeta = { slug: string; name: string; count: number };
	type CollectionMeta = {
		info: { name: string; description?: string; schema: string };
		variable: { key: string; value: string; type?: string }[];
		entities: EntityMeta[];
	};

	type Header = { key: string; value: string; description?: string };
	type UrlObj = {
		raw?: string;
		host?: string[];
		path?: string[];
		query?: { key: string; value: string; description?: string }[];
		variable?: { key: string; value: string; description?: string }[];
	};
	type Body = { mode?: string; raw?: string };
	type RequestObj = {
		method?: string;
		header?: Header[];
		body?: Body;
		url?: UrlObj | string;
		description?: string;
		auth?: unknown;
	};
	type Response = {
		name?: string;
		status?: string;
		code?: number;
		_postman_previewlanguage?: string;
		header?: Header[];
		body?: string;
		originalRequest?: unknown;
	};
	type ItemReq = {
		name: string;
		request?: RequestObj;
		response?: Response[];
		description?: string;
	};
	type EntityFile = {
		name: string;
		item: ItemReq[];
	};

	let socket: Socket | null = null;
	let loading = true;
	let meta: CollectionMeta | null = null;
	let selectedSlug: string | null = null;
	let entity: EntityFile | null = null;
	let entityDirty = false;
	let savingEntity = false;
	let expandedItem = -1;
	let expandedResponse: Record<number, number> = {};

	// Pestañas superiores (Editor / Resumen).
	type TopTab = "editor" | "resumen";
	let topTab: TopTab = "editor";
	let fullCollection: unknown = null;

	// === Environments / Runner ===
	type EnvVar = { key: string; value: string; type?: string; enabled?: boolean };
	type Environment = { id: string; name: string; values: EnvVar[] };
	type EnvironmentsFile = { active: string; environments: Environment[] };
	let envs: EnvironmentsFile | null = null;
	let activeEnvId = "";
	let showEnvEditor = false;
	let envDirty = false;

	function loadEnvs(): void {
		socket?.emit("postman:envs", (data: EnvironmentsFile) => {
			envs = data;
			activeEnvId = data.active;
		});
	}

	function persistEnvs(): void {
		if (!envs) return;
		envs.active = activeEnvId;
		socket?.emit("postman:envSave", envs, (r: { ok: boolean; error?: string }) => {
			if (r.ok) { envDirty = false; toastSuccess("Environments guardados"); }
			else toastError(r.error ?? "Error guardando environments");
		});
	}

	function getActiveEnv(): Environment | null {
		if (!envs) return null;
		return envs.environments.find((e) => e.id === activeEnvId) ?? envs.environments[0] ?? null;
	}


	function loadList(): void {
		if (!socket?.connected) return;
		let answered = false;
		const timer = window.setTimeout(() => {
			if (answered) return;
			loading = false;
			toastError("El servidor no respondió a postman:list (¿reiniciar dev?)");
		}, 5000);
		socket.emit("postman:list", (data: CollectionMeta | { error: string }) => {
			answered = true;
			window.clearTimeout(timer);
			if ("error" in data) { toastError(data.error); loading = false; return; }
			meta = data;
			loading = false;
			if (!selectedSlug && meta.entities.length) selectSlug(meta.entities[0].slug);
		});
	}

	function selectSlug(slug: string): void {
		if (entityDirty && !confirm("Hay cambios sin guardar. ¿Descartar?")) return;
		selectedSlug = slug;
		entity = null;
		entityDirty = false;
		expandedItem = -1;
		expandedResponse = {};
		socket?.emit("postman:get", slug, (data: EntityFile | { error: string }) => {
			if ("error" in data) { toastError(data.error); return; }
			entity = data;
		});
	}

	function markDirty(): void { entityDirty = true; }

	function saveEntity(): void {
		if (!selectedSlug || !entity) return;
		savingEntity = true;
		socket?.emit("postman:save", { slug: selectedSlug, data: entity }, (r: { ok: boolean; error?: string }) => {
			savingEntity = false;
			if (r.ok) { entityDirty = false; toastSuccess("Entidad guardada"); loadList(); }
			else toastError(r.error ?? "Error guardando");
		});
	}

	function mergeAll(): void {
		if (entityDirty && !confirm("Hay cambios sin guardar. ¿Descartar y recargar?")) return;
		loadList();
		loadFull();
		toastSuccess("Colección recargada");
	}

	function loadFull(): void {
		socket?.emit("postman:full", (data: unknown) => { fullCollection = data; });
	}

	async function setTopTab(t: TopTab): Promise<void> {
		topTab = t;
		if (t === "resumen") loadFull();
	}

	function copyFullCollection(): void {
		if (!fullCollection) return;
		navigator.clipboard.writeText(JSON.stringify(fullCollection, null, 2))
			.then(() => toastSuccess("Colección copiada al portapapeles"))
			.catch(() => toastError("No se pudo copiar"));
	}

	function downloadFullCollection(): void {
		if (!fullCollection) return;
		const blob = new Blob([JSON.stringify(fullCollection, null, 2)], { type: "application/json" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "postman-collection.json";
		a.click();
		URL.revokeObjectURL(a.href);
	}

	function addRequest(): void {
		if (!entity) return;
		entity.item = [...entity.item, {
			name: "Nuevo endpoint",
			request: { method: "GET", header: [{ key: "Content-Type", value: "application/json" }], url: { raw: "{{base_url}}/api/", host: ["{{base_url}}"], path: ["api"] } },
			response: [],
		}];
		expandedItem = entity.item.length - 1;
		markDirty();
	}

	function removeRequest(idx: number): void {
		if (!entity) return;
		if (!confirm(`Eliminar "${entity.item[idx].name}"?`)) return;
		entity.item = entity.item.filter((_, i) => i !== idx);
		if (expandedItem === idx) expandedItem = -1;
		markDirty();
	}

	function getUrlRaw(req: RequestObj | undefined): string {
		if (!req?.url) return "";
		if (typeof req.url === "string") return req.url;
		return req.url.raw ?? "";
	}

	function setUrlRaw(item: ItemReq, raw: string): void {
		if (!item.request) item.request = {};
		const url = typeof item.request.url === "object" && item.request.url !== null ? item.request.url : {};
		(url as UrlObj).raw = raw;
		item.request.url = url as UrlObj;
		markDirty();
	}

	function setBodyRaw(item: ItemReq, raw: string): void {
		if (!item.request) item.request = {};
		if (!item.request.body) item.request.body = { mode: "raw", raw: "" };
		item.request.body.raw = raw;
		item.request.body.mode = "raw";
		markDirty();
	}

	function addResponse(item: ItemReq): void {
		if (!item.response) item.response = [];
		item.response = [...item.response, { name: "Ejemplo", status: "OK", code: 200, _postman_previewlanguage: "json", header: [{ key: "Content-Type", value: "application/json" }], body: "{}" }];
		markDirty();
	}

	function removeResponse(item: ItemReq, idx: number): void {
		if (!item.response) return;
		item.response = item.response.filter((_, i) => i !== idx);
		markDirty();
	}

	function toggleItem(idx: number): void {
		expandedItem = expandedItem === idx ? -1 : idx;
	}

	function toggleResponse(itemIdx: number, respIdx: number): void {
		const cur = expandedResponse[itemIdx];
		expandedResponse = { ...expandedResponse, [itemIdx]: cur === respIdx ? -1 : respIdx };
	}

	function methodColor(m: string | undefined): "success" | "warning" | "danger" | "info" {
		switch ((m ?? "").toUpperCase()) {
			case "GET": return "success";
			case "POST": return "info";
			case "PUT":
			case "PATCH": return "warning";
			case "DELETE": return "danger";
			default: return "info";
		}
	}

	onMount(() => {
		const url = `http://${location.hostname}:4401`;
		socket = io(url, { transports: ["websocket"] });
		socket.on("connect", () => { loadList(); loadEnvs(); });
	});
	onDestroy(() => { socket?.disconnect(); });
</script>

<Toaster />

<div class="postman-panel">
{#if loading}
	<Loading bShow={true} />
{:else if !meta}
	<Card variant="flat"><Text color="error">No se pudo cargar la colección Postman.</Text></Card>
{:else}
	<Card variant="flat">
		<FlexLayout items="center" justify="between">
			<div>
				<H4>{meta.info.name}</H4>
				<Text color="neutral">{meta.entities.length} entidades · {meta.entities.reduce((a, e) => a + e.count, 0)} endpoints</Text>
			</div>
			<FlexLayout items="center">
				{#if envs}
					<label class="env-select-label">
						<Iconify icon="mdi:earth" />
						<select
							class="input-field env-select"
							value={activeEnvId}
							on:change={(e) => { activeEnvId = (e.currentTarget as HTMLSelectElement).value; envDirty = true; persistEnvs(); }}
						>
							{#each envs.environments as env}
								<option value={env.id}>{env.name}</option>
							{/each}
						</select>
					</label>
					<Button variant="ghost" onClick={() => (showEnvEditor = true)}>
						<Iconify icon="mdi:cog-outline" /> Vars
					</Button>
				{/if}
				<Button variant="outlined" onClick={mergeAll}>
					<Iconify icon="mdi:refresh" /> Recargar
				</Button>
			</FlexLayout>
		</FlexLayout>
	</Card>

	<nav class="toptabs">
		<button class="toptab" class:active={topTab === "editor"} on:click={() => setTopTab("editor")}>
			<Iconify icon="mdi:form-textbox" /> Editor
		</button>
		<button class="toptab" class:active={topTab === "resumen"} on:click={() => setTopTab("resumen")}>
			<Iconify icon="mdi:file-document-outline" /> Resumen
		</button>
	</nav>

	{#if topTab === "editor"}
	<section class="layout">
		<aside class="sidebar">
			<H4>Entidades</H4>
			<FlexLayout direction="column">
				{#each meta.entities as ent}
					<button
						class="ent-item"
						class:active={ent.slug === selectedSlug}
						on:click={() => selectSlug(ent.slug)}
					>
						<FlexLayout items="center" justify="between">
							<Text><strong>{ent.name}</strong></Text>
							<span class="badge">{ent.count}</span>
						</FlexLayout>
						<Text color="neutral"><small>{ent.slug}</small></Text>
					</button>
				{/each}
			</FlexLayout>
		</aside>

		<div class="content">
			{#if !entity}
				<Card variant="flat"><Text color="neutral">Selecciona una entidad…</Text></Card>
			{:else}
				<Card>
					<FlexLayout direction="column">
						<FlexLayout items="center" justify="between">
							<H2>Entidad</H2>
							<FlexLayout items="center">
								{#if entityDirty}<Text color="warning">● sin guardar</Text>{/if}
								<Button variant="outlined" onClick={addRequest}>
									<Iconify icon="mdi:plus" /> Endpoint
								</Button>
								<Button color="success" loading={savingEntity} disabled={!entityDirty} onClick={saveEntity}>
									<Iconify icon="mdi:content-save" /> Guardar
								</Button>
							</FlexLayout>
						</FlexLayout>

						<label class="field">
							<Text color="neutral">Nombre de la carpeta</Text>
							<input
								class="input-field"
								type="text"
								bind:value={entity.name}
								on:input={markDirty}
							/>
						</label>
					</FlexLayout>
				</Card>

				<FlexLayout direction="column">
					{#each entity.item as item, i (i)}
						<Card variant="flat">
							<button class="item-header" on:click={() => toggleItem(i)}>
								<FlexLayout items="center" justify="between">
									<FlexLayout items="center">
										<span class="method method--{methodColor(item.request?.method)}">{item.request?.method ?? "?"}</span>
										<Text><strong>{item.name}</strong></Text>
									</FlexLayout>
									<FlexLayout items="center">
										<Text color="neutral"><small>{(item.response?.length ?? 0)} ej.</small></Text>
										<Iconify icon={expandedItem === i ? "mdi:chevron-up" : "mdi:chevron-down"} />
									</FlexLayout>
								</FlexLayout>
							</button>

							{#if expandedItem === i}
								<div class="item-body">
									<GridLayout cells="2">
										<label class="field">
											<Text color="neutral">Nombre</Text>
											<input class="input-field" type="text" bind:value={item.name} on:input={markDirty} />
										</label>
										<label class="field">
											<Text color="neutral">Método</Text>
											<select
												class="input-field"
												value={item.request?.method ?? "GET"}
												on:change={(e) => {
													if (!item.request) item.request = {};
													item.request.method = (e.currentTarget as HTMLSelectElement).value;
													markDirty();
												}}
											>
												<option>GET</option><option>POST</option><option>PUT</option>
												<option>PATCH</option><option>DELETE</option><option>HEAD</option>
											</select>
										</label>
									</GridLayout>

									<label class="field">
										<Text color="neutral">URL (raw)</Text>
										<input
											class="input-field"
											type="text"
											value={getUrlRaw(item.request)}
											on:input={(e) => setUrlRaw(item, (e.currentTarget as HTMLInputElement).value)}
										/>
									</label>

									<label class="field">
										<Text color="neutral">Descripción</Text>
										<textarea
											class="input-field textarea"
											rows="2"
											value={item.request?.description ?? ""}
											on:input={(e) => {
												if (!item.request) item.request = {};
												item.request.description = (e.currentTarget as HTMLTextAreaElement).value;
												markDirty();
											}}
										></textarea>
									</label>

									<label class="field">
										<Text color="neutral">Body (raw JSON)</Text>
										<textarea
											class="input-field textarea code"
											rows="6"
											value={item.request?.body?.raw ?? ""}
											on:input={(e) => setBodyRaw(item, (e.currentTarget as HTMLTextAreaElement).value)}
										></textarea>
									</label>

									<FlexLayout items="center" justify="between">
										<H4>Ejemplos / Respuestas ({item.response?.length ?? 0})</H4>
										<FlexLayout items="center">
											<Button variant="outlined" onClick={() => addResponse(item)}>
												<Iconify icon="mdi:plus" /> Ejemplo
											</Button>
											<Button color="danger" variant="ghost" onClick={() => removeRequest(i)}>
												<Iconify icon="mdi:trash-can" /> Eliminar endpoint
											</Button>
										</FlexLayout>
									</FlexLayout>

									{#each item.response ?? [] as resp, ri (ri)}
										<Card variant="flat">
											<button class="resp-header" on:click={() => toggleResponse(i, ri)}>
												<FlexLayout items="center" justify="between">
													<FlexLayout items="center">
														<span class="status status--{(resp.code ?? 0) < 300 ? 'ok' : (resp.code ?? 0) < 500 ? 'warn' : 'err'}">{resp.code ?? "—"}</span>
														<Text><strong>{resp.name ?? "(sin nombre)"}</strong></Text>
														<Text color="neutral"><small>{resp.status ?? ""}</small></Text>
													</FlexLayout>
													<Iconify icon={expandedResponse[i] === ri ? "mdi:chevron-up" : "mdi:chevron-down"} />
												</FlexLayout>
											</button>
											{#if expandedResponse[i] === ri}
												<div class="resp-body">
													<GridLayout cells="3">
														<label class="field">
															<Text color="neutral">Nombre</Text>
															<input class="input-field" type="text" bind:value={resp.name} on:input={markDirty} />
														</label>
														<label class="field">
															<Text color="neutral">Status</Text>
															<input class="input-field" type="text" bind:value={resp.status} on:input={markDirty} />
														</label>
														<label class="field">
															<Text color="neutral">Code</Text>
															<input class="input-field" type="number" bind:value={resp.code} on:input={markDirty} />
														</label>
													</GridLayout>
													<label class="field">
														<Text color="neutral">Body (JSON)</Text>
														<textarea
															class="input-field textarea code"
															rows="8"
															value={resp.body ?? ""}
															on:input={(e) => { resp.body = (e.currentTarget as HTMLTextAreaElement).value; markDirty(); }}
														></textarea>
													</label>
													<FlexLayout justify="end">
														<Button color="danger" variant="ghost" onClick={() => removeResponse(item, ri)}>
															<Iconify icon="mdi:trash-can" /> Eliminar ejemplo
														</Button>
													</FlexLayout>
												</div>
											{/if}
										</Card>
									{/each}
								</div>
							{/if}
						</Card>
					{/each}
				</FlexLayout>
			{/if}
		</div>
	</section>
	{/if}

	{#if topTab === "resumen"}
	<section class="resumen">
		<Card>
			<FlexLayout items="center" justify="between">
				<H2>Resumen · resultado final</H2>
				<FlexLayout items="center">
					<Button variant="outlined" onClick={loadFull}>
						<Iconify icon="mdi:refresh" /> Recargar
					</Button>
					<Button variant="outlined" onClick={copyFullCollection} disabled={!fullCollection}>
						<Iconify icon="mdi:content-copy" /> Copiar
					</Button>
					<Button color="success" onClick={downloadFullCollection} disabled={!fullCollection}>
						<Iconify icon="mdi:download" /> Descargar JSON
					</Button>
				</FlexLayout>
			</FlexLayout>
			<Text color="neutral"><small>Fuente: <code>doc/ISA-MigrarTblsBdd/postman-collection.json</code></small></Text>
		</Card>

		{#if !fullCollection}
			<Card variant="flat"><Text color="neutral">Cargando…</Text></Card>
		{:else}
			<Card>
				<pre class="resumen-pre">{JSON.stringify(fullCollection, null, 2)}</pre>
			</Card>
		{/if}
	</section>
	{/if}
{/if}
</div>

<!-- Modal: Editor de Environments -->
<Modal bind:bshow={showEnvEditor} onClose={() => { if (envDirty) persistEnvs(); showEnvEditor = false; }} style="width: 80dvw; height: 80dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center" gap="0.4rem">
			<Iconify icon="mdi:earth" />
			<Text><strong>Environments</strong></Text>
		</FlexLayout>
	</svelte:fragment>

	{#if envs}
		<FlexLayout direction="column" gap="0.5rem">
			<FlexLayout items="center" gap="0.5rem" style="flex-wrap: wrap;">
				{#each envs.environments as env}
					<Button
						variant={env.id === activeEnvId ? "solid" : "outlined"}
						onClick={() => { activeEnvId = env.id; envDirty = true; }}
					>
						{env.name}
					</Button>
				{/each}
				<span style="flex: 1;"></span>
				<Button color="success" disabled={!envDirty} onClick={persistEnvs}>
					<Iconify icon="mdi:content-save" /> Guardar
				</Button>
			</FlexLayout>

			{#each envs.environments as env (env.id)}
				{#if env.id === activeEnvId}
					<table class="env-table">
						<thead>
							<tr><th>Variable</th><th>Value</th><th>Type</th><th>Enabled</th><th></th></tr>
						</thead>
						<tbody>
							{#each env.values as v, vi (vi)}
								<tr>
									<td><input class="input-field" type="text" bind:value={v.key} on:input={() => (envDirty = true)} /></td>
									<td>
										<input
											class="input-field"
											type={v.type === "secret" ? "password" : "text"}
											bind:value={v.value}
											on:input={() => (envDirty = true)}
										/>
									</td>
									<td>
										<select class="input-field" bind:value={v.type} on:change={() => (envDirty = true)}>
											<option value="">default</option>
											<option value="secret">secret</option>
										</select>
									</td>
									<td><input type="checkbox" bind:checked={v.enabled} on:change={() => (envDirty = true)} /></td>
									<td>
										<Button color="danger" variant="ghost" onClick={() => { env.values = env.values.filter((_, i) => i !== vi); envDirty = true; envs = envs; }}>
											<Iconify icon="mdi:trash-can" />
										</Button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
					<FlexLayout justify="start">
						<Button variant="outlined" onClick={() => { env.values = [...env.values, { key: "", value: "", enabled: true }]; envDirty = true; envs = envs; }}>
							<Iconify icon="mdi:plus" /> Variable
						</Button>
					</FlexLayout>
				{/if}
			{/each}
		</FlexLayout>
	{/if}
</Modal>

<style>
	/* Los Button de ISP usan width:100% y min-width:16px → en filas flex
	   colapsan por debajo del contenido y el texto se sale del borde.
	   Forzamos que cada botón ocupe lo que necesita y no se encoja. */
	:global(.postman-panel button[data-variant]) {
		width: auto;
		min-width: max-content;
		flex: 0 0 auto;
		padding-inline: 0.85rem;
		white-space: nowrap;
	}

	.toptabs {
		display: flex;
		gap: 0.25rem;
		margin: 0.75rem 0 0.25rem;
		border-bottom: 1px solid var(--is-b-color);
	}
	.toptab {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.55rem 0.95rem;
		background: transparent;
		border: 1px solid transparent;
		border-bottom: none;
		border-radius: 6px 6px 0 0;
		color: inherit;
		cursor: pointer;
		font-size: 0.9rem;
		opacity: 0.7;
		transition: background 0.15s, opacity 0.15s, border-color 0.15s;
	}
	.toptab:hover { opacity: 1; background: var(--is-bg-secondary); }
	.toptab.active {
		opacity: 1;
		background: var(--is-bg-secondary);
		border-color: var(--is-b-color);
		color: dodgerblue;
	}

	.resumen, .swagger {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}
	.resumen-pre {
		max-height: 70dvh;
		overflow: auto;
		padding: 0.75rem;
		margin: 0;
		background: #0f1117;
		color: #d4d4d4;
		border-radius: 6px;
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		font-size: 0.78rem;
		line-height: 1.45;
	}

	.layout {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 1rem;
		margin-top: 1rem;
		align-items: start;
	}

	.sidebar {
		position: sticky;
		top: 1rem;
		max-height: calc(100vh - 6rem);
		overflow-y: auto;
		padding: 0.5rem;
		background: var(--is-bg-secondary);
		border: 1px solid var(--is-b-color);
		border-radius: 6px;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.ent-item {
		text-align: left;
		background: transparent;
		border: 1px solid transparent;
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		cursor: pointer;
		color: inherit;
	}
	.ent-item:hover { background: var(--is-bg-readonly); }
	.ent-item.active { background: var(--is-primary); color: white; }
	.ent-item.active :global(*) { color: white !important; }

	.badge {
		background: var(--is-bg-readonly);
		border-radius: 999px;
		padding: 0 0.5rem;
		font-size: 0.75rem;
	}
	.ent-item.active .badge { background: rgba(255,255,255,0.25); }

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}

	.input-field {
		background: var(--is-bg-secondary);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		padding: 0.4rem 0.6rem;
		color: inherit;
		font-family: inherit;
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
	}
	.textarea { resize: vertical; }
	.code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.8rem; }

	.item-header, .resp-header {
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		padding: 0.5rem 0.25rem;
		cursor: pointer;
		color: inherit;
	}
	.item-header:hover, .resp-header:hover { background: var(--is-bg-readonly); border-radius: 4px; }

	.item-body, .resp-body {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-top: 0.5rem;
	}

	.method {
		display: inline-block;
		font-family: ui-monospace, monospace;
		font-size: 0.75rem;
		font-weight: bold;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		min-width: 3.5rem;
		text-align: center;
	}
	.method--success { background: #1e7d3a; color: white; }
	.method--info    { background: #1f6feb; color: white; }
	.method--warning { background: #b45309; color: white; }
	.method--danger  { background: #b91c1c; color: white; }

	.status {
		display: inline-block;
		font-family: ui-monospace, monospace;
		font-size: 0.75rem;
		font-weight: bold;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		min-width: 2.5rem;
		text-align: center;
	}
	.status--ok   { background: #1e7d3a; color: white; }
	.status--warn { background: #b45309; color: white; }
	.status--err  { background: #b91c1c; color: white; }

	.env-select-label {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}
	.env-select { min-width: 11rem; }

	.env-table { width: 100%; border-collapse: collapse; }
	.env-table th, .env-table td {
		text-align: left;
		padding: 0.25rem;
		border-bottom: 1px solid var(--is-b-color);
		vertical-align: middle;
	}
	.env-table th { font-weight: 600; opacity: 0.85; }
</style>
