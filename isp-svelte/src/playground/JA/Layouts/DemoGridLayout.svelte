<script lang="ts">
   import { resolveColor } from "$lib/UlConst";
   import Card from "$lib/containers/Card.svelte";
   import BlockLayout from "$lib/containers/layout/BlockLayout.svelte";
   import GridLayout from "$lib/containers/layout/GridLayout.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import ContainerSurroundPreview from "../_Utils/preview/ContainerSurroundPreview.svelte";
   import PreviewTag from "../_Utils/preview/PreviewTag.svelte";
   import { LAYOUT_PREVIEW_EMOJIS } from "../_Utils/Utils";
   import { DemoGridLayoutAdapter } from "./adapters/DemoGridLayoutAdapter";

   const adapter = new DemoGridLayoutAdapter();
   let state = adapter.initialState();
   let details = adapter.initialDetails();
   let demoStyle = "";
   let demoClass = "";

   const colClamp = (v: unknown): number => Math.max(1, Math.round(Number(v)) || 1);

   $: nItems = Math.min(50, Math.max(3, Math.round(Number(details.itemCount)) || 7));
   $: previewItems = Array.from({ length: nItems }, (_, i) => i);
</script>

<AccordeonDemo {adapter} bind:state bind:details bind:demoStyle bind:demoClass inner statusText="Aprobado" statusColor="success" titleIcon="mdi:view-grid-outline" relieve={65} configBlockCount={2}>
   <svelte:fragment slot="intro">
      Cuadrícula CSS con <code>cells</code> y <code>direction</code>, <code>gap</code>, alineación de celdas y modo <code>inline-grid</code>.
      Para responsive, el patrón es envolver con <code>BlockLayout</code>, leer <code>sizew</code> y mapear <code>cells</code>.
   </svelte:fragment>
   <div slot="preview" let:previewKey style="width: 100%;">
      <BlockLayout inline={state.inline} let:sizew>
         <ContainerSurroundPreview inline={state.inline}>
            <svelte:fragment slot="after-prev">
               <PreviewTag icon="mdi:resize">sizew={sizew}</PreviewTag>
            </svelte:fragment>
            {#key previewKey}
               <GridLayout
                  cells={String(colClamp(state.cells))}
                  cellsFit={state.cellsFit}
                  direction={state.direction}
                  gap={state.gap}
                  justify={state.justify || undefined}
                  items={state.items || undefined}
                  inline={state.inline}
                  style={`border: ${resolveColor("border/primary")} 1px solid; padding: 0.5rem; font-size: 2.25em;${details.tallHeight ? " min-height: 400px;" : ""}${demoStyle ? ` ${demoStyle}` : ""}`}
                  class={demoClass}
               >
                  {#each previewItems as i}
                     <Card variant="flat" inline style={`border: 1px solid ${resolveColor("neutral")};`}>{LAYOUT_PREVIEW_EMOJIS[i % LAYOUT_PREVIEW_EMOJIS.length]}</Card>
                  {/each}
               </GridLayout>
            {/key}
         </ContainerSurroundPreview>
      </BlockLayout>
   </div>
</AccordeonDemo>
