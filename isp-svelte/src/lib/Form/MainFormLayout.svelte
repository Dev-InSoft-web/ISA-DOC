<script context="module" lang="ts">
   import type { TObject } from "@ingenieria_insoft/ispgen";
   import { BlockLayout, FlexLayout, Tabs, type FormGeneralProps, type FormReadonlyProps, type FormSecurityProps, type LayoutSlots } from "@ingenieria_insoft/ispsveltecomponents";
   import type { HTMLAttributes } from "svelte/elements";

   export interface FormDataProps<T extends TObject> {
      Obj: T;
   }

   export interface ResumeFrm extends FormGeneralProps, FormReadonlyProps, FormSecurityProps {}

   interface ResumeFastData extends FormReadonlyProps {}

   export interface MainFormLayoutProps<T extends TObject> extends HTMLAttributes<HTMLDivElement>, FormDataProps<T>, FormGeneralProps, FormReadonlyProps, FormSecurityProps {}

   export interface MainFormLayoutSlots<T extends TObject = TObject> {
      fastdata: ResumeFastData & { resumeFastData: ResumeFastData };
      default: Partial<LayoutSlots["default"]> & FormDataProps<T> & ResumeFrm & { resumeFrm: ResumeFrm };
   }
</script>

<script lang="ts" generics="T extends TObject">
   interface $$Props extends MainFormLayoutProps<T> {}
   interface $$Slots extends MainFormLayoutSlots<T> {}

   export let Obj: $$Props["Obj"];
   export let itdForm: $$Props["itdForm"] = "view";
   export let bRapido: $$Props["bRapido"] = false;
   export let readonly: $$Props["readonly"] = false;
   export let bAllowed: $$Props["bAllowed"] = {};

   let actionMaster: $$Props["itdForm"] = itdForm;
   let objMaster: $$Props["Obj"] = Obj;
   $: isReadonly = !!readonly && itdForm === "view";
   $: rootStyle = [!bRapido && "padding: 0.5rem", $$restProps.style].filter(Boolean).join("; ");
   $: actionMaster = itdForm;
   $: objMaster = Obj;

   const self = {
      slaveBAllowed(action: $$Props["itdForm"]): $$Props["bAllowed"] {
         if (action === "view") return { ...(bAllowed ?? {}), Crear: false, Modificar: false, Eliminar: false };
         return { ...(bAllowed ?? {}), Crear: true, Modificar: true, Eliminar: true, Visualizar: true };
      },
      resumeFrm(formSmall: boolean, formReadonly: boolean): ResumeFrm {
         return { itdForm: actionMaster, bRapido: !!bRapido, readonly: formReadonly, bAllowed: self.slaveBAllowed(actionMaster), small: formSmall };
      },
      resumeFastData(formReadonly: boolean): ResumeFastData {
         return { readonly: formReadonly };
      },
   };
</script>

<FlexLayout {...$$restProps} id="formulario-cursos-root" direction="column" items="stretch" style={rootStyle}>
   <slot name="fastdata" readonly={isReadonly} resumeFastData={self.resumeFastData(isReadonly)} />

   <BlockLayout id="formulario-cursos-tabs-card" let:sizew let:boolszw let:lerpw>
      <Tabs contentClass="formulario-cursos-tabs-content custom-scrollbar">
         <slot {sizew} {boolszw} {lerpw} Obj={objMaster} itdForm={actionMaster} bRapido={!!bRapido} {bAllowed} small={!!boolszw.sm} readonly={isReadonly} resumeFrm={self.resumeFrm(!!boolszw.sm, isReadonly)} />
      </Tabs>
   </BlockLayout>
   <div style="height: 40px;"></div>
</FlexLayout>

<style>
   :global {
      #formulario-cursos-root {
         height: 100%;
         min-height: 0;
         width: 100%;
      }

      #formulario-cursos-tabs-card {
         min-height: 0;
         min-width: 0;
         flex: 1 1 0%;
         width: 100%;
         height: 100%;
      }

      .formulario-cursos-tabs-content {
         flex: 1 1 auto;
         height: 100%;
         margin-top: 0;
         background: transparent;
         box-shadow: none;
         min-height: 0;
         overflow: visible;
      }

      #formulario-cursos-root .tabs-content.formulario-cursos-tabs-content {
         padding: 0.5rem 0;
         min-height: 0;
      }

      #formulario-cursos-root [role="tabpanel"].tabs-content {
         display: flex;
         flex-direction: column;
         flex: 1 1 auto;
         min-height: 0;
         height: 100%;
         overflow: visible;
      }
   }
</style>
