<script lang="ts">
   import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
   import Badge from "$lib/primitives/Badge.svelte";

   export let icon: IconifyProps["icon"] | undefined = undefined;
</script>

<Badge {icon} variant="ghost" color="primary" shape="round">
   <slot />
</Badge>
