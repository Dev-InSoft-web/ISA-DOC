import { Server, type Socket } from "socket.io";
import { spawn, type ChildProcess } from "node:child_process";
import { PROJECTS } from "./projects-registry.js";
import { SCRIPT_ACTIONS } from "./scripts-registry.js";
import { openPool, resolveSettingsPath } from "./db.js";
import {
	loadCollectionMeta, loadEntity, saveEntity, saveCollectionVariables,
	mergeCollection, splitCollection, loadEnvironments, saveEnvironments,
	type EntityFile, type EnvironmentsFile,
} from "./postman/store.js";

let io: Server | null = null;

// Estado global persistente entre HMR de Astro: si re-importan este módulo,
// los procesos en ejecución no quedan huérfanos NI el `io` queda obsoleto
// para los listeners (close/exit) que cierran sobre el módulo.
interface SocketServerState {
	io: { current: Server | null };
	runningProcesses: Map<string, ChildProcess>;
	pendingPasswordActions: Map<string, { command: string; cwd: string; hostPattern?: string }>;
	processMeta: Map<string, { command: string; cwd: string; hostPattern?: string }>;
	detectedHosts: Map<string, string>;
}
const G = globalThis as unknown as { __ISA_SS_STATE__?: SocketServerState };
const state: SocketServerState = G.__ISA_SS_STATE__ ?? {
	io: { current: null },
	runningProcesses: new Map(),
	pendingPasswordActions: new Map(),
	processMeta: new Map(),
	detectedHosts: new Map(),
};
G.__ISA_SS_STATE__ = state;
const { runningProcesses, pendingPasswordActions, processMeta, detectedHosts } = state;
io = state.io.current;
const PASSWORD = "1234";

interface ExecPayload {
	actionId: string;
	command: string;
	cwd: string;
	needsPassword?: boolean;
	hostPattern?: string;
}

interface ScriptExecPayload {
	id: string;
	params?: Record<string, string>;
}

interface PasswordPayload {
	actionId: string;
	password: string;
}

interface StdinPayload {
	actionId: string;
	text: string;
}

export function initSocketServer(port = 4401): Server | null {
	const previous = state.io.current;
	if (previous) {
		// HMR / re-init: cerrar el viejo para registrar handlers actualizados.
		try { previous.close(); } catch { /* noop */ }
		state.io.current = null;
		io = null;
	}
	try {
		const next = new Server(port, {
			cors: { origin: "*" },
			path: "/socket.io",
		});
		next.on("connection", handleConnection);
		state.io.current = next;
		io = next;
		console.log(`[Socket.IO] Servidor en puerto ${port}`);
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : String(err);
		console.error(`[Socket.IO] No se pudo iniciar en puerto ${port}: ${msg}`);
		state.io.current = null;
		io = null;
	}
	return state.io.current;
}

export function closeSocketServer(): void {
	const cur = state.io.current;
	if (!cur) return;
	try { cur.close(); } catch { /* noop */ }
	state.io.current = null;
	io = null;
}

function broadcast(event: string, payload: Record<string, unknown>): void {
	// Siempre leer el `io` vivo desde el estado global. Imprescindible para
	// que listeners (close/exit) registrados en HMR previos sigan llegando
	// a los clientes conectados a la instancia actual.
	state.io.current?.emit(event, payload);
}

