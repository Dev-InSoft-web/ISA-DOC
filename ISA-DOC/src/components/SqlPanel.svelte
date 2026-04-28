<script lang="ts">
	import { onMount } from "svelte";
	import {
		Card, Button, H2, H4, Text, Modal,
		Toaster, toastError, toastSuccess,
		FlexLayout, GridLayout, Iconify, Tabs, TabItem,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import SqlViewer from "./SqlViewer.svelte";
	import CodeModal from "./CodeModal.svelte";
	import Panel from "./Panel.svelte";
	import TablesPanel from "./TablesPanel.svelte";

	type Kind = "table" | "index" | "fk" | "seed" | "raw";
	interface SqlFragment {
		id: string;
		name: string;
		description: string;
		kind: Kind;
		body: string;
	}

	const KIND_OPTIONS: { value: Kind; label: string; icon: string }[] = [
		{ value: "table", label: "Tabla", icon: "mdi:table" },
		{ value: "index", label: "Índice", icon: "mdi:format-list-bulleted-square" },
		{ value: "fk", label: "FK", icon: "mdi:link-variant" },
		{ value: "seed", label: "Datos (seed)", icon: "mdi:database-arrow-down" },
		{ value: "raw", label: "Otro / Raw", icon: "mdi:code-tags" },
	];

	let fragments: SqlFragment[] = [];
	let loading = true;
	let saving = false;
	let dirty = false;
	let expanded = -1;
	let filterKind: Kind | "all" = "all";
	let filterText = "";

	let modalShow = false;
	let modalTitle = "";
	let modalValue = "";
	let modalLanguage: "json" | "sql" = "sql";

	$: filtered = fragments
		.map((f, i) => ({ f, i }))
		.filter(({ f }) => filterKind === "all" || f.kind === filterKind)
		.filter(({ f }) => {
			if (!filterText.trim()) return true;
			const q = filterText.toLowerCase();
			return f.name.toLowerCase().includes(q) || f.body.toLowerCase().includes(q);
		});
	$: fullSql = joinFragmentsClient(fragments);

	function kindMeta(k: Kind): { label: string; icon: string } {
		return KIND_OPTIONS.find((o) => o.value === k) ?? { label: "Otro", icon: "mdi:code-tags" };
	}

	function joinFragmentsClient(list: SqlFragment[]): string {
		const sep = "-- " + "=".repeat(76);
		const parts: string[] = [];
		for (const f of list) {
			const isPreamble = f.id.startsWith("preambulo-") || /^pre[áa]mbulo$/i.test(f.name);
			if (isPreamble) { parts.push((f.body ?? "").trim()); continue; }
			parts.push([sep, `-- ${f.name}`, sep, "", (f.body ?? "").trim()].join("\n"));
		}
		return parts.join("\n\n") + "\n";
	}

	async function load(): Promise<void> {
		loading = true;
		try {
			const r = await fetch("/api/sql/fragments");
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			const data = (await r.json()) as { fragments: SqlFragment[] };
			fragments = data.fragments ?? [];
			dirty = false;
			expanded = -1;
		} catch (err) {
			toastError(`Error cargando SQL: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			loading = false;
		}
	}

	async function save(): Promise<void> {
		if (saving) return;
		saving = true;
		try {
			const r = await fetch("/api/sql/fragments", {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ fragments }),
			});
			const data = (await r.json()) as { ok?: boolean; error?: string };
			if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
			toastSuccess(`SQL guardado (${fragments.length} fragmentos)`);
			dirty = false;
		} catch (err) {
			toastError(`Error guardando: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			saving = false;
		}
	}

	function markDirty(): void { dirty = true; }

	function move(idx: number, delta: number): void {
		const j = idx + delta;
		if (j < 0 || j >= fragments.length) return;
		const next = fragments.slice();
		const [it] = next.splice(idx, 1);
		next.splice(j, 0, it);
		fragments = next;
		markDirty();
	}

	function remove(idx: number): void {
		if (!confirm(`Eliminar fragmento "${fragments[idx]?.name ?? ""}"?`)) return;
		fragments = fragments.filter((_, i) => i !== idx);
		if (expanded === idx) expanded = -1;
		markDirty();
	}

	function add(): void {
		const id = `nuevo-${Date.now()}`;
		fragments = [...fragments, { id, name: "Nuevo fragmento", description: "", kind: "raw", body: "" }];
		expanded = fragments.length - 1;
		markDirty();
	}

	function openInModal(f: SqlFragment): void {
		modalTitle = f.name;
		modalValue = f.body ?? "";
		modalLanguage = "sql";
		modalShow = true;
	}

	function openFullInModal(): void {
		modalTitle = "init_capacitacion.sql · Resumen";
		modalValue = fullSql;
		modalLanguage = "sql";
		modalShow = true;
	}

	function copyAll(): void {
		navigator.clipboard?.writeText(fullSql);
		toastSuccess("SQL copiado al portapapeles");
	}

	function downloadAll(): void {
		const blob = new Blob([fullSql], { type: "application/sql" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "init_capacitacion.sql";
		a.click();
		URL.revokeObjectURL(url);
	}

	onMount(load);
</script>

<Toaster />

<Tabs>
	<TabItem title="Migrar">
		<section class="migrar">
			<Panel />
		</section>
	</TabItem>

	<TabItem title="Tablas">
		<section class="editor">
			<TablesPanel />
		</section>
	</TabItem>

	<TabItem title="Creación">
		<section class="editor">
			<Card>
				<FlexLayout items="center" justify="between">
					<div>
						<H2>Editor de SQL por fragmentos</H2>
						<Text color="neutral"><small>Fuente: <code>doc/ISA-DOC/public/db/init_capacitacion.sql</code></small></Text>
					</div>
					<FlexLayout items="center">
						<Button variant="outlined" onClick={load}>
							<Iconify icon="mdi:refresh" /> Recargar
						</Button>
						<Button onClick={add}>
							<Iconify icon="mdi:plus" /> Nuevo fragmento
						</Button>
						<Button color="primary" disabled={!dirty || saving} onClick={save}>
							<Iconify icon={saving ? "mdi:loading" : "mdi:content-save"} /> Guardar
						</Button>
					</FlexLayout>
				</FlexLayout>
			</Card>

			<Card variant="flat">
				<FlexLayout items="center">
					<label class="field flex-1">
						<Text color="neutral"><small>Filtrar</small></Text>
						<input class="input-field" type="text" placeholder="Buscar por nombre o contenido…" bind:value={filterText} />
					</label>
					<label class="field">
						<Text color="neutral"><small>Tipo</small></Text>
						<select class="input-field" bind:value={filterKind}>
							<option value="all">Todos</option>
							{#each KIND_OPTIONS as o}
								<option value={o.value}>{o.label}</option>
							{/each}
						</select>
					</label>
					<Text color="neutral"><small>{filtered.length} / {fragments.length}</small></Text>
				</FlexLayout>
			</Card>

			{#if loading}
				<Card variant="flat"><Text color="neutral">Cargando…</Text></Card>
			{:else if fragments.length === 0}
				<Card variant="flat"><Text color="neutral">Sin fragmentos. Pulsa “Nuevo fragmento”.</Text></Card>
			{:else}
				<FlexLayout direction="column">
					{#each filtered as { f, i } (f.id)}
						<Card>
							<button class="frag-header" on:click={() => (expanded = expanded === i ? -1 : i)}>
								<FlexLayout items="center" justify="between">
									<FlexLayout items="center">
										<span class="kind kind--{f.kind}"><Iconify icon={kindMeta(f.kind).icon} /> {kindMeta(f.kind).label}</span>
										<Text><strong>{f.name || "(sin nombre)"}</strong></Text>
										<Text color="neutral"><small>{f.body.length} chars</small></Text>
									</FlexLayout>
									<Iconify icon={expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"} />
								</FlexLayout>
							</button>

							{#if expanded === i}
								<div class="frag-body">
									<GridLayout cells="2">
										<label class="field">
											<Text color="neutral">Nombre</Text>
											<input class="input-field" type="text" bind:value={f.name} on:input={markDirty} />
										</label>
										<label class="field">
											<Text color="neutral">Tipo</Text>
											<select class="input-field" bind:value={f.kind} on:change={markDirty}>
												{#each KIND_OPTIONS as o}
													<option value={o.value}>{o.label}</option>
												{/each}
											</select>
										</label>
									</GridLayout>

									<label class="field">
										<Text color="neutral">Descripción</Text>
										<input class="input-field" type="text" bind:value={f.description} on:input={markDirty} />
									</label>

									<FlexLayout items="center" justify="between">
										<Text color="neutral"><small>Body (SQL)</small></Text>
										<Button variant="outlined" onClick={() => openInModal(f)}>
											<Iconify icon="mdi:fullscreen" /> Abrir en modal
										</Button>
									</FlexLayout>

									<SqlViewer bind:value={f.body} editable={true} height="280px" />

									<FlexLayout justify="between">
										<FlexLayout>
											<Button variant="outlined" onClick={() => move(i, -1)} disabled={i === 0}>
												<Iconify icon="mdi:arrow-up" /> Subir
											</Button>
											<Button variant="outlined" onClick={() => move(i, 1)} disabled={i === fragments.length - 1}>
												<Iconify icon="mdi:arrow-down" /> Bajar
											</Button>
										</FlexLayout>
										<Button color="danger" variant="ghost" onClick={() => remove(i)}>
											<Iconify icon="mdi:trash-can" /> Eliminar
										</Button>
									</FlexLayout>
								</div>
							{/if}
						</Card>
					{/each}
				</FlexLayout>
			{/if}
		</section>
	</TabItem>

	<TabItem title="Resumen">
		<section class="resumen">
			<Card>
				<FlexLayout items="center" justify="between">
					<div>
						<H2>Resumen · SQL completo</H2>
						<Text color="neutral"><small>Concatenación de los fragmentos. Refleja el archivo final.</small></Text>
					</div>
					<FlexLayout items="center">
						<Button variant="outlined" onClick={openFullInModal}>
							<Iconify icon="mdi:fullscreen" /> Abrir en modal
						</Button>
						<Button variant="outlined" onClick={copyAll}>
							<Iconify icon="mdi:content-copy" /> Copiar
						</Button>
						<Button variant="outlined" onClick={downloadAll}>
							<Iconify icon="mdi:download" /> Descargar
						</Button>
					</FlexLayout>
				</FlexLayout>
			</Card>
			<Card>
				<SqlViewer value={fullSql} height="70dvh" />
			</Card>
		</section>
	</TabItem>
</Tabs>

<CodeModal bind:bshow={modalShow} title={modalTitle} value={modalValue} language={modalLanguage} />

<style>
	.editor, .resumen, .migrar {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}
	.field { display: flex; flex-direction: column; }
	.flex-1 { flex: 1; }
	.input-field {
		width: 100%;
		padding: 0.4rem 0.6rem;
		background: var(--is-bg-readonly);
		color: var(--is-color);
		border: 1px solid var(--is-b-color);
		border-radius: 4px;
		font-size: 0.85rem;
	}
	.frag-header {
		display: block;
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		color: inherit;
		padding: 0.25rem 0;
		cursor: pointer;
	}
	.frag-body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
	.kind {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.1rem 0.45rem;
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.kind--table { background: rgba(86, 156, 214, 0.18); color: #569cd6; }
	.kind--index { background: rgba(220, 220, 170, 0.18); color: #dcdcaa; }
	.kind--fk    { background: rgba(78, 201, 176, 0.18); color: #4ec9b0; }
	.kind--seed  { background: rgba(206, 145, 120, 0.18); color: #ce9178; }
	.kind--raw   { background: rgba(212, 212, 212, 0.14); color: #d4d4d4; }
</style>
