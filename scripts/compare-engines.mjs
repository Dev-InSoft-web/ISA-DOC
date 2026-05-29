#!/usr/bin/env node
// Comparativa empírica de costos: engine "responses" vs engine "agents-poc".
// Envía 10 mensajes a cada endpoint, recolecta métricas desde logs/metricas/turnos.jsonl
// y genera un MD comparativo en ISA-DOC.
//
// Uso (PowerShell):
//   $env:JWT="<token>"; $env:ITERCERO=1; $env:ICONTACTO=1
//   node scripts/compare-engines.mjs
//
// Variables de entorno:
//   BASE_URL      (default http://localhost:7071/api)
//   JWT           (Authorization Bearer, opcional)
//   ITERCERO      (id tercero existente, REQUERIDO)
//   ICONTACTO     (id contacto, REQUERIDO)
//   OUT_MD        (path destino del MD, default ISA-DOC/.../02-comparativa-engines-responses-vs-agents.md)
//   METRICS_LOG   (path al jsonl, default ../logs/metricas/turnos.jsonl)

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const PRICING_PATH = resolve(import.meta.dirname, "..", "..", "PatyIA", "src", "020 Controller", "tools", "storage", "openai-pricing.json");
const PRICING = JSON.parse(readFileSync(PRICING_PATH, "utf8"));

function tarifa(model) {
  if (!model) return null;
  if (PRICING[model] && PRICING[model].input != null) return PRICING[model];
  const base = model.replace(/-\d{4}-\d{2}-\d{2}$/, "");
  if (PRICING[base] && PRICING[base].input != null) return PRICING[base];
  return null;
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
  const input_usd = r6((billable * t.input) / 1e6);
  const cached_usd = r6((cachedTok * t.cached) / 1e6);
  const output_usd = r6((outputTok * t.output) / 1e6);
  return { input_billable_tok: billable, cached_tok: cachedTok, output_tok: outputTok, tarifa: t, input_usd, cached_usd, output_usd, total_usd: r6(input_usd + cached_usd + output_usd) };
}

const BASE_URL = process.env.BASE_URL || "http://localhost:7071/api";
const JWT = process.env.JWT || "";
const ITERCERO = Number(process.env.ITERCERO || 0);
const ICONTACTO = Number(process.env.ICONTACTO || 0);
const METRICS_LOG = resolve(
  process.env.METRICS_LOG || resolve(import.meta.dirname, "..", "..", "PatyIA", "logs", "metricas", "turnos.jsonl"),
);
const OUT_MD = resolve(
  process.env.OUT_MD ||
    resolve(
      import.meta.dirname,
      "..",
      "src",
      "lib",
      "patyia",
      "daily",
      "2026-05",
      "28",
      "02-comparativa-engines-responses-vs-agents.md",
    ),
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

const headers = { "Content-Type": "application/json" };
if (JWT) headers["authorization"] = JWT;

async function sendOne(route, body) {
  const res = await fetch(`${BASE_URL}/${route}`, { method: "POST", headers, body: JSON.stringify(body) });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status} en ${route}: ${await res.text().catch(() => "")}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let lastEnd = null;
  let lastEvent = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n\n")) !== -1) {
      const chunk = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      const lines = chunk.split("\n");
      let evt = "message", data = "";
      for (const ln of lines) {
        if (ln.startsWith("event:")) evt = ln.slice(6).trim();
        else if (ln.startsWith("data:")) data += ln.slice(5).trim();
      }
      lastEvent = evt;
      if (evt === "end" && data) {
        try { lastEnd = JSON.parse(data); } catch {}
      }
    }
  }
  if (lastEvent !== "end") throw new Error("Stream sin event:end");
  return lastEnd;
}

async function runEngine(label, route) {
  console.log(`\n[${label}] iniciando 10 turnos vs ${route}...`);
  let iconv = null;
  const turnos = [];
  for (let i = 0; i < PROMPTS.length; i++) {
    const body = { prompt: PROMPTS[i], itercero: ITERCERO, icontacto: ICONTACTO };
    if (iconv !== null) body.iconversacion = iconv;
    const t0 = Date.now();
    const obj = await sendOne(route, body);
    const dt = Date.now() - t0;
    if (iconv === null) iconv = obj?.iconversacion;
    console.log(`  [${label} ${i + 1}/10] iconv=${iconv} (${dt} ms) tokens=${obj?.qtokens ?? "?"}`);
    turnos.push({ idx: i + 1, prompt: PROMPTS[i], latency_total_ms: dt, qtokens: obj?.qtokens });
  }
  return { label, route, iconversacion: iconv, turnos };
}

