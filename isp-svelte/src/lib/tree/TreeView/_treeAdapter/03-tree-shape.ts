import { Capitalizar, TObject } from "@ingenieria_insoft/ispgen";
import type { ITreeCustomsRow, ITreeRuntimeRow } from "../contracts";
import { type INode, type ITreeData } from "./_defgen/00-tree-data";
import { TAModel } from "./02-model";

export abstract class TATreeShape<TListObj extends ITreeData<TListObj> & TObject> extends TAModel<TListObj> {

	private _customs?: ITreeCustomsRow<TListObj>;
	get customs(): ITreeCustomsRow<TListObj> | undefined { return this._customs; }
	set customs(value: ITreeCustomsRow<TListObj> | undefined) {
		if (this._customs === value) return;
		this._customs = value;
		this.notifyUI();
	}

	get entrie(): string {
		const level = this._customs?.levelName?.({ depth: Number(this.record?.depth ?? 0) });
		return Capitalizar(String(level || this._customs?.entrie || "").trim());
	}
	get entries(): string { return this._customs?.entries ?? ""; }

	abstract buildCustomsRuntime(): ITreeRuntimeRow<TListObj>;

	siblingsOf(node: INode<TListObj>): INode<TListObj>[] {
		const id = this.normalizeFlatPath(node.flatPath);
		if (!id) return [];
		const parentRef = this.findReferenceBranchInTree(this.rootNodes, id);
		return parentRef ? (parentRef.childrens ?? []) : this.rootNodes;
	}

	async runCustomsPreSubmit(): Promise<void> {
		const hook = this.customs?.updateNode;
		const runtime = hook ? this.buildCustomsRuntime() : null;
		const walk = async (nodes: ReadonlyArray<INode<TListObj>>): Promise<void> => {
			for (const node of nodes) {
				if (hook && runtime) await hook(node, false, runtime);
				if (node.childrens?.length) await walk(node.childrens);
			}
		};
		await walk(this.rootNodes);
		this.commitFlatPaths();
	}

	currPathByInit(pathInit: string): string {
		const needle = this.normalizeFlatPath(pathInit);
		if (!needle) return "";
		const getInit = this.customs?.getFlatPath;
		for (const obj of this.List2Rows as TListObj[]) {
			const init = this.normalizeFlatPath(String(getInit?.(obj) ?? ""));
			if (init === needle) return this.normalizeFlatPath(String(obj.flatPath ?? ""));
		}
		return needle;
	}

	protected prepareGetNode(data: Partial<TListObj>): Partial<TListObj> { return data; }

	protected isNodeInstance(data: Partial<TListObj>): data is TListObj {
		const d = data as { flatPath?: unknown; childrens?: unknown };
		return typeof d?.flatPath === "string" && Array.isArray(d?.childrens);
	}

	createNode(data: TObject): TListObj {
		const partial = data as unknown as Partial<TListObj>;
		if (this.isNodeInstance(partial)) return partial;
		if (this.customs?.newItem) return this.customs.newItem(partial);
		const Klass = this.customs?.klass;
		if (Klass) {
			const item = this.safeAssign(new Klass() as TListObj, partial);
			const flatPath = String(partial?.flatPath ?? this.customs?.getFlatPath?.(item) ?? "").trim();
			if (flatPath) {
				item.flatPath = flatPath;
				this.customs?.setFlatPath?.(item, flatPath);
			}
			return item;
		}
		
		const item = { ...(partial as object) } as TListObj;
		if (!Array.isArray((item as { childrens?: unknown }).childrens)) {
			(item as { childrens: TListObj[] }).childrens = [];
		}
		const flatPath = String(partial?.flatPath ?? this.customs?.getFlatPath?.(item) ?? "").trim();
		if (flatPath) {
			item.flatPath = flatPath;
			this.customs?.setFlatPath?.(item, flatPath);
		}
		return item;
	}

	protected safeAssign<T extends object>(target: T, source: Partial<T> | null | undefined): T {
		if (!source) return target;
		for (const key of Object.keys(source) as Array<keyof T>) {
			const value = source[key];
			if (value === undefined) continue;
			if (this.isAssignableProperty(target, key)) {
				try { target[key] = value as T[keyof T]; } catch {  }
			}
		}
		return target;
	}

