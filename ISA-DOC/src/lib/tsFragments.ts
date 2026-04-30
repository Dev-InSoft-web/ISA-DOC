import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_BASE = path.resolve(__dirname, "..", "..", "..", "..");
const REGIONS_MAP_PATH = path.resolve(__dirname, "..", "..", "public", "bd", "regionsMap.json");

export type TsFragmentRole = "pojo" | "server" | "client";

export interface TsProdFragment {
	role: TsFragmentRole;
	region: string;
	sourceFile: string;
	body: string;
}

export interface TsProdMap {
	[tableUpper: string]: TsProdFragment[];
}

interface ProdSource {
	role: TsFragmentRole;
	relPath: string;
}

const PROD_SOURCES: ProdSource[] = [
	{ role: "pojo", relPath: "ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/01.PlanDeEstudio.ts" },
	{ role: "pojo", relPath: "ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/02.Cursos/01.Modelo.ts" },
	{ role: "pojo", relPath: "ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/02.Cursos/02.Datos.ts" },
	{ role: "server", relPath: "ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/01_PlanDeEstudio.ts" },
	{ role: "server", relPath: "ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/02_Cursos.ts" },
	{ role: "client", relPath: "ISP-ClientesIS/src/sources/020 Controllers/6.ContaPymeU/2.Capacitacion/UlCapacitacionClient.ts" },
];

const REGION_RE = /^[\t ]*\/\/\s*#region\s+([A-Z0-9_]+)\s*$/i;
const ENDREGION_RE = /^[\t ]*\/\/\s*#endregion(?:\s+([A-Z0-9_]+))?\s*$/i;

interface RegionsFile {
	description?: string;
	map: Record<string, string>;
}

export async function loadRegionsMap(): Promise<Record<string, string>> {
	try {
		const raw = await fs.readFile(REGIONS_MAP_PATH, "utf8");
		const data = JSON.parse(raw) as RegionsFile;
		return data.map ?? {};
	} catch {
		return {};
	}
}

export async function saveRegionsMap(map: Record<string, string>): Promise<void> {
	const payload: RegionsFile = {
		description: "Mapeo persistente nombre-de-tabla -> nombre-de-region en archivos ISP. Si renombras una tabla en ISA, este mapa preserva el vínculo con la región original. Usa el botón 'Sincronizar regiones' en TablesPanel para reescribir los #region en los archivos ISP.",
		map,
	};
	await fs.writeFile(REGIONS_MAP_PATH, JSON.stringify(payload, null, "\t") + "\n", "utf8");
}

interface RawFragment { region: string; body: string; }

function parseRegions(content: string): RawFragment[] {
	const lines = content.split(/\r?\n/);
	const out: RawFragment[] = [];
	let i = 0;
	while (i < lines.length) {
		const m = REGION_RE.exec(lines[i] ?? "");
		if (!m) { i++; continue; }
		const region = (m[1] ?? "").toUpperCase();
		let j = i + 1;
		while (j < lines.length && !ENDREGION_RE.test(lines[j] ?? "")) j++;
		const body = lines.slice(i + 1, j).join("\n").replace(/^\s*\n+|\n+\s*$/g, "");
		if (region && body) out.push({ region, body });
		i = j + 1;
	}
	return out;
}

export async function loadProdTsFragments(): Promise<TsProdMap> {
	const regionsMap = await loadRegionsMap();
	const regionToTable = new Map<string, string>();
	for (const [table, region] of Object.entries(regionsMap)) regionToTable.set(region.toUpperCase(), table.toUpperCase());

	const map: TsProdMap = {};
	for (const src of PROD_SOURCES) {
		const abs = path.resolve(REPO_BASE, src.relPath);
		let content: string;
		try {
			content = await fs.readFile(abs, "utf8");
		} catch {
			continue;
		}
		const frags = parseRegions(content);
		for (const f of frags) {
			const table = regionToTable.get(f.region) ?? f.region;
			(map[table] ??= []).push({
				role: src.role,
				region: f.region,
				sourceFile: src.relPath,
				body: f.body,
			});
		}
	}
	return map;
}

interface RegionRename { from: string; to: string; }

export async function syncRegionsToTables(currentTables: string[]): Promise<{ filesChanged: string[]; renames: RegionRename[] }> {
	const regionsMap = await loadRegionsMap();
	const renames: RegionRename[] = [];
	const newMap: Record<string, string> = {};

	for (const table of currentTables) {
		const tUpper = table.toUpperCase();
		const oldRegion = regionsMap[tUpper];
		if (oldRegion && oldRegion !== tUpper) {
			renames.push({ from: oldRegion, to: tUpper });
		}
		newMap[tUpper] = tUpper;
	}

	const filesChanged: string[] = [];
	for (const src of PROD_SOURCES) {
		const abs = path.resolve(REPO_BASE, src.relPath);
		let content: string;
		try {
			content = await fs.readFile(abs, "utf8");
		} catch {
			continue;
		}
		let updated = content;
		for (const r of renames) {
			const fromEsc = r.from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			updated = updated.replace(new RegExp(`(\\/\\/\\s*#region\\s+)${fromEsc}(\\s*$)`, "gmi"), `$1${r.to}$2`);
			updated = updated.replace(new RegExp(`(\\/\\/\\s*#endregion\\s+)${fromEsc}(\\s*$)`, "gmi"), `$1${r.to}$2`);
		}
		if (updated !== content) {
			await fs.writeFile(abs, updated, "utf8");
			filesChanged.push(src.relPath);
		}
	}

	await saveRegionsMap(newMap);
	return { filesChanged, renames };
}
