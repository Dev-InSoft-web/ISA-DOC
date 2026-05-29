#!/usr/bin/env node
// Prueba de un solo engine (responses | agents-poc). 10 turnos, métricas y MD.
//
// Uso (PowerShell):
//   $env:ENGINE="responses"; $env:JWT="<token>"; $env:ITERCERO=1; $env:ICONTACTO=1
//   node scripts/test-single-engine.mjs
//
// Variables de entorno:
//   ENGINE        "responses" (default) | "agents-poc"
//   BASE_URL      (default http://localhost:7071/api)
//   JWT           (Authorization Bearer, opcional)
//   ITERCERO      (id tercero existente, REQUERIDO)
//   ICONTACTO     (id contacto, REQUERIDO)
//   OUT_MD        (path destino del MD, auto-generado si no se indica)
//   METRICS_LOG   (path al jsonl, default ../PatyIA/logs/metricas/turnos.jsonl)

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

// ── Precios ────────────────────────────────────────────────────────────────
const PRICING_PATH = resolve(
  import.meta.dirname, "..", "..", "PatyIA", "src", "020 Controller", "tools", "storage", "openai-pricing.json"
);
const PRICING = JSON.parse(readFileSync(PRICING_PATH, "utf8"));

function tarifa(model) {
  if (!model) return null;
  if (PRICING[model]?.input != null) return PRICING[model];
  const base = model.replace(/-\d{4}-\d{2}-\d{2}$/, "");
  return PRICING[base]?.input != null ? PRICING[base] : null;
}

function r6(n) { return Math.round(n * 1e6) / 1e6; }

function costoDesdeUsage(model, usage) {
  const u = usage || {};
  const inputTok = Number(u.input_tokens ?? u.prompt_tokens ?? 0) || 0;
  const cachedTok = Number(u.input_tokens_details?.cached_tokens ?? u.prompt_tokens_details?.cached_tokens ?? 0) || 0;
  const outputTok = Number(u.output_tokens ?? u.completion_tokens ?? 0) || 0;
  const t = tarifa(model);
  if (!t) return { input_billable_tok: inputTok - cachedTok, cached_tok: cachedTok, output_tok: outputTok, tarifa: null, input_usd: 0, cached_usd: 0, output_usd: 0, total_usd: 0 };
  const billable = Math.max(0, inputTok - cachedTok);
  return {
    input_billable_tok: billable,
    cached_tok: cachedTok,
    output_tok: outputTok,
    tarifa: t,
    input_usd: r6((billable * t.input) / 1e6),
    cached_usd: r6((cachedTok * t.cached) / 1e6),
    output_usd: r6((outputTok * t.output) / 1e6),
    total_usd: r6((billable * t.input + cachedTok * t.cached + outputTok * t.output) / 1e6),
  };
}

// ── Config de engines ──────────────────────────────────────────────────────
const ENGINE_ROUTES = {
  "responses": "conversacion",
  "agents-poc": "conversacion-agents",
};

const ENGINE = process.env.ENGINE || "responses";
if (!ENGINE_ROUTES[ENGINE]) {
  console.error(`ERROR: ENGINE "${ENGINE}" no válido. Usa "responses" o "agents-poc".`);
  process.exit(2);
}
const ROUTE = ENGINE_ROUTES[ENGINE];

const BASE_URL = process.env.BASE_URL || "http://localhost:7071/api";
const JWT = process.env.JWT || "";
const ITERCERO = Number(process.env.ITERCERO || 0);
const ICONTACTO = Number(process.env.ICONTACTO || 0);
const METRICS_LOG = resolve(
  process.env.METRICS_LOG || resolve(import.meta.dirname, "..", "..", "PatyIA", "logs", "metricas", "turnos.jsonl")
);

// Fecha dinámica para el path de salida
const now = new Date();
const yyyy = now.getFullYear().toString();
const mm = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");
const engineSlug = ENGINE === "responses" ? "responses" : "agents-poc";
const OUT_MD = resolve(
  process.env.OUT_MD ||
  resolve(import.meta.dirname, "..", "src", "lib", "patyia", "daily", `${yyyy}-${mm}`, dd, `test-${engineSlug}.md`)
);

