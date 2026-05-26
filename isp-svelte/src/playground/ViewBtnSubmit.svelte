<script lang="ts">
   import { BtnSubmit } from "$lib";
   import { isBool } from "@ingenieria_insoft/ispgen";

   import { fly } from "svelte/transition";

   let onClick = () => console.log("onClick");
   let slot: string = '<span style="font-weight: 600">Enviar</span>';
   let style: string = "color:white";

   let visible: boolean = false;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      BtnSubmit {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }} class="gap-2">
         <h3>Propiedades</h3>
         <table class="w-full border-collapse table-auto text-sm mt-2">
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
                  <td>onClick</td>
                  <td>function</td>
                  <td>false</td>
                  <td>{'let onClick = () => console.log("onClick");'}</td>
                  <td>Función que se ejecutará cuando el usuario presiona le botón</td>
               </tr>
               <tr>
                  <td>slot</td>
                  <td>componente</td>
                  <td>false</td>
                  <td><input type="text" bind:value={slot} /></td>
                  <td>Indica el label del componente</td>
               </tr>
               <tr>
                  <td>style</td>
                  <td>string</td>
                  <td>false</td>
                  <td><input type="text" bind:value={style} /></td>
                  <td>Estilos adicionales para agregar al botón</td>
               </tr>
            </tbody>
         </table>
         <h3>Previsualizacion</h3>
         {#if isBool(slot)}
            <BtnSubmit {onClick} {style}>
               {@html slot}
            </BtnSubmit>
         {:else}
            <BtnSubmit {onClick} {style} />
         {/if}
      </div>
   {/if}
</article>
