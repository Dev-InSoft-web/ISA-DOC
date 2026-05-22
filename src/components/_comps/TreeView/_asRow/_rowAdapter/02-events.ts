import type { TObject } from "@ingenieria_insoft/ispgen";
import { TRADrag } from "./01-drag";
import type { ITreeData } from "./00-base";

export class TreeRowAdapter<TListObj extends ITreeData<TListObj> & TObject> extends TRADrag<TListObj> {
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
				this.rowNode && this.treeAdapter.onrowfocus(this.rowNode);
				summaryEl.focus({ preventScroll: true });
				return;
			}
			this.rowNode && this.treeAdapter.onrowfocus(this.rowNode);
			this.rowNode && this.treeAdapter.onrowclick(this.rowNode);
			this.effectiveRowConfig?.events?.onclick?.();
			summaryEl.focus({ preventScroll: true });
		} finally {
			this.requestRowUiSync();
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
			this.rowNode && this.treeAdapter.onrowdblclick(this.rowNode);
		} finally {
			this.requestRowUiSync();
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
			this.requestRowUiSync();
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
			const hasMods = e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
			let handledByDefault = false;
			if (!hasMods) {
				switch (e.code) {
					case "ArrowDown":
						e.preventDefault();
						handledByDefault = true;
						if (currentIdx >= 0 && currentIdx < visibleSummaries.length - 1) {
							this.focusSummary(visibleSummaries[currentIdx + 1]);
						}
						break;
					case "ArrowUp":
						e.preventDefault();
						handledByDefault = true;
						if (currentIdx > 0) this.focusSummary(visibleSummaries[currentIdx - 1]);
						break;
					case "ArrowRight":
						e.preventDefault();
						handledByDefault = true;
						if (this.hasChildren && !this.isNodeOpen) this.onrowtoggle(true);
						break;
					case "ArrowLeft":
						e.preventDefault();
						handledByDefault = true;
						if (this.hasChildren && this.isNodeOpen) this.onrowtoggle(false);
						break;
					case "Home":
						e.preventDefault();
						handledByDefault = true;
						visibleSummaries.length && this.focusSummary(visibleSummaries[0]);
						break;
					case "End":
						e.preventDefault();
						handledByDefault = true;
						visibleSummaries.length && this.focusSummary(visibleSummaries[visibleSummaries.length - 1]);
						break;
				}
			}
			if (handledByDefault) return;
			const ta = this.treeAdapter;
			const parts: string[] = [];
			if (e.ctrlKey) parts.push("Ctrl");
			if (e.shiftKey) parts.push("Shift");
			if (e.altKey) parts.push("Alt");
			parts.push(e.code);
			const combo = parts.join("+");
			const cfg = this.effectiveRowConfig;
			const rt = ta.buildCustomsRuntime();
			const toolbarActions = ta.customs?.topMenuActions?.(rt);
			const buttonHandler = ta.findHotkeyHandler([cfg?.actions, cfg?.cascadeOptions, toolbarActions], combo);
			if (buttonHandler && this.rowNode) {
				e.preventDefault();
				e.stopPropagation();
				buttonHandler();
				return;
			}
			const hotkeys = ta.customs?.hotkeys as Record<string, (record: TListObj, tree: unknown, e: KeyboardEvent) => void> | undefined;
			if (!hotkeys) return;
			const handler = hotkeys[combo];
			if (!handler || !this.rowNode) return;
			e.preventDefault();
			e.stopPropagation();
			const runtime = ta.buildCustomsRuntime();
			handler(this.rowNode as TListObj, runtime, e);
		} finally {
			this.requestRowUiSync();
		}
	}
	onsummaryfocus(e: FocusEvent) {
		try {
			const summaryEl = e.currentTarget as HTMLElement;
			this.treeAdapter.blurTreeSummariesExcept(summaryEl);
			this.rowNode && this.treeAdapter.onrowfocus(this.rowNode);
			this.effectiveRowConfig?.events?.onfocus?.();
		} finally {
			this.requestRowUiSync();
		}
	}
	onsummaryblur() {
		try {
			this.effectiveRowConfig?.events?.onblur?.();
		} finally {
			this.requestRowUiSync();
		}
	}
	onsummarypointerenter() {
		const ta = this.treeAdapter;
		if (!this.rowNode) return;
		const prevFlatPath = ta.hoveredNode ? ta.normalizeFlatPath(ta.hoveredNode.flatPath) : "";
		if (prevFlatPath === this.flatPath) return;
		ta.hoveredNode = this.rowNode;
		ta.syncRowAdaptersByFlatPaths([prevFlatPath, this.flatPath]);
	}
	onsummarypointerleave() {
		const ta = this.treeAdapter;
		const prevFlatPath = ta.hoveredNode ? ta.normalizeFlatPath(ta.hoveredNode.flatPath) : "";
		if (prevFlatPath !== this.flatPath) return;
		ta.hoveredNode = null;
		ta.syncRowAdaptersByFlatPaths([prevFlatPath]);
	}
}
