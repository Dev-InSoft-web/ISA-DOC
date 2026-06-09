import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { SESSION_PATH } from "./corpus-paths.ts";

export interface CapacitacionSession {
	controlkey: string;
	semail?: string;
	icontacto?: string;
	idmaquina?: string;
	savedAt?: string;
}

export interface CapacitacionAuthConfig {
	apiBase: string;
	token: string | null;
	session: CapacitacionSession | null;
}

function readTokenFile(path: string): string | null {
	if (!existsSync(path)) return null;
	try {
		const data = JSON.parse(readFileSync(path, "utf8")) as { token?: string };
		return data.token?.trim() || null;
	} catch {
		return null;
	}
}

export function loadAuthConfig(): CapacitacionAuthConfig {
	const apiBase =
		process.env.CAPACITACION_API_BASE?.trim() ||
		process.env.VERIFY_API_BASE_URL?.trim() ||
		"https://clientesis-contapymeu.azurewebsites.net";

	const token =
		process.env.CAPACITACION_API_TOKEN?.trim() ||
		process.env.CLIENTESIS_TOKEN?.trim() ||
		process.env.VERIFY_API_TOKEN?.trim() ||
		(process.env.CAPACITACION_TOKEN_FILE
			? readTokenFile(resolve(process.env.CAPACITACION_TOKEN_FILE))
			: null) ||
		readTokenFile(resolve(process.env.VERIFY_API_TOKEN_FILE ?? "")) ||
		null;

	let session: CapacitacionSession | null = null;
	const sessionFile = process.env.CAPACITACION_SESSION_FILE?.trim() || SESSION_PATH;
	if (existsSync(sessionFile)) {
		try {
			session = JSON.parse(readFileSync(sessionFile, "utf8")) as CapacitacionSession;
		} catch {
			session = null;
		}
	}
	if (!session && process.env.CAPACITACION_CONTROLKEY?.trim()) {
		session = {
			controlkey: process.env.CAPACITACION_CONTROLKEY.trim(),
			semail: process.env.CAPACITACION_EMAIL?.trim(),
			idmaquina: process.env.CAPACITACION_IDMAQUINA?.trim() || "WebPortal",
		};
	}

	return { apiBase, token, session };
}
