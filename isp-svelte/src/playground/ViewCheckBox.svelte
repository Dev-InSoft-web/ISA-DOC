<script lang="ts">
   import { CheckBox } from "$lib";
   import { isBool } from "@ingenieria_insoft/ispgen";
   import { fly } from "svelte/transition";

   let onChange = () => console.log("onChange", checked);
   let id: string = "idComponent";
   let checked: boolean = true;
   let readonly: boolean = false;
   let name: string = "nameComponent";
   let slot: string = '<span style="margin-left: 10px; color:var(--is-color, #222)">Componente</span>';

   let visible: boolean = false;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      CheckBox {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
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
                  <td>onChange</td>
                  <td>function</td>
                  <td>false</td>
                  <td>{'let onChange = () => console.log("onChange", checked);'}</td>
                  <td>Función que se ejecutará cuando el valor cambie por un usuario</td>
               </tr>
               <tr>
                  <td>id</td>
                  <td>string</td>
                  <td>false</td>
                  <td><input type="text" bind:value={id} /></td>
                  <td>Identificador del componente</td>
               </tr>
               <tr>
                  <td>readonly</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td><input type="checkbox" bind:checked={readonly} /></td>
                  <td>Indica si el componente es de solo lectura</td>
               </tr>
               <tr>
                  <td>name</td>
                  <td>string</td>
                  <td>false</td>
                  <td><input type="text" bind:value={name} /></td>
                  <td>Asigna la propiedad name del componente</td>
               </tr>
               <tr>
                  <td>slot</td>
                  <td>componente</td>
                  <td>false</td>
                  <td><input type="text" bind:value={slot} /></td>
                  <td>Indica el label del componente</td>
               </tr>
               <tr>
                  <td>checked</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td><input type="checkbox" bind:checked /></td>
                  <td>Indica el valor del input del componente</td>
               </tr>
            </tbody>
         </table>
         <h3>Previsualizacion</h3>
         <CheckBox {id} {readonly} {name} {onChange} bind:checked>
            {#if isBool(slot)}
               {@html slot}
            {/if}
         </CheckBox>
      </div>
   {/if}
</article>
