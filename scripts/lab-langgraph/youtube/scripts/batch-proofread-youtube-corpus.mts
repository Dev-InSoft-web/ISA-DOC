/**
 * Lote LangGraph: tildes, puntuación y marcas (Groq → MiniMax; sin OpenAI por defecto).
 * Omite JSON ya marcados con accentuationPunctuationCorrected / proofreadVersion.
 *
 * Uso (desde ISA-DOC):
 *   npm run lab:yt:batch-proofread -- --limit 1
 *   npm run lab:yt:batch-proofread -- --videoId HnWEfL_i8Lg
 *   npm run lab:yt:batch-proofread -- --all
 *   npm run lab:yt:proofread-resume
 *
 * Opciones:
 *   --resume       Omitir ya corregidos (default)
 *   --no-resume    Reprocesar todos del listado
 *   --force        Igual que --no-resume
 *   --limit N      Máximo N videos
 *   --offset N     Saltar los primeros N del listado
 *   --delay MS     Pausa entre videos (default 0)
 *   --videoId ID   Solo ese video
 *   --allow-openai Permite OpenAI si Groq y MiniMax fallan
 */
import { appendFile, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { resolve } from "node:path";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import { labLanggraphBaseUrl, proofreadVideoViaLab } from "../../_shared/lab-api-client.ts";
import { capRetryWaitMs, MAX_RETRY_WAIT_MS } from "../../_shared/retry-wait.ts";
import {
	CORPUS_BASE,
	listAllVideoJsonRefs,
	resolveVideoArtifacts,
	sortVideoJsonRefs,
	type VideoJsonRef,
} from "../lib/corpus-paths.ts";
import type { CaptionSegment, VideoCorpusRecord } from "../lib/types.ts";

loadLabEnv();

function isPlausibleProofreadFix(original: string, fixed: string, _brands?: string[]): boolean {
	const o = original.trim();
	const f = fixed.trim();
	if (!f || f === o) return true;
	if (f.length < o.length * 0.35) return false;
	if (f.length > o.length * 2.8) return false;
	return true;
}

function parseArgs(argv: string[]) {
	let limit: number | null = 1;
	let offset = 0;
	let delayMs = 0;
	let resume = true;
	let videoId: string | null = null;
	let allowOpenAi = false;

	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i];
		if (a === "--all") limit = null;
		else if (a === "--force" || a === "--no-resume") resume = false;
		else if (a === "--resume") resume = true;
		else if (a === "--allow-openai") allowOpenAi = true;
		else if (a === "--limit" && argv[i + 1]) limit = Number(argv[++i]);
		else if (a === "--offset" && argv[i + 1]) offset = Number(argv[++i]);
		else if (a === "--delay" && argv[i + 1]) delayMs = Number(argv[++i]);
		else if (a === "--videoId" && argv[i + 1]) videoId = argv[++i]!.trim();
	}

	return { limit, offset, delayMs, resume, videoId, allowOpenAi, force: !resume };
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

function formatSegTime(ms: number | undefined): string {
	if (ms == null || !Number.isFinite(ms)) return "??:??";
	const s = Math.floor(ms / 1000);
	const m = Math.floor(s / 60);
	const sec = s % 60;
	return `${m}:${String(sec).padStart(2, "0")}`;
}

function logProofreadComparisons(
	vid: string,
	kind: string,
	year: string,
	before: CaptionSegment[],
	after: CaptionSegment[],
): string {
	const lines: string[] = [
		`\n  ══ Comparación ${vid} (${kind}/${year}) ══`,
		"  (mismo índice [N] = mismo renglón en transcript.segments; no se cruzan líneas)",
	];
	let changed = 0;
	const n = Math.max(before.length, after.length);
	for (let i = 0; i < n; i += 1) {
		const a = (before[i]?.text ?? "").trim();
		const b = (after[i]?.text ?? "").trim();
		if (a === b) continue;
		changed += 1;
		const t = formatSegTime(before[i]?.startMs);
		const rewrite = !isPlausibleProofreadFix(a, b, ["ContaPyme", "AgroWin", "INSOFT"]);
		lines.push(`  [${i}] @${t}${rewrite ? " ⚠ reescritura (no debería guardarse con validador activo)" : ""}`);
		lines.push(`  [${i}] ANTES : ${a}`);
		lines.push(`  [${i}] DESPUÉS: ${b}`);
		lines.push("");
	}
	if (!changed) lines.push("  (sin cambios de texto en segmentos)");
	else lines.push(`  → ${changed} renglón(es) distinto(s)`);
	const block = lines.join("\n");
	console.log(block);
	return block;
}

async function loadRecord(videoId: string): Promise<VideoCorpusRecord> {
	const { json: jsonPath } = await resolveVideoArtifacts(videoId);
	return JSON.parse(await readFile(jsonPath, "utf8")) as VideoCorpusRecord;
}

async function listRefsForBatch(
	refs: VideoJsonRef[],
	resume: boolean,
): Promise<VideoJsonRef[]> {
	const sorted = sortVideoJsonRefs(refs);
	if (!resume) return sorted;
	const pending: VideoJsonRef[] = [];
	for (const ref of sorted) {
		const st = await isPending(ref.videoId);
		if (st.pending) pending.push(ref);
	}
	return pending;
}

async function isPending(videoId: string): Promise<{ pending: boolean; segs: number; reason?: string }> {
	try {
		const { json: jsonPath } = await resolveVideoArtifacts(videoId);
		const record = JSON.parse(await readFile(jsonPath, "utf8")) as VideoCorpusRecord;
		const segs = record.transcript?.segments?.length ?? 0;
		if (!segs) return { pending: false, segs: 0, reason: "sin segmentos" };
		const t = record.transcript;
		if (t.accentuationPunctuationCorrected === true) {
			return { pending: false, segs, reason: "ya corregido" };
		}
		if ((t.proofreadVersion ?? 0) >= 1) {
			return { pending: false, segs, reason: "proofreadVersion" };
		}
		return { pending: true, segs };
	} catch {
		return { pending: false, segs: 0, reason: "no encontrado" };
	}
}

