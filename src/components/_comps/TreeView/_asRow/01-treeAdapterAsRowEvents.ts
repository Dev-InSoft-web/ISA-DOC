import type { TObject } from "@ingenieria_insoft/ispgen";
import { resolveColor } from "@ingenieria_insoft/ispsveltecomponents";
import type { StructureNode, StructureTree, ThunkNode } from "../../Form/jconfig/ObjJConfig.svelte";
import type { EditDrawerStructureCtx } from "../TreeRowView.svelte";
import { type ITreeData } from "../_treeAdapter/_defgen/00-tree-data";
import { TARowBase } from "./00-treeAdapterAsRow";

const FLEX_BTN_STYLE = "flex: 1 1 0; width: 100%;";

export class TreeRowViewAdapter<TListObj extends ITreeData<TListObj> & TObject> extends TARowBase<TListObj> {
	buildEditDrawerStructure(ctx: EditDrawerStructureCtx<TListObj>): StructureTree {
		const itd = ctx.readonly ? "view" : ctx.itdForm;
		const viewBlocked = itd === "view" && !(ctx.bAllowed?.Visualizar ?? true);
		const blockedMsg: StructureNode = { type: "FlexLayout", direction: "column", items: "center", justify: "center", style: "padding: 2rem; flex: 1;", children: [{ type: "Text", color: "neutral", slot: { default: "No tiene permisos para visualizar este registro." } }] };
		const accionesGen: ThunkNode = () => !ctx.record ? null : ({
			type: "AccionesGen", itdForm: ctx.itdForm, onItdFormChange: ctx.onItdFormChange, bRapido: true,
			postSubmit: ctx.postSubmit, onError: ctx.onError, onCancel: ctx.onclose,
			Controller: this, Obj: ctx.record, onNewObject: async () => ctx.record,
			children: [{ type: "slotDefault" }],
		});

		return [{
			type: "ActionDrawer", bshow: ctx.bshow, onclose: ctx.onclose, notClose: ctx.notClose, style: "width: 580px; max-width: 90vw;",
			children: [{
				type: "FlexLayout", direction: "column", class: "isp-tree-frm-body custom-scrollbar", cscroll: true,
				style: `height: 100%; background-color: ${resolveColor("bg")}; overflow: hidden; flex: 1 1 auto; min-height: 0;`,
				children: [{
					type: "FormJConfig", oninput: ctx.oninput, onchange: ctx.oninput,
					style: "display: contents; height: 100%; flex: 1 1 auto; min-height: 0;",
					children: [viewBlocked ? blockedMsg : accionesGen],
				}],
			}],
		}];
	}

	buildDeleteModalStructure(ctx: { bshow: boolean; loading: boolean; isBlocked: boolean; codeExpected: string; codeInput: string; onclose: () => void; oncancel: () => void; onconfirm: () => void; oncodeinput: (v: string) => void }): StructureTree {
		return [{
			type: "Modal", bshow: ctx.bshow, loading: ctx.loading, onClose: ctx.onclose,
			slot: { title: { type: "Text", color: "danger", icon: "mdi:trash-can-outline", slot: { default: `Eliminar ${this.customs?.entrie ?? "registro"}` } } },
			children: [{
				type: "FlexLayout", direction: "column", style: "padding: 0.75rem; min-width: 350px;",
				children: [
					{ type: "Text", slot: { default: "Confirme la eliminación digitando el código de seguridad del registro." } },
					{ type: "Input", label: "Código esperado", value: ctx.codeExpected, readonly: true },
					{ type: "Input", label: "Confirme código de seguridad", required: true, maxLength: 60, value: ctx.codeInput, onvalue: ctx.oncodeinput },
					{
						type: "FlexLayout", direction: "row", items: "stretch", gap: "0.5rem", style: "width: 100%; margin-top: 1rem;",
						children: [
							{ type: "Button", color: "neutral", variant: "outlined", loading: ctx.loading, style: FLEX_BTN_STYLE, onClick: ctx.oncancel, slot: { default: "Cancelar" } },
							{ type: "Button", color: "danger", disabled: ctx.loading || ctx.isBlocked, loading: ctx.loading, style: FLEX_BTN_STYLE, onClick: ctx.onconfirm, slot: { default: "Eliminar" } },
						],
					},
				],
			}],
		}];
	}

	buildProtectionModalStructure(ctx: { bshow: boolean; onclose: () => void; oncancel: () => void; onconfirm: () => void; onredoall: () => void }): StructureTree {
		const canRedo = this.historyCanRedo;

		return [{
			type: "Modal", bshow: ctx.bshow, onClose: ctx.onclose,
			slot: { title: { type: "Text", color: "warning", icon: "mdi:lock-outline", slot: { default: "Árbol protegido" } } },
			children: [{
				type: "FlexLayout", direction: "column", style: "padding: 0.75rem; min-width: 360px;",
				children: [
					{ type: "Text", slot: { default: "El árbol está protegido contra edición. ¿Cómo desea continuar?" } },
					{
						type: "FlexLayout", direction: "row", items: "stretch", gap: "0.5rem", style: "width: 100%; margin-top: 1rem;",
						children: [
							{ type: "Button", color: "neutral", variant: "outlined", style: FLEX_BTN_STYLE, onClick: ctx.oncancel, slot: { default: "Cancelar" } },
							...(canRedo ? [{ type: "Button" as const, color: "warning" as const, variant: "ghost" as const, title: "Rehace todo el historial pendiente y desprotege", style: FLEX_BTN_STYLE, onClick: ctx.onredoall, slot: { default: "Rehacer al actual" } }] : []),
							{ type: "Button", color: "warning", style: FLEX_BTN_STYLE, onClick: ctx.onconfirm, slot: { default: "Desproteger" } },
						],
					},
				],
			}],
		}];
	}
}
