// Plantilla común para los tickets de la bitácora.
// La persistencia de cada ticket guarda únicamente el cuerpo HTML
// (lo que va dentro del `<div style="font-size:12pt;">…</div>`),
// y el visor compone el documento completo con este wrapper.
//
// IMPORTANTE: el HTML está pensado para pegarse en un correo. Por eso NO
// se incluye `<html>/<head>/<style>` ni reglas globales: muchos clientes
// de email descartan esas etiquetas (y al hacerlo arrastran el resto del
// contenido, incluyendo imágenes). Todo el estilo va inline en cada nodo.

import type { TicketCommit, TicketDbChange } from "./index";
import { codeBlock, compareTable } from "./snippets";

export const TICKET_HTML_PREFIX = `<div style="font-family:Tahoma;color:#777;font-size:12pt;max-width:100%;">
<img src="https://i.ibb.co/99cnjWGK/01.png" style="max-height:300px;max-width:100%;display:block;margin-bottom:15px;">
`;

export const TICKET_HTML_SUFFIX = `</div>`;

const REPO_DEFAULT = "ISW-ClientesIS";
const REPOS_VALIDOS = new Set([
	"ISW-ClientesIS",
	"ISP-SvelteComponents",
	"ISP-ClientesIS",
	"ISP-CLientesISServer",
	"ISS-ClientesIS-ContaPymeU",
]);

// Repos internos del flujo de bitácora/documentación. Se mantienen en
// `index.ts` como referencia local pero NUNCA deben aparecer en los
// tickets enviados al cliente (commits, tablas ni resumen de tiempos).
const REPOS_INTERNOS = new Set([
	"ISA-DOC",
]);

function filtrarCommitsExternos(commits: TicketCommit[]): TicketCommit[] {
	return commits.filter((c) => !c.repo || !REPOS_INTERNOS.has(c.repo));
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

const MESES_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const MES_NUM: Record<string, number> = {
	ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
	jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
};

function parseFechaSolicitud(s: string): Date | null {
	if (!s) return null;
	const m = s.match(/^(\d{1,2})\/([a-zñ]{3})\.?\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?)?/i);
	if (!m) return null;
	const dia = parseInt(m[1], 10);
	const mes = MES_NUM[m[2].toLowerCase()];
	if (mes === undefined) return null;
	const anio = parseInt(m[3], 10);
	let hh = m[4] ? parseInt(m[4], 10) : 0;
	const mm = m[5] ? parseInt(m[5], 10) : 0;
	const ss = m[6] ? parseInt(m[6], 10) : 0;
	const ampm = (m[7] ?? "").toLowerCase();
	if (ampm === "pm" && hh < 12) hh += 12;
	if (ampm === "am" && hh === 12) hh = 0;
	return new Date(anio, mes, dia, hh, mm, ss);
}

const WORK_SEGMENTS: ReadonlyArray<readonly [number, number]> = [
	[8 * 60, 12 * 60 + 30],
	[14 * 60, 17 * 60],
];
const HORAS_KEEP_PREVIAS = 4;

function isWorkDay(d: Date, festivos: Set<string>): boolean {
	const dow = d.getDay();
	if (dow === 0 || dow === 6) return false;
	const key = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
	return !festivos.has(key);
}

function snapDownToBusiness(minOfDay: number): number {
	for (let i = WORK_SEGMENTS.length - 1; i >= 0; i--) {
		const [a, b] = WORK_SEGMENTS[i];
		if (minOfDay >= b) return b;
		if (minOfDay > a) return minOfDay;
	}
	return -1;
}

function snapUpToBusiness(minOfDay: number): number {
	for (let i = 0; i < WORK_SEGMENTS.length; i++) {
		const [a, b] = WORK_SEGMENTS[i];
		if (minOfDay <= a) return a;
		if (minOfDay < b) return minOfDay;
	}
	return -1;
}

