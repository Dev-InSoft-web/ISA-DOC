/**
 * Definiciones genéricas del modelo de árbol consumidas por toda la cascada
 * `_treeAdapter`. Vive en `_defgen` (definiciones genéricas) junto al estado
 * reactivo (`01-complex-control.ts`).
 *
 * Concepto único: NODO. El framework consume nodos. Cada nodo es una
 * instancia concreta de `TreeNode` (o subclase) que carga TODOS los datos
 * tree-adaptados (flatPath, ireference, kind, label, props particulares)
 * en sus propias propiedades. Los hijos siempre son nodos.
 *
 * `obj` es una referencia OPCIONAL al registro original EXTERNO (no
 * adaptado al árbol) — útil para round-trip a la fuente de datos
 * (p.ej. `TableSection` cargado desde el esquema). NO es la auto-referencia
 * al propio nodo, NI duplica los campos del árbol: el nodo SÍ es la
 * estructura adaptada al árbol; `obj` es lo que aún no estaba adaptado.
 *
 * Cascada de tipos (sin `Omit`/`Pick` — todos los campos enumerados
 * explícitamente):
 *   `INode<TObj>`     → contrato del nodo. `children: INode<TObj>[]`,
 *                       `obj?: TObj`.
 *   `ITreeData<TObj>` → alias retro-compatible de `INode<TObj>`.
 *   `TreeNode<TObj>`  → clase base concreta que implementa `INode<TObj>`.
 *
 * Las subclases concretas (`TSqlNodeUX`, `TTableNodeUX`, …) extienden
 * `TreeNode<RawSourceType>` y añaden EXCLUSIVAMENTE las props particulares
 * de su dominio (rowName, colType, prefix, …) sin redeclarar los campos
 * comunes del árbol ni introducir sinónimos.
 */

/* ─────────────────────────────────────────────────────────────────────── */
/* Contrato del nodo del árbol.                                             */
/* ─────────────────────────────────────────────────────────────────────── */

export interface INode<T = any> {
	/** Ruta plana del nodo en notación punteada ("1", "1.2", …). */
	flatPath: string;
	/** Ruta plana del padre (vacío si es raíz). */
	ireference: string;
	/** Discriminador semántico del nodo (definido por la subclase). */
	kind: string;
	/** Texto visual primario del nodo. */
	label: string;
	/** Stack/contenedor al que pertenece el nodo. */
	stack: any;
	/** Identificador del stack (opaco para el adapter). */
	istack: string;
	/** Nombre del campo identificador del stack. */
	nistack: string;
	/** ¿El nodo es hoja (no admite hijos)? */
	isLeaf: boolean;
	/** ¿El nodo es penúltimo nivel (sus hijos directos son hojas)? */
	isPenultimate: boolean;
	/** Título del siguiente nivel jerárquico (si aplica). */
	nextLevelTitle: string;
	/** ¿El nodo es el último de su nivel? */
	isLast: boolean;
	/** Hijos del árbol (SIEMPRE nodos, nunca objetos crudos). */
	children: T[];
	/**
	 * Referencia opcional al registro original externo (NO adaptado al
	 * árbol) desde donde se trajeron los datos del nodo. P.ej. un
	 * `TableSection` del esquema crudo. No contiene `flatPath` ni
	 * `kind` — son responsabilidad del nodo, no del registro fuente.
	 */
	obj?: unknown;
	/** Si el nodo rechaza recibir a `child` como hijo. */
	acceptsChild?(child: T): boolean;
	/** Regla opcional de orden de hijos directos (no propaga a nietos). */
	sortChildren?(children: T[]): T[];
	/** Veto fino de drop específico (segunda barrera tras `acceptsChild`). */
	canPlaceChildAt?(src: T, target: T, position: "before" | "after"): boolean;
	/** Predicado de congelamiento individual (consultado por `monarchy`). */
	freeze?(): boolean;
	/** Copia superficial e independiente del nodo (usada por wardens). */
	clone?(): T;
	/** Permite que las subclases añadan props particulares de dominio. */
	[k: string]: any;
}

/** Alias retro-compatible: misma forma que `INode<T>`. */
export type ITreeData<T = any> = INode<T>;

/* ─────────────────────────────────────────────────────────────────────── */
/* Clase base de nodo: TODA clase de nodo concreta extiende esta.           */
/* ─────────────────────────────────────────────────────────────────────── */

