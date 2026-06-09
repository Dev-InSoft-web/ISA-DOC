import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { VideoCorpusRecord } from "../../youtube/lib/types.ts";
import type {
	CapacitacionCourseSummary,
	CapacitacionVideoEntry,
	CapacitacionVideoLinkRecord,
} from "./types.ts";
import type { YoutubeCorpusIndex } from "./youtube-dedupe.ts";
import { VIDEOS_DIR } from "./corpus-paths.ts";

export interface CapacitacionEnrichedVideo extends VideoCorpusRecord {
	capacitacion: {
		hidden: true;
		icursos: string[];
		entries: CapacitacionVideoEntry[];
		cursos: Array<{
			icurso: string;
			ncurso: string;
			descripcionCurso?: string;
			tema?: string;
			driver?: string;
		}>;
	};
}

export function buildVideoLinkRecord(args: {
	entryId: string;
	youtubeId?: string;
	status: CapacitacionVideoLinkRecord["status"];
	existing?: CapacitacionVideoLinkRecord | null;
	entry: CapacitacionVideoEntry;
	curso: CapacitacionCourseSummary;
	youtubeCorpusRef?: string;
	error?: string;
}): CapacitacionVideoLinkRecord {
	const icurso = args.curso.icurso;
	const prev = args.existing;
	const icursos = new Set(prev?.icursos ?? []);
	icursos.add(icurso);

	const entryWithCurso: CapacitacionVideoEntry = { ...args.entry, icurso, source: args.entry.source };
	const entries = [...(prev?.entries ?? [])];
	const dup = entries.find(
		(e) =>
			e.icurso === icurso &&
			(e.iplan === args.entry.iplan || (!e.iplan && !args.entry.iplan)) &&
			e.titulo === args.entry.titulo,
	);
	if (!dup) entries.push(entryWithCurso);
	else {
		const idx = entries.indexOf(dup);
		entries[idx] = { ...dup, ...entryWithCurso };
	}

	const cursoContext = [...(prev?.cursoContext ?? [])];
	if (!cursoContext.some((c) => c.icurso === icurso)) {
		cursoContext.push({
			icurso,
			ncurso: args.curso.ncurso,
			descripcionCurso: args.curso.descripcion,
		});
	}

	return {
		schemaVersion: 1,
		entryId: args.entryId,
		youtubeId: args.youtubeId,
		status: args.status,
		updatedAt: new Date().toISOString(),
		youtubeCorpusRef: args.youtubeCorpusRef ?? prev?.youtubeCorpusRef,
		icursos: [...icursos],
		entries,
		cursoContext,
		error: args.error ?? prev?.error,
	};
}

export function attachCapacitacionToRecord(
	record: VideoCorpusRecord,
	link: CapacitacionVideoLinkRecord,
): CapacitacionEnrichedVideo {
	const cursos = link.cursoContext.map((c) => ({
		icurso: c.icurso,
		ncurso: c.ncurso,
		descripcionCurso: c.descripcionCurso,
	}));

	// Preferir título/descripción del portal cuando enriquecen el de YouTube
	const primary = link.entries[0];
	const ytdlp = { ...record.ytdlp };
	if (primary?.titulo && (!ytdlp.title || ytdlp.title === record.videoId)) {
		ytdlp.title = primary.titulo;
	}
	if (primary?.descripcion) {
		const portalDesc = primary.descripcion.trim();
		const ytDesc = (ytdlp.description ?? "").trim();
		if (!ytDesc || portalDesc.length > ytDesc.length * 0.5) {
			ytdlp.description = portalDesc;
		}
	}

	return {
		...record,
		ytdlp,
		capacitacion: {
			hidden: true,
			icursos: link.icursos,
			entries: link.entries,
			cursos,
		},
	};
}

/** Reutiliza el JSON del corpus YouTube y añade metadata del portal (sin re-descargar). */
export async function enrichFromYoutubeCorpus(
	link: CapacitacionVideoLinkRecord,
	youtubeIndex: YoutubeCorpusIndex,
	youtubeId: string,
): Promise<CapacitacionEnrichedVideo | null> {
	const ref = youtubeIndex.byVideoId.get(youtubeId);
	if (!ref) return null;
	const raw = await readFile(ref.jsonPath, "utf8");
	const baseRecord = JSON.parse(raw) as VideoCorpusRecord;
	const enriched = attachCapacitacionToRecord(baseRecord, link);
	await writeFile(join(VIDEOS_DIR, `${youtubeId}.json`), `${JSON.stringify(enriched, null, 2)}\n`, "utf8");
	return enriched;
}
