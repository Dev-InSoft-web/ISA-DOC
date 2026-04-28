<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { io, type Socket } from "socket.io-client";
	import {
		Card, Button, H4, Text, Loading, Modal,
		Tabs, TabItem, Switch, Toaster, toastError, toastSuccess,
		FlexLayout, GridLayout, Iconify
	} from "@ingenieria_insoft/ispsveltecomponents";
	import CodeModal from "./CodeModal.svelte";
	import SqlViewer from "./SqlViewer.svelte";

	const LS_KEY = (id: string): string => `migration-sql:${id}`;

	// Categorías relevantes para extraer datos de tablas _OLD a nuevas tablas
	const MIGRATION_CATEGORIES = new Set(["Análisis", "Migración"]);

	type ActionParam = {
		key: string;
		label: string;
		type: "text" | "boolean" | "select";
		options?: string[];
		default?: string;
	};

	type ScriptAction = {
		id: string;
		name: string;
		description: string;
		category: string;
		severity: "info" | "warning" | "danger";
		command: string;
		args?: string[];
		params?: ActionParam[];
	};

	type LogEntry = {
		id: string;
		actionName: string;
		timestamp: string;
		ok: boolean;
		output: string;
	};

	type DbStatus = {
		ok: boolean;
		database?: string;
		serverTime?: string;
		tables?: string[];
		error?: string;
	};

	let actions: ScriptAction[] = [];
	let grouped: Record<string, ScriptAction[]> = {};
	let loading = true;
	let dbStatus: DbStatus | null = null;
	let runningId: string | null = null;
	let paramValues: Record<string, Record<string, string>> = {};
	let logs: LogEntry[] = [];
	let expandedLog: number | null = null;
	let showLogsModal = false;
	$: logsOk = logs.filter((l) => l.ok).length;
	$: logsErr = logs.length - logsOk;
	let socket: Socket | null = null;

	// Modal automático de código cuando el output del log parece código
	let codeModalShow = false;
	let codeModalTitle = "";
	let codeModalValue = "";
	let codeModalLanguage: "json" | "sql" = "json";

	// SQL generado y persistido por acción (localStorage)
	let savedSql: Record<string, string> = {};
	let generatingId: string | null = null;
	let executingSqlId: string | null = null;

	// Modal de ejecución de SQL guardado
	let execModalShow = false;
	let execModalTitle = "";
	let execModalActionId = "";
	let execModalSql = "";

	function detectLanguage(text: string): "json" | "sql" | null {
		const src = (text ?? "").trim();
		if (!src) return null;
		if ((src.startsWith("{") && src.endsWith("}")) || (src.startsWith("[") && src.endsWith("]"))) {
			try { JSON.parse(src); return "json"; } catch { /* not valid JSON */ }
		}
		if (/\b(SELECT|INSERT|UPDATE|DELETE|CREATE\s+TABLE|ALTER\s+TABLE|DROP\s+TABLE|MERGE)\b/i.test(src)) {
			return "sql";
		}
		return null;
	}

	function severityColor(s: string): "success" | "warning" | "danger" {
		if (s === "danger") return "danger";
		if (s === "warning") return "warning";
		return "success";
	}

	function loadActions(): void {
		socket?.emit("scripts:list", (data: ScriptAction[]) => {
			actions = data;
			const g: Record<string, ScriptAction[]> = {};
			for (const a of data) {
				if (!MIGRATION_CATEGORIES.has(a.category)) continue;
				if (!g[a.category]) g[a.category] = [];
				g[a.category].push(a);
				if (a.params) {
					paramValues[a.id] = {};
					for (const p of a.params) paramValues[a.id][p.key] = p.default ?? "";
				}
			}
			grouped = g;
			loading = false;
		});
	}

	function loadDbStatus(): void {
		socket?.emit("db:status", (data: DbStatus) => {
			dbStatus = data;
		});
	}

	function loadAllSavedSql(): void {
		if (typeof localStorage === "undefined") return;
		const next: Record<string, string> = {};
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i);
			if (!k || !k.startsWith("migration-sql:")) continue;
			next[k.slice("migration-sql:".length)] = localStorage.getItem(k) ?? "";
		}
		savedSql = next;
	}

	function persistSql(actionId: string, sql: string): void {
		if (typeof localStorage === "undefined") return;
		localStorage.setItem(LS_KEY(actionId), sql);
		savedSql = { ...savedSql, [actionId]: sql };
	}

	function extractSql(text: string): string {
		// Mantiene el output completo — el usuario puede editarlo en el modal
		// antes de ejecutar. Se quita prefijo común de logger "[xx] " si existe.
		return (text ?? "").replace(/\r/g, "");
	}

	function generateSql(action: ScriptAction): void {
		generatingId = action.id;
		runningId = action.id;
		const params: Record<string, string> = { ...(paramValues[action.id] ?? {}) };
		// Forzar dry-run en acciones que modifican BD
		if (action.severity !== "info") params["dry-run"] = "true";

		socket?.emit("script:exec", { id: action.id, params }, (data: { ok: boolean; output?: string; error?: string }) => {
			const ok = data.ok ?? false;
			const output = data.output ?? data.error ?? "Sin salida";
			logs = [{
				id: action.id,
				actionName: `Generar SQL · ${action.name}`,
				timestamp: new Date().toLocaleTimeString(),
				ok,
				output,
			}, ...logs];
			runningId = null;
			generatingId = null;
			if (ok) {
				const sql = extractSql(output);
				persistSql(action.id, sql);
				toastSuccess(`SQL generado y guardado · ${action.name}`);
				codeModalTitle = `SQL generado · ${action.name}`;
				codeModalValue = sql;
				codeModalLanguage = "sql";
				codeModalShow = true;
			} else {
				toastError(`Generación falló · ${action.name}`);
			}
		});
	}

	function openExecuteModal(action: ScriptAction): void {
		const sql = savedSql[action.id] ?? localStorage.getItem(LS_KEY(action.id)) ?? "";
		if (!sql.trim()) {
			toastError(`Sin SQL guardado. Use «Generar SQL» primero.`);
			return;
		}
		execModalActionId = action.id;
		execModalTitle = `Ejecutar SQL guardado · ${action.name}`;
		execModalSql = sql;
		execModalShow = true;
	}

	function saveEditedExecModalSql(): void {
		persistSql(execModalActionId, execModalSql);
		toastSuccess("SQL actualizado en localStorage");
	}

	function confirmExecuteSavedSql(): void {
		if (!execModalSql.trim()) { toastError("SQL vacío"); return; }
		const confirmed = confirm(`⚠️ Se va a ejecutar el SQL guardado contra la BD.\n\n¿Continuar?`);
		if (!confirmed) return;
		executingSqlId = execModalActionId;
		socket?.emit("sql:exec", { sql: execModalSql }, (data: { ok: boolean; output?: string; error?: string }) => {
			const ok = data.ok ?? false;
			const output = data.output ?? data.error ?? "Sin salida";
			logs = [{
				id: execModalActionId,
				actionName: `Ejecutar SQL guardado · ${execModalActionId}`,
				timestamp: new Date().toLocaleTimeString(),
				ok,
				output,
			}, ...logs];
			executingSqlId = null;
			if (ok) {
				toastSuccess("SQL ejecutado correctamente");
				execModalShow = false;
				loadDbStatus();
			} else {
				toastError("Ejecución SQL falló");
			}
		});
	}

	function executeAction(action: ScriptAction): void {
		if (action.severity === "danger") {
			const confirmed = confirm(`⚠️ ACCIÓN DESTRUCTIVA\n\n${action.name}\n${action.description}\n\n¿Continuar?`);
			if (!confirmed) return;
		}
		runningId = action.id;
		const params = paramValues[action.id] ?? {};

		socket?.emit("script:exec", { id: action.id, params }, (data: { ok: boolean; output?: string; error?: string }) => {
			const ok = data.ok ?? false;
			if (ok) toastSuccess(`${action.name} completado`);
			else toastError(`${action.name} falló`);
			const output = data.output ?? data.error ?? "Sin salida";
			logs = [{
				id: action.id,
				actionName: action.name,
				timestamp: new Date().toLocaleTimeString(),
				ok,
				output,
			}, ...logs];
			runningId = null;
			if (ok) {
				persistSql(action.id, extractSql(output));
				const lang = detectLanguage(output);
				if (lang) {
					codeModalTitle = action.name;
					codeModalValue = output;
					codeModalLanguage = lang;
					codeModalShow = true;
				}
			}
		});
	}

	function setBoolParam(actionId: string, key: string, checked: boolean): void {
		if (!paramValues[actionId]) paramValues[actionId] = {};
		paramValues[actionId][key] = checked ? "true" : "false";
		paramValues = paramValues;
	}

	function setTextParam(actionId: string, key: string, value: string): void {
		if (!paramValues[actionId]) paramValues[actionId] = {};
		paramValues[actionId][key] = value;
		paramValues = paramValues;
	}

	function toggleLog(idx: number): void {
		expandedLog = expandedLog === idx ? null : idx;
	}

	onMount(() => {
		const url = `http://${location.hostname}:4401`;
		socket = io(url, { transports: ["websocket"] });
		socket.on("connect", () => {
			loadActions();
			loadDbStatus();
		});
		loadAllSavedSql();
	});

	onDestroy(() => {
		socket?.disconnect();
	});
