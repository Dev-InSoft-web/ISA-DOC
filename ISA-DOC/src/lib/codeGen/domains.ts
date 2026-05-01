// Persistencia de dominios y master/slave en localStorage.
// Los dominios agrupan una tabla "master" + N tablas "slave".
// La tabla master debe ser la primera del dominio.

const KEY = "isa-doc:codegen:domains";

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
	try {
		const raw = typeof localStorage !== "undefined" ? localStorage.getItem(KEY) : null;
		if (!raw) return {};
		const parsed = JSON.parse(raw) as unknown;
		if (parsed && typeof parsed === "object") return parsed as DomainsMap;
		return {};
	} catch {
		return {};
	}
}

function safeWrite(m: DomainsMap): void {
	try {
		if (typeof localStorage === "undefined") return;
		localStorage.setItem(KEY, JSON.stringify(m));
	} catch {
		/* noop */
	}
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

/** Marca `tableName` como master: si no tiene dominio, crea uno nuevo con esa tabla como master. */
export function markAsMaster(domains: DomainsMap, tableName: string, domainName?: string, parentPrefix?: string): DomainsMap {
	const next: DomainsMap = { ...domains };
	const existing = findDomainOf(next, tableName);
	if (existing) {
		next[existing.id] = {
			...existing,
			masterTable: tableName,
			members: [tableName, ...existing.members.filter((m) => m.toUpperCase() !== tableName.toUpperCase())],
		};
		return next;
	}
	const id = `dom_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
	next[id] = {
		id,
		name: domainName ?? `Dominio ${tableName}`,
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

export function createEmptyDomain(domains: DomainsMap, name: string, parentId?: string): DomainsMap {
	const id = `dom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
	return {
		...domains,
		[id]: { id, name: name || "Nuevo dominio", masterTable: "", members: [], parentId },
	};
}

/** Orden explícito de los nodos de nivel raíz (dominios y prefijos mezclados). */
export interface TopLevelEntry {
	kind: "domain" | "prefix";
	key: string;
}

const TOP_KEY = "isa-doc:codegen:topOrder";

export function loadTopLevelOrder(): TopLevelEntry[] {
	try {
		const raw = typeof localStorage !== "undefined" ? localStorage.getItem(TOP_KEY) : null;
		if (!raw) return [];
		const parsed = JSON.parse(raw) as unknown;
		if (Array.isArray(parsed)) return parsed.filter((e: any) => e && (e.kind === "domain" || e.kind === "prefix") && typeof e.key === "string") as TopLevelEntry[];
		return [];
	} catch {
		return [];
	}
}

export function saveTopLevelOrder(order: TopLevelEntry[]): void {
	try {
		if (typeof localStorage === "undefined") return;
		localStorage.setItem(TOP_KEY, JSON.stringify(order));
	} catch { /* noop */ }
}

/** Orden de hijos directos de un agrupador de prefijo (mezcla tablas y sub-dominios). */
export type PrefixOrderMap = Record<string, DomainChildRef[]>;
const PREFIX_KEY = "isa-doc:codegen:prefixOrder";

export function loadPrefixOrders(): PrefixOrderMap {
	try {
		const raw = typeof localStorage !== "undefined" ? localStorage.getItem(PREFIX_KEY) : null;
		if (!raw) return {};
		const parsed = JSON.parse(raw) as unknown;
		if (parsed && typeof parsed === "object") return parsed as PrefixOrderMap;
		return {};
	} catch { return {}; }
}

export function savePrefixOrders(m: PrefixOrderMap): void {
	try {
		if (typeof localStorage === "undefined") return;
		localStorage.setItem(PREFIX_KEY, JSON.stringify(m));
	} catch { /* noop */ }
}
