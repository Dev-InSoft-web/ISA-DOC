/**
 * Endpoint: GET /api/embed
 *
 * Sirve un archivo desde `public/` con `Content-Disposition: inline`,
 * para que el navegador lo previsualice en un <iframe> en vez de
 * forzar la descarga. Útil para PDFs e imágenes referenciadas como
 * recursos embebidos en la documentación.
 *
 * Query:
 *  - path  (req)  ruta relativa a `public/` (ej: `imgs/patyia/notebooklm/x.pdf`).
 *
 * Validación: el path se resuelve y se valida contra `PUBLIC_ROOT`;
 * cualquier intento de salir (`..`, símlinks) responde 400.
 */
import type { APIRoute } from "astro";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const PUBLIC_ROOT = resolve(process.cwd(), "public");

const MIME: Record<string, string> = {
	".pdf": "application/pdf",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".txt": "text/plain; charset=utf-8",
};

function safeResolve(rel: string): string | null {
	const cleaned = rel.replace(/^\/+/, "");
	const abs = resolve(PUBLIC_ROOT, cleaned);
	const root = PUBLIC_ROOT.endsWith(sep) ? PUBLIC_ROOT : PUBLIC_ROOT + sep;
	if (!abs.startsWith(root) && abs !== PUBLIC_ROOT) return null;
	return abs;
}

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const path = url.searchParams.get("path");
	if (!path) return new Response("missing path", { status: 400 });

	const abs = safeResolve(path);
	if (!abs) return new Response("invalid path", { status: 400 });

	try {
		const info = await stat(abs);
		if (!info.isFile()) return new Response("not a file", { status: 404 });
		const buf = await readFile(abs);
		const ext = extname(abs).toLowerCase();
		const type = MIME[ext] ?? "application/octet-stream";
		const filename = abs.split(/[\\/]/).pop() ?? "file";
		return new Response(buf, {
			status: 200,
			headers: {
				"Content-Type": type,
				"Content-Disposition": `inline; filename="${filename.replace(/"/g, "")}"`,
				"Cache-Control": "public, max-age=300",
			},
		});
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : String(e);
		return new Response(msg, { status: 404 });
	}
};
