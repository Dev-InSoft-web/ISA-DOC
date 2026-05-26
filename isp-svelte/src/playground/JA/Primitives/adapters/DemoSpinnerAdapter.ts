import type { SpinnerProps } from "$lib/primitives/Spinner.svelte";
import { DemoController, type TDemoField } from "../../_Utils/accordion/DemoController";

export class DemoSpinnerAdapter extends DemoController<SpinnerProps> {
   componentName = "Spinner";
   componentPath = "src/lib/primitives/Spinner.svelte";
   previewScale = 1.5;

   initialState(): SpinnerProps {
      return { color: undefined };
   }

   fields(): TDemoField<SpinnerProps>[] {
      return [
         {
            kind: "color",
            key: "color",
            label: "Color",
            labelIcon: "mdi:palette",
            attrType: "color",
            attrEmit: (val: unknown) => (!val ? "neutral" : val),
         },
      ];
   }
}