async function readMetricas(iconvA, iconvB) {
  if (!existsSync(METRICS_LOG)) {
    console.warn(`AVISO: no existe ${METRICS_LOG}. Las métricas detalladas no se incluirán.`);
    return [];
  }
  const txt = await readFile(METRICS_LOG, "utf8");
  const out = [];
  for (const ln of txt.split(/\r?\n/)) {
    if (!ln.trim()) continue;
    try {
      const r = JSON.parse(ln);
      if (r.iconversacion === iconvA || r.iconversacion === iconvB) out.push(r);
    } catch {}
  }
  return out;
}

function agregar(rows) {
  const enriched = rows.map((r) => ({ ...r, _calc: costoDesdeUsage(r.model, r.usage) }));
  const total_in = enriched.reduce((a, r) => a + r._calc.input_usd, 0);
  const total_cached = enriched.reduce((a, r) => a + r._calc.cached_usd, 0);
  const total_out = enriched.reduce((a, r) => a + r._calc.output_usd, 0);
  const total = total_in + total_cached + total_out;
  const lats = enriched.map((r) => r.latency_ms || 0).sort((a, b) => a - b);
  const p50 = lats[Math.floor(lats.length * 0.5)] || 0;
  const p95 = lats[Math.floor(lats.length * 0.95)] || 0;
  const tok_in = enriched.reduce((a, r) => a + (r.usage?.input_tokens || 0), 0);
  const tok_out = enriched.reduce((a, r) => a + (r.usage?.output_tokens || 0), 0);
  const tok_cached = enriched.reduce((a, r) => a + (r.usage?.input_tokens_details?.cached_tokens || 0), 0);
  const tok_billable = tok_in - tok_cached;
  return {
    n: enriched.length,
    enriched,
    total_usd: total,
    total_in_usd: total_in,
    total_cached_usd: total_cached,
    total_out_usd: total_out,
    avg_usd: enriched.length ? total / enriched.length : 0,
    latency_p50_ms: p50,
    latency_p95_ms: p95,
    tok_in,
    tok_out,
    tok_cached,
    tok_billable,
  };
}

function fmtUsd(n) { return `$${n.toFixed(6)}`; }
function fmtPct(a, b) { if (!b) return "—"; return `${(((a - b) / b) * 100).toFixed(1)}%`; }

const CONV_LOG_DIR = resolve(import.meta.dirname, "..", "..", "PatyIA", "logs", "conversaciones");

function loadOpenAIKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  try {
    const p = resolve(import.meta.dirname, "..", "..", "PatyIA", "local.settings.json");
    const j = JSON.parse(readFileSync(p, "utf8"));
    return j?.Values?.OPENAI_API_KEY || "";
  } catch { return ""; }
}

function leerConvLog(iconv) {
  const p = resolve(CONV_LOG_DIR, `conv-${iconv}.json`);
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; }
}

function pairsDesdeConvLog(log) {
  if (!log?.mensajes) return [];
  const pairs = [];
  for (let i = 0; i < log.mensajes.length - 1; i++) {
    const u = log.mensajes[i], a = log.mensajes[i + 1];
    if (u.role === "user" && a.role === "assistant") { pairs.push({ prompt: u.text || "", response: a.text || "" }); i++; }
  }
  return pairs;
}

