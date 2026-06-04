/**
 * Delegación de persistencia JSON: lab-langgraph si hay URL, si no disco local (legacy dev).
 */
import {
	useLabPersistence,
	labGetJson,
	labPutJson,
	labGetRevisado,
	labPostRevisado,
} from "../lab-api/persistence.ts";

export { useLabPersistence };

export async function readJsonStore<T>(localPath: string, labRelPath: string): Promise<T | null> {
	if (useLabPersistence()) {
		try {
			return await labGetJson<T>(labRelPath);
		} catch {
			return null;
		}
	}
	const { readFile } = await import("node:fs/promises");
	const { resolve } = await import("node:path");
	try {
		return JSON.parse(await readFile(resolve(process.cwd(), localPath), "utf8")) as T;
	} catch {
		return null;
	}
}

export async function writeJsonStore(localPath: string, labRelPath: string, data: unknown): Promise<void> {
	if (useLabPersistence()) {
		await labPutJson(labRelPath, data);
		return;
	}
	const { mkdir, writeFile } = await import("node:fs/promises");
	const { dirname, resolve } = await import("node:path");
	const abs = resolve(process.cwd(), localPath);
	await mkdir(dirname(abs), { recursive: true });
	await writeFile(abs, JSON.stringify(data, null, 2), "utf8");
}

export async function readRevisadoMap(): Promise<Record<string, boolean>> {
	if (useLabPersistence()) {
		try {
			return await labGetRevisado();
		} catch {
			/* lab apagado: disco local */
		}
	}
	const { readAll } = await import("../../features/bitacora/revisadoServer.ts");
	return readAll();
}

export async function writeRevisadoMap(updates: Record<string, boolean>): Promise<Record<string, boolean>> {
	if (useLabPersistence()) {
		try {
			return await labPostRevisado(updates);
		} catch {
			/* lab apagado: disco local */
		}
	}
	const { writeMany } = await import("../../features/bitacora/revisadoServer.ts");
	return writeMany(updates);
}
