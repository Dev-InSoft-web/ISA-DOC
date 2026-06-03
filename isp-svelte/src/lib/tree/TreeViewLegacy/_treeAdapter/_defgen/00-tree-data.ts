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
 * Modo ESCLAVO (opcional): cuando el árbol se construye a partir de un
 * objeto-maestro externo (p.ej. un esquema, un curso, un documento crudo)
 * y los nodos representan/procesan partes de ese maestro, las clases
 * concretas implementan `INodeSlave<T>` (extiende `INode<T>`) y exponen
 * `masterstack`/`imasterstack`/`nmasterstack` para ubicarse dentro del
 * maestro, más `obj?` como referencia al registro original externo.
 * Los nodos NO esclavos sólo cumplen `INode<T>` y no cargan masterstack
 * ni `obj`.
 *
 * Cascada de tipos (sin `Omit`/`Pick` — todos los campos enumerados
 * explícitamente):
 *   `INode<TObj>`        → contrato base del nodo. `children: INode<TObj>[]`.
 *   `INodeSlave<TObj>`   → extiende `INode<TObj>` con `masterstack`,
 *                          `imasterstack`, `nmasterstack`, `obj?`.
 *   `ITreeData<TObj>`    → alias retro-compatible de `INode<TObj>`.
 *   `TreeNode<TObj>`     → clase base concreta que implementa `INode<TObj>`.
 *   `TreeNodeSlave<TObj>`→ clase base concreta que implementa
 *                          `INodeSlave<TObj>` (extiende `TreeNode<TObj>`).
 *
 * Las subclases concretas (`TSqlNodeUX`, `TTableNodeUX`, …) extienden la
 * clase base que corresponda y añaden EXCLUSIVAMENTE las props particulares
 * de su dominio (rowName, colType, prefix, …) sin redeclarar los campos
 * comunes del árbol ni introducir sinónimos.
 */

/* ─────────────────────────────────────────────────────────────────────── */
/* Contrato del nodo del árbol.                                             */
/* ─────────────────────────────────────────────────────────────────────── */

