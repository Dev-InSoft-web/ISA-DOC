import { TObject } from "@ingenieria_insoft/ispgen";
import { type INode, type ITreeData } from "./_defgen/00-tree-data";
import { TAView } from "./05-view";

export abstract class TAMutations<TListObj extends ITreeData<TListObj> & TObject> extends TAView<TListObj> {

	abstract get isProtected(): boolean;
	abstract requestProtectionRelease(): void;

	onaddroot(): void {
		if (!this.canMutate) return;
		this.historyPush();
		const nodeId = this.getNextFlatPath("");
		const uxItem = this.toNode({ flatPath: nodeId } as Partial<TListObj>);
		this.invokeUpdateNode(uxItem, true);
		void this.ActInsertar?.(uxItem);
		this.applySelection(uxItem);
		this._pendingInsertFlatPath = this._selectedFlatPath;
		this.onrefresh();
		this.syncAllRowAdapters();
		const cleanId = this._selectedFlatPath;
		const found = this.findNodeByFlatPath(cleanId);
		this.showFrmModificar?.(found ?? uxItem);
	}

	protected insertSiblingNode(ref: TListObj, _pos: "above" | "below"): string {
		this._pendingExpandedSnapshot = [...this._expandedFlatPaths];
		const refId = this.normalizeFlatPath(ref.flatPath);
		const lastDot = refId.lastIndexOf(".");
		const parentId = lastDot >= 0 ? refId.slice(0, lastDot) : "";
		return this.getNextFlatPath(parentId);
	}

	protected async openSiblingDrawer(ref: TListObj, pos: "above" | "below"): Promise<void> {
		this.historyPush();
		const refIdStr = String(ref.flatPath ?? "").trim();
		const refDot = refIdStr.lastIndexOf(".");
		const referenceId = refDot >= 0 ? this.normalizeFlatPath(refIdStr.slice(0, refDot)) : "";
		const newId = this.insertSiblingNode(ref, pos);
		const uxItem = this.toNode({ flatPath: newId } as Partial<TListObj>);
		this.invokeUpdateNode(uxItem, true);
		await this.ActInsertar?.(uxItem);
		this.applySelection(uxItem);
		this._pendingInsertFlatPath = this._selectedFlatPath;
	}

	protected rebindRecordToFreshNode(flatPath: string): void {
		const fresh = this.findNodeByFlatPath(this.normalizeFlatPath(flatPath));
		if (fresh) this.record = fresh;
	}

	async onaddsibling(nodeId: string, position: "above" | "below"): Promise<{ selectedNode?: string; flashRowFlatPaths?: string[] }> {
		const plan = this.getNodeByFlatPath(nodeId);
		if (!plan) return {};
		await this.openSiblingDrawer(plan, position);
		this.onrefresh();
		const cleanSid = this._selectedFlatPath;
		this.rebindRecordToFreshNode(cleanSid);
		this.syncAllRowAdapters();
		const item = this.record ?? null;
		item && this.showFrmModificar(item);
		!item && this.setShowFrm?.(true);
		return { selectedNode: cleanSid, flashRowFlatPaths: cleanSid.length > 0 ? [cleanSid] : [] };
	}

	handleaddsibling(nodeId: string, position: "above" | "below"): Promise<void> {
		return this.onaddsibling(nodeId, position).then((result) => {
			result?.selectedNode && this.setSelectedFlatPath(result.selectedNode, this);
			result?.flashRowFlatPaths?.length && this.flashRowFlatPaths(result.flashRowFlatPaths, undefined, this);
		});
	}

	protected onAddChildLastLevel(referenceId: string): void {
		this._pendingLastLevelParentFlatPath = this.normalizeFlatPath(referenceId);
		this.customs?.openLastLevelSelector?.();
		this.syncAllRowAdapters();
	}

	protected findNodeWithPathInit(branches: INode<TListObj>[] = this.rootNodes): INode<TListObj> | null {
		for (const n of branches) {
			if (n.pathInit) return n;
			const c = this.findNodeWithPathInit(n.childrens ?? []);
			if (c) return c;
		}
		return null;
	}

