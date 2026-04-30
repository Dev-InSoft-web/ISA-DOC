<script context="module" lang="ts">
   import { FlexLayout, type FlexLayoutProps } from "@ingenieria_insoft/ispsveltecomponents";
   import CascadeOptions from "./CascadeOptions.svelte";
   import ButtonOption, { type ButtonOptionProps } from "./_ButtonOption.svelte";

   /** Ítem de barra: botón o separador vertical (`{ separator: true }`). */
   export type FlexOptionsAction = ButtonOptionProps & { separator?: boolean };
   /** Entrada admitida: ítem suelto, grupo (array), o falsy. Los grupos no vacíos se separan automáticamente. */
   export type FlexOptionsInput = FlexOptionsAction | FlexOptionsAction[] | false | null | undefined;
   export type FlexOptionsBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";

   export interface FlexOptionsProps extends FlexLayoutProps {
      actions: FlexOptionsInput[];
      more?: FlexOptionsInput[];
      sizew?: FlexOptionsBreakpoint;
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

   const self = {
      inferflexseparators(input: FlexOptionsInput[]) {
         const out: FlexOptionsAction[] = [];
         const isSeparator = (item: FlexOptionsAction | undefined) => !!item && "separator" in item && item.separator;
         for (const group of input) {
            if (!group) continue;
            const items = Array.isArray(group) ? group : [group];
            const validItems: FlexOptionsAction[] = [];
            for (const item of items) {
               if (!item) continue;
               if (isSeparator(item) && (validItems.length === 0 || isSeparator(validItems[validItems.length - 1]))) continue;
               validItems.push(item);
            }
            if (isSeparator(validItems[validItems.length - 1])) validItems.pop();
            if (validItems.length === 0) continue;
            if (out.length > 0 && !isSeparator(out[out.length - 1])) out.push({ separator: true });
            out.push(...validItems);
         }
         if (isSeparator(out[out.length - 1])) out.pop();
         return out;
      },
      get hasmore() {
         return !!more?.length;
      },
      get hasactions() {
         return normalizedActions.length > 0;
      },
      get class() {
         return [klass, $$restProps.class].filter(Boolean).join(" ");
      },
      get style() {
         return ["flex-shrink: 0", style, $$restProps.style].filter(Boolean).join("; ");
      },
      get resume() {
         return { ...$$restProps, class: self.class, style: self.style };
      },
   };

   $: normalizedActions = self.inferflexseparators(actions ?? []);
</script>

<FlexLayout gap="0" {...self.resume} bind:sizew role="toolbar">
   {#each normalizedActions as item}
      {#if "separator" in item && item.separator}
         <span class="flex-options-vsep" role="separator" aria-orientation="vertical"></span>
      {:else}
         <ButtonOption {...item} />
      {/if}
   {/each}
   {#if self.hasmore}
      {#if self.hasactions}
         <span class="flex-options-vsep" role="separator" aria-orientation="vertical"></span>
      {/if}
      <CascadeOptions actions={more} />
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
