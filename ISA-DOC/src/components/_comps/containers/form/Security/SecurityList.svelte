<svelte:options accessors={true} />

<script context="module" lang="ts">
   import { TObject } from "@ingenieria_insoft/ispgen";
   import { CatalogoGen } from "@ingenieria_insoft/ispsveltecomponents";
   import type { TCatalogoSecurityController } from "$lib/ContaPymeU/_RefControllerBase";
   import { toastError } from "$lib/stores";
   import SecurityLayout from "./SecurityLayout.svelte";

   export interface SecurityListProps<TObj extends TObject> {
      Controller: TCatalogoSecurityController<TObj>;
   }
</script>

<script lang="ts" generics="TObj extends TObject">
   interface $$Props extends SecurityListProps<TObj> {}
   export let Controller: $$Props["Controller"];
</script>

<SecurityLayout {Controller} let:bAllowed>
   <CatalogoGen {...$$restProps} {Controller} {bAllowed} onError={toastError}>
      <slot slot="Frm" let:small let:itdForm let:Obj {small} {itdForm} {Obj} {bAllowed} readonly={itdForm === "view"} />
   </CatalogoGen>
</SecurityLayout>
