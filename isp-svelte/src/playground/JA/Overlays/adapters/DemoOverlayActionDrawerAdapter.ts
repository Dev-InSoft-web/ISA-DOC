import type { ActionDrawerProps } from "$lib/overlays/ActionDrawer.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildTag, type TAttrItem } from "../../_Utils/Utils";

type TDrawerSide = ActionDrawerProps["side"];

const sideOptions: Record<string, TDrawerSide> = {
   Top: "top",
   Left: "left",
   Ninguno: undefined,
   Right: "right",
   Bottom: "bottom",
};

const drawerSideIcon = (val: unknown): string => {
   const v = String(val ?? "");
   if (v === "top") return "mdi:arrow-up";
   if (v === "right") return "mdi:arrow-right";
   if (v === "bottom") return "mdi:arrow-down";
   if (v === "left") return "mdi:arrow-left";
   return "mdi:block-helper";
};

export class DemoOverlayActionDrawerAdapter extends DemoController<ActionDrawerProps> {
   componentName = "ActionDrawer";
   componentPath = "src/lib/overlays/ActionDrawer.svelte";

   initialState(): ActionDrawerProps {
      return {
         side: "right",
         _scope: "global",
      };
   }

   initialDetails(): TDemoDetails {
      return { bSimularLoading: false };
   }

   fields(): TDemoField<ActionDrawerProps>[] {
      return [
         {
            kind: "palette",
            key: "side",
            label: "Lado",
            labelIcon: "mdi:dock-left",
            attrType: "str",
            attrName: "side",
            layout: "sideCross",
            accent: "primary",
            options: sideOptions,
            name: "drawer-side-2",
            getIcon: drawerSideIcon,
         },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "switch",
            key: "bSimularLoading",
            label: "Simular loading (5s al abrir)",
         },
      ];
   }

   buildCode(state: ActionDrawerProps, _details: TDemoDetails = {}, demoStyle: string = "", demoClass: string = ""): string {
      const attrs: TAttrItem[] = [
         { name: "side", value: state.side, type: "str" },
         { name: "_scope", value: state._scope, type: "str" },
         { name: "lockViewportScroll", value: false, type: "bool", explicitFalse: true },
         { name: "style", value: demoStyle || null, type: "str", default: null },
         { name: "class", value: demoClass || null, type: "str", default: null },
      ];
      return buildTag(this.componentName, attrs, {}, (h: TBodyHelpers) =>
         [h.comm(" ActionDrawer no tiene cabecera; solo contenido "), "Contenido de demostración del panel lateral."].join("\n"),
      );
   }
}
