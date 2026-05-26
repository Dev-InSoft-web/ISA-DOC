import type { FlexLayoutProps } from "$lib/containers/layout/FlexLayout.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildLayoutPreviewItemSnippet, LAYOUT_PREVIEW_EMOJIS } from "../../_Utils/Utils";

type TFlexDirection = Exclude<FlexLayoutProps["direction"], undefined>;
type TFlexJustify = FlexLayoutProps["justify"];
type TFlexItems = FlexLayoutProps["items"];

const flexDirectionEnum: Record<string, TFlexDirection> = {
   Row: "row",
   Column: "column",
   "Row Reverse": "row-reverse",
   "Column Reverse": "column-reverse",
};

const flexJustifyEnum: Record<string, TFlexJustify> = {
   Vacío: undefined,
   start: "start",
   end: "end",
   center: "center",
   between: "between",
   around: "around",
   evenly: "evenly",
};

const alignItemsEnum: Record<string, TFlexItems> = {
   start: "start",
   end: "end",
   center: "center",
   stretch: "stretch",
};

const clampItems = (n: unknown): number => Math.min(50, Math.max(1, Math.round(Number(n)) || 4));

const normalizeCssLength = (raw: string): string => {
   const trimmed = (raw ?? "").trim();
   if (!trimmed) return "";
   return /^-?\d*\.?\d+$/.test(trimmed) ? `${trimmed}rem` : trimmed;
};

export class DemoFlexLayoutAdapter extends DemoController<FlexLayoutProps> {
   componentName = "FlexLayout";
   componentPath = "src/lib/containers/layout/FlexLayout.svelte";

   initialState(): FlexLayoutProps {
      return {
         direction: "row",
         justify: undefined,
         items: undefined,
         inline: false,
         wrap: false,
         gap: undefined,
      };
   }

   initialDetails(): TDemoDetails {
      return { itemCount: 4 };
   }

   tagOpts() {
      return { multiline: true };
   }

   fields(): TDemoField<FlexLayoutProps>[] {
      return [
         {
            kind: "select-enum",
            key: "direction",
            label: "direction",
            labelIcon: "mdi:arrow-split-vertical",
            enumValue: flexDirectionEnum,
            attrType: "str",
         },
         {
            kind: "select-enum-row",
            key: "justify-items",
            label: "alineación",
            labelIcon: "mdi:format-align-center",
            selects: [
               {
                  kind: "select-enum",
                  key: "justify",
                  label: "justify",
                  labelIcon: "mdi:format-horizontal-align-left",
                  enumValue: flexJustifyEnum,
                  attrType: "str",
               },
               {
                  kind: "select-enum",
                  key: "items",
                  label: "items",
                  labelIcon: "mdi:format-vertical-align-center",
                  enumValue: alignItemsEnum,
                  required: false,
                  attrType: "str",
               },
            ],
         },
         {
            kind: "switch-group",
            key: "estados",
            label: "Estados",
            labelIcon: "mdi:tune",
            switches: [
               { key: "inline", label: "inline" },
               { key: "wrap", label: "wrap" },
            ],
         },
         {
            kind: "text",
            key: "gap",
            label: "gap",
            labelIcon: "mdi:arrow-expand-horizontal",
            placeholder: "ej: 0.75rem",
            normalize: normalizeCssLength,
         },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "number",
            key: "itemCount",
            label: "Elementos",
            labelIcon: "mdi:numeric",
            min: 1,
            max: 50,
            step: 1,
         },
      ];
   }

   buildBody(_state: FlexLayoutProps, details: TDemoDetails, _h: TBodyHelpers): string {
      const n = clampItems(details.itemCount);
      return Array.from({ length: n }, (_, i) =>
         buildLayoutPreviewItemSnippet(LAYOUT_PREVIEW_EMOJIS[i % LAYOUT_PREVIEW_EMOJIS.length], false, { compactStyle: true }),
      ).join("\n");
   }
}
