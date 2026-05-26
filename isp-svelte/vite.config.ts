import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

export default defineConfig({
	plugins: [svelte()],
	publicDir: "static",
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, "../../ISP-SvelteComponents/src/lib"),
			$mylib: path.resolve(__dirname, "./src/lib"),
		},
	},
	server: {
		port: 5180,
		strictPort: false,
	},
	build: {
		outDir: "dist-demo",
		emptyOutDir: true,
	},
});
