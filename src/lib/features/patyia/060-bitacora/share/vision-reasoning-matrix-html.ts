/**
 * HTML email-safe — matriz visión × detail × reasoning (gpt-5-mini + piloto nano).
 * Fuente: bitácora 2026-06-09 · script test-vision-reasoning-matrix.mjs
 */

export type CritScores = { c1: number; c2: number; c3: number; c4: number; c5: number };

export type MatrixCell = CritScores & {
	detail: "low" | "medium" | "high";
	reasoning: "low" | "medium" | "high";
	rank: number;
	ct: number;
	ctRank: number;
	ms: number;
	conv: number;
};

export type GlobalRow = CritScores & {
	rank: number;
	est: string;
	detail: string;
	reasoning: string;
	ms: number;
	conv: number;
	ct: number;
	ctRank: number;
};

const DETAILS = ["low", "medium", "high"] as const;
const REASONINGS = ["low", "medium", "high"] as const;

const IMG_W = 2752;
const IMG_H = 1536;
const IMG_BYTES = 5_742_115;

const JUDGE_CRITERIA = [
	{ code: "C1", label: "Precisión textual", peso: "30%", desc: "Exactitud de títulos, etiquetas y citas vs. lo visible." },
	{ code: "C2", label: "Cobertura de elementos", peso: "25%", desc: "Iconos, secciones, bloques y relaciones visuales." },
	{ code: "C3", label: "Detalle útil", peso: "20%", desc: "Profundidad relevante sin relleno." },
	{ code: "C4", label: "Claridad y orden", peso: "15%", desc: "Estructura legible y jerarquía." },
	{ code: "C5", label: "Fidelidad", peso: "10%", desc: "Sin textos inventados ni alucinaciones." },
];

const TH = "padding:4px 6px;background:#000;color:#fff;font-family:Tahoma,Arial,sans-serif;font-size:9px;font-weight:600;border-bottom:1px solid #333;";
const TD = "padding:3px 6px;border-bottom:1px solid #dde2e8;font-family:Tahoma,Arial,sans-serif;font-size:10px;color:#1a1a1a;vertical-align:middle;";
const TDN = `${TD}text-align:right;`;
const TDC = `${TD}text-align:center;`;

/** Índice 1 = peor, n = mejor → rojo → naranja → verde con transparencia. */
export function rankBadgeStyle(rank: number, n = 9): string {
	const t = n <= 1 ? 1 : (rank - 1) / (n - 1);
	let r: number;
	let g: number;
	let b: number;
	if (t <= 0.5) {
		const u = t * 2;
		r = Math.round(220 + (253 - 220) * u);
		g = Math.round(53 + (126 - 53) * u);
		b = Math.round(69 + (20 - 69) * u);
	} else {
		const u = (t - 0.5) * 2;
		r = Math.round(253 + (40 - 253) * u);
		g = Math.round(126 + (167 - 126) * u);
		b = Math.round(20 + (69 - 20) * u);
	}
	const a = 0.38 + t * 0.42;
	return `background:rgba(${r},${g},${b},${a.toFixed(2)});color:#1a1a1a;border:1px solid rgba(${r},${g},${b},0.75);`;
}

function idxBadge(idx: number, n: number): string {
	const bg = rankBadgeStyle(idx, n);
	return (
		`<span style="display:inline-block;min-width:22px;padding:2px 5px;border-radius:5px;` +
		`font-size:9px;font-weight:700;text-align:center;${bg}">${idx}</span>`
	);
}

function rankBadge(rank: number, n = 9): string {
	return idxBadge(rank, n);
}

function msLabel(ms: number): string {
	if (ms >= 1000) return `${(ms / 1000).toFixed(1)} s`;
	return `${ms} ms`;
}

function sectionTitle(text: string): string {
	return `<h4 style="font-family:Tahoma,Arial,sans-serif;font-size:13px;color:#0b3360;margin:16px 0 6px;font-weight:700;">${text}</h4>`;
}

function criteriaTable(): string {
	let html =
		`<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:8px 0 12px;">` +
		`<tr><th style="${TH}">ID</th><th style="${TH}">Criterio</th><th style="${TH}text-align:center;">Peso</th><th style="${TH}">Descripción</th></tr>`;
	for (const c of JUDGE_CRITERIA) {
		html += `<tr>` +
			`<td style="${TDC}"><strong>${c.code}</strong></td>` +
			`<td style="${TD}">${c.label}</td>` +
			`<td style="${TDC}">${c.peso}</td>` +
			`<td style="${TD}color:#555;">${c.desc}</td></tr>`;
	}
	return html + `</table>`;
}

