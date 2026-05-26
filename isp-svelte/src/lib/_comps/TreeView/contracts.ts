import type { TObject } from "@ingenieria_insoft/ispgen";
import type { ButtonIconifyProps, ComponentColor } from "@ingenieria_insoft/ispsveltecomponents";
import type { FlexOptionsInput } from "../Options/FlexOptions.svelte";
import type { TreeRowConfig } from "./_asRow/_rowAdapter/00-base";
import type { ContainmentRole, INode, ITreeData, MobilityRole, TopologyRole } from "./_treeAdapter/_defgen/00-tree-data";

export interface ITreeRowCtx extends TObject {
	flatPath: string;
	topology?: TopologyRole;
	containment?: ContainmentRole;
	mobility?: MobilityRole;
	hasChildren?: boolean;
	isCollapsed?: boolean;
	depth?: number;
}

export type RowOf<T extends TObject> = T & ITreeData<RowOf<T>> & ITreeRowCtx & {
	pathInit: string;
	isSelected: boolean;
};

export interface ITreeRuntimeRow<R extends ITreeRowCtx> {
	readonly record: R | null;
	readonly rootNodes: ReadonlyArray<R>;
	findByFlatPath(path: string): R | undefined;
	findByPathInit(pathInit: string): R | undefined;
	sanitizeFlatPath(id: unknown): string;
	move?: (record: R, dir: "up" | "down") => Promise<string | undefined>;
	addChild?: (record: R) => Promise<void>;
	addSibling?: (record: R, pos: "above" | "below") => Promise<void>;
	openEdit?: (record: R) => void;
	openView?: (record: R) => void;
	openViewNode?: (record: R) => void;
	extinguish?: (record: R) => void;
	remove?: (record: R) => void;
	release?: (record: R) => void;
	addRoot?: () => void;
	collapseAll?: () => void;
	expandAll?: () => void;
	readonly canCollapseAll?: boolean;
	readonly canExpandAll?: boolean;
	historyUndo?: () => void;
	historyRedo?: () => void;
	historyRecover?: () => void;
	readonly historyCanUndo?: boolean;
	readonly historyCanRedo?: boolean;
	readonly historyIsViewingPast?: boolean;
	readonly isProtected?: boolean;
	readonly canToggleProtection?: boolean;
	readonly isReadOnlyExternal?: boolean;
	protectionToggle?: () => void;
	setProtected?: (v: boolean) => void;
	actorActions?: (node: INode<R>) => ButtonIconifyProps[];
	addChildLabel?: (node: INode<R>) => string;
	isFirstSibling?: (node: INode<R>) => boolean;
	isLastSibling?: (node: INode<R>) => boolean;
	isPrisonOnly?: (node: INode<R>) => boolean;
	readonly isReadOnly?: boolean;
	readonly canMutate?: boolean;
}

export interface ITreeActionRow<R extends ITreeRowCtx> {
	name: string;
	icon?: string;
	color?: string;
	disabled?: boolean;
	action: (record: R, tree: ITreeRuntimeRow<R>) => void | Promise<void>;
}

export interface ITreeCustomsRow<R extends ITreeRowCtx> {
	
	list?: () => R[];
	
	getFlatPath?: (record: R) => string;
	
	setFlatPath?: (record: R, flatPath: string) => void;
	
	remapReferences?: (record: R, idMap: ReadonlyMap<string, string>) => void;
	
	klass?: new () => TObject;
	newItem?: (data?: Partial<R>) => R;

	getNodeIcon?: (node: INode<R>, ctx: { isLastNode: boolean; isFolder: boolean; hasChildren: boolean; isExpanded: boolean; isEmptyFolder: boolean }) => { icon?: string; color?: ComponentColor; style?: string; title?: string } | null;

	getRowConfig?: (node: INode<R>, defaultCfg: TreeRowConfig | null) => TreeRowConfig | null;
	rowActions?: (node: INode<R>, tree: ITreeRuntimeRow<R>) => FlexOptionsInput[];
	rowCascadeOptions?: (node: INode<R>, tree: ITreeRuntimeRow<R>) => FlexOptionsInput[];
	topMenuActions?: (tree: ITreeRuntimeRow<R>) => FlexOptionsInput[];
	toolsBarCascadeOptions?: (tree: ITreeRuntimeRow<R>) => FlexOptionsInput[];

