/**
 * Lote: marcas + puntuación/mayúsculas en todo el corpus ContaPyme (sin LLM).
 * Llama a lab-langgraph en :5500 — el servidor debe estar en marcha.
 *
 * Uso (desde ISA-DOC):
 *   npm run lab:yt:batch-punctuation
 *   npm run lab:yt:batch-punctuation -- --limit 10
 *   npm run lab:yt:batch-punctuation -- --dry-run --limit 5
 *   npm run lab:yt:batch-punctuation -- --force
 *   npm run lab:yt:batch-punctuation -- --api http://127.0.0.1:5500/api
 *
 * Opciones:
 *   --resume       Omitir JSON ya marcados (default)
 *   --no-resume    Procesar todos
 *   --force        Igual que --no-resume (también se envía al API)
 *   --limit N      Máximo N videos del listado
 *   --offset N     Saltar los primeros N del listado ordenado
 *   --dry-run      El API no escribe archivos
 *   --delay MS     Pausa entre peticiones
 *   --api BASE     Base API (default LAB_LANGGRAPH_API o http://localhost:5500/api)
 *   --videoId ID   Solo ese video (anula PILOT_VIDEO_ID)
 *
 * Verificación: PILOT_VIDEO_ID limita el lote a un solo video; pon null para todo el corpus.
 */
import { appendFile, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
	CORPUS_BASE,
	VIDEOS_ROOT,
	listAllVideoJsonRefs,
	resolveVideoArtifacts,
} from "../lib/corpus-paths.ts";

const BASE = CORPUS_BASE;
const DEFAULT_API = (process.env.LAB_LANGGRAPH_API ?? "http://localhost:5500/api").replace(/\/$/, "");

/** null = corpus completo */
const PILOT_VIDEO_ID: string | null = null;

type PunctuateResponse = {
	ok: boolean;
	videoId?: string;
	skipped?: boolean;
	segmentCount?: number;
	segmentsChanged?: number;
	reason?: string;
	error?: string;
};

function parseArgs(argv: string[]): {
	apiBase: string;
	force: boolean;
	dryRun: boolean;
	limit: number | null;
	offset: number;
	delayMs: number;
	skipCorrectedLocally: boolean;
	videoId: string | null;
} {
	let apiBase = DEFAULT_API;
	let force = false;
	let dryRun = false;
	let limit: number | null = null;
	let offset = 0;
	let delayMs = 0;
	let resume = true;
	let videoId: string | null = PILOT_VIDEO_ID;

	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i];
		if (a === "--force" || a === "--no-resume") {
			force = true;
			resume = false;
		} else if (a === "--resume") resume = true;
		else if (a === "--dry-run") dryRun = true;
		else if (a === "--limit" && argv[i + 1]) limit = Number(argv[++i]);
		else if (a === "--offset" && argv[i + 1]) offset = Number(argv[++i]);
		else if (a === "--delay" && argv[i + 1]) delayMs = Number(argv[++i]);
		else if (a === "--videoId" && argv[i + 1]) videoId = argv[++i]!.trim();
		else if (a === "--all") videoId = null;
		else if (a === "--api" && argv[i + 1]) {
			apiBase = argv[++i]!.replace(/\/$/, "");
		}
	}

	if (!resume) force = true;

	return {
		apiBase,
		force,
		dryRun,
		limit,
		offset,
		delayMs,
		skipCorrectedLocally: resume && !force,
		videoId,
	};
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

async function isAlreadyCorrected(videoId: string): Promise<boolean> {
	try {
		const jsonPath = (await resolveVideoArtifacts(videoId)).json;
		const record = JSON.parse(await readFile(jsonPath, "utf8")) as {
			transcript?: { accentuationPunctuationCorrected?: boolean; proofreadVersion?: number };
		};
		const t = record.transcript;
		if (!t) return false;
		if (t.accentuationPunctuationCorrected === true) return true;
		return (t.proofreadVersion ?? 0) >= 1;
	} catch {
		return false;
	}
}

async function ensureApiUp(apiBase: string): Promise<void> {
	const url = `${apiBase}/health`;
	const res = await fetch(url, { method: "GET" });
	if (!res.ok) {
		throw new Error(
			`lab-langgraph no responde en ${url} (${res.status}). Inicia: cd lab-langgraph && npm run start`,
		);
	}
}

