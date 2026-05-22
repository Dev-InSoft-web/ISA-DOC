import { TObject } from "@ingenieria_insoft/ispgen";
import type { TreeViewProps } from "../TreeRowView.svelte";
import { type INode, type ITreeData } from "./_defgen/00-tree-data";

export class TTreeAdapterContext<TListObj extends ITreeData<TListObj> & TObject> {
	protected readonly context: TreeViewProps<TListObj>;

	onstateupdate(ctx: TreeViewProps<TListObj>): void {
		Object.defineProperties(this.context, Object.getOwnPropertyDescriptors(ctx));
	}

	private static _rootIdSeq = 0;
	readonly treeRootId: string = `tree-${++TTreeAdapterContext._rootIdSeq}`;

	bshowFrm = false;
	bLostFocus = false;

	protected _selectedFlatPath = "";
	protected _focusedFlatPath = "";
	protected _hoveredFlatPath = "";
	record: INode<TListObj> | null = null;
	protected _pendingDeleteFlatPath = "";
	protected _pendingDeleteSnapshot: { prevVisibleIds: string[]; prevDeleteIdx: number } | null = null;
	protected _lastProcessedObj: TListObj | null = null;
	protected _expandedFlatPaths: string[] = [];
	protected _treeNodes: INode<TListObj>[] = [];

	bcanMoveOutside: boolean | ((src: INode<TListObj>, target: INode<TListObj>, position: "before" | "after" | "into") => boolean) = true;

	constructor(
		props: TreeViewProps<TListObj>,
		restProps?: Partial<TreeViewProps<TListObj>>,
		syncProps?: Partial<TreeViewProps<TListObj>>,
	) {
		this.context = { ...props, ...(restProps ?? {}), ...(syncProps ?? {}) } as TreeViewProps<TListObj>;
	}

	get disabled(): boolean { return !!this.context.disabled }
	set disabled(value: boolean) { this.context.disabled = !!value }

	get selectedNode(): INode<TListObj> | null {
		return this.findNodeByFlatPath(this._selectedFlatPath)
	}
	set selectedNode(value: INode<TListObj> | null) { this._selectedFlatPath = value == null ? "" : this.normalizeFlatPath(value.flatPath) }

	get focusedNode(): INode<TListObj> | null {
		return this.findNodeByFlatPath(this._focusedFlatPath)
	}
	set focusedNode(value: INode<TListObj> | null) { this._focusedFlatPath = value == null ? "" : this.normalizeFlatPath(value.flatPath) }

	get hoveredNode(): INode<TListObj> | null {
		return this.findNodeByFlatPath(this._hoveredFlatPath)
	}
	set hoveredNode(value: INode<TListObj> | null) { this._hoveredFlatPath = value == null ? "" : this.normalizeFlatPath(value.flatPath) }

	get rootNodes(): INode<TListObj>[] { return this._treeNodes }
	get treeNodes(): INode<TListObj>[] { return this._treeNodes }
	set treeNodes(value: INode<TListObj>[]) { this._treeNodes = value }

	get expandedNodes(): INode<TListObj>[] {
		const seen = new Set<string>();
		const out: INode<TListObj>[] = [];
		for (const id of this._expandedFlatPaths) {
			if (!id || seen.has(id)) continue;
			const node = this.findNodeByFlatPath(id);
			if (node) { seen.add(id); out.push(node); }
		}
		return out;
	}
	set expandedNodes(value: INode<TListObj>[]) {
		const seen = new Set<string>();
		const ids: string[] = [];
		for (const node of value || []) {
			const id = this.normalizeFlatPath(node?.flatPath);
			if (!id || seen.has(id)) continue;
			seen.add(id); ids.push(id);
		}
		this._expandedFlatPaths = ids;
	}

	get expandedFlatPaths(): string[] { return [...this._expandedFlatPaths] }
	set expandedFlatPaths(value: string[]) {
		const seen = new Set<string>();
		const ids: string[] = [];
		for (const raw of value || []) {
			const id = this.normalizeFlatPath(raw);
			if (!id || seen.has(id)) continue;
			seen.add(id); ids.push(id);
		}
		this._expandedFlatPaths = ids;
	}

	get isReadOnly(): boolean { return !!this.context.readonly }
	get canMutate(): boolean { return !this.isReadOnly }
	get canCreate(): boolean { return this.context.bAllowed?.Crear ?? true }
	get canModify(): boolean { return this.context.bAllowed?.Modificar ?? true }
	get canDelete(): boolean { return this.context.bAllowed?.Eliminar ?? true }
	get draggable(): boolean { return this.context.draggable !== false }

	normalizeFlatPath(_id: unknown): string { return ""; }
	findNodeByFlatPath(_id: string, _branches?: INode<TListObj>[]): INode<TListObj> | null { return null; }
}
