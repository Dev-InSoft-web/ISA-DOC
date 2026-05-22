import type { ButtonIconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsInput } from "../../Options/FlexOptions.svelte";
import {
	type INode,
	type ITreeData,
	type NodeRole,
	type NodeRoleVector,
	type RoleDimension,
	ROLE_DEFAULTS,
	resolveRoleInDimension,
} from "./_defgen/00-tree-data";
import { TAMutations } from "./05-mutations";

/**
 * Descriptor mutable que un hijo solicita y enriquece recorriendo sus ancestros
 * `warden` (closest → farthest). Es el HIJO quien orquesta la pipeline:
 * solicita la lista de vigilantes ancestros, decide cuáles lo afectan y aplica
 * sus acciones sobre una **copia** de sí mismo. Los vigilantes nunca mutan
 * los nodos originales.
 *
 * Es un contrato genérico de la capa de roles.
 */
export interface WardenDraft<TWorking> {
	readonly node: INode<TWorking>;
	/**
	 * **Copia decorada** del dato del nodo (`node.obj`). Cada acción vigilante
	 * la transforma SIN mutar el original. El consumidor lee aquí el
	 * resultado final (rowName decorado, etc.).
	 */
	decoratedObj: TWorking;
	actions: ButtonIconifyProps[];
	cascadeOptions: FlexOptionsInput[];
	extra: Record<string, unknown>;
}

/**
 * Acción declarada por un vigilante (`warden`). Se almacena en `obj.wardenAction`
 * del nodo vigilante. La acción es PURA: recibe una copia del draft del hijo
 * afectado y devuelve un draft transformado. No accede a los nodos originales.
 *
 * - `idaction`: identificador estable (kebab-case) de la familia de la acción.
 *   Permite a los hijos filtrar qué vigilantes los afectan y en qué orden.
 *   Ej.: `"prefix"`, `"suffix"`, `"namespace"`.
 * - `actionsOverNode(child, draft)`: transforma el draft del hijo y lo devuelve.
 */
export interface WardenAction<TWorking> {
	readonly idaction: string;
	actionsOverNode(child: INode<TWorking>, draft: WardenDraft<TWorking>): WardenDraft<TWorking>;
}

/** Forma de un nodo cuyo `obj` declara una acción vigilante. */
type WithWardenAction<TWorking> = { wardenAction?: WardenAction<TWorking> };

/**
 * Capa de **roles actorales** del TreeAdapter. Independiente del modelo de
 * vista (rows, mosaicos, grafo, etc): aquí solo viven los conceptos de rol,
 * agrupamiento, ancestría y la pipeline de vigilancia (`warden`).
 *
 * Modelo de roles tipo "clases CSS" en kebab-case sobre `node.obj.actor`:
 * - `atom`     : nodo hoja conceptual.
 * - `group`    : agrupador genérico (inferido por `warden|prison|hermetic|cell`).
 * - `warden`   : ancestro que **transforma** el draft que un descendiente solicita.
 * - `prison`   : agrupador con osmosis (los hijos pueden salir) y acción liberar.
 * - `cell`     : agrupador con osmosis (los hijos pueden salir) que se extingue
 *                con todos sus integrantes (acción eliminar).
 * - `hermetic` : agrupador sellado (los hijos no pueden salir) y acción eliminar.
 */
export abstract class TARoles<Stacker, TWorking extends ITreeData<TWorking>> extends TAMutations<Stacker, TWorking> {
	/** Cache de wardens cuya advertencia ya fue emitida — evita loops de consola por re-renders reactivos. */
	private _warnedWardens: Set<string> = new Set<string>();

	/**
	 * Tipos de nodo que actúan como **agrupadores** (carpetas/contenedores).
	 * Si el adapter no lo override, se infiere desde `node.isLeaf` (todo lo no-hoja
	 * se considera agrupador). Se usa para la regla por defecto de expansión.
	 */
	get groupTypes(): readonly string[] { return []; }

	/**
	 * Tipos de agrupador sobre los que se ofrecen acciones de mutación
	 * (p.ej. "Agregar hijo"). Subconjunto típico de `groupTypes`.
	 */
	get actionTypes(): readonly string[] { return []; }

	/** Devuelve los roles actorales declarados en `node.actor`. */
	getActorRoles(node: INode<TWorking>): string[] {
		const raw = (node as { actor?: string } | undefined)?.actor ?? "";
		return raw.trim().length === 0 ? [] : raw.trim().split(/\s+/);
	}

	/** Si el nodo declara un rol actoral concreto (tras resolución de conflictos). */
	hasActor(node: INode<TWorking>, role: NodeRole): boolean {
		// `group` y `distracted` son los roles "abiertos" — reconocemos tanto la
		// declaración explícita como la inferencia desde otros roles del vector.
		return this.effectiveRole(node, this.dimensionOf(role)) === role;
	}