</script>

<Toaster />

{#if loading}
	<Loading bShow={true} />
{:else}
	<Card variant="flat">
		<FlexLayout items="center">
			<Iconify icon="mdi:database-arrow-right" />
			<div>
				<H4>Migración de datos · CAPAC_*_OLD → tablas nuevas</H4>
				<Text color="neutral"><small>Extrae registros desde las tablas legacy <code>CAPAC_*_OLD</code> y los inserta en las tablas destino. Use «Análisis» para inspeccionar antes y «Migración» para generar y ejecutar el SQL.</small></Text>
			</div>
		</FlexLayout>
	</Card>

	<Card variant="flat">
		<FlexLayout items="center">
			<Iconify icon={dbStatus?.ok ? "mdi:database-check" : "mdi:database-alert"} />
			<div>
				<H4 color={dbStatus?.ok ? "success" : "error"}>Conexión a BD</H4>
				{#if dbStatus?.ok}
					<Text color="color">
						<strong>{dbStatus.database}</strong> — {dbStatus.tables?.length ?? 0} tablas CAPAC
					</Text>
				{:else}
					<Text color="error">{dbStatus?.error ?? "Sin conexión"}</Text>
				{/if}
			</div>
			<span class="spacer"></span>
			<FlexLayout items="center">
				<Button variant="outlined" onClick={loadDbStatus} style="width: fit-content;">
					<Iconify icon="mdi:refresh" /> <span>Refrescar</span>
				</Button>
				{#if logs.length > 0}
					<Button variant="outlined" onClick={() => (showLogsModal = true)} style="width: fit-content;">
						<Iconify icon="mdi:history" />
						<span>Log ({logsOk}/{logs.length}{logsErr ? " • " + logsErr + " err" : ""})</span>
					</Button>
				{/if}
			</FlexLayout>
		</FlexLayout>
	</Card>

	<section class="section">
		<Tabs>
			{#each Object.entries(grouped) as [category, catActions], i}
				<TabItem title={category} open={i === 0}>
					<div class="tab-content">
						<GridLayout cells="3">
							{#each catActions as action}
								<Card>
									<FlexLayout direction="column">
										<FlexLayout justify="between" items="start">
											<div>
												<H4>{action.name}</H4>
												<Text color="neutral" lines={2}>{action.description}</Text>
											</div>
											{#if action.severity === "danger"}
												<Text color="danger"><strong>destructivo</strong></Text>
											{:else if action.severity === "warning"}
												<Text color="warning"><strong>modifica</strong></Text>
											{/if}
										</FlexLayout>

										{#if action.params && action.params.length}
											<FlexLayout direction="column">
												{#each action.params as param}
													{#if param.type === "boolean"}
														<FlexLayout items="center">
															<Switch
																checked={paramValues[action.id]?.[param.key] === "true"}
																on:change={(e) => setBoolParam(action.id, param.key, !!(e as CustomEvent<{ checked: boolean }>).detail?.checked)}
															/>
															<Text>{param.label}</Text>
														</FlexLayout>
													{:else}
														<label class="param-field">
															<Text color="neutral">{param.label}</Text>
															<input
																type="text"
																value={paramValues[action.id]?.[param.key] ?? ""}
																on:input={(e) => setTextParam(action.id, param.key, (e.currentTarget as HTMLInputElement).value)}
																class="input-field"
																placeholder={param.default || ""}
															/>
														</label>
													{/if}
												{/each}
											</FlexLayout>
										{/if}

										<span class="spacer"></span>

										{#if action.severity === "info"}
											<Button
												color={severityColor(action.severity)}
												disabled={runningId !== null}
												loading={runningId === action.id}
												onClick={() => executeAction(action)}
											>
												{runningId === action.id ? "Ejecutando..." : "Ejecutar"}
											</Button>
										{:else}
											<div class="btn-row">
												<Button
													variant="outlined"
													disabled={runningId !== null}
													loading={generatingId === action.id}
													onClick={() => generateSql(action)}
												>
													<Iconify icon="mdi:script-text-outline" />
													<span>{generatingId === action.id ? "Generando..." : "Generar SQL"}</span>
												</Button>
												<Button
													color={severityColor(action.severity)}
													disabled={runningId !== null || !(savedSql[action.id] && savedSql[action.id].trim())}
													onClick={() => openExecuteModal(action)}
												>
													<Iconify icon="mdi:play" />
													<span>Ejecutar SQL</span>
												</Button>
											</div>
										{/if}

										<Text color="neutral" lines={1}><small class="command-text">{action.command}</small></Text>
									</FlexLayout>
								</Card>
							{/each}
						</GridLayout>
					</div>
				</TabItem>
			{/each}
		</Tabs>
	</section>

	{#if logs.length > 0}
		<Modal bind:bshow={showLogsModal} onClose={() => (showLogsModal = false)} style="width: 90dvw; height: 80dvh;">
			<svelte:fragment slot="title">
				<FlexLayout items="center" gap="0.4rem">
					<Iconify icon="mdi:history" />
					<Text><strong>Log de ejecución</strong> <small style="opacity: 0.7;">({logsOk} ok / {logsErr} err / {logs.length} total)</small></Text>
					<span style="flex: 1;"></span>
					<Button variant="ghost" onClick={() => { logs = []; expandedLog = null; }}>
						<Iconify icon="mdi:trash-can-outline" /> <span>Limpiar</span>
					</Button>
				</FlexLayout>
			</svelte:fragment>

			<FlexLayout direction="column">
				{#each logs as log, idx}
					<Card variant="flat">
						<button class="log-toggle" on:click={() => toggleLog(idx)}>
							<FlexLayout items="center">
								<Iconify icon={log.ok ? "mdi:check-circle" : "mdi:alert-circle"} />
								<Text color={log.ok ? "success" : "error"}><strong>{log.actionName}</strong></Text>
								<span class="spacer"></span>
								<Text color="neutral"><small>{log.timestamp}</small></Text>
							</FlexLayout>
						</button>
						{#if expandedLog === idx}
							<pre class="log-output">{log.output}</pre>
						{/if}
					</Card>
				{/each}
			</FlexLayout>
		</Modal>
	{/if}
{/if}

<CodeModal bind:bshow={codeModalShow} title={codeModalTitle} value={codeModalValue} language={codeModalLanguage} />

<Modal bind:bshow={execModalShow} onClose={() => (execModalShow = false)} style="width: 90dvw; height: 80dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center">
			<Iconify icon="mdi:play-circle-outline" />
			<Text><strong>{execModalTitle}</strong></Text>
		</FlexLayout>
	</svelte:fragment>

	<div class="exec-wrap">
		<Text color="neutral"><small>SQL persistido en <code>localStorage["migration-sql:{execModalActionId}"]</code>. Puédeslo editar antes de ejecutar.</small></Text>
		<div class="exec-viewer">
			<SqlViewer bind:value={execModalSql} editable={true} />
		</div>
		<FlexLayout justify="end" items="center">
			<Button variant="outlined" onClick={() => (execModalShow = false)} disabled={executingSqlId !== null}>
				<Iconify icon="mdi:close" /> <span>Cerrar</span>
			</Button>
			<Button variant="outlined" onClick={saveEditedExecModalSql} disabled={executingSqlId !== null}>
				<Iconify icon="mdi:content-save-outline" /> <span>Guardar</span>
			</Button>
			<Button color="danger" onClick={confirmExecuteSavedSql} loading={executingSqlId !== null}>
				<Iconify icon="mdi:play" /> <span>{executingSqlId ? "Ejecutando..." : "Confirmar y ejecutar"}</span>
			</Button>
		</FlexLayout>
	</div>
</Modal>

<style>
	.section {
		margin-top: 1.5rem;
	}

	.spacer {
		flex: 1;
	}

	.tab-content {
		padding: 0.5rem;
	}

	.param-field {
		display: flex;
		flex-direction: column;
	}

	.input-field {
		background: var(--is-bg-secondary);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		color: var(--is-color);
		outline: none;
	}

	.input-field:focus {
		border-color: var(--is-primary);
	}

	.command-text {
		font-family: monospace;
		opacity: 0.5;
	}

	.log-toggle {
		width: 100%;
		padding: 0.5rem;
		text-align: left;
		cursor: pointer;
		background: none;
		border: none;
		color: inherit;
	}

	.log-output {
		padding: 0.5rem;
		max-height: 300px;
		overflow: auto;
		background: var(--is-bg-secondary);
		font-family: monospace;
		font-size: 0.75rem;
		white-space: pre-wrap;
	}

	.exec-wrap {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		gap: 0.5rem;
	}
	.exec-viewer {
		flex: 1 1 auto;
		min-height: 0;
		overflow: hidden;
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
	}

	.btn-row {
		display: flex;
		flex-direction: row;
		gap: 0.4rem;
		width: 100%;
		min-width: 0;
	}
	.btn-row :global(button[data-variant]) {
		flex: 1 1 0;
		min-width: 0;
		width: 100%;
	}
</style>
