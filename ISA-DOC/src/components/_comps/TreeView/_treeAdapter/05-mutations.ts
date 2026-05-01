import { type INode, type ITreeData } from "./_rowAdapter/00-base";
import { TAView } from "./04-view";

export abstract class TAMutations<Stacker, TWorking extends ITreeData<TWorking>> extends TAView<Stacker, TWorking> {

	onaddroot(): void {
		if (this.isReadOnly) return;
		const nodeId = this.getNextNodeId("");
		const uxItem = this.toNode({
			ireference: "",
			...this.prepareNewNode(nodeId, ""),
			...this.getNewNodeDefaults(""),
		} as Partial<TWorking>);
		void this.CatalogoController?.ActInsertar?.(this.stack, uxItem);
		this.applySelection(uxItem);
		this._pendingInsertId = this._selectedId;
		this.onrefresh();
		this.syncAllRowAdapters();
		const cleanId = this._selectedId;
		const found = this.findNodeById(cleanId);
		this.showFrmModificar?.(found?.obj ?? uxItem);
	}

	protected insertSiblingNode(ref: TWorking, pos: "above" | "below"): string {
		this._pendingExpandedSnapshot = this._expandedNodes.map((n) => this.normalizeNodeId(n.id)).filter((id) => id.length > 0);
		const refId = this.normalizeNodeId(ref.id);
		const referenceNode = this.findReferenceBranchInTree(this.rootNodes, refId);
		const tmpUx = this.toNode({ ireference: "", ...this.prepareInsertSiblingNode() } as Partial<TWorking>);
		(tmpUx as { children?: TWorking[] }).children = [];
		const rootObjs: TWorking[] = this.rootNodes.map((n) => n.obj);
		const objSiblings: TWorking[] = referenceNode ? ((referenceNode.obj as { children?: TWorking[] }).children ?? []) : rootObjs;
		const refIdx = objSiblings.findIndex((o) => this.normalizeNodeId(o.id) === refId);
		const insertAt = pos === "above" ? refIdx : refIdx + 1;
		objSiblings.splice(Math.max(0, insertAt), 0, tmpUx);
		if (referenceNode) (referenceNode.obj as { children?: TWorking[] }).children = objSiblings;
		const flat = this.flattenTree(rootObjs);
		const cleanFlat = flat.filter((o) => o !== tmpUx);
		this.commitFlatList(cleanFlat);
		const restoreIdx = objSiblings.indexOf(tmpUx);
		if (restoreIdx >= 0) objSiblings.splice(restoreIdx, 1);
		const referenceClean = referenceNode ? this.normalizeNodeId(referenceNode.obj.id) : "";
		const newOrder = pos === "above" ? refIdx + 1 : refIdx + 2;
		return (referenceClean ? `${referenceClean}.` : "") + newOrder;
	}

	protected async openSiblingDrawer(ref: TWorking, pos: "above" | "below"): Promise<void> {
		const referenceId = this.normalizeNodeId(ref.ireference || "");
		const newId = this.insertSiblingNode(ref, pos);
		const newItem = {
			ireference: referenceId,
			...this.prepareNewNode(newId, referenceId),
			...this.getNewNodeDefaults(referenceId),
		};
		const uxItem = this.toNode(newItem);
		await this.CatalogoController?.ActInsertar?.(this.stack, uxItem);
		this.applySelection(uxItem);
		this._pendingInsertId = this._selectedId;
	}

	async onaddsibling(nodeId: string, position: "above" | "below"): Promise<{ selectedId?: string; flashRowIds?: string[] }> {
		const plan = this.getNodeById(nodeId);
		if (!plan) return {};
		await this.openSiblingDrawer(plan, position);
		this.onrefresh();
		const cleanSid = this._selectedId;
		this.syncAllRowAdapters();
		const item = this._item;
		item && this.showFrmModificar(item);
		!item && this.setShowFrm?.(true);
		return { selectedId: cleanSid, flashRowIds: cleanSid.length > 0 ? [cleanSid] : [] };
	}

	handleaddsibling(nodeId: string, position: "above" | "below"): Promise<void> {
		return this.onaddsibling(nodeId, position).then((result) => {
			result?.selectedId && this.setSelectedId(result.selectedId, this);
			result?.flashRowIds?.length && this.flashRowIds(result.flashRowIds, undefined, this);
		});
	}

	protected onAddChildLastLevel(referenceId: string): void {
		this.addReferenceId = referenceId;
		this.lastLevelSelectorOpen = true;
		this.syncAllRowAdapters();
	}