function criteriaLegend(n: number): string {
	return (
		`<p style="font-family:Tahoma,Arial,sans-serif;font-size:10px;color:#555;margin:4px 0 10px;line-height:1.5;">` +
		`Juez <code>gpt-4.1-mini</code> · cada <strong>Cn</strong> es índice único 1…${n} en su columna (1 = peor, ${n} = mejor). ` +
		`<strong>CT</strong> = Σ(C1…C5); entre paréntesis, índice resumen del total. ` +
		`Badges: ${idxBadge(1, n)} peor → ${idxBadge(Math.ceil(n / 2), n)} medio → ${idxBadge(n, n)} mejor.</p>`
	);
}

function globalRankingTable(rows: GlobalRow[], n: number, title: string): string {
	let html =
		`<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:6px 0 12px;">` +
		`<tr><td colspan="13" style="padding:6px 8px;background:#0b3360;color:#fff;font-weight:700;font-size:11px;">${title}</td></tr>` +
		`<tr>` +
		`<th style="${TH}">Rk</th><th style="${TH}">Estrategia</th><th style="${TH}">Detail</th><th style="${TH}">Reason.</th>` +
		`<th style="${TH}text-align:right;">ms</th><th style="${TH}text-align:center;">conv</th>` +
		JUDGE_CRITERIA.map((c) => `<th style="${TH}text-align:center;">${c.code}</th>`).join("") +
		`<th style="${TH}text-align:center;">CT</th></tr>`;
	for (const r of rows) {
		const hl = r.ctRank === n ? "background:#f0f7f4;" : "";
		html += `<tr style="${hl}">` +
			`<td style="${TDC}">${rankBadge(r.rank, n)}</td>` +
			`<td style="${TD}"><code>${r.est}</code></td>` +
			`<td style="${TD}">${r.detail}</td>` +
			`<td style="${TD}">${r.reasoning}</td>` +
			`<td style="${TDN}">${msLabel(r.ms)}</td>` +
			`<td style="${TDC}">${r.conv}</td>` +
			`<td style="${TDC}">${idxBadge(r.c1, n)}</td>` +
			`<td style="${TDC}">${idxBadge(r.c2, n)}</td>` +
			`<td style="${TDC}">${idxBadge(r.c3, n)}</td>` +
			`<td style="${TDC}">${idxBadge(r.c4, n)}</td>` +
			`<td style="${TDC}">${idxBadge(r.c5, n)}</td>` +
			`<td style="${TDC}"><strong>${r.ct}</strong> (${idxBadge(r.ctRank, n)})</td></tr>`;
	}
	return html + `</table>`;
}

function strategyCriteriaTable(est: string, cells: MatrixCell[], n = 9): string {
	const sorted = [...cells].sort((a, b) => a.rank - b.rank);
	let html =
		`<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:6px 0 10px;">` +
		`<tr><td colspan="12" style="padding:5px 8px;background:#1e4a7a;color:#fff;font-weight:600;font-size:10px;">` +
		`Matriz criterios · <code>${est}</code> (rank 1…${n} por estrategia)</td></tr>` +
		`<tr>` +
		`<th style="${TH}">Rk</th><th style="${TH}">Detail</th><th style="${TH}">Reason.</th>` +
		`<th style="${TH}text-align:right;">ms</th><th style="${TH}text-align:center;">conv</th>` +
		JUDGE_CRITERIA.map((c) => `<th style="${TH}text-align:center;">${c.code}</th>`).join("") +
		`<th style="${TH}text-align:center;">CT</th></tr>`;
	for (const c of sorted) {
		const hl = c.ctRank === n ? "background:#f0f7f4;" : "";
		html += `<tr style="${hl}">` +
			`<td style="${TDC}">${rankBadge(c.rank, n)}</td>` +
			`<td style="${TD}">${c.detail}</td>` +
			`<td style="${TD}">${c.reasoning}</td>` +
			`<td style="${TDN}">${msLabel(c.ms)}</td>` +
			`<td style="${TDC}">${c.conv}</td>` +
			`<td style="${TDC}">${idxBadge(c.c1, n)}</td>` +
			`<td style="${TDC}">${idxBadge(c.c2, n)}</td>` +
			`<td style="${TDC}">${idxBadge(c.c3, n)}</td>` +
			`<td style="${TDC}">${idxBadge(c.c4, n)}</td>` +
			`<td style="${TDC}">${idxBadge(c.c5, n)}</td>` +
			`<td style="${TDC}"><strong>${c.ct}</strong> (${idxBadge(c.ctRank, n)})</td></tr>`;
	}
	return html + `</table>`;
}