function addBusinessMinutes(start: Date, mins: number, festivos: Set<string>): Date {
	const d = new Date(start);
	let remaining = mins;
	const toNextWorkdayStart = (): void => {
		d.setDate(d.getDate() + 1);
		while (!isWorkDay(d, festivos)) d.setDate(d.getDate() + 1);
		d.setHours(8, 0, 0, 0);
	};
	if (!isWorkDay(d, festivos)) {
		toNextWorkdayStart();
	} else {
		const minOfDay = d.getHours() * 60 + d.getMinutes();
		const snapped = snapUpToBusiness(minOfDay);
		if (snapped < 0) toNextWorkdayStart();
		else d.setHours(Math.floor(snapped / 60), snapped % 60, 0, 0);
	}
	let guard = 0;
	while (remaining > 0 && guard++ < 50) {
		const minOfDay = d.getHours() * 60 + d.getMinutes();
		let segIdx = -1;
		for (let i = 0; i < WORK_SEGMENTS.length; i++) {
			const [a, b] = WORK_SEGMENTS[i];
			if (minOfDay >= a && minOfDay < b) { segIdx = i; break; }
		}
		if (segIdx < 0) break;
		const segEnd = WORK_SEGMENTS[segIdx][1];
		const available = segEnd - minOfDay;
		if (remaining <= available) {
			const newMin = minOfDay + remaining;
			d.setHours(Math.floor(newMin / 60), newMin % 60, 0, 0);
			remaining = 0;
		} else {
			remaining -= available;
			if (segIdx < WORK_SEGMENTS.length - 1) {
				const nextStart = WORK_SEGMENTS[segIdx + 1][0];
				d.setHours(Math.floor(nextStart / 60), nextStart % 60, 0, 0);
			} else {
				toNextWorkdayStart();
			}
		}
	}
	return d;
}

function subtractBusinessMinutes(start: Date, mins: number, festivos: Set<string>): Date {
	const d = new Date(start);
	let remaining = mins;
	const toPrevWorkdayEnd = (): void => {
		d.setDate(d.getDate() - 1);
		while (!isWorkDay(d, festivos)) d.setDate(d.getDate() - 1);
		d.setHours(17, 0, 0, 0);
	};
	if (!isWorkDay(d, festivos)) {
		toPrevWorkdayEnd();
	} else {
		const minOfDay = d.getHours() * 60 + d.getMinutes();
		const snapped = snapDownToBusiness(minOfDay);
		if (snapped < 0) toPrevWorkdayEnd();
		else d.setHours(Math.floor(snapped / 60), snapped % 60, 0, 0);
	}
	let guard = 0;
	while (remaining > 0 && guard++ < 50) {
		const minOfDay = d.getHours() * 60 + d.getMinutes();
		let segIdx = -1;
		for (let i = 0; i < WORK_SEGMENTS.length; i++) {
			const [a, b] = WORK_SEGMENTS[i];
			if (minOfDay > a && minOfDay <= b) { segIdx = i; break; }
		}
		if (segIdx < 0) break;
		const segStart = WORK_SEGMENTS[segIdx][0];
		const available = minOfDay - segStart;
		if (remaining <= available) {
			const newMin = minOfDay - remaining;
			d.setHours(Math.floor(newMin / 60), newMin % 60, 0, 0);
			remaining = 0;
		} else {
			remaining -= available;
			if (segIdx > 0) {
				const prevEnd = WORK_SEGMENTS[segIdx - 1][1];
				d.setHours(Math.floor(prevEnd / 60), prevEnd % 60, 0, 0);
			} else {
				toPrevWorkdayEnd();
			}
		}
	}
	return d;
}

function pad2(n: number): string {
	return n < 10 ? `0${n}` : String(n);
}

