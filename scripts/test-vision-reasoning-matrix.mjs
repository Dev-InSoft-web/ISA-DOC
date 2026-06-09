/**
 * Matriz 3×3 por estrategia: filas = vision_detail, columnas = reasoning_effort.
 * 3 estrategias × 9 celdas = 27 corridas jailbreak (gpt-5-mini + imagen).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ISA_ROOT = path.resolve(__dirname, "..");
const PATYIA_BASE = process.env.PATYIA_BASE || "http://127.0.0.1:7071";
const TOKEN_FILE = path.join(ISA_ROOT, "secrets", "tokens", "token.patyia.json");
const IMG_FILE = path.join(ISA_ROOT, "public", "assets", "imgs", "patyia", "notebooklm", "unnamed.png");
const CONV_LOG_DIR = path.resolve(ISA_ROOT, "..", "PatyIA", "logs", "conversaciones");
const OUT_MD = process.env.OUT_MD || path.join(
	ISA_ROOT,
	"src",
	"lib",
	"features",
	"patyia",
	"060-bitacora",
	"daily",
	"2026-06",
	"09",
	"01-vision-reasoning-estrategias.md",
);
const LAB_OUT_MD = process.env.LAB_OUT_MD || path.join(
	ISA_ROOT,
	"..",
	"lab-langgraph",
	"data",
	"bitacora",
	"patyia",
	"md",
	"2026-06",
	"09",
	"01-vision-reasoning-estrategias.md",
);

function writeBitacoraMd(md) {
	fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
	fs.writeFileSync(OUT_MD, md, "utf8");
	try {
		fs.mkdirSync(path.dirname(LAB_OUT_MD), { recursive: true });
		fs.writeFileSync(LAB_OUT_MD, md, "utf8");
		console.log(`Lab copy: ${LAB_OUT_MD}`);
	} catch (e) {
		console.warn(`⚠ No se copió a lab-langgraph: ${e.message}`);
	}
}

const ITERCERO = process.env.ITERCERO || "810000630";
const ICONTACTO = process.env.ICONTACTO || "702470";
const MODELO = process.env.MODELO || "gpt-5-mini";
const PREGUNTA = "Con base en esa imagen, ¿qué elementos o texto identificas con más claridad?";
const DETAIL_LEVELS = ["low", "medium", "high"];
const REASONING_LEVELS = ["low", "medium", "high"];

/** Misma rúbrica y pesos para todas las celdas (suma = 1.0). IDs C1…C5 en tablas. */
const JUDGE_CRITERIA = [
	{ code: "C1", id: "precision_textual", label: "Precisión textual", peso: 0.30, desc: "Exactitud de títulos, etiquetas y citas vs. lo visible en la infografía." },
	{ code: "C2", id: "cobertura_elementos", label: "Cobertura de elementos", peso: 0.25, desc: "Iconos, secciones, bloques y relaciones visuales mencionados." },
	{ code: "C3", id: "detalle_util", label: "Detalle útil", peso: 0.20, desc: "Profundidad relevante sin relleno ni repetición vacía." },
	{ code: "C4", id: "claridad_orden", label: "Claridad y orden", peso: 0.15, desc: "Estructura legible y jerarquía de lo importante." },
	{ code: "C5", id: "fidelidad", label: "Fidelidad (anti-alucinación)", peso: 0.10, desc: "Sin textos inventados, typos fabricados ni elementos no visibles." },
];

const ESTRATEGIAS = [
	{
		id: "auto",
		title: "auto — umbral dinámico (default PatyIA)",
		apiDetailNote: "Según `vision_detail` en body; envío inline o Files API según tamaño.",
		desc: [
			"Comportamiento **por defecto** en PatyIA tras `normalizeVisionBuffer`.",
			"Si el JPEG normalizado pesa **≤ ~1,5 MB** → `input_image` con **data URL** inline.",
			"Si supera el umbral → sube a OpenAI Files API (`purpose: vision`) y usa **`file_id`**.",
			"En la corrida con `unnamed.png`, casi siempre termina en **file_id** (imagen grande).",
			"Ventaja: equilibrio automático entre payload y límites de visión.",
		],
	},
	{
		id: "data_url",
		title: "data_url — siempre inline",
		apiDetailNote: "Fuerza `image_url` (data URL) aunque pese más del umbral.",
		desc: [
			"**Nunca** sube a Files API: la imagen viaja en el JSON del turno como **data URL**.",
			"Útil para medir latencia/costo sin round-trip de upload.",
			"Riesgo: payloads muy grandes o rechazo por tamaño en el request.",
			"`vision_detail` se aplica en cada `input_image` (`low` / `auto` / `high`).",
		],
	},
	{
		id: "file_upload",
		title: "file_upload — siempre Files API",
		apiDetailNote: "Siempre `file_id` tras upload vision, independiente del tamaño.",
		desc: [
			"**Siempre** normaliza, sube con `openai.files.create({ purpose: \"vision\" })` y referencia **`file_id`**.",
			"Payload del turno más liviano; añade latencia del upload.",
			"Recomendado cuando la imagen supera de forma estable el umbral de inline.",
			"`vision_detail` se aplica igual sobre el `input_image` con `file_id`.",
		],
	},
];

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

function loadToken() {
	const { token } = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8"));
	if (!token?.trim()) throw new Error("Sin token PatyIA");
	return token.trim();
}

function loadImageDataUrl() {
	const buf = fs.readFileSync(IMG_FILE);
	return `data:image/png;base64,${buf.toString("base64")}`;
}

function loadOpenAIKey() {
	if (process.env.OPENAI_API_KEY?.trim()) return process.env.OPENAI_API_KEY.trim();
	try {
		const p = path.join(ISA_ROOT, "..", "PatyIA", "local.settings.json");
		return JSON.parse(fs.readFileSync(p, "utf8"))?.Values?.OPENAI_API_KEY?.trim() || "";
	} catch {
		return "";
	}
}

function apiDetailFor(level) {
	if (level === "low") return "low";
	if (level === "high") return "high";
	return "auto";
}

