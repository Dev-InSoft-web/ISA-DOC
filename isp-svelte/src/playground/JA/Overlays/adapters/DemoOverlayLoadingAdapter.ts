import type { LoadingProps } from "$lib/overlays/Loading.svelte";
import { DemoController, type TDemoField } from "../../_Utils/accordion/DemoController";

export class DemoOverlayLoadingAdapter extends DemoController<LoadingProps> {
   componentName = "Loading";
   componentPath = "src/lib/overlays/Loading.svelte";

   initialState(): LoadingProps {
      return {
         color: undefined,
      };
   }

   fields(): TDemoField<LoadingProps>[] {
      return [
         {
            kind: "color",
            key: "color",
            label: "Color",
            labelIcon: "mdi:palette",
            attrType: "color",
         },
      ];
   }
}
