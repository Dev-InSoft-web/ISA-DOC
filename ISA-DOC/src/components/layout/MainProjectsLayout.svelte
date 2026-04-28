<script context="module" lang="ts">
	import { BlockLayout, FlexLayout, Tabs, type LayoutSlots } from "@ingenieria_insoft/ispsveltecomponents";
	import GridForm from "./GridForm.svelte";

	export interface MainProjectsLayoutSlots {
		fastdata: LayoutSlots["default"] & { small: boolean };
		default: LayoutSlots["default"] & { small: boolean };
	}
</script>

<script lang="ts">
	interface $$Slots extends MainProjectsLayoutSlots {}

	const self = {
		get class() { return $$restProps.class; },
		get style() { return ["padding: 0.5rem", $$restProps.style].filter(Boolean).join("; "); },
		get resume() { return { ...$$restProps, class: this.class, style: this.style }; },
	};
</script>

<FlexLayout {...self.resume} id="main-projects-root" direction="column" items="stretch">
	<div id="main-projects-header">
		<GridForm let:sizew let:boolszw let:small>
			<slot name="fastdata" {sizew} {boolszw} {small} />
		</GridForm>
	</div>

	<div id="main-projects-tabs-card">
		<BlockLayout id="main-projects-tabs-flex" let:sizew let:boolszw>
			<Tabs contentClass="main-projects-tabs-content custom-scrollbar">
				<slot {sizew} {boolszw} small={boolszw.sm} />
			</Tabs>
		</BlockLayout>
	</div>
</FlexLayout>

<style>
	#main-projects-header {
		flex-shrink: 0;
	}

	:global {
		#main-projects-root {
			height: 100%;
			min-height: 0;
			width: 100%;
			font-size: 0.875rem;
		}

		#main-projects-tabs-card {
			display: flex;
			flex-direction: column;
			min-height: 0;
			min-width: 0;
			flex: 1 1 0%;
			width: 100%;
		}

		#main-projects-tabs-flex {
			display: flex;
			flex-direction: column;
			min-height: 0;
			min-width: 0;
			flex: 1 1 0%;
			width: 100%;
			height: 100%;
		}

		.main-projects-tabs-content {
			display: flex;
			flex-direction: column;
			flex: 1 1 auto;
			height: 100%;
			margin-top: 0;
			background: transparent;
			box-shadow: none;
			min-height: 0;
			overflow: visible;
		}

		#main-projects-root .tabs-content.main-projects-tabs-content {
			padding: 0.5rem 0;
			min-height: 0;
		}

		#main-projects-root [role="tabpanel"].tabs-content {
			display: flex;
			flex-direction: column;
			flex: 1 1 auto;
			min-height: 0;
			height: 100%;
			overflow: visible;
		}
	}
</style>
