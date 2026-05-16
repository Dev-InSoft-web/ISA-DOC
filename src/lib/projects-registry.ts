export type ActionType = "dev" | "build" | "start" | "pub" | "sync" | "func" | "custom";
export type ProjectGroup = "clientesis" | "contapymeu" | "shared";

export interface ProjectAction {
	id: string;
	label: string;
	type: ActionType;
	command: string;
	cwd: string;
	needsPassword?: boolean;
	description?: string;
	/** Si true, este botón se comporta como Run/Stop/Restart en la UI. */
	longRunning?: boolean;
	/** Patrón regex para detectar URL/host en el stdout (ej. http://localhost:4322). */
	hostPattern?: string;
	/** URL fija a mostrar como enlace (ej. Swagger UI). */
	swaggerUrl?: string;
}

export interface ProjectEntry {
	id: string;
	name: string;
	description: string;
	icon: string;
	cwd: string;
	group: ProjectGroup;
	actions: ProjectAction[];
}

const base = "C:/Users/JAGUDELOE/Documents/Contapyme";
const URL_PATTERN = "https?://[\\w.\\-]+(?::\\d+)?(?:/[^\\s]*)?";

export const PROJECTS: ProjectEntry[] = [
	// === ClientesIS / ContaPymeU ===
	// 1) ISP-ClientesIS
	{
		id: "isp-cli",
		name: "ISP-ClientesIS",
		description: "Paquete NPM cliente (controladores + tipos)",
		icon: "mdi:package-variant-closed",
		cwd: `${base}/ClientesIS/ISP-ClientesIS`,
		group: "clientesis",
		actions: [
			{ id: "isp-cli-pub", label: "Publicar (pub-cli.ps1)", type: "pub", command: `powershell -ExecutionPolicy Bypass -File '${base}/ClientesIS/doc/ISA-DOC/scripts/PS1/pub-isp/clientesis/pub-cli.ps1'`, cwd: `${base}/ClientesIS/ISP-ClientesIS`, needsPassword: true, description: "Build + npm publish + git push" },
		],
	},

	// 2) ISP-CLientesISServer
	{
		id: "isp-srv",
		name: "ISP-CLientesISServer",
		description: "Paquete NPM servidor (controladores server-side)",
		icon: "mdi:package-variant",
		cwd: `${base}/ClientesIS/ISP-CLientesISServer`,
		group: "clientesis",
		actions: [
			{ id: "isp-srv-pub", label: "Publicar (pub-server.ps1)", type: "pub", command: `powershell -ExecutionPolicy Bypass -File '${base}/ClientesIS/doc/ISA-DOC/scripts/PS1/pub-isp/clientesis/pub-server.ps1'`, cwd: `${base}/ClientesIS/ISP-CLientesISServer`, needsPassword: true, description: "Build + npm publish + git push" },
		],
	},

	// 3) ISS-ClientesIS-ContaPymeU
	{
		id: "iss",
		name: "ISS-ClientesIS-ContaPymeU",
		description: "Azure Functions serverless backend",
		icon: "mdi:cloud-outline",
		cwd: `${base}/ClientesIS/ISS-ClientesIS-ContaPymeU`,
		group: "contapymeu",
		actions: [
			{ id: "iss-func", label: "func start", type: "func", command: "npm run build && func start --no-build --verbose false --silent", cwd: `${base}/ClientesIS/ISS-ClientesIS-ContaPymeU`, description: "Build TS + Azure Functions runtime", longRunning: true, hostPattern: "http://localhost:7071/api/swagger/", swaggerUrl: "http://localhost:7071/api/swagger/" },
			{ id: "iss-start", label: "npm run start", type: "start", command: "npm run start", cwd: `${base}/ClientesIS/ISS-ClientesIS-ContaPymeU`, description: "prestart (build) + func start", longRunning: true, hostPattern: "http://localhost:7071/api/swagger/", swaggerUrl: "http://localhost:7071/api/swagger/" },
		],
	},

	// 4) ISW-ClientesIS
	{
		id: "isw",
		name: "ISW-ClientesIS",
		description: "Aplicación web Astro + Svelte (frontend principal)",
		icon: "mdi:web",
		cwd: `${base}/ClientesIS/ISW-ClientesIS`,
		group: "clientesis",
		actions: [
			{ id: "isw-dev", label: "Dev", type: "dev", command: "npm run dev -- --port 4322", cwd: `${base}/ClientesIS/ISW-ClientesIS`, description: "Astro dev :4322", longRunning: true, hostPattern: URL_PATTERN },
			{ id: "isw-run", label: "Run project", type: "start", command: "npm run preview", cwd: `${base}/ClientesIS/ISW-ClientesIS`, description: "Astro preview (build + serve)", longRunning: true, hostPattern: URL_PATTERN },
			{ id: "isw-iconify", label: "Descargar iconos", type: "build", command: "npm run iconify", cwd: `${base}/ClientesIS/ISW-ClientesIS`, description: "Iconify dl → public/icons/iconify" },
		],
	},

	// 5) ISA-DOC (este orquestador)
	{
		id: "isa",
		name: "ISA-DOC",
		description: "Orquestador / panel de proyectos",
		icon: "mdi:view-dashboard-outline",
		cwd: `${base}/ClientesIS/doc/ISA-DOC`,
		group: "clientesis",
		actions: [
			{ id: "isa-iconify", label: "Descargar iconos", type: "build", command: "npm run iconify", cwd: `${base}/ClientesIS/doc/ISA-DOC`, description: "Iconify dl → public/icons/iconify" },
		],
	},

	// === Compartidos ===
	// ISP-SvelteComponents
	{
		id: "isp-sc",
		name: "ISP-SvelteComponents",
		description: "Librería de componentes Svelte compartida",
		icon: "mdi:puzzle-outline",
		cwd: `${base}/ISP-SvelteComponents`,
		group: "shared",
		actions: [
			{ id: "isp-sc-dev", label: "Dev playground", type: "dev", command: "npm run dev", cwd: `${base}/ISP-SvelteComponents`, description: "Vite dev playground", longRunning: true, hostPattern: URL_PATTERN },
			{ id: "isp-sc-pub", label: "Publicar (pub.ps1)", type: "pub", command: `powershell -ExecutionPolicy Bypass -File '${base}/ClientesIS/doc/ISA-DOC/scripts/PS1/pub-isp/sveltecomponents/pub.ps1'`, cwd: `${base}/ISP-SvelteComponents`, needsPassword: true, description: "Build + npm publish + git push" },
			{ id: "isp-sc-link", label: "Link Local → ISW/ISA", type: "sync", command: `powershell -ExecutionPolicy Bypass -File '${base}/ClientesIS/doc/ISA-DOC/scripts/PS1/pub-isp/sveltecomponents/relation-local.ps1'`, cwd: `${base}/ISP-SvelteComponents`, description: "Copia build local a ISW e ISA node_modules" },
			{ id: "isp-sc-iconify", label: "Descargar iconos", type: "build", command: "npm run iconify", cwd: `${base}/ISP-SvelteComponents`, description: "Iconify dl → static/icons/iconify" },
		],
	},

	// Sync Local (general de ClientesIS)
	{
		id: "sync",
		name: "Sync Local ClientesIS",
		description: "Compila ISP+ISPServer y copia artefactos a ISS/ISW node_modules",
		icon: "mdi:sync",
		cwd: `${base}/ClientesIS`,
		group: "clientesis",
		actions: [
			{ id: "update-all-local", label: "Update all local", type: "sync", command: `powershell -ExecutionPolicy Bypass -File '${base}/ClientesIS/doc/ISA-DOC/scripts/PS1/update-all-local.ps1'`, cwd: `${base}/ClientesIS`, description: "Sync local ISP-ClientesIS + ISP-Server + ISP-SvelteComponents (sin publicar)" },
			{ id: "sync-all", label: "Sync local ClientesIS", type: "sync", command: `powershell -ExecutionPolicy Bypass -File '${base}/ClientesIS/doc/ISA-DOC/scripts/PS1/sync-local-isp-clientesis.ps1'`, cwd: `${base}/ClientesIS`, description: "Build + copy ISP→ISS/ISW" },
			{ id: "pub-all-isp", label: "Publicar ISP + ISP-Server", type: "pub", command: `powershell -ExecutionPolicy Bypass -File '${base}/ClientesIS/doc/ISA-DOC/scripts/PS1/pub-isp/clientesis/pub-all.ps1'`, cwd: `${base}/ClientesIS`, needsPassword: true, description: "Publica ispclientesisserver y luego ispclientesis" },
		],
	},
];
