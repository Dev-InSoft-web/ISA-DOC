import type { GovPdfImageRef } from "../../government/lib/crawl.ts";

export const PLANES_SCHEMA_VERSION = 1;

export type PlanesDocStatus = "pending" | "fetched" | "error" | "skipped" | "unsupported";

export interface PlanesLinkRecord {
	schemaVersion: typeof PLANES_SCHEMA_VERSION;
	docId: string;
	url: string;
	status: PlanesDocStatus;
	ext?: string;
	updatedAt: string;
	error?: string;
	skipReason?: string;
}

export interface PlanesDocRecord {
	schemaVersion: typeof PLANES_SCHEMA_VERSION;
	docId: string;
	url: string;
	title: string;
	ext: string;
	year: string;
	source: "CAPAC_ATRIBUTOS_PLANES";
	fetchedAt: string;
	content: { markdown: string; plainText: string };
	sections?: Array<{ heading: string; text: string }>;
	rawPath?: string;
	images?: GovPdfImageRef[];
}

export interface PlanesManifest {
	schemaVersion: typeof PLANES_SCHEMA_VERSION;
	startedAt: string;
	updatedAt: string;
	stats: {
		total: number;
		fetched: number;
		skipped: number;
		errors: number;
		unsupported: number;
	};
}
