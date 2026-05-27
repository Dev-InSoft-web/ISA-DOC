<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import {
		Button,
		ButtonIconify,
		FlexLayout,
		Input,
		Modal,
		SelectEnum,
		toastError,
		toastSuccess,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import { leerState, escribirState, migrarLegacy } from "../../lib/patyia/urlState";

	interface OpenAIFile {
		id: string;
		bytes: number;
		created_at: number;
		filename: string;
		purpose: string;
		status?: string;
	}
	interface VectorStore {
		id: string;
		name: string;
		bytes?: number;
		status?: string;
		created_at?: number;
		file_counts?: { total?: number; completed?: number; in_progress?: number; failed?: number };
	}
	interface Skill {
		id?: string;
		name?: string;
		description?: string;
	}
	interface LocalMeta {
		categorias: string[];
		tags: string[];
		descripcion: string;
		notas: string;
		actualizado: string;
	}

	const PURPOSES = {
		"Todos": "",
		"assistants": "assistants",
		"assistants_output": "assistants_output",
		"batch": "batch",
		"batch_output": "batch_output",
		"fine-tune": "fine-tune",
		"fine-tune-results": "fine-tune-results",
		"vision": "vision",
		"user_data": "user_data",
	} as const;

	const UPLOAD_PURPOSES = {
		"assistants": "assistants",
		"batch": "batch",
		"fine-tune": "fine-tune",
		"vision": "vision",
		"user_data": "user_data",
	} as const;

	let files: OpenAIFile[] = [];
	let filesCargando: boolean = false;
	let filesRefrescando: boolean = false;
	let filesError: string = "";
	let purposeFiltro: string = "";
	let busquedaFiles: string = "";
	let cacheUpdated: string = "";
	let descargandoTodos: boolean = false;
	let backupProgreso: {
		running: boolean; total: number; hecho: number; exitos: number; fallos: number;
		currentId: string; currentFilename: string; cancelRequested: boolean;
	} = { running: false, total: 0, hecho: 0, exitos: 0, fallos: 0, currentId: "", currentFilename: "", cancelRequested: false };
	let pollTimer: ReturnType<typeof setInterval> | null = null;

	interface DuplicateItem { id: string; filename: string; bytes: number; path: string }
	interface ExactGroup { hash: string; bytes: number; items: DuplicateItem[] }
	interface SimilarGroup { key: string; items: DuplicateItem[] }
	let dupAbierto: boolean = false;
	let dupEscaneando: boolean = false;
	let dupEliminando: Set<string> = new Set();
	let dupReporte: {
		updated: string; totalEscaneados: number; totalConHash: number;
		exactGroups: ExactGroup[]; similarGroups: SimilarGroup[];
	} = { updated: "", totalEscaneados: 0, totalConHash: 0, exactGroups: [], similarGroups: [] };
	let filesPage: number = 1;
	let filesPageSize: number = 20;
	let filesTotal: number = 0;
	let filesTotalFiltrado: number = 0;
	let filesTotalPages: number = 1;
	let busquedaTimer: ReturnType<typeof setTimeout> | null = null;
	let filesInicializado: boolean = false;

	let vstores: VectorStore[] = [];
	let vsCargando: boolean = false;
	let vsRefrescando: boolean = false;
	let vsError: string = "";
	let vsUpdated: string = "";

	let skills: Skill[] = [];
	let skillsCargando: boolean = false;
	let skillsRefrescando: boolean = false;
	let skillsError: string = "";
	let skillsDisponible: boolean = false;
	let skillsUpdated: string = "";

	type Tab2 = "files" | "vs" | "skills";
	const TAB2_VALIDAS: ReadonlySet<Tab2> = new Set(["files", "vs", "skills"]);
	let tab2: Tab2 = "files";

	function leerTab2(): Tab2 {
		const st = leerState();
		const legacy = migrarLegacy({ tab2: "subStorage" });
		const raw = String((st.subStorage ?? legacy.subStorage) ?? "");
		return raw && TAB2_VALIDAS.has(raw as Tab2) ? (raw as Tab2) : "files";
	}
	function setTab2(t: Tab2): void {
		tab2 = t;
		escribirState({ subStorage: t });
	}

	function onFiltroPurpose(): void {
		filesPage = 1;
		cargarFiles();
	}

	function onBusquedaInput(): void {
		if (busquedaTimer) clearTimeout(busquedaTimer);
		busquedaTimer = setTimeout(() => {
			filesPage = 1;
			cargarFiles();
		}, 300);
	}

	$: if (filesInicializado) {
		void purposeFiltro;
		onFiltroPurpose();
	}
	$: if (filesInicializado) {
		void busquedaFiles;
		onBusquedaInput();
	}

	function irPagina(p: number): void {
		if (p < 1 || p > filesTotalPages || p === filesPage) return;
		filesPage = p;
		cargarFiles();
	}

	function idCorto(id: string): string {
		if (id.length <= 4) return id;
		return `...${id.slice(-4)}`;
	}

	async function cargarFiles(): Promise<void> {
		filesCargando = true;
		filesError = "";
		try {
			const u = new URL("/api/patyia/openai/files/cache", window.location.origin);
			u.searchParams.set("page", String(filesPage));
			u.searchParams.set("pageSize", String(filesPageSize));
			if (busquedaFiles.trim()) u.searchParams.set("q", busquedaFiles.trim());
			if (purposeFiltro) u.searchParams.set("purpose", purposeFiltro);
			const r = await fetch(u.toString());
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			files = (j.items ?? []) as OpenAIFile[];
			cacheUpdated = j.updated ?? "";
			filesTotal = j.count ?? 0;
			filesTotalFiltrado = j.filtered ?? 0;
			filesTotalPages = j.totalPages ?? 1;
			filesPage = j.page ?? 1;
		} catch (err) {
			filesError = err instanceof Error ? err.message : String(err);
			files = [];
		} finally {
			filesCargando = false;
			filesInicializado = true;
		}
	}

	async function refrescarCache(): Promise<void> {
		filesRefrescando = true;
		filesError = "";
		try {
			const r = await fetch("/api/patyia/openai/files/cache", { method: "POST" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			cacheUpdated = j.updated ?? "";
			toastSuccess(`Cache actualizado · ${j.count} archivos`);
			filesPage = 1;
			await cargarFiles();
		} catch (err) {
			filesError = err instanceof Error ? err.message : String(err);
			toastError(filesError);
		} finally {
			filesRefrescando = false;
		}
	}

	async function descargarTodos(): Promise<void> {
		if (!filesTotal) {
			toastError("No hay archivos en el cache. Refresca primero.");
			return;
		}
		if (!confirm(`Descargar backup local de los ${filesTotal} archivos? Puede tardar.`)) return;
		try {
			const r = await fetch("/api/patyia/openai/files/backup-all", { method: "POST" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			descargandoTodos = true;
			iniciarPolling();
			toastSuccess(`Backup masivo iniciado · ${j.total} archivos`);
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		}
	}

	async function cancelarDescarga(): Promise<void> {
		try {
			const r = await fetch("/api/patyia/openai/files/backup-progress", { method: "DELETE" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			toastSuccess("Cancelación solicitada");
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		}
	}

	async function consultarProgreso(): Promise<void> {
		try {
			const r = await fetch("/api/patyia/openai/files/backup-progress");
			const j = await r.json();
			if (!j.ok) return;
			backupProgreso = {
				running: !!j.running, total: j.total ?? 0, hecho: j.hecho ?? 0,
				exitos: j.exitos ?? 0, fallos: j.fallos ?? 0,
				currentId: j.currentId ?? "", currentFilename: j.currentFilename ?? "",
				cancelRequested: !!j.cancelRequested,
			};
			if (backupProgreso.running) {
				descargandoTodos = true;
			} else if (descargandoTodos) {
				descargandoTodos = false;
				detenerPolling();
				const cancelado = backupProgreso.cancelRequested && backupProgreso.hecho < backupProgreso.total;
				if (cancelado) toastError(`Backup cancelado · ${backupProgreso.exitos}/${backupProgreso.total} ok · ${backupProgreso.fallos} fallos`);
				else toastSuccess(`Backup completado · ${backupProgreso.exitos}/${backupProgreso.total} ok · ${backupProgreso.fallos} fallos`);
			}
		} catch {
			// silencioso
		}
	}

	function iniciarPolling(): void {
		if (pollTimer) return;
		pollTimer = setInterval(() => { void consultarProgreso(); }, 1000);
	}
	function detenerPolling(): void {
		if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
	}

	async function cargarDuplicados(): Promise<void> {
		try {
			const r = await fetch("/api/patyia/openai/files/duplicates");
			const j = await r.json();
			if (j.ok) dupReporte = {
				updated: j.updated ?? "", totalEscaneados: j.totalEscaneados ?? 0, totalConHash: j.totalConHash ?? 0,
				exactGroups: j.exactGroups ?? [], similarGroups: j.similarGroups ?? [],
			};
		} catch {
			// silencioso
		}
	}

	async function abrirDuplicados(): Promise<void> {
		dupAbierto = true;
		await cargarDuplicados();
	}

	async function escanearDuplicados(): Promise<void> {
		dupEscaneando = true;
		try {
			const r = await fetch("/api/patyia/openai/files/duplicates", { method: "POST" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			dupReporte = {
				updated: j.updated, totalEscaneados: j.totalEscaneados, totalConHash: j.totalConHash,
				exactGroups: j.exactGroups, similarGroups: j.similarGroups,
			};
			toastSuccess(`Escaneo · ${j.totalConHash}/${j.totalEscaneados} files · ${j.exactGroups.length} grupos exactos · ${j.similarGroups.length} similares`);
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			dupEscaneando = false;
		}
	}

	async function eliminarDuplicado(id: string): Promise<void> {
		if (!confirm(`Eliminar ${id} de OpenAI? (Irreversible)`)) return;
		dupEliminando = new Set([...dupEliminando, id]);
		try {
			const r = await fetch(`/api/patyia/openai/files/${encodeURIComponent(id)}`, { method: "DELETE" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			dupReporte.exactGroups = dupReporte.exactGroups.map((g) => ({ ...g, items: g.items.filter((it) => it.id !== id) })).filter((g) => g.items.length > 1);
			dupReporte.similarGroups = dupReporte.similarGroups.map((g) => ({ ...g, items: g.items.filter((it) => it.id !== id) })).filter((g) => g.items.length > 1);
			toastSuccess(`Eliminado ${id}`);
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			const next = new Set(dupEliminando);
			next.delete(id);
			dupEliminando = next;
		}
	}

	function formatBytes(n: number): string {
		if (n < 1024) return `${n} B`;
		if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
		return `${(n / 1024 / 1024).toFixed(2)} MB`;
	}

	async function cargarVS(): Promise<void> {
		vsCargando = true;
		vsError = "";
		try {
			const r = await fetch("/api/patyia/openai/vector-stores/cache");
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			vstores = (j.items ?? []) as VectorStore[];
			vsUpdated = j.updated ?? "";
		} catch (err) {
			vsError = err instanceof Error ? err.message : String(err);
			vstores = [];
		} finally {
			vsCargando = false;
		}
	}

	async function refrescarVS(): Promise<void> {
		vsRefrescando = true;
		vsError = "";
		try {
			const r = await fetch("/api/patyia/openai/vector-stores/cache", { method: "POST" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			vstores = (j.items ?? []) as VectorStore[];
			vsUpdated = j.updated ?? "";
			toastSuccess(`Vector Stores · ${j.count} en cache`);
		} catch (err) {
			vsError = err instanceof Error ? err.message : String(err);
			toastError(vsError);
		} finally {
			vsRefrescando = false;
		}
	}

	async function cargarSkills(): Promise<void> {
		skillsCargando = true;
		skillsError = "";
		try {
			const r = await fetch("/api/patyia/openai/skills/cache");
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			skills = (j.items ?? []) as Skill[];
			skillsDisponible = j.available === true;
			skillsUpdated = j.updated ?? "";
		} catch (err) {
			skillsError = err instanceof Error ? err.message : String(err);
			skills = [];
		} finally {
			skillsCargando = false;
		}
	}

	async function refrescarSkills(): Promise<void> {
		skillsRefrescando = true;
		skillsError = "";
		try {
			const r = await fetch("/api/patyia/openai/skills/cache", { method: "POST" });
			const j = await r.json();
			skills = (j.items ?? []) as Skill[];
			skillsDisponible = j.available === true;
			skillsUpdated = j.updated ?? "";
			if (!j.ok) {
				skillsError = j.error ?? "Skills no disponible";
				toastError(skillsError);
			} else {
				toastSuccess(`Skills · ${j.count} en cache`);
			}
		} catch (err) {
			skillsError = err instanceof Error ? err.message : String(err);
			toastError(skillsError);
		} finally {
			skillsRefrescando = false;
		}
	}

	function fmtBytes(n: number): string {
		if (!Number.isFinite(n) || n <= 0) return "0 B";
		const k = 1024;
		const u = ["B", "KB", "MB", "GB"];
		const i = Math.min(u.length - 1, Math.floor(Math.log(n) / Math.log(k)));
		return `${(n / Math.pow(k, i)).toFixed(i === 0 ? 0 : 2)} ${u[i]}`;
	}
	function fmtFecha(ts: number | undefined): string {
		if (!ts) return "-";
		return new Date(ts * 1000).toLocaleString();
	}

	let deleteAbierto: boolean = false;
	let deleteFile: OpenAIFile | null = null;
	let deleteEliminando: boolean = false;

	function pedirEliminar(f: OpenAIFile): void {
		deleteFile = f;
		deleteAbierto = true;
	}

	async function eliminarFile(): Promise<void> {
		if (!deleteFile) return;
		deleteEliminando = true;
		try {
			const r = await fetch(`/api/patyia/openai/files/${encodeURIComponent(deleteFile.id)}`, { method: "DELETE" });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			toastSuccess(`Eliminado ${deleteFile.id}`);
			files = files.filter((x) => x.id !== deleteFile!.id);
			deleteAbierto = false;
			deleteFile = null;
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			deleteEliminando = false;
		}
	}

	// --- Editor local-meta ---
	let editorAbierto: boolean = false;
	let editorFile: OpenAIFile | null = null;
	let editorMeta: LocalMeta = { categorias: [], tags: [], descripcion: "", notas: "", actualizado: "" };
	let editorCargando: boolean = false;
	let editorGuardando: boolean = false;
	let editorCategoriasRaw: string = "";
	let editorTagsRaw: string = "";

	async function abrirEditor(f: OpenAIFile): Promise<void> {
		editorFile = f;
		editorAbierto = true;
		editorCargando = true;
		try {
			const r = await fetch(`/api/patyia/openai/files/${encodeURIComponent(f.id)}/local-meta`);
			const j = await r.json();
			editorMeta = j.ok ? (j.data as LocalMeta) : { categorias: [], tags: [], descripcion: "", notas: "", actualizado: "" };
			editorCategoriasRaw = editorMeta.categorias.join(", ");
			editorTagsRaw = editorMeta.tags.join(", ");
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			editorCargando = false;
		}
	}

	async function guardarEditor(): Promise<void> {
		if (!editorFile) return;
		editorGuardando = true;
		try {
			const body = {
				categorias: editorCategoriasRaw.split(",").map((s) => s.trim()).filter((s) => s !== ""),
				tags: editorTagsRaw.split(",").map((s) => s.trim()).filter((s) => s !== ""),
				descripcion: editorMeta.descripcion,
				notas: editorMeta.notas,
			};
			const r = await fetch(`/api/patyia/openai/files/${encodeURIComponent(editorFile.id)}/local-meta`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body),
			});
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			toastSuccess("Metadatos locales guardados");
			editorAbierto = false;
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			editorGuardando = false;
		}
	}

	// --- Upload ---
	let uploadAbierto: boolean = false;
	let uploadArchivo: File | null = null;
	let uploadPurpose: string = "assistants";
	let uploadEnviando: boolean = false;

	function onArchivoSeleccionado(e: Event): void {
		const target = e.target as HTMLInputElement;
		uploadArchivo = target.files && target.files.length > 0 ? target.files[0] : null;
	}

	async function enviarUpload(): Promise<void> {
		if (!uploadArchivo) {
			toastError("Selecciona un archivo");
			return;
		}
		uploadEnviando = true;
		try {
			const fd = new FormData();
			fd.append("file", uploadArchivo, uploadArchivo.name);
			fd.append("purpose", uploadPurpose);
			const r = await fetch("/api/patyia/openai/files", { method: "POST", body: fd });
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			toastSuccess(`Subido ${j.file?.id ?? ""}`);
			uploadAbierto = false;
			uploadArchivo = null;
			await cargarFiles();
		} catch (err) {
			toastError(err instanceof Error ? err.message : String(err));
		} finally {
			uploadEnviando = false;
		}
	}

	onMount(() => {
		tab2 = leerTab2();
		cargarFiles();
		cargarVS();
		cargarSkills();
		void consultarProgreso().then(() => {
			if (backupProgreso.running) iniciarPolling();
		});
	});

	onDestroy(() => {
		detenerPolling();
	});
</script>

<div class="storage-panel">
	<FlexLayout items="center" class="tabs-bar">
		<Button variant={tab2 === "files" ? "solid" : "outlined"} onClick={() => setTab2("files")}>Files</Button>
		<Button variant={tab2 === "vs" ? "solid" : "outlined"} onClick={() => setTab2("vs")}>Vector Stores</Button>
		<Button variant={tab2 === "skills" ? "solid" : "outlined"} onClick={() => setTab2("skills")}>Skills</Button>
	</FlexLayout>

	{#if tab2 === "files"}
		<div class="tab-body">
			<div class="filtros-grid">
				<SelectEnum bind:value={purposeFiltro} enumValue={PURPOSES} label="Purpose" />
				<Input bind:value={busquedaFiles} label="Buscar por id o nombre" required={false} />
				<FlexLayout items="center" justify="end" class="botones-fila">
					<ButtonIconify icon="mdi:database-arrow-down-outline" onClick={cargarFiles} disabled={filesCargando || filesRefrescando} loading={filesCargando} title="Cargar cache" />
					<ButtonIconify icon="mdi:cloud-sync-outline" onClick={refrescarCache} disabled={filesRefrescando} loading={filesRefrescando} title="Refrescar desde OpenAI" />
					{#if descargandoTodos}
						<ButtonIconify icon="mdi:download-off-outline" onClick={cancelarDescarga} disabled={backupProgreso.cancelRequested} title={backupProgreso.cancelRequested ? "Cancelando…" : "Cancelar descarga en progreso"} />
					{:else}
						<ButtonIconify icon="mdi:download-multiple" onClick={descargarTodos} disabled={!filesTotal} title="Descargar todos (backup local)" />
					{/if}
					<ButtonIconify icon="mdi:cloud-upload-outline" onClick={() => (uploadAbierto = true)} title="Subir archivo" />
					<ButtonIconify icon="mdi:content-duplicate" onClick={abrirDuplicados} title="Buscar duplicados / similares" />
				</FlexLayout>
			</div>

			{#if descargandoTodos || backupProgreso.hecho > 0}
				<div class="backup-progreso" class:terminado={!descargandoTodos}>
					<div class="barra"><div class="fill" style="width: {backupProgreso.total ? (backupProgreso.hecho / backupProgreso.total * 100) : 0}%"></div></div>
					<div class="texto">
						<strong>{backupProgreso.hecho}</strong> / {backupProgreso.total}
						· ok {backupProgreso.exitos} · fallos {backupProgreso.fallos}
						{#if backupProgreso.running && backupProgreso.currentFilename}
							· <em>{backupProgreso.currentFilename}</em>
						{/if}
						{#if backupProgreso.cancelRequested && backupProgreso.running} · <span class="cancelando">cancelando…</span>{/if}
					</div>
				</div>
			{/if}

			{#if filesError}
				<div class="error">{filesError}</div>
			{/if}

			<div class="tabla-wrap">
				<table class="tabla">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th>Purpose</th>
							<th>Tamaño</th>
							<th>Creado</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{#each files as f (f.id)}
							<tr>
								<td class="mono" title={f.id}>{idCorto(f.id)}</td>
								<td>{f.filename}</td>
								<td><span class="badge">{f.purpose}</span></td>
								<td>{fmtBytes(f.bytes)}</td>
								<td>{fmtFecha(f.created_at)}</td>
								<td class="col-acciones">
									<FlexLayout items="center">
										<ButtonIconify icon="mdi:tag-text-outline" onClick={() => abrirEditor(f)} title="Editar metadatos locales" />
										<ButtonIconify icon="mdi:delete-outline" color="danger" onClick={() => pedirEliminar(f)} title="Eliminar en OpenAI" />
									</FlexLayout>
								</td>
							</tr>
						{:else}
							<tr><td colspan="6" class="vacio">{filesCargando ? "Cargando…" : "Sin resultados. Pulsa Refrescar para sincronizar con OpenAI."}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
			<FlexLayout items="center" justify="between" class="paginacion">
				<div class="resumen">
					Mostrando {files.length} de {filesTotalFiltrado}
					{#if filesTotalFiltrado !== filesTotal}(filtrado de {filesTotal}){/if}
					{#if cacheUpdated}· Actualizado: {new Date(cacheUpdated).toLocaleString()}{/if}
				</div>
				<FlexLayout items="center" class="paginacion-botones">
					<ButtonIconify icon="mdi:chevron-double-left" onClick={() => irPagina(1)} disabled={filesPage <= 1 || filesCargando} title="Primera" />
					<ButtonIconify icon="mdi:chevron-left" onClick={() => irPagina(filesPage - 1)} disabled={filesPage <= 1 || filesCargando} title="Anterior" />
					<span class="pag-info">Página {filesPage} / {filesTotalPages}</span>
					<ButtonIconify icon="mdi:chevron-right" onClick={() => irPagina(filesPage + 1)} disabled={filesPage >= filesTotalPages || filesCargando} title="Siguiente" />
					<ButtonIconify icon="mdi:chevron-double-right" onClick={() => irPagina(filesTotalPages)} disabled={filesPage >= filesTotalPages || filesCargando} title="Última" />
				</FlexLayout>
			</FlexLayout>
		</div>
	{:else if tab2 === "vs"}
		<div class="tab-body">
			<FlexLayout items="center" justify="end" class="botones-fila">
				<Button onClick={cargarVS} disabled={vsCargando || vsRefrescando} loading={vsCargando}>Cargar cache</Button>
				<Button onClick={refrescarVS} disabled={vsRefrescando} loading={vsRefrescando}>Refrescar</Button>
			</FlexLayout>
			{#if vsError}
				<div class="error">{vsError}</div>
			{/if}
			<div class="tabla-wrap">
				<table class="tabla">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th>Status</th>
							<th>Files</th>
							<th>Tamaño</th>
							<th>Creado</th>
						</tr>
					</thead>
					<tbody>
						{#each vstores as vs (vs.id)}
							<tr>
								<td class="mono" title={vs.id}>{idCorto(vs.id)}</td>
								<td>{vs.name}</td>
								<td><span class="badge">{vs.status ?? "-"}</span></td>
								<td>{vs.file_counts?.completed ?? 0}/{vs.file_counts?.total ?? 0}</td>
								<td>{fmtBytes(vs.bytes ?? 0)}</td>
								<td>{fmtFecha(vs.created_at)}</td>
							</tr>
						{:else}
							<tr><td colspan="6" class="vacio">{vsCargando ? "Cargando…" : "Sin vector stores. Pulsa Refrescar."}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="resumen">
				Total: {vstores.length}
				{#if vsUpdated}· Actualizado: {new Date(vsUpdated).toLocaleString()}{/if}
			</div>
		</div>
	{:else if tab2 === "skills"}
		<div class="tab-body">
			<FlexLayout items="center" justify="end" class="botones-fila">
				<Button onClick={cargarSkills} disabled={skillsCargando || skillsRefrescando} loading={skillsCargando}>Cargar cache</Button>
				<Button onClick={refrescarSkills} disabled={skillsRefrescando} loading={skillsRefrescando}>Refrescar</Button>
				{#if !skillsDisponible && !skillsCargando && !skillsRefrescando}
					<span class="badge danger">API no disponible en tu cuenta</span>
				{/if}
			</FlexLayout>
			{#if skillsError}
				<div class="error">{skillsError}</div>
			{/if}
			<div class="tabla-wrap">
				<table class="tabla">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th>Descripción</th>
						</tr>
					</thead>
					<tbody>
						{#each skills as s, i (s.id ?? i)}
							<tr>
								<td class="mono" title={s.id ?? ""}>{s.id ? idCorto(s.id) : "-"}</td>
								<td>{s.name ?? "-"}</td>
								<td>{s.description ?? ""}</td>
							</tr>
						{:else}
							<tr><td colspan="3" class="vacio">{skillsCargando ? "Cargando…" : "Sin skills"}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="resumen">
				Total: {skills.length}
				{#if skillsUpdated}· Actualizado: {new Date(skillsUpdated).toLocaleString()}{/if}
			</div>
		</div>
	{/if}
</div>

{#if editorAbierto && editorFile}
	<Modal bind:bshow={editorAbierto} onClose={() => (editorAbierto = false)} style="width: 80vw; max-width: 720px;">
		<h3 slot="title">Metadatos locales · {editorFile.filename}</h3>
		<div class="modal-body">
		{#if editorCargando}
			<p>Cargando…</p>
		{:else}
			<div class="form">
				<label>
					<span>Categorías (separadas por coma)</span>
					<input type="text" bind:value={editorCategoriasRaw} placeholder="inventarios, contabilidad…" />
				</label>
				<label>
					<span>Tags (separados por coma)</span>
					<input type="text" bind:value={editorTagsRaw} placeholder="manual, faq, v2…" />
				</label>
				<label>
					<span>Descripción</span>
					<textarea rows="3" bind:value={editorMeta.descripcion}></textarea>
				</label>
				<label>
					<span>Notas internas</span>
					<textarea rows="5" bind:value={editorMeta.notas}></textarea>
				</label>
				<small class="hint">
					Estos datos quedan en <code>data/openai-storage/files/{editorFile.id}/local.json</code>. NO se envían a OpenAI.
				</small>
				<FlexLayout items="center" justify="end" class="botones-fila">
					<Button onClick={() => (editorAbierto = false)} variant="outlined">Cancelar</Button>
					<Button onClick={guardarEditor} disabled={editorGuardando || editorCargando} loading={editorGuardando}>Guardar</Button>
				</FlexLayout>
			</div>
		{/if}
		</div>
	</Modal>
{/if}

{#if uploadAbierto}
	<Modal bind:bshow={uploadAbierto} onClose={() => (uploadAbierto = false)} style="width: 80vw; max-width: 520px;">
		<h3 slot="title">Subir archivo a OpenAI Files</h3>
		<div class="modal-body">
			<div class="form">
				<label>
					<span>Archivo</span>
					<input type="file" on:change={onArchivoSeleccionado} />
				</label>
				<label>
					<span>Purpose</span>
					<SelectEnum bind:value={uploadPurpose} enumValue={UPLOAD_PURPOSES} />
				</label>
				<FlexLayout items="center" justify="end" class="botones-fila">
					<Button onClick={() => (uploadAbierto = false)} variant="outlined">Cancelar</Button>
					<Button onClick={enviarUpload} disabled={uploadEnviando || !uploadArchivo} loading={uploadEnviando}>Subir</Button>
				</FlexLayout>
			</div>
		</div>
	</Modal>
{/if}

{#if deleteAbierto && deleteFile}
	<Modal bind:bshow={deleteAbierto} onClose={() => (deleteAbierto = false)} style="width: 80vw; max-width: 520px;">
		<h3 slot="title">Eliminar archivo</h3>
		<div class="modal-body">
			<p>¿Eliminar el archivo <strong>{deleteFile.filename}</strong>?</p>
			<p class="mono small">{deleteFile.id}</p>
			<p class="hint">Esta acción es irreversible en OpenAI. El backup local (si existe) NO se borra.</p>
			<FlexLayout items="center" justify="end" class="botones-fila">
				<Button onClick={() => (deleteAbierto = false)} variant="outlined" disabled={deleteEliminando}>Cancelar</Button>
				<Button onClick={eliminarFile} color="danger" loading={deleteEliminando} disabled={deleteEliminando}>Eliminar</Button>
			</FlexLayout>
		</div>
	</Modal>
{/if}

{#if dupAbierto}
	<Modal bind:bshow={dupAbierto} onClose={() => (dupAbierto = false)} style="width: 92vw; max-width: 980px;">
		<h3 slot="title">Duplicados y similares</h3>
		<div class="modal-body dup-modal">
			<FlexLayout items="center" justify="between" class="dup-toolbar">
				<div class="dup-resumen">
					{#if dupReporte.updated}
						Escaneado: <strong>{dupReporte.totalConHash}</strong> / {dupReporte.totalEscaneados} files ·
						<strong>{dupReporte.exactGroups.length}</strong> grupos exactos ·
						<strong>{dupReporte.similarGroups.length}</strong> grupos similares
						<span class="hint">({new Date(dupReporte.updated).toLocaleString()})</span>
					{:else}
						<span class="hint">Aún no se ha escaneado.</span>
					{/if}
				</div>
				<Button onClick={escanearDuplicados} loading={dupEscaneando} disabled={dupEscaneando}>
					{dupReporte.updated ? "Re-escanear" : "Escanear ahora"}
				</Button>
			</FlexLayout>

			{#if dupReporte.exactGroups.length}
				<h4>Duplicados exactos (hash SHA-256 idéntico)</h4>
				<div class="dup-listado">
					{#each dupReporte.exactGroups as g (g.hash)}
						<div class="dup-grupo">
							<div class="dup-grupo-head">
								<span class="mono small">{g.hash.slice(0, 12)}…</span>
								· {g.items.length} archivos · {formatBytes(g.bytes)}
							</div>
							{#each g.items as it (it.id)}
								<div class="dup-item">
									<span class="dup-name">{it.filename}</span>
									<span class="mono small">{it.id}</span>
									<ButtonIconify icon="mdi:delete-outline" onClick={() => eliminarDuplicado(it.id)} disabled={dupEliminando.has(it.id)} loading={dupEliminando.has(it.id)} title="Eliminar de OpenAI" />
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/if}

			{#if dupReporte.similarGroups.length}
				<h4>Posibles similares (mismo nombre normalizado, hash distinto)</h4>
				<div class="dup-listado">
					{#each dupReporte.similarGroups as g (g.key)}
						<div class="dup-grupo">
							<div class="dup-grupo-head">
								<span class="mono small">{g.key}</span>
								· {g.items.length} archivos
							</div>
							{#each g.items as it (it.id)}
								<div class="dup-item">
									<span class="dup-name">{it.filename}</span>
									<span class="mono small">{it.id}</span>
									<span class="dup-bytes">{formatBytes(it.bytes)}</span>
									<ButtonIconify icon="mdi:delete-outline" onClick={() => eliminarDuplicado(it.id)} disabled={dupEliminando.has(it.id)} loading={dupEliminando.has(it.id)} title="Eliminar de OpenAI" />
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/if}

			{#if dupReporte.updated && !dupReporte.exactGroups.length && !dupReporte.similarGroups.length}
				<p class="hint">Sin duplicados ni similares detectados.</p>
			{/if}
		</div>
	</Modal>
{/if}

<style>
	.storage-panel {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.backup-progreso {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--isp-border, #c2d4e8);
		border-radius: 0.4rem;
		background: var(--isp-bg-alt, #f3f7fb);
		font-size: 0.85rem;
	}
	.backup-progreso.terminado {
		opacity: 0.75;
	}
	.backup-progreso .barra {
		width: 100%;
		height: 0.5rem;
		background: var(--isp-border, #d0dce8);
		border-radius: 999px;
		overflow: hidden;
	}
	.backup-progreso .fill {
		height: 100%;
		background: var(--isp-primary, #2b6cb0);
		transition: width 0.4s ease;
	}
	.backup-progreso .texto em {
		font-style: italic;
		color: var(--isp-text-muted, #4a5b6e);
	}
	.backup-progreso .cancelando {
		color: var(--isp-danger, #c53030);
		font-weight: 600;
	}
	.dup-modal {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-height: 70vh;
		overflow-y: auto;
	}
	.dup-toolbar {
		gap: 0.75rem;
	}
	.dup-resumen {
		font-size: 0.9rem;
	}
	.dup-listado {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.dup-grupo {
		border: 1px solid var(--isp-border, #c2d4e8);
		border-radius: 0.4rem;
		padding: 0.5rem 0.75rem;
		background: var(--isp-bg-alt, #f6f9fc);
	}
	.dup-grupo-head {
		font-size: 0.85rem;
		margin-bottom: 0.35rem;
		color: var(--isp-text-muted, #4a5b6e);
	}
	.dup-item {
		display: grid;
		grid-template-columns: 1fr auto auto auto;
		gap: 0.5rem;
		align-items: center;
		padding: 0.2rem 0;
		border-top: 1px dashed var(--isp-border, #d0dce8);
		font-size: 0.85rem;
	}
	.dup-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.dup-bytes {
		font-size: 0.8rem;
		color: var(--isp-text-muted, #4a5b6e);
	}
	.tab-body {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.search {
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--is-b-color, #80808050);
		border-radius: 6px;
		min-width: 220px;
		background: transparent;
		color: inherit;
	}
	.filtros-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.75rem;
		align-items: end;
	}
	@media (max-width: 800px) {
		.filtros-grid { grid-template-columns: 1fr; }
	}
	.storage-panel :global(.botones-fila) {
		display: flex;
		flex-wrap: nowrap;
		gap: 0.5rem;
	}
	.storage-panel :global(.botones-fila button) {
		width: fit-content;
	}
	.storage-panel :global(.tabs-bar) {
		gap: 0.5rem;
	}
	.storage-panel :global(.tabs-bar button) {
		width: fit-content;
	}
	.modal-body {
		padding: 1rem 1.25rem;
	}
	.tabla-wrap {
		overflow: auto;
		border: 1px solid var(--is-b-color, #80808030);
		border-radius: 6px;
	}
	.tabla {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.85rem;
	}
	.tabla thead th {
		text-align: left;
		padding: 0.4rem 0.6rem;
		background: color-mix(in srgb, var(--is-primary, #555) 15%, transparent);
		position: sticky;
		top: 0;
	}
	.tabla tbody td {
		padding: 0.35rem 0.6rem;
		border-top: 1px solid var(--is-b-color, #80808020);
		vertical-align: middle;
	}
	.tabla tr:hover td {
		background: color-mix(in srgb, var(--is-primary, #555) 8%, transparent);
	}
	.mono {
		font-family: ui-monospace, "Cascadia Code", Menlo, monospace;
		font-size: 0.78rem;
		white-space: nowrap;
	}
	.col-acciones {
		white-space: nowrap;
		width: 1%;
	}
	.badge {
		display: inline-block;
		padding: 0.1rem 0.45rem;
		border-radius: 999px;
		font-size: 0.75rem;
		background: color-mix(in srgb, var(--is-primary, #555) 25%, transparent);
	}
	.badge.danger {
		background: color-mix(in srgb, #d9534f 35%, transparent);
	}
	.vacio {
		text-align: center;
		opacity: 0.6;
		padding: 1rem;
	}
	.error {
		padding: 0.5rem 0.75rem;
		border: 1px solid #d9534f;
		border-radius: 6px;
		color: #d9534f;
		background: color-mix(in srgb, #d9534f 10%, transparent);
		font-size: 0.85rem;
	}
	.resumen {
		font-size: 0.78rem;
		opacity: 0.7;
	}
	:global(.paginacion) {
		margin-top: 0.5rem;
		padding: 0.4rem 0.25rem 0;
		border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent);
	}
	:global(.paginacion-botones) {
		gap: 0.25rem;
	}
	.pag-info {
		font-size: 0.78rem;
		opacity: 0.85;
		padding: 0 0.5rem;
		min-width: 7.5rem;
		text-align: center;
		white-space: nowrap;
	}
	.hint {
		font-size: 0.78rem;
		opacity: 0.7;
		margin: 0;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.form label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.85rem;
	}
	.form input[type="text"],
	.form textarea {
		padding: 0.4rem 0.6rem;
		border: 1px solid var(--is-b-color, #80808050);
		border-radius: 6px;
		background: transparent;
		color: inherit;
		font: inherit;
		resize: vertical;
	}
</style>
