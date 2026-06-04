<script lang="ts">
	import { labApiEnabled } from "../../lib/core/lab-api/client.ts";
	import LabAuthModal from "./LabAuthModal.svelte";
</script>

{#if labApiEnabled()}
	<LabAuthModal />
{/if}
