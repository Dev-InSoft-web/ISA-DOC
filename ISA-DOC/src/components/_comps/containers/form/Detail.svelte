<script context="module" lang="ts">
   import { TabItem } from "@ingenieria_insoft/ispsveltecomponents";
   import type { TDForm } from "@ingenieria_insoft/ispsveltecomponents";
   import type { TObject } from "@ingenieria_insoft/ispgen";
   import type { FormDataProps, FormResponsiveProps, ResumeFrm } from "./MainFormLayout.svelte";

   export interface DetailProps {
      title: string;
      open?: boolean;
      disabled?: boolean;
      hide?: boolean;
   }

   export interface DetailFormProps<T extends TObject> extends FormDataProps<T>, ResumeFrm, FormResponsiveProps {
      title: string;
      hide?: boolean;
   }

   export const isDetailReadonly = (actionParent: TDForm, actionDetail: TDForm, brapido: boolean): boolean =>
      brapido || (actionParent === "view" && actionDetail === "view");
</script>
<script lang="ts">
   interface $$Props extends DetailProps {}
   export let hide: $$Props["hide"] = false;
</script>
{#if !hide}
   <TabItem title={$$restProps.title} {...$$restProps}>
      <slot />
   </TabItem>
{/if}
