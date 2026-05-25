import sql from "mssql";
import { config as loadDotenv } from "dotenv";
import { getPool as getMainPool, pingDb as pingMainDb } from "./db.ts";

// Carga `.env` por si el módulo se importa antes que `db.ts`.
loadDotenv();

// Pool independiente para la BD de PatyIA (`AYUDASCP_IA`). Convive con el
// pool principal de ClientesIS (`db.ts`) y se configura con un prefijo
// distinto de variables para que ambos puedan resolverse desde el mismo
// `.env`:
//   paty_hostdb, paty_portdb, paty_userdb, paty_passdb, paty_namedb
//
// Fallback: si las variables `paty_*` no están definidas pero existe un
// `.env` con `hostdb/...` apuntando a `AYUDASCP_IA` (caso de un dev que
// solo trabaja contra esa BD), reutiliza el pool principal para no exigir
// duplicar la configuración.

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

function readPatyConfig(): DbConfig | { error: string } | { reuseMain: true } {
	const host = process.env.paty_hostdb ?? "";
	const user = process.env.paty_userdb ?? "";
	const pass = process.env.paty_passdb ?? "";
	const name = process.env.paty_namedb ?? "";
	const portRaw = process.env.paty_portdb ?? "";
	if (!host && !user && !pass && !name && !portRaw) return { reuseMain: true };
	const port = Number(portRaw || "1433");
	const missing: string[] = [];
	if (!host) missing.push("paty_hostdb");
	if (!user) missing.push("paty_userdb");
	if (!pass) missing.push("paty_passdb");
	if (!name) missing.push("paty_namedb");
	if (missing.length) return { error: `Variables faltantes: ${missing.join(", ")}` };
	if (!Number.isFinite(port)) return { error: "paty_portdb no es número válido" };
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

export async function getPatyPool(): Promise<sql.ConnectionPool> {
	const cfg = readPatyConfig();
	if ("reuseMain" in cfg) return getMainPool();
	if ("error" in cfg) {
		lastError = cfg.error;
		throw new Error(cfg.error);
	}
	if (pool && pool.connected) return pool;
	if (connecting) return connecting;
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

export async function pingPatyDb(): Promise<{ ok: boolean; reason?: string }> {
	const cfg = readPatyConfig();
	if ("reuseMain" in cfg) return pingMainDb();
	try {
		const p = await getPatyPool();
		await p.request().query("SELECT 1 AS ok");
		return { ok: true };
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return { ok: false, reason: msg };
	}
}

export function getLastPatyDbError(): string | null {
	return lastError;
}
