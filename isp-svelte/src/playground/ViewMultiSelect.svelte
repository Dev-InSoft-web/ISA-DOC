<script lang="ts">
   import ModalSelect from "$lib/base/ModalSelect.svelte";
   import { fly } from "svelte/transition";
   import { TApp, TMyBtnRefController } from "./UlConst";

   let visible: boolean = false;
   let bShowModal: boolean = false;
   let multiSelect: boolean = true;
   let selection: Array<TApp> = [];

   let Controller: TMyBtnRefController = new TMyBtnRefController();

   function onSelectData(_elems: Array<TApp>) {
      selection = _elems;
      console.log(selection);
      bShowModal = false;
   }
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      MultiSelector {visible ? "▲" : "▼"}
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
                  <td>multi seleccionable</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td><input type="checkbox" bind:checked={multiSelect} /></td>
                  <td>Indica si se pueden obtener uno o varios elementos</td>
               </tr>
               <tr>
                  <td colspan="2"><button on:click={() => (bShowModal = true)}>Abre el selector</button></td>
                  <td>Function</td>
                  <td colspan="2">Metodo que abre el selectro</td>
               </tr>
            </tbody>
         </table>

         {#if selection.length > 0}
            <h3>Previsualizacion</h3>
            <p>Elementos seleccionados:</p>
            <ul>
               {#each selection as item}
                  <li>{item.app} - {item.bactiva ? "Activa" : "Inactiva"}</li>
               {/each}
            </ul>
         {/if}
         {#if bShowModal}
            <ModalSelect bind:bShowModal {Controller} {multiSelect} {onSelectData}></ModalSelect>
         {/if}
      </div>
   {/if}
</article>