async function calificarTurno({ prompt, respA, respB, judgeModel, apiKey }) {
  const sys = "Eres un evaluador imparcial. Comparas dos respuestas de asistentes de soporte para ContaPyme (ERP contable colombiano) frente a la misma consulta del usuario. Calificas cada una de 1 a 10 en: relevancia, precisión técnica, completitud y claridad. Devuelves SOLO JSON válido con las claves: scoreA, scoreB, winner ('A'|'B'|'tie'), reason (≤180 caracteres, español).";
  const user = `CONSULTA DEL USUARIO:\n${prompt}\n\n---\nRESPUESTA A (engine: responses):\n${respA}\n\n---\nRESPUESTA B (engine: agents-poc):\n${respB}\n\n---\nEvalúa y devuelve JSON.`;
  const body = { model: judgeModel, messages: [{ role: "system", content: sys }, { role: "user", content: user }], response_format: { type: "json_object" }, max_completion_tokens: 2000, reasoning_effort: "minimal" };
  const res = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Juez HTTP ${res.status}: ${await res.text().catch(() => "")}`);
  const j = await res.json();
  const usage = j?.usage || {};
  const content = j?.choices?.[0]?.message?.content || "{}";
  let parsed; try { parsed = JSON.parse(content); } catch { parsed = { scoreA: null, scoreB: null, winner: "tie", reason: "respuesta del juez no parseable" }; }
  const normScore = (s) => {
    if (typeof s === "number") return s;
    if (s && typeof s === "object") {
      const nums = Object.values(s).filter((v) => typeof v === "number");
      return nums.length ? Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10 : null;
    }
    const n = Number(s); return Number.isFinite(n) ? n : null;
  };
  parsed.scoreA = normScore(parsed.scoreA);
  parsed.scoreB = normScore(parsed.scoreB);
  return { ...parsed, _usage: usage };
}

async function calificarConversaciones({ pairsA, pairsB, judgeModel }) {
  const apiKey = loadOpenAIKey();
  if (!apiKey) { console.warn("AVISO: sin OPENAI_API_KEY, se omite calificación."); return null; }
  const n = Math.min(pairsA.length, pairsB.length);
  const scores = [];
  let inTok = 0, outTok = 0;
  for (let i = 0; i < n; i++) {
    process.stdout.write(`  [juez ${i + 1}/${n}] `);
    try {
      const r = await calificarTurno({ prompt: pairsA[i].prompt, respA: pairsA[i].response, respB: pairsB[i].response, judgeModel, apiKey });
      inTok += Number(r._usage.prompt_tokens || 0); outTok += Number(r._usage.completion_tokens || 0);
      scores.push({ idx: i + 1, ...r });
      console.log(`A=${r.scoreA} B=${r.scoreB} → ${r.winner}`);
    } catch (e) { console.log(`FALLÓ: ${e.message}`); scores.push({ idx: i + 1, scoreA: null, scoreB: null, winner: "tie", reason: `juez error: ${e.message}` }); }
  }
  const t = tarifa(judgeModel);
  const cost = t ? r6((inTok * t.input) / 1e6 + (outTok * t.output) / 1e6) : 0;
  return { scores, judgeModel, juez_tokens_in: inTok, juez_tokens_out: outTok, juez_costo_usd: cost };
}

function modeloDominante(rows) {
  const counts = new Map();
  for (const r of rows) { if (!r.model) continue; counts.set(r.model, (counts.get(r.model) || 0) + 1); }
  let best = null, bestN = 0;
  for (const [m, n] of counts) if (n > bestN) { best = m; bestN = n; }
  return best || "—";
}

function buildHeader() {
  let md = `# PatyIA · Comparativa empírica de costos: Responses vs Agents SDK\n\n`;
  md += `**Mensajes enviados por corrida:** ${PROMPTS.length} por engine, mismos prompts en el mismo orden.\n\n`;
  md += `**Modelo bajo prueba:** se determina por corrida (ver tabla de Totales). Ambos engines usan el modelo configurado en \`OPENAI_MODEL\` (PatyIA \`local.settings.json\`).\n\n`;
  md += `**Fórmula (regla de tres):** \`USD = (tokens × tarifa_por_1M) ÷ 1 000 000\`. El input cobrado descuenta los tokens cacheados: \`input_billable = input_tokens − cached_tokens\`.\n\n`;
  md += `Tarifas: ver \`PatyIA/src/020 Controller/tools/storage/openai-pricing.json\`.\n\n`;
  md += `---\n\n`;
  md += `<!-- corridas:start -->\n`;
  return md;
}

