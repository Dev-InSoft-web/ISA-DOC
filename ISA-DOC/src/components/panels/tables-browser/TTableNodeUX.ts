import { TreeNode } from "../../_comps/TreeView/_treeAdapter/_defgen/00-tree-data";
import type { WardenAction, WardenDraft } from "../../_comps/TreeView/_treeAdapter/06-roles";
import type { INode } from "../../_comps/TreeView/_treeAdapter/_defgen/00-tree-data";

export type TableTreeKind = "domain" | "pivot" | "prefix" | "table";

/**
 * Base de datos del nodo de tablas. Extiende `TreeNode` (la base genérica
 * del modelo de árbol) y añade EXCLUSIVAMENTE las props particulares del
 * dominio "tablas". No redefine `flatPath`/`ireference`/`kind` ni los
 * accesores de UX: esos viven en `TreeNode`.
 */
export abstract class TTableNodeBase extends TreeNode<TTableNodeUX> {
	public declare kind: TableTreeKind;

	stackId: string = "tables";
	rowName: string = "";
	tableKey: string = "";
	tableIndex: number = -1;
	prefix: string = "";
	colCount: number = 0;
	/** Id del dominio al que pertenece este nodo (si aplica). */
	domainId: string = "";
	/** Si la tabla es master de su dominio. */
	isMaster: boolean = false;
	/**
	 * Acción vigilante declarada por este nodo (si tiene rol `warden`). Es
	 * obligatoria para los vigilantes; los nodos no-vigilantes la dejan en
	 * `undefined`. Se asigna en `refreshUX` para los `prefix`.
	 */
	wardenAction?: WardenAction<TTableNodeUX>;
}

export class TTableNodeUX extends TTableNodeBase {
	constructor(data?: Partial<TTableNodeBase> & { flatPath?: string; ireference?: string; kind?: TableTreeKind }, stack?: any) {
		super();
		this.kind = "table";
		if (data) Object.assign(this, data);
		if (stack) this.stack = stack;
		this.refreshUX();
	}

	get istack(): string { return this.stackId; }
	get nistack(): string { return "stackId"; }

	public refreshUX(): void {
		this.depth = this.computeDepthFromPath();
		this.isLeaf = this.kind === "table";
		this.isLast = this.kind === "table";
		this.isPenultimate = this.kind === "prefix" || this.kind === "domain" || this.kind === "pivot";
		this.levelTitle = this.kind === "domain" ? "Dominio" : this.kind === "pivot" ? "Pivote" : this.kind === "prefix" ? "Prefijo" : "Tabla";
		this.nextLevelTitle = "Tabla";
		this.label = this.rowName || "";
		// Roles actorales (kebab-case, estilo "clases CSS"). Inferidos por kind.
		// `domain`/`pivot`: prison + monarchy (master congelado).
		// `prefix`: prison + warden → acción declarada en `wardenAction`.
		// `table`: atom — hoja sin rol especial.
		this.actor = (this.kind === "domain" || this.kind === "pivot")
			? "group prison monarchy"
			: this.kind === "prefix"
				? "group prison warden"
				: "atom";
		// La acción vigilante se adjunta sólo para `prefix`. El `idaction` es
		// `"prefix"` y la transformación antepone `prefix` al `rowName` del clon.
		if (this.kind === "prefix") {
			const pfx = String(this.prefix || "");
			this.wardenAction = {
				idaction: "prefix",
				actionsOverNode: (_child: INode<TTableNodeUX>, draft: WardenDraft<TTableNodeUX>): WardenDraft<TTableNodeUX> => {
					const dec = draft.decoratedObj;
					dec.rowName = pfx + (dec.rowName ?? "");
					return draft;
				},
			};
		} else {
			this.wardenAction = undefined;
		}
	}

	/**
	 * Contrato del rol `monarchy` (ancestro `domain`): el master del dominio
	 * queda congelado (no se puede mover ni arrastrar fuera). Para liberarlo
	 * hay que liberar el dominio. Los esclavos NO se congelan.
	 */
	freeze(): boolean {
		return !!this.isMaster && (this.kind === "table" || this.kind === "domain" || this.kind === "pivot");
	}

	/**
	 * Reglas de aceptación de hijos.
	 * Default (agrupadores): aceptan a cualquier otro nodo agrupador o hoja.
	 * Reglas particulares:
	 * - `domain`: rechaza dominios anidados (regla propia y única del dominio) y rechaza pivots.
	 * - `pivot`: acepta tablas y dominios. Rechaza otros pivots y prefijos
	 *   (un pivot agrupa tablas/dominios que se comunican vía GET; no se anidan).
	 * - `table`: hoja. Nunca acepta hijos.
	 */
	acceptsChild(child: TTableNodeUX): boolean {
		if (this.kind === "table") return false;
		if (this.kind === "domain" && (child.kind === "domain" || child.kind === "pivot")) return false;
		if (this.kind === "pivot" && child.kind === "prefix") return false;
		return true;
	}

	/**
	 * Regla de orden por agrupador:
	 * - `domain`/`pivot`: master siempre primero; el resto conserva el orden actual.
	 * - `prefix` y `table`: sin regla (preservar orden visual).
	 */
	sortChildren(children: TTableNodeUX[]): TTableNodeUX[] {
		if (this.kind !== "domain" && this.kind !== "pivot") return children;
		// `Array.prototype.sort` es estable en JS moderno; los empates conservan el orden.
		return children.slice().sort((a, b) => {
			const am = a.isMaster ? 0 : 1;
			const bm = b.isMaster ? 0 : 1;
			return am - bm;
		});
	}

	/**
	 * Veto fino de posición: en un dominio o pivote, ningún nodo puede quedar antes del master.
	 */
	canPlaceChildAt(src: TTableNodeUX, target: TTableNodeUX, position: "before" | "after"): boolean {
		if (this.kind !== "domain" && this.kind !== "pivot") return true;
		if (src.isMaster) return true;
		if (target.isMaster && position === "before") return false;
		return true;
	}
}
