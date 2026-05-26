import type { TextProps } from "$lib/primitives/typography/Text.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";

export const sampleTextCienAnos =
   "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte casas de barro y cañabrava construidas a orillas de un río de aguas diáfanas que se precipitaban por un lecho de piedras pulidas, blancas y enormes como huevos prehistóricos. El mundo era tan reciente, que muchas cosas carecían de nombre, y para mencionarlas había que señalarlas con el dedo.";

const CODE_SNIPPET_WORDS_PER_LINE = 8;

const formatCodeSnippetForPreview = (s: string, txt: (fragment: string) => string): string => {
   const words = s.trim().split(/\s+/).filter(Boolean);
   const lines: string[] = [];
   for (let i = 0; i < words.length; i += CODE_SNIPPET_WORDS_PER_LINE) {
      lines.push(txt(words.slice(i, i + CODE_SNIPPET_WORDS_PER_LINE).join(" ")));
   }
   return lines.join("\n");
};

export class DemoTextAdapter extends DemoController<TextProps> {
   componentName = "Text";
   componentPath = "src/lib/primitives/typography/Text.svelte";

   initialState(): TextProps {
      return {
         color: undefined,
         lines: 0,
      };
   }

   initialDetails(): TDemoDetails {
      return { sampleText: sampleTextCienAnos };
   }

   fields(): TDemoField<TextProps>[] {
      return [
         {
            kind: "color",
            key: "color",
            label: "Color",
            labelIcon: "mdi:format-color-text",
            attrType: "color",
         },
         {
            kind: "number",
            key: "lines",
            label: "lines",
            labelIcon: "mdi:format-line-spacing",
            min: 0,
            max: 20,
            attrDefault: 0,
            attrEmit: (v: unknown) => Math.max(0, Math.floor(Number(v))) || undefined,
         },
      ];
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [
         {
            kind: "text",
            key: "sampleText",
            label: "slot",
            labelIcon: "mdi:text-long",
            placeholder: "Ingrese el texto a visualizar",
         },
      ];
   }

   buildBody(_state: TextProps, details: TDemoDetails, h: TBodyHelpers): string {
      return formatCodeSnippetForPreview(String(details.sampleText ?? ""), h.txt);
   }
}
