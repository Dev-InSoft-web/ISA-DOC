import type { ComponentColor, IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import { resolveColor } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsInput } from "../../../Options/FlexOptions.svelte";
import type { RowItemProps } from "../../_rowItem.svelte";
import { ComplexControl } from "../00-complex-control";
import type { TreeAdapter } from "../06-rows";
import type { TreeRowAdapter } from "./02-events";

type CascadeOptionsInput = FlexOptionsInput;

export interface INode<T> {
	id: string;
	ireference: string;
	obj: T;
	stack: any;
	label: string;
	children: INode<T>[];
	istack: string;
	nistack: string;
	isLeaf: boolean;
	isPenultimate: boolean;
	nextLevelTitle: string;
	isLast: boolean;
}

export interface ITreeData<T> {
	[k: string]: any;
	/**
	 * Discriminador semántico del nodo (p.ej. "domain", "table", "prefix",
	 * "section", "column"). Usado por agrupadores para identificar a quién
	 * aceptan o rechazan como hijo sin tener que conocer la clase concreta.
	 */
	type?: string;
	/**
	 * Reglas opcionales del nodo respecto a la jerarquía.
	 * Si está presente y devuelve `false`, el nodo rechaza recibir a `child` como hijo.
	 * Por convención: nodos hoja (tablas, columnas) jamás aceptan hijos;
	 * nodos agrupadores (prefijo, dominio, sección) definen qué tipos pueden contener.
	 */
	acceptsChild?(child: T): boolean;
	/**
	 * Regla opcional de ordenamiento de hijos directos del agrupador.
	 * Devuelve los hijos en el orden deseado. SOLO afecta el nivel inmediato:
	 * el TreeAdapter respeta la profundidad y no propaga el sort a nietos.
	 * Si no está definida, se preserva el orden visual existente.
	 */
	sortChildren?(children: T[]): T[];
	/**
	 * Regla opcional fina para validar el drop específico (segunda barrera).
	 * El TreeAdapter llama a este método sobre el padre del destino cuando
	 * ya pasó `acceptsChild`/`canDropAtRoot`. Permite vetar posiciones puntuales
	 * (p.ej. impedir colocar nodos antes del master de un dominio).
	 */
	canPlaceChildAt?(src: T, target: T, position: "before" | "after"): boolean;
}

type TreeRowConfig = {
	icono?: Omit<IconifyProps, "icon"> & { icon: string; color?: ComponentColor };
	disabled?: boolean;
	draggable?: boolean;
	isFirst?: boolean;
	isLast?: boolean;
	actions?: FlexOptionsInput[];
	cascadeOptions?: CascadeOptionsInput[];
	events?: {
		onopen?: () => void;
		onclose?: () => void;
		onfocus?: () => void;
		onblur?: () => void;
		onclick?: () => void;
		onleadiconclick?: () => void;
	};
};

export abstract class TRABase<TStacker, TWorking extends ITreeData<TWorking>> extends ComplexControl<RowItemProps<TWorking> & Record<string, unknown>> {
	public dragOver: "before" | "after" | "into" | null = null;
	public dragForbidden = false;
	public dragEnterCount = 0;
	public dragPlaceholderHeight = 0;
	public filteredActions: FlexOptionsInput[] = [];
	public cascadeOptions: FlexOptionsInput[] = [];
	public hasRowTools = false;
	public showActions = false;
	public longPressTimer: ReturnType<typeof setTimeout> | undefined;
	static currentDragNodeId = "";

	constructor(bridge: RowItemProps<TWorking>, protected readonly treeAdapter: TreeAdapter<TStacker, TWorking>) {
		super({} as RowItemProps<TWorking> & Record<string, unknown>);
		this.applyBridge(bridge);
	}

	dispose() {
		this.treeAdapter.unregisterRowAdapter(this as unknown as TreeRowAdapter<TStacker, TWorking>);
	}


	applyBridge(bridge: RowItemProps<TWorking>): void {
		for (const key of Reflect.ownKeys(bridge)) {
			if (key === "__proto__") continue;
			const d = Object.getOwnPropertyDescriptor(bridge, key);
			d && Object.defineProperty(this.context, key, d);
		}
	}

	protected touchRowUi(): void {
		(this.context as RowItemProps<TWorking> & { onuitouch?: () => void }).onuitouch?.();
	}

	protected get rowNode(): INode<TWorking> | undefined {
		const n = (this.context as { node?: INode<TWorking> }).node;
		return n ?? undefined;
	}

