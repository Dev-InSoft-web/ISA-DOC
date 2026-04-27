import fs from "node:fs";
import path from "node:path";
import sql from "mssql";

interface DbSettings {
	Values?: {
		hostdb?: string;
		userdb?: string;
		passdb?: string;
		namedb?: string;
		portdb?: string;
	};
}

function readSettingsFile(settingsPath: string): DbSettings {
	const abs = path.resolve(settingsPath);
	const raw = fs.readFileSync(abs, "utf8");
	return JSON.parse(raw);
}

export function buildConnectionConfig(settingsPath: string): sql.config {
	const cfg = readSettingsFile(settingsPath);
	const v = cfg?.Values || {};
	return {
		server: v.hostdb || "localhost",
		user: v.userdb,
		password: v.passdb,
		database: v.namedb,
		port: Number(v.portdb || 1433),
		options: { encrypt: false, trustServerCertificate: true },
		pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
	};
}

export async function openPool(settingsPath: string): Promise<sql.ConnectionPool> {
	const config = buildConnectionConfig(settingsPath);
	const pool = new sql.ConnectionPool(config);
	await pool.connect();
	return pool;
}

const DEFAULT_SETTINGS =
	"c:/Users/JAGUDELOE/Documents/Contapyme/ClientesIS/ISS-ClientesIS-ContaPymeU/local.settings.json";

export function resolveSettingsPath(): string {
	return process.env.LOCAL_SETTINGS_PATH || DEFAULT_SETTINGS;
}
