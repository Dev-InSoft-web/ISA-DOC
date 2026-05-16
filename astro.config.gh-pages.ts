import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

// Config dedicada para despliegue estático en GitHub Pages
// (https://dev-insoft-web.github.io/ISA-DOC/).
// Sin adaptador Node, sin Socket.IO, sin endpoints de API:
// las rutas /api/* deben removerse temporalmente del proyecto antes de build
// (lo hace el script de publicación). Toda la UI cliente que dependa de API
// fallará en runtime de forma controlada (es lo esperado en gh-pages).
export default defineConfig({
	site: "https://dev-insoft-web.github.io",
	base: "/ISA-DOC",
	output: "static",
	outDir: "./dist-gh-pages",
	integrations: [svelte({
		configFile: "./config/svelte.config.ts",
		extensions: [".svelte"],
		emitCss: true,
	})],
	vite: {
		plugins: [inlineImagePlugin()],
		resolve: {
			alias: {
				"$lib": path.resolve(__dirname, "./src/lib"),
				"$components": path.resolve(__dirname, "./src/components"),
			},
		},
	},
});
