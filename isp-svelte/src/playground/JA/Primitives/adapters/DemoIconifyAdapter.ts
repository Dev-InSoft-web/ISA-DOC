import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
import { DemoController, type TDemoField } from "../../_Utils/accordion/DemoController";
import { iconEnum } from "../../_Utils/Utils";

export class DemoIconifyAdapter extends DemoController<IconifyProps> {
   componentName = "Iconify";
   componentPath = "src/lib/primitives/Iconify.svelte";
   previewScale = 1.5;

   initialState(): IconifyProps {
      return {
         icon: "fluent-emoji:rocket",
         fliph: false,
         flipv: false,
         loading: false,
         rotate: 0,
      };
   }

   fields(): TDemoField<IconifyProps>[] {
      return [
         {
            kind: "select-enum",
            key: "icon",
            label: "icon",
            enumValue: iconEnum,
         },
         {
            kind: "switch-group",
            key: "estado",
            label: "Estado",
            labelIcon: "mdi:tune",
            switches: [
               { key: "fliph", label: "fliph" },
               { key: "flipv", label: "flipv" },
               { key: "loading", label: "loading" },
            ],
         },
         {
            kind: "range",
            key: "rotate",
            label: "rotate",
            labelIcon: "mdi:rotate-right",
            min: 0,
            max: 360,
            step: 1,
            attrDefault: 0,
         },
      ];
   }
}
