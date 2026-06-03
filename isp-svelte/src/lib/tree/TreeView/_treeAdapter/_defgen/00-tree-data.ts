import type { TObject } from "@ingenieria_insoft/ispgen";

export type INode<T extends TObject> = T & INodeShape<T>;

export interface INodeShape<T extends TObject> {
	flatPath: string;
	childrens: INode<T>[];
	pathInit?: string;
	topology?: TopologyRole;
	containment?: ContainmentRole;
	mobility?: MobilityRole;
	freeze?: boolean;
	readonly isAtom?: boolean;
	readonly isGroupActor?: boolean;
	readonly isPrison?: boolean;
	readonly isHermetic?: boolean;
	readonly isCell?: boolean;
	readonly isUnanchored?: boolean;
	readonly isFreezer?: boolean;
	
	readonly isEmpty?: boolean;
	depth?: number;
	hasChildren?: boolean;
}

export interface ITreeData<T extends ITreeData<T> & TObject> extends INodeShape<T> {
	childrens: T[];
}

export type TopologyRole = "atom" | "group";
export type ContainmentRole = "prison" | "hermetic" | "cell";
export type MobilityRole = "unanchored" | "freezer";

const NODE_DECORATED = new WeakSet<object>();
const NODE_DIM_DESCRIPTORS: PropertyDescriptorMap = {
	isAtom: { get(this: { topology?: TopologyRole }) { return this.topology === "atom"; }, configurable: true },
	isGroupActor: { get(this: { topology?: TopologyRole }) { return (this.topology ?? "group") === "group"; }, configurable: true },
	
	isPrison: { get(this: { topology?: TopologyRole; containment?: ContainmentRole }) { return this.topology !== "atom" && this.containment === "prison"; }, configurable: true },
	isHermetic: { get(this: { topology?: TopologyRole; containment?: ContainmentRole }) { return this.topology !== "atom" && this.containment === "hermetic"; }, configurable: true },
	isCell: { get(this: { topology?: TopologyRole; containment?: ContainmentRole }) { return this.topology !== "atom" && (this.containment ?? "cell") === "cell"; }, configurable: true },
	isUnanchored: { get(this: { mobility?: MobilityRole }) { return (this.mobility ?? "unanchored") === "unanchored"; }, configurable: true },
	isFreezer: { get(this: { mobility?: MobilityRole }) { return this.mobility === "freezer"; }, configurable: true },
	isEmpty: {
		get(this: { topology?: TopologyRole; childrens?: ReadonlyArray<unknown> }) {
			if (this.topology === "atom") return true;
			return !this.childrens || this.childrens.length === 0;
		},
		configurable: true,
	},
};

function decorateAsNode<T extends TObject>(rec: T, init: { flatPath: string; pathInit: string; childrens: INode<T>[] }): INode<T> {
	const r = rec as unknown as INode<T>;
	r.flatPath = init.flatPath;
	r.pathInit = init.pathInit;
	r.childrens = init.childrens;
	if (!NODE_DECORATED.has(rec)) {
		NODE_DECORATED.add(rec);
		Object.defineProperties(rec, NODE_DIM_DESCRIPTORS);
	}
	return r;
}

