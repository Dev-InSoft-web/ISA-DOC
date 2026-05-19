import type { DetailNode, FieldDef, HelperDef, RelationDef, ResourceConfig } from "./types.js";

const VAL_FN: Record<FieldDef["type"], string> = {
	string: "val2Str",
	number: "val2Int",
	bool: "val2Bool",
	json: "val2JSON",
	date: "val2Str",
	enum: "val2NumericEnum",
};

const TS_TYPE: Record<FieldDef["type"], string> = {
	string: "string",
	number: "number",
	bool: "boolean",
	json: "Record<string, unknown>",
	date: "string",
	enum: "number",
};

// Helpers de kind="field" usan tipos TS directos (string/number/boolean/object).
const HELPER_FIELD_VAL_FN: Record<string, string> = {
	string: "val2Str",
	number: "val2Int",
	boolean: "val2Bool",
	object: "val2JSON",
};
const HELPER_FIELD_TS_TYPE: Record<string, string> = {
	string: "string",
	number: "number",
	boolean: "boolean",
	object: "Record<string, unknown>",
};

function fieldGetter(f: FieldDef, enumImports: Set<string>): string {
	const tsType = f.type === "enum" && f.enumName ? f.enumName : TS_TYPE[f.type];
	if (f.type === "enum" && f.enumName) enumImports.add(f.enumName);
	const valFn =
		f.type === "enum" && f.enumName
			? `val2NumericEnum(v, ${f.enumName}.none, ${f.enumName})`
			: `${VAL_FN[f.type]}(v)`;
	return [
		`	get ${f.name}(): ${tsType} { return this.f.${f.name} }`,
		`	set ${f.name}(v: any) { this.f.${f.name} = ${valFn} }`,
	].join("\n");
}

function relationGetter(r: RelationDef, allRes: Map<string, ResourceConfig>): string {
	const target = allRes.get(r.target);
	const targetClass = target?.className ?? `T${r.target}`;
	const header = target?.tableName ? `\t// ${target.tableName}\n` : "";
	if (r.kind === "1-N") {
		return [
			`${header}\tget ${r.alias}(): TArray<${targetClass}> { return this.f.${r.alias} }`,
			`\tset ${r.alias}(v: any) { this.f.${r.alias} = val2TArray(v, ${targetClass}, new TArray<${targetClass}>()) }`,
		].join("\n");
	}
	return [
		`${header}\tget ${r.alias}(): ${targetClass} { return this.f.${r.alias} }`,
		`\tset ${r.alias}(v: any) { this.f.${r.alias} = val2TObject(v, ${targetClass}) }`,
	].join("\n");
}

function valImports(cfg: ResourceConfig): string[] {
	const used = new Set<string>(["TObject"]);
	for (const f of cfg.fields) used.add(VAL_FN[f.type]);
	for (const r of cfg.relations) {
		used.add(r.kind === "1-N" ? "val2TArray" : "val2TObject");
		if (r.kind === "1-N") used.add("TArray");
	}
	for (const h of cfg.helpers ?? []) {
		if (h.kind === "field") {
			const fn = HELPER_FIELD_VAL_FN[h.type ?? "string"];
			if (fn) used.add(fn);
		}
	}
	return Array.from(used).sort();
}

