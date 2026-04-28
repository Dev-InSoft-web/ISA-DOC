/**
 * Registro de documentación por proyecto.
 *
 * Las claves coinciden con `ProjectEntry.id` definido en `projects-registry.ts`.
 * Para añadir un documento nuevo basta con dejarlo caer en `public/imgs/` y
 * registrarlo aquí bajo el proyecto correspondiente.
 */

export type DocKind = "image" | "file";

export interface DocItem {
	title: string;
	description?: string;
	kind: DocKind;
	/** Ruta servida por Astro (relativa al `public/`). Empieza con `/`. */
	src: string;
}

export interface DocCategory {
	key: string;
	label: string;
	icon: string;
	items: DocItem[];
}

/** Documentación agrupada por proyecto (clave = `ProjectEntry.id`). */
export const DOCS_BY_PROJECT: Record<string, DocCategory[]> = {
	"isp-sc": [],
	"isp-cli": [],
	"isp-srv": [],
	"isw": [],
	"iss": [
		{
			key: "arquitectura",
			label: "Arquitectura",
			icon: "mdi:sitemap-outline",
			items: [
				{
					title: "Componentes ContaPymeU + ISW-ClientesIS",
					description:
						"Diagrama de componentes UML: microservicios ContaPymeU (Capacitación, Plan de estudio) y la app web ISW-ClientesIS con sus pantallas (Cursos, Plan de curso, Detalle, Diagrama Árbol Tab, …) sobre BD MSSQL.",
					kind: "image",
					src: "/imgs/030 Capacitación.png",
				},
			],
		},
		{
			key: "modelo-datos",
			label: "Modelo de Datos",
			icon: "mdi:database-outline",
			items: [
				{
					title: "DER · Capacitación",
					description:
						"Modelo entidad-relación de las tablas CAPAC_* (Cursos, Planes de Estudio, Drivers, Atributos, Estructuras, Permisos, Temas, …).",
					kind: "image",
					src: "/imgs/DER Capacitación.jpg",
				},
				{
					title: "Diagrama ORM (Mapeo Relacional de Objetos)",
					description:
						"ORM completo incluyendo Recursos, Mensajes, Movimientos de contacto, Calificaciones, Historial e Idiomas.",
					kind: "image",
					src: "/imgs/Diagrama ORM (Mapeo Relacional de Objetos)1 (1).png",
				},
			],
		},
		{
			key: "flujos",
			label: "Flujos",
			icon: "mdi:transit-connection-variant",
			items: [
				{
					title: "Flujo · AL OBTENER",
					description:
						"Tablas y relaciones consultadas al obtener un curso/plan. Permisos NO se consultan en este flujo.",
					kind: "image",
					src: "/imgs/DER GET.png",
				},
				{
					title: "Flujo · AL EDITAR",
					description:
						"Tablas afectadas al editar un curso/plan. Permisos, Temas y Recursos NO se modifican desde aquí.",
					kind: "image",
					src: "/imgs/DER UPDATE.png",
				},
			],
		},
		{
			key: "recursos",
			label: "Recursos",
			icon: "mdi:download-box-outline",
			items: [
				{
					title: "ContaPyme U _2.vpp",
					description:
						"Proyecto Visual Paradigm con todos los diagramas (descargable).",
					kind: "file",
					src: "/imgs/ContaPyme U _2.vpp",
				},
			],
		},
	],
};

export function getDocsForProject(key: string): DocCategory[] {
	return DOCS_BY_PROJECT[key] ?? [];
}
