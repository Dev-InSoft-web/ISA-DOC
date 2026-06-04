import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Raíz del repo ISA-DOC (`scripts/lab-langgraph/_shared` → tres niveles arriba). */
const _DIR = dirname(fileURLToPath(import.meta.url));
export const LAB_SCRIPTS_ROOT = resolve(_DIR, "..");
export const ISA_DOC_ROOT = resolve(LAB_SCRIPTS_ROOT, "../..");
export const LAB_REPO_ROOT = resolve(ISA_DOC_ROOT, "../lab-langgraph");

/** Datos de vectorización y corpus: solo en repo lab-langgraph (`data/vectorize/`). */
export function labDataPath(...segments: string[]): string {
	return join(LAB_REPO_ROOT, "data", ...segments);
}