/**
 * Base unificada para nodos de árbol. Las subclases concretas SOLO añaden
 * sus props particulares (rowName, colType, prefix, etc.) sin redeclarar
 * los campos heredados ni introducir sinónimos.
 *
 * `T` es el tipo recursivo del nodo (las subclases pasan su propio tipo,
 * p.ej. `extends TreeNode<TSqlNodeUX>`) — define la forma de `children`
 * y de los callbacks (`acceptsChild`, `sortChildren`, …).
 */
export abstract class TreeNode<T = any> implements INode<T> {
	/** Estructura de árbol. */
	public flatPath: string = "";
	public ireference: string = "";
	public kind: string = "";
	public label: string = "";
	public stack: any = null;
	/**
	 * `istack`/`nistack` son abstractos: cada subclase concreta debe
	 * exponerlos (getter derivado o campo). El interfaz `INode<T>` los
	 * requiere y aquí evitamos colisión entre campo de instancia y getter.
	 */
	public abstract istack: string;
	public abstract nistack: string;
	public isLeaf: boolean = false;
	public isPenultimate: boolean = false;
	public nextLevelTitle: string = "";
	public isLast: boolean = false;
	/** Hijos del árbol (siempre nodos del mismo tipo recursivo). */
	public children: T[] = [];
	/** Registro original externo (no adaptado al árbol). Opcional. */
	public obj?: unknown;

	/** Banderas adicionales de UX (no parte del contrato genérico). */
	public depth: number = 0;
	public levelTitle: string = "";
	public isSelected: boolean = false;
	public hasChildren: boolean = false;
	public isFirst: boolean = false;
	public isCollapsed: boolean = false;

	/**
	 * Cadena kebab-case de roles actorales (estilo "clases CSS"). Reconocidos:
	 * `atom`, `group`, `warden`, `prison`, `hermetic`, `cell`, `freezer`,
	 * `monarchy`. Combinables. `warden|prison|hermetic` infieren `group`.
	 * Vacío = legacy / sin actor.
	 */
	public actor: string = "";

	/** Profundidad inferida de la ruta plana (cuenta de puntos). */
	protected computeDepthFromPath(): number {
		const raw = String(this.flatPath || "").trim();
		return raw ? (raw.match(/\./g) || []).length : 0;
	}

	/**
	 * Copia superficial preservando el prototipo (mantiene los métodos de la
	 * clase concreta) y reseteando `children` para que el clon no comparta
	 * referencia con el original. Usada por la pipeline de wardens.
	 */
	clone(): T {
		const proto = Object.getPrototypeOf(this);
		const c: any = Object.create(proto);
		Object.assign(c, this);
		c.children = [];
		return c as T;
	}
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Helpers de normalización del árbol.                                      */
/* ─────────────────────────────────────────────────────────────────────── */

const stripUiPrefix = (raw: unknown): string => String(raw ?? "").replace(/^(_UP_|_M_)/, "").trim();

/**
 * Normaliza recursivamente los `flatPath`/`ireference` de los nodos
 * (quita prefijos UI `_UP_`/`_M_`). Mutación in-situ. Retorna el mismo
 * arreglo con los hijos también normalizados.
 *
 * Las clases-nodo SON los nodos del árbol — esta función NO crea wrappers
 * paralelos. La estructura de hijos debe ya estar materializada por el
 * `buildTree` del adapter antes de invocar esta normalización.
 */
export function normalizeRoots<T extends INode<any>>(roots: readonly T[]): T[] {
	for (const r of roots) {
		const flat = stripUiPrefix(r.flatPath);
		if (flat) r.flatPath = flat;
		const iref = stripUiPrefix(r.ireference);
		if (iref) r.ireference = iref;
		const kids = r.children;
		if (kids && kids.length) normalizeRoots(kids as readonly INode<any>[]);
	}
	return roots as T[];
}

/**
 * Alias retro-compatible: el adapter llamaba a esta función para construir
 * la estructura paralela. Hoy los nodos SON las clases — la función se
 * limita a normalizar los flatPath/ireference y devolver los mismos
 * nodos (sin parallel-wrapping).
 */
export function objRootsToNodes<T extends INode<any>>(
	roots: readonly T[],
	_labelFn?: (obj: T) => string,
): INode<any>[] {
	void _labelFn;
	return normalizeRoots(roots) as INode<any>[];
}
