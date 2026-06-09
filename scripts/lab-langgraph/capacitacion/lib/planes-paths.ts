import { createHash } from "node:crypto";
import { join } from "node:path";
import { PLANES_PAGES_DIR, PLANES_RAW_DIR } from "./corpus-paths.ts";

export function docIdFromUrl(url: string): string {
	return createHash("sha256").update(url.trim()).digest("hex").slice(0, 16);
}

export function inferDocYear(url: string): string {
	const m = url.match(/\/(20\d{2})\//) ?? url.match(/(?:^|[^0-9])(20\d{2})(?:[^0-9]|$)/);
	return m?.[1] ?? "undated";
}

export function inferExt(url: string, contentType?: string): string {
	const path = url.split("?")[0] ?? url;
	const dot = path.lastIndexOf(".");
	if (dot >= 0) {
		const ext = path.slice(dot + 1).toLowerCase();
		if (ext && ext.length <= 6) return ext;
	}
	if (contentType?.includes("pdf")) return "pdf";
	if (contentType?.includes("presentation") || contentType?.includes("powerpoint")) return "pptx";
	if (contentType?.includes("spreadsheet") || contentType?.includes("excel")) return "xlsx";
	if (contentType?.includes("zip")) return "zip";
	return "bin";
}

export type PlanesStoragePaths = {
	year: string;
	docId: string;
	rawDir: string;
	rawPath: string;
	pageDir: string;
	jsonPath: string;
	mdPath: string;
};

export function resolvePlanesStorage(url: string, docId?: string, ext = "bin"): PlanesStoragePaths {
	const id = docId ?? docIdFromUrl(url);
	const year = inferDocYear(url);
	return {
		year,
		docId: id,
		rawDir: join(PLANES_RAW_DIR, year),
		rawPath: join(PLANES_RAW_DIR, year, `${id}.${ext}`),
		pageDir: join(PLANES_PAGES_DIR, year),
		jsonPath: join(PLANES_PAGES_DIR, year, `${id}.json`),
		mdPath: join(PLANES_PAGES_DIR, year, `${id}.md`),
	};
}

export function titleFromDocUrl(url: string): string {
	const path = decodeURIComponent((url.split("?")[0] ?? url).split("/").pop() ?? "documento");
	return path.replace(/\.[a-z0-9]+$/i, "").replace(/[-_+%]+/g, " ").trim() || "Documento";
}