async function punctuateViaApi(
	apiBase: string,
	videoId: string,
	opts: { force: boolean; dryRun: boolean },
): Promise<PunctuateResponse> {
	const q = new URLSearchParams({ videoId });
	if (opts.force) q.set("force", "true");
	if (opts.dryRun) q.set("dryRun", "true");
	const url = `${apiBase}/youtube/punctuate?${q}`;
	const res = await fetch(url, { method: "POST" });
	const body = (await res.json()) as PunctuateResponse;
	if (!res.ok) {
		throw new Error(body.error ?? `HTTP ${res.status}`);
	}
	if (!body.ok) {
		throw new Error(body.error ?? "respuesta ok=false");
	}
	return body;
}

const opts = parseArgs(process.argv.slice(2));
const logPath = join(BASE, "batch-accentuation-punctuation.log");
const summaryPath = join(BASE, "batch-accentuation-punctuation-summary.json");

const allRefs = await listAllVideoJsonRefs(VIDEOS_ROOT);

let batchRefs = allRefs;
if (opts.videoId) {
	const hit = allRefs.find((r) => r.videoId === opts.videoId);
	if (!hit) {
		console.error(`No existe videos/**/${opts.videoId}.json`);
		process.exit(1);
	}
	batchRefs = [hit];
}

const slice = batchRefs.slice(
	opts.offset,
	opts.limit != null ? opts.offset + opts.limit : undefined,
);

const startedAt = new Date().toISOString();
let processed = 0;
let skipped = 0;
let failed = 0;
let segmentsChangedTotal = 0;
const errors: Array<{ videoId: string; error: string }> = [];

console.log(`API: ${opts.apiBase}/youtube/punctuate`);
console.log(`Corpus: ${VIDEOS_ROOT}`);
if (opts.videoId) console.log(`Modo piloto: solo ${opts.videoId}`);
console.log(`Videos en lote: ${slice.length} / ${allRefs.length} (offset=${opts.offset})`);
if (opts.dryRun) console.log("Modo dry-run: el API no escribe archivos.");

await ensureApiUp(opts.apiBase);

await appendFile(
	logPath,
	`\n--- batch ${startedAt} · videos=${slice.length} api=${opts.apiBase} force=${opts.force} dryRun=${opts.dryRun} ---\n`,
);

for (const ref of slice) {
	const videoId = ref.videoId;
	try {
		if (opts.skipCorrectedLocally && (await isAlreadyCorrected(videoId))) {
			skipped += 1;
			console.log(`  skip ${videoId} (ya corregido, sin llamar API)`);
			await appendFile(logPath, `SKIP ${videoId} ya corregido (local)\n`);
			continue;
		}

		const result = await punctuateViaApi(opts.apiBase, videoId, {
			force: opts.force,
			dryRun: opts.dryRun,
		});

		if (result.skipped) {
			skipped += 1;
			console.log(`  skip ${videoId} (${result.reason ?? "—"})`);
			await appendFile(logPath, `SKIP ${videoId} ${result.reason ?? ""}\n`);
		} else {
			processed += 1;
			const changed = result.segmentsChanged ?? 0;
			segmentsChangedTotal += changed;
			console.log(
				`  ok   ${videoId} · ${changed}/${result.segmentCount ?? "?"} segmentos`,
			);
			await appendFile(
				logPath,
				`OK ${videoId} changed=${changed}/${result.segmentCount ?? "?"}\n`,
			);
		}
	} catch (e) {
		failed += 1;
		const msg = e instanceof Error ? e.message : String(e);
		errors.push({ videoId, error: msg });
		console.error(`  FAIL ${videoId}: ${msg}`);
		await appendFile(logPath, `FAIL ${videoId} ${msg}\n`);
	}
	if (opts.delayMs > 0) await sleep(opts.delayMs);
}

const summary = {
	startedAt,
	finishedAt: new Date().toISOString(),
	videosDir: VIDEOS_ROOT,
	totalInDir: allRefs.length,
	apiBase: opts.apiBase,
	inBatch: slice.length,
	processed,
	skipped,
	failed,
	segmentsChangedTotal,
	opts,
	errors,
};

if (!opts.dryRun) {
	await writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
}

console.log(
	`\nListo: ${processed} procesados, ${skipped} omitidos, ${failed} errores · segmentos tocados: ${segmentsChangedTotal}`,
);
if (!opts.dryRun) console.log(`Resumen: ${summaryPath}`);
console.log(`Log: ${logPath}`);

if (failed > 0) process.exit(1);