function assistantTurnDesdeLog(iconversacion) {
	const p = path.join(CONV_LOG_DIR, `conv-${iconversacion}.json`);
	if (!fs.existsSync(p)) return { respuesta: "", latency_ms: null };
	try {
		const log = JSON.parse(fs.readFileSync(p, "utf8"));
		const a = (log.mensajes ?? []).find((m) => m.role === "assistant");
		const latency_ms = Number.isFinite(a?.latency_ms) ? Number(a.latency_ms) : null;
		return { respuesta: String(a?.others?.response_text ?? ""), latency_ms };
	} catch {
		return { respuesta: "", latency_ms: null };
	}
}

function respuestaDesdeLog(iconversacion) {
	return assistantTurnDesdeLog(iconversacion).respuesta;
}

function backfillLatency(cell) {
	if (Number.isFinite(cell?.latency_ms)) return cell;
	if (!cell?.iconversacion) return cell;
	const { latency_ms } = assistantTurnDesdeLog(cell.iconversacion);
	if (Number.isFinite(latency_ms)) cell.latency_ms = latency_ms;
	return cell;
}

function backfillStrategiesLatency(strategies) {
	for (const s of strategies) {
		for (const detail of DETAIL_LEVELS) {
			for (const reasoning of REASONING_LEVELS) {
				backfillLatency(s.matrix[detail][reasoning]);
			}
		}
	}
}

function backfillCellsLatency(cells) {
	for (const c of cells) backfillLatency(c);
}

async function consumirSSE(res) {
	const reader = res.body.getReader();
	const dec = new TextDecoder();
	let buffer = "";
	let convId = 0;
	let respuesta = "";
	let latency_ms = null;
	while (true) {
		const { value, done } = await reader.read();
		if (done) break;
		buffer += dec.decode(value, { stream: true });
		const blocks = buffer.split("\n\n");
		buffer = blocks.pop() ?? "";
		for (const block of blocks) {
			let evento = "";
			let datos = "";
			for (const ln of block.split("\n")) {
				if (ln.startsWith("event:")) evento = ln.slice(6).trim();
				else if (ln.startsWith("data:")) datos += ln.slice(5).trim();
			}
			if (!datos) continue;
			let parsed;
			try { parsed = JSON.parse(datos); } catch { continue; }
			if (evento === "begin" || evento === "message" || evento === "end") {
				const icon = Number(parsed.iconversacion ?? 0);
				if (icon > 0) convId = icon;
				const resp = String(parsed.respuesta ?? "");
				if (resp) respuesta = resp;
				if (evento === "end" && parsed.meta?.latency_ms != null) latency_ms = Number(parsed.meta.latency_ms);
			} else if (evento === "error") {
				throw new Error(String(parsed.error ?? parsed.mensaje ?? "error SSE"));
			}
		}
	}
	if (convId > 0) {
		if (!respuesta) {
			await sleep(800);
		}
		const fromLog = assistantTurnDesdeLog(convId);
		if (!respuesta) respuesta = fromLog.respuesta;
		if (!Number.isFinite(latency_ms) && Number.isFinite(fromLog.latency_ms)) {
			latency_ms = fromLog.latency_ms;
		}
	}
	return { iconversacion: convId, respuesta, latency_ms };
}

async function jailbreakTurn(token, body) {
	const t0 = Date.now();
	const res = await fetch(`${PATYIA_BASE}/api/conversacion/jailbreak`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
		body: JSON.stringify(body),
	});
	if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
	const out = await consumirSSE(res);
	return { ...out, latency_ms: out.latency_ms ?? Date.now() - t0 };
}

function clip(s, n = 220) {
	const t = String(s ?? "").replace(/\s+/g, " ").trim();
	return t.length <= n ? t : `${t.slice(0, n)}…`;
}

function mdEsc(s) {
	return String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

async function notifyResourceUpdated({ id, kind = "bitacora-md", project = "patyia", path }) {
	const base = process.env.ISA_DOC_BASE || "http://127.0.0.1:4400";
	try {
		await fetch(`${base}/api/realtime/resource-updated`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ id, kind, project, path }),
		});
	} catch { /* dev server apagado */ }
}

function judgeRubricText() {
	return JUDGE_CRITERIA.map((c) => `- **${c.code}** · ${c.label} (${Math.round(c.peso * 100)}%): ${c.desc}`).join("\n");
}

function buildCriteriaLegendMd() {
	let md = `## Tabla de criterios del juez\n\n`;
	md += `Cada **Cn** es **índice único 1…N** dentro del grupo de la tabla (1 = peor en ese criterio, N = mejor; sin repetir en la columna). **CT** = Σ(C1…C5); entre paréntesis, índice resumen **1…N** del total (1 = peor suma, N = mejor). **Calif.** = Σ(nota cruda × peso). **Rank** = índice global del test (1 = peor, N = mejor).\n\n`;
	md += `| ID | Criterio | Peso | Descripción |\n|---|---|---:|---|\n`;
	for (const c of JUDGE_CRITERIA) {
		md += `| **${c.code}** | ${c.label} | ${Math.round(c.peso * 100)}% | ${mdEsc(c.desc)} |\n`;
	}
	return md + "\n";
}

function criteriaHeaderCols() {
	return JUDGE_CRITERIA.map((c) => c.code).join(" | ");
}

function cellKey(c) {
	return `${c.estrategia ?? ""}|${c.detail}|${c.reasoning}|${c.iconversacion}`;
}

function compareForCriterion(a, b, code) {
	const na = a.judge?.notas?.[code];
	const nb = b.judge?.notas?.[code];
	if (Number.isFinite(na) && Number.isFinite(nb) && na !== nb) return na - nb;
	if (Number.isFinite(na) && !Number.isFinite(nb)) return -1;
	if (!Number.isFinite(na) && Number.isFinite(nb)) return 1;
	for (const other of JUDGE_CRITERIA) {
		if (other.code === code) continue;
		const oa = a.judge?.notas?.[other.code];
		const ob = b.judge?.notas?.[other.code];
		if (Number.isFinite(oa) && Number.isFinite(ob) && oa !== ob) return oa - ob;
	}
	return (a.iconversacion ?? 0) - (b.iconversacion ?? 0);
}

