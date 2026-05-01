import { writable, type Writable } from "svelte/store";
import { TreeRowAdapter } from "../_asRow/_rowAdapter/02-events";
import { type INode, type ITreeData } from "../_asRow/_rowAdapter/00-base";
import { TTreeAdapterContext } from "./00-context";

export abstract class TTreeAdapterContract<
	Stacker,
	TWorking extends ITreeData<TWorking>,
> extends TTreeAdapterContext<Stacker, TWorking> {
	disabledNodes: string[] = [];
	flashIds: string[] = [];

	protected getReferenceId(node: INode<TWorking>): string {
		return this.normalizeNodeId(node.ireference || "");
	}

	protected didNodesExpand = false;
	protected currentNode: INode<TWorking> | null = null;
	protected lastProcessedNode: INode<TWorking> | null = null;
	protected rowAdapters: Map<string, TreeRowAdapter<Stacker, TWorking>> = new Map();
	rowLayoutEpoch: Writable<number> = writable(0);
	protected lastNodesRef: INode<TWorking>[] = [];
	protected lastObjRefId = "";
	protected flashClearTimer: ReturnType<typeof setTimeout> | undefined;

	
	protected getVisibleNodeIds(nodes: INode<TWorking>[], expandedSet: Set<string>): string[] {
		const ids: string[] = [];
		const walk = (list: INode<TWorking>[]) => {
			for (const node of list) {
				ids.push(node.id);
				if (node.children?.length && expandedSet.has(node.id)) walk(node.children);
			}
		};
		walk(nodes);
		return ids;
	}

	abstract createNode(data: any): TWorking;
	abstract get nodeCtor(): new (...args: any[]) => TWorking;
	abstract get nidNode(): string;
	abstract get stack(): Stacker;
	abstract get istack(): string;
	abstract get nistack(): string;
	abstract get stackList(): any[];
	abstract set stackList(value: any[]);

	abstract toNode(obj: unknown, isCopy?: boolean): TWorking;
	abstract onrefresh(): void;
	abstract applySelection(obj: TWorking | null): void;
	abstract resyncExpandedToCurrentTree(): void;
	abstract syncAllRowAdapters(): void;
	abstract getlevelname(nivel?: number, record?: any): string;

	abstract getEditDriverAttrs(): any[];
	abstract getEditAttrsForLevel(driverAttrs: any[], plan: TWorking): any[];
	abstract canEditSelectResource(plan: TWorking, draft: TWorking): boolean;
	abstract getEditAtributoValor(draft: TWorking, iatributo: number): string;
	abstract setEditAtributoValor(draft: TWorking, iatributo: number, valor: string): TWorking;
	abstract setEditRecursoSelected(draft: TWorking, record: any): TWorking;

	// =========================================================================
	// Operaciones específicas del modelo de vista en forma de **row** (DOM).
	// Implementadas en la capa final (`07-rows.ts`); declaradas aquí para que
	// las capas intermedias (mutaciones, eventos) puedan invocarlas vía `this`.
	// =========================================================================
	abstract focusRowById(nodeId: string): void;
	abstract refocusFocusedRowSummary(): void;
	abstract blurTreeSummariesExcept(activeSummary: HTMLElement): void;
	abstract flashRowIds(ids: string[], durationMs?: number, context?: unknown): void;
	abstract commitAndFlash(id: string | undefined): void;
}
