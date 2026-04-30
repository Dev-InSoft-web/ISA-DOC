<script context="module" lang="ts">
   import type { TDAction } from "@ingenieria_insoft/ispgen";
   import { TObject } from "@ingenieria_insoft/ispgen";
   import type { ICtxAction, TDForm } from "@ingenieria_insoft/ispsveltecomponents";
   import { onDestroy } from "svelte";
   import type { TJWTAuth } from "$lib/1.seguridad/ClientesIS_JWT";
   import { JWTContactoAuth, toastError } from "$lib/stores";
   import AlertSimple from "../../AlertSimple.svelte";
   import Skeleton from "../../Skeleton.svelte";

   export type TBAllowed = { [K in TDAction]?: boolean };

   export interface ISeguridadBase {
      isysrecurso: string;
      bAllowed?: TBAllowed;
      jwtLoaded?: boolean;
      onPermissionError?: (msg: string) => void;
   }

   export interface SeguridadProps extends ISeguridadBase {
      jwtLoaded: boolean;
      loading: boolean;
   }

   export interface CatalogoController<TObj extends TObject> extends ISeguridadBase, ICtxAction<TObj> {}

   export interface ActionSecurityProps<TObj extends TObject> {
      CatalogoController: CatalogoController<TObj>;
      bAllowed?: TBAllowed;
   }

   export interface SecurityLayoutProps<TObj extends TObject = TObject, TCtrl extends ISeguridadBase = ISeguridadBase> {
      Controller: TCtrl;
      Obj?: TObj;
      itdForm?: TDForm;
      mensaje?: string;
   }

   const allActions: TDAction[] = ["Crear", "Modificar", "Visualizar", "Verificar", "Duplicar", "Recodificar", "Eliminar", "Consolidar"];
</script>

<script lang="ts">
   interface $$Props extends SecurityLayoutProps {}

   export let Controller: $$Props["Controller"];
   export let Obj: $$Props["Obj"] = undefined;
   export let itdForm: $$Props["itdForm"] = "view";
   export let mensaje: $$Props["mensaje"] = "No tiene permisos para acceder a este recurso.";

   let bAllowed: TBAllowed = {};
   let jwtLoaded = false;
   let loading = true;

   const self = {
      onpermissionerror(msg: string): void {
         toastError(msg);
      },
      onjwtchange(JWT: TJWTAuth) {
         const recurso = Controller.isysrecurso;
         bAllowed = Object.fromEntries(allActions.map((accion) => [accion, JWT.isActionAllowed({ recurso, accion })])) as TBAllowed;
         jwtLoaded = JWT.bauth || Boolean((JWT as { rolcontacto?: unknown }).rolcontacto);
      },
   };

   onDestroy(JWTContactoAuth.subscribe(self.onjwtchange));

   $: if (Controller) {
      Controller.bAllowed = bAllowed;
      Controller.jwtLoaded = jwtLoaded;
      Controller.onPermissionError = self.onpermissionerror;
   }
   $: loading = !jwtLoaded;
</script>

<Skeleton {loading} id="security-layout-skeleton">
   {#if jwtLoaded && bAllowed.Visualizar === false}
      <AlertSimple {mensaje} redirectUrl="/inicio" />
   {:else}
      <slot {bAllowed} {Obj} {itdForm} {jwtLoaded} {loading} />
   {/if}
</Skeleton>

<style>
   :global(#security-layout-skeleton) {
      height: 100%;
      padding: 0.5rem;
   }
</style>
