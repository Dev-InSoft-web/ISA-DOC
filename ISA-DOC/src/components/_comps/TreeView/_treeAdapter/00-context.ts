import type { TreeViewProps } from "../TreeRowView.svelte";
import { ComplexControl } from "./00-complex-control";
import { type INode, type ITreeData } from "./_rowAdapter/00-base";

export abstract class TTreeAdapterContext<Stacker, TWorking extends ITreeData<TWorking>> extends ComplexControl<TreeViewProps<Stacker, TWorking>> {
	bshowFrm = false;

	protected _selectedId = "";
	protected _focusedRowId = "";
	protected _hoveredRowId = "";
	protected _item: TWorking | null = null;
	protected _originalItem: TWorking | null = null;
	protected _pendingDeleteNodeId = "";
	protected _pendingDeleteSnapshot: { prevVisibleIds: string[]; prevDeleteIdx: number } | null = null;
	protected _lastProcessedObj: unknown = undefined;
	protected _expandedNodes: INode<TWorking>[] = [];
	protected _treeNodes: INode<TWorking>[] = [];

	constructor(
		props: TreeViewProps<Stacker, TWorking>,
		restProps?: Partial<TreeViewProps<Stacker, TWorking>>,
		syncProps?: Partial<TreeViewProps<Stacker, TWorking>>,
	) {
		super({ ...props, ...(restProps ?? {}), ...(syncProps ?? {}) } as TreeViewProps<Stacker, TWorking>);
	}

	get disabled(): boolean { return !!this.context.disabled }
	set disabled(value: boolean) { this.context.disabled = !!value }

	get selectedId(): INode<TWorking> | null {
		return this.findNodeById(this._selectedId)
	}
	set selectedId(value: INode<TWorking> | null) { this._selectedId = value == null ? "" : this.normalizeNodeId(value.id) }

	get focusedRowId(): INode<TWorking> | null {
		return this.findNodeById(this._focusedRowId)
	}
	set focusedRowId(value: INode<TWorking> | null) { this._focusedRowId = value == null ? "" : this.normalizeNodeId(value.id) }

	get hoveredRowId(): INode<TWorking> | null {
		return this.findNodeById(this._hoveredRowId)
	}
	set hoveredRowId(value: INode<TWorking> | null) { this._hoveredRowId = value == null ? "" : this.normalizeNodeId(value.id) }

	get item(): TWorking | null { return this._item }
	set item(value: TWorking | null) { this._item = value }

	get objWorking(): INode<TWorking> | null {
		const current = this._item;
		if (!current) return null;
		return this.findNodeById(current.id) ?? null
	}
	set objWorking(value: INode<TWorking> | null) { this._item = value?.obj ?? null }

	get rootNodes(): INode<TWorking>[] { return this._treeNodes }
	get treeNodes(): INode<TWorking>[] { return this._treeNodes }
	set treeNodes(value: INode<TWorking>[]) { this._treeNodes = value }

	get expandedNodes(): INode<TWorking>[] { return this._expandedNodes }
	set expandedNodes(value: INode<TWorking>[]) { this._expandedNodes = value || [] }

	get itdForm() { return this.context.itdForm }
	get isViewMode(): boolean { return this.context.itdForm === "view" }
	get isReadOnly(): boolean { return !!this.context.readonly }
	get bdrag(): boolean { return this.context.bdrag !== false }
	get bLostFocus(): boolean { return !!this.context.bLostFocus }
	get isBrapido(): boolean { return !!this.context.brapido }
	get bcanMoveOutside(): boolean | ((source: INode<TWorking>, target: INode<TWorking>, position: "before" | "after") => boolean) {
		return (this.context as any).bcanMoveOutside ?? false;
	}

	
	get addReferenceId(): string { return this.context.addReferenceId || ""; }
	set addReferenceId(value: string | null) { this.context.addReferenceId = value; }

	
	get lastLevelSelectorOpen(): boolean { return !!this.context.resourceSelectorOpen; }
	set lastLevelSelectorOpen(value: boolean) { this.context.resourceSelectorOpen = value; }

	abstract normalizeNodeId(id: unknown): string;
	abstract findNodeById(id: string, branches?: INode<TWorking>[]): INode<TWorking> | null;
}
