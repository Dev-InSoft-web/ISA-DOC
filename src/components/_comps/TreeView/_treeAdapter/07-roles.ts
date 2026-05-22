import type { TObject } from "@ingenieria_insoft/ispgen";
import type { ButtonIconifyProps } from "@ingenieria_insoft/ispsveltecomponents";
import { TAHistory } from "./06b-history";
import { type INode, type ITreeData } from "./_defgen/00-tree-data";

export abstract class TARoles<TListObj extends ITreeData<TListObj> & TObject> extends TAHistory<TListObj> {
	get groupTypes(): readonly string[] { return []; }
	get actionTypes(): readonly string[] { return []; }

	allowsChildEscape(node: INode<TListObj>): boolean {
		if (node.isHermetic) return false;
		if (node.isFreezer) return false;
		return true;
	}

	protected getAncestors(node: INode<TListObj>): INode<TListObj>[] { return this.walkAncestors(node); }

	protected actorActions(node: INode<TListObj>): ButtonIconifyProps[] {
		const out: ButtonIconifyProps[] = [];
		if (node.isAtom) return out;
		if (node.isPrison && !node.isHermetic) {
			const readOnly = !this.canMutate;
			out.push({
				icon: "mdi:exit-run",
				title: "Liberar (los hijos toman su lugar conservando el orden)",
				color: "neutral",
				disabled: readOnly || undefined,
				onClick: () => { if (!readOnly) this.onrelease(node); },
			});
		}
		return out;
	}

	resume(node: INode<TListObj>): INode<TListObj> {
		return { ...node, ...(this.cloneNodeData(node) as object) };
	}

	protected cloneNodeData(data: TListObj): TListObj {
		const fn = (data as TListObj & { clone?: () => TListObj }).clone;
		if (typeof fn === "function") return fn.call(data);
		return { ...(data as object) } as TListObj;
	}

	protected onrelease(_node: INode<TListObj>): void { }

	abstract onrowdelete(node: INode<TListObj>): void;

	extinguishNode(record: TListObj): void {
		const id = this.normalizeFlatPath(String(record?.flatPath ?? ""));
		const node = id ? this.findNodeByFlatPath(id) : null;
		if (!node) return;
		if (node.isPrison && !node.isHermetic) { this.onrelease(node); return; }
		if (node.isCell) { this.promoteChildrenAndDelete(node); return; }
		this.onrowdelete(node);
	}

	protected promoteChildrenAndDelete(_node: INode<TListObj>): void {
		this.onrowdelete(_node);
	}

	isActionGrouper(node: INode<TListObj>): boolean {
		const t = (node as INode<TListObj> & { type?: string }).type;
		const list = this.actionTypes;
		if (!t || list.length === 0) return !!node.isGroupActor;
		return list.includes(t);
	}

	isGrouper(node: INode<TListObj>): boolean {
		if (node.isGroupActor) return true;
		const t = (node as INode<TListObj> & { type?: string }).type;
		const list = this.groupTypes;
		if (list.length > 0) return !!t && list.includes(t);
		return !node.isAtom;
	}

	isFrozen(node: INode<TListObj>): boolean {
		for (const anc of this.getAncestors(node)) {
			if (anc.isFreezer) return true;
		}
		return !!node.freeze;
	}

	protected canAddChild(_node: INode<TListObj>): boolean { return true; }

	abstract onrowtoggle(node: INode<TListObj>, open: boolean): void;
}