	async onaddchild(referenceId: string): Promise<{ selectedNode?: string; flashRowFlatPaths?: string[]; ensureExpandedIds?: string[] }> {
		const uxPadre = this.findNodeByFlatPath(referenceId) ?? this.getNodeByFlatPath(referenceId);
		const childDepth = (uxPadre?.depth ?? 0) + 1;
		const grandLevel = String(this.customs?.levelName?.({ depth: childDepth + 1 }) ?? "").trim();
		const childIsLastLevel = !grandLevel || grandLevel === "---";
		const shouldOpenSelector = !!(uxPadre && this.customs?.openLastLevelSelector && childIsLastLevel);
		if (shouldOpenSelector) {
			this.onAddChildLastLevel(referenceId);
			return {};
		}
		this.historyPush();
		const nodeId = this.getNextFlatPath(referenceId);
		const uxItem = this.toNode({ flatPath: nodeId } as Partial<TListObj>);
		this.invokeUpdateNode(uxItem, true);
		await this.ActInsertar?.(uxItem);
		this.applySelection(uxItem);
		this.onrefresh();
		const cleanSid = this._selectedFlatPath;
		this.rebindRecordToFreshNode(cleanSid);
		this.syncAllRowAdapters();
		const item2 = this.record ?? null;
		item2 && this.showFrmModificar(item2);
		!item2 && this.setShowFrm?.(true);
		return { selectedNode: cleanSid, flashRowFlatPaths: cleanSid.length > 0 ? [cleanSid] : [], ensureExpandedIds: [referenceId] };
	}

	handleaddchild(referenceId: string): Promise<void> {
		return this.onaddchild(referenceId).then((result) => {
			result?.selectedNode && this.setSelectedFlatPath(result.selectedNode, this);
			result?.flashRowFlatPaths?.length && this.flashRowFlatPaths(result.flashRowFlatPaths, undefined, this);
			if (result?.ensureExpandedIds?.length) {
				const nextIds = [...new Set([...this._expandedFlatPaths, ...result.ensureExpandedIds.map((id) => this.normalizeFlatPath(id))])];
				this.expandedFlatPaths = nextIds;
			}
		});
	}

	async onselectlastlevel(records: TObject | TObject[]): Promise<void> {
		const referenceId = this._pendingLastLevelParentFlatPath;
		const rawItems: TObject[] = Array.isArray(records) ? records : records ? [records] : [];
		const items: TObject[] = rawItems.filter((r): r is TObject => !!r);
		if (!referenceId || !items.length) { this._pendingLastLevelParentFlatPath = ""; return; }
		this.historyPush();
		const baseParts = this.getNextFlatPath(referenceId).split(".");
		const idPrefix = baseParts.slice(0, -1).join(".");
		let nextOrder = parseInt(baseParts[baseParts.length - 1], 10) || 1;
		for (const rec of items) {
			const nodeId = (idPrefix ? `${idPrefix}.` : "") + nextOrder++;
			const baseData: Partial<TListObj> = { ...(rec as object), flatPath: nodeId } as Partial<TListObj>;
			const prepared = this.prepareLastLevelNodeData(baseData, rec);
			const uxItem = this.toNode(prepared);
			this.invokeUpdateNode(uxItem, true);
			await this.ActInsertar?.(uxItem);
		}
		const lastId = (idPrefix ? `${idPrefix}.` : "") + (nextOrder - 1);
		this.onrefresh();
		const lastNode = this.findNodeByFlatPath(lastId);
		lastNode && this.applySelection(lastNode);
		if (referenceId && !this._expandedFlatPaths.includes(referenceId)) {
			this._expandedFlatPaths = [...this._expandedFlatPaths, referenceId];
		}
		this._pendingLastLevelParentFlatPath = "";
		this.syncAllRowAdapters();
	}

	protected getNextFlatPath(referenceId: string): string {
		const clean = this.normalizeFlatPath(referenceId);
		const referenceNode = clean.length > 0 ? this.findNodeByFlatPath(clean) : null;
		const childSiblings = referenceNode ? (referenceNode.childrens ?? []) : this.rootNodes;
		const orders = childSiblings
			.map((n) => { const p = n.flatPath.split("."); return parseInt(p[p.length - 1], 10); })
			.filter((o) => !isNaN(o));
		const max = Math.max(0, ...orders);
		return (clean ? `${clean}.` : "") + (max + 1);
	}

	async move(nodeId: string, dir: "up" | "down"): Promise<string | undefined> {
		const cleanId = this.normalizeFlatPath(nodeId);
		if (!cleanId) return undefined;
		this.historyPush();
		const newId = this.moveNodeInTree(cleanId, dir);
		const cleanNewId = this.normalizeFlatPath(newId);
		if (!cleanNewId) return undefined;
		this.onrefresh();
		this.resyncExpandedToCurrentTree();
		this._selectedFlatPath = cleanNewId;
		this._focusedFlatPath = cleanNewId;
		this.syncAllRowAdapters();
		this.focusRowByFlatPath(cleanNewId);
		return cleanNewId;
	}