function renderHelpers(helpers: HelperDef[] | undefined): string {
	if (!helpers || helpers.length === 0) return "";
	const lines: string[] = ["\n\t// helpers"];
	for (const h of helpers) {
		if (h.kind === "field") {
			const key = h.type ?? "string";
			const tsType = HELPER_FIELD_TS_TYPE[key] ?? key;
			const valFn = HELPER_FIELD_VAL_FN[key] ?? "val2Str";
			lines.push(`\tget ${h.name}(): ${tsType} { return this.f.${h.name} }`);
			lines.push(`\tset ${h.name}(v: any) { this.f.${h.name} = ${valFn}(v) }`);
			continue;
		}
		const body = (h.body ?? "").trim();
		const ret = h.returnType ? `: ${h.returnType}` : "";
		if (h.kind === "get") {
			lines.push(`\tget ${h.name}()${ret} { ${body} }`);
		} else {
			const params = h.params ?? "()";
			lines.push(`\t${h.name}${params}${ret} { ${body} }`);
		}
	}
	return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// 1) MODELO  (ISP-ClientesIS/.../010 Objetos/.../<Recurso>/01.Modelo.ts)
// ─────────────────────────────────────────────────────────────────────────────
export function genModelo(cfg: ResourceConfig, all: ResourceConfig[]): string {
	const map = new Map(all.map((r) => [r.id, r]));
	const enumImports = new Set<string>();
	const fieldsCode = cfg.fields.map((f) => fieldGetter(f, enumImports)).join("\n");
	const relsCode = cfg.relations.map((r) => relationGetter(r, map)).join("\n");
	const imports = valImports(cfg);
	const enumLine = enumImports.size
		? `import { ${Array.from(enumImports).sort().join(", ")} } from "../../../UlConst";\n`
		: "";
	const targets = cfg.relations
		.map((r) => {
			const t = map.get(r.target);
			return { className: t?.className ?? `T${r.target}`, tableName: t?.tableName ?? r.target };
		});
	const seenCls = new Set<string>();
	const targetEntries = targets.filter((t) => (seenCls.has(t.className) ? false : (seenCls.add(t.className), true)));
	const targetsLine = targetEntries.length
		? `// TODO: importar ${targetEntries.map((t) => `${t.className} (${t.tableName})`).join(", ")} desde su módulo correspondiente\n`
		: "";

	return `import { ${imports.join(", ")} } from "@ingenieria_insoft/ispgen";
${enumLine}${targetsLine}
export class ${cfg.className} extends TObject {
${fieldsCode}
${relsCode}${renderHelpers(cfg.helpers)}
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2) DATOS  (cuando hay relaciones complejas / detalles)
// ─────────────────────────────────────────────────────────────────────────────
export function genDatos(cfg: ResourceConfig, all: ResourceConfig[]): string {
	if (cfg.relations.length === 0) return "// (Sin relaciones complejas: archivo Datos no requerido.)\n";
	const map = new Map(all.map((r) => [r.id, r]));
	const enumImports = new Set<string>();
	const seen = new Set<string>();
	const blocks: string[] = [];
	const usedVal = new Set<string>(["TObject"]);

	for (const r of cfg.relations) {
		const tgt = map.get(r.target);
		if (!tgt) {
			blocks.push(`// TODO: definir clase para ${r.target} (no encontrado en recursos cargados)`);
			continue;
		}
		if (seen.has(tgt.id)) continue;
		seen.add(tgt.id);

		const vs = (r.versus ?? []).map((v) => v.sub === v.parent ? v.sub : `${v.sub}|${v.parent}`).join(",");
		const eq = (r.equals ?? []).map((e) => `${e.col}=${e.value}`).join(",");
		const header = [
			`// ${cfg.className}.${r.alias} (${r.kind}) → ${tgt.className} [versus: ${vs || "—"}; equals: ${eq || "—"}]`,
			`// Insert effect: ${r.insertEffect ?? "ignore"}`,
		].join("\n");

		for (const f of tgt.fields) usedVal.add(VAL_FN[f.type]);
		for (const tr of tgt.relations) {
			usedVal.add(tr.kind === "1-N" ? "val2TArray" : "val2TObject");
			if (tr.kind === "1-N") usedVal.add("TArray");
		}

		const fieldsCode = tgt.fields.map((f) => fieldGetter(f, enumImports)).join("\n");
		const relsCode = tgt.relations.map((rr) => relationGetter(rr, map)).join("\n");
		const body = [fieldsCode, relsCode].filter(Boolean).join("\n");

		blocks.push(`${header}\nexport class ${tgt.className} extends TObject {\n${body}${renderHelpers(tgt.helpers)}\n}`);
	}

	const importsLine = `import { ${Array.from(usedVal).sort().join(", ")} } from "@ingenieria_insoft/ispgen";`;
	const enumLine = enumImports.size
		? `import { ${Array.from(enumImports).sort().join(", ")} } from "../../../UlConst";\n`
		: "";

	return `${importsLine}\n${enumLine}\n// Detalles para ${cfg.className}\n${blocks.join("\n\n")}\n`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3) SERVER  (ISP-CLientesISServer/.../<Recurso>Server.ts)
// ─────────────────────────────────────────────────────────────────────────────
function renderDetailNode(node: DetailNode, targetCfg: ResourceConfig | undefined, map: Map<string, ResourceConfig>): string {
	if (node.todo) return "{ todo }";
	if (node.nada) return "{}";
	const entries = Object.entries(node.children ?? {});
	if (!entries.length) return "{}";
	const inner = entries.map(([alias, sub]) => {
		const relDef = targetCfg?.relations.find((r) => r.alias === alias);
		const childCfg = relDef ? map.get(relDef.target) : undefined;
		return `${alias}: ${renderDetailNode(sub, childCfg, map)}`;
	}).join(", ");
	return `{ ${inner} }`;
}

