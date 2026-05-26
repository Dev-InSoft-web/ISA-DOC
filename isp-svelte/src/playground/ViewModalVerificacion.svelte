<script lang="ts">
   import { Button, ModalVerificacion } from "$lib";
   import { TMensajesVerificacion } from "@ingenieria_insoft/ispgen";
   import { fly } from "svelte/transition";

   let visible: boolean = false;

   let Mensajes: TMensajesVerificacion = new TMensajesVerificacion();
   Mensajes.addMensaje("info", "Mensaje de verificaion creado");
   Mensajes.addMensaje("info", "Mensaje de verificaion creado");
   Mensajes.addMensaje("info", "Mensaje de verificaion creado");
   Mensajes.addMensaje("warning", "Mensaje de advertecnia agregado");
   Mensajes.addMensaje("warning", "Mensaje de advertecnia agregado");
   Mensajes.addMensaje("error", "Error encontrado en la verificaion");

   let bshow = false;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Modal Verificacion {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <Button onClick={() => (bshow = true)}>Abrir modal</Button>

         <ModalVerificacion bind:bshow {Mensajes} />
      </div>
   {/if}
</article>