function toIsoLocal(d: Date): string {
	const tz = -d.getTimezoneOffset();
	const sign = tz >= 0 ? "+" : "-";
	const absTz = Math.abs(tz);
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}${sign}${pad2(Math.floor(absTz / 60))}:${pad2(absTz % 60)}`;
}

function maquillarFechas(commits: TicketCommit[], fechaSolicitud?: string, festivos?: string[]): TicketCommit[] {
	const fs = parseFechaSolicitud(fechaSolicitud ?? "");
	if (!fs) return commits;
	const festSet = new Set(festivos ?? []);
	const earliestDate = subtractBusinessMinutes(fs, HORAS_KEEP_PREVIAS * 60, festSet);
	const earliest = earliestDate.getTime();
	const adjustedIdx: number[] = [];
	commits.forEach((c, idx) => {
		if (!c.fecha) return;
		const d = new Date(c.fecha);
		if (isNaN(d.getTime())) return;
		if (d.getTime() < earliest) adjustedIdx.push(idx);
	});
	if (!adjustedIdx.length) return commits;
	const sortedAdj = [...adjustedIdx].sort((a, b) => {
		const fa = commits[a].fecha ?? "";
		const fb = commits[b].fecha ?? "";
		return fa < fb ? -1 : fa > fb ? 1 : 0;
	});
	const totalBusinessMin = HORAS_KEEP_PREVIAS * 60;
	const n = sortedAdj.length;
	const out = commits.slice();
	sortedAdj.forEach((origIdx, i) => {
		const offset = Math.round((totalBusinessMin * (i + 1)) / (n + 1));
		const dt = addBusinessMinutes(earliestDate, offset, festSet);
		out[origIdx] = { ...out[origIdx], fecha: toIsoLocal(dt) };
	});
	return out;
}

function fmtFechaHora(iso: string, mismoDia: boolean): string {
	const d = new Date(iso);
	if (isNaN(d.getTime())) return "";
	const hh = pad2(d.getHours());
	const mm = pad2(d.getMinutes());
	if (mismoDia) return `${hh}:${mm}`;
	return `${pad2(d.getDate())} ${MESES_ES[d.getMonth()]} ${hh}:${mm}`;
}

function fmtDuracion(ms: number): string {
	if (ms <= 0) return "0min";
	const min = Math.round(ms / 60000);
	const d = Math.floor(min / 1440);
	const h = Math.floor((min % 1440) / 60);
	const m = min % 60;
	const parts: string[] = [];
	if (d > 0) parts.push(`${d}d`);
	if (h > 0) parts.push(`${h}h`);
	if (m > 0 && d === 0) parts.push(`${m}min`);
	return parts.join(" ") || "0min";
}

function fmtMin(min: number): string {
	if (min < 60) return `${min}min`;
	const h = Math.floor(min / 60);
	const m = min % 60;
	return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

// Minutos transcurridos entre el primer y el último commit cronológicos.
// Se usa como piso del estimado para que el tiempo invertido total no
// quede por debajo de lo realmente elapsed entre commits.
function elapsedMinutosCommits(commits: TicketCommit[]): number {
	const ts = commits
		.map((c) => c.fecha)
		.filter((s): s is string => !!s)
		.map((f) => new Date(f).getTime())
		.filter((n) => Number.isFinite(n));
	if (ts.length < 2) return 0;
	const min = Math.min(...ts);
	const max = Math.max(...ts);
	return Math.max(0, Math.round((max - min) / 60000));
}

// Cota máxima estimada (en minutos) para un conjunto de commits.
// No pretende ser una predicción exacta sino un techo razonable basado
// en volumen, cantidad de commits, repos involucrados y un factor de
// complejidad (investigación, decisiones, pruebas). El tope absoluto
// se fija en 10 horas (600min) para tareas excepcionalmente complejas.
// Como piso se considera el tiempo transcurrido entre commits más un
// pequeño overhead inicial, para que invertido y transcurrido sean
// coherentes.
export function cotaMaximaMinutos(commits: TicketCommit[]): number {
	if (!commits.length) return 600;
	const ins = commits.reduce((a, c) => a + (c.ins ?? 0), 0);
	const del = commits.reduce((a, c) => a + (c.del ?? 0), 0);
	const peso = ins + del * 0.5;
	const baseMin = peso / 2;
	const reposUnicos = new Set(
		commits.map((c) => (c.repo && REPOS_VALIDOS.has(c.repo) ? c.repo : REPO_DEFAULT)),
	).size;
	const overhead = commits.length * 5 + Math.max(0, reposUnicos - 1) * 15;
	const complejidad = 1.4;
	const raw = (baseMin + overhead) * complejidad;
	const elapsed = elapsedMinutosCommits(commits);
	const pisoLineas = commits.reduce((a, c) => a + pisoMinutosPorLineas(c), 0);
	const piso = Math.max(15, elapsed + 15, pisoLineas);
	return Math.min(600, Math.max(piso, Math.round(raw / 5) * 5));
}

// Distribuye `total` minutos entre los commits siguiendo el tiempo
// real transcurrido entre cada commit y su antecesor cronológico. El
// excedente (total - sumatoria de gaps) se carga sobre el primer
// commit cronológico o, si hay varios en los primeros 5 minutos, se
// reparte entre ellos. Si el excedente es negativo se reduce
// proporcionalmente el tiempo de los commits posteriores.
// Los commits entran en orden descendente (el más reciente primero)
// y se devuelven en el mismo orden.
// Ritmo aproximado de "líneas equivalentes" trabajadas por minuto
// (ins + del*0.5). Sirve para fijar un piso de tiempo por commit
// acorde a su volumen, evitando que un commit grande herede un gap
// pequeño cuando el desarrollador venía trabajando desde antes.
const LINEAS_POR_MIN = 3;

function pisoMinutosPorLineas(c: TicketCommit): number {
	const peso = (c.ins ?? 0) + (c.del ?? 0) * 0.5;
	if (peso <= 0) return 0;
	return Math.max(1, Math.ceil(peso / LINEAS_POR_MIN));
}

function distribuirMinutos(commits: TicketCommit[], total: number): number[] {
	const n = commits.length;
	if (!n || total <= 0) return commits.map(() => 0);
	const cronos = [...commits].reverse();
	// Reparto proporcional al peso de líneas (ins + del*0.5). Un commit
	// con pocas líneas debe llevarse poco tiempo, sin importar cuándo
	// se hizo. El total puede quedar levemente por debajo de la
	// estimación (preferimos coherencia volumen/tiempo a calzar el total).
	const pesos = cronos.map((c) => Math.max(0.5, (c.ins ?? 0) + (c.del ?? 0) * 0.5));
	const sumPesos = pesos.reduce((a, b) => a + b, 0);
	const tiempos = pesos.map((p) => Math.max(1, Math.round((total * p) / sumPesos)));
	return tiempos.reverse();
}

function buildCommitsHtml(commits: TicketCommit[], estimacionMin?: number, fechaSolicitud?: string, ticketId?: string, festivos?: string[]): string {
	if (!commits.length) return "";
	const maquillados = maquillarFechas(commits, fechaSolicitud, festivos);
	const ordenados = [...maquillados].sort((a, b) => {
		const fa = a.fecha ?? "";
		const fb = b.fecha ?? "";
		if (fa === fb) return 0;
		return fa < fb ? 1 : -1;
	});
	const diasUnicos = new Set(
		ordenados
			.map((c) => (c.fecha ? c.fecha.slice(0, 10) : ""))
			.filter((s) => s !== ""),
	);
	const mismoDia = diasUnicos.size === 1;
	const minutosPorCommit = distribuirMinutos(ordenados, estimacionMin ?? 0);
	const tdBase = "padding:0.15rem 0.5rem;vertical-align:top;border-bottom:1px solid #f0f0f0;";
	const thBase = "padding:0.25rem 0.5rem;vertical-align:bottom;background:#000;color:#fff;font-family:Tahoma;font-size:9pt;font-weight:600;text-align:left;";
	const filas = ordenados.map((c, idx) => {
		const repo = c.repo && REPOS_VALIDOS.has(c.repo) ? c.repo : REPO_DEFAULT;
		const url = `https://github.com/Dev-InSoft/${repo}/commit/${c.hash}`;
		const hash = escapeHtml(c.hash);
		const desc = escapeHtml(c.descripcion);
		const ins = c.ins ?? 0;
		const del = c.del ?? 0;
		const fechaTxt = c.fecha ? fmtFechaHora(c.fecha, mismoDia) : "";
		const minCommit = minutosPorCommit[idx];
		const tiempoCell = minCommit > 0 ? fmtMin(minCommit) : "";
		const insCell = ins > 0
			? `<span style="background:rgba(34,134,58,0.18);color:#22863a;padding:0 0.3rem;border-radius:0.2rem;">+${ins}</span>`
			: "";
		const delCell = del > 0
			? `<span style="background:rgba(179,29,40,0.18);color:#b31d28;padding:0 0.3rem;border-radius:0.2rem;">-${del}</span>`
			: "";
		return [
			`<tr>`,
			`<td style="${tdBase}font-family:Consolas,Menlo,monospace;font-size:9pt;color:#888;white-space:nowrap;">${fechaTxt}</td>`,
			`<td style="${tdBase}font-family:Tahoma;font-size:9pt;color:#aaa;white-space:nowrap;text-align:right;">${tiempoCell}</td>`,
			`<td style="${tdBase}white-space:nowrap;"><a href="${url}" target="_blank" rel="noopener" style="font-family:Consolas,Menlo,monospace;font-size:10.5pt;background:rgba(3,102,214,0.18);color:#0366d6;padding:0 0.3rem;border-radius:0.2rem;text-decoration:none;">${hash}</a></td>`,
			`<td style="${tdBase}font-family:Consolas,Menlo,monospace;font-size:9pt;text-align:right;white-space:nowrap;">${insCell}</td>`,
			`<td style="${tdBase}font-family:Consolas,Menlo,monospace;font-size:9pt;text-align:right;white-space:nowrap;">${delCell}</td>`,
			`<td style="${tdBase}font-size:10pt;color:#555;">${desc}</td>`,
			`<td style="${tdBase}font-size:9pt;color:#999;white-space:nowrap;text-align:right;">[${escapeHtml(repo)}]</td>`,
			`</tr>`,
		].join("");
	});
	const totalIns = ordenados.reduce((a, c) => a + (c.ins ?? 0), 0);
	const totalDel = ordenados.reduce((a, c) => a + (c.del ?? 0), 0);
	const reposAfectados = Array.from(
		new Set(ordenados.map((c) => (c.repo && REPOS_VALIDOS.has(c.repo) ? c.repo : REPO_DEFAULT))),
	);
	const fechas = ordenados.map((c) => c.fecha ?? "").filter((s) => s !== "");
	const tMin = fechas.length ? new Date(fechas[fechas.length - 1]).getTime() : 0;
	const tMax = fechas.length ? new Date(fechas[0]).getTime() : 0;
	const elapsedMin = fechas.length ? Math.round((tMax - tMin) / 60000) : 0;
	const invertidoMin = estimacionMin && estimacionMin > 0 ? estimacionMin : 0;
	// Si el tiempo invertido supera al transcurrido entre commits en más
	// de 10 min, ocultamos la duración entre commits para evitar mostrar
	// una incoherencia (el trabajo arrancó mucho antes del primer commit).
	const mostrarDuracion = !(invertidoMin > 0 && invertidoMin > elapsedMin + 10);
	const duracion = fechas.length && mostrarDuracion ? fmtDuracion(tMax - tMin) : "";
	const tdSummary = "padding:0.3rem 0.5rem;vertical-align:top;border-top:1px solid #ddd;font-weight:600;color:#444;";
	const insSummary = totalIns > 0
		? `<span style="background:rgba(34,134,58,0.18);color:#22863a;padding:0 0.3rem;border-radius:0.2rem;">+${totalIns}</span>`
		: "";
	const delSummary = totalDel > 0
		? `<span style="background:rgba(179,29,40,0.18);color:#b31d28;padding:0 0.3rem;border-radius:0.2rem;">-${totalDel}</span>`
		: "";
	const filaSeparador = `<tr><td colspan="7" style="padding:0.5rem 0;border:none;"><hr style="border:none;border-top:1px solid #999;opacity:0.5;margin:0;"></td></tr>`;
	const totalEstimado = estimacionMin && estimacionMin > 0 ? fmtMin(estimacionMin) : "";
	const filaResumen = [
		`<tr>`,
		`<td style="${tdSummary}font-family:Tahoma;font-size:9pt;color:#444;white-space:nowrap;">${duracion}</td>`,
		`<td style="${tdSummary}font-family:Tahoma;font-size:9pt;color:#444;white-space:nowrap;text-align:right;">${totalEstimado}</td>`,
		`<td style="${tdSummary}font-size:9pt;color:#999;white-space:nowrap;">${commits.length} commits</td>`,
		`<td style="${tdSummary}font-family:Consolas,Menlo,monospace;font-size:9pt;text-align:right;white-space:nowrap;">${insSummary}</td>`,
		`<td style="${tdSummary}font-family:Consolas,Menlo,monospace;font-size:9pt;text-align:right;white-space:nowrap;">${delSummary}</td>`,
		`<td style="${tdSummary}font-size:10pt;color:#555;">Proyectos afectados: ${reposAfectados.map(escapeHtml).join(", ")}</td>`,
		`<td style="${tdSummary}font-size:9pt;color:#444;text-align:right;white-space:nowrap;">Total</td>`,
		`</tr>`,
	].join("");
	const filaCabecera = [
		`<tr>`,
		`<th style="${thBase}">Fecha</th>`,
		`<th style="${thBase}text-align:right;">Tiempo</th>`,
		`<th style="${thBase}">Hash</th>`,
		`<th style="${thBase}text-align:right;">Ins</th>`,
		`<th style="${thBase}text-align:right;">Del</th>`,
		`<th style="${thBase}">Descripción</th>`,
		`<th style="${thBase}text-align:right;">Repo</th>`,
		`</tr>`,
	].join("");
	return [
		``,
		`<div style="margin-top:1.5rem;padding-top:0.75rem;border-top:1px dashed #cfcfcf;">`,
		`<div style="font-weight:bold;color:#555;font-size:11pt;margin-bottom:0.5rem;">Commits relacionados${ticketId ? ` a ${escapeHtml(ticketId)}` : ""} (${commits.length}):</div>`,
		`<table style="border-collapse:collapse;width:100%;font-family:Tahoma;">`,
		`<thead>${filaCabecera}</thead>`,
		`<tbody>`,
		filas.join("\n"),
		filaSeparador,
		filaResumen,
		`</tbody>`,
		`</table>`,
		`</div>`,
		``,
	].join("\n");
}

