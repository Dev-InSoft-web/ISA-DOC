import { TreeNode } from "../../_comps/TreeViewLegacy/_treeAdapter/_defgen/00-tree-data";
import type { WardenAction, WardenDraft } from "../../_comps/TreeViewLegacy/_treeAdapter/06-roles";
import type { INode } from "../../_comps/TreeViewLegacy/_treeAdapter/_defgen/00-tree-data";

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
	 * Subtipo del agrupador cuando `kind === "pivot"` o `kind === "domain"`:
	 * - `domain`: dominio raíz (default cuando kind=domain).
	 * - `pivot`: pivote N:N (exactamente master + 1 slave).
	 * - `pivot-domain`: pivote dentro de dominio que envuelve a otro dominio (1:1 ó 1:N).
	 */
	domainType: "domain" | "pivot" | "pivot-domain" = "domain";
	/** Cardinalidad del pivote respecto a su dominio padre. Sólo aplica a pivot/pivot-domain. */
	cardinality: "1:1" | "1:N" | "N:N" | "" = "";
	/** Cardinalidad de la tabla esclava respecto a su master (deriva del pivote contenedor o del dominio). */
	slaveCardinality: "1:1" | "1:N" | "N:N" | "" = "";
	/** True para un pivot N:N que tiene sólo el master (le falta el slave). UI lo muestra en rojo. */
	pivotMissingSlave: boolean = false;
	/**
	 * `true` si esta fila es un apuntador (espectro) a una tabla definida fuera del dominio padre.
	 * El `tableKey` y `tableIndex` apuntan a la tabla real para que toda la lógica
	 * (selección, snippets, formularios) opere sobre ella sin cambios.
	 */
	isPointer: boolean = false;
	/**
	 * Acción vigilante declarada por este nodo (si tiene rol `warden`). Es
	 * obligatoria para los vigilantes; los nodos no-vigilantes la dejan en
	 * `undefined`. Se asigna en `refreshUX` para los `prefix`.
	 */
	wardenAction?: WardenAction<TTableNodeUX>;
}

export class TTableNodeUX extends TTableNodeBase {
	constructor(data?: Partial<TTableNodeBase> & { flatPath?: string; ireference?: string; kind?: TableTreeKind }, _stack?: unknown) {
		super();
		this.kind = "table";
		if (data) Object.assign(this, data);
		this.refreshUX();
	}

	get istack(): string { return this.stackId; }
	get nistack(): string { return "stackId"; }

	public refreshUX(): void {
		this.depth = this.computeDepthFromPath();
		this.levelTitle = this.kind === "domain" ? "Dominio" : this.kind === "pivot" ? "Pivote" : this.kind === "prefix" ? "Prefijo" : "Tabla";
		// Roles actorales (kebab-case, estilo "clases CSS"). Inferidos por kind.
		// `domain`: prison + monarchy; si tiene `prefix` también actúa como `warden` (aplica prefijo a sus tablas hijas
		// y se compone con el de un `prefix` padre → doble prefijo en las descendientes).
		// `pivot`: prison + monarchy. `prefix`: prison + warden. `table`: atom.
		const isDomainPrefixer = this.kind === "domain" && !!this.prefix;
		this.actor = (this.kind === "domain" || this.kind === "pivot")
			? (isDomainPrefixer ? "group prison monarchy warden" : "group prison monarchy")
			: this.kind === "prefix"
				? "group prison warden"
				: "atom";
		if (this.kind === "prefix" || isDomainPrefixer) {
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
	 * - `domain`: rechaza dominios anidados (regla propia y única del dominio). Acepta pivots
	 *   internos: en ese caso el master del dominio puede modificar también a las miembros del pivote.
	 * - `pivot`: acepta tablas, dominios y otros pivots. Rechaza prefijos.
	 * - `table`: hoja. Nunca acepta hijos.
	 */
	acceptsChild(child: TTableNodeUX): boolean {
		if (this.kind === "table") return false;
		if (this.kind === "domain" && child.kind === "domain") return false;
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
