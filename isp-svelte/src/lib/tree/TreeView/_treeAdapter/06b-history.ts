import { TObject } from "@ingenieria_insoft/ispgen";
import { type ITreeData } from "./_defgen/00-tree-data";
import { TAMutations } from "./06-mutations";

const HISTORY_LIMIT = 50;

export abstract class TAHistory<TListObj extends ITreeData<TListObj> & TObject> extends TAMutations<TListObj> {
	private _historyPast: string[] = [];
	private _historyFuture: string[] = [];
	private _historySuspended = 0;
	private _historyViewingPast = false;
	private _protectionMode = false;
	private _protectionPromptOpen = false;

	get historyCanUndo(): boolean { return this._historyPast.length > 0; }
	get historyCanRedo(): boolean { return this._historyFuture.length > 0; }
	get historyIsViewingPast(): boolean { return this._historyViewingPast; }

	get isProtected(): boolean { return this._protectionMode || this._historyViewingPast; }
	get isProtectionPromptOpen(): boolean { return this._protectionPromptOpen; }
	
	get isReadOnlyExternal(): boolean { return super.isReadOnly; }
	
	get canToggleProtection(): boolean { return !super.isReadOnly; }

	get isReadOnly(): boolean { return super.isReadOnly || this._historyViewingPast; }

	override get canMutate(): boolean { return !this.isReadOnly && !this._protectionMode; }

	protectionToggle(): void {
		if (this.isProtected) { this.confirmProtectionRelease(); return; }
		if (!this.canToggleProtection) return;
		this._protectionMode = true;
		this.notifyUI();
	}

	setProtected(v: boolean): void {
		const next = !!v;
		if (this._protectionMode === next) return;
		this._protectionMode = next;
		if (!next) this._protectionPromptOpen = false;
		this.notifyUI();
	}

	requestProtectionRelease(): void {
		if (!this.isProtected) return;
		this._protectionPromptOpen = true;
		this.notifyUI();
	}

	confirmProtectionRelease(): void {
		this._protectionMode = false;
		this._historyViewingPast = false;
		this._protectionPromptOpen = false;
		this.notifyUI();
	}

	dismissProtectionPrompt(): void {
		this._protectionPromptOpen = false;
		this.notifyUI();
	}

	private historySnapshotList(): string {
		try {
			const list = (this.List2Rows ?? []) as ReadonlyArray<TObject>;
			return JSON.stringify(list.map((p) => (typeof (p as { toJSON?: () => unknown })?.toJSON === "function" ? (p as { toJSON: () => unknown }).toJSON() : p)));
		} catch {
			try { return JSON.stringify(this.List2Rows ?? []); } catch { return "[]"; }
		}
	}

	private historyRestoreList(snapshot: string): void {
		try {
			const parsed = JSON.parse(snapshot) as Array<Record<string, unknown>>;
			const items = (Array.isArray(parsed) ? parsed : []).map((data) => this.toNode(data as Partial<TListObj>));
			this.List2Rows = items as unknown as TObject[];
			this.onrefresh();
			this.resyncExpandedToCurrentTree();
			this.syncAllRowAdapters();
			this.notifyUI();
		} catch (e) {
			const msg = e instanceof Error ? `\r\n${e.message}` : "";
			this.onError?.("No se pudo restaurar el estado del árbol." + msg);
		}
	}

	historyPush(): void {
		if (this._historySuspended > 0) return;
		const snap = this.historySnapshotList();
		const top = this._historyPast.length > 0 ? this._historyPast[this._historyPast.length - 1] : null;
		if (top === snap) return;
		this._historyPast.push(snap);
		if (this._historyPast.length > HISTORY_LIMIT) this._historyPast.shift();
		this._historyFuture = [];
		this._historyViewingPast = false;
		this.notifyUI();
	}

	historyUndo(): void {
		if (!this.historyCanUndo) return;
		const present = this.historySnapshotList();
		const prev = this._historyPast.pop();
		if (prev == null) return;
		this._historyFuture.push(present);
		this._historyViewingPast = true;
		this._historySuspended++;
		try { this.historyRestoreList(prev); } finally { this._historySuspended--; }
		this.notifyUI();
	}

	historyRedo(): void {
		if (!this.historyCanRedo) return;
		const present = this.historySnapshotList();
		const next = this._historyFuture.pop();
		if (next == null) return;
		this._historyPast.push(present);
		this._historyViewingPast = this._historyFuture.length > 0;
		this._historySuspended++;
		try { this.historyRestoreList(next); } finally { this._historySuspended--; }
		this.notifyUI();
	}

	historyRedoAll(): void {
		if (!this.historyCanRedo) return;
		this._historySuspended++;
		try {
			while (this._historyFuture.length > 0) {
				const present = this.historySnapshotList();
				const next = this._historyFuture.pop();
				if (next == null) break;
				this._historyPast.push(present);
				this.historyRestoreList(next);
			}
		} finally { this._historySuspended--; }
		this._historyViewingPast = false;
		this.notifyUI();
	}

	historyRecover(): void {
		this._historyFuture = [];
		this._historyViewingPast = false;
		this.notifyUI();
	}

	historyClear(): void {
		this._historyPast = [];
		this._historyFuture = [];
		this._historyViewingPast = false;
		this.notifyUI();
	}
}
