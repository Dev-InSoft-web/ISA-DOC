<script lang="ts">
   import Iconify from "$lib/primitives/Iconify.svelte";
   import toast from "svelte-french-toast";
   import { Button, Card, FlexLayout, Modal, Text } from "$lib";
   import ButtonFit from "../_Utils/controls/ButtonFit.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import CardHollow from "../_Utils/preview/CardHollow.svelte";
   import InputDecorated from "../_Utils/preview/InputDecorated.svelte";
   import { DemoOverlayModalAdapter } from "./adapters/DemoOverlayModalAdapter";

   const adapter = new DemoOverlayModalAdapter();
   let state = adapter.initialState();
   let details = adapter.initialDetails();
   let demoStyle = "";
   let demoClass = "";

   let modalShow = false;
   let modalLoading = false;
   let nested1 = false;
   let nested2 = false;
   let nested3 = false;
   let modalNotCloseShow = false;
   let modalCustomSizeShow = false;

   $: modalSinCabecera = !details.bTituloPorSlot && state.showCloseHeader === false;

   const abrirModalDemo = (): void => {
      modalShow = true;
      if (details.bSimularLoading) {
         modalLoading = true;
         setTimeout(() => {
            modalLoading = false;
         }, 5000);
      }
   };

   const fireToastExperiment = (): void => {
      toast.success("Toast desde modal anidado (capa superior).", { duration: 40_000 });
   };
</script>

