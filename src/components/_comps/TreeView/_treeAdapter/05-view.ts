import { TObject } from "@ingenieria_insoft/ispgen";
import { type INode, type ITreeData } from "./_defgen/00-tree-data";
import { TATreeFlow } from "./04-tree-flow";

export abstract class TAView<TListObj extends ITreeData<TListObj> & TObject> extends TATreeFlow<TListObj> {

	applySelection(edit: TListObj | null): void {
		const newItem = edit ? this.toNode(edit) : null;
		if (!newItem) {
			this._selectedFlatPath = "";
			this.record = null;
			return;
		}
		this._selectedFlatPath = this.normalizeFlatPath(newItem.flatPath);
		this.record = newItem;
	}

	resyncExpandedToCurrentTree(): void {
	}

	setSelectedFlatPath(id: string, _context?: unknown): void {
		const cleanId = this.normalizeFlatPath(id);
		const node = cleanId.length > 0 ? this.findNodeByFlatPath(cleanId) : null;
		this.selectedNode = node;
		this.focusedNode = node;
		this.syncAllRowAdapters();
	}

	protected focusRowByFlatPath(nodeId: string): void {
		if (typeof window === "undefined" || !nodeId) return;
		const attempt = () => {
			const scope = document.querySelector<HTMLElement>(`[data-tree-root="${CSS.escape(this.treeRootId)}"]`);
			if (!scope) return;
			const row = scope.querySelector<HTMLElement>(`[data-flatpath="${CSS.escape(nodeId)}"]`);
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
		const id = this._focusedFlatPath;
		if (!id) return;
		const sel = `[data-tree-root="${CSS.escape(this.treeRootId)}"] [data-flatpath="${CSS.escape(id)}"] > details.trvwr-itm > summary`;
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
		const root = activeSummary.closest(".isp-tree, [data-tree-root]");
		if (!root) return;
		root.querySelectorAll<HTMLElement>("details.trvwr-itm > summary").forEach((s) => {
			if (s !== activeSummary && document.activeElement === s) s.blur();
		});
	}

	commitAndFlash(id: string | undefined): void {
		const clean = this.normalizeFlatPath(id);
		if (clean.length === 0) return;
		this.setSelectedFlatPath?.(clean, this);
		this.flashRowFlatPaths?.([clean], undefined, this);
		this.syncAllRowAdapters();
	}

	flashRowFlatPaths(ids: string[], durationMs: number | undefined = 650, _context?: unknown): void {
		const cleanIds = (ids ?? []).map((x) => this.normalizeFlatPath(x)).filter((c) => c.length > 0);
		this.flashFlatPaths = cleanIds;
		this.flashClearTimer && clearTimeout(this.flashClearTimer);
		this.flashClearTimer = setTimeout(() => {
			this.flashFlatPaths = [];
			this.flashClearTimer = undefined;
		}, durationMs);
	}

	flashRowErrorFlatPaths(ids: string[], durationMs: number | undefined = 650, _context?: unknown): void {
		const cleanIds = (ids ?? []).map((x) => this.normalizeFlatPath(x)).filter((c) => c.length > 0);
		this.flashErrorFlatPaths = cleanIds;
		this.flashErrorClearTimer && clearTimeout(this.flashErrorClearTimer);
		const touch = (touchIds: string[]) => {
			for (const cid of touchIds) {
				const ra = this.rowAdapters.get(cid);
				ra?.requestRowUiSyncPublic?.();
			}
		};
		touch(cleanIds);
		this.flashErrorClearTimer = setTimeout(() => {
			const prev = this.flashErrorFlatPaths;
			this.flashErrorFlatPaths = [];
			this.flashErrorClearTimer = undefined;
			touch(prev);
		}, durationMs);
	}

	expandAll(): void {
		if (!this.rootNodes.length) return;
		const expandableIds = this.collectBranchIds(this.rootNodes);
		const currentIds = this.expandedNodes.map((node) => node.flatPath);
		const nextIds = [...new Set([...currentIds, ...expandableIds])];
		this.expandedNodes = nextIds
			.map((id) => this.findNodeByFlatPath(id))
			.filter((node): node is INode<TListObj> => !!node);
		this.syncAllRowAdapters();
	}

	collapseAll(): void {
		this.expandedNodes = [];
		this.syncAllRowAdapters();
	}

	expandedNodesAfterToggle(expandedNodes: readonly INode<TListObj>[], id: string, open: boolean): INode<TListObj>[] {
		const needle = this.normalizeFlatPath(id);
		const alreadyExpanded = expandedNodes.some((node) => this.normalizeFlatPath(node.flatPath) === needle);
		if (open) {
			if (alreadyExpanded) return [...expandedNodes];
			const nextBranch = this.findNodeByFlatPath(needle);
			return nextBranch ? [...expandedNodes, nextBranch] : [...expandedNodes];
		}
		return expandedNodes.filter((node) => this.normalizeFlatPath(node.flatPath) !== needle);
	}

	setExpandedNodesFn(nodes: INode<TListObj>[]): void { this.expandedNodes = nodes }

	protected restoreExpandedFromSnapshot(ids: string[]): void {
		if (!ids?.length) return;
		this.expandedFlatPaths = ids;
	}
}
