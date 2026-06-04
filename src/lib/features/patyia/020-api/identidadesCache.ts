import { getPool } from "../../../core/database/clientesis-pool.ts";
import { readJsonStore, writeJsonStore, useLabPersistence } from "../../../core/persistence/backend.ts";

export interface IdentidadesCache {
	terceros: Record<string, { nombre: string }>;
	contactos: Record<string, { nombre: string }>;
	updatedAt?: string;
}

const LOCAL = "data/patyia/identidades-cache.json";
const LAB_REL = "patyia/caches/identidades-cache.json";

let memo: IdentidadesCache | null = null;

function vacio(): IdentidadesCache {
	return { terceros: {}, contactos: {} };
}

export async function loadCache(): Promise<IdentidadesCache> {
	if (memo && !useLabPersistence()) return memo;
	const j = await readJsonStore<IdentidadesCache>(LOCAL, LAB_REL);
	memo = { terceros: j?.terceros ?? {}, contactos: j?.contactos ?? {}, updatedAt: j?.updatedAt };
	return memo;
}

export async function saveCache(cache: IdentidadesCache): Promise<void> {
	memo = cache;
	cache.updatedAt = new Date().toISOString();
	await writeJsonStore(LOCAL, LAB_REL, cache);
}

async function consultarNombres(iterceros: string[], icontactos: string[]): Promise<{ terceros: Map<string, string>; contactos: Map<string, string> }> {
	const tMap = new Map<string, string>();
	const cMap = new Map<string, string>();
	if (!iterceros.length && !icontactos.length) return { terceros: tMap, contactos: cMap };
	try {
		const pool = await getPool();
		if (iterceros.length) {
			const inList = iterceros.map((s) => `'${s.replace(/'/g, "''")}'`).join(",");
			const r = await pool.request().query(`SELECT ITERCERO, NTERCERO, NOMBRECOMERCIAL FROM TERCEROS WHERE ITERCERO IN (${inList})`);
			for (const row of r.recordset as Array<{ ITERCERO: string; NTERCERO: string | null; NOMBRECOMERCIAL: string | null }>) {
				const name = (row.NTERCERO ?? "").toString().trim() || (row.NOMBRECOMERCIAL ?? "").toString().trim();
				if (name) tMap.set(String(row.ITERCERO).trim(), name);
			}
		}
		if (icontactos.length) {
			const numericos = icontactos.filter((s) => /^\d+$/.test(s));
			if (numericos.length) {
				const inList = numericos.join(",");
				const r = await pool.request().query(`SELECT ICONTACTO, NOMBRECOMPLETO, NOMBRES, APELLIDOS FROM CONTACTOS WHERE ICONTACTO IN (${inList})`);
				for (const row of r.recordset as Array<{ ICONTACTO: string; NOMBRECOMPLETO: string | null; NOMBRES: string | null; APELLIDOS: string | null }>) {
					const completo = (row.NOMBRECOMPLETO ?? "").toString().trim();
					const armado = `${(row.NOMBRES ?? "").toString().trim()} ${(row.APELLIDOS ?? "").toString().trim()}`.trim();
					const name = completo || armado;
					if (name) cMap.set(String(row.ICONTACTO).trim(), name);
				}
			}
		}
	} catch (e) {
		console.warn(`[cache] consultarNombres fallo: ${(e as Error).message}`);
	}
	return { terceros: tMap, contactos: cMap };
}

export async function resolverIdentidades(pares: Array<{ itercero: string; icontacto: string }>): Promise<{
	terceros: Record<string, string>;
	contactos: Record<string, string>;
}> {
	const cache = await loadCache();
	const faltanT = new Set<string>();
	const faltanC = new Set<string>();
	for (const { itercero, icontacto } of pares) {
		if (itercero && !cache.terceros[itercero]) faltanT.add(itercero);
		if (icontacto && !cache.contactos[icontacto]) faltanC.add(icontacto);
	}
	if (faltanT.size || faltanC.size) {
		const { terceros, contactos } = await consultarNombres(Array.from(faltanT), Array.from(faltanC));
		let cambios = false;
		for (const [k, v] of terceros) {
			cache.terceros[k] = { nombre: v };
			cambios = true;
		}
		for (const [k, v] of contactos) {
			cache.contactos[k] = { nombre: v };
			cambios = true;
		}
		if (cambios) await saveCache(cache);
	}
	const outT: Record<string, string> = {};
	const outC: Record<string, string> = {};
	for (const { itercero, icontacto } of pares) {
		if (itercero) outT[itercero] = cache.terceros[itercero]?.nombre ?? "";
		if (icontacto) outC[icontacto] = cache.contactos[icontacto]?.nombre ?? "";
	}
	return { terceros: outT, contactos: outC };
}