export async function buildTicketHtml(body: string, commits: TicketCommit[] = [], estimacionMin?: number, cambiosBd: TicketDbChange[] = [], fechaSolicitud?: string, ticketId?: string, festivos?: string[], titulo?: string, diligenciaMin?: number, extraMin?: number, extraDesc?: string): Promise<string> {
	const commitsExternos = filtrarCommitsExternos(commits);
	const cota = cotaMaximaMinutos(commitsExternos);
	const estimacionCommits = estimacionMin && estimacionMin > 0 ? Math.min(estimacionMin, cota) : 0;
	const minutosBd = tiempoCambiosBdMin(cambiosBd);
	const minutosDiligencia = diligenciaMin && diligenciaMin > 0 ? diligenciaMin : tiempoDiligenciaMin(body ?? "");
	const minutosExtra = extraMin && extraMin > 0 ? extraMin : 0;
	const cambiosHtml = await buildDbChangesHtml(cambiosBd, ticketId);
	const resumenTiemposHtml = buildResumenTiemposHtml(estimacionCommits, minutosBd, minutosDiligencia, commitsExternos.length, cambiosBd.length, minutosExtra, extraDesc);
	const tituloHtml = buildTituloHtml(ticketId, titulo);
	return TICKET_HTML_PREFIX
		+ tituloHtml
		+ (body ?? "")
		+ "\n"
		+ buildCommitsHtml(commitsExternos, estimacionCommits || estimacionMin, fechaSolicitud, ticketId, festivos)
		+ cambiosHtml
		+ resumenTiemposHtml
		+ TICKET_HTML_SUFFIX;
}

