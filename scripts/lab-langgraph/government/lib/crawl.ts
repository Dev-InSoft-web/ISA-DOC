import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import {
	GOV_BASE,
	GOV_MANIFEST,
	GOV_PAGES,
	GOV_PDFS,
	pageIdFromUrl,
	resolveGovStorage,
} from "./paths.ts";
import {
	absolutizeGovRecordContent,
	normalizeGovMarkdown,
	splitMdSections,
	stripLegacyContentHeader,
	yamlScalar,
} from "./markdown.ts";

export { GOV_BASE, GOV_MANIFEST, GOV_PAGES, GOV_PDFS, pageIdFromUrl } from "./paths.ts";

export type GovSeedConfig = {
	allowDomains: string[];
	maxDepth: number;
	maxPages: number;
	delayMs: number;
	userAgent: string;
	audience?: string;
	pathKeywords?: string[];
	seeds: Array<{ url: string; corpus?: string }>;
};

export type GovManifest = {
	startedAt: string;
	updatedAt: string;
	visited: Record<string, { status: string; at: string; title?: string }>;
	queue: Array<{ url: string; depth: number; corpus?: string }>;
	stats: { ok: number; pdf: number; empty: number; error: number; skipped: number };
};

export type GovPdfImageRef = {
	page: number;
	index: number;
	url: string;
	display_url: string;
	width: number;
	height: number;
};

export type GovPageRecord = {
	pageId: string;
	url: string;
	title: string;
	corpus: string;
	tipo: string;
	audience?: string;
	section?: string;
	fecha?: string;
	fetchedAt: string;
	content: { markdown: string; plainText: string };
	sections?: Array<{ heading: string; text: string }>;
	/** Ruta relativa: `pages/{corpus}/{año}/{pageId}` */
	storageRel?: string;
	/** Ruta relativa al PDF: `pdfs/{corpus}/{año}/{pageId}.pdf` */
	pdfPath?: string;
	images?: GovPdfImageRef[];
};

const turndown = new TurndownService({
	headingStyle: "atx",
	codeBlockStyle: "fenced",
	bulletListMarker: "-",
});

function hostAllowed(hostname: string, allowDomains: string[]): boolean {
	const h = hostname.toLowerCase().replace(/^www\./, "");
	return allowDomains.some((d) => {
		const dom = d.toLowerCase().replace(/^www\./, "");
		return h === dom || h.endsWith(`.${dom}`);
	});
}

export function normalizeUrl(href: string, base: string): string | null {
	try {
		const u = new URL(href, base);
		if (!["http:", "https:"].includes(u.protocol)) return null;
		u.hash = "";
		const path = u.pathname.replace(/\/+$/, "") || "/";
		u.pathname = path;
		return u.toString();
	} catch {
		return null;
	}
}

export function inferCorpus(url: string, hint?: string): string {
	if (hint) return hint;
	const h = new URL(url).hostname.toLowerCase();
	if (h.includes("dian.gov.co")) return "dian";
	if (h.includes("minhacienda.gov.co")) return "minhacienda";
	if (h.includes("supersociedades.gov.co")) return "supersociedades";
	if (h.includes("suin-juriscol") || h.includes("contaduria.gov.co") || h.includes("jcc.gov.co")) {
		return "legal";
	}
	if (h.includes("uiaf.gov.co")) return "legal";
	return "legal";
}

/** Enlaces útiles para contadores (profundidad > 2 exige coincidencia en URL). */
export function isRelevantForAccountants(url: string, depth: number, keywords: string[]): boolean {
	if (depth <= 2) return true;
	try {
		const u = new URL(url);
		const hay = `${u.pathname} ${u.search}`.toLowerCase();
		return keywords.some((k) => hay.includes(k.toLowerCase()));
	} catch {
		return false;
	}
}

export function inferTipo(url: string, contentType?: string): string {
	if (contentType?.includes("pdf") || url.toLowerCase().endsWith(".pdf")) return "normativa";
	const p = url.toLowerCase();
	if (/normativ|circul|resoluc|decreto|ley|estatut|concepto|compilacion|jurisprudencia/.test(p)) {
		return "normativa";
	}
	return "web";
}

export function isAllowedUrl(url: string, allowDomains: string[]): boolean {
	try {
		const u = new URL(url);
		if (!hostAllowed(u.hostname, allowDomains)) return false;
		const p = u.pathname.toLowerCase();
		if (/\.(jpg|jpeg|png|gif|svg|webp|zip|rar|mp4|mp3|css|js|woff2?)$/i.test(p)) return false;
		return true;
	} catch {
		return false;
	}
}

function extractMainHtml($: cheerio.CheerioAPI): cheerio.Cheerio<cheerio.Element> {
	const selectors = [
		"main",
		"[role='main']",
		"#mainContent",
		".ms-rtestate-field",
		".article-body",
		"#content",
		".content",
		"article",
	];
	for (const sel of selectors) {
		const el = $(sel).first();
		if (el.length && el.text().trim().length > 80) return el;
	}
	return $("body");
}

export function htmlToMarkdown(html: string, pageUrl: string): { title: string; markdown: string } {
	const $ = cheerio.load(html);
	$("script, style, noscript, iframe, nav, footer, header, .breadcrumb, .menu").remove();
	const title =
		$("title").first().text().trim() ||
		$("h1").first().text().trim() ||
		"Documento";
	const main = extractMainHtml($);
	const md = normalizeGovMarkdown(turndown.turndown(main.html() || ""), pageUrl);
	return { title, markdown: md };
}

