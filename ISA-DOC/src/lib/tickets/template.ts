// Plantilla común para los tickets de la bitácora.
// La persistencia de cada ticket guarda únicamente el cuerpo HTML
// (lo que va dentro del `<div style="font-size:12pt;">…</div>`),
// y el visor compone el documento completo con este wrapper.
//
// IMPORTANTE: el HTML está pensado para pegarse en un correo. Por eso NO
// se incluye `<html>/<head>/<style>` ni reglas globales: muchos clientes
// de email descartan esas etiquetas (y al hacerlo arrastran el resto del
// contenido, incluyendo imágenes). Todo el estilo va inline en cada nodo.

import type { TicketCommit } from "./index";

export const TICKET_HTML_PREFIX = `<div style="font-family:Tahoma;color:#777;font-size:12pt;max-width:100%;text-wrap:balance;">
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

function pad2(n: number): string {
	return n < 10 ? `0${n}` : String(n);
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

function buildCommitsHtml(commits: TicketCommit[]): string {
	if (!commits.length) return "";
	const ordenados = [...commits].sort((a, b) => {
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
	const tdBase = "padding:0.15rem 0.5rem;vertical-align:top;border-bottom:1px solid #f0f0f0;";
	const filas = ordenados.map((c) => {
		const repo = c.repo && REPOS_VALIDOS.has(c.repo) ? c.repo : REPO_DEFAULT;
		const url = `https://github.com/Dev-InSoft/${repo}/commit/${c.hash}`;
		const hash = escapeHtml(c.hash);
		const desc = escapeHtml(c.descripcion);
		const ins = c.ins ?? 0;
		const del = c.del ?? 0;
		const fechaTxt = c.fecha ? fmtFechaHora(c.fecha, mismoDia) : "";
		const insCell = ins > 0
			? `<span style="background:#e6ffed;color:#22863a;padding:0 0.3rem;border-radius:0.2rem;">+${ins}</span>`
			: "";
		const delCell = del > 0
			? `<span style="background:#ffeef0;color:#b31d28;padding:0 0.3rem;border-radius:0.2rem;">-${del}</span>`
			: "";
		return [
			`<tr>`,
			`<td style="${tdBase}font-family:Consolas,Menlo,monospace;font-size:9pt;color:#888;white-space:nowrap;">${fechaTxt}</td>`,
			`<td style="${tdBase}white-space:nowrap;"><a href="${url}" target="_blank" rel="noopener" style="font-family:Consolas,Menlo,monospace;font-size:10.5pt;background:#f0f0f0;color:#0366d6;padding:0 0.3rem;border-radius:0.2rem;text-decoration:none;">${hash}</a></td>`,
			`<td style="${tdBase}font-family:Consolas,Menlo,monospace;font-size:9pt;text-align:right;white-space:nowrap;">${insCell}</td>`,
			`<td style="${tdBase}font-family:Consolas,Menlo,monospace;font-size:9pt;text-align:right;white-space:nowrap;">${delCell}</td>`,
			`<td style="${tdBase}font-size:10pt;color:#555;text-wrap:pretty;">${desc}</td>`,
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
	const filaSeparador = `<tr><td colspan="6" style="padding:0.5rem 0;border:none;"><hr style="border:none;border-top:1px solid #999;opacity:0.5;margin:0;"></td></tr>`;
	const filaResumen = [
		`<tr>`,
		`<td style="${tdSummary}font-family:Tahoma;font-size:9pt;color:#444;white-space:nowrap;">${duracion}</td>`,
		`<td style="${tdSummary}font-family:Tahoma;font-size:9pt;color:#444;white-space:nowrap;">Total</td>`,
		`<td style="${tdSummary}font-family:Consolas,Menlo,monospace;font-size:9pt;text-align:right;white-space:nowrap;">${insSummary}</td>`,
		`<td style="${tdSummary}font-family:Consolas,Menlo,monospace;font-size:9pt;text-align:right;white-space:nowrap;">${delSummary}</td>`,
		`<td style="${tdSummary}font-size:10pt;color:#555;">Proyectos afectados: ${reposAfectados.map(escapeHtml).join(", ")}</td>`,
		`<td style="${tdSummary}font-size:9pt;color:#999;text-align:right;white-space:nowrap;">${commits.length} commits</td>`,
		`</tr>`,
	].join("");
	return [
		``,
		`<div style="margin-top:1.5rem;padding-top:0.75rem;border-top:1px dashed #cfcfcf;">`,
		`<div style="font-weight:bold;color:#555;font-size:11pt;margin-bottom:0.5rem;">Commits relacionados (${commits.length}):</div>`,
		`<table style="border-collapse:collapse;width:100%;font-family:Tahoma;">`,
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

export function buildTicketHtml(body: string, commits: TicketCommit[] = []): string {
	return TICKET_HTML_PREFIX + (body ?? "") + "\n" + buildCommitsHtml(commits) + TICKET_HTML_SUFFIX;
}

