<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { io, type Socket } from "socket.io-client";
	import {
		Card,
		Button,
		H4,
		Text,
		Loading,
		Tabs,
		TabItem,
		Toaster,
		toastError,
		toastSuccess,
		FlexLayout,
		GridLayout,
		Iconify,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectGroupList from "../projects/ProjectGroupList.svelte";
	import ProjectActionCard from "../projects/ProjectActionCard.svelte";

	interface ProjectAction {
		id: string;
		label: string;
		type: string;
		command: string;
		cwd: string;
		needsPassword?: boolean;
		description?: string;
		longRunning?: boolean;
		hostPattern?: string;
		swaggerUrl?: string;
	}

	interface ProjectEntry {
		id: string;
		name: string;
		description: string;
		icon: string;
		cwd: string;
		group?: "clientesis" | "contapymeu" | "shared";
		actions: ProjectAction[];
	}

	// Definición de derivados (sub-proyectos que crecen como pestañas dentro de ClientesIS).
	const DERIVATIVES: { key: "contapymeu"; label: string }[] = [
		{ key: "contapymeu", label: "ContaPymeU" },
	];

	// Proyectos que componen ContaPymeU (orden de pestañas).
	const CONTAPYMEU_PROJECTS: { id: string; label: string }[] = [
		{ id: "isp-sc", label: "ISP-SvelteComponents" },
		{ id: "isp-cli", label: "ISP-ClientesIS" },
		{ id: "isp-srv", label: "ISP-CLientesISServer" },
		{ id: "iss", label: "ISS-ClientesIS-ContaPymeU" },
		{ id: "isw", label: "ISW-ClientesIS" },
	];

	function findProject(id: string): ProjectEntry | undefined {
		return projects.find((p) => p.id === id);
	}

	const OUTER_TABS: { key: "clientesis" | "shared"; label: string }[] = [
		{ key: "clientesis", label: "ClientesIS" },
		{ key: "shared", label: "Compartidos" },
	];

	let projects: ProjectEntry[] = [];
	let projectsByGroup: Record<string, ProjectEntry[]> = { clientesis: [], contapymeu: [], shared: [] };

	// Acción general "Descargar iconos" que encadena los iconify de ISP-SC, ISW e ISA.
	const base = "C:/Users/JAGUDELOE/Documents/Contapyme";
	const ICONIFY_ALL: ProjectAction = {
		id: "iconify-all",
		label: "Descargar iconos (todos)",
		type: "build",
		command: [
			`npm --prefix "${base}/ISP-SvelteComponents" run iconify`,
			`npm --prefix "${base}/ClientesIS/ISW-ClientesIS" run iconify`,
			`npm --prefix "${base}/ClientesIS/doc/ISA-DOC" run iconify`,
		].join(" && "),
		cwd: `${base}/ClientesIS`,
		description: "Encadena iconify de ISP-SC + ISW + ISA",
	};

	// Helpers para construir grupos visuales en clientesis (sin las acciones iconify per-proyecto).
	$: clientesisAll = projectsByGroup.clientesis ?? [];
	$: ispProjects = clientesisAll.filter((p) => p.id === "isp-cli" || p.id === "isp-srv");
	$: iswProjects = clientesisAll.filter((p) => p.id === "isw");
	$: syncProjects = clientesisAll.filter((p) => p.id === "sync");
	$: ispActions = ispProjects.flatMap((p) =>
		p.actions
			.filter((a) => !a.id.endsWith("-iconify"))
			.map((a) => ({ project: p, action: a })),
	);
	$: iswActions = iswProjects.flatMap((p) =>
		p.actions
			.filter((a) => !a.id.endsWith("-iconify"))
			.map((a) => ({ project: p, action: a })),
	);
	$: syncActions = syncProjects.flatMap((p) =>
		p.actions.map((a) => ({ project: p, action: a })),
	);
	let loading = true;
	let socket: Socket | null = null;
	let runningActions: Set<string> = new Set();
	let outputs: Map<string, string> = new Map();
	let hosts: Map<string, string> = new Map();
	let openMap: Record<string, boolean> = {};
	let passwordActionId: string | null = null;
	let passwordInput = "";
	let iframeUrl: string | null = null;

	function openIframe(url: string): void {
		iframeUrl = url;
	}

	function setRunning(id: string, on: boolean): void {
		const next = new Set(runningActions);
		if (on) next.add(id);
		else next.delete(id);
		runningActions = next;
	}

	const OUTPUT_BUFFER_LIMIT = 200_000; // ~200KB por acción para no inflar memoria con stdout muy ruidoso
	// Bateo de chunks: al cerrarse procesos como `func`/`astro`, stdout/stderr se flushean en ráfagas
	// muy rápidas. Acumulamos los chunks y publicamos a lo sumo una vez por frame para evitar miles
	// de re-renders en cadena que congelaban la UI al finalizar.
	const pendingChunks = new Map<string, string>();
	let flushScheduled = false;
	function flushPending(): void {
		flushScheduled = false;
		if (pendingChunks.size === 0) return;
		const next = new Map(outputs);
		for (const [id, chunk] of pendingChunks) {
			const merged = (next.get(id) ?? "") + chunk;
			next.set(id, merged.length > OUTPUT_BUFFER_LIMIT ? merged.slice(-OUTPUT_BUFFER_LIMIT) : merged);
		}
		pendingChunks.clear();
		outputs = next;
	}
	function appendOutput(id: string, chunk: string): void {
		pendingChunks.set(id, (pendingChunks.get(id) ?? "") + chunk);
		if (flushScheduled) return;
		flushScheduled = true;
		if (typeof requestAnimationFrame === "function") requestAnimationFrame(flushPending);
		else setTimeout(flushPending, 16);
	}

	function setHost(id: string, host: string): void {
		const next = new Map(hosts);
		next.set(id, host);
		hosts = next;
	}

	function execAction(action: ProjectAction): void {
		if (!socket?.connected) {
			toastError("Socket no conectado");
			return;
		}
		socket.emit("exec", {
			actionId: action.id,
			command: action.command,
			cwd: action.cwd,
			needsPassword: action.needsPassword ?? false,
			hostPattern: action.hostPattern,
		});
	}

	function restartAction(action: ProjectAction): void {
		if (!socket?.connected) {
			toastError("Socket no conectado");
			return;
		}
		socket.emit("restart", {
			actionId: action.id,
			command: action.command,
			cwd: action.cwd,
			needsPassword: action.needsPassword ?? false,
			hostPattern: action.hostPattern,
		});
	}

	function killAction(actionId: string): void {
		socket?.emit("kill", { actionId });
	}

	function submitPassword(): void {
		if (!passwordActionId || !passwordInput) return;
		socket?.emit("password", { actionId: passwordActionId, password: passwordInput });
		passwordActionId = null;
		passwordInput = "";
	}

	function actionTypeIcon(type: string): string {
		const icons: Record<string, string> = {
			dev: "mdi:play-circle-outline",
			build: "mdi:hammer",
			start: "mdi:rocket-launch-outline",
			pub: "mdi:cloud-upload-outline",
			sync: "mdi:sync",
			func: "mdi:function-variant",
			custom: "mdi:cog-outline",
		};
		return icons[type] ?? "mdi:cog-outline";
	}

	function onPasswordKey(e: KeyboardEvent): void {
		if (e.key === "Enter") submitPassword();
	}

	onMount(() => {
		const url = `http://${location.hostname}:4401`;
		socket = io(url, { transports: ["websocket"] });

		socket.on("connect", () => {
			socket?.emit("projects:list", (data: ProjectEntry[]) => {
				projects = data ?? [];
				const grp: Record<string, ProjectEntry[]> = { clientesis: [], contapymeu: [], shared: [] };
				for (const p of projects) {
					const g = p.group ?? "shared";
					(grp[g] ??= []).push(p);
				}
				projectsByGroup = grp;
				loading = false;
			});
		});

		socket.on("started", ({ actionId }: { actionId: string }) => {
			setRunning(actionId, true);
			outputs = new Map(outputs).set(actionId, "");
		});
		socket.on("stdout", ({ actionId, data }: { actionId: string; data: string }) => appendOutput(actionId, data));
		socket.on("stderr", ({ actionId, data }: { actionId: string; data: string }) => appendOutput(actionId, data));
		socket.on("exited", ({ actionId, code }: { actionId: string; code: number | null }) => {
			setRunning(actionId, false);
			if (code === 0) toastSuccess(`${actionId} finalizado`);
			else toastError(`${actionId} salió con código ${code}`);
		});
		socket.on("error", ({ actionId, message }: { actionId?: string; message: string }) => {
			if (actionId) setRunning(actionId, false);
			toastError(message ?? "Error desconocido");
		});
		socket.on("status", ({ running }: { running: string[] }) => {
			runningActions = new Set(running ?? []);
		});
		socket.on("host", ({ actionId, host }: { actionId: string; host: string }) => setHost(actionId, host));
		socket.on("password-request", ({ actionId }: { actionId: string }) => {
			passwordActionId = actionId;
			passwordInput = "";
		});
		socket.on("password-accepted", () => {
			passwordActionId = null;
			toastSuccess("Contraseña aceptada");
		});
		socket.on("password-rejected", () => toastError("Contraseña incorrecta"));
	});

	onDestroy(() => {
		socket?.disconnect();
	});
</script>

<Toaster />

{#if loading}
	<Loading bShow={true} />
{:else}
	<Tabs>
		{#each OUTER_TABS as outer, oi (outer.key)}
			<TabItem title={outer.label} open={oi === 0}>
				<div class="tab-content">
					{#if outer.key === "shared"}
						<ProjectGroupList
							projects={projectsByGroup.shared ?? []}
							{runningActions}
							{outputs}
							{hosts}
							bind:openMap
							onRun={execAction}
							onStop={killAction}
							onRestart={restartAction}
						/>
					{:else}
						<!-- 3 columnas planas (CSS grid directo, sin envoltorios que recorten ancho) -->
						<div class="general-grid">
							<!-- COL 1: ISPs (un card con un botón por cada ISP) -->
							<Card variant="flat" class="group-card">
								<FlexLayout direction="column" items="stretch">
									<H4>ISPs · Publicar</H4>
									{#each ispActions as entry (entry.action.id)}
										<ProjectActionCard
											action={{ ...entry.action, label: `Publicar ${entry.project.name}` }}
											running={runningActions.has(entry.action.id)}
											host={hosts.get(entry.action.id)}
											output={outputs.get(entry.action.id)}
											onRun={() => execAction(entry.action)}
											onStop={() => killAction(entry.action.id)}
											onRestart={() => restartAction(entry.action)}
											onOpen={(url) => openIframe(url)}
										/>
									{/each}
								</FlexLayout>
							</Card>

							<!-- COL 2: ISW -->
							<Card variant="flat" class="group-card">
								<FlexLayout direction="column" items="stretch">
									<H4>ISW-ClientesIS</H4>
									{#each iswActions as entry (entry.action.id)}
										<ProjectActionCard
											action={entry.action}
											running={runningActions.has(entry.action.id)}
											host={hosts.get(entry.action.id)}
											output={outputs.get(entry.action.id)}
											onRun={() => execAction(entry.action)}
											onStop={() => killAction(entry.action.id)}
											onRestart={() => restartAction(entry.action)}
											onOpen={(url) => openIframe(url)}
										/>
									{/each}
								</FlexLayout>
							</Card>

							<!-- COL 3: Acciones generales (Sync + Iconify-all) -->
							<Card variant="flat" class="group-card">
								<FlexLayout direction="column" items="stretch">
									<H4>Acciones</H4>
									<ProjectActionCard
										action={ICONIFY_ALL}
										running={runningActions.has(ICONIFY_ALL.id)}
										output={outputs.get(ICONIFY_ALL.id)}
										onRun={() => execAction(ICONIFY_ALL)}
										onStop={() => killAction(ICONIFY_ALL.id)}
										onRestart={() => restartAction(ICONIFY_ALL)}
									/>
									{#each syncActions as entry (entry.action.id)}
										<ProjectActionCard
											action={entry.action}
											running={runningActions.has(entry.action.id)}
											host={hosts.get(entry.action.id)}
											output={outputs.get(entry.action.id)}
											onRun={() => execAction(entry.action)}
											onStop={() => killAction(entry.action.id)}
											onRestart={() => restartAction(entry.action)}
											onOpen={(url) => openIframe(url)}
										/>
									{/each}
								</FlexLayout>
							</Card>
						</div>

						<!-- Tabs derivados (ContaPymeU, etc) -->
						<Tabs>
							{#each DERIVATIVES as deriv, di (deriv.key)}
								<TabItem title={deriv.label} open={di === 0}>
									<div class="tab-content">
										<!-- Todos los proyectos consolidados en el mismo panel -->
										<FlexLayout direction="column" items="stretch">
											{#each CONTAPYMEU_PROJECTS as proj (proj.id)}
												{@const project = findProject(proj.id)}
												{@const filteredActions = project ? project.actions.filter((a) => !a.id.endsWith("-pub") && !a.id.endsWith("-iconify")) : []}
												{#if project && filteredActions.length > 0}
													<Card variant="flat" class="group-card">
														<FlexLayout direction="column" items="stretch">
															<H4>{proj.label}</H4>
															<Text color="neutral"><small>{project.cwd}</small></Text>
															<GridLayout cells="3" items="stretch">
																{#each filteredActions as action (action.id)}
																	<ProjectActionCard
																		{action}
																		projectName={project.name}
																		projectIcon={project.icon}
																		running={runningActions.has(action.id)}
																		host={hosts.get(action.id)}
																		output={outputs.get(action.id)}
																		onRun={() => execAction(action)}
																		onStop={() => killAction(action.id)}
																		onRestart={() => restartAction(action)}
																		onOpen={(url) => openIframe(url)}
																	/>
																{/each}
															</GridLayout>
														</FlexLayout>
													</Card>
												{/if}
											{/each}
										</FlexLayout>
									</div>
								</TabItem>
							{/each}
						</Tabs>
					{/if}
				</div>
			</TabItem>
		{/each}
	</Tabs>

	{#if iframeUrl}
		<div class="iframe-overlay" on:click|self={() => (iframeUrl = null)} role="presentation">
			<div class="iframe-modal">
				<div class="iframe-bar">
					<Iconify icon="mdi:open-in-new" />
					<Text class="iframe-url" lines={1}>{iframeUrl}</Text>
					<Button variant="ghost" onClick={() => window.open(iframeUrl!, "_blank")}>Abrir en pestaña</Button>
					<Button color="danger" variant="ghost" onClick={() => (iframeUrl = null)}>Cerrar</Button>
				</div>
				<iframe src={iframeUrl} title="App preview" class="iframe-frame" referrerpolicy="no-referrer"></iframe>
			</div>
		</div>
	{/if}

	{#if passwordActionId}
		<div class="password-overlay">
			<Card>
				<FlexLayout direction="column">
					<H4>Contraseña requerida</H4>
					<Text color="neutral">Acción: <strong>{passwordActionId}</strong></Text>
					<input
						type="password"
						bind:value={passwordInput}
						class="input-field"
						placeholder="Contraseña"
						on:keydown={onPasswordKey}
					/>
					<FlexLayout justify="end">
						<Button variant="ghost" onClick={() => { passwordActionId = null; }}>Cancelar</Button>
						<Button color="primary" onClick={submitPassword}>Enviar</Button>
					</FlexLayout>
				</FlexLayout>
			</Card>
		</div>
	{/if}
{/if}

<style>
	.tab-content {
		padding: 1rem;
		overflow: auto;
	}

	.general-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
		width: 100%;
		padding-bottom: 0.5rem;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid var(--is-b-color, #80808050);
	}
	@media (max-width: 900px) {
		.general-grid { grid-template-columns: 1fr; }
	}

	.iframe-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.65);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1100;
	}
	.iframe-modal {
		width: 95dvw;
		height: 95dvh;
		background: var(--is-bg-secondary, #1f1f1f);
		border: 1px solid var(--is-b-color, #80808050);
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.iframe-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.75rem;
		border-bottom: 1px solid var(--is-b-color, #80808050);
		flex-shrink: 0;
	}
	.iframe-bar :global(.iframe-url) {
		flex: 1;
		min-width: 0;
	}
	.iframe-frame {
		flex: 1 1 auto;
		width: 100%;
		border: 0;
		background: white;
	}

	/* Group card: padding y altura completa cuando se usa dentro de la grid. */
	:global(.group-card) {
		padding: 0.75rem;
		height: 100%;
	}

	/* Sub-tabs anidados: anular margen superior duplicado y dar respiración. */
	.tab-content :global(.tabs-ul) {
		margin-top: 0;
		margin-bottom: 0.25rem;
		border-bottom: 1px solid var(--is-b-color, #80808050);
		padding-bottom: 4px;
	}

	/* El contenedor interior no debe heredar el borde del exterior. */
	.tab-content :global(.tabs-content) {
		border: none;
		border-radius: 0;
		overflow: visible;
		padding: 0.25rem 0 0;
	}

	/* Estilo más sutil para las pestañas internas. */
	.tab-content :global(.tab-item button) {
		font-size: 0.875rem;
		padding: 0.4rem 0.85rem;
	}

	.password-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.input-field {
		background: var(--is-bg-secondary);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		padding: 0.5rem;
		color: var(--is-color);
		outline: none;
	}
</style>
