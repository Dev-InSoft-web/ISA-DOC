import { TObject } from "@ingenieria_insoft/ispgen";
import type { TreeViewProps } from "../TreeRowView.svelte";
import { TreeRowAdapter } from "../_asRow/_rowAdapter/02-events";
import { type INode, type ITreeData } from "./_defgen/00-tree-data";
import { TTreeAdapterContext } from "./00-context";

export abstract class TTreeAdapterContract<TListObj extends ITreeData<TListObj> & TObject> extends TTreeAdapterContext<TListObj> {
	disabledNodes: string[] = [];
	flashFlatPaths: string[] = [];
	flashErrorFlatPaths: string[] = [];

	protected getReferenceFlatPath(node: INode<TListObj>): string {
		const id = String(node.flatPath ?? "").trim();
		const idx = id.lastIndexOf(".");
		return idx >= 0 ? id.slice(0, idx) : "";
	}

	protected didNodesExpand = false;
	protected currentNode: INode<TListObj> | null = null;
	protected lastProcessedNode: INode<TListObj> | null = null;
	protected rowAdapters: Map<string, TreeRowAdapter<TListObj>> = new Map();
	uiTick: number = 0;
	protected _uiListeners: Array<() => void> = [];
	addUiListener(fn: () => void): () => void {
		
		this._uiListeners.push(fn);
		return () => { this._uiListeners = this._uiListeners.filter((l) => l !== fn); };
	}
	protected notifyUI(): void {
		this.uiTick++;
		for (const fn of this._uiListeners) fn();
	}

	override onstateupdate(ctx: TreeViewProps<TListObj>): void {
		const prevReadonly = !!this.context.readonly;
		const prevDisabled = !!this.context.disabled;
		const prevDraggable = this.context.draggable !== false;
		super.onstateupdate(ctx);
		const nextReadonly = !!this.context.readonly;
		const nextDisabled = !!this.context.disabled;
		const nextDraggable = this.context.draggable !== false;
		if (prevReadonly !== nextReadonly || prevDisabled !== nextDisabled || prevDraggable !== nextDraggable) {
			this.notifyUI();
		}
	}

	protected lastNodesRef: INode<TListObj>[] = [];
	protected lastObjRefId = "";
	protected flashClearTimer: ReturnType<typeof setTimeout> | undefined;
	protected flashErrorClearTimer: ReturnType<typeof setTimeout> | undefined;

	protected getVisibleFlatPaths(nodes: INode<TListObj>[], expandedSet: Set<string>): string[] {
		const ids: string[] = [];
		const walk = (list: INode<TListObj>[]) => {
			for (const node of list) {
				ids.push(node.flatPath);
				if (node.childrens?.length && expandedSet.has(node.flatPath)) walk(node.childrens);
			}
		};
		walk(nodes);
		return ids;
	}

	toNode(_obj: unknown, _isCopy?: boolean): TListObj { return null as unknown as TListObj; }
	onrefresh(): void { }
	applySelection(_obj: TListObj | null): void { }
	resyncExpandedToCurrentTree(): void { }
	syncAllRowAdapters(): void { }
	syncRowAdaptersByFlatPaths(_ids: ReadonlyArray<string | null | undefined>): void { }

	createNode(_data: TObject): TListObj { return null as unknown as TListObj; }
	get List2Rows(): TObject[] { return []; }
	set List2Rows(_value: TObject[]) { }
	getEditAttrsForLevel(driverAttrs: TObject[], _plan: TListObj): TObject[] { return driverAttrs; }

	canEditSelectResource(plan: TListObj, draft: TListObj): boolean {
		return !!plan?.isAtom || !!draft?.isAtom;
	}
}
