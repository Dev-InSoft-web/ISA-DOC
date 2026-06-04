import { execSync } from "node:child_process";
import { accessSync, constants } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { ISA_DOC_ROOT, LAB_REPO_ROOT } from "./isa-doc-root.ts";

export { ISA_DOC_ROOT, LAB_REPO_ROOT, LAB_SCRIPTS_ROOT } from "./isa-doc-root.ts";

export function labDist(rel: string): string {
	return join(LAB_REPO_ROOT, "dist", rel);
}

/** Importa módulo compilado de lab-langgraph (tras build). */
export async function importLab<T = unknown>(rel: string): Promise<T> {
	ensureLabBuild();
	return import(pathToFileURL(labDist(rel)).href) as Promise<T>;
}

export function ensureLabBuild(): void {
	try {
		accessSync(labDist("src/lib/db/pg.js"), constants.R_OK);
	} catch {
		console.log("Compilando lab-langgraph…");
		execSync("npm run build", { cwd: LAB_REPO_ROOT, stdio: "inherit" });
	}
}