function buildRunSection({ runA, runB, rowsA, rowsB, scoring, ts }) {
  const aggA = agregar(rowsA);
  const aggB = agregar(rowsB);
  const byIdxA = new Map(aggA.enriched.map((r, i) => [i + 1, r]));
  const byIdxB = new Map(aggB.enriched.map((r, i) => [i + 1, r]));
  const modA = modeloDominante(aggA.enriched);
  const modB = modeloDominante(aggB.enriched);
  const modelosUsados = Array.from(new Set([...aggA.enriched, ...aggB.enriched].map((r) => r.model).filter(Boolean)));

  let md = `\n## Corrida ${ts}\n\n`;
  md += `**Conversaciones:** Responses \`iconversacion=${runA.iconversacion}\` · Agents PoC \`iconversacion=${runB.iconversacion}\`.\n\n`;

  md += `### Tarifas aplicadas en esta corrida (USD por 1M tokens)\n\n`;
  md += `| Modelo | Input | Input cached | Output |\n|---|---:|---:|---:|\n`;
  for (const m of modelosUsados) {
    const t = tarifa(m);
    md += t ? `| \`${m}\` | $${t.input.toFixed(2)} | $${t.cached.toFixed(2)} | $${t.output.toFixed(2)} |\n` : `| \`${m}\` | _sin tarifa_ | — | — |\n`;
  }

  md += `\n### Totales agregados\n\n`;
  md += `| Métrica | Responses | Agents PoC | Δ (Agents vs Responses) |\n|---|---:|---:|---:|\n`;
  md += `| Modelo (dominante) | \`${modA}\` | \`${modB}\` | — |\n`;
  md += `| Turnos registrados | ${aggA.n} | ${aggB.n} | — |\n`;
  md += `| Costo total | ${fmtUsd(aggA.total_usd)} | ${fmtUsd(aggB.total_usd)} | ${fmtPct(aggB.total_usd, aggA.total_usd)} |\n`;
  md += `| Costo input (no cached) | ${fmtUsd(aggA.total_in_usd)} | ${fmtUsd(aggB.total_in_usd)} | ${fmtPct(aggB.total_in_usd, aggA.total_in_usd)} |\n`;
  md += `| Costo input cached | ${fmtUsd(aggA.total_cached_usd)} | ${fmtUsd(aggB.total_cached_usd)} | ${fmtPct(aggB.total_cached_usd, aggA.total_cached_usd)} |\n`;
  md += `| Costo output | ${fmtUsd(aggA.total_out_usd)} | ${fmtUsd(aggB.total_out_usd)} | ${fmtPct(aggB.total_out_usd, aggA.total_out_usd)} |\n`;
  md += `| Costo promedio / turno | ${fmtUsd(aggA.avg_usd)} | ${fmtUsd(aggB.avg_usd)} | ${fmtPct(aggB.avg_usd, aggA.avg_usd)} |\n`;
  md += `| Tokens input totales | ${aggA.tok_in} | ${aggB.tok_in} | ${fmtPct(aggB.tok_in, aggA.tok_in)} |\n`;
  md += `| Tokens cached totales | ${aggA.tok_cached} | ${aggB.tok_cached} | — |\n`;
  md += `| Tokens output totales | ${aggA.tok_out} | ${aggB.tok_out} | ${fmtPct(aggB.tok_out, aggA.tok_out)} |\n`;
  md += `| Latencia p50 (ms) | ${aggA.latency_p50_ms} | ${aggB.latency_p50_ms} | ${fmtPct(aggB.latency_p50_ms, aggA.latency_p50_ms)} |\n`;
  md += `| Latencia p95 (ms) | ${aggA.latency_p95_ms} | ${aggB.latency_p95_ms} | ${fmtPct(aggB.latency_p95_ms, aggA.latency_p95_ms)} |\n\n`;

  md += `### Detalle por turno (Responses · modelo \`${modA}\`)\n\n`;
  md += `\`input_billable\` = input_tokens − cached_tokens. Costo recalculado por regla de tres.\n\n`;
  md += `| # | Modelo | input_billable | cached | output | USD input | USD cached | USD output | USD total | ms |\n|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|\n`;
  for (let i = 1; i <= PROMPTS.length; i++) {
    const r = byIdxA.get(i); if (!r) { md += `| ${i} | — | — | — | — | — | — | — | — | — |\n`; continue; }
    const c = r._calc;
    md += `| ${i} | \`${r.model}\` | ${c.input_billable_tok} | ${c.cached_tok} | ${c.output_tok} | ${fmtUsd(c.input_usd)} | ${fmtUsd(c.cached_usd)} | ${fmtUsd(c.output_usd)} | **${fmtUsd(c.total_usd)}** | ${r.latency_ms ?? "—"} |\n`;
  }
  md += `\n### Detalle por turno (Agents PoC · modelo \`${modB}\`)\n\n`;
  md += `| # | Modelo | input_billable | cached | output | USD input | USD cached | USD output | USD total | ms |\n|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|\n`;
  for (let i = 1; i <= PROMPTS.length; i++) {
    const r = byIdxB.get(i); if (!r) { md += `| ${i} | — | — | — | — | — | — | — | — | — |\n`; continue; }
    const c = r._calc;
    md += `| ${i} | \`${r.model}\` | ${c.input_billable_tok} | ${c.cached_tok} | ${c.output_tok} | ${fmtUsd(c.input_usd)} | ${fmtUsd(c.cached_usd)} | ${fmtUsd(c.output_usd)} | **${fmtUsd(c.total_usd)}** | ${r.latency_ms ?? "—"} |\n`;
  }

  if (scoring && scoring.scores?.length) {
    const totA = scoring.scores.reduce((a, s) => a + (Number(s.scoreA) || 0), 0);
    const totB = scoring.scores.reduce((a, s) => a + (Number(s.scoreB) || 0), 0);
    const wins = { A: 0, B: 0, tie: 0 };
    for (const s of scoring.scores) wins[s.winner === "A" ? "A" : s.winner === "B" ? "B" : "tie"]++;
    md += `\n### Calificación comparativa (juez: \`${scoring.judgeModel}\`)\n\n`;
    md += `Cada turno se evaluó pidiendo al juez una calificación 1-10 por respuesta y un veredicto (A=Responses, B=Agents PoC) considerando relevancia, precisión técnica, completitud y claridad.\n\n`;
    md += `| # | Score Responses (A) | Score Agents (B) | Ganador | Razón |\n|---:|---:|---:|:---:|---|\n`;
    for (const s of scoring.scores) {
      const w = s.winner === "A" ? "Responses" : s.winner === "B" ? "Agents PoC" : "empate";
      md += `| ${s.idx} | ${s.scoreA ?? "—"} | ${s.scoreB ?? "—"} | ${w} | ${(s.reason || "").replace(/\|/g, "\\|")} |\n`;
    }
    md += `\n**Resumen:** A=${totA} pts · B=${totB} pts · victorias A=${wins.A}, B=${wins.B}, empates=${wins.tie}. Costo del juez: ${fmtUsd(scoring.juez_costo_usd)} (${scoring.juez_tokens_in} in + ${scoring.juez_tokens_out} out tokens).\n`;
  }

  md += `\n---\n`;
  return md;
}

