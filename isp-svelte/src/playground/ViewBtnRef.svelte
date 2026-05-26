<script lang="ts">
   import { fly } from "svelte/transition";
   import { TApp, TMyBtnRefController } from "./UlConst";
   import BtnRef from "$lib/form/BtnRef.svelte";

   let visible: boolean = true;

   let required: boolean = false;
   let readonly: boolean = false;
   let label: string = "Aplicación";
   let value: string = "";

   let Controller: TMyBtnRefController = new TMyBtnRefController();
   let btnRef: BtnRef<TApp>;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      BtnRef {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <h3>Propiedades</h3>
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
               <tr>
                  <td>label</td>
                  <td>string</td>
                  <td>false</td>
                  <td><input type="text" bind:value={label} /></td>
                  <td>Indica el label del componente</td>
               </tr>
               <tr>
                  <td>value</td>
                  <td>string</td>
                  <td>false</td>
                  <td><input type="text" bind:value /></td>
                  <td>Indica el valor del input del componente</td>
               </tr>
            </tbody>
         </table>
         <h3>Previsualizacion</h3>
         <BtnRef {Controller} bind:this={btnRef} {required} {readonly} {label} bind:value />
      </div>
   {/if}
</article>
