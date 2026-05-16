/**
 * Ejecuta las peticiones GET de la colección Postman contra la API real
 * y reemplaza el primer ejemplo (response[0].body) con la respuesta real.
 *
 * Uso:
 *   tsx scripts/populate-real-examples.ts
 *
 * Variables de entorno opcionales:
 *   ISA_API_HOST   default http://localhost:20042
 *   ISA_API_TOKEN  default: lee doc/test/token.json
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ISA_ROOT = resolve(__dirname, "..");
const COLLECTION_FILE = resolve(ISA_ROOT, "postman-collection.json");
const TOKEN_FILE = resolve(ISA_ROOT, "..", "test", "token.json");

const HOST = (process.env.ISA_API_HOST ?? "http://localhost:20042").replace(/\/$/, "");
const TOKEN = ((): string => {
	if (process.env.ISA_API_TOKEN) return process.env.ISA_API_TOKEN.trim();
	if (existsSync(TOKEN_FILE)) {
		try {
			const t = JSON.parse(readFileSync(TOKEN_FILE, "utf8")).token;
			if (typeof t === "string" && t.length) return t.trim();
		} catch {
			/* ignore */
		}
	}
	return "";
})();

if (!TOKEN) {
	console.error("✖ No se encontró token. Define ISA_API_TOKEN o crea doc/test/token.json.");
	process.exit(1);
}

interface PostmanVar {
	key?: string;
	value?: string;
}
interface PostmanUrl {
	raw?: string;
	variable?: PostmanVar[];
}
interface PostmanRequest {
	method?: string;
	url?: string | PostmanUrl;
	body?: { mode?: string; raw?: string };
	header?: Array<{ key: string; value: string }>;
}
interface PostmanItem {
	name: string;
	request?: PostmanRequest;
	response?: any[];
}
interface PostmanFolder {
	name: string;
	item?: PostmanItem[];
}
interface FetchResult {
	status: number;
	statusText: string;
	contentType: string;
	body: string;
}

/** Reemplaza {{host_contapymeu}} y {{...}} y :variable con los values del request. */
function buildUrl(req: PostmanRequest | undefined): string | null {
	const url = req?.url;
	if (!url) return null;
	const raw = typeof url === "string" ? url : (url.raw ?? "");
	if (!raw) return null;

	let resolved = raw.replace(/\{\{host_contapymeu\}\}/g, HOST);
	const vars = (typeof url === "object" && url.variable) || [];
	for (const v of vars) {
		if (!v?.key) continue;
		const val = v.value ?? "";
		resolved = resolved.replace(new RegExp(`:${v.key}\\b`, "g"), encodeURIComponent(val));
	}
	resolved = resolved.replace(/\{\{[^}]+\}\}/g, "");
	return resolved;
}

function shouldExecute(item: PostmanItem): boolean {
	const m = (item.request?.method ?? "").toUpperCase();
	return m === "GET";
}

async function fetchAny(method: string, url: string, body?: string): Promise<FetchResult> {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), 120_000);
	try {
		const res = await fetch(url, {
			method,
			headers: {
				Authorization: `Bearer ${TOKEN}`,
				"Content-Type": "application/json",
			},
			body: body ?? undefined,
			signal: ctrl.signal,
		});
		const text = await res.text();
		return {
			status: res.status,
			statusText: res.statusText,
			contentType: res.headers.get("content-type") ?? "application/json",
			body: text,
		};
	} finally {
		clearTimeout(t);
	}
}

async function fetchOne(url: string): Promise<FetchResult> {
	return fetchAny("GET", url);
}

function prettyJson(body: string): string {
	try {
		return JSON.stringify(JSON.parse(body), null, 2);
	} catch {
		return body;
	}
}

const PK_BY_FOLDER: Record<string, string> = {
	Cursos: "icurso",
	"Planes de Estudio": "iplanestudio",
	Drivers: "idriver",
};

function applyPkToRequest(req: PostmanRequest | undefined, pkKey: string, pkValue: string | number): void {
	if (!req || typeof req.url !== "object" || !req.url) return;
	const vars = req.url.variable ?? [];
	for (const v of vars) {
		if (v?.key === pkKey || v?.key === "icurso" || v?.key === "iplanestudio" || v?.key === "idriver") {
			v.value = String(pkValue);
		}
	}
}

