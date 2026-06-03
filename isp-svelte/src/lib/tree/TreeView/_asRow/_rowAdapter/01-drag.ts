import type { TObject } from "@ingenieria_insoft/ispgen";
import { TRABase, type ITreeData } from "./00-base";

export class TRADrag<TListObj extends ITreeData<TListObj> & TObject> extends TRABase<TListObj> {
	private _lastDragOverKey = "";
	private _cachedSummaryRect: { top: number; height: number } | null = null;
	private _syncRafId = 0;
	private requestRowUiSyncRaf(): void {
		if (this._syncRafId) return;
		this._syncRafId = requestAnimationFrame(() => {
			this._syncRafId = 0;
			this.requestRowUiSync();
		});
	}
	get shouldFlash() { return !!this.flatPath && (this.treeAdapter.flashFlatPaths ?? []).includes(this.flatPath) }
	get shouldFlashError() { return !!this.flatPath && (this.treeAdapter.flashErrorFlatPaths ?? []).includes(this.flatPath) }
	ondragstart(e: DragEvent) {
		try {
			if (!this.isDraggable) {
				e.preventDefault();
				this.treeAdapter.flashRowErrorFlatPaths([this.flatPath]);
				return;
			}
			e.dataTransfer!.effectAllowed = "move";
			e.dataTransfer!.setData("text/plain", this.flatPath);
			this.treeAdapter.currentDragFlatPath = this.flatPath;
			const sourceSummary = ((e.currentTarget as HTMLElement).closest?.("summary.trvwr-itm-sum") as HTMLElement | null) ?? (e.currentTarget as HTMLElement);
			const sourceHeight = Math.max(24, Math.round(sourceSummary.getBoundingClientRect().height));
			e.dataTransfer!.setData("application/x-trvwr-row-height", String(sourceHeight));
			const details = sourceSummary.closest?.("details.trvwr-itm");
			details?.classList.add("trvwr-itm--dragging");
		} finally {
			this.requestRowUiSync();
		}
	}
	ondragend(e: DragEvent) {
		try {
			const sourceSummary = ((e.currentTarget as HTMLElement).closest?.("summary.trvwr-itm-sum") as HTMLElement | null) ?? (e.currentTarget as HTMLElement);
			const details = sourceSummary.closest?.("details.trvwr-itm");
			details?.classList.remove("trvwr-itm--dragging");
			this.dragOver = null;
			this.dragForbidden = false;
			this.dragEnterCount = 0;
			this.dragPlaceholderHeight = 0;
			this._lastDragOverKey = "";
			this._cachedSummaryRect = null;
			this.treeAdapter.currentDragFlatPath = "";
		} finally {
			this.requestRowUiSync();
		}
	}
	onsummarydragenter() {
		try {
			if (this.mergedDisabled) return;
			this.dragEnterCount++;
			this._cachedSummaryRect = null;
		} finally {
			this.requestRowUiSync();
		}
	}
	onsummarydragover(e: DragEvent) {
		if (this.mergedDisabled) return;
		e.preventDefault();
		e.dataTransfer!.dropEffect = "move";
		const sourceFlatPath = this.treeAdapter.currentDragFlatPath;
		if (sourceFlatPath && sourceFlatPath === this.flatPath) {
			if (this.dragOver === null && !this.dragForbidden && !this.dragPlaceholderHeight) return;
			this.dragOver = null;
			this.dragForbidden = false;
			this.dragPlaceholderHeight = 0;
			this._lastDragOverKey = "";
			this.requestRowUiSyncRaf();
			return;
		}
		if (!this.dragPlaceholderHeight) {
			const encoded = e.dataTransfer?.getData("application/x-trvwr-row-height");
			const parsed = encoded ? Number(encoded) : NaN;
			this.dragPlaceholderHeight = Number.isFinite(parsed) && parsed > 0 ? parsed : 24;
		}
		let rect = this._cachedSummaryRect;
		if (!rect) {
			const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
			rect = { top: r.top, height: r.height };
			this._cachedSummaryRect = rect;
		}
		const node = this.rowNode;
		const isGrouper = !!node && this.treeAdapter.isGrouper(node);
		let nextOver: "before" | "after" | "into";
		if (isGrouper) {
			const y = e.clientY - rect.top;
			const topBand = rect.height * 0.25;
			const bottomBand = rect.height * 0.75;
			nextOver = y < topBand ? "before" : y > bottomBand ? "after" : "into";
		} else {
			const midY = rect.top + rect.height / 2;
			nextOver = e.clientY < midY ? "before" : "after";
		}
		const key = `${sourceFlatPath}|${nextOver}`;
		if (key === this._lastDragOverKey) return;
		this._lastDragOverKey = key;
		this.dragOver = nextOver;
		this.dragForbidden = sourceFlatPath ? !this.treeAdapter.canDrop(sourceFlatPath, this.flatPath, nextOver) : false;
		this.requestRowUiSyncRaf();
	}
	onsummarydragleave() {
		try {
			this.dragEnterCount--;
			if (this.dragEnterCount <= 0) {
				this.dragOver = null;
				this.dragForbidden = false;
				this.dragEnterCount = 0;
				this.dragPlaceholderHeight = 0;
				this._lastDragOverKey = "";
				this._cachedSummaryRect = null;
			}
		} finally {
			this.requestRowUiSync();
		}
	}
	ondrop(e: DragEvent) {
		try {
			e.preventDefault();
			const sourceFlatPath = e.dataTransfer?.getData("text/plain") || this.treeAdapter.currentDragFlatPath;
			const wasForbidden = this.dragForbidden;
			const pos = this.dragOver;
			this.dragEnterCount = 0;
			this.dragForbidden = false;
			this._lastDragOverKey = "";
			this._cachedSummaryRect = null;
			if (!sourceFlatPath || sourceFlatPath === this.flatPath || this.mergedDisabled || wasForbidden || !pos) {
				this.dragOver = null;
				this.dragPlaceholderHeight = 0;
				if (wasForbidden) {
					const flatPaths = sourceFlatPath && sourceFlatPath !== this.flatPath ? [sourceFlatPath, this.flatPath] : [this.flatPath];
					this.treeAdapter.flashRowErrorFlatPaths(flatPaths);
				}
				return;
			}
			this.treeAdapter.onrowreorder(sourceFlatPath, this.flatPath, pos);
			this.dragOver = null;
			this.dragPlaceholderHeight = 0;
		} finally {
			this.requestRowUiSync();
		}
	}
}