export function objRootsToNodes<T extends ITreeData<T> & TObject>(
	roots: readonly T[],
	pathInitFn?: (obj: T) => string,
): INode<T>[] {
	return roots.map((r) => {
		const rawFlatPath = String(r.flatPath || "").replace(/^(_UP_|_M_)/, "").trim() || String(r.flatPath || "");
		const injected = pathInitFn ? String(pathInitFn(r) ?? "").trim() : "";
		const rawPathInit = injected || String(r.pathInit ?? "").trim() || rawFlatPath;
		return decorateAsNode<T>(r, {
			flatPath: rawFlatPath,
			pathInit: rawPathInit,
			childrens: r.childrens.length ? objRootsToNodes(r.childrens, pathInitFn) : [],
		});
	});
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

type Ctor<T> = new (...args: unknown[]) => T;

export function TreeNode<TParent extends TObject>(Base: Ctor<TParent> & typeof TObject) {
	abstract class C<TSelf extends TParent> extends (Base as unknown as typeof TObject) {
		public get depth(): number { return this.f.depth; }
		public set depth(v: number) { this.f.depth = v; }
		public get isSelected(): boolean { return this.f.isSelected; }
		public set isSelected(v: boolean) { this.f.isSelected = v; }
		public get hasChildren(): boolean { return this.f.hasChildren; }
		public set hasChildren(v: boolean) { this.f.hasChildren = v; }
		public get isCollapsed(): boolean { return this.f.isCollapsed; }
		public set isCollapsed(v: boolean) { this.f.isCollapsed = v; }
		public get flatPath(): string { return String(this.f.flatPath ?? "").trim(); }
		public set flatPath(v: string) { this.f.flatPath = String(v ?? "").trim(); this.f.pathInit ??= this.f.flatPath; }
		public get pathInit(): string { return String(this.f.pathInit ?? "").trim(); }
		public set pathInit(v: string) { this.f.pathInit ??= String(v ?? "").trim() || this.f.flatPath; }
		public get topology(): TopologyRole | undefined { return this.f.topology; }
		public set topology(v: TopologyRole | undefined) { this.f.topology = v; }
		public get containment(): ContainmentRole | undefined { return this.f.containment; }
		public set containment(v: ContainmentRole | undefined) { this.f.containment = v; }
		public get mobility(): MobilityRole | undefined { return this.f.mobility; }
		public set mobility(v: MobilityRole | undefined) { this.f.mobility = v; }
		public get freeze(): boolean | undefined { return this.f.freeze; }
		public set freeze(v: boolean | undefined) { this.f.freeze = v; }
		public get isAtom(): boolean { return this.topology === "atom"; }
		public get isGroupActor(): boolean { return (this.topology ?? "group") === "group"; }
		
		public get isPrison(): boolean { return !this.isAtom && this.containment === "prison"; }
		public get isHermetic(): boolean { return !this.isAtom && this.containment === "hermetic"; }
		public get isCell(): boolean { return !this.isAtom && (this.containment ?? "cell") === "cell"; }
		public get isUnanchored(): boolean { return (this.mobility ?? "unanchored") === "unanchored"; }
		public get isFreezer(): boolean { return this.mobility === "freezer"; }
		public get isEmpty(): boolean {
			if (this.isAtom) return true;
			const children = this.f.childrens as ReadonlyArray<unknown> | undefined;
			return !children || children.length === 0;
		}
		public get childrens(): TSelf[] { return this.f.childrens; }
		public set childrens(v: TSelf[]) { this.f.childrens = v ?? []; }

		public recomputeHasChildren<P>(siblings: ReadonlyArray<P> | null | undefined, getPath: (item: P) => string): void {
			const myId = this.flatPath;
			const myPrefix = myId + ".";
			const list = siblings ?? [];
			for (const item of list) {
				const pid = String(getPath(item) ?? "").trim();
				if (!pid) continue;
				const idxDot = pid.lastIndexOf(".");
				const parentId = idxDot >= 0 ? pid.slice(0, idxDot) : "";
				if (parentId === myId || (myId === "" && !pid.includes(".")) || pid.startsWith(myPrefix)) {
					this.hasChildren = true;
					return;
				}
			}
			this.hasChildren = false;
		}
	}
	type CCtor = abstract new <TSelf extends TParent>(...args: unknown[]) => TParent & {
		depth: number;
		isSelected: boolean;
		hasChildren: boolean;
		isCollapsed: boolean;
		flatPath: string;
		pathInit: string;
		topology: TopologyRole | undefined;
		containment: ContainmentRole | undefined;
		mobility: MobilityRole | undefined;
		freeze: boolean | undefined;
		readonly isAtom: boolean;
		readonly isGroupActor: boolean;
		readonly isPrison: boolean;
		readonly isHermetic: boolean;
		readonly isCell: boolean;
		readonly isUnanchored: boolean;
		readonly isFreezer: boolean;
		childrens: TSelf[];
		recomputeHasChildren<P>(siblings: ReadonlyArray<P> | null | undefined, getPath: (item: P) => string): void;
	};
	return C as unknown as CCtor & typeof TObject;
}
