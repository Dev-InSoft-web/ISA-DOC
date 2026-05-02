import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation } from "./types.ts";

export interface DomainObj {
	domainId: string;
	masterTable: string;
}

/**
 * Nodo "dominio funcional". Agrupador conceptual master/slave. No transforma
 * SQL (no tiene `wardenAction`); existe para la navegación y generación de
 * código de módulos.
 */
export class DomainNode extends BaseTreeNode<DomainObj> {
	public readonly kind = "domain" as const;

	public override allowedChildKinds(): readonly NodeKind[] {
		return ["table", "prefix"];
	}

	public override validate(): NodeValidation {
		const errors: string[] = [];
		if (!this.obj.domainId) errors.push("`domainId` es obligatorio en un DomainNode.");
		if (!this.obj.masterTable) errors.push("`masterTable` es obligatorio en un DomainNode.");
		return { errors, warnings: [] };
	}
}
