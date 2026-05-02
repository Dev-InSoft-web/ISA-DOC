import type { TreeViewProps } from "../../_comps/TreeView/TreeRowView.svelte";
import { TreeRowViewAdapter } from "../../_comps/TreeView/TreeRowView.svelte";
import { TreeAdapterCatalogoStub } from "../../_comps/TreeView/_treeAdapter/CatalogoStub";
import type { ParsedTable } from "../../../lib/tableSchema";
import { TSqlNodeUX } from "./TSqlNodeUX";
import type { SqlNodeKind } from "./TSqlNodeUX";
import { TSqlTableUX } from "./TSqlTableUX";

export type SqlTreeChangeFn = (next: ParsedTable) => void;

/**
 * Persistencia in-memory del estado oculto de la sección AUDITORIA por tabla.
 * Permite que al cambiar de pestaña y regresar, el switch recupere su valor.
 * Clave: `tableId` (`fragmentId::originalName`).
 */
const auditHiddenByTableId: Map<string, boolean> = new Map();

export class SqlTreeAdapter extends TreeRowViewAdapter<TSqlTableUX, TSqlNodeUX> {
	public onChange: SqlTreeChangeFn = () => undefined;

	constructor(table: ParsedTable, onChange?: SqlTreeChangeFn) {
		const stacker = new TSqlTableUX(table);
		const stub = new TreeAdapterCatalogoStub<TSqlNodeUX>(() => self);
		super({
			Obj: stacker,
			itdForm: "edit",
			small: false,
			brapido: true,
			disabled: false,
			showToolbar: true,
			bdrag: true,
			CatalogoController: stub as unknown as TreeViewProps<TSqlTableUX, TSqlNodeUX>["CatalogoController"],
			TreeController: undefined as unknown as TreeRowViewAdapter<TSqlTableUX, TSqlNodeUX>,
		} as TreeViewProps<TSqlTableUX, TSqlNodeUX>);
		this.context.TreeController = this;
		const self = this;
		this.applyAdapterConfig({
			floatCard: { scale: 0.8 },
		});
		if (onChange) this.onChange = onChange;
		// Restaura el estado oculto de auditoría si fue persistido en una sesión previa.
		// Usa primero el flag `active` del nodo `optional` (fuente canónica desde V4) y,
		// como fallback, el cache en memoria por compatibilidad.
		const auditOpt = this.obj.auditOptionalNode();
		if (auditOpt) {
			auditOpt.active = !!auditOpt.active;
		} else if (auditHiddenByTableId.get(this.obj.tableId) === true && this.obj.hasAudit()) {
			this.setAuditEnabledInternal(false, false);
		}
		this.onrefresh();
	}

	get stack(): TSqlTableUX { return this.obj; }
	get stackList(): any[] { return this.obj.rows as unknown as any[]; }
	set stackList(value: any[]) { this.obj.rows = value as unknown as TSqlNodeUX[]; }

	get istack(): string { return this.obj.tableId; }
	get nistack(): string { return "tableId"; }
	get nodeCtor(): new (...args: any[]) => TSqlNodeUX { return TSqlNodeUX; }
	get nidNode(): string { return "flatPath"; }
	get ntitleNode(): string { return "rowName"; }

	createNode(data: any): TSqlNodeUX {
		if (data instanceof TSqlNodeUX) {
			data.stack = this.obj;
			data.refreshUX();
			return data;
		}
		const node = new TSqlNodeUX(data as unknown as Partial<TSqlNodeUX>, this.obj);
		return node;
	}

	getlevelname(nivel?: number, _record?: any): string {
		return nivel === 1 ? "Sección" : "Columna";
	}

	protected override getNodeIcon(node: TSqlNodeUX): { icon?: string; color?: any; style?: string } | null {
		const kind = node?.kind;
		if (kind === "column") return { icon: "mdi:table-column", color: "info" };
		if (kind === "section") return { icon: "mdi:format-list-group", style: "color: #C9A227" };
		if (kind === "optional") {
			const active = !!node?.active;
			return active
				? { icon: "mdi:format-list-group", style: "color: #C9A227" }
				: { icon: "mdi:eye-off-outline", color: "neutral" };
		}
		return null;
	}

	getEditDriverAttrs(): any[] { return []; }
	getEditAttrsForLevel(_d: any[], _p: TSqlNodeUX): any[] { return []; }
	canEditSelectResource(_p: TSqlNodeUX, _d: TSqlNodeUX): boolean { return false; }

