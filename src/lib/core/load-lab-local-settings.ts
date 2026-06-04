import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

let loaded = false;

function resolveLabSettingsPath(): string | null {
	const candidates = [
		resolve(process.cwd(), "../lab-langgraph/local.settings.json"),
		resolve(process.cwd(), "lab-langgraph/local.settings.json"),
		resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../lab-langgraph/local.settings.json"),
	];
	for (const p of candidates) {
		if (existsSync(p)) return p;
	}
	return null;
}

/** Carga `Values` de lab-langgraph/local.settings.json en el proceso Astro (solo servidor). */
export function loadLabLocalSettings(): void {
	if (loaded) return;
	loaded = true;
	const path = resolveLabSettingsPath();
	if (!path) return;
	try {
		const raw = JSON.parse(readFileSync(path, "utf8")) as {
			Values?: Record<string, string>;
		};
		for (const [key, value] of Object.entries(raw.Values ?? {})) {
			if (typeof value === "string" && value.trim() && !process.env[key]?.trim()) {
				process.env[key] = value;
			}
		}
	} catch {
		/* ignore */
	}
}
