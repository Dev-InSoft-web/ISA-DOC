// Persistencia de dominios y master/slave en el servidor (vía stateClient).
// Los dominios agrupan una tabla "master" + N tablas "slave".
// La tabla master debe ser la primera del dominio.

import { getCached, setCached } from "./stateClient.ts";

export interface DomainChildRef {
	kind: "table" | "domain";
	key: string;
}

export interface DomainDef {
	id: string;
	name: string;
	masterTable: string;
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

export function findDomainOf(domains: DomainsMap, tableName: string): DomainDef | undefined {
	const upper = tableName.toUpperCase();
	for (const d of Object.values(domains)) {
		if (d.members.some((t) => t.toUpperCase() === upper)) return d;
	}
	return undefined;
}

export function isMaster(domains: DomainsMap, tableName: string): boolean {
	const d = findDomainOf(domains, tableName);
	return !!d && d.masterTable.toUpperCase() === tableName.toUpperCase();
}

export function getSlaves(domains: DomainsMap, masterTableName: string): string[] {
	const upper = masterTableName.toUpperCase();
	for (const d of Object.values(domains)) {
		if (d.masterTable.toUpperCase() === upper) {
			return d.members.filter((m) => m.toUpperCase() !== upper);
		}
	}
	return [];
}

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

/** Marca `tableName` como master: si no tiene dominio, crea uno nuevo con esa tabla como master. */
export function markAsMaster(domains: DomainsMap, tableName: string, domainName?: string, parentPrefix?: string): DomainsMap {
	const next: DomainsMap = { ...domains };
	const existing = findDomainOf(next, tableName);
	if (existing) {
		const masterChanged = existing.masterTable.toUpperCase() !== tableName.toUpperCase();
		const nextName = masterChanged
			? deriveDomainName(tableName, parentPrefix ?? existing.parentPrefix)
			: existing.name;
		next[existing.id] = {
			...existing,
			name: nextName,
			masterTable: tableName,
			members: [tableName, ...existing.members.filter((m) => m.toUpperCase() !== tableName.toUpperCase())],
		};
		return next;
	}
	const id = `dom_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
	next[id] = {
		id,
		name: domainName ?? deriveDomainName(tableName, parentPrefix),
		masterTable: tableName,
		members: [tableName],
		parentPrefix,
	};
	return next;
}

export function addToDomain(domains: DomainsMap, domainId: string, tableName: string): DomainsMap {
	const d = domains[domainId];
	if (!d) return domains;
	if (d.members.some((m) => m.toUpperCase() === tableName.toUpperCase())) return domains;
	return { ...domains, [domainId]: { ...d, members: [...d.members, tableName] } };
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

export function createEmptyDomain(domains: DomainsMap, name: string, parentId?: string, parentPrefix?: string): DomainsMap {
	const id = `dom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
	return {
		...domains,
		[id]: { id, name: name || "Nuevo dominio", masterTable: "", members: [], parentId, parentPrefix },
	};
}

/** Orden explícito de los nodos de nivel raíz (dominios, prefijos y tablas mezclados). */
export interface TopLevelEntry {
	kind: "domain" | "prefix" | "table";
	key: string;
}

const TOP_KEY = "topOrder" as const;

export function loadTopLevelOrder(): TopLevelEntry[] {
	const v = getCached("topOrder");
	if (Array.isArray(v)) return v.filter((e: any) => e && (e.kind === "domain" || e.kind === "prefix" || e.kind === "table") && typeof e.key === "string") as TopLevelEntry[];
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
