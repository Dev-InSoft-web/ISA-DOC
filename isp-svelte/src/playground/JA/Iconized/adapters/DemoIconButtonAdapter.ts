import type { ButtonIconifyProps } from "$lib/primitives/iconized/ButtonIconify.svelte";
import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
import { DemoController, type TDemoField } from "../../_Utils/accordion/DemoController";
import { iconEnum } from "../../_Utils/Utils";

const variantIcons: Record<string, IconifyProps["icon"]> = {
   "": "mdi:block-helper",
   solid: "mdi:checkbox-blank-circle",
   outlined: "mdi:checkbox-blank-circle-outline",
   ghost: "mdi:ghost-outline",
   text: "mdi:format-text",
};

const shapeIcons: Record<string, IconifyProps["icon"]> = {
   "": "mdi:block-helper",
   round: "mdi:rounded-corner",
   circle: "mdi:circle-outline",
   square: "mdi:square-outline",
   pill: "mdi:pill",
};

const shapeOptions = [
   { label: "Ninguno", value: "" },
   { label: "Round", value: "round" },
   { label: "Círculo", value: "circle" },
   { label: "Cuadrado", value: "square" },
   { label: "Píldora", value: "pill" },
] as const;

const variantOptions = [
   { label: "Por defecto", value: undefined },
   { label: "solid", value: "solid" },
   { label: "outlined", value: "outlined" },
   { label: "ghost", value: "ghost" },
   { label: "text", value: "text" },
] as const;

export class DemoIconButtonAdapter extends DemoController<ButtonIconifyProps> {
   componentName = "ButtonIconify";
   componentPath = "src/lib/primitives/iconized/ButtonIconify.svelte";
   previewScale = 2.5;

   initialState(): ButtonIconifyProps {
      return {
         icon: "mdi:account",
         color: undefined,
         variant: undefined,
         shape: "",
         disabled: false,
         loading: false,
      };
   }

   fields(): TDemoField<ButtonIconifyProps>[] {
      return [
         {
            kind: "select-enum",
            key: "icon",
            label: "icon",
            enumValue: iconEnum,
         },
         {
            kind: "palette",
            key: "shape",
            label: "Forma",
            labelIcon: "mdi:shape-outline",
            attrType: "str",
            options: shapeOptions as unknown as ReadonlyArray<{ label: string; value: ButtonIconifyProps["shape"] }>,
            accent: "primary",
            attrEmit: (v: unknown) => (v === "" ? null : v),
            getIcon: (val: unknown) => shapeIcons[String(val ?? "")] ?? "mdi:block-helper",
         },
         {
            kind: "palette",
            key: "variant",
            label: "Variante",
            labelIcon: "mdi:shape-outline",
            attrType: "str",
            options: variantOptions as unknown as ReadonlyArray<{ label: string; value: ButtonIconifyProps["variant"] }>,
            accent: "primary",
            getIcon: (val: unknown) => variantIcons[String(val ?? "")] ?? "mdi:block-helper",
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
               { key: "disabled", label: "disabled" },
               { key: "loading", label: "loading" },
            ],
         },
      ];
   }
}
