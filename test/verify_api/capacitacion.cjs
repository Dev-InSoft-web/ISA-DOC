const { createdEntities } = require('./state.cjs');
const { request } = require('./http.cjs');
const {
	testVerificarEndpoint,
	testDuplicarEndpoint,
	testConsolidarEndpoint,
	testRecodificarEndpoint,
} = require('./entities.cjs');

/**
 * Verificar + duplicar (smoke) + consolidar/recodificar (smoke opcional).
 * Orden: coincide con dependencias FK (atributos plan referencian iatributo de driver).
 */
async function testCapacitacionVerificarConsolidarRecodificar({
	IDRIVER_TEST,
	ATTR_BASE,
	IPLAN,
	ICURSO,
	iplanestudio,
}) {
	const err = '⚠️';
	console.log(`\n###############################################################`);
	console.log(`CAPACITACIÓN: Verificar / duplicar / consolidar / recodificar`);
	console.log(`###############################################################`);

	const verificarCases = [
		['tema', 'TEMATEST', 'tema'],
		['driver', String(IDRIVER_TEST), 'driver'],
		['permiso', 'PERMTEST', 'permiso'],
		['curso', ICURSO, 'curso'],
		['plan/estudio', iplanestudio, 'plan/estudio'],
		['plan/estudio/curso', `${iplanestudio}/${ICURSO}`, 'plan/estudio/curso'],
		['plan/curso', `${IPLAN}/${ICURSO}`, 'plan/curso'],
		['curso/prerequisito', `${ICURSO}/CURSOTEST_1/${iplanestudio}`, 'curso/prerequisito'],
		['plan/estudio/atributo', `${IPLAN}/901/${ICURSO}`, 'plan/estudio/atributo'],
		['curso/estructura', `${ICURSO}/1`, 'curso/estructura'],
		['curso/seguridad', `${ICURSO}/PERMTEST`, 'curso/seguridad'],
		['driver/atributo', `${IDRIVER_TEST}/${ATTR_BASE}`, 'driver/atributo'],
	];

	for (const [label, idPath, apiName] of verificarCases) {
		await testVerificarEndpoint(label, apiName, idPath, err);
	}

	const TEMA_DUP_SRC = 'TEMATEST_DUP_SRC';
	console.log(`\n--- Duplicar (smoke): tema ${TEMA_DUP_SRC} → TEMATEST_APIVERIFY ---`);
	let rDupSrc = await request('POST', '/api/tema', { itema: TEMA_DUP_SRC, ntema: 'Tema duplicar origen' });
	if (rDupSrc.status === 200 || rDupSrc.status === 201) {
		createdEntities.push({
			name: 'TemaDupSrc',
			apiName: 'tema',
			listName: 'temas',
			idKey: 'itema',
			allTestIds: [TEMA_DUP_SRC],
			idPath1: TEMA_DUP_SRC,
			extras: [],
			getIdStr: (o) => o.itema,
			icon: '✅',
		});
	} else {
		console.error(`   POST ${TEMA_DUP_SRC}: HTTP ${rDupSrc.status} ${err} — ${JSON.stringify(rDupSrc.data)}`);
	}

	const dupTema = await testDuplicarEndpoint('tema', 'tema', TEMA_DUP_SRC, {
		itema: 'TEMATEST_APIVERIFY',
		ntema: 'Tema verificación API',
	});
	if (dupTema.ok && !dupTema.skipped) {
		createdEntities.push({
			name: 'TemaDupVerify',
			apiName: 'tema',
			listName: 'temas',
			idKey: 'itema',
			allTestIds: ['TEMATEST_APIVERIFY'],
			idPath1: 'TEMATEST_APIVERIFY',
			extras: [],
			getIdStr: (o) => o.itema,
			icon: '✅',
		});
	}

	console.log(`\n--- Duplicar (smoke): driver ${IDRIVER_TEST} → 299 ---`);
	const dupDr = await testDuplicarEndpoint('driver', 'driver', String(IDRIVER_TEST), {
		idriver: 299,
		ndriver: 'Driver dup API',
		descripcion: '',
		qniveles: 1,
	});
	if (dupDr.ok && !dupDr.skipped) {
		createdEntities.push({
			name: 'DriverDup299',
			apiName: 'driver',
			listName: 'drivers',
			idKey: 'idriver',
			allTestIds: [299],
			idPath1: '299',
			extras: [],
			getIdStr: (o) => String(o.idriver),
			icon: '✅',
		});
	}

	const _suf = Date.now().toString(36);
	const TEMA_CONS_A = `TCA_${_suf}`;
	const TEMA_CONS_B = `TCB_${_suf}`;
	const TEMA_RECO_A = `TRA_${_suf}`;
	const TEMA_RECO_B = `TRB_${_suf}`;

	console.log(`\n--- Consolidar / Recodificar (smoke): dos PK distintas (evita "mismo identificador") ---`);
	for (const [itema, ntema] of [
		[TEMA_CONS_A, 'Tema cons origen'],
		[TEMA_CONS_B, 'Tema cons destino'],
		[TEMA_RECO_A, 'Tema reco origen'],
	]) {
		const r = await request('POST', '/api/tema', { itema, ntema });
		if (r.status === 200 || r.status === 201) {
			console.log(`   POST tema ${itema}: OK ✅`);
		} else {
			console.error(`   POST tema ${itema}: HTTP ${r.status} ${err} — ${JSON.stringify(r.data)}`);
		}
	}

	await testConsolidarEndpoint('tema', 'tema', TEMA_CONS_A, { itema: TEMA_CONS_B, ntema: 'Tema consolidar smoke' }, err);
	await testRecodificarEndpoint('tema', 'tema', TEMA_RECO_A, { itema: TEMA_RECO_B, ntema: 'Tema recodificado smoke' }, err);

	createdEntities.push({
		name: 'TemaConsolidarDestino',
		apiName: 'tema',
		listName: 'temas',
		idKey: 'itema',
		allTestIds: [TEMA_CONS_B],
		idPath1: TEMA_CONS_B,
		extras: [],
		getIdStr: (o) => o.itema,
		icon: '✅',
	});
	createdEntities.push({
		name: 'TemaRecodificado',
		apiName: 'tema',
		listName: 'temas',
		idKey: 'itema',
		allTestIds: [TEMA_RECO_B],
		idPath1: TEMA_RECO_B,
		extras: [],
		getIdStr: (o) => o.itema,
		icon: '✅',
	});
}
module.exports = { testCapacitacionVerificarConsolidarRecodificar };