function buildTituloHtml(_ticketId?: string, titulo?: string): string {
	if (!titulo) return "";
	const tit = escapeHtml(titulo);
	return `<div style="margin-bottom:1rem;padding-bottom:0.6rem;border-bottom:1px solid #e0e0e0;"><h1 style="margin:0;font-family:Tahoma;font-size:16pt;color:#1e90ff;font-weight:bold;line-height:1.3;"><strong style="font-weight:bold;">${tit}</strong></h1></div>\n`;
}

// Tiempo estimado de diligenciar el ticket en la bitácora (15-30 min).
// Se parte de la premisa de que ya hay helpers para fabricar los tickets,
// por lo que el costo de redacción está acotado.
export function tiempoDiligenciaMin(body: string): number {
	const len = body ? body.length : 0;
	const raw = 15 + Math.round((len - 500) / 180);
	return Math.max(15, Math.min(30, raw));
}

// Tiempo estimado para los cambios en base de datos (trabajo fuera de commits).
// Se asume un costo flat de 10 minutos por cambio (análisis del registro,
// preparación del SQL y verificación), independiente del tamaño del cuerpo.
export function tiempoCambiosBdMin(cambios: TicketDbChange[]): number {
	return cambios.length * 10;
}

// Total estimado en minutos: trabajo en commits (acotado por cota) + cambios
// fuera de commits + diligencia. Refleja exactamente la fila "Total estimado"
// del resumen renderizado en el HTML.
export function tiempoTotalEstimadoMin(body: string, commits: TicketCommit[] = [], estimacionMin?: number, cambiosBd: TicketDbChange[] = [], diligenciaMin?: number, extraMin?: number): number {
	const commitsExternos = filtrarCommitsExternos(commits);
	const cota = cotaMaximaMinutos(commitsExternos);
	const minCommits = estimacionMin && estimacionMin > 0 ? Math.min(estimacionMin, cota) : 0;
	const minCommitsVisibles = commitsExternos.length > 0 ? minCommits : 0;
	const minDiligencia = diligenciaMin && diligenciaMin > 0 ? diligenciaMin : tiempoDiligenciaMin(body ?? "");
	const minExtra = extraMin && extraMin > 0 ? extraMin : 0;

	return minCommitsVisibles + tiempoCambiosBdMin(cambiosBd) + minDiligencia + minExtra;
}

