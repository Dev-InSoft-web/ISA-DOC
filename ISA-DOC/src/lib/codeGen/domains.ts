// Persistencia de dominios y master/slave en el servidor (vía stateClient).
// Los dominios agrupan una tabla "master" + N tablas "slave".
// La tabla master debe ser la primera del dominio.
//
// Modelo de identidad: `members[]` y `masterTable` guardan IDs ESTABLES
// (`ParsedTable.id`), no nombres. El nombre puede cambiar; el id es inmutable.
// Las entradas de `childrenOrder` con `kind:"table"` también guardan id.

import { getCached, setCached } from "./stateClient.ts";

export interface DomainChildRef {
	kind: "table" | "domain" | "pivot";
	/** Para `kind:"table"`: id estable de la tabla. Para `kind:"domain"|"pivot"`: id del agrupador. */
	key: string;
}

export interface DomainDef {
	id: string;
	name: string;
	/**
	 * Tipo de agrupador.
	 * - `domain` (default): agrupamiento clásico master+slaves. Es la raíz expuesta por la API.
	 *   Puede definir un prefijo (rol "domain/prefixer") que aplica a sus tablas hijas.
	 * - `pivot-domain`: pivote dentro de un dominio que envuelve a otro dominio (cardinalidad
	 *   1:1 ó 1:N). Color naranja en el árbol.
	 * - `pivot`: pivote N:N. Tiene exactamente un master y un único slave (máx. 2 hijos).
	 *   Sólo puede existir dentro de un dominio. Color naranja con badge distinto.
	 */
	type?: "domain" | "pivot" | "pivot-domain";
	/** Cardinalidad del pivote dentro de su dominio padre. Sólo aplica a `pivot` y `pivot-domain`. */
	cardinality?: "1:1" | "1:N" | "N:N";
	/** Para `domain` que actúa como `domain/prefixer`: prefijo que aplica a sus tablas. */
	prefix?: string;
	/**
	 * Cardinalidad por tabla esclava respecto a su master, indexada por id estable de tabla.
	 * Sólo aplica a esclavas (no a la master). Valores: `1:1`, `1:N`, `N:N`.
	 */
	slaveCardinalities?: Record<string, "1:1" | "1:N" | "N:N">;
	/** Id estable de la tabla master (no el nombre). Cadena vacía si aún no se asignó. */
	masterTable: string;
	/** Ids estables de las tablas miembro (no nombres). */
	members: string[];
	parentId?: string;
	/** Si el dominio cuelga directamente de un agrupador de prefijo, su clave. */
	parentPrefix?: string;
	/** Orden visual explícito de hijos (mezcla sub-dominios y tablas). Si está presente, manda. */
	childrenOrder?: DomainChildRef[];
}

export type DomainsMap = Record<string, DomainDef>;

function safeRead(): DomainsMap {
	const v = getCached("domains");
	return v && typeof v === "object" ? (v as DomainsMap) : {};
}

function safeWrite(m: DomainsMap): void {
	setCached("domains", m);
}

export function loadDomains(): DomainsMap {
	return safeRead();
}

export function saveDomains(m: DomainsMap): void {
	safeWrite(m);
}

export function findDomainOf(domains: DomainsMap, tableId: string): DomainDef | undefined {
	if (!tableId) return undefined;
	for (const d of Object.values(domains)) {
		if (d.members.includes(tableId)) return d;
	}
	return undefined;
}

export function isMaster(domains: DomainsMap, tableId: string): boolean {
	if (!tableId) return false;
	const d = findDomainOf(domains, tableId);
	return !!d && d.masterTable === tableId;
}

/** Devuelve los ids de las tablas slave del dominio cuyo master es `masterTableId`. */
export function getSlaveIds(domains: DomainsMap, masterTableId: string): string[] {
	if (!masterTableId) return [];
	for (const d of Object.values(domains)) {
		if (d.masterTable === masterTableId) {
			return d.members.filter((m) => m !== masterTableId);
		}
	}
	return [];
}

/** Compat: alias deprecado, equivalente a `getSlaveIds`. */
export const getSlaves = getSlaveIds;

