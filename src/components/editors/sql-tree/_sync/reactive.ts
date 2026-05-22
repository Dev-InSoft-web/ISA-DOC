/**
 * Wrappers reactivos para `NodeRow` y `ObjRow` — específicos del editor SQL.
 *
 * Cada fila se envuelve en un Proxy que intercepta `set`. Cada asignación:
 *   1. Aplica la mutación in-place al objeto subyacente.
 *   2. Emite UN único patch al adapter vía `host.emitUpdate(...)`.
 *
 * Las cascadas (`node.flatpath` → `obj.flatpath`) se realizan mutando la
 * fila asociada A TRAVÉS DE SU PROXY, así cada wrapper dispara su propia
 * emisión SINGULAR.
 */

import type { NodeRow, NodeStore, ObjRow } from "../../../_comps/TreeViewLegacy/_treeAdapter/_defgen/00-tree-data";
import { findObjRowFor } from "../../../_comps/TreeViewLegacy/_treeAdapter/_defgen/00-tree-data";
import type { NodePatch, ObjPatch } from "./sync-channel";

export interface ReactiveSyncHost {
	readonly nodeStore: NodeStore;
	emitUpdate(msg: { nodes?: NodePatch[]; objs?: ObjPatch[] }): void;
}

const REACTIVE_FLAG = Symbol.for("treeAdapter.reactive");

interface ReactiveBox { [REACTIVE_FLAG]?: true }

export function makeReactiveObjRow<T extends ObjRow>(
	row: T,
	entity: string,
	host: ReactiveSyncHost,
): T {
	if ((row as ReactiveBox)[REACTIVE_FLAG]) return row;
	const proxy = new Proxy(row, {
		set(target, key, value, receiver) {
			if (typeof key === "symbol") return Reflect.set(target, key, value, receiver);
			const prev = (target as Record<string, unknown>)[key];
			if (prev === value) return true;
			const oldPk = String(target.flatpath);
			const ok = Reflect.set(target, key, value, receiver);
			if (!ok) return false;
			const newPk = key === "flatpath" ? String(value) : oldPk;
			host.emitUpdate({
				objs: [{ entity, oldPk, pk: newPk, [key]: value }],
			});
			return true;
		},
	});
	Object.defineProperty(row, REACTIVE_FLAG, { value: true, enumerable: false });
	return proxy as T;
}

export function makeReactiveNodeRow<T extends NodeRow>(
	row: T,
	host: ReactiveSyncHost,
): T {
	if ((row as ReactiveBox)[REACTIVE_FLAG]) return row;
	const proxy = new Proxy(row, {
		set(target, key, value, receiver) {
			if (typeof key === "symbol") return Reflect.set(target, key, value, receiver);
			const prev = (target as Record<string, unknown>)[key];
			if (prev === value) return true;
			const oldFlatpath = String(target.flatpath);
			const ireference = target.ireference;

			const ok = Reflect.set(target, key, value, receiver);
			if (!ok) return false;

			if (key === "flatpath") {
				const newFlatpath = String(value);
				host.emitUpdate({
					nodes: [{ oldFlatpath, flatpath: newFlatpath }],
				});
				if (ireference) {
					const bucket = host.nodeStore.entities[ireference];
					if (bucket) {
						const obj = bucket.find((o) => o.flatpath === oldFlatpath);
						if (obj) obj.flatpath = newFlatpath;
					}
				}
			} else {
				host.emitUpdate({
					nodes: [{ oldFlatpath, flatpath: oldFlatpath, [key]: value }],
				});
			}
			return true;
		},
	});
	Object.defineProperty(row, REACTIVE_FLAG, { value: true, enumerable: false });
	return proxy as T;
}

export function bindReactiveStore(host: ReactiveSyncHost): NodeStore {
	const store = host.nodeStore;
	store.nodes = store.nodes.map((n) => makeReactiveNodeRow(n, host));
	for (const entity of Object.keys(store.entities)) {
		store.entities[entity] = store.entities[entity].map((o) => makeReactiveObjRow(o, entity, host));
	}
	return store;
}

export function getObjForNode(store: NodeStore, node: NodeRow): ObjRow | undefined {
	return findObjRowFor(store, node);
}