function extractFirstPk(body: string, pkKey: string): string | number | null {
	try {
		const obj: any = JSON.parse(body);
		const arr = obj?.respuesta?.datos ?? obj?.datos;
		if (Array.isArray(arr) && arr.length) {
			const v = arr[0]?.[pkKey];
			if (v != null) return v;
		}
	} catch {
		/* ignore */
	}
	return null;
}

const TEST_PK_BY_FOLDER: Record<string, string> = {
	Cursos: "TEST9999999",
	"Planes de Estudio": "TEST9999999",
	Drivers: "TEST9999999",
};

function buildTestBody(
	rawJson: string,
	pkKey: string,
	pkValue: string | number,
	mutate?: (o: Record<string, any>) => void,
): string {
	let obj: Record<string, any>;
	try {
		obj = JSON.parse(rawJson);
	} catch {
		obj = {};
	}
	if (!obj || typeof obj !== "object") obj = {};
	obj[pkKey] = pkValue;
	if (typeof mutate === "function") mutate(obj);
	return JSON.stringify(obj, null, 2);
}

function findItem(items: PostmanItem[], predicate: (it: PostmanItem) => boolean): PostmanItem | null {
	return items.find(predicate) ?? null;
}

function isMethod(it: PostmanItem, method: string): boolean {
	return (it.request?.method ?? "").toUpperCase() === method;
}

interface ExecOpts {
	mutate?: (o: Record<string, any>) => void;
}

async function execAndStore(
	item: PostmanItem,
	folderName: string,
	testPk: string,
	pkKey: string,
	opts: ExecOpts = {},
): Promise<FetchResult | null> {
	const req = item.request;
	if (!req) return null;
	const method = (req.method ?? "GET").toUpperCase();

	if (typeof req.url === "object" && req.url) {
		const vars = req.url.variable ?? [];
		for (const v of vars) {
			if (v?.key === pkKey) v.value = String(testPk);
		}
	}
	const url = buildUrl(req);
	if (!url) {
		console.warn(`· ${folderName} / ${item.name}: sin URL`);
		return null;
	}

	let bodyToSend: string | undefined;
	if (method !== "GET" && method !== "DELETE") {
		const rawTpl = req.body?.raw ?? "{}";
		bodyToSend = buildTestBody(rawTpl, pkKey, testPk, opts.mutate);
		if (req.body && typeof req.body === "object") {
			req.body.mode = "raw";
			req.body.raw = bodyToSend;
		}
	}

	process.stdout.write(`→ ${method} ${url} ... `);
	try {
		const r = await fetchAny(method, url, bodyToSend);
		const ok = r.status >= 200 && r.status < 300;
		const exampleName = ok ? `${r.status} - General esperado` : `${r.status} - ${r.statusText || "Error"}`;
		const example = {
			name: exampleName,
			originalRequest: structuredClone(req),
			status: r.statusText || (ok ? "OK" : "Error"),
			code: r.status,
			_postman_previewlanguage: "json",
			header: [{ key: "Content-Type", value: r.contentType }],
			cookie: [],
			body: prettyJson(r.body),
		};
		item.response = [example, ...(item.response ?? []).filter((e: any) => e?.name !== exampleName)];
		console.log(`${r.status}`);
		return r;
	} catch (err: any) {
		console.log(`ERROR: ${err?.message ?? err}`);
		return null;
	}
}