<AccordeonDemo {adapter} bind:state bind:details bind:demoStyle bind:demoClass inner statusText="Aprobado" statusColor="success" titleIcon="mdi:window-maximize">
   <svelte:fragment slot="intro">Diálogo modal centrado: título por slot o mínimo, cierre en cabecera, scope global/local (como ActionDrawer) e inclusión de modales anidados.</svelte:fragment>
   <FlexLayout slot="preview" let:previewKey direction="column" justify="center" items="center" style="width: 100%; min-height: 120px;">
      <div class="local-scope-zone">
         <FlexLayout direction="column" style="width: 100%;">
            <Text color="neutral">Zona de prueba para scope global/local (contenedor relativo).</Text>
            <ButtonFit onClick={abrirModalDemo}>
               <Iconify slot="icon" icon="mdi:open-in-new" />
               Abrir modal
            </ButtonFit>
         </FlexLayout>
         {#key previewKey}
            {#if details.bTituloPorSlot}
               <Modal bind:bshow={modalShow} loading={modalLoading} _scope={state._scope} showCloseHeader={state.showCloseHeader} style={demoStyle} class={demoClass}>
                  <FlexLayout slot="title">
                     <Iconify icon={details.icono as string} />
                     <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{details.titulo}</span>
                  </FlexLayout>
                  <div style="padding: 3rem;">Contenido de demostración.</div>
               </Modal>
            {:else}
               <Modal bind:bshow={modalShow} loading={modalLoading} _scope={state._scope} showCloseHeader={modalSinCabecera ? false : state.showCloseHeader} style={demoStyle} class={demoClass}>
                  <div style="padding: 3rem;">Contenido de demostración.</div>
               </Modal>
            {/if}
         {/key}
      </div>
   </FlexLayout>

   <svelte:fragment slot="tests">
      <CardHollow>
         <FlexLayout direction="column" items="center" gap="0.5rem" style="width: 100%; padding: 0.5rem;">
            <ButtonFit variant="outlined" onClick={() => (modalNotCloseShow = true)}>
               <Iconify slot="icon" icon="mdi:lock-outline" />
               Abrir modal notClose
            </ButtonFit>
            <Text color="neutral">Bloquea ESC, backdrop y cierre automático.</Text>
         </FlexLayout>
      </CardHollow>

      <CardHollow>
         <FlexLayout direction="column" items="center" gap="0.5rem" style="width: 100%; padding: 0.5rem;">
            <ButtonFit variant="outlined" onClick={() => (modalCustomSizeShow = true)}>
               <Iconify slot="icon" icon="mdi:aspect-ratio" />
               Abrir modal 800x600
            </ButtonFit>
            <Text color="neutral">Forza tamaño via style para validar propagación.</Text>
         </FlexLayout>
      </CardHollow>

      <div style="grid-column: 1 / -1;">
         <CardHollow>
            <InputDecorated asTitle icon="mdi:stairs" label="Modales anidados">
               <FlexLayout direction="column" style="padding: 0.75rem; width: 40%; max-width: 100%; margin-left: auto; margin-right: auto; box-sizing: border-box;">
                  <Button variant="outlined" color="primary" style="width: 100%; box-sizing: border-box;" onClick={fireToastExperiment}>
                     <Iconify slot="icon" icon="mdi:bell-ring-outline" />
                     Abrir toast
                  </Button>
                  <Button style="width: 100%; box-sizing: border-box;" onClick={() => (nested1 = true)}>
                     <Iconify slot="icon" icon="mdi:stairs" />
                     Abrir nivel 1
                  </Button>
               </FlexLayout>
            </InputDecorated>
         </CardHollow>
      </div>

      <Modal bind:bshow={modalNotCloseShow} notClose>
         <Card slot="title" variant="solid" relieve={50} style="padding: 0.25rem 0.5rem;">
            <FlexLayout inline items="center">
               <Iconify icon="mdi:lock" />
               <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Modal con notClose</span>
            </FlexLayout>
         </Card>
         <FlexLayout direction="column" style="padding: 0.75rem; min-width: 260px;">
            <Text color="neutral">Este modal bloquea ESC, backdrop y cierre automático.</Text>
            <Button color="danger" style="width: 100%;" onClick={() => (modalNotCloseShow = false)}>
               <Iconify slot="icon" icon="mdi:close-circle-outline" />
               Cerrar
            </Button>
         </FlexLayout>
      </Modal>

      <Modal bind:bshow={modalCustomSizeShow} style="width: 800px; height: 600px;">
         <FlexLayout slot="title" items="center">
            <Iconify icon="mdi:aspect-ratio" />
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Modal tamaño personalizado</span>
         </FlexLayout>
         <FlexLayout direction="column" style="padding: 0.75rem; box-sizing: border-box; width: 100%; height: 100%;">
            <Text color="neutral">Este modal usa `style` para forzar 800x600 y validar propagación.</Text>
         </FlexLayout>
      </Modal>

      <Modal bind:bshow={nested1} showCloseHeader>
         <Card slot="title" variant="solid" relieve={50} style="padding: 0.25rem 0.5rem;">
            <FlexLayout inline items="center">
               <Iconify icon="mdi:layers" />
               <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Nivel 1</span>
            </FlexLayout>
         </Card>
         <FlexLayout direction="column" style="padding: 0.75rem;">
            <Text color="neutral">Este modal abre el siguiente.</Text>
            <FlexLayout justify="center" items="center" style="min-width: 300px; width: 100%; padding: 0.5rem 0;">
               <Iconify icon="fluent-emoji:rocket" style="font-size: 4.5rem; line-height: 1;" />
            </FlexLayout>
            <FlexLayout direction="column" style="width: 100%;">
               <Button variant="outlined" color="primary" style="width: 100%;" onClick={fireToastExperiment}>
                  <Iconify slot="icon" icon="mdi:bell-ring-outline" />
                  Probar toasts
               </Button>
               <Button style="width: 100%;" onClick={() => (nested2 = true)}>
                  <Iconify slot="icon" icon="mdi:stairs-up" />
                  Abrir nivel 2
               </Button>
            </FlexLayout>
         </FlexLayout>
      </Modal>

      <Modal bind:bshow={nested2} showCloseHeader>
         <Card slot="title" variant="solid" relieve={50} style="padding: 0.25rem 0.5rem;">
            <FlexLayout inline items="center">
               <Iconify icon="mdi:layers-outline" />
               <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Nivel 2</span>
            </FlexLayout>
         </Card>
         <FlexLayout direction="column" style="padding: 0.75rem;">
            <Text color="neutral">Segundo nivel.</Text>
            <FlexLayout justify="center" items="center" style="min-width: 300px; width: 100%; padding: 0.5rem 0;">
               <Iconify icon="fluent-emoji:star" style="font-size: 4.5rem; line-height: 1;" />
            </FlexLayout>
            <FlexLayout direction="column" style="width: 100%;">
               <Button variant="outlined" color="primary" style="width: 100%;" onClick={fireToastExperiment}>
                  <Iconify slot="icon" icon="mdi:bell-ring-outline" />
                  Probar toasts
               </Button>
               <Button style="width: 100%;" onClick={() => (nested3 = true)}>
                  <Iconify slot="icon" icon="mdi:layers-triple-outline" />
                  Abrir nivel 3
               </Button>
            </FlexLayout>
         </FlexLayout>
      </Modal>

      <Modal bind:bshow={nested3} showCloseHeader>
         <Card slot="title" variant="solid" relieve={50} style="padding: 0.25rem 0.5rem;">
            <FlexLayout inline items="center">
               <Iconify icon="mdi:layers-triple" />
               <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Nivel 3</span>
            </FlexLayout>
         </Card>
         <FlexLayout direction="column" style="padding: 0.75rem;">
            <Text color="neutral">Tercer nivel.</Text>
            <FlexLayout justify="center" items="center" style="min-width: 300px; width: 100%; padding: 0.5rem 0;">
               <Iconify icon="fluent-emoji:party-popper" style="font-size: 4.5rem; line-height: 1;" />
            </FlexLayout>
            <FlexLayout direction="column" style="width: 100%;">
               <Button variant="outlined" color="primary" style="width: 100%;" onClick={fireToastExperiment}>
                  <Iconify slot="icon" icon="mdi:bell-ring-outline" />
                  Probar toasts
               </Button>
               <Button color="danger" style="width: 100%;" onClick={() => (nested3 = false)}>
                  <Iconify slot="icon" icon="mdi:close-circle-outline" />
                  Cerrar nivel 3
               </Button>
            </FlexLayout>
         </FlexLayout>
      </Modal>
   </svelte:fragment>

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
