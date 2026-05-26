import type { CardProps } from "$lib/containers/Card.svelte";
import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";

type TCardVariantSel = "" | "solid" | "flat";

const cardVariantOptions: Record<string, TCardVariantSel> = {
   Ninguno: "",
   solid: "solid",
   flat: "flat",
};

const cardVariantIcons: Record<string, IconifyProps["icon"]> = {
   "": "mdi:card-bulleted",
   solid: "mdi:card-bulleted",
   flat: "mdi:card-outline",
};

export class DemoCardAdapter extends DemoController<CardProps> {
   componentName = "Card";
   componentPath = "src/lib/containers/Card.svelte";

   initialState(): CardProps {
      return {
         variant: "",
         inline: false,
      };
   }

   initialDetails(): TDemoDetails {
      return { relieve: 65, relieveDirIndex: 0, elevation: 0 };
   }

   fields(): TDemoField<CardProps>[] {
      return [
         {
            kind: "palette",
            key: "variant",
            label: "variant",
            labelIcon: "mdi:shape-outline",
            attrType: "str",
            attrDefault: "solid",
            attrEmit: (v) => (v === "" ? undefined : v),
            options: cardVariantOptions,
            accent: "primary",
            getIcon: (val) => cardVariantIcons[String(val ?? "")] ?? "mdi:block-helper",
         },
         {
            kind: "switch",
            key: "inline",
            label: "inline",
            labelIcon: "mdi:tune",
         },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "range",
            key: "relieve",
            label: "relieve",
            labelIcon: "mdi:gradient-horizontal",
            min: 0,
            max: 100,
            step: 1,
         },
      ];
   }

   buildBody(_state: CardProps, _details: TDemoDetails, h: TBodyHelpers): string {
      return h.txt("Contenido de ejemplo dentro de la card.");
   }
}
