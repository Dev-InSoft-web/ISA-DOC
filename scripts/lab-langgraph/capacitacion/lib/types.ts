/** Tipos del scraper de capacitación virtual (videos ocultos). */

export const CAPACITACION_SCHEMA_VERSION = 1;

export interface CapacitacionCourseSummary {
	icurso: string;
	ncurso: string;
	descripcion?: string;
	bactivo?: boolean;
	idriver?: number;
	itema?: string;
	driver?: { idriver?: number; ndriver?: string; qniveles?: number };
	tema?: {
		itema?: string;
		ntema?: string;
		bvisible?: boolean;
		icategoria?: string;
	} | null;
}

export interface CapacitacionProfessor {
	rol?: string;
	nombre?: string;
	imagenUrl?: string;
}

export interface CapacitacionVideoEntry {
	/** Clave estable: youtubeId o `irecurso:{id}` si no hay YouTube. */
	entryId: string;
	/** Curso de origen al persistir en links (varios cursos pueden compartir el mismo video). */
	icurso?: string;
	youtubeId?: string;
	irecurso?: number | string;
	iplan?: string;
	qnivel?: number;
	capitulo?: string;
	titulo: string;
	descripcion?: string;
	profesor?: CapacitacionProfessor;
	dificultad?: string;
	urlDiapositivas?: string;
	recursoUrl?: string;
	source: "api-plan" | "html-page" | "db-recursos-atributos";
}

export interface CapacitacionCourseRecord {
	schemaVersion: typeof CAPACITACION_SCHEMA_VERSION;
	icurso: string;
	cursoFetched: boolean;
	planFetched: boolean;
	fetchedAt?: string;
	error?: string;
	curso: CapacitacionCourseSummary;
	videoIds: string[];
	videos: CapacitacionVideoEntry[];
}

export type VideoProcessStatus =
	| "pending"
	| "skipped_in_youtube_corpus"
	| "fetched"
	| "enriched_only"
	| "unavailable"
	| "error"
	| "no_youtube_id";

export interface CapacitacionVideoLinkRecord {
	schemaVersion: typeof CAPACITACION_SCHEMA_VERSION;
	entryId: string;
	youtubeId?: string;
	status: VideoProcessStatus;
	updatedAt: string;
	/** Ruta relativa al JSON del corpus YouTube si ya existía. */
	youtubeCorpusRef?: string;
	icursos: string[];
	entries: CapacitacionVideoEntry[];
	cursoContext: Array<{
		icurso: string;
		ncurso: string;
		descripcionCurso?: string;
	}>;
	error?: string;
}

export interface CapacitacionManifest {
	schemaVersion: typeof CAPACITACION_SCHEMA_VERSION;
	updatedAt: string;
	apiBase: string;
	coursesTotal: number;
	coursesPlanFetched: number;
	videosDiscovered: number;
	videosSkippedInYoutubeCorpus: number;
	videosEnrichedFromCorpus: number;
	videosFetched: number;
	videosErrors: number;
	courses: Array<{
		icurso: string;
		ncurso: string;
		planFetched: boolean;
		videoCount: number;
		error?: string;
	}>;
}

export interface CoursesListSnapshot {
	schemaVersion: typeof CAPACITACION_SCHEMA_VERSION;
	savedAt: string;
	source: "api" | "import";
	totalregistros: number;
	datos: CapacitacionCourseSummary[];
}
