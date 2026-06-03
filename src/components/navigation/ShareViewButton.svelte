<script lang="ts">
	import CopyButtonIconify from "$comps/actions/CopyButtonIconify.svelte";
	import { decodeJsonState, encodeJsonState } from "../../lib/features/patyia/010-config/stateB64";

	type ShareState = Record<string, unknown> & { nonav?: boolean };

	const decodeState = (raw: string | null): ShareState => decodeJsonState(raw) as ShareState;

	const encodeState = (state: ShareState): string => encodeJsonState(state);

	function buildShareUrl(): string {
		const url = new URL(window.location.href);
		const state = decodeState(url.searchParams.get("state"));
		state.nonav = true;
		url.searchParams.set("state", encodeState(state));
		return url.toString();
	}
</script>

<CopyButtonIconify
	icon="mdi:share-variant-outline"
	successTitle="Enlace copiado"
	title="Compartir vista sin navegación"
	getText={buildShareUrl}
/>