function matrixHeatmap(est: string, cells: MatrixCell[], highlight?: string): string {
	const byKey = new Map(cells.map((c) => [`${c.detail}/${c.reasoning}`, c]));
	let html =
		`<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:4px 0 10px;">` +
		`<tr><td colspan="4" style="padding:5px 8px;background:#eef2f6;color:#333;font-weight:600;font-size:10px;">` +
		`Mapa rank · <code>${est}</code></td></tr>` +
		`<tr style="background:#f8f9fa;font-size:9px;color:#555;">` +
		`<th style="padding:4px 6px;border:1px solid #c5cdd6;">detail \\ reasoning</th>` +
		REASONINGS.map((r) => `<th style="padding:4px 6px;border:1px solid #c5cdd6;text-align:center;">${r}</th>`).join("") +
		`</tr>`;
	for (const detail of DETAILS) {
		html += `<tr>`;
		html += `<td style="padding:4px 6px;border:1px solid #c5cdd6;font-weight:600;font-size:10px;background:#fafbfc;">${detail}</td>`;
		for (const reasoning of REASONINGS) {
			const c = byKey.get(`${detail}/${reasoning}`);
			if (!c) {
				html += `<td style="padding:5px;border:1px solid #c5cdd6;text-align:center;color:#999;">—</td>`;
				continue;
			}
			const key = `${est}/${detail}/${reasoning}`;
			const ring = highlight === key ? "outline:2px solid #0b3360;" : "";
			html +=
				`<td style="padding:5px;border:1px solid #c5cdd6;text-align:center;${ring}">` +
				`${rankBadge(c.rank)}<br><span style="font-size:8px;color:#666;">CT ${c.ct}</span></td>`;
		}
		html += `</tr>`;
	}
	return html + `</table>`;
}

function latencyByReasoning(est: string, cells: MatrixCell[]): string {
	const byKey = new Map(cells.map((c) => [`${c.detail}/${c.reasoning}`, c]));
	let html = `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:4px 0 8px;font-size:10px;">` +
		`<tr><td colspan="4" style="padding:4px 8px;background:#fafbfc;border:1px solid #dde2e8;font-weight:600;color:#444;">` +
		`Latencia por <code>reasoning_effort</code> · <code>${est}</code></td></tr>`;
	for (const reasoning of REASONINGS) {
		html += `<tr><td colspan="4" style="padding:3px 8px;background:#f4f6f8;font-size:9px;font-weight:600;color:#555;">reasoning <code>${reasoning}</code></td></tr>`;
		html += `<tr style="background:#000;color:#fff;font-size:9px;">` +
			`<th style="${TH}">detail</th><th style="${TH}text-align:right;">ms</th>` +
			`<th style="${TH}text-align:center;">rank</th><th style="${TH}text-align:center;">conv</th></tr>`;
		for (const detail of DETAILS) {
			const c = byKey.get(`${detail}/${reasoning}`);
			if (!c) continue;
			html += `<tr>` +
				`<td style="${TD}"><code>${detail}</code></td>` +
				`<td style="${TDN}">${msLabel(c.ms)}</td>` +
				`<td style="${TDC}">${rankBadge(c.rank)}</td>` +
				`<td style="${TDC}">${c.conv}</td></tr>`;
		}
	}
	return html + `</table>`;
}

function strategyBlock(
	est: string,
	title: string,
	desc: string[],
	cells: MatrixCell[],
	highlight?: string,
): string {
	return [
		sectionTitle(`Estrategia <code>${est}</code> — ${title}`),
		`<p style="font-family:Tahoma,Arial,sans-serif;font-size:10px;color:#666;margin:0 0 8px;line-height:1.45;">${desc.join(" ")}</p>`,
		strategyCriteriaTable(est, cells),
		matrixHeatmap(est, cells, highlight),
		latencyByReasoning(est, cells),
	].join("\n");
}

function strategySummaryTable(): string {
	const rows = [
		["auto", "high / medium", "45 (9)", "16,9 s", "1996", "Default PatyIA; mejor CT con más reasoning."],
		["data_url", "low / high", "45 (9)", "42,1 s", "2000", "Mejor CT global; recomendada."],
		["file_upload", "medium / low", "45 (9)", "14,6 s", "2010", "Mejor relación CT/latencia vía Files API."],
	];
	let html =
		`<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:8px 0 12px;">` +
		`<tr><td colspan="6" style="padding:6px 8px;background:#0b3360;color:#fff;font-weight:700;font-size:11px;">` +
		`Comparación entre estrategias · mejor celda por CT (gpt-5-mini)</td></tr>` +
		`<tr>` +
		`<th style="${TH}">Estrategia</th><th style="${TH}">detail / reasoning</th>` +
		`<th style="${TH}text-align:center;">CT</th><th style="${TH}text-align:right;">ms</th>` +
		`<th style="${TH}text-align:center;">conv</th><th style="${TH}">Nota</th></tr>`;
	for (const r of rows) {
		const hl = r[0] === "data_url" ? "background:#f0f7f4;" : "";
		html += `<tr style="${hl}">` +
			r.map((v, i) => {
				const st = i === 2 || i === 4 ? TDC : i === 3 ? TDN : TD;
				return `<td style="${st}">${i === 0 ? `<code>${v}</code>` : v}</td>`;
			}).join("") +
			`</tr>`;
	}
	return html + `</table>`;
}

