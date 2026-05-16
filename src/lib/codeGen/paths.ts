import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Carpeta donde se guardan las personalizaciones por recurso (JSON por id). Solo servidor. */
export const codegenDir = path.resolve(__dirname, "..", "..", "..", "public", "bd", "codegen");
