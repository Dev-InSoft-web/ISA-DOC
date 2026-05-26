import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import path from "node:path";
import fs from "node:fs";
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

// Convierte `import shot from "./foo.jpg?inline"` en una data URI base64.
// Útil para tickets donde queremos HTML autocontenido (copiable a correo).
const MIME: Record<string, string> = {
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".gif": "image/gif",
	".webp": "image/webp",
};

function inlineImagePlugin() {
	return {
		name: "isa-inline-image",
		enforce: "pre" as const,
		load(id: string) {
			const [filePath, query] = id.split("?");
			if (!query) return null;
			const params = new URLSearchParams(query);
			if (!params.has("inline")) return null;
			const ext = path.extname(filePath).toLowerCase();
			const mime = MIME[ext];
			if (!mime) return null;
			const buf = fs.readFileSync(filePath);
			const dataUri = `data:${mime};base64,${buf.toString("base64")}`;
			return `export default ${JSON.stringify(dataUri)};`;
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
		plugins: [wsPlugin(), inlineImagePlugin()],
		resolve: {
			alias: {
				"$lib": path.resolve(__dirname, "./src/lib"),
				"$components": path.resolve(__dirname, "./src/components"),
				"$comps": path.resolve(__dirname, "./isp-svelte/src/lib"),
			},
		},
	},
});

