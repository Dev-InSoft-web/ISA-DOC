import type { ButtonProps } from "$lib/primitives/iconized/Button.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildTag } from "../../_Utils/Utils";

const variantIcons: Record<string, string> = {
   "": "mdi:block-helper",
   solid: "mdi:checkbox-blank-circle",
   outlined: "mdi:checkbox-blank-circle-outline",
   ghost: "mdi:ghost-outline",
   soft: "mdi:blur",
   text: "mdi:format-text",
};

const typeIcons: Record<string, string> = {
   button: "mdi:gesture-tap",
   submit: "mdi:form-select",
   reset: "mdi:restore",
};

export class DemoButtonAdapter extends DemoController<ButtonProps> {
   componentName = "Button";
   componentPath = "src/lib/primitives/iconized/Button.svelte";
   previewScale = 1.6;

   initialState(): ButtonProps {
      return {
         color: undefined,
         variant: undefined,
         type: "button",
         disabled: false,
         loading: false,
      };
   }

   initialDetails(): TDemoDetails {
      return { text: "Texto de prueba", icon: "" };
   }

   fields(): TDemoField<ButtonProps>[] {
      return [
         {
            kind: "palette",
            key: "variant",
            label: "Variante",
            labelIcon: "mdi:shape-outline",
            attrType: "str",
            attrDefault: "solid",
            options: [
               { label: "Por defecto", value: undefined },
               { label: "solid", value: "solid" },
               { label: "outlined", value: "outlined" },
               { label: "ghost", value: "ghost" },
               { label: "soft", value: "soft" },
               { label: "text", value: "text" },
            ],
            accent: "primary",
            getIcon: (val: unknown) => variantIcons[String(val ?? "")] ?? variantIcons[""],
         },
         {
            kind: "palette",
            key: "type",
            label: "Tipo",
            labelIcon: "mdi:format-list-bulleted-type",
            attrDefault: "button",
            options: [
               { label: "button", value: "button" },
               { label: "submit", value: "submit" },
               { label: "reset", value: "reset" },
            ],
            accent: "primary",
            getIcon: (val: unknown) => typeIcons[String(val)] ?? "mdi:gesture-tap",
         },
         {
            kind: "color",
            key: "color",
            label: "Color",
            labelIcon: "mdi:palette",
            attrType: "color",
         },
         {
            kind: "switch-group",
            key: "estados",
            label: "Estado",
            labelIcon: "mdi:tune",
            switches: [
               { key: "disabled", label: "disabled" },
               { key: "loading", label: "loading" },
            ],
         },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "icon-text",
            key: "icon-text",
            label: "Texto e ícono",
            labelIcon: "mdi:text-box-multiple-outline",
            iconKey: "icon",
            textKey: "text",
         },
      ];
   }

   buildBody(_state: ButtonProps, details: TDemoDetails, h: TBodyHelpers): string {
      const lines: string[] = [];
      const icon = String(details.icon ?? "");
      const text = String(details.text ?? "");
      if (icon) {
         lines.push(buildTag("Iconify", [{ name: "slot", value: "icon" }, { name: "icon", value: icon }]));
      }
      if (text.trim()) lines.push(h.txt(text));
      return lines.join("\n");
   }
}
