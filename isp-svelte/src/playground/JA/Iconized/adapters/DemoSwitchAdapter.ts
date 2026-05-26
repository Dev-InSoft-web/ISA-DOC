import type { SwitchProps } from "$lib/primitives/iconized/Switch.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildTag, colorIcons, type TAttrItem } from "../../_Utils/Utils";

export class DemoSwitchAdapter extends DemoController<SwitchProps> {
   componentName = "Switch";
   componentPath = "src/lib/primitives/iconized/Switch.svelte";
   previewScale = 1.3;

   initialState(): SwitchProps {
      return {
         checked: true,
         color: undefined,
         colorFalse: undefined,
         loading: false,
         disabled: false,
      };
   }

   initialDetails(): TDemoDetails {
      return { label: "Texto de demostración" };
   }

   fields(): TDemoField<SwitchProps>[] {
      return [
         {
            kind: "color",
            key: "color",
            label: "Activo",
            labelIcon: "mdi:palette-swatch",
            attrType: "color",
         },
         {
            kind: "color",
            key: "colorFalse",
            label: "Inactivo",
            labelIcon: "mdi:palette-outline",
            attrType: "color",
         },
         {
            kind: "switch-group",
            key: "estados",
            label: "Estado",
            labelIcon: "mdi:tune",
            switches: [
               { key: "loading", label: "loading" },
               { key: "disabled", label: "disabled" },
            ],
         },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "text",
            key: "label",
            label: "slot",
            labelIcon: "mdi:text-short",
            placeholder: "Ingrese un texto descriptivo",
         },
      ];
   }

   buildCode(state: SwitchProps, details: TDemoDetails = {}, demoStyle: string = "", demoClass: string = ""): string {
      const attrs: TAttrItem[] = [
         { name: "checked", type: "bind", value: "value" },
         ...this.collectAttrs(state),
         { name: "style", value: demoStyle || null, type: "str", default: null },
         { name: "class", value: demoClass || null, type: "str", default: null },
      ];
      return buildTag(this.componentName, attrs, this.tagOpts(state, details), this.buildBody ? (h) => this.buildBody!(state, details, h) : undefined);
   }

   buildBody(_state: SwitchProps, details: TDemoDetails, h: TBodyHelpers): string {
      return h.txt(String(details.label ?? "Texto"));
   }
}

export const switchColorIcon = (val: unknown): string => (val ? colorIcons[String(val)] ?? "mdi:block-helper" : "mdi:block-helper");
