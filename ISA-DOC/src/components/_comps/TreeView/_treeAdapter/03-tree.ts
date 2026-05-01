import type { TreeViewProps } from "../TreeRowView.svelte";
import { objRootsToNodes, type INode, type ITreeData } from "../_asRow/_rowAdapter/00-base";
import { TAModel } from "./02-model";

export abstract class TATree<Stacker, TWorking extends ITreeData<TWorking>> extends TAModel<Stacker, TWorking> {

	protected prepareGetNode(data: Partial<TWorking>): Partial<TWorking> {
		if (this.nistack && this.istack) {
			return { ...data, [this.nistack]: this.istack };
		}
		return data;
	}

	protected isNodeInstance(data: Partial<TWorking>): data is TWorking { return data instanceof this.nodeCtor; }

	protected prepareInsertSiblingNode(): Partial<TWorking> {
		const out: Record<string, unknown> = {};
		if (this.nidNode) out[this.nidNode] = "_TMP_";
		return out as Partial<TWorking>;
	}

	protected prepareNewNode(nodeId: string, _referenceId: string): Partial<TWorking> {
		const out: Record<string, unknown> = {};
		if (this.nidNode) out[this.nidNode] = nodeId;
		if (this.ntitleNode) out[this.ntitleNode] = "";
		return out as Partial<TWorking>;
	}

	protected prepareLastLevelNodeData(baseData: Partial<TWorking>, _record: any): Partial<TWorking> { return baseData }

	protected getNewNodeDefaults(_referenceId: string): Partial<TWorking> { return {} }

	toNode(data: any, clone = false): TWorking {
		const src = clone
			? (typeof (data as any)?.clone === "function" ? ((data as any).clone() as TWorking) : structuredClone(data) as Partial<TWorking>)
			: data;
		if (!clone && this.isNodeInstance(src as Partial<TWorking>)) return src as TWorking;
		const prepared = this.prepareGetNode(src as Partial<TWorking>);
		return this.createNode({ ...prepared });
	}

	normalizeNodeId(id: unknown): string {
		if (id === undefined || id === null) return "";
		return String(id).replace(/^(_UP_|_M_)/, "").trim();
	}

	findNodeById(id: string, branches: INode<TWorking>[] = this.rootNodes): INode<TWorking> | null {
		const needle = this.normalizeNodeId(id);
		if (needle.length === 0) return null;
		for (const branch of branches) {
			if (this.normalizeNodeId(branch.id) === needle) return branch;
			if (branch.children?.length) {
				const found = this.findNodeById(needle, branch.children);
				if (found) return found;
			}
		}
		return null;
	}

	findFlatNodeIndex(item: TWorking): number {
		const list = this.stackListNodes;
		if (!list.length) return -1;
		const sId = this.normalizeNodeId(item.id);
		const sStack = item.istack;
		return list.findIndex((n) => this.normalizeNodeId(n.id) === sId && n.istack === sStack);
	}

	findNode(data: any): TWorking | undefined {
		const sId = this.normalizeNodeId(this.toNode(data).id);
		if (!sId) return undefined;
		return this.stackListNodes.find((n) => this.normalizeNodeId(n.id) === sId);
	}

	findBranchByObject(branches: INode<TWorking>[], obj: TWorking): INode<TWorking> | null {
		for (const branch of branches) {
			if (branch.obj === obj) return branch;
			if (branch.children?.length) {
				const foundBranch = this.findBranchByObject(branch.children, obj);
				if (foundBranch) return foundBranch;
			}
		}
		return null;
	}

	protected findReferenceBranchInTree(branches: INode<TWorking>[], childId: string, referenceBranch: INode<TWorking> | null = null): INode<TWorking> | null {
		const needle = this.normalizeNodeId(childId);
		for (const branch of branches) {
			if (this.normalizeNodeId(branch.id) === needle) return referenceBranch;
			if (branch.children?.length) {
				const inner = this.findReferenceBranchInTree(branch.children, childId, branch);
				if (inner !== null) return inner;
			}
		}
		return null;
	}

	getNodeById(nodeId: string): TWorking | undefined { return this.findNodeById(nodeId)?.obj }

	getSiblingPosition(nodeId: string): { isFirst: boolean; isLast: boolean } {
		const branches = this.rootNodes;
		const n = this.normalizeNodeId(nodeId);
		if (!branches?.length || n.length === 0) return { isFirst: false, isLast: false };
		const referenceBranch = this.findReferenceBranchInTree(branches, n);
		const siblings = referenceBranch ? (referenceBranch.children ?? []) : branches;
		const idx = siblings.findIndex((ch) => this.normalizeNodeId(ch.id) === n);
		return { isFirst: idx === 0, isLast: idx === siblings.length - 1 };
	}

