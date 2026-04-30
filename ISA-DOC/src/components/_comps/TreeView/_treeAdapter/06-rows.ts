import type { ButtonIconifyProps, ComponentColor, IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsAction } from "../../Options/FlexOptions.svelte";
import { TreeRowAdapter } from "./_rowAdapter/02-events";
import { type INode, type ITreeData } from "./_rowAdapter/00-base";
import type { RowItemProps } from "../_rowItem.svelte";
import { TAMutations } from "./05-mutations";

type CascadeOptionsInput = FlexOptionsAction;

export abstract class TreeAdapter<Stacker, TWorking extends ITreeData<TWorking>> extends TAMutations<Stacker, TWorking> {

	onrowclick(node: INode<TWorking>): void {
		this._selectedId = this.normalizeNodeId(node.id);
		this._item = node.obj;
		this._originalItem = this.toNode(node.obj, true);
		this.onrefresh();
	}

	onrowdblclick(node: INode<TWorking>): void {
		if (this.isViewMode) this.openViewNode(node);
		else this.openEdit(node);
	}

	onrowfocus(node: INode<TWorking>): void {
		this.focusedRowId = node;
		this.syncAllRowAdapters();
	}

	onrowtoggle(_node: INode<TWorking>): void { }

	onrowdelete(node: INode<TWorking>): void {
		if (!this.requestDelete(node)) return;
		this.ondeleteconfirmed();
	}

	onrowreorder(sourceId: string, targetId: string, position: "before" | "after"): void {
		const newId = this.reorder(sourceId, targetId, position);
		this.commitAndFlash(newId);
	}

	onCtrlEnter(_node: INode<TWorking>): void { }

	onswipeopendrawer(): void {
		const nodeId = this._selectedId || this.rootNodes[0]?.id || "";
		const node = nodeId ? this.findNodeById(nodeId) : null;
		if (!node) return;
		this.openEdit(node);
	}

	onswipeclosedrawer(): void { this.setShowFrm(false) }

	onswipenoop(): void { }

	registerRowAdapter(rowAdapter: TreeRowAdapter<Stacker, TWorking>): void {
		const key = this.normalizeNodeId(rowAdapter.id);
		if (key.length === 0) return;
		const existing = Array.from(this.rowAdapters.values()).find((item) => item.id === rowAdapter.id);
		!existing && this.rowAdapters.set(key, rowAdapter);
	}

	unregisterRowAdapter(rowAdapter: TreeRowAdapter<Stacker, TWorking>): void {
		const key = this.normalizeNodeId(rowAdapter.id);
		if (key.length === 0) return;
		this.rowAdapters.delete(key);
	}

	getOrCreateRowAdapter(bridge: RowItemProps<TWorking>): TreeRowAdapter<Stacker, TWorking> {
		const node = (bridge as RowItemProps<TWorking> & { node?: INode<TWorking> }).node;
		if (node == null) {
			throw new Error("TreeAdapter.getOrCreateRowAdapter: `bridge.node` es obligatorio");
		}
		const idKey = this.normalizeNodeId(node.id);
		if (idKey.length === 0) {
			throw new Error("TreeAdapter.getOrCreateRowAdapter: `bridge.node.id` no puede quedar vacío tras normalizar");
		}
		const existing = this.rowAdapters.get(idKey);
		if (existing) {
			existing.applyBridge(bridge);
			existing.sync();
			return existing;
		}
		const created = new TreeRowAdapter<Stacker, TWorking>(bridge, this);
		this.registerRowAdapter(created);
		this.rowAdapters.set(idKey, created);
		created.sync();
		return created;
	}

	disposeRowAdapterById(nodeId: string): void {
		const existing = this.rowAdapters.get(this.normalizeNodeId(nodeId));
		if (!existing) return;
		existing.dispose();
	}

	syncAllRowAdapters(): void {
		for (const adapter of this.rowAdapters.values()) adapter.sync();
		this.rowLayoutEpoch.update((n) => n + 1);
	}

	getAddRootLabel(): string {
		const name = this.getlevelname(1);
		return name !== "---" ? `Agregar ${name.toLowerCase()}` : "Agregar";
	}

	getToolsBarActions(): FlexOptionsAction[] {
		const addDisabled = this.isViewMode || this.isReadOnly || undefined;
		const addLabel = this.getAddRootLabel();
		const addTitle = addDisabled ? `${addLabel} — No disponible en modo lectura` : addLabel;
		return [
			...(this.isBrapido ? [] : [{
				icon: "mdi:plus-circle-outline",
				title: addTitle,
				label: addLabel,
				disabled: addDisabled,
				onClick: () => { if (!addDisabled) this.onaddroot(); },
			}]),
			{ icon: "mdi:unfold-less-horizontal", title: "Colapsar todo", onClick: () => this.collapseAll?.() },
			{ icon: "mdi:unfold-more-horizontal", title: "Expandir todo", onClick: () => this.expandAll?.() },
		];
	}

	protected particularactionsrow(_node: INode<TWorking>): ButtonIconifyProps[] { return []; }

