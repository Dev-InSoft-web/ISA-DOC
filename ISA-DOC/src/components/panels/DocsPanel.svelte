<script lang="ts">
	import {
		Card,
		Button,
		H4,
		Text,
		Tabs,
		TabItem,
		FlexLayout,
		GridLayout,
		Iconify,
		Modal,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import { getDocsForProject, type DocCategory, type DocItem } from "../../lib/docs-registry";

	export let projectKey: string;

	$: categories = getDocsForProject(projectKey) as DocCategory[];

	let showImage = false;
	let zoomItem: DocItem | null = null;

	function openImage(item: DocItem): void {
		zoomItem = item;
		showImage = true;
	}

	function closeImage(): void {
		showImage = false;
		zoomItem = null;
	}

	function isImage(item: DocItem): boolean {
		return item.kind === "image";
	}

	function basename(src: string): string {
		const parts = src.split("/");
		return parts[parts.length - 1] ?? src;
	}
</script>

{#if categories.length === 0}
	<Card variant="flat">
		<FlexLayout items="center" gap="0.5rem">
			<Iconify icon="mdi:file-document-outline" />
			<Text color="neutral">AÃºn no hay documentaciÃ³n registrada para este proyecto.</Text>
		</FlexLayout>
	</Card>
{:else}
	<Tabs>
		{#each categories as cat, ci (cat.key)}
			<TabItem title={cat.label} open={ci === 0}>
				<div class="docs-tab">
					<GridLayout cells="2" items="stretch">
						{#each cat.items as item (item.src)}
							<Card>
								<FlexLayout direction="column" gap="0.5rem">
									<FlexLayout items="center" gap="0.4rem">
										<Iconify icon={isImage(item) ? "mdi:image-outline" : "mdi:file-download-outline"} />
										<H4>{item.title}</H4>
									</FlexLayout>

									{#if item.description}
										<Text color="neutral">{item.description}</Text>
									{/if}

									{#if isImage(item)}
										<button class="thumb-btn" type="button" on:click={() => openImage(item)} aria-label={`Abrir ${item.title}`}>
											<img src={item.src} alt={item.title} class="thumb" loading="lazy" />
										</button>
									{:else}
										<FlexLayout items="center" gap="0.4rem">
											<Iconify icon="mdi:paperclip" />
											<Text color="neutral"><small>{basename(item.src)}</small></Text>
										</FlexLayout>
									{/if}

									<FlexLayout justify="end" gap="0.4rem">
										<Button variant="ghost" onClick={() => window.open(item.src, "_blank")}>
											<Iconify icon="mdi:open-in-new" />
											<span>Abrir</span>
										</Button>
										<Button variant="outlined">
											<a href={item.src} download class="dl-link">
												<Iconify icon="mdi:download" />
												<span>Descargar</span>
											</a>
										</Button>
									</FlexLayout>
								</FlexLayout>
							</Card>
						{/each}
					</GridLayout>
				</div>
			</TabItem>
		{/each}
	</Tabs>
{/if}

<Modal bind:bshow={showImage} onClose={closeImage} style="width: 95dvw; height: 90dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center" gap="0.4rem">
			<Iconify icon="mdi:image-outline" />
			<Text><strong>{zoomItem?.title ?? ""}</strong></Text>
			<span style="flex: 1;"></span>
			{#if zoomItem}
				<Button variant="ghost" onClick={() => window.open(zoomItem!.src, "_blank")}>
					<Iconify icon="mdi:open-in-new" /> <span>PestaÃ±a nueva</span>
				</Button>
			{/if}
		</FlexLayout>
	</svelte:fragment>

	{#if zoomItem}
		<div class="zoom-wrap">
			<img src={zoomItem.src} alt={zoomItem.title} class="zoom-img" />
			{#if zoomItem.description}
				<Text color="neutral">{zoomItem.description}</Text>
			{/if}
		</div>
	{/if}
</Modal>

<style>
	.docs-tab {
		padding: 0.5rem;
	}

	.thumb-btn {
		all: unset;
		cursor: zoom-in;
		display: block;
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid var(--is-b-color);
		background: var(--is-bg-secondary);
	}

	.thumb-btn:focus-visible {
		outline: 2px solid var(--is-primary);
		outline-offset: 2px;
	}

	.thumb {
		width: 100%;
		height: auto;
		max-height: 280px;
		object-fit: contain;
		display: block;
	}

	.dl-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		color: inherit;
		text-decoration: none;
	}

	.zoom-wrap {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 100%;
		overflow: auto;
	}

	.zoom-img {
		max-width: 100%;
		height: auto;
		display: block;
		margin: 0 auto;
	}
</style>