async function runCrudCycle(folder: PostmanFolder, pkKey: string): Promise<{ touched: number; failed: number }> {
	const items = folder.item ?? [];
	const testPk = TEST_PK_BY_FOLDER[folder.name];
	if (!testPk) return { touched: 0, failed: 0 };

	const postIt = findItem(items, (x) => isMethod(x, "POST") && /crear/i.test(x.name));
	const putIt = findItem(items, (x) => isMethod(x, "PUT") && /actualizar/i.test(x.name));
	const delIt = findItem(items, (x) => isMethod(x, "DELETE") && /eliminar/i.test(x.name));

	if (!postIt && !putIt && !delIt) return { touched: 0, failed: 0 };

	console.log(`· ${folder.name}: ciclo CRUD test (pk=${testPk})`);
	let touched = 0;

	if (delIt) {
		const cloneDel = structuredClone(delIt);
		if (typeof cloneDel.request?.url === "object" && cloneDel.request.url) {
			for (const v of cloneDel.request.url.variable ?? []) {
				if (v?.key === pkKey) v.value = String(testPk);
			}
		}
		const url = buildUrl(cloneDel.request);
		if (url) {
			try {
				await fetchAny("DELETE", url);
			} catch {
				/* ignore */
			}
		}
	}

	if (postIt) {
		const r = await execAndStore(postIt, folder.name, testPk, pkKey, {
			mutate: (o) => {
				if ("ncurso" in o || folder.name === "Cursos") o.ncurso = "Curso de prueba TEST";
				if ("nombre" in o || folder.name === "Planes de Estudio") o.nombre = "Plan TEST";
				if ("ndriver" in o || folder.name === "Drivers") o.ndriver = "Driver TEST";
				if ("descripcion" in o) o.descripcion = "Registro creado por populate-real-examples";
				if ("descripcionplan" in o) o.descripcionplan = "Plan TEST creado por script";
				if ("bactivo" in o) o.bactivo = 1;
				if ("qniveles" in o) o.qniveles = 1;
				if (folder.name === "Cursos") {
					o.itema = null;
					o.idriver = 0;
				}
			},
		});
		if (r) touched++;
	}

	if (putIt) {
		const r = await execAndStore(putIt, folder.name, testPk, pkKey, {
			mutate: (o) => {
				if ("ncurso" in o || folder.name === "Cursos") o.ncurso = "Curso TEST editado";
				if ("nombre" in o || folder.name === "Planes de Estudio") o.nombre = "Plan TEST editado";
				if ("ndriver" in o || folder.name === "Drivers") o.ndriver = "Driver TEST editado";
				if ("descripcion" in o) o.descripcion = "Editado por populate-real-examples";
				if ("descripcionplan" in o) o.descripcionplan = "Editado por script";
				if ("bactivo" in o) o.bactivo = 1;
				if ("qniveles" in o) o.qniveles = 2;
				if (folder.name === "Cursos") {
					o.itema = null;
					o.idriver = 0;
				}
			},
		});
		if (r) touched++;
	}

	if (delIt) {
		const r = await execAndStore(delIt, folder.name, testPk, pkKey);
		if (r) touched++;
	}

	return { touched, failed: 0 };
}

async function main(): Promise<void> {
	const col: { item?: PostmanFolder[] } = JSON.parse(readFileSync(COLLECTION_FILE, "utf8"));
	let touched = 0;
	let failed = 0;

	for (const folder of col.item ?? []) {
		const items = folder.item ?? [];
		const pkKey = PK_BY_FOLDER[folder.name];
		let pkValue: string | number | null = null;

		const listItem = items.find((x) => shouldExecute(x) && /listar/i.test(x.name));
		if (listItem && pkKey) {
			const url = buildUrl(listItem.request);
			if (url) {
				try {
					const r = await fetchOne(url);
					if (r.status >= 200 && r.status < 300) {
						pkValue = extractFirstPk(r.body, pkKey);
						if (pkValue != null) {
							console.log(`· ${folder.name}: pk ${pkKey}=${pkValue}`);
							for (const it of items) {
								if (it !== listItem) applyPkToRequest(it.request, pkKey, pkValue);
							}
						}
					}
				} catch {
					/* se reintenta abajo */
				}
			}
		}

		for (const it of items) {
			if (!shouldExecute(it)) continue;
			const url = buildUrl(it.request);
			if (!url) {
				console.warn(`· ${folder.name} / ${it.name}: sin URL resoluble`);
				continue;
			}
			process.stdout.write(`→ ${it.request!.method} ${url} ... `);
			try {
				const r = await fetchOne(url);
				const body = prettyJson(r.body);
				const ok = r.status >= 200 && r.status < 300;
				const exampleName = ok ? `${r.status} - General esperado` : `${r.status} - ${r.statusText || "Error"}`;
				const example = {
					name: exampleName,
					originalRequest: structuredClone(it.request),
					status: r.statusText || (ok ? "OK" : "Error"),
					code: r.status,
					_postman_previewlanguage: "json",
					header: [{ key: "Content-Type", value: r.contentType }],
					cookie: [],
					body,
				};
				it.response = [example, ...(it.response ?? []).filter((e: any) => e?.name !== exampleName)];
				touched++;
				console.log(`${r.status}`);
			} catch (err: any) {
				failed++;
				console.log(`ERROR: ${err?.message ?? err}`);
			}
		}

		if (pkKey) {
			const cycle = await runCrudCycle(folder, pkKey);
			touched += cycle.touched;
			failed += cycle.failed;
		}
	}

	writeFileSync(COLLECTION_FILE, JSON.stringify(col, null, "\t"), "utf8");
	console.log(`\n✓ Actualizados ${touched} endpoints. Fallaron ${failed}.`);
	console.log(`  Archivo: ${COLLECTION_FILE}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