	override getToolsBarActions(): any[] {
		const addDisabled = this.isViewMode || this.isReadOnly || undefined;
		const addLabel = this.getAddRootLabel();
		const addTitle = addDisabled ? `${addLabel} — No disponible en modo lectura` : addLabel;
		return [
			{
				icon: "mdi:plus-circle-outline",
				title: addTitle,
				label: addLabel,
				disabled: addDisabled,
				onClick: () => { if (!addDisabled) this.onaddroot(); },
			},
			{ icon: "mdi:unfold-less-horizontal", title: "Colapsar todo", onClick: () => this.collapseAll?.() },
			{ icon: "mdi:unfold-more-horizontal", title: "Expandir todo", onClick: () => this.expandAll?.() },
		];
	}
	getEditAtributoValor(_d: TSqlNodeUX, _i: number): string { return ""; }
	setEditAtributoValor(d: TSqlNodeUX, _i: number, _v: string): TSqlNodeUX { return d; }
	setEditRecursoSelected(d: TSqlNodeUX, _r: any): TSqlNodeUX { return d; }

	private _siblingKindHint: SqlNodeKind | null = null;

	/**
	 * Override: en el árbol SQL no usamos el selector de último nivel.
	 * Cuando el padre es penúltimo (sección), añadimos directamente una columna hija.
	 */
	protected override onAddChildLastLevel(referenceId: string): void {
		const ref = this.normalizeNodeId(referenceId);
		const nodeId = this.getNextNodeId(ref);
		const newItem = {
			ireference: ref,
			...this.prepareNewNode(nodeId, ref),
			...this.getNewNodeDefaults(ref),
		};
		const uxItem = this.toNode(newItem as any);
		void this.CatalogoController?.ActInsertar?.(this.stack, uxItem);
		this.applySelection(uxItem);
		this.onrefresh();
		this.syncAllRowAdapters();
		this.emitChange();
		const item = this._item;
		item && this.showFrmModificar(item);
		!item && this.setShowFrm?.(true);
	}

	protected override async openSiblingDrawer(ref: TSqlNodeUX, pos: "above" | "below"): Promise<void> {
		this._siblingKindHint = ref.kind;
		try {
			await super.openSiblingDrawer(ref, pos);
		} finally {
			this._siblingKindHint = null;
		}
	}

	protected getNewNodeDefaults(referenceId: string): Partial<TSqlNodeUX> {
		const ref = this.normalizeNodeId(referenceId);
		const refNode = ref ? (this.findNodeById(ref) as unknown as TSqlNodeUX | undefined) : null;
		const hint = this._siblingKindHint;
		const wantColumn = hint === "column" || (hint === null && refNode?.kind === "section");
		const tableId = this.obj.tableId;
		if (wantColumn) {
			return {
				tableId,
				kind: "column",
				rowName: "NUEVA_COLUMNA",
				colType: "VARCHAR(255)",
				nullable: "",
				defaultValue: "",
				primaryKey: false,
				colExtra: "",
				ireference: ref,
			} as Partial<TSqlNodeUX>;
		}
		return {
			tableId,
			kind: "section",
			rowName: "NUEVA_SECCION",
			ireference: "",
		} as Partial<TSqlNodeUX>;
	}

	protected commitFlatList(flat: TSqlNodeUX[]): void {
		this.obj.rows = flat.map((n) => {
			n.stack = this.obj;
			n.refreshUX();
			return n;
		});
		this.emitChange();
	}

	emitChange(): void {
		const next = this.obj.exportToParsed();
		this.onChange(next);
	}

	get catalogoController(): TreeViewProps<TSqlTableUX, TSqlNodeUX>["CatalogoController"] {
		return this.context.CatalogoController;
	}

	commitInlineEdit(node: TSqlNodeUX, patch: Partial<TSqlNodeUX>): void {
		Object.assign(node, patch);
		node.refreshUX();
		this.emitChange();
		this.syncAllRowAdapters();
	}

