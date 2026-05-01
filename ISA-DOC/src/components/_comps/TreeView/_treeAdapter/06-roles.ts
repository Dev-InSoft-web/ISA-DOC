import type { ButtonIconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsInput } from "../../Options/FlexOptions.svelte";
import { type INode, type ITreeData } from "../_asRow/_rowAdapter/00-base";
import { TAMutations } from "./05-mutations";

/**
 * Descriptor mutable que un hijo solicita y enriquece recorriendo sus ancestros
 * `warden` (closest → farthest). Cada `warden` lo transforma y lo devuelve.
 *
 * Es un contrato genérico de la capa de roles: vive aquí porque pertenece al
 * sistema actoral, no al modelo de vista en forma de row.
 */
export interface WardenDraft<TWorking> {
	readonly node: INode<TWorking>;
	actions: ButtonIconifyProps[];
	cascadeOptions: FlexOptionsInput[];
	extra: Record<string, unknown>;
}

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

	/** Devuelve los roles actorales declarados en `node.obj.actor`. */
	getActorRoles(node: INode<TWorking>): string[] {
		const raw = (node.obj as { actor?: string } | undefined)?.actor ?? "";
		return raw.trim().length === 0 ? [] : raw.trim().split(/\s+/);
	}

	/** Si el nodo declara un rol actoral concreto. */
	hasActor(node: INode<TWorking>, role: "atom" | "group" | "warden" | "prison" | "hermetic" | "cell" | "freezer" | "monarchy"): boolean {
		const roles = this.getActorRoles(node);
		if (roles.includes(role)) return true;
		const groupAliases = ["warden", "prison", "hermetic", "cell", "freezer", "monarchy"] as const;
		if (role === "group") return groupAliases.some((r) => roles.includes(r));
		return false;
	}

	isAtom(node: INode<TWorking>): boolean { return this.hasActor(node, "atom"); }
	isWarden(node: INode<TWorking>): boolean { return this.hasActor(node, "warden"); }
	isPrison(node: INode<TWorking>): boolean { return this.hasActor(node, "prison"); }
	isHermetic(node: INode<TWorking>): boolean { return this.hasActor(node, "hermetic"); }
	isCell(node: INode<TWorking>): boolean { return this.hasActor(node, "cell"); }
	isFreezer(node: INode<TWorking>): boolean { return this.hasActor(node, "freezer"); }
	isMonarchy(node: INode<TWorking>): boolean { return this.hasActor(node, "monarchy"); }
	isGroupActor(node: INode<TWorking>): boolean { return this.hasActor(node, "group"); }

	/**
	 * ¿Los hijos de este agrupador pueden salir (osmosis) vía drag/operaciones?
	 * Por defecto: sí para `prison` y `cell`; no para `hermetic`/`freezer`/`monarchy`.
	 * Para nodos sin rol específico, permitir salida (legacy).
	 */
	allowsChildEscape(node: INode<TWorking>): boolean {
		if (this.isHermetic(node)) return false;
		if (this.isFreezer(node) || this.isMonarchy(node)) return false;
		return true;
	}

	/** Recorre ancestros hasta el root (siguiendo `ireference`), closest→farthest. */
	protected getAncestors(node: INode<TWorking>): INode<TWorking>[] {
		const out: INode<TWorking>[] = [];
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
		if (this.isPrison(node)) {
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
	 * Pipeline de **vigilancia**: el hijo SOLICITA una copia de su estado
	 * efectivo, transformada por todos los `warden` ancestros, recorridos
	 * desde el **más cercano** hasta el **más lejano**.
	 *
	 * El hijo nunca recibe acciones "empujadas" por el warden; es el hijo
	 * quien consulta y compone su propio descriptor enriquecido.
	 */
	protected wardenDraft(node: INode<TWorking>): WardenDraft<TWorking> {
		let draft: WardenDraft<TWorking> = {
			node,
			actions: [],
			cascadeOptions: [],
			extra: {},
		};
		for (const anc of this.getAncestors(node)) {
			if (!this.isWarden(anc)) continue;
			draft = this.wardenTransform(anc, node, draft);
		}
		return draft;
	}

	/**
	 * Hook que un adapter override para definir cómo un warden ancestro
	 * transforma el draft del hijo (closest→farthest). Por defecto no muta nada.
	 */
	protected wardenTransform(_warden: INode<TWorking>, _child: INode<TWorking>, draft: WardenDraft<TWorking>): WardenDraft<TWorking> {
		return draft;
	}

	/** Hook que un adapter override para implementar la liberación de un agrupador `prison`. */
	protected onrelease(_node: INode<TWorking>): void { }

	/** Si el tipo del nodo declara aceptación de acciones del adapter. */
	isActionGrouper(node: INode<TWorking>): boolean {
		const t = (node.obj as { type?: string } | undefined)?.type;
		const list = this.actionTypes;
		if (!t || list.length === 0) return this.isGroupActor(node);
		return list.includes(t);
	}

	/** Si el nodo es agrupador según actor, `groupTypes` o por inferencia. */
	isGrouper(node: INode<TWorking>): boolean {
		if (this.isGroupActor(node)) return true;
		const t = (node.obj as { type?: string } | undefined)?.type;
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
		const fn = (grouper.obj as { sortChildren?: unknown } | undefined)?.sortChildren;
		if (typeof fn !== "function") {
			const role = isFreezer ? "freezer" : "monarchy";
			throw new Error(`[TreeAdapter] El agrupador '${grouper.id}' con rol '${role}' requiere implementar 'sortChildren(children)'.`);
		}
	}

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
				const fn = (node.obj as { freeze?: () => boolean } | undefined)?.freeze;
				if (typeof fn !== "function") {
					throw new Error(`[TreeAdapter] El nodo '${node.id}' bajo agrupador 'monarchy' '${anc.id}' requiere implementar 'freeze(): boolean'.`);
				}
				if (fn.call(node.obj)) return true;
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
