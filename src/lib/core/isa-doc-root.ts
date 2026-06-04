import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Raíz del repo ISA-DOC (`src/lib/core` → tres niveles arriba). */
const _DIR = dirname(fileURLToPath(import.meta.url));
export const ISA_DOC_ROOT = resolve(_DIR, "..", "..", "..");

export const PATYIA_PROMPTS_CATALOG = join(
	ISA_DOC_ROOT,
	"src/lib/features/patyia/050-prompts/catalog",
);
