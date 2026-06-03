/**
 * Regenera gpt5-adjuntos-share-html.ts (capturas SVG → data URI base64).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_DIR = path.join(ROOT, "public", "assets", "imgs", "patyia", "bitacora", "2026-06-03");
const OUT = path.join(ROOT, "src", "lib", "features", "patyia", "060-bitacora", "share", "gpt5-adjuntos-share-html.ts");

function svgDataUri(file) {
	const svg = fs.readFileSync(path.join(IMG_DIR, file), "utf8");
	return `data:image/svg+xml;base64,${Buffer.from(svg, "utf8").toString("base64")}`;
}

function chatShell(title, modelo, iconversacion, captureDataUri, outcomeLabel, outcomeColor) {
	return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:520px;font-family:Tahoma,Arial,sans-serif;font-size:12px;color:#1a1a1a;margin:12px 0;">
<tr><td style="padding:8px 10px;background:#f4f6f8;border:1px solid #c5cdd6;font-weight:bold;">${title} · iconversacion ${iconversacion} · modelo <code style="font-family:Consolas,monospace;">${modelo}</code> · <span style="color:${outcomeColor};font-weight:bold;">${outcomeLabel}</span></td></tr>
<tr><td style="padding:10px;border:1px solid #c5cdd6;border-top:0;background:#fafbfc;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td align="right" style="padding-bottom:8px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:#0b3360;color:#ffffff;padding:10px 12px;border-radius:8px;max-width:280px;font-size:12px;line-height:1.45;">¿Cómo registro un producto nuevo en inventarios?</td>
</tr></table>
</td></tr>
<tr><td align="left">
<table cellpadding="0" cellspacing="0" border="0" style="max-width:92%;"><tr>
<td style="background:#ffffff;border:1px solid #d0d7de;border-radius:8px;padding:8px 10px;">
<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#57606a;margin-bottom:6px;">#2 · Paty · ${modelo}</div>
<div style="font-size:12px;line-height:1.5;color:#24292f;margin-bottom:8px;">Misma consulta de ayuda paso a paso (registro de producto en inventarios).</div>
<img src="${captureDataUri}" alt="Captura conversación ${iconversacion}" width="420" height="320" style="display:block;max-width:100%;height:auto;border:1px solid #d0d7de;border-radius:6px;" />
</td></tr></table>
</td></tr>
</table>
</td></tr>
</table>`;
}

const IMG_1862 = svgDataUri("conv-1862-gpt5-nano-sin-adjuntos.svg");
const IMG_1863 = svgDataUri("conv-1863-gpt5-mini-adjuntos.svg");

const SUMMARY = `<table cellpadding="0" cellspacing="4" border="1" style="border-collapse:collapse;font-family:Tahoma,Arial,sans-serif;font-size:12px;">
<tr style="background:#0b3360;color:#fff;"><th>Modelo</th><th>Imágenes</th><th>Videos</th><th>Conv.</th><th>Resultado</th></tr>
<tr><td><strong>gpt-5-nano</strong></td><td>No</td><td>No</td><td>1862</td><td style="color:#b45309;">Sin adjuntos</td></tr>
<tr><td><strong>gpt-5-mini</strong></td><td>Sí</td><td>Sí</td><td>1863</td><td style="color:#15803d;">Con adjuntos</td></tr>
</table>
<p style="font-family:Tahoma,Arial,sans-serif;font-size:12px;line-height:1.5;"><strong>Hallazgo (TK-1431662):</strong> con el mismo flujo RAG y template, solo cambiando el modelo de respuesta final, <code>gpt-5-nano</code> no anexa documentos multimedia al mensaje del asistente; <code>gpt-5-mini</code> sí (captura + video).</p>`;

const CONV_1862 = chatShell(
	"Caso sin adjuntos (error de UX)",
	"gpt-5-nano",
	"1862",
	IMG_1862,
	"Sin imagen ni video en el chat",
	"#b45309",
);
const CONV_1863 = chatShell(
	"Caso con adjuntos (éxito)",
	"gpt-5-mini",
	"1863",
	IMG_1863,
	"Imagen + video en la respuesta",
	"#15803d",
);

const ts = `// Generado por scripts/build-gpt5-adjuntos-share-html.mjs — no editar data URI a mano.

const SUMMARY = ${JSON.stringify(SUMMARY)};
const CONV_1862 = ${JSON.stringify(CONV_1862)};
const CONV_1863 = ${JSON.stringify(CONV_1863)};

/** HTML email-safe con capturas en base64 para compartir el hallazgo. */
export function getGpt5AdjuntosShareHtml(): string {
\treturn [
\t\t'<div style="font-family:Tahoma,Arial,sans-serif;font-size:12px;">',
\t\t'<h2 style="font-size:16px;color:#0b3360;margin:0 0 8px;">PatyIA — gpt-5-nano vs gpt-5-mini (adjuntos multimedia)</h2>',
\t\tSUMMARY,
\t\t'<h3 style="font-size:14px;margin:16px 0 8px;">Conversación 1862 — gpt-5-nano</h3>',
\t\tCONV_1862,
\t\t'<h3 style="font-size:14px;margin:16px 0 8px;">Conversación 1863 — gpt-5-mini</h3>',
\t\tCONV_1863,
\t\t'<p style="font-size:11px;color:#666;margin-top:12px;">ISA-DOC · Bitácora 2026-06-03 · Evidencia staging AYUDASCP_IA</p>',
\t\t'</div>',
\t].join('\\n');
}
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, ts, "utf8");
console.log(`[ok] ${OUT}`);
