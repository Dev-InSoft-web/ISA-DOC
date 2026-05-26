<script lang="ts">
   import CheckboxIcon from "$lib/primitives/iconized/CheckboxIcon.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";
   import { onMount } from "svelte";

   let isDark = false;
   let mounted = false;

   function applyTheme(dark: boolean): void {
      const root = document.documentElement;
      if (dark) root.classList.add("dark");
      else root.classList.remove("dark");
      try {
         localStorage.setItem("color-theme", dark ? "dark" : "light");
      } catch {
         /* ignore */
      }
   }

   onMount(() => {
      let stored: string | null = null;
      try {
         stored = localStorage.getItem("color-theme");
      } catch {
         /* ignore */
      }
      isDark = stored ? stored === "dark" : document.documentElement.classList.contains("dark");
      applyTheme(isDark);
      mounted = true;
   });

   $: if (mounted) applyTheme(isDark);
</script>

<CheckboxIcon
   class="ja-dark-toggle"
   color="primary"
   colorFalse="neutral"
   bind:checked={isDark}
   title={isDark ? "Modo claro" : "Modo oscuro"}
>
   <Iconify slot="iconTrue" icon="mdi:weather-night" />
   <Iconify slot="iconFalse" icon="mdi:weather-sunny" />
</CheckboxIcon>

<style>
   :global(label.ja-dark-toggle) {
      width: fit-content !important;
      padding: 0.25rem 0.4rem;
   }
</style>
