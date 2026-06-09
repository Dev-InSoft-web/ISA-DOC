/**
 * Guarda credenciales de sesión del portal capacitacion-virtual (sin contraseña).
 *
 * Uso:
 *   CAPACITACION_CONTROLKEY=... CAPACITACION_EMAIL=... npm run lab:cap:export-session
 *
 * O copie el JSON generado desde la consola del navegador (ver mensaje al ejecutar).
 */
import { writeFile } from "node:fs/promises";
import { SESSION_PATH } from "../lib/corpus-paths.ts";
import { ensureCorpusDirs } from "../lib/manifest.ts";
import type { CapacitacionSession } from "../lib/auth.ts";

async function main(): Promise<void> {
	const controlkey = process.env.CAPACITACION_CONTROLKEY?.trim();
	if (!controlkey) {
		console.error("Defina CAPACITACION_CONTROLKEY (desde Session.get('controlkey') en el navegador).");
		console.error(`
En https://www.contapyme.com/capacitacion-virtual/ con sesión activa, ejecute en consola:

JSON.stringify({
  controlkey: Session.get("controlkey"),
  semail: Session.get("semail"),
  icontacto: Session.get("icontacto"),
  idmaquina: Session.get("idmaquina") || "WebPortal",
  savedAt: new Date().toISOString()
}, null, 2)
`);
		process.exit(1);
	}

	const session: CapacitacionSession = {
		controlkey,
		semail: process.env.CAPACITACION_EMAIL?.trim(),
		icontacto: process.env.CAPACITACION_ICONTACTO?.trim(),
		idmaquina: process.env.CAPACITACION_IDMAQUINA?.trim() || "WebPortal",
		savedAt: new Date().toISOString(),
	};

	await ensureCorpusDirs();
	await writeFile(SESSION_PATH, `${JSON.stringify(session, null, 2)}\n`, "utf8");
	console.log(`Sesión guardada en ${SESSION_PATH}`);
}

main().catch((e: unknown) => {
	console.error(e instanceof Error ? e.message : String(e));
	process.exit(1);
});