	sync() {
		const cfg = this.effectiveRowConfig;
		this.filteredActions = this.filterRowActions(cfg);
		this.cascadeOptions = (cfg?.cascadeOptions ?? []) as FlexOptionsInput[];
		this.hasRowTools = this.filteredActions.length > 0 || this.cascadeOptions.length > 0;
		this.showActions =
			this.hasRowTools &&
			(this.treeAdapter.focusedRowId ? this.treeAdapter.normalizeNodeId(this.treeAdapter.focusedRowId.id) : "") === this.id;
	}

	get mergedDisabled() { return this.nodeDisabled || this.treeAdapter.disabled || this.effectiveRowConfig?.disabled }
	get isDraggable() { return !this.treeAdapter.isViewMode && !this.mergedDisabled }
	get rowIcono() { return this.iconParts(this.effectiveRowConfig?.icono) }
	get isHighlighted() {
		const ta = this.treeAdapter;
		const focusedId = ta.focusedRowId ? ta.normalizeNodeId(ta.focusedRowId.id) : "";
		const selectedId = ta.selectedId ? ta.normalizeNodeId(ta.selectedId.id) : "";
		return (focusedId.length > 0 ? this.id === focusedId : false) || (focusedId.length === 0 && selectedId.length > 0 && this.id === selectedId);
	}
	get isSelected() {
		const ta = this.treeAdapter;
		const selectedId = ta.selectedId ? ta.normalizeNodeId(ta.selectedId.id) : "";
		return selectedId.length > 0 && this.id === selectedId;
	}


