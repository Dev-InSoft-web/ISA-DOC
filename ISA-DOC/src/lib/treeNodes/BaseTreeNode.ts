import type {
	NodeKind,
	NodeValidation,
	PersistedNodeDocJSON,
	PersistedNodeJSON,
	PersistedWardenRefJSON,
} from "./types.ts";
import type { NodeRoleVector } from "../../components/_comps/TreeView/_treeAdapter/_defgen/00-tree-data.ts";

/**
 * Clase abstracta común a todos los nodos del árbol persistido.
 *
 * Implementa el subconjunto estructural del contrato `INode<T>` que vive en
 * el ecosistema TreeView (`flatPath`, `ireference`, `kind`, `label`,
 * `children`, `obj`, `acceptsChild`, `freeze`, `clone`, `isLeaf`). De esta
 * forma todos los nodos del proyecto “hablan” la misma nomenclatura, sin
 * importar si están en el lado de persistencia o en el lado de UX.
 *
 * Responsabilidades:
 *  - Mantener jerarquía (`parent`/`children`) en memoria.
 *  - Serializar/deserializar a JSON estable (`toJSON`).
 *  - Recalcular `flatPath` (alias `id`) jerárquico (`reindex`).
 *  - Validar invariantes propios del kind (`validate`).
 *  - Decidir, hijo a hijo, si lo acepta como descendiente directo
 *    (`acceptsChildKind`). Por defecto acepta cualquier kind: las
 *    restricciones se declaran en las subclases.
 *  - Normalizar automáticamente el contenido de `obj` antes de persistir o
 *    de validar (`normalize`). Es el lugar donde las nomenclaturas SQL
 *    se fuerzan a mayúsculas, los espacios se colapsan, etc.
 *
 * NO contiene lógica de UI; es independiente de Svelte.
 */
export abstract class BaseTreeNode<TObj extends object = Record<string, unknown>> {
	public abstract readonly kind: NodeKind;
	/** Ruta plana jerárquica ("", "1", "1.2", …). Alias estable: `id`. */
	public flatPath: string = "";
	public obj: TObj;
	public doc?: PersistedNodeDocJSON;
	public wardenAction?: PersistedWardenRefJSON;
	public parent: BaseTreeNode<any> | null = null;
	public children: BaseTreeNode<any>[] = [];

	/**
	 * Bandera de visibilidad/procesamiento. Cuando es `false`, todos los
	 * algoritmos (emisión SQL, snippets, validación derivada) deben
	 * ignorar este nodo y su subárbol. NO es una eliminación: la fila se
	 * conserva en el árbol y en JSON. Default `true`.
	 */
	public active: boolean = true;

	/**
	 * Vector de rol actoral. Cada slot es opcional; si está `undefined` el
	 * algoritmo aplicará el default dimensional (`group` / `prison` /
	 * `unanchored` / `distracted`) sin quemarlo en la instancia.
	 */
	public roleVector: NodeRoleVector = {};

	constructor(obj: Partial<TObj> = {}, roleVector: NodeRoleVector = {}) {
		this.obj = { ...(obj as TObj) };
		this.roleVector = { ...roleVector };
		this.normalize();
	}

	/* ────────── Compatibilidad con el contrato `INode<T>` ────────── */

	/** Alias retro: muchas partes del código persistente leen `node.id`. */
	public get id(): string { return this.flatPath; }
	public set id(v: string) { this.flatPath = v; }

	/** Ruta plana del padre (vacía si es raíz). */
	public get ireference(): string { return this.parent?.flatPath ?? ""; }

	/** Texto humano por defecto (las subclases pueden sobreescribir). */
	public get label(): string {
		const o = this.obj as Record<string, unknown>;
		return String(o.rowName ?? o.name ?? o.tableRef ?? o.prefix ?? this.kind);
	}

	/** ¿Hoja? (compatíble con `INode.isLeaf`). */
	public get isLeaf(): boolean { return this.children.length === 0; }

