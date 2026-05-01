import { type INode, type ITreeData } from "../_asRow/_rowAdapter/00-base";
import { TATree } from "./03-tree";

export abstract class TAView<Stacker, TWorking extends ITreeData<TWorking>> extends TATree<Stacker, TWorking> {

	
	applySelection(edit: TWorking | null): void {
		const newItem = edit ? this.toNode(edit) : null;
		if (!newItem) {
			this._selectedId = "";
			this._item = null;
			this._originalItem = null;
			return;
		}
		this._selectedId = this.normalizeNodeId(newItem.id);
		this._item = newItem;
		this._originalItem = edit ? this.toNode(edit, true) : null;
	}

	
	resyncExpandedToCurrentTree(): void {
		if (!this._expandedNodes.length) return;
		const seen = new Set<string>();
		const next: INode<TWorking>[] = [];
		for (const stale of this._expandedNodes) {
			const id = this.normalizeNodeId(stale?.id);
			if (!id || seen.has(id)) continue;
			const fresh = this.findNodeById(id);
			if (fresh) {
				seen.add(id);
				next.push(fresh);
			}
		}
		this._expandedNodes = next;
	}

	setSelectedId(id: string, _context?: unknown): void {
		const cleanId = this.normalizeNodeId(id);
		const node = cleanId.length > 0 ? this.findNodeById(cleanId) : null;
		this.selectedId = node;
		this.focusedNode = node;
		this.syncAllRowAdapters();
	}

	expandAll(): void {
		if (!this.rootNodes.length) return;
		const expandableIds = this.collectBranchIds(this.rootNodes);
		const currentIds = this.expandedNodes.map((node) => node.id);
		const nextIds = [...new Set([...currentIds, ...expandableIds])];
		this.expandedNodes = nextIds
			.map((id) => this.findNodeById(id))
			.filter((node): node is INode<TWorking> => !!node);
		this.syncAllRowAdapters();
	}

	collapseAll(): void {
		this.expandedNodes = [];
		this.syncAllRowAdapters();
	}

	expandedNodesAfterToggle(expandedNodes: readonly INode<TWorking>[], id: string, open: boolean): INode<TWorking>[] {
		const needle = this.normalizeNodeId(id);
		const alreadyExpanded = expandedNodes.some((node) => this.normalizeNodeId(node.id) === needle);
		if (open) {
			if (alreadyExpanded) return [...expandedNodes];
			const nextBranch = this.findNodeById(needle);
			return nextBranch ? [...expandedNodes, nextBranch] : [...expandedNodes];
		}
		return expandedNodes.filter((node) => this.normalizeNodeId(node.id) !== needle);
	}

	
	setExpandedNodesFn(nodes: INode<TWorking>[]): void { this.expandedNodes = nodes }

	
	protected restoreExpandedFromSnapshot(ids: string[]): void {
		if (!ids?.length) return;
		const seen = new Set<string>();
		const next: INode<TWorking>[] = [];
		for (const raw of ids) {
			const id = this.normalizeNodeId(raw);
			if (!id || seen.has(id)) continue;
			const fresh = this.findNodeById(id);
			if (fresh) {
				seen.add(id);
				next.push(fresh);
			}
		}
		this._expandedNodes = next;
	}
}
