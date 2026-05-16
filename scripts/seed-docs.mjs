// Script de relleno de docs en tables-tree.json y un par de columns/*.json.
// No modifica la estructura del \u00e1rbol; solo agrega/actualiza campos doc.
// Uso: node scripts/seed-docs.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const treePath = path.join(ROOT, "public", "db", "clientesis", "tables-tree.json");
const colsDir = path.join(ROOT, "public", "db", "clientesis", "columns");

const tree = JSON.parse(readFileSync(treePath, "utf8"));

tree.doc = {
	description:
		"\u00c1rbol \u00fanico que documenta el modelo de tablas del m\u00f3dulo de capacitaci\u00f3n de ClientesIS. " +
		"Cada rama representa una intenci\u00f3n l\u00f3gica de agrupaci\u00f3n y los nodos hoja son tablas SQL. " +
		"Los nodos agrupadores tipo `prefix` son vigilantes que decoran a sus descendientes.",
	rules: [
		"Las tablas hoja persisten su \u00e1rbol de columnas en `columns/{tableRef}.json`.",
		"El campo `name` de la tabla NUNCA incluye el prefijo; el prefijo se aplica al emitir SQL v\u00eda warden.",
		"Los `id` jer\u00e1rquicos (ej. `1.2.3`) son la fuente de verdad para resolver ancestros y para `findNodeById`.",
		"Un nodo vigilante DEBE declarar `wardenAction.idaction`. El runtime resuelve la transformaci\u00f3n desde un registry.",
		"Los `idaction` reservados actualmente: `prefix`. Cuando se a\u00f1adan `domain` u otros, deben documentarse en `entities`.",
		"`effectivePrefix` en `tableMeta` debe coincidir con el prefijo del padre vigilante; se valida al guardar.",
		"Las acciones de vigilantes NUNCA mutan al nodo original: operan sobre `draft.decoratedObj`.",
		"Las modificaciones manuales de docs en estos JSON se preservan al guardar (los writers hacen merge por identidad estable).",
	],
	entities: {
		root: {
			label: "Ra\u00edz del \u00e1rbol",
			description: "Contenedor sint\u00e9tico. No emite SQL ni se renderiza como nodo cliqueable.",
			rules: ["Su `id` es vac\u00edo (`\"\"`).", "Sus hijos definen el orden inicial de prefijos y tablas bare."],
			objShape: { },
		},
		prefix: {
			label: "Prefijo SQL (vigilante)",
			description:
				"Agrupa tablas que comparten un prefijo SQL com\u00fan (ej. `CAPAC_`). " +
				"Es un vigilante: decora a cada descendiente concatenando el prefijo a su `rowName`.",
			rules: [
				"Su `obj.prefix` debe terminar en `_` y ser may\u00fascula.",
				"Su `wardenAction.idaction` debe ser `\"prefix\"`.",
				"Los hijos directos pueden ser otros prefijos (anidaci\u00f3n) o tablas.",
				"Renombrar el prefijo afecta a todos los descendientes en SQL pero no muta sus `name`.",
			],
			objShape: { rowName: "string", prefix: "string" },
		},
		domain: {
			label: "Dominio funcional",
			description:
				"Agrupador conceptual master/slave (a\u00fan no persistido en disco; vive en localStorage del cliente). " +
				"Se reservar\u00e1 `wardenAction.idaction = \"domain\"` cuando se migre.",
			rules: [
				"Un dominio define una tabla `master` y N esclavas que viajan con ella.",
				"No emite SQL adicional; es metadata para generaci\u00f3n y navegaci\u00f3n.",
			],
			objShape: { domainId: "string", masterTable: "string" },
		},
		table: {
			label: "Tabla SQL",
			description: "Hoja del \u00e1rbol. Su esquema vive en `columns/{tableRef}.json`.",
			rules: [
				"`obj.tableRef` y `obj.rowName` siempre coinciden y NO incluyen el prefijo.",
				"Para obtener el nombre SQL real se debe componer con la cadena de prefijos ancestros.",
				"Eliminar el nodo elimina tambi\u00e9n el archivo de columnas correspondiente al guardar.",
			],
			objShape: { tableRef: "string", rowName: "string" },
		},
		col: {
			label: "Columna SQL",
			description: "Fila de un \u00e1rbol de columnas. Su forma sigue `TableRow` de `tableSchema.ts`.",
			rules: [
				"`primaryKey: true` participa en la PK; m\u00faltiples columnas con `primaryKey: true` forman una PK compuesta.",
				"`type` debe estar en may\u00fasculas y respetar el cat\u00e1logo `COMMON_COLUMN_TYPES`.",
				"Las columnas de auditor\u00eda (IUSUARIOCRE, FHCRE, IUSUARIOULT, FHULT, IAPPCRE, IPCRE, IAPPULT, IPULT) se autogeneran cuando `Auditar` est\u00e1 activo.",
			],
			objShape: { name: "string", type: "string", nullable: "string", primaryKey: "boolean", defaultValue: "string", extra: "string" },
		},
	},
};

