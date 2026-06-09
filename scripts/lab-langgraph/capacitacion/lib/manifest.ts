import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
	CORPUS_BASE,
	COURSES_DIR,
	COURSES_SNAPSHOT_PATH,
	LINKS_DIR,
	MANIFEST_PATH,
	VIDEOS_DIR,
} from "./corpus-paths.ts";
import type {
	CapacitacionCourseRecord,
	CapacitacionManifest,
	CapacitacionVideoLinkRecord,
	CoursesListSnapshot,
} from "./types.ts";

export async function ensureCorpusDirs(): Promise<void> {
	for (const d of [CORPUS_BASE, COURSES_DIR, VIDEOS_DIR, LINKS_DIR]) {
		await mkdir(d, { recursive: true });
	}
}

export async function loadManifest(): Promise<CapacitacionManifest | null> {
	try {
		const raw = await readFile(MANIFEST_PATH, "utf8");
		return JSON.parse(raw) as CapacitacionManifest;
	} catch {
		return null;
	}
}

export async function saveManifest(m: CapacitacionManifest): Promise<void> {
	await writeFile(MANIFEST_PATH, `${JSON.stringify(m, null, 2)}\n`, "utf8");
}

export async function loadCoursesSnapshot(): Promise<CoursesListSnapshot | null> {
	try {
		const raw = await readFile(COURSES_SNAPSHOT_PATH, "utf8");
		return JSON.parse(raw) as CoursesListSnapshot;
	} catch {
		return null;
	}
}

export async function saveCoursesSnapshot(s: CoursesListSnapshot): Promise<void> {
	await writeFile(COURSES_SNAPSHOT_PATH, `${JSON.stringify(s, null, 2)}\n`, "utf8");
}

export function courseFilePath(icurso: string): string {
	return join(COURSES_DIR, `${icurso}.json`);
}

export async function loadCourseRecord(icurso: string): Promise<CapacitacionCourseRecord | null> {
	try {
		const raw = await readFile(courseFilePath(icurso), "utf8");
		return JSON.parse(raw) as CapacitacionCourseRecord;
	} catch {
		return null;
	}
}

export async function saveCourseRecord(rec: CapacitacionCourseRecord): Promise<void> {
	await writeFile(courseFilePath(rec.icurso), `${JSON.stringify(rec, null, 2)}\n`, "utf8");
}

export function linkFilePath(entryId: string): string {
	const safe = entryId.replace(/[^A-Za-z0-9._-]/g, "_");
	return join(LINKS_DIR, `${safe}.json`);
}

export async function loadVideoLink(entryId: string): Promise<CapacitacionVideoLinkRecord | null> {
	try {
		const raw = await readFile(linkFilePath(entryId), "utf8");
		return JSON.parse(raw) as CapacitacionVideoLinkRecord;
	} catch {
		return null;
	}
}

export async function saveVideoLink(rec: CapacitacionVideoLinkRecord): Promise<void> {
	await writeFile(linkFilePath(rec.entryId), `${JSON.stringify(rec, null, 2)}\n`, "utf8");
}
