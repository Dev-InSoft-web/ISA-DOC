import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation, PersistedWardenRefJSON } from "./types.ts";
import {
	buildRoleVector,
	type NodeRole,
	type NodeRoleVector,
} from "../../components/_comps/TreeView/_treeAdapter/_defgen/00-tree-data.ts";

export type { NodeRole, NodeRoleVector };

/**
 * Roles actorales reconocibles por el árbol. Reexportados desde
 * `_treeAdapter/_defgen/00-tree-data` para mantener el vocabulario en un
 * solo punto. Sobre el modelo de persistencia se interpretan así:
 *  - `warden`     → declara un `wardenAction` (idaction inferido del kind).
 *  - `distracted` → identidad sobre los hijos (default vigilancia).
 *  - `prison`     → contenedor con osmosis (default containment).
 *  - `hermetic`   → contenedor sellado (no acepta hijos).
 *  - `cell`       → contenedor que se extingue al vaciarse.
 *  - `unanchored` → hijos libres (default mobility).
 *  - `freezer`    → congelador tautológico (`freeze() => true` por defecto).
 *  - `monarchy`   → congelador contingente (debe pasar `freeze` en el spec).
 *  - `atom`       → hoja explícita (no acepta hijos).
 *  - `group`      → agrupador (default topology).
 *
 * Combinables por concatenación. Vacío = todos los defaults dimensionales.
 */

export interface DefineTreeNodeSpec<TObj extends object> {
	/** Discriminador semántico del nodo. */
	kind: NodeKind;
	/** Roles actorales (kebab-case con espacios). Default: ninguno. */
	roles?: readonly NodeRole[];
	/** Defaults aplicados a `obj` cuando el constructor recibe `undefined`. */
	defaults?: Partial<TObj>;
	/**
	 * Normaliza in-situ el `obj` (uppercase, trim, etc.). Se llama en el
	 * constructor y al inicio de `toJSON`.
	 */
	normalize?: (obj: TObj) => void;
	/** Validación opcional. Default: sin reglas. */
	validate?: (obj: TObj, node: BaseTreeNode<TObj>) => NodeValidation;
	/**
	 * Decide si un kind concreto es admisible como hijo directo. Default
	 * (cuando no se especifica) depende de los roles:
	 *  - `hermetic`/`atom` → siempre `false`.
	 *  - resto            → `true`.
	 */
	acceptsChildKind?: (kind: NodeKind) => boolean;
	/** Predicado de congelamiento individual. */
	freeze?: (node: BaseTreeNode<TObj>) => boolean;
	/**
	 * Acción de vigilante asociada al nodo. Si está presente, se setea en el
	 * constructor (`this.wardenAction`). Si es función, se evalúa con el
	 * `obj` ya inicializado.
	 */
	wardenAction?:
	| PersistedWardenRefJSON
	| ((obj: TObj) => PersistedWardenRefJSON | undefined);
	/** Permite filtrar/reescribir el `obj` que entra al JSON persistido. */
	serializeObj?: (obj: TObj) => Record<string, unknown> | undefined;
}

/**
 * Constructor de clases nodales: recibe roles + comportamientos y devuelve
 * una clase concreta que extiende `BaseTreeNode<TObj>`. Pensada para
 * encapsular en un solo lugar las "adecuaciones" (warden, freeze, accept,
 * normalize) y mantener consistente la nomenclatura entre todos los nodos.
 *
 * Ejemplo:
 * ```ts
 * const ColumnClass = defineTreeNode<ColumnObj>({
 *   kind: "col",
 *   roles: ["atom"],
 *   defaults: { name: "", type: "", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
 *   normalize: (o) => { if (o.type) o.type = o.type.toUpperCase(); },
 *   validate: (o) => ({
 *     errors: !o.name ? ["`name` requerido."] : [],
 *     warnings: [],
 *   }),
 * });
 * ```
 */
export function defineTreeNode<TObj extends object>(spec: DefineTreeNodeSpec<TObj>,): new (obj?: Partial<TObj>, roleVector?: NodeRoleVector) => BaseTreeNode<TObj> {
	const specRoles = spec.roles ?? [];
	const specVector = buildRoleVector(specRoles);
	const declared = new Set<NodeRole>(specRoles);
	// Topología: `atom` ⇒ hoja (no acepta hijos).
	const isAtom = declared.has("atom");
	// Containment: `hermetic` ⇒ agrupador sellado (no acepta hijos).
	const isHermetic = declared.has("hermetic");
	// Mobility: `freezer` ⇒ tautológico (todos los descendientes congelados).
	//           `monarchy` ⇒ contingente (delega en `freeze` provisto por el spec).
	const isFreezer = declared.has("freezer");

	const acceptsChildKindFn = spec.acceptsChildKind
		?? ((_k: NodeKind) => !(isAtom || isHermetic));
	const freezeFn = spec.freeze ?? ((_n: BaseTreeNode<TObj>) => isFreezer);

	class GeneratedNode extends BaseTreeNode<TObj> {
		public readonly kind = spec.kind;

		constructor(obj: Partial<TObj> = {}, roleVector?: NodeRoleVector) {
			// Si el caller pasa su propio vector lo respetamos (slots vacíos
			// caen al algoritmo por fallback). Si no, usamos el vector
			// derivado del spec — que también puede ser vacío y caer a
			// defaults dimensionales en tiempo de algoritmo.
			super({ ...(spec.defaults ?? {}), ...(obj as TObj) }, roleVector ?? { ...specVector });
			if (spec.wardenAction) {
				const wa = typeof spec.wardenAction === "function"
					? spec.wardenAction(this.obj)
					: spec.wardenAction;
				if (wa) this.wardenAction = { idaction: wa.idaction };
			} else if (declared.has("warden")) {
				this.wardenAction = { idaction: spec.kind };
			}
		}

		protected override normalize(): void {
			spec.normalize?.(this.obj);
		}

		public override acceptsChildKind(kind: NodeKind): boolean {
			return acceptsChildKindFn(kind);
		}

		public override freeze(): boolean { return freezeFn(this); }

		public override validate(): NodeValidation {
			return spec.validate?.(this.obj, this) ?? { errors: [], warnings: [] };
		}

		protected override serializeObj(): Record<string, unknown> | undefined {
			if (spec.serializeObj) return spec.serializeObj(this.obj);
			return super["serializeObj"]();
		}
	}
	return GeneratedNode as unknown as new (obj?: Partial<TObj>, roleVector?: NodeRoleVector) => BaseTreeNode<TObj>;
}