	get onLeadIconClick(): (() => void) | null {
		return this.effectiveRowConfig?.events?.onleadiconclick ?? null;
	}
	get canAddSibling(): boolean {
		return !!this.id && !this.mergedDisabled && !this.treeAdapter.isViewMode;
	}
	addSiblingAbove(): void {
		const id = this.id;
		if (!id || !this.canAddSibling) return;
		void this.treeAdapter.onaddsibling(id, "above");
	}
	addSiblingBelow(): void {
		const id = this.id;
		if (!id || !this.canAddSibling) return;
		void this.treeAdapter.onaddsibling(id, "below");
	}
	get canAddChild(): boolean {
		const node = this.rowNode;
		if (!node || !this.id || this.mergedDisabled || this.treeAdapter.isViewMode) return false;
		const hasChildren = this.hasChildren;
		const isLast = !!node.isLast;
		return !isLast && (hasChildren || !node.isLeaf);
	}
	get addChildLabel(): string {
		const node = this.rowNode;
		if (!node) return "";
		return node.isPenultimate ? "Agregar recurso" : `Agregar ${node.nextLevelTitle || "hijo"}`;
	}
	addChild(): void {
		const id = this.id;
		if (!id || !this.canAddChild) return;
		void this.treeAdapter.onaddchild(id);
	}
	getRootTree(treeItem: HTMLDetailsElement) {
		let el: HTMLElement | null = treeItem;
		while (el) {
			if (el.classList?.contains("isp-tree")) return el;
			el = el.parentElement;
		}
		return null;
	}
	getVisibleSummaries(treeItem: HTMLDetailsElement) {
		const root = this.getRootTree(treeItem);
		if (!root) return [] as HTMLElement[];
		const all = root.querySelectorAll<HTMLElement>("details.trvwr-itm > summary");
		return Array.from(all).filter((s) => {
			let el: HTMLElement | null = s.parentElement?.parentElement || null;
			while (el && !el.classList?.contains("isp-tree")) {
				if (el.tagName === "DETAILS" && !(el as HTMLDetailsElement).open) return false;
				el = el.parentElement;
			}
			return true;
		});
	}
	getRowIdFromSummary(summary: HTMLElement) {
		return summary.closest<HTMLElement>("[data-idrow]")?.dataset.idrow || "";
	}
	focusSummary(summary?: HTMLElement) {
		if (!summary) return;
		if (this.treeAdapter.bLostFocus) return;
		this.treeAdapter.blurTreeSummariesExcept(summary);
		summary.focus();
		if (document.activeElement !== summary) {
			summary.setAttribute("tabindex", "-1");
			summary.focus();
		}
		const rowId = this.treeAdapter.normalizeNodeId(this.getRowIdFromSummary(summary));
		if (rowId.length > 0) {
			const node = this.treeAdapter.findNodeById(rowId);
			if (node) this.onrowfocus(node);
		}
	}
	get id() { return this.treeAdapter.normalizeNodeId(this.rowNode?.id) }
	get hasChildren() { return !!(this.rowNode?.children && this.rowNode.children.length > 0) }
	get isReallyFocused(): boolean {
		const ta = this.treeAdapter;
		const id = ta.focusedRowId ? ta.normalizeNodeId(ta.focusedRowId.id) : "";
		return id.length > 0 && id === this.id;
	}
	get hasDescendantFocus(): boolean {
		const ta = this.treeAdapter;
		const id = ta.focusedRowId ? ta.normalizeNodeId(ta.focusedRowId.id) : "";
		if (id.length === 0 || id === this.id) return false;
		return this.containsDescendantId(this.rowNode?.children, id);
	}
	get isReallyHovered(): boolean {
		const ta = this.treeAdapter;
		const id = ta.hoveredRowId ? ta.normalizeNodeId(ta.hoveredRowId.id) : "";
		return id.length > 0 && id === this.id;
	}
	get hasDescendantHover(): boolean {
		const ta = this.treeAdapter;
		const id = ta.hoveredRowId ? ta.normalizeNodeId(ta.hoveredRowId.id) : "";
		if (id.length === 0 || id === this.id) return false;
		return this.containsDescendantId(this.rowNode?.children, id);
	}
	get floatVisible(): boolean {
		const ta = this.treeAdapter;
		const hoverId = ta.hoveredRowId ? ta.normalizeNodeId(ta.hoveredRowId.id) : "";
		if (hoverId.length > 0) return hoverId === this.id;
		const focusId = ta.focusedRowId ? ta.normalizeNodeId(ta.focusedRowId.id) : "";
		return focusId.length > 0 && focusId === this.id;
	}
	get floatFocusOnly(): boolean { return this.floatVisible && this.isReallyFocused }
	get floatHoverOnly(): boolean { return this.floatVisible && !this.isReallyFocused && this.isReallyHovered }
	private containsDescendantId(children: INode<TWorking>[] | undefined, targetId: string): boolean {
		if (!children || children.length === 0) return false;
		const norm = this.treeAdapter.normalizeNodeId.bind(this.treeAdapter);
		for (const c of children) {
			if (norm(c.id) === targetId) return true;
			if (this.containsDescendantId(c.children, targetId)) return true;
		}
		return false;
	}
	get isNodeOpen() { return !!this.id && (this.treeAdapter.expandedNodes ?? []).some((node) => node.id === this.id) }
	get nodeDisabled() { return !!this.id && (this.treeAdapter.disabledNodes ?? []).includes(this.id) }
	get siblingPos() {
		if (!this.id || !this.treeAdapter?.getSiblingPosition) return { isFirst: false, isLast: false };
		return this.treeAdapter.getSiblingPosition(this.id)
	}
	get effectiveRowConfig(): TreeRowConfig {
		if (!this.rowNode) return {};
		const fallback = this.defaultRowConfig(this.rowNode) ?? {};
		if (!this.treeAdapter.getRowConfig) return fallback;
		const cfg = this.treeAdapter.getRowConfig(this.rowNode) ?? {};
		const hasCfgActions = (cfg.actions?.length ?? 0) > 0;
		const hasCfgCascadeOptions = (cfg.cascadeOptions?.length ?? 0) > 0;
		return {
			...fallback,
			...cfg,
			actions: hasCfgActions ? (cfg.actions ?? []) : (fallback.actions ?? []),
			cascadeOptions: hasCfgCascadeOptions ? (cfg.cascadeOptions ?? []) : (fallback.cascadeOptions ?? []),
			events: { ...(fallback.events ?? {}), ...(cfg.events ?? {}) },
		};
	}
	get shouldFlash() { return !!this.id && (this.treeAdapter.flashIds ?? []).includes(this.id) }
	onrowclick() {
		if (!this.rowNode) return;
		this.treeAdapter.onrowclick(this.rowNode);
	}
	onrowdblclick() {
		if (!this.rowNode) return;
		this.treeAdapter.onrowdblclick(this.rowNode);
	}
	onrowdelete() {
		if (!this.rowNode) return;
		this.treeAdapter.onrowdelete(this.rowNode);
	}
	onrowtoggle(open: boolean) {
		if (!this.rowNode) return;
		const source = this.treeAdapter.expandedNodes ?? [];
		const next = this.treeAdapter.expandedNodesAfterToggle(source, this.rowNode.id, open);
		this.treeAdapter.setExpandedNodesFn(next);
		this.treeAdapter.onrowtoggle(this.rowNode);
	}
	onrowreorder(sourceId: string, targetId: string, position: "before" | "after" | "into") {
		this.treeAdapter.onrowreorder(sourceId, targetId, position);
	}
	onrowfocus(node: INode<TWorking>) {
		this.treeAdapter.onrowfocus(node);
	}
	private defaultRowConfig(node: INode<TWorking>): TreeRowConfig {
		const ta = this.treeAdapter;
		const hasChildren = this.hasChildren;
		const isExpanded = this.isNodeOpen;
		const isLast = !!node.isLast;
		const isFolder = !isLast && (hasChildren || !node.isLeaf);
		const icon = isLast ? "mdi:file-document-outline" : hasChildren ? (isExpanded ? "mdi:folder-open-outline" : "mdi:folder-outline") : node.isLeaf ? "mdi:file-outline" : "mdi:folder-outline";
		const isFolderIcon = !isLast && icon.includes("folder");
		const onView = () => ta.onCtrlEnter(node);
		const onMoveUp = async () => { const newId = await ta.move(node.id, "up"); ta.commitAndFlash(newId); };
		const onMoveDown = async () => { const newId = await ta.move(node.id, "down"); ta.commitAndFlash(newId); };
		const onEdit = () => ta.openEdit(node);
		const onDelete = () => this.onrowdelete();
		const actions: FlexOptionsInput[] = [
			isLast ? { icon: "mdi:eye-outline", title: "Ver recurso", onClick: onView } : null,
			[
				{ icon: "mdi:arrow-up", title: "Mover arriba", onClick: onMoveUp },
				{ icon: "mdi:arrow-down", title: "Mover abajo", onClick: onMoveDown },
			],
			[
				{ icon: "mdi:pencil-outline", title: "Editar", onClick: onEdit },
				{ icon: "mdi:delete-outline", title: "Eliminar", color: "danger", onClick: onDelete },
			],
		];
		return {
			icono: { icon, color: isLast ? "info" : isFolderIcon ? undefined : "color", ...(isFolderIcon ? { style: "color: #C9A227" } : {}) },
			actions,
			draggable: true,
			isFirst: this.siblingPos.isFirst,
			isLast: this.siblingPos.isLast,
		};
	}
	filterRowActions(cfg?: TreeRowConfig): FlexOptionsInput[] {
		const keep = (item: unknown): boolean => {
			if (!item || typeof item !== "object") return !!item;
			const btn = item as { icon?: string; separator?: boolean };
			if (btn.separator) return true;
			if (cfg?.isFirst && btn.icon === "mdi:arrow-up") return false;
			if (cfg?.isLast && btn.icon === "mdi:arrow-down") return false;
			return true;
		};
		const out: FlexOptionsInput[] = [];
		for (const entry of cfg?.actions ?? []) {
			if (!entry) continue;
			if (Array.isArray(entry)) {
				const kept = entry.filter(keep);
				if (kept.length) out.push(kept);
				continue;
			}
			if (keep(entry)) out.push(entry);
		}
		return out;
	}
	iconParts(o?: Omit<IconifyProps, "icon"> & { icon: string; color?: ComponentColor }) {
		if (!o?.icon) return null;
		const { icon, color, style: iconStyle, ...rest } = o;
		const mergedStyle = [typeof iconStyle === "string" ? iconStyle : "", color ? `color: ${resolveColor(color)}` : "", "font-size: 1.1rem"].filter(Boolean).join("; ");
		return { icon, rest, mergedStyle };
	}
}

