/**
 * Estado del corpus listo para vectorizar (solo lectura).
 * Uso: npx tsx scripts/lab-langgraph/audit-vectorize-status.mts
 */
import { existsSync } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { CONTENT_KINDS, CORPUS_BASE } from "./youtube/lib/corpus-paths.ts";
import { CORPUS_SCHEMA_VERSION, type VideoCorpusRecord } from "./youtube/lib/types.ts";
import { listWhisperJobs } from "./youtube/whisper/fallback-core.ts";
import { GOV_BASE, GOV_PAGES, GOV_PDFS, listAllGovPageJson, resolveGovStorage } from "./government/lib/paths.ts";
import type { GovPageRecord } from "./government/lib/crawl.ts";

type YtStats = {
	total: number;
	withSegments: number;
	noSegments: number;
	accentOk: number;
	proofreadPending: number;
	byKind: Record<string, { total: number; noSeg: number; accentPending: number }>;
};

async function auditYoutube(): Promise<YtStats> {
	const s: YtStats = {
		total: 0,
		withSegments: 0,
		noSegments: 0,
		accentOk: 0,
		proofreadPending: 0,
		byKind: {},
	};
	for (const kind of CONTENT_KINDS) {
		s.byKind[kind] = { total: 0, noSeg: 0, accentPending: 0 };
		const root = join(CORPUS_BASE, kind);
		let years: string[];
		try {
			years = await readdir(root);
		} catch {
			continue;
		}
		for (const year of years) {
			const yearDir = join(root, year);
			try {
				if (!(await stat(yearDir)).isDirectory()) continue;
			} catch {
				continue;
			}
			for (const name of await readdir(yearDir)) {
				if (!name.endsWith(".json") || name.includes(".info.")) continue;
				const record = JSON.parse(
					await readFile(join(yearDir, name), "utf8"),
				) as VideoCorpusRecord;
				if (record.schemaVersion !== CORPUS_SCHEMA_VERSION) continue;
				s.total += 1;
				s.byKind[kind]!.total += 1;
				const segs = record.transcript?.segmentCount ?? 0;
				if (segs > 0) s.withSegments += 1;
				else {
					s.noSegments += 1;
					s.byKind[kind]!.noSeg += 1;
				}
				const t = record.transcript ?? {};
				const accent =
					t.accentuationPunctuationCorrected === true || (t.proofreadVersion ?? 0) > 0;
				if (accent) s.accentOk += 1;
				else if (segs > 0) {
					s.proofreadPending += 1;
					s.byKind[kind]!.accentPending += 1;
				}
			}
		}
	}
	return s;
}

async function auditGovPdfs(): Promise<{
	pdfPages: number;
	withPdfFile: number;
	mdWithImgbb: number;
	mdNoImgbb: number;
	noMd: number;
	pendingConvert: number;
}> {
	let pdfPages = 0;
	let withPdfFile = 0;
	let mdWithImgbb = 0;
	let mdNoImgbb = 0;
	let noMd = 0;
	let pendingConvert = 0;

	for (const jsonPath of await listAllGovPageJson()) {
		const record = JSON.parse(await readFile(jsonPath, "utf8")) as GovPageRecord;
		const isPdf =
			record.url?.toLowerCase().includes(".pdf") ||
			record.tipo === "normativa" ||
			!!record.pdfPath;
		if (!isPdf) continue;
		pdfPages += 1;
		const storage = resolveGovStorage(record);
		const hasPdf = existsSync(storage.pdfPath);
		if (hasPdf) withPdfFile += 1;
		const hasMd = existsSync(storage.mdPath);
		if (!hasMd) {
			noMd += 1;
			if (hasPdf) pendingConvert += 1;
			continue;
		}
		const md = await readFile(storage.mdPath, "utf8");
		if (/i\.imgbb\.com|imgbb\.com/i.test(md)) mdWithImgbb += 1;
		else mdNoImgbb += 1;
	}
	return { pdfPages, withPdfFile, mdWithImgbb, mdNoImgbb, noMd, pendingConvert };
}

