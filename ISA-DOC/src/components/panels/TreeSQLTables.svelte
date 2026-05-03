<script lang="ts">
	import { onMount } from "svelte";
	import { Button, ButtonIconify, Card, FlexLayout, H2, H4, Iconify, Modal, Text, Toaster, toastError, toastSuccess } from "@ingenieria_insoft/ispsveltecomponents";
	import {
		emitDropTable,
		emitTable,
		effectiveTableName,
		isSqlSnippetEnabled,
		newTableId,
		type ParsedTable,
	} from "../../lib/tableSchema.ts";
	import { generateResourcesFromTables } from "../../lib/codeGen/autogen.ts";
	import { genAzureFn, genClient, genModelo, genServer } from "../../lib/codeGen/generators.ts";
	import { findDomainOf, getSlaves, isMaster as isMasterFn, type DomainsMap } from "../../lib/codeGen/domains.ts";
	import { getCached, setCached, loadStateFromServer, reloadStateFromServer, onStateChanged } from "../../lib/codeGen/stateClient.ts";
	import { isRealtimeEnabled } from "../../lib/realtimeFlag.ts";
	import type { ResourceConfig, FieldDef } from "../../lib/codeGen/types.ts";
	import SqlTreeEditor from "../editors/SqlTreeEditor.svelte";
	import CodeViewer from "../viewers/CodeViewer.svelte";
	import CodeModal from "../viewers/CodeModal.svelte";
	import DocInfoModal from "../viewers/DocInfoModal.svelte";
	import InfoEditModal from "../viewers/InfoEditModal.svelte";
	import TreeView from "../_comps/TreeView/TreeRowView.svelte";
	import { TreeSQLTablesAdapter, type TablesBrowserState } from "./tables-browser/TreeSQLTablesAdapter";
	import ResourceConfigSections from "./tables-browser/ResourceConfigSections.svelte";

	let tables: ParsedTable[] = [];
	let loading = true;
	let saving = false;
	let generating = false;
	let dirty = false;
	let selectedKey: string | null = null;
	let prodTsMap: Record<string, any[]> = {};

	let modalShow = false;
	let modalTitle = "";
	let modalValue = "";
	let modalLanguage: "sql" | "ts" = "sql";
	let modalCompare: string | null = null;
	let modalCompareLabel = "Prod";

	let runUnlocked: Record<string, boolean> = {};
	let runBusy: Record<string, boolean> = {};

	let bshowTreeModal: boolean = false;

	let sqlPreviewShow: boolean = false;
	let sqlPreviewValue: string = "";
	let sqlPreviewExecuting: boolean = false;
	let sqlPreviewUnlocked: boolean = false;

	let overrides: Record<string, never> = {};
	void overrides;
	let activeCodeTab: "sql" | "model" | "server" | "client" | "azure" = "sql";
	let targetFilePaths: string[] = [];
	let domains: DomainsMap = {};

	type NodeInfo = { description?: string; rules?: string };
	type NodeInfoMap = Record<string, NodeInfo>;
	let nodeInfo: NodeInfoMap = {};
	function loadNodeInfo(): void {
		const v = getCached("nodeInfo");
		nodeInfo = v && typeof v === "object" ? (v as NodeInfoMap) : {};
	}
	function getInfo(key: string): NodeInfo {
		const e = nodeInfo[key];
		return { description: e?.description ?? "", rules: e?.rules ?? "" };
	}
	function saveInfo(key: string, payload: NodeInfo): void {
		const existing = nodeInfo[key] ?? { description: "", rules: "" };
		const nextDesc = (payload.description ?? existing.description ?? "").trim();
		const nextRules = payload.rules ?? existing.rules ?? "";
		if (!nextDesc) {
			toastError("La descripción es obligatoria para todos los nodos.");
			nodeInfo = { ...nodeInfo };
			return;
		}
		nodeInfo = { ...nodeInfo, [key]: { description: nextDesc, rules: nextRules } };
		setCached("nodeInfo", nodeInfo);
	}
	const PANEL_INFO_KEY = "panel:sql-tree";
	$: panelInfo = (nodeInfo[PANEL_INFO_KEY] ?? { description: "", rules: "" }) as NodeInfo;

	function infoKeyOf(obj: { kind?: string; domainId?: string; prefix?: string; rowName?: string; tableKey?: string }): string {
		if (!obj || !obj.kind) return "";
		if (obj.kind === "prefix") return `prefix:${String(obj.prefix ?? obj.rowName ?? "")}`;
		if (obj.kind === "domain" || obj.kind === "pivot") return `domain:${String(obj.domainId ?? "")}`;
		if (obj.kind === "table") return `table:${String(obj.tableKey ?? "")}`;
		return "";
	}

	/** Canal de sincronización entre pestañas del navegador para `/api/tables`. */
	const TABLES_BROADCAST_CHANNEL = "isa-doc:tables";
	let tablesChannel: BroadcastChannel | null = null;
	let tabId: string = "";

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
		const v = getCached("targetFilePaths");
		if (Array.isArray(v) && v.every((s) => typeof s === "string")) {
			targetFilePaths = v as string[];
			return;
		}
		targetFilePaths = [...DEFAULT_TARGET_PATHS];
		setCached("targetFilePaths", targetFilePaths);
	}

	function openTreeModal(): void { bshowTreeModal = true; }
	function closeTreeModal(): void { bshowTreeModal = false; }

	function toggleRunLock(key: string): void {
		runUnlocked = { ...runUnlocked, [key]: !runUnlocked[key] };
	}

	async function runCode(key: string, code: string, language: "sql" | "ts"): Promise<void> {
		if (!runUnlocked[key] || runBusy[key]) return;
		runBusy = { ...runBusy, [key]: true };
		try {
			const r = await fetch("/api/run", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ key, code, language }),
			});
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			toastSuccess(`Ejecutado: ${key}`);
		} catch (err) {
			toastError(`Error ejecutando ${key}: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			runBusy = { ...runBusy, [key]: false };
			runUnlocked = { ...runUnlocked, [key]: false };
		}
	}

	const adapter = new TreeSQLTablesAdapter([], onAdapterChange);
	adapter.onTableSelect = (key) => { selectedKey = key; };
	adapter.onDomainsChange = (d) => { domains = d; };
	adapter.onCascadeAddDomain = () => {
		adapter.addDomainAtFocus();
		toastSuccess(`Dominio creado. Marca una tabla como master desde el árbol.`);
	};
	adapter.onCascadeAddPivot = () => {
		adapter.addPivotAtFocus();
		toastSuccess(`Pivote creado. Marca una tabla como master y agrega dominios o tablas miembros.`);
	};
	adapter.onCascadeAddPrefix = () => {
		adapter.addPrefixAtFocus();
		toastSuccess(`Prefijo creado. Renómbralo y agrega tablas o subgrupos.`);
	};
	adapter.onCascadeAddChildPrefix = (parent) => {
		const parentKey = parent.kind === "domain"
			? `domain:${parent.domainId ?? ""}`
			: parent.kind === "pivot"
				? `pivot:${parent.domainId ?? ""}`
			: parent.kind === "prefix"
				? `prefix:${parent.prefix ?? ""}`
				: "";
		adapter.addEmptyPrefix(parentKey);
		toastSuccess(`Prefijo creado como hijo. Renómbralo desde el árbol.`);
	};
	adapter.onGenerateSql = () => { void generateSql(); };
	domains = adapter.domains;
	const adapterAny = adapter as any;

	function tableKey(t: ParsedTable): string {
		return t.id;
	}

	function isHistorialDerived(t: ParsedTable): boolean {
		// HISTORIAL virtual tables son derivadas de auto-stack: empiezan con
		// "HISTORIAL" y no llevan la marca autoStack (esa la lleva la maestra).
		return t.name.startsWith("HISTORIAL") && !t.autoStack;
	}

	function setTables(list: ParsedTable[]): void {
		tables = list;
		adapter.setTables(tables);
		if (selectedKey && !tables.some((t) => tableKey(t) === selectedKey)) selectedKey = null;
		if (!selectedKey && tables[0]) selectedKey = tableKey(tables[0]);
	}

	function onAdapterChange(state: TablesBrowserState): void {
		// Persistir orden y/o renombrados de inmediato para que el árbol conserve
		// el reordenamiento en la próxima carga.
		const sameOrder =
			state.tables.length === tables.length &&
			state.tables.every((t, i) =>
				t.name === tables[i]?.name && (t.effectivePrefix ?? "") === (tables[i]?.effectivePrefix ?? ""),
			);
		if (state.prefixRenames.length === 0 && sameOrder) return;
		tables = state.tables;
		// Mantener el adapter sincronizado con el nuevo estado para que sus
		// próximas operaciones (rebuildRows, emitChange) usen `effectivePrefix`
		// actualizado y no se generen ciclos por estado divergente.
		(adapter as TreeSQLTablesAdapter).syncTablesQuiet(tables);
		dirty = true;
		scheduleSave();
	}

	$: selected = (() => {
		if (!selectedKey) return null;
		const idx = tables.findIndex((t) => tableKey(t) === selectedKey);
		if (idx < 0) return null;
		return { table: tables[idx], index: idx };
	})();

	$: autogen = generateResourcesFromTables(tables);
	$: tablesPlain = tables.map((t) => ({ ...t, customization: undefined }));
	$: inferredAutogen = generateResourcesFromTables(tablesPlain);
	$: resByTable = new Map(autogen.resources.map((r) => [r.tableName.toUpperCase(), r]));
	$: inferredById = Object.fromEntries(inferredAutogen.resources.map((r) => [r.id, r])) as Record<string, ResourceConfig>;
	$: mergedResources = autogen.resources;
	$: mergedById = Object.fromEntries(mergedResources.map((r) => [r.id, r])) as Record<string, ResourceConfig>;
	$: mergedByTable = new Map(mergedResources.map((r) => [r.tableName.toUpperCase(), r]));

	$: selectedIsMaster = !!(selected && isMasterFn(domains, selected.table.id));
	$: selectedSlaves = selected ? getSlaves(domains, selected.table.id) : [];
	$: selectedSlaveNames = (selectedSlaves ?? []).map((sid) => tables.find((tt) => tt.id === sid)).filter((tt): tt is ParsedTable => !!tt).map((tt) => effectiveTableName(tt));
	$: selectedDomain = selected ? findDomainOf(domains, selected.table.id) : undefined;
	$: if (activeCodeTab === "azure" && !selectedIsMaster) activeCodeTab = "sql";

	async function handleCfgChange(id: string): Promise<void> {
		const inferred = inferredById[id];
		const merged = mergedById[id];
		if (!inferred || !merged) return;
		const t = tables.find((tt) => tt.name.toUpperCase() === merged.tableName.toUpperCase());
		if (!t) return;
		const idx = tables.indexOf(t);
		const cust = buildCustomizationFromMerged(merged, inferred);
		tables[idx] = { ...t, customization: Object.keys(cust).length ? cust : undefined };
		tables = tables;
		adapter.setTables(tables);
		dirty = true;
		scheduleSave();
	}

	function buildCustomizationFromMerged(
		merged: ResourceConfig,
		inferred: ResourceConfig,
	): NonNullable<ParsedTable["customization"]> {
		const out: NonNullable<ParsedTable["customization"]> = {};
		const eq = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);
		if (merged.id !== inferred.id) out.resourceId = merged.id;
		if (merged.className !== inferred.className) out.className = merged.className;
		if ((merged.tableConst ?? undefined) !== (inferred.tableConst ?? undefined)) out.tableConst = merged.tableConst;
		if (merged.module !== inferred.module) out.module = merged.module;
		if (merged.singularApi !== inferred.singularApi) out.singularApi = merged.singularApi;
		if (merged.pluralApi !== inferred.pluralApi) out.pluralApi = merged.pluralApi;
		if (merged.singularCaption !== inferred.singularCaption) out.singularCaption = merged.singularCaption;
		if (merged.pluralCaption !== inferred.pluralCaption) out.pluralCaption = merged.pluralCaption;
		if (merged.isysRecurso !== inferred.isysRecurso) out.isysRecurso = merged.isysRecurso;
		if (merged.parentBaseClass !== inferred.parentBaseClass) out.parentBaseClass = merged.parentBaseClass;
		if (merged.clientBaseClass !== inferred.clientBaseClass) out.clientBaseClass = merged.clientBaseClass;
		if (merged.uiBaseKind !== inferred.uiBaseKind) out.uiBaseKind = merged.uiBaseKind;
		if (!eq(merged.omitOps ?? [], inferred.omitOps ?? [])) out.omitOps = merged.omitOps ? [...merged.omitOps] : undefined;
		if ((merged.exposeInFn ?? undefined) !== (inferred.exposeInFn ?? undefined)) out.exposeInFn = merged.exposeInFn;
		if ((merged.orderBy ?? undefined) !== (inferred.orderBy ?? undefined)) out.orderBy = merged.orderBy;
		if (!eq(merged.relations ?? [], inferred.relations ?? [])) {
			out.relations = (merged.relations ?? []).map((r) => ({
				alias: r.alias,
				kind: r.kind,
				target: r.target,
				versus: r.versus.map((v) => ({ ...v })),
				equals: r.equals.map((e) => ({ ...e })),
				insertEffect: r.insertEffect,
				customWhere: r.customWhere,
			}));
		}
		if (!eq(merged.customHooks ?? [], inferred.customHooks ?? [])) {
			out.customHooks = (merged.customHooks ?? []).map((h) => ({ ...h }));
		}
		if (!eq(merged.helpers ?? [], inferred.helpers ?? [])) {
			out.helpers = (merged.helpers ?? []).map((h) => ({ ...h }));
		}
		if (merged.targetFiles && Object.keys(merged.targetFiles).length) {
			out.targetFiles = { ...merged.targetFiles };
		}
		const fOv: Record<string, NonNullable<NonNullable<ParsedTable["customization"]>["fieldOverrides"]>[string]> = {};
		const infByName = new Map<string, FieldDef>(inferred.fields.map((f) => [f.name, f]));
		for (const f of merged.fields) {
			const inf = infByName.get(f.name);
			if (!inf) continue;
			const ov: NonNullable<NonNullable<ParsedTable["customization"]>["fieldOverrides"]>[string] = {};
			if ((f.caption ?? undefined) !== (inf.caption ?? undefined)) ov.caption = f.caption;
			if ((f.visible ?? undefined) !== (inf.visible ?? undefined)) ov.visible = f.visible;
			if ((f.required ?? undefined) !== (inf.required ?? undefined)) ov.required = f.required;
			if ((f.defaultValue ?? undefined) !== (inf.defaultValue ?? undefined)) ov.defaultValue = f.defaultValue;
			if ((f.fk ?? undefined) !== (inf.fk ?? undefined)) ov.fk = f.fk;
			if ((f.enumName ?? undefined) !== (inf.enumName ?? undefined)) ov.enumName = f.enumName;
			if (Object.keys(ov).length) fOv[f.name] = ov;
		}
		if (Object.keys(fOv).length) out.fieldOverrides = fOv;
		return out;
	}

	function onTableChange(idx: number, t: ParsedTable): void {
		tables[idx] = { ...t };
		tables = tables;
		adapter.setTables(tables);
		dirty = true;
		scheduleSave();
	}

	/**
	 * Activa o desactiva la generación de un snippet (`sql` por ahora) para la
	 * tabla seleccionada. Persiste el flag en `t.snippets` y, si se desactivó
	 * el SQL estando en esa pestaña, mueve el foco a otra pestaña visible.
	 */
	function setTableSnippet(idx: number, key: "sql", enabled: boolean): void {
		const t = tables[idx];
		if (!t) return;
		const current = (t.snippets ?? {}) as NonNullable<ParsedTable["snippets"]>;
		const nextFlag: boolean | undefined = enabled ? undefined : false;
		const nextSnippets: NonNullable<ParsedTable["snippets"]> = { ...current };
		if (nextFlag === undefined) delete (nextSnippets as Record<string, unknown>)[key];
		else nextSnippets[key] = nextFlag;
		const cleaned = Object.keys(nextSnippets).length ? nextSnippets : undefined;
		tables[idx] = { ...t, snippets: cleaned };
		tables = tables;
		adapter.setTables(tables);
		if (key === "sql" && !enabled && activeCodeTab === "sql") {
			activeCodeTab = "model";
		}
		dirty = true;
		scheduleSave();
	}

	async function load(): Promise<void> {
		try {
			loading = true;
			dirty = false;
			const r = await fetch("/api/tables");
			const data = (await r.json()) as { ok?: boolean; tables?: ParsedTable[]; error?: string };
			if (!r.ok || !data.ok || !data.tables) throw new Error(data.error ?? `HTTP ${r.status}`);
			// Backfill de id estable: tablas legacy persistidas antes de la migración
			// llegan sin `id`. Asignamos uno aquí y marcamos `dirty` para round-tripear
			// los ids al server en el siguiente save.
			let backfilled = false;
			for (const t of data.tables) {
				if (!t.id) { t.id = newTableId(); backfilled = true; }
			}
			setTables(data.tables);
			if (backfilled) { dirty = true; void save(true); }
		} catch (err) {
			toastError(`Error cargando tablas: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			loading = false;
		}
	}

	async function save(silent = false): Promise<void> {
		if (saving) return;
		saving = true;
		try {
			const r = await fetch("/api/tables", {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ tables }),
				keepalive: true,
			});
			const data = (await r.json()) as { ok?: boolean; error?: string };
			if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
			if (!silent) toastSuccess(`Tablas guardadas (${tables.length})`);
			dirty = false;
			broadcastTablesUpdated();
		} catch (err) {
			toastError(`Error guardando: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			saving = false;
		}
	}

	/**
	 * Debounce de 1 segundo para guardar el árbol completo. Cada llamada
	 * cancela el timer pendiente y reagenda el `save(true)`. Esto reemplaza
	 * la antigua emisión por setter: en lugar de un PUT por cada mutación
	 * fina, agendamos UN PUT con el snapshot final del árbol cuando el
	 * usuario deja de tocar por 1 s.
	 */
	let saveTimer: number | null = null;
	function scheduleSave(): void {
		if (typeof window === "undefined") return;
		if (saveTimer !== null) window.clearTimeout(saveTimer);
		saveTimer = window.setTimeout(() => {
			saveTimer = null;
			void save(true);
		}, 1000);
	}

	/** Notifica a otras pestañas que `/api/tables` cambió para que recarguen. */
	function broadcastTablesUpdated(): void {
		if (!tablesChannel) return;
		if (!isRealtimeEnabled()) return;
		try {
			tablesChannel.postMessage({ kind: "tables-updated", senderId: tabId, ts: Date.now() });
		} catch { /* noop */ }
	}

	async function generateSql(): Promise<void> {
		if (generating) return;
		generating = true;
		try {
			if (saveTimer !== null) { window.clearTimeout(saveTimer); saveTimer = null; }
			if (dirty) await save(true);
			const r = await fetch("/api/sql/generate?dry=1", { method: "POST" });
			const data = (await r.json()) as { ok?: boolean; full?: string; count?: number; error?: string };
			if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
			sqlPreviewValue = data.full ?? "";
			sqlPreviewShow = true;
		} catch (err) {
			toastError(`Error generando SQL: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			generating = false;
		}
	}

	async function executeSqlFromPreview(): Promise<void> {
		if (sqlPreviewExecuting || !sqlPreviewUnlocked) return;
		sqlPreviewExecuting = true;
		try {
			const r = await fetch("/api/sql/generate", { method: "POST" });
			const data = (await r.json()) as { ok?: boolean; count?: number; error?: string };
			if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
			toastSuccess(`SQL aplicado (${data.count ?? tables.length} tablas)`);
			sqlPreviewShow = false;
		} catch (err) {
			toastError(`Error ejecutando SQL: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			sqlPreviewExecuting = false;
			sqlPreviewUnlocked = false;
		}
	}

	function openCodeModal(title: string, value: string, language: "sql" | "ts" = "ts", compareValue: string | null = null, compareLabel: string = "Prod"): void {
		modalTitle = title;
		modalValue = value;
		modalLanguage = language;
		modalCompare = compareValue;
		modalCompareLabel = compareLabel;
		modalShow = true;
	}

	async function loadProdTs(): Promise<void> {
		try {
			const res = await fetch("/api/ts/fragments");
			if (!res.ok) return;
			const data = await res.json();
			if (data && data.ok && data.map) prodTsMap = data.map as Record<string, any[]>;
		} catch { /* ignore */ }
	}

	async function loadOverrides(): Promise<void> {
		// Override layer eliminado: las personalizaciones viven en `t.customization`
		// y se persisten al guardar `tables` en `/api/tables`. Función conservada
		// como no-op por compatibilidad con call sites existentes.
		return;
	}

	onMount(() => {
		void (async () => {
			await loadStateFromServer();
			loadTargetFilePaths();
			loadNodeInfo();
			domains = adapter.reloadFromCache();
			void load();
			void loadProdTs();
			void loadOverrides();
		})();
		// Sincronización entre pestañas: cuando otra pestaña guarda `/api/tables`,
		// recargamos el estado para reflejar los cambios remotos. No recargamos
		// si hay edición sucia local pendiente para evitar perder cambios no
		// confirmados — el flush por `pagehide` cubrirá el caso de cierre.
		if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
			tabId = `tab_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
			tablesChannel = new BroadcastChannel(TABLES_BROADCAST_CHANNEL);
			tablesChannel.onmessage = (ev) => {
				if (!isRealtimeEnabled()) return;
				const msg = ev.data as { kind?: string; senderId?: string } | null;
				if (!msg || msg.kind !== "tables-updated") return;
				if (msg.senderId === tabId) return;
				if (dirty || saving) return;
				void load();
				void loadOverrides();
				void reloadStateFromServer().then(() => {
					domains = adapter.reloadFromCache();
				});
			};
		}
		// Sincronización del estado de codegen (`_state.json`): cuando otra
		// pestaña reordena dominios/prefijos o cambia targetFilePaths, recibimos
		// la notificación y rehidratamos los dominios sin tocar las tablas.
		const offStateChanged = onStateChanged(() => {
			if (!isRealtimeEnabled()) return;
			if (dirty || saving) return;
			void reloadStateFromServer().then(() => {
				domains = adapter.reloadFromCache();
			});
		});
		// Asegura persistencia del save de tablas ante refresh/cierre repentino.
		// Si hubo cambios pendientes (`dirty`), envía un `sendBeacon` con los
		// `tables` actuales como respaldo; el backend trata PUT igual que POST
		// para este endpoint via la lectura del body JSON.
		const flushTablesOnUnload = (): void => {
			if (!dirty) return;
			try {
				const blob = new Blob([JSON.stringify({ tables })], { type: "application/json" });
				if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
					navigator.sendBeacon("/api/tables", blob);
					return;
				}
				void fetch("/api/tables", {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ tables }),
					keepalive: true,
				});
			} catch { /* noop */ }
		};
		if (typeof window !== "undefined") {
			window.addEventListener("pagehide", flushTablesOnUnload);
			window.addEventListener("beforeunload", flushTablesOnUnload);
		}
		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("pagehide", flushTablesOnUnload);
				window.removeEventListener("beforeunload", flushTablesOnUnload);
			}
			if (saveTimer !== null) { try { window.clearTimeout(saveTimer); } catch { /* noop */ } saveTimer = null; }
			if (tablesChannel) {
				try { tablesChannel.close(); } catch { /* noop */ }
				tablesChannel = null;
			}
			try { offStateChanged(); } catch { /* noop */ }
		};
	});

	$: focusOnSelection(selectedKey);

	function focusOnSelection(_key: string | null): void {
		if (typeof window === "undefined") return;
		requestAnimationFrame(() => {
			const formPane = document.querySelector<HTMLElement>(".browser .form-pane");
			if (!formPane) return;
			// Solo flashear visualmente; NO robar el foco al usuario que está
			// interactuando con el árbol u otros controles.
			formPane.classList.add("entity-focus-flash");
			window.setTimeout(() => formPane.classList.remove("entity-focus-flash"), 700);
		});
	}
