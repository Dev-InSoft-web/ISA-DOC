<script lang="ts">
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import Iconify, { type IconifyProps } from "$lib/primitives/Iconify.svelte";
   import Badge from "$lib/primitives/Badge.svelte";
   import type { ComponentColor } from "$lib/UlConst";
   import { slide } from "svelte/transition";
   import { createEventDispatcher, getContext } from "svelte";

   export let icon: IconifyProps["icon"] = "mdi:folder-outline";
   export let label: string = "";
   export let open: boolean = true;
   export let active: boolean = false;
   export let forceOpen: boolean = false;
   export let statusDots: ComponentColor[] = [];
   export let count: number | null = null;

   $: statusDotsUnique = statusDots?.length ? [...new Set(statusDots)] : [];

   const dispatch = createEventDispatcher<{ headerClick: void }>();

   const collapsedStore = getContext<{ subscribe: (fn: (v: boolean) => void) => () => void } | undefined>("sidebar:collapsed");

   let collapsed = false;
   if (collapsedStore) collapsedStore.subscribe((v) => (collapsed = v));

   function toggle(): void {
      open = !open;
   }

   function onHeaderClick(): void {
      dispatch("headerClick");
   }
</script>

<div class="sm-section" class:is-collapsed={collapsed} class:is-open={open} class:is-active={active}>
   <div class="sm-header">
      <button class="sm-nav" type="button" on:click={onHeaderClick} title={label} aria-label={label}>
         <Iconify class="sm-icon" {icon} />
         {#if !collapsed}
            <span class="sm-label">{label}</span>
            {#if count != null}
               <Badge color="primary" variant="ghost" shape="pill" style="font-size: 0.62rem;">{count}</Badge>
            {/if}
            {#if statusDotsUnique.length}
               <span class="sm-status-dots">
                  {#each statusDotsUnique as dotColor}
                     <span class="sm-status-dot" style={`background: var(--is-${dotColor});`}></span>
                  {/each}
               </span>
            {/if}
         {/if}
      </button>
      {#if !forceOpen}
         <button class="sm-caret" type="button" on:click={toggle} aria-expanded={open} aria-label={open ? "Contraer" : "Expandir"}>
            <Iconify icon="mdi:chevron-down" flipv={open} />
         </button>
      {/if}
   </div>

   {#if open}
      <div class="sm-content" class:sm-content-compact={collapsed} transition:slide={{ duration: 180 }}>
         <FlexLayout direction="column" gap="0.1rem" style="padding-left: {collapsed ? '0' : '0.4rem'};">
            <slot />
         </FlexLayout>
      </div>
   {/if}
</div>

<style>
   .sm-section {
      display: block;
      width: 100%;
      box-sizing: border-box;
   }

   .sm-header {
      box-sizing: border-box;
      display: flex;
      align-items: stretch;
      gap: 0.15rem;
      width: 100%;
      border-radius: 0.4rem;
      transition: background 120ms ease;
   }

   .sm-header:hover {
      background: color-mix(in srgb, currentColor 7%, transparent);
   }

   .sm-nav,
   .sm-caret {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
   }

   .sm-nav {
      flex: 1 1 auto;
      min-width: 0;
      gap: 0.5rem;
      padding: 0.4rem 0.5rem 0.4rem 0.55rem;
      border-radius: 0.4rem;
      text-align: start;
   }

   .sm-section:not(.is-collapsed) .sm-header:has(.sm-caret) .sm-nav {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
   }

   .sm-section:not(.is-collapsed) .sm-caret {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
   }

   .sm-caret {
      flex: 0 0 auto;
      width: fit-content;
      padding: 0.4rem 0.25rem;
      border-radius: 0.4rem;
      opacity: 0.65;
   }

   .sm-nav:hover,
   .sm-caret:hover {
      background: color-mix(in srgb, currentColor 10%, transparent);
   }

   .sm-caret:hover {
      opacity: 1;
   }

   .sm-header:hover .sm-caret {
      opacity: 1;
   }

   .sm-section.is-active .sm-nav {
      background: color-mix(in srgb, var(--is-primary, #38bdf8) 18%, transparent);
      color: var(--is-primary, #38bdf8);
   }

   :global(.sm-icon) {
      font-size: 1.15em;
      flex-shrink: 0;
      opacity: 0.92;
   }

   .sm-label {
      flex: 0 1 auto;
      min-width: 0;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0.85;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }

   .sm-status-dots {
      display: inline-flex;
      gap: 0.3em;
      align-items: center;
      flex-shrink: 0;
      margin-right: auto;
   }

   .sm-status-dot {
      display: inline-block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 999px;
   }

   .sm-section.is-collapsed .sm-header {
      justify-content: flex-start;
      align-items: center;
      gap: 0;
   }

   .sm-section.is-collapsed .sm-nav {
      flex: 1 1 auto;
      justify-content: flex-start;
      padding: 0.4rem 0.25rem;
   }

   .sm-section.is-collapsed .sm-caret {
      width: auto;
      justify-content: flex-start;
      padding: 0.4rem 0.15rem;
      font-size: 0.75em;
   }

   .sm-content {
      box-sizing: border-box;
      padding: 0.25rem 0 0.5rem;
   }

   :global(.sm-content button) {
      border-radius: 0 !important;
   }

   :global(.sm-content-compact .sm-full) {
      display: none;
   }

   :global(.sm-content-compact button) {
      justify-content: center !important;
      padding: 0.25rem !important;
   }</style>
