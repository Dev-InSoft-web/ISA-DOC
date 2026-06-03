<script context="module" lang="ts">
   import { Card, type CardProps } from "@ingenieria_insoft/ispsveltecomponents";

   export interface FloatingCardProps extends CardProps {
      showfloat?: boolean;
      horizontal?: "left" | "center" | "right";
      vertical?: "top" | "center" | "bottom";
   }
</script>

<script lang="ts">
   import { fade } from "svelte/transition";

   interface $$Props extends FloatingCardProps {}

   export let showfloat: $$Props["showfloat"] = true;
   export let horizontal: $$Props["horizontal"] = "right";
   export let vertical: $$Props["vertical"] = "center";

   const self = {
      panel: {
         getHotizontal() {
            let [left, right, tx] = ["auto", "auto", "0"];
            horizontal === "left" && ([left, right] = ["0.25em", "auto"]);
            horizontal === "right" && ([left, right] = ["auto", "0.25em"]);
            horizontal === "center" && ([left, right, tx] = ["50%", "auto", "-50%"]);
            return { styles: [`left: ${left}`, `right: ${right}`], tx };
         },
         getVertical() {
            let [top, bottom, ty] = ["auto", "auto", "0"];
            vertical === "top" && ([top, bottom] = ["0", "auto"]);
            vertical === "bottom" && ([top, bottom] = ["auto", "-15px"]);
            vertical === "center" && ([top, bottom, ty] = ["50%", "auto", "-50%"]);
            return { styles: [`top: ${top}`, `bottom: ${bottom}`], ty };
         },
         get style() {
				const h = self.panel.getHotizontal();
				const v = self.panel.getVertical();
				return [...h.styles, ...v.styles, (h.tx !== "0" || v.ty !== "0") && `transform: translate(${h.tx}, ${v.ty})`].filter(Boolean).join("; ");
         },
      },
      get cardProps() {
         return $$restProps;
      },
   };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div class="fc-wrap">
   <slot />
  {#if showfloat}
      <div class="fc-panel" style={self.panel.style} in:fade={{ duration: 200 }} out:fade={{ duration: 200 }} on:click|stopPropagation role="presentation">
         <Card {...self.cardProps}>
            <slot name="float" />
         </Card>
      </div>
   {/if}
</div>

<style>
   .fc-wrap {
      position: relative;
      overflow: visible;
   }

   .fc-wrap .fc-panel {
      position: absolute;
      z-index: 1200;
      pointer-events: none;
      overflow: visible;
      display: block;
      visibility: visible;
   }

   .fc-wrap .fc-panel > :global(*) {
      pointer-events: auto;
   }
</style>
