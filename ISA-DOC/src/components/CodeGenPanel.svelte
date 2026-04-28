<script lang="ts">
	import { onMount } from "svelte";
	import {
		Card, H2, H4, Text, Toaster, toastError, toastSuccess,
		FlexLayout, GridLayout, Iconify, Modal, ButtonIconify,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import {
		fetchAllOverrides, saveOverride, deleteOverride,
		mergeWithOverride, computeOverride,
		type OverrideMap,
	} from "../lib/codeGen/storage.js";
	import { generateAll, defaultFilename, type GeneratedSnippet } from "../lib/codeGen/generators.js";
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

	let exposeOn: boolean = true;
	let exposeOnPrev: boolean = true;
	$: if (current && exposeOn !== exposeOnPrev) {
		current.exposeInFn = exposeOn ? undefined : false;
		exposeOnPrev = exposeOn;
		markDirty();
	}

	const PATHS_LS_KEY = "isa-doc:codegen:targetFilePaths";
	let targetFilePaths: string[] = [];
	let pathModalShow: boolean = false;
	let pathModalMode: "add" | "edit" = "add";
	let pathModalValue: string = "";
	let pathModalIndex: number = -1;

	const DEFAULT_TARGET_PATHS: string[] = [
		"ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/02.Cursos/01.Modelo.ts",
		"ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/02.Cursos/02.Datos.ts",
		"ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/01.PlanDeEstudio.ts",
		"ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/130_UlTema.ts",
		"ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/150_UlPermiso.ts",
		"ISP-ClientesIS/src/sources/020 Controllers/6.ContaPymeU/2.Capacitacion/UlCapacitacionClient.ts",
		"ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/01_PlanDeEstudio.ts",
		"ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/02_Cursos.ts",
		"ISW-ClientesIS/src/lib/ContaPymeU/2.Capacitacion/Cursos.ts",
		"ISW-ClientesIS/src/lib/ContaPymeU/2.Capacitacion/PlanDeEstudio.ts",
	];

	function loadTargetFilePaths(): void {
		try {
			const raw = localStorage.getItem(PATHS_LS_KEY);
			if (raw === null) {
				targetFilePaths = [...DEFAULT_TARGET_PATHS];
				persistTargetFilePaths();
				return;
			}
			const arr = JSON.parse(raw);
			targetFilePaths = Array.isArray(arr) ? arr.filter((s): s is string => typeof s === "string") : [];
		} catch {
			targetFilePaths = [];
		}
	}
	function persistTargetFilePaths(): void {
		localStorage.setItem(PATHS_LS_KEY, JSON.stringify(targetFilePaths));
	}
	function basename(p: string): string {
		const s = p.replace(/\\/g, "/");
		const i = s.lastIndexOf("/");
		return i >= 0 ? s.slice(i + 1) : s;
	}
	function openAddPath(): void {
		pathModalMode = "add";
		pathModalValue = "";
		pathModalIndex = -1;
		pathModalShow = true;
	}
	function openEditPath(idx: number): void {
		pathModalMode = "edit";
		pathModalIndex = idx;
		pathModalValue = targetFilePaths[idx] ?? "";
		pathModalShow = true;
	}
	function savePathModal(): void {
		const v = pathModalValue.trim();
		if (!v) { toastError("Ruta vacía."); return; }
		if (pathModalMode === "add") {
			if (targetFilePaths.includes(v)) { toastError("Ya existe esa ruta."); return; }
			targetFilePaths = [...targetFilePaths, v];
		} else {
			const dup = targetFilePaths.findIndex((p, i) => p === v && i !== pathModalIndex);
			if (dup >= 0) { toastError("Ya existe esa ruta."); return; }
			const arr = [...targetFilePaths];
			arr[pathModalIndex] = v;
			targetFilePaths = arr;
		}
		persistTargetFilePaths();
		pathModalShow = false;
		toastSuccess("Ruta guardada.");
	}
	function removePathModal(): void {
		if (pathModalMode !== "edit" || pathModalIndex < 0) return;
		targetFilePaths = targetFilePaths.filter((_, i) => i !== pathModalIndex);
		persistTargetFilePaths();
		pathModalShow = false;
		toastSuccess("Ruta eliminada.");
	}

	onMount(() => { loadTargetFilePaths(); void initialLoad(); });

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
		exposeOn = current ? current.exposeInFn !== false : true;
		exposeOnPrev = exposeOn;
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

	function markDirty(): void {
		dirty = true;
		if (current) current = current; // fuerza reactividad tras mutaciones profundas
		regenerate();
	}

	function setTargetFile(kind: "modelo" | "datos" | "server" | "client" | "webctrl" | "azurefn", value: string): void {
		if (!current) return;
		const tf = { ...(current.targetFiles ?? {}) };
		const v = value.trim();
		if (v) tf[kind] = v; else delete tf[kind];
		current.targetFiles = Object.keys(tf).length ? tf : undefined;
		markDirty();
	}

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
			{ alias: "rel", kind: "1-N", target, versus: [], equals: [], insertEffect: "ignore" },
		];
		markDirty();
	}
	function removeRelation(i: number): void {
		if (!current) return;
		current.relations = current.relations.filter((_, k) => k !== i);
		markDirty();
	}
	function addVersus(rel: RelationDef): void {
		const subCol = relTargetColumns(rel)[0] ?? "";
		const parentCol = currentColumns()[0] ?? "";
		rel.versus = [...(rel.versus ?? []), { sub: subCol, parent: parentCol }];
		markDirty();
	}
	function removeVersus(rel: RelationDef, idx: number): void {
		rel.versus = (rel.versus ?? []).filter((_, k) => k !== idx);
		markDirty();
	}
	function addEqual(rel: RelationDef): void {
		const tgtCols = relTargetColumns(rel);
		const col = tgtCols[0] ?? "";
		const type = relTargetFieldType(rel, col);
		rel.equals = [...(rel.equals ?? []), { col, value: type === "bool" ? "1" : type === "number" ? "0" : "", type }];
		markDirty();
	}
	function removeEqual(rel: RelationDef, idx: number): void {
		rel.equals = (rel.equals ?? []).filter((_, k) => k !== idx);
		markDirty();
	}
	function onEqualColChange(rel: RelationDef, idx: number, col: string): void {
		const e = rel.equals[idx];
		e.col = col;
		const t = relTargetFieldType(rel, col);
		if (t !== e.type) {
			e.type = t;
			e.value = t === "bool" ? "1" : t === "number" ? "0" : "";
		}
		markDirty();
	}
	function relTargetColumns(rel: RelationDef): string[] {
		const tgt = resources.find((r) => r.id === rel.target);
		if (!tgt) return [];
		return tgt.fields.map((f) => (f.column ?? f.name).toUpperCase());
	}
	function currentColumns(): string[] {
		if (!current) return [];
		return current.fields.map((f) => (f.column ?? f.name).toUpperCase());
	}
	function relTargetFieldType(rel: RelationDef, col: string): "bool" | "number" | "string" {
		const tgt = resources.find((r) => r.id === rel.target);
		const f = tgt?.fields.find((x) => (x.column ?? x.name).toUpperCase() === col.toUpperCase());
		if (!f) return "string";
		if (f.type === "bool") return "bool";
		if (f.type === "number") return "number";
		return "string";
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

	<Card>
		<FlexLayout items="center" justify="between">
			<div>
				<H4>Archivos destino</H4>
				<Text color="neutral"><small>Rutas relativas (compartibles entre recursos). En cada fragmento sólo se podrá elegir entre estos archivos. Clic en un chip para editar.</small></Text>
			</div>
			<Button_ variant="outlined" onClick={openAddPath}><Iconify icon="mdi:plus" /> Añadir archivo</Button_>
		</FlexLayout>
		{#if targetFilePaths.length === 0}
			<Text color="neutral"><small>Sin archivos definidos.</small></Text>
		{:else}
			<div class="chips">
				{#each targetFilePaths as p, i (p)}
					<button class="chip" type="button" on:click={() => openEditPath(i)} title={p}>
						<Iconify icon="mdi:file-document-outline" />
						<span>{basename(p)}</span>
					</button>
				{/each}
			</div>
		{/if}
	</Card>

	<GridLayout cells="30fr 30fr 50fr" items="start">
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
						<FloatingCard variant="flat" horizontal="right" vertical="top" class="rel-fc" style="padding: 0; margin: 0.35rem 0;">
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
								</div>

								<div class="sub">
									<FlexLayout items="center" justify="between">
										<Text><small><strong>Versus</strong> — <code>sub.col</code> = <code>parent.col</code></small></Text>
										<Button_ variant="outlined" onClick={() => addVersus(r)}><Iconify icon="mdi:plus" /> Versus</Button_>
									</FlexLayout>
									{#each (r.versus ?? []) as v, vi}
										<div class="row">
											<select class="input-field" bind:value={v.sub} on:change={markDirty}>
												{#each relTargetColumns(r) as c (c)}<option value={c}>sub.{c}</option>{/each}
											</select>
											<span class="vs-eq">=</span>
											<select class="input-field" bind:value={v.parent} on:change={markDirty}>
												{#each currentColumns() as c (c)}<option value={c}>parent.{c}</option>{/each}
											</select>
											<ButtonIconify color="danger" icon="mdi:close" onClick={() => removeVersus(r, vi)} title="Eliminar" />
										</div>
									{:else}
										<Text color="neutral"><small>Sin pares versus.</small></Text>
									{/each}
								</div>

								<div class="sub">
									<FlexLayout items="center" justify="between">
										<Text><small><strong>Equals</strong> — <code>sub.col = valor</code></small></Text>
										<Button_ variant="outlined" onClick={() => addEqual(r)}><Iconify icon="mdi:plus" /> Equal</Button_>
									</FlexLayout>
									{#each (r.equals ?? []) as eq, ei}
										<div class="row">
											<select class="input-field" value={eq.col} on:change={(e) => onEqualColChange(r, ei, (e.target as HTMLSelectElement).value)}>
												{#each relTargetColumns(r) as c (c)}<option value={c}>sub.{c}</option>{/each}
											</select>
											<span class="vs-eq">=</span>
											<select class="input-field input-type" bind:value={eq.type} on:change={markDirty}>
												<option value="bool">bool</option>
												<option value="number">number</option>
												<option value="string">string</option>
											</select>
											{#if eq.type === "bool"}
												<select class="input-field" bind:value={eq.value} on:change={markDirty}>
													<option value="1">true (1)</option>
													<option value="0">false (0)</option>
												</select>
											{:else if eq.type === "number"}
												<input class="input-field" type="number" bind:value={eq.value} on:input={markDirty} />
											{:else}
												<input class="input-field" type="text" placeholder="valor" bind:value={eq.value} on:input={markDirty} />
											{/if}
											<ButtonIconify color="danger" icon="mdi:close" onClick={() => removeEqual(r, ei)} title="Eliminar" />
										</div>
									{:else}
										<Text color="neutral"><small>Sin equals.</small></Text>
									{/each}
								</div>

								<div class="sub">
									<Text><small><strong>WHERE custom</strong> — cuerpo de <code>(sub, parent) =&gt; ...</code></small></Text>
									<textarea
										class="input-field code-area"
										rows="2"
										placeholder={'(parent.startsWith(pivot) ? `${sub}.IPLAN=${parent}.IPLANESTUDIO` : "")'}
										value={r.customWhere ?? ""}
										on:input={(e) => { r.customWhere = (e.target as HTMLTextAreaElement).value || undefined; markDirty(); }}
									></textarea>
								</div>

								<div class="row">
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
							<div slot="float" style="padding: 0;">
								<ButtonIconify color="danger" icon="mdi:close" onClick={() => removeRelation(i)} title="Eliminar" />
							</div>
						</FloatingCard>
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
								<ButtonIconify color="danger" icon="mdi:close" onClick={() => removeHook(i)} title="Eliminar" />
							</div>
						</FloatingCard>
					{/each}
				</Card>

				<Card>
					<H4>FN-Módulo</H4>
					<FlexLayout items="center">
						<Switch_
							label="Exponer driver en FN-Módulo"
							bind:checked={exposeOn}
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

				<Card>
					<H4>OrderBy</H4>
					<Text color="neutral"><small>Cuerpo de <code>getOrderBy(Alias: string): string</code>. Recibe el alias SQL del recurso (ej: <code>SUB_TABLA_A</code>) y debe retornar la lista de columnas/expresiones para el <code>ORDER BY</code>.</small></Text>
					<textarea
						class="input-field code-area"
						rows="6"
						placeholder={'const A = `${Alias}.IPLAN`\nreturn `${A}`'}
						value={current.orderBy ?? ""}
						on:input={(e) => { current!.orderBy = (e.target as HTMLTextAreaElement).value || undefined; markDirty(); }}
					></textarea>
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
												<Text><strong><code>{s.filename}</code></strong></Text>
												<Text color="neutral"><small>{s.label} · {s.body.length} chars</small></Text>
											</div>
											<FlexLayout items="center">
												<Button_ variant="outlined" onClick={() => openCodeModal(s.label, s.body)} title="Abrir en modal"><Iconify icon="mdi:fullscreen" /></Button_>
												<Button_ variant="outlined" onClick={() => copyText(s.body)} title="Copiar"><Iconify icon="mdi:content-copy" /></Button_>
												<Button_ variant="outlined" onClick={() => downloadText(s.filename, s.body)} title="Descargar"><Iconify icon="mdi:download" /></Button_>
											</FlexLayout>
										</FlexLayout>
										<label class="field file-target">
											<Text color="neutral"><small>Archivo destino</small></Text>
											<select
												class="input-field"
												value={current?.targetFiles?.[s.id as keyof NonNullable<typeof current.targetFiles>] ?? ""}
												on:change={(e) => setTargetFile(s.id as "modelo" | "datos" | "server" | "client" | "webctrl" | "azurefn", (e.target as HTMLSelectElement).value)}
											>
												<option value="">— (default: {defaultFilename(current!, s.id as "modelo" | "datos" | "server" | "client" | "webctrl" | "azurefn")}) —</option>
												{#each targetFilePaths as p (p)}
													<option value={p}>{basename(p)}</option>
												{/each}
											</select>
										</label>
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

<Modal bind:bshow={pathModalShow} style="width: 60dvw; max-width: 720px;">
	<svelte:fragment slot="title">
		<FlexLayout items="center">
			<Iconify icon="mdi:file-document-edit-outline" />
			<Text><strong>{pathModalMode === "add" ? "Añadir archivo destino" : "Editar archivo destino"}</strong></Text>
		</FlexLayout>
	</svelte:fragment>
	<div class="path-modal">
		<Text color="neutral"><small>Ruta relativa al repositorio (ej: <code>ISP-ClientesIS/src/sources/010 Objetos/.../01.Modelo.ts</code>).</small></Text>
		<input
			class="input-field"
			placeholder="ISP-ClientesIS/src/sources/.../Archivo.ts"
			bind:value={pathModalValue}
			on:keydown={(e) => { if (e.key === "Enter") savePathModal(); }}
		/>
		<FlexLayout justify="between">
			<div>
				{#if pathModalMode === "edit"}
					<Button_ color="danger" variant="outlined" onClick={removePathModal}><Iconify icon="mdi:delete" /> Eliminar</Button_>
				{/if}
			</div>
			<FlexLayout>
				<Button_ variant="outlined" onClick={() => (pathModalShow = false)}>Cancelar</Button_>
				<Button_ color="primary" onClick={savePathModal}><Iconify icon="mdi:content-save" /> Guardar</Button_>
			</FlexLayout>
		</FlexLayout>
	</div>
</Modal>

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
	.sub .row { flex-wrap: nowrap; }
	.sub .row .input-field { flex: 1 1 0; min-width: 0; }
	.sub .row > :global(button) { flex: 0 0 auto; width: auto; }
	.flex-1 { flex: 1 1 auto; }
	.rel { padding: 0.4rem 2rem 0.4rem 0.4rem; border: 1px dashed var(--is-b-color, #555); border-radius: 4px; }
	.sub { padding: 0.35rem 0.45rem; margin: 0.35rem 0; border-left: 2px solid var(--is-b-color, #555); border-radius: 2px; }
	.vs-eq { font-family: ui-monospace, Menlo, monospace; font-size: 0.85rem; opacity: 0.7; padding: 0 0.15rem; }
	.input-type { flex: 0 0 6rem; }
	.code-area { width: 100%; min-height: 2.5rem; font-family: ui-monospace, Menlo, monospace; font-size: 0.78rem; resize: vertical; white-space: pre; }
	.chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.45rem; }
	.chip {
		display: inline-flex; align-items: center; gap: 0.3rem;
		padding: 0.25rem 0.6rem; border-radius: 999px;
		border: 1px solid var(--is-b-color, #444);
		background: var(--is-bg-readonly, #1e1e1e);
		color: inherit; cursor: pointer;
		font-family: ui-monospace, Menlo, monospace; font-size: 0.78rem;
	}
	.chip:hover { border-color: var(--is-primary, #4ea1ff); background: var(--is-bg-secondary, #2a2a2a); }
	.path-modal { display: flex; flex-direction: column; gap: 0.6rem; padding: 0.5rem; }
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
