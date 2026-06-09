<script lang="ts">
	import DailySummaryAccordion from "./DailySummaryAccordion.svelte";
	import type { BitacoraBundle } from "../../lib/core/lab-api/bitacora.ts";

	export let bundle: BitacoraBundle;
	export let title: string;
	export let open = true;
	export let inner = false;
	export let segmentIds: {
		isa?: string;
		isp?: string;
		iswIsp?: string;
		iss?: string;
		seguimiento?: string;
	} = {};

	function md(id: string | undefined): string | undefined {
		if (!id) return undefined;
		return bundle.md[id]?.markdown;
	}
</script>

<DailySummaryAccordion
	{title}
	{open}
	{inner}
	mdIsa={md(segmentIds.isa)}
	mdIsp={md(segmentIds.isp)}
	mdIswIsp={md(segmentIds.iswIsp)}
	mdIss={md(segmentIds.iss)}
	mdSeguimiento={md(segmentIds.seguimiento)}
>
	<slot />
</DailySummaryAccordion>
