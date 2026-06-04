/**
 * Resuelve el HTML del cuerpo desde módulos TS por ticket.
 * Solo los TK con lógica/algoritmo propio mantienen `buildBodyTK*` en `records/`.
 */

const recordModules = import.meta.glob("../records/**/TK-*.ts");

function loaderForCode(code: string, moduleKey?: string): (() => Promise<unknown>) | undefined {
	if (moduleKey) {
		const suffix = `/${moduleKey}.ts`;
		const entry = Object.entries(recordModules).find(([p]) => p.endsWith(suffix));
		return entry?.[1];
	}
	const needle = `/${code}.ts`;
	const entry = Object.entries(recordModules).find(([p]) => p.endsWith(needle) && !p.includes("-sql"));
	return entry?.[1];
}

async function invokeBodyBuilder(mod: Record<string, unknown>): Promise<string> {
	const buildKey = Object.keys(mod).find((k) => k.startsWith("buildBody") && typeof mod[k] === "function");
	if (buildKey) {
		return String(await (mod[buildKey] as () => Promise<string>)());
	}
	const bodyKey = Object.keys(mod).find((k) => k.startsWith("bodyTK"));
	if (bodyKey) {
		const v = mod[bodyKey];
		return typeof (v as Promise<string>)?.then === "function" ? await (v as Promise<string>) : String(v);
	}
	throw new Error("El módulo del ticket no exporta buildBodyTK* ni bodyTK*");
}

export async function buildBodyForTicket(code: string, moduleKey?: string): Promise<string> {
	const load = loaderForCode(code, moduleKey);
	if (!load) {
		throw new Error(
			`Sin módulo TS para ${code}${moduleKey ? ` (${moduleKey})` : ""}. Cree records/.../TK-*.ts o defina bodyModule en PG.`,
		);
	}
	const mod = (await load()) as Record<string, unknown>;
	return invokeBodyBuilder(mod);
}

export function listRegisteredBodyModules(): string[] {
	return Object.keys(recordModules)
		.filter((p) => !p.includes("-sql"))
		.map((p) => p.replace(/^\.\.\/records\//, "").replace(/\.ts$/, ""));
}
