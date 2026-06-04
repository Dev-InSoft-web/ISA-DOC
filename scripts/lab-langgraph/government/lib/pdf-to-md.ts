import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { importLab } from "../../_shared/ensure-lab-build.mts";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import type { GovPageRecord, GovPdfImageRef } from "./crawl.ts";
import { normalizeGovMarkdown } from "./markdown.ts";
import { pageIdFromUrl, resolveGovStorage } from "./paths.ts";
import { loadImgbbCache, uploadPngToImgbb, type ImgbbCache } from "./imgbb.ts";

loadLabEnv();

export type GovPdfMarkdownResult = {
	title: string;
	markdown: string;
	plainText: string;
	sections: Array<{ heading: string; text: string }>;
	images: GovPdfImageRef[];
	pdfFile?: string;
};

export type ConvertPdfOpts = {
	url: string;
	pageId?: string;
	titleHint?: string;
	uploadImages?: boolean;
	dryRun?: boolean;
	imgbbCache?: ImgbbCache;
};

function titleFromUrl(url: string, hint?: string): string {
	if (hint?.trim() && !hint.startsWith("~")) return hint.trim();
	const name = decodeURIComponent(basename(url.split("?")[0] ?? url))
		.replace(/\.pdf$/i, "")
		.replace(/[-_]+/g, " ")
		.trim();
	return name || "Documento PDF";
}

function buildPageSection(
	pageNum: number,
	text: string,
	images: GovPdfImageRef[],
): { heading: string; body: string } {
	const lines: string[] = [];
	if (text.trim()) lines.push(text.trim());
	const pageImgs = images.filter((i) => i.page === pageNum);
	for (const img of pageImgs) {
		const alt = `Figura ${img.index} (pág. ${pageNum})`;
		lines.push("", `![${alt}](${img.display_url})`, `*${alt} · ${img.width}×${img.height}*`);
	}
	return { heading: `Página ${pageNum}`, body: lines.join("\n").trim() };
}

export async function convertPdfBufferToMarkdown(
	buffer: Buffer,
	opts: ConvertPdfOpts,
): Promise<GovPdfMarkdownResult | null> {
	const { extractPdfPages } = await importLab<{
		extractPdfPages: (b: Buffer) => Promise<
			Array<{
				pageNum: number;
				text: string;
				images: Array<{ index: number; buffer: Buffer; width: number; height: number }>;
			}>
		>;
	}>("src/lib/rag/pdfPageExtract.js");

	const pages = await extractPdfPages(buffer);
	if (!pages.length) return null;

	const pageId = opts.pageId ?? pageIdFromUrl(opts.url);
	const title = titleFromUrl(opts.url, opts.titleHint);
	const upload = opts.uploadImages !== false;
	const cache = opts.imgbbCache ?? (upload ? await loadImgbbCache() : {});
	const images: GovPdfImageRef[] = [];

	if (upload) {
		for (const page of pages) {
			for (const img of page.images) {
				const name = `gov-${pageId}-p${page.pageNum}-i${img.index}`;
				const up = await uploadPngToImgbb(img.buffer, name, {
					cache,
					dryRun: opts.dryRun,
				});
				images.push({
					page: page.pageNum,
					index: img.index,
					url: up.url,
					display_url: up.display_url,
					width: img.width,
					height: img.height,
				});
			}
		}
	}

	const header = [
		`# ${title}`,
		"",
		`**URL:** ${opts.url}`,
		"",
		"**Tipo:** normativa (PDF)",
		"",
		`**pageId:** ${pageId}`,
		"",
	];
	if (images.length) {
		header.push(`**Imágenes:** ${images.length} (ImgBB)`, "");
	}

	const sectionBlocks: Array<{ heading: string; text: string }> = [];
	const mdParts: string[] = [...header];

	for (const page of pages) {
		const { heading, body } = buildPageSection(page.pageNum, page.text, images);
		if (!body) continue;
		mdParts.push(`## ${heading}`, "", body, "");
		sectionBlocks.push({ heading, text: body });
	}

	const markdown = normalizeGovMarkdown(mdParts.join("\n"));
	const plainText = sectionBlocks
		.map((s) => `${s.heading}\n${s.text.replace(/!\[[^\]]*\]\([^)]+\)/g, "").replace(/\*[^*]+\*/g, "")}`)
		.join("\n\n")
		.replace(/\s+/g, " ")
		.trim();

	if (!plainText || plainText.length < 40) return null;

	return {
		title,
		markdown,
		plainText: plainText.slice(0, 200_000),
		sections: sectionBlocks,
		images,
		pdfFile: resolveGovStorage({
			pageId,
			corpus: "dian",
			url: opts.url,
			fetchedAt: new Date().toISOString(),
		}).pdfRel,
	};
}

export async function convertPdfFileToRecord(
	pdfPath: string,
	meta: { url: string; corpus: string; audience?: string; fetchedAt?: string },
	opts?: { uploadImages?: boolean; dryRun?: boolean },
): Promise<GovPageRecord | null> {
	const buffer = await readFile(pdfPath);
	const pageId = basename(pdfPath, ".pdf");
	const storage = resolveGovStorage({
		pageId,
		corpus: meta.corpus,
		url: meta.url,
		fetchedAt: meta.fetchedAt,
	});
	const converted = await convertPdfBufferToMarkdown(buffer, {
		url: meta.url,
		pageId,
		uploadImages: opts?.uploadImages,
		dryRun: opts?.dryRun,
	});
	if (!converted) return null;

	return {
		pageId,
		url: meta.url,
		title: converted.title,
		corpus: meta.corpus,
		tipo: "normativa",
		audience: meta.audience ?? "contadores",
		fetchedAt: meta.fetchedAt ?? new Date().toISOString(),
		content: { markdown: converted.markdown, plainText: converted.plainText },
		sections: converted.sections,
		pdfPath: storage.pdfRel,
		images: converted.images,
	};
}
