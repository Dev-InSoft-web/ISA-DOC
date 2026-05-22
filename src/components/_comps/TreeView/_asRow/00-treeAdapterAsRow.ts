import type { TObject } from "@ingenieria_insoft/ispgen";
import { resolveColor, type ButtonIconifyProps, type IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsInput } from "../../Options/FlexOptions.svelte";
import { TreeRowAdapter } from "./_rowAdapter/02-events";
import { type INode, type ITreeData } from "../_treeAdapter/_defgen/00-tree-data";
import type { RowItemProps } from "./_rowItem.svelte";
import type { TreeRowConfig, RowIconConfig } from "./_rowAdapter/00-base";
import { TARoles } from "../_treeAdapter/07-roles";
import type { ITreeRuntimeRow } from "../contracts";

export interface TreeRowViewAdapterFloatCardConfig {
	tx?: number | string;
	ty?: number | string;
	scale?: number;
}

export interface TreeRowViewAdapterConfig {
	floatCard?: TreeRowViewAdapterFloatCardConfig;
}

export class TARowBase<TListObj extends ITreeData<TListObj> & TObject> extends TARoles<TListObj> {
	protected _adapterConfig: TreeRowViewAdapterConfig = {};
	protected _lastFocusedFlatPath: string = "";
	public currentDragFlatPath: string = "";

