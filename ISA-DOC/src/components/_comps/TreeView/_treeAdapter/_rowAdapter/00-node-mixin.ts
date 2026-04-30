import { TObject } from "@ingenieria_insoft/ispgen";

type Ctor<T> = new (...args: any[]) => T;

export function TreeNodeUX<TParent extends TObject>(Base: Ctor<TParent> & typeof TObject) {
	abstract class C<TSelf extends TParent> extends (Base as unknown as typeof TObject) {
		public get depth(): number { return this.f.depth; }
		public set depth(v: number) { this.f.depth = v; }
		public get levelTitle(): string { return this.f.levelTitle; }
		public set levelTitle(v: string) { this.f.levelTitle = v; }
		public get nextLevelTitle(): string { return this.f.nextLevelTitle; }
		public set nextLevelTitle(v: string) { this.f.nextLevelTitle = v; }
		public get isSelected(): boolean { return this.f.isSelected; }
		public set isSelected(v: boolean) { this.f.isSelected = v; }
		public get isLeaf(): boolean { return this.f.isLeaf; }
		public set isLeaf(v: boolean) { this.f.isLeaf = v; }
		public get isLast(): boolean { return this.f.isLast; }
		public set isLast(v: boolean) { this.f.isLast = v; }
		public get isPenultimate(): boolean { return this.f.isPenultimate; }
		public set isPenultimate(v: boolean) { this.f.isPenultimate = v; }
		public get hasChildren(): boolean { return this.f.hasChildren; }
		public set hasChildren(v: boolean) { this.f.hasChildren = v; }
		public get isFirst(): boolean { return this.f.isFirst; }
		public set isFirst(v: boolean) { this.f.isFirst = v; }
		public get isCollapsed(): boolean { return this.f.isCollapsed; }
		public set isCollapsed(v: boolean) { this.f.isCollapsed = v; }
		public get label(): string { return this.f.label; }
		public set label(v: string) { this.f.label = v; }
		public get stack(): TObject { return this.f.stack; }
		public set stack(v: TObject) { this.f.stack = v; }
		public get obj(): TSelf { return this.f.obj; }
		public set obj(v: TSelf) { this.f.obj = v; }
		public get children(): TSelf[] { return this.f.children; }
		public set children(v: TSelf[]) { this.f.children = v ?? []; }
	}
	type CCtor = abstract new <TSelf extends TParent>(...args: any[]) => TParent & {
		depth: number;
		levelTitle: string;
		nextLevelTitle: string;
		isSelected: boolean;
		isLeaf: boolean;
		isLast: boolean;
		isPenultimate: boolean;
		hasChildren: boolean;
		isFirst: boolean;
		isCollapsed: boolean;
		label: string;
		stack: TObject;
		obj: TSelf;
		children: TSelf[];
	};
	return C as unknown as CCtor & typeof TObject;
}