export interface INode<T = any> {
	/** Ruta plana del nodo en notación punteada ("1", "1.2", …). */
	flatpath: string;
	/**
	 * Nombre de la ENTIDAD SQL (tabla) a la que pertenece la fila de obj
	 * del nodo. Convención: MAYÚSCULA SOSTENIDA, con `_` como separador
	 * (estilo MSSQL). P.ej. `TABLE`, `COLUMN`, `PLANES_ESTUDIO`.
	 * Es la FK al bucket `entities[ireference]` del `NodeStore`.
	 *
	 * **OPCIONAL**: los nodos puramente estructurales (p.ej. `prefix`,
	 * `root`) no referencian entidad alguna — sólo delegan comportamiento
	 * a su clase TS por `kind` y NO cargan obj. En ese caso `ireference`
	 * se omite y el nodo no tiene fila en `entities`.
	 */
	ireference?: string;
	/**
	 * Discriminador semántico del nodo. Vincula el nodo con la CLASE TS
	 * concreta que implementa su lógica (ej. `prefix`, `table`, `col`).
	 * Convención: minúsculas sin separadores.
	 */
	kind: string;
	/** Hijos del árbol (SIEMPRE nodos, nunca objetos crudos). */
	children: T[];
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

/**
 * Contrato extendido para nodos ESCLAVOS de un objeto-maestro externo.
 * Aplica cuando el árbol se materializa a partir de un objeto que ya
 * contiene una estructura jerárquica (un esquema, un curso, un documento
 * crudo) y los nodos representan/procesan tramos de ese maestro.
 *
 * - `masterstack` / `imasterstack` / `nmasterstack` ubican al nodo dentro
 *   del maestro (contenedor, identificador del contenedor, nombre del
 *   campo identificador). Son opacos para el adapter.
 * - `obj?` es la referencia OPCIONAL al registro original externo (NO
 *   adaptado al árbol) desde donde se trajeron los datos del nodo. NO es
 *   la auto-referencia al propio nodo NI duplica los campos del árbol.
 */
export interface INodeSlave<T = any> extends INode<T> {
	/** Stack/contenedor del maestro al que pertenece el nodo. */
	masterstack: any;
	/** Identificador del masterstack (opaco para el adapter). */
	imasterstack: string;
	/** Nombre del campo identificador del masterstack. */
	nmasterstack: string;
	/** Registro original externo (no adaptado al árbol). Opcional. */
	obj?: unknown;
}

/** Alias retro-compatible: misma forma que `INode<T>`. */
export type ITreeData<T = any> = INode<T>;

/* ─────────────────────────────────────────────────────────────────────── */
/* Roles actorales del modelo de árbol (vocabulario común a TODA la         */
/* cascada `_treeAdapter` y a las clases-nodo de persistencia).             */
/* ─────────────────────────────────────────────────────────────────────── */

/**
 * Roles actorales reconocidos por el TreeView. Se declaran en `node.actor`
 * como cadena kebab-case separada por espacios (estilo "clases CSS"),
 * combinables. Vacío = legacy / sin actor (cae a defaults dimensionales).
 *
 * El vector de rol se compone en CUATRO DIMENSIONES ortogonales — un nodo
 * declara como mucho un valor por dimensión; si declara más, prevalece el
 * de mayor índice; si declara ninguno, aplica el default de la dimensión.
 *
 *  1. **topology**     (default `group`):
 *     - `atom`     : hoja conceptual; sus hijos persisten pero los algoritmos
 *                    los ignoran (como si estuvieran ocultos).
 *     - `group`    : agrupador.
 *
 *  2. **containment** (default `prison`):
 *     - `prison`   : agrupador con acción "liberar" (salida explícita de hijos).
 *     - `hermetic` : agrupador sellado (los hijos no pueden salir).
 *     - `cell`     : agrupador con osmosis que se extingue al vaciarse.
 *
 *  3. **mobility**    (default `unanchored`):
 *     - `unanchored` : sus hijos pueden moverse libremente.
 *     - `freezer`    : congelador tautológico (TODOS los descendientes).
 *     - `monarchy`   : congelador contingente (cada descendiente decide vía
 *                      `freeze()`); si el nodo no implementa `freeze()`, el
 *                      adapter lo trata como `unanchored`.
 *
 *  4. **vigilance**   (default `distracted`):
 *     - `distracted` : nunca aplica acciones sobre los hijos (identidad).
 *     - `warden`     : ancestro que transforma drafts de los descendientes
 *                      según las acciones declaradas por el consumidor.
 */

/** Rol en la dimensión de TOPOLOGÍA (hoja vs. agrupador). */
export type TopologyRole = "atom" | "group";
/** Rol en la dimensión de CONTAINMENT (cómo se manejan los hijos compartidos). */
export type ContainmentRole = "prison" | "hermetic" | "cell";
/** Rol en la dimensión de MOBILITY (restricciones de movimiento sobre los hijos). */
export type MobilityRole = "unanchored" | "freezer" | "monarchy";
/** Rol en la dimensión de VIGILANCE (transformación de drafts de descendientes). */
export type VigilanceRole = "distracted" | "warden";

/** Unión de TODOS los roles. Útil para parseo desde la cadena `actor`. */
export type NodeRole = TopologyRole | ContainmentRole | MobilityRole | VigilanceRole;

/** Dimensiones ortogonales en las que un nodo puede declarar rol. */
export type RoleDimension = "topology" | "containment" | "mobility" | "vigilance";

/**
 * Vector de rol actoral de un nodo. Cada slot es **opcional**: si está
 * `undefined`, el algoritmo aplica el default dimensional (`group`,
 * `prison`, `unanchored`, `distracted`) sin quemarlo en la instancia.
 *
 * Si el consumidor define un slot, se conserva tal cual y el algoritmo lo
 * lee como rol efectivo de esa dimensión.
 */
export interface NodeRoleVector {
	topology?: TopologyRole;
	containment?: ContainmentRole;
	mobility?: MobilityRole;
	vigilance?: VigilanceRole;
}

/**
 * Miembros de cada dimensión — orden = prioridad creciente: si un nodo
 * declara más de un miembro de la misma dimensión, prevalece el último.
 */
export const ROLE_DIMENSIONS: {
	readonly topology: readonly TopologyRole[];
	readonly containment: readonly ContainmentRole[];
	readonly mobility: readonly MobilityRole[];
	readonly vigilance: readonly VigilanceRole[];
} = {
	topology: ["atom", "group"],
	containment: ["prison", "hermetic", "cell"],
	mobility: ["unanchored", "freezer", "monarchy"],
	vigilance: ["distracted", "warden"],
};

/** Default de cada dimensión cuando el nodo no declara rol explícito. */
export const ROLE_DEFAULTS: {
	readonly topology: TopologyRole;
	readonly containment: ContainmentRole;
	readonly mobility: MobilityRole;
	readonly vigilance: VigilanceRole;
} = {
	topology: "group",
	containment: "prison",
	mobility: "unanchored",
	vigilance: "distracted",
};

/**
 * Grupos de roles mutuamente excluyentes (alias retro-compatible). Cada
 * grupo coincide con los miembros de una dimensión: si un nodo declara
 * varios miembros del mismo grupo, prevalece el de **mayor índice**.
 */
export const ROLE_CONFLICT_GROUPS: ReadonlyArray<readonly NodeRole[]> = [
	ROLE_DIMENSIONS.containment,
	ROLE_DIMENSIONS.mobility,
	ROLE_DIMENSIONS.topology,
	ROLE_DIMENSIONS.vigilance,
];

/**
 * Construye un `NodeRoleVector` a partir de un arreglo libre de roles.
 * Si la entrada es `undefined`/vacía → vector vacío (todos los slots
 * `undefined`, el algoritmo aplicará defaults). Si declara varios roles
 * de la misma dimensión, prevalece el de **mayor índice** dentro de
 * `ROLE_DIMENSIONS`.
 */
export function buildRoleVector(roles?: readonly NodeRole[]): NodeRoleVector {
	if (!roles || roles.length === 0) return {};
	const set = new Set<NodeRole>(roles);
	const pick = <R extends NodeRole>(members: readonly R[]): R | undefined => {
		let best: R | undefined;
		for (const m of members) if (set.has(m)) best = m;
		return best;
	};
	return {
		topology: pick(ROLE_DIMENSIONS.topology),
		containment: pick(ROLE_DIMENSIONS.containment),
		mobility: pick(ROLE_DIMENSIONS.mobility),
		vigilance: pick(ROLE_DIMENSIONS.vigilance),
	};
}

/** Serializa el vector a la cadena `actor` (kebab-case separada por espacios). */
export function roleVectorToActor(vec: NodeRoleVector): string {
	const out: string[] = [];
	if (vec.topology) out.push(vec.topology);
	if (vec.containment) out.push(vec.containment);
	if (vec.mobility) out.push(vec.mobility);
	if (vec.vigilance) out.push(vec.vigilance);
	return out.join(" ");
}

/**
 * Resuelve el rol efectivo de `node` en la dimensión `dim`. Si declara
 * más de uno, devuelve el de mayor índice. Si no declara ninguno, devuelve
 * `ROLE_DEFAULTS[dim]`.
 */
export function resolveRoleInDimension(actorString: string | undefined, dim: RoleDimension): NodeRole {
	const raw = (actorString ?? "").trim();
	if (raw.length === 0) return ROLE_DEFAULTS[dim];
	const declared = new Set(raw.split(/\s+/));
	const members = ROLE_DIMENSIONS[dim] as readonly NodeRole[];
	let bestIdx = -1;
	for (let i = 0; i < members.length; i++) if (declared.has(members[i])) bestIdx = i;
	return bestIdx < 0 ? ROLE_DEFAULTS[dim] : members[bestIdx];
}

/** Dimensión a la que pertenece un rol concreto. */
export function dimensionOfRole(role: NodeRole): RoleDimension {
	for (const dim of Object.keys(ROLE_DIMENSIONS) as RoleDimension[]) {
		if ((ROLE_DIMENSIONS[dim] as readonly NodeRole[]).includes(role)) return dim;
	}
	throw new Error(`[TreeData] Rol desconocido: '${role}'.`);
}

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
	public flatpath: string = "";
	/**
	 * Alias camelCase de `flatpath`. La capa TreeView base (TreeAdapter,
	 * RowAdapter, _rowItem) lee históricamente `node.flatPath`; el modelo
	 * v4 unificó a `flatpath` minúscula. Este getter/setter mantiene
	 * compatibilidad bidireccional sin duplicar estado.
	 */
	public get flatPath(): string { return this.flatpath; }
	public set flatPath(value: string) { this.flatpath = value; }
	/**
	 * Entidad SQL (bucket `entities[ireference]`) referenciada por este
	 * nodo. `undefined` para nodos estructurales sin obj (p.ej. prefix).
	 */
	public ireference?: string;
	public kind: string = "";
	/** Hijos del árbol (siempre nodos del mismo tipo recursivo). */
	public children: T[] = [];

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
		const raw = String(this.flatpath || "").trim();
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

/**
 * Clase base concreta para nodos ESCLAVOS de un objeto-maestro externo.
 * Las subclases concretas que procesan un maestro externo (esquema, curso,
 * documento crudo) extienden esta clase y exponen `imasterstack`/
 * `nimasterstack` (campo o getter derivado).
 */
export abstract class TreeNodeSlave<T = any> extends TreeNode<T> implements INodeSlave<T> {
	public masterstack: any = null;
	/**
	 * `imasterstack`/`nmasterstack` son abstractos: cada subclase concreta
	 * debe exponerlos (getter derivado o campo). El interfaz `INodeSlave<T>`
	 * los requiere y aquí evitamos colisión entre campo de instancia y getter.
	 */
	public abstract imasterstack: string;
	public abstract nmasterstack: string;
	/** Registro original externo (no adaptado al árbol). Opcional. */
	public obj?: unknown;
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Helpers de normalización del árbol.                                      */
/* ─────────────────────────────────────────────────────────────────────── */

const stripUiPrefix = (raw: unknown): string => String(raw ?? "").replace(/^(_UP_|_M_)/, "").trim();

/**
 * Normaliza recursivamente los `flatpath` de los nodos (quita prefijos
 * UI `_UP_`/`_M_`). Mutación in-situ. Retorna el mismo arreglo con los
 * hijos también normalizados. NO toca `ireference` (que ahora es el
 * nombre de la entidad SQL, no una ruta plana).
 *
 * Las clases-nodo SON los nodos del árbol — esta función NO crea wrappers
 * paralelos. La estructura de hijos debe ya estar materializada por el
 * `buildTree` del adapter antes de invocar esta normalización.
 */
export function normalizeRoots<T extends INode<any>>(roots: readonly T[]): T[] {
	for (const r of roots) {
		const flat = stripUiPrefix(r.flatpath);
		if (flat) r.flatpath = flat;
		const kids = r.children;
		if (kids && kids.length) normalizeRoots(kids as readonly INode<any>[]);
	}
	return roots as T[];
}

/**
 * Alias retro-compatible: el adapter llamaba a esta función para construir
 * la estructura paralela. Hoy los nodos SON las clases — la función se
 * limita a normalizar los flatpath y devolver los mismos nodos (sin
 * parallel-wrapping).
 */
export function objRootsToNodes<T extends INode<any>>(
	roots: readonly T[],
	_labelFn?: (obj: T) => string,
): INode<any>[] {
	void _labelFn;
	return normalizeRoots(roots) as INode<any>[];
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Almacenamiento plano estilo SQL.                                         */
/* ─────────────────────────────────────────────────────────────────────── */

/**
 * Modelo de almacenamiento del árbol en formato APLANADO estilo SQL.
 *
 * - `nodes`: tabla única de FILAS de nodos (sin `children` materializado).
 *   Cada `NodeRow` refleja la forma del contrato `INode` (sin `id` propio:
 *   la identidad del nodo es su `flatpath`). La jerarquía se reconstruye
 *   por prefijo de `flatpath` — los hijos de primer nivel de un nodo son
 *   las filas cuyo `flatpath` empieza por el `flatpath` del padre seguido
 *   de un único segmento adicional.
 *
 * - `entities`: diccionario `{ [entityName]: ObjRow[] }`. Cada bucket es
 *   una "tabla" SQL que agrupa los registros de UNA entidad concreta
 *   (`TABLE`, `COLUMN`, `PREFIX`, …). El nombre de bucket sigue la
 *   convención SQL: MAYÚSCULA SOSTENIDA con `_` como separador. Los
 *   datos de dominio (incluido `label` cuando aplica) viven aquí.
 *
 * Convenciones de nomenclatura:
 *  - Claves de `NodeRow` y `ObjRow`: SIEMPRE en minúsculas, sin separadores
 *    ni guiones bajos (POJO TObject-ready).
 *  - PK de `ObjRow`: `i<entityname>` en minúsculas, sin `_` (p.ej. la
 *    entidad `TABLE` usa `itable`; `PLANES_ESTUDIO` usa `iplanesestudio`).
 *  - Nombres de entidad (claves de `entities` y valores de `ireference`):
 *    en MAYÚSCULA SOSTENIDA, pueden incluir `_` (estilo MSSQL).
 */

/** Fila base de NODO. La identidad del nodo es su `flatpath` (no hay `id`). */
export interface NodeBaseRow {
	/** Posición jerárquica en notación punteada ("1", "1.2", …). */
	flatpath: string;
}

/** Fila base de OBJ de entidad. Lleva PK propia (`i<entityname>`). */
export interface ObjBaseRow {
	/**
	 * PK natural de la fila dentro del bucket `entities[entityName]`.
	 * Convención: clave `i<entityname>` (todo en minúsculas, sin `_`),
	 * presente como CUALQUIER otra propiedad más en el `ObjRow`.
	 */
	[key: string]: unknown;
	/** Posición jerárquica del nodo asociado (join key con `NodeRow`). */
	flatpath: string;
}

/**
 * Fila de NODO en la tabla `nodes`. Contiene EXCLUSIVAMENTE metadatos
 * estructurales del árbol — todos los datos de dominio (incluido el
 * texto visual cuando aplica) viven en la fila de obj de la entidad
 * referenciada por `ireference`.
 */
export interface NodeRow extends NodeBaseRow {
	/**
	 * Nombre de la entidad SQL (FK al bucket `entities[ireference]`).
	 * **Opcional**: se omite en nodos estructurales sin obj (p.ej.
	 * `prefix`, `root`) que sólo delegan comportamiento a su clase TS
	 * vía `kind` y no tienen fila en `entities`.
	 */
	ireference?: string;
	/** Discriminador semántico del nodo (clase TS concreta que lo procesa). */
	kind: string;
	/** Cadena kebab-case de roles actorales (ver `NodeRole`). Opcional. */
	actor?: string;
}

/**
 * Fila de objeto de entidad. Comparte `flatpath` con el `NodeRow`
 * correspondiente (join key). El resto de propiedades son los campos
 * SQL de la "tabla" que representa la entidad.
 */
export interface ObjRow extends ObjBaseRow {}

/**
 * Almacén plano del árbol. `entities` agrupa filas de obj por nombre de
 * entidad SQL (MAYÚSCULA SOSTENIDA) — equivale a una tabla por entidad.
 */
export interface NodeStore {
	nodes: NodeRow[];
	entities: { [entityName: string]: ObjRow[] };
}

/** ¿`child` es hijo DIRECTO de `parent` en notación de flatpath punteado? */
function isDirectChildPath(parent: string, child: string): boolean {
	if (!child) return false;
	if (parent === "") return !child.includes(".");
	if (!child.startsWith(parent + ".")) return false;
	return !child.slice(parent.length + 1).includes(".");
}

/** Filas raíz (hijos directos del nodo virtual con `flatpath = ""`). */
export function getRootRows(store: NodeStore): NodeRow[] {
	return store.nodes.filter((n) => n.flatpath !== "" && !n.flatpath.includes("."));
}

/** Hijos DIRECTOS (primer nivel) de un nodo identificado por su `flatpath`. */
export function getChildRows(store: NodeStore, parentFlatpath: string): NodeRow[] {
	return store.nodes.filter((n) => isDirectChildPath(parentFlatpath, n.flatpath));
}

/** TODOS los descendientes (cualquier nivel) de un nodo. */
export function getDescendantRows(store: NodeStore, ancestorFlatpath: string): NodeRow[] {
	const prefix = ancestorFlatpath === "" ? "" : ancestorFlatpath + ".";
	return store.nodes.filter((n) => n.flatpath !== ancestorFlatpath && n.flatpath.startsWith(prefix));
}

/** Fila de obj asociada a un `NodeRow` (mismo `flatpath` dentro del bucket). */
export function findObjRowFor(store: NodeStore, node: NodeRow): ObjRow | undefined {
	if (!node.ireference) return undefined;
	const bucket = store.entities[node.ireference];
	if (!bucket) return undefined;
	return bucket.find((o) => o.flatpath === node.flatpath);
}