async function auditGovHtml(): Promise<{ pages: number; withMd: number }> {
	let pages = 0;
	let withMd = 0;
	for (const jsonPath of await listAllGovPageJson()) {
		const record = JSON.parse(await readFile(jsonPath, "utf8")) as GovPageRecord;
		const isPdf =
			record.url?.toLowerCase().includes(".pdf") ||
			record.tipo === "normativa" ||
			!!record.pdfPath;
		if (isPdf) continue;
		pages += 1;
		if (existsSync(resolveGovStorage(record).mdPath)) withMd += 1;
	}
	return { pages, withMd };
}

const yt = await auditYoutube();
const whisperPending = (await listWhisperJobs()).length;

let manifestYt: { videoCount?: number } = {};
try {
	manifestYt = JSON.parse(await readFile(join(CORPUS_BASE, "manifest.json"), "utf8"));
} catch {
	/* */
}

let manifestGov: { pageCount?: number } = {};
try {
	manifestGov = JSON.parse(await readFile(join(GOV_BASE, "manifest.json"), "utf8"));
} catch {
	/* */
}

const govPdf = await auditGovPdfs();
const govHtml = await auditGovHtml();

let whisperStatsOk = 0;
try {
	const ws = JSON.parse(
		await readFile(join(CORPUS_BASE, "whisper-stats.json"), "utf8"),
	) as { videosOk?: number };
	whisperStatsOk = ws.videosOk ?? 0;
} catch {
	/* */
}

console.log("═══ Estado vectorización (lab-langgraph data/vectorize) ═══\n");

console.log("## YouTube · contapyme-software-contable");
console.log(`  JSON en disco:        ${yt.total} (manifest: ${manifestYt.videoCount ?? "?"})`);
console.log(`  Con transcripción:    ${yt.withSegments} (segmentCount > 0)`);
console.log(`  Sin transcripción:    ${yt.noSegments}`);
console.log(`  Whisper pendiente:    ${whisperPending} (mismo criterio que whisper-resume)`);
console.log(`  whisper-stats ok:     ${whisperStatsOk} videos transcritos por Groq`);
console.log(`  Proofread/accent OK:  ${yt.accentOk}`);
console.log(`  Pendiente tildes/pon: ${yt.proofreadPending} (tienen segmentos, sin accentuationPunctuationCorrected)`);
for (const kind of CONTENT_KINDS) {
	const k = yt.byKind[kind]!;
	if (!k.total) continue;
	console.log(
		`    ${kind}: ${k.total} total · sin seg ${k.noSeg} · accent pendiente ${k.accentPending}`,
	);
}

console.log("\n## Web · government");
console.log(`  Páginas (manifest):   ${manifestGov.pageCount ?? "?"}`);
console.log(`  HTML (no PDF):        ${govHtml.pages} · con .md ${govHtml.withMd}`);
console.log(`  Entradas PDF:         ${govPdf.pdfPages}`);
console.log(`  Con archivo .pdf:     ${govPdf.withPdfFile}`);
console.log(`  MD con ImgBB:         ${govPdf.mdWithImgbb}`);
console.log(`  MD sin ImgBB:         ${govPdf.mdNoImgbb}`);
console.log(`  Sin .md:              ${govPdf.noMd}`);
console.log(`  PDF→MD pendiente:     ${govPdf.pendingConvert}`);

const ytReady = whisperPending === 0 && yt.proofreadPending === 0;
const govReady = govPdf.pendingConvert === 0 && govPdf.mdNoImgbb === 0;

console.log("\n## ¿Listo para index-rag?");
console.log(`  YouTube:  ${ytReady ? "SÍ" : "NO"} (whisper=${whisperPending}, proofread=${yt.proofreadPending})`);
console.log(
	`  Gobierno: ${govReady ? "SÍ" : "NO"} (convert=${govPdf.pendingConvert}, md sin imgbb=${govPdf.mdNoImgbb})`,
);
console.log("\nComandos: lab:yt:whisper-resume · lab:yt:proofread-resume · lab:gov:convert-pdfs");
console.log("         lab:yt:index-rag · lab:gov:index-rag");
