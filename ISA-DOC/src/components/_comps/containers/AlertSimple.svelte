<script context="module" lang="ts">
   import { FlexLayout, Iconify, Text } from "@ingenieria_insoft/ispsveltecomponents";
   import { onMount } from "svelte";

   export interface AlertSimpleProps {
      mensaje?: string;
      redirectUrl?: string;
      redirectSeconds?: number;
   }
</script>

<script lang="ts">
   interface $$Props extends AlertSimpleProps {}

   export let mensaje: $$Props["mensaje"] = "Este recurso no está disponible.";
   export let redirectUrl: $$Props["redirectUrl"] = "";
   export let redirectSeconds: $$Props["redirectSeconds"] = 6;

   let countdown: number = redirectSeconds || 6;
   let intervalId: ReturnType<typeof setInterval> | undefined;

   onMount(() => {
      if (!redirectUrl) return;
      countdown = redirectSeconds || 6;
      intervalId = setInterval(() => {
         countdown -= 1;
         (countdown <= 0) && (clearInterval(intervalId), window.location.href = redirectUrl || "/");
      }, 1000);
      return () => { intervalId && clearInterval(intervalId); };
   });

   const self = {
      get hostclass() {
         return ["alert-simple-host", $$restProps.class].filter(Boolean).join(" ");
      },
   };
</script>

<FlexLayout direction="column" items="center" justify="center" {...$$restProps} class={self.hostclass}>
   <Iconify icon="mdi:alert-circle-outline" class="alert-simple-icon" />
   <Text color="neutral" class="alert-simple-message">{mensaje}</Text>
   {#if redirectUrl}
      <Text color="neutral" class="alert-simple-redirect">Redirigiendo en {countdown} segundo{countdown !== 1 ? "s" : ""}...</Text>
   {/if}
</FlexLayout>

<style>
   :global {
      .alert-simple-host {
         padding: 3rem;
         flex: 1;
         min-height: 12rem;

         .alert-simple-icon {
            font-size: 3rem;
            color: var(--is-warning, #f59e0b);
            margin-bottom: 0.75rem;
         }

         .alert-simple-message {
            text-align: center;
            font-weight: 500;
         }

         .alert-simple-redirect {
            text-align: center;
            margin-top: 0.5rem;
            opacity: 0.7;
            font-size: 0.85rem;
         }
      }
   }
</style>
