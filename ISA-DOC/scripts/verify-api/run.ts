import { baseUrl, loadToken } from "./http.ts";
import { buildAtributosDriverNested } from "./curso.ts";
import { testEntityCRUL, cleanupAll } from "./entities.ts";

/**
 * NOTA — Endpoints actualmente expuestos por ISS-ClientesIS-ContaPymeU (FN-Capacitacion.ts):
 *   - /api/curso (CRUD + lista /api/cursos/{filtro})
 *   - /api/driver (CRUD + lista /api/drivers/{filtro})
 *   - /api/plan/estudio (CRUD + lista /api/planes/estudio/{filtro})
 *   - /api/recurso, /api/recurso/mensaje, /api/tdrecurso, /api/mensaje (no se prueban aquí)
 *
 * Eliminados en cambios recientes (no se prueban más):
 *   tema, permiso, curso/prerequisito, curso/estructura, curso/seguridad,
 *   plan/estudio/curso, plan/estudio/atributo, plan/curso, driver/atributo (alta directa),
 *   verificar/duplicar/consolidar/recodificar para los catálogos anteriores.
 */
export async function runTests(logFile: string): Promise<void> {
	console.log("--- STARTING COMPREHENSIVE API VERIFICATION ---");
	console.log("--- Report File: " + logFile + " ---");
	console.log("--- Base URL: " + baseUrl + " ---");

	if (!loadToken()) {
		console.error("⛔ Sin token. Abort.");
		process.exit(1);
	}

	const IDRIVER_TEST = 200;
	const ATTR_BASE = 901;
	const ICURSO = "CURSOTEST";
	/** Distinto de IPLAN: evita choques con filas/planes de curso ya existentes en BD de prueba. */
	const iplanestudio = "PE_APIVERIFY";
	const jconfigSample = {
		descripcion: "Prueba API",
		source: "",
		maxlength: 0,
		accept: "",
		multiple: false,
		presentacion: 0,
	};

	const atributosDriverNested = buildAtributosDriverNested(IDRIVER_TEST, ATTR_BASE, jconfigSample);

	/* Driver: POST con atributos embebidos (901–904) */
	await testEntityCRUL(
		"Driver",
		"driver",
		{ idriver: IDRIVER_TEST },
		{
			ndriver: "Driver Prueba",
			qniveles: 2,
			descripcion: "Driver POST con atributos anidados",
			atributos: atributosDriverNested,
		},
		{ ndriver: "Driver Prueba Upd" },
		null,
		"✅",
		{ stripFromExtras: ["atributos"] },
	);

	/* Curso (sin tema/permiso/estructuras/seguridades/planes anidados — endpoints eliminados) */
	await testEntityCRUL(
		"Curso",
		"curso",
		{ icurso: ICURSO },
		{
			ncurso: "Curso Prueba",
			descripcion: "Desc — POST mínimo (catálogos anidados eliminados del API)",
			bactivo: true,
			idriver: IDRIVER_TEST,
		},
		{ ncurso: "Curso Updated" },
		null,
		"✅",
		{ relaxCreateRecoverGet: true },
	);

	/* Plan de estudio (cabecera) */
	await testEntityCRUL(
		"PlanEstudio",
		"plan/estudio",
		{ iplanestudio },
		{
			nombre: "Plan Complex",
			bactivo: true,
			descripcionplan: "Desc",
			ttdvisualizacion: "T",
			bgeneracertificados: false,
		},
		{ nombre: "Plan Updated", bactivo: true },
		"planes/estudio",
		"✅",
		{ relaxCreateRecoverGet: true },
	);

	await cleanupAll();

	console.log("\n--- Testing Finished ---");
}
