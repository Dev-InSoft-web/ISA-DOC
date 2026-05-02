import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind } from "./types.ts";

/**
 * Raíz sintética del árbol. Su `obj` está vacío; existe solo como
 * contenedor para los hijos de primer nivel (prefijos, dominios y tablas
 * bare).
 */
export class RootNode extends BaseTreeNode<Record<string, never>> {
	public readonly kind = "root" as const;
	public override allowedChildKinds(): readonly NodeKind[] {
		return ["prefix", "domain", "table", "col"];
	}
}
