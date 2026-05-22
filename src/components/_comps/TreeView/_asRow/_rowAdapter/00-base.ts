import type { TObject } from "@ingenieria_insoft/ispgen";
import type { ComponentColor, IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsInput } from "../../../Options/FlexOptions.svelte";
import type { RowItemProps } from "../_rowItem.svelte";
import type { TARowBase, TreeRowViewAdapterFloatCardConfig } from "../00-treeAdapterAsRow";
import type { TreeRowAdapter } from "./02-events";
import type { INode, ITreeData } from "../../_treeAdapter/_defgen/00-tree-data";
export type { INode, ITreeData };

export type RowIconConfig = Omit<IconifyProps, "icon"> & { icon: string; color?: ComponentColor };

export type TreeRowConfig = {
	icono?: RowIconConfig;
	disabled?: boolean;
	draggable?: boolean;
	isFirst?: boolean;
	isLast?: boolean;
	actions?: FlexOptionsInput[];
	cascadeOptions?: FlexOptionsInput[];
	// Override por nodo del transform aplicado al floating card de la fila.
	// Se mezcla sobre el default global del adapter.
	floatCard?: TreeRowViewAdapterFloatCardConfig;
	events?: {
		onopen?: () => void;
		onclose?: () => void;
		onfocus?: () => void;
		onblur?: () => void;
		onclick?: () => void;
		onleadiconclick?: () => void;
	};
};

export type RowAdapterContext<TListObj extends ITreeData<TListObj> & TObject> = RowItemProps<TListObj> & {
	forceRefresh?: () => void;
	node?: INode<TListObj>;
} & Record<string, unknown>;

export class TRABase<TListObj extends ITreeData<TListObj> & TObject> {
	protected readonly context: RowAdapterContext<TListObj>;

	onstateupdate(ctx: RowAdapterContext<TListObj>): void {
		Object.defineProperties(this.context, Object.getOwnPropertyDescriptors(ctx));
	}

	public dragOver: "before" | "after" | "into" | null = null;
	public dragForbidden = false;
	public dragEnterCount = 0;
	public dragPlaceholderHeight = 0;
	public filteredActions: FlexOptionsInput[] = [];
	public cascadeOptions: FlexOptionsInput[] = [];
	public hasRowTools = false;
	public showOptions = false;

	constructor(bridge: RowItemProps<TListObj>, protected readonly treeAdapter: TARowBase<TListObj>) {
		this.context = {} as RowAdapterContext<TListObj>;
		this.applyBridge(bridge);
	}

	dispose() {
		this.treeAdapter.unregisterRowAdapter(this as unknown as TreeRowAdapter<TListObj>);
	}

	applyBridge(bridge: RowItemProps<TListObj>): void {
		for (const key of Reflect.ownKeys(bridge)) {
			if (key === "__proto__") continue;
			const d = Object.getOwnPropertyDescriptor(bridge, key);
			d && Object.defineProperty(this.context, key, d);
		}
	}

	protected requestRowUiSync(): void {
		this.context.forceRefresh?.();
	}

	requestRowUiSyncPublic(): void {
		this.context.forceRefresh?.();
	}

	protected get rowNode(): INode<TListObj> | undefined {
		return this.context.node ?? undefined;
	}

	sync() {
		const cfg = this.effectiveRowConfig;
		this.filteredActions = this.treeAdapter.filterRowActions(cfg, this.isFrozen);
		this.cascadeOptions = (cfg?.cascadeOptions ?? []) as FlexOptionsInput[];
		this.hasRowTools = this.filteredActions.length > 0 || this.cascadeOptions.length > 0;
		this.showOptions =
			this.hasRowTools &&
			(this.treeAdapter.focusedNode ? this.treeAdapter.normalizeFlatPath(this.treeAdapter.focusedNode.flatPath) : "") === this.flatPath;
	}