	filterRowActions(cfg: TreeRowConfig | undefined, frozen: boolean): FlexOptionsInput[] {
		const keep = (item: unknown): boolean => {
			if (!item || typeof item !== "object") return !!item;
			const btn = item as { icon?: string };
			if (cfg?.isFirst && btn.icon === "mdi:arrow-up") return false;
			if (cfg?.isLast && btn.icon === "mdi:arrow-down") return false;
			if (frozen && (btn.icon === "mdi:arrow-up" || btn.icon === "mdi:arrow-down")) return false;
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

	formatHotkeyDisplay(combo: string): string {
		if (!combo) return "";
		const parts = combo.split("+").map((p) => p.trim()).filter(Boolean);
		const map: Record<string, string> = {
			ArrowUp: "Up", ArrowDown: "Down", ArrowLeft: "Left", ArrowRight: "Right",
			Insert: "Ins", Delete: "Supr", Escape: "Esc",
		};
		return parts
			.map((p) => {
				if (map[p]) return map[p];
				if (p.startsWith("Key") && p.length === 4) return p.slice(3);
				if (p.startsWith("Digit") && p.length === 6) return p.slice(5);
				return p;
			})
			.join("+");
	}

	decorateHotkeyTitles(actions: FlexOptionsInput[] | undefined): FlexOptionsInput[] {
		const decorate = (raw: unknown): unknown => {
			if (!raw || typeof raw !== "object") return raw;
			const btn = raw as Record<string, unknown>;
			const hotkey = typeof btn.hotkey === "string" ? btn.hotkey : "";
			if (!hotkey) return btn;
			const display = this.formatHotkeyDisplay(hotkey);
			if (!display) return btn;
			const baseTitle = typeof btn.title === "string" ? btn.title : "";
			if (baseTitle.includes(`| ${display}`)) return btn;
			const newTitle = baseTitle ? `${baseTitle} | ${display}` : display;
			return { ...btn, title: newTitle };
		};
		const out: FlexOptionsInput[] = [];
		for (const entry of actions ?? []) {
			if (!entry) { out.push(entry); continue; }
			if (Array.isArray(entry)) {
				out.push(entry.map((b) => decorate(b)) as FlexOptionsInput);
				continue;
			}
			out.push(decorate(entry) as FlexOptionsInput);
		}
		return out;
	}

	findHotkeyHandler(lists: Array<FlexOptionsInput[] | undefined>, combo: string): (() => void) | null {
		if (!combo) return null;
		const visit = (raw: unknown): (() => void) | null => {
			if (!raw || typeof raw !== "object") return null;
			const btn = raw as Record<string, unknown>;
			if (btn.hotkey !== combo) return null;
			if (btn.disabled) return null;
			const fn = btn.onClick;
			return typeof fn === "function" ? (fn as () => void) : null;
		};
		for (const list of lists) {
			for (const entry of list ?? []) {
				if (!entry) continue;
				if (Array.isArray(entry)) {
					for (const b of entry) {
						const h = visit(b);
						if (h) return h;
					}
					continue;
				}
				const h = visit(entry);
				if (h) return h;
			}
		}
		return null;
	}

	iconParts(o?: RowIconConfig): { icon: string; rest: Omit<IconifyProps, "icon">; mergedStyle: string } | null {
		if (!o?.icon) return null;
		const { icon, color, style: iconStyle, ...rest } = o;
		const mergedStyle = [typeof iconStyle === "string" ? iconStyle : "", color ? `color: ${resolveColor(color)}` : "", "font-size: 1.1rem"].filter(Boolean).join("; ");
		return { icon, rest, mergedStyle };
	}

	get lastFocusedNode(): INode<TListObj> | null {
		if (this._focusedFlatPath) return this.findNodeByFlatPath(this._focusedFlatPath);
		if (this._lastFocusedFlatPath) return this.findNodeByFlatPath(this._lastFocusedFlatPath);
		return null;
	}

	applyAdapterConfig(cfg: TreeRowViewAdapterConfig | undefined): void {
		if (!cfg) return;
		this._adapterConfig = { ...this._adapterConfig, ...cfg };
	}

	get floatCard(): TreeRowViewAdapterFloatCardConfig {
		const cfg = this._adapterConfig.floatCard ?? {};
		return { scale: 0.8, ...cfg };
	}

	protected shouldAutoExpand(node: INode<TListObj>): boolean {
		return this.isGrouper(node);
	}

	private _autoExpandedSeen = new Set<string>();

	applyDefaultExpansion(): void {
		if (!this.rootNodes.length) return;
		const currentIds = new Set(this._expandedFlatPaths);
		let changed = false;
		const walk = (nodes: INode<TListObj>[]): void => {
			for (const n of nodes) {
				const key = this.normalizeFlatPath(n.flatPath);
				if (key && this.shouldAutoExpand(n) && !this._autoExpandedSeen.has(key)) {
					this._autoExpandedSeen.add(key);
					if (!currentIds.has(key)) { currentIds.add(key); changed = true; }
				}
				n.childrens?.length && walk(n.childrens);
			}
		};
		walk(this.rootNodes);
		if (!changed) return;
		this.expandedFlatPaths = [...currentIds];
		this.syncAllRowAdapters();
		this.didNodesExpand = true;
	}

	override onrefresh(): void {
		super.onrefresh();
		if (this.rootNodes.length) this.applyDefaultExpansion();
	}

	onrowclick(node: INode<TListObj>): void {
		this._selectedFlatPath = this.normalizeFlatPath(node.flatPath);
		this.record = node;
		this.onrefresh();
	}

	onrowdblclick(node: INode<TListObj>): void {
		if (this.isReadOnly) this.openViewNode(node);
		else this.openEdit(node);
	}

	onrowfocus(node: INode<TListObj>): void {
		this.focusedNode = node;
		this._lastFocusedFlatPath = String(node?.flatPath ?? "");
		this.syncAllRowAdapters();
		this.consumeronrowfocus?.(node);
	}

	override onrowtoggle(node: INode<TListObj>, open: boolean): void {
		if (!node?.isGroupActor) return;
		if (!this.canMutate) return;
		const handler = open ? this.customs?.onexpand : this.customs?.oncollapse;
		if (!handler) return;
		handler(node, this.buildCustomsRuntime());
	}

	onrowdelete(node: INode<TListObj>): void {
		if (!this.requestDelete(node)) return;
		this.ondeleteconfirmed();
	}

	onrowreorder(sourceId: string, targetId: string, position: "before" | "after" | "into"): void {
		const newId = position === "into" ? this.nestInto(sourceId, targetId) : this.reorder(sourceId, targetId, position);
		this.commitAndFlash(newId);
		this.consumeronrowreorder?.(sourceId, targetId, position);
	}

	consumeronrowfocus?: (node: INode<TListObj>) => void;
	
	consumeronrowreorder?: (sourceId: string, targetId: string, position: "before" | "after" | "into") => void;

	registerRowAdapter(rowAdapter: TreeRowAdapter<TListObj>): void {
		const key = this.normalizeFlatPath(rowAdapter.flatPath);
		if (key.length === 0) return;
		const existing = Array.from(this.rowAdapters.values()).find((item) => item.flatPath === rowAdapter.flatPath);
		!existing && this.rowAdapters.set(key, rowAdapter);
	}

	unregisterRowAdapter(rowAdapter: TreeRowAdapter<TListObj>): void {
		const key = this.normalizeFlatPath(rowAdapter.flatPath);
		if (key.length === 0) return;
		this.rowAdapters.delete(key);
	}

	private _bridgeCallStats = new Map<string, { count: number; since: number; loggedAt?: number; cutAt?: number }>();
	getOrCreateRowAdapter(bridge: RowItemProps<TListObj>): TreeRowAdapter<TListObj> {
		const node = (bridge as RowItemProps<TListObj> & { node?: INode<TListObj> }).node;
		if (node == null) {
			throw new Error("TreeAdapter.getOrCreateRowAdapter: `bridge.node` es obligatorio");
		}
		const idKey = this.normalizeFlatPath(node.flatPath);
		if (idKey.length === 0) {
			throw new Error("TreeAdapter.getOrCreateRowAdapter: `bridge.node.flatPath` no puede quedar vacío tras normalizar");
		}
		
		const now = typeof performance !== "undefined" ? performance.now() : Date.now();
		let stat = this._bridgeCallStats.get(idKey);
		if (!stat || now - stat.since > 1000) {
			stat = { count: 1, since: now };
			this._bridgeCallStats.set(idKey, stat);
		} else {
			stat.count++;
		}
		const overflow = stat.count > 50;
		if (overflow && !stat.loggedAt) {
			stat.loggedAt = now;
		}
		const existing = this.rowAdapters.get(idKey);
		if (existing) {
			if (stat.count > 200) {
				if (!stat.cutAt) {
					stat.cutAt = now;
				}
				return existing;
			}
			existing.applyBridge(bridge);
			existing.sync();
			return existing;
		}
		const created = new TreeRowAdapter<TListObj>(bridge, this);
		this.registerRowAdapter(created);
		this.rowAdapters.set(idKey, created);
		created.sync();
		return created;
	}

	disposeRowAdapterByFlatPath(nodeId: string): void {
		const existing = this.rowAdapters.get(this.normalizeFlatPath(nodeId));
		if (!existing) return;
		existing.dispose();
	}

	syncAllRowAdapters(): void {
		for (const adapter of this.rowAdapters.values()) adapter.sync();
		this.notifyUI();
	}

	syncRowAdaptersByFlatPaths(ids: ReadonlyArray<string | null | undefined>): void {
		let touched = false;
		for (const raw of ids) {
			if (!raw) continue;
			const key = this.normalizeFlatPath(raw);
			if (!key) continue;
			const adapter = this.rowAdapters.get(key);
			if (!adapter) continue;
			adapter.sync();
			touched = true;
		}
		if (touched) this.notifyUI();
	}

	ontreeoutsidepointerdown(e: PointerEvent): void {
		if (typeof document === "undefined") return;
		const id = this.treeRootId;
		if (!id) return;
		const body = document.querySelector(`[data-tree-root="${CSS.escape(id)}"]`);
		if (!body) return;
		const tgt = e.target as Node | null;
		if (tgt && body.contains(tgt)) return;
		let changed = false;
		if (this._hoveredFlatPath) { this.hoveredNode = null; changed = true; }
		if (this._focusedFlatPath) { this.focusedNode = null; changed = true; }
		if (changed) this.syncAllRowAdapters();
	}

	getRowConfig(node: INode<TListObj>): TreeRowConfig | null {
		const defaultCfg = this.buildDefaultRowConfig(node);
		if (this.customs?.getRowConfig) return this.customs.getRowConfig(node, defaultCfg);
		return defaultCfg;
	}

	protected buildDefaultRowConfig(node: INode<TListObj>): TreeRowConfig | null {
		const rowController = this.rowAdapters.get(this.normalizeFlatPath(node.flatPath));
		const hasChildren = rowController?.hasChildren ?? !!(node.childrens && node.childrens.length > 0);
		const isLastNode = !!node.isAtom;
		const isFolder = !isLastNode;
		const isEmptyFolder = isFolder && !hasChildren;
		const isExpanded = rowController?.isNodeOpen ?? this._expandedFlatPaths.includes(this.normalizeFlatPath(node.flatPath));
		const iconCfg = this.customs?.getNodeIcon?.(node, { isLastNode, isFolder, hasChildren, isExpanded, isEmptyFolder }) ?? null;
		const sibPos = this.getSiblingPosition?.(node.flatPath) ?? { isFirst: false, isLast: false };
		const rt = this.buildCustomsRuntime();
		const actions: FlexOptionsInput[] = this.decorateHotkeyTitles(this.customs?.rowActions?.(node, rt) ?? []);
		const cascadeOptions: FlexOptionsInput[] = this.decorateHotkeyTitles(this.customs?.rowCascadeOptions?.(node, rt) ?? []);
		
		const nodeFloatCard = (node as unknown as { floatCard?: TreeRowViewAdapterFloatCardConfig }).floatCard;
		return {
			icono: iconCfg?.icon ? {
				icon: iconCfg.icon,
				...(iconCfg.color !== undefined ? { color: iconCfg.color } : {}),
				...(iconCfg.style !== undefined ? { style: iconCfg.style } : {}),
				...(iconCfg.title !== undefined ? { title: iconCfg.title } : {}),
			} : undefined,
			actions,
			cascadeOptions,
			...(nodeFloatCard ? { floatCard: nodeFloatCard } : {}),
			draggable: this.draggable && this.canMutate,
			isFirst: sibPos.isFirst,
			isLast: sibPos.isLast,
			events: {
				onleadiconclick: isEmptyFolder && this.canMutate ? () => void this.handleaddchild(node.flatPath) : undefined,
			},
		};
	}

	buildCustomsRuntime(): ITreeRuntimeRow<TListObj> {
		const tree = this;
		const idOf = (rec: TListObj | INode<TListObj>): string => String(rec?.flatPath ?? "");
		const computeCanCollapseAll = (): boolean => {
			const expandable = tree.collectBranchIds(tree.rootNodes);
			const expanded = new Set(tree._expandedFlatPaths);
			const norm = expandable.map((id) => tree.normalizeFlatPath(id)).filter((s) => s.length > 0);
			return expanded.size > 0 && norm.length > 0;
		};
		const computeCanExpandAll = (): boolean => {
			const expandable = tree.collectBranchIds(tree.rootNodes);
			const expanded = new Set(tree._expandedFlatPaths);
			const norm = new Set(expandable.map((id) => tree.normalizeFlatPath(id)).filter((s) => s.length > 0));
			if (norm.size === 0) return false;
			return ![...norm].every((id) => expanded.has(id));
		};
		return {
			get record() { return tree.record; },
			get rootNodes() { return tree.rootNodes; },
			findByFlatPath: (path) => tree.findNodeByFlatPath(path) ?? undefined,
			findByPathInit: (pathInit) => tree.findNodeByPathInit(pathInit) ?? undefined,
			sanitizeFlatPath: (id) => tree.normalizeFlatPath(id),
			move: async (rec, dir) => {
				const newId = await tree.move(idOf(rec), dir);
				tree.commitAndFlash(newId);
				return newId;
			},
			addChild: (rec) => tree.handleaddchild(idOf(rec)),
			addSibling: (rec, pos) => tree.handleaddsibling(idOf(rec), pos),
			openEdit: (rec) => tree.showFrmModificar(rec),
			openView: (rec) => tree.showFrmVisualizar(rec),
			openViewNode: (rec) => tree.openViewNode(rec),
			extinguish: (rec) => tree.extinguishNode(rec),
			remove: (rec) => tree.onrowdelete(rec),
			release: (rec) => tree.onrelease(rec),
			addRoot: () => tree.onaddroot(),
			collapseAll: () => tree.collapseAll(),
			expandAll: () => tree.expandAll(),
			get canCollapseAll() { return computeCanCollapseAll(); },
			get canExpandAll() { return computeCanExpandAll(); },
			historyUndo: () => tree.historyUndo(),
			historyRedo: () => tree.historyRedo(),
			historyRecover: () => tree.historyRecover(),
			get historyCanUndo() { return tree.historyCanUndo; },
			get historyCanRedo() { return tree.historyCanRedo; },
			get historyIsViewingPast() { return tree.historyIsViewingPast; },
			get isProtected() { return tree.isProtected; },
			get canToggleProtection() { return tree.canToggleProtection; },
			get isReadOnlyExternal() { return tree.isReadOnlyExternal; },
			protectionToggle: () => tree.protectionToggle(),
			setProtected: (v: boolean) => tree.setProtected(v),
			actorActions: (node) => tree.actorActions(node),
			addChildLabel: (node) => {
				const childDepth = (node.depth ?? 0) + 1;
				const childLevelName = String(tree.customs?.levelName?.({ depth: childDepth }) ?? "").trim();
				return childLevelName ? `Agregar ${childLevelName}` : "Agregar elemento";
			},
			isFirstSibling: (node) => tree.getSiblingPosition(node.flatPath).isFirst,
			isLastSibling: (node) => tree.getSiblingPosition(node.flatPath).isLast,
			isPrisonOnly: (node) => !!node.isPrison && !node.isHermetic,
			get isReadOnly() { return tree.isReadOnly; },
			get canMutate() { return tree.canMutate; },
		};
	}

	protected isDirty(current: unknown, original: unknown): boolean { return original ? JSON.stringify(current) !== JSON.stringify(original) : false }
}