// ── Datos gpt-5-mini ─────────────────────────────────────────────────────

const GLOBAL_MINI: GlobalRow[] = [
	{ rank: 1, est: "auto", detail: "low", reasoning: "low", ms: 9034, conv: 1989, c1: 1, c2: 1, c3: 1, c4: 3, c5: 1, ct: 7, ctRank: 2 },
	{ rank: 2, est: "data_url", detail: "medium", reasoning: "low", ms: 10792, conv: 2001, c1: 2, c2: 1, c3: 2, c4: 3, c5: 2, ct: 10, ctRank: 4 },
	{ rank: 3, est: "data_url", detail: "low", reasoning: "low", ms: 11023, conv: 1998, c1: 4, c2: 3, c3: 4, c4: 1, c5: 3, ct: 15, ctRank: 8 },
	{ rank: 4, est: "auto", detail: "medium", reasoning: "low", ms: 11636, conv: 1992, c1: 4, c2: 4, c3: 4, c4: 2, c5: 5, ct: 19, ctRank: 11 },
	{ rank: 5, est: "data_url", detail: "high", reasoning: "low", ms: 11813, conv: 2004, c1: 1, c2: 4, c3: 1, c4: 2, c5: 1, ct: 9, ctRank: 3 },
	{ rank: 6, est: "auto", detail: "high", reasoning: "low", ms: 11857, conv: 1995, c1: 2, c2: 2, c3: 2, c4: 4, c5: 3, ct: 13, ctRank: 6 },
	{ rank: 7, est: "file_upload", detail: "high", reasoning: "low", ms: 12426, conv: 2013, c1: 4, c2: 4, c3: 4, c4: 5, c5: 5, ct: 22, ctRank: 13 },
	{ rank: 8, est: "data_url", detail: "low", reasoning: "medium", ms: 12516, conv: 1999, c1: 8, c2: 8, c3: 8, c4: 8, c5: 8, ct: 40, ctRank: 23 },
	{ rank: 9, est: "auto", detail: "medium", reasoning: "medium", ms: 12608, conv: 1993, c1: 7, c2: 8, c3: 7, c4: 7, c5: 7, ct: 36, ctRank: 21 },
	{ rank: 10, est: "file_upload", detail: "low", reasoning: "low", ms: 12932, conv: 2007, c1: 2, c2: 2, c3: 2, c4: 3, c5: 2, ct: 11, ctRank: 5 },
	{ rank: 11, est: "file_upload", detail: "medium", reasoning: "low", ms: 14593, conv: 2010, c1: 9, c2: 9, c3: 9, c4: 9, c5: 9, ct: 45, ctRank: 25 },
	{ rank: 12, est: "auto", detail: "low", reasoning: "medium", ms: 14754, conv: 1990, c1: 6, c2: 6, c3: 6, c4: 6, c5: 6, ct: 30, ctRank: 16 },
	{ rank: 13, est: "data_url", detail: "medium", reasoning: "medium", ms: 16061, conv: 2002, c1: 3, c2: 2, c3: 3, c4: 4, c5: 5, ct: 17, ctRank: 10 },
	{ rank: 14, est: "file_upload", detail: "low", reasoning: "medium", ms: 16118, conv: 2008, c1: 1, c2: 1, c3: 1, c4: 1, c5: 1, ct: 5, ctRank: 1 },
	{ rank: 15, est: "data_url", detail: "high", reasoning: "medium", ms: 16428, conv: 2005, c1: 6, c2: 6, c3: 6, c4: 6, c5: 6, ct: 30, ctRank: 17 },
	{ rank: 16, est: "auto", detail: "high", reasoning: "medium", ms: 16852, conv: 1996, c1: 9, c2: 9, c3: 9, c4: 9, c5: 9, ct: 45, ctRank: 26 },
	{ rank: 17, est: "file_upload", detail: "high", reasoning: "medium", ms: 17901, conv: 2014, c1: 7, c2: 7, c3: 7, c4: 6, c5: 7, ct: 34, ctRank: 19 },
	{ rank: 18, est: "file_upload", detail: "medium", reasoning: "medium", ms: 22267, conv: 2011, c1: 3, c2: 3, c3: 3, c4: 4, c5: 3, ct: 16, ctRank: 9 },
	{ rank: 19, est: "file_upload", detail: "medium", reasoning: "high", ms: 24771, conv: 2012, c1: 6, c2: 6, c3: 6, c4: 7, c5: 6, ct: 31, ctRank: 18 },
	{ rank: 20, est: "auto", detail: "high", reasoning: "high", ms: 38112, conv: 1997, c1: 3, c2: 3, c3: 3, c4: 1, c5: 4, ct: 14, ctRank: 7 },
	{ rank: 21, est: "auto", detail: "medium", reasoning: "high", ms: 38394, conv: 1994, c1: 5, c2: 5, c3: 5, c4: 5, c5: 2, ct: 22, ctRank: 14 },
	{ rank: 22, est: "file_upload", detail: "low", reasoning: "high", ms: 39167, conv: 2009, c1: 5, c2: 5, c3: 5, c4: 2, c5: 4, ct: 21, ctRank: 12 },
	{ rank: 23, est: "auto", detail: "low", reasoning: "high", ms: 39276, conv: 1991, c1: 8, c2: 7, c3: 8, c4: 8, c5: 8, ct: 39, ctRank: 22 },
	{ rank: 24, est: "data_url", detail: "medium", reasoning: "high", ms: 41241, conv: 2003, c1: 5, c2: 5, c3: 5, c4: 5, c5: 4, ct: 24, ctRank: 15 },
	{ rank: 25, est: "data_url", detail: "low", reasoning: "high", ms: 42063, conv: 2000, c1: 9, c2: 9, c3: 9, c4: 9, c5: 9, ct: 45, ctRank: 27 },
	{ rank: 26, est: "file_upload", detail: "high", reasoning: "high", ms: 43646, conv: 2015, c1: 8, c2: 8, c3: 8, c4: 8, c5: 8, ct: 40, ctRank: 24 },
	{ rank: 27, est: "data_url", detail: "high", reasoning: "high", ms: 56740, conv: 2006, c1: 7, c2: 7, c3: 7, c4: 7, c5: 7, ct: 35, ctRank: 20 },
];

