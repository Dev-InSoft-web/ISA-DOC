<script lang="ts">
   import Iconify from "$lib/primitives/Iconify.svelte";
   import { ActionDrawer, Button, CatalogoGen, FlexLayout, Text } from "$lib";
   import ButtonFit from "../_Utils/controls/ButtonFit.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoOverlayActionDrawerAdapter } from "./adapters/DemoOverlayActionDrawerAdapter";
   import { TMyCatalogoController } from "../../UlConst";

   const adapter = new DemoOverlayActionDrawerAdapter();
   let state = adapter.initialState();
   let details = adapter.initialDetails();
   let demoStyle = "";
   let demoClass = "";

   let drawerShow = false;
   let drawerLoading = false;
   let drawerShowCatalog = false;
   const controllerCatalogoDemo = new TMyCatalogoController();

   const abrirDrawerDemo = (): void => {
      drawerShowCatalog = false;
      drawerShow = true;
      if (details.bSimularLoading) {
         drawerLoading = true;
         setTimeout(() => {
            drawerLoading = false;
         }, 5000);
      }
   };

   const abrirDrawerCatalogoDemo = (): void => {
      drawerShowCatalog = true;
      drawerShow = true;
   };
</script>

<AccordeonDemo {adapter} bind:state bind:details bind:demoStyle bind:demoClass inner statusText="Aprobado" statusColor="success" titleIcon="mdi:dock-bottom">
   <svelte:fragment slot="intro">Panel lateral o inferior que desliza sobre el contenido; ideal para acciones secundarias sin abandonar la vista.</svelte:fragment>
   <FlexLayout slot="preview" let:previewKey direction="column" justify="center" items="center" style="width: 100%; min-height: 120px;">
      <div class="local-scope-zone">
         <FlexLayout direction="column" style="width: 100%;">
            <Text color="neutral">Zona de prueba para scope global/local (contenedor relativo).</Text>
            <FlexLayout style="flex-wrap: wrap;">
               <ButtonFit onClick={abrirDrawerDemo}>
                  <Iconify slot="icon" icon="mdi:open-in-new" />
                  Mostrar ActionDrawer
               </ButtonFit>
               <ButtonFit variant="outlined" color="primary" onClick={abrirDrawerCatalogoDemo}>
                  <Iconify slot="icon" icon="mdi:table-eye" />
                  Abrir CatálogoGen (test)
               </ButtonFit>
            </FlexLayout>
         </FlexLayout>
         {#key previewKey}
            <ActionDrawer bind:bshow={drawerShow} loading={drawerLoading} side={state.side || undefined} _scope={state._scope} lockViewportScroll={false} style={demoStyle} class={demoClass}>
               {#if drawerShowCatalog}
                  <FlexLayout direction="column" style="padding: 0.75rem; min-width: 320px; width: min(720px, 95vw); height: min(70dvh, 560px);">
                     <CatalogoGen Controller={controllerCatalogoDemo} />
                  </FlexLayout>
               {:else}
                  <FlexLayout direction="column" style="padding: 0.75rem; min-width: 240px;">
                     <span>Contenido de demostración del panel lateral.</span>
                     <Button variant="outlined" color="neutral" onClick={() => (drawerShow = false)}>Cerrar</Button>
                  </FlexLayout>
               {/if}
            </ActionDrawer>
         {/key}
      </div>
   </FlexLayout>
   <svelte:fragment slot="config">
      <label class="scope-select">
         <span>Scope</span>
         <select bind:value={state._scope}>
            <option value="global">global</option>
            <option value="local">local</option>
         </select>
      </label>
   </svelte:fragment>
</AccordeonDemo>

<style>
   .local-scope-zone {
      position: relative;
      min-height: 220px;
      width: 100%;
      padding: 0.75rem;
      border: 1px dashed color-mix(in srgb, currentColor, transparent 70%);
      border-radius: 0.5rem;
      box-sizing: border-box;
   }

   .scope-select {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      width: 100%;
   }

   .scope-select select {
      width: 100%;
      min-height: 2rem;
      border-radius: 0.35rem;
      border: 1px solid color-mix(in srgb, currentColor, transparent 75%);
      background: color-mix(in srgb, var(--is-bg-secondary, white), transparent 5%);
      color: inherit;
      padding: 0.35rem 0.5rem;
      box-sizing: border-box;
   }
</style>
