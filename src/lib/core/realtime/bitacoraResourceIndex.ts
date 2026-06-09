import { readFileSync, existsSync } from "node:fs";
import { join, normalize, relative } from "node:path";
import type { ResourceProject } from "./resourceTypes.ts";

export type BitacoraPathMaps = {
	byLabRelPath: Map<string, string>;
	byIsaDailyRelPath: Map<string, string>;
};

const SEGMENT_RE = /\{\s*id:\s*"([^"]+)",\s*(?:path|sqlPath):\s*"([^"]+)"/g;

function parseManifestSegments(manifestPath: string): Array<{ id: string; rel: string }> {
	if (!existsSync(manifestPath)) return [];
	const raw = readFileSync(manifestPath, "utf8");
	const out: Array<{ id: string; rel: string }> = [];
	for (const m of raw.matchAll(SEGMENT_RE)) {
		out.push({ id: m[1], rel: m[2].replace(/\\/g, "/") });
	}
	return out;
}

export function loadBitacoraPathMaps(isaRoot: string, labRoot: string): Record<ResourceProject, BitacoraPathMaps> {
	const projects: ResourceProject[] = ["patyia", "clientesis"];
	const result = {} as Record<ResourceProject, BitacoraPathMaps>;

	for (const project of projects) {
		const manifest = join(labRoot, "scripts", "bitacora", `${project}-manifest.ts`);
		const segments = parseManifestSegments(manifest);
		const byLabRelPath = new Map<string, string>();
		const byIsaDailyRelPath = new Map<string, string>();

		for (const { id, rel } of segments) {
			byLabRelPath.set(rel, id);
			const daily = rel.replace(/^md\//, "").replace(/^sql\//, "");
			if (daily !== rel) {
				byIsaDailyRelPath.set(`daily/${daily}`, id);
			}
		}

		result[project] = { byLabRelPath, byIsaDailyRelPath };
	}

	return result;
}

export function resolveBitacoraResourceId(
	project: ResourceProject,
	filePath: string,
	isaRoot: string,
	labRoot: string,
	maps: Record<ResourceProject, BitacoraPathMaps>,
): { id: string; kind: "bitacora-md" | "bitacora-sql" } | null {
	const norm = normalize(filePath).replace(/\\/g, "/");
	const map = maps[project];
	if (!map) return null;

	const isaDailyPrefix = normalize(join(isaRoot, "src/lib/features", project, "060-bitacora")).replace(/\\/g, "/");
	const labDataPrefix = normalize(join(labRoot, "data/bitacora", project)).replace(/\\/g, "/");

	if (norm.startsWith(isaDailyPrefix + "/")) {
		const rel = relative(isaDailyPrefix, norm).replace(/\\/g, "/");
		const id = map.byIsaDailyRelPath.get(rel);
		if (id) {
			return { id, kind: id.startsWith("sql.") ? "bitacora-sql" : "bitacora-md" };
		}
	}

	if (norm.startsWith(labDataPrefix + "/")) {
		const rel = relative(labDataPrefix, norm).replace(/\\/g, "/");
		const id = map.byLabRelPath.get(rel);
		if (id) {
			return { id, kind: id.startsWith("sql.") ? "bitacora-sql" : "bitacora-md" };
		}
	}

	return null;
}
