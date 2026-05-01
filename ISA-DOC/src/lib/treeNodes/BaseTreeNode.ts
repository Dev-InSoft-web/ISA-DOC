import type {
	NodeKind,
	NodeValidation,
	PersistedNodeDocJSON,
	PersistedNodeJSON,
	PersistedWardenRefJSON,
} from "./types.ts";

/**
 * Clase abstracta com\u00fan a todos los nodos del \u00e1rbol persistido.
 *
 * Responsabilidades:
 *  - Mantener jerarqu\u00eda (parent/children) en memoria.
 *  - Serializar/deserializar a JSON estable (`toJSON`).
 *  - Recalcular `id` jer\u00e1rquico (`reindex`) sin almacenarlo redundante.
 *  - Validar invariantes propios del kind (`validate`).
 *  - Declarar qu\u00e9 kinds puede tener como hijo (`allowedChildKinds`).
 *
 * NO contiene l\u00f3gica de UI; es independiente de Svelte.
 */
export abstract class BaseTreeNode<TObj extends Record<string, unknown> = Record<string, unknown>> {
	public abstract readonly kind: NodeKind;
	public id: string = "";
	public obj: TObj;
	public doc?: PersistedNodeDocJSON;
	public wardenAction?: PersistedWardenRefJSON;
	public parent: BaseTreeNode | null = null;
	public children: BaseTreeNode[] = [];

	constructor(obj: Partial<TObj> = {}) {
		this.obj = { ...(obj as TObj) };
	}

	/** Kinds permitidos como hijos directos. Default: ninguno (hojas). */
	public allowedChildKinds(): readonly NodeKind[] { return []; }

	/** Validaci\u00f3n por kind. Default: sin reglas. */
	public validate(): NodeValidation { return { errors: [], warnings: [] }; }

	/**
	 * Recalcula el `id` jer\u00e1rquico de este sub\u00e1rbol. La ra\u00edz tiene `id=""`,
	 * sus hijos `"1"`, `"2"`, ..., y los nietos `"1.1"`, `"1.2"`, etc.
	 */
	public reindex(prefix: string = ""): void {
		this.id = prefix;
		this.children.forEach((c, i) => {
			const cid = prefix ? `${prefix}.${i + 1}` : String(i + 1);
			c.parent = this;
			c.reindex(cid);
		});
	}

	/** Agrega un hijo respetando `allowedChildKinds`. Lanza si no es v\u00e1lido. */
	public addChild(child: BaseTreeNode): void {
		const allowed = this.allowedChildKinds();
		if (!allowed.includes(child.kind)) {
			throw new Error(`Nodo '${this.kind}' no acepta hijos de tipo '${child.kind}'.`);
		}
		child.parent = this;
		this.children.push(child);
	}

	/** Walk recursivo en preorden. */
	public *walk(): IterableIterator<BaseTreeNode> {
		yield this;
		for (const c of this.children) yield* c.walk();
	}

	/** Devuelve los kinds de la cadena de ancestros (outermost\u2192parent). */
	public ancestorChain(): BaseTreeNode[] {
		const chain: BaseTreeNode[] = [];
		let cur: BaseTreeNode | null = this.parent;
		while (cur) {
			chain.unshift(cur);
			cur = cur.parent;
		}
		return chain;
	}

	/** Serializaci\u00f3n com\u00fan; las subclases pueden ajustar `obj`. */
	public toJSON(): PersistedNodeJSON {
		const out: PersistedNodeJSON = { id: this.id, kind: this.kind };
		const obj = this.serializeObj();
		if (obj && Object.keys(obj).length) out.obj = obj;
		if (this.wardenAction) out.wardenAction = { idaction: this.wardenAction.idaction };
		if (this.doc) out.doc = { ...this.doc };
		if (this.children.length) out.children = this.children.map((c) => c.toJSON());
		return out;
	}

	/**
	 * Subclases pueden filtrar/normalizar qu\u00e9 entra al `obj` persistido. Por
	 * defecto persiste el `obj` completo.
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
