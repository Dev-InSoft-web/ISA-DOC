import type { ButtonIconifyProps, ComponentColor, IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsAction, FlexOptionsInput } from "../../Options/FlexOptions.svelte";
import { TreeRowAdapter } from "./_rowAdapter/02-events";
import { type INode, type ITreeData } from "./_rowAdapter/00-base";
import type { RowItemProps } from "../_rowItem.svelte";
import { TAMutations } from "./05-mutations";

type CascadeOptionsInput = FlexOptionsInput;

export abstract class TreeAdapter<Stacker, TWorking extends ITreeData<TWorking>> extends TAMutations<Stacker, TWorking> {

	/**
	 * Tipos de nodo que actúan como **agrupadores** (carpetas/contenedores).
	 * Si el adapter no lo override, se infiere desde `node.isLeaf` (todo lo no-hoja
	 * se considera agrupador). Se usa para la regla por defecto de expansión.
	 */
	get groupTypes(): readonly string[] { return []; }

	/**
	 * Tipos de agrupador sobre los que se ofrecen acciones de mutación
	 * (p.ej. "Agregar hijo"). Subconjunto típico de `groupTypes`.
	 */
	get actionTypes(): readonly string[] { return []; }

	/** Si el tipo del nodo declara aceptación de acciones del adapter. */
	isActionGrouper(node: INode<TWorking>): boolean {
		const t = (node.obj as { type?: string } | undefined)?.type;
		const list = this.actionTypes;
		if (!t || list.length === 0) return false;
		return list.includes(t);
	}

	/** Si el nodo es agrupador según `groupTypes` (o por inferencia si está vacío). */
	isGrouper(node: INode<TWorking>): boolean {
		const t = (node.obj as { type?: string } | undefined)?.type;
		const list = this.groupTypes;
		if (list.length > 0) return !!t && list.includes(t);
		return !node.isLeaf;
	}

	/**
	 * Regla para decidir si un nodo arranca expandido tras el primer build.
	 * Por defecto: todos los agrupadores se expanden. Override en el adapter
	 * concreto para otra política (p.ej. solo nivel 0, solo dominios, etc).
	 */
	protected shouldAutoExpand(node: INode<TWorking>): boolean {
		return this.isGrouper(node);
	}

	/** Marca para correr la regla de expansión inicial una sola vez. */
	private _autoExpansionApplied = false;

	/**
	 * Aplica la regla de expansión inicial sobre el árbol actual.
	 * Se llama automáticamente la primera vez que `onrefresh` produce nodos,
	 * o manualmente por el adapter si quiere re-aplicarla (p.ej. tras un reset).
	 */
	applyDefaultExpansion(): void {
		if (!this.rootNodes.length) return;
		const next: INode<TWorking>[] = [];
		const seen = new Set<string>();
		const walk = (nodes: INode<TWorking>[]): void => {
			for (const n of nodes) {
				if (this.shouldAutoExpand(n)) {
					const key = this.normalizeNodeId(n.id);
					if (key && !seen.has(key)) { seen.add(key); next.push(n); }
				}
				n.children?.length && walk(n.children);
			}
		};
		walk(this.rootNodes);
		this.expandedNodes = next;
		this.syncAllRowAdapters();
		this._autoExpansionApplied = true;
	}

	override onrefresh(): void {
		super.onrefresh();
		if (!this._autoExpansionApplied && this.rootNodes.length) this.applyDefaultExpansion();
	}

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
	protected particularcascadeoptionsrow(_node: INode<TWorking>): FlexOptionsInput[] { return []; }

	getRowConfig(node: INode<TWorking>): {
		icono?: Omit<IconifyProps, "icon"> & { icon: string; color?: ComponentColor };
		disabled?: boolean;
		draggable?: boolean;
		isFirst?: boolean;
		isLast?: boolean;
		actions?: FlexOptionsInput[];
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
		const defaultIcon = isLastNode
			? "mdi:file-document-outline"
			: hasChildren
				? (isExpanded ? "mdi:folder-open-outline" : "mdi:folder-outline")
				: isFolder
					? "mdi:folder-plus-outline"
					: "mdi:file-outline";
		const iconOverride = this.getNodeIcon(node, { isLastNode, isFolder, hasChildren, isExpanded, isEmptyFolder });
		const icon = iconOverride?.icon ?? defaultIcon;
		const isFolderIcon = !isLastNode && icon.includes("folder");
		const isFirstPos = rowController?.siblingPos.isFirst ?? false;
		const isLastPos = rowController?.siblingPos.isLast ?? false;
		const mutDisabled = this.isViewMode && !this.isReadOnly;
		const rdTitle = (base: string) => mutDisabled ? `${base} (Modo lectura)` : base;

		const actions: FlexOptionsInput[] = this.isReadOnly ? [] : [
			this.particularactionsrow(node),
			[
				...(this.isViewMode
					? [{ icon: "mdi:form-textbox", title: "Ver formulario (Enter)", onClick: () => rowController?.onrowdblclick() }]
					: []),
				...([{
					icon: "mdi:delete-outline",
					title: rdTitle("Eliminar (Supr)"),
					color: "danger" as const,
					disabled: mutDisabled || undefined,
					onClick: () => { if (!mutDisabled) this.onrowdelete(node); },
				}]),
			]
		];

		const cascadeOptions: CascadeOptionsInput[] = this.isReadOnly ? [] : [
			...(!this.isViewMode ? [{
				icon: "mdi:pencil-outline",
				label: "Editar",
				title: rdTitle("Editar (Enter)"),
				disabled: mutDisabled || undefined,
				onClick: () => rowController?.onrowdblclick(),
			}] : []),
			...(this.bdrag ? [[
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
			]] : []),
			...this.particularcascadeoptionsrow(node),
		];

		return {
			icono: {
				icon,
				color: iconOverride?.color ?? (isLastNode ? "info" : (!isFolderIcon ? "color" : undefined)),
				...(iconOverride?.style !== undefined
					? { style: iconOverride.style }
					: (isFolderIcon ? { style: isEmptyFolder ? "color: #9e9e9e" : "color: #C9A227" } : {})),
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

	protected getNodeIcon(_node: INode<TWorking>, _ctx: { isLastNode: boolean; isFolder: boolean; hasChildren: boolean; isExpanded: boolean; isEmptyFolder: boolean }): { icon?: string; color?: ComponentColor; style?: string } | null { return null; }

	protected canAddChild(_node: INode<TWorking>): boolean { return true; }

	protected isDirty(current: unknown, original: unknown): boolean { return original ? JSON.stringify(current) !== JSON.stringify(original) : false }
}
