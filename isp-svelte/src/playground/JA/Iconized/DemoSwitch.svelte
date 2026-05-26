<script lang="ts">
   import type { ComponentColor } from "$lib/UlConst";
   import Switch from "$lib/primitives/iconized/Switch.svelte";
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoSwitchAdapter } from "./adapters/DemoSwitchAdapter";

   const adapter = new DemoSwitchAdapter();
   let state = adapter.initialState();
   let details = adapter.initialDetails();
   let demoStyle = "";
   let demoClass = "";
</script>

<AccordeonDemo {adapter} bind:state bind:details bind:demoStyle bind:demoClass statusText="Aprobado" statusColor="success" titleIcon="mdi:toggle-switch-outline" inner>
   <svelte:fragment slot="intro">
      Interruptor deslizante con etiqueta, colores y estados equivalentes al checkbox compacto.
   </svelte:fragment>
   <div slot="preview" let:previewKey style="width: fit-content; max-width: 100%; margin: 0 auto;">
      <FlexLayout justify="center" items="center" style="min-height: 100px;">
         {#key previewKey}
            <Switch
               bind:checked={state.checked}
               color={state.color as ComponentColor | undefined}
               colorFalse={state.colorFalse as ComponentColor | undefined}
               loading={state.loading}
               disabled={state.disabled}
               style={demoStyle}
               class={demoClass}
            >
               {details.label}
            </Switch>
         {/key}
      </FlexLayout>
   </div>
</AccordeonDemo>