/** Por cada Cn asigna índice único 1…N (1 = peor nota cruda en ese criterio). */
function buildCriterionIndexMap(cells) {
	const map = new Map();
	const n = cells.length;
	if (!n) return map;
	const hasNotas = cells.some((c) =>
		JUDGE_CRITERIA.some((j) => Number.isFinite(c.judge?.notas?.[j.code])),
	);
	if (!hasNotas) {
		for (const c of cells) {
			if (c.judge?.indices && Object.keys(c.judge.indices).length) {
				map.set(cellKey(c), { ...c.judge.indices });
			}
		}
		return map;
	}

	for (const crit of JUDGE_CRITERIA) {
		const sorted = [...cells].sort((a, b) => compareForCriterion(a, b, crit.code));
		sorted.forEach((c, i) => {
			const key = cellKey(c);
			if (!map.has(key)) map.set(key, {});
			map.get(key)[crit.code] = i + 1;
		});
	}
	return map;
}

function indicesForCell(cell, idxMap) {
	return idxMap.get(cellKey(cell)) ?? cell.judge?.indices ?? {};
}

function criteriaIndexCells(cell, idxMap) {
	const idx = indicesForCell(cell, idxMap);
	return JUDGE_CRITERIA.map((c) => {
		const v = idx[c.code];
		return Number.isFinite(v) ? String(v) : "—";
	}).join(" | ");
}

function sumCriterionIndices(cell, idxMap) {
	const idx = indicesForCell(cell, idxMap);
	const vals = JUDGE_CRITERIA.map((c) => idx[c.code]).filter((v) => Number.isFinite(v));
	return vals.length === JUDGE_CRITERIA.length ? vals.reduce((a, b) => a + b, 0) : null;
}

/** Rank único 1…N por suma CT (1 = menor suma, N = mayor). */
function buildCtRankMap(cells, idxMap) {
	const rankMap = new Map();
	const entries = cells
		.map((c) => ({ cell: c, sum: sumCriterionIndices(c, idxMap) }))
		.filter((e) => Number.isFinite(e.sum));
	const sorted = [...entries].sort((a, b) => {
		if (a.sum !== b.sum) return a.sum - b.sum;
		return compareCellsForRank(a.cell, b.cell);
	});
	sorted.forEach((e, i) => rankMap.set(cellKey(e.cell), i + 1));
	return rankMap;
}

function formatCtCell(cell, idxMap, ctRankMap) {
	const sum = sumCriterionIndices(cell, idxMap);
	const rk = ctRankMap.get(cellKey(cell));
	if (!Number.isFinite(sum) || !Number.isFinite(rk)) return "—";
	return `${sum} (${rk})`;
}

function criteriaTableHeaderSuffix() {
	return `${criteriaHeaderCols()} | CT`;
}

function criteriaTableAlignSuffix() {
	return `${JUDGE_CRITERIA.map(() => "---:").join("|")}|---:|`;
}

function isIndexPermutation1toN(vals, n) {
	const ok = vals.filter((v) => Number.isFinite(v));
	if (ok.length !== n) return false;
	const s = new Set(ok);
	return s.size === n && Math.min(...ok) === 1 && Math.max(...ok) === n;
}

function judgeFromCritColumns(vals, califRaw, { indexed = false } = {}) {
	const score = califRaw === "—" ? null : Number(califRaw);
	if (indexed) {
		const indices = {};
		JUDGE_CRITERIA.forEach((c, i) => {
			indices[c.code] = vals[i] === "—" ? null : Number(vals[i]);
		});
		return { score: Number.isFinite(score) ? score : null, notas: {}, indices };
	}
	const notas = {};
	JUDGE_CRITERIA.forEach((c, i) => {
		notas[c.code] = vals[i] === "—" ? null : Number(vals[i]);
	});
	return {
		score: Number.isFinite(score) ? score : computeWeightedScoreFromNotas(notas),
		notas,
	};
}

function critMatrixIsIndexed(critRows) {
	if (critRows.length !== 9) return false;
	return JUDGE_CRITERIA.every((_, ci) => {
		const col = critRows.map((m) => {
			const v = m[6 + ci];
			return v === "—" ? null : Number(v);
		});
		return isIndexPermutation1toN(col, 9);
	});
}

/** Filas matriz estrategia con o sin columna CT. */
function parseStrategyCritRows(sec) {
	const withCt = [...sec.matchAll(
		/\| \*\*(\d+)\*\* \| (\w+) \| (\w+) \| (\d+|\?) \| (\d+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| \d+ \(\d+\) \| ([\d.—]+) \|/g,
	)];
	if (withCt.length) {
		return withCt.map((m) => ({ ...m, calif: m[12] }));
	}
	const plain = [...sec.matchAll(
		/\| \*\*(\d+)\*\* \| (\w+) \| (\w+) \| (\d+|\?) \| (\d+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \|/g,
	)];
	return plain.map((m) => ({ ...m, calif: m[11] }));
}

function computeWeightedScoreFromNotas(notas) {
	let sum = 0;
	let ok = true;
	for (const c of JUDGE_CRITERIA) {
		const n = Number(notas[c.code]);
		if (!Number.isFinite(n)) { ok = false; break; }
		sum += n * c.peso;
	}
	return ok ? Math.round(sum * 10) / 10 : null;
}

function normalizeJudge(parsed) {
	const notas = {};
	for (const c of JUDGE_CRITERIA) {
		const raw = parsed.notas?.[c.code]
			?? parsed.notas?.[c.id]
			?? parsed.criterios?.[c.code]
			?? parsed.criterios?.[c.id];
		const n = Number(raw);
		notas[c.code] = Number.isFinite(n) ? Math.max(1, Math.min(10, n)) : null;
	}
	const score = computeWeightedScoreFromNotas(notas) ?? Number(parsed.score);
	return { score: Number.isFinite(score) ? score : null, notas };
}

async function calificarCelda({ estrategia, detail, reasoning, respuesta, apiKey }) {
	const notasJson = JUDGE_CRITERIA.map((c) => `"${c.code}": 1-10`).join(", ");
	const sys = [
		"Juez de visión sobre infografía PatyIA (español).",
		"Evalúa SIEMPRE con los mismos criterios C1…C5:",
		judgeRubricText(),
		"Asigna nota entera 1–10 por criterio. Usa TODA la escala: 10 solo si es excepcional en ese criterio; 5–7 si es aceptable con fallos; 1–4 si hay errores graves.",
		"No repitas la misma nota en todos los criterios salvo que la respuesta sea homogénea. Penaliza omisiones, relleno y alucinaciones.",
		"Devuelve SOLO JSON:",
		`{ "notas": { ${notasJson} } }`,
	].join("\n");
	const user = `ESTRATEGIA: ${estrategia}\nDETAIL: ${detail} (API detail=${apiDetailFor(detail)})\nREASONING: ${reasoning}\nPREGUNTA: ${PREGUNTA}\n\nRESPUESTA:\n${respuesta || "(vacía)"}`;
	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
		body: JSON.stringify({
			model: "gpt-4.1-mini",
			messages: [{ role: "system", content: sys }, { role: "user", content: user }],
			response_format: { type: "json_object" },
			max_completion_tokens: 700,
		}),
	});
	if (!res.ok) throw new Error(`Juez HTTP ${res.status}`);
	const j = await res.json();
	let parsed;
	try { parsed = JSON.parse(j.choices?.[0]?.message?.content || "{}"); } catch { parsed = {}; }
	return normalizeJudge(parsed);
}

