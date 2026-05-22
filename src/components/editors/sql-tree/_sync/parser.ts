/**
 * Parser del NodeStore plano → árbol de nodos materializados.
 * Específico del editor SQL realtime.
 */

import {
	findObjRowFor,
	getRootRows,
	getChildRows,
	type NodeRow,
	type NodeStore,
} from "../../../_comps/TreeViewLegacy/_treeAdapter/_defgen/00-tree-data";
import type { KindRegistry } from "./kind-registry";

/**
 * Construye el árbol a partir del NodeStore plano. Cada nodo se
 * instancia vía `registry.build(kind, mergedObj)` donde `mergedObj`
 * es la fusión de la fila `NodeRow` y la fila `ObjRow` asociada
 * (si `ireference` está presente). Las claves del NodeRow tienen
 * precedencia.
 */
export function parseStore<TNode extends { flatpath: string; children: TNode[] }>(
	store: NodeStore,
	registry: KindRegistry<TNode>,
): TNode[] {
	const buildSubtree = (parentRow: NodeRow): TNode => {
		const obj = findObjRowFor(store, parentRow);
		const merged = obj ? { ...obj, ...parentRow } : { ...parentRow };
		const node = registry.build(parentRow.kind, merged);
		node.flatpath = parentRow.flatpath;
		const children = getChildRows(store, parentRow.flatpath);
		for (const c of children) node.children.push(buildSubtree(c));
		return node;
	};
	const roots = getRootRows(store);
	return roots.map(buildSubtree);
}
