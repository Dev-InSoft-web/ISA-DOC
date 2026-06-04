import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { encode } from "gpt-tokenizer/model/gpt-5";
import {
	PATY_PROMPT_TIPOS,
	WENYAN_LEGACY_BY_TIPO,
	promptMdFilename,
	type PatyPromptTipo,
} from "../../../src/lib/features/patyia/050-prompts/prompt-files.ts";

type VersionKey = "original" | "ultra" | "wenyan";
type Count = { chars: number; tokens: number };
type CountWithPct = Count & { tokenPctOfOriginal: number };
type PromptStats = {
	index: number;
	code: string;
	title: string;
	files: Record<VersionKey, string>;
	versions: {
		original: CountWithPct;
		ultra: CountWithPct;
		wenyan: CountWithPct;
	};
};
type Totals = {
	original: CountWithPct;
	ultra: CountWithPct;
	wenyan: CountWithPct;
};

import { ISA_DOC_ROOT } from "../../_shared/isa-doc-root.ts";

const root = ISA_DOC_ROOT;
const promptsRoot = resolve(root, "src", "lib", "features", "patyia", "050-prompts", "catalog");
const outFile = resolve(root, "public", "static-api", "patyia", "prompts", "comparativa.json");

function unixRel(path: string): string {
	return relative(root, path).replaceAll("\\", "/");
}

function versionPath(version: VersionKey, tipo: PatyPromptTipo): string {
	if (version === "original") return resolve(promptsRoot, promptMdFilename(tipo));
	if (version === "ultra") return resolve(promptsRoot, "Ultra", promptMdFilename(tipo));
	return resolve(promptsRoot, "wenyan-ultra", WENYAN_LEGACY_BY_TIPO[tipo]);
}

function readVersion(version: VersionKey, tipo: PatyPromptTipo): { path: string; text: string } {
	const p = versionPath(version, tipo);
	if (!existsSync(p)) {
		if (version === "wenyan") {
			const ultra = readVersion("ultra", tipo);
			return { path: ultra.path, text: ultra.text };
		}
		throw new Error(`No existe ${unixRel(p)}`);
	}
	return { path: p, text: readFileSync(p, "utf8") };
}

function count(text: string): Count {
	return { chars: text.length, tokens: encode(text).length };
}

function withPct(value: Count, originalTokens: number): CountWithPct {
	return {
		...value,
		tokenPctOfOriginal: originalTokens === 0 ? 0 : Math.round((value.tokens / originalTokens) * 100),
	};
}

function promptStats(tipo: PatyPromptTipo, index: number): PromptStats {
	const original = readVersion("original", tipo);
	const ultra = readVersion("ultra", tipo);
	const wenyan = readVersion("wenyan", tipo);
	const originalCount = count(original.text);
	const ultraCount = count(ultra.text);
	const wenyanCount = count(wenyan.text);

	return {
		index,
		code: tipo,
		title: tipo.replaceAll("_", " "),
		files: {
			original: unixRel(original.path),
			ultra: unixRel(ultra.path),
			wenyan: unixRel(wenyan.path),
		},
		versions: {
			original: withPct(originalCount, originalCount.tokens),
			ultra: withPct(ultraCount, originalCount.tokens),
			wenyan: withPct(wenyanCount, originalCount.tokens),
		},
	};
}

function sumTotals(prompts: PromptStats[]): Totals {
	const original = prompts.reduce<Count>(
		(acc, prompt) => ({
			chars: acc.chars + prompt.versions.original.chars,
			tokens: acc.tokens + prompt.versions.original.tokens,
		}),
		{ chars: 0, tokens: 0 },
	);
	const ultra = prompts.reduce<Count>(
		(acc, prompt) => ({
			chars: acc.chars + prompt.versions.ultra.chars,
			tokens: acc.tokens + prompt.versions.ultra.tokens,
		}),
		{ chars: 0, tokens: 0 },
	);
	const wenyan = prompts.reduce<Count>(
		(acc, prompt) => ({
			chars: acc.chars + prompt.versions.wenyan.chars,
			tokens: acc.tokens + prompt.versions.wenyan.tokens,
		}),
		{ chars: 0, tokens: 0 },
	);

	return {
		original: withPct(original, original.tokens),
		ultra: withPct(ultra, original.tokens),
		wenyan: withPct(wenyan, original.tokens),
	};
}

export function buildPatyPromptsJson(): void {
	const prompts = PATY_PROMPT_TIPOS.map((tipo, index) => promptStats(tipo, index));
	const data = {
		ok: true,
		schemaVersion: 2,
		generatedAt: new Date().toISOString(),
		tokenizer: { model: "gpt-5", encoding: "o200k_base" },
		source: {
			directory: unixRel(promptsRoot),
			versions: {
				original: unixRel(promptsRoot),
				ultra: unixRel(resolve(promptsRoot, "Ultra")),
				wenyan: unixRel(resolve(promptsRoot, "wenyan-ultra")),
			},
			naming: "PROMPT_<TIPO>.md (Base/Ultra); wenyan-ultra conserva 0N-*.md",
		},
		prompts,
		comparativa: { totals: sumTotals(prompts) },
		resumenComparativo: {
			promptCodes: [...PATY_PROMPT_TIPOS],
			rows: prompts,
			totals: sumTotals(prompts),
		},
	};

	mkdirSync(dirname(outFile), { recursive: true });
	writeFileSync(outFile, JSON.stringify(data), "utf8");
	console.log(`[patyia:prompts] ${unixRel(outFile)} (${prompts.length} prompts)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	buildPatyPromptsJson();
}
