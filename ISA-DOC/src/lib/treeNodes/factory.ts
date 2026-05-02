import { BaseTreeNode } from "./BaseTreeNode.ts";
import { ColumnNode, type ColumnObj } from "./ColumnNode.ts";
import { DomainNode, type DomainObj } from "./DomainNode.ts";
import { PrefixNode, type PrefixObj } from "./PrefixNode.ts";
import { RootNode } from "./RootNode.ts";
import { TableNode, type TableObj } from "./TableNode.ts";
import type { NodeKind, PersistedNodeJSON } from "./types.ts";

/**
 * Reconstruye el árbol en memoria a partir de un JSON persistido. Cada
 * `kind` selecciona la clase nodal correspondiente; los campos
 * (`doc`, `wardenAction`, `children`) se hidratan recursivamente.
 *
 * El `id` no se confiará al JSON: se recalcula tras hidratar vía
 * `node.reindex()`. Así se evitan inconsistencias entre `id`/`ireference`
 * almacenados y la posición estructural real.
 */
export function nodeFromJSON(json: PersistedNodeJSON, parent: BaseTreeNode | null = null): BaseTreeNode {
	const kind = json.kind as NodeKind;
	const obj = (json.obj ?? {}) as Record<string, unknown>;
	let n: BaseTreeNode;
	switch (kind) {
		case "root":
			n = new RootNode();
			break;
		case "prefix":
			n = new PrefixNode(obj as Partial<PrefixObj>);
			break;
		case "domain":
			n = new DomainNode(obj as Partial<DomainObj>);
			break;
		case "table":
			n = new TableNode(obj as Partial<TableObj>);
			break;
		case "col":
			n = new ColumnNode(obj as Partial<ColumnObj>);
			break;
		default:
			throw new Error(`Kind desconocido al hidratar: '${String(kind)}'.`);
	}
	if (json.wardenAction) n.wardenAction = { idaction: json.wardenAction.idaction };
	if (json.doc) n.doc = { ...json.doc };
	n.parent = parent;
	if (Array.isArray(json.children)) {
		n.children = json.children.map((c) => nodeFromJSON(c, n));
	}
	return n;
}

/** Hidrata y reindexa la raíz (id="" y descendientes). */
export function rootFromJSON(json: PersistedNodeJSON): RootNode {
	const root = nodeFromJSON(json) as RootNode;
	root.reindex("");
	return root;
}
