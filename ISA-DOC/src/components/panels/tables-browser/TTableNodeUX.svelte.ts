import { TreeNodeUX } from "../../_comps/TreeView/TreeRowView.svelte";

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
		// `domain`: prison → acción liberar.
		// `prefix`: prison + warden → liberar + reglas sobre hijos (rename por prefijo).
		// `table`: atom → hoja sin rol especial.
		this.actor = this.kind === "domain"
			? "group prison monarchy"
			: this.kind === "prefix"
				? "group prison warden"
				: "atom";
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
	 * Reglas de aceptación de hijos (semántica de agrupador).
	 * - `domain`: agrupa tablas. Rechaza dominios anidados (regla del producto).
	 * - `prefix`: agrupa tablas; renombra al moverlas (cambia de prefijo).
	 * - `table`: hoja. Nunca acepta hijos.
	 */
	acceptsChild(child: TTableNodeUX): boolean {
		if (this.type === "domain") return child.type === "table";
		if (this.type === "prefix") return child.type === "table" || child.type === "domain";
		return false;
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