	updateNode?: (node: R, isNew: boolean, tree: ITreeRuntimeRow<R>) => void | Promise<void>;

	onexpand?: (node: INode<R>, tree: ITreeRuntimeRow<R>) => void;
	oncollapse?: (node: INode<R>, tree: ITreeRuntimeRow<R>) => void;

	hotkeys?: { [combo: string]: (record: R, tree: ITreeRuntimeRow<R>, e: KeyboardEvent) => void };

	openLastLevelSelector?: () => void;
	levelName?: (ctx: { depth: number }) => string;

	refreshNode?: (record: R, tree: ITreeRuntimeRow<R>) => void;

	menu?: (record: R, tree: ITreeRuntimeRow<R>) => ITreeActionRow<R>[] | Promise<ITreeActionRow<R>[]>;
	moreMenu?: (record: R, tree: ITreeRuntimeRow<R>) => ITreeActionRow<R>[] | Promise<ITreeActionRow<R>[]>;

	entrie?: string;
	entries?: string;
}

export type ITreeRuntime<TBase extends TObject> = ITreeRuntimeRow<RowOf<TBase>>;
export type ITreeAction<TBase extends TObject> = ITreeActionRow<RowOf<TBase>>;
export type ITreeCustoms<TBase extends TObject> = ITreeCustomsRow<RowOf<TBase>>;

export abstract class TreeCustomsBase<TBase extends TObject> implements ITreeCustoms<TBase> {
	abstract updateNode(node: RowOf<TBase>, isNew: boolean, tree: ITreeRuntime<TBase>): void | Promise<void>;
	levelName?: (ctx: { depth: number }) => string;
	topMenuActions(tree: ITreeRuntime<TBase>): FlexOptionsInput[] {
		const ro = !!tree.isReadOnly;
		const addDisabled = ro || undefined;
		const nivel1 = (this.levelName?.({ depth: 0 }) ?? "").trim();
		const addTitle = nivel1 && nivel1 !== "---" ? `Agregar ${nivel1}` : "Agregar";
		const addGroup = [{
			icon: "mdi:plus-circle-outline",
			label: "Agregar",
			title: addTitle,
			hotkey: "Insert",
			disabled: addDisabled,
			onClick: () => { if (!addDisabled) tree.addRoot?.(); },
		}];
		const canCollapse = !!tree.canCollapseAll;
		const canExpand = !!tree.canExpandAll;
		const expandGroup = [
			{ icon: "mdi:unfold-less-horizontal", title: "Colapsar todo", hotkey: "Ctrl+ArrowLeft", disabled: !canCollapse || undefined, onClick: () => { if (canCollapse) tree.collapseAll?.(); } },
			{ icon: "mdi:unfold-more-horizontal", title: "Expandir todo", hotkey: "Ctrl+ArrowRight", disabled: !canExpand || undefined, onClick: () => { if (canExpand) tree.expandAll?.(); } },
		];
		const externalRO = !!tree.isReadOnlyExternal;
		const undoDisabled = externalRO || !tree.historyCanUndo || undefined;
		const redoDisabled = externalRO || !tree.historyCanRedo || undefined;
		const protectedOn = !!tree.isProtected;
		const canToggleProtection = tree.canToggleProtection ?? true;
		const protectionDisabled = !canToggleProtection || undefined;
		const lockTitle = protectedOn ? "Desproteger" : "Proteger";
		const undoGroup = [
			{ icon: "mdi:arrow-u-left-top", title: "Deshacer", hotkey: "Ctrl+KeyZ", disabled: undoDisabled, onClick: () => { if (!undoDisabled) tree.historyUndo?.(); } },
			{
				iconTrue: "mdi:lock-outline",
				iconFalse: "mdi:lock-open-variant-outline",
				checked: protectedOn,
				color: "warning" as const,
				colorFalse: "neutral" as const,
				title: lockTitle,
				disabled: protectionDisabled,
				onClick: () => { if (!protectionDisabled) tree.protectionToggle?.(); },
			},
			{ icon: "mdi:arrow-u-right-top", title: "Rehacer", hotkey: "Ctrl+KeyY", disabled: redoDisabled, onClick: () => { if (!redoDisabled) tree.historyRedo?.(); } },
		];
		return [addGroup, expandGroup, undoGroup];
	}
}
