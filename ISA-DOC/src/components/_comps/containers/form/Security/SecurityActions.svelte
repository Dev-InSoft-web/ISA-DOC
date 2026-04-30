<script context="module" lang="ts">
   import { lowerCase, TObject } from "@ingenieria_insoft/ispgen";
   import type { TDAction } from "@ingenieria_insoft/ispgen";
   import { AccionesGen } from "@ingenieria_insoft/ispsveltecomponents";
   import type { TDForm } from "@ingenieria_insoft/ispsveltecomponents";
   import { toastError, toastSuccess } from "$lib/stores";
   import SecurityLayout, { type CatalogoController, type SecurityLayoutProps } from "./SecurityLayout.svelte";

   export interface IAccionesController<TObj extends TObject> extends CatalogoController<TObj> {
      Klass: typeof TObject;
      PrimaryKeys: Array<keyof TObj>;
      sizePk: number;
   }

   export interface SecurityActionsProps<TObj extends TObject> extends SecurityLayoutProps<TObj, IAccionesController<TObj>> {
      idobj?: string;
      postSubmit?: (o: TObject, action: TDAction) => Promise<void>;
      itdFormExternal?: TDForm;
      onitdFormChange?: (value: TDForm) => void;
   }
</script>

<script lang="ts" generics="TObj extends TObject">
   interface $$Props extends SecurityActionsProps<TObj> {}

   export let Controller: $$Props["Controller"];
   export let idobj: string = "";
   export let mensaje: string = `No tiene permisos para acceder a este ${lowerCase(Controller.entrie)}.`;
   export let postSubmit: (o: TObject, action: TDAction) => Promise<void> = async () => {
      toastSuccess("Procedimiento finalizado");
   };
   export let itdFormExternal: $$Props["itdFormExternal"] = undefined;
   export let onitdFormChange: $$Props["onitdFormChange"] = undefined;

   let itdForm: TDForm = idobj === "crear" ? "create" : "view";
   let lastItdFormNotified: TDForm = itdForm;
   let Obj: TObj = Controller.Klass.JSONToObject<TObj>(idobj === "crear" ? {} : { [Controller.PrimaryKeys[0] as string]: idobj });

   $: if (itdFormExternal && itdFormExternal !== itdForm) itdForm = itdFormExternal;
   $: if (itdForm !== lastItdFormNotified) {
      lastItdFormNotified = itdForm;
      if (onitdFormChange) onitdFormChange(itdForm);
   }

</script>

<SecurityLayout {Controller} {Obj} {itdForm} {mensaje} let:bAllowed>
   <AccionesGen {...$$restProps} bind:itdForm {Controller} bind:Obj onError={toastError} {postSubmit}>
      <svelte:fragment slot="Frm" let:small>
         {@const readonly = itdForm === "view"}
         <slot {small} {itdForm} {Obj} {bAllowed} {readonly} />
      </svelte:fragment>
   </AccionesGen>
</SecurityLayout>
