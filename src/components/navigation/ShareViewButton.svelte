<script lang="ts">
	import CopyButtonIconify from "$comps/actions/CopyButtonIconify.svelte";

	type ShareState = Record<string, unknown> & { nonav?: boolean };

	const decodeState = (raw: string | null): ShareState => {
		if (!raw) return {};
		try {
			const value = JSON.parse(decodeURIComponent(escape(atob(raw))));
			return value && typeof value === "object" && !Array.isArray(value) ? value as ShareState : {};
		} catch {
			return {};
		}
	};

	const encodeState = (state: ShareState): string => btoa(unescape(encodeURIComponent(JSON.stringify(state))));

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