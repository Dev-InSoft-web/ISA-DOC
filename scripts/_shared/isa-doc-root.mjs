import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Raíz del repo ISA-DOC (`scripts/_shared` → `../..`). */
export const ISA_DOC_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
