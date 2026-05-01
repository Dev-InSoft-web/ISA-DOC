import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation } from "./types.ts";

export interface PrefixObj {
	rowName: string;
	prefix: string;
}

/**
 * Nodo agrupador "prefijo SQL". Es un vigilante: al emitir SQL concatena su
 * `prefix` al `rowName` de cada descendiente.
 */
export class PrefixNode extends BaseTreeNode<PrefixObj> {
	public readonly kind = "prefix" as const;

	constructor(obj: Partial<PrefixObj> = {}) {
		super({ rowName: obj.rowName ?? obj.prefix ?? "", prefix: obj.prefix ?? "" });
		this.wardenAction = { idaction: "prefix" };
	}

	get prefix(): string { return this.obj.prefix; }
	set prefix(v: string) { this.obj.prefix = v; this.obj.rowName = v; }

	public override allowedChildKinds(): readonly NodeKind[] {
		return ["prefix", "domain", "table"];
	}

	public override validate(): NodeValidation {
		const errors: string[] = [];
		const warnings: string[] = [];
		const p = this.obj.prefix ?? "";
		if (!p) errors.push("El prefijo no puede estar vac\u00edo.");
		if (p && !p.endsWith("_")) warnings.push("Por convenci\u00f3n el prefijo debe terminar en `_`.");
		if (p && p !== p.toUpperCase()) warnings.push("Por convenci\u00f3n el prefijo debe estar en may\u00fasculas.");
		if (this.obj.rowName !== this.obj.prefix) {
			warnings.push("`rowName` debe coincidir con `prefix` en un PrefixNode.");
		}
		return { errors, warnings };
	}
}
