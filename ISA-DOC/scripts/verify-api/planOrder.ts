/** Para correr solo esta prueba: `tsx scripts/verify-api/planOrder.ts`. */
import { request } from "./http.ts";
import { unwrap, filtroB64 } from "./helpers.ts";

/**
 * Orden total: segmentos numéricos de izquierda a derecha; si un path es prefijo del otro,
 * el más corto (ancestro) va primero. Así "20" < "20.50" < "20.100".
 */
export function compareIplanHierarchy(a: unknown, b: unknown): number {
	const sa = String(a ?? "")
		.split(".")
		.map((s) => s.trim())
		.filter(Boolean);
	const sb = String(b ?? "")
		.split(".")
		.map((s) => s.trim())
		.filter(Boolean);
	const n = Math.max(sa.length, sb.length);
	for (let i = 0; i < n; i++) {
		const ha = i < sa.length;
		const hb = i < sb.length;
		if (!ha && !hb) return 0;
		if (!ha) return -1;
		if (!hb) return 1;
		const na = Number.parseInt(sa[i], 10);
		const nb = Number.parseInt(sb[i], 10);
		if (Number.isFinite(na) && Number.isFinite(nb) && String(na) === sa[i] && String(nb) === sb[i]) {
			if (na !== nb) return na - nb;
		} else {
			const c = sa[i].localeCompare(sb[i], undefined, { numeric: true, sensitivity: "base" });
			if (c !== 0) return c;
		}
	}
	return 0;
}

function logIplanIndices(iplans: unknown[], label: string): void {
	if (!iplans.length) {
		console.log(`   [${label}] (sin valores iplan)`);
		return;
	}
	console.log(`   Índices iplan (${iplans.length} nodos), orden recibido:`);
	for (let i = 0; i < iplans.length; i++) {
		console.log(`      ${String(i + 1).padStart(3, " ")}. ${iplans[i]}`);
	}
}

export function assertPlanescursoSorted(iplans: unknown[], label: string): boolean {
	for (let i = 1; i < iplans.length; i++) {
		const cmp = compareIplanHierarchy(iplans[i - 1], iplans[i]);
		if (cmp > 0) {
			console.error(
				`   ⛔ Orden planescurso [${label}]: "${iplans[i - 1]}" debe ir antes que "${iplans[i]}" (orden jerárquico numérico)`,
			);
			console.error(`   Secuencia iplan recibida: ${JSON.stringify(iplans)}`);
			return false;
		}
	}
	logIplanIndices(iplans, label);
	console.log(`   -> Orden planescurso OK [${label}] (${iplans.length} nodos) ✅`);
	return true;
}

/**
 * GET curso con todo:true y comprueba que planescurso/planes venga ordenado por iplan (jerárquico numérico).
 */
export async function testPlanescursoOrderForCurso(
	icurso: string,
	{ label }: { label?: string } = {},
): Promise<boolean> {
	const tag = label || icurso;
	console.log(`\n===============================================================`);
	console.log(`EVALUATING: Orden planescurso (iplan jerárquico) — ${tag}`);
	console.log(`===============================================================`);

	const b64 = filtroB64({ todo: true });
	let res = await request("GET", `/api/curso/${encodeURIComponent(icurso)}/${b64}`);
	if (res.status !== 200) {
		console.log(`   GET con filtro todo HTTP ${res.status} — probando GET sin filtro`);
		res = await request("GET", `/api/curso/${encodeURIComponent(icurso)}`);
	}
	if (res.status !== 200) {
		console.error(`   ⛔ [plan order] GET curso ${icurso}: HTTP ${res.status}`);
		return false;
	}
	const cur = unwrap(res.data);
	const planes = cur.planescurso ?? cur.planes ?? [];
	if (!Array.isArray(planes)) {
		console.error(`   ⛔ [plan order] planescurso/planes no es array`);
		return false;
	}
	const iplansAll = planes.map((p: any) => p.iplan).filter((x: unknown) => x != null && x !== "");
	if (planes.length < 2) {
		logIplanIndices(iplansAll, tag);
		console.log(`   [plan order] ${tag}: omitido (menos de 2 planes; nada que ordenar) ⚠️`);
		return true;
	}
	const iplans = iplansAll;
	if (iplans.length !== planes.length) {
		console.log(`   [plan order] aviso: algunas filas sin iplan — comparando ${iplans.length} valores`);
	}
	return assertPlanescursoSorted(iplans, tag);
}
