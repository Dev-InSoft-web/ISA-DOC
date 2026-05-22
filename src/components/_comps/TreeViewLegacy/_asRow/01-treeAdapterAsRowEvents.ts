import type { ButtonIconifyProps, ComponentColor, IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsAction, FlexOptionsInput } from "../../Options/FlexOptions.svelte";
import { type INode, type ITreeData } from "../_treeAdapter/_defgen/00-tree-data";
import { TARowBase } from "./00-treeAdapterAsRow";

/**
 * Capa **UI/configuración por fila** del adapter en modo fila. Se ocupa de:
 *  - Acciones visibles en la barra superior del árbol (`getToolsBarActions`).
 *  - La configuración por fila que consume el `_rowItem.svelte` y el
 *    `TreeRowAdapter` (`getRowConfig`).
 *  - Hooks de extensión por subclase (`particularactionsrow`,
 *    `particularcascadeoptionsrow`, `getNodeIcon`).
 *
 * Toda la plomería (DOM ops, registry de row adapters, handlers `onrow*`,
 * expansión inicial) vive en `00-treeAdapterAsRow.ts` (`TARowBase`).
 */
export abstract class TreeRowViewAdapterLegacy<Stacker, TWorking extends ITreeData<TWorking>> extends TARowBase<Stacker, TWorking> {
	getAddRootLabel(): string {
		const name = this.getlevelname(1);
		return name !== "---" ? `Agregar ${name.toLowerCase()}` : "Agregar";
	}

	override getToolsBarActions(): FlexOptionsAction[] {
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

	protected override particularactionsrow(_node: INode<TWorking>): ButtonIconifyProps[] { return []; }
	protected override particularcascadeoptionsrow(_node: INode<TWorking>): FlexOptionsInput[] { return []; }

	override getRowConfig(node: INode<TWorking>): {
		icono?: Omit<IconifyProps, "icon"> & { icon: string; color?: ComponentColor };
		disabled?: boolean;
		draggable?: boolean;
		isFirst?: boolean;
		isLast?: boolean;
		actions?: FlexOptionsInput[];
		cascadeOptions?: FlexOptionsInput[];
		events?: {
			onopen?: () => void;
			onclose?: () => void;
			onfocus?: () => void;
			onblur?: () => void;
			onclick?: () => void;
			onleadiconclick?: () => void;
		};
	} | null {
		const rowController = this.rowAdapters.get(this.normalizeNodeId(node.flatPath));
		const hasChildren = rowController?.hasChildren ?? !!(node.children && node.children.length > 0);
		const isLastNode = !!node.isLast;
		const isFolder = !isLastNode && (hasChildren || !node.isLeaf);
		const isEmptyFolder = isFolder && !hasChildren;
		const isExpanded = rowController?.isNodeOpen ?? this._expandedNodes.some((n) => n.flatPath === node.flatPath);
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

		const actorActs = this.actorActions(node);
		const draft = this.wardenDraft(node);
		const isPrisonOnly = this.isPrison(node) && !this.isHermetic(node);

		const actions: FlexOptionsInput[] = this.isReadOnly ? [] : [
			actorActs,
			draft.actions,
			this.particularactionsrow(node),
			[
				...(this.isViewMode
					? [{ icon: "mdi:form-textbox", title: "Ver formulario (Enter)", onClick: () => rowController?.onrowdblclick() }]
					: []),
				...(isPrisonOnly ? [] : [{
					icon: "mdi:delete-outline",
					title: rdTitle("Eliminar (Supr)"),
					color: "danger" as const,
					disabled: mutDisabled || undefined,
					onClick: () => { if (!mutDisabled) this.onrowdelete(node); },
				}]),
			]
		];

		const cascadeOptions: FlexOptionsInput[] = this.isReadOnly ? [] : [
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
					onClick: () => { if (!mutDisabled) void this.handleaddsibling(node.flatPath, "above"); },
				},
				{
					icon: "mdi:table-row-plus-after",
					label: rdTitle("Añadir abajo"),
					title: rdTitle("Añadir abajo (Ctrl+Shift+Down)"),
					disabled: mutDisabled || undefined,
					onClick: () => { if (!mutDisabled) void this.handleaddsibling(node.flatPath, "below"); },
				},
			]] : []),
			...draft.cascadeOptions,
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
				onleadiconclick: isEmptyFolder && !mutDisabled && !this.isBrapido ? () => void this.handleaddchild(node.flatPath) : undefined,
			},
		};
	}

	protected override getNodeIcon(_node: INode<TWorking>, _ctx: { isLastNode: boolean; isFolder: boolean; hasChildren: boolean; isExpanded: boolean; isEmptyFolder: boolean }): { icon?: string; color?: ComponentColor; style?: string } | null { return null; }
}
