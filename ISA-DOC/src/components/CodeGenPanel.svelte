<script lang="ts">
	import { onMount } from "svelte";
	import {
		Card, H2, H4, Text, Toaster, toastError, toastSuccess,
		FlexLayout, GridLayout, Iconify,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import {
		fetchAllOverrides, saveOverride, deleteOverride,
		mergeWithOverride, computeOverride,
		type OverrideMap,
	} from "../lib/codeGen/storage.js";
	import { generateAll, type GeneratedSnippet } from "../lib/codeGen/generators.js";
	import { fetchSqlFragments, parseAllTables, generateResourcesFromTables } from "../lib/codeGen/autogen.js";
	import type { RelationDef, RelationKind, ResourceConfig } from "../lib/codeGen/types.js";
	import AccordionActions from "./_comps/containers/AccordionActions.svelte";
	import FloatingCard from "./_comps/containers/FloatingCard.svelte";
	import Button_ from "./_comps/especial/Button_.svelte";
	import Switch_ from "./_comps/especial/_Switch.svelte";
	import TsViewer from "./TsViewer.svelte";
	import CodeModal from "./CodeModal.svelte";

	const REL_KINDS: RelationKind[] = ["1-1", "1-N"];
	const OMIT_OPS: string[] = ["Verificar", "Duplicar", "Recodificar", "Consolidar"];

	let inferredById: Record<string, ResourceConfig> = {};
	let overrides: OverrideMap = {};
	let resources: ResourceConfig[] = [];
	let selectedId: string = "";
	let current: ResourceConfig | null = null;
	let snippets: GeneratedSnippet[] = [];
	let dirty: boolean = false;
	let syncing: boolean = false;
	let loading: boolean = true;

	let codeModalShow: boolean = false;
	let codeModalTitle: string = "";
	let codeModalValue: string = "";

	onMount(() => { void initialLoad(); });

	async function initialLoad(): Promise<void> {
		loading = true;
		try {
			const [fragments, ovs] = await Promise.all([fetchSqlFragments(), fetchAllOverrides()]);
			const parsed = parseAllTables(fragments);
			const result = generateResourcesFromTables(parsed);
			inferredById = Object.fromEntries(result.resources.map((r) => [r.id, r]));
			overrides = ovs;
			rebuildResources();
			if (resources.length && !selectedId) selectedId = resources[0].id;
			selectInternal(selectedId);
			for (const w of result.warnings) toastError(w);
		} catch (err) {
			toastError(`Error cargando: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			loading = false;
		}
	}

	function rebuildResources(): void {
		resources = Object.values(inferredById).map((inf) => mergeWithOverride(inf, overrides[inf.id] ?? {}));
	}

	async function sync(): Promise<void> {
		if (syncing) return;
		syncing = true;
		try {
			const [fragments, ovs] = await Promise.all([fetchSqlFragments(), fetchAllOverrides()]);
			const parsed = parseAllTables(fragments);
			const result = generateResourcesFromTables(parsed);
			inferredById = Object.fromEntries(result.resources.map((r) => [r.id, r]));
			overrides = ovs;
			rebuildResources();
			if (!resources.find((r) => r.id === selectedId)) selectedId = resources[0]?.id ?? "";
			selectInternal(selectedId);
			for (const w of result.warnings) toastError(w);
			toastSuccess(`Sincronizado: ${resources.length} recursos.`);
		} catch (err) {
			toastError(`Error sincronizando: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			syncing = false;
		}
	}

	function selectInternal(id: string): void {
		selectedId = id;
		current = id ? (resources.find((r) => r.id === id) ?? null) : null;
		dirty = false;
		regenerate();
	}

	function select(id: string): void {
		if (dirty && current && !confirm(`Hay cambios sin guardar en "${current.id}". ¿Descartar?`)) return;
		selectInternal(id);
	}

	function regenerate(): void {
		if (!current) { snippets = []; return; }
		snippets = generateAll(current, resources);
	}

	function markDirty(): void { dirty = true; regenerate(); }

	async function save(): Promise<void> {
		if (!current) return;
		const inferred = inferredById[current.id];
		if (!inferred) { toastError("No hay tabla inferida para este recurso."); return; }
		try {
			const ov = computeOverride(current, inferred);
			if (Object.keys(ov).length === 0) {
				await deleteOverride(current.id);
				delete overrides[current.id];
				overrides = { ...overrides };
				toastSuccess(`"${current.id}" sin personalización (eliminada).`);
			} else {
				await saveOverride(current.id, ov);
				overrides = { ...overrides, [current.id]: ov };
				toastSuccess(`"${current.id}" guardado.`);
			}
			rebuildResources();
			dirty = false;
		} catch (err) {
			toastError(`Error guardando: ${err instanceof Error ? err.message : String(err)}`);
		}
	}

	async function resetCustom(): Promise<void> {
		if (!current) return;
		if (!confirm(`Restaurar "${current.id}" a los valores inferidos de la tabla?`)) return;
		try {
			await deleteOverride(current.id);
			delete overrides[current.id];
			overrides = { ...overrides };
			rebuildResources();
			selectInternal(current.id);
			toastSuccess(`"${current.id}" restaurado.`);
		} catch (err) {
			toastError(`Error: ${err instanceof Error ? err.message : String(err)}`);
		}
	}

	function addRelation(): void {
		if (!current) return;
		const target = resources.find((r) => r.id !== current!.id)?.id ?? "";
		current.relations = [
			...current.relations,
			{ alias: "rel", kind: "1-N", target, compareOn: [], insertEffect: "ignore" },
		];
		markDirty();
	}
	function removeRelation(i: number): void {
		if (!current) return;
		current.relations = current.relations.filter((_, k) => k !== i);
		markDirty();
	}
	function toggleCompareCol(rel: RelationDef, col: string, on: boolean): void {
		const u = col.toUpperCase();
		const set = new Set(rel.compareOn);
		if (on) set.add(u); else set.delete(u);
		rel.compareOn = [...set];
		markDirty();
	}
	function relTargetColumns(rel: RelationDef): string[] {
		const tgt = resources.find((r) => r.id === rel.target);
		if (!tgt) return [];
		return tgt.fields.map((f) => (f.column ?? f.name).toUpperCase());
	}

	function toggleOmitOp(op: string, on: boolean): void {
		if (!current) return;
		const set = new Set(current.omitOps ?? []);
		if (on) set.add(op); else set.delete(op);
		current.omitOps = [...set];
		markDirty();
	}

	function addHook(): void {
		if (!current) return;
		current.customHooks = [
			...current.customHooks,
			{ name: "Custom_Action", signature: "(o: " + current.className + "): Promise<void>", clientPath: "/api/" + current.singularApi + "/custom/{ipk}", clientMethod: "GET", clientFnName: "customAction" },
		];
		markDirty();
	}
	function removeHook(i: number): void {
		if (!current) return;
		current.customHooks = current.customHooks.filter((_, k) => k !== i);
		markDirty();
	}

	async function copyText(text: string): Promise<void> {
		try { await navigator.clipboard.writeText(text); toastSuccess("Copiado."); }
		catch { toastError("No se pudo copiar."); }
	}
	function downloadText(name: string, body: string): void {
		const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url; a.download = name; a.click();
		URL.revokeObjectURL(url);
	}
	function openCodeModal(title: string, body: string): void {
		codeModalTitle = title;
		codeModalValue = body;
		codeModalShow = true;
	}

	$: hasOverride = current ? Boolean(overrides[current.id]) : false;
</script>

<Toaster />

<section class="codegen">
	<Card>
		<FlexLayout items="center" justify="between">
			<div>
				<H2>Generador de objetos y controladores</H2>
				<Text color="neutral"><small>Sincronizado con las tablas SQL. Los valores por defecto se infieren de la tabla; sólo se persiste lo personalizado (JSON por recurso en <code>public/codegen/</code>).</small></Text>
			</div>
			<FlexLayout items="center">
				<Button_ color="primary" loading={syncing} disabled={syncing || loading} onClick={sync}>
					<Iconify icon="mdi:sync" /> Sincronizar
				</Button_>
			</FlexLayout>
		</FlexLayout>
	</Card>

	<GridLayout cells="15fr 30fr 55fr" items="start">
		<Card class="col-resources">
			<div class="resources-sticky">
			<H4>Recursos</H4>
			{#if loading}
				<Text color="neutral"><small>Cargando…</small></Text>
			{:else if resources.length === 0}
				<Text color="neutral"><small>Sin tablas. Sincroniza para inferir desde el SQL.</small></Text>
			{/if}
			<FlexLayout direction="column">
				{#each resources as r (r.id)}
					<button class="resource-item" class:active={r.id === selectedId} on:click={() => select(r.id)}>
						<Iconify icon="mdi:cube-outline" />
						<span class="resource-name">{r.id}</span>
						{#if overrides[r.id]}<Iconify icon="mdi:pencil" title="Personalizado" />{/if}
						<small>{r.fields.length}f · {r.relations.length}r</small>
					</button>
				{/each}
			</FlexLayout>
			</div>
		</Card>

		<div class="config-cell col-config">
			{#if !current}
				<Card><Text color="neutral">Selecciona un recurso.</Text></Card>
			{:else}
					<Card>
					<FlexLayout items="center" justify="between">
						<H4>{current.id} · personalización</H4>
						<FlexLayout items="center">
							<Button_ color="primary" disabled={!dirty} onClick={save}>
								<Iconify icon="mdi:content-save" /> Guardar
							</Button_>
							<Button_ color="warning" variant="ghost" disabled={!hasOverride} onClick={resetCustom} title="Restaurar a valores inferidos">
								<Iconify icon="mdi:restore" /> Restaurar
							</Button_>
						</FlexLayout>
					</FlexLayout>

					<div class="two-cols">
						<label class="field"><Text color="neutral"><small>Clase TS</small></Text>
							<input class="input-field" bind:value={current.className} on:input={markDirty} /></label>
						<label class="field"><Text color="neutral"><small>Tabla SQL (solo lectura)</small></Text>
							<input class="input-field" value={current.tableName} readonly /></label>
						<label class="field"><Text color="neutral"><small>Const tabla (opcional)</small></Text>
							<input class="input-field" value={current.tableConst ?? ""} on:input={(e) => { current!.tableConst = (e.target as HTMLInputElement).value || undefined; markDirty(); }} /></label>
						<label class="field"><Text color="neutral"><small>isysRecurso</small></Text>
							<input class="input-field" bind:value={current.isysRecurso} on:input={markDirty} /></label>
						<label class="field"><Text color="neutral"><small>API singular</small></Text>
							<input class="input-field" bind:value={current.singularApi} on:input={markDirty} /></label>
						<label class="field"><Text color="neutral"><small>API plural</small></Text>
							<input class="input-field" bind:value={current.pluralApi} on:input={markDirty} /></label>
						<label class="field"><Text color="neutral"><small>Caption singular</small></Text>
							<input class="input-field" bind:value={current.singularCaption} on:input={markDirty} /></label>
						<label class="field"><Text color="neutral"><small>Caption plural</small></Text>
							<input class="input-field" bind:value={current.pluralCaption} on:input={markDirty} /></label>
						<label class="field"><Text color="neutral"><small>Server base class</small></Text>
							<input class="input-field" bind:value={current.parentBaseClass} on:input={markDirty} /></label>
						<label class="field"><Text color="neutral"><small>Client base class</small></Text>
							<input class="input-field" bind:value={current.clientBaseClass} on:input={markDirty} /></label>
					</div>
				</Card>

				<Card>
					<H4>Columnas (inferidas, sólo lectura)</H4>
					<Text color="neutral"><small>Las columnas y sus tipos se sincronizan desde la definición SQL. Para editar nomenclaturas, edita la tabla en la pestaña <strong>Tablas</strong>.</small></Text>
					<div class="cols-list">
						{#each current.fields as f (f.name)}
							<div class="col-row">
								<span class="col-name">{f.name}</span>
								<span class="col-type">{f.type}</span>
								{#if f.pk}<span class="badge pk">PK</span>{/if}
								{#if f.fk}<span class="badge fk">FK→{f.fk}</span>{/if}
								{#if f.required}<span class="badge req">req</span>{/if}
							</div>
						{/each}
					</div>
				</Card>

				<Card>
					<FlexLayout items="center" justify="between">
						<H4>Relaciones (conceptuales)</H4>
						<Button_ variant="outlined" onClick={addRelation}><Iconify icon="mdi:plus" /> Añadir</Button_>
					</FlexLayout>
					{#if current.relations.length === 0}
						<Text color="neutral"><small>Sin relaciones. Añade para generar nestedConfig().</small></Text>
					{/if}
					{#each current.relations as r, i}
						<div class="rel">
							<div class="row">
								<input class="input-field" placeholder="alias" bind:value={r.alias} on:input={markDirty} />
								<select class="input-field" bind:value={r.kind} on:change={markDirty}>
									{#each REL_KINDS as k}<option value={k}>{k}</option>{/each}
								</select>
								<select class="input-field" bind:value={r.target} on:change={markDirty}>
									<option value="">— recurso destino —</option>
									{#each resources as o (o.id)}
										{#if o.id !== current.id}<option value={o.id}>{o.id}</option>{/if}
									{/each}
								</select>
								<Button_ color="danger" variant="ghost" onClick={() => removeRelation(i)} title="Eliminar"><Iconify icon="mdi:close" /></Button_>
							</div>
							<div class="row">
								<div class="field flex-1">
									<Text color="neutral"><small>Columnas comparación</small></Text>
									<div class="col-checks">
										{#each relTargetColumns(r) as col (col)}
											<label class="col-check">
												<input
													type="checkbox"
													checked={r.compareOn.includes(col)}
													on:change={(e) => toggleCompareCol(r, col, (e.target as HTMLInputElement).checked)}
												/>
												<span>{col}</span>
											</label>
										{:else}
											<Text color="neutral"><small>(selecciona un recurso destino)</small></Text>
										{/each}
									</div>
								</div>
								<div class="field">
									<Text color="neutral"><small>Insert</small></Text>
										<Switch_
											label="syncDetails"
											checked={r.insertEffect === "syncDetails"}
											on:change={(e) => { r.insertEffect = ((e.target as HTMLInputElement).checked ? "syncDetails" : "ignore"); markDirty(); }}
										/>
								</div>
							</div>
						</div>
					{/each}
				</Card>

				<Card>
					<FlexLayout items="center" justify="between">
						<H4>Hooks personalizados</H4>
						<Button_ variant="outlined" onClick={addHook}><Iconify icon="mdi:plus" /> Añadir</Button_>
					</FlexLayout>
					{#if current.customHooks.length === 0}
						<Text color="neutral"><small>Sin hooks. Ej: <code>Get_Recurso_PlanCurso</code>.</small></Text>
					{/if}
					{#each current.customHooks as h, i}
						<FloatingCard variant="flat" horizontal="right" vertical="top" class="rel-fc" style="padding: 0; margin: 0.35rem 0;">
							<div class="rel">
								<div class="row">
									<input class="input-field" placeholder="nombre Server" bind:value={h.name} on:input={markDirty} />
									<input class="input-field" placeholder="signature" bind:value={h.signature} on:input={markDirty} />
								</div>
								<div class="row">
									<select class="input-field" bind:value={h.clientMethod} on:change={markDirty}>
										<option value="GET">GET</option><option value="POST">POST</option>
										<option value="PUT">PUT</option><option value="DELETE">DELETE</option>
									</select>
									<input class="input-field flex-1" placeholder="path API" bind:value={h.clientPath} on:input={markDirty} />
									<input class="input-field" placeholder="fn cliente" bind:value={h.clientFnName} on:input={markDirty} />
								</div>
							</div>
							<div slot="float" style="padding: 0;">
								<Button_ color="danger" variant="ghost" onClick={() => removeHook(i)} title="Eliminar"><Iconify icon="mdi:close" /></Button_>
							</div>
						</FloatingCard>
					{/each}
				</Card>

				<Card>
					<H4>FN-Módulo</H4>
					<FlexLayout items="center">
						<Switch_
							label="Exponer driver en FN-Módulo"
							checked={current.exposeInFn !== false}
							on:change={(e) => { current!.exposeInFn = (e.target as HTMLInputElement).checked; markDirty(); }}
						/>
					</FlexLayout>
					<Text color="neutral"><small>Acciones a omitir en <code>registerCatalogoGenAzureFunction</code>:</small></Text>
					<div class="col-checks">
						{#each OMIT_OPS as op (op)}
							<label class="col-check">
								<input
									type="checkbox"
									checked={(current.omitOps ?? []).includes(op)}
									on:change={(e) => toggleOmitOp(op, (e.target as HTMLInputElement).checked)}
								/>
								<span>{op}</span>
							</label>
						{/each}
					</div>
				</Card>
			{/if}
		</div>

		<div class="snippets-cell col-snippets">
			<Card>
				<H4>Snippets generados</H4>
				{#if !current}
					<Text color="neutral"><small>—</small></Text>
				{:else}
					{@const groups = [
						{ id: "obj", title: "Objetos",                  icon: "mdi:cube-outline", ids: ["modelo", "datos"] },
						{ id: "srv", title: "Controladores · Server",   icon: "mdi:server",       ids: ["server"] },
						{ id: "cli", title: "Controladores · Cliente",  icon: "mdi:web",          ids: ["client"] },
						{ id: "acc", title: "Controladores · Acciones", icon: "mdi:flash",        ids: ["webctrl", "azurefn"] },
					]}
					<FlexLayout direction="column">
						{#each groups as g (g.id)}
							{@const items = snippets.filter((s) => g.ids.includes(s.id))}
										<AccordionActions
								title={g.title}
								icon={g.icon}
								count={items.length}
								open={true}
							>
								{#each items as s (s.id)}
									<Card variant="flat">
										<FlexLayout items="center" justify="between">
											<div>
												<Text><strong>{s.label}</strong></Text>
												<Text color="neutral"><small><code>{s.filename}</code> · {s.body.length} chars</small></Text>
											</div>
											<FlexLayout items="center">
												<Button_ variant="outlined" onClick={() => openCodeModal(s.label, s.body)} title="Abrir en modal"><Iconify icon="mdi:fullscreen" /></Button_>
												<Button_ variant="outlined" onClick={() => copyText(s.body)} title="Copiar"><Iconify icon="mdi:content-copy" /></Button_>
												<Button_ variant="outlined" onClick={() => downloadText(s.filename, s.body)} title="Descargar"><Iconify icon="mdi:download" /></Button_>
											</FlexLayout>
										</FlexLayout>
										<TsViewer value={s.body} height="300px" />
									</Card>
								{/each}
							</AccordionActions>
						{/each}
					</FlexLayout>
				{/if}
			</Card>
		</div>
	</GridLayout>
</section>

<CodeModal bind:bshow={codeModalShow} title={codeModalTitle} value={codeModalValue} language="ts" />

<style>
	.codegen { display: flex; flex-direction: column; gap: 0.75rem; }
	.col-resources, .col-config, .col-snippets { min-width: 0; }
	:global(.col-resources) { position: sticky; top: 0.5rem; align-self: start; max-height: calc(100dvh - 1rem); overflow: auto; }
	.resources-sticky { display: contents; }
	.config-cell, .snippets-cell { display: flex; flex-direction: column; gap: 0.75rem; }
	.two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
	.field { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
	.input-field {
		width: 100%; height: fit-content; padding: 0.2rem 0.45rem; border-radius: 4px;
		border: 1px solid var(--is-b-color, #444); background: var(--is-bg-readonly, #1e1e1e);
		color: var(--is-color, #ddd); font-family: ui-monospace, Menlo, monospace;
		font-size: 0.8rem; line-height: 1.3;
	}
	.input-field[readonly] { opacity: 0.7; cursor: not-allowed; }
	.row { display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap; margin: 0.35rem 0; }
	.row .input-field { flex: 1 1 110px; min-width: 80px; }
	.flex-1 { flex: 1 1 auto; }
	.rel { padding: 0.4rem 2rem 0.4rem 0.4rem; border: 1px dashed var(--is-b-color, #555); border-radius: 4px; }
	.col-checks {
		display: flex; flex-wrap: wrap; gap: 0.25rem 0.6rem;
		padding: 0.25rem 0.45rem;
		border: 1px solid var(--is-b-color, #444); border-radius: 4px;
		background: var(--is-bg-readonly, #1e1e1e);
	}
	.col-check {
		display: inline-flex; align-items: center; gap: 0.25rem;
		font-family: ui-monospace, Menlo, monospace; font-size: 0.75rem;
		cursor: pointer;
	}
	.cols-list { display: flex; flex-direction: column; gap: 0.2rem; margin-top: 0.35rem; }
	.col-row {
		display: flex; align-items: center; gap: 0.5rem;
		padding: 0.25rem 0.45rem; border-radius: 4px;
		background: var(--is-bg-readonly, #001327);
		font-family: ui-monospace, Menlo, monospace; font-size: 0.8rem;
	}
	.col-name { font-weight: 600; min-width: 8rem; }
	.col-type { color: color-mix(in srgb, var(--is-primary) 65%, var(--is-color)); }
	.badge {
		font-size: 0.65rem; padding: 0.05rem 0.4rem; border-radius: 999px;
		text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;
	}
	.badge.pk { background: rgba(220, 220, 170, 0.18); color: #dcdcaa; }
	.badge.fk { background: rgba(78, 201, 176, 0.18); color: #4ec9b0; }
	.badge.req { background: rgba(255, 99, 132, 0.18); color: #ff6384; }
	.resource-item {
		display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.55rem;
		text-align: left; border: 1px solid transparent; border-radius: 4px; background: transparent;
		color: inherit; cursor: pointer; width: 100%;
	}
	.resource-item:hover { background: var(--is-bg-secondary, #2a2a2a); }
	.resource-item.active { border-color: var(--is-primary, #4ea1ff); background: var(--is-bg-secondary, #2a2a2a); }
	.resource-name { flex: 1; font-weight: 600; }
</style>
