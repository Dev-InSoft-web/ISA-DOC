const path = require('path');

const items = [
	{
		"name": "Drivers",
		"item": generateCRUDItems("Driver", "drivers", "driver", "idriver", "1")
	},
	{
		"name": "Atributos Driver",
		"item": generateCRUDItems("AtributosXDriver", "driver/atributos", "driver/atributo", ["idriver", "iatributo"], ["1", "1"])
	},
	{
		"name": "Estructura Curso",
		"item": generateCRUDItems("EstructuraCurso", "curso/estructuras", "curso/estructura", ["icurso", "inivel"], ["CURSO001", "1"])
	},
	{
		"name": "Cursos",
		"item": generateCRUDItems("Curso", "cursos", "curso", "icurso", "CURSO001")
	},
	{
		"name": "Temas",
		"item": generateCRUDItems("Tema", "temas", "tema", "itema", "TEMA001")
	},
	{
		"name": "Planes de Estudio",
		"item": generateCRUDItems("PlanEstudio", "planes/estudio", "plan/estudio", "iplanestudio", "PLAN001")
	},
	{
		"name": "Recursos",
		"item": generateCRUDItems("Recurso", "recursos", "recurso", "irecurso", "REC001")
	},
	{
		"name": "Mensajes",
		"item": generateCRUDItems("RecursoMensaje", "mensajes", "mensaje", "imensaje", "MSG001")
	},
	{
		"name": "Usuarios",
		"item": generateCRUDItems("Usuario", "usuarios", "usuario", "iusuario", "USER001")
	}
];

function generateListItem(name, listPath) {
	return {
		"name": "GET - Listar",
		"request": {
			"auth": { "type": "bearer", "bearer": [{ "key": "token", "value": "{{token}}", "type": "string" }] },
			"method": "GET",
			"header": [{ "key": "Content-Type", "value": "application/json" }],
			"url": {
				"raw": `{{base_url}}/api/${listPath}/:filtro`,
				"host": ["{{base_url}}"],
				"path": ["api", ...listPath.split('/'), ":filtro"],
				"variable": [{ "key": "filtro", "value": "e30=", "description": "Filtro de búsqueda en base64" }]
			}
		},
		"response": []
	};
}

function generateCRUDItems(entityName, listPath, singlePath, pk, pkValue, listPathOverride = false) {
	const pks = Array.isArray(pk) ? pk : [pk];
	const pkValues = Array.isArray(pkValue) ? pkValue : [pkValue];

	const variables = pks.map((k, i) => ({
		"key": k,
		"value": pkValues[i],
		"description": `Identificador ${k}`
	}));

	const pathSegments = singlePath.split('/');
	const listPathSegments = listPath.split('/');

	const items = [
		{
			"name": "GET - Listar",
			"request": {
				"auth": { "type": "bearer", "bearer": [{ "key": "token", "value": "{{token}}", "type": "string" }] },
				"method": "GET",
				"header": [{ "key": "Content-Type", "value": "application/json" }],
				"url": {
					"raw": `{{base_url}}/api/${listPath}/:filtro`,
					"host": ["{{base_url}}"],
					"path": ["api", ...listPathSegments, ":filtro"],
					"variable": [{ "key": "filtro", "value": "e30=", "description": "Filtro de búsqueda en base64" }]
				}
			},
			"response": []
		},
		{
			"name": "GET - Obtener",
			"request": {
				"auth": { "type": "bearer", "bearer": [{ "key": "token", "value": "{{token}}", "type": "string" }] },
				"method": "GET",
				"header": [{ "key": "Content-Type", "value": "application/json" }],
				"url": {
					"raw": `{{base_url}}/api/${singlePath}/${pks.map(k => ':' + k).join('/')}`,
					"host": ["{{base_url}}"],
					"path": ["api", ...pathSegments, ...pks.map(k => ':' + k)],
					"variable": variables
				}
			},
			"response": []
		},
		{
			"name": "POST - Crear",
			"request": {
				"auth": { "type": "bearer", "bearer": [{ "key": "token", "value": "{{token}}", "type": "string" }] },
				"method": "POST",
				"header": [{ "key": "Content-Type", "value": "application/json" }],
				"body": { "mode": "raw", "raw": "{}" },
				"url": {
					"raw": `{{base_url}}/api/${singlePath}`,
					"host": ["{{base_url}}"],
					"path": ["api", ...pathSegments]
				}
			},
			"response": []
		},
		{
			"name": "PUT - Actualizar",
			"request": {
				"auth": { "type": "bearer", "bearer": [{ "key": "token", "value": "{{token}}", "type": "string" }] },
				"method": "PUT",
				"header": [{ "key": "Content-Type", "value": "application/json" }],
				"body": { "mode": "raw", "raw": "{}" },
				"url": {
					"raw": `{{base_url}}/api/${singlePath}/${pks.map(k => ':' + k).join('/')}`,
					"host": ["{{base_url}}"],
					"path": ["api", ...pathSegments, ...pks.map(k => ':' + k)],
					"variable": variables
				}
			},
			"response": []
		},
		{
			"name": "DELETE - Eliminar",
			"request": {
				"auth": { "type": "bearer", "bearer": [{ "key": "token", "value": "{{token}}", "type": "string" }] },
				"method": "DELETE",
				"header": [{ "key": "Content-Type", "value": "application/json" }],
				"url": {
					"raw": `{{base_url}}/api/${singlePath}/${pks.map(k => ':' + k).join('/')}`,
					"host": ["{{base_url}}"],
					"path": ["api", ...pathSegments, ...pks.map(k => ':' + k)],
					"variable": variables
				}
			},
			"response": []
		}
	];

	return items;
}

const fs = require('fs');
fs.writeFileSync(path.join(__dirname, 'items.json'), JSON.stringify(items, null, 2));
console.log('File written to items.json');
