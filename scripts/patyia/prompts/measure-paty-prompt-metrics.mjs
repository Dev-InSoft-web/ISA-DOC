#!/usr/bin/env node
/**
 * Mide chars + tokens (gpt-tokenizer / gpt-5) de PROMPT_<TIPO>.md Base vs Ultra.
 * Uso: npm run patyia:prompts:metrics
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { encode } from "gpt-tokenizer/model/gpt-5";
import { ISA_DOC_ROOT } from "../../_shared/isa-doc-root.mjs";

const promptsRoot = resolve(ISA_DOC_ROOT, "src", "lib", "patyia", "prompts");

const TIPOS = [
	"SALUDO_OTRO",
	"FUERA_DE_ALCANCE_TECNICO",
	"SOLICITUD_NO_PERMITIDA",
	"REQUIERE_CONTEXTO",
	"PASO_A_PASO",
	"INTERPRETACION_RESULTADO",
	"CONSULTA_NORMATIVA_NEGOCIO",
	"ASESORIA_PERSONALIZADA",
	"ERROR_TECNICO",
	"ERROR_CONFIGURACION",
	"ERROR_ACCESO",
	"ERROR_DIAN",
	"COMERCIAL",
];

function fileFor(tipo, variant) {
	const name = `PROMPT_${tipo}.md`;
	if (variant === "base") return resolve(promptsRoot, name);
	return resolve(promptsRoot, "Ultra", name);
}

function measure(path) {
	const text = readFileSync(path, "utf8");
	return { chars: text.length, tokens: encode(text).length };
}

const rows = [];
for (const tipo of TIPOS) {
	const basePath = fileFor(tipo, "base");
	const ultraPath = fileFor(tipo, "ultra");
	if (!existsSync(basePath)) throw new Error(`Falta ${basePath}`);
	if (!existsSync(ultraPath)) throw new Error(`Falta ${ultraPath}`);
	const orig = measure(basePath);
	const ultra = measure(ultraPath);
	const pct = orig.chars > 0 ? Math.round((1000 * (1 - ultra.chars / orig.chars)) / 10) : 0;
	rows.push({ tipo, ...orig, ultraChars: ultra.chars, ultraTok: ultra.tokens, pct });
	console.log(
		`${tipo.padEnd(28)} base ${String(orig.tokens).padStart(5)} tok  ultra ${String(ultra.tokens).padStart(5)} tok  ${pct}%`,
	);
}

const origChars = rows.reduce((s, r) => s + r.chars, 0);
const ultraChars = rows.reduce((s, r) => s + r.ultraChars, 0);
const origTok = rows.reduce((s, r) => s + r.tokens, 0);
const ultraTok = rows.reduce((s, r) => s + r.ultraTok, 0);
const pctTotal = origChars > 0 ? Math.round((1000 * (1 - ultraChars / origChars)) / 10) : 0;
console.log(`\nTotal chars ${origChars} → ${ultraChars} (${pctTotal}%)`);
console.log(`Total tok   ${origTok} → ${ultraTok}`);

const metricsLines = rows
	.map(
		(r) =>
			`\t{ tipo: "${r.tipo}", orig: ${r.chars}, origTok: ${r.tokens}, ultra: ${r.ultraChars}, ultraTok: ${r.ultraTok} },`,
	)
	.join("\n");

const outTs = resolve(ISA_DOC_ROOT, "src", "lib", "tickets", "patyia-prompt-metrics.ts");
if (process.argv.includes("--write")) {
	const template = readFileSync(outTs, "utf8");
	const block = `export const PROMPT_LEN_METRICS: PromptLenRow[] = [\n${metricsLines}\n];`;
	const next = template.replace(/export const PROMPT_LEN_METRICS: PromptLenRow\[\] = \[[\s\S]*?\];/, block);
	writeFileSync(outTs, next, "utf8");
	console.log(`\n✓ Actualizado ${outTs}`);
}
