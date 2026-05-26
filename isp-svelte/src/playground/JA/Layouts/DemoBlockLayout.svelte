<script lang="ts">
   import { resolveColor } from "$lib/UlConst";
   import Card from "$lib/containers/Card.svelte";
   import BlockLayout from "$lib/containers/layout/BlockLayout.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import ContainerSurroundPreview from "../_Utils/preview/ContainerSurroundPreview.svelte";
   import PreviewTag from "../_Utils/preview/PreviewTag.svelte";
   import { LAYOUT_PREVIEW_EMOJIS } from "../_Utils/Utils";
   import { DemoBlockLayoutAdapter } from "./adapters/DemoBlockLayoutAdapter";

   const adapter = new DemoBlockLayoutAdapter();
   let state = adapter.initialState();
   let details = adapter.initialDetails();
   let demoStyle = "";
   let demoClass = "";

   $: nItems = Math.min(50, Math.max(1, Math.round(Number(details.itemCount)) || 1));
   $: previewItems = Array.from({ length: nItems }, (_, i) => i);
</script>

<AccordeonDemo {adapter} bind:state bind:details bind:demoStyle bind:demoClass inner statusText="sin revisión" statusColor="danger" titleIcon="mdi:view-quilt-outline">
   <svelte:fragment slot="intro">
      Base compartida para componentes tipo bloque. Expone <code>sizew</code> por slot y respeta modo <code>inline</code>.
   </svelte:fragment>
   <div slot="preview" let:previewKey style="width: 100%;">
      <BlockLayout inline={state.inline} let:sizew>
         <ContainerSurroundPreview inline={state.inline}>
            <svelte:fragment slot="after-prev">
               <PreviewTag icon="mdi:resize">sizew={sizew}</PreviewTag>
            </svelte:fragment>
            {#key previewKey}
               <BlockLayout inline={state.inline} style={`border: ${resolveColor("border/primary")} 1px solid; padding: 0.5rem; font-size: 2.25em;${demoStyle ? ` ${demoStyle}` : ""}`} class={demoClass}>
                  {#each previewItems as i}
                     <Card variant="flat" inline style={`border: 1px solid ${resolveColor("neutral")};`}>{LAYOUT_PREVIEW_EMOJIS[i % LAYOUT_PREVIEW_EMOJIS.length]}</Card>
                  {/each}
               </BlockLayout>
            {/key}
         </ContainerSurroundPreview>
      </BlockLayout>
   </div>
</AccordeonDemo>
