import type { ResourceConfig } from "./types.js";

export const RESOURCE_KEYS = [
	"id", "className", "tableName", "tableConst", "module",
	"singularApi", "pluralApi", "singularCaption", "pluralCaption",
	"isysRecurso", "parentBaseClass", "clientBaseClass", "uiBaseKind",
	"fields", "relations", "customHooks", "helpers", "omitOps", "exposeInFn", "orderBy", "targetFiles",
] as const satisfies readonly (keyof ResourceConfig)[];

export type ResourceKey = (typeof RESOURCE_KEYS)[number];

export function pickDefined<T extends object>(obj: T, keep: readonly (keyof T)[]): Partial<T> {
	const out: Partial<T> = {};
	for (const k of keep) {
		const v = obj[k];
		if (v !== undefined) out[k] = v;
	}
	return out;
}

export function diffShallow<T extends object>(base: T, next: T, keys: readonly (keyof T)[]): Partial<T> {
	const out: Partial<T> = {};
	for (const k of keys) {
		const a = base[k];
		const b = next[k];
		if (JSON.stringify(a) !== JSON.stringify(b)) out[k] = b;
	}
	return out;
}

const ID_RE = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/u;
export function isValidId(id: unknown): id is string { return typeof id === "string" && ID_RE.test(id); }