const opts = parseArgs(process.argv.slice(2));
const isResumeMode = process.argv[1]?.includes("proofread-resume");
if (isResumeMode) {
	opts.limit = null;
	opts.resume = true;
}

const logPath = join(CORPUS_BASE, "batch-proofread.log");
const summaryPath = join(CORPUS_BASE, "batch-proofread-summary.json");

const allRefs = await listAllVideoJsonRefs();
let refs = allRefs;
if (opts.videoId) {
	const hit = allRefs.find((r) => r.videoId === opts.videoId);
	if (!hit) {
		console.error(`No existe ${opts.videoId} en corpus`);
		process.exit(1);
	}
	refs = [hit];
}

const ordered = await listRefsForBatch(refs, opts.resume);
const slice = ordered.slice(
	opts.offset,
	opts.limit != null ? opts.offset + opts.limit : undefined,
);

const pendingByKind = { videos: 0, streams: 0, shorts: 0 };
for (const ref of ordered) {
	pendingByKind[ref.kind] += 1;
}

console.log(`Corpus: ${CORPUS_BASE}`);
console.log(`Orden: videos → streams → shorts (solo pendientes si --resume)`);
console.log(
	`Pendientes: videos=${pendingByKind.videos} · streams=${pendingByKind.streams} · shorts=${pendingByKind.shorts}`,
);
console.log(`Lab LangGraph: ${labLanggraphBaseUrl()}`);
console.log(`Modo: proofread vía API · orquestador PG en servidor (Groq→Cerebras→MiniMax)`);
console.log(`Videos en lote: ${slice.length} / ${refs.length} (offset=${opts.offset})`);
if (opts.limit === 1 && !opts.videoId) {
	console.log("Piloto: --limit 1 (pasa la prueba y relanza con --all o lab:yt:proofread-resume)");
}

const startedAt = new Date().toISOString();
let processed = 0;
let skipped = 0;
let failed = 0;
let segmentsChangedTotal = 0;
const errors: Array<{ videoId: string; error: string }> = [];

await appendFile(logPath, `\n--- batch-proofread ${startedAt} n=${slice.length} ---\n`);

for (const ref of slice) {
	const vid = ref.videoId;
	let segmentsBefore: CaptionSegment[] = [];

	console.log(`\n▶ proofread ${vid} (${ref.kind}/${ref.year})`);
	let corpusJsonPath: string | undefined;
	try {
		const beforeRecord = await loadRecord(vid);
		const { json } = await resolveVideoArtifacts(vid);
		corpusJsonPath = resolve(json);
		segmentsBefore = beforeRecord.transcript.segments.map((s) => ({ ...s }));
		console.log(`  segmentos: ${segmentsBefore.length}`);
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		skipped += 1;
		console.log(`  skip ${vid} (${msg})`);
		await appendFile(logPath, `SKIP ${vid} ${msg}\n`);
		continue;
	}

	let attempt = 0;
	while (true) {
		attempt += 1;
		const result = await proofreadVideoViaLab({
			videoId: vid,
			force: opts.force,
			allowOpenAi: opts.allowOpenAi,
			corpusJsonPath,
		});
		if (result.ok) {
			if ("skipped" in result && result.skipped) {
				skipped += 1;
				console.log(`  skip ${vid} (API: ya corregido)`);
				await appendFile(logPath, `SKIP ${vid} api-skipped\n`);
			} else {
				processed += 1;
				const changed = result.segmentsChanged ?? 0;
				segmentsChangedTotal += changed;
				console.log(
					`  ok   ${vid} · ${changed} segmentos · ${result.provider ?? "?"}/${result.model ?? "?"}`,
				);
				const compareBlock = logProofreadComparisons(
					vid,
					ref.kind,
					ref.year,
					segmentsBefore,
					(await loadRecord(vid)).transcript.segments,
				);
				await appendFile(
					logPath,
					`OK ${vid} changed=${result.segmentsChanged} ${result.provider}\n${compareBlock}\n`,
				);
			}
			break;
		}

		const waitMs = capRetryWaitMs(MAX_RETRY_WAIT_MS);
		console.log(`  retry ${vid} intento ${attempt} · espera ${waitMs / 1000}s (cascada reinicia):`);
		const attempts = "providerAttempts" in result ? result.providerAttempts : undefined;
		if (attempts?.length) {
			for (const a of attempts) {
				console.log(`    ${a.api}: ${a.error.slice(0, 220)}`);
			}
		} else {
			console.log(`    ${result.error.slice(0, 200)}`);
		}
		const logLine =
			attempts?.map((a) => `${a.api}=${a.error.slice(0, 80)}`).join(" | ") ??
			result.error.slice(0, 200);
		await appendFile(logPath, `RETRY ${vid} ${logLine}\n`);
		await sleep(waitMs);
	}

	if (opts.delayMs > 0) await sleep(opts.delayMs);
}

const summary = {
	startedAt,
	finishedAt: new Date().toISOString(),
	totalInCorpus: refs.length,
	inBatch: slice.length,
	processed,
	skipped,
	failed,
	segmentsChangedTotal,
	opts,
	errors,
};

await writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(
	`\nListo: ${processed} procesados, ${skipped} omitidos, ${failed} errores · segmentos tocados: ${segmentsChangedTotal}`,
);
console.log(`Resumen: ${summaryPath}`);
console.log(`Log: ${logPath}`);

if (failed > 0) process.exit(1);
