import type { CheckboxIconProps } from "$lib/primitives/iconized/CheckboxIcon.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildTag, iconEnum, type TAttrItem } from "../../_Utils/Utils";

export class DemoCheckboxIconAdapter extends DemoController<CheckboxIconProps> {
   componentName = "CheckboxIcon";
   componentPath = "src/lib/primitives/iconized/CheckboxIcon.svelte";
   previewScale = 1.3;

   initialState(): CheckboxIconProps {
      return {
         checked: true,
         color: undefined,
         colorFalse: undefined,
         loading: false,
         disabled: false,
      };
   }

   initialDetails(): TDemoDetails {
      return {
         previewLabel: "Texto de demostración",
         previewIconTrue: iconEnum["Rocket (Emoji)"],
         previewIconFalse: iconEnum["Fire (Emoji)"],
      };
   }

   fields(): TDemoField<CheckboxIconProps>[] {
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
            key: "previewLabel",
            label: "slot",
            labelIcon: "mdi:text-short",
            placeholder: "Ingrese un texto descriptivo",
         },
         {
            kind: "select-enum",
            key: "previewIconTrue",
            label: "Ícono on",
            labelIcon: "mdi:image-multiple-outline",
            enumValue: iconEnum,
         },
         {
            kind: "select-enum",
            key: "previewIconFalse",
            label: "Ícono off",
            labelIcon: "mdi:image-multiple-outline",
            enumValue: iconEnum,
         },
      ];
   }

   buildCode(state: CheckboxIconProps, details: TDemoDetails = {}, demoStyle: string = "", demoClass: string = ""): string {
      const attrs: TAttrItem[] = [
         { name: "checked", type: "bind", value: "value" },
         ...this.collectAttrs(state),
         { name: "style", value: demoStyle || null, type: "str", default: null },
         { name: "class", value: demoClass || null, type: "str", default: null },
      ];
      return buildTag(this.componentName, attrs, this.tagOpts(state, details), this.buildBody ? (h) => this.buildBody!(state, details, h) : undefined);
   }

   buildBody(_state: CheckboxIconProps, details: TDemoDetails, h: TBodyHelpers): string {
      const iconLine = (slot: string, ic: unknown): string => {
         const r = String(ic ?? "");
         if (!r.trim()) return "";
         return `${h.punc("<")}${h.cl("Iconify")} ${h.prop("slot")}${h.punc("=")}${h.str(slot)} ${h.prop("icon")}${h.punc("=")}${h.str(r)} ${h.punc("/>")}`;
      };
      return [
         iconLine("iconTrue", details.previewIconTrue),
         iconLine("iconFalse", details.previewIconFalse),
         h.txt(String(details.previewLabel ?? "Texto")),
      ]
         .filter(Boolean)
         .join("\n");
   }
}