/**
 * Deriva el nombre visible de un dominio a partir del nombre de la tabla master.
 * Quita el prefijo asociado, capitaliza cada token (separado por `_`) y los une
 * con espacios. Ej: `tablePrefix="hcl_"`, `master="hcl_HISTORIAL_CURSOS"` -> `"Historial Cursos"`.
 */
export function deriveDomainName(masterTable: string, parentPrefix?: string): string {
	const pref = parentPrefix ?? "";
	const bare = pref && masterTable.toUpperCase().startsWith(pref.toUpperCase())
		? masterTable.slice(pref.length)
		: masterTable;
	const tokens = bare.split(/[_\s]+/).filter(Boolean);
	if (tokens.length === 0) return masterTable;
	return tokens.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

/** Marca `tableId` como master: si no tiene dominio, crea uno nuevo con esa tabla como master. */
export function markAsMaster(
	domains: DomainsMap,
	tableId: string,
	tableName: string,
	domainName?: string,
	parentPrefix?: string,
): DomainsMap {
	if (!tableId) return domains;
	const next: DomainsMap = { ...domains };
	const existing = findDomainOf(next, tableId);
	if (existing) {
		const masterChanged = existing.masterTable !== tableId;
		const nextName = masterChanged
			? deriveDomainName(tableName, parentPrefix ?? existing.parentPrefix)
			: existing.name;
		next[existing.id] = {
			...existing,
			name: nextName,
			masterTable: tableId,
			members: [tableId, ...existing.members.filter((m) => m !== tableId)],
		};
		return next;
	}
	const id = `dom_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
	next[id] = {
		id,
		name: domainName ?? deriveDomainName(tableName, parentPrefix),
		masterTable: tableId,
		members: [tableId],
		parentPrefix,
	};
	return next;
}

export function addToDomain(domains: DomainsMap, domainId: string, tableId: string): DomainsMap {
	const d = domains[domainId];
	if (!d || !tableId) return domains;
	if (d.members.includes(tableId)) return domains;
	return { ...domains, [domainId]: { ...d, members: [...d.members, tableId] } };
}

export function removeDomain(domains: DomainsMap, domainId: string): DomainsMap {
	if (!domains[domainId]) return domains;
	const next = { ...domains };
	delete next[domainId];
	return next;
}

export function renameDomain(domains: DomainsMap, domainId: string, newName: string): DomainsMap {
	const d = domains[domainId];
	if (!d) return domains;
	return { ...domains, [domainId]: { ...d, name: newName } };
}

/**
 * Propaga el rename de una tabla a través de todos los dominios: actualiza
 * `members` (case-insensitive) y `masterTable` cuando coincidan con `oldName`.
 * Mantiene la posición del miembro renombrado en el array.
 *
 * @deprecated Las identidades de tabla en `domains` ahora son ids estables
 * (`ParsedTable.id`), por lo que renombrar el `name` no requiere propagación.
 * La función se conserva como no-op para callers heredados.
 */
export function renameTableMember(domains: DomainsMap, _oldName: string, _newName: string): DomainsMap {
	return domains;
}

/**
 * Migra `domains` y los \u00f3rdenes persistidos para que las referencias a
 * tablas usen IDs estables en vez de nombres. Si una entrada coincide con
 * un id actual de tabla, se conserva. Si coincide (case-insensitive) con
 * un nombre (`effectiveTableName`, `name` u `originalName`), se sustituye
 * por el id correspondiente. Las entradas que no resuelven se dejan tal
 * cual (dato residual de otro fragmento o tabla no cargada).
 */
export function migrateDomainsAndOrdersToIds(input: {
	domains: DomainsMap;
	topOrder: TopLevelEntry[];
	prefixOrders: PrefixOrderMap;
	tables: ReadonlyArray<{ id: string; name: string; originalName: string; effectivePrefix?: string }>;
}): { domains: DomainsMap; topOrder: TopLevelEntry[]; prefixOrders: PrefixOrderMap; changed: boolean } {
	const idSet = new Set<string>();
	const nameToId = new Map<string, string>();
	for (const t of input.tables) {
		if (!t.id) continue;
		idSet.add(t.id);
		const eff = (t.effectivePrefix ?? "") + t.name;
		const aliases = [eff, t.name, t.originalName ?? t.name];
		for (const a of aliases) {
			const k = (a ?? "").toUpperCase();
			if (!k) continue;
			if (!nameToId.has(k)) nameToId.set(k, t.id);
		}
	}
	const resolveTable = (key: string): string => {
		if (!key) return key;
		if (idSet.has(key)) return key;
		const byName = nameToId.get(key.toUpperCase());
		return byName ?? key;
	};
	let changed = false;
	const nextDomains: DomainsMap = {};
	for (const [id, d] of Object.entries(input.domains)) {
		const newMembers = d.members.map(resolveTable);
		const newMaster = resolveTable(d.masterTable || "");
		const newOrder = d.childrenOrder?.map((e) =>
			e.kind === "table" ? { kind: "table" as const, key: resolveTable(e.key) } : e,
		);
		if (
			newMembers.some((m, i) => m !== d.members[i]) ||
			newMaster !== d.masterTable ||
			(newOrder && d.childrenOrder && newOrder.some((e, i) => e.key !== d.childrenOrder![i].key))
		) {
			changed = true;
		}
		nextDomains[id] = { ...d, members: newMembers, masterTable: newMaster, childrenOrder: newOrder };
	}
	const nextTopOrder = input.topOrder.map<TopLevelEntry>((e) =>
		e.kind === "table" ? { kind: "table", key: resolveTable(e.key) } : e,
	);
	if (nextTopOrder.some((e, i) => e.key !== input.topOrder[i].key)) changed = true;
	const nextPrefixOrders: PrefixOrderMap = {};
	for (const [pk, arr] of Object.entries(input.prefixOrders)) {
		const newArr = arr.map((e) =>
			e.kind === "table" ? { kind: "table" as const, key: resolveTable(e.key) } : e,
		);
		if (newArr.some((e, i) => e.key !== arr[i].key)) changed = true;
		nextPrefixOrders[pk] = newArr;
	}
	return { domains: nextDomains, topOrder: nextTopOrder, prefixOrders: nextPrefixOrders, changed };
}

export function createEmptyDomain(domains: DomainsMap, name: string, parentId?: string, parentPrefix?: string, type: "domain" | "pivot" = "domain"): DomainsMap {
	const prefix = type === "pivot" ? "piv_" : "dom_";
	const id = `${prefix}${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
	return {
		...domains,
		[id]: { id, name: name || (type === "pivot" ? "Nuevo pivote" : "Nuevo dominio"), type, masterTable: "", members: [], parentId, parentPrefix },
	};
}

/** Orden explícito de los nodos de nivel raíz (dominios, pivots, prefijos y tablas mezclados). */
export interface TopLevelEntry {
	kind: "domain" | "pivot" | "prefix" | "table";
	key: string;
}

const TOP_KEY = "topOrder" as const;

export function loadTopLevelOrder(): TopLevelEntry[] {
	const v = getCached("topOrder");
	if (Array.isArray(v)) return v.filter((e: any) => e && (e.kind === "domain" || e.kind === "pivot" || e.kind === "prefix" || e.kind === "table") && typeof e.key === "string") as TopLevelEntry[];
	return [];
}

export function saveTopLevelOrder(order: TopLevelEntry[]): void {
	setCached("topOrder", order);
}

/** Orden de hijos directos de un agrupador de prefijo (mezcla tablas y sub-dominios). */
export type PrefixOrderMap = Record<string, DomainChildRef[]>;

export function loadPrefixOrders(): PrefixOrderMap {
	const v = getCached("prefixOrders");
	return v && typeof v === "object" ? (v as PrefixOrderMap) : {};
}

export function savePrefixOrders(m: PrefixOrderMap): void {
	setCached("prefixOrders", m);
}

/**
 * Mapa de prefijos hijos por contenedor padre. La clave usa el contrato:
 * "" para la raíz, "prefix:<name>" para un prefijo padre, "domain:<id>" para
 * un dominio padre. El valor es la lista de nombres de prefijos hijos
 * (incluye los vacíos creados manualmente y los que sí contienen tablas).
 */
export type ChildPrefixMap = Record<string, string[]>;

export function loadChildPrefixes(): ChildPrefixMap {
	const v = getCached("childPrefixes");
	return v && typeof v === "object" ? (v as ChildPrefixMap) : {};
}

export function saveChildPrefixes(m: ChildPrefixMap): void {
	setCached("childPrefixes", m);
}
