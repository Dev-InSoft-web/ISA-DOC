import { methodBadge, icon, code as codeI } from "./snippets";

const ENTITY_ICON: Record<string, string> = {
	Permisos: "mdi:shield-key-outline",
	Temas: "mdi:tag-multiple-outline",
	Cursos: "mdi:school-outline",
	"Planes de Estudio": "mdi:notebook-multiple",
	Drivers: "mdi:cog-outline",
};

const ENTITY_COLOR: Record<string, string> = {
	Permisos: "#7C5CC1",
	Temas: "#5BC0DE",
	Cursos: "#3F8AE0",
	"Planes de Estudio": "#2EAD56",
	Drivers: "#E2A03F",
};

const ENTITY_TABLE: Record<string, string> = {
	Permisos: "CAPAC_PERMISOS",
	Temas: "CAPAC_TEMAS",
	Cursos: "CAPAC_CURSOS",
	"Planes de Estudio": "CAPAC_PLANES_CURSOS",
	Drivers: "CAPAC_DRIVERS",
};

interface Row {
	entidad: keyof typeof ENTITY_ICON | string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	endpoint: string;
	operacion: string;
}

function entityCell(entidad: string): string {
	const i = ENTITY_ICON[entidad];
	const c = ENTITY_COLOR[entidad] ?? "#666";
	const ic = i ? icon(i, { size: 16, color: c }) + "&nbsp;" : "";
	return `${ic}<span>${entidad}</span>`;
}

function tableCell(entidad: string): string {
	const t = ENTITY_TABLE[entidad];
	if (!t) return "";
	return `${icon("mdi:database-outline", { color: "#888", size: 14 })}&nbsp;${codeI(t)}`;
}

function row(r: Row): string {
	return (
		`<tr>` +
		`<td>${entityCell(r.entidad)}</td>` +
		`<td>${tableCell(r.entidad)}</td>` +
		`<td>${methodBadge(r.method)}</td>` +
		`<td>${r.endpoint}</td>` +
		`<td>${r.operacion}</td>` +
		`</tr>`
	);
}

const HEAD =
	`<thead><tr>` +
	`<th>${icon("mdi:tag-outline", { color: "#ffffff" })}&nbsp;Entidad</th>` +
	`<th>${icon("mdi:database-outline", { color: "#ffffff" })}&nbsp;Tabla BD</th>` +
	`<th>${icon("mdi:swap-horizontal", { color: "#ffffff" })}&nbsp;Método</th>` +
	`<th>${icon("mdi:link-variant", { color: "#ffffff" })}&nbsp;Endpoint</th>` +
	`<th>${icon("mdi:format-list-numbered", { color: "#ffffff" })}&nbsp;Operación</th>` +
	`</tr></thead>`;

const COLGROUP =
	`<colgroup>` +
	`<col style="width:18%">` +
	`<col style="width:18%">` +
	`<col style="width:10%">` +
	`<col style="width:28%">` +
	`<col style="width:26%">` +
	`</colgroup>`;

const READONLY: Row[] = [
	{ entidad: "Permisos", method: "GET", endpoint: "/api/permisos/:filtro", operacion: "100 Listar Permisos" },
	{ entidad: "Permisos", method: "GET", endpoint: "/api/permiso/:ipermiso", operacion: "110 Obtener Permiso" },
	{ entidad: "Temas", method: "GET", endpoint: "/api/temas/:filtro", operacion: "100 Listar Temas" },
	{ entidad: "Temas", method: "GET", endpoint: "/api/tema/:itema", operacion: "110 Obtener Tema" },
];

