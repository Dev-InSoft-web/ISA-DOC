type Ctor<T> = new (...args: any[]) => T;

export function TreeNodeUX<TParent extends object>(Base: Ctor<TParent>) {
	class C extends (Base as any) {
		public depth = 0;
		public levelTitle = "";
		public nextLevelTitle = "";
		public isSelected = false;
		public isLeaf = false;
		public isLast = false;
		public isPenultimate = false;
		public hasChildren = false;
		public isFirst = false;
		public isCollapsed = false;
		public label = "";
		public stack: any = null;
		public obj: any = null;
		public children: any[] = [];
	}
	type CCtor = new <TSelf>(...args: any[]) => TParent & { [k: string]: any };
	return C as unknown as CCtor;
}