	protected collectBranchAndLeafIds(branch: INode<TWorking>): string[] {
		const out = [branch.id];
		branch.children?.forEach((leafOrBranch) => out.push(...this.collectBranchAndLeafIds(leafOrBranch)));
		return out;
	}

	protected collectBranchIds(branches: INode<TWorking>[] = this.rootNodes): string[] {
		const out: string[] = [];
		for (const branch of branches) {
			if (branch.children?.length) out.push(branch.id, ...this.collectBranchIds(branch.children));
		}
		return out;
	}

	buildTree(planes: any[]): TWorking[] {
		const map = new Map<string, TWorking>();
		const roots: TWorking[] = [];
		const uxList: TWorking[] = [];
		planes.forEach((p) => {
			const ux = this.createNode(p);
			ux.children = [] as TWorking[];
			map.set(this.normalizeNodeId(ux.id), ux);
			uxList.push(ux);
		});
		uxList.forEach((ux) => {
			const uxId = this.normalizeNodeId(ux.id);
			const parts = uxId.split(".");
			const referenceId = parts.length > 1 ? parts.slice(0, -1).join(".") : "";
			if (referenceId && map.has(referenceId)) {
				const referenceUx = map.get(referenceId)!;
				(referenceUx.children ??= []).push(ux);
			} else {
				roots.push(ux);
			}
		});
		const sortFn = (a: TWorking, b: TWorking) => this.sortFnBuildTree(a, b);
		roots.sort(sortFn);
		map.forEach((ux) => {
			ux.children?.sort(sortFn);
		});
		return roots;
	}

	flattenTree(roots: TWorking[]): TWorking[] {
		const result: TWorking[] = [];
		const idMap = new Map<string, string>();
		const traverse = (nodes: TWorking[], referenceId: string) => {
			nodes.forEach((node, index) => {
				const oldId = this.normalizeNodeId(node.id);
				const newId = referenceId ? `${referenceId}.${index + 1}` : `${index + 1}`;
				if (oldId && oldId !== newId) idMap.set(oldId, newId);
				node.id = newId;
				result.push(node);
				node.children?.length && traverse(node.children, newId);
			});
		};
		traverse(roots, "");
		this.remapReferences(result, idMap);
		this.remapExpandedByIdMap(idMap);
		return result;
	}

	rebuildFlatTree(sort?: (a: TWorking, b: TWorking) => number): void {
		const cmp = sort ?? ((a: TWorking, b: TWorking) => this.sortFnBuildTree(a, b));
		const list = this.stackListNodes;
		if (!list.length) return;
		type Node = { row: TWorking; key: string; parent: string; children: Node[] };
		const nodes: Node[] = list.map((row) => ({
			row,
			key: this.normalizeNodeId(row.id),
			parent: String(row.ireference || "").trim(),
			children: [],
		}));
		const byId = new Map<string, Node>();
		nodes.forEach((n) => byId.set(n.key, n));
		const roots: Node[] = [];
		nodes.forEach((n) => {
			const parts = n.key.split(".");
			const derived = parts.length > 1 ? parts.slice(0, -1).join(".") : "";
			const ref = derived || n.parent;
			const parentNode = ref ? byId.get(ref) : undefined;
			if (parentNode) parentNode.children.push(n);
			else roots.push(n);
		});
		const idMap = new Map<string, string>();
		const flat: Node[] = [];
		const traverse = (arr: Node[], prefix: string) => {
			arr.sort((a, b) => cmp(a.row, b.row)).forEach((n, i) => {
				const newKey = prefix ? `${prefix}.${i + 1}` : `${i + 1}`;
				if (n.key && n.key !== newKey) idMap.set(n.key, newKey);
				n.key = newKey;
				n.row.id = newKey;
				flat.push(n);
				traverse(n.children, newKey);
			});
		};
		traverse(roots, "");
		flat.forEach((n) => {
			if (!n.parent) return;
			const mapped = idMap.get(n.parent);
			if (mapped) n.row.ireference = mapped;
		});
		this.remapExpandedByIdMap(idMap);
		this.stackList = flat.map((n) => n.row);
	}