function compareCellsForRank(a, b) {
	const sa = a.judge?.score ?? 0;
	const sb = b.judge?.score ?? 0;
	if (sa !== sb) return sa - sb;
	for (const c of JUDGE_CRITERIA) {
		const na = a.judge?.notas?.[c.code] ?? 0;
		const nb = b.judge?.notas?.[c.code] ?? 0;
		if (na !== nb) return na - nb;
	}
	return (a.latency_ms ?? 0) - (b.latency_ms ?? 0);
}

/** Rank único 1…N (1 = peor, N = mejor). */
function rankCells(cells, rankKey = "rank") {
	const sorted = [...cells].sort(compareCellsForRank);
	const n = sorted.length;
	return sorted.map((c, i) => ({
		...c,
		[rankKey]: i + 1,
		rankLabel: `${i + 1}/${n} (1=peor)`,
	}));
}

function collectMiniCells(strategies) {
	const out = [];
	for (const s of strategies) {
		for (const detail of DETAIL_LEVELS) {
			for (const reasoning of REASONING_LEVELS) {
				const c = s.matrix[detail][reasoning];
				out.push({ ...c, estrategia: s.est.id });
			}
		}
	}
	return out;
}

function buildGlobalRankingSection(cells, ranked, title, rankKey = "globalRank") {
	const idxMap = buildCriterionIndexMap(cells);
	const ctRankMap = buildCtRankMap(cells, idxMap);
	let md = `### ${title}\n\n`;
	md += `Índice **único** entre todos los tests del bloque (1 = peor → ${cells.length} = mejor). Cada **Cn** es índice único 1…${cells.length} en su columna. **CT** resume los C* (suma + índice 1…${cells.length}).\n\n`;
	md += `| ${rankKey === "globalRank" ? "Rank global" : "Rank"} | Estrategia | Detail | Reasoning | ms | conv | ${criteriaTableHeaderSuffix()} | Calif. |\n`;
	md += `|---:|---|---|---|---:|---:|${criteriaTableAlignSuffix()}---:|\n`;
	for (const c of ranked) {
		const rk = c[rankKey] ?? c.rank;
		md += `| **${rk}** | \`${c.estrategia ?? "?"}\` | ${c.detail} | ${c.reasoning} | ${c.latency_ms ?? "?"} | ${c.iconversacion} | ${criteriaIndexCells(c, idxMap)} | ${formatCtCell(c, idxMap, ctRankMap)} | ${c.judge?.score ?? "—"} |\n`;
	}
	return md + "\n";
}

function buildStrategySection(est, matrix, ranked) {
	let md = `## Estrategia: \`${est.id}\` — ${est.title}\n\n`;
	md += `**Qué hace:**\n\n`;
	for (const line of est.desc) md += `- ${line}\n`;
	md += `\n**Parámetros body:** \`vision_strategy: "${est.id}"\`, \`vision_detail: low|medium|high\`, \`reasoning_effort: low|medium|high\`.\n\n`;
	md += `**Mapeo detail → API:** \`low→low\`, \`medium→auto\`, \`high→high\` (${est.apiDetailNote}).\n\n`;

	md += `### Tablas por reasoning (\`reasoning_effort\`)\n\n`;
	md += `Cada tabla agrupa las filas por **detail level** con \`reasoning_effort\` fijo.\n\n`;

	for (const reasoning of REASONING_LEVELS) {
		md += `#### Reasoning **${reasoning}**\n\n`;
		md += `| Detail level | API \`detail\` | Respuesta (extracto) | ms | Calif. | Rank | conv |\n`;
		md += `|---|---|---|---:|---:|---:|---:|\n`;
		for (const detail of DETAIL_LEVELS) {
			const c = matrix[detail][reasoning];
			md += `| **${detail}** | ${apiDetailFor(detail)} | ${mdEsc(clip(c.respuesta, 160))} | ${c.latency_ms ?? "?"} | ${c.judge?.score ?? "—"} | ${c.rank ?? "—"} | ${c.iconversacion} |\n`;
		}
		md += "\n";
	}

	const idxMap = buildCriterionIndexMap(ranked);
	const ctRankMap = buildCtRankMap(ranked, idxMap);
	md += `\n### Matriz de criterios — dominio estrategia (rank 1…9, único)\n\n`;
	md += `Cada columna **C1…C5** usa índices **1…9** sin repetir (1 = peor en ese criterio dentro de la estrategia). **CT** = Σ(C1…C5) e índice resumen **(1…9)**.\n\n`;
	md += `| Rank | Detail | Reasoning | ms | conv | ${criteriaTableHeaderSuffix()} | Calif. |\n`;
	md += `|---:|---|---|---:|---:|${criteriaTableAlignSuffix()}---:|\n`;
	for (const c of ranked) {
		md += `| **${c.rank}** | ${c.detail} | ${c.reasoning} | ${c.latency_ms ?? "?"} | ${c.iconversacion} | ${criteriaIndexCells(c, idxMap)} | ${formatCtCell(c, idxMap, ctRankMap)} | ${c.judge?.score ?? "—"} |\n`;
	}

	md += `\n### Detalle textual por celda\n\n`;
	for (const detail of DETAIL_LEVELS) {
		for (const reasoning of REASONING_LEVELS) {
			const c = matrix[detail][reasoning];
			md += `#### detail=\`${detail}\` · reasoning=\`${reasoning}\` · rank **${c.rank}** · conv \`${c.iconversacion}\`\n\n`;
			md += `${c.respuesta || "(sin respuesta)"}\n\n`;
		}
	}
	return md;
}

