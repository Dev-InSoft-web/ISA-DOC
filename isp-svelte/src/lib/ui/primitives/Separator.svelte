<script context="module" lang="ts">
   import { bordercolor, resolveColor } from "@ingenieria_insoft/ispsveltecomponents";
   import type { HTMLAttributes } from "svelte/elements";

   export type SeparatorOrientation = "horizontal" | "vertical";
   export type SeparatorBorderStyle = "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset";

   export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
      orientation?: SeparatorOrientation;
      color?: string;
      borderStyle?: SeparatorBorderStyle;
      thickness?: number | string;
      startMargin?: number | string;
      endMargin?: number | string;
   }
</script>

<script lang="ts">
   interface $$Props extends SeparatorProps {}

   export let orientation: $$Props["orientation"] = "horizontal";
   export let color: $$Props["color"] = "";
   export let borderStyle: $$Props["borderStyle"] = "solid";
   export let thickness: $$Props["thickness"] = 1;
   export let startMargin: $$Props["startMargin"] = 0;
   export let endMargin: $$Props["endMargin"] = 0;

   const tocss = (v: number | string | undefined): string => {
      if (v === undefined || v === null || v === "") return "0";
      if (typeof v === "number") return v + "px";
      return v;
   };

   const self = {
      get color(): string {
         const c = color ? resolveColor(color) : "";
         return c || bordercolor;
      },
      get isHorizontal(): boolean {
         return (orientation ?? "horizontal") === "horizontal";
      },
      get thicknessCss(): string {
         return tocss(thickness ?? 1);
      },
      get style(): string {
         const t = self.thicknessCss;
         const startM = tocss(startMargin);
         const endM = tocss(endMargin);
         const styleParts: string[] = [];
         if (self.isHorizontal) {
            styleParts.push("display: block");
            styleParts.push("width: 100%");
            styleParts.push("height: 0");
            styleParts.push(`border-top: ${t} ${borderStyle} ${self.color}`);
            styleParts.push(`margin: ${startM} 0 ${endM} 0`);
         } else {
            styleParts.push("display: inline-block");
            styleParts.push("align-self: stretch");
            styleParts.push("width: 0");
            styleParts.push(`border-left: ${t} ${borderStyle} ${self.color}`);
            styleParts.push(`margin: 0 ${endM} 0 ${startM}`);
         }
         if ($$restProps.style) styleParts.push($$restProps.style as string);
         return styleParts.join("; ");
      },
      get class(): string {
         return ["is-separator", self.isHorizontal ? "is-separator-horizontal" : "is-separator-vertical", $$restProps.class].filter(Boolean).join(" ");
      },
      get resume() {
         const rest = { ...$$restProps } as Record<string, unknown>;
         delete rest.style;
         delete rest.class;
         return rest;
      },
   };
</script>

<div role="separator" aria-orientation={self.isHorizontal ? "horizontal" : "vertical"} {...self.resume} class={self.class} style={self.style}></div>
