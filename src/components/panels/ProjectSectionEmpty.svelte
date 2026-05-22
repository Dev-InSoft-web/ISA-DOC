<script lang="ts">
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";

	export let proyecto: "ClientesIS" | "PatyIA";
	export let title: string;
	export let subtitle: string = "";
	export let message: string = "";
	export let icon: string = "📄";

	$: finalMsg = message || `Esta sección aún no tiene contenido para ${proyecto}.`;
</script>

<ProjectSectionLayout {title} {subtitle} {proyecto}>
	<div class="empty">
		<div class="icon" aria-hidden="true">{icon}</div>
		<p class="msg">{finalMsg}</p>
	</div>
</ProjectSectionLayout>

<style>
	.empty {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 2rem;
		color: var(--is-color, #e5e7eb);
		opacity: 0.85;
		text-align: center;
	}
	.icon {
		font-size: 2.5rem;
		line-height: 1;
	}
	.msg {
		margin: 0;
		font-size: 0.9rem;
	}
</style>