function buildNanoPilotSection(cells, ranked, ts, judgeTs) {
	let md = `# gpt-5-nano — piloto (matriz única)\n\n`;
	md += `**Fecha corrida:** ${ts}\n\n`;
	md += `**Modelo:** \`gpt-5-nano\` · **Imagen:** \`notebooklm/unnamed.png\`\n\n`;
	md += `**Objetivo:** validar si conviene repetir la batería completa con nano (sin reemplazar resultados de mini).\n\n`;
	if (judgeTs) md += `**Fecha evaluación juez:** ${judgeTs}\n\n`;
	md += `**Total corridas:** ${cells.length}\n\n`;
	md += buildGlobalRankingSection(cells, ranked, "Ranking global nano (matriz única, 1…27)");
	md += `\n### Resumen piloto nano\n\n`;
	const pass = ranked.filter((c) => (c.judge?.score ?? 0) >= 8).length;
	const visionOk = ranked.filter((c) => c.respuesta?.trim() && !c.respuesta.startsWith("ERROR")).length;
	md += `- Celdas con visión respondida: **${visionOk}/${cells.length}**\n`;
	md += `- Celdas con Calif. ≥ 8: **${pass}/${cells.length}**\n`;
	const best = ranked[ranked.length - 1];
	const worst = ranked[0];
	md += `- Mejor: rank **${best?.rank}** (${best?.estrategia} ${best?.detail}/${best?.reasoning}, Calif. ${best?.judge?.score})\n`;
	md += `- Peor: rank **${worst?.rank}** (${worst?.estrategia} ${worst?.detail}/${worst?.reasoning}, Calif. ${worst?.judge?.score})\n\n`;
	return md;
}

function buildMarkdown({ mini, nano = null }) {
	const { strategies, ts, judgeTs = null, modelo = "gpt-5-mini" } = mini;
	let md = `# PatyIA · Matrices visión × detail × reasoning\n\n`;
	md += `**Bitácora:** 2026-06-09 · \`checkKey\`: \`2026-06-09.patyia.vision-reasoning-matrix\`\n\n`;
	md += buildCriteriaLegendMd();
	md += `---\n\n`;
	md += `# gpt-5-mini\n\n`;
	md += `**Fecha corrida:** ${ts}\n\n`;
	md += `**Modelo:** \`${modelo}\` · **Imagen:** \`notebooklm/unnamed.png\`\n\n`;
	md += `**Pregunta:** ${PREGUNTA}\n\n`;
	md += `**Dimensiones:** estrategia × detail × reasoning (3×3 por estrategia).\n\n`;
	if (judgeTs) md += `**Fecha evaluación juez:** ${judgeTs}\n\n`;
	const allMini = collectMiniCells(strategies);
	const globalRanked = rankCells(allMini, "globalRank");
	md += `**Total corridas:** ${allMini.length}\n\n`;
	md += buildGlobalRankingSection(allMini, globalRanked, "Ranking global mini (todos los tests)");
	md += `---\n\n`;

	for (const s of strategies) {
		md += buildStrategySection(s.est, s.matrix, s.ranked);
		md += `---\n\n`;
	}

	if (nano) {
		md += buildNanoPilotSection(nano.cells, nano.ranked, nano.ts, nano.judgeTs);
		md += `---\n\n`;
	}

	md += `## Reproducir\n\n`;
	md += `\`\`\`powershell\nSet-Location "${ISA_ROOT.replace(/\\/g, "/")}"\n`;
	md += `# Mini (27 corridas)\nnode scripts/test-vision-reasoning-matrix.mjs\n\n`;
	md += `# Solo rejudge C1…C5 sobre mini existente\nnode scripts/test-vision-reasoning-matrix.mjs --rejudge\n\n`;
	md += `# Piloto nano (27 corridas, conserva mini)\nnode scripts/test-vision-reasoning-matrix.mjs --nano\n\`\`\`\n\n`;
	md += `Requisito: PatyIA en \`:7071\` con \`vision_detail\`.\n`;
	return md;
}

