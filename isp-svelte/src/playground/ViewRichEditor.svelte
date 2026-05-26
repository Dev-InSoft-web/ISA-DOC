<script lang="ts">
   import CheckBox from "$lib/form/CheckBox.svelte";
   import RichEditor from "$lib/form/richEditor/RichEditor.svelte";
   import { fly } from "svelte/transition";

   let visible: boolean = false;
   let readonly: boolean = false;
   let value: string = "Hola mundo";
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Rich Editor {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <CheckBox bind:checked={readonly} >Solo lectura </CheckBox>
         <h3>Previsualizacion</h3>
         <RichEditor {readonly} bind:value label="Label del componente" />
      </div>
   {/if}
</article>
