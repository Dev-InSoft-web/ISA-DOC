import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import sql from "mssql";

interface SettingsFile {
	Values?: Record<string, string | undefined>;
}

function readSettingsFile(settingsPath: string): SettingsFile {
	const abs = path.resolve(settingsPath);
	const raw = fs.readFileSync(abs, "utf8");
	return JSON.parse(raw) as SettingsFile;
}

export function buildConnectionConfig(settingsPath: string): sql.config {
	const cfg = readSettingsFile(settingsPath);
	const v = cfg.Values ?? {};
	return {
		server: String(v.hostdb ?? ""),
		user: v.userdb,
		password: v.passdb,
		database: v.namedb,
		port: Number(v.portdb ?? 1433),
		options: {
			encrypt: false,
			trustServerCertificate: true,
		},
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000,
		},
	};
}

export async function openPool(settingsPath: string): Promise<sql.ConnectionPool> {
	const config = buildConnectionConfig(settingsPath);
	const pool = new sql.ConnectionPool(config);
	await pool.connect();
	return pool;
}

export function resolveSettingsPath(argv: string[]): string {
	const idx = argv.indexOf("--settings");
	if (idx >= 0 && argv[idx + 1]) return argv[idx + 1];
	const fallback = "c:/Users/JAGUDELOE/Documents/Contapyme/ClientesIS/ISS-ClientesIS-ContaPymeU/local.settings.json";
	return process.env.LOCAL_SETTINGS_PATH ?? fallback;
}
