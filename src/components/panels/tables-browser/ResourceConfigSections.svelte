<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import {
		ButtonIconify,
		Card,
		FlexLayout,
		H4,
		Iconify,
		SelectEnum,
		Switch,
		Text,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import type {
		DetailNode,
		RelationDef,
		ResourceConfig,
	} from "../../../lib/codeGen/types.ts";
	import FloatingCard from "../../_comps/containers/FloatingCard.svelte";
	import Button_ from "../../_comps/especial/Button_.svelte";
	import Switch_ from "../../_comps/especial/_Switch.svelte";
	import DetailSpecNode from "./DetailSpecNode.svelte";

	export let resource: ResourceConfig;
	export let resources: ResourceConfig[];
	export let inferred: ResourceConfig;
	export let targetFilePaths: string[] = [];
	export let section: "model" | "server" | "client" | "azure" = "model";
	export let slaves: string[] = [];
	export let domainName: string = "";

	// `inferred` se expone para que el padre compute el diff override; no se consume aquí.
	void inferred;

	const dispatch = createEventDispatcher<{ change: void }>();

	const OMIT_OPS: string[] = ["Verificar", "Duplicar", "Recodificar", "Consolidar"];

	let exposeOn: boolean = resource.exposeInFn !== false;
	let exposeOnPrev: boolean = exposeOn;
	let lastResourceId: string = resource.id;

	$: if (resource.id !== lastResourceId) {
		lastResourceId = resource.id;
		exposeOn = resource.exposeInFn !== false;
		exposeOnPrev = exposeOn;
	}

	$: if (exposeOn !== exposeOnPrev) {
		resource.exposeInFn = exposeOn ? undefined : false;
		exposeOnPrev = exposeOn;
		change();
	}

	function change(): void {
		resource = resource;
		dispatch("change");
	}

	// `targetFilePaths` se conserva por compatibilidad de la API del componente; no se usa en la UI.
	void targetFilePaths;

	function addHelper(): void {
		const helpers = resource.helpers ?? [];
		resource.helpers = [
			...helpers,
			{ name: "helper", kind: "get", returnType: "number", body: "return 0" },
		];
		change();
	}
	function removeHelper(i: number): void {
		if (!resource.helpers) return;
		resource.helpers = resource.helpers.filter((_, k) => k !== i);
		change();
	}

	function toggleOmitOp(op: string, on: boolean): void {
		const set = new Set(resource.omitOps ?? []);
		if (on) set.add(op);
		else set.delete(op);
		resource.omitOps = [...set];
		change();
	}

	function addHook(): void {
		resource.customHooks = [
			...resource.customHooks,
			{
				name: "Custom_Action",
				signature: "(o: " + resource.className + "): Promise<void>",
				clientPath: "/api/" + resource.singularApi + "/custom/{ipk}",
				clientMethod: "GET",
				clientFnName: "customAction",
			},
		];
		change();
	}
	function removeHook(i: number): void {
		resource.customHooks = resource.customHooks.filter((_, k) => k !== i);
		change();
	}

	function onDetailNodeChange(alias: string, ev: CustomEvent<DetailNode>): void {
		const spec = { ...(resource.detailSpec ?? {}) };
		spec[alias] = ev.detail;
		resource.detailSpec = spec;
		change();
	}

	function addVersus(rel: RelationDef): void {
		rel.versus = [...(rel.versus ?? []), { sub: "", parent: "" }];
		change();
	}
	function removeVersus(rel: RelationDef, i: number): void {
		rel.versus = (rel.versus ?? []).filter((_, k) => k !== i);
		change();
	}
	function addEqual(rel: RelationDef): void {
		rel.equals = [...(rel.equals ?? []), { col: "", value: "", type: "number" }];
		change();
	}
	function removeEqual(rel: RelationDef, i: number): void {
		rel.equals = (rel.equals ?? []).filter((_, k) => k !== i);
		change();
	}

	let versusOpen: Record<string, boolean> = {};
	let equalsOpen: Record<string, boolean> = {};
	$: resource.relations.forEach((r) => {
		if (versusOpen[r.alias] === undefined) versusOpen[r.alias] = (r.versus?.length ?? 0) > 0;
		if (equalsOpen[r.alias] === undefined) equalsOpen[r.alias] = (r.equals?.length ?? 0) > 0;
	});

	const AUDIT_COLS = new Set([
		"IUSUARIOCRE", "IUSUARIOULT",
		"IAPPCRE", "IAPPULT",
		"IEQUIPOCRE", "IEQUIPOULT",
		"IPCRE", "IPULT",
		"FHCRE", "FHULT",
	]);
	function colsOf(cfg: ResourceConfig | undefined): Record<string, string> {
		const out: Record<string, string> = {};
		if (!cfg) return out;
		for (const f of cfg.fields) {
			const col = (f.column ?? f.name).toUpperCase();
			if (!col || AUDIT_COLS.has(col)) continue;
			out[col] = col;
		}
		return out;
	}
</script>

{#if section === "model"}
	<Card>
		<FlexLayout items="center">
			<Iconify icon="mdi:cube-outline" />
			<H4>Modelo · identidad</H4>
		</FlexLayout>
		<div class="two-cols">
			<label class="field">
				<Text color="neutral"><small>Clase TS</small></Text>
				<input class="input-field" bind:value={resource.className} on:input={change} />
			</label>
			<label class="field">
				<Text color="neutral"><small>Tabla SQL (solo lectura)</small></Text>
				<input class="input-field" value={resource.tableName} readonly />
			</label>
		</div>
	</Card>

	<Card>
		<FlexLayout items="center">
			<Iconify icon="mdi:graph-outline" />
			<H4>Relaciones del diagrama</H4>
		</FlexLayout>
		{#if resource.relations.length === 0}
			<Text color="neutral"><small>Sin tablas hijas detectadas en el dominio.</small></Text>
		{/if}
		{#each resource.relations as r}
			{@const tgt = resources.find((x) => x.id === r.target)}
			<div class="rel-ro">
				<div class="row">
					<input class="input-field alias-input" bind:value={r.alias} on:input={change} />
					<Text color="neutral"><small>{tgt?.tableName ?? r.target}</small></Text>
				</div>
			</div>
		{/each}
	</Card>

	<Card>
		<FlexLayout items="center" justify="between">
			<H4>Helpers</H4>
			<Button_ variant="outlined" onClick={addHelper}>
				<Iconify icon="mdi:plus" /> Añadir
			</Button_>
		</FlexLayout>
		<Text color="neutral">
			<small>Propiedades extra del modelo (no inferibles del diagrama). <code>get</code> (computed) o <code>fn</code> (método).</small>
		</Text>
		{#each resource.helpers ?? [] as h, i}
			<FloatingCard
				variant="flat"
				horizontal="right"
				vertical="top"
				class="rel-fc"
				style="padding: 0; margin: 0.35rem 0;"
			>
				<div class="rel">
					<div class="row">
						<select class="input-field" bind:value={h.kind} on:change={change}>
							<option value="get">get</option>
							<option value="fn">fn</option>
							<option value="field">field</option>
						</select>
						<input class="input-field" placeholder="nombre" bind:value={h.name} on:input={change} />
						{#if h.kind === "field"}
							<select class="input-field" bind:value={h.type} on:change={change}>
								<option value="string">string</option>
								<option value="number">number</option>
								<option value="boolean">boolean</option>
								<option value="object">object</option>
							</select>
						{:else}
							<select class="input-field" bind:value={h.returnType} on:change={change}>
								<option value="void">void</option>
								<option value="string">string</option>
								<option value="number">number</option>
								<option value="boolean">boolean</option>
								<option value="object">object</option>
								<option value="any">any</option>
							</select>
						{/if}
					</div>
					{#if h.kind === "fn"}
						<input
							class="input-field"
							placeholder="params, ej: (x: number)"
							bind:value={h.params}
							on:input={change}
						/>
					{/if}
					{#if h.kind !== "field"}
						<textarea
							class="input-field code-area"
							rows="3"
							placeholder={'return this.iplan ? String(this.iplan).split(".").filter(Boolean).length : 0'}
							bind:value={h.body}
							on:input={change}
						></textarea>
					{/if}
				</div>
				<div slot="float" style="padding: 0;">
					<ButtonIconify
						color="danger"
						icon="mdi:close"
						onClick={() => removeHelper(i)}
						title="Eliminar"
					/>
				</div>
			</FloatingCard>
		{/each}
	</Card>
{:else if section === "server"}
	<Card>
		<FlexLayout items="center">
			<Iconify icon="mdi:server" />
			<H4>Server · API y base</H4>
		</FlexLayout>
		<div class="two-cols">
			<label class="field">
				<Text color="neutral"><small>isysRecurso</small></Text>
				<input class="input-field" bind:value={resource.isysRecurso} on:input={change} />
			</label>
			<label class="field">
				<Text color="neutral"><small>Server base class</small></Text>
				<input class="input-field" bind:value={resource.parentBaseClass} on:input={change} />
			</label>
			<label class="field">
				<Text color="neutral"><small>Caption singular</small></Text>
				<input class="input-field" bind:value={resource.singularCaption} on:input={change} />
			</label>
			<label class="field">
				<Text color="neutral"><small>Caption plural</small></Text>
				<input class="input-field" bind:value={resource.pluralCaption} on:input={change} />
			</label>
		</div>
	</Card>

	<Card>
		<FlexLayout items="center">
			<Iconify icon="mdi:file-tree" />
			<H4>JData2HighDetail</H4>
		</FlexLayout>
		{#if resource.relations.length === 0}
			<Text color="neutral"><small>Sin relaciones.</small></Text>
		{/if}
		{#each resource.relations as r (r.alias)}
			{@const tgt = resources.find((x) => x.id === r.target)}
			<div class="dspec-rel">
				<div class="row">
					<code class="alias">{r.alias}</code>
				</div>
				<DetailSpecNode
					node={resource.detailSpec?.[r.alias] ?? { todo: true }}
					targetCfg={tgt}
					{resources}
					on:change={(ev) => onDetailNodeChange(r.alias, ev)}
				/>
			</div>
		{/each}
	</Card>

	<hr class="sep" />

	<Card>
		<FlexLayout items="center">
			<Iconify icon="mdi:table-arrow-right" />
			<H4>Relaciones</H4>
		</FlexLayout>
		{#if resource.relations.length === 0}
			<Text color="neutral"><small>Sin relaciones.</small></Text>
		{/if}
		{#each resource.relations as r}
			{@const tgt = resources.find((x) => x.id === r.target)}
			{@const subCols = colsOf(tgt)}
			{@const parentCols = colsOf(resource)}
			<div class="rel-ro">
				<FlexLayout items="center" justify="between">
					<H4>{tgt?.tableName ?? r.target} <small>({r.alias})</small></H4>
					<FlexLayout direction="column" items="start" gap="0.1rem">
						<Switch bind:checked={versusOpen[r.alias]} small color="primary" colorFalse="neutral">
							<small>versus</small>
						</Switch>
						<Switch bind:checked={equalsOpen[r.alias]} small color="primary" colorFalse="neutral">
							<small>equals</small>
						</Switch>
					</FlexLayout>
				</FlexLayout>

				{#if versusOpen[r.alias]}
				<div class="cmp-section">
					<FlexLayout items="center" justify="between">
						<Text color="neutral"><small>versus (sub ↔ parent)</small></Text>
						<Button_ variant="outlined" onClick={() => addVersus(r)}>
							<Iconify icon="mdi:plus" /> versus
						</Button_>
					</FlexLayout>
					{#if !(r.versus?.length)}
						<small class="muted">Sin versus.</small>
					{/if}
					{#each r.versus ?? [] as v, i}
						<div class="row">
							<div class="grow">
								<SelectEnum
									label=""
									required={false}
									enumValue={subCols}
									bind:value={v.sub}
									onChange={() => change()}
								/>
							</div>
							<span class="eq-sign">=</span>
							<div class="grow">
								<SelectEnum
									label=""
									required={false}
									enumValue={parentCols}
									bind:value={v.parent}
									onChange={() => change()}
								/>
							</div>
							<ButtonIconify icon="mdi:delete-outline" title="Quitar versus" on:click={() => removeVersus(r, i)} />
						</div>
					{/each}
				</div>
				{/if}

				{#if equalsOpen[r.alias]}
				<div class="cmp-section">
					<FlexLayout items="center" justify="between">
						<Text color="neutral"><small>equals (sub.COL = valor literal)</small></Text>
						<Button_ variant="outlined" onClick={() => addEqual(r)}>
							<Iconify icon="mdi:plus" /> equals
						</Button_>
					</FlexLayout>
					{#if !(r.equals?.length)}
						<small class="muted">Sin equals.</small>
					{/if}
					{#each r.equals ?? [] as e, i}
						<div class="row">
							<div class="grow">
								<SelectEnum
									label=""
									required={false}
									enumValue={subCols}
									bind:value={e.col}
									onChange={() => change()}
								/>
							</div>
							<span class="eq-sign">=</span>
							<input
								class="input-field"
								placeholder="valor"
								bind:value={e.value}
								on:input={change}
							/>
							<select class="input-field" bind:value={e.type} on:change={change}>
								<option value="number">number</option>
								<option value="bool">bool</option>
								<option value="string">string</option>
							</select>
							<ButtonIconify icon="mdi:delete-outline" title="Quitar equals" on:click={() => removeEqual(r, i)} />
						</div>
					{/each}
				</div>
				{/if}
			</div>
		{/each}
	</Card>

	<hr class="sep" />

	<Card>
		<FlexLayout items="center" justify="between">
			<H4>Hooks personalizados</H4>
			<Button_ variant="outlined" onClick={addHook}>
				<Iconify icon="mdi:plus" /> Añadir
			</Button_>
		</FlexLayout>
		{#if resource.customHooks.length === 0}
			<Text color="neutral">
				<small>Sin hooks. Ej: <code>Get_Recurso_PlanCurso</code>.</small>
			</Text>
		{/if}
		{#each resource.customHooks as h, i}
			<FloatingCard
				variant="flat"
				horizontal="right"
				vertical="top"
				class="rel-fc"
				style="padding: 0; margin: 0.35rem 0;"
			>
				<div class="rel">
					<div class="row">
						<input
							class="input-field"
							placeholder="nombre Server"
							bind:value={h.name}
							on:input={change}
						/>
						<input
							class="input-field"
							placeholder="signature"
							bind:value={h.signature}
							on:input={change}
						/>
					</div>
					<div class="row">
						<select class="input-field" bind:value={h.clientMethod} on:change={change}>
							<option value="GET">GET</option>
							<option value="POST">POST</option>
							<option value="PUT">PUT</option>
							<option value="DELETE">DELETE</option>
						</select>
						<input
							class="input-field flex-1"
							placeholder="path API"
							bind:value={h.clientPath}
							on:input={change}
						/>
						<input
							class="input-field"
							placeholder="fn cliente"
							bind:value={h.clientFnName}
							on:input={change}
						/>
					</div>
				</div>
				<div slot="float" style="padding: 0;">
					<ButtonIconify
						color="danger"
						icon="mdi:close"
						onClick={() => removeHook(i)}
						title="Eliminar"
					/>
				</div>
			</FloatingCard>
		{/each}
	</Card>

{:else if section === "client"}
	<Card>
		<FlexLayout items="center">
			<Iconify icon="mdi:monitor" />
			<H4>Client · base y exposición</H4>
		</FlexLayout>
		<div class="two-cols">
			<label class="field">
				<Text color="neutral"><small>Client base class</small></Text>
				<input class="input-field" bind:value={resource.clientBaseClass} on:input={change} />
			</label>
			<label class="field">
				<Text color="neutral"><small>Entry (singular)</small></Text>
				<input class="input-field" bind:value={resource.singularApi} on:input={change} />
			</label>
			<label class="field">
				<Text color="neutral"><small>Entries (plural)</small></Text>
				<input class="input-field" bind:value={resource.pluralApi} on:input={change} />
			</label>
		</div>
		<FlexLayout items="center">
			<Switch_ label="Exponer driver en FN-Módulo" bind:checked={exposeOn} />
		</FlexLayout>
	</Card>
{:else if section === "azure"}
	<Card>
		<H4 style="margin: 0 0 0.5rem 0;">Azure Function · {domainName || resource.className}</H4>
		<FlexLayout direction="column">
			<Text>
				<small>
					Esta entidad <b>master</b> publica una Azure Function que registra el master y sus esclavas vía
					<code>registerCatalogoGenAzureFunction</code>.
				</small>
			</Text>
			<div>
				<Text color="neutral"><small>Master</small></Text>
				<Text><b>{resource.tableName}</b> ({resource.className})</Text>
			</div>
			<div>
				<Text color="neutral"><small>Esclavas ({slaves.length})</small></Text>
				{#if slaves.length === 0}
					<Text color="neutral"><small>— (sin esclavas en este dominio) —</small></Text>
				{:else}
					<ul style="margin:0; padding-left:1rem;">
						{#each slaves as s (s)}
							<li><Text>{s}</Text></li>
						{/each}
					</ul>
				{/if}
			</div>
		</FlexLayout>
	</Card>

	<Card>
		<H4>FN-Módulo · acciones a omitir</H4>
		<Text color="neutral">
			<small>Acciones a omitir en <code>registerCatalogoGenAzureFunction</code>:</small>
		</Text>
		<div class="col-checks">
			{#each OMIT_OPS as op (op)}
				<label class="col-check">
					<input
						type="checkbox"
						checked={(resource.omitOps ?? []).includes(op)}
						on:change={(e) => toggleOmitOp(op, (e.target as HTMLInputElement).checked)}
					/>
					<span>{op}</span>
				</label>
			{/each}
		</div>
	</Card>
{/if}

<style>
	.two-cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}
	.input-field {
		width: 100%;
		height: fit-content;
		padding: 0.2rem 0.45rem;
		border-radius: 4px;
		border: 1px solid var(--is-b-color, #444);
		background: var(--is-bg-readonly, #1e1e1e);
		color: var(--is-color, #ddd);
		font-family: ui-monospace, Menlo, monospace;
		font-size: 0.8rem;
		line-height: 1.3;
	}
	.input-field[readonly] {
		opacity: 0.7;
		cursor: not-allowed;
	}
	.row {
		display: flex;
		gap: 0.4rem;
		align-items: center;
		flex-wrap: wrap;
		margin: 0.35rem 0;
	}
	.row .input-field {
		flex: 1 1 110px;
		min-width: 80px;
	}
	.sub .row {
		flex-wrap: nowrap;
	}
	.sub .row .input-field {
		flex: 1 1 0;
		min-width: 0;
	}
	.flex-1 {
		flex: 1 1 auto;
	}
	.rel {
		padding: 0.4rem 2rem 0.4rem 0.4rem;
		border: 1px dashed var(--is-b-color, #555);
		border-radius: 4px;
	}
	.sub {
		padding: 0.35rem 0.45rem;
		margin: 0.35rem 0;
		border-left: 2px solid var(--is-b-color, #555);
		border-radius: 2px;
	}
	.vs-eq {
		font-family: ui-monospace, Menlo, monospace;
		font-size: 0.85rem;
		opacity: 0.7;
		padding: 0 0.15rem;
	}
	.input-type {
		flex: 0 0 6rem;
	}
	.code-area {
		width: 100%;
		min-height: 2.5rem;
		font-family: ui-monospace, Menlo, monospace;
		font-size: 0.78rem;
		resize: vertical;
		white-space: pre;
	}
	.col-checks {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.6rem;
		padding: 0.25rem 0.45rem;
		border: 1px solid var(--is-b-color, #444);
		border-radius: 4px;
		background: var(--is-bg-readonly, #1e1e1e);
	}
	.dspec-rel {
		padding: 0.4rem 0.5rem;
		border: 1px solid var(--is-b-color, #444);
		border-radius: 4px;
		background: var(--is-bg-readonly, #1e1e1e);
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.cmp-section {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.3rem 0;
		border-top: 1px dashed var(--is-b-color, #444);
	}
	.cmp-section .row {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}
	.cmp-section .grow {
		flex: 1 1 110px;
		min-width: 80px;
	}
	.eq-sign {
		font-family: ui-monospace, Menlo, monospace;
		opacity: 0.7;
	}
	.muted {
		opacity: 0.6;
		font-style: italic;
	}
	.sep {
		border: none;
		border-top: 1px solid var(--is-b-color, #444);
		margin: 0.75rem 0;
	}
	.col-check {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-family: ui-monospace, Menlo, monospace;
		font-size: 0.75rem;
		cursor: pointer;
	}
	.btn-fit {
		display: inline-flex;
		width: fit-content;
		height: fit-content;
		flex: 0 0 auto;
	}
	.btn-fit :global(button) {
		width: fit-content;
		height: fit-content;
	}
</style>
