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

function buildCommitsHtml(commits: TicketCommit[]): string {
	if (!commits.length) return "";
	const items = commits
		.map((c) => {
			const repo = c.repo && REPOS_VALIDOS.has(c.repo) ? c.repo : REPO_DEFAULT;
			const url = `https://github.com/Dev-InSoft/${repo}/commit/${c.hash}`;
			const hash = escapeHtml(c.hash);
			const desc = escapeHtml(c.descripcion);
			const ins = c.ins ?? 0;
			const del = c.del ?? 0;
			const stats = (c.ins != null || c.del != null)
				? `<span style="display:inline-flex;gap:0.2rem;font-family:Consolas,Menlo,monospace;font-size:9pt;flex:0 0 auto;">`
					+ `<span style="background:#e6ffed;color:#22863a;padding:0 0.3rem;border-radius:0.2rem;">+${ins}</span>`
					+ `<span style="background:#ffeef0;color:#b31d28;padding:0 0.3rem;border-radius:0.2rem;">-${del}</span>`
					+ `</span>`
				: "";
			return `<div style="display:flex;gap:0.4rem;align-items:baseline;line-height:1.35;">
<a href="${url}" target="_blank" rel="noopener" style="font-family:Consolas,Menlo,monospace;font-size:10.5pt;background:#f0f0f0;color:#0366d6;padding:0 0.3rem;border-radius:0.2rem;text-decoration:none;flex:0 0 auto;">${hash}</a>
${stats}
<span style="font-size:10pt;color:#555;">${desc}</span>
<span style="font-size:9pt;color:#999;">[${escapeHtml(repo)}]</span>
</div>`;
		})
		.join("\n");
	return `\n<div style="margin-top:1.5rem;padding-top:0.75rem;border-top:1px dashed #cfcfcf;">
<div style="font-weight:bold;color:#555;font-size:11pt;margin-bottom:0.5rem;">Commits relacionados (${commits.length}):</div>
${items}
</div>\n`;
}

export function buildTicketHtml(body: string, commits: TicketCommit[] = []): string {
	return TICKET_HTML_PREFIX + (body ?? "") + "\n" + buildCommitsHtml(commits) + TICKET_HTML_SUFFIX;
}

