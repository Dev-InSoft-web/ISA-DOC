<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { io, type Socket } from "socket.io-client";
	import { marked } from "marked";
	import JsonViewer from "../viewers/JsonViewer.svelte";
	import CodeModal from "../viewers/CodeModal.svelte";
	import {
		Card, Button, H2, H4, Text, Loading, Modal,
		Toaster, toastError, toastSuccess,
		FlexLayout, GridLayout, Iconify,
		Tabs, TabItem,
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

	// Pestañas superiores (Editor / Resumen / Pruebas).
	let fullCollection: unknown = null;

	// === Environments / Runner ===
	type EnvVar = { key: string; value: string; type?: string; enabled?: boolean };
	type Environment = { id: string; name: string; values: EnvVar[] };
	type EnvironmentsFile = { active: string; environments: Environment[] };
	let envs: EnvironmentsFile | null = null;
	let activeEnvId = "";
	let showEnvEditor = false;
	let envDirty = false;

	// === Vista previa Markdown ===
	let showMdPreview = false;
	let mdPreviewTitle = "";
	let mdPreviewHtml = "";

	// === Pruebas en secuencia (verify-api) ===
	let verifyHost = "http://localhost:20040";
	let verifyRunning = false;
	let verifyOutput = "";
	let showVerifyConsole = false;
	let verifyOutputEl: HTMLDivElement | null = null;

	// === Modal CodeMirror reutilizable ===
	let codeModalShow = false;
	let codeModalTitle = "";
	let codeModalValue = "";
	function openCodeModal(title: string, value: string): void {
		codeModalTitle = title;
		codeModalValue = value ?? "";
		codeModalShow = true;
	}
	function appendVerifyChunk(chunk: string): void {
		verifyOutput += chunk;
		// Cap a ~200KB para evitar saturar el DOM en runs largos.
		if (verifyOutput.length > 200_000) verifyOutput = verifyOutput.slice(-200_000);
		queueMicrotask(() => {
			if (verifyOutputEl) verifyOutputEl.scrollTop = verifyOutputEl.scrollHeight;
		});
	}
	function startVerify(): void {
		if (verifyRunning) return;
		verifyOutput = "";
		showVerifyConsole = true;
		socket?.emit("verifyApi:run", { host: verifyHost.trim() }, (r: { ok: boolean; error?: string }) => {
			if (!r?.ok) {
				toastError(r?.error ?? "No se pudo iniciar la verificación");
				verifyRunning = false;
			}
		});
	}
	function stopVerify(): void {
		socket?.emit("verifyApi:kill", () => {});
	}

	function openMdPreview(title: string, md: string | undefined): void {
		mdPreviewTitle = title;
		const src = (md ?? "").trim();
		mdPreviewHtml = src ? (marked.parse(src, { async: false }) as string) : "<em>Sin descripción.</em>";
		showMdPreview = true;
	}

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
			if (r.ok) {
				envDirty = false;
				toastSuccess("Environments guardados · colección regenerada");
				loadFull();
			} else toastError(r.error ?? "Error guardando environments");
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
			if (r.ok) {
				entityDirty = false;
				toastSuccess("Entidad guardada · colección regenerada");
				loadList();
				loadFull();
			} else toastError(r.error ?? "Error guardando");
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
		socket.on("connect", () => { loadList(); loadEnvs(); loadFull(); });
		socket.on("verifyApi:started", () => { verifyRunning = true; });
		socket.on("verifyApi:stdout", (m: { data: string }) => appendVerifyChunk(m.data));
		socket.on("verifyApi:stderr", (m: { data: string }) => appendVerifyChunk(m.data));
		socket.on("verifyApi:exited", (m: { code: number; error?: string }) => {
			verifyRunning = false;
			appendVerifyChunk(`\n--- proceso finalizado (code=${m.code}${m.error ? `, error=${m.error}` : ""}) ---\n`);
		});
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
				<Button variant="outlined" onClick={copyFullCollection} disabled={!fullCollection}>
					<Iconify icon="mdi:content-copy" /> Copiar
				</Button>
				<Button color="success" onClick={downloadFullCollection} disabled={!fullCollection}>
					<Iconify icon="mdi:download" /> Descargar JSON
				</Button>
			</FlexLayout>
		</FlexLayout>
	</Card>

	<Tabs>
		<TabItem title="Editor" open>
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
									<Tabs>
										<TabItem title="Editor" open>
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

									<FlexLayout justify="end">
										<Button variant="outlined" onClick={() => openMdPreview(item.name, item.request?.description)}>
											<Iconify icon="mdi:eye-outline" /> Vista previa Markdown
										</Button>
									</FlexLayout>

									<FlexLayout items="center" justify="between">
										<Text color="neutral">Body (raw JSON)</Text>
										<Button variant="outlined" onClick={() => openCodeModal(`${item.name} · Body`, item.request?.body?.raw ?? "")}>
											<Iconify icon="mdi:eye-outline" /> Abrir en modal
										</Button>
									</FlexLayout>
									<label class="field">
										<textarea
											class="input-field textarea code"
											rows="6"
											value={item.request?.body?.raw ?? ""}
											on:input={(e) => setBodyRaw(item, (e.currentTarget as HTMLTextAreaElement).value)}
										></textarea>
									</label>

									<FlexLayout justify="end">
										<Button color="danger" variant="ghost" onClick={() => removeRequest(i)}>
											<Iconify icon="mdi:trash-can" /> Eliminar endpoint
										</Button>
									</FlexLayout>
										</TabItem>

										<TabItem title="Ejemplos ({item.response?.length ?? 0})">
									<FlexLayout items="center" justify="between">
										<H4>Ejemplos / Respuestas ({item.response?.length ?? 0})</H4>
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
													<Text color="neutral"><small>Body (JSON)</small></Text>														<FlexLayout justify="end">
															<Button variant="outlined" onClick={() => openCodeModal(`${item.name} · ${resp.name ?? "Ejemplo"}`, resp.body ?? "")}>
														<Iconify icon="mdi:eye-outline" /> Abrir en modal
															</Button>
														</FlexLayout>													<JsonViewer value={resp.body ?? ""} height="260px" />
													<FlexLayout justify="end">
														<Button color="danger" variant="ghost" onClick={() => removeResponse(item, ri)}>
															<Iconify icon="mdi:trash-can" /> Eliminar ejemplo
														</Button>
													</FlexLayout>
												</div>
											{/if}
										</Card>
									{/each}
										</TabItem>
									</Tabs>
								</div>
							{/if}
						</Card>
					{/each}
				</FlexLayout>
			{/if}
		</div>
	</section>
		</TabItem>

		<TabItem title="Resumen">
	<section class="resumen">
		<Card>
			<H2>Resumen · resultado final</H2>
			<Text color="neutral"><small>Fuente: <code>doc/ISA-DOC/postman-collection.json</code> · usa los botones del encabezado para Recargar / Copiar / Descargar.</small></Text>
		</Card>

		{#if !fullCollection}
			<Card variant="flat"><Text color="neutral">Cargando…</Text></Card>
		{:else}
			<Card>
				<JsonViewer value={JSON.stringify(fullCollection, null, 2)} height="70dvh" />
			</Card>
		{/if}
	</section>
		</TabItem>

		<TabItem title="Pruebas">
	<section class="pruebas">
		<Card>
			<FlexLayout items="center" justify="between">
				<div>
					<H2>Pruebas en secuencia</H2>
					<Text color="neutral"><small>Ejecuta el flujo completo de verificación de la API (catálogos, drivers, cursos, planes, etc.).</small></Text>
				</div>
				<FlexLayout items="center">
					{#if verifyRunning}
						<Button color="danger" onClick={stopVerify}>
							<Iconify icon="mdi:stop-circle-outline" /> Detener
						</Button>
					{:else}
						<Button color="success" onClick={startVerify}>
							<Iconify icon="mdi:play-circle-outline" /> Ejecutar
						</Button>
					{/if}
					<Button variant="ghost" onClick={() => (showVerifyConsole = true)} disabled={!verifyOutput && !verifyRunning}>
						<Iconify icon="mdi:console-line" /> Consola
					</Button>
				</FlexLayout>
			</FlexLayout>
			<label class="field">
				<Text color="neutral">Host de la API</Text>
				<input
					class="input-field"
					type="text"
					bind:value={verifyHost}
					placeholder="http://localhost:20040"
					disabled={verifyRunning}
				/>
			</label>
			<Text color="neutral"><small>
				Por defecto <code>http://localhost:20040</code>. Token leído desde <code>doc/test/token.json</code> (o <code>VERIFY_API_TOKEN</code>).
				Script: <code>scripts/run-verify-api.ts</code>.
			</small></Text>
		</Card>
	</section>
		</TabItem>
	</Tabs>
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
<!-- Modal: Vista previa Markdown -->
<Modal bind:bshow={showMdPreview} onClose={() => { showMdPreview = false; }} style="width: 70dvw; height: 70dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center" gap="0.4rem">
			<Iconify icon="mdi:eye-outline" />
			<Text><strong>{mdPreviewTitle}</strong></Text>
		</FlexLayout>
	</svelte:fragment>
	<div class="md-rendered">{@html mdPreviewHtml}</div>
</Modal>

<!-- Modal: Consola Pruebas en secuencia -->
<Modal bind:bshow={showVerifyConsole} onClose={() => { showVerifyConsole = false; }} style="width: 90dvw; height: 80dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center" gap="0.4rem">
			<Iconify icon="mdi:console-line" />
			<Text><strong>Pruebas API · {verifyHost}</strong></Text>
			{#if verifyRunning}<Text color="success"><small>· en ejecución</small></Text>{/if}
		</FlexLayout>
	</svelte:fragment>
	<FlexLayout items="center" justify="end" gap="0.4rem">
		{#if verifyRunning}
			<Button color="danger" variant="ghost" onClick={stopVerify}>
				<Iconify icon="mdi:stop-circle-outline" /> Detener
			</Button>
		{/if}
		<Button variant="ghost" onClick={() => { verifyOutput = ""; }}>
			<Iconify icon="mdi:trash-can-outline" /> Limpiar
		</Button>
	</FlexLayout>
	<div class="verify-console" bind:this={verifyOutputEl}>{verifyOutput}</div>
</Modal>

<CodeModal bind:bshow={codeModalShow} title={codeModalTitle} value={codeModalValue} language="json" />

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

	.md-rendered {
		padding: 0.5rem 0.25rem;
		line-height: 1.55;
		overflow: auto;
		height: 100%;
	}
	.md-rendered :global(table) { border-collapse: collapse; margin: 0.5rem 0; }
	.md-rendered :global(th), .md-rendered :global(td) {
		border: 1px solid var(--is-b-color);
		padding: 0.3rem 0.6rem;
	}
	.md-rendered :global(code) { background: var(--is-bg-secondary); padding: 0.1rem 0.3rem; border-radius: 4px; }
	.md-rendered :global(pre) { background: var(--is-bg-secondary); padding: 0.6rem; border-radius: 6px; overflow: auto; }

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

	.pruebas {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}
	.verify-console {
		flex: 1;
		min-height: 60dvh;
		max-height: 70dvh;
		overflow: auto;
		padding: 0.75rem;
		margin-top: 0.4rem;
		background: #0f1117;
		color: #d4d4d4;
		border-radius: 6px;
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		font-size: 0.78rem;
		line-height: 1.45;
		white-space: pre-wrap;
		word-break: break-word;
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
