<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import {
		ButtonIconify,
		Card,
		FlexLayout,
		H4,
		Iconify,
		Text,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import type {
		RelationDef,
		RelationKind,
		ResourceConfig,
	} from "../../../lib/codeGen/types.ts";
	import FloatingCard from "../../_comps/containers/FloatingCard.svelte";
	import Button_ from "../../_comps/especial/Button_.svelte";
	import Switch_ from "../../_comps/especial/_Switch.svelte";

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

	const REL_KINDS: RelationKind[] = ["1-1", "1-N"];
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

	function basename(p: string): string {
		const s = p.replace(/\\/g, "/");
		const i = s.lastIndexOf("/");
		return i >= 0 ? s.slice(i + 1) : s;
	}

	function setTargetFile(
		kind: "modelo" | "datos" | "server" | "client" | "webctrl" | "azurefn",
		value: string,
	): void {
		const tf = { ...(resource.targetFiles ?? {}) };
		const v = value.trim();
		if (v) tf[kind] = v;
		else delete tf[kind];
		resource.targetFiles = Object.keys(tf).length ? tf : undefined;
		change();
	}

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

	function addRelation(): void {
		const target = resources.find((r) => r.id !== resource.id)?.id ?? "";
		resource.relations = [
			...resource.relations,
			{ alias: "rel", kind: "1-N", target, versus: [], equals: [], insertEffect: "ignore" },
		];
		change();
	}
	function removeRelation(i: number): void {
		resource.relations = resource.relations.filter((_, k) => k !== i);
		change();
	}
	function addVersus(rel: RelationDef): void {
		const subCol = relTargetColumns(rel)[0] ?? "";
		const parentCol = currentColumns()[0] ?? "";
		rel.versus = [...(rel.versus ?? []), { sub: subCol, parent: parentCol }];
		change();
	}
	function removeVersus(rel: RelationDef, idx: number): void {
		rel.versus = (rel.versus ?? []).filter((_, k) => k !== idx);
		change();
	}
	function addEqual(rel: RelationDef): void {
		const tgtCols = relTargetColumns(rel);
		const col = tgtCols[0] ?? "";
		const type = relTargetFieldType(rel, col);
		rel.equals = [
			...(rel.equals ?? []),
			{ col, value: type === "bool" ? "1" : type === "number" ? "0" : "", type },
		];
		change();
	}
	function removeEqual(rel: RelationDef, idx: number): void {
		rel.equals = (rel.equals ?? []).filter((_, k) => k !== idx);
		change();
	}
	function onEqualColChange(rel: RelationDef, idx: number, col: string): void {
		const e = rel.equals[idx];
		e.col = col;
		const t = relTargetFieldType(rel, col);
		if (t !== e.type) {
			e.type = t;
			e.value = t === "bool" ? "1" : t === "number" ? "0" : "";
		}
		change();
	}
	function relTargetColumns(rel: RelationDef): string[] {
		const tgt = resources.find((r) => r.id === rel.target);
		if (!tgt) return [];
		return tgt.fields.map((f) => (f.column ?? f.name).toUpperCase());
	}
	function currentColumns(): string[] {
		return resource.fields.map((f) => (f.column ?? f.name).toUpperCase());
	}
	function relTargetFieldType(rel: RelationDef, col: string): "bool" | "number" | "string" {
		const tgt = resources.find((r) => r.id === rel.target);
		const f = tgt?.fields.find(
			(x) => (x.column ?? x.name).toUpperCase() === col.toUpperCase(),
		);
		if (!f) return "string";
		if (f.type === "bool") return "bool";
		if (f.type === "number") return "number";
		return "string";
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
		<H4>Archivos destino</H4>
		<div class="two-cols">
			<label class="field">
				<Text color="neutral"><small>modelo</small></Text>
				<select
					class="input-field"
					value={resource.targetFiles?.modelo ?? ""}
					on:change={(e) => setTargetFile("modelo", (e.target as HTMLSelectElement).value)}
				>
					<option value="">— (default) —</option>
					{#each targetFilePaths as p (p)}
						<option value={p}>{basename(p)}</option>
					{/each}
				</select>
			</label>
			<label class="field">
				<Text color="neutral"><small>datos</small></Text>
				<select
					class="input-field"
					value={resource.targetFiles?.datos ?? ""}
					on:change={(e) => setTargetFile("datos", (e.target as HTMLSelectElement).value)}
				>
					<option value="">— (default) —</option>
					{#each targetFilePaths as p (p)}
						<option value={p}>{basename(p)}</option>
					{/each}
				</select>
			</label>
		</div>
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
				<Text color="neutral"><small>API singular</small></Text>
				<input class="input-field" bind:value={resource.singularApi} on:input={change} />
			</label>
			<label class="field">
				<Text color="neutral"><small>API plural</small></Text>
				<input class="input-field" bind:value={resource.pluralApi} on:input={change} />
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
		<FlexLayout items="center" justify="between">
			<H4>Helpers</H4>
			<Button_ variant="outlined" onClick={addHelper}>
				<Iconify icon="mdi:plus" /> Añadir
			</Button_>
		</FlexLayout>
		<Text color="neutral">
			<small>Métodos manuales que se anexan a la clase. Tipo <code>get</code> (computed) o <code>fn</code> (método).</small>
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
						</select>
						<input class="input-field" placeholder="nombre" bind:value={h.name} on:input={change} />
						<input
							class="input-field"
							placeholder="tipo retorno (ej: number)"
							bind:value={h.returnType}
							on:input={change}
						/>
					</div>
					{#if h.kind === "fn"}
						<input
							class="input-field"
							placeholder="params, ej: (x: number)"
							bind:value={h.params}
							on:input={change}
						/>
					{/if}
					<textarea
						class="input-field code-area"
						rows="3"
						placeholder={'return this.iplan ? String(this.iplan).split(".").filter(Boolean).length : 0'}
						bind:value={h.body}
						on:input={change}
					></textarea>
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

	<Card>
		<FlexLayout items="center" justify="between">
			<H4>Relaciones (conceptuales)</H4>
			<Button_ variant="outlined" onClick={addRelation}>
				<Iconify icon="mdi:plus" /> Añadir
			</Button_>
		</FlexLayout>
		{#if resource.relations.length === 0}
			<Text color="neutral"><small>Sin relaciones. Añade para generar nestedConfig().</small></Text>
		{/if}
		{#each resource.relations as r, i}
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
							placeholder="alias"
							bind:value={r.alias}
							on:input={change}
						/>
						<select class="input-field" bind:value={r.kind} on:change={change}>
							{#each REL_KINDS as k}
								<option value={k}>{k}</option>
							{/each}
						</select>
						<select class="input-field" bind:value={r.target} on:change={change}>
							<option value="">— recurso destino —</option>
							{#each resources as o (o.id)}
								{#if o.id !== resource.id}
									<option value={o.id}>{o.id}</option>
								{/if}
							{/each}
						</select>
					</div>

					<div class="sub">
						<FlexLayout items="center" justify="between">
							<Text>
								<small><strong>Versus</strong> — <code>sub.col</code> = <code>parent.col</code></small>
							</Text>
							<Button_ variant="outlined" onClick={() => addVersus(r)}>
								<Iconify icon="mdi:plus" /> Versus
							</Button_>
						</FlexLayout>
						{#each r.versus ?? [] as v, vi}
							<div class="row">
								<select class="input-field" bind:value={v.sub} on:change={change}>
									{#each relTargetColumns(r) as c (c)}
										<option value={c}>sub.{c}</option>
									{/each}
								</select>
								<span class="vs-eq">=</span>
								<select class="input-field" bind:value={v.parent} on:change={change}>
									{#each currentColumns() as c (c)}
										<option value={c}>parent.{c}</option>
									{/each}
								</select>
								<span class="btn-fit">
									<ButtonIconify
										color="danger"
										icon="mdi:close"
										onClick={() => removeVersus(r, vi)}
										title="Eliminar"
									/>
								</span>
							</div>
						{:else}
							<Text color="neutral"><small>Sin pares versus.</small></Text>
						{/each}
					</div>

					<div class="sub">
						<FlexLayout items="center" justify="between">
							<Text>
								<small><strong>Equals</strong> — <code>sub.col = valor</code></small>
							</Text>
							<Button_ variant="outlined" onClick={() => addEqual(r)}>
								<Iconify icon="mdi:plus" /> Equal
							</Button_>
						</FlexLayout>
						{#each r.equals ?? [] as eq, ei}
							<div class="row">
								<select
									class="input-field"
									value={eq.col}
									on:change={(e) =>
										onEqualColChange(r, ei, (e.target as HTMLSelectElement).value)}
								>
									{#each relTargetColumns(r) as c (c)}
										<option value={c}>sub.{c}</option>
									{/each}
								</select>
								<span class="vs-eq">=</span>
								<select class="input-field input-type" bind:value={eq.type} on:change={change}>
									<option value="bool">bool</option>
									<option value="number">number</option>
									<option value="string">string</option>
								</select>
								{#if eq.type === "bool"}
									<select class="input-field" bind:value={eq.value} on:change={change}>
										<option value="1">true (1)</option>
										<option value="0">false (0)</option>
									</select>
								{:else if eq.type === "number"}
									<input
										class="input-field"
										type="number"
										bind:value={eq.value}
										on:input={change}
									/>
								{:else}
									<input
										class="input-field"
										type="text"
										placeholder="valor"
										bind:value={eq.value}
										on:input={change}
									/>
								{/if}
								<ButtonIconify
									color="danger"
									icon="mdi:close"
									onClick={() => removeEqual(r, ei)}
									title="Eliminar"
								/>
							</div>
						{:else}
							<Text color="neutral"><small>Sin equals.</small></Text>
						{/each}
					</div>

					<div class="sub">
						<Text>
							<small>
								<strong>WHERE custom</strong> — cuerpo de <code>(sub, parent) =&gt; ...</code>
							</small>
						</Text>
						<textarea
							class="input-field code-area"
							rows="2"
							placeholder={'(parent.startsWith(pivot) ? `${sub}.IPLAN=${parent}.IPLANESTUDIO` : "")'}
							value={r.customWhere ?? ""}
							on:input={(e) => {
								r.customWhere = (e.target as HTMLTextAreaElement).value || undefined;
								change();
							}}
						></textarea>
					</div>

					<div class="row">
						<div class="field">
							<Text color="neutral"><small>Insert</small></Text>
							<Switch_
								label="syncDetails"
								checked={r.insertEffect === "syncDetails"}
								on:change={(e) => {
									r.insertEffect = (e.target as HTMLInputElement).checked
										? "syncDetails"
										: "ignore";
									change();
								}}
							/>
						</div>
					</div>
				</div>
				<div slot="float" style="padding: 0;">
					<ButtonIconify
						color="danger"
						icon="mdi:close"
						onClick={() => removeRelation(i)}
						title="Eliminar"
					/>
				</div>
			</FloatingCard>
		{/each}
	</Card>

	<Card>
		<H4>Archivos destino</H4>
		<div class="two-cols">
			<label class="field">
				<Text color="neutral"><small>server</small></Text>
				<select
					class="input-field"
					value={resource.targetFiles?.server ?? ""}
					on:change={(e) => setTargetFile("server", (e.target as HTMLSelectElement).value)}
				>
					<option value="">— (default) —</option>
					{#each targetFilePaths as p (p)}
						<option value={p}>{basename(p)}</option>
					{/each}
				</select>
			</label>
			<label class="field">
				<Text color="neutral"><small>azurefn</small></Text>
				<select
					class="input-field"
					value={resource.targetFiles?.azurefn ?? ""}
					on:change={(e) => setTargetFile("azurefn", (e.target as HTMLSelectElement).value)}
				>
					<option value="">— (default) —</option>
					{#each targetFilePaths as p (p)}
						<option value={p}>{basename(p)}</option>
					{/each}
				</select>
			</label>
		</div>
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
		</div>
		<FlexLayout items="center">
			<Switch_ label="Exponer driver en FN-Módulo" bind:checked={exposeOn} />
		</FlexLayout>
	</Card>

	<Card>
		<H4>Archivos destino</H4>
		<div class="two-cols">
			<label class="field">
				<Text color="neutral"><small>client</small></Text>
				<select
					class="input-field"
					value={resource.targetFiles?.client ?? ""}
					on:change={(e) => setTargetFile("client", (e.target as HTMLSelectElement).value)}
				>
					<option value="">— (default) —</option>
					{#each targetFilePaths as p (p)}
						<option value={p}>{basename(p)}</option>
					{/each}
				</select>
			</label>
			<label class="field">
				<Text color="neutral"><small>webctrl</small></Text>
				<select
					class="input-field"
					value={resource.targetFiles?.webctrl ?? ""}
					on:change={(e) => setTargetFile("webctrl", (e.target as HTMLSelectElement).value)}
				>
					<option value="">— (default) —</option>
					{#each targetFilePaths as p (p)}
						<option value={p}>{basename(p)}</option>
					{/each}
				</select>
			</label>
		</div>
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

		<H4 style="margin: 0.75rem 0 0.5rem 0;">Archivo destino</H4>
		<div class="two-cols">
			<label class="field">
				<Text color="neutral"><small>azurefn</small></Text>
				<select
					class="input-field"
					value={resource.targetFiles?.azurefn ?? ""}
					on:change={(e) => setTargetFile("azurefn", (e.target as HTMLSelectElement).value)}
				>
					<option value="">— (default) —</option>
					{#each targetFilePaths as p (p)}
						<option value={p}>{basename(p)}</option>
					{/each}
				</select>
			</label>
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
