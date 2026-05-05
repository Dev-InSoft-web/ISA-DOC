import { methodBadge, iconSvg, code as codeI } from "./snippets";

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

// Encierra el icono y el texto de la entidad en un único <span> con `color`,
// usando inline-flex para alinear vertical/horizontalmente. El SVG inline
// (vía `iconSvg`) hereda el color del ancestro vía `currentColor`.
async function entityCell(entidad: string): Promise<string> {
	const i = ENTITY_ICON[entidad];
	const c = ENTITY_COLOR[entidad] ?? "#666";
	const ic = i ? await iconSvg(i, { size: 16, color: c }) : "";
	return (
		`<span style="display:inline-flex;align-items:center;gap:1rem;color:${c};font-weight:600;">` +
		`${ic}<span>${entidad}</span>` +
		`</span>`
	);
}

async function row(r: Row): Promise<string> {
	const entCell = await entityCell(r.entidad);
	return (
		`<tr>` +
		`<td>${entCell}</td>` +
		`<td>${ENTITY_TABLE[r.entidad] ?? ""}</td>` +
		`<td>${methodBadge(r.method)}</td>` +
		`<td>${r.endpoint}</td>` +
		`<td>${r.operacion}</td>` +
		`</tr>`
	);
}

const HEAD =
	`<thead><tr>` +
	`<th>Entidad</th>` +
	`<th>Tabla BD</th>` +
	`<th>Método</th>` +
	`<th>Endpoint</th>` +
	`<th>Operación</th>` +
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

async function buildTabla(rows: Row[]): Promise<string> {
	const body = (await Promise.all(rows.map(row))).join("");
	return `<table border="1">${COLGROUP}${HEAD}<tbody>${body}</tbody></table>`;
}

const intro =
	`<div>Actualización de la colección de Postman para el módulo de Capacitación. ` +
	`Se agregaron las carpetas de <strong>Permisos</strong> y <strong>Temas</strong> ` +
	`como catálogos de solo lectura, orientados a alimentar componentes ${codeI("BtnRef")} ` +
	`desde el frontend. La descripción general fue actualizada.</div>`;

// Para alinear icono + texto sin tablas (email-safe). Usamos inline-flex
// + gap, y el color del icono se sincroniza con el texto vía `currentColor`.
const NOTE_COLOR = "#777";
async function note(iconName: string, html: string, color: string = NOTE_COLOR): Promise<string> {
	const ic = await iconSvg(iconName, { size: 16, color });
	return (
		`<li style="border:1px solid #80808030;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;list-style:none;color:${color};">` +
		`${ic}&nbsp;&nbsp;<span style="vertical-align:middle;">${html}</span>` +
		`</li>`
	);
}

async function buildNotas(): Promise<string> {
	const headerIcon = await iconSvg("mdi:information-outline", { size: 18, color: NOTE_COLOR });
	const items = await Promise.all([
		note(
			"mdi:lock-outline",
			`Todos los endpoints requieren el encabezado ${codeI("Authorization: Bearer {{token}}")}.`,
		),
		note(
			"mdi:filter-variant",
			`El parámetro de URL ${codeI(":filtro")} equivale a ${codeI("btoa(JSON.stringify(filtro))")}. ` +
			`El valor por defecto (${codeI("{}")}) es ${codeI("e30=")}.`,
		),
		note(
			"mdi:eye-off-outline",
			`No se creó ${codeI("sysrecurso")} para Permisos ni Temas: están registrados como ` +
			`${codeI("RelNoSysrecurso")} y tienen omitidas las mutaciones en ${codeI("FN-Capacitacion.ts")}. ` +
			`Por esa razón siempre pueden consultarse vía API y no tienen seguridad implementada.`,
		),
		note(
			"mdi:clock-outline",
			`La tarea ya estaba terminada antes de la creación de este ticket; la documentación ` +
			`se demoró por la atención simultánea de otras tareas.`,
		),
	]);
	return (
		`<div style="margin-top: 15px;color:${NOTE_COLOR};">` +
		`${headerIcon}&nbsp;&nbsp;<strong style="vertical-align:middle;">Notas de implementación:</strong></div>` +
		`<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items.join("")}</ul>`
	);
}

// Color de los <h3> definido en el template (DodgerBlue ≈ #1e90ff). El SVG
// hereda el color vía `currentColor`.
async function h3Iconized(iconName: string, label: string): Promise<string> {
	const c = "#1e90ff";
	const ic = await iconSvg(iconName, { size: 18, color: c });
	return (
		`<h3 style="color:${c};margin-top:1.25rem;">` +
		`${ic}&nbsp;&nbsp;<span style="vertical-align:middle;">${label}</span>` +
		`</h3>`
	);
}

export async function buildBodyTK1418894(): Promise<string> {
	const [tablaReadOnly, tablaCrud, h3a, h3b, notas] = await Promise.all([
		buildTabla(READONLY),
		buildTabla(CRUD),
		h3Iconized("mdi:book-open-variant", "Catálogos de Solo Lectura (Nuevos):"),
		h3Iconized("mdi:database-cog-outline", "Resumen de Endpoints Principales (CRUD):"),
		buildNotas(),
	]);
	return intro + h3a + tablaReadOnly + h3b + tablaCrud + notas;
}

export const bodyTK1418894: Promise<string> = buildBodyTK1418894();