	reorder(sourceId: string, targetId: string, position: "before" | "after"): string | undefined {
		this.historyPush();
		const newId = this.reorderNodeInTree(sourceId, targetId, position);
		const cleanNewId = this.normalizeFlatPath(newId);
		if (!cleanNewId) return undefined;
		this.onrefresh();
		this.resyncExpandedToCurrentTree();
		this._selectedFlatPath = cleanNewId;
		this._focusedFlatPath = cleanNewId;
		this.syncAllRowAdapters();
		this.focusRowByFlatPath(cleanNewId);
		return cleanNewId;
	}

	nestInto(sourceId: string, targetId: string): string | undefined {
		this.historyPush();
		const newId = this.nestNodeInTree(sourceId, targetId);
		const cleanNewId = this.normalizeFlatPath(newId);
		if (!cleanNewId) return undefined;
		this.onrefresh();
		this.resyncExpandedToCurrentTree();
		this._selectedFlatPath = cleanNewId;
		this._focusedFlatPath = cleanNewId;
		this.syncAllRowAdapters();
		this.focusRowByFlatPath(cleanNewId);
		return cleanNewId;
	}

	private moveNodeInTree(nodeId: string, dir: "up" | "down"): string | null {
		const referenceNode = this.findReferenceBranchInTree(this.rootNodes, nodeId);
		const siblings = referenceNode ? (referenceNode.childrens ?? []) : this.rootNodes;
		const idx = siblings.findIndex((n) => this.normalizeFlatPath(n.flatPath) === nodeId);
		if (idx === -1) return null;
		const newIdx = idx + (dir === "up" ? -1 : 1);
		if (newIdx < 0 || newIdx >= siblings.length) return null;
		[siblings[idx], siblings[newIdx]] = [siblings[newIdx], siblings[idx]];
		this.oncommittreeorder(this.rootNodes);
		const referenceClean = referenceNode ? this.normalizeFlatPath(referenceNode.flatPath) : "";
		return (referenceClean ? `${referenceClean}.` : "") + (newIdx + 1);
	}

	private reorderNodeInTree(sourceId: string, targetId: string, position: "before" | "after"): string | null {
		if (!this.rootNodes.length) return null;
		const srcId = this.normalizeFlatPath(sourceId);
		const tgtId = this.normalizeFlatPath(targetId);
		if (!srcId || !tgtId || srcId === tgtId) return null;
		const srcReference = this.findReferenceBranchInTree(this.rootNodes, srcId);
		const tgtReference = this.findReferenceBranchInTree(this.rootNodes, tgtId);
		const sameParent = srcReference === tgtReference;
		if (!this.canDrop(srcId, tgtId, position)) return null;
		if (!sameParent) {
			const allow = this.bcanMoveOutside;
			if (typeof allow === "function") {
				const srcNode = this.findNodeByFlatPath(srcId);
				const tgtNode = this.findNodeByFlatPath(tgtId);
				if (srcNode && tgtNode && !allow(srcNode, tgtNode, position)) return null;
			} else if (allow === false) {
				return null;
			}
		}
		const srcSiblings = srcReference ? (srcReference.childrens ?? []) : this.rootNodes;
		const tgtSiblings = tgtReference ? (tgtReference.childrens ?? []) : this.rootNodes;
		const srcIdx = srcSiblings.findIndex((n) => this.normalizeFlatPath(n.flatPath) === srcId);
		const tgtIdx = tgtSiblings.findIndex((n) => this.normalizeFlatPath(n.flatPath) === tgtId);
		if (srcIdx === -1 || tgtIdx === -1) return null;
		const [moving] = srcSiblings.splice(srcIdx, 1);
		let insertAt = tgtIdx + (position === "after" ? 1 : 0);
		if (sameParent && srcIdx < tgtIdx) insertAt -= 1;
		tgtSiblings.splice(Math.max(0, Math.min(insertAt, tgtSiblings.length)), 0, moving);
		this.oncommittreeorder(this.rootNodes);
		const referenceClean = tgtReference ? this.normalizeFlatPath(tgtReference.flatPath) : "";
		return (referenceClean ? `${referenceClean}.` : "") + (Math.max(0, Math.min(insertAt, tgtSiblings.length - 1)) + 1);
	}