	get mergedDisabled(): boolean { return !!(this.nodeDisabled || this.treeAdapter.disabled || this.effectiveRowConfig?.disabled) }
	get isFrozen(): boolean {
		const node = this.rowNode;
		return !!node && this.treeAdapter.isFrozen(node);
	}
	get showCaret(): boolean {
		const node = this.rowNode;
		if (!node) return false;
		if (node.isAtom) return false;
		// Los groupers siempre exponen caret: con hijos hace toggle real, sin hijos
		// dispara `customs.onexpand` para que el consumer abra su selector.
		return true;
	}
	get isDraggable() { return this.treeAdapter.canMutate && !this.treeAdapter.isProtected && !this.mergedDisabled && !this.isFrozen }
	/**
	 * `true` cuando el árbol está en modo protección y la fila sería movible si no lo estuviera.
	 * Se usa para reemplazar visualmente el handle de arrastrar por un ícono de candado y
	 * comunicar al usuario que la inmovilidad es deliberada (no un error).
	 */
	get isLockedByProtection() {
		return this.treeAdapter.isProtected && !this.mergedDisabled && !this.isFrozen;
	}
	get rowIcono() { return this.treeAdapter.iconParts(this.effectiveRowConfig?.icono) }
	get isHighlighted() {
		const ta = this.treeAdapter;
		const focusedFlatPath = ta.focusedNode ? ta.normalizeFlatPath(ta.focusedNode.flatPath) : "";
		const selectedFlatPath = ta.selectedNode ? ta.normalizeFlatPath(ta.selectedNode.flatPath) : "";
		return (focusedFlatPath.length > 0 ? this.flatPath === focusedFlatPath : false) || (focusedFlatPath.length === 0 && selectedFlatPath.length > 0 && this.flatPath === selectedFlatPath);
	}
	get isSelected() {
		const ta = this.treeAdapter;
		const selectedFlatPath = ta.selectedNode ? ta.normalizeFlatPath(ta.selectedNode.flatPath) : "";
		return selectedFlatPath.length > 0 && this.flatPath === selectedFlatPath;
	}

