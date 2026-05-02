import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation } from "./types.ts";

export interface PrefixObj {
	rowName: string;
	prefix: string;
}

/**
 * Nodo agrupador "prefijo SQL". Es un vigilante: al emitir SQL concatena su
 * `prefix` al `rowName` de cada descendiente. La nomenclatura SQL
 * (uppercase) se fuerza automáticamente desde `normalize()`.
 */
export class PrefixNode extends BaseTreeNode<PrefixObj> {
	public readonly kind = "prefix" as const;

	constructor(obj: Partial<PrefixObj> = {}) {
		super({ rowName: obj.rowName ?? obj.prefix ?? "", prefix: obj.prefix ?? "" });
		this.wardenAction = { idaction: "prefix" };
	}

	get prefix(): string { return this.obj.prefix; }
	set prefix(v: string) {
		this.obj.prefix = v;
		this.obj.rowName = v;
		this.normalize();
	}

	protected override normalize(): void {
		// Forzar mayusculas a nivel SQL: tanto `prefix` como `rowName`.
		const p = (this.obj.prefix ?? "").toUpperCase();
		this.obj.prefix = p;
		this.obj.rowName = p;
	}

	public override acceptsChildKind(kind: NodeKind): boolean {
		return kind === "prefix" || kind === "domain" || kind === "table";
	}

	public override validate(): NodeValidation {
		const errors: string[] = [];
		const warnings: string[] = [];
		const p = this.obj.prefix ?? "";
		if (!p) errors.push("El prefijo no puede estar vacío.");
		if (this.obj.rowName !== this.obj.prefix) {
			warnings.push("`rowName` debe coincidir con `prefix` en un PrefixNode.");
		}
		return { errors, warnings };
	}
}

