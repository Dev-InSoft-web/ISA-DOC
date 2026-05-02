/**
 * Registro `kind → class` para el editor SQL en tiempo real.
 *
 * Permite asociar cada `kind` semántico (`prefix`, `table`, `col`,
 * `optional`, `domain`, …) a su clase TS concreta UNA SOLA VEZ y que
 * el parser/updater resuelva via `registry.build(kind, mergedObj)`
 * en vez de hacer `if (kind === "...") new X()`.
 *
 * El registro vive en el adapter realtime — no es global, cada
 * instancia puede tener su propio mapeo.
 */

export type NodeKindCtor<TNode = unknown> = new (obj?: any, ...rest: any[]) => TNode;

export interface KindRegistration<TNode = unknown> {
	kind: string;
	ctor: NodeKindCtor<TNode>;
	/** Nombre de la entidad SQL referenciada. `null` ⇒ kind estructural. */
	ireference?: string | null;
}

export class KindRegistry<TNode = unknown> {
	private readonly map = new Map<string, KindRegistration<TNode>>();

	register(entry: KindRegistration<TNode>): this {
		this.map.set(entry.kind, entry);
		return this;
	}

	registerMany(entries: ReadonlyArray<KindRegistration<TNode>>): this {
		for (const e of entries) this.map.set(e.kind, e);
		return this;
	}

	has(kind: string): boolean { return this.map.has(kind); }

	get(kind: string): KindRegistration<TNode> | undefined { return this.map.get(kind); }

	require(kind: string): KindRegistration<TNode> {
		const e = this.map.get(kind);
		if (!e) throw new Error(`[KindRegistry] kind no registrado: '${kind}'.`);
		return e;
	}

	build(kind: string, obj?: unknown, ...rest: unknown[]): TNode {
		const { ctor } = this.require(kind);
		return new ctor(obj, ...rest);
	}

	*entries(): IterableIterator<KindRegistration<TNode>> {
		for (const v of this.map.values()) yield v;
	}

	isStructural(kind: string): boolean {
		const e = this.map.get(kind);
		return !!e && (e.ireference === null || e.ireference === undefined);
	}

	entityFor(kind: string): string | undefined {
		const e = this.map.get(kind);
		return e?.ireference ?? undefined;
	}
}
