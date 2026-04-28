/**
 * Endpoint: GET /api/source
 *
 * Lee archivos del workspace ClientesIS (un nivel arriba del proyecto ISA)
 * y devuelve un fragmento en texto plano. Pensado para que la
 * documentación viva (DocsViewer.svelte) extraiga código en tiempo real
 * desde los repos vecinos, sin duplicar nada en los markdown.
 *
 * Query params:
 *  - path  (req)   ruta relativa al workspace root, p. ej.
 *                  `doc/init_capacitacion.sql` o
 *                  `ISP-CLientesISServer/src/sources/.../02_Cursos.ts`.
 *  - from  (opt)   regex; primera línea cuyo contenido haga match es el
 *                  inicio del fragmento (inclusive).
 *  - to    (opt)   regex; primera línea (después del start) cuyo contenido
 *                  haga match es el fin del fragmento (inclusive).
 *  - symbol(opt)   alternativa a from/to; ubica la primera línea que
 *                  contenga `symbol` como palabra y, si la línea abre
 *                  `{`, extrae hasta cerrar al nivel 0; si no, lee hasta
 *                  la próxima línea en blanco o `;` final.
 *  - start (opt)   número de línea (1-indexed) inicial.
 *  - end   (opt)   número de línea (1-indexed) final.
 *
 * Si no se da from/to/symbol/start/end, devuelve el archivo completo
 * (capado a 4000 líneas para evitar respuestas masivas).
 *
 * El path se resuelve y se valida contra `WORKSPACE_ROOT`; cualquier
 * intento de salir de allí (`..`) responde con 400.
 */
import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

// project (ISA) cwd → ../.. = workspace root (ClientesIS)
const WORKSPACE_ROOT = resolve(process.cwd(), "..", "..");
const HARD_CAP_LINES = 4000;

function safeResolve(rel: string): string | null {
	const abs = resolve(WORKSPACE_ROOT, rel);
	const root = WORKSPACE_ROOT.endsWith(sep) ? WORKSPACE_ROOT : WORKSPACE_ROOT + sep;
	if (abs !== WORKSPACE_ROOT && !abs.startsWith(root)) return null;
	return abs;
}

function safeRegex(pattern: string): RegExp | null {
	try { return new RegExp(pattern); } catch { return null; }
}

/**
 * Brace-aware: si la línea inicial abre `{`, devuelve hasta cerrarlo a
 * nivel 0. Si no, devuelve hasta la primera línea vacía o que termine en
 * `;` después de la inicial.
 */
function extractSymbol(lines: string[], symbol: string): { start: number; end: number } | null {
	const needle = symbol.trim();
	if (!needle) return null;
	// busca primera línea que contenga la palabra (con borde simple).
	const wordRe = new RegExp(`(^|[^A-Za-z0-9_])${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^A-Za-z0-9_]|$)`);
	let startIdx = -1;
	for (let i = 0; i < lines.length; i++) {
		if (wordRe.test(lines[i])) { startIdx = i; break; }
	}
	if (startIdx < 0) return null;

	// si abre llave en algún punto del fragmento → cuenta llaves
	let depth = 0;
	let opened = false;
	for (let i = startIdx; i < lines.length; i++) {
		const line = lines[i];
		// strip strings y comentarios de línea (heurística suficiente)
		const stripped = line
			.replace(/\/\/.*$/, "")
			.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, "''");
		for (const ch of stripped) {
			if (ch === "{") { depth++; opened = true; }
			else if (ch === "}") {
				depth--;
				if (opened && depth === 0) {
					return { start: startIdx, end: i };
				}
			}
		}
		if (!opened && i > startIdx) {
			// sin llave → corta en línea vacía o que termine en `;`
			if (line.trim() === "" || /;\s*$/.test(line)) {
				return { start: startIdx, end: i };
			}
		}
	}
	return { start: startIdx, end: Math.min(lines.length - 1, startIdx + 60) };
}

export const GET: APIRoute = async ({ url }) => {
	const path = url.searchParams.get("path");
	if (!path) return new Response("missing path", { status: 400 });
	const abs = safeResolve(path);
	if (!abs) return new Response("path outside workspace", { status: 400 });

	let raw: string;
	try {
		raw = await readFile(abs, "utf8");
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : String(e);
		return new Response(`cannot read: ${msg}`, { status: 404 });
	}

	const lines = raw.split(/\r?\n/);
	let startIdx = 0;
	let endIdx = Math.min(lines.length - 1, HARD_CAP_LINES - 1);

	const symbol = url.searchParams.get("symbol");
	const fromS = url.searchParams.get("from");
	const toS = url.searchParams.get("to");
	const startN = url.searchParams.get("start");
	const endN = url.searchParams.get("end");

	if (symbol) {
		const r = extractSymbol(lines, symbol);
		if (!r) return new Response(`symbol "${symbol}" not found`, { status: 404 });
		startIdx = r.start;
		endIdx = r.end;
	} else if (fromS || toS) {
		if (fromS) {
			const re = safeRegex(fromS);
			if (!re) return new Response("invalid from regex", { status: 400 });
			const i = lines.findIndex((l) => re.test(l));
			if (i < 0) return new Response(`from "${fromS}" not found`, { status: 404 });
			startIdx = i;
		}
		if (toS) {
			const re = safeRegex(toS);
			if (!re) return new Response("invalid to regex", { status: 400 });
			const i = lines.slice(startIdx + 1).findIndex((l) => re.test(l));
			endIdx = i < 0 ? lines.length - 1 : startIdx + 1 + i;
		}
	} else if (startN || endN) {
		if (startN) startIdx = Math.max(0, parseInt(startN, 10) - 1);
		if (endN) endIdx = Math.max(startIdx, parseInt(endN, 10) - 1);
	}

	const fragment = lines.slice(startIdx, endIdx + 1).join("\n");
	return new Response(fragment, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "no-cache",
			"X-Source-Path": path,
			"X-Source-Lines": `${startIdx + 1}-${endIdx + 1}`,
		},
	});
};