	requestDelete(node: INode<TListObj>): boolean {
		const nid = this.normalizeFlatPath(node.flatPath);
		this._pendingDeleteFlatPath = nid;
		this._selectedFlatPath = nid;
		this.record = node;
		this._focusedFlatPath = nid;
		const expandedIds = new Set(this._expandedFlatPaths);
		const prevVisibleIds = this.getVisibleFlatPaths(this.rootNodes, expandedIds);
		this._pendingDeleteSnapshot = { prevVisibleIds, prevDeleteIdx: prevVisibleIds.indexOf(nid) };
		this.showDelete(node);
		return false;
	}

	async ondeleteconfirmed(): Promise<void> {
		const pendingNorm = this.normalizeFlatPath(this._pendingDeleteFlatPath);
		const prevDeleteIdx = this._pendingDeleteSnapshot?.prevDeleteIdx ?? -1;

		const clearSelectionIfDeleted = (deletedKey: string) => {
			const clean = this._selectedFlatPath;
			if (clean && (clean === deletedKey || clean.startsWith(deletedKey + "."))) {
				this._selectedFlatPath = "";
				this.record = null;
				this.setShowFrm(false);
			}
		};

		if (pendingNorm) clearSelectionIfDeleted(pendingNorm);
		else return;

		const pendingInsertNorm = this.normalizeFlatPath(this._pendingInsertFlatPath);
		if (pendingInsertNorm && (pendingInsertNorm === pendingNorm || pendingInsertNorm.startsWith(pendingNorm + "."))) {
			this._pendingInsertFlatPath = "";
			this._pendingExpandedSnapshot = [];
		}

		this.onrefresh();
		const nextExpandedIds = new Set(this._expandedFlatPaths);
		const nextVisibleIds = this.getVisibleFlatPaths(this.rootNodes, nextExpandedIds);
		if (nextVisibleIds.length && (!this._selectedFlatPath || !nextVisibleIds.includes(this._selectedFlatPath))) {
			const fallbackIdx = prevDeleteIdx > 0 ? prevDeleteIdx - 1 : 0;
			this._selectedFlatPath = nextVisibleIds[Math.min(fallbackIdx, nextVisibleIds.length - 1)] || nextVisibleIds[0];
		}
		this._pendingDeleteFlatPath = "";
		this._pendingDeleteSnapshot = null;
		this.syncAllRowAdapters();
	}

	protected async rollbackPendingInsert(id: string, expandedSnapshot: string[] = []): Promise<void> {
		const node = this.findNodeByFlatPath(id);
		const row = node ?? null;
		if (!row) return;
		await this.ActEliminar?.(row);
		this.applySelection(null);
		this.onrefresh();
		this.restoreExpandedFromSnapshot(expandedSnapshot);
		this.syncAllRowAdapters();
	}

	createEditDraft(plan: INode<TListObj>): TListObj | null {
		const raw = this.findNodeByFlatPath(plan.flatPath);
		return raw ? this.toNode(raw, true) : null;
	}

	async onEditDrawerAccept(draft: TListObj): Promise<void> {
		if (!draft) return;
		await this.oneditaccept(draft);
		this.setShowFrm?.(false);
	}

	onEditDrawerClose(_plan: INode<TListObj>, _draft: INode<TListObj>): void {
		this.setShowFrm?.(false);
	}

	openEdit(node: INode<TListObj>): void {
		if (this.isProtected) { this.requestProtectionRelease(); return; }
		this.applySelection(node);
		this.onrefresh();
		this.syncAllRowAdapters();
		this.showFrmModificar?.(node);
	}

	openViewNode(node: INode<TListObj>): void {
		this.applySelection(node);
		this.onrefresh();
		this.syncAllRowAdapters();
		this.showFrmVisualizar?.(node);
	}

	async oneditaccept(node: TListObj): Promise<void> {
		await this.Actualizar?.(node);
		this.onrefresh();
	}

	closeEditForm(): void {
		const pending = this._pendingInsertFlatPath;
		const snapshot = this._pendingExpandedSnapshot;
		this._pendingInsertFlatPath = "";
		this._pendingExpandedSnapshot = [];
		if (pending) void this.rollbackPendingInsert(pending, snapshot);
		this.refocusFocusedRowSummary();
	}
}
