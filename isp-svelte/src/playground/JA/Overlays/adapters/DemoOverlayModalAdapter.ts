import type { ModalProps } from "$lib/overlays/Modal.svelte";
import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
import { DemoController, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildTag, type TAttrItem } from "../../_Utils/Utils";

const demoBody = (): string =>
   buildTag("div", [{ name: "style", value: "padding: 3rem;", type: "str" }], { multiline: true }, ({ txt }) => txt("Contenido de demostración."));

const titleSlotSnippet = (icono: IconifyProps["icon"], titulo: string): string =>
   buildTag("FlexLayout", [{ name: "slot", value: "title", type: "str" }], { multiline: true }, () =>
      [
         buildTag("Iconify", [{ name: "icon", value: icono, type: "str" }]),
         buildTag(
            "span",
            [{ name: "style", value: "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;", type: "str" }],
            {},
            ({ txt }) => txt(titulo),
         ),
      ].join("\n"),
   );

export class DemoOverlayModalAdapter extends DemoController<ModalProps> {
   componentName = "Modal";
   componentPath = "src/lib/overlays/Modal.svelte";

   initialState(): ModalProps {
      return {
         _scope: "global",
         showCloseHeader: true,
      };
   }

   initialDetails(): TDemoDetails {
      return {
         titulo: "Modal Demo",
         icono: "logos:svelte-icon",
         bTituloPorSlot: true,
         bSimularLoading: false,
      };
   }

   fields(): TDemoField<ModalProps>[] {
      return [
         { kind: "switch", key: "showCloseHeader", label: "showCloseHeader", attrOmit: true },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "icon-text",
            key: "titulo-icono",
            label: "Título",
            labelIcon: "mdi:format-title",
            iconKey: "icono",
            textKey: "titulo",
         },
         { kind: "switch", key: "bTituloPorSlot", label: "Título por slot" },
         { kind: "switch", key: "bSimularLoading", label: "Simular loading (5s al abrir)" },
      ];
   }

   buildCode(state: ModalProps, details: TDemoDetails = {}, demoStyle: string = "", demoClass: string = ""): string {
      const bTituloPorSlot = Boolean(details.bTituloPorSlot);
      const bBotonCerrar = state.showCloseHeader !== false;
      const modalSinCabecera = !bTituloPorSlot && !bBotonCerrar;
      const attrs: TAttrItem[] = [
         { name: "bshow", value: "modalShow", type: "bind" },
         { name: "_scope", value: state._scope, type: "str" },
         { name: "lockViewportScroll", value: false, type: "bool", explicitFalse: true },
         { name: "style", value: demoStyle || null, type: "str", default: null },
         { name: "class", value: demoClass || null, type: "str", default: null },
      ];
      if (!bBotonCerrar) {
         attrs.push({ name: "showCloseHeader", value: false, type: "bool", explicitFalse: true });
      }
      return buildTag(this.componentName, attrs, { multiline: true }, () => {
         if (modalSinCabecera) return demoBody();
         if (bTituloPorSlot) return [titleSlotSnippet(details.icono as IconifyProps["icon"], String(details.titulo ?? "")), demoBody()].join("\n");
         return demoBody();
      });
   }
}