export function genServer(cfg: ResourceConfig, all: ResourceConfig[]): string {
	const map = new Map(all.map((r) => [r.id, r]));
	const pks = cfg.fields.filter((f) => f.pk).map((f) => `"${f.name}"`);
	const tableExpr = cfg.tableConst ?? `"${cfg.tableName}"`;
	const baseClass = cfg.parentBaseClass ?? "TCapacitacionServer";

	const JData2HighDetail = cfg.relations.length
		? `	JData2HighDetail = (): iInfo${cfg.id} => ({ ${cfg.relations
				.map((r) => {
					const node = cfg.detailSpec?.[r.alias] ?? { todo: true };
					const tgt = map.get(r.target);
					return `${r.alias}: ${renderDetailNode(node, tgt, map)}`;
				})
				.join(", ")} });\n`
		: "";

	const nestedConfig = cfg.relations.length
		? `	nestedConfig(JData: iInfo${cfg.id}): TNestedSqlCfgList {
		return [
${cfg.relations
	.map((r) => {
		const tgt = map.get(r.target);
		const tgtServer = tgt ? `${tgt.className}Server` : `T${r.target}Server`;
		const cmpItems: string[] = [
			...(r.versus ?? []).map((v) => {
				const sub = (v.sub ?? "").toUpperCase();
				const par = (v.parent ?? "").toUpperCase();
				if (!sub) return "";
				return par && par !== sub ? `"${sub}|${par}"` : `"${sub}"`;
			}),
			...(r.equals ?? []).map((e) => {
				const col = (e.col ?? "").toUpperCase();
				if (!col) return "";
				const v = e.type === "bool"
					? (String(e.value).toLowerCase() === "true" || e.value === "1" ? "1" : "0")
					: e.type === "number"
						? String(Number(e.value || 0))
						: `'${String(e.value).replace(/'/g, "''")}'`;
				return `"${col}=${v}"`;
			}),
		].filter(Boolean);
		const cmp = cmpItems.join(", ");
		const esLista = r.kind === "1-N" ? ", esLista: true" : "";
		const where = r.customWhere ? `, where: (sub, parent) => ${r.customWhere}` : "";
		return `			{ consulta: [${tgtServer}, JData.${r.alias}], comparacion: [${cmp}]${esLista}${where}, as: "${r.alias}" },`;
	})
	.join("\n")}
		];
	}\n`
		: "";

	const orderByMethod = cfg.orderBy
		? `	getOrderBy(Alias: string): string {\n${cfg.orderBy.split("\n").map((l) => "\t\t" + l).join("\n")}\n\t}\n`
		: "";

	const insertDetalles = cfg.relations.filter((r) => r.insertEffect === "syncDetails");
	const insertQryDetalle = insertDetalles.length
		? `	InsertQryDetalle(${cfg.id.toLowerCase()}: ${cfg.className}): Promise<TObjectQuery> {
		return this.syncDetails(${cfg.id.toLowerCase()},
${insertDetalles
	.map((r) => {
		const tgt = map.get(r.target);
		const tgtServer = tgt ? `${tgt.className}Server` : `T${r.target}Server`;
		return `			[${tgtServer}, ${cfg.id.toLowerCase()}.${r.alias}],`;
	})
	.join("\n")}
		);
	}\n`
		: "";

	const customMethods = cfg.customHooks
		.map(
			(h) => `	async ${h.name}${h.signature} {
		// TODO: implementar lógica particular para ${h.name}
		${h.notes ? `// ${h.notes}` : ""}
		throw new Error("not-implemented");
	}`,
		)
		.join("\n\n");

	const iInfoLine =
		cfg.relations.length > 0
			? `\nexport interface iInfo${cfg.id} extends iInfoCatalogoGen {\n${cfg.relations
					.map((r) => `	${r.alias}?: iInfoCatalogoGen;`)
					.join("\n")}\n}\n`
			: "";

	return `import type { iInfoCatalogoGen, TNestedSqlCfgList, TObjectQuery } from "@ingenieria_insoft/ispclientesisserver";
