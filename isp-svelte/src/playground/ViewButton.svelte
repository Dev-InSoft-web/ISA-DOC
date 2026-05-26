<script lang="ts">
   import { Button } from "$lib";
   import { isBool } from "@ingenieria_insoft/ispgen";
   import { fly } from "svelte/transition";

   let onClick = () => console.log("onClick");
   let slot: string = '<span style="font-weight:600">Hola mundo</span>';
   let style: string = "";
   let variant: "info" | "success" | "warning" | "error" | "danger" = "info";

   let visible: boolean = false;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Button {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }} class="gap-2">
         <h3>Propiedades</h3>
         <table>
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
                  <td>{'let onClick = () => console.log("onClick");'} </td>
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
               <tr>
                  <td>style</td>
                  <td>string</td>
                  <td>false</td>
                  <td>
                     <select bind:value={variant}>
                        <option value="info">info</option>
                        <option value="success">success</option>
                        <option value="warning">warning</option>
                        <option value="error">error</option>
                        <option value="danger">danger</option>
                     </select>
                  </td>
                  <td>Estilos pretermindos para el botón</td>
               </tr>
            </tbody>
         </table>
         <h3>Previsualizacion</h3>
         {#if isBool(slot)}
            <Button {onClick} {variant} {style}>
               {@html slot}
            </Button>
         {:else}
            <Button {onClick} {variant} {style} />
         {/if}
      </div>
   {/if}
</article>
