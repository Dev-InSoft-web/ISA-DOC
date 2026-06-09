import { extractYoutubeId, entryIdForVideo } from "./extract-youtube-id.ts";
import type { CapacitacionVideoEntry } from "./types.ts";

function stripHtmlBoilerplate(text: string): string {
	return text
		.replace(/body\s*\{[^}]*\}/gi, "")
		.replace(/\s+/g, " ")
		.trim();
}

function professorFromImgUrl(url: string | undefined): string | undefined {
	if (!url) return undefined;
	const m = url.match(/\/([^/]+)\.(png|jpg|jpeg|webp)$/i);
	if (!m) return undefined;
	return m[1]!
		.replace(/-/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

function chapterAtOffset(html: string, offset: number): string {
	const before = html.slice(0, offset);
	const chapters = [...before.matchAll(/class="titulo_capitulo[^"]*"[^>]*>([^<]+)</gi)];
	return chapters.at(-1)?.[1]?.trim() ?? "";
}

function parseVideoCardBlock(block: string, capitulo: string): CapacitacionVideoEntry | null {
	const titulo = block.match(/class="is_titulo[^"]*"[^>]*>([^<]+)</i)?.[1]?.trim();
	if (!titulo) return null;

	const rawDesc = block.match(/class="is_descripcion[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1];
	const descripcion = rawDesc
		? stripHtmlBoilerplate(rawDesc.replace(/<[^>]+>/g, " "))
		: undefined;

	const rol = block.match(/class="is_tratamiento[^"]*"[^>]*>([^<]+)</i)?.[1]?.trim();
	let nombre = block.match(/class="is_nusuario[^"]*"[^>]*>([^<]+)</i)?.[1]?.trim();
	const imagenUrl = block.match(/class="img_tutor[^"]*"[^>]*src="([^"]+)"/i)?.[1];
	if (!nombre) nombre = professorFromImgUrl(imagenUrl);

	const bg = block.match(/class="[^"]*infomedia[^"]*"[^>]*style="([^"]+)"/i)?.[1] ?? "";
	const youtubeId = extractYoutubeId(bg) ?? extractYoutubeId(block);
	const iplan =
		block.match(/\btd(?:Basico|Medio|Avanzado)[^"]*\s(\d{6})\b/)?.[1] ??
		block.match(/class="[^"]*\b(\d{6})\b[^"]*"/)?.[1];

	let dificultad: string | undefined;
	if (block.includes("tdBasico")) dificultad = "Básico";
	else if (block.includes("tdMedio")) dificultad = "Medio";
	else if (block.includes("tdAvanzado")) dificultad = "Avanzado";

	return {
		entryId: entryIdForVideo(youtubeId, undefined),
		youtubeId: youtubeId ?? undefined,
		iplan,
		capitulo,
		titulo,
		descripcion,
		profesor: rol || nombre ? { rol, nombre, imagenUrl } : undefined,
		dificultad,
		source: "html-page",
	};
}

/**
 * Parsea HTML renderizado de capacitacion-virtual (`.div-Body.contenido`).
 * Los IDs de YouTube aparecen en thumbnails: `img.youtube.com/vi/{id}/hqdefault.jpg`.
 */
export function parseCourseHtml(html: string, icurso: string): CapacitacionVideoEntry[] {
	const entries: CapacitacionVideoEntry[] = [];

	// Estrategia principal: cada tarjeta de video vive en tdBasico/tdMedio/tdAvanzado + iplan
	const cardRe =
		/<div class="td(?:Basico|Medio|Avanzado)[^"]*[^>]*>[\s\S]*?class="[^"]*infomedia[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi;
	let cardMatch: RegExpExecArray | null;
	while ((cardMatch = cardRe.exec(html)) !== null) {
		const block = cardMatch[0]!;
		const parsed = parseVideoCardBlock(block, chapterAtOffset(html, cardMatch.index));
		if (parsed) entries.push(parsed);
	}

	// Respaldo: filas w3-border (cursos con otro driver)
	if (entries.length === 0) {
		let currentChapter = "";
		const chapters = [...html.matchAll(/class="titulo_capitulo[^"]*"[^>]*>([^<]+)</gi)].map(
			(m) => m[1]!.trim(),
		);
		let chapterIdx = 0;

		let match: RegExpExecArray | null;
		const rowRe = /<div class="w3-row w3-border">([\s\S]*?)(?=<div class="w3-row w3-border">|$)/gi;
		while ((match = rowRe.exec(html)) !== null) {
			const block = match[1]!;
			if (block.includes("titulo_capitulo")) {
				const ch = block.match(/class="titulo_capitulo[^"]*"[^>]*>([^<]+)</i);
				if (ch) {
					currentChapter = ch[1]!.trim();
					chapterIdx += 1;
				}
				continue;
			}
			const parsed = parseVideoCardBlock(block, currentChapter || chapters[chapterIdx - 1]);
			if (parsed) entries.push(parsed);
		}
	}

	// Fallback: emparejar thumbnails sueltos si el HTML no tiene bloques estándar
	if (entries.length === 0) {
		const thumbRe =
			/img\.youtube\.com\/vi\/([A-Za-z0-9_-]{11})\/hqdefault\.jpg[\s\S]{0,800}?is_titulo[^>]*>([^<]+)</gi;
		let t: RegExpExecArray | null;
		while ((t = thumbRe.exec(html)) !== null) {
			entries.push({
				entryId: t[1]!,
				youtubeId: t[1]!,
				titulo: t[2]!.trim(),
				source: "html-page",
			});
		}
	}

	void icurso;
	return dedupeEntries(entries);
}

function dedupeEntries(entries: CapacitacionVideoEntry[]): CapacitacionVideoEntry[] {
	const seen = new Map<string, CapacitacionVideoEntry>();
	for (const e of entries) {
		const key = e.youtubeId ?? e.entryId;
		const prev = seen.get(key);
		if (!prev) {
			seen.set(key, e);
			continue;
		}
		seen.set(key, {
			...prev,
			...e,
			titulo: e.titulo || prev.titulo,
			descripcion: e.descripcion || prev.descripcion,
			profesor: e.profesor?.nombre ? e.profesor : prev.profesor,
		});
	}
	return [...seen.values()];
}
