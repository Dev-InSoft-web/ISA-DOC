<script lang="ts">
   import ProjectPanelLayout from "../templates/ProjectPanelLayout.svelte";
   import ProjectEmptyState from "../templates/ProjectEmptyState.svelte";

   export let project: string;
   export let tab: string;
   export let subtitle: string = "";
   export let icon: string = "📄";
   export let message: string = "";

   $: finalMsg = message || `La pestaña ${tab} para ${project} aún no tiene contenido.`;
</script>

<ProjectPanelLayout title={`${project} · ${tab}`} subtitle={subtitle}>
   <ProjectEmptyState {project} {tab} message={finalMsg} {icon} />
</ProjectPanelLayout>
