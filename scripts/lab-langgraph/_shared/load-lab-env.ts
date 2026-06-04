import { existsSync } from "node:fs";
import { config as loadDotenv } from "dotenv";
import { join } from "node:path";
import { ISA_DOC_ROOT } from "./isa-doc-root.ts";

let loaded = false;

export function loadLabEnv(): void {
	if (loaded) return;
	loadDotenv({ path: join(ISA_DOC_ROOT, ".env"), override: false });
	const secrets = join(ISA_DOC_ROOT, "secrets/patyia/lab-langgraph.env");
	if (existsSync(secrets)) loadDotenv({ path: secrets, override: false });
	loaded = true;
}