import { todo } from "@ingenieria_insoft/ispclientesisserver";
// TODO: importar ${cfg.className} y servidores hijos
${iInfoLine}
export class ${cfg.className}Server extends ${baseClass}<${cfg.className}> {
	get NTbl(): string { return ${tableExpr} }
	get Klass(): typeof ${cfg.className} { return ${cfg.className} }
	get PrimaryKeys(): Array<string> { return [${pks.join(", ")}] }

${JData2HighDetail}${nestedConfig}${orderByMethod}${insertQryDetalle}${customMethods}
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4) CLIENT  (ISP-ClientesIS/.../020 Controllers/.../<Mod>Client.ts)
// ─────────────────────────────────────────────────────────────────────────────
export function genClient(cfg: ResourceConfig): string {
	const pks = cfg.fields.filter((f) => f.pk).map((f) => `"${f.name}"`);
	const baseClient = cfg.clientBaseClass ?? "TCapacitacionBaseClient";
	const customs = cfg.customHooks
		.filter((h) => h.clientFnName && h.clientPath)
		.map((h) => {
			const path = h.clientPath?.replace(/\{(\w+)\}/g, "${o.$1}");
			return `	public async ${h.clientFnName}(o: ${cfg.className}, timeOut: number = 30000): Promise<boolean> {
		const path: string = \`${path}\`;
		const res = await this.Request("${h.clientMethod ?? "GET"}", path, null, timeOut);
		const resJSON: any = val2JSON(res.responseText, {});
		if (this.verifyResponse(res)) {
			o.loadFromJSON(resJSON.respuesta?.datos || {});
			return true;
		}
		throw new Error(resJSON.encabezado?.mensaje);
	}`;
		})
		.join("\n\n");

	return `import { val2JSON } from "@ingenieria_insoft/ispgen";
// TODO: importar ${cfg.className} y ${baseClient}

export class ${cfg.className}Client extends ${baseClient}<${cfg.className}> {
	public get NEndPoint(): string { return "/api/${cfg.singularApi}" }
	public get NEndPointListado(): string { return "/api/${cfg.pluralApi}" }
	public get Klass(): typeof ${cfg.className} { return ${cfg.className} }
	public get PrimaryKeys(): Array<keyof ${cfg.className}> { return [${pks.join(", ")}] }

${customs}
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5) AZURE FUNCTION  (ISS-ClientesIS-ContaPymeU/src/functions/FN-<Modulo>.ts)
// ─────────────────────────────────────────────────────────────────────────────
function registerLine(c: ResourceConfig): string {
	const pks = c.fields.filter((f) => f.pk).map((f) => `"${f.name}"`).join(", ");
	const omitir = (c.omitOps ?? []).map((o) => `"${o}"`).join(", ");
	return `registerCatalogoGenAzureFunction(${c.className}Server, ${c.className}, { pk: [${pks}], nrecurso: "${c.singularApi}", nrecursos: "${c.singularApi}", omitir: [${omitir}] });`;
}

function customHandlers(c: ResourceConfig): string {
	return c.customHooks
		.filter((h) => h.clientPath)
		.map((h) => {
			const route = h.clientPath?.replace(/^\/api\//, "");
			return `app.${(h.clientMethod ?? "GET").toLowerCase()}("API_${(h.clientMethod ?? "GET")}_${c.className}_${h.name}", {
	route: "${route}",
	handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
		const Ctx = new ${c.className}Server(request, context);
		const { CtxUser } = Ctx;
		let ResponseData: TResponseData = await CtxUser.PrepareRequest();
		try {
			const obj = Object.assign(new ${c.className}(), CtxUser.params);
			await Ctx.${h.name}(obj);
			ResponseData = RstExitosa({ body: { datos: obj } });
		} catch (error) { ResponseData = RstError(error) }
		return Ctx.SendResponse(ResponseData, false);
	},
});`;
		})
		.join("\n\n");
}

export function genAzureFnSingle(cfg: ResourceConfig): string {
	if (cfg.exposeInFn === false) return `// (Recurso "${cfg.id}" no se expone en FN-Módulo.)\n`;
	return `import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { registerCatalogoGenAzureFunction } from "@ingenieria_insoft/ispazureutils";
import { ${cfg.className} } from "@ingenieria_insoft/ispclientesis";
import { ${cfg.className}Server } from "@ingenieria_insoft/ispclientesisserver";
import { TResponseData } from "@ingenieria_insoft/ispgen";
import { RstError, RstExitosa } from "@ingenieria_insoft/ispserver";

${registerLine(cfg)}

${customHandlers(cfg)}
`;
}

