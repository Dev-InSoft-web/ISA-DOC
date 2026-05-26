<script lang="ts">
   import { SelectObject } from "$lib";
   import { fly } from "svelte/transition";
   import { TApp } from "./UlConst";

   let visible: boolean = false;

   let Options: { [key: string]: TApp } = {
      CP: TApp.JSONToObject({ app: "ContaPyme" }),
      AgroWin: TApp.JSONToObject({ app: "AgroWin" }),
   };

   let fnCaption: (obj: TApp) => string = (Obj: TApp) => {
      return Obj.app;
   };

   let value: string = "xxx";
   let required: boolean = false;
   let readonly: boolean = false;

   let label = "Seleccione su app favorita";
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Select Object {visible ? "▲" : "▼"}
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
         <SelectObject {Options} {fnCaption} {label} {value} {required} {readonly}></SelectObject>
      </div>
   {/if}
</article>
