import type { ButtonIconifyProps, ComponentColor, IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsAction, FlexOptionsInput } from "../../Options/FlexOptions.svelte";
import { TreeRowAdapter } from "./_rowAdapter/02-events";
import { type INode, type ITreeData } from "./_rowAdapter/00-base";
import type { RowItemProps } from "./_rowItem.svelte";
import { TARoles } from "../_treeAdapter/06-roles";

/**
 * Configuración inyectable al TreeAdapter (vía `applyAdapterConfig` desde el
 * constructor de la subclase). Centraliza opciones visuales/comportamiento
 * que antes vivían dispersas en estilos de cada panel.
 */
export interface TreeRowViewAdapterFloatCardConfig {
	tx?: number | string;
	ty?: number | string;
	scale?: number;
}

export interface TreeRowViewAdapterConfig {
	/** Transformación lineal aplicada a las cards flotantes de acciones por fila. */
	floatCard?: TreeRowViewAdapterFloatCardConfig;
}

/**
 * Capa **infra** del adapter en modo fila. Concentra la plomería:
 *  - Configuración del adapter (`applyAdapterConfig`, `floatCard`).
 *  - Política de expansión inicial (`shouldAutoExpand`, `applyDefaultExpansion`).
 *  - Operaciones DOM de fila (`focusRowById`, `refocusFocusedRowSummary`,
 *    `blurTreeSummariesExcept`, `commitAndFlash`, `flashRowIds`).
 *  - Handlers de fila/swipe (`onrow*`, `onswipe*`).
 *  - Registro y sincronización de los `TreeRowAdapter` (`getOrCreateRowAdapter`,
 *    `registerRowAdapter`, `unregisterRowAdapter`, `disposeRowAdapterById`,
 *    `syncAllRowAdapters`).
 *
 * La capa de configuración visual por fila (`getToolsBarActions`,
 * `getRowConfig`, hooks particulares y `getNodeIcon`) vive en
 * `01-treeAdapterAsRowEvents.ts`, donde se define la clase final
 * `TreeRowViewAdapter` que extiende esta base.
 */
export abstract class TARowBase<Stacker, TWorking extends ITreeData<TWorking>> extends TARoles<Stacker, TWorking> {
	protected _adapterConfig: TreeRowViewAdapterConfig = {};

	applyAdapterConfig(cfg: TreeRowViewAdapterConfig | undefined): void {
		if (!cfg) return;
		this._adapterConfig = { ...this._adapterConfig, ...cfg };
	}

	get floatCard(): TreeRowViewAdapterFloatCardConfig | undefined {
		return this._adapterConfig.floatCard;
	}

	// =========================================================================
	// Expansión inicial.
	// =========================================================================

	protected shouldAutoExpand(node: INode<TWorking>): boolean {
		return this.isGrouper(node);
	}

	/**
	 * Ids de agrupadores que ya recibieron expansión por defecto.
	 * Permite re-aplicar la política cuando llegan nodos NUEVOS (p.ej. tras
	 * `setTables`) sin pisar el estado del usuario para los nodos ya vistos.
	 */
	private _autoExpandedSeen = new Set<string>();

	applyDefaultExpansion(): void {
		if (!this.rootNodes.length) return;
		// Mapa por id de los expandidos actuales (preserva referencia fresca).
		const currentById = new Map<string, INode<TWorking>>();
		for (const n of this._expandedNodes) {
			const id = this.normalizeNodeId(n?.id);
			if (id) currentById.set(id, n);
		}
		let changed = false;
		const walk = (nodes: INode<TWorking>[]): void => {
			for (const n of nodes) {
				const key = this.normalizeNodeId(n.id);
				if (key && this.shouldAutoExpand(n) && !this._autoExpandedSeen.has(key)) {
					this._autoExpandedSeen.add(key);
					if (!currentById.has(key)) { currentById.set(key, n); changed = true; }
				}
				n.children?.length && walk(n.children);
			}
		};
		walk(this.rootNodes);
		if (!changed) return;
		this.expandedNodes = [...currentById.values()];
		this.syncAllRowAdapters();
		// Inhibe el `onbranchexpand` legacy de la cascada genérica para que no
		// sobreescriba la expansión completa con sólo los rootNodes de nivel 0.
		this.didNodesExpand = true;
	}

	override onrefresh(): void {
		super.onrefresh();
		// Tras reconstruir `_treeNodes`, las referencias en `expandedNodes`
		// apuntan a INode antiguos: hay que resincronizar por id contra el árbol
		// vivo, o el render verá "nada expandido" aunque el estado conceptual lo esté.
		this.resyncExpandedToCurrentTree();
		// Re-aplica la política para nodos NUEVOS (idempotente por id).
		if (this.rootNodes.length) this.applyDefaultExpansion();
	}

