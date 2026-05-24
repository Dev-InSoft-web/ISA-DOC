// Enriquece postman-collection.json con ejemplos guardados (Happy Path + 400),
// descripciones de headers y tabla de body en Actualizar (DI-QA-001 §6).
// Ejecutar: tsx scripts/enrich-postman.ts
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = join(__dirname, "..", "data", "postman", "clientesis", "collection.json");

interface SampleData {
	listItem: Record<string, unknown>;
	bodyTable: string;
	recursoPlan?: Record<string, unknown>;
}

const json: any = JSON.parse(readFileSync(FILE, "utf8"));

const sampleData: Record<string, SampleData> = {
	Cursos: {
		listItem: {
			icurso: "ADMIN-001",
			ncurso: "Administración de bodegas",
			itema: "TEMA-LOG",
			idriver: "DRV-LMS",
			descripcion: "Curso introductorio para personal de bodega",
			bactivo: 1,
		},
		bodyTable:
			"| Campo | Tipo | Requerido | Descripción |\n|---|---|---|---|\n| `icurso` | string | Sí | PK del curso |\n| `ncurso` | string | Sí | Nombre del curso |\n| `itema` | string | No | Tema asociado |\n| `idriver` | string | No | Driver al que pertenece |\n| `descripcion` | string | No | Descripción |\n| `bactivo` | boolean | No | Estado activo (1/0) |",
		recursoPlan: { iplanestudio: "PLAN-IND-2026", nombre: "Inducción 2026", ttdvisualizacion: "ARBOL" },
	},
	"Planes de Estudio": {
		listItem: {
			iplanestudio: "PLAN-IND-2026",
			nombre: "Inducción 2026",
			descripcionplan: "Plan de inducción para nuevos colaboradores",
			ttdvisualizacion: "ARBOL",
			bgeneracertificadog: false,
			bactivo: 1,
		},
		bodyTable:
			"| Campo | Tipo | Requerido | Descripción |\n|---|---|---|---|\n| `iplanestudio` | string | Sí | PK del plan |\n| `nombre` | string | Sí | Nombre del plan |\n| `descripcionplan` | string | No | Descripción |\n| `ttdvisualizacion` | string | No | `ARBOL` o `LISTA` |\n| `bgeneracertificadog` | boolean | No | Genera certificado global |\n| `bactivo` | boolean | No | Estado activo |",
	},
	Drivers: {
		listItem: {
			idriver: "DRV-LMS",
			ndriver: "LMS Estándar",
			descripcion: "Driver de evidencia LMS con 3 niveles",
			qniveles: 3,
		},
		bodyTable:
			"| Campo | Tipo | Requerido | Descripción |\n|---|---|---|---|\n| `idriver` | string | Sí | PK del driver |\n| `ndriver` | string | Sí | Nombre |\n| `descripcion` | string | No | Descripción |\n| `qniveles` | number | Sí | Cantidad de niveles |",
	},
};

const errBody400 = JSON.stringify({ error: { code: "VALIDACION", mensaje: "Faltan campos requeridos." } }, null, 2);

function singularEntity(folderName: string): string {
	if (folderName === "Cursos") return "curso";
	if (folderName === "Planes de Estudio") return "plan de estudio";
	if (folderName === "Drivers") return "driver";
	return folderName.toLowerCase();
}

function makeExample(name: string, code: number, status: string, request: any, body: unknown): any {
	return {
		name,
		originalRequest: structuredClone(request),
		status,
		code,
		_postman_previewlanguage: "json",
		header: [{ key: "Content-Type", value: "application/json" }],
		cookie: [],
		body: typeof body === "string" ? body : JSON.stringify(body, null, 2),
	};
}

for (const folder of json.item) {
	const data = sampleData[folder.name];
	if (!data) continue;
	const sing = singularEntity(folder.name);
	const Sing = sing.charAt(0).toUpperCase() + sing.slice(1);

	for (const it of folder.item) {
		// Header description for Content-Type
		for (const h of it.request.header || []) {
			if (h.key === "Content-Type" && !h.description) h.description = "Tipo MIME del cuerpo de la petición.";
		}

		const m = it.request.method;
		const url = it.request.url.raw;
		it.response = it.response || [];

		// Ensure body table on Actualizar (PUT)
		if (m === "PUT" && data.bodyTable && !it.request.description.includes("## Body")) {
			it.request.description = it.request.description.replace(
				"## Parámetros de path",
				`## Body (\`application/json\`)\n${data.bodyTable}\n\n## Parámetros de path`,
			);
		}

		if (m === "GET" && url.includes(":filtro")) {
			it.response.push(
				makeExample(`200 - Listado de ${folder.name.toLowerCase()} obtenido`, 200, "OK", it.request, {
					datos: [data.listItem],
				}),
			);
		} else if (m === "GET" && url.includes("recursoplan")) {
			it.response.push(
				makeExample(`200 - Recurso/plan del curso obtenido`, 200, "OK", it.request, {
					datos: { ...data.listItem, ...(data.recursoPlan || {}) },
				}),
			);
		} else if (m === "GET") {
			it.response.push(makeExample(`200 - ${Sing} encontrado`, 200, "OK", it.request, { datos: data.listItem }));
			it.response.push(
				makeExample(
					`404 - ${Sing} no existe`,
					404,
					"Not Found",
					it.request,
					JSON.stringify({ error: { code: "NO_ENCONTRADO", mensaje: `El ${sing} no existe.` } }, null, 2),
				),
			);
		} else if (m === "POST") {
			it.response.push(
				makeExample(`201 - ${Sing} creado exitosamente`, 201, "Created", it.request, { datos: data.listItem }),
			);
			it.response.push(makeExample(`400 - Datos inválidos`, 400, "Bad Request", it.request, errBody400));
		} else if (m === "PUT") {
			it.response.push(makeExample(`200 - ${Sing} actualizado`, 200, "OK", it.request, { datos: data.listItem }));
			it.response.push(makeExample(`400 - Datos inválidos`, 400, "Bad Request", it.request, errBody400));
			it.response.push(
				makeExample(
					`404 - ${Sing} no existe`,
					404,
					"Not Found",
					it.request,
					JSON.stringify({ error: { code: "NO_ENCONTRADO", mensaje: `El ${sing} no existe.` } }, null, 2),
				),
			);
		} else if (m === "DELETE") {
			it.response.push(
				makeExample(`200 - ${Sing} eliminado`, 200, "OK", it.request, {
					mensaje: `${Sing} eliminado correctamente.`,
				}),
			);
			it.response.push(
				makeExample(
					`409 - ${Sing} con dependencias`,
					409,
					"Conflict",
					it.request,
					JSON.stringify(
						{ error: { code: "DEPENDENCIAS", mensaje: `El ${sing} tiene dependencias activas.` } },
						null,
						2,
					),
				),
			);
		}
	}
}

writeFileSync(FILE, JSON.stringify(json, null, "\t") + "\n");
console.log("Enriquecido OK");