const GLOBAL_NANO: GlobalRow[] = [
	{ rank: 1, est: "data_url", detail: "medium", reasoning: "low", ms: 5085, conv: 2032, c1: 25, c2: 27, c3: 25, c4: 24, c5: 25, ct: 126, ctRank: 25 },
	{ rank: 2, est: "data_url", detail: "high", reasoning: "low", ms: 5622, conv: 2035, c1: 2, c2: 1, c3: 2, c4: 2, c5: 2, ct: 9, ctRank: 1 },
	{ rank: 3, est: "auto", detail: "high", reasoning: "low", ms: 5809, conv: 2026, c1: 17, c2: 16, c3: 17, c4: 17, c5: 17, ct: 84, ctRank: 17 },
	{ rank: 4, est: "data_url", detail: "low", reasoning: "low", ms: 6072, conv: 2029, c1: 9, c2: 8, c3: 9, c4: 9, c5: 7, ct: 42, ctRank: 9 },
	{ rank: 5, est: "auto", detail: "low", reasoning: "low", ms: 6130, conv: 2018, c1: 6, c2: 5, c3: 6, c4: 6, c5: 4, ct: 27, ctRank: 4 },
	{ rank: 6, est: "auto", detail: "medium", reasoning: "low", ms: 7002, conv: 2022, c1: 8, c2: 7, c3: 8, c4: 8, c5: 6, ct: 37, ctRank: 8 },
	{ rank: 7, est: "file_upload", detail: "medium", reasoning: "low", ms: 7340, conv: 2041, c1: 5, c2: 4, c3: 5, c4: 5, c5: 15, ct: 34, ctRank: 7 },
	{ rank: 8, est: "file_upload", detail: "low", reasoning: "low", ms: 8449, conv: 2038, c1: 19, c2: 18, c3: 19, c4: 19, c5: 19, ct: 94, ctRank: 19 },
	{ rank: 9, est: "auto", detail: "high", reasoning: "medium", ms: 9355, conv: 2027, c1: 18, c2: 17, c3: 18, c4: 18, c5: 18, ct: 89, ctRank: 18 },
	{ rank: 10, est: "data_url", detail: "medium", reasoning: "medium", ms: 9413, conv: 2033, c1: 27, c2: 26, c3: 27, c4: 27, c5: 27, ct: 134, ctRank: 27 },
	{ rank: 11, est: "file_upload", detail: "high", reasoning: "low", ms: 9753, conv: 2044, c1: 21, c2: 20, c3: 21, c4: 21, c5: 21, ct: 104, ctRank: 21 },
	{ rank: 12, est: "auto", detail: "medium", reasoning: "medium", ms: 11873, conv: 2023, c1: 1, c2: 21, c3: 1, c4: 1, c5: 1, ct: 25, ctRank: 3 },
	{ rank: 13, est: "data_url", detail: "low", reasoning: "medium", ms: 12616, conv: 2030, c1: 10, c2: 9, c3: 10, c4: 10, c5: 8, ct: 47, ctRank: 10 },
	{ rank: 14, est: "file_upload", detail: "medium", reasoning: "medium", ms: 13272, conv: 2042, c1: 15, c2: 14, c3: 15, c4: 15, c5: 13, ct: 72, ctRank: 15 },
	{ rank: 15, est: "file_upload", detail: "low", reasoning: "medium", ms: 13752, conv: 2039, c1: 13, c2: 12, c3: 13, c4: 13, c5: 11, ct: 62, ctRank: 13 },
	{ rank: 16, est: "file_upload", detail: "high", reasoning: "medium", ms: 13795, conv: 2045, c1: 3, c2: 2, c3: 3, c4: 3, c5: 3, ct: 14, ctRank: 2 },
	{ rank: 17, est: "data_url", detail: "high", reasoning: "medium", ms: 14123, conv: 2036, c1: 12, c2: 11, c3: 12, c4: 12, c5: 10, ct: 57, ctRank: 12 },
	{ rank: 18, est: "auto", detail: "low", reasoning: "medium", ms: 16125, conv: 2019, c1: 7, c2: 6, c3: 7, c4: 7, c5: 5, ct: 32, ctRank: 6 },
	{ rank: 19, est: "auto", detail: "high", reasoning: "high", ms: 19835, conv: 2028, c1: 4, c2: 3, c3: 4, c4: 4, c5: 14, ct: 29, ctRank: 5 },
	{ rank: 20, est: "data_url", detail: "high", reasoning: "high", ms: 22193, conv: 2037, c1: 24, c2: 24, c3: 24, c4: 26, c5: 24, ct: 122, ctRank: 24 },
	{ rank: 21, est: "data_url", detail: "low", reasoning: "high", ms: 22734, conv: 2031, c1: 11, c2: 10, c3: 11, c4: 11, c5: 9, ct: 52, ctRank: 11 },
	{ rank: 22, est: "file_upload", detail: "high", reasoning: "high", ms: 25185, conv: 2046, c1: 23, c2: 23, c3: 23, c4: 23, c5: 23, ct: 115, ctRank: 23 },
	{ rank: 23, est: "file_upload", detail: "medium", reasoning: "high", ms: 27082, conv: 2043, c1: 20, c2: 19, c3: 20, c4: 20, c5: 20, ct: 99, ctRank: 20 },
	{ rank: 24, est: "auto", detail: "low", reasoning: "high", ms: 27533, conv: 2021, c1: 26, c2: 25, c3: 26, c4: 25, c5: 26, ct: 128, ctRank: 26 },
	{ rank: 25, est: "auto", detail: "medium", reasoning: "high", ms: 30779, conv: 2024, c1: 16, c2: 15, c3: 16, c4: 16, c5: 16, ct: 79, ctRank: 16 },
	{ rank: 26, est: "file_upload", detail: "low", reasoning: "high", ms: 31497, conv: 2040, c1: 14, c2: 13, c3: 14, c4: 14, c5: 12, ct: 67, ctRank: 14 },
	{ rank: 27, est: "data_url", detail: "medium", reasoning: "high", ms: 37430, conv: 2034, c1: 22, c2: 22, c3: 22, c4: 22, c5: 22, ct: 110, ctRank: 22 },
];