	getRowConfig(node: INode<TWorking>): {
		icono?: Omit<IconifyProps, "icon"> & { icon: string; color?: ComponentColor };
		disabled?: boolean;
		draggable?: boolean;
		isFirst?: boolean;
		isLast?: boolean;
		actions?: FlexOptionsAction[];
		cascadeOptions?: CascadeOptionsInput[];
		events?: {
			onopen?: () => void;
			onclose?: () => void;
			onfocus?: () => void;
			onblur?: () => void;
			onclick?: () => void;
			onleadiconclick?: () => void;
		};
	} | null {
		const rowController = this.rowAdapters.get(this.normalizeNodeId(node.id));
		const hasChildren = rowController?.hasChildren ?? !!(node.children && node.children.length > 0);
		const isLastNode = !!node.isLast;
		const isFolder = !isLastNode && (hasChildren || !node.isLeaf);
		const isEmptyFolder = isFolder && !hasChildren;
		const isExpanded = rowController?.isNodeOpen ?? this._expandedNodes.some((n) => n.id === node.id);
		const icon = isLastNode
			? "mdi:file-document-outline"
			: hasChildren
				? (isExpanded ? "mdi:folder-open-outline" : "mdi:folder-outline")
				: isFolder
					? "mdi:folder-plus-outline"
					: "mdi:file-outline";
		const isFolderIcon = !isLastNode && icon.includes("folder");
		const isFirstPos = rowController?.siblingPos.isFirst ?? false;
		const isLastPos = rowController?.siblingPos.isLast ?? false;
		const mutDisabled = this.isViewMode && !this.isReadOnly;
		const rdTitle = (base: string) => mutDisabled ? `${base} (Modo lectura)` : base;

		const actions: FlexOptionsAction[] = this.isReadOnly ? [] : [
			this.particularactionsrow(node),
			...(this.bdrag ? [[
				{
					icon: "mdi:arrow-up",
					title: rdTitle("Mover arriba (Ctrl+Up)"),
					disabled: mutDisabled || undefined,
					onClick: async () => { if (!mutDisabled) { const newId = await this.move(node.id, "up"); this.commitAndFlash(newId); } },
				},
				{
					icon: "mdi:arrow-down",
					title: rdTitle("Mover abajo (Ctrl+Down)"),
					disabled: mutDisabled || undefined,
					onClick: async () => { if (!mutDisabled) { const newId = await this.move(node.id, "down"); this.commitAndFlash(newId); } },
				},
			]] : []),
			[
				...([
					this.isViewMode
						? { icon: "mdi:form-textbox", title: "Ver formulario (Enter)", onClick: () => rowController?.onrowdblclick() }
						: { icon: "mdi:pencil-outline", title: "Editar (Enter)", onClick: () => rowController?.onrowdblclick() },
				]),
				...(isFolder && !this.isBrapido ? [{
					icon: "mdi:plus-circle-outline",
					title: rdTitle(node.isPenultimate ? "Agregar recurso (Ins)" : `Agregar ${node.nextLevelTitle || "hijo"} (Ins)`),
					disabled: mutDisabled || undefined,
					onClick: () => { if (!mutDisabled) void this.handleaddchild(node.id); },
				}] : []),
				...([{
					icon: "mdi:delete-outline",
					title: rdTitle("Eliminar (Supr)"),
					color: "danger" as const,
					disabled: mutDisabled || undefined,
					onClick: () => { if (!mutDisabled) this.onrowdelete(node); },
				}]),
			]
		];

		const cascadeOptions: CascadeOptionsInput[] = (this.isReadOnly || this.isBrapido) ? [] : [
			[
				{
					icon: "mdi:table-row-plus-before",
					label: rdTitle("Añadir arriba"),
					title: rdTitle("Añadir arriba (Ctrl+Shift+Up)"),
					disabled: mutDisabled || undefined,
					onClick: () => { if (!mutDisabled) void this.handleaddsibling(node.id, "above"); },
				},
				{
					icon: "mdi:table-row-plus-after",
					label: rdTitle("Añadir abajo"),
					title: rdTitle("Añadir abajo (Ctrl+Shift+Down)"),
					disabled: mutDisabled || undefined,
					onClick: () => { if (!mutDisabled) void this.handleaddsibling(node.id, "below"); },
				},
			],
		];

		return {
			icono: {
				icon,
				color: isLastNode ? "info" : (!isFolderIcon ? "color" : undefined),
				...(isFolderIcon ? { style: isEmptyFolder ? "color: #9e9e9e" : "color: #C9A227" } : {}),
			},
			actions,
			cascadeOptions,
			draggable: this.bdrag && !this.isReadOnly,
			isFirst: isFirstPos,
			isLast: isLastPos,
			events: {
				onleadiconclick: isEmptyFolder && !mutDisabled && !this.isBrapido ? () => void this.handleaddchild(node.id) : undefined,
			},
		};
	}

	protected isDirty(current: unknown, original: unknown): boolean { return original ? JSON.stringify(current) !== JSON.stringify(original) : false }
}