const PROMPTS = [
  "Hola Paty, ¿qué módulos tiene ContaPyme para una pyme que recién inicia?",
  "¿Cómo configuro la facturación electrónica DIAN paso a paso?",
  "Tengo un error 'Resolución vencida' al emitir factura, ¿qué reviso?",
  "Explícame cómo registrar una devolución sobre venta con retención asumida.",
  "¿Cuál es la diferencia entre ajuste por inflación NIIF y ajuste fiscal?",
  "Necesito conciliar bancos contra extracto, ¿cuál es el procedimiento recomendado?",
  "¿Cómo hago el cierre contable mensual sin afectar reportes ya emitidos?",
  "¿ContaPyme soporta multimoneda? Si sí, ¿cómo activo USD para una cuenta por cobrar?",
  "Quiero un reporte de cartera vencida agrupado por vendedor y rango de días.",
  "Por último, ¿qué buenas prácticas recomiendas para hacer backup semanal de la BD?",
];

if (!ITERCERO || !ICONTACTO) {
  console.error("ERROR: define ITERCERO e ICONTACTO en variables de entorno.");
  process.exit(2);
}

// ── HTTP / SSE ─────────────────────────────────────────────────────────────
const headers = { "Content-Type": "application/json" };
if (JWT) headers["authorization"] = JWT;

async function sendOne(route, body) {
  const res = await fetch(`${BASE_URL}/${route}`, { method: "POST", headers, body: JSON.stringify(body) });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status} en ${route}: ${await res.text().catch(() => "")}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "", lastEnd = null, lastEvent = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n\n")) !== -1) {
      const chunk = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      let evt = "message", data = "";
      for (const ln of chunk.split("\n")) {
        if (ln.startsWith("event:")) evt = ln.slice(6).trim();
        else if (ln.startsWith("data:")) data += ln.slice(5).trim();
      }
      lastEvent = evt;
      if (evt === "end" && data) { try { lastEnd = JSON.parse(data); } catch {} }
    }
  }
  if (lastEvent !== "end") throw new Error("Stream sin event:end");
  return lastEnd;
}

// ── Ejecución del engine ───────────────────────────────────────────────────
async function runEngine() {
  console.log(`\n[${ENGINE}] iniciando ${PROMPTS.length} turnos → /${ROUTE}...`);
  let iconv = null;
  const turnos = [];
  for (let i = 0; i < PROMPTS.length; i++) {
    const body = { prompt: PROMPTS[i], itercero: ITERCERO, icontacto: ICONTACTO };
    if (iconv !== null) body.iconversacion = iconv;
    const t0 = Date.now();
    const obj = await sendOne(ROUTE, body);
    const dt = Date.now() - t0;
    if (iconv === null) iconv = obj?.iconversacion;
    console.log(`  [${ENGINE} ${i + 1}/${PROMPTS.length}] iconv=${iconv} (${dt} ms) tokens=${obj?.qtokens ?? "?"}`);
    turnos.push({ idx: i + 1, prompt: PROMPTS[i], latency_total_ms: dt, qtokens: obj?.qtokens });
  }
  return { iconversacion: iconv, turnos };
}

// ── Métricas ───────────────────────────────────────────────────────────────
async function readMetricas(iconv) {
  if (!existsSync(METRICS_LOG)) {
    console.warn(`AVISO: no existe ${METRICS_LOG}. Métricas no disponibles.`);
    return [];
  }
  const txt = await readFile(METRICS_LOG, "utf8");
  const out = [];
  for (const ln of txt.split(/\r?\n/)) {
    if (!ln.trim()) continue;
    try { const r = JSON.parse(ln); if (r.iconversacion === iconv) out.push(r); } catch {}
  }
  return out;
}

function agregar(rows) {
  const enriched = rows.map((r) => ({ ...r, _calc: costoDesdeUsage(r.model, r.usage) }));
  const total = enriched.reduce((a, r) => a + r._calc.total_usd, 0);
  const lats = enriched.map((r) => r.latency_ms || 0).sort((a, b) => a - b);
  return {
    n: enriched.length,
    enriched,
    total_usd: total,
    total_in_usd: enriched.reduce((a, r) => a + r._calc.input_usd, 0),
    total_cached_usd: enriched.reduce((a, r) => a + r._calc.cached_usd, 0),
    total_out_usd: enriched.reduce((a, r) => a + r._calc.output_usd, 0),
    avg_usd: enriched.length ? total / enriched.length : 0,
    latency_p50_ms: lats[Math.floor(lats.length * 0.5)] || 0,
    latency_p95_ms: lats[Math.floor(lats.length * 0.95)] || 0,
    tok_in: enriched.reduce((a, r) => a + (r.usage?.input_tokens || 0), 0),
    tok_out: enriched.reduce((a, r) => a + (r.usage?.output_tokens || 0), 0),
    tok_cached: enriched.reduce((a, r) => a + (r.usage?.input_tokens_details?.cached_tokens || 0), 0),
  };
}

