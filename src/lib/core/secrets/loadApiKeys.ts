import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";

let loaded = false;

/** Carga `secrets/api-keys.env` una vez (no pisa variables ya definidas en el proceso). */
export function loadApiKeysFromSecretsFile(): void {
	if (loaded) return;
	loaded = true;
	const path = resolve(process.cwd(), "secrets", "api-keys.env");
	if (!existsSync(path)) return;
	loadDotenv({ path, override: false });
}
