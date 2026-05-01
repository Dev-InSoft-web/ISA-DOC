import { TreeNodeUX } from "../../_comps/TreeView/TreeRowView.svelte";
import type { WardenAction, WardenDraft } from "../../_comps/TreeView/_treeAdapter/06-roles";
import type { INode } from "../../_comps/TreeView/_asRow/_rowAdapter/00-base";

export type TableTreeKind = "domain" | "prefix" | "table";

export class TTableNodeBase {
	rowId: string = "";
	ireference: string = "";
	stackId: string = "tables";
	kind: TableTreeKind = "table";
	rowName: string = "";
	tableKey: string = "";
	tableIndex: number = -1;
	prefix: string = "";
	colCount: number = 0;
	/** Id del dominio al que pertenece este nodo (si aplica). */
	domainId: string = "";
	/** Si la tabla es master de su dominio. */
	isMaster: boolean = false;
	/** Roles actorales (kebab-case). Se computa en `refreshUX` desde `kind`. */
	actor: string = "";
	/**
	 * Acción vigilante declarada por este nodo (si tiene rol `warden`). Es
	 * obligatoria para los vigilantes; los nodos no-vigilantes la dejan en
	 * `undefined`. Se asigna en `refreshUX` para los `prefix`.
	 */
	wardenAction?: WardenAction<TTableNodeUX>;
}

export class TTableNodeUX extends TreeNodeUX(TTableNodeBase)<TTableNodeUX> {
	public declare stack: any;

	constructor(data?: Partial<TTableNodeBase>, stack?: any) {
		super();
		if (data) Object.assign(this, data);
		this.obj = this as unknown as TTableNodeUX;
		if (stack) this.stack = stack;
		this.refreshUX();
	}

	get id(): string { return String(this.rowId || "").replace(/^(_UP_|_M_)/, "").trim(); }
	set id(value: string) { this.rowId = value; }

	/** Discriminador estable para reglas de aceptación de los agrupadores. */
	get type(): TableTreeKind { return this.kind; }

	get istack(): string { return this.stackId; }
	get nistack(): string { return "stackId"; }

	public refreshUX(): void {
		const raw = String(this.rowId || "").trim();
		const dotCount = raw ? (raw.match(/\./g) || []).length : 0;
		this.depth = dotCount;
		this.isLeaf = this.kind === "table";
		this.isLast = this.kind === "table";
		this.isPenultimate = this.kind === "prefix" || this.kind === "domain";
		this.levelTitle = this.kind === "domain" ? "Dominio" : this.kind === "prefix" ? "Prefijo" : "Tabla";
		this.nextLevelTitle = "Tabla";
		this.label = this.rowName || "";
		// Roles actorales (kebab-case, estilo "clases CSS"). Inferidos por kind.
		// `domain`: prison + monarchy.
		// `prefix`: prison + warden → acción declarada en `wardenAction`.
		// `table`: atom — hoja sin rol especial.
		this.actor = this.kind === "domain"
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
		return this.kind === "table" && !!this.isMaster;
	}

	clone(): TTableNodeUX {
		const c = Object.create(TTableNodeUX.prototype) as TTableNodeUX;
		Object.assign(c, this);
		c.children = [];
		return c;
	}

	/**
	 * Reglas de aceptación de hijos.
	 * Default (agrupadores): aceptan a cualquier otro nodo agrupador o hoja.
	 * Reglas particulares:
	 * - `domain`: rechaza dominios anidados (regla propia y única del dominio).
	 * - `table`: hoja. Nunca acepta hijos.
	 */
	acceptsChild(child: TTableNodeUX): boolean {
		if (this.type === "table") return false;
		if (this.type === "domain" && child.type === "domain") return false;
		return true;
	}

	/**
	 * Regla de orden por agrupador:
	 * - `domain`: master siempre primero; el resto conserva el orden actual.
	 * - `prefix` y `table`: sin regla (preservar orden visual).
	 */
	sortChildren(children: TTableNodeUX[]): TTableNodeUX[] {
		if (this.kind !== "domain") return children;
		// `Array.prototype.sort` es estable en JS moderno; los empates conservan el orden.
		return children.slice().sort((a, b) => {
			const am = a.isMaster ? 0 : 1;
			const bm = b.isMaster ? 0 : 1;
			return am - bm;
		});
	}

	/**
	 * Veto fino de posición: en un dominio, ningún nodo puede quedar antes del master.
	 * - `before <master>`: prohibido (saldría arriba del master).
	 * - `after <slave>` ó `before <slave>`: permitido (master ya queda arriba por sortChildren).
	 */
	canPlaceChildAt(src: TTableNodeUX, target: TTableNodeUX, position: "before" | "after"): boolean {
		if (this.kind !== "domain") return true;
		if (src.isMaster) return true;
		if (target.isMaster && position === "before") return false;
		return true;
	}
}