// Doc del nodo ra\u00edz
tree.root.doc = {
	description: "Punto de entrada del \u00e1rbol. Contiene los prefijos de primer nivel y las tablas bare (sin prefijo).",
	rules: [
		"El orden de los hijos refleja el orden de aparici\u00f3n en el dise\u00f1o conceptual: primero `CAPAC_`, luego tablas comunes (`PERMISOS`, `TEMAS`).",
	],
};

// Doc del prefix CAPAC_
const capac = tree.root.children.find((n) => n.kind === "prefix" && n.obj?.prefix === "CAPAC_");
if (capac) {
	capac.doc = {
		description:
			"Familia de tablas del m\u00f3dulo de Capacitaci\u00f3n. Todas las tablas SQL bajo este nodo ser\u00e1n emitidas como `CAPAC_<NAME>`.",
		rules: [
			"Cualquier tabla nueva relativa a planes de estudio, cursos, drivers o auditor\u00edas de capacitaci\u00f3n debe colgarse aqu\u00ed.",
			"NO renombrar este prefijo sin coordinar con migraci\u00f3n de datos en producci\u00f3n.",
		],
		notes: [
			"Origen hist\u00f3rico: fragmentos legacy `tablas-principales-con-prefijo-capac-5`, `tablas-pivote-y-detalles-6` y `tablas-de-historial-auditora-a-7`.",
		],
	};
}

// Doc por tabla
const tableDocs = {
	HISTORIALPLANESTUDIO: {
		description: "Auditor\u00eda granular de cambios sobre `CAPAC_PLANES_ESTUDIO`. Una fila por campo modificado.",
		rules: [
			"Inmutable a nivel de aplicaci\u00f3n: solo INSERT.",
			"`CAMPO` debe coincidir con el nombre f\u00edsico de la columna auditada.",
			"`VALOR` guarda el valor NUEVO; el anterior se reconstruye buscando la fila previa.",
		],
		notes: ["Se generaliz\u00f3 desde un patr\u00f3n por columna a un \u00fanico log narrow para evitar explosi\u00f3n de tablas."],
	},
	HISTORIALCURSO: {
		description: "An\u00e1logo a HISTORIALPLANESTUDIO pero para `CAPAC_CURSOS`.",
		rules: ["Inmutable.", "Mismo contrato `CAMPO`/`VALOR` que el resto de historiales."],
	},
	SEGURIDADES_CURSOS: {
		description: "Mapea permisos por curso. Cada fila concede un permiso a un curso espec\u00edfico.",
		rules: [
			"PK compuesta (ICURSO, IPERMISO).",
			"`BACTIVO` controla el soft-delete: las filas inactivas se ignoran en autorizaci\u00f3n.",
		],
	},
	CURSOS_PREREQUISITOS: {
		description: "Grafo de prerequisitos entre cursos. (curso, prerequisito).",
		rules: ["Sin ciclos: el cliente debe validar antes de insertar.", "Self-loops prohibidos."],
	},
	CURSOS_DE_PLANES_ESTUDIO: {
		description: "Tabla puente N:N entre cursos y planes de estudio.",
		rules: ["PK compuesta (IPLANESTUDIO, ICURSO).", "Permite metadatos del v\u00ednculo (orden, obligatoriedad)."],
	},
	ATRIBUTOS_PLANES: {
		description: "Atributos extensibles asociados a planes de estudio. Modelo EAV light.",
		rules: ["Cada atributo requiere su definici\u00f3n correspondiente en CAPAC_DRIVERS / CAPAC_ATRIBUTOS_X_DRIVERS."],
	},
	ESTRUCTURAS_CURSOS: {
		description: "Define la estructura jer\u00e1rquica interna de un curso (m\u00f3dulos, lecciones).",
		rules: ["El padre se referencia por `IESTRUCTURA_PADRE`; root tiene `IESTRUCTURA_PADRE` nulo."],
	},
	PLANES_CURSOS: {
		description: "Catalogo de planes de cursos disponibles.",
		rules: ["`BACTIVO` controla visibilidad en UIs cliente."],
	},
	DRIVERS: {
		description: "Conductores/instructores que pueden ser asignados a cursos o planes.",
		rules: ["Una persona f\u00edsica puede tener varios drivers si maneja distintos perfiles."],
	},
	PLANES_ESTUDIO: {
		description: "Plan de estudio: el contenedor m\u00e1s alto del m\u00f3dulo de capacitaci\u00f3n.",
		rules: ["Un plan agrupa cursos a trav\u00e9s de CAPAC_CURSOS_DE_PLANES_ESTUDIO."],
	},
	CURSOS: {
		description: "Cat\u00e1logo de cursos. Tabla central del m\u00f3dulo.",
		rules: [
			"`ICURSO` es la PK natural (varchar) usada en relaciones.",
			"Cambios de duraci\u00f3n/instructor se auditan en CAPAC_HISTORIALCURSO.",
		],
	},
	ATRIBUTOS_X_DRIVERS: {
		description: "Pivote N:N entre atributos y drivers.",
		rules: ["PK compuesta (IDRIVER, IATRIBUTO)."],
	},
	PERMISOS: {
		description: "Cat\u00e1logo global de permisos del sistema (no espec\u00edfico de capacitaci\u00f3n). Por eso vive sin prefijo.",
		rules: ["`IPERMISO` es global; cualquier m\u00f3dulo lo referencia."],
	},
	TEMAS: {
		description: "Cat\u00e1logo de temas transversales. Aunque originalmente naci\u00f3 como CAPAC_TEMAS, se promovi\u00f3 a tabla com\u00fan.",
		rules: ["Sin prefijo: se usa desde m\u00faltiples m\u00f3dulos.", "Renombrarla impactar\u00eda integraciones externas."],
	},
};

