import { type INode, type ITreeData } from "./_defgen/00-tree-data";
import { TATree } from "./03-tree";

export abstract class TAView<Stacker, TWorking extends ITreeData<TWorking>> extends TATree<Stacker, TWorking> {

	
	applySelection(edit: TWorking | null): void {
		const newItem = edit ? this.toNode(edit) : null;
		if (!newItem) {
			this._selectedId = "";
			this._item = null;
			this._originalItem = null;
			return;
		}
		this._selectedId = this.normalizeNodeId(newItem.flatPath);
		this._item = newItem;
		this._originalItem = edit ? this.toNode(edit, true) : null;
	}

	
	/**
	 * Hook opcional: devuelve una **clave estable** para identificar el nodo
	 * a efectos de expansión, independiente del `rowId` posicional. Cualquier
	 * adapter cuyos ids cambien al insertar/quitar/reordenar (por ejemplo
	 * notación punteada `1.2.3`) debe implementarlo a partir del payload
	 * lógico (kind + identidad de dominio).
	 *
	 * Por defecto devuelve `null`: la resync usa la búsqueda por id directo.
	 */
	protected stableExpandKey(_obj: TWorking | null | undefined): string | null {
		return null;
	}

	resyncExpandedToCurrentTree(): void {
		if (!this._expandedNodes.length) return;
		// Si el adapter expone clave estable, mapear por ella: los rowIds
		// posicionales pueden haber cambiado tras el rebuild.
		const wantedKeys = new Set<string>();
		for (const stale of this._expandedNodes) {
			const k = this.stableExpandKey(stale?.obj as TWorking | undefined);
			if (k) wantedKeys.add(k);
		}
		if (wantedKeys.size > 0) {
			const seen = new Set<string>();
			const next: INode<TWorking>[] = [];
			const walk = (nodes: INode<TWorking>[] | undefined): void => {
				if (!nodes) return;
				for (const n of nodes) {
					const key = this.stableExpandKey(n.obj as TWorking | undefined);
					if (key && wantedKeys.has(key) && !seen.has(key)) {
						seen.add(key);
						next.push(n);
					}
					if (n.children?.length) walk(n.children);
				}
			};
			walk(this.rootNodes);
			this._expandedNodes = next;
			return;
		}
		// Fallback: resync por id directo (compatibilidad con árboles cuyos
		// ids son estables — p.ej. claves de negocio asignadas).
		const seen = new Set<string>();
		const next: INode<TWorking>[] = [];
		for (const stale of this._expandedNodes) {
			const id = this.normalizeNodeId(stale?.flatPath);
			if (!id || seen.has(id)) continue;
			const fresh = this.findNodeById(id);
			if (fresh) {
				seen.add(id);
				next.push(fresh);
			}
		}
		this._expandedNodes = next;
	}

	setSelectedId(id: string, _context?: unknown): void {
		const cleanId = this.normalizeNodeId(id);
		const node = cleanId.length > 0 ? this.findNodeById(cleanId) : null;
		this.selectedId = node;
		this.focusedNode = node;
		this.syncAllRowAdapters();
	}

	expandAll(): void {
		if (!this.rootNodes.length) return;
		const expandableIds = this.collectBranchIds(this.rootNodes);
		const currentIds = this.expandedNodes.map((node) => node.flatPath);
		const nextIds = [...new Set([...currentIds, ...expandableIds])];
		this.expandedNodes = nextIds
			.map((id) => this.findNodeById(id))
			.filter((node): node is INode<TWorking> => !!node);
		this.syncAllRowAdapters();
	}

	collapseAll(): void {
		this.expandedNodes = [];
		this.syncAllRowAdapters();
	}

	expandedNodesAfterToggle(expandedNodes: readonly INode<TWorking>[], id: string, open: boolean): INode<TWorking>[] {
		const needle = this.normalizeNodeId(id);
		const alreadyExpanded = expandedNodes.some((node) => this.normalizeNodeId(node.flatPath) === needle);
		if (open) {
			if (alreadyExpanded) return [...expandedNodes];
			const nextBranch = this.findNodeById(needle);
			return nextBranch ? [...expandedNodes, nextBranch] : [...expandedNodes];
		}
		return expandedNodes.filter((node) => this.normalizeNodeId(node.flatPath) !== needle);
	}

	
	setExpandedNodesFn(nodes: INode<TWorking>[]): void { this.expandedNodes = nodes }

	
	protected restoreExpandedFromSnapshot(ids: string[]): void {
		if (!ids?.length) return;
		const seen = new Set<string>();
		const next: INode<TWorking>[] = [];
		for (const raw of ids) {
			const id = this.normalizeNodeId(raw);
			if (!id || seen.has(id)) continue;
			const fresh = this.findNodeById(id);
			if (fresh) {
				seen.add(id);
				next.push(fresh);
			}
		}
		this._expandedNodes = next;
	}
}
