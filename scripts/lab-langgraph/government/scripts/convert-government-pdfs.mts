/**
 * Reconvierte PDFs → pages/{corpus}/{año}/{pageId}.json + .md
 *
 * Uso:
 *   npm run lab:gov:convert-pdfs
 *   npm run lab:gov:convert-pdfs -- --limit 5
 */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import { savePage, type GovPageRecord } from "../lib/crawl.ts";
import { convertPdfFileToRecord } from "../lib/pdf-to-md.ts";
import { listAllGovPageJson, resolveGovStorage } from "../lib/paths.ts";

loadLabEnv();

function parseArgs(argv: string[]): {
	limit: number | null;
	dryRun: boolean;
	noUpload: boolean;
	pageId: string | null;
} {
	let limit: number | null = null;
	let dryRun = false;
	let noUpload = false;
	let pageId: string | null = null;
	for (let i = 0; i < argv.length; i += 1) {
		if (argv[i] === "--limit" && argv[i + 1]) limit = Number(argv[++i]);
		else if (argv[i] === "--dry-run") dryRun = true;
		else if (argv[i] === "--no-upload") noUpload = true;
		else if (argv[i] === "--page-id" && argv[i + 1]) pageId = argv[++i]!;
	}
	return { limit, dryRun, noUpload, pageId };
}

const opts = parseArgs(process.argv.slice(2));
const uploadImages = !opts.noUpload && process.env.GOV_PDF_NO_IMGBB !== "1";

async function listPdfJobs(): Promise<Array<{ pageId: string; record: GovPageRecord; pdfPath: string }>> {
	const jobs: Array<{ pageId: string; record: GovPageRecord; pdfPath: string }> = [];
	for (const jsonPath of await listAllGovPageJson()) {
		const record = JSON.parse(await readFile(jsonPath, "utf8")) as GovPageRecord;
		const pageId = record.pageId;
		if (opts.pageId && pageId !== opts.pageId) continue;
		const isPdf =
			record.url?.toLowerCase().includes(".pdf") ||
			record.tipo === "normativa" ||
			!!record.pdfPath;
		if (!isPdf) continue;
		const storage = resolveGovStorage(record);
		if (!existsSync(storage.pdfPath)) continue;
		jobs.push({ pageId, record, pdfPath: storage.pdfPath });
	}
	return jobs.sort((a, b) => a.pageId.localeCompare(b.pageId));
}

const jobs = await listPdfJobs();
let done = 0;
let ok = 0;
let skip = 0;

console.log(
	`PDFs con página+archivo: ${jobs.length} · uploadImages=${uploadImages} · dryRun=${opts.dryRun}`,
);

for (const { pageId, record, pdfPath } of jobs) {
	if (opts.limit != null && done >= opts.limit) break;
	done += 1;

	try {
		const updated = await convertPdfFileToRecord(
			pdfPath,
			{
				url: record.url,
				corpus: record.corpus,
				audience: record.audience,
				fetchedAt: record.fetchedAt,
			},
			{ uploadImages, dryRun: opts.dryRun },
		);
		if (!updated) {
			console.log(`  empty ${pageId}`);
			skip += 1;
			continue;
		}
		if (!opts.dryRun) await savePage(updated);
		console.log(
			`  ok    ${updated.storageRel ?? "?"}/${pageId} · ${updated.sections?.length ?? 0} § · ${updated.images?.length ?? 0} img`,
		);
		ok += 1;
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		console.error(`  FAIL  ${pageId}: ${msg}`);
		skip += 1;
	}
}

console.log(`\nListo · ok=${ok} skip=${skip} · procesados=${done}`);
