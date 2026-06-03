import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind } from "./types.ts";

/**
 * Raíz sintética del árbol. Su `obj` está vacío; existe solo como
 * contenedor para los hijos de primer nivel (prefijos, dominios y tablas
 * bare). Por defecto acepta cualquier kind no-`root` como hijo.
 */
export class RootNode extends BaseTreeNode<Record<string, never>> {
	public readonly kind = "root" as const;
	public override acceptsChildKind(kind: NodeKind): boolean { return kind !== "root"; }
}

