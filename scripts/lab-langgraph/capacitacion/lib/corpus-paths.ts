import { join } from "node:path";
import { labDataPath } from "../../_shared/isa-doc-root.ts";

export const CORPUS_BASE = labDataPath("vectorize/capacitacion-oculta");

export const MANIFEST_PATH = join(CORPUS_BASE, "manifest.json");
export const COURSES_SNAPSHOT_PATH = join(CORPUS_BASE, "courses-snapshot.json");
export const COURSES_DIR = join(CORPUS_BASE, "courses");
export const VIDEOS_DIR = join(CORPUS_BASE, "videos");
export const LINKS_DIR = join(CORPUS_BASE, "links");
export const SESSION_PATH = join(CORPUS_BASE, "session.json");
export const RECURSOS_ATRIBUTOS_SNAPSHOT_PATH = join(CORPUS_BASE, "recursos-atributos-snapshot.json");
export const UNAVAILABLE_VIDEOS_PATH = join(CORPUS_BASE, "unavailable-videos.json");
export const PLANES_BASE = join(CORPUS_BASE, "planes");
export const ATRIBUTOS_PLANES_SNAPSHOT_PATH = join(CORPUS_BASE, "atributos-planes-snapshot.json");
export const PLANES_LINKS_DIR = join(PLANES_BASE, "links");
export const PLANES_RAW_DIR = join(PLANES_BASE, "raw");
export const PLANES_PAGES_DIR = join(PLANES_BASE, "pages");
export const PLANES_MANIFEST_PATH = join(PLANES_BASE, "manifest.json");
export const PLANES_UNAVAILABLE_PATH = join(PLANES_BASE, "unavailable-docs.json");
export const WHISPER_PENDING_PATH = join(CORPUS_BASE, "whisper-pending.json");
