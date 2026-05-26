import type { BadgeProps } from "$lib/primitives/Badge.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildTag } from "../../_Utils/Utils";

const variantIcons: Record<string, string> = {
   "": "mdi:block-helper",
   solid: "mdi:checkbox-blank-circle",
   outlined: "mdi:checkbox-blank-circle-outline",
   ghost: "mdi:ghost-outline",
};

const shapeIcons: Record<string, string> = {
   round: "mdi:rounded-corner",
   rect: "mdi:square-outline",
   pill: "mdi:pill",
};

export class DemoBadgeAdapter extends DemoController<BadgeProps> {
   componentName = "Badge";
   componentPath = "src/lib/primitives/Badge.svelte";
   previewScale = 1.6;

   initialState(): BadgeProps {
      return {
         color: undefined,
         variant: undefined,
         shape: undefined,
         uppercase: false,
      };
   }

   initialDetails(): TDemoDetails {
      return { text: "Nuevo", icon: "" };
   }

   fields(): TDemoField<BadgeProps>[] {
      return [
         {
            kind: "palette",
            key: "variant",
            label: "Variante",
            labelIcon: "mdi:shape-outline",
            attrType: "str",
            attrDefault: "ghost",
            options: [
               { label: "solid", value: "solid" },
               { label: "outlined", value: "outlined" },
               { label: "ghost", value: "ghost" },
            ],
            accent: "primary",
            getIcon: (val: unknown) => variantIcons[String(val ?? "")] ?? variantIcons[""],
         },
         {
            kind: "palette",
            key: "shape",
            label: "Forma",
            labelIcon: "mdi:vector-square",
            attrType: "str",
            attrDefault: "pill",
            options: [
               { label: "round", value: "round" },
               { label: "rect", value: "rect" },
               { label: "pill", value: "pill" },
            ],
            accent: "primary",
            getIcon: (val: unknown) => shapeIcons[String(val)] ?? "mdi:vector-square",
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
               { key: "uppercase", label: "uppercase" },
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

   buildBody(_state: BadgeProps, details: TDemoDetails, h: TBodyHelpers): string {
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