	async onaddchild(referenceId: string): Promise<{ selectedId?: string; flashRowIds?: string[]; ensureExpandedIds?: string[] }> {
		const uxPadre = this.findNodeById(referenceId)?.obj ?? this.getNodeById(referenceId);
		const padrePenultimate = uxPadre?.isPenultimate ?? false;
		if (padrePenultimate) {
			this.onAddChildLastLevel(referenceId);
			return {};
		}
		const nodeId = this.getNextNodeId(referenceId);
		const newItem = {
			ireference: referenceId,
			...this.prepareNewNode(nodeId, referenceId),
			...this.getNewNodeDefaults(referenceId),
		};
		const uxItem = this.toNode(newItem);
		await this.CatalogoController?.ActInsertar?.(this.stack, uxItem);
		this.applySelection(uxItem);
		this.onrefresh();
		const cleanSid = this._selectedId;
		this.syncAllRowAdapters();
		const item2 = this._item;
		item2 && this.showFrmModificar(item2);
		!item2 && this.setShowFrm?.(true);
		return { selectedId: cleanSid, flashRowIds: cleanSid.length > 0 ? [cleanSid] : [], ensureExpandedIds: [referenceId] };
	}

	handleaddchild(referenceId: string): Promise<void> {
		return this.onaddchild(referenceId).then((result) => {
			result?.selectedId && this.setSelectedId(result.selectedId, this);
			result?.flashRowIds?.length && this.flashRowIds(result.flashRowIds, undefined, this);
			if (result?.ensureExpandedIds?.length) {
				const currentIds = this.expandedNodes.map((node) => node.id);
				const nextIds = [...new Set([...currentIds, ...result.ensureExpandedIds])];
				this.expandedNodes = nextIds
					.map((id) => this.findNodeById(id))
					.filter((node): node is INode<TWorking> => !!node);
			}
		});
	}

	async onselectlastlevel(records: any | any[]): Promise<void> {
		const referenceId = this.addReferenceId;
		const rawItems: any[] = Array.isArray(records) ? records : records ? [records] : [];
		const items: any[] = rawItems.filter((r): r is any => !!r);
		if (!referenceId || !items.length) return;
		const baseParts = this.getNextNodeId(referenceId).split(".");
		const idPrefix = baseParts.slice(0, -1).join(".");
		let nextOrder = parseInt(baseParts[baseParts.length - 1], 10) || 1;
		for (const rec of items) {
			const nodeId = (idPrefix ? `${idPrefix}.` : "") + nextOrder++;
			const baseData: Partial<TWorking> = {
				ireference: referenceId,
				...this.prepareNewNode(nodeId, referenceId),
				...this.getNewNodeDefaults(referenceId),
			} as Partial<TWorking>;
			const prepared = this.prepareLastLevelNodeData(baseData, rec);
			const uxItem = this.toNode(prepared);
			await this.CatalogoController?.ActInsertar?.(this.stack, uxItem);
		}
		const lastId = (idPrefix ? `${idPrefix}.` : "") + (nextOrder - 1);
		this.onrefresh();
		const lastNode = this.findNodeById(lastId);
		lastNode && this.applySelection(lastNode.obj);
		this.lastLevelSelectorOpen = false;
		if (referenceId && !this._expandedNodes.some((n) => n.id === referenceId)) {
			const referenceNode = this.findNodeById(referenceId);
			referenceNode && (this._expandedNodes = [...this._expandedNodes, referenceNode]);
		}
		this.addReferenceId = null;
		this.syncAllRowAdapters();
	}

	protected getNextNodeId(referenceId: string): string {
		const clean = this.normalizeNodeId(referenceId);
		const referenceNode = clean.length > 0 ? this.findNodeById(clean) : null;
		const childSiblings = referenceNode ? (referenceNode.children ?? []) : this.rootNodes;
		const orders = childSiblings
			.map((n) => { const p = n.id.split("."); return parseInt(p[p.length - 1], 10); })
			.filter((o) => !isNaN(o));
		const max = Math.max(0, ...orders);
		return (clean ? `${clean}.` : "") + (max + 1);
	}

	async move(nodeId: string, dir: "up" | "down"): Promise<string | undefined> {
		const cleanId = this.normalizeNodeId(nodeId);
		if (!cleanId) return undefined;
		const newId = this.moveNodeInTree(cleanId, dir);
		const cleanNewId = this.normalizeNodeId(newId);
		if (!cleanNewId) return undefined;
		this.onrefresh();
		this.resyncExpandedToCurrentTree();
		this._selectedId = cleanNewId;
		this._focusedNodeId = cleanNewId;
		this.syncAllRowAdapters();
		this.focusRowById(cleanNewId);
		return cleanNewId;
	}

	reorder(sourceId: string, targetId: string, position: "before" | "after"): string | undefined {
		const newId = this.reorderNodeInTree(sourceId, targetId, position);
		const cleanNewId = this.normalizeNodeId(newId);
		if (!cleanNewId) return undefined;
		this.onrefresh();
		this.resyncExpandedToCurrentTree();
		this._selectedId = cleanNewId;
		this._focusedNodeId = cleanNewId;
		this.syncAllRowAdapters();
		this.focusRowById(cleanNewId);
		return cleanNewId;
	}

