import { TRADrag } from "./01-drag";
import type { ITreeData } from "./00-base";

export class TreeRowAdapter<TStacker, TWorking extends ITreeData<TWorking>> extends TRADrag<TStacker, TWorking> {
	onsummaryclick(e: MouseEvent) {
		try {
			const summaryEl = e.currentTarget as HTMLElement;
			if (this.mergedDisabled) {
				e.preventDefault();
				return;
			}
			this.treeAdapter.blurTreeSummariesExcept(summaryEl);
			const target = e.target as HTMLElement | null;
			if (target?.closest(".trvwr-drag-handle")) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			const clickedSymbol = target?.closest(".trvwr-itm-symb");
			if (this.hasChildren) {
				e.preventDefault();
				clickedSymbol && this.onrowtoggle(!this.isNodeOpen);
			}
			if (clickedSymbol) {
				this.rowNode && this.onrowfocus(this.rowNode);
				summaryEl.focus({ preventScroll: true });
				return;
			}
			this.rowNode && this.onrowfocus(this.rowNode);
			this.onrowclick();
			this.effectiveRowConfig?.events?.onclick?.();
			summaryEl.focus({ preventScroll: true });
		} finally {
			this.touchRowUi();
		}
	}
	onsummarydblclick(e: MouseEvent) {
		try {
			if (this.mergedDisabled) {
				e.preventDefault();
				return;
			}
			const target = e.target as HTMLElement | null;
			if (target?.closest(".trvwr-itm-symb")) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			this.onrowdblclick();
		} finally {
			this.touchRowUi();
		}
	}
	ondetailstoggle(e: Event) {
		try {
			const el = e.currentTarget as HTMLDetailsElement;
			if (this.mergedDisabled) {
				el.open = this.isNodeOpen;
				return;
			}
			if (el.open !== this.isNodeOpen) {
				this.onrowtoggle(el.open);
				if (el.open) this.effectiveRowConfig?.events?.onopen?.();
				else this.effectiveRowConfig?.events?.onclose?.();
			}
		} finally {
			this.touchRowUi();
		}
	}
	onkeydown(e: KeyboardEvent) {
		try {
			if (document.activeElement !== e.currentTarget) return;
			const treeItem = (e.currentTarget as HTMLElement).closest?.("details.trvwr-itm") as HTMLDetailsElement | null;
			if (!treeItem) return;
			const visibleSummaries = this.getVisibleSummaries(treeItem);
			const currentSummary = e.currentTarget as HTMLElement;
			const currentIdx = visibleSummaries.indexOf(currentSummary);
			switch (e.code) {
				case "ArrowDown": {
					e.preventDefault();
					if (e.ctrlKey && e.shiftKey) {
						if (!this.treeAdapter.disabled) void this.treeAdapter.handleaddsibling(this.id, "below");
					} else if (e.ctrlKey) {
						const ta = this.treeAdapter;
						void ta.move(this.id, "down").then((newId) => ta.commitAndFlash(newId));
					} else if (currentIdx >= 0 && currentIdx < visibleSummaries.length - 1) {
						this.focusSummary(visibleSummaries[currentIdx + 1]);
					}
					break;
				}
				case "ArrowUp": {
					e.preventDefault();
					if (e.ctrlKey && e.shiftKey) {
						if (!this.treeAdapter.disabled) void this.treeAdapter.handleaddsibling(this.id, "above");
					} else if (e.ctrlKey) {
						const ta = this.treeAdapter;
						void ta.move(this.id, "up").then((newId) => ta.commitAndFlash(newId));
					} else if (currentIdx > 0) {
						this.focusSummary(visibleSummaries[currentIdx - 1]);
					}
					break;
				}
				case "ArrowRight":
					if (this.hasChildren && !this.isNodeOpen) this.onrowtoggle(true);
					e.preventDefault();
					break;
				case "ArrowLeft":
					if (this.hasChildren && this.isNodeOpen) this.onrowtoggle(false);
					e.preventDefault();
					break;
				case "Home":
					e.preventDefault();
					visibleSummaries.length && this.focusSummary(visibleSummaries[0]);
					break;
				case "End":
					e.preventDefault();
					visibleSummaries.length && this.focusSummary(visibleSummaries[visibleSummaries.length - 1]);
					break;
				case "Delete": {
					e.preventDefault();
					!this.treeAdapter.disabled && this.onrowdelete();
					break;
				}
				case "Enter": {
					e.preventDefault();
					e.stopPropagation();
					if (e.ctrlKey) {
						this.rowNode && this.treeAdapter.onCtrlEnter(this.rowNode);
					} else {
						this.onrowdblclick();
					}
					break;
				}
			}
		} finally {
			this.touchRowUi();
		}
	}
	onsummaryfocus(e: FocusEvent) {
		try {
			if (this.treeAdapter.bLostFocus) {
				this.effectiveRowConfig?.events?.onfocus?.();
				return;
			}
			const summaryEl = e.currentTarget as HTMLElement;
			this.treeAdapter.blurTreeSummariesExcept(summaryEl);
			this.rowNode && this.onrowfocus(this.rowNode);
			this.effectiveRowConfig?.events?.onfocus?.();
		} finally {
			this.touchRowUi();
		}
	}
	onsummaryblur() {
		try {
			this.effectiveRowConfig?.events?.onblur?.();
		} finally {
			this.touchRowUi();
		}
	}
	onsummarypointerenter() {
		const ta = this.treeAdapter;
		if (!this.rowNode) return;
		const cur = ta.hoveredNode ? ta.normalizeNodeId(ta.hoveredNode.id) : "";
		if (cur === this.id) return;
		ta.hoveredNode = this.rowNode;
		ta.syncAllRowAdapters();
	}
	onsummarypointerleave() {
		const ta = this.treeAdapter;
		const cur = ta.hoveredNode ? ta.normalizeNodeId(ta.hoveredNode.id) : "";
		if (cur !== this.id) return;
		ta.hoveredNode = null;
		ta.syncAllRowAdapters();
	}
	
	onlongpress() {
		if (this.mergedDisabled) return;
		this.onrowdblclick();
		this.touchRowUi();
	}
	onpointerdown(e: PointerEvent) {
		if (e.pointerType !== "touch") return;
		const target = e.target as HTMLElement | null;
		if (target?.closest(".trvwr-drag-handle")) return;
		if (this.longPressTimer) clearTimeout(this.longPressTimer);
		this.longPressTimer = setTimeout(() => {
			this.longPressTimer = undefined;
			this.onlongpress();
		}, 500);
	}
	onpointerup() {
		if (this.longPressTimer) {
			clearTimeout(this.longPressTimer);
			this.longPressTimer = undefined;
		}
	}
}