	/**
	 * Una sección `optional` con `active=false` se oculta por completo del
	 * diagrama de filas (el nodo y todos sus hijos). Solo puede volver a
	 * mostrarse desde el switch superior. La data se conserva en `obj.rows`
	 * para no perder ediciones; el filtro aplica únicamente a la vista.
	 */
	override buildTree(planes: any[]): TSqlNodeUX[] {
		const rows = planes as TSqlNodeUX[];
		const hiddenPrefixes: string[] = [];
		for (const r of rows) {
			if (r?.kind === "optional" && !r.active) hiddenPrefixes.push(String(r.flatPath || ""));
		}
		if (hiddenPrefixes.length === 0) return super.buildTree(rows) as TSqlNodeUX[];
		const visible = rows.filter((r) => {
			const id = String(r?.flatPath || "");
			for (const p of hiddenPrefixes) {
				if (id === p || id.startsWith(p + ".")) return false;
			}
			return true;
		});
		return super.buildTree(visible) as TSqlNodeUX[];
	}

	/** En SQL, el root admite secciones y columnas (columnas-raíz son válidas). */
	override canDropAtRoot(src: TSqlNodeUX): boolean {
		return src.kind === "section" || src.kind === "column";
	}

	/**
	 * Refuerzos sobre el `canDrop` base:
	 * - La sección AUDITORIA (entidad `optional`) no se puede mover; debe permanecer al final.
	 * - Nada se puede colocar `after` la sección opcional en el root (debe quedar última).
	 */
	override canDrop(sourceId: string, targetId: string, position: "before" | "after" | "into"): boolean {
		if (!super.canDrop(sourceId, targetId, position)) return false;
		const sId = this.normalizeNodeId(sourceId);
		const tId = this.normalizeNodeId(targetId);
		const src = this.findNodeById(sId) as unknown as TSqlNodeUX | undefined;
		const tgt = this.findNodeById(tId) as unknown as TSqlNodeUX | undefined;
		const isOpt = (n?: TSqlNodeUX): boolean => !!n && n.kind === "optional";
		if (isOpt(src)) return false;
		if (isOpt(tgt) && !tgt!.ireference && position === "after") return false;
		return true;
	}

	override get groupTypes(): readonly string[] { return ["section", "optional"]; }
	override get actionTypes(): readonly string[] { return ["section", "optional"]; }

	/**
	 * Reemplaza, para nodos `optional`, el botón de eliminar por un ojito que
	 * alterna `show`. La sección opcional NO se elimina; solo se oculta/muestra.
	 */
	override getRowConfig(node: TSqlNodeUX): any {
		const cfg = super.getRowConfig(node);
		if (!cfg || node?.kind !== "optional") return cfg;
		const active = !!node.active;
		const eyeAction = {
			icon: active ? "mdi:eye-outline" : "mdi:eye-off-outline",
			title: active ? "Ocultar sección opcional" : "Mostrar sección opcional",
			color: "neutral" as const,
			onClick: () => this.setAuditEnabled(!active),
		};
		const replaceDelete = (item: unknown): unknown => {
			if (Array.isArray(item)) return item.map(replaceDelete).filter(Boolean);
			if (item && typeof item === "object") {
				const it = item as { icon?: string };
				if (typeof it.icon === "string" && it.icon.includes("delete")) return eyeAction;
			}
			return item;
		};
		return { ...cfg, actions: (cfg.actions ?? []).map(replaceDelete) };
	}

	/**
	 * El TreeAdapter actúa como contenedor virtual de los nodos raíz con rol
	 * `monarchy`: la sección AUDITORIA implementa `freeze() => true`, lo que
	 * la mantiene inamovible y oculta su drag handle. El resto de secciones
	 * raíz devuelven `freeze() => false` y se mueven libremente.
	 */
	override getRootActor(): "" | "monarchy" | "freezer" { return "monarchy"; }

	protected override particularcascadeoptionsrow(node: TSqlNodeUX): any[] {
		if (node?.kind === "optional" && node.rowName === "AUDITORIA") {
			return [
				{
					icon: "mdi:restore",
					label: "Restablecer columnas",
					title: "Restaurar todas las columnas de auditoría por defecto",
					onClick: () => this.resetAuditColumns(),
				},
			];
		}
		return [];
	}

	/** ¿La sección AUDITORIA (entidad `optional`) está visible? */
	get auditEnabled(): boolean {
		const opt = this.obj.auditOptionalNode();
		return opt ? !!opt.active : false;
	}

	/** ¿La tabla es master de un dominio auto-stack? */
	get isAutoStackMaster(): boolean {
		return this.obj.parsed.autoStack === true;
	}