	get onLeadIconClick(): (() => void) | null {
		return this.effectiveRowConfig?.events?.onleadiconclick ?? null;
	}
	get canAddSibling(): boolean {
		return !!this.flatPath && !this.mergedDisabled && !this.treeAdapter.isReadOnly;
	}
	addSiblingAbove(): void {
		const flatPath = this.flatPath;
		if (!flatPath || !this.canAddSibling) return;
		void this.treeAdapter.onaddsibling(flatPath, "above");
	}
	addSiblingBelow(): void {
		const flatPath = this.flatPath;
		if (!flatPath || !this.canAddSibling) return;
		void this.treeAdapter.onaddsibling(flatPath, "below");
	}
	get cascadeDisabled(): boolean {
		// El botn "Ms opciones" slo se deshabilita cuando NO hay ninguna accin
		// dentro de la cascada. Aunque todas estn `disabled` (p.ej. en readonly), la
		// cascada debe poder abrirse: para la UX es ms intuitivo que el usuario vea
		// las opciones existentes (deshabilitadas) que un botn muerto sin feedback.
		const opts = this.cascadeOptions ?? [];
		if (opts.length === 0) return true;
		const flat: Array<{ separator?: boolean }> = [];
		for (const entry of opts) {
			if (!entry) continue;
			if (Array.isArray(entry)) flat.push(...(entry as Array<{ separator?: boolean }>));
			else flat.push(entry as { separator?: boolean });
		}
		const actionable = flat.filter((it) => it && !it.separator);
		return actionable.length === 0;
	}
	get canAddChild(): boolean {
		const node = this.rowNode;
		if (!node || !this.flatPath || this.mergedDisabled || this.treeAdapter.isReadOnly) return false;
		return !node.isAtom;
	}
	addChild(): void {
		const flatPath = this.flatPath;
		if (!flatPath || !this.canAddChild) return;
		void this.treeAdapter.onaddchild(flatPath);
	}
	getRootTree(treeItem: HTMLDetailsElement) {
		let el: HTMLElement | null = treeItem;
		while (el) {
			if (el.classList?.contains("isp-tree") || el.hasAttribute?.("data-tree-root")) return el;
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
			while (el && el !== root && !el.classList?.contains("isp-tree") && !el.hasAttribute?.("data-tree-root")) {
				if (el.tagName === "DETAILS" && !(el as HTMLDetailsElement).open) return false;
				el = el.parentElement;
			}
			return true;
		});
	}
	getFlatPathFromSummary(summary: HTMLElement) {
		return summary.closest<HTMLElement>("[data-flatpath]")?.dataset.flatpath || "";
	}
	focusSummary(summary?: HTMLElement) {
		if (!summary) return;
		this.treeAdapter.blurTreeSummariesExcept(summary);
		summary.focus();
		if (document.activeElement !== summary) {
			summary.setAttribute("tabindex", "-1");
			summary.focus();
		}
		const flatPath = this.treeAdapter.normalizeFlatPath(this.getFlatPathFromSummary(summary));
		if (flatPath.length > 0) {
			const node = this.treeAdapter.findNodeByFlatPath(flatPath);
			if (node) this.treeAdapter.onrowfocus(node);
		}
	}
	get flatPath() { return this.treeAdapter.normalizeFlatPath(this.rowNode?.flatPath) }
	get hasChildren() { return !!(this.rowNode?.childrens && this.rowNode.childrens.length > 0) }
	get isReallyFocused(): boolean {
		const ta = this.treeAdapter;
		const flatPath = ta.focusedNode ? ta.normalizeFlatPath(ta.focusedNode.flatPath) : "";
		return flatPath.length > 0 && flatPath === this.flatPath;
	}
	get hasDescendantFocus(): boolean {
		const ta = this.treeAdapter;
		const flatPath = ta.focusedNode ? ta.normalizeFlatPath(ta.focusedNode.flatPath) : "";
		if (flatPath.length === 0 || flatPath === this.flatPath) return false;
		return this.containsDescendantFlatPath(this.rowNode?.childrens, flatPath);
	}
	get isReallyHovered(): boolean {
		const ta = this.treeAdapter;
		const flatPath = ta.hoveredNode ? ta.normalizeFlatPath(ta.hoveredNode.flatPath) : "";
		return flatPath.length > 0 && flatPath === this.flatPath;
	}
	get hasDescendantHover(): boolean {
		const ta = this.treeAdapter;
		const flatPath = ta.hoveredNode ? ta.normalizeFlatPath(ta.hoveredNode.flatPath) : "";
		if (flatPath.length === 0 || flatPath === this.flatPath) return false;
		return this.containsDescendantFlatPath(this.rowNode?.childrens, flatPath);
	}
	get floatVisible(): boolean {
		const ta = this.treeAdapter;
		const hoverFlatPath = ta.hoveredNode ? ta.normalizeFlatPath(ta.hoveredNode.flatPath) : "";
		return hoverFlatPath.length > 0 && hoverFlatPath === this.flatPath;
	}
	get floatFocusOnly(): boolean { return this.floatVisible && this.isReallyFocused }
	get floatHoverOnly(): boolean { return this.floatVisible && !this.isReallyFocused && this.isReallyHovered }
	private containsDescendantFlatPath(childrens: INode<TListObj>[] | undefined, targetFlatPath: string): boolean {
		if (!childrens || childrens.length === 0) return false;
		const norm = this.treeAdapter.normalizeFlatPath.bind(this.treeAdapter);
		for (const c of childrens) {
			if (norm(c.flatPath) === targetFlatPath) return true;
			if (this.containsDescendantFlatPath(c.childrens, targetFlatPath)) return true;
		}
		return false;
	}
	get isNodeOpen() { return !!this.flatPath && (this.treeAdapter.expandedFlatPaths ?? []).includes(this.flatPath) }
	get nodeDisabled() { return !!this.flatPath && (this.treeAdapter.disabledNodes ?? []).includes(this.flatPath) }
	get effectiveRowConfig(): TreeRowConfig {
		if (!this.rowNode) return {};
		return this.treeAdapter.getRowConfig?.(this.rowNode) ?? {};
	}
	get floatCard(): TreeRowViewAdapterFloatCardConfig {
		// Mezcla el default global del adapter con el override por nodo (si lo hay).
		const merged: TreeRowViewAdapterFloatCardConfig = {
			...this.treeAdapter.floatCard,
			...(this.effectiveRowConfig.floatCard ?? {}),
		};
		// Ajuste general: el primer root del rbol queda recortado por el overflow del
		// contenedor scrollable. Se suma 15px verticales a lo que el consumer haya definido
		// (en lugar de imponerlo desde cada vista) para que la solucin viva en el tree base.
		const roots = this.treeAdapter.rootNodes ?? [];
		const firstRoot = roots[0];
		if (firstRoot && this.rowNode && firstRoot.flatPath === this.rowNode.flatPath) {
			const baseTy = typeof merged.ty === "number" ? merged.ty : Number(merged.ty ?? 0) || 0;
			merged.ty = baseTy + 15;
		}
		return merged;
	}
	onrowtoggle(open: boolean) {
		if (!this.rowNode) return;
		const source = this.treeAdapter.expandedNodes ?? [];
		const next = this.treeAdapter.expandedNodesAfterToggle(source, this.rowNode.flatPath, open);
		this.treeAdapter.setExpandedNodesFn(next);
		this.treeAdapter.onrowtoggle(this.rowNode, open);
	}
}
