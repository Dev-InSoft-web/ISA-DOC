import sql from "mssql";
import { config as loadDotenv } from "dotenv";

// Carga `.env` de la raíz del proyecto a `process.env` (idempotente).
loadDotenv();

// Pool singleton para ISA-DOC. Lee credenciales con los mismos nombres que
// usa el ISS (`hostdb`, `portdb`, `userdb`, `passdb`, `namedb`) para que el
// desarrollador pueda copiarlas tal cual desde `local.settings.json` a un
// `.env` local. Reutiliza la conexión entre requests para no agotar el pool
// en cada ping/exec.

interface DbConfig {
	host: string;
	port: number;
	user: string;
	pass: string;
	name: string;
}

let pool: sql.ConnectionPool | null = null;
let connecting: Promise<sql.ConnectionPool> | null = null;
let lastError: string | null = null;

function readConfig(): DbConfig | { error: string } {
	const host = process.env.CLIENTESIS_MSSQL_HOST ?? process.env.hostdb ?? "";
	const port = Number(process.env.CLIENTESIS_MSSQL_PORT ?? process.env.portdb ?? "1433");
	const user = process.env.CLIENTESIS_MSSQL_USER ?? process.env.userdb ?? "";
	const pass = process.env.CLIENTESIS_MSSQL_PASS ?? process.env.passdb ?? "";
	const name = process.env.CLIENTESIS_MSSQL_DB ?? process.env.namedb ?? "";
	const missing: string[] = [];
	if (!host) missing.push("CLIENTESIS_MSSQL_HOST");
	if (!user) missing.push("CLIENTESIS_MSSQL_USER");
	if (!pass) missing.push("CLIENTESIS_MSSQL_PASS");
	if (!name) missing.push("CLIENTESIS_MSSQL_DB");
	if (missing.length) {
		return {
			error: `MSSQL ClientesIS: configure ${missing.join(", ")} en lab-langgraph/local.settings.json (GET /api/config/connections)`,
		};
	}
	if (!Number.isFinite(port)) return { error: "portdb no es número válido" };
	return { host, port, user, pass, name };
}

async function buildPool(cfg: DbConfig): Promise<sql.ConnectionPool> {
	const p = new sql.ConnectionPool({
		server: cfg.host,
		port: cfg.port,
		user: cfg.user,
		password: cfg.pass,
		database: cfg.name,
		options: { encrypt: true, trustServerCertificate: true },
		pool: { max: 5, min: 0, idleTimeoutMillis: 30_000 },
		requestTimeout: 300_000,
		connectionTimeout: 30_000,
	});
	await p.connect();
	return p;
}

export async function getPool(): Promise<sql.ConnectionPool> {
	if (pool && pool.connected) return pool;
	if (connecting) return connecting;
	const cfg = readConfig();
	if ("error" in cfg) {
		lastError = cfg.error;
		throw new Error(cfg.error);
	}
	connecting = buildPool(cfg)
		.then((p) => {
			pool = p;
			lastError = null;
			return p;
		})
		.catch((err: unknown) => {
			lastError = err instanceof Error ? err.message : String(err);
			pool = null;
			throw err;
		})
		.finally(() => {
			connecting = null;
		});
	return connecting;
}

export async function pingDb(): Promise<{ ok: boolean; reason?: string }> {
	try {
		const p = await getPool();
		await p.request().query("SELECT 1 AS ok");
		return { ok: true };
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return { ok: false, reason: msg };
	}
}

export function getLastDbError(): string | null {
	return lastError;
}
