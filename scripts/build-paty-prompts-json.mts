import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { encode } from "gpt-tokenizer/model/gpt-5";

type VersionKey = "original" | "ultra" | "wenyan";
type Count = { chars: number; tokens: number };
type CountWithPct = Count & { tokenPctOfOriginal: number };
type PromptStats = {
	index: number;
	number: number;
	numberText: string;
	slug: string;
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

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const promptsRoot = resolve(root, "src", "lib", "patyia", "prompts");
const outFile = resolve(root, "public", "static-api", "patyia", "prompts", "comparativa.json");

function unixRel(path: string): string {
	return relative(root, path).replaceAll("\\", "/");
}

function parsePromptFile(file: string): { number: number; numberText: string; slug: string; code: string; title: string } {
	const match = /^(\d+)-(.+)\.md$/.exec(file);
	if (!match) throw new Error(`Nombre de prompt invalido: ${file}`);
	const [, numberText, slug] = match;
	const code = slug.toUpperCase().replaceAll("-", "_");
	return { number: Number(numberText), numberText, slug, code, title: `${numberText}. ${code}` };
}

function versionPath(version: VersionKey, file: string): string {
	if (version === "original") return resolve(promptsRoot, file);
	if (version === "ultra") return resolve(promptsRoot, "ultra", file);
	return resolve(promptsRoot, "wenyan-ultra", file);
}

function readVersion(version: VersionKey, file: string): { path: string; text: string } {
	const path = versionPath(version, file);
	if (!existsSync(path)) throw new Error(`No existe ${unixRel(path)}`);
	return { path, text: readFileSync(path, "utf8") };
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

function promptStats(file: string, index: number): PromptStats {
	const meta = parsePromptFile(file);
	const original = readVersion("original", file);
	const ultra = readVersion("ultra", file);
	const wenyan = readVersion("wenyan", file);
	const originalCount = count(original.text);
	const ultraCount = count(ultra.text);
	const wenyanCount = count(wenyan.text);

	return {
		index,
		...meta,
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
	const original = prompts.reduce<Count>((acc, prompt) => ({
		chars: acc.chars + prompt.versions.original.chars,
		tokens: acc.tokens + prompt.versions.original.tokens,
	}), { chars: 0, tokens: 0 });
	const ultra = prompts.reduce<Count>((acc, prompt) => ({
		chars: acc.chars + prompt.versions.ultra.chars,
		tokens: acc.tokens + prompt.versions.ultra.tokens,
	}), { chars: 0, tokens: 0 });
	const wenyan = prompts.reduce<Count>((acc, prompt) => ({
		chars: acc.chars + prompt.versions.wenyan.chars,
		tokens: acc.tokens + prompt.versions.wenyan.tokens,
	}), { chars: 0, tokens: 0 });

	return {
		original: withPct(original, original.tokens),
		ultra: withPct(ultra, original.tokens),
		wenyan: withPct(wenyan, original.tokens),
	};
}

export function buildPatyPromptsJson(): void {
	const files = readdirSync(promptsRoot)
		.filter((file) => /^(\d+)-.+\.md$/.test(file))
		.sort((a, b) => parsePromptFile(a).number - parsePromptFile(b).number);
	const prompts = files.map(promptStats);
	const resumenPrompts = prompts.filter((prompt) => prompt.number !== 91);
	const data = {
		ok: true,
		schemaVersion: 1,
		generatedAt: new Date().toISOString(),
		tokenizer: { model: "gpt-5", encoding: "o200k_base" },
		source: {
			directory: unixRel(promptsRoot),
			versions: {
				original: unixRel(promptsRoot),
				ultra: unixRel(resolve(promptsRoot, "ultra")),
				wenyan: unixRel(resolve(promptsRoot, "wenyan-ultra")),
			},
		},
		prompts,
		comparativa: {
			totals: sumTotals(prompts),
		},
		resumenComparativo: {
			excludedNumbers: [91],
			promptNumbers: resumenPrompts.map((prompt) => prompt.number),
			rows: resumenPrompts,
			totals: sumTotals(resumenPrompts),
		},
	};

	mkdirSync(dirname(outFile), { recursive: true });
	writeFileSync(outFile, JSON.stringify(data), "utf8");
	console.log(`[patyia:prompts] ${unixRel(outFile)} (${prompts.length} prompts)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	buildPatyPromptsJson();
}