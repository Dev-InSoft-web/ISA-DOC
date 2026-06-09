import { extractYoutubeId, entryIdForVideo } from "./extract-youtube-id.ts";
import type { CapacitacionVideoEntry } from "./types.ts";

type AnyObj = Record<string, unknown>;

function str(v: unknown): string | undefined {
	if (v == null) return undefined;
	const s = String(v).trim();
	return s || undefined;
}

function num(v: unknown): number | undefined {
	if (typeof v === "number" && Number.isFinite(v)) return v;
	if (typeof v === "string" && v.trim()) {
		const n = Number(v);
		return Number.isFinite(n) ? n : undefined;
	}
	return undefined;
}

function atributoValor(atributos: unknown, nameRe: RegExp): string | undefined {
	if (!Array.isArray(atributos)) return undefined;
	for (const a of atributos) {
		if (!a || typeof a !== "object") continue;
		const natributo = str((a as AnyObj).natributo);
		if (!natributo || !nameRe.test(natributo)) continue;
		return str((a as AnyObj).valor);
	}
	return undefined;
}

function professorFromAtributos(atributos: unknown): CapacitacionVideoEntry["profesor"] {
	const imagenUrl = atributoValor(atributos, /profesor/i);
	if (!imagenUrl) return undefined;
	return { imagenUrl };
}

function recursoYoutubeId(node: AnyObj): string | null {
	const recurso = node.recurso as AnyObj | undefined;
	const candidates = [
		recurso?.url,
		recurso?.nurl,
		recurso?.link,
		recurso?.descripcion,
		node.url,
		node.descripcion,
		node.titulo,
	];
	for (const c of candidates) {
		const id = extractYoutubeId(str(c));
		if (id) return id;
	}
	return null;
}

function nodeToEntry(node: AnyObj, capitulo?: string): CapacitacionVideoEntry | null {
	const qnivel = num(node.qnivel);
	const irecurso = node.irecurso ?? (node.recurso as AnyObj | undefined)?.irecurso;
	const titulo = str(node.titulo) ?? str((node.recurso as AnyObj | undefined)?.nrecurso);
	if (!titulo && !irecurso) return null;

	const youtubeId = recursoYoutubeId(node);
	const descripcion =
		str(node.descripcion) ?? str((node.recurso as AnyObj | undefined)?.descripcion);
	const urlDiapositivas = atributoValor(node.atributos, /diapositiva/i);

	return {
		entryId: entryIdForVideo(youtubeId, irecurso as string | number | undefined),
		youtubeId: youtubeId ?? undefined,
		irecurso: irecurso as number | string | undefined,
		iplan: str(node.iplan),
		qnivel,
		capitulo,
		titulo: titulo ?? `irecurso:${irecurso}`,
		descripcion,
		profesor: professorFromAtributos(node.atributos),
		dificultad: str(node.dificultad),
		urlDiapositivas,
		recursoUrl: str((node.recurso as AnyObj | undefined)?.url),
		source: "api-plan",
	};
}

/**
 * Recorre `planescurso` (árbol por iplan) y extrae nodos con recurso/video.
 */
export function parsePlanEscurso(planescurso: unknown): CapacitacionVideoEntry[] {
	if (!Array.isArray(planescurso)) return [];

	const entries: CapacitacionVideoEntry[] = [];
	let currentChapter: string | undefined;
	for (const node of planescurso) {
		if (!node || typeof node !== "object") continue;
		const n = node as AnyObj;
		const qnivel = num(n.qnivel) ?? 0;
		const titulo = str(n.titulo);

		if (qnivel === 1 && titulo) {
			currentChapter = titulo;
			continue;
		}

		const hasRecurso = n.irecurso != null || (n.recurso && typeof n.recurso === "object");
		if (!hasRecurso && !recursoYoutubeId(n)) continue;

		const entry = nodeToEntry(n, currentChapter);
		if (entry) entries.push(entry);
	}

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
		seen.set(key, { ...prev, ...e, titulo: e.titulo || prev.titulo });
	}
	return [...seen.values()];
}
