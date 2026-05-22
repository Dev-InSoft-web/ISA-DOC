import type { TreeViewProps } from "../TreeRowView.svelte";
import { normalizeRoots, type INode, type ITreeData } from "./_defgen/00-tree-data";
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
			if (this.normalizeNodeId(branch.flatPath) === needle) return branch;
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
		const sId = this.normalizeNodeId(item.flatPath);
		const sStack = item.istack;
		return list.findIndex((n) => this.normalizeNodeId(n.flatPath) === sId && n.istack === sStack);
	}

	findNode(data: any): TWorking | undefined {
		const sId = this.normalizeNodeId(this.toNode(data).flatPath);
		if (!sId) return undefined;
		return this.stackListNodes.find((n) => this.normalizeNodeId(n.flatPath) === sId);
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
			if (this.normalizeNodeId(branch.flatPath) === needle) return referenceBranch;
			if (branch.children?.length) {
				const inner = this.findReferenceBranchInTree(branch.children, childId, branch);
				if (inner !== null) return inner;
			}
		}
		return null;
	}

	getNodeById(nodeId: string): TWorking | undefined {
		const node = this.findNodeById(nodeId);
		return node ? (node as unknown as TWorking) : undefined;
	}

	/**
	 * Recorre los ancestros de un nodo subiendo por `ireference`. Aplica
	 * cycle-guard y termina si `visit` devuelve `false`. No incluye el nodo
	 * inicial; visita desde el primer padre hacia la raíz.
	 *
	 * Genérico: cualquier adapter puede recorrer la cadena sin reimplementar
	 * la guarda contra ciclos ni la búsqueda por id.
	 */
	walkAncestors(rowId: string, visit: (parent: INode<TWorking>) => boolean | void): void {
		const startId = this.normalizeNodeId(rowId);
		if (!startId) return;
		const seen = new Set<string>([startId]);
		let cur: INode<TWorking> | null = this.findNodeById(startId);
		while (cur) {
			const ref = this.normalizeNodeId(cur.ireference || "");
			if (!ref || ref === this.normalizeNodeId(cur.flatPath) || seen.has(ref)) return;
			seen.add(ref);
			const parent = this.findNodeById(ref);
			if (!parent) return;
			const r = visit(parent);
			if (r === false) return;
			cur = parent;
		}
	}

	getSiblingPosition(nodeId: string): { isFirst: boolean; isLast: boolean } {
		const branches = this.rootNodes;
		const n = this.normalizeNodeId(nodeId);
		if (!branches?.length || n.length === 0) return { isFirst: false, isLast: false };
		const referenceBranch = this.findReferenceBranchInTree(branches, n);
		const siblings = referenceBranch ? (referenceBranch.children ?? []) : branches;
		const idx = siblings.findIndex((ch) => this.normalizeNodeId(ch.flatPath) === n);
		return { isFirst: idx === 0, isLast: idx === siblings.length - 1 };
	}

	protected collectBranchAndLeafIds(branch: INode<TWorking>): string[] {
		const out = [branch.flatPath];
		branch.children?.forEach((leafOrBranch) => out.push(...this.collectBranchAndLeafIds(leafOrBranch)));
		return out;
	}

	protected collectBranchIds(branches: INode<TWorking>[] = this.rootNodes): string[] {
		const out: string[] = [];
		for (const branch of branches) {
			if (branch.children?.length) out.push(branch.flatPath, ...this.collectBranchIds(branch.children));
		}
		return out;
	}

	buildTree(planes: any[]): TWorking[] {
		const map = new Map<string, TWorking>();
		const roots: TWorking[] = [];
		const uxList: TWorking[] = [];
		// Dedupe defensivo por flatPath: si llegan dos rows con el mismo id
		// (por mutaciones encadenadas o estado desincronizado), Svelte explota
		// con `each_key_duplicate` al construir hijos. Conservamos solo la
		// primera ocurrencia de cada flatPath.
		const seen = new Set<string>();
		planes.forEach((p) => {
			const ux = this.createNode(p);
			ux.children = [] as TWorking[];
			const key = this.normalizeNodeId(ux.flatPath);
			if (key && seen.has(key)) return;
			if (key) seen.add(key);
			map.set(key, ux);
			uxList.push(ux);
		});
		uxList.forEach((ux) => {
			const uxId = this.normalizeNodeId(ux.flatPath);
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
				const oldId = this.normalizeNodeId(node.flatPath);
				const newId = referenceId ? `${referenceId}.${index + 1}` : `${index + 1}`;
				if (oldId && oldId !== newId) idMap.set(oldId, newId);
				node.flatPath = newId;
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
		// Dedupe defensivo por flatPath para evitar `each_key_duplicate` en el
		// `{#each}` keyed del TreeView. Tras mutaciones encadenadas o reorders
		// el `stackList` puede quedar con dos referencias al mismo path.
		const seen = new Set<string>();
		const deduped: TWorking[] = [];
		for (const row of list) {
			const k = this.normalizeNodeId(row.flatPath);
			if (k && seen.has(k)) continue;
			if (k) seen.add(k);
			deduped.push(row);
		}
		type Node = { row: TWorking; key: string; parent: string; children: Node[] };
		const nodes: Node[] = deduped.map((row) => ({
			row,
			key: this.normalizeNodeId(row.flatPath),
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
				n.row.flatPath = newKey;
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
					const ordered = sortFn.call(parent, nodes as unknown as TWorking[]);
					const byObj = new Map<TWorking, INode<TWorking>>();
					nodes.forEach((n) => byObj.set(n as unknown as TWorking, n));
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
				const oldId = this.normalizeNodeId(node.flatPath);
				const newId = referenceId ? `${referenceId}.${index + 1}` : `${index + 1}`;
				if (oldId && oldId !== newId) idMap.set(oldId, newId);
				node.flatPath = newId;
				// Actualiza ireference al padre actual (fuente de verdad: la posición en el árbol).
				// Esto desacopla al hijo de su agrupador anterior cuando cambia de padre.
				node.ireference = referenceId;
				result.push(node as unknown as TWorking);
				node.children.length && traverse(node.children, node as unknown as TWorking, newId);
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
		// IMPORTANTE: NO aplicar `idMap` a `node.flatPath` en `_expandedNodes`.
		// Los nodos expandidos son REFERENCIAS a los nodos del árbol; su
		// `flatPath` ya fue actualizado por el traverse. Aplicar `idMap` aquí
		// causa cascada (chain remap) cuando el `newId` de un nodo coincide
		// con el `oldId` de otro. Ej.: si "1.3"→"1.2" y "1.2"→"4", aplicar
		// `idMap.get("1.2")` sobre dom_cursos (que ya quedó en "1.2") lo
		// reasigna por error a "4", colisionando con dom_drivers.
		// Solo remapeamos los ids guardados como strings (`_selectedId`,
		// `_focusedNodeId`) — esos no fueron tocados por el traverse.
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
		const sId = this.toNode(data).flatPath;
		if (!sId) return false;
		this.stackList = this.stackListNodes.filter((n) => n.flatPath !== sId && !n.flatPath.startsWith(sId + "."));
		this.rebuildFlatTree();
		return true;
	}

	onrefresh(): void {
		const nextNodes = normalizeRoots(this.buildTree(this.stackList)) as unknown as INode<TWorking>[];
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
			const fn = (tgtNode as any).acceptsChild as ((c: TWorking) => boolean) | undefined;
			if (typeof fn !== "function") return false;
			return !!fn.call(tgtNode, srcNode as unknown as TWorking);
		}
		const srcRef = this.normalizeNodeId(srcNode.ireference || "");
		const tgtRef = this.normalizeNodeId(tgtNode.ireference || "");
		const sameParent = srcRef === tgtRef;
		if (!sameParent) {
			if (!tgtRef) {
				if (!this.canDropAtRoot(srcNode as unknown as TWorking)) return false;
			} else {
				const newParent = this.findNodeById(tgtRef);
				if (!newParent) return false;
				const fn = (newParent as any).acceptsChild as ((c: TWorking) => boolean) | undefined;
				if (typeof fn !== "function" || !fn.call(newParent, srcNode as unknown as TWorking)) return false;
			}
		}
		// Segunda barrera: el padre del destino puede vetar la posición específica
		// (p.ej. impedir colocar antes del master de un dominio).
		const destParent = tgtRef ? this.findNodeById(tgtRef) : undefined;
		const place = (destParent as any)?.canPlaceChildAt as ((s: TWorking, t: TWorking, p: "before" | "after") => boolean) | undefined;
		if (typeof place === "function" && !place.call(destParent, srcNode as unknown as TWorking, tgtNode as unknown as TWorking, position)) return false;
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
					const first = this.rootNodes[0] as unknown as TWorking | undefined;
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
		const first = this.rootNodes[0] as unknown as TWorking | undefined;
		if (!first) return;
		this.applySelection(first);
	}

	protected syncTreeViewBindState(ctx: TreeViewProps<Stacker, TWorking>): void {
		if (!this.selectedId && this.rootNodes.length) this.selectedId = this.rootNodes[0];
		const adapterObj = this.objWorking ?? null;
		const ctxObjId = this.normalizeNodeId(ctx.objWorking?.flatPath);
		const adapterObjId = this.normalizeNodeId(adapterObj?.flatPath);
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
