import { type INode, type ITreeData } from "./_rowAdapter/00-base";
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
		this.focusedRowId = node;
		this.syncAllRowAdapters();
	}

	
	protected focusRowById(nodeId: string): void {
		if (typeof window === "undefined" || !nodeId) return;
		const attempt = () => {
			const row = document.querySelector<HTMLElement>(`[data-idrow="${CSS.escape(nodeId)}"]`);
			const summary = row?.querySelector<HTMLElement>("details.trvwr-itm > summary") || null;
			if (!summary) return;
			this.blurTreeSummariesExcept(summary);
			summary.focus();
		};
		queueMicrotask(attempt);
		requestAnimationFrame(attempt);
	}

	
	refocusFocusedRowSummary(): void {
		if (typeof window === "undefined") return;
		const id = this._focusedRowId;
		if (!id) return;
		const sel = `[data-tree-row-id="${CSS.escape(id)}"] > details.trvwr-itm > summary`;
		const tryFocus = (): boolean => {
			const summary = document.querySelector<HTMLElement>(sel);
			if (!summary) return false;
			if (!summary.hasAttribute("tabindex")) summary.setAttribute("tabindex", "-1");
			summary.focus({ preventScroll: false });
			return document.activeElement === summary;
		};
		let attempts = 0;
		const tick = () => {
			if (tryFocus()) return;
			if (++attempts < 6) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}

	
	blurTreeSummariesExcept(activeSummary: HTMLElement): void {
		if (!activeSummary) return;
		const root = activeSummary.closest(".isp-tree");
		if (!root) return;
		root.querySelectorAll<HTMLElement>("details.trvwr-itm > summary").forEach((s) => {
			if (s !== activeSummary && document.activeElement === s) s.blur();
		});
	}

	
	commitAndFlash(id: string | undefined): void {
		const clean = this.normalizeNodeId(id);
		if (clean.length === 0) return;
		this.setSelectedId?.(clean, this);
		this.flashRowIds?.([clean], undefined, this);
		this.syncAllRowAdapters();
	}

	flashRowIds(ids: string[], durationMs: number | undefined = 650, _context?: unknown): void {
		const cleanIds = (ids ?? []).map((x) => this.normalizeNodeId(x)).filter((c) => c.length > 0);
		this.flashIds = cleanIds;
		this.flashClearTimer && clearTimeout(this.flashClearTimer);
		this.flashClearTimer = setTimeout(() => {
			this.flashIds = [];
			this.flashClearTimer = undefined;
		}, durationMs);
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