function handleConnection(socket: Socket): void {
	socket.emit("status", { running: [...runningProcesses.keys()] });
	for (const [actionId, host] of detectedHosts.entries()) {
		socket.emit("host", { actionId, host });
	}

	socket.on("projects:list", (cb: (data: unknown) => void) => cb(PROJECTS));
	socket.on("scripts:list", (cb: (data: unknown) => void) => cb(SCRIPT_ACTIONS));

	socket.on("db:status", async (cb: (data: unknown) => void) => {
		try {
			const pool = await openPool(resolveSettingsPath());
			const rs = await pool.request().query(`
				SELECT DB_NAME() AS db_name, GETDATE() AS server_time;
				SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
				WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME LIKE 'CAPAC%'
				ORDER BY TABLE_NAME;
			`);
			await pool.close();
			const sets = rs.recordsets as Record<string, unknown>[][];
			cb({
				ok: true,
				database: sets[0]?.[0]?.db_name,
				serverTime: sets[0]?.[0]?.server_time,
				tables: sets[1]?.map((r) => r.TABLE_NAME) ?? [],
			});
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : String(err);
			cb({ ok: false, error: msg });
		}
	});

	socket.on("script:exec", (payload: ScriptExecPayload, cb: (data: unknown) => void) => {
		const action = SCRIPT_ACTIONS.find((a) => a.id === payload.id);
		if (!action) {
			cb({ ok: false, error: `Acción no encontrada: ${payload.id}` });
			return;
		}
		runScript(action, payload.params ?? {}).then(cb).catch((err: Error) => {
			cb({ ok: false, error: err.message });
		});
	});

	socket.on("exec", (msg: ExecPayload) => {
		execAction(msg.actionId, msg.command, msg.cwd, msg.needsPassword, msg.hostPattern);
	});
	socket.on("restart", (msg: ExecPayload) => {
		restartAction(msg.actionId, msg.command, msg.cwd, msg.needsPassword, msg.hostPattern);
	});
	socket.on("kill", (msg: { actionId: string }) => killProcess(msg.actionId));
	socket.on("stdin", (msg: StdinPayload) => sendStdin(msg.actionId, msg.text));
	socket.on("password", (msg: PasswordPayload) => resolvePassword(msg.actionId, msg.password));

	// === Postman docs ===
	socket.on("postman:list", (cb: (data: unknown) => void) => {
		cb(loadCollectionMeta() ?? { error: "No se pudo cargar metadata" });
	});
	socket.on("postman:get", (slug: string, cb: (data: unknown) => void) => {
		const e = loadEntity(slug);
		cb(e ?? { error: `Entidad no encontrada: ${slug}` });
	});
	socket.on("postman:save", (payload: { slug: string; data: EntityFile }, cb: (r: unknown) => void) => {
		cb(saveEntity(payload.slug, payload.data));
	});
	socket.on("postman:vars", (variable: unknown[], cb: (r: unknown) => void) => {
		cb(saveCollectionVariables(variable));
	});
	socket.on("postman:merge", (cb: (r: unknown) => void) => {
		cb(mergeCollection());
	});
	socket.on("postman:split", (cb: (r: unknown) => void) => {
		cb(splitCollection());
	});

	// === Environments ===
	socket.on("postman:envs", (cb: (data: unknown) => void) => {
		cb(loadEnvironments());
	});
	socket.on("postman:envSave", (data: EnvironmentsFile, cb: (r: unknown) => void) => {
		cb(saveEnvironments(data));
	});
}

async function runScript(
	action: typeof SCRIPT_ACTIONS[number],
	params: Record<string, string>,
): Promise<{ ok: boolean; output?: string; error?: string }> {
	const parts = action.command.split(/\s+/);
	const cmd = parts[0];
	const args = [...parts.slice(1), ...(action.args ?? [])];
	for (const [key, value] of Object.entries(params)) {
		if (!value || value === "false") continue;
		if (value === "true") args.push(`--${key}`);
		else args.push(`--${key}`, value);
	}

	return new Promise((resolve) => {
		const child = spawn(cmd, args, {
			cwd: process.cwd(),
			shell: true,
			stdio: ["ignore", "pipe", "pipe"],
			timeout: 120_000,
		});
		let stdout = "";
		let stderr = "";
		child.stdout.on("data", (d: Buffer) => { stdout += d.toString(); });
		child.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });
		child.on("close", (code: number | null) => {
			const combined = stdout + (stderr ? `\n[STDERR]\n${stderr}` : "");
			resolve({ ok: code === 0, output: combined, error: code !== 0 ? `Exit ${code}` : undefined });
		});
		child.on("error", (e: Error) => {
			resolve({ ok: false, output: stdout + stderr, error: e.message });
		});
	});
}

function execAction(actionId: string, command: string, cwd: string, needsPassword = false, hostPattern?: string): void {
	if (runningProcesses.has(actionId)) {
		broadcast("error", { actionId, message: "Ya está en ejecución" });
		return;
	}
	if (needsPassword) {
		broadcast("password-request", { actionId });
		pendingPasswordActions.set(actionId, { command, cwd, hostPattern });
		return;
	}
	startProcess(actionId, command, cwd, hostPattern);
}

function restartAction(actionId: string, command: string, cwd: string, needsPassword = false, hostPattern?: string): void {
	const child = runningProcesses.get(actionId);
	if (!child) {
		execAction(actionId, command, cwd, needsPassword, hostPattern);
		return;
	}
	const onExit = () => {
		child.removeListener("close", onExit);
		setTimeout(() => execAction(actionId, command, cwd, needsPassword, hostPattern), 500);
	};
	child.on("close", onExit);
	killProcessTree(child);
}

