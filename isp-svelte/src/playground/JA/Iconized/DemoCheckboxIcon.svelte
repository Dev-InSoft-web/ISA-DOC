<script lang="ts">
   import CheckboxIcon from "$lib/primitives/iconized/CheckboxIcon.svelte";
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import GridLayout from "$lib/containers/layout/GridLayout.svelte";
   import Iconify, { type IconifyProps } from "$lib/primitives/Iconify.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import CardHollow from "../_Utils/preview/CardHollow.svelte";
   import InputDecorated from "../_Utils/preview/InputDecorated.svelte";
   import { columnsGridPlayground } from "../_Utils/Utils";
   import { DemoCheckboxIconAdapter } from "./adapters/DemoCheckboxIconAdapter";

   const adapter = new DemoCheckboxIconAdapter();
   let state = adapter.initialState();
   let details = adapter.initialDetails();
   let demoStyle = "";
   let demoClass = "";

   type TSwitchItemDemo = {
      label: string | ((checked: boolean) => string);
      checked: boolean;
      iconTrue: IconifyProps["icon"];
      iconFalse: IconifyProps["icon"];
   };

   const crearSwitchItemsDemo = (): TSwitchItemDemo[] => [
      { label: (c: boolean) => `Modo ${c ? "Oscuro" : "Claro"}`, checked: false, iconTrue: "mdi:weather-night", iconFalse: "mdi:weather-sunny" },
      { label: "Notificaciones", checked: false, iconTrue: "mdi:bell", iconFalse: "mdi:bell-off" },
      { label: "Bluetooth", checked: false, iconTrue: "mdi:bluetooth", iconFalse: "mdi:bluetooth-off" },
   ];

   let switchItems = crearSwitchItemsDemo();
</script>

<AccordeonDemo {adapter} bind:state bind:details bind:demoStyle bind:demoClass statusText="Aprobado" statusColor="success" titleIcon="mdi:checkbox-marked-circle-outline" inner>
   <svelte:fragment slot="intro">
      Casilla con iconos personalizables en cada estado, colores activo/inactivo y modo carga.
   </svelte:fragment>
   <div slot="preview" let:previewKey style="width: fit-content; max-width: 100%; margin: 0 auto;">
      <FlexLayout justify="center" items="center" style="min-height: 100px;">
         {#key previewKey}
            <CheckboxIcon
               bind:checked={state.checked}
               color={state.color}
               colorFalse={state.colorFalse}
               loading={state.loading}
               disabled={state.disabled}
               style={demoStyle}
               class={demoClass}
            >
               <Iconify slot="iconTrue" icon={details.previewIconTrue as string} />
               <Iconify slot="iconFalse" icon={details.previewIconFalse as string} />
               {details.previewLabel}
            </CheckboxIcon>
         {/key}
      </FlexLayout>
   </div>
   <svelte:fragment slot="config">
      <CardHollow>
         <InputDecorated icon="mdi:lightbulb-outline" label="Ejemplos">
            <GridLayout cells={columnsGridPlayground("xl")} justify="start">
               {#each switchItems as item}
                  <CheckboxIcon bind:checked={item.checked} color="primary" colorFalse="neutral">
                     <Iconify slot="iconTrue" icon={item.iconTrue} />
                     <Iconify slot="iconFalse" icon={item.iconFalse} />
                     {typeof item.label === "function" ? item.label(item.checked) : item.label}
                  </CheckboxIcon>
               {/each}
            </GridLayout>
         </InputDecorated>
      </CardHollow>
   </svelte:fragment>
</AccordeonDemo>