	protected oncommittreeorder(roots: INode<TWorking>[]): void {
		const result: TWorking[] = [];
		const idMap = new Map<string, string>();
		const traverse = (nodes: INode<TWorking>[], parent: TWorking | null, referenceId: string) => {
			// Permitir al padre reordenar SOLO a sus hijos directos. No se propaga a nietos.
			if (parent) {
				const sortFn = (parent as any).sortChildren as ((children: TWorking[]) => TWorking[]) | undefined;
				if (typeof sortFn === "function") {
					const ordered = sortFn.call(parent, nodes.map((n) => n.obj));
					const byObj = new Map<TWorking, INode<TWorking>>();
					nodes.forEach((n) => byObj.set(n.obj, n));
					const reordered: INode<TWorking>[] = [];
					const consumed = new Set<INode<TWorking>>();
					for (const obj of ordered) {
						const n = byObj.get(obj);
						if (n && !consumed.has(n)) { reordered.push(n); consumed.add(n); }
					}
					for (const n of nodes) if (!consumed.has(n)) reordered.push(n);
					nodes.length = 0;
					nodes.push(...reordered);
				}
			}
			nodes.forEach((node, index) => {
				const oldId = this.normalizeNodeId(node.id);
				const newId = referenceId ? `${referenceId}.${index + 1}` : `${index + 1}`;
				if (oldId && oldId !== newId) idMap.set(oldId, newId);
				node.id = newId;
				node.obj.id = newId;
				// Actualiza ireference al padre actual (fuente de verdad: la posición en el árbol).
				// Esto desacopla al hijo de su agrupador anterior cuando cambia de padre.
				node.obj.ireference = referenceId;
				result.push(node.obj);
				node.children.length && traverse(node.children, node.obj, newId);
			});
		};
		traverse(roots, null, "");
		this.remapExpandedByIdMap(idMap);
		this.commitFlatList(result);
	}

	protected remapReferences(objs: TWorking[], idMap: Map<string, string>): void {
		if (idMap.size === 0) return;
		for (const obj of objs) {
			const old = String(obj.ireference || "").trim();
			if (!old) continue;
			const mapped = idMap.get(old);
			if (mapped) obj.ireference = mapped;
		}
	}

	protected remapExpandedByIdMap(idMap: Map<string, string>): void {
		if (idMap.size === 0) return;
		for (const node of this._expandedNodes) {
			const mapped = idMap.get(this.normalizeNodeId(node.id));
			if (mapped) node.id = mapped;
		}
		const sel = idMap.get(this._selectedId);
		if (sel) this._selectedId = sel;
		const foc = idMap.get(this._focusedNodeId);
		if (foc) this._focusedNodeId = foc;
	}

	protected commitFlatList(_flat: TWorking[]): void { }

	protected serializeNodeToJSON(row: TWorking): Record<string, unknown> {
		if (typeof (row as any)?.toJSON === "function") {
			const j = { ...((row as any).toJSON(false) as Record<string, unknown>) };
			delete j.children;
			return j;
		}
		return { ...(row as unknown as Record<string, unknown>) };
	}

	addNode(data: any, onDuplicate?: (node: TWorking) => void): TWorking | null {
		const node = this.toNode(data);
		if (this.findFlatNodeIndex(node) !== -1) return (onDuplicate?.(node), null);
		this.stackList = [...this.stackListNodes, node];
		this.rebuildFlatTree();
		return node;
	}

	updateNode(data: any, mutate?: (target: TWorking, source: TWorking) => void): boolean {
		const node = this.toNode(data);
		const idx = this.findFlatNodeIndex(node);
		if (idx === -1) return false;
		const list = this.stackListNodes;
		if (mutate) mutate(list[idx], node);
		else Object.assign(list[idx], node);
		this.stackList = list;
		this.rebuildFlatTree();
		return true;
	}

	removeNode(data: any): boolean {
		const sId = this.toNode(data).id;
		if (!sId) return false;
		this.stackList = this.stackListNodes.filter((n) => n.id !== sId && !n.id.startsWith(sId + "."));
		this.rebuildFlatTree();
		return true;
	}

	onrefresh(): void {
		const nextNodes = objRootsToNodes(this.buildTree(this.stackList), (obj) => this.normalizeNodeId(obj.id));
		this._treeNodes = [...nextNodes];
		this.rowLayoutEpoch.update((n) => n + 1);
	}

