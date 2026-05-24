import { Server, type Socket } from "socket.io";
import { spawn, type ChildProcess } from "node:child_process";
import { PROJECTS } from "./projects-registry.js";
import {
	loadCollectionMeta, loadEntity, saveEntity, saveCollectionVariables,
	mergeCollection, splitCollection, loadEnvironments, saveEnvironments,
	loadFullCollection,
	getStore,
	type PostmanStore,
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

export function broadcastFragmentsInvalidated(): void {
	state.io.current?.emit("fragments:invalidated", { at: Date.now() });
}

export function broadcastRevisadoChanged(updates: Record<string, boolean>): void {
	state.io.current?.emit("revisado:changed", { updates, at: Date.now() });
}

function handleConnection(socket: Socket): void {
	socket.emit("status", { running: [...runningProcesses.keys()] });
	for (const [actionId, host] of detectedHosts.entries()) {
		socket.emit("host", { actionId, host });
	}

	socket.on("projects:list", (cb: (data: unknown) => void) => cb(PROJECTS));

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
		try {
			const meta = loadCollectionMeta();
			if (!meta) {
				cb({ error: "No se pudo cargar metadata: revisa que data/postman/clientesis/collection.json exista." });
				return;
			}
			cb(meta);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			cb({ error: `loadCollectionMeta falló: ${msg}` });
		}
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
	socket.on("postman:full", (cb: (data: unknown) => void) => {
		const col = loadFullCollection();
		cb(col ?? { error: "Sin colección" });
	});

	// === Environments ===
	socket.on("postman:envs", (cb: (data: unknown) => void) => {
		cb(loadEnvironments());
	});
	socket.on("postman:envSave", (data: EnvironmentsFile, cb: (r: unknown) => void) => {
		cb(saveEnvironments(data));
	});

	// === PatyIA Postman (modo fragmentado) ===
	registerPostmanNamespace(socket, "patyiaPostman", getStore("patyia"));

	// === PatyIA Verify API ===
	registerVerifyApiNamespace(socket, "patyiaVerifyApi", "verify-api-patyia", "scripts/verify-api-patyia/verify_api.ts");

	// === Verify API (pruebas en secuencia) ===
	socket.on("verifyApi:run", (payload: { host?: string }, cb?: (r: unknown) => void) => {
		const actionId = "verify-api";
		if (runningProcesses.has(actionId)) {
			cb?.({ ok: false, error: "Ya está en ejecución" });
			return;
		}
		const env: Record<string, string> = {
			...process.env as Record<string, string>,
			VERIFY_API_BASE_URL: payload?.host || "http://localhost:20040",
			FORCE_COLOR: "0",
		};
		const isaRoot = process.cwd();
		const scriptPath = "scripts/run-verify-api.ts";
		const child = spawn(process.execPath, ["--import", "tsx", scriptPath], {
			cwd: isaRoot,
			env,
			stdio: ["pipe", "pipe", "pipe"],
			shell: false,
		});
		runningProcesses.set(actionId, child);
		broadcast("verifyApi:started", { host: env.VERIFY_API_BASE_URL });
		child.stdout?.on("data", (b: Buffer) => broadcast("verifyApi:stdout", { data: b.toString() }));
		child.stderr?.on("data", (b: Buffer) => broadcast("verifyApi:stderr", { data: b.toString() }));
		child.on("close", (code: number | null) => {
			runningProcesses.delete(actionId);
			broadcast("verifyApi:exited", { code });
		});
		child.on("error", (err: Error) => {
			runningProcesses.delete(actionId);
			broadcast("verifyApi:exited", { code: -1, error: err.message });
		});
		cb?.({ ok: true });
	});
	socket.on("verifyApi:kill", (cb?: (r: unknown) => void) => {
		const child = runningProcesses.get("verify-api");
		if (!child) { cb?.({ ok: false, error: "No hay proceso" }); return; }
		killProcessTree(child);
		cb?.({ ok: true });
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

function registerPostmanNamespace(socket: Socket, prefix: string, store: PostmanStore): void {
	socket.on(`${prefix}:list`, (cb: (data: unknown) => void) => {
		try {
			const meta = store.loadCollectionMeta();
			if (!meta) { cb({ error: "Sin metadata" }); return; }
			cb(meta);
		} catch (err) {
			cb({ error: err instanceof Error ? err.message : String(err) });
		}
	});
	socket.on(`${prefix}:get`, (slug: string, cb: (data: unknown) => void) => {
		const e = store.loadEntity(slug);
		cb(e ?? { error: `Entidad no encontrada: ${slug}` });
	});
	socket.on(`${prefix}:save`, (payload: { slug: string; data: EntityFile }, cb: (r: unknown) => void) => {
		cb(store.saveEntity(payload.slug, payload.data));
	});
	socket.on(`${prefix}:vars`, (variable: unknown[], cb: (r: unknown) => void) => {
		cb(store.saveCollectionVariables(variable));
	});
	socket.on(`${prefix}:merge`, (cb: (r: unknown) => void) => {
		cb(store.mergeCollection());
	});
	socket.on(`${prefix}:split`, (cb: (r: unknown) => void) => {
		cb(store.splitCollection());
	});
	socket.on(`${prefix}:full`, (cb: (data: unknown) => void) => {
		const col = store.loadFullCollection();
		cb(col ?? { error: "Sin colección" });
	});
	socket.on(`${prefix}:envs`, (cb: (data: unknown) => void) => {
		cb(store.loadEnvironments());
	});
	socket.on(`${prefix}:envSave`, (data: EnvironmentsFile, cb: (r: unknown) => void) => {
		cb(store.saveEnvironments(data));
	});
}

function registerVerifyApiNamespace(socket: Socket, prefix: string, actionId: string, scriptPath: string): void {
	socket.on(`${prefix}:run`, (payload: { host?: string; env?: string }, cb?: (r: unknown) => void) => {
		if (runningProcesses.has(actionId)) {
			cb?.({ ok: false, error: "Ya está en ejecución" });
			return;
		}
		const env: Record<string, string> = {
			...process.env as Record<string, string>,
			VERIFY_API_BASE_URL: payload?.host || "http://localhost:7071",
			VERIFY_API_ENV: payload?.env || "local",
			FORCE_COLOR: "0",
		};
		const isaRoot = process.cwd();
		const child = spawn(process.execPath, ["--import", "tsx", scriptPath], {
			cwd: isaRoot,
			env,
			stdio: ["pipe", "pipe", "pipe"],
			shell: false,
		});
		runningProcesses.set(actionId, child);
		broadcast(`${prefix}:started`, { host: env.VERIFY_API_BASE_URL });
		child.stdout?.on("data", (b: Buffer) => broadcast(`${prefix}:stdout`, { data: b.toString() }));
		child.stderr?.on("data", (b: Buffer) => broadcast(`${prefix}:stderr`, { data: b.toString() }));
		child.on("close", (code: number | null) => {
			runningProcesses.delete(actionId);
			broadcast(`${prefix}:exited`, { code });
		});
		child.on("error", (err: Error) => {
			runningProcesses.delete(actionId);
			broadcast(`${prefix}:exited`, { code: -1, error: err.message });
		});
		cb?.({ ok: true });
	});
	socket.on(`${prefix}:kill`, (cb?: (r: unknown) => void) => {
		const child = runningProcesses.get(actionId);
		if (!child) { cb?.({ ok: false, error: "No hay proceso" }); return; }
		killProcessTree(child);
		cb?.({ ok: true });
	});
}


