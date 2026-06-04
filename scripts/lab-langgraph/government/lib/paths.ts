import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { labDataPath } from "../../_shared/isa-doc-root.ts";
export const GOV_BASE = labDataPath("vectorize/web/government");
export const GOV_PAGES = join(GOV_BASE, "pages");
export const GOV_PDFS = join(GOV_BASE, "pdfs");
export const GOV_MANIFEST = join(GOV_BASE, "manifest.json");

export function pageIdFromUrl(url: string): string {
	return createHash("sha256").update(url.trim()).digest("hex").slice(0, 16);
}

export function sanitizeCorpusSegment(corpus: string): string {
	const s = corpus
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9_-]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
	return s || "other";
}

/** Año para carpetas: fecha, fetchedAt, URL o `undated`. */
export function inferGovYear(record: {
	fecha?: string;
	fetchedAt?: string;
	url?: string;
}): string {
	if (record.fecha) {
		const m = record.fecha.match(/\b(20\d{2})\b/);
		if (m) return m[1]!;
	}
	if (record.fetchedAt && /^\d{4}/.test(record.fetchedAt)) {
		return record.fetchedAt.slice(0, 4);
	}
	if (record.url) {
		const m = record.url.match(/\/(20\d{2})\//) ?? record.url.match(/(?:^|[^0-9])(20\d{2})(?:[^0-9]|$)/);
		if (m) return m[1]!;
	}
	return "undated";
}

export type GovStoragePaths = {
	/** p. ej. `dian/2026` */
	rel: string;
	pageDir: string;
	pdfDir: string;
	jsonPath: string;
	mdPath: string;
	pdfPath: string;
	pdfRel: string;
};

export function resolveGovStorage(record: {
	pageId: string;
	corpus: string;
	fetchedAt?: string;
	fecha?: string;
	url?: string;
}): GovStoragePaths {
	const corpus = sanitizeCorpusSegment(record.corpus);
	const year = inferGovYear(record);
	const rel = `${corpus}/${year}`;
	return {
		rel,
		pageDir: join(GOV_PAGES, corpus, year),
		pdfDir: join(GOV_PDFS, corpus, year),
		jsonPath: join(GOV_PAGES, corpus, year, `${record.pageId}.json`),
		mdPath: join(GOV_PAGES, corpus, year, `${record.pageId}.md`),
		pdfPath: join(GOV_PDFS, corpus, year, `${record.pageId}.pdf`),
		pdfRel: `pdfs/${corpus}/${year}/${record.pageId}.pdf`,
	};
}

/** Busca JSON de página (plano o `corpus/año/`). */
export async function findGovPageJson(pageId: string): Promise<string | null> {
	const flat = join(GOV_PAGES, `${pageId}.json`);
	if (existsSync(flat)) return flat;

	for (const corpus of await readdir(GOV_PAGES).catch(() => [])) {
		const corpusDir = join(GOV_PAGES, corpus);
		if (!(await stat(corpusDir)).isDirectory()) continue;
		for (const year of await readdir(corpusDir)) {
			const p = join(corpusDir, year, `${pageId}.json`);
			if (existsSync(p)) return p;
		}
	}
	return null;
}

/** Todos los JSON bajo pages/ (recursivo). */
export async function listAllGovPageJson(): Promise<string[]> {
	const out: string[] = [];

	async function walk(dir: string): Promise<void> {
		let entries: string[];
		try {
			entries = await readdir(dir);
		} catch {
			return;
		}
		for (const name of entries) {
			const full = join(dir, name);
			const st = await stat(full);
			if (st.isDirectory()) {
				await walk(full);
			} else if (name.endsWith(".json")) {
				out.push(full);
			}
		}
	}

	await walk(GOV_PAGES);
	return out.sort();
}
