<script context="module" lang="ts">
   import type { TObject } from "@ingenieria_insoft/ispgen";
   import { BlockLayout, FlexLayout, Tabs, type LayoutSlots, type TDForm } from "@ingenieria_insoft/ispsveltecomponents";
   import type { HTMLAttributes } from "svelte/elements";
   import type { SecurityActionsProps } from "./Security/SecurityActions.svelte";
   import type { SeguridadProps } from "./Security/SecurityLayout.svelte";
   import GridResponsiveForm from "./GridResponsiveForm.svelte";

   /** Bloque: dato principal del formulario. */
   export interface FormDataProps<T extends TObject> {
      Obj: T;
   }

   /** Bloque: estado de flujo (alta/edición/lectura/eliminación). */
   interface FormFlowProps {
      itdForm: TDForm;
   }

   /** Bloque: comportamiento de modo rápido. */
   interface FormBrapidoProps {
      brapido: boolean;
   }

   /** Bloque: solo lectura. */
   interface FormReadonlyProps {
      readonly: boolean;
   }

   /** Bloque: seguridad (permisos por acción). */
   interface FormSecurityProps {
      bAllowed?: SeguridadProps["bAllowed"];
   }

   /** Bloque: tamaño responsive. */
   export interface FormResponsiveProps {
      small: boolean;
   }

   /** Resumen propagado a los detalles del formulario vía `let:resumeFrm` y consumido como `{...resumeFrm}`. */
   export interface ResumeFrm extends FormFlowProps, FormBrapidoProps, FormReadonlyProps, FormSecurityProps, FormResponsiveProps {}

   /** Resumen propagado al slot `fastdata` vía `let:resumeFastData` y consumido como `{...resumeFastData}`. */
   interface ResumeFastData extends FormResponsiveProps, FormReadonlyProps {}

   /** Props del layout principal de formulario. Hereda de él cualquier formulario que quiera tener fastdata + tabs. `brapido`, `readonly` y `small` son opcionales porque `MainFormLayout` les asigna defaults. */
   export interface MainFormLayoutProps<T extends TObject>
      extends HTMLAttributes<HTMLDivElement>,
         FormDataProps<T>,
         FormFlowProps,
         FormSecurityProps {
      brapido?: boolean;
      readonly?: boolean;
      small?: boolean;
   }

   /** Props para el `Formulario` master (CRUD principal): `MainFormLayoutProps` + `Controller` y `small` requeridos. */
   export interface MasterFormProps<T extends TObject> extends MainFormLayoutProps<T> {
      Controller: SecurityActionsProps<T>["Controller"];
      small: boolean;
   }

   export interface MainFormLayoutSlots<T extends TObject = TObject> {
      fastdata: LayoutSlots["default"] & ResumeFastData & { resumeFastData: ResumeFastData };
      default: LayoutSlots["default"] & FormDataProps<T> & ResumeFrm & FormResponsiveProps & { resumeFrm: ResumeFrm };
   }
</script>

<script lang="ts" generics="T extends TObject">
   interface $$Props extends MainFormLayoutProps<T> {}
   interface $$Slots extends MainFormLayoutSlots<T> {}

   export let Obj: $$Props["Obj"];
   export let itdForm: $$Props["itdForm"] = "view";
   export let brapido: $$Props["brapido"] = false;
   export let readonly: $$Props["readonly"] = false;
   export let bAllowed: $$Props["bAllowed"] = {};

   let actionMaster: $$Props["itdForm"] = itdForm;
   let objMaster: $$Props["Obj"] = Obj;
   $: isReadonly = !!readonly && itdForm === "view";
   $: rootStyle = [!brapido && "padding: 0.5rem", $$restProps.style].filter(Boolean).join("; ");
   $: actionMaster = itdForm;
   $: objMaster = Obj;

   const self = {
      resumeFrm(formSmall: boolean, formReadonly: boolean): ResumeFrm {
         return { itdForm: actionMaster, brapido: !!brapido, readonly: formReadonly, bAllowed, small: formSmall };
      },
      resumeFastData(formSmall: boolean, formReadonly: boolean): ResumeFastData {
         return { small: formSmall, readonly: formReadonly };
      },
   };
</script>

<FlexLayout {...$$restProps} id="formulario-cursos-root" direction="column" items="stretch" style={rootStyle}>
   <div id="formulario-cursos-header">
      <GridResponsiveForm let:sizew let:boolszw let:small>
         <slot name="fastdata" {sizew} {boolszw} {small} readonly={isReadonly} resumeFastData={self.resumeFastData(small, isReadonly)} />
      </GridResponsiveForm>
   </div>

   <div id="formulario-cursos-tabs-card">
      <BlockLayout id="formulario-cursos-tabs-flex" let:sizew let:boolszw>
         <Tabs contentClass="formulario-cursos-tabs-content custom-scrollbar">
            <slot {sizew} {boolszw} Obj={objMaster} itdForm={actionMaster} brapido={!!brapido} {bAllowed} small={!!boolszw.sm} readonly={isReadonly} resumeFrm={self.resumeFrm(!!boolszw.sm, isReadonly)} />
         </Tabs>
      </BlockLayout>
   </div>
	<div style="height: 40px;"></div>
</FlexLayout>

<style>
   #formulario-cursos-header {
      flex-shrink: 0;
   }

   :global {
      #formulario-cursos-root {
         height: 100%;
         min-height: 0;
         width: 100%;
         font-size: 0.875rem;
      }

      #formulario-cursos-tabs-card {
         display: flex;
         flex-direction: column;
         min-height: 0;
         min-width: 0;
         flex: 1 1 0%;
         width: 100%;
      }

      #formulario-cursos-tabs-flex {
         display: flex;
         flex-direction: column;
         min-height: 0;
         min-width: 0;
         flex: 1 1 0%;
         width: 100%;
         height: 100%;
      }

      .formulario-cursos-tabs-content {
         display: flex;
         flex-direction: column;
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
