import type { APIRoute } from "astro";
import { BACKUP_PROGRESS, escribirJson, leerJson } from "../../../../../lib/patyia/storage.ts";

export const prerender = false;

interface BackupProgress {
	running: boolean;
	total: number;
	hecho: number;
	exitos: number;
	fallos: number;
	currentId: string;
	currentFilename: string;
	iniciado: string;
	finalizado: string;
	ultimosFallos: { id: string; error: string }[];
	cancelRequested?: boolean;
}

const EMPTY: BackupProgress = {
	running: false, total: 0, hecho: 0, exitos: 0, fallos: 0,
	currentId: "", currentFilename: "", iniciado: "", finalizado: "", ultimosFallos: [], cancelRequested: false,
};

export const GET: APIRoute = async () => {
	const data = await leerJson<BackupProgress>(BACKUP_PROGRESS, EMPTY);
	return j({ ok: true, ...data });
};

// DELETE → marca el flag de cancelación; el worker corta entre archivos.
export const DELETE: APIRoute = async () => {
	const data = await leerJson<BackupProgress>(BACKUP_PROGRESS, EMPTY);
	if (!data.running) return j({ ok: false, error: "No hay backup en progreso" }, 409);
	data.cancelRequested = true;
	await escribirJson(BACKUP_PROGRESS, data);
	return j({ ok: true, cancelRequested: true });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