	/** Devuelve el rol efectivo del nodo en la dimensión indicada. */
	effectiveRole(node: INode<TWorking>, dim: RoleDimension): NodeRole {
		// Preferimos el `roleVector` estructurado (clases-nodo de persistencia).
		// Si está ausente, parseamos la cadena `actor` (modo legacy/UX). Si
		// ninguno declara nada en esta dimensión, cae al default dimensional.
		const vec = (node as { roleVector?: NodeRoleVector } | undefined)?.roleVector;
		if (vec && vec[dim]) return vec[dim] as NodeRole;
		const actor = (node as { actor?: string } | undefined)?.actor;
		if (typeof actor === "string" && actor.trim().length > 0) {
			return resolveRoleInDimension(actor, dim);
		}
		return ROLE_DEFAULTS[dim];
	}

	/** Dimensión a la que pertenece el rol. */
	private dimensionOf(role: NodeRole): RoleDimension {
		switch (role) {
			case "atom": case "group": return "topology";
			case "prison": case "hermetic": case "cell": return "containment";
			case "unanchored": case "freezer": case "monarchy": return "mobility";
			case "distracted": case "warden": return "vigilance";
		}
	}

	/** ¿El nodo declaró EXPLÍCITAMENTE este rol (sin defaults dimensionales)? */
	private hasExplicitActor(node: INode<TWorking>, role: NodeRole): boolean {
		return this.getActorRoles(node).includes(role);
	}

	isAtom(node: INode<TWorking>): boolean { return this.hasActor(node, "atom"); }
	isGroupActor(node: INode<TWorking>): boolean { return this.hasActor(node, "group"); }
	isPrison(node: INode<TWorking>): boolean { return this.hasActor(node, "prison"); }
	isHermetic(node: INode<TWorking>): boolean { return this.hasActor(node, "hermetic"); }
	isCell(node: INode<TWorking>): boolean { return this.hasActor(node, "cell"); }
	isUnanchored(node: INode<TWorking>): boolean { return this.hasActor(node, "unanchored"); }
	isFreezer(node: INode<TWorking>): boolean { return this.hasActor(node, "freezer"); }
	isMonarchy(node: INode<TWorking>): boolean { return this.hasActor(node, "monarchy"); }
	isDistracted(node: INode<TWorking>): boolean { return this.hasActor(node, "distracted"); }
	isWarden(node: INode<TWorking>): boolean { return this.hasActor(node, "warden"); }

	/**
	 * ¿Los hijos de este agrupador pueden salir (osmosis) vía drag/operaciones?
	 * Combina las dos dimensiones que afectan: containment + mobility.
	 * - `hermetic` (containment) → NO.
	 * - `freezer`/`monarchy` (mobility) → NO.
	 * - resto (defaults `prison` + `unanchored` o explícitos `prison|cell`
	 *   + `unanchored`) → SI.
	 */
	allowsChildEscape(node: INode<TWorking>): boolean {
		if (this.isHermetic(node)) return false;
		if (this.isFreezer(node) || this.isMonarchy(node)) return false;
		return true;
	}

	/**
	 * Recorre ancestros hasta el root, **closest → farthest**, derivando la
	 * cadena del propio `rowId` (path por puntos: `1.2.3.4` → ancestros
	 * `1.2.3`, `1.2`, `1`). Es robusto frente a nodos sin `ireference`
	 * populado y mantiene el contrato del path como fuente de verdad
	 * jerárquica. Si el nodo carece de `rowId` con puntos, recae en
	 * `ireference` para garantizar compatibilidad.
	 */
	protected getAncestors(node: INode<TWorking>): INode<TWorking>[] {
		const out: INode<TWorking>[] = [];
		const id = String(node.flatPath ?? "").trim();
		if (id && id.includes(".")) {
			const parts = id.split(".");
			for (let i = parts.length - 1; i >= 1; i--) {
				const ancId = parts.slice(0, i).join(".");
				const anc = this.findNodeById(ancId);
				if (anc) out.push(anc);
			}
			return out;
		}
		// Fallback: cadena por `ireference` (compat).
		let cur = node.ireference ? this.findNodeById(node.ireference) : null;
		while (cur) {
			out.push(cur);
			cur = cur.ireference ? this.findNodeById(cur.ireference) : null;
		}
		return out;
	}

	/**
	 * Acciones por defecto inferidas desde el rol actoral del propio nodo.
	 * - `prison` → liberar (delegado a `onrelease`).
	 * - `hermetic` → eliminar (delegado a `onrowdelete`; ya cubierto por la accion genérica).
	 */
	protected actorActions(node: INode<TWorking>): ButtonIconifyProps[] {
		const out: ButtonIconifyProps[] = [];
		// La acción "Liberar" sólo se ofrece cuando el nodo declara explícitamente
		// `prison` (no por el default dimensional, que aplica a todo el árbol).
		if (this.hasExplicitActor(node, "prison")) {
			out.push({
				icon: "mdi:exit-run",
				title: "Liberar (los hijos toman su lugar conservando el orden)",
				color: "neutral" as const,
				onClick: () => this.onrelease(node),
			});
		}
		return out;
	}

