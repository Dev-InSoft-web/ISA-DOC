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

// Cota máxima estimada (en minutos) para un conjunto de commits.
// No pretende ser una predicción exacta sino un techo razonable basado
// en volumen, cantidad de commits, repos involucrados y un factor de
// complejidad (investigación, decisiones, pruebas). El tope absoluto
// se fija en 10 horas (600min) para tareas excepcionalmente complejas.
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
	return Math.min(600, Math.max(15, Math.round(raw / 5) * 5));
}

function distribuirMinutos(commits: TicketCommit[], total: number): number[] {
	if (!commits.length || total <= 0) return commits.map(() => 0);
	const pesos = commits.map((c) => Math.max(1, (c.ins ?? 0) + (c.del ?? 0)));
	const suma = pesos.reduce((a, b) => a + b, 0);
	const crudos = pesos.map((p) => (p / suma) * total);
	const enteros = crudos.map((v) => Math.floor(v));
	let asignado = enteros.reduce((a, b) => a + b, 0);
	const restos = crudos.map((v, i) => ({ i, r: v - Math.floor(v) }));
	restos.sort((a, b) => b.r - a.r);
	let k = 0;
	while (asignado < total && k < restos.length) {
		enteros[restos[k].i]++;
		asignado++;
		k++;
	}
	return enteros;
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
			? `<span style="background:#e6ffed;color:#22863a;padding:0 0.3rem;border-radius:0.2rem;">+${ins}</span>`
			: "";
		const delCell = del > 0
			? `<span style="background:#ffeef0;color:#b31d28;padding:0 0.3rem;border-radius:0.2rem;">-${del}</span>`
			: "";
		return [
			`<tr>`,
			`<td style="${tdBase}font-family:Consolas,Menlo,monospace;font-size:9pt;color:#888;white-space:nowrap;">${fechaTxt}</td>`,
			`<td style="${tdBase}font-family:Tahoma;font-size:9pt;color:#aaa;white-space:nowrap;text-align:right;">${tiempoCell}</td>`,
			`<td style="${tdBase}white-space:nowrap;"><a href="${url}" target="_blank" rel="noopener" style="font-family:Consolas,Menlo,monospace;font-size:10.5pt;background:#f0f0f0;color:#0366d6;padding:0 0.3rem;border-radius:0.2rem;text-decoration:none;">${hash}</a></td>`,
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
	const duracion = fechas.length ? fmtDuracion(tMax - tMin) : "";
	const tdSummary = "padding:0.3rem 0.5rem;vertical-align:top;border-top:1px solid #ddd;font-weight:600;color:#444;";
	const insSummary = totalIns > 0
		? `<span style="background:#e6ffed;color:#22863a;padding:0 0.3rem;border-radius:0.2rem;">+${totalIns}</span>`
		: "";
	const delSummary = totalDel > 0
		? `<span style="background:#ffeef0;color:#b31d28;padding:0 0.3rem;border-radius:0.2rem;">-${totalDel}</span>`
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

export async function buildTicketHtml(body: string, commits: TicketCommit[] = [], estimacionMin?: number, cambiosBd: TicketDbChange[] = [], fechaSolicitud?: string, ticketId?: string, festivos?: string[], titulo?: string): Promise<string> {
	const cota = cotaMaximaMinutos(commits);
	const estimacionCommits = estimacionMin && estimacionMin > 0 ? Math.min(estimacionMin, cota) : 0;
	const minutosBd = tiempoCambiosBdMin(cambiosBd);
	const minutosDiligencia = tiempoDiligenciaMin(body ?? "");
	const cambiosHtml = await buildDbChangesHtml(cambiosBd, ticketId);
	const resumenTiemposHtml = buildResumenTiemposHtml(estimacionCommits, minutosBd, minutosDiligencia, commits.length, cambiosBd.length);
	const tituloHtml = buildTituloHtml(ticketId, titulo);
	return TICKET_HTML_PREFIX
		+ tituloHtml
		+ (body ?? "")
		+ "\n"
		+ buildCommitsHtml(commits, estimacionCommits || estimacionMin, fechaSolicitud, ticketId, festivos)
		+ cambiosHtml
		+ resumenTiemposHtml
		+ TICKET_HTML_SUFFIX;
}

function buildTituloHtml(ticketId?: string, titulo?: string): string {
	if (!titulo && !ticketId) return "";
	const id = ticketId ? escapeHtml(ticketId) : "";
	const tit = titulo ? escapeHtml(titulo) : "";
	const left = id ? `<span style="font-family:Consolas,Menlo,monospace;font-size:11pt;color:#888;background:#f3f3f3;padding:0.1rem 0.5rem;border-radius:0.25rem;margin-right:0.5rem;">${id}</span>` : "";
	return `<div style="margin-bottom:1rem;padding-bottom:0.6rem;border-bottom:1px solid #e0e0e0;"><h1 style="margin:0;font-family:Tahoma;font-size:16pt;color:#333;font-weight:600;line-height:1.3;">${left}${tit}</h1></div>\n`;
}

// Tiempo estimado de diligenciar el ticket en la bitácora (15-90 min).
// Crece linealmente con el volumen del body HTML, acotado a [15, 90].
export function tiempoDiligenciaMin(body: string): number {
	const len = body ? body.length : 0;
	const raw = 15 + Math.round((len - 500) / 180);
	return Math.max(15, Math.min(90, raw));
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
export function tiempoTotalEstimadoMin(body: string, commits: TicketCommit[] = [], estimacionMin?: number, cambiosBd: TicketDbChange[] = []): number {
	const cota = cotaMaximaMinutos(commits);
	const minCommits = estimacionMin && estimacionMin > 0 ? Math.min(estimacionMin, cota) : 0;

	return minCommits + tiempoCambiosBdMin(cambiosBd) + tiempoDiligenciaMin(body ?? "");
}

function buildResumenTiemposHtml(minCommits: number, minBd: number, minDiligencia: number, nCommits: number, nCambiosBd: number): string {
	const total = minCommits + minBd + minDiligencia;
	if (total <= 0) return "";
	const tdLabel = "padding:0.3rem 0.5rem;vertical-align:top;font-family:Tahoma;font-size:10pt;color:#555;border-bottom:1px solid #f0f0f0;";
	const tdValor = "padding:0.3rem 0.5rem;vertical-align:top;font-family:Tahoma;font-size:10pt;color:#444;text-align:right;white-space:nowrap;border-bottom:1px solid #f0f0f0;";
	const tdLabelTot = "padding:0.4rem 0.5rem;vertical-align:top;font-family:Tahoma;font-size:10pt;color:#333;font-weight:600;border-top:1px solid #999;";
	const tdValorTot = "padding:0.4rem 0.5rem;vertical-align:top;font-family:Tahoma;font-size:10pt;color:#222;text-align:right;white-space:nowrap;font-weight:600;border-top:1px solid #999;";
	const filaCommits = nCommits > 0
		? `<tr><td style="${tdLabel}">Trabajo en commits <span style="color:#999;">(${nCommits} commits)</span></td><td style="${tdValor}">${fmtMin(minCommits)}</td></tr>`
		: `<tr><td style="${tdLabel}">Trabajo en commits</td><td style="${tdValor}">${fmtMin(minCommits)}</td></tr>`;
	const filaBd = `<tr><td style="${tdLabel}">Cambios extra <span style="color:#999;">(${nCambiosBd} cambios BD)</span></td><td style="${tdValor}">${fmtMin(minBd)}</td></tr>`;
	const filaDili = `<tr><td style="${tdLabel}">Diligencia del ticket</td><td style="${tdValor}">${fmtMin(minDiligencia)}</td></tr>`;
	const filaTotal = `<tr><td style="${tdLabelTot}">Total estimado</td><td style="${tdValorTot}">${fmtMin(total)}</td></tr>`;
	return [
		``,
		`<div style="margin-top:1.5rem;padding-top:0.75rem;border-top:1px dashed #cfcfcf;">`,
		`<div style="font-weight:bold;color:#555;font-size:11pt;margin-bottom:0.5rem;">Resumen general de tiempos</div>`,
		`<table style="border-collapse:collapse;width:100%;">`,
		`<tbody>`,
		filaCommits,
		filaBd,
		filaDili,
		filaTotal,
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

