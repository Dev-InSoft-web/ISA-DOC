import type { TextProps } from "$lib/primitives/typography/Text.svelte";
import { DemoController, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildTag, type TAttrItem } from "../../_Utils/Utils";

const DEFAULT_SAMPLE = "Encabezado de demostración para validar estilos.";

export class DemoHeadingsAdapter extends DemoController<TextProps> {
   componentName = "Headings";
   componentPath = "src/lib/primitives/typography/headings/H1.svelte";

   initialState(): TextProps {
      return {
         color: undefined,
         lines: 0,
      };
   }

   initialDetails(): TDemoDetails {
      return { sampleText: DEFAULT_SAMPLE };
   }

   fields(): TDemoField<TextProps>[] {
      return [
         {
            kind: "color",
            key: "color",
            label: "Color",
            labelIcon: "mdi:palette",
            attrOmit: true,
         },
         {
            kind: "number",
            key: "lines",
            label: "lines",
            labelIcon: "mdi:format-line-spacing",
            min: 0,
            max: 20,
            attrOmit: true,
         },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "text",
            key: "sampleText",
            label: "slot",
            labelIcon: "mdi:text",
            placeholder: "Texto de encabezado",
         },
      ];
   }

   buildCode(state: TextProps, details: TDemoDetails = {}, demoStyle: string = "", demoClass: string = ""): string {
      const sampleText = String(details.sampleText ?? "");
      const tail: TAttrItem[] = [
         { name: "style", value: demoStyle || null, type: "str", default: null },
         { name: "class", value: demoClass || null, type: "str", default: null },
      ];
      return ["H1", "H2", "H3", "H4", "H5", "H6"]
         .map((tag) =>
            buildTag(
               tag,
               [
                  { name: "color", value: state.color, type: "color" },
                  { name: "lines", value: state.lines, default: 0 },
                  ...tail,
               ],
               {},
               ({ txt }) => txt(`${sampleText} — ${tag}`),
            ),
         )
         .join("\n\n");
   }
}