	protected isAssignableProperty<T extends object>(target: T, key: keyof T): boolean {
		let proto: object | null = target;
		while (proto) {
			const desc = Object.getOwnPropertyDescriptor(proto, key as string | symbol);
			if (desc) {
				if (desc.set) return true;
				if (desc.get && !desc.set) return false;
				return desc.writable !== false;
			}
			proto = Object.getPrototypeOf(proto);
		}
		return true;
	}

	protected getList2RowsSource(): TObject[] | null {
		if (this.customs?.list) {
			const l = this.customs.list();
			return (l ?? null) as TObject[] | null;
		}
		const raw = this.context.List2Rows;
		return Array.isArray(raw) ? (raw as TObject[]) : null;
	}
	get List2Rows(): TObject[] {
		return this.getList2RowsSource() ?? [];
	}
	set List2Rows(value: TObject[]) {
		const target = this.getList2RowsSource();
		if (!target) return;
		while (target.length > 0) target.pop();
		for (const item of value) target.push(item);
	}

	protected prepareLastLevelNodeData(baseData: Partial<TListObj>, _record: TObject): Partial<TListObj> {
		return baseData;
	}

	invokeUpdateNode(node: TListObj, isNew: boolean): void {
		const fn = this.customs?.updateNode;
		if (!fn) return;
		if (!isNew && this._pendingMaterialize) {
			this._pendingMaterialize.push(node);
			return;
		}
		void fn(node, isNew, this.buildCustomsRuntime());
	}

	protected _pendingMaterialize: TListObj[] | null = null;
	withDeferredMaterialize<T>(fn: () => T): { result: T; pending: TListObj[] } {
		const prev = this._pendingMaterialize;
		this._pendingMaterialize = [];
		let result: T;
		try { result = fn(); } finally {  }
		const pending = this._pendingMaterialize ?? [];
		this._pendingMaterialize = prev;
		return { result, pending };
	}
	flushPendingMaterialize(nodes: TListObj[]): void {
		const fn = this.customs?.updateNode;
		if (!fn) return;
		const runtime = this.buildCustomsRuntime();
		for (const node of nodes) void fn(node, false, runtime);
	}

	protected materializeNode(data: TObject): TListObj {
		const node = this.createNode(data);
		this.applyDomainDefaults(node);
		this.invokeUpdateNode(node, false);
		return node;
	}

	protected applyDomainDefaults(node: TListObj): void {
		const flatPath = String(node.flatPath ?? "").trim();
		if (!flatPath) return;
		const depth = (flatPath.match(/\./g) || []).length;
		if (this.isAssignableProperty(node, "depth" as keyof TListObj)) node.depth = depth;
		if (!node.topology && this.isAssignableProperty(node, "topology" as keyof TListObj)) node.topology = "group";
		if (this.isAssignableProperty(node, "hasChildren" as keyof TListObj)) node.hasChildren = this.computeNodeHasChildren(flatPath);
	}

	protected computeNodeHasChildren(flatPath: string): boolean {
		const list = (this.List2Rows ?? []) as Array<{ flatPath?: string; iplan?: string } | null>;
		const myPrefix = flatPath + ".";
		for (const item of list) {
			if (!item) continue;
			const pid = String(item.flatPath ?? item.iplan ?? "").trim();
			if (!pid) continue;
			const idxDot = pid.lastIndexOf(".");
			const parentId = idxDot >= 0 ? pid.slice(0, idxDot) : "";
			if (parentId === flatPath || (flatPath === "" && !pid.includes("."))) return true;
			if (pid.startsWith(myPrefix)) return true;
		}
		return false;
	}

	toNode(data: any, clone = false): TListObj {
		const src = clone
			? (data instanceof TObject ? (data.clone() as TListObj) : structuredClone(data) as Partial<TListObj>)
			: data;
		if (!clone && this.isNodeInstance(src as Partial<TListObj>)) return src as TListObj;
		const prepared = this.prepareGetNode(src as Partial<TListObj>);
		return this.materializeNode(this.safeAssign(new TObject() as unknown as TListObj, prepared) as unknown as TObject);
	}

	normalizeFlatPath(id: unknown): string {
		if (id === undefined || id === null) return "";
		return String(id).replace(/^(_UP_|_M_)/, "").trim();
	}

	findNodeByFlatPath(id: string, branches: INode<TListObj>[] = this.rootNodes): INode<TListObj> | null {
		const needle = this.normalizeFlatPath(id);
		if (needle.length === 0) return null;
		for (const branch of branches) {
			if (this.normalizeFlatPath(branch.flatPath) === needle) return branch;
			if (branch.childrens?.length) {
				const found = this.findNodeByFlatPath(needle, branch.childrens);
				if (found) return found;
			}
		}
		return null;
	}

