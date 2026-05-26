<script lang="ts">
   import SelectEnum from "$lib/form/SelectEnum.svelte";
   import { fly } from "svelte/transition";
   import { EnumNumber, EnumString } from "./UlConst";

   let visible: boolean = false;

   let valueStr: string = "";
   let required: boolean = false;
   let readonly: boolean = false;
   let valueNum: number = 0;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Select Enum {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <h3>Previsualizacion</h3>
         <table class="">
            <thead>
               <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Requerido</th>
                  <th>Ejemplo</th>
                  <th>Descripción</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>required</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td><input type="checkbox" bind:checked={required} /></td>
                  <td>Indica si el componente es requerido</td>
               </tr>
               <tr>
                  <td>readonly</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td><input type="checkbox" bind:checked={readonly} /></td>
                  <td>Indica si el componente es de solo lectura</td>
               </tr>
            </tbody>
         </table>
         <SelectEnum enumValue={EnumString} label="Enum String" bind:value={valueStr} {required} {readonly}></SelectEnum>
         <br />
         <SelectEnum enumValue={EnumNumber} label="Enum Number" bind:value={valueNum} {required} {readonly}></SelectEnum>
      </div>
   {/if}
</article>
