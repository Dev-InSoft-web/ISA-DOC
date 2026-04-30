<script context="module" lang="ts">
   import { type CardProps } from "@ingenieria_insoft/ispsveltecomponents";
   import { fade } from "svelte/transition";

   export interface SkeletonProps extends CardProps {
      loading: boolean | Promise<unknown>;
   }

   export interface SkeletonSlots {
      default: {};
      onerror: {};
      waiting: {};
   }
</script>

<script lang="ts">
   interface $$Props extends SkeletonProps {}
   interface $$Slots extends SkeletonSlots {}

   export let loading: $$Props["loading"];

   $: isLoadingBool = typeof loading === "boolean" && loading;
   $: isPromise = loading instanceof Promise;
   $: rootclass = ["sk-wrap", $$restProps.class].filter(Boolean).join(" ");
</script>

{#if isLoadingBool}
   <div {...$$restProps} class={rootclass}>
      <div class="sk-waiting">
         <slot name="waiting">
            <div class="sk-waiting-default"><slot /></div>
         </slot>
      </div>
   </div>
{:else if isPromise}
   {#await loading}
      <div {...$$restProps} class={rootclass}>
         <div class="sk-waiting">
            <slot name="waiting">
               <div class="sk-waiting-default"><slot /></div>
            </slot>
         </div>
      </div>
   {:then}
      <div in:fade={{ duration: 500 }} class="sk-fade">
         <slot />
      </div>
   {:catch}
      <slot name="onerror" />
   {/await}
{:else}
   <div in:fade={{ duration: 500 }} class="sk-fade">
      <slot />
   </div>
{/if}

<style>
   @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Redacted&family=Redacted+Script:wght@300;400;700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

   .sk-wrap {
      position: relative;
      width: 100%;

      :global {
         .is-loading {
            display: none !important;
         }
         .sk-host {
            border-radius: 0 !important;
            min-height: 4rem;
            width: 100%;
            height: 100%;
         }
      }

      .sk-waiting {
         position: absolute;
         inset: 0;
         pointer-events: none;
         filter: grayscale(0.8);
         :global(> *) {
            animation: sz2-pulse 1s ease-in-out infinite alternate;
         }
         :global(*) {
            font-family: "Redacted", cursive;
            color: gray;
            border-radius: 0;
            vertical-align: middle;

            &:global(:is(svg, button, input, textarea)) {
               fill: white !important;
               background: white !important;
               color: white;
               filter: invert(0.3) opacity(0.7);
               border-radius: 0.3rem;
					&:global(:is(svg, button)) {
						border-radius: 999px;
					}
            }
         }

         .sk-waiting-default {
            width: 100%;
            height: 100%;

            user-select: none;
            pointer-events: none;
         }
      }
   }

   .sk-fade {
      display: block;
      width: 100%;
      height: 100%;
   }

   @keyframes sz2-pulse {
      0% {
         opacity: 0.3;
      }
      100% {
         opacity: 0.15;
      }
   }
</style>
