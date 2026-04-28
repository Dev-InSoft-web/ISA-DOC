<script context="module" lang="ts">
   import { FlexLayout, Iconify, info, resolveColor } from "@ingenieria_insoft/ispsveltecomponents";
   import { Tooltip } from "flowbite-svelte";
   import type { HTMLAttributes } from "svelte/elements";

   export interface TipInfoProps extends HTMLAttributes<HTMLDivElement> {
      descripcion?: string;
   }
</script>

<script lang="ts">
   interface $$Props extends TipInfoProps {}

   export let descripcion: $$Props["descripcion"] = "";

   const self = {
      get class() {
         return [$$restProps.class, this.switchClassCanShowTooltip ? "switchClassCanShowTooltip" : ""].filter(Boolean).join(" ");
      },
      get style() {
         return $$restProps.style;
      },
      get resume() {
         return { ...$$restProps, class: this.class, style: this.style };
      },
      get switchClassCanShowTooltip(): boolean {
         return this.hasDescription;
      },
      get description(): string {
         return descripcion || "";
      },
      get hasDescription(): boolean {
         return !!this.description;
      },
      get iconColor() {
         return this.hasDescription ? info : resolveColor("neutral");
      },
      get iconStyle(): string {
         return `color: ${this.iconColor};`;
      },
      get iconTitle(): string {
         return this.hasDescription ? "" : "No hay información disponible";
      },
   };
</script>

<FlexLayout items="center" wrap={false} {...self.resume}>
   <div id="tipinfo-content">
      <slot />
   </div>
   <FlexLayout inline items="center" justify="center">
      <Iconify id="tipinfo-icon" icon="line-md:alert-circle-loop" style={self.iconStyle} title={self.iconTitle} />
      {#if self.hasDescription}
         <Tooltip placement="right" trigger="click">
            {@html self.description}
         </Tooltip>
      {/if}
   </FlexLayout>
</FlexLayout>

<style>
   :global {
      #tipinfo-content {
         flex: 1;
         min-width: 0;
      }

      #tipinfo-icon {
         font-size: 1.125em;
      }

      .switchClassCanShowTooltip {
         cursor: pointer;
      }
   }
</style>