function modeloDominante(rows) {
  const counts = new Map();
  for (const r of rows) { if (!r.model) continue; counts.set(r.model, (counts.get(r.model) || 0) + 1); }
  let best = null, bestN = 0;
  for (const [m, n] of counts) if (n > bestN) { best = m; bestN = n; }
  return best || "—";
}

function fmtUsd(n) { return `$${n.toFixed(6)}`; }

// ── MD ─────────────────────────────────────────────────────────────────────
function buildSection({ run, rows, ts }) {
  const agg = agregar(rows);
  const mod = modeloDominante(agg.enriched);
  const modelos = [...new Set(agg.enriched.map((r) => r.model).filter(Boolean))];

  let md = `\n## Corrida ${ts} · engine: ${ENGINE}\n\n`;
  md += `**Conversación:** \`iconversacion=${run.iconversacion}\`\n\n`;

  if (modelos.length) {
    md += `### Tarifas aplicadas (USD por 1M tokens)\n\n`;
    md += `| Modelo | Input | Input cached | Output |\n|---|---:|---:|---:|\n`;
    for (const m of modelos) {
      const t = tarifa(m);
      md += t ? `| \`${m}\` | $${t.input.toFixed(2)} | $${t.cached.toFixed(2)} | $${t.output.toFixed(2)} |\n`
              : `| \`${m}\` | _sin tarifa_ | — | — |\n`;
    }
    md += "\n";
  }

  md += `### Totales\n\n`;
  md += `| Métrica | Valor |\n|---|---:|\n`;
  md += `| Modelo (dominante) | \`${mod}\` |\n`;
  md += `| Turnos registrados | ${agg.n} |\n`;
  md += `| Costo total | ${fmtUsd(agg.total_usd)} |\n`;
  md += `| Costo input (no cached) | ${fmtUsd(agg.total_in_usd)} |\n`;
  md += `| Costo input cached | ${fmtUsd(agg.total_cached_usd)} |\n`;
  md += `| Costo output | ${fmtUsd(agg.total_out_usd)} |\n`;
  md += `| Costo promedio / turno | ${fmtUsd(agg.avg_usd)} |\n`;
  md += `| Tokens input totales | ${agg.tok_in} |\n`;
  md += `| Tokens cached totales | ${agg.tok_cached} |\n`;
  md += `| Tokens output totales | ${agg.tok_out} |\n`;
  md += `| Latencia p50 (ms) | ${agg.latency_p50_ms} |\n`;
  md += `| Latencia p95 (ms) | ${agg.latency_p95_ms} |\n\n`;

  if (agg.enriched.length) {
    md += `### Detalle por turno · \`${mod}\`\n\n`;
    md += `| # | Modelo | input_billable | cached | output | USD input | USD cached | USD output | USD total | ms |\n`;
    md += `|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|\n`;
    for (const r of agg.enriched) {
      const c = r._calc;
      md += `| ${r.idx ?? "?"} | \`${r.model}\` | ${c.input_billable_tok} | ${c.cached_tok} | ${c.output_tok} | ${fmtUsd(c.input_usd)} | ${fmtUsd(c.cached_usd)} | ${fmtUsd(c.output_usd)} | **${fmtUsd(c.total_usd)}** | ${r.latency_ms ?? "—"} |\n`;
    }
    md += "\n";
  }

  md += `---\n`;
  return md;
}

function buildHeader() {
  return `# PatyIA · Test engine: ${ENGINE}\n\n` +
    `**Mensajes por corrida:** ${PROMPTS.length} · mismo orden siempre.\n\n` +
    `Tarifas: \`PatyIA/src/020 Controller/tools/storage/openai-pricing.json\`.\n\n` +
    `---\n\n<!-- corridas:start -->\n`;
}

// ── Main ───────────────────────────────────────────────────────────────────
(async () => {
  const run = await runEngine();

  console.log(`\nLeyendo métricas desde ${METRICS_LOG}...`);
  const rows = await readMetricas(run.iconversacion);
  console.log(`Métricas recolectadas: ${rows.length}.`);

  const ts = new Date().toISOString().replace("T", " ").slice(0, 16);
  const section = buildSection({ run, rows, ts });

  await mkdir(dirname(OUT_MD), { recursive: true });
  const prev = existsSync(OUT_MD) ? await readFile(OUT_MD, "utf8") : "";
  const merged = prev.includes("<!-- corridas:start -->")
    ? prev + section
    : buildHeader() + section;
  await writeFile(OUT_MD, merged, "utf8");
  console.log(`\nMD actualizado: ${OUT_MD}`);
  console.log(`Test ${ENGINE} \`iconversacion=${run.iconversacion}\``);
})().catch((err) => {
  console.error("FALLÓ:", err);
  process.exit(1);
});
