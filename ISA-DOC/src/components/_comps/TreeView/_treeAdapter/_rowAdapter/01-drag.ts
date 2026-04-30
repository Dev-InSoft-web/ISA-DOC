import type { TObject } from "@ingenieria_insoft/ispgen";
import { TRABase, type ITreeData } from "./00-base";

export abstract class TRADrag<TStacker extends TObject, TWorking extends ITreeData<TWorking> & TObject> extends TRABase<TStacker, TWorking> {
	ondragstart(e: DragEvent) {
		try {
			if (!this.isDraggable) return;
			e.dataTransfer!.effectAllowed = "move";
			e.dataTransfer!.setData("text/plain", this.id);
			TRABase.currentDragNodeId = this.id;
			const sourceSummary = ((e.currentTarget as HTMLElement).closest?.("summary.trvwr-itm-sum") as HTMLElement | null) ?? (e.currentTarget as HTMLElement);
			const sourceHeight = Math.max(24, Math.round(sourceSummary.getBoundingClientRect().height));
			e.dataTransfer!.setData("application/x-trvwr-row-height", String(sourceHeight));
			const details = sourceSummary.closest?.("details.trvwr-itm");
			details?.classList.add("trvwr-itm--dragging");
		} finally {
			this.touchRowUi();
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
			TRABase.currentDragNodeId = "";
		} finally {
			this.touchRowUi();
		}
	}
	onsummarydragenter() {
		try {
			if (this.mergedDisabled) return;
			this.dragEnterCount++;
		} finally {
			this.touchRowUi();
		}
	}
	onsummarydragover(e: DragEvent) {
		try {
			if (this.mergedDisabled) return;
			e.preventDefault();
			e.dataTransfer!.dropEffect = "move";
			if (!this.dragPlaceholderHeight) {
				const encoded = e.dataTransfer?.getData("application/x-trvwr-row-height");
				const parsed = encoded ? Number(encoded) : NaN;
				this.dragPlaceholderHeight = Number.isFinite(parsed) && parsed > 0 ? parsed : 24;
			}
			const sourceId = TRABase.currentDragNodeId || e.dataTransfer?.getData("text/plain") || "";
			if (sourceId && sourceId !== this.id) {
				const srcReference = sourceId.split(".").slice(0, -1).join(".");
				const tgtReference = this.id.split(".").slice(0, -1).join(".");
				this.dragForbidden = srcReference !== tgtReference;
			} else {
				this.dragForbidden = false;
			}
			const summary = e.currentTarget as HTMLElement;
			const rect = summary.getBoundingClientRect();
			const midY = rect.top + rect.height / 2;
			this.dragOver = e.clientY < midY ? "before" : "after";
		} finally {
			this.touchRowUi();
		}
	}
	onsummarydragleave() {
		try {
			this.dragEnterCount--;
			if (this.dragEnterCount <= 0) {
				this.dragOver = null;
				this.dragForbidden = false;
				this.dragEnterCount = 0;
				this.dragPlaceholderHeight = 0;
			}
		} finally {
			this.touchRowUi();
		}
	}
	ondrop(e: DragEvent) {
		try {
			e.preventDefault();
			const sourceId = e.dataTransfer?.getData("text/plain") || TRABase.currentDragNodeId;
			this.dragEnterCount = 0;
			this.dragForbidden = false;
			if (!sourceId || sourceId === this.id || this.mergedDisabled) {
				this.dragOver = null;
				this.dragPlaceholderHeight = 0;
				return;
			}
			this.onrowreorder(sourceId, this.id, this.dragOver || "after");
			this.dragOver = null;
			this.dragPlaceholderHeight = 0;
		} finally {
			this.touchRowUi();
		}
	}
}
