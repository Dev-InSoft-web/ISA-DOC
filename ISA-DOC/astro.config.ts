import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import type { ViteDevServer } from "vite";

function wsPlugin() {
	let started = false;
	return {
		name: "isa-ws-init",
		configureServer(server: ViteDevServer) {
			if (started) return;
			started = true;
			server.ssrLoadModule("./src/socket-init.ts").catch((e: unknown) => {
				console.error("[Socket.IO] init error:", e);
			});
		},
	};
}

export default defineConfig({
	integrations: [svelte({
		configFile: "./config/svelte.config.ts",
		extensions: [".svelte"],
		emitCss: true,
	})],
	output: "server",
	adapter: node({ mode: "standalone" }),
	vite: {
		plugins: [wsPlugin()],
	},
});