	// =========================================================================
	// Operaciones DOM específicas del modelo de vista en forma de **row**.
	// Tocan selectores de fila (`[data-tree-row-id]`, `[data-idrow]`,
	// `details.trvwr-itm > summary`).
	// =========================================================================

	focusRowById(nodeId: string): void {
		if (this.bLostFocus) return;
		if (typeof window === "undefined" || !nodeId) return;
		const attempt = () => {
			const scope = document.querySelector<HTMLElement>(`[data-tree-root="${CSS.escape(this.treeRootId)}"]`);
			if (!scope) return;
			const row = scope.querySelector<HTMLElement>(`[data-idrow="${CSS.escape(nodeId)}"]`);
			const summary = row?.querySelector<HTMLElement>("details.trvwr-itm > summary") || null;
			if (!summary) return;
			this.blurTreeSummariesExcept(summary);
			summary.focus();
		};
		queueMicrotask(attempt);
		requestAnimationFrame(attempt);
	}

	refocusFocusedRowSummary(): void {
		if (this.bLostFocus) return;
		if (typeof window === "undefined") return;
		const id = this._focusedNodeId;
		if (!id) return;
		const sel = `[data-tree-root="${CSS.escape(this.treeRootId)}"] [data-tree-row-id="${CSS.escape(id)}"] > details.trvwr-itm > summary`;
		const tryFocus = (): boolean => {
			const summary = document.querySelector<HTMLElement>(sel);
			if (!summary) return false;
			if (!summary.hasAttribute("tabindex")) summary.setAttribute("tabindex", "-1");
			summary.focus({ preventScroll: false });
			return document.activeElement === summary;
		};
		let attempts = 0;
		const tick = () => {
			if (tryFocus()) return;
			if (++attempts < 6) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}

	blurTreeSummariesExcept(activeSummary: HTMLElement): void {
		if (!activeSummary) return;
		const root = activeSummary.closest(".isp-tree");
		if (!root) return;
		root.querySelectorAll<HTMLElement>("details.trvwr-itm > summary").forEach((s) => {
			if (s !== activeSummary && document.activeElement === s) s.blur();
		});
	}

	commitAndFlash(id: string | undefined): void {
		const clean = this.normalizeNodeId(id);
		if (clean.length === 0) return;
		this.setSelectedId?.(clean, this);
		this.flashRowIds?.([clean], undefined, this);
		this.syncAllRowAdapters();
	}

	flashRowIds(ids: string[], durationMs: number | undefined = 650, _context?: unknown): void {
		const cleanIds = (ids ?? []).map((x) => this.normalizeNodeId(x)).filter((c) => c.length > 0);
		this.flashIds = cleanIds;
		this.flashClearTimer && clearTimeout(this.flashClearTimer);
		this.flashClearTimer = setTimeout(() => {
			this.flashIds = [];
			this.flashClearTimer = undefined;
		}, durationMs);
	}

	// =========================================================================
	// Handlers de fila / swipe.
	// =========================================================================

	onrowclick(node: INode<TWorking>): void {
		this._selectedId = this.normalizeNodeId(node.id);
		this._item = node.obj;
		this._originalItem = this.toNode(node.obj, true);
		this.onrefresh();
	}

	onrowdblclick(node: INode<TWorking>): void {
		if (this.isViewMode) this.openViewNode(node);
		else this.openEdit(node);
	}

	onrowfocus(node: INode<TWorking>): void {
		this.focusedNode = node;
		this.syncAllRowAdapters();
	}

	override onrowtoggle(_node: INode<TWorking>): void { }

	onrowdelete(node: INode<TWorking>): void {
		if (!this.requestDelete(node)) return;
		this.ondeleteconfirmed();
	}

	onrowreorder(sourceId: string, targetId: string, position: "before" | "after" | "into"): void {
		const newId = position === "into" ? this.nestInto(sourceId, targetId) : this.reorder(sourceId, targetId, position);
		this.commitAndFlash(newId);
	}

	override onCtrlEnter(_node: INode<TWorking>): void { }

	onswipeopendrawer(): void {
		const nodeId = this._selectedId || this.rootNodes[0]?.id || "";
		const node = nodeId ? this.findNodeById(nodeId) : null;
		if (!node) return;
		this.openEdit(node);
	}

	onswipeclosedrawer(): void { this.setShowFrm(false) }

	override onswipenoop(): void { }

	// =========================================================================
	// Registro y ciclo de vida de los `TreeRowAdapter` por fila.
	// =========================================================================

	registerRowAdapter(rowAdapter: TreeRowAdapter<Stacker, TWorking>): void {
		const key = this.normalizeNodeId(rowAdapter.id);
		if (key.length === 0) return;
		const existing = Array.from(this.rowAdapters.values()).find((item) => item.id === rowAdapter.id);
		!existing && this.rowAdapters.set(key, rowAdapter);
	}

	unregisterRowAdapter(rowAdapter: TreeRowAdapter<Stacker, TWorking>): void {
		const key = this.normalizeNodeId(rowAdapter.id);
		if (key.length === 0) return;
		this.rowAdapters.delete(key);
	}

	getOrCreateRowAdapter(bridge: RowItemProps<TWorking>): TreeRowAdapter<Stacker, TWorking> {
		const node = (bridge as RowItemProps<TWorking> & { node?: INode<TWorking> }).node;
		if (node == null) {
			throw new Error("TreeAdapter.getOrCreateRowAdapter: `bridge.node` es obligatorio");
		}
		const idKey = this.normalizeNodeId(node.id);
		if (idKey.length === 0) {
			throw new Error("TreeAdapter.getOrCreateRowAdapter: `bridge.node.id` no puede quedar vacío tras normalizar");
		}
		const existing = this.rowAdapters.get(idKey);
		if (existing) {
			existing.applyBridge(bridge);
			existing.sync();
			return existing;
		}
		const created = new TreeRowAdapter<Stacker, TWorking>(bridge, this);
		this.registerRowAdapter(created);
		this.rowAdapters.set(idKey, created);
		created.sync();
		return created;
	}

	disposeRowAdapterById(nodeId: string): void {
		const existing = this.rowAdapters.get(this.normalizeNodeId(nodeId));
		if (!existing) return;
		existing.dispose();
	}

	syncAllRowAdapters(): void {
		for (const adapter of this.rowAdapters.values()) adapter.sync();
		this.rowLayoutEpoch.update((n) => n + 1);
	}

	/**
	 * Listener global de `pointerdown`: si el clic ocurre **fuera** del
	 * `[data-tree-root]` del árbol, limpia los estados visuales que producen
	 * el efecto "hover/highlight" persistente (`focusedNode`, `hoveredNode`).
	 *
	 * Cubre el caso del menú `more` en cascada: al cerrarse haciendo clic
	 * fuera, la fila origen perdería el foco DOM pero conservaba el
	 * `_focusedNodeId` interno → el background de hover quedaba pegado.
	 */
	ontreeoutsidepointerdown(e: PointerEvent): void {
		if (typeof document === "undefined") return;
		const id = this.treeRootId;
		if (!id) return;
		const body = document.querySelector(`[data-tree-root="${CSS.escape(id)}"]`);
		if (!body) return;
		const tgt = e.target as Node | null;
		if (tgt && body.contains(tgt)) return;
		let changed = false;
		if (this._hoveredNodeId) { this.hoveredNode = null; changed = true; }
		if (this._focusedNodeId) { this.focusedNode = null; changed = true; }
		if (changed) this.syncAllRowAdapters();
	}

	// =========================================================================
	// Contrato consumido por el `TreeRowAdapter`. La implementación concreta
	// vive en la subclase final (`TreeRowViewAdapter`, en `01-...Events.ts`).
	// =========================================================================

	abstract getRowConfig(node: INode<TWorking>): {
		icono?: Omit<IconifyProps, "icon"> & { icon: string; color?: ComponentColor };
		disabled?: boolean;
		draggable?: boolean;
		isFirst?: boolean;
		isLast?: boolean;
		actions?: FlexOptionsInput[];
		cascadeOptions?: FlexOptionsInput[];
		events?: {
			onopen?: () => void;
			onclose?: () => void;
			onfocus?: () => void;
			onblur?: () => void;
			onclick?: () => void;
			onleadiconclick?: () => void;
		};
	} | null;

	abstract getToolsBarActions(): FlexOptionsAction[];
	/**
	 * Opciones en cascada para la barra de herramientas (se muestran como
	 * botón "more"). Por defecto vacío. Override para activar.
	 */
	getToolsBarCascadeOptions(): FlexOptionsInput[] { return []; }
	protected abstract getNodeIcon(node: INode<TWorking>, ctx: { isLastNode: boolean; isFolder: boolean; hasChildren: boolean; isExpanded: boolean; isEmptyFolder: boolean }): { icon?: string; color?: ComponentColor; style?: string } | null;
	protected abstract particularactionsrow(node: INode<TWorking>): ButtonIconifyProps[];
	protected abstract particularcascadeoptionsrow(node: INode<TWorking>): FlexOptionsInput[];

	protected isDirty(current: unknown, original: unknown): boolean { return original ? JSON.stringify(current) !== JSON.stringify(original) : false }
}