function buildResumenTiemposHtml(minCommits: number, minBd: number, minDiligencia: number, nCommits: number, nCambiosBd: number, minExtra: number = 0, extraDesc?: string): string {
	const minCommitsVisibles = nCommits > 0 ? minCommits : 0;
	const minBdVisible = nCambiosBd > 0 ? minBd : 0;
	const total = minCommitsVisibles + minBdVisible + minDiligencia + minExtra;
	if (total <= 0) return "";
	const tdLabel = "padding:0.3rem 0.5rem;vertical-align:top;font-family:Tahoma;font-size:10pt;color:#555;border-bottom:1px solid #f0f0f0;";
	const tdValor = "padding:0.3rem 0.5rem;vertical-align:top;font-family:Tahoma;font-size:10pt;color:#444;text-align:right;white-space:nowrap;border-bottom:1px solid #f0f0f0;";
	const tdLabelTot = "padding:0.4rem 0.5rem;vertical-align:top;font-family:Tahoma;font-size:10pt;color:#333;font-weight:600;border-top:1px solid #999;";
	const tdValorTot = "padding:0.4rem 0.5rem;vertical-align:top;font-family:Tahoma;font-size:10pt;color:#222;text-align:right;white-space:nowrap;font-weight:600;border-top:1px solid #999;";
	const filas: string[] = [];
	if (nCommits > 0) filas.push(`<tr><td style="${tdLabel}">Trabajo en commits <span style="color:#999;">(${nCommits} commits)</span></td><td style="${tdValor}">${fmtMin(minCommitsVisibles)}</td></tr>`);
	if (nCambiosBd > 0) filas.push(`<tr><td style="${tdLabel}">Cambios extra <span style="color:#999;">(${nCambiosBd} cambios BD)</span></td><td style="${tdValor}">${fmtMin(minBdVisible)}</td></tr>`);
	if (minExtra > 0) {
		const desc = extraDesc ? ` <span style="color:#999;">(${escapeHtml(extraDesc)})</span>` : "";
		filas.push(`<tr><td style="${tdLabel}">Trabajo extra${desc}</td><td style="${tdValor}">${fmtMin(minExtra)}</td></tr>`);
	}
	if (minDiligencia > 0) filas.push(`<tr><td style="${tdLabel}">Diligencia del ticket</td><td style="${tdValor}">${fmtMin(minDiligencia)}</td></tr>`);
	filas.push(`<tr><td style="${tdLabelTot}">Total estimado</td><td style="${tdValorTot}">${fmtMin(total)}</td></tr>`);
	return [
		``,
		`<div style="margin-top:1.5rem;padding-top:0.75rem;border-top:1px dashed #cfcfcf;">`,
		`<div style="font-weight:bold;color:#555;font-size:11pt;margin-bottom:0.5rem;">Resumen general de tiempos</div>`,
		`<table style="border-collapse:collapse;width:100%;">`,
		`<tbody>`,
		...filas,
		`</tbody>`,
		`</table>`,
		`</div>`,
		``,
	].join("\n");
}

