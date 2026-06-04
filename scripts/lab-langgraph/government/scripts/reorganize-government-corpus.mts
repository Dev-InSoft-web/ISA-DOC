/**
 * Mueve pages/* y pdfs/* a `{corpus}/{año}/` y regenera .md convencional.
 *
 * Uso: npm run lab:gov:reorganize
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { savePage, type GovPageRecord } from "../lib/crawl.ts";
import {
	GOV_PAGES,
	GOV_PDFS,
	listAllGovPageJson,
	resolveGovStorage,
} from "../lib/paths.ts";

async function listFlatPdfIds(): Promise<string[]> {
	try {
		return (await readdir(GOV_PDFS)).filter((n) => n.endsWith(".pdf")).map((n) => basename(n, ".pdf"));
	} catch {
		return [];
	}
}

async function removeEmptyDir(dir: string): Promise<void> {
	try {
		const entries = await readdir(dir);
		if (entries.length > 0) return;
		await rm(dir, { recursive: true });
	} catch {
		/* */
	}
}

let moved = 0;
let regenerated = 0;

async function migrateRecord(record: GovPageRecord, jsonPath: string): Promise<void> {
	const paths = resolveGovStorage(record);
	record.storageRel = paths.rel;
	if (record.pdfPath || record.tipo === "normativa") {
		const flatPdf = join(GOV_PDFS, `${record.pageId}.pdf`);
		if (existsSync(flatPdf)) {
			await mkdir(paths.pdfDir, { recursive: true });
			if (!existsSync(paths.pdfPath)) await rename(flatPdf, paths.pdfPath);
			record.pdfPath = paths.pdfRel;
		} else if (existsSync(paths.pdfPath)) {
			record.pdfPath = paths.pdfRel;
		}
	}

	const oldDir = dirname(jsonPath);
	const isAlready = jsonPath === paths.jsonPath;

	if (!isAlready) {
		await mkdir(paths.pageDir, { recursive: true });
		if (existsSync(paths.jsonPath)) await rm(paths.jsonPath);
		if (existsSync(paths.mdPath)) await rm(paths.mdPath);
		await rename(jsonPath, paths.jsonPath);
		const oldMd = join(oldDir, `${record.pageId}.md`);
		if (existsSync(oldMd) && oldMd !== paths.mdPath) await rm(oldMd);
		moved += 1;
	}

	await savePage(record);
	regenerated += 1;
}

const jsonFiles = await listAllGovPageJson();
console.log(`Registros JSON: ${jsonFiles.length}`);

for (const jsonPath of jsonFiles) {
	const record = JSON.parse(await readFile(jsonPath, "utf8")) as GovPageRecord;
	await migrateRecord(record, jsonPath);
}

for (const pageId of await listFlatPdfIds()) {
	const paths = resolveGovStorage({
		pageId,
		corpus: "dian",
		fetchedAt: new Date().toISOString(),
	});
	const flat = join(GOV_PDFS, `${pageId}.pdf`);
	if (!existsSync(flat)) continue;
	const { findGovPageJson } = await import("../lib/paths.ts");
	const json = await findGovPageJson(pageId);
	if (json) continue;
	await mkdir(paths.pdfDir, { recursive: true });
	if (!existsSync(paths.pdfPath)) {
		await rename(flat, paths.pdfPath);
		console.log(`  pdf huérfano → ${paths.pdfRel}`);
	}
}

const flatJson = (await readdir(GOV_PAGES).catch(() => [])).filter((n) => n.endsWith(".json"));
for (const name of flatJson) {
	const p = join(GOV_PAGES, name);
	const st = await stat(p);
	if (st.isFile()) await rm(p);
}
const flatMd = (await readdir(GOV_PAGES).catch(() => [])).filter((n) => n.endsWith(".md"));
for (const name of flatMd) {
	await rm(join(GOV_PAGES, name));
}

await removeEmptyDir(GOV_PDFS);

console.log(`\nListo · movidos=${moved} · md regenerados=${regenerated}`);