	findNodeByPathInit(pathInit: string, branches: INode<TListObj>[] = this.rootNodes): INode<TListObj> | null {
		const needle = this.normalizeFlatPath(pathInit);
		if (needle.length === 0) return null;
		for (const branch of branches) {
			if (this.normalizeFlatPath(branch.pathInit) === needle) return branch;
			if (branch.childrens?.length) {
				const found = this.findNodeByPathInit(needle, branch.childrens);
				if (found) return found;
			}
		}
		return null;
	}

	findFlatNodeIndex(item: TListObj): number {
		const list = this.List2RowsNodes;
		if (!list.length) return -1;
		const sId = this.normalizeFlatPath(item.flatPath);
		return list.findIndex((n) => this.normalizeFlatPath(n.flatPath) === sId);
	}

	findNode(data: any): TListObj | undefined {
		const sId = this.normalizeFlatPath(this.toNode(data).flatPath);
		if (!sId) return undefined;
		return this.List2RowsNodes.find((n) => this.normalizeFlatPath(n.flatPath) === sId);
	}

	findBranchByObject(branches: INode<TListObj>[], objRow: TListObj): INode<TListObj> | null {
		for (const branch of branches) {
			if ((branch as TListObj) === objRow) return branch;
			if (branch.childrens?.length) {
				const foundBranch = this.findBranchByObject(branch.childrens, objRow);
				if (foundBranch) return foundBranch;
			}
		}
		return null;
	}

	protected findReferenceBranchInTree(branches: INode<TListObj>[], childId: string, referenceBranch: INode<TListObj> | null = null): INode<TListObj> | null {
		const needle = this.normalizeFlatPath(childId);
		for (const branch of branches) {
			if (this.normalizeFlatPath(branch.flatPath) === needle) return referenceBranch;
			if (branch.childrens?.length) {
				const inner = this.findReferenceBranchInTree(branch.childrens, childId, branch);
				if (inner !== null) return inner;
			}
		}
		return null;
	}

	getNodeByFlatPath(nodeId: string): TListObj | undefined {
		const node = this.findNodeByFlatPath(nodeId);
		return node ?? undefined;
	}

	isPendingInsertPath(flatPath: string): boolean {
		const norm = this.normalizeFlatPath(flatPath);
		if (!norm) return false;
		return this.normalizeFlatPath(this._pendingInsertFlatPath) === norm;
	}

	getSiblingPosition(nodeId: string): { isFirst: boolean; isLast: boolean } {
		const branches = this.rootNodes;
		const n = this.normalizeFlatPath(nodeId);
		if (!branches?.length || n.length === 0) return { isFirst: false, isLast: false };
		const referenceBranch = this.findReferenceBranchInTree(branches, n);
		const siblings = referenceBranch ? (referenceBranch.childrens ?? []) : branches;
		const idx = siblings.findIndex((ch) => this.normalizeFlatPath(ch.flatPath) === n);
		return { isFirst: idx === 0, isLast: idx === siblings.length - 1 };
	}

	walkAncestors(node: INode<TListObj>): INode<TListObj>[] {
		const out: INode<TListObj>[] = [];
		const id = String(node.flatPath ?? "").trim();
		if (!id || !id.includes(".")) return out;
		const parts = id.split(".");
		for (let i = parts.length - 1; i >= 1; i--) {
			const ancId = parts.slice(0, i).join(".");
			const anc = this.findNodeByFlatPath(ancId);
			if (anc) out.push(anc);
		}
		return out;
	}

	protected isDescendant(candidate: INode<TListObj>, ancestor: INode<TListObj>): boolean {
		const aid = this.normalizeFlatPath(ancestor.flatPath);
		const cid = this.normalizeFlatPath(candidate.flatPath);
		return cid === aid || cid.startsWith(aid + ".");
	}

	protected collectBranchAndLeafIds(branch: INode<TListObj>): string[] {
		const out = [branch.flatPath];
		branch.childrens?.forEach((leafOrBranch) => out.push(...this.collectBranchAndLeafIds(leafOrBranch)));
		return out;
	}

	protected collectBranchIds(branches: INode<TListObj>[] = this.rootNodes): string[] {
		const out: string[] = [];
		for (const branch of branches) {
			if (branch.childrens?.length) out.push(branch.flatPath, ...this.collectBranchIds(branch.childrens));
		}
		return out;
	}

	abstract commitFlatPaths(): void;
}
