import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import type { GovPdfImageRef } from "../../government/lib/crawl.ts";
import { convertPdfBufferToMarkdown } from "../../government/lib/pdf-to-md.ts";
import { extractArchive, listProcessableFiles } from "./archive-extract.ts";
import {
	convertPptxFileToMarkdown,
	convertXlsFileToMarkdown,
	convertXlsxFileToMarkdown,
} from "./office-to-md.ts";
import { titleFromDocUrl } from "./planes-paths.ts";

export type DocConvertResult = {
	title: string;
	markdown: string;
	plainText: string;
	sections: Array<{ heading: string; text: string }>;
	images: GovPdfImageRef[];
};

export async function convertDocFile(
	filePath: string,
	opts: { url: string; docId: string; uploadImages?: boolean },
): Promise<DocConvertResult | null> {
	const ext = filePath.split(".").pop()?.toLowerCase() ?? "";
	const title = titleFromDocUrl(opts.url);

	if (ext === "pdf") {
		const buf = await readFile(filePath);
		const converted = await convertPdfBufferToMarkdown(buf, {
			url: opts.url,
			pageId: opts.docId,
			titleHint: title,
			uploadImages: opts.uploadImages,
		});
		if (!converted) return null;
		return {
			title: converted.title,
			markdown: converted.markdown.replace("**Tipo:** normativa (PDF)", "**Tipo:** documento (PDF)"),
			plainText: converted.plainText,
			sections: converted.sections,
			images: converted.images,
		};
	}

	if (ext === "pptx" || ext === "ppt") {
		const converted = await convertPptxFileToMarkdown(filePath, opts);
		if (!converted) return null;
		return { title, ...converted };
	}

	if (ext === "xlsx") {
		const converted = await convertXlsxFileToMarkdown(filePath, opts);
		if (!converted) return null;
		return { title, ...converted, images: [] };
	}

	if (ext === "xls") {
		const converted = await convertXlsFileToMarkdown(filePath, opts);
		if (!converted) return null;
		return { title, ...converted, images: [] };
	}

	if (ext === "zip" || ext === "rar") {
		const extractDir = `${filePath}.extracted`;
		await extractArchive(filePath, extractDir);
		const inner = await listProcessableFiles(extractDir);
		if (!inner.length) return null;

		const sections: Array<{ heading: string; text: string }> = [];
		const images: GovPdfImageRef[] = [];
		const mdParts = [
			`# ${title}`,
			"",
			`**URL:** ${opts.url}`,
			"",
			`**Tipo:** archivo comprimido (${ext.toUpperCase()})`,
			"",
			`**Archivos internos:** ${inner.length}`,
			"",
		];

		for (const innerPath of inner) {
			const innerName = basename(innerPath);
			const innerConverted = await convertDocFile(innerPath, {
				...opts,
				url: `${opts.url}#${innerName}`,
			});
			if (!innerConverted) continue;
			sections.push({
				heading: innerName,
				text: innerConverted.plainText.slice(0, 50_000),
			});
			mdParts.push(`## ${innerName}`, "", innerConverted.markdown.replace(/^#[^\n]+\n+/m, ""), "");
			images.push(...innerConverted.images);
		}

		if (!sections.length) return null;
		const plainText = sections.map((s) => `${s.heading}\n${s.text}`).join("\n\n").slice(0, 200_000);
		return { title, markdown: mdParts.join("\n"), plainText, sections, images };
	}

	return null;
}
