import type { APIRoute } from "astro";
import { copyFile } from "node:fs/promises";
import path from "node:path";
import { codegenDir } from "../../../lib/codeGen/paths.js";

const STATE_FILE = path.join(codegenDir, "_state.json");
const STATE_BASELINE = path.join(codegenDir, "_state.baseline.json");
// db dir (tables-tree.json y tables-tree.baseline.json) está en /public/db/clientesis.
// codegenDir resuelve a /public/bd/codegen, subimos dos niveles y bajamos a db/clientesis.
const TABLES_DIR = path.resolve(codegenDir, "..", "..", "db", "clientesis");
const TABLES_FILE = path.join(TABLES_DIR, "tables-tree.json");
const TABLES_BASELINE = path.join(TABLES_DIR, "tables-tree.baseline.json");

/**
 * POST /api/codegen/reset → copia los archivos `*.baseline.json` sobre los
 * `_state.json` y `tables-tree.json` activos. Sirve para QA: tras una prueba
 * fallida, devuelve el árbol al snapshot inicial sin reiniciar el servidor.
 *
 * El cliente debe disparar un hard reload (location.reload()) DESPUÉS de
 * recibir la respuesta para descartar la caché in-memory de `stateClient.ts`.
 */
export const POST: APIRoute = async () => {
	try {
		await copyFile(STATE_BASELINE, STATE_FILE);
		await copyFile(TABLES_BASELINE, TABLES_FILE);
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ ok: false, error: msg }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
};