	/**
	 * Devuelve la lista de ancestros que actualmente son `warden`, ordenada
	 * **closest → farthest** según profundidad relativa. Es la API que un nodo
	 * usa para conocer qué vigilantes podrían afectarlo. Los ancestros
	 * `distracted` (default) se omiten — retornan identidad.
	 */
	protected wardensOf(node: INode<TWorking>): INode<TWorking>[] {
		return this.getAncestors(node).filter((a) => this.isWarden(a));
	}

	/**
	 * Hook que el dato del nodo afectado puede implementar para vetar a un
	 * vigilante ancestro específico (regla particular del NODO, no del vigilante).
	 * Default: acepta a todos. Las subclases pueden delegar en el dato
	 * (`obj.acceptsWarden(warden)`).
	 */
	protected nodeAcceptsWarden(node: INode<TWorking>, warden: INode<TWorking>): boolean {
		const fn = (node as unknown as { acceptsWarden?: (warden: INode<TWorking>) => boolean }).acceptsWarden;
		if (typeof fn === "function") return !!fn.call(node, warden);
		return true;
	}

	/**
	 * Pipeline de **vigilancia**: el hijo SOLICITA una copia de su estado
	 * efectivo, transformada por las acciones declaradas en sus vigilantes
	 * ancestros (filtrados por `nodeAcceptsWarden`). El recorrido es
	 * **closest → farthest**: las acciones más cercanas al nodo se aplican
	 * antes (regla por defecto; subclases pueden reordenar por `idaction`).
	 *
	 * El nodo NUNCA es mutado: cada acción trabaja sobre `draft.decoratedObj`,
	 * que es un clon. Si un vigilante no declara `wardenAction`, se emite una
	 * advertencia (warn) por consola y se ignora silenciosamente — no detiene
	 * el flujo.
	 */
	protected wardenDraft(node: INode<TWorking>): WardenDraft<TWorking> {
		let draft: WardenDraft<TWorking> = {
			node,
			decoratedObj: this.cloneNodeData(node as unknown as TWorking),
			actions: [],
			cascadeOptions: [],
			extra: {},
		};
		for (const anc of this.wardensOf(node)) {
			if (!this.nodeAcceptsWarden(node, anc)) continue;
			draft = this.wardenTransform(anc, node, draft);
		}
		return draft;
	}

	/**
	 * Devuelve un **clon del nodo** con su `obj` ya decorado por toda la
	 * pipeline vigilante. Es el punto de consumo por defecto para vistas y
	 * snippets: representa la forma efectiva del nodo sin mutarlo.
	 */
	resume(node: INode<TWorking>): INode<TWorking> {
		const draft = this.wardenDraft(node);
		return { ...node, obj: draft.decoratedObj };
	}

	/** Clona los datos del nodo. Usa `obj.clone()` si está disponible; si no, copia superficial. */
	protected cloneNodeData(data: TWorking): TWorking {
		const fn = (data as { clone?: () => TWorking } | undefined)?.clone;
		if (typeof fn === "function") return fn.call(data);
		return { ...(data as object) } as TWorking;
	}

	/**
	 * API pública del pipeline de wardens. Devuelve el draft decorado del nodo.
	 * Los consumidores (display, SQL emit, etc.) deben leer de aquí; nunca
	 * mutar `node.obj` directamente para representar la decoración actoral.
	 */
	draftFor(node: INode<TWorking>): WardenDraft<TWorking> {
		return this.wardenDraft(node);
	}

	/**
	 * Despachador por defecto: si el `obj` del vigilante declara una
	 * `wardenAction`, ejecuta su `actionsOverNode(child, draft)`. Si el nodo
	 * tiene rol `warden` pero no declaró acción, se emite una **advertencia**
	 * por consola (no detiene el flujo). Los adapters pueden hacer override
	 * para reordenar por `idaction` o aplicar reglas particulares.
	 */
	protected wardenTransform(warden: INode<TWorking>, child: INode<TWorking>, draft: WardenDraft<TWorking>): WardenDraft<TWorking> {
		const action = (warden as unknown as WithWardenAction<TWorking>).wardenAction;
		if (!action || typeof action.actionsOverNode !== "function") {
			const key = String(warden.flatPath || "");
			if (!this._warnedWardens.has(key)) {
				this._warnedWardens.add(key);
				// eslint-disable-next-line no-console
				console.warn(`[TreeAdapter] Vigilante '${key}' no declara 'wardenAction'. Implementa una clase que extienda 'WardenNode<T>' o asigna 'wardenAction' al nodo.`);
			}
			return draft;
		}
		return action.actionsOverNode(child, draft);
	}