const AUTO: MatrixCell[] = [
	{ detail: "low", reasoning: "low", rank: 1, ct: 7, ctRank: 1, ms: 9034, conv: 1989, c1: 1, c2: 1, c3: 1, c4: 3, c5: 1 },
	{ detail: "medium", reasoning: "low", rank: 2, ct: 19, ctRank: 4, ms: 11636, conv: 1992, c1: 4, c2: 4, c3: 4, c4: 2, c5: 5 },
	{ detail: "high", reasoning: "low", rank: 3, ct: 13, ctRank: 2, ms: 11857, conv: 1995, c1: 2, c2: 2, c3: 2, c4: 4, c5: 3 },
	{ detail: "medium", reasoning: "medium", rank: 4, ct: 36, ctRank: 7, ms: 12608, conv: 1993, c1: 7, c2: 8, c3: 7, c4: 7, c5: 7 },
	{ detail: "low", reasoning: "medium", rank: 5, ct: 30, ctRank: 6, ms: 14754, conv: 1990, c1: 6, c2: 6, c3: 6, c4: 6, c5: 6 },
	{ detail: "high", reasoning: "medium", rank: 6, ct: 45, ctRank: 9, ms: 16852, conv: 1996, c1: 9, c2: 9, c3: 9, c4: 9, c5: 9 },
	{ detail: "high", reasoning: "high", rank: 7, ct: 14, ctRank: 3, ms: 38112, conv: 1997, c1: 3, c2: 3, c3: 3, c4: 1, c5: 4 },
	{ detail: "medium", reasoning: "high", rank: 8, ct: 22, ctRank: 5, ms: 38394, conv: 1994, c1: 5, c2: 5, c3: 5, c4: 5, c5: 2 },
	{ detail: "low", reasoning: "high", rank: 9, ct: 39, ctRank: 8, ms: 39276, conv: 1991, c1: 8, c2: 7, c3: 8, c4: 8, c5: 8 },
];

