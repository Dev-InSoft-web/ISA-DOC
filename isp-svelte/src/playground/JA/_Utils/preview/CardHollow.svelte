<script lang="ts">
   import Card from "$lib/containers/Card.svelte";
</script>

<Card let:sizew variant="onion" relieve={(35 & 0x7f) | ((2 & 0xf) << 7) | ((0 & 0x7f) << 11)} {...$$restProps} style={`padding-bottom: 1rem; ${$$restProps.style || ""}`}>
   <slot {sizew} />
</Card>