	/** Inyección de tabla virtual de historial dentro del auto-stack (default `true`). */
	get historialEnabled(): boolean {
		return this.isAutoStackMaster && this.obj.parsed.autoStackHistorial !== false;
	}

	/** Activa/desactiva la inyección de la tabla virtual HISTORIAL. */
	setHistorialEnabled(enabled: boolean): void {
		if (!this.isAutoStackMaster) return;
		const current = this.obj.parsed.autoStackHistorial !== false;
		if (current === enabled) return;
		this.obj.parsed = { ...this.obj.parsed, autoStackHistorial: enabled ? undefined : false };
		this.emitChange();
	}

	/**
	 * Activa/desactiva el bloque de auditoría:
	 * - `true`: si está oculta, restaura desde el cache (preserva ediciones).
	 *   Si no existe, agrega la sección AUDITORIA al final con las columnas
	 *   por defecto.
	 * - `false`: oculta la sección AUDITORIA y todas sus columnas hijas, las
	 *   guarda en cache para poder restaurarlas. NO las elimina del modelo.
	 */
	setAuditEnabled(enabled: boolean): void {
		this.setAuditEnabledInternal(enabled, true);
	}

	private setAuditEnabledInternal(enabled: boolean, emit: boolean): void {
		const rows = this.obj.rows;
		let optional = this.obj.auditOptionalNode();
		if (!optional) {
			// No existe el nodo: si se solicita activar, crearlo con columnas por defecto.
			// Si se solicita desactivar y no existe, no hay nada que hacer.
			if (!enabled) return;
			const tableId = this.obj.tableId;
			const usedTopIdx = rows.reduce((max, r) => {
				const idStr = String(r.flatPath || "");
				if (idStr.includes(".")) return max;
				const n = parseInt(idStr, 10);
				return Number.isFinite(n) && n > max ? n : max;
			}, 0);
			const sid = String(usedTopIdx + 1);
			optional = TSqlNodeUX.fromOptional({ kind: "optional", name: "AUDITORIA", show: true }, sid, tableId, this.obj);
			const cols = TSqlTableUX.defaultAuditColumns().map((c, i) =>
				TSqlNodeUX.fromColumn(c, `${sid}.${i + 1}`, sid, tableId, this.obj),
			);
			this.obj.rows = [...rows, optional, ...cols];
		} else {
			optional.active = enabled;
			optional.refreshUX();
		}
		auditHiddenByTableId.set(this.obj.tableId, !enabled);
		this.onrefresh();
		this.syncAllRowAdapters();
		if (emit) this.emitChange();
	}

	/**
	 * Restaura todas las columnas de auditoría por defecto que el usuario haya
	 * eliminado. Comparación por nombre (case-insensitive). Inserta las
	 * faltantes al final de la sección AUDITORIA.
	 */
	resetAuditColumns(): void {
		const rows = this.obj.rows.slice();
		const audit = rows.find((r) => r.kind === "optional" && r.rowName === "AUDITORIA");
		if (!audit) return;
		const auditId = audit.flatPath;
		const presentNames = new Set(
			rows.filter((r) => r.kind === "column" && r.ireference === auditId).map((r) => String(r.rowName).toUpperCase()),
		);
		const tableId = this.obj.tableId;
		const existingChildIdxs = rows
			.filter((r) => r.kind === "column" && r.ireference === auditId)
			.map((r) => parseInt(String(r.flatPath).split(".").pop() || "0", 10))
			.filter((n) => Number.isFinite(n));
		let nextIdx = existingChildIdxs.length ? Math.max(...existingChildIdxs) : 0;
		const toAdd: TSqlNodeUX[] = [];
		for (const c of TSqlTableUX.defaultAuditColumns()) {
			if (presentNames.has(c.name.toUpperCase())) continue;
			nextIdx += 1;
			toAdd.push(TSqlNodeUX.fromColumn(c, `${auditId}.${nextIdx}`, auditId, tableId, this.obj));
		}
		if (toAdd.length === 0) return;
		// Inserta las nuevas columnas justo después del último hijo de AUDITORIA.
		const lastChildIdx = rows.reduce((idx, r, i) => (r.kind === "column" && r.ireference === auditId ? i : idx), rows.indexOf(audit));
		this.obj.rows = [...rows.slice(0, lastChildIdx + 1), ...toAdd, ...rows.slice(lastChildIdx + 1)];
		this.onrefresh();
		this.syncAllRowAdapters();
		this.emitChange();
	}
}