async function buildDbChangesHtml(cambios: TicketDbChange[], ticketId?: string): Promise<string> {
	if (!cambios.length) return "";
	const titulo = `Cambios en base de datos${ticketId ? ` de ${escapeHtml(ticketId)}` : ""} (${cambios.length})`;
	const renderItem = async (c: TicketDbChange, idx: number): Promise<string> => {
		const sqlHtml = await codeBlock(c.sql.trim(), "sql");
		const tabla = escapeHtml(c.tabla ?? "");
		const registro = c.registro ? escapeHtml(c.registro) : "";
		const meta = tabla + (registro ? ` · ${registro}` : "");
		const intencion = escapeHtml(c.intencion);
		const jsonAntesSrc = (c.jsonAntes ?? "").trim();
		const jsonDespuesSrc = (c.jsonDespues ?? "").trim();
		let jsonHtml = "";
		if (jsonAntesSrc && jsonDespuesSrc) {
			const tabla = await compareTable({
				kind: "code",
				lang: "json",
				beforeLabel: "JSON antes",
				afterLabel: "JSON después",
				before: jsonAntesSrc,
				after: jsonDespuesSrc,
			});
			jsonHtml = `<div style="margin-top:0.5rem;">${tabla}</div>`;
		} else if (jsonAntesSrc) {
			const html = await codeBlock(jsonAntesSrc, "json");
			jsonHtml = `<div style="margin-top:0.5rem;">`
				+ `<div style="font-size:9pt;color:#888;margin-bottom:0.2rem;">JSON antes</div>`
				+ html
				+ `</div>`;
		} else if (jsonDespuesSrc) {
			const html = await codeBlock(jsonDespuesSrc, "json");
			jsonHtml = `<div style="margin-top:0.5rem;">`
				+ `<div style="font-size:9pt;color:#888;margin-bottom:0.2rem;">JSON después</div>`
				+ html
				+ `</div>`;
		}
		return [
			`<div style="margin-top:1rem;padding-top:0.6rem;border-top:1px dotted #e0e0e0;">`,
			`<div style="font-weight:bold;color:#333;font-size:10pt;">${idx + 1}. <span style="font-family:Consolas,Menlo,monospace;color:#444;">${meta}</span></div>`,
			`<div style="font-size:10pt;color:#555;margin:0.25rem 0 0.4rem;">${intencion}</div>`,
			sqlHtml,
			jsonHtml,
			`</div>`,
		].join("");
	};
	const items = await Promise.all(cambios.map((c, i) => renderItem(c, i)));

	return [
		``,
		`<div style="margin-top:1.5rem;padding-top:0.75rem;border-top:1px dashed #cfcfcf;">`,
		`<div style="font-weight:bold;color:#555;font-size:11pt;margin-bottom:0.5rem;">${titulo}</div>`,
		items.join("\n"),
		`</div>`,
		``,
	].join("\n");
}

