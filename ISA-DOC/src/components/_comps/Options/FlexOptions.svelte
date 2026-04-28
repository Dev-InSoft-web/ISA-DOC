<script context="module" lang="ts">
   import { FlexLayout } from "@ingenieria_insoft/ispsveltecomponents";
   import CascadeOptions, { type CascadeOptionsAction } from "./CascadeOptions.svelte";
   import ButtonOption, { type ButtonOptionProps } from "./_ButtonOption.svelte";

   /** Ítem de barra: botón o separador vertical (`{ separator: true }`). */
   export type FlexOptionsAction = ButtonOptionProps | { separator: true };
   export type FlexOptionsBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";

   export interface FlexOptionsProps {
      actions: FlexOptionsAction[];
      more?: CascadeOptionsAction[];
      sizew?: FlexOptionsBreakpoint;
      cscroll?: boolean;
      inline?: boolean;
      items?: string;
      gap?: string;
      "class"?: string;
      style?: string;
      role?: string;
      "aria-label"?: string;
   }
</script>

<script lang="ts">
   interface $$Props extends FlexOptionsProps {
      sizew?: FlexOptionsBreakpoint;
   }

   let klass: $$Props["class"] = "";
   export { klass as class };
   export let style: $$Props["style"] = "";
   export let actions: $$Props["actions"] = [];
   export let more: $$Props["more"] = [];

   export let sizew: $$Props["sizew"] = "md";

   const _obj_ = {
      get style() {
         return ["flex-shrink: 0", style, $$restProps.style].filter(Boolean).join("; ");
      },
      get resume() {
         return { ...$$restProps, class: klass || $$restProps.class, style: this.style };
      },
   };
</script>

<FlexLayout gap="0" {..._obj_.resume} bind:sizew role="toolbar">
   {#each actions as item}
      {#if "separator" in item && item.separator}
         <span class="flex-options-vsep" role="separator" aria-orientation="vertical"></span>
      {:else}
         <ButtonOption {...item} />
      {/if}
   {/each}
   {#if more?.length}
      <CascadeOptions items={more} />
   {/if}
</FlexLayout>

<style>
   .flex-options-vsep {
      align-self: center;
      width: 1px;
      height: 1.25em;
      flex-shrink: 0;
      margin: 0 0.35rem;
      background: color-mix(in srgb, var(--is-color, currentColor) 28%, transparent);
   }
</style>