	/**
	 * Anida `sourceId` como hijo (último) de `targetId`. El target se evalúa
	 * contra `canDrop(..., "into")` (que delega en su `acceptsChild`).
	 */
	nestInto(sourceId: string, targetId: string): string | undefined {
		const newId = this.nestNodeInTree(sourceId, targetId);
		const cleanNewId = this.normalizeNodeId(newId);
		if (!cleanNewId) return undefined;
		this.onrefresh();
		this.resyncExpandedToCurrentTree();
		this._selectedId = cleanNewId;
		this._focusedNodeId = cleanNewId;
		this.syncAllRowAdapters();
		this.focusRowById(cleanNewId);
		return cleanNewId;
	}

	private nestNodeInTree(sourceId: string, targetId: string): string | null {
		if (!this.rootNodes.length) return null;
		const srcId = this.normalizeNodeId(sourceId);
		const tgtId = this.normalizeNodeId(targetId);
		if (!srcId || !tgtId || srcId === tgtId) return null;
		if (!this.canDrop(srcId, tgtId, "into")) return null;
		const srcReference = this.findReferenceBranchInTree(this.rootNodes, srcId);
		const tgtNode = this.findNodeById(tgtId);
		if (!tgtNode) return null;
		const srcSiblings = srcReference ? (srcReference.children ?? []) : this.rootNodes;
		const srcIdx = srcSiblings.findIndex((n) => this.normalizeNodeId(n.id) === srcId);
		if (srcIdx === -1) return null;
		const [moving] = srcSiblings.splice(srcIdx, 1);
		tgtNode.children = tgtNode.children ?? [];
		tgtNode.children.push(moving);
		this.oncommittreeorder(this.rootNodes);
		const tgtClean = this.normalizeNodeId(tgtNode.id);
		return `${tgtClean}.${tgtNode.children.length}`;
	}

	private moveNodeInTree(nodeId: string, dir: "up" | "down"): string | null {
		const referenceNode = this.findReferenceBranchInTree(this.rootNodes, nodeId);
		const siblings = referenceNode ? (referenceNode.children ?? []) : this.rootNodes;
		const idx = siblings.findIndex((n) => this.normalizeNodeId(n.id) === nodeId);
		if (idx === -1) return null;
		const newIdx = idx + (dir === "up" ? -1 : 1);
		if (newIdx < 0 || newIdx >= siblings.length) return null;
		[siblings[idx], siblings[newIdx]] = [siblings[newIdx], siblings[idx]];
		this.oncommittreeorder(this.rootNodes);
		const referenceClean = referenceNode ? this.normalizeNodeId(referenceNode.id) : "";
		return (referenceClean ? `${referenceClean}.` : "") + (newIdx + 1);
	}

	private reorderNodeInTree(sourceId: string, targetId: string, position: "before" | "after"): string | null {
		if (!this.rootNodes.length) return null;
		const srcId = this.normalizeNodeId(sourceId);
		const tgtId = this.normalizeNodeId(targetId);
		if (!srcId || !tgtId || srcId === tgtId) return null;
		const srcReference = this.findReferenceBranchInTree(this.rootNodes, srcId);
		const tgtReference = this.findReferenceBranchInTree(this.rootNodes, tgtId);
		const sameParent = srcReference === tgtReference;
		// Regla central de drop: delega en el nodo padre destino vía `canDrop`.
		// Mantiene compat con `bcanMoveOutside` como veto adicional cuando se cruza padre.
		if (!this.canDrop(srcId, tgtId, position)) return null;
		if (!sameParent) {
			const allow = this.bcanMoveOutside;
			let veto = false;
			if (typeof allow === "function") {
				const srcNode = this.findNodeById(srcId);
				const tgtNode = this.findNodeById(tgtId);
				if (srcNode && tgtNode) veto = !allow(srcNode, tgtNode, position);
			} else if (allow === false) {
				veto = false; // ya no se usa como veto duro: canDrop manda
			}
			if (veto) return null;
		}
		const srcSiblings = srcReference ? (srcReference.children ?? []) : this.rootNodes;
		const tgtSiblings = tgtReference ? (tgtReference.children ?? []) : this.rootNodes;
		const srcIdx = srcSiblings.findIndex((n) => this.normalizeNodeId(n.id) === srcId);
		const tgtIdx = tgtSiblings.findIndex((n) => this.normalizeNodeId(n.id) === tgtId);
		if (srcIdx === -1 || tgtIdx === -1) return null;
		const [moving] = srcSiblings.splice(srcIdx, 1);
		let insertAt = tgtIdx + (position === "after" ? 1 : 0);
		if (sameParent && srcIdx < tgtIdx) insertAt -= 1;
		tgtSiblings.splice(Math.max(0, Math.min(insertAt, tgtSiblings.length)), 0, moving);
		this.oncommittreeorder(this.rootNodes);
		const referenceClean = tgtReference ? this.normalizeNodeId(tgtReference.id) : "";
		return (referenceClean ? `${referenceClean}.` : "") + (Math.max(0, Math.min(insertAt, tgtSiblings.length - 1)) + 1);
	}

