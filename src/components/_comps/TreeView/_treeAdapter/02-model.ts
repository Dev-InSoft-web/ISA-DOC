import { TObject } from "@ingenieria_insoft/ispgen";
import { type INode, type ITreeData } from "./_defgen/00-tree-data";
import { TTreeAdapterContract } from "./01-contract";

export abstract class TAModel<TListObj extends ITreeData<TListObj> & TObject> extends TTreeAdapterContract<TListObj> {

	abstract historyPush(): void;
	abstract closeEditForm(): void;
	abstract ondeleteconfirmed(): Promise<void>;
	abstract onAfterCatalogModificar(): Promise<void>;
	abstract rebuildFlatTree(sort?: (a: TListObj, b: TListObj) => number): void;

	addNode(_data: TListObj | Partial<TListObj>, _onDuplicate?: (node: TListObj) => void): TListObj | null { return null; }
	removeNode(_data: TListObj | Partial<TListObj>): boolean { return false; }
	updateNode(_data: TListObj | Partial<TListObj>, _mutate?: (target: TListObj, source: TListObj) => void): boolean { return false; }
	findNode(_data: TListObj | Partial<TListObj>): TListObj | undefined { return undefined; }

	onrequestopendrawer?: (mode: "view" | "edit" | "create") => void;
	onrequestclosedrawer?: () => void;
	onrequesteditshow?: (node: INode<TListObj>, mode: "view" | "edit") => void;
	onrequestdelete?: (node: INode<TListObj>) => void;
	onError?: (msg: string) => void;
	protected _pendingInsertFlatPath: string = "";
	protected _pendingLastLevelParentFlatPath: string = "";
	protected _pendingExpandedSnapshot: string[] = [];

	get List2RowsNodes(): TListObj[] {
		return this.List2Rows.map((p) => this.toNode(p));
	}

	protected sortChildrens(a: TListObj, b: TListObj): number {
		const oa = +String(a.flatPath || "").split(".").pop()! || 0;
		const ob = +String(b.flatPath || "").split(".").pop()! || 0;
		return oa - ob;
	}

	ActInsertar = async (slaveNode: TListObj): Promise<boolean> => {
		return !!this.addNode(slaveNode, (n) => this.onError?.(`El \u00edndice "${n.flatPath}" ya existe.`));
	};
	ActEliminar = async (slaveNode: TListObj): Promise<boolean> => {
		return this.removeNode(slaveNode);
	};
	ActCrear = (_slaveNode: TListObj): Promise<boolean> | undefined => undefined;
	ActModificar = async (slaveNode: TListObj): Promise<boolean> => {
		const found = this.findNode(slaveNode);
		if (!found) return false;
		const sNode = slaveNode as unknown as { toJSON: () => Record<string, unknown> };
		(found as unknown as { loadFromJSON: (j: unknown) => void }).loadFromJSON(sNode.toJSON());
		this.rebuildFlatTree();
		this.notifyUI();
		return true;
	};
	ActVisualizar = async (slaveNode: TListObj): Promise<boolean> => {
		// Copia las augmentaciones del árbol (flatPath, childrens, depth, …) sin compartir
		// el campo `f` para mantener la edición aislada en el clone que entrega AccionesGen.
		const found = this.findNode(slaveNode);
		if (!found) return true;
		const src = found as unknown as Record<string, unknown>;
		const dst = slaveNode as unknown as Record<string, unknown>;
		for (const k of Object.keys(src)) if (k !== "f") dst[k] = src[k];
		return true;
	};
	Actualizar = async (slaveNode: TListObj): Promise<boolean> => {
		return this.updateNode(slaveNode);
	};

	setShowFrm(b: unknown): void {
		if (b) this.onrequestopendrawer?.("create");
		else this.onrequestclosedrawer?.();
	}

	codeToDelete(value: unknown): string {
		return String(value ?? "").trim().padStart(5, "X");
	}

	getRecordSecurityCode(node: INode<TListObj> | null): string {
		const asObj = node as Record<string, unknown> | null | undefined;
		const source = asObj?.iplan ?? asObj?.idrow ?? "";
		return this.codeToDelete(String(source).replace(/^(_UP_|_M_)/, ""));
	}

	workingRow(node: INode<TListObj> | null): TListObj | null {
		return (node as unknown as TListObj | null | undefined) ?? null;
	}

	protected findNodeByObj(nodes: INode<TListObj>[], row: TListObj): INode<TListObj> | null {
		for (const node of nodes) {
			if (node === row) return node;
			if (node.childrens?.length) {
				const found = this.findNodeByObj(node.childrens, row);
				if (found) return found;
			}
		}
		return null;
	}

	protected findNodeForAction(objRef: TListObj): INode<TListObj> | null {
		const asRec = objRef as Record<string, unknown> | null | undefined;
		const rawCurrent = asRec?.flatPath;
		const cleanCurrent = rawCurrent != null ? this.normalizeFlatPath(String(rawCurrent)) : "";
		if (cleanCurrent.length > 0) {
			const found = this.findNodeByFlatPath(cleanCurrent);
			if (found) return found;
		}
		const rawId = asRec?.idrow ?? asRec?.iplan;
		const cleanId = rawId != null ? this.normalizeFlatPath(String(rawId)) : "";
		if (cleanId.length > 0) {
			const found = this.findNodeByFlatPath(cleanId);
			if (found) return found;
		}
		return this.findNodeByObj(this.rootNodes, objRef);
	}

	closeEditDrawer(): void {
		this.onrequestclosedrawer?.();
		this.closeEditForm();
	}

	showFrmModificar(objRef: TListObj): void {
		const node = this.findNodeForAction(objRef);
		if (!node) return;
		this.record = node;
		const mode = this.canMutate ? "edit" : "view";
		if (mode === "edit" && !this._pendingInsertFlatPath) this.historyPush();
		this.onrequesteditshow?.(node, mode);
	}

	showFrmVisualizar(objRef: TListObj): void {
		const node = this.findNodeForAction(objRef);
		if (!node) return;
		this.record = node;
		this.onrequesteditshow?.(node, "view");
	}

	showDelete(objRef: TListObj): void {
		const node = this.findNodeForAction(objRef);
		if (node) this.record = node;
		if (node) this.onrequestdelete?.(node);
	}

	async postSubmit(_o?: unknown, action?: unknown): Promise<void> {
		if (action === "Eliminar") await this.ondeleteconfirmed();
		else if (action === "Modificar" || action === "Crear") await this.onAfterCatalogModificar();
		this.closeEditDrawer();
	}

	async confirmDelete(codigoIngresado: string): Promise<boolean> {
		const codigo = String(codigoIngresado ?? "").trim();
		const codigoEsperado = this.getRecordSecurityCode(this.record);
		const bloqueado = codigo !== codigoEsperado;
		if (!this.canMutate || bloqueado || !this.record) return false;
		try {

			const row = this.workingRow(this.record);
			if (!row) throw new Error("No hay fila activa para eliminar.");
			this.historyPush();
			await this.ActEliminar(row);
			await this.postSubmit(row, "Eliminar");
			return true;
		} catch (e) {
			const sAdd = e instanceof Error ? `\r\n${e.message}` : "";
			this.onError?.("No se pudo eliminar." + sAdd);
			return false;
		}
	}
}
