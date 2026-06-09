/**
 * Matriz: estrategia visión × reasoning_effort (low/medium/high)
 * Pregunta fija con imagen adjunta (jailbreak, gpt-5-mini).
 *
 * Uso (tras reiniciar PatyIA con cambios reasoning/vision_strategy):
 *   Set-Location ISA-DOC
 *   node scripts/test-vision-reasoning-matrix.mjs
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

const ITERCERO = process.env.ITERCERO || "810000630";
const ICONTACTO = process.env.ICONTACTO || "702470";
const MODELO = process.env.MODELO || "gpt-5-mini";
const PREGUNTA = "Con base en esa imagen, ¿qué elementos o texto identificas con más claridad?";
const ESTRATEGIAS = [
	{ id: "auto", label: "auto (umbral 1.5 MB → file_id si aplica)" },
	{ id: "data_url", label: "data_url (inline tras normalizar)" },
	{ id: "file_upload", label: "file_upload (Files API vision)" },
];
const REASONING_LEVELS = ["low", "medium", "high"];

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
		const j = JSON.parse(fs.readFileSync(p, "utf8"));
		return j?.Values?.OPENAI_API_KEY?.trim() || "";
	} catch {
		return "";
	}
}

function respuestaDesdeLog(iconversacion) {
	const p = path.join(CONV_LOG_DIR, `conv-${iconversacion}.json`);
	if (!fs.existsSync(p)) return "";
	try {
		const log = JSON.parse(fs.readFileSync(p, "utf8"));
		const a = (log.mensajes ?? []).find((m) => m.role === "assistant");
		return String(a?.others?.response_text ?? "");
	} catch {
		return "";
	}
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
				const meta = parsed.meta;
				if (evento === "end" && meta?.latency_ms != null) latency_ms = Number(meta.latency_ms);
			} else if (evento === "error") {
				throw new Error(String(parsed.error ?? parsed.mensaje ?? "error SSE"));
			}
		}
	}
	if (!respuesta && convId > 0) {
		await sleep(800);
		respuesta = respuestaDesdeLog(convId);
	}
	return { iconversacion: convId, respuesta, latency_ms };
}

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
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

function clip(s, n = 280) {
	const t = String(s ?? "").replace(/\s+/g, " ").trim();
	return t.length <= n ? t : `${t.slice(0, n)}…`;
}

function mdEscapeCell(s) {
	return String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

async function calificarEstrategia({ estrategia, runs, apiKey }) {
	const bloques = REASONING_LEVELS.map((lvl) => `### ${lvl}\n${runs[lvl].respuesta || "(vacío)"}`).join("\n\n");
	const sys = "Eres evaluador de respuestas de visión sobre una infografía PatyIA. Comparas tres niveles de reasoning (low, medium, high) para la MISMA estrategia de envío de imagen. Devuelve SOLO JSON: { scores: { low: 1-10, medium: 1-10, high: 1-10 }, winner: \"low\"|\"medium\"|\"high\"|\"tie\", reason: \"≤200 chars español\" }.";
	const user = `ESTRATEGIA: ${estrategia}\nPREGUNTA: ${PREGUNTA}\n\n${bloques}\n\nEvalúa precisión visual, detalle de textos/elementos y claridad.`;
	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
		body: JSON.stringify({
			model: "gpt-4.1-mini",
			messages: [{ role: "system", content: sys }, { role: "user", content: user }],
			response_format: { type: "json_object" },
			max_completion_tokens: 800,
		}),
	});
	if (!res.ok) throw new Error(`Juez HTTP ${res.status}`);
	const j = await res.json();
	let parsed;
	try { parsed = JSON.parse(j.choices?.[0]?.message?.content || "{}"); } catch { parsed = { winner: "tie", reason: "juez no parseable" }; }
	return parsed;
}

function buildMarkdown({ results, judges, ts }) {
	let md = `# PatyIA · Matriz visión × reasoning (jailbreak)\n\n`;
	md += `**Fecha corrida:** ${ts}\n\n`;
	md += `**Modelo:** \`${MODELO}\` · **Imagen:** \`notebooklm/unnamed.png\`\n\n`;
	md += `**Pregunta (con imagen adjunta en el mismo turno):** ${PREGUNTA}\n\n`;
	md += `**Parámetros nuevos en PatyIA:** \`vision_strategy\` (auto | data_url | file_upload) y \`reasoning_effort\` (low | medium | high) en POST \`/api/conversacion/jailbreak\`.\n\n`;
	md += `---\n\n`;
	md += `## Tabla resumen\n\n`;
	md += `| Estrategia visión | Tiempo (low / med / high) | Respuesta reasoning **low** | Respuesta reasoning **medium** | Respuesta reasoning **high** | Calificación (juez) |\n`;
	md += `|---|---|---|---|---|---|\n`;

	for (const row of results) {
		const tiempos = REASONING_LEVELS.map((l) => `${l}:${row.runs[l].latency_ms ?? "?"}ms`).join(" · ");
		const cols = REASONING_LEVELS.map((l) => clip(row.runs[l].respuesta));
		const j = judges[row.estrategia];
		const cal = j
			? `**${j.winner}** — ${j.reason || ""} (low:${j.scores?.low ?? "?"}, med:${j.scores?.medium ?? "?"}, high:${j.scores?.high ?? "?"})`
			: "—";
		md += `| ${row.label} | ${mdEscapeCell(tiempos)} | ${mdEscapeCell(cols[0])} | ${mdEscapeCell(cols[1])} | ${mdEscapeCell(cols[2])} | ${mdEscapeCell(cal)} |\n`;
	}

	md += `\n---\n\n## Detalle por estrategia\n\n`;
	for (const row of results) {
		md += `### ${row.label}\n\n`;
		for (const lvl of REASONING_LEVELS) {
			const r = row.runs[lvl];
			md += `#### reasoning \`${lvl}\` · conv \`${r.iconversacion}\` · ${r.latency_ms ?? "?"} ms\n\n`;
			md += `${r.respuesta || "(sin respuesta)"}\n\n`;
		}
		const j = judges[row.estrategia];
		if (j) {
			md += `**Juez:** ganador \`${j.winner}\` — ${j.reason}\n\n`;
		}
	}

	md += `---\n\n## Cómo reproducir\n\n`;
	md += `\`\`\`powershell\nSet-Location "${ISA_ROOT.replace(/\\/g, "/")}"\nnode scripts/test-vision-reasoning-matrix.mjs\n\`\`\`\n\n`;
	md += `### Reinicio PatyIA (obligatorio antes de la corrida)\n\n`;
	md += `\`\`\`powershell\nSet-Location "..\\PatyIA"\nnpm run build\nnpm start\n\`\`\`\n\n`;
	md += `Verificar: \`POST /api/conversacion/jailbreak\` con \`prompt: "Hola"\` devuelve eventos \`message\` con texto.\n`;
	return md;
}

async function main() {
	console.log("=== Matriz visión × reasoning ===");
	const token = loadToken();
	const img = loadImageDataUrl();
	const apiKey = loadOpenAIKey();
	const results = [];

	for (const est of ESTRATEGIAS) {
		console.log(`\n## Estrategia: ${est.id}`);
		const runs = {};
		for (const lvl of REASONING_LEVELS) {
			console.log(`  reasoning ${lvl}…`);
			const body = {
				itercero: ITERCERO,
				icontacto: ICONTACTO,
				imodulo: "isa-doc",
				titulo: `QA vision ${est.id} ${lvl}`,
				prompt: PREGUNTA,
				imagenes: [img],
				prompt_html: `<p>${PREGUNTA}</p>`,
				modelo: MODELO,
				vision_strategy: est.id,
				reasoning_effort: lvl,
			};
			try {
				runs[lvl] = await jailbreakTurn(token, body);
				if (!runs[lvl].respuesta?.trim()) {
					runs[lvl].respuesta = respuestaDesdeLog(runs[lvl].iconversacion);
				}
				console.log(`    conv=${runs[lvl].iconversacion} ${runs[lvl].latency_ms}ms · ${clip(runs[lvl].respuesta, 80)}`);
				await sleep(1500);
			} catch (err) {
				runs[lvl] = { iconversacion: 0, respuesta: `ERROR: ${err.message}`, latency_ms: null };
				console.log(`    ERROR: ${err.message}`);
			}
		}
		results.push({ estrategia: est.id, label: est.label, runs });
	}

	const judges = {};
	if (apiKey) {
		console.log("\n## Calificación (juez OpenAI)");
		for (const row of results) {
			try {
				judges[row.estrategia] = await calificarEstrategia({ estrategia: row.label, runs: row.runs, apiKey });
				console.log(`  ${row.estrategia}: winner=${judges[row.estrategia].winner}`);
			} catch (err) {
				judges[row.estrategia] = { winner: "tie", reason: `juez error: ${err.message}` };
			}
		}
	} else {
		console.warn("AVISO: sin OPENAI_API_KEY — columna calificación omitida.");
	}

	const ts = new Date().toISOString();
	const md = buildMarkdown({ results, judges, ts });
	fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
	fs.writeFileSync(OUT_MD, md, "utf8");
	console.log(`\nBitácora MD: ${OUT_MD}`);
}

main().catch((err) => {
	console.error("⛔", err.message ?? err);
	process.exit(1);
});
