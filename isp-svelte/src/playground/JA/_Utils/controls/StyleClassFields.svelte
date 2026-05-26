<script lang="ts">
   import CardHollow from "../preview/CardHollow.svelte";
   import InputDecorated from "../preview/InputDecorated.svelte";
   import GridLayout from "$lib/containers/layout/GridLayout.svelte";
   import { columnsConfig } from "../Utils";

   export let style: string = "";
   export let klass: string = "";
   export let stylePlaceholder: string = "width: 100%; min-height: 100px;";
   export let classPlaceholder: string = "mi-clase otra-clase";
</script>

<CardHollow let:sizew>
   <GridLayout cells={String(columnsConfig(2, sizew))} justify="start" style="width: 100%;">
      <InputDecorated icon="mdi:code-tags" label="style" type="text" bind:value={style} placeholder={stylePlaceholder} />
      <InputDecorated icon="mdi:tag-outline" label="class" type="text" bind:value={klass} placeholder={classPlaceholder} />
   </GridLayout>
</CardHollow>