	/**
	 * Decide si un drag/drop es válido consultando las reglas del nodo padre destino.
	 * - Reordenamientos en el mismo padre siempre se permiten.
	 * - Cambio de padre: se delega a `acceptsChild` del nuevo padre, o a `canDropAtRoot` si destino es root.
	 * - Bloquea ciclos (mover un nodo dentro de su propio subárbol).
	 */
	canDrop(sourceId: string, targetId: string, position: "before" | "after" | "into"): boolean {
		const sId = this.normalizeNodeId(sourceId);
		const tId = this.normalizeNodeId(targetId);
		if (!sId || !tId || sId === tId) return false;
		if (tId === sId || tId.startsWith(sId + ".")) return false;
		const srcNode = this.findNodeById(sId);
		const tgtNode = this.findNodeById(tId);
		if (!srcNode || !tgtNode) return false;
		// Drop "into": el destino mismo es el nuevo padre. Delega en su `acceptsChild`.
		if (position === "into") {
			const fn = (tgtNode.obj as any).acceptsChild as ((c: TWorking) => boolean) | undefined;
			if (typeof fn !== "function") return false;
			return !!fn.call(tgtNode.obj, srcNode.obj);
		}
		const srcRef = this.normalizeNodeId(srcNode.obj.ireference || "");
		const tgtRef = this.normalizeNodeId(tgtNode.obj.ireference || "");
		const sameParent = srcRef === tgtRef;
		if (!sameParent) {
			if (!tgtRef) {
				if (!this.canDropAtRoot(srcNode.obj)) return false;
			} else {
				const newParent = this.findNodeById(tgtRef)?.obj;
				if (!newParent) return false;
				const fn = (newParent as any).acceptsChild as ((c: TWorking) => boolean) | undefined;
				if (typeof fn !== "function" || !fn.call(newParent, srcNode.obj)) return false;
			}
		}
		// Segunda barrera: el padre del destino puede vetar la posición específica
		// (p.ej. impedir colocar antes del master de un dominio).
		const destParent = tgtRef ? this.findNodeById(tgtRef)?.obj : undefined;
		const place = (destParent as any)?.canPlaceChildAt as ((s: TWorking, t: TWorking, p: "before" | "after") => boolean) | undefined;
		if (typeof place === "function" && !place.call(destParent, srcNode.obj, tgtNode.obj, position)) return false;
		return true;
	}

	/** Override por adapter: regla de qué tipos de nodo aceptan ser hijos directos del root. */
	canDropAtRoot(_src: TWorking): boolean { return true; }

	onstateupdate(ctx: TreeViewProps<Stacker, TWorking>) {
		const prevItdForm = this.context.itdForm;
		const prevReadonly = this.context.readonly;
		this.syncTreeViewBindState(ctx);
		Object.assign(this.context, ctx);
		const itdFormChanged = prevItdForm !== this.context.itdForm;
		const readonlyChanged = prevReadonly !== this.context.readonly;
		this.onchangecurso();
		this.onbranchexpand();
		this.onprocessobj();
		this.onupdate();
		this.ontouchitem();
		this.onensurefirstselection();
		if (itdFormChanged || readonlyChanged) {
			this.syncAllRowAdapters();
		}
	}

	protected onupdate() {
		const nodesRef = this.rootNodes;
		if (nodesRef !== this.lastNodesRef) {
			this.onrefresh();
			this.lastNodesRef = this.rootNodes;
		}
	}

	protected onbranchexpand() {
		if (!this.rootNodes.length || this.didNodesExpand) return;
		this.expandedNodes = [...this.rootNodes];
		this.didNodesExpand = true;
	}

	protected onprocessobj() {
		const objWorking = this.context.objWorking ?? null;
		if (!objWorking) return;
		const resolvedBranch = this.selectedId ?? objWorking;
		if (!resolvedBranch || resolvedBranch === this.lastProcessedNode) return;
		this.currentNode = resolvedBranch;
		this.lastProcessedNode = resolvedBranch;

		const currentObj = this.context.Obj;
		if (currentObj && currentObj !== this._lastProcessedObj) {
			if (this.rootNodes.length > 0 && !this._selectedId) {
				setTimeout(() => {
					const first = this.rootNodes[0]?.obj;
					if (first && !this._selectedId) {
						this.applySelection(first);
					}
				}, 0);
			}
			this._lastProcessedObj = currentObj;
		}
	}

	protected onchangecurso() {
		const objId = String(this.context.objWorking?.istack || "");
		if (objId !== this.lastObjRefId) {
			this.lastObjRefId = objId;
			this.expandedNodes = [];
			this.didNodesExpand = false;
		}
	}

	ontouchitem(): void { }

	onensurefirstselection(): void {
		if (this._selectedId || !this.rootNodes.length) return;
		const first = this.rootNodes[0]?.obj;
		if (!first) return;
		this.applySelection(first);
	}

	protected syncTreeViewBindState(ctx: TreeViewProps<Stacker, TWorking>): void {
		if (!this.selectedId && this.rootNodes.length) this.selectedId = this.rootNodes[0];
		const adapterObj = this.objWorking ?? null;
		const ctxObjId = this.normalizeNodeId(ctx.objWorking?.id);
		const adapterObjId = this.normalizeNodeId(adapterObj?.id);
		if (ctxObjId !== adapterObjId) ctx.objWorking = adapterObj;
		if (!this.focusedNode && this.selectedId) this.focusedNode = this.selectedId;
	}

	async onAfterCatalogModificar(): Promise<void> {
		this._pendingInsertId = "";
		this._pendingExpandedSnapshot = [];
		this.onrefresh();
		this.syncAllRowAdapters();
	}
}
