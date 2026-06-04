import sql from "mssql";
import { config as loadDotenv } from "dotenv";
import { loadLabLocalSettings } from "../load-lab-local-settings.ts";
import { getPool as getMainPool } from "./clientesis-pool.ts";

// Carga `.env` por si el módulo se importa antes que `db.ts`.
loadDotenv();
loadLabLocalSettings();

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
	const host = process.env.PATY_MSSQL_HOST ?? process.env.paty_hostdb ?? "";
	const user = process.env.PATY_MSSQL_USER ?? process.env.paty_userdb ?? "";
	const pass = process.env.PATY_MSSQL_PASS ?? process.env.paty_passdb ?? "";
	const name = process.env.PATY_MSSQL_DB ?? process.env.paty_namedb ?? "";
	const portRaw = process.env.PATY_MSSQL_PORT ?? process.env.paty_portdb ?? "";
	if (!host && !user && !pass && !name && !portRaw) return { reuseMain: true };
	const port = Number(portRaw || "1433");
	const missing: string[] = [];
	if (!host) missing.push("PATY_MSSQL_HOST");
	if (!user) missing.push("PATY_MSSQL_USER");
	if (!pass) missing.push("PATY_MSSQL_PASS");
	if (!name) missing.push("PATY_MSSQL_DB");
	if (missing.length) {
		return {
			error: `MSSQL PatyIA: configure ${missing.join(", ")} en lab-langgraph/local.settings.json`,
		};
	}
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

const PATY_INSTRUCCION_PROBE = `
SELECT
	DB_NAME() AS currentDb,
	CASE
		WHEN OBJECT_ID(N'dbo.INSTRUCCION', N'U') IS NOT NULL THEN DB_NAME()
		WHEN OBJECT_ID(N'AYUDASCP_IA_STAGING.dbo.INSTRUCCION', N'U') IS NOT NULL THEN N'AYUDASCP_IA_STAGING'
		WHEN OBJECT_ID(N'AYUDASCP_IA.dbo.INSTRUCCION', N'U') IS NOT NULL THEN N'AYUDASCP_IA'
	END AS instruccionDb;
`;

export async function pingPatyDb(): Promise<{ ok: boolean; reason?: string }> {
	const cfg = readPatyConfig();
	const reuseHint =
		"reuseMain" in cfg
			? " Define paty_hostdb/paty_userdb/paty_passdb/paty_namedb en ISA-DOC/.env (copia de PatyIA/local.settings.json)."
			: "";
	try {
		const p = await getPatyPool();
		const result = await p.request().query(PATY_INSTRUCCION_PROBE);
		const row = result.recordset[0] as { currentDb?: string; instruccionDb?: string | null };
		const currentDb = row?.currentDb ?? "?";
		const instruccionDb = row?.instruccionDb ?? null;
		if (instruccionDb) {
			const target =
				instruccionDb === currentDb
					? currentDb
					: `${currentDb} · INSTRUCCION en ${instruccionDb}`;
			return { ok: true, reason: `Conexión OK · ${target}` };
		}
		return {
			ok: false,
			reason: `Conectado a «${currentDb}» pero dbo.INSTRUCCION no existe ahí ni en AYUDASCP_IA / AYUDASCP_IA_STAGING.${reuseHint}`,
		};
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return { ok: false, reason: msg };
	}
}

export function getLastPatyDbError(): string | null {
	return lastError;
}
