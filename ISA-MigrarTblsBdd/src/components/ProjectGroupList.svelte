<script lang="ts">
	import { Text, FlexLayout, GridLayout } from "@ingenieria_insoft/ispsveltecomponents";
	import Accordion from "./Accordion.svelte";
	import ProjectActionCard from "./ProjectActionCard.svelte";

	interface ProjectAction {
		id: string;
		label: string;
		type: string;
		command: string;
		cwd: string;
		needsPassword?: boolean;
		description?: string;
		longRunning?: boolean;
		hostPattern?: string;
		swaggerUrl?: string;
	}
	interface ProjectEntry {
		id: string;
		name: string;
		description: string;
		icon: string;
		cwd: string;
		actions: ProjectAction[];
	}

	export let projects: ProjectEntry[] = [];
	export let runningActions: Set<string> = new Set();
	export let outputs: Map<string, string> = new Map();
	export let hosts: Map<string, string> = new Map();
	export let openMap: Record<string, boolean> = {};
	export let onRun: (action: ProjectAction) => void;
	export let onStop: (actionId: string) => void;
	export let onRestart: (action: ProjectAction) => void;
</script>

{#if projects.length === 0}
	<Text color="neutral">Sin proyectos en este grupo.</Text>
{:else}
	<FlexLayout direction="column">
		{#each projects as project (project.id)}
			<Accordion
				title={project.name}
				titleIcon={project.icon}
				bind:open={openMap[project.id]}
				statusDots={project.actions.some((a) => runningActions.has(a.id)) ? ["success"] : []}
			>
				<Text color="neutral"><small>{project.cwd}</small></Text>
				<GridLayout cells="3" items="stretch">
					{#each project.actions as action (action.id)}
						<ProjectActionCard
							{action}
							running={runningActions.has(action.id)}
							host={hosts.get(action.id)}
							output={outputs.get(action.id)}
							onRun={() => onRun(action)}
							onStop={() => onStop(action.id)}
							onRestart={() => onRestart(action)}
						/>
					{/each}
				</GridLayout>
			</Accordion>
		{/each}
	</FlexLayout>
{/if}