export function genAzureFn(all: ResourceConfig[]): string {
	const expose = all.filter((c) => c.exposeInFn !== false);
	if (expose.length === 0) return "// (Sin recursos configurados.)\n";
	const classes = Array.from(new Set(expose.map((c) => c.className)));
	const servers = Array.from(new Set(expose.map((c) => `${c.className}Server`)));
	const registers = expose.map(registerLine).join("\n");
	const customs = expose.map(customHandlers).filter(Boolean).join("\n\n");

	return `import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { registerCatalogoGenAzureFunction } from "@ingenieria_insoft/ispazureutils";
import { ${classes.join(", ")} } from "@ingenieria_insoft/ispclientesis";
import { ${servers.join(", ")} } from "@ingenieria_insoft/ispclientesisserver";
import { TResponseData } from "@ingenieria_insoft/ispgen";
import { RstError, RstExitosa } from "@ingenieria_insoft/ispserver";

${registers}

${customs}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6) WEB CONTROLLER  (ISW-ClientesIS/src/lib/.../<Recurso>.ts)
// ─────────────────────────────────────────────────────────────────────────────
export function genWebController(cfg: ResourceConfig): string {
	const mixin = cfg.uiBaseKind ?? "CRUD";
	const visibles = cfg.fields.filter((f) => f.visible !== false);
	const columns = visibles
		.map(
			(f) => `		${f.name}: { visible: ${f.visible !== false}, caption: "${f.caption ?? f.name}" },`,
		)
		.join("\n");

	const path = `/${cfg.module.toLowerCase()}/${cfg.pluralApi}`;
	const pkProp = cfg.fields.find((f) => f.pk)?.name ?? "id";

	return `import { ${cfg.className}Client, ${cfg.className} } from "@ingenieria_insoft/ispclientesis";
import { ${mixin}, type TGridColumn } from "@ingenieria_insoft/ispsveltecomponents";

export class ${cfg.className}APIController extends ${mixin}<typeof ${cfg.className}Client>(${cfg.className}Client) {
	entrie = "${cfg.singularCaption ?? cfg.id}";
	entries = "${cfg.pluralCaption ?? cfg.id + "s"}";
	isysrecurso = "${cfg.isysRecurso ?? cfg.id}";

	Columns: TGridColumn<${cfg.className}> = {
${columns}
	};

	getPath = (o?: ${cfg.className}) => (!o ? "${path}" : \`${path}/\${o.${pkProp}}\`);

	ActVisualizar = async (_item: ${cfg.className}) => true;
	ActCrear = async (I: ${cfg.className}) => this.Insert(I);
	ActModificar = async (I: ${cfg.className}) => this.Update(I);
	ActEliminar = async (I: ${cfg.className}) => this.Delete(I);
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Punto de entrada: arma snippets para una config + contexto.
// ─────────────────────────────────────────────────────────────────────────────
export interface GeneratedSnippet {
	id: string;
	label: string;
	filename: string;
	language: "ts";
	body: string;
}

export function defaultFilename(cfg: ResourceConfig, kind: "modelo" | "datos" | "server" | "client" | "webctrl" | "azurefn"): string {
	switch (kind) {
		case "modelo": return `01.Modelo.${cfg.id}.ts`;
		case "datos": return `02.Datos.${cfg.id}.ts`;
		case "server": return `${cfg.className}Server.ts`;
		case "client": return `${cfg.className}Client.ts`;
		case "webctrl": return `${cfg.id}.ts`;
		case "azurefn": return `FN-${cfg.id}.ts`;
	}
}

export function generateAll(cfg: ResourceConfig, all: ResourceConfig[]): GeneratedSnippet[] {
	const t = cfg.targetFiles ?? {};
	const tidy = tidySnippetBody;
	return [
		{ id: "modelo", label: "Modelo", filename: t.modelo || defaultFilename(cfg, "modelo"), language: "ts", body: tidy(genModelo(cfg, all)) },
		{ id: "datos", label: "Datos / Detalles", filename: t.datos || defaultFilename(cfg, "datos"), language: "ts", body: tidy(genDatos(cfg, all)) },
		{ id: "server", label: "Server", filename: t.server || defaultFilename(cfg, "server"), language: "ts", body: tidy(genServer(cfg, all)) },
		{ id: "client", label: "Client", filename: t.client || defaultFilename(cfg, "client"), language: "ts", body: tidy(genClient(cfg)) },
		{ id: "webctrl", label: "Web Controller", filename: t.webctrl || defaultFilename(cfg, "webctrl"), language: "ts", body: tidy(genWebController(cfg)) },
		{ id: "azurefn", label: "FN-Módulo", filename: t.azurefn || defaultFilename(cfg, "azurefn"), language: "ts", body: tidy(genAzureFnSingle(cfg)) },
	];
}

function tidySnippetBody(s: string): string {
	let out = s;
	// Colapsar líneas en blanco entre dos llaves de cierre consecutivas.
	for (let i = 0; i < 4; i++) {
		const next = out.replace(/\}[ \t]*\n[ \t]*\n+(\s*\})/g, "}\n$1");
		if (next === out) break;
		out = next;
	}
	// Colapsar 3+ saltos a 2.
	out = out.replace(/\n{3,}/g, "\n\n");
	return out;
}
