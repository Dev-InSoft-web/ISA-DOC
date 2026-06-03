import { readFile } from "node:fs/promises";
import { findTokenFile } from "../../../core/secrets/tokenPaths.ts";

/** Token Bearer para PatyIA local (7071). */
export async function resolvePatyiaLocalToken(): Promise<{ token: string; source: string } | null> {
	const envToken = process.env.PATYIA_TOKEN?.trim();
	if (envToken) return { token: envToken, source: "env" };
	const file = findTokenFile("patyia");
	if (!file) return null;
	try {
		const raw = await readFile(file, "utf8");
		const j = JSON.parse(raw) as { token?: string };
		const token = (j.token ?? "").trim();
		if (!token) return null;
		return { token, source: "file" };
	} catch {
		return null;
	}
}

export const PATYIA_LOCAL_BASE = (process.env.PATYIA_BASE_URL ?? "http://localhost:7071").replace(/\/$/, "");