	/** Hook que un adapter override para implementar la liberación de un agrupador `prison`. */
	protected onrelease(_node: INode<TWorking>): void { }

	/** Si el tipo del nodo declara aceptación de acciones del adapter. */
	isActionGrouper(node: INode<TWorking>): boolean {
		const t = (node as unknown as { type?: string }).type;
		const list = this.actionTypes;
		if (!t || list.length === 0) return this.isGroupActor(node);
		return list.includes(t);
	}

	/** Si el nodo es agrupador según actor, `groupTypes` o por inferencia. */
	isGrouper(node: INode<TWorking>): boolean {
		if (this.isGroupActor(node)) return true;
		const t = (node as unknown as { type?: string }).type;
		const list = this.groupTypes;
		if (list.length > 0) return !!t && list.includes(t);
		return !node.isLeaf;
	}

	/**
	 * Valida el contrato de los agrupadores ordenadores `freezer`/`monarchy`:
	 * el dato del agrupador DEBE implementar `sortChildren(children)`. Si no,
	 * se lanza error inmediato (fail-fast en el momento que el rol se aplica).
	 */
	protected assertOrderingContract(grouper: INode<TWorking>): void {
		const isFreezer = this.isFreezer(grouper);
		const isMonarchy = this.isMonarchy(grouper);
		if (!isFreezer && !isMonarchy) return;
		const fn = (grouper as unknown as { sortChildren?: unknown }).sortChildren;
		if (typeof fn !== "function") {
			const role = isFreezer ? "freezer" : "monarchy";
			throw new Error(`[TreeAdapter] El agrupador '${grouper.flatPath}' con rol '${role}' requiere implementar 'sortChildren(children)'.`);
		}
	}

	/**
	 * Rol actoral del propio TreeAdapter como contenedor virtual de los
	 * `rootNodes`. Default `""` (sin rol). Subclases pueden retornar
	 * `"monarchy"` o `"freezer"` para aplicar reglas de congelamiento al
	 * primer nivel sin necesidad de un nodo raíz real.
	 */
	getRootActor(): "" | "monarchy" | "freezer" { return ""; }

	/**
	 * ¿Este nodo está **congelado** (no se puede mover) por su pipeline de
	 * ancestros? Recorrido closest→farthest:
	 * - `freezer` ancestor → tautología: SIEMPRE congela a sus descendientes.
	 * - `monarchy` ancestor → contingente: el nodo DEBE implementar `freeze()`,
	 *   y se congela cuando devuelve `true`.
	 * Sólo afecta acciones de movimiento (drag, mover arriba/abajo). Resto de
	 * acciones (editar, eliminar, agregar, etc.) no se ven afectadas.
	 */
	isFrozen(node: INode<TWorking>): boolean {
		for (const anc of this.getAncestors(node)) {
			if (this.isFreezer(anc)) {
				this.assertOrderingContract(anc);
				return true;
			}
			if (this.isMonarchy(anc)) {
				this.assertOrderingContract(anc);
				const fn = (node as unknown as { freeze?: () => boolean }).freeze;
				// monarchy sin `freeze()` definido por el descendiente se
				// degrada a `unanchored` (no congela).
				if (typeof fn !== "function") continue;
				if (fn.call(node)) return true;
			}
		}
		// El TreeAdapter actúa como contenedor virtual de los nodos raíz.
		// Sólo aplica cuando `node` es de primer nivel (sin ireference).
		const isRootLevel = !String(node.ireference || "").trim();
		if (isRootLevel) {
			const rootActor = this.getRootActor();
			if (rootActor === "freezer") return true;
			if (rootActor === "monarchy") {
				const fn = (node as unknown as { freeze?: () => boolean }).freeze;
				if (typeof fn === "function" && fn.call(node)) return true;
			}
		}
		return false;
	}

	// =========================================================================
	// Hooks generales del ciclo de vida del nodo. Independientes del modelo de
	// vista (rows, mosaicos, grafo); las subclases concretas que sí pintan en
	// forma de fila (`../_asRow/00-treeAdapterAsRow.ts`) los implementan o sobreescriben.
	// =========================================================================

	/** Si un nodo admite "agregar hijo" desde la UI. Hook virtual; default `true`. */
	protected canAddChild(_node: INode<TWorking>): boolean { return true; }

	/** Disparado cuando el nodo expande/colapsa. */
	abstract onrowtoggle(node: INode<TWorking>): void;

	/** Disparado por Ctrl+Enter sobre el nodo enfocado. */
	abstract onCtrlEnter(node: INode<TWorking>): void;

	/** Gesto de swipe que no debe disparar acción (consumir). */
	abstract onswipenoop(): void;
}

