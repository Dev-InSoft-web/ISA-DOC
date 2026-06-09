import { readFile, readdir } from "node:fs/promises";
import { basename, join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { randomBytes } from "node:crypto";
import type { GovPdfImageRef } from "../../government/lib/crawl.ts";
import { loadImgbbCache, uploadPngToImgbb } from "../../government/lib/imgbb.ts";
import { extractArchive } from "./archive-extract.ts";

const execFileAsync = promisify(execFile);

function decodeXmlText(s: string): string {
	return s
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'");
}

function extractXmlTexts(xml: string): string[] {
	const texts: string[] = [];
	const re = /<a:t[^>]*>([^<]*)<\/a:t>/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(xml))) {
		const t = decodeXmlText(m[1] ?? "").trim();
		if (t) texts.push(t);
	}
	return texts;
}

async function extractOfficeZip(filePath: string): Promise<string> {
	const tmp = join(tmpdir(), `cap-planes-${randomBytes(6).toString("hex")}`);
	await mkdir(tmp, { recursive: true });
	await extractArchive(filePath, tmp);
	return tmp;
}

export async function convertPptxFileToMarkdown(
	filePath: string,
	opts: { url: string; docId: string; uploadImages?: boolean },
): Promise<{ markdown: string; plainText: string; sections: Array<{ heading: string; text: string }>; images: GovPdfImageRef[] } | null> {
	const tmp = await extractOfficeZip(filePath);
	const slidesDir = join(tmp, "ppt", "slides");
	const mediaDir = join(tmp, "ppt", "media");
	const title = basename(filePath).replace(/\.pptx?$/i, "");
	const cache = opts.uploadImages !== false ? await loadImgbbCache() : {};
	const images: GovPdfImageRef[] = [];
	const sections: Array<{ heading: string; text: string }> = [];

	let slideFiles: string[] = [];
	try {
		slideFiles = (await readdir(slidesDir))
			.filter((f) => /^slide\d+\.xml$/i.test(f))
			.sort((a, b) => {
				const na = Number(a.match(/\d+/)?.[0] ?? 0);
				const nb = Number(b.match(/\d+/)?.[0] ?? 0);
				return na - nb;
			});
	} catch {
		return null;
	}

	if (opts.uploadImages !== false) {
		try {
			const mediaFiles = await readdir(mediaDir);
			let idx = 0;
			for (const mf of mediaFiles) {
				if (!/\.(png|jpe?g|gif|webp)$/i.test(mf)) continue;
				idx += 1;
				const buf = await readFile(join(mediaDir, mf));
				const up = await uploadPngToImgbb(buf, `cap-${opts.docId}-ppt-${idx}`, { cache });
				images.push({
					page: idx,
					index: idx,
					url: up.url,
					display_url: up.display_url,
					width: 0,
					height: 0,
				});
			}
		} catch {
			/* sin media */
		}
	}

	for (let i = 0; i < slideFiles.length; i += 1) {
		const xml = await readFile(join(slidesDir, slideFiles[i]!), "utf8");
		const texts = extractXmlTexts(xml);
		const bodyParts = [...texts];
		const slideNum = i + 1;
		const slideImg = images.find((img) => img.page === slideNum);
		if (slideImg) {
			bodyParts.push("", `![Diapositiva ${slideNum}](${slideImg.display_url})`);
		}
		const body = bodyParts.join("\n").trim();
		if (!body) continue;
		sections.push({ heading: `Diapositiva ${slideNum}`, text: body });
	}

	if (!sections.length && images.length) {
		for (const img of images) {
			sections.push({
				heading: `Imagen ${img.index}`,
				text: `![Imagen ${img.index}](${img.display_url})`,
			});
		}
	}
	if (!sections.length) return null;

	const header = [`# ${title}`, "", `**URL:** ${opts.url}`, "", "**Tipo:** presentación (PPTX)", ""];
	if (images.length) header.push(`**Imágenes:** ${images.length} (ImgBB)`, "");
	const mdParts = [...header];
	for (const s of sections) {
		mdParts.push(`## ${s.heading}`, "", s.text, "");
	}
	const markdown = mdParts.join("\n");
	const plainText = sections.map((s) => `${s.heading}\n${s.text}`).join("\n\n").slice(0, 200_000);
	return { markdown, plainText, sections, images };
}

