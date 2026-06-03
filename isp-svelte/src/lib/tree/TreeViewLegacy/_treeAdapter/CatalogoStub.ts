import type { ITreeData } from "./_defgen/00-tree-data";

interface CatalogoStubTarget<TWorking> {
	addNode(data: unknown, onDuplicate?: (node: TWorking) => void): TWorking | null;
	updateNode(data: unknown, mutate?: (target: TWorking, source: TWorking) => void): boolean;
	removeNode(data: unknown): boolean;
}

/**
 * Stub genérico para satisfacer el contrato `Catalogo`-style de las capas
 * heredadas (Insertar/Actualizar/Eliminar/Act*) delegando contra un adapter
 * de árbol que expone `addNode/updateNode/removeNode`.
 *
 * Genérico: cualquier adapter que extienda la cascada `_treeAdapter` puede
 * reutilizarlo en lugar de redefinir el mismo boilerplate.
 *
 * Uso en constructor:
 * ```ts
 * const stub = new TreeAdapterCatalogoStub<T>(() => self);
 * super({ ... CatalogoController: stub ... });
 * const self = this;
 * ```
 */
export class TreeAdapterCatalogoStub<TWorking extends ITreeData<TWorking>> {
	constructor(private readonly getAdapter: () => CatalogoStubTarget<TWorking> | null) {}
	private get adapter(): CatalogoStubTarget<TWorking> | null { return this.getAdapter(); }

	Insertar = async (_o: unknown, item: TWorking): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return !!a.addNode(item);
	};
	Actualizar = async (_o: unknown, item: TWorking): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return a.updateNode(item);
	};
	Eliminar = async (item: TWorking): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return a.removeNode(item);
	};
	ActInsertar = (o: unknown, item: TWorking): Promise<boolean> => this.Insertar(o, item);
	ActActualizar = (o: unknown, item: TWorking): Promise<boolean> => this.Actualizar(o, item);
	ActEliminar = (item: TWorking): Promise<boolean> => this.Eliminar(item);
	ActVisualizar = async (_item: TWorking): Promise<boolean> => true;
	ActModificar = async (_item: TWorking): Promise<boolean> => true;
	ActRecodificar = async (_o: TWorking, _n: TWorking): Promise<boolean> => true;
}
