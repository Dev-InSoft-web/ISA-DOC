/**
 * Marca accentuationPunctuationCorrected en JSON con proofread previo.
 * Uso: npm run lab:yt:backfill-accentuation
 */
import { readFile, writeFile } from "node:fs/promises";
import { importLab } from "../../_shared/ensure-lab-build.mts";
import { listAllVideoJsonRefs } from "../lib/corpus-paths.ts";

const dryRun = process.argv.includes("--dry-run");
const { applyAccentuationPunctuationMark, isAccentuationPunctuationCorrected } = await importLab<{
	applyAccentuationPunctuationMark: (t: unknown, m: unknown) => unknown;
	isAccentuationPunctuationCorrected: (t: unknown) => boolean;
}>("src/lib/youtube/proofread/marks.js");

type VideoCorpusRecord = { videoId: string; transcript: Record<string, unknown> };

const refs = await listAllVideoJsonRefs();
let updated = 0;

for (const ref of refs) {
	const record = JSON.parse(await readFile(ref.jsonPath, "utf8")) as VideoCorpusRecord;
	const tr = record.transcript;
	if (tr.accentuationPunctuationCorrected === true) continue;
	if (!isAccentuationPunctuationCorrected(tr)) continue;

	record.transcript = applyAccentuationPunctuationMark(tr, {
		api: tr.proofreadApi,
		model: tr.proofreadModel,
		via: "langgraph-proofread",
	}) as typeof tr;
	if (!dryRun) await writeFile(ref.jsonPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
	updated += 1;
	console.log(`${dryRun ? "[dry] " : ""}${record.videoId}`);
}

console.log(`\n${updated} archivo(s) ${dryRun ? "pendientes" : "actualizados"}.`);