function resolvePassword(actionId: string, password: string): void {
	const pending = pendingPasswordActions.get(actionId);
	if (!pending) return;
	pendingPasswordActions.delete(actionId);
	if (password !== PASSWORD) {
		broadcast("password-rejected", { actionId });
		return;
	}
	broadcast("password-accepted", { actionId });
	startProcess(actionId, pending.command, pending.cwd, pending.hostPattern);
}

function startProcess(actionId: string, command: string, cwd: string, hostPattern?: string): void {
	const isPs1 = command.includes(".ps1") || command.startsWith("&");
	const cmd = isPs1 ? "powershell.exe" : command.split(/\s+/)[0];
	const cmdArgs = isPs1 ? ["-NoProfile", "-Command", command] : command.split(/\s+/).slice(1);

	const child = spawn(cmd, cmdArgs, {
		cwd,
		shell: !isPs1,
		stdio: ["pipe", "pipe", "pipe"],
		env: { ...process.env, FORCE_COLOR: "0" },
	});

	runningProcesses.set(actionId, child);
	processMeta.set(actionId, { command, cwd, hostPattern });
	detectedHosts.delete(actionId);
	broadcast("started", { actionId });

	let hostRegex: RegExp | null = null;
	if (hostPattern) {
		try { hostRegex = new RegExp(hostPattern); } catch { hostRegex = null; }
	}
	const tryDetectHost = (text: string): void => {
		if (!hostRegex || detectedHosts.has(actionId)) return;
		const m = text.match(hostRegex);
		if (m && m[0]) {
			detectedHosts.set(actionId, m[0]);
			broadcast("host", { actionId, host: m[0] });
		}
	};

	child.stdout?.on("data", (chunk: Buffer) => {
		const data = chunk.toString();
		tryDetectHost(data);
		broadcast("stdout", { actionId, data });
	});
	child.stderr?.on("data", (chunk: Buffer) => {
		const data = chunk.toString();
		tryDetectHost(data);
		broadcast("stderr", { actionId, data });
	});
	child.on("close", (code: number | null) => {
		runningProcesses.delete(actionId);
		broadcast("exited", { actionId, code });
	});
	child.on("error", (err: Error) => {
		runningProcesses.delete(actionId);
		broadcast("error", { actionId, message: err.message });
	});
}

function sendStdin(actionId: string, text: string): void {
	const child = runningProcesses.get(actionId);
	if (!child?.stdin?.writable) {
		broadcast("error", { actionId, message: "Proceso no disponible para stdin" });
		return;
	}
	child.stdin.write(text + "\n");
}

function killProcessTree(child: ChildProcess): void {
	const pid = child.pid;
	if (!pid) {
		console.warn("[kill] sin PID, intentando SIGKILL directo");
		try { child.kill("SIGKILL"); } catch { /* noop */ }
		return;
	}
	if (process.platform === "win32") {
		console.log(`[kill] taskkill /PID ${pid} /T /F`);
		const tk = spawn("taskkill", ["/PID", String(pid), "/T", "/F"], {
			stdio: ["ignore", "pipe", "pipe"],
			shell: true,
			windowsHide: true,
		});
		let stderr = "";
		tk.stderr?.on("data", (d: Buffer) => { stderr += d.toString(); });
		tk.on("close", (code: number | null) => {
			if (code !== 0) {
				console.error(`[kill] taskkill fallo (code=${code}): ${stderr.trim()}`);
				try { child.kill("SIGKILL"); } catch { /* noop */ }
			}
		});
		tk.on("error", (err: Error) => {
			console.error(`[kill] taskkill error: ${err.message}`);
			try { child.kill("SIGKILL"); } catch { /* noop */ }
		});
	} else {
		try { child.kill("SIGTERM"); } catch { /* noop */ }
		setTimeout(() => { try { child.kill("SIGKILL"); } catch { /* noop */ } }, 3000);
	}
}

function killProcess(actionId: string): void {
	const child = runningProcesses.get(actionId);
	if (!child) {
		console.warn(`[kill] no hay proceso para actionId=${actionId} (running=${[...runningProcesses.keys()].join(",")})`);
		broadcast("error", { actionId, message: "No hay proceso para matar" });
		// Limpiar UI: enviar exited si por alguna razón quedó marcado.
		broadcast("exited", { actionId, code: null });
		return;
	}
	console.log(`[kill] actionId=${actionId} pid=${child.pid}`);
	killProcessTree(child);
}
