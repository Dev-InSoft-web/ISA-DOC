import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
		resolve: {
			alias: {
				"$lib": path.resolve(__dirname, "./src/lib"),
				"$components": path.resolve(__dirname, "./src/components"),
			},
		},
	},
});
