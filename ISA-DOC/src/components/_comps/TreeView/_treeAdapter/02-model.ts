import { type ITreeData } from "../_asRow/_rowAdapter/00-base";
import { TTreeAdapterContract } from "./01-contract";

export abstract class TAModel<Stacker, TWorking extends ITreeData<TWorking>> extends TTreeAdapterContract<Stacker, TWorking> {

	showFrmModificar: (Obj: TWorking) => void = () => undefined;

	showFrmVisualizar: (Obj: TWorking) => void = () => undefined;

	showEliminar: (Obj: TWorking) => void = () => undefined;

	setShowFrm: (b: unknown) => unknown = () => undefined;

	bindParentData(
		setShowFrm: (b: unknown) => unknown,
		showFrmModificar: (Obj: TWorking) => void,
		showFrmVisualizar: (Obj: TWorking) => void,
		showEliminar: (Obj: TWorking) => void,
	): void {
		this.setShowFrm = setShowFrm;
		this.showFrmModificar = showFrmModificar;
		this.showFrmVisualizar = showFrmVisualizar;
		this.showEliminar = showEliminar;
	}

	
	protected _pendingInsertId: string = "";

	
	protected _pendingExpandedSnapshot: string[] = [];

	
	get ntitleNode(): string { return ""; }

	
	get stackListNodes(): TWorking[] {
		return this.stackList.map((p) => this.toNode(p));
	}

	
	protected sortFnBuildTree(_a: TWorking, _b: TWorking): number { return 0 }

	get obj(): Stacker { return this.context.Obj; }

	set obj(value: Stacker) {
		this.context.Obj = value;
		this.onrefresh();
		this.resyncExpandedToCurrentTree();
	}

	
	protected get CatalogoController(): Record<string, Function> { return this.context.CatalogoController as unknown as Record<string, Function> }
}
