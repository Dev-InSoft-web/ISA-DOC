import { filtroB64, unwrap } from "../../../verify-api/helpers.ts";
import type { CapacitacionCourseSummary, CoursesListSnapshot } from "./types.ts";
import type { CapacitacionVideoEntry } from "./types.ts";
import { parsePlanEscurso } from "./plan-parser.ts";
import { parseCourseHtml } from "./parse-course-html.ts";

export interface CapacitacionApiOptions {
	baseUrl: string;
	token: string;
}

async function request(
	opts: CapacitacionApiOptions,
	method: string,
	path: string,
): Promise<{ status: number; data: unknown }> {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${opts.token}`,
	};
	const sep = path.includes("?") ? "&" : "?";
	const url = `${opts.baseUrl}${path}${sep}___ignoreAuth___=true`;
	const r = await fetch(url, { method, headers });
	const text = await r.text();
	let data: unknown = {};
	try {
		data = JSON.parse(text);
	} catch {
		data = { raw: text };
	}
	return { status: r.status, data };
}

export async function fetchCoursesList(opts: CapacitacionApiOptions): Promise<CoursesListSnapshot> {
	const filtro = filtroB64({ pagina: 1, qregistros: 1000 });
	const res = await request(opts, "GET", `/api/cursos/${filtro}`);
	if (res.status !== 200) {
		throw new Error(`GET /api/cursos: HTTP ${res.status} — ${JSON.stringify(res.data).slice(0, 300)}`);
	}
	const body = res.data as { respuesta?: { datos?: CapacitacionCourseSummary[]; totalregistros?: number } };
	const datos = body.respuesta?.datos ?? (unwrap(res.data) as CapacitacionCourseSummary[]);
	const list = Array.isArray(datos) ? datos : [];
	return {
		schemaVersion: 1,
		savedAt: new Date().toISOString(),
		source: "api",
		totalregistros: body.respuesta?.totalregistros ?? list.length,
		datos: list,
	};
}

export interface CoursePlanResult {
	curso: CapacitacionCourseSummary & { planescurso?: unknown };
	videos: CapacitacionVideoEntry[];
}

export async function fetchCoursePlan(
	opts: CapacitacionApiOptions,
	icurso: string,
): Promise<CoursePlanResult> {
	const b64 = filtroB64({ todo: true });
	let res = await request(opts, "GET", `/api/curso/${encodeURIComponent(icurso)}/${b64}`);
	if (res.status !== 200) {
		res = await request(opts, "GET", `/api/curso/${encodeURIComponent(icurso)}`);
	}
	if (res.status !== 200) {
		throw new Error(`GET /api/curso/${icurso}: HTTP ${res.status}`);
	}
	const curso = unwrap(res.data) as CapacitacionCourseSummary & { planescurso?: unknown };
	const videos = parsePlanEscurso(curso.planescurso);
	return { curso, videos };
}

/** Obtiene HTML de la página pública del curso (requiere sesión válida en el portal). */
export async function fetchCoursePageHtml(
	icurso: string,
	session: { controlkey: string; semail?: string },
): Promise<string> {
	// El portal carga el plan vía DataSnap en el cliente; este fetch es best-effort
	// para entornos donde el HTML ya viene renderizado server-side.
	const url = `https://www.contapyme.com/capacitacion-virtual/#/${encodeURIComponent(icurso)}`;
	const r = await fetch(url, {
		headers: {
			"user-agent": "Mozilla/5.0 (compatible; ISA-DOC-capacitacion-scraper/1.0)",
			"x-capacitacion-controlkey": session.controlkey,
		},
	});
	if (!r.ok) throw new Error(`fetch course page ${icurso}: HTTP ${r.status}`);
	return r.text();
}

export function parseVideosFromHtml(html: string, icurso: string): CapacitacionVideoEntry[] {
	return parseCourseHtml(html, icurso);
}
