/**
 * Mutaciones diff-only del NodeStore (específico del editor SQL).
 *
 * - `applyPatches(store, msg)` aplica los patches en este orden: deletes
 *   → inserts → node-updates → obj-updates. Mutación in-place sobre las
 *   filas existentes (Object.assign) → ANTI-FLICKER en Svelte.
 * - `hasStoreIncoherence(store)` detecta violaciones de invariantes
 *   estructurales (unicidad de flatpath, join node↔obj, padre por prefijo).
 */

import type { NodeRow, NodeStore, ObjRow } from "../../../_comps/TreeView/_treeAdapter/_defgen/00-tree-data";
import type { NodePatch, ObjPatch, SyncMessage } from "./sync-channel";

function findNodeRow(store: NodeStore, flatpath: string): NodeRow | undefined {
	return store.nodes.find((n) => n.flatpath === flatpath);
}

function findObjByPk(store: NodeStore, entity: string, pk: string): ObjRow | undefined {
	const bucket = store.entities[entity];
	if (!bucket) return undefined;
	return bucket.find((o) => o.flatpath === pk);
}

/** Asigna sólo las claves cuyo valor difiere. Devuelve `true` si hubo cambios. */
function assignIfDifferent<T extends object>(target: T, fields: Record<string, unknown>): boolean {
	let changed = false;
	for (const k of Object.keys(fields)) {
		const v = fields[k];
		if ((target as Record<string, unknown>)[k] !== v) {
			(target as Record<string, unknown>)[k] = v;
			changed = true;
		}
	}
	return changed;
}

function applyDeletes(store: NodeStore, del: NonNullable<SyncMessage["deletes"]>): boolean {
	let changed = false;
	if (del.nodes && del.nodes.length) {
		const set = new Set(del.nodes);
		const beforeNodes = store.nodes.length;
		store.nodes = store.nodes.filter((n) => !set.has(n.flatpath));
		if (store.nodes.length !== beforeNodes) changed = true;
		for (const entity of Object.keys(store.entities)) {
			const before = store.entities[entity].length;
			store.entities[entity] = store.entities[entity].filter((o) => !set.has(o.flatpath));
			if (store.entities[entity].length !== before) changed = true;
		}
	}
	if (del.objs && del.objs.length) {
		for (const { entity, pk } of del.objs) {
			const bucket = store.entities[entity];
			if (!bucket) continue;
			const before = bucket.length;
			store.entities[entity] = bucket.filter((o) => o.flatpath !== pk);
			if (store.entities[entity].length !== before) changed = true;
		}
	}
	return changed;
}

function applyInserts(store: NodeStore, ins: NonNullable<SyncMessage["inserts"]>): boolean {
	let changed = false;
	if (ins.nodes && ins.nodes.length) {
		for (const row of ins.nodes) {
			const existing = findNodeRow(store, row.flatpath);
			if (existing) {
				if (assignIfDifferent(existing, row as unknown as Record<string, unknown>)) changed = true;
			} else {
				store.nodes.push(row);
				changed = true;
			}
		}
	}
	if (ins.objs && ins.objs.length) {
		for (const { entity, row } of ins.objs) {
			if (!store.entities[entity]) store.entities[entity] = [];
			const existing = findObjByPk(store, entity, String(row.flatpath));
			if (existing) {
				if (assignIfDifferent(existing, row as unknown as Record<string, unknown>)) changed = true;
			} else {
				store.entities[entity].push(row);
				changed = true;
			}
		}
	}
	return changed;
}

function applyNodePatch(store: NodeStore, patch: NodePatch): boolean {
	const oldFp = patch.oldFlatpath ?? patch.flatpath;
	const row = findNodeRow(store, oldFp);
	if (!row) return false;
	const { oldFlatpath: _o, ...fields } = patch;
	void _o;
	let changed = assignIfDifferent(row, fields as Record<string, unknown>);
	if (oldFp !== patch.flatpath && row.ireference) {
		const obj = findObjByPk(store, row.ireference, oldFp);
		if (obj && obj.flatpath !== patch.flatpath) {
			obj.flatpath = patch.flatpath;
			changed = true;
		}
	}
	return changed;
}

function applyObjPatch(store: NodeStore, patch: ObjPatch): boolean {
	const oldPk = patch.oldPk ?? patch.pk;
	const row = findObjByPk(store, patch.entity, oldPk);
	if (!row) return false;
	const { entity: _e, oldPk: _o, ...fields } = patch;
	void _e; void _o;
	return assignIfDifferent(row, fields as Record<string, unknown>);
}

/**
 * Aplica los patches que SÍ cambian datos. Si un patch trae los mismos
 * valores ya almacenados, NO se escribe nada. Devuelve `true` si al menos
 * una fila fue modificada.
 */
export function applyPatches(store: NodeStore, msg: SyncMessage): boolean {
	let changed = false;
	if (msg.deletes && applyDeletes(store, msg.deletes)) changed = true;
	if (msg.inserts && applyInserts(store, msg.inserts)) changed = true;
	if (msg.nodes && msg.nodes.length) {
		for (const p of msg.nodes) if (applyNodePatch(store, p)) changed = true;
	}
	if (msg.objs && msg.objs.length) {
		for (const p of msg.objs) if (applyObjPatch(store, p)) changed = true;
	}
	return changed;
}

/**
 * Reglas de coherencia mínimas verificadas:
 *   1. Cada `NodeRow.flatpath` es único.
 *   2. Si `node.ireference` está definido, EXISTE una `obj` en
 *      `entities[ireference]` con `obj.flatpath === node.flatpath`.
 *   3. Toda `obj` en `entities[E]` tiene un `NodeRow` con el mismo
 *      `flatpath` y `ireference === E`.
 *   4. Para cada nodo no-raíz `a.b.c`, existe el padre `a.b`.
 */
export function hasStoreIncoherence(store: NodeStore): boolean {
	const seen = new Set<string>();
	const nodeIndex = new Map<string, NodeRow>();
	for (const n of store.nodes) {
		if (seen.has(n.flatpath)) return true;
		seen.add(n.flatpath);
		nodeIndex.set(n.flatpath, n);
	}
	for (const n of store.nodes) {
		if (n.flatpath.includes(".")) {
			const parent = n.flatpath.slice(0, n.flatpath.lastIndexOf("."));
			if (!nodeIndex.has(parent)) return true;
		}
		if (n.ireference) {
			const bucket = store.entities[n.ireference];
			if (!bucket || !bucket.some((o) => o.flatpath === n.flatpath)) return true;
		}
	}
	for (const entity of Object.keys(store.entities)) {
		for (const o of store.entities[entity]) {
			const node = nodeIndex.get(String(o.flatpath));
			if (!node || node.ireference !== entity) return true;
		}
	}
	return false;
}
