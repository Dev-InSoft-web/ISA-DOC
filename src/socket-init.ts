import { initSocketServer } from "./lib/socket-server.js";

initSocketServer(4401);

// HMR: cuando cambie socket-server.ts (o este módulo), re-importar y re-registrar
// handlers contra el mismo puerto. `initSocketServer` ya cierra la instancia anterior.
interface ImportMetaHot { accept: (deps: string | string[], cb: (mods: unknown) => void) => void }
const hot = (import.meta as { hot?: ImportMetaHot }).hot;
if (hot) {
	hot.accept(["./lib/socket-server.ts"], async () => {
		const mod = await import(`./lib/socket-server.ts?t=${Date.now()}`) as { initSocketServer: (p: number) => unknown };
		mod.initSocketServer(4401);
		console.log("[Socket.IO] handlers recargados vía HMR");
	});
}
