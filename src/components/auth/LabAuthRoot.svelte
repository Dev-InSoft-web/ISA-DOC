<script lang="ts">
	import { onMount } from "svelte";
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import { hasValidLabSession } from "../../lib/core/lab-api/auth.ts";
	import { labApiEnabled } from "../../lib/core/lab-api/client.ts";
	import { labAuthModalOpen } from "../../lib/core/lab-api/lab-auth-session.ts";
	import LabAuthModal from "./LabAuthModal.svelte";

	onMount(() => {
		if (hasValidLabSession()) labAuthModalOpen.set(false);
	});
</script>

{#if labApiEnabled()}
	<Toaster />
	<LabAuthModal />
{/if}