function miniSectionFromMd(raw) {
	const idx = raw.search(/^# gpt-5-mini\b/m);
	if (idx >= 0) {
		const rest = raw.slice(idx);
		const nanoIdx = rest.search(/^# gpt-5-nano\b/m);
		return nanoIdx >= 0 ? rest.slice(0, nanoIdx) : rest;
	}
	return raw;
}

/** Carga celdas mini desde bitácora (respuestas + metadatos de corrida). */
function loadStrategiesFromMd(mdPath) {
	const raw = fs.readFileSync(mdPath, "utf8");
	const miniRaw = miniSectionFromMd(raw);
	const tsMatch = miniRaw.match(/\*\*Fecha corrida:\*\* (.+)/);
	const ts = tsMatch?.[1]?.trim() || new Date().toISOString();
	const strategies = [];

	for (const est of ESTRATEGIAS) {
		const secRe = new RegExp(`## Estrategia: \\\`${est.id}\\\`[\\s\\S]*?(?=\\n---\\n|$)`);
		const sec = miniRaw.match(secRe)?.[0];
		if (!sec) throw new Error(`No sección para ${est.id}`);

		const matrix = {};
		for (const detail of DETAIL_LEVELS) matrix[detail] = {};

		const rankByKey = new Map();
		const critRows = parseStrategyCritRows(sec);
		const indexed = critMatrixIsIndexed(critRows);
		for (const m of critRows) {
			const vals = JUDGE_CRITERIA.map((_, i) => m[6 + i]);
			const judge = judgeFromCritColumns(vals, m.calif, { indexed });
			rankByKey.set(`${m[2]}/${m[3]}`, {
				rank: Number(m[1]),
				score: judge.score,
				latency_ms: m[4] === "?" ? null : Number(m[4]),
				iconversacion: Number(m[5]),
				judge,
			});
		}

		for (const reasoning of REASONING_LEVELS) {
			const blockRe = new RegExp(`#### Reasoning \\*\\*${reasoning}\\*\\*[\\s\\S]*?(?=\\n#### Reasoning|\\n### Matriz|$)`);
			const block = sec.match(blockRe)?.[0] ?? "";
			for (const detail of DETAIL_LEVELS) {
				const rowRe = new RegExp(
					`\\| \\*\\*${detail}\\*\\* \\| [^|]+ \\| [^|]+ \\| (\\d+|\\?) \\| [^|]+ \\| (\\d+) \\| (\\d+) \\|`,
				);
				const row = block.match(rowRe);
				const key = `${detail}/${reasoning}`;
				const prev = rankByKey.get(key) ?? {};
				if (row) {
					prev.latency_ms = row[1] === "?" ? null : Number(row[1]);
					prev.rank = prev.rank ?? Number(row[2]);
					prev.iconversacion = prev.iconversacion ?? Number(row[3]);
				}
				rankByKey.set(key, prev);
			}
		}

		for (const detail of DETAIL_LEVELS) {
			for (const reasoning of REASONING_LEVELS) {
				const headRe = new RegExp(
					`#### detail=\\\`${detail}\\\` · reasoning=\\\`${reasoning}\\\` · rank \\*\\*(\\d+)\\*\\* · conv \\\`(\\d+)\\\`\\n\\n([\\s\\S]*?)(?=\\n#### |\\n### |$)`,
				);
				const head = sec.match(headRe);
				const meta = rankByKey.get(`${detail}/${reasoning}`) ?? {};
				matrix[detail][reasoning] = {
					detail,
					reasoning,
					iconversacion: head ? Number(head[2]) : meta.iconversacion ?? 0,
					respuesta: head ? head[3].trim() : respuestaDesdeLog(meta.iconversacion ?? 0),
					latency_ms: meta.latency_ms ?? null,
					judge: meta.judge ?? null,
					rank: head ? Number(head[1]) : meta.rank,
				};
			}
		}
		strategies.push({ est, matrix, ranked: [] });
	}

	backfillStrategiesLatency(strategies);
	return { strategies, ts };
}

/** Reconstruye piloto nano desde logs PatyIA (orden: estrategia × detail × reasoning). */
function rebuildNanoFromConvLogs(convIds = null) {
	const ids = convIds ?? [];
	if (!ids.length) {
		for (let i = 2018; i <= 2100; i++) {
			const p = path.join(CONV_LOG_DIR, `conv-${i}.json`);
			if (!fs.existsSync(p)) continue;
			try {
				const j = JSON.parse(fs.readFileSync(p, "utf8"));
				if (String(j.resumen?.ultimoModelo ?? "").includes("gpt-5-nano")) ids.push(i);
			} catch { /* skip */ }
		}
		ids.sort((a, b) => a - b);
	}
	if (ids.length !== ESTRATEGIAS.length * DETAIL_LEVELS.length * REASONING_LEVELS.length) {
		console.warn(`⚠ nano: ${ids.length} convs (esperadas 27); se mapean en orden de corrida.`);
	}
	const cells = [];
	let idx = 0;
	let ts = null;
	for (const est of ESTRATEGIAS) {
		for (const detail of DETAIL_LEVELS) {
			for (const reasoning of REASONING_LEVELS) {
				const iconversacion = ids[idx++] ?? 0;
				let respuesta = "";
				let latency_ms = null;
				let createdAt = null;
				if (iconversacion > 0) {
					try {
						const j = JSON.parse(fs.readFileSync(path.join(CONV_LOG_DIR, `conv-${iconversacion}.json`), "utf8"));
						createdAt = j.createdAt ?? null;
					} catch { /* vacío */ }
					const fromLog = assistantTurnDesdeLog(iconversacion);
					respuesta = fromLog.respuesta;
					latency_ms = fromLog.latency_ms;
				}
				if (!ts && createdAt) ts = createdAt;
				cells.push({
					estrategia: est.id,
					detail,
					reasoning,
					iconversacion,
					respuesta,
					latency_ms,
					judge: { score: null, notas: {} },
				});
			}
		}
	}
	backfillCellsLatency(cells);
	return {
		cells,
		ranked: rankCells(cells),
		ts: ts || new Date().toISOString(),
		judgeTs: null,
	};
}

function loadNanoFromMd(raw) {
	const idx = raw.search(/^# gpt-5-nano\b/m);
	if (idx < 0) return null;
	const sec = raw.slice(idx);
	const tsMatch = sec.match(/\*\*Fecha corrida:\*\* (.+)/);
	const judgeTsMatch = sec.match(/\*\*Fecha evaluación juez:\*\* (.+)/);
	const rowsWithCt = [...sec.matchAll(
		/\| \*\*(\d+)\*\* \| `(\w+)` \| (\w+) \| (\w+) \| (\d+|\?) \| (\d+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| \d+ \(\d+\) \| ([\d.—]+) \|/g,
	)];
	const rowsPlain = [...sec.matchAll(
		/\| \*\*(\d+)\*\* \| `(\w+)` \| (\w+) \| (\w+) \| (\d+|\?) \| (\d+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \| ([\d.—]+) \|/g,
	)];
	const rows = rowsWithCt.length
		? rowsWithCt.map((m) => ({ m, calif: m[13], cOff: 7 }))
		: rowsPlain.map((m) => ({ m, calif: m[12], cOff: 7 }));
	if (!rows.length) return null;
	const indexed = rows.length === 27 && JUDGE_CRITERIA.every((_, ci) => {
		const col = rows.map((r) => {
			const v = r.m[r.cOff + ci];
			return v === "—" ? null : Number(v);
		});
		return isIndexPermutation1toN(col, 27);
	});
	const cells = rows.map(({ m, calif, cOff }) => {
		const vals = JUDGE_CRITERIA.map((_, i) => m[cOff + i]);
		const judge = judgeFromCritColumns(vals, calif, { indexed });
		return {
			estrategia: m[2],
			detail: m[3],
			reasoning: m[4],
			latency_ms: m[5] === "?" ? null : Number(m[5]),
			iconversacion: Number(m[6]),
			respuesta: respuestaDesdeLog(Number(m[6])),
			rank: Number(m[1]),
			judge,
		};
	});
	backfillCellsLatency(cells);
	return {
		cells,
		ranked: rankCells(cells),
		ts: tsMatch?.[1]?.trim() || new Date().toISOString(),
		judgeTs: judgeTsMatch?.[1]?.trim() || null,
	};
}

function finalizeStrategyRanks(strategies) {
	for (const s of strategies) {
		const flat = [];
		for (const detail of DETAIL_LEVELS) {
			for (const reasoning of REASONING_LEVELS) flat.push(s.matrix[detail][reasoning]);
		}
		const ranked = rankCells(flat);
		for (const c of ranked) {
			s.matrix[c.detail][c.reasoning].rank = c.rank;
			s.matrix[c.detail][c.reasoning].rankLabel = c.rankLabel;
		}
		s.ranked = ranked;
	}
	return strategies;
}

/** Rearma el MD desde bitácora existente (sin re-correr jailbreak ni juez). */
function reformatFromExistingMd(mdPath) {
	const raw = fs.readFileSync(mdPath, "utf8");
	const { strategies, ts } = loadStrategiesFromMd(mdPath);
	backfillStrategiesLatency(strategies);
	finalizeStrategyRanks(strategies);
	let nano = loadNanoFromMd(raw);
	if (!nano?.cells?.length) nano = rebuildNanoFromConvLogs();
	else backfillCellsLatency(nano.cells);
	const miniJudgeTs = raw.match(/^# gpt-5-mini[\s\S]*?\*\*Fecha evaluación juez:\*\* (.+)/m)?.[1]?.trim() || null;
	const nanoJudgeTs = raw.match(/^# gpt-5-nano[\s\S]*?\*\*Fecha evaluación juez:\*\* (.+)/m)?.[1]?.trim() || nano?.judgeTs || null;
	if (nano?.cells?.length) {
		nano.ranked = rankCells(nano.cells);
		nano.judgeTs = nanoJudgeTs;
	}
	return buildMarkdown({
		mini: { strategies, ts, judgeTs: miniJudgeTs, modelo: "gpt-5-mini" },
		nano: nano?.cells?.length ? nano : null,
	});
}

async function rejudgeFromExistingMd(mdPath, apiKey, { nanoOnly = false } = {}) {
	const raw = fs.readFileSync(mdPath, "utf8");
	let nano = loadNanoFromMd(raw);
	if (!nano?.cells?.length) {
		nano = rebuildNanoFromConvLogs();
		if (nano.cells.some((c) => c.iconversacion > 0)) {
			console.log(`Nano restaurado desde logs (${nano.cells.filter((c) => c.iconversacion).length} convs).`);
		} else {
			nano = null;
		}
	}
	const { strategies, ts } = nanoOnly ? { strategies: [], ts: null } : loadStrategiesFromMd(mdPath);
	console.log("=== Re-evaluación juez (notas C1…C5) ===");

	if (!nanoOnly) for (const s of strategies) {
		console.log(`\n## mini · ${s.est.id}`);
		for (const detail of DETAIL_LEVELS) {
			for (const reasoning of REASONING_LEVELS) {
				const c = s.matrix[detail][reasoning];
				process.stdout.write(`  ${detail}/${reasoning}… `);
				try {
					c.judge = await calificarCelda({
						estrategia: s.est.id,
						detail,
						reasoning,
						respuesta: c.respuesta,
						apiKey,
					});
					console.log(`score=${c.judge.score}`);
				} catch (e) {
					c.judge = { score: null, notas: {} };
					console.log(`ERR ${e.message}`);
				}
				await sleep(400);
			}
		}
	}

	if (nano?.cells?.length) {
		console.log("\n## nano · piloto");
		for (const c of nano.cells) {
			process.stdout.write(`  ${c.estrategia} ${c.detail}/${c.reasoning}… `);
			try {
				c.judge = await calificarCelda({
					estrategia: c.estrategia,
					detail: c.detail,
					reasoning: c.reasoning,
					respuesta: c.respuesta,
					apiKey,
				});
				console.log(`score=${c.judge.score}`);
			} catch (e) {
				c.judge = { score: null, notas: {} };
				console.log(`ERR ${e.message}`);
			}
			await sleep(400);
		}
		nano.ranked = rankCells(nano.cells);
	}

	if (!nanoOnly) {
		backfillStrategiesLatency(strategies);
		finalizeStrategyRanks(strategies);
	}
	if (nano?.cells?.length) backfillCellsLatency(nano.cells);
	const judgeTs = new Date().toISOString();
	if (nanoOnly) {
		const miniBundle = loadStrategiesFromMd(mdPath);
		finalizeStrategyRanks(miniBundle.strategies);
		const miniJudgeTs = raw.match(/^# gpt-5-mini[\s\S]*?\*\*Fecha evaluación juez:\*\* (.+)/m)?.[1]?.trim() || null;
		return buildMarkdown({
			mini: { strategies: miniBundle.strategies, ts: miniBundle.ts, judgeTs: miniJudgeTs, modelo: "gpt-5-mini" },
			nano: { ...nano, judgeTs },
		});
	}
	return buildMarkdown({
		mini: { strategies, ts, judgeTs, modelo: "gpt-5-mini" },
		nano,
	});
}

async function runNanoPilot(token, img, apiKey, miniBundle) {
	const cells = [];
	console.log("\n=== Piloto gpt-5-nano (27 celdas, matriz única) ===");

	for (const est of ESTRATEGIAS) {
		console.log(`\n## ${est.id}`);
		for (const detail of DETAIL_LEVELS) {
			for (const reasoning of REASONING_LEVELS) {
				const label = `${detail}/${reasoning}`;
				process.stdout.write(`  ${label}… `);
				const body = {
					itercero: ITERCERO,
					icontacto: ICONTACTO,
					imodulo: "isa-doc",
					titulo: `QA nano ${est.id} ${detail} ${reasoning}`,
					prompt: PREGUNTA,
					imagenes: [img],
					prompt_html: `<p>${PREGUNTA}</p>`,
					modelo: "gpt-5-nano",
					vision_strategy: est.id,
					vision_detail: detail,
					reasoning_effort: reasoning,
				};
				try {
					const run = await jailbreakTurn(token, body);
					if (!run.respuesta?.trim()) run.respuesta = respuestaDesdeLog(run.iconversacion);
					let judge = { score: null, notas: {} };
					if (apiKey && run.respuesta?.trim()) {
						try {
							judge = await calificarCelda({
								estrategia: est.id, detail, reasoning, respuesta: run.respuesta, apiKey,
							});
						} catch (e) { judge = { score: null, notas: {} }; }
					}
					const cell = { estrategia: est.id, detail, reasoning, ...run, judge };
					cells.push(cell);
					console.log(`conv=${run.iconversacion} ${run.latency_ms}ms score=${judge.score}`);
				} catch (err) {
					cells.push({
						estrategia: est.id, detail, reasoning,
						iconversacion: 0, respuesta: `ERROR: ${err.message}`, latency_ms: null,
						judge: { score: 0, notas: {} },
					});
					console.log(`ERR ${err.message}`);
				}
				await sleep(1200);
			}
		}
	}

	const ranked = rankCells(cells);
	const ts = new Date().toISOString();
	return { cells, ranked, ts, judgeTs: apiKey ? ts : null };
}

async function main() {
	if (process.argv.includes("--reformat") || process.env.REFORMAT_MD === "1") {
		const src = process.argv[process.argv.indexOf("--reformat") + 1] || OUT_MD;
		console.log(`=== Reformat MD (3 tablas por reasoning) desde ${src} ===`);
		const md = reformatFromExistingMd(src);
		writeBitacoraMd(md);
		await notifyResourceUpdated({
			id: "md.2026-06-09.vision-reasoning",
			path: OUT_MD,
		});
		console.log(`Bitácora: ${OUT_MD}`);
		return;
	}

	if (process.argv.includes("--rejudge-nano")) {
		const src = process.argv[process.argv.indexOf("--rejudge-nano") + 1] || OUT_MD;
		const apiKey = loadOpenAIKey();
		if (!apiKey) throw new Error("Sin OPENAI_API_KEY para juez");
		console.log(`=== Rejudge nano desde ${src} ===`);
		const md = await rejudgeFromExistingMd(src, apiKey, { nanoOnly: true });
		writeBitacoraMd(md);
		await notifyResourceUpdated({ id: "md.2026-06-09.vision-reasoning", path: OUT_MD });
		console.log(`Bitácora: ${OUT_MD}`);
		return;
	}

	if (process.argv.includes("--rejudge") || process.env.REJUDGE_MD === "1") {
		const src = process.argv[process.argv.indexOf("--rejudge") + 1] || OUT_MD;
		const apiKey = loadOpenAIKey();
		if (!apiKey) throw new Error("Sin OPENAI_API_KEY para juez");
		console.log(`=== Rejudge C1…C5 desde ${src} ===`);
		const md = await rejudgeFromExistingMd(src, apiKey);
		writeBitacoraMd(md);
		await notifyResourceUpdated({
			id: "md.2026-06-09.vision-reasoning",
			path: OUT_MD,
		});
		console.log(`Bitácora: ${OUT_MD}`);
		return;
	}

	if (process.argv.includes("--nano") || process.env.RUN_NANO === "1") {
		const src = process.argv.includes("--nano")
			? (process.argv[process.argv.indexOf("--nano") + 1] || OUT_MD)
			: OUT_MD;
		const token = loadToken();
		const img = loadImageDataUrl();
		const apiKey = loadOpenAIKey();
		const miniBundle = fs.existsSync(src) ? loadStrategiesFromMd(src) : null;
		if (!miniBundle) throw new Error(`Sin sección mini en ${src}; corre mini primero.`);
		finalizeStrategyRanks(miniBundle.strategies);
		const nano = await runNanoPilot(token, img, apiKey, miniBundle);
		const md = buildMarkdown({
			mini: { strategies: miniBundle.strategies, ts: miniBundle.ts, modelo: "gpt-5-mini" },
			nano: { cells: nano.cells, ranked: nano.ranked, ts: nano.ts, judgeTs: nano.judgeTs },
		});
		writeBitacoraMd(md);
		await notifyResourceUpdated({ id: "md.2026-06-09.vision-reasoning", path: OUT_MD });
		console.log(`\nBitácora: ${OUT_MD}`);
		return;
	}

	console.log("=== Matrices 3×3 por estrategia (detail × reasoning) ===");
	const token = loadToken();
	const img = loadImageDataUrl();
	const apiKey = loadOpenAIKey();
	const strategies = [];

	for (const est of ESTRATEGIAS) {
		console.log(`\n## ${est.id}`);
		const matrix = {};
		const flat = [];

		for (const detail of DETAIL_LEVELS) {
			matrix[detail] = {};
			for (const reasoning of REASONING_LEVELS) {
				const label = `${detail}/${reasoning}`;
				process.stdout.write(`  ${label}… `);
				const body = {
					itercero: ITERCERO,
					icontacto: ICONTACTO,
					imodulo: "isa-doc",
					titulo: `QA ${est.id} ${detail} ${reasoning}`,
					prompt: PREGUNTA,
					imagenes: [img],
					prompt_html: `<p>${PREGUNTA}</p>`,
					modelo: MODELO,
					vision_strategy: est.id,
					vision_detail: detail,
					reasoning_effort: reasoning,
				};
				try {
					const run = await jailbreakTurn(token, body);
					if (!run.respuesta?.trim()) run.respuesta = respuestaDesdeLog(run.iconversacion);
					let judge = { score: null, notas: {} };
					if (apiKey && run.respuesta?.trim()) {
						try { judge = await calificarCelda({ estrategia: est.id, detail, reasoning, respuesta: run.respuesta, apiKey }); }
						catch (e) { judge = { score: null, notas: {} }; }
					}
					const cell = { detail, reasoning, ...run, judge };
					matrix[detail][reasoning] = cell;
					flat.push(cell);
					console.log(`conv=${run.iconversacion} ${run.latency_ms}ms score=${judge.score}`);
				} catch (err) {
					const cell = { detail, reasoning, iconversacion: 0, respuesta: `ERROR: ${err.message}`, latency_ms: null, judge: { score: 0, notas: {} } };
					matrix[detail][reasoning] = cell;
					flat.push(cell);
					console.log(`ERR ${err.message}`);
				}
				await sleep(1200);
			}
		}

		const ranked = rankCells(flat);
		for (const c of ranked) {
			matrix[c.detail][c.reasoning].rank = c.rank;
			matrix[c.detail][c.reasoning].rankLabel = c.rankLabel;
		}
		strategies.push({ est, matrix, ranked });
	}

	const ts = new Date().toISOString();
	const md = buildMarkdown({
		mini: { strategies, ts, judgeTs: apiKey ? ts : null, modelo: MODELO },
	});
	writeBitacoraMd(md);
	await notifyResourceUpdated({
		id: "md.2026-06-09.vision-reasoning",
		path: OUT_MD,
	});
	console.log(`\nBitácora: ${OUT_MD}`);
}

main().catch((err) => {
	console.error("⛔", err.message ?? err);
	process.exit(1);
});