export function pageMarkdown(record: GovPageRecord): string {
	const storage = record.storageRel ?? resolveGovStorage(record).rel;
	const fm = [
		"---",
		`title: ${yamlScalar(record.title)}`,
		`url: ${record.url}`,
		`corpus: ${record.corpus}`,
		`tipo: ${record.tipo}`,
		`audience: ${record.audience ?? "contadores"}`,
		`pageId: ${record.pageId}`,
		`storageRel: ${storage}`,
		`fetchedAt: ${record.fetchedAt}`,
	];
	if (record.fecha) fm.push(`fecha: ${yamlScalar(record.fecha)}`);
	if (record.pdfPath) fm.push(`pdf: ${record.pdfPath}`);
	if (record.images?.length) fm.push(`images: ${record.images.length}`);
	fm.push("---", "");

	const body = stripLegacyContentHeader(record.content.markdown, record.title);
	return normalizeGovMarkdown([...fm, `# ${record.title}`, "", body].join("\n"), record.url);
}

export async function savePage(record: GovPageRecord): Promise<void> {
	const paths = resolveGovStorage(record);
	const normalized = absolutizeGovRecordContent(record);
	const toSave: GovPageRecord = {
		...normalized,
		storageRel: paths.rel,
		pdfPath: record.pdfPath ?? (record.tipo === "normativa" ? paths.pdfRel : undefined),
	};
	await mkdir(paths.pageDir, { recursive: true });
	await writeFile(paths.jsonPath, `${JSON.stringify(toSave, null, 2)}\n`, "utf8");
	await writeFile(paths.mdPath, pageMarkdown(toSave), "utf8");
}

export async function loadSeeds(): Promise<GovSeedConfig> {
	const raw = await readFile(join(dirname(fileURLToPath(import.meta.url)), "../seeds/government-seeds.json"), "utf8");
	return JSON.parse(raw) as GovSeedConfig;
}

export async function loadManifest(): Promise<GovManifest> {
	try {
		return JSON.parse(await readFile(GOV_MANIFEST, "utf8")) as GovManifest;
	} catch {
		const now = new Date().toISOString();
		return {
			startedAt: now,
			updatedAt: now,
			visited: {},
			queue: [],
			stats: { ok: 0, pdf: 0, empty: 0, error: 0, skipped: 0 },
		};
	}
}

export async function saveManifest(m: GovManifest): Promise<void> {
	m.updatedAt = new Date().toISOString();
	await mkdir(GOV_BASE, { recursive: true });
	await writeFile(GOV_MANIFEST, `${JSON.stringify(m, null, 2)}\n`, "utf8");
}

export async function fetchUrl(
	url: string,
	userAgent: string,
): Promise<{ body: Buffer; contentType: string }> {
	const res = await fetch(url, {
		headers: { "User-Agent": userAgent, Accept: "text/html,application/pdf,*/*" },
		redirect: "follow",
		signal: AbortSignal.timeout(120_000),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const contentType = res.headers.get("content-type") ?? "";
	const buf = Buffer.from(await res.arrayBuffer());
	return { body: buf, contentType };
}

export async function processPage(
	url: string,
	corpusHint: string | undefined,
	config: GovSeedConfig,
): Promise<{ record: GovPageRecord | null; links: string[] }> {
	const { body, contentType } = await fetchUrl(url, config.userAgent);
	const corpus = inferCorpus(url, corpusHint);
	const tipo = inferTipo(url, contentType);
	const fetchedAt = new Date().toISOString();
	const pageId = pageIdFromUrl(url);

	if (tipo === "normativa" && (contentType.includes("pdf") || url.toLowerCase().endsWith(".pdf"))) {
		const storage = resolveGovStorage({ pageId, corpus, fetchedAt, url });
		await mkdir(storage.pdfDir, { recursive: true });
		await writeFile(storage.pdfPath, body);

		const skipImgbb = process.env.GOV_PDF_NO_IMGBB === "1";
		const { convertPdfBufferToMarkdown } = await import("./pdf-to-md.ts");
		const converted = await convertPdfBufferToMarkdown(body, {
			url,
			pageId,
			uploadImages: !skipImgbb,
		});
		if (!converted) return { record: null, links: [] };

		const record: GovPageRecord = {
			pageId,
			url,
			title: converted.title,
			corpus,
			tipo: "normativa",
			audience: config.audience ?? "contadores",
			fetchedAt,
			content: { markdown: converted.markdown, plainText: converted.plainText },
			sections: converted.sections,
			pdfPath: storage.pdfRel,
			images: converted.images,
		};
		return { record, links: [] };
	}

	const html = body.toString("utf8");
	const { title, markdown } = htmlToMarkdown(html, url);
	const plainText = markdown.replace(/[#*_`>\[\]()|-]/g, " ").replace(/\s+/g, " ").trim();
	if (plainText.length < 60) return { record: null, links: [] };

	const $ = cheerio.load(html);
	const links: string[] = [];
	$("a[href]").each((_, el) => {
		const href = $(el).attr("href");
		if (!href) return;
		const abs = normalizeUrl(href, url);
		if (abs && isAllowedUrl(abs, config.allowDomains)) links.push(abs);
	});

	const record: GovPageRecord = {
		pageId,
		url,
		title,
		corpus,
		tipo,
		audience: config.audience ?? "contadores",
		fetchedAt,
		content: {
			markdown: normalizeGovMarkdown(markdown, url),
			plainText,
		},
		sections: splitMdSections(normalizeGovMarkdown(markdown, url)),
	};

	return { record, links: [...new Set(links)] };
}

export function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}
