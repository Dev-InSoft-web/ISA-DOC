import type { BlockLayoutProps } from "$lib/containers/layout/BlockLayout.svelte";
import { DemoController, type TBodyHelpers, type TDemoDetails, type TDemoField } from "../../_Utils/accordion/DemoController";
import { buildTag, type TAttrItem } from "../../_Utils/Utils";

const BLOCK_PREVIEW_STYLE_PREFIX = "border: {resolveColor('color')} 1px solid; padding: 0.5rem;";

export class DemoBlockLayoutAdapter extends DemoController<BlockLayoutProps> {
   componentName = "BlockLayout";
   componentPath = "src/lib/containers/layout/BlockLayout.svelte";

   initialState(): BlockLayoutProps {
      return { inline: false };
   }

   initialDetails(): TDemoDetails {
      return { itemCount: 1 };
   }

   fields(): TDemoField<BlockLayoutProps>[] {
      return [
         {
            kind: "switch",
            key: "inline",
            label: "inline",
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

   buildCode(state: BlockLayoutProps, _details: TDemoDetails = {}, demoStyle: string = "", demoClass: string = ""): string {
      const mergedStyle = [BLOCK_PREVIEW_STYLE_PREFIX, demoStyle].filter(Boolean).join(" ");
      const attrs: TAttrItem[] = [
         { name: "inline", value: state.inline, type: "bool" },
         { name: "let:sizew", value: true, type: "bool" },
         { name: "style", value: mergedStyle, type: "str" },
         { name: "class", value: demoClass || null, type: "str", default: null },
      ];
      return buildTag(
         this.componentName,
         attrs,
         { multiline: true },
         (h: TBodyHelpers) => buildTag("Text", [{ name: "color", value: "primary", type: "str" }], { multiline: true, indent: 3 }, () => h.txt("sizew: {sizew}")),
      );
   }
}
