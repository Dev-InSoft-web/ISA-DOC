const { baseUrl, loadToken } = require('./http.cjs');
const { filtroB64, unwrap } = require('./helpers.cjs');
const {
	buildAtributosDriverNested,
	verifyCursoRichResponse,
	testDriverAtributosListSmoke,
} = require('./curso.cjs');
const {
	testEntityCompositeCRUL,
	testEntityCRUL,
	cleanupAll,
	testDriverNestedAtributos,
} = require('./entities.cjs');
const { testCapacitacionVerificarConsolidarRecodificar } = require('./capacitacion.cjs');
const { request } = require('./http.cjs');
const { testPlanescursoOrderForCurso } = require('./planOrder.cjs');

async function runTests(logFile) {
	console.log('--- STARTING COMPREHENSIVE API VERIFICATION ---');
	console.log('--- Report File: ' + logFile + ' ---');
	console.log('--- Base URL: ' + baseUrl + ' ---');

	if (!loadToken()) {
		console.error('Abort: configure authentication first.');
		process.exit(1);
	}

	const IDRIVER_TEST = 200;
	const ATTR_BASE = 901;
	const IPLAN = 'PLANCOMPLEX';
	const ICURSO = 'CURSOTEST';
	/** Distinto de IPLAN: evita choques con filas/planes de curso ya existentes en BD de prueba. */
	const iplanestudio = 'PE_APIVERIFY';
	const jconfigSample = {
		descripcion: 'Prueba API',
		source: '',
		maxlength: 0,
		accept: '',
		multiple: false,
		presentacion: 0,
	};

	const atributosDriverNested = buildAtributosDriverNested(IDRIVER_TEST, ATTR_BASE, jconfigSample);
	const pkAttr = ['idriver', 'iatributo'];
	const baseAttr = { idriver: IDRIVER_TEST, iatributo: ATTR_BASE };
	const extrasAttr = [1, 2, 3].map((i) => ({ idriver: IDRIVER_TEST, iatributo: ATTR_BASE + i }));
	const allAttrPks = [baseAttr, ...extrasAttr];

	/* --- Capacitación: catálogos base --- */
	await testEntityCRUL('Tema', 'tema', { itema: 'TEMATEST' }, { ntema: 'Tema Prueba' }, { ntema: 'Tema Prueba Upd' }, null, '✅');

	/* Driver: POST con atributos embebidos (901–904), sin depender de un segundo paso */
	await testEntityCRUL(
		'Driver',
		'driver',
		{ idriver: IDRIVER_TEST },
		{
			ndriver: 'Driver Prueba',
			qniveles: 2,
			descripcion: 'Driver POST con atributos anidados',
			atributos: atributosDriverNested,
		},
		{ ndriver: 'Driver Prueba Upd' },
		null,
		'✅',
		{ stripFromExtras: ['atributos'] },
	);

	console.log(`\n--- Smoke: listado driver/atributos tras POST driver con anidación ---`);
	await testDriverAtributosListSmoke(IDRIVER_TEST, [901, 902, 903, 904]);

	/* Permiso antes del curso (seguridades anidadas en POST curso) */
	await testEntityCRUL('Permiso', 'permiso', { ipermiso: 'PERMTEST' }, { npermiso: 'Permiso prueba' }, { npermiso: 'Permiso prueba upd' }, null, '✅');

	const atributosParaCursoDriver = buildAtributosDriverNested(IDRIVER_TEST, ATTR_BASE, jconfigSample);
	const cursoCreateRich = {
		ncurso: 'Curso Prueba',
		descripcion: 'Desc — POST con tema, driver+atributos, estructuras, seguridades, planes+atributosplan (prueba ciclos / profundidad)',
		bactivo: true,
		itema: 'TEMATEST',
		idriver: IDRIVER_TEST,
		tema: { itema: 'TEMATEST', ntema: 'Tema Prueba Upd' },
		driver: {
			idriver: IDRIVER_TEST,
			ndriver: 'Driver Prueba',
			qniveles: 2,
			descripcion: '',
			atributos: atributosParaCursoDriver,
		},
		estructuras: [
			{ icurso: ICURSO, qnivel: '1', nnivel: 'Bloque anidado A' },
			{ icurso: ICURSO, qnivel: '2', nnivel: 'Bloque anidado B' },
		],
		seguridades: [
			{
				icurso: ICURSO,
				ipermiso: 'PERMTEST',
				permiso: { ipermiso: 'PERMTEST', npermiso: 'Permiso prueba upd' },
			},
		],
		planes: [
			{
				iplan: IPLAN,
				icurso: ICURSO,
				titulo: 'Plan anidado en POST curso',
				itema: 'TEMATEST',
				irecurso: '',
				iplanpadre: '',
				atributosplan: [
					{ iplan: IPLAN, iatributo: 901, icurso: ICURSO, valor: 'valor-atributo-plan-anidado-901' },
				],
			},
		],
	};

	await testEntityCRUL(
		'Curso',
		'curso',
		{ icurso: ICURSO },
		cursoCreateRich,
		{ ncurso: 'Curso Updated' },
		null,
		'✅',
		{
			skipCreateCoherence: true,
			stripFromExtras: ['tema', 'driver', 'estructuras', 'seguridades', 'planes'],
			afterCreateRead: async (u) => {
				const b64Todo = filtroB64({ todo: true });
				const resTodo = await request('GET', `/api/curso/${ICURSO}/${b64Todo}`);
				const payload = resTodo.status === 200 ? unwrap(resTodo.data) : u;
				if (resTodo.status !== 200) {
					console.log(
						`   [curso] GET con filtro {todo:true} HTTP ${resTodo.status} — usando respuesta del GET simple para verificación`,
					);
				}
				return verifyCursoRichResponse(payload, { icurso: ICURSO, idriver: IDRIVER_TEST });
			},
		},
	);

	await testEntityCRUL(
		'PlanEstudio',
		'plan/estudio',
		{ iplanestudio },
		{
			nombre: 'Plan Complex',
			bactivo: true,
			descripcionplan: 'Desc',
			ttdvisualizacion: 'T',
			bgeneracertificados: false,
		},
		{ nombre: 'Plan Updated', bactivo: true },
		'planes/estudio',
		'✅',
		{ relaxCreateRecoverGet: true },
	);

	/* Curso dentro del plan de estudio */
	await testEntityCompositeCRUL(
		'CursoDePlanDeEstudio',
		'plan/estudio/curso',
		'plan/estudio/cursos',
		['iplanestudio', 'icurso'],
		{ iplanestudio, icurso: ICURSO },
		{ qorden: 1, brequerido: true },
		{ qorden: 2, brequerido: false },
		[
			{ iplanestudio, icurso: 'CURSOTEST_1' },
			{ iplanestudio, icurso: 'CURSOTEST_2' },
			{ iplanestudio, icurso: 'CURSOTEST_3' },
		],
		'✅',
	);

	/* Plan de cursos (jerarquía IPLAN) */
	const basePlanCurso = { iplan: IPLAN, icurso: ICURSO };
	const extrasPlanCurso = [
		{ iplan: `${IPLAN}.1`, icurso: ICURSO },
		{ iplan: `${IPLAN}.2`, icurso: ICURSO },
		{ iplan: `${IPLAN}.3`, icurso: ICURSO },
	];
	await testEntityCompositeCRUL(
		'PlanCurso',
		'plan/curso',
		'plan/cursos',
		['iplan', 'icurso'],
		basePlanCurso,
		{
			titulo: 'Nodo plan',
			itema: 'TEMATEST',
			irecurso: '',
			iplanpadre: '',
		},
		{ titulo: 'Nodo plan actualizado' },
		extrasPlanCurso,
		'✅',
	);

	await testPlanescursoOrderForCurso(ICURSO, {
		label: 'CURSOTEST (planes PLANCOMPLEX + .1/.2/.3)',
	});
	const extraPlanOrder = process.env.VERIFY_API_PLAN_ORDER_ICURSO?.trim();
	if (extraPlanOrder) {
		await testPlanescursoOrderForCurso(extraPlanOrder, {
			label: `curso ${extraPlanOrder} (VERIFY_API_PLAN_ORDER_ICURSO)`,
		});
	}

	/* Prerrequisitos (necesita CURSOTEST_1..3 del listado curso) */
	await testEntityCompositeCRUL(
		'CursoPrerequisito',
		'curso/prerequisito',
		'curso/prerequisitos',
		['icurso', 'icursorequerido', 'iplanestudio'],
		{ icurso: ICURSO, icursorequerido: 'CURSOTEST_1', iplanestudio },
		{},
		{},
		[
			{ icurso: ICURSO, icursorequerido: 'CURSOTEST_2', iplanestudio },
			{ icurso: ICURSO, icursorequerido: 'CURSOTEST_3', iplanestudio },
			{ icurso: 'CURSOTEST_1', icursorequerido: ICURSO, iplanestudio },
		],
		'✅',
	);

	/* Atributos de plan: PK iatributo debe existir en AtributosXDriver (901–904) */
	const baseAttrPlanOk = { iplan: IPLAN, iatributo: 901, icurso: ICURSO };
	const extrasAttrPlanOk = [1, 2, 3].map((i) => ({ iplan: IPLAN, iatributo: 901 + i, icurso: ICURSO }));
	await testEntityCompositeCRUL(
		'AtributosPlan',
		'plan/estudio/atributo',
		'plan/estudio/atributos',
		['iplan', 'iatributo', 'icurso'],
		baseAttrPlanOk,
		{ valor: 'valor-atributo-plan', iatributo: 901 },
		{ valor: 'valor-atributo-plan-UPD' },
		extrasAttrPlanOk,
		'✅',
	);

	/* Estructura por niveles del curso */
	await testEntityCompositeCRUL(
		'EstructuraCurso',
		'curso/estructura',
		'curso/estructuras',
		['icurso', 'qnivel'],
		{ icurso: ICURSO, qnivel: '1' },
		{ nnivel: 'Nivel 1' },
		{ nnivel: 'Nivel 1 actualizado' },
		[
			{ icurso: ICURSO, qnivel: '2' },
			{ icurso: ICURSO, qnivel: '3' },
			{ icurso: ICURSO, qnivel: '4' },
		],
		'✅',
	);

	/* Seguridad curso ↔ permiso (PERMTEST + extras del CRUL permiso) */
	await testEntityCompositeCRUL(
		'SeguridadCurso',
		'curso/seguridad',
		'curso/seguridad',
		['icurso', 'ipermiso'],
		{ icurso: ICURSO, ipermiso: 'PERMTEST' },
		{},
		{},
		[
			{ icurso: ICURSO, ipermiso: 'PERMTEST_1' },
			{ icurso: ICURSO, ipermiso: 'PERMTEST_2' },
			{ icurso: ICURSO, ipermiso: 'PERMTEST_3' },
		],
		'✅',
	);

	await testDriverNestedAtributos(IDRIVER_TEST, allAttrPks, '✅');

	await testCapacitacionVerificarConsolidarRecodificar({
		IDRIVER_TEST,
		ATTR_BASE,
		IPLAN,
		ICURSO,
		iplanestudio,
	});

	await cleanupAll();

	console.log('\n--- Testing Finished ---');
}
module.exports = { runTests };