const DATA_URL: MatrixCell[] = [
	{ detail: "medium", reasoning: "low", rank: 1, ct: 10, ctRank: 2, ms: 10792, conv: 2001, c1: 2, c2: 1, c3: 2, c4: 3, c5: 2 },
	{ detail: "low", reasoning: "low", rank: 2, ct: 15, ctRank: 3, ms: 11023, conv: 1998, c1: 4, c2: 3, c3: 4, c4: 1, c5: 3 },
	{ detail: "high", reasoning: "low", rank: 3, ct: 9, ctRank: 1, ms: 11813, conv: 2004, c1: 1, c2: 4, c3: 1, c4: 2, c5: 1 },
	{ detail: "low", reasoning: "medium", rank: 4, ct: 40, ctRank: 8, ms: 12516, conv: 1999, c1: 8, c2: 8, c3: 8, c4: 8, c5: 8 },
	{ detail: "medium", reasoning: "medium", rank: 5, ct: 17, ctRank: 4, ms: 16061, conv: 2002, c1: 3, c2: 2, c3: 3, c4: 4, c5: 5 },
	{ detail: "high", reasoning: "medium", rank: 6, ct: 30, ctRank: 6, ms: 16428, conv: 2005, c1: 6, c2: 6, c3: 6, c4: 6, c5: 6 },
	{ detail: "medium", reasoning: "high", rank: 7, ct: 24, ctRank: 5, ms: 41241, conv: 2003, c1: 5, c2: 5, c3: 5, c4: 5, c5: 4 },
	{ detail: "low", reasoning: "high", rank: 8, ct: 45, ctRank: 9, ms: 42063, conv: 2000, c1: 9, c2: 9, c3: 9, c4: 9, c5: 9 },
	{ detail: "high", reasoning: "high", rank: 9, ct: 35, ctRank: 7, ms: 56740, conv: 2006, c1: 7, c2: 7, c3: 7, c4: 7, c5: 7 },
];

const FILE_UPLOAD: MatrixCell[] = [
	{ detail: "high", reasoning: "low", rank: 1, ct: 22, ctRank: 5, ms: 12426, conv: 2013, c1: 4, c2: 4, c3: 4, c4: 5, c5: 5 },
	{ detail: "low", reasoning: "low", rank: 2, ct: 11, ctRank: 2, ms: 12932, conv: 2007, c1: 2, c2: 2, c3: 2, c4: 3, c5: 2 },
	{ detail: "medium", reasoning: "low", rank: 3, ct: 45, ctRank: 9, ms: 14593, conv: 2010, c1: 9, c2: 9, c3: 9, c4: 9, c5: 9 },
	{ detail: "low", reasoning: "medium", rank: 4, ct: 5, ctRank: 1, ms: 16118, conv: 2008, c1: 1, c2: 1, c3: 1, c4: 1, c5: 1 },
	{ detail: "high", reasoning: "medium", rank: 5, ct: 34, ctRank: 7, ms: 17901, conv: 2014, c1: 7, c2: 7, c3: 7, c4: 6, c5: 7 },
	{ detail: "medium", reasoning: "medium", rank: 6, ct: 16, ctRank: 3, ms: 22267, conv: 2011, c1: 3, c2: 3, c3: 3, c4: 4, c5: 3 },
	{ detail: "medium", reasoning: "high", rank: 7, ct: 31, ctRank: 6, ms: 24771, conv: 2012, c1: 6, c2: 6, c3: 6, c4: 7, c5: 6 },
	{ detail: "low", reasoning: "high", rank: 8, ct: 21, ctRank: 4, ms: 39167, conv: 2009, c1: 5, c2: 5, c3: 5, c4: 2, c5: 4 },
	{ detail: "high", reasoning: "high", rank: 9, ct: 40, ctRank: 8, ms: 43646, conv: 2015, c1: 8, c2: 8, c3: 8, c4: 8, c5: 8 },
];

const BEST_KEY = "data_url/low/high";