function mergeMD(headerBlock, prevContent, newSection) {
  const marker = "<!-- corridas:start -->";
  if (!prevContent || !prevContent.includes(marker)) return headerBlock + newSection;
  const cut = prevContent.indexOf(marker) + marker.length;
  return prevContent.slice(0, cut) + prevContent.slice(cut) + newSection;
}

(async () => {
  const rescoreA = Number(process.env.RESCORE_A || 0);
  const rescoreB = Number(process.env.RESCORE_B || 0);
  let runA, runB;
  if (rescoreA && rescoreB) {
    console.log(`Modo rescore: reutilizando iconv A=${rescoreA} B=${rescoreB} (no se llaman engines).`);
    runA = { iconversacion: rescoreA };
    runB = { iconversacion: rescoreB };
  } else {
    runA = await runEngine("responses", "conversacion");
    runB = await runEngine("agents-poc", "conversacion-agents");
  }
  console.log(`\nLeyendo métricas desde ${METRICS_LOG}...`);
  const all = await readMetricas(runA.iconversacion, runB.iconversacion);
  const rowsA = all.filter((r) => r.iconversacion === runA.iconversacion && r.engine === "responses");
  const rowsB = all.filter((r) => r.iconversacion === runB.iconversacion && r.engine === "agents-poc");
  console.log(`Métricas recolectadas: responses=${rowsA.length}, agents=${rowsB.length}.`);

  const logA = leerConvLog(runA.iconversacion);
  const logB = leerConvLog(runB.iconversacion);
  const pairsA = pairsDesdeConvLog(logA);
  const pairsB = pairsDesdeConvLog(logB);
  console.log(`\nCalificando respuestas con gpt-5-mini (juez)...`);
  const scoring = await calificarConversaciones({ pairsA, pairsB, judgeModel: "gpt-5-mini" });

  const ts = new Date().toISOString().replace("T", " ").slice(0, 16);
  const section = buildRunSection({ runA, runB, rowsA, rowsB, scoring, ts });

  await mkdir(dirname(OUT_MD), { recursive: true });
  const prev = existsSync(OUT_MD) ? await readFile(OUT_MD, "utf8") : "";
  const headerBlock = buildHeader();
  const merged = prev.includes("<!-- corridas:start -->") ? prev + section : headerBlock + section;
  await writeFile(OUT_MD, merged, "utf8");
  console.log(`\nMD actualizado (modo acumulativo): ${OUT_MD}`);
})().catch((err) => {
  console.error("FALLÓ:", err);
  process.exit(1);
});