const CRUD: Row[] = [
	{ entidad: "Cursos", method: "GET", endpoint: "/api/cursos/:filtro", operacion: "100 Listar Cursos" },
	{ entidad: "Cursos", method: "GET", endpoint: "/api/curso/:icurso", operacion: "110 Obtener Curso" },
	{ entidad: "Cursos", method: "GET", endpoint: "/api/curso/recursoplan/:icurso", operacion: "120 Obtener Recurso/Plan de Curso" },
	{ entidad: "Cursos", method: "POST", endpoint: "/api/curso", operacion: "200 Crear Curso" },
	{ entidad: "Cursos", method: "PUT", endpoint: "/api/curso/:icurso", operacion: "300 Actualizar Curso" },
	{ entidad: "Cursos", method: "DELETE", endpoint: "/api/curso/:icurso", operacion: "400 Eliminar Curso" },
	{ entidad: "Planes de Estudio", method: "GET", endpoint: "/api/planes/estudio/:filtro", operacion: "100 Listar Planes de Estudio" },
	{ entidad: "Planes de Estudio", method: "GET", endpoint: "/api/plan/estudio/:iplanestudio", operacion: "110 Obtener Plan de Estudio" },
	{ entidad: "Planes de Estudio", method: "POST", endpoint: "/api/plan/estudio", operacion: "200 Crear Plan de Estudio" },
	{ entidad: "Planes de Estudio", method: "PUT", endpoint: "/api/plan/estudio/:iplanestudio", operacion: "300 Actualizar Plan de Estudio" },
	{ entidad: "Planes de Estudio", method: "DELETE", endpoint: "/api/plan/estudio/:iplanestudio", operacion: "400 Eliminar Plan de Estudio" },
	{ entidad: "Drivers", method: "GET", endpoint: "/api/drivers/:filtro", operacion: "100 Listar Drivers" },
	{ entidad: "Drivers", method: "GET", endpoint: "/api/driver/:idriver", operacion: "110 Obtener Driver" },
	{ entidad: "Drivers", method: "POST", endpoint: "/api/driver", operacion: "200 Crear Driver" },
	{ entidad: "Drivers", method: "PUT", endpoint: "/api/driver/:idriver", operacion: "300 Actualizar Driver" },
	{ entidad: "Drivers", method: "DELETE", endpoint: "/api/driver/:idriver", operacion: "400 Eliminar Driver" },
];

const tablaReadOnly =
	`<table border="1">` + COLGROUP + HEAD +
	`<tbody>` + READONLY.map(row).join("") + `</tbody></table>`;

const tablaCrud =
	`<table border="1">` + COLGROUP + HEAD +
	`<tbody>` + CRUD.map(row).join("") + `</tbody></table>`;

const intro =
	`<img src="https://i.ibb.co/99cnjWGK/01.png" style="max-height: 300px; max-width: 100%; display: block; margin-bottom: 15px;">` +
	`<div>Actualización de la colección de Postman para el módulo de Capacitación. ` +
	`Se agregaron las carpetas de <strong>Permisos</strong> y <strong>Temas</strong> ` +
	`como catálogos de solo lectura, orientados a alimentar componentes ${codeI("BtnRef")} ` +
	`desde el frontend. La descripción general fue actualizada.</div>`;

const notas =
	`<div style="margin-top: 15px;">` +
	`${icon("mdi:information-outline", { color: "#3F8AE0", size: 18 })}&nbsp;` +
	`<strong>Notas de implementación:</strong></div>` +
	`<ul>` +
	`<li>${icon("mdi:lock-outline", { color: "#7C5CC1" })}&nbsp;` +
	`Todos los endpoints requieren el encabezado ${codeI("Authorization: Bearer {{token}}")}.</li>` +
	`<li>${icon("mdi:filter-variant", { color: "#3F8AE0" })}&nbsp;` +
	`El parámetro de URL ${codeI(":filtro")} equivale a ${codeI("btoa(JSON.stringify(filtro))")}. ` +
	`El valor por defecto (${codeI("{}")}) es ${codeI("e30=")}.</li>` +
	`<li>${icon("mdi:eye-off-outline", { color: "#6c757d" })}&nbsp;` +
	`Permisos y Temas están registrados como ${codeI("RelNoSysrecurso")} y tienen omitidas las mutaciones en ${codeI("FN-Capacitacion.ts")}.</li>` +
	`</ul>`;

export const bodyTK1418894: string =
	intro +
	`<h3>${icon("mdi:book-open-variant", { color: "#1e90ff", size: 18 })}&nbsp;Catálogos de Solo Lectura (Nuevos):</h3>` +
	tablaReadOnly +
	`<h3>${icon("mdi:database-cog-outline", { color: "#1e90ff", size: 18 })}&nbsp;Resumen de Endpoints Principales (CRUD):</h3>` +
	tablaCrud +
	notas;