function parseSharedStrings(xml: string): string[] {
	const out: string[] = [];
	const re = /<si>([\s\S]*?)<\/si>/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(xml))) {
		const block = m[1] ?? "";
		const texts = extractXmlTexts(block);
		out.push(texts.join(" "));
	}
	return out;
}

function parseSheetRows(xml: string, shared: string[]): string[][] {
	const rows: string[][] = [];
	const rowRe = /<row[^>]*>([\s\S]*?)<\/row>/g;
	let rm: RegExpExecArray | null;
	while ((rm = rowRe.exec(xml))) {
		const rowXml = rm[1] ?? "";
		const cells: string[] = [];
		const cellRe = /<c[^>]* r="([A-Z]+\d+)"[^>]*(?: t="s")?[^>]*>(?:<v>([^<]*)<\/v>)?/g;
		let cm: RegExpExecArray | null;
		while ((cm = cellRe.exec(rowXml))) {
			const isShared = rowXml.slice(cm.index, cm.index + 80).includes('t="s"');
			const val = cm[2] ?? "";
			cells.push(isShared ? (shared[Number(val)] ?? "") : val);
		}
		if (cells.some((c) => c.trim())) rows.push(cells);
	}
	return rows;
}

export async function convertXlsxFileToMarkdown(
	filePath: string,
	opts: { url: string },
): Promise<{ markdown: string; plainText: string; sections: Array<{ heading: string; text: string }> } | null> {
	const tmp = await extractOfficeZip(filePath);
	const title = basename(filePath).replace(/\.xlsx?$/i, "");

	let shared: string[] = [];
	try {
		shared = parseSharedStrings(await readFile(join(tmp, "xl", "sharedStrings.xml"), "utf8"));
	} catch {
		/* */
	}

	const sheetsDir = join(tmp, "xl", "worksheets");
	let sheetFiles: string[] = [];
	try {
		sheetFiles = (await readdir(sheetsDir)).filter((f) => f.startsWith("sheet")).sort();
	} catch {
		return null;
	}

	const sections: Array<{ heading: string; text: string }> = [];
	for (let i = 0; i < sheetFiles.length; i += 1) {
		const xml = await readFile(join(sheetsDir, sheetFiles[i]!), "utf8");
		const rows = parseSheetRows(xml, shared);
		if (!rows.length) continue;
		const lines = rows.map((r) => `| ${r.join(" | ")} |`);
		const body = ["| " + rows[0]!.map(() => "---").join(" | ") + " |", ...lines.slice(1)].join("\n");
		sections.push({ heading: `Hoja ${i + 1}`, text: lines.join("\n") });
	}

	if (!sections.length) return null;
	const header = [`# ${title}`, "", `**URL:** ${opts.url}`, "", "**Tipo:** hoja de cálculo (XLSX)", ""];
	const mdParts = [...header];
	for (const s of sections) mdParts.push(`## ${s.heading}`, "", s.text, "");
	return {
		markdown: mdParts.join("\n"),
		plainText: sections.map((s) => s.text).join("\n").slice(0, 200_000),
		sections,
	};
}

/** Convierte .xls binario vía PowerShell Excel COM si está disponible. */
export async function convertXlsFileToMarkdown(
	filePath: string,
	opts: { url: string },
): Promise<{ markdown: string; plainText: string; sections: Array<{ heading: string; text: string }> } | null> {
	const xlsxPath = `${filePath}.converted.xlsx`;
	const ps = `
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open('${filePath.replace(/'/g, "''")}')
$wb.SaveAs('${xlsxPath.replace(/'/g, "''")}', 51)
$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
`;
	try {
		await execFileAsync("powershell", ["-NoProfile", "-Command", ps], { timeout: 180_000 });
		const result = await convertXlsxFileToMarkdown(xlsxPath, opts);
		return result;
	} catch {
		return null;
	}
}