export function groupedWithSeparators<T>(groups: ReadonlyArray<T | T[] | false | null | undefined>): Array<T | { separator: true }> {
	const result: Array<T | { separator: true }> = [];
	for (const group of groups) {
		if (!group) continue;
		const items = (Array.isArray(group) ? group : [group]).filter(Boolean) as T[];
		if (items.length === 0) continue;
		if (result.length > 0) result.push({ separator: true });
		result.push(...items);
	}
	return result;
}

export function objRootsToNodes<T extends ITreeData<T>>(
	roots: readonly T[],
	labelFn?: (obj: T) => string,
): INode<T>[] {
	return roots.map((r) => {
		const rawId = String(r.id || "").replace(/^(_UP_|_M_)/, "").trim() || String(r.id || "");
		const rawReference = String(r.ireference || "").replace(/^(_UP_|_M_)/, "").trim() || String(r.ireference || "");
		const text = labelFn ? labelFn(r) : rawId;
		return {
			id: rawId,
			ireference: rawReference,
			obj: r,
			stack: r.stack,
			label: text,
			children: r.children.length ? objRootsToNodes(r.children, labelFn) : [],
			istack: r.istack,
			nistack: r.nistack,
			isLeaf: r.isLeaf || false,
			isPenultimate: r.isPenultimate || false,
			nextLevelTitle: r.nextLevelTitle || "",
			isLast: r.isLast || r.isLeaf || false,
		};
	});
}