	requestDelete(node: INode<TWorking>): boolean {
		const nid = this.normalizeNodeId(node.id);
		this._pendingDeleteNodeId = nid;
		this._selectedId = nid;
		this._item = node.obj;
		this._focusedNodeId = nid;
		const expandedIds = new Set(this._expandedNodes.map((n) => n.id));
		const prevVisibleIds = this.getVisibleNodeIds(this.rootNodes, expandedIds);
		this._pendingDeleteSnapshot = { prevVisibleIds, prevDeleteIdx: prevVisibleIds.indexOf(nid) };
		this.showEliminar(node.obj);
		return false;
	}

	async ondeleteconfirmed(): Promise<void> {
		const pendingNorm = this.normalizeNodeId(this._pendingDeleteNodeId);
		const prevDeleteIdx = this._pendingDeleteSnapshot?.prevDeleteIdx ?? -1;

		const clearSelectionIfDeleted = (deletedKey: string) => {
			const clean = this._selectedId;
			if (clean && (clean === deletedKey || clean.startsWith(deletedKey + "."))) {
				this._selectedId = "";
				this._item = null;
				this.setShowFrm(false);
			}
		};

		if (pendingNorm) clearSelectionIfDeleted(pendingNorm);
		else return;

		const pendingInsertNorm = this.normalizeNodeId(this._pendingInsertId);
		if (pendingInsertNorm && (pendingInsertNorm === pendingNorm || pendingInsertNorm.startsWith(pendingNorm + "."))) {
			this._pendingInsertId = "";
			this._pendingExpandedSnapshot = [];
		}

		this.onrefresh();
		const nextExpandedIds = new Set(this._expandedNodes.map((n) => n.id));
		const nextVisibleIds = this.getVisibleNodeIds(this.rootNodes, nextExpandedIds);
		if (nextVisibleIds.length && (!this._selectedId || !nextVisibleIds.includes(this._selectedId))) {
			const fallbackIdx = prevDeleteIdx > 0 ? prevDeleteIdx - 1 : 0;
			this._selectedId = nextVisibleIds[Math.min(fallbackIdx, nextVisibleIds.length - 1)] || nextVisibleIds[0];
		}
		this._pendingDeleteNodeId = "";
		this._pendingDeleteSnapshot = null;
		this.syncAllRowAdapters();
	}

	protected async rollbackPendingInsert(id: string, expandedSnapshot: string[] = []): Promise<void> {
		const node = this.findNodeById(id);
		const row = node?.obj;
		if (!row) return;
		const ctrl = this.CatalogoController as unknown as { ActEliminar?: (item: TWorking, Obj: Stacker) => unknown } | undefined;
		await ctrl?.ActEliminar?.(row, this.stack);
		this.applySelection(null);
		this.onrefresh();
		this.restoreExpandedFromSnapshot(expandedSnapshot);
		this.syncAllRowAdapters();
	}

	createEditDraft(plan: INode<TWorking>): TWorking | null {
		const raw = this.findNodeById(plan.id)?.obj;
		return raw ? this.toNode(raw, true) : null;
	}

	async onEditDrawerAccept(draft: TWorking): Promise<void> {
		if (!draft) return;
		await this.oneditaccept(draft);
		this.setShowFrm?.(false);
	}

	onEditDrawerClose(_plan: INode<TWorking>, _draft: INode<TWorking>): void {
		this.setShowFrm?.(false);
	}

	openEdit(node: INode<TWorking>): void {
		this.applySelection(node.obj);
		this.onrefresh();
		this.syncAllRowAdapters();
		this.showFrmModificar?.(node.obj);
	}

	openViewNode(node: INode<TWorking>): void {
		this.applySelection(node.obj);
		this.onrefresh();
		this.syncAllRowAdapters();
		this.showFrmVisualizar?.(node.obj);
	}

	async oneditaccept(node: TWorking): Promise<void> {
		await this.CatalogoController?.Actualizar?.(this.stack, node);
		this.onrefresh();
	}

	closePlanDrawer(): void {
		const pending = this._pendingInsertId;
		const snapshot = this._pendingExpandedSnapshot;
		this._pendingInsertId = "";
		this._pendingExpandedSnapshot = [];
		if (pending) void this.rollbackPendingInsert(pending, snapshot);
		this.refocusFocusedRowSummary();
	}
}
