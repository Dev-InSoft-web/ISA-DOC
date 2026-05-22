<script context="module" lang="ts">
   import type { TObject } from "@ingenieria_insoft/ispgen";
   import type { TDForm } from "@ingenieria_insoft/ispsveltecomponents";
   import { BlockLayout, TabItem } from "@ingenieria_insoft/ispsveltecomponents";
   import type { FormDataProps, ResumeFrm } from "./MainFormLayout.svelte";

   export interface DetailProps {
      tabtitle?: string;
      open?: boolean;
      disabled?: boolean;
      hide?: boolean;
   }

   export interface DetailFormProps<T extends TObject> extends FormDataProps<T>, ResumeFrm {
      tabtitle?: string;
      hide?: boolean;
   }

   export const isDetailReadonly = (actionParent: TDForm, actionDetail: TDForm): boolean => actionParent === "view" && actionDetail === "view";
</script>

<script lang="ts">
   interface $$Props extends DetailProps {}
   export let tabtitle: $$Props["tabtitle"] = undefined;
   export let hide: $$Props["hide"] = false;
</script>

{#if !hide}
   <TabItem title={tabtitle ?? ""} {...$$restProps}>
      <BlockLayout style="padding: 0.5rem; height: 100%; box-sizing: border-box; overflow-y: auto;">
         <slot />
      </BlockLayout>
   </TabItem>
{/if}