	/**
	 * Decide si `child` puede colocarse como hijo directo. Default: delega
	 * en `acceptsChildKind(child.kind)`. Las subclases pueden sobreescribir
	 * cuando necesiten reglas que dependan del nodo concreto, no sólo del
	 * `kind` (p.ej. límite de cantidad).
	 */
	public acceptsChild(child: BaseTreeNode<any>): boolean { return this.acceptsChildKind(child.kind); }

	/**
	 * Por defecto cualquier kind es admisible: las restricciones se declaran
	 * caso a caso en las implementaciones. Devolver `false` rechaza la
	 * colocación del kind como hijo directo.
	 */
	public acceptsChildKind(_kind: NodeKind): boolean { return true; }

	/** Predicado de congelamiento individual (compatíble con `INode.freeze`). */
	public freeze(): boolean { return false; }

	/**
	 * Hook de normalización automática sobre `this.obj`. Se invoca al final
	 * del constructor y al inicio de `toJSON`. Por defecto no hace nada;
	 * las subclases SQL fuerzan ahí las nomenclaturas (uppercase, etc.).
	 */
	protected normalize(): void { /* default: noop */ }

	/* ────────── API estructural ────────── */

	/** Validación por kind. Default: sin reglas. */
	public validate(): NodeValidation { return { errors: [], warnings: [] }; }

	/**
	 * Recalcula el `flatPath` jerárquico de este subárbol. La raíz tiene
	 * `flatPath=""`, sus hijos `"1"`, `"2"`, …, y los nietos `"1.1"`, …
	 */
	public reindex(prefix: string = ""): void {
		this.flatPath = prefix;
		this.children.forEach((c, i) => {
			const cid = prefix ? `${prefix}.${i + 1}` : String(i + 1);
			c.parent = this;
			c.reindex(cid);
		});
	}

	/** Agrega un hijo respetando `acceptsChild`. Lanza si no es válido. */
	public addChild(child: BaseTreeNode<any>): void {
		if (!this.acceptsChild(child)) {
			throw new Error(`Nodo '${this.kind}' no acepta hijos de tipo '${child.kind}'.`);
		}
		child.parent = this;
		this.children.push(child);
	}

	/** Walk recursivo en preorden. */
	public *walk(): IterableIterator<BaseTreeNode<any>> {
		yield this;
		for (const c of this.children) yield* c.walk();
	}

	/** Devuelve la cadena de ancestros (outermost→parent). */
	public ancestorChain(): BaseTreeNode<any>[] {
		const chain: BaseTreeNode<any>[] = [];
		let cur: BaseTreeNode<any> | null = this.parent;
		while (cur) {
			chain.unshift(cur);
			cur = cur.parent;
		}
		return chain;
	}

	/** Copia superficial preservando el prototipo (compat con `INode.clone`). */
	public clone(): this {
		const proto = Object.getPrototypeOf(this);
		const c = Object.create(proto) as this;
		Object.assign(c, this);
		c.flatPath = this.flatPath;
		c.active = this.active;
		c.obj = { ...(this.obj as object) } as TObj;
		c.children = [];
		c.parent = null;
		return c;
	}

	/** Serialización común; las subclases pueden ajustar `obj`. */
	public toJSON(): PersistedNodeJSON {
		this.normalize();
		const out: PersistedNodeJSON = { id: this.flatPath, kind: this.kind };
		if (this.active === false) out.active = false;
		const obj = this.serializeObj();
		if (obj && Object.keys(obj).length) out.obj = obj;
		if (this.wardenAction) out.wardenAction = { idaction: this.wardenAction.idaction };
		if (this.doc) out.doc = { ...this.doc };
		if (this.children.length) out.children = this.children.map((c) => c.toJSON());
		return out;
	}

	/**
	 * Subclases pueden filtrar/normalizar qué entra al `obj` persistido. Por
	 * defecto persiste el `obj` completo (sin nulos/vacíos).
	 */
	protected serializeObj(): Record<string, unknown> | undefined {
		const o = this.obj as Record<string, unknown>;
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(o)) {
			if (v === undefined || v === null || v === "") continue;
			out[k] = v;
		}
		return Object.keys(out).length ? out : undefined;
	}
}