function visionTokensEstimate(): string {
	const tilesW = Math.ceil(2048 / 512);
	const tilesH = Math.ceil(Math.round(IMG_H * (2048 / IMG_W)) / 512);
	const tiles = tilesW * tilesH;
	const highTok = 85 + 170 * tiles;
	return (
		`<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:10px 0;">` +
		`<tr style="background:#000;color:#fff;font-size:9px;">` +
		`<th style="${TH}">Imagen prueba</th><th style="${TH}">detail API</th><th style="${TH}text-align:right;">Tokens visión</th><th style="${TH}">Nota</th></tr>` +
		`<tr><td rowspan="3" style="${TD}vertical-align:top;">` +
		`<strong>${IMG_W}×${IMG_H} px</strong><br>${(IMG_BYTES / 1_048_576).toFixed(1)} MB</td>` +
		`<td style="${TD}"><code>low</code></td><td style="${TDN}">~85</td><td style="${TD}color:#666;">fijo</td></tr>` +
		`<tr><td style="${TD}"><code>auto</code>/<code>high</code></td><td style="${TDN}">~${highTok.toLocaleString()}</td>` +
		`<td style="${TD}color:#666;">${tilesW}×${tilesH} tiles</td></tr>` +
		`<tr><td style="${TD}"><code>medium</code></td><td style="${TDN}">~${highTok.toLocaleString()}</td>` +
		`<td style="${TD}color:#666;">→ API <code>auto</code></td></tr></table>`
	);
}

/** HTML completo para TK-1433179 / bitácora visión. */
export function getVisionReasoningMatrixHtml(): string {
	const conclusion =
		`<div style="font-family:Tahoma,Arial,sans-serif;font-size:12px;line-height:1.55;color:#1a1a1a;` +
		`padding:10px 12px;margin:0 0 14px;background:#f0f7f4;border-left:4px solid #28a745;border-radius:0 6px 6px 0;">` +
		`<strong style="color:#0b3360;">Conclusión.</strong> Tras 27 corridas con <code>gpt-5-mini</code> y la infografía ` +
		`<code>notebooklm/unnamed.png</code> (${IMG_W}×${IMG_H} px), la mejor celda por índice CT global es ` +
		`<code>data_url</code> + <code>detail: low</code> + <code>reasoning: high</code> ` +
		`(conv 2000, CT 45, C1–C5 = 9, <strong>~42 s</strong>). ` +
		`<code>reasoning: high</code> concentra las mejores respuestas; subir <code>detail</code> a <code>high</code> no mejora CT y aumenta latencia (~57 s). ` +
		`Alternativa rápida: <code>file_upload</code> + <code>medium</code> + <code>low</code> (~15 s, conv 2010, CT 45). ` +
		`El peso en MB afecta la estrategia de envío, no los tokens de visión tras normalizar a 2048 px.</div>`;

	const costBox =
		`<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;">` +
		`<tr><td style="padding:8px 10px;background:#0b3360;color:#fff;font-weight:700;font-size:11px;">Mejor opción · coste</td></tr>` +
		`<tr><td style="padding:10px;border:1px solid #c5cdd6;background:#fafbfc;font-size:11px;">` +
		`<strong>42,1 s</strong> · tokens imagen ~85 (<code>detail: low</code>) · turno completo ~150–250 tok texto + salida/reasoning` +
		`</td></tr></table>`;

	return [
		`<div style="font-family:Tahoma,Arial,sans-serif;font-size:12px;color:#1a1a1a;">`,
		conclusion,
		costBox,
		sectionTitle("Criterios del juez (C1–C5)"),
		criteriaTable(),
		criteriaLegend(27),
		sectionTitle("Ranking global · gpt-5-mini (27 celdas)"),
		globalRankingTable(GLOBAL_MINI, 27, "Todas las estrategias · índices C1…C27 por columna"),
		strategySummaryTable(),
		strategyBlock("auto", "umbral dinámico (default)", [
			"≤~1,5 MB → data URL; si no, Files API.",
			"Con <code>unnamed.png</code> (~5,5 MB) casi siempre <code>file_id</code>.",
		], AUTO),
		strategyBlock("data_url", "siempre inline", [
			"Imagen en JSON como data URL; sin upload.",
		], DATA_URL, BEST_KEY),
		strategyBlock("file_upload", "siempre Files API", [
			"Normaliza, sube y usa <code>file_id</code>; payload liviano.",
		], FILE_UPLOAD),
		sectionTitle("Piloto · gpt-5-nano (27 celdas)"),
		`<p style="font-size:10px;color:#666;margin:0 0 6px;">Misma matriz; 27/27 respondieron. CT global inferior a mini; no sustituye mini en producción.</p>`,
		globalRankingTable(GLOBAL_NANO, 27, "Ranking global nano"),
		sectionTitle("Tokens visión vs <code>vision_detail</code>"),
		visionTokensEstimate(),
		`<p style="font-size:10px;color:#888;margin-top:12px;">Bitácora 2026-06-09 · <code>test-vision-reasoning-matrix.mjs</code></p>`,
		`</div>`,
	].join("\n");
}