</script>

<Toaster />

<section class="browser">
	<Card>
		<FlexLayout items="center" justify="between">
			<div>
				<H2>Editor visual de tablas</H2>
				<Text color="neutral"><small>Árbol con prefijos como carpetas (visual) y tablas como nodos. Los cambios se guardan automáticamente.</small></Text>
			</div>
			<FlexLayout items="center">
				<DocInfoModal title="Documentación del árbol de tablas" label="Doc del árbol" query={{}} />
				<InfoEditModal
					title="Información del panel SQL"
					buttonTitle="Info del panel"
					description={panelInfo.description ?? ""}
					rules={panelInfo.rules ?? ""}
					on:save={(e) => saveInfo(PANEL_INFO_KEY, e.detail)}
				/>
				{#if saving}
					<FlexLayout items="center"><Iconify icon="mdi:loading" /><Text color="neutral"><small>Guardando…</small></Text></FlexLayout>
				{/if}
			</FlexLayout>
		</FlexLayout>
	</Card>

	<div class="layout">
		<div class="tree-pane">
			<div class="pane-scroll custom-scrollbar">
			{#if loading}
				<Text color="neutral">Cargando…</Text>
			{:else if tables.length === 0}
				<Text color="neutral">Sin tablas.</Text>
			{:else}
				<div class="tables-tree-host">
					<TreeView
						Obj={adapter.obj}
						itdForm="edit"
						brapido={true}
						small={true}
						readonly={false}
						bdrag={true}
						bcanMoveOutside={() => true}
						showToolbar={true}
						CatalogoController={adapterAny.catalogoController}
						TreeController={adapter}
						objWorking={adapterAny.objWorking}
					>
						<svelte:fragment slot="row" let:node>
							{#if node.kind === "prefix"}
								<span class="tree-row">
									<span class="tree-row-index" title="Índice">{node.flatPath}</span>
									<span class="badge badge-prefix">Prefixer</span>
									<span class="tree-row-name">{node.rowName}</span>
								</span>
							{:else if node.kind === "domain"}
								<span class="tree-row">
									<span class="tree-row-index" title="Índice">{node.flatPath}</span>
									<span class="badge badge-domain">{node.prefix ? "Domain/Prefixer" : "Domain"}</span>
									{#if node.prefix}<span class="tree-row-name">{node.prefix}</span>{/if}
								</span>
							{:else if node.kind === "pivot"}
								{@const _pivotParent = adapter.findNodeById(String(node.ireference || "").trim()) as unknown as { kind?: string } | null}
								{@const _pivotInDomain = _pivotParent?.kind === "domain"}
								{@const _isPD = node.domainType === "pivot-domain"}
								<span class="tree-row {node.pivotMissingSlave ? 'tree-row-error' : ''}" title={node.pivotMissingSlave ? "Pivot N:N incompleto: agrega la tabla esclava" : ""}>
									<span class="tree-row-index" title="Índice">{node.flatPath}</span>
									<span class="badge {_pivotInDomain ? 'badge-pivot-in-domain' : 'badge-pivot'}">{_isPD ? "Pivot Domain" : "Pivot"}</span>
									{#if node.pivotMissingSlave}<Iconify icon="mdi:alert" color="error" />{/if}
									{#if node.cardinality}<span class="tree-row-meta tree-row-card" title="Cardinalidad del pivote">{node.cardinality}</span>{/if}
								</span>
							{:else}
								{@const _tableParent = node.isMaster ? (adapter.findNodeById(String(node.ireference || "").trim()) as unknown as { kind?: string; domainType?: string } | null) : null}
								{@const _isMasterOfDomain = !!_tableParent && _tableParent.kind === "domain"}
								<span class="tree-row">
									<span class="tree-row-index" title="Índice">{node.flatPath}</span>
									<span class="tree-row-name">{node.rowName}</span>
									{#if node.isMaster}
										{#if _isMasterOfDomain}
											<span class="tree-row-meta tree-row-master">master</span>
										{:else}
											<span class="tree-row-meta tree-row-master-aux" title="Master del pivote">*</span>
										{/if}
									{:else if node.slaveCardinality}
										<span class="tree-row-meta tree-row-card" title="Cardinalidad respecto al master">{node.slaveCardinality}</span>
									{/if}
								</span>
							{/if}
						</svelte:fragment>

						<svelte:fragment slot="Frm" let:frmObj>
							{#if frmObj}
								{@const _infoKey = infoKeyOf(frmObj)}
								{@const _info = (nodeInfo[_infoKey] ?? { description: "", rules: "" }) as NodeInfo}
								{#if frmObj.kind === "prefix"}
									<div class="frm">
										<label class="field">
											<Text color="neutral"><small>Prefijo</small></Text>
											<input
												class="input-field"
												type="text"
												bind:value={frmObj.rowName}
												on:input={(e) => {
													const v = (e.currentTarget).value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
													frmObj.rowName = v;
												}}
												on:change={() => adapter.updateNode(frmObj)}
												on:blur={() => adapter.updateNode(frmObj)}
											/>
										</label>
										<Text color="neutral"><small>Renombrar el prefijo aplica el cambio a todas las tablas que lo usan al guardar.</small></Text>
									</div>
								{:else if frmObj.kind === "domain"}
									<div class="frm">
										<Text color="neutral"><small>Un dominio agrupa tablas que se exponen como raíz en la API. La tabla master puede leer y modificar a sus esclavas.</small></Text>
										<label class="field">
											<Text color="neutral"><small>Prefijo (opcional, convierte el dominio en domain/prefixer)</small></Text>
											<input
												class="input-field"
												type="text"
												value={frmObj.prefix ?? ""}
												on:input={(e) => {
													const v = (e.currentTarget).value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
													(e.currentTarget).value = v;
												}}
												on:change={(e) => adapter.updateDomainMeta(frmObj.domainId, { prefix: (e.currentTarget).value })}
											/>
										</label>
									</div>
								{:else if frmObj.kind === "pivot"}
									<div class="frm">
										<Text color="neutral"><small>Un pivote modela cardinalidad. <strong>Pivot/Domain</strong> envuelve a otro dominio (1:1 ó 1:N). <strong>Pivot N:N</strong> tiene exactamente master + 1 slave.</small></Text>
										<label class="field">
											<Text color="neutral"><small>Tipo de pivote</small></Text>
											<select
												class="input-field"
												value={frmObj.domainType === "pivot-domain" ? "pivot-domain" : "pivot"}
												on:change={(e) => {
													const t = ((e.currentTarget).value === "pivot-domain") ? "pivot-domain" as const : "pivot" as const;
													const card = t === "pivot" ? "N:N" as const : "1:N" as const;
													adapter.updateDomainMeta(frmObj.domainId, { type: t, cardinality: card });
												}}
											>
												<option value="pivot-domain">Pivot/Domain (envuelve dominio · 1:1 ó 1:N)</option>
												<option value="pivot">Pivot N:N (master + 1 slave)</option>
											</select>
										</label>
										{#if frmObj.domainType === "pivot-domain"}
											<label class="field">
												<Text color="neutral"><small>Cardinalidad</small></Text>
												<select
													class="input-field"
													value={frmObj.cardinality || "1:N"}
													on:change={(e) => adapter.updateDomainMeta(frmObj.domainId, { cardinality: (e.currentTarget).value as "1:1" | "1:N" })}
												>
													<option value="1:1">1:1 (uno a uno)</option>
													<option value="1:N">1:N (uno a muchos)</option>
												</select>
											</label>
										{/if}
									</div>
								{:else}
									<div class="frm">
										<label class="field">
											<Text color="neutral"><small>Nombre de la tabla</small></Text>
											<input
												class="input-field name-input"
												type="text"
												bind:value={frmObj.rowName}
												on:input={(e) => { frmObj.rowName = (e.currentTarget).value.toUpperCase().replace(/[^A-Z0-9_]/g, "_"); }}
											/>
										</label>
										{#if !frmObj.isMaster && frmObj.domainId}
											<label class="field">
												<Text color="neutral"><small>Cardinalidad respecto al master</small></Text>
												<select
													class="input-field"
													value={frmObj.slaveCardinality || ""}
													on:change={(e) => adapter.setSlaveCardinality(frmObj.domainId, frmObj.tableKey, (e.currentTarget).value as "1:1" | "1:N" | "N:N")}
												>
													<option value="" disabled>— elige —</option>
													<option value="1:1">1:1</option>
													<option value="1:N">1:N</option>
													<option value="N:N">N:N</option>
												</select>
											</label>
										{/if}
										<Text color="neutral"><small>El prefijo es una propiedad del grupo padre y no se edita desde aquí. Para editar columnas/secciones, usa el panel SQL.</small></Text>
									</div>
								{/if}
								{#if _infoKey}
									<div class="frm">
										<label class="field">
											<Text color="neutral"><small>Descripción <span style="color: var(--is-error);">*</span></small></Text>
											<textarea
												class="input-field"
												rows="3"
												required
												value={_info.description ?? ""}
												on:change={(e) => saveInfo(_infoKey, { description: (e.currentTarget).value, rules: _info.rules ?? "" })}
											></textarea>
										</label>
										<label class="field">
											<Text color="neutral"><small>Reglas <span style="opacity: 0.6;">(opcional)</span></small></Text>
											<textarea
												class="input-field"
												rows="4"
												value={_info.rules ?? ""}
												on:change={(e) => saveInfo(_infoKey, { description: _info.description ?? "", rules: (e.currentTarget).value })}
											></textarea>
										</label>
									</div>
								{/if}
							{/if}
						</svelte:fragment>
					</TreeView>
				</div>
			{/if}
			</div>
		</div>

		<div class="form-pane">
			<div class="pane-scroll custom-scrollbar">
			{#if !selected}
				<Card variant="flat"><Text color="neutral">Selecciona una tabla del árbol.</Text></Card>
			{:else}
				{@const t = selected.table}
				{@const idx = selected.index}
				{@const cfg = resByTable.get(t.name.toUpperCase())}
				{@const mergedCfg = mergedByTable.get(t.name.toUpperCase())}

				{#key tableKey(t) + "::" + activeCodeTab}
					<Card>
						<FlexLayout items="center" justify="between">
							<FlexLayout items="center">
								<Iconify icon="mdi:table" />
								<H4>{effectiveTableName(t)}</H4>
							</FlexLayout>
							<FlexLayout items="center">
								<DocInfoModal
									title={`Documentación de la tabla ${t.name}`}
									label="Doc de la tabla"
									query={{ table: t.name }}
								/>
								<ButtonIconify icon="mdi:eye-outline" title="Editor visual completo" on:click={openTreeModal} />
							</FlexLayout>
						</FlexLayout>

						<FlexLayout items="center" justify="between" style="margin-top: 0.5rem;">
							<FlexLayout items="center">
								<Iconify icon="mdi:toggle-switch-outline" />
								<Text><small>Generar snippets</small></Text>
							</FlexLayout>
							<FlexLayout items="center">
								<label class="snippet-toggle">
									<input
										type="checkbox"
										checked={isSqlSnippetEnabled(t)}
										on:change={(ev) => setTableSnippet(idx, "sql", (ev.currentTarget as HTMLInputElement).checked)}
									/>
									<Text><small>SQL</small></Text>
								</label>
							</FlexLayout>
						</FlexLayout>

						{#if activeCodeTab === "sql" && isSqlSnippetEnabled(t)}
							<SqlTreeEditor table={t} prefix={t.effectivePrefix ?? ""} readonly={isHistorialDerived(t)} onChange={(nt) => onTableChange(idx, nt)} />
						{:else if activeCodeTab === "sql" && !isSqlSnippetEnabled(t)}
							<Text color="neutral"><small>El snippet SQL está desactivado para esta tabla.</small></Text>
						{:else if cfg && mergedCfg}
							<ResourceConfigSections
								resource={mergedCfg}
								resources={mergedResources}
								inferred={cfg}
								{targetFilePaths}
								section={((activeCodeTab as string) === "sql" ? "model" : activeCodeTab) as "model" | "server" | "client" | "azure"}
								slaves={selectedSlaveNames}
								domainName={selectedDomain?.name ?? ""}
								on:change={() => handleCfgChange(mergedCfg.id)}
							/>
						{:else}
							<Text color="neutral">Sin configuración inferida para esta tabla.</Text>
						{/if}
					</Card>
				{/key}
			{/if}
			</div>
		</div>

		<div class="code-pane">
			<div class="pane-scroll custom-scrollbar">
			{#if selected}
				{@const t = selected.table}
				{@const cfg = mergedByTable.get(t.name.toUpperCase())}
				{@const prodFrags = prodTsMap[t.name.toUpperCase()] ?? []}
				{@const prodPojo = prodFrags.filter((p: any) => p.role === "pojo")}
				{@const prodServer = prodFrags.filter((p: any) => p.role === "server")}
				{@const prodClient = prodFrags.filter((p: any) => p.role === "client")}

				{#key tableKey(t)}
					{@const sqlEnabled = isSqlSnippetEnabled(t)}
					{@const sqlCode = sqlEnabled ? `${emitDropTable(t)}\n\n${emitTable(t)}` : ""}
					{@const modelCode = cfg ? genModelo(cfg, mergedResources) : ""}
					{@const serverCode = cfg ? genServer(cfg, mergedResources) : ""}
					{@const clientCode = cfg ? genClient(cfg) : ""}
					{@const slavesCfgs = (selectedSlaves ?? []).map((sid) => tables.find((tt) => tt.id === sid)).filter((tt): tt is ParsedTable => !!tt).map((tt) => mergedByTable.get(tt.name.toUpperCase())).filter((x): x is ResourceConfig => !!x)}
					{@const azureCode = (cfg && selectedIsMaster) ? genAzureFn([cfg, ...slavesCfgs]) : ""}
					<Card>
						<div class="code-tabs-bar">
							{#if sqlEnabled}
								<button class="code-tab" class:active={activeCodeTab === "sql"} type="button" on:click={() => (activeCodeTab = "sql")}>
									<Iconify icon="mdi:database" /> <span>SQL</span>
								</button>
							{/if}
							{#if cfg}
								<button class="code-tab" class:active={activeCodeTab === "model"} type="button" on:click={() => (activeCodeTab = "model")}>
									<Iconify icon="mdi:cube-outline" /> <span>Modelo</span>
								</button>
								<button class="code-tab" class:active={activeCodeTab === "server"} type="button" on:click={() => (activeCodeTab = "server")}>
									<Iconify icon="mdi:server" /> <span>Server</span>
								</button>
								<button class="code-tab" class:active={activeCodeTab === "client"} type="button" on:click={() => (activeCodeTab = "client")}>
									<Iconify icon="mdi:monitor" /> <span>Client</span>
								</button>
								{#if selectedIsMaster}
									<button class="code-tab" class:active={activeCodeTab === "azure"} type="button" on:click={() => (activeCodeTab = "azure")}>
										<Iconify icon="mdi:microsoft-azure" /> <span>Azure</span>
									</button>
								{/if}
							{/if}
						</div>

						{#if activeCodeTab === "sql" && sqlEnabled}
							<div class="code-card">
								<FlexLayout items="center" justify="between">
									<FlexLayout items="center"><Iconify icon="mdi:database" /><Text color="neutral"><small>DROP + CREATE</small></Text></FlexLayout>
									<FlexLayout items="center">
										<div class="run-group">
											<ButtonIconify icon={runUnlocked[`${t.name}::sql`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${t.name}::sql`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${t.name}::sql`)} />
											<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${t.name}::sql`] || runBusy[`${t.name}::sql`]} on:click={() => runCode(`${t.name}::sql`, sqlCode, "sql")} />
										</div>
										<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${t.name} · SQL`, sqlCode, "sql")} />
									</FlexLayout>
								</FlexLayout>
								<CodeViewer value={sqlCode} lang="sql" height="100%" />
							</div>
						{:else if cfg && activeCodeTab === "model"}
							<div class="code-card">
								<FlexLayout items="center" justify="between">
									<FlexLayout items="center"><Iconify icon="mdi:cube-outline" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
									<FlexLayout items="center">
										<div class="run-group">
											<ButtonIconify icon={runUnlocked[`${cfg.className}::model`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::model`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::model`)} />
											<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::model`] || runBusy[`${cfg.className}::model`]} on:click={() => runCode(`${cfg.className}::model`, modelCode, "ts")} />
										</div>
										<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Modelo`, modelCode, "ts", prodPojo[0]?.body ?? "", prodPojo[0] ? `Prod · ${prodPojo[0].sourceFile}` : "Prod — sin fragmento")} />
									</FlexLayout>
								</FlexLayout>
								<CodeViewer value={modelCode} lang="ts" height="100%" />
							</div>
						{:else if cfg && activeCodeTab === "server"}
							<div class="code-card">
								<FlexLayout items="center" justify="between">
									<FlexLayout items="center"><Iconify icon="mdi:server" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
									<FlexLayout items="center">
										<div class="run-group">
											<ButtonIconify icon={runUnlocked[`${cfg.className}::server`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::server`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::server`)} />
											<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::server`] || runBusy[`${cfg.className}::server`]} on:click={() => runCode(`${cfg.className}::server`, serverCode, "ts")} />
										</div>
										<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Server`, serverCode, "ts", prodServer[0]?.body ?? "", prodServer[0] ? `Prod · ${prodServer[0].sourceFile}` : "Prod — sin fragmento")} />
									</FlexLayout>
								</FlexLayout>
								<CodeViewer value={serverCode} lang="ts" height="100%" />
							</div>
						{:else if cfg && activeCodeTab === "client"}
							<div class="code-card">
								<FlexLayout items="center" justify="between">
									<FlexLayout items="center"><Iconify icon="mdi:monitor" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
									<FlexLayout items="center">
										<div class="run-group">
											<ButtonIconify icon={runUnlocked[`${cfg.className}::client`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::client`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::client`)} />
											<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::client`] || runBusy[`${cfg.className}::client`]} on:click={() => runCode(`${cfg.className}::client`, clientCode, "ts")} />
										</div>
										<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Client`, clientCode, "ts", prodClient[0]?.body ?? "", prodClient[0] ? `Prod · ${prodClient[0].sourceFile}` : "Prod — sin fragmento")} />
									</FlexLayout>
								</FlexLayout>
								<CodeViewer value={clientCode} lang="ts" height="100%" />
							</div>
						{:else if cfg && activeCodeTab === "azure" && selectedIsMaster}
							<div class="code-card">
								<FlexLayout items="center" justify="between">
									<FlexLayout items="center"><Iconify icon="mdi:microsoft-azure" /><Text color="neutral"><small>FN-{selectedDomain?.name ?? cfg.className} · master {cfg.className} + {slavesCfgs.length} esclavas</small></Text></FlexLayout>
									<FlexLayout items="center">
										<div class="run-group">
											<ButtonIconify icon={runUnlocked[`${cfg.className}::azure`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::azure`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::azure`)} />
											<ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::azure`] || runBusy[`${cfg.className}::azure`]} on:click={() => runCode(`${cfg.className}::azure`, azureCode, "ts")} />
										</div>
										<ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Azure FN`, azureCode, "ts")} />
									</FlexLayout>
								</FlexLayout>
								<CodeViewer value={azureCode} lang="ts" height="100%" />
							</div>
						{/if}
					</Card>
				{/key}
			{/if}
			</div>
		</div>
	</div>
</section>

<CodeModal bind:bshow={modalShow} title={modalTitle} value={modalValue} language={modalLanguage} compareValue={modalCompare} compareLabel={modalCompareLabel} valueLabel="Local" />

<Modal bind:bshow={bshowTreeModal} onClose={closeTreeModal} style="width: 96dvw; height: 96dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center">
			<Iconify icon="mdi:file-tree-outline" />
			<Text><strong>Editor visual · {selected ? selected.table.name : ""}</strong></Text>
		</FlexLayout>
	</svelte:fragment>
	<div class="tree-modal-body">
		{#if !selected}
			<Text color="neutral">Selecciona una tabla.</Text>
		{:else}
			{@const t = selected.table}
			{@const idx = selected.index}
			{#key tableKey(t)}
				<SqlTreeEditor table={t} prefix={t.effectivePrefix ?? ""} readonly={isHistorialDerived(t)} onChange={(nt) => onTableChange(idx, nt)} />
			{/key}
		{/if}
	</div>
</Modal>

<Modal bind:bshow={sqlPreviewShow} onClose={() => (sqlPreviewShow = false)} style="width: 96dvw; height: 96dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center">
			<Iconify icon="mdi:database-export" />
			<Text><strong>Creación SQL · Vista previa</strong></Text>
		</FlexLayout>
	</svelte:fragment>
	<FlexLayout direction="column" style="height: 100%;">
		<FlexLayout justify="between" items="center">
			<Text color="neutral"><small>Código generado a partir de los snippets actuales. No se ha aplicado nada todavía.</small></Text>
			<div class="run-pill">
				<ButtonIconify
					icon={sqlPreviewUnlocked ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"}
					title={sqlPreviewUnlocked ? "Bloquear ejecución" : "Desbloquear ejecución"}
					on:click={() => (sqlPreviewUnlocked = !sqlPreviewUnlocked)}
				/>
				<ButtonIconify
					color="success"
					icon="mdi:play"
					title="Ejecutar"
					disabled={!sqlPreviewUnlocked || sqlPreviewExecuting}
					on:click={executeSqlFromPreview}
				/>
			</div>
		</FlexLayout>
		<div class="sql-preview-host">
			<CodeViewer value={sqlPreviewValue} lang="sql" height="100%" />
		</div>
	</FlexLayout>
</Modal>

<style>
	.browser {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-height: 0;
	}
	.layout {
		display: grid;
		grid-template-columns: minmax(358px, calc(14.4rem + 190px)) minmax(0, 0.86fr) minmax(0, 1.07fr);
		gap: 0.5rem;
		height: calc(100dvh - 13rem);
		align-items: stretch;
	}
	:global(.tree-pane),
	:global(.form-pane),
	:global(.code-pane) {
		width: 100%;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.pane-scroll {
		flex: 1 1 auto;
		min-height: 0;
		width: 100%;
		overflow: auto;
		display: block;
	}
	:global(.code-pane) > .pane-scroll {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	:global(.tree-pane) {
		padding: 0.5rem;
		border: 1px solid var(--is-b-color);
		border-radius: 0.25rem;
		background: var(--is-bg-primary);
		overflow: hidden;
	}
	.tables-tree-host {
		display: block;
		width: 100%;
		font-size: 0.8em;
	}
	/* El TouchGestures interno usa position:absolute para overlays, lo que saca al cuerpo del flujo y deja la altura de `.isp-tree` en 0. Forzamos in-flow para que `pane-scroll` reciba la altura real y pueda hacer scroll cuando rebose. */
	.tables-tree-host :global(.touch-gestures-body) { position: static !important; display: flex; flex-direction: column; }
	.tables-tree-host :global(.isp-tree) { display: block !important; height: auto !important; min-height: 0; }
	.tree-row {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
	}
	.tree-row-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 0;
		flex: 1;
	}
	.tree-row-meta {
		color: var(--is-text-neutral, #888);
		font-size: 0.75rem;
		margin-left: auto;
		padding-left: 0.5rem;
	}
	.badge {
		padding: 0.1rem 0.4rem;
		border-radius: 0.2rem;
		font-size: 0.75rem;
		font-weight: bold;
	}
	.tree-row-index {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.5rem;
		height: 1.1rem;
		padding: 0 0.35rem;
		border-radius: 0.6rem;
		background: color-mix(in srgb, var(--is-text-neutral, #888) 18%, transparent);
		color: var(--is-text-neutral, #666);
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		flex: 0 0 auto;
	}
	.badge-domain {
		background: color-mix(in srgb, var(--is-warning) 25%, transparent);
		color: var(--is-warning);
	}
	.badge-pivot {
		background: color-mix(in srgb, hotpink 25%, transparent);
		color: hotpink;
	}
	.badge-pivot-in-domain {
		background: color-mix(in srgb, orange 25%, transparent);
		color: orange;
	}
	.badge-prefix {
		background: color-mix(in srgb, var(--is-success) 25%, transparent);
		color: var(--is-success);
	}
	.tree-row-error {
		outline: 1px dashed var(--is-error, #e11d48);
		border-radius: 4px;
		background: color-mix(in srgb, var(--is-error, #e11d48) 12%, transparent);
		padding: 0 0.25rem;
	}
	.tree-row-card {
		font-variant-numeric: tabular-nums;
		font-weight: 600;
	}
	.tree-row-master {
		text-transform: uppercase;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: var(--is-warning);
	}
	.tree-row-master-aux {
		font-weight: 700;
		color: var(--is-text-neutral, #888);
		opacity: 0.7;
	}
	:global(.code-pane) > :global(.pane-scroll) > :global(.card-root) {
		width: 100%;
		min-width: 0;
		min-height: 0;
		flex: 1 1 auto;
		display: flex !important;
		flex-direction: column;
	}
	:global(.code-pane) > :global(.pane-scroll) {
		overflow: hidden;
	}
	:global(.code-pane .code-tabs),
	:global(.code-pane .code-tabs-content),
	:global(.form-pane .card-root > *) {
		width: 100%;
		min-width: 0;
	}
	:global(.form-pane), :global(.code-pane) {
		min-width: 0;
		min-height: 0;
	}
	:global(.code-pane) {
		padding: 1rem;
		gap: 1rem;
	}
	:global(body) {
		overflow: hidden;
	}
	.code-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		min-height: 0;
		flex: 1 1 auto;
	}
	.run-group {
		display: inline-flex;
		align-items: center;
		gap: 0.15rem;
		border: 1px solid var(--is-b-color);
		border-radius: 999px;
		padding: 0.1rem 0.25rem;
	}
	.code-card :global(.cm-wrap) {
		display: block;
		min-height: 0;
		flex: 1 1 auto;
	}
	:global(.code-pane .tabs-content) {
		flex: 1 1 auto;
		min-height: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	:global(.code-pane .tabs-content) > :global(.tab-item) {
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 900px) {
		.layout { grid-template-columns: 1fr; max-height: none; }
		:global(.tree-pane), :global(.form-pane), :global(.code-pane) { height: auto; max-height: none; }
	}
	.code-tabs-bar {
		display: flex;
		gap: 0.25rem;
		border-bottom: 1px solid var(--is-b-color, #444);
		margin-bottom: 0.5rem;
	}
	.code-tab {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.35rem 0.7rem;
		background: transparent;
		border: 1px solid transparent;
		border-bottom: none;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		color: inherit;
		cursor: pointer;
		font-size: 0.85rem;
		margin-bottom: -1px;
	}
	.code-tab:hover {
		background: var(--is-bg-secondary, #2a2a2a);
	}
	.code-tab.active {
		border-color: var(--is-b-color, #444);
		border-bottom-color: var(--is-bg-primary, #1e1e1e);
		background: var(--is-bg-primary, #1e1e1e);
		font-weight: 600;
	}
	.tree-modal-body {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
		height: 100%;
		overflow: auto;
	}
	.sql-preview-host {
		display: flex;
		flex: 1 1 auto;
		min-height: 0;
		height: 100%;
		overflow: hidden;
	}
	.run-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.15rem 0.4rem;
		border: 1px solid var(--is-b-color, #555);
		border-radius: 999px;
		background: var(--is-bg-secondary);
	}
	:global(.entity-focus-flash) {
		animation: entityFocusFlash 0.7s ease-out;
	}
	@keyframes entityFocusFlash {
		0% { box-shadow: 0 0 0 0 var(--is-primary, #4ea1ff); }
		40% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--is-primary, #4ea1ff) 35%, transparent); }
		100% { box-shadow: 0 0 0 0 transparent; }
	}
	.frm {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.75rem;
	}
	.frm .field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.frm .input-field {
		width: 100%;
		padding: 0.4rem 0.5rem;
		border: 1px solid var(--is-b-color, #555);
		border-radius: 4px;
		background: var(--is-bg-primary);
		color: inherit;
		font: inherit;
	}
</style>
