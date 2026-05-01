import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind } from "./types.ts";

/**
 * Ra\u00edz sint\u00e9tica del \u00e1rbol. Su `obj` est\u00e1 vac\u00edo; existe solo como
 * contenedor para los hijos de primer nivel (prefijos, dominios y tablas
 * bare).
 */
export class RootNode extends BaseTreeNode<Record<string, never>> {
	public readonly kind = "root" as const;
	public override allowedChildKinds(): readonly NodeKind[] {
		return ["prefix", "domain", "table", "col"];
	}
}
