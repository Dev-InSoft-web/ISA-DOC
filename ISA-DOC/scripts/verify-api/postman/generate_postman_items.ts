import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PostmanVariable {
	key: string;
	value: string;
	description?: string;
	type?: string;
}

interface PostmanUrl {
	raw: string;
	host: string[];
	path: string[];
	variable?: PostmanVariable[];
}

interface PostmanRequest {
	auth: { type: 'bearer'; bearer: PostmanVariable[] };
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	header: Array<{ key: string; value: string }>;
	body?: { mode: 'raw'; raw: string };
	url: PostmanUrl;
}

interface PostmanItem {
	name: string;
	request: PostmanRequest;
	response: unknown[];
}

interface PostmanFolder {
	name: string;
	item: PostmanItem[];
}

const bearerAuth = {
	type: 'bearer' as const,
	bearer: [{ key: 'token', value: '{{token}}', type: 'string' }],
};

function generateCRUDItems(
	_entityName: string,
	listPath: string,
	singlePath: string,
	pk: string | string[],
	pkValue: string | string[],
): PostmanItem[] {
	const pks = Array.isArray(pk) ? pk : [pk];
	const pkValues = Array.isArray(pkValue) ? pkValue : [pkValue];

	const variables: PostmanVariable[] = pks.map((k, i) => ({
		key: k,
		value: pkValues[i] ?? '',
		description: `Identificador ${k}`,
	}));

	const pathSegments = singlePath.split('/');
	const listPathSegments = listPath.split('/');
	const pkParams = pks.map((k) => ':' + k);

	return [
		{
			name: 'GET - Listar',
			request: {
				auth: bearerAuth,
				method: 'GET',
				header: [{ key: 'Content-Type', value: 'application/json' }],
				url: {
					raw: `{{base_url}}/api/${listPath}/:filtro`,
					host: ['{{base_url}}'],
					path: ['api', ...listPathSegments, ':filtro'],
					variable: [{ key: 'filtro', value: 'e30=', description: 'Filtro de búsqueda en base64' }],
				},
			},
			response: [],
		},
		{
			name: 'GET - Obtener',
			request: {
				auth: bearerAuth,
				method: 'GET',
				header: [{ key: 'Content-Type', value: 'application/json' }],
				url: {
					raw: `{{base_url}}/api/${singlePath}/${pkParams.join('/')}`,
					host: ['{{base_url}}'],
					path: ['api', ...pathSegments, ...pkParams],
					variable: variables,
				},
			},
			response: [],
		},
		{
			name: 'POST - Crear',
			request: {
				auth: bearerAuth,
				method: 'POST',
				header: [{ key: 'Content-Type', value: 'application/json' }],
				body: { mode: 'raw', raw: '{}' },
				url: {
					raw: `{{base_url}}/api/${singlePath}`,
					host: ['{{base_url}}'],
					path: ['api', ...pathSegments],
				},
			},
			response: [],
		},
		{
			name: 'PUT - Actualizar',
			request: {
				auth: bearerAuth,
				method: 'PUT',
				header: [{ key: 'Content-Type', value: 'application/json' }],
				body: { mode: 'raw', raw: '{}' },
				url: {
					raw: `{{base_url}}/api/${singlePath}/${pkParams.join('/')}`,
					host: ['{{base_url}}'],
					path: ['api', ...pathSegments, ...pkParams],
					variable: variables,
				},
			},
			response: [],
		},
		{
			name: 'DELETE - Eliminar',
			request: {
				auth: bearerAuth,
				method: 'DELETE',
				header: [{ key: 'Content-Type', value: 'application/json' }],
				url: {
					raw: `{{base_url}}/api/${singlePath}/${pkParams.join('/')}`,
					host: ['{{base_url}}'],
					path: ['api', ...pathSegments, ...pkParams],
					variable: variables,
				},
			},
			response: [],
		},
	];
}

const items: PostmanFolder[] = [
	{ name: 'Drivers', item: generateCRUDItems('Driver', 'drivers', 'driver', 'idriver', '1') },
	{ name: 'Atributos Driver', item: generateCRUDItems('AtributosXDriver', 'driver/atributos', 'driver/atributo', ['idriver', 'iatributo'], ['1', '1']) },
	{ name: 'Estructura Curso', item: generateCRUDItems('EstructuraCurso', 'curso/estructuras', 'curso/estructura', ['icurso', 'inivel'], ['CURSO001', '1']) },
	{ name: 'Cursos', item: generateCRUDItems('Curso', 'cursos', 'curso', 'icurso', 'CURSO001') },
	{ name: 'Temas', item: generateCRUDItems('Tema', 'temas', 'tema', 'itema', 'TEMA001') },
	{ name: 'Planes de Estudio', item: generateCRUDItems('PlanEstudio', 'planes/estudio', 'plan/estudio', 'iplanestudio', 'PLAN001') },
	{ name: 'Recursos', item: generateCRUDItems('Recurso', 'recursos', 'recurso', 'irecurso', 'REC001') },
	{ name: 'Mensajes', item: generateCRUDItems('RecursoMensaje', 'mensajes', 'mensaje', 'imensaje', 'MSG001') },
	{ name: 'Usuarios', item: generateCRUDItems('Usuario', 'usuarios', 'usuario', 'iusuario', 'USER001') },
];

const out = path.join(__dirname, 'items.json');
fs.writeFileSync(out, JSON.stringify(items, null, 2));
console.log(`File written to ${out}`);
