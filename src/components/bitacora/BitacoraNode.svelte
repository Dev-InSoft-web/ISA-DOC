<script lang="ts">
	import Self from "./BitacoraNode.svelte";
	import Accordion from "$comps/ui/containers/Accordion.svelte";
	import BitacoraNote from "./BitacoraNote.svelte";
	import SqlExecCard from "$comps/actions/SqlExecCard.svelte";
	import PatyPgPromptsSync from "./PatyPgPromptsSync.svelte";
	import Gpt5AdjuntosDiscovery from "./Gpt5AdjuntosDiscovery.svelte";
	import BitacoraStoreDailySummary from "./BitacoraStoreDailySummary.svelte";
	import JconfigDriverMatrix from "./JconfigDriverMatrix.svelte";
	import OldRebuildSection from "../migration/OldRebuildSection.svelte";
	import CleanupTestDataMigration from "../migration/CleanupTestDataMigration.svelte";
	import IplanpadreToAtributoMigration from "../migration/IplanpadreToAtributoMigration.svelte";
	import ImagenDocumentoDriverMigration from "../migration/ImagenDocumentoDriverMigration.svelte";
	import type { BitacoraBundle, BitacoraLayoutNode } from "../../lib/core/lab-api/bitacora.ts";

	export let node: BitacoraLayoutNode;
	export let bundle: BitacoraBundle;
	export let inner = false;
	export let executeSql: (
		sql: string,
		dbTarget?: "paty" | "clientesis",
	) => Promise<{ ok: boolean; output?: string; error?: string }>;

	function isContainer(n: BitacoraLayoutNode): n is Extract<BitacoraLayoutNode, { children: BitacoraLayoutNode[] }> {
		return n.type === "day" || n.type === "group" || n.type === "section";
	}
</script>

{#if isContainer(node)}
	<Accordion
		title={node.title}
		titleIcon={node.titleIcon ?? "mdi:calendar"}
		open={node.open ?? false}
		{inner}
		checkKey={node.checkKey}
		checkKeys={node.checkKeys}
	>
		{#each node.children as child (child)}
			<Self node={child} {bundle} inner executeSql={executeSql} />
		{/each}
	</Accordion>
{:else if node.type === "md"}
	{@const seg = bundle.md[node.segmentId]}
	{#if seg?.markdown}
		<BitacoraNote flat mdSource={seg.markdown} />
	{/if}
{:else if node.type === "sql"}
	{@const seg = bundle.sql[node.segmentId]}
	{#if seg}
		<SqlExecCard
			title={seg.title}
			sql={seg.sql}
			desc={seg.desc ?? ""}
			checkKey={node.checkKey ?? seg.checkKey}
			confirmKind={seg.confirmKind ?? "warning"}
			confirmMessage={seg.confirmMessage ?? ""}
			height={seg.height ?? "360px"}
			executeSql={(sql) => executeSql(sql, seg.dbTarget)}
		/>
	{/if}
{:else if node.type === "widget"}
	{#if node.widget === "PatyPgPromptsSync"}
		<PatyPgPromptsSync autoOnMount={Boolean(node.props?.autoOnMount)} />
	{:else if node.widget === "Gpt5AdjuntosDiscovery"}
		<Gpt5AdjuntosDiscovery />
	{:else if node.widget === "OldRebuildSection"}
		<OldRebuildSection {bundle} executeSql={(sql) => executeSql(sql, "clientesis")} />
	{:else if node.widget === "DailySummary"}
		<BitacoraStoreDailySummary
			{bundle}
			title={String(node.props?.title ?? "")}
			open={node.props?.open !== false}
			inner={Boolean(node.props?.inner)}
			segmentIds={(node.props?.segmentIds as Record<string, string>) ?? {}}
		/>
	{:else if node.widget === "JconfigDriverMatrix"}
		<JconfigDriverMatrix />
	{:else if node.widget === "CleanupTestDataMigration"}
		<CleanupTestDataMigration {bundle} executeSql={(sql) => executeSql(sql, "clientesis")} inner />
	{:else if node.widget === "IplanpadreToAtributoMigration"}
		<IplanpadreToAtributoMigration {bundle} executeSql={(sql) => executeSql(sql, "clientesis")} inner />
	{:else if node.widget === "ImagenDocumentoDriverMigration"}
		<ImagenDocumentoDriverMigration {bundle} executeSql={(sql) => executeSql(sql, "clientesis")} inner />
	{/if}
{/if}