function findTableNode(tree, name) {
	const dfs = (n) => {
		if (n.kind === "table" && (n.obj?.tableRef === name || n.obj?.rowName === name)) return n;
		for (const c of n.children ?? []) {
			const r = dfs(c);
			if (r) return r;
		}
		return null;
	};
	return dfs(tree.root);
}

for (const [name, doc] of Object.entries(tableDocs)) {
	const n = findTableNode(tree, name);
	if (n) n.doc = doc;
}

writeFileSync(treePath, JSON.stringify(tree, null, 2), "utf8");
console.log("OK tables-tree.json actualizado");

// Documentar columnas clave de SEGURIDADES_CURSOS y HISTORIALPLANESTUDIO.
const colDocs = {
	SEGURIDADES_CURSOS: {
		treeDoc: {
			description: "\u00c1rbol de columnas de la tabla puente CAPAC_SEGURIDADES_CURSOS.",
			rules: ["Las dos primeras columnas forman la PK compuesta y NO admiten NULL."],
		},
		cols: {
			ICURSO: { description: "FK l\u00f3gica al curso (CAPAC_CURSOS.ICURSO).", rules: ["NOT NULL impl\u00edcito por PK."] },
			IPERMISO: { description: "FK l\u00f3gica al permiso (PERMISOS.IPERMISO).", rules: ["NOT NULL impl\u00edcito por PK."] },
			BACTIVO: { description: "Soft-delete. `false` excluye la fila de evaluaciones de autorizaci\u00f3n.", rules: ["Default conceptual: true."] },
		},
	},
	HISTORIALPLANESTUDIO: {
		treeDoc: {
			description: "\u00c1rbol de columnas del log narrow de auditor\u00eda de planes de estudio.",
			rules: ["INSERT-only. Usar generador de auditor\u00eda autom\u00e1tica del backend, no inserts manuales."],
		},
		cols: {
			IHISTORIALPLANESTUDIO: { description: "Identificador secuencial del registro de auditor\u00eda.", rules: ["BIGINT autoincrement."] },
			CAMPO: { description: "Nombre de la columna auditada.", rules: ["Debe coincidir con un nombre f\u00edsico de CAPAC_PLANES_ESTUDIO."] },
			VALOR: { description: "Valor nuevo despu\u00e9s del cambio (texto).", rules: ["TEXT para soportar valores grandes."] },
		},
	},
};

for (const [name, info] of Object.entries(colDocs)) {
	const file = path.join(colsDir, `${name}.json`);
	const cols = JSON.parse(readFileSync(file, "utf8"));
	cols.doc = info.treeDoc;
	for (const child of cols.root.children ?? []) {
		const cname = child.obj?.name;
		if (cname && info.cols[cname]) child.doc = info.cols[cname];
	}
	writeFileSync(file, JSON.stringify(cols, null, 2), "utf8");
	console.log(`OK columns/${name}.json actualizado`);
}
