import type { GridLayoutProps } from "$lib/containers/layout/GridLayout.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildLayoutPreviewItemSnippet, LAYOUT_PREVIEW_EMOJIS } from "../../_Utils/Utils";

type TGridDirection = Exclude<GridLayoutProps["direction"], undefined>;
type TGridJustify = GridLayoutProps["justify"];
type TGridItems = GridLayoutProps["items"];

const gridJustifyEnum: Record<string, TGridJustify> = {
   Vacío: undefined,
   start: "start",
   end: "end",
   center: "center",
   between: "between",
   around: "around",
   evenly: "evenly",
};

const gridItemsEnum: Record<string, TGridItems> = {
   Vacío: undefined,
   start: "start",
   end: "end",
   center: "center",
   stretch: "stretch",
};

const gridDirectionEnum: Record<string, TGridDirection> = {
   Columnas: "column",
   Filas: "row",
};

const nClamp = (v: unknown): number => Math.min(50, Math.max(3, Math.round(Number(v)) || 7));

const normalizeCssLength = (raw: string): string => {
   const trimmed = (raw ?? "").trim();
   if (!trimmed) return "";
   return /^-?\d*\.?\d+$/.test(trimmed) ? `${trimmed}rem` : trimmed;
};

export class DemoGridLayoutAdapter extends DemoController<GridLayoutProps> {
   componentName = "GridLayout";
   componentPath = "src/lib/containers/layout/GridLayout.svelte";

   initialState(): GridLayoutProps {
      return {
         cells: 3,
         cellsFit: false,
         direction: "column",
         justify: undefined,
         items: undefined,
         inline: false,
         gap: undefined,
      };
   }

   initialDetails(): TDemoDetails {
      return { itemCount: 7, tallHeight: false };
   }

   tagOpts() {
      return { multiline: true };
   }

   fields(): TDemoField<GridLayoutProps>[] {
      return [
         {
            kind: "switch-group",
            key: "modes",
            label: "Modos",
            labelIcon: "mdi:tune",
            switches: [
               { key: "inline", label: "inline" },
               { key: "cellsFit", label: "cellsFit" },
            ],
         },
         {
            kind: "select-enum",
            key: "direction",
            label: "direction",
            labelIcon: "mdi:arrow-split-horizontal",
            enumValue: gridDirectionEnum,
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
                  enumValue: gridJustifyEnum,
               },
               {
                  kind: "select-enum",
                  key: "items",
                  label: "items",
                  labelIcon: "mdi:format-vertical-align-center",
                  enumValue: gridItemsEnum,
               },
            ],
         },
         {
            kind: "number",
            key: "cells",
            label: "cells",
            labelIcon: "mdi:view-grid-plus",
            min: 1,
            step: 1,
         },
         {
            kind: "text",
            key: "gap",
            label: "gap",
            labelIcon: "mdi:arrow-expand-horizontal",
            placeholder: "ej: 0.5rem",
            normalize: normalizeCssLength,
         },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "number",
            key: "itemCount",
            label: "Número de elementos",
            labelIcon: "mdi:numeric",
            min: 3,
            max: 50,
            step: 1,
         },
         {
            kind: "switch",
            key: "tallHeight",
            label: "Forzar min-alto 400px",
            labelIcon: "mdi:arrow-expand-vertical",
         },
      ];
   }

   buildBody(_state: GridLayoutProps, details: TDemoDetails, _h: TBodyHelpers): string {
      const n = nClamp(details.itemCount);
      return Array.from({ length: n }, (_, i) =>
         buildLayoutPreviewItemSnippet(LAYOUT_PREVIEW_EMOJIS[i % LAYOUT_PREVIEW_EMOJIS.length], true, { compactStyle: true }),
      ).join("\n");
   }
}
