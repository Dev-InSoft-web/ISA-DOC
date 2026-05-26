<script lang="ts">
   import Input from "$lib/form/Input.svelte";
   import { isBool } from "@ingenieria_insoft/ispgen";
   import { fly } from "svelte/transition";
   //import { Input, Button } from "./../../dist";

   let onChange = () => console.log("onChangeInput", value);
   let onTypingEnd = () => console.log("onTypingEnd", value);
   let id: string = "idComponent";
   let required: boolean = true;
   let readonly: boolean = false;
   let name: string = "nameComponent";
   let label: string = "Label a mostrar";
   let value: string = "";
   let svg: string = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
	<g stroke-width="0"></g>
	<g stroke-linecap="round" stroke-linejoin="round"></g>
	<path
		d="M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.6655 21 17.0604 19.8412 18.7083 18M16 12.2857L17.8 14L22 10M12 8V13M12 16H12.01"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>`;
   let maxLength: number = Number.MAX_SAFE_INTEGER;

   let visible: boolean = false;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Input {visible ? "▲" : "▼"}
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
                  <td>onChange</td>
                  <td>function</td>
                  <td>false</td>
                  <td>let onChange = () => console.log("onChangeInput", value);</td>
                  <td>Función que se ejecutará cuando el valor cambie por un usuario</td>
               </tr>
               <tr>
                  <td>onTypingEnd</td>
                  <td>function</td>
                  <td>false</td>
                  <td>let onTypingEnd = () => {console.log("onTypingEnd", value)}</td>
                  <td>Función que se ejecutará cuando termine de escribir, dando un tiempo de espera para que el usuario termine de escribir</td>
               </tr>
               <tr>
                  <td>id</td>
                  <td>string</td>
                  <td>false</td>
                  <td><input type="text" bind:value={id} /></td>
                  <td>Identificador del componente</td>
               </tr>
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
                  <td>name</td>
                  <td>string</td>
                  <td>false</td>
                  <td><input type="text" bind:value={name} /></td>
                  <td>Asigna la propiedad name del componente</td>
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
               <tr>
                  <td>svg</td>
                  <td>slot</td>
                  <td>false</td>
                  <td><textarea bind:value={svg}></textarea></td>
                  <td>Indica el nombre de una imagen que se encuentre en la carpeta public/icons/form</td>
               </tr>
               <tr>
                  <td>maxLength</td>
                  <td>number</td>
                  <td>false</td>
                  <td><input type="text" bind:value={maxLength} /></td>
                  <td>Indica el tamaño máximo del input del componente</td>
               </tr>
            </tbody>
         </table>
         <h3>Previsualizacion</h3>
         <br />

         <Input {id} {required} {readonly} {name} {label} {maxLength} bind:value {onChange} {onTypingEnd}>
            <svelte:fragment slot="svg">
               {@html svg}
            </svelte:fragment>
         </Input>
         <br />
         <h3>Código</h3>
      </div>
   {/if}
</article>
