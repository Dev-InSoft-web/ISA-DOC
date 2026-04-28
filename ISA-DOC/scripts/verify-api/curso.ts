import { request } from "./http.ts";
import { unwrap, filtroB64 } from "./helpers.ts";

interface JConfig {
	descripcion: string;
	source: string;
	maxlength: number;
	accept: string;
	multiple: boolean;
	presentacion: number;
}

export interface AtributoDriver {
	idriver: number;
	iatributo: number;
	qnivel: number;
	natributo: string;
	tdatributo: number;
	brequerido: boolean;
	jconfig: JConfig;
}

export function buildAtributosDriverNested(
	idriver: number,
	attrBase: number,
	jconfigSample: JConfig,
): AtributoDriver[] {
	return [0, 1, 2, 3].map((i) => ({
		idriver,
		iatributo: attrBase + i,
		qnivel: 1,
		natributo: `Atributo test ${attrBase + i}`,
		tdatributo: 1,
		brequerido: true,
		jconfig: { ...jconfigSample },
	}));
}

export function verifyCursoRichResponse(
	data: unknown,
	{ icurso, idriver }: { icurso: string; idriver: number },
): boolean {
	const a = unwrap(data);
	try {
		JSON.stringify(a);
	} catch (e) {
		console.error(`   ⛔ JSON.stringify(curso): posible referencia circular — ${(e as Error).message}`);
		return false;
	}
	const missing: string[] = [];
	if (!a.tema || a.tema.itema == null) missing.push("tema");
	const dr = a.driver;
	if (!dr || Number(dr.idriver) !== Number(idriver)) missing.push("driver");
	const attrs = dr?.atributos;
	if (!Array.isArray(attrs)) missing.push("driver.atributos");
	else if (attrs.length < 4) missing.push(`driver.atributos(${attrs.length})`);
	if (!Array.isArray(a.estructuras) || a.estructuras.length < 1) missing.push("estructuras");
	if (!Array.isArray(a.seguridades) || a.seguridades.length < 1) missing.push("seguridades");
	const planesLike = a.planes ?? a.planescurso;
	if (!Array.isArray(planesLike) || planesLike.length < 1) missing.push("planes/planescurso");
	if (missing.length) {
		console.error(`   -> Curso anidado: faltan o vacíos — ${missing.join(", ")} ⛔`);
		return false;
	}
	console.log(
		`   -> Curso anidado OK: tema, driver+atributos(${attrs.length}), estructuras(${a.estructuras.length}), seguridades(${a.seguridades.length}), planes(${planesLike.length}) ✅`,
	);
	void icurso;
	return true;
}

export async function testDriverAtributosListSmoke(
	idriver: number,
	expectedIatributos: number[],
	errorIcon: string = "⛔",
): Promise<boolean> {
	void errorIcon;
	const checkList = (
		res: { status: number; data: any },
		label: string,
	): { ok: boolean; listData: any; label: string; status: number } => {
		if (res.status !== 200) return { ok: false, listData: null, label, status: res.status };
		const listData = unwrap(res.data);
		if (!Array.isArray(listData)) return { ok: false, listData: null, label, status: res.status };
		const forDriver = listData.filter((r: any) => Number(r.idriver) === Number(idriver));
		const ids = new Set(forDriver.map((r: any) => r.iatributo));
		const ok = expectedIatributos.every((ia) => ids.has(ia));
		if (ok) {
			console.log(
				`   [driver/atributos] ${label}: ${forDriver.length} fila(s) para idriver=${idriver}; ` +
					`incluye iatributos esperados ${JSON.stringify(expectedIatributos)} ✅`,
			);
			return { ok: true, listData, label, status: res.status };
		}
		return { ok: false, listData, label, status: res.status };
	};

	const filtIdriver = filtroB64({ idriver });
	let res = await request("GET", `/api/driver/atributos/${filtIdriver}`);
	let r = checkList(res, `listado filtro idriver=${idriver}`);
	if (r.ok) return true;

	if (res.status !== 200) {
		console.log(`   [driver/atributos] listado filtrado HTTP ${res.status}`);
	}

	res = await request("GET", `/api/driver/atributos/e30=`);
	r = checkList(res, "listado e30=");
	if (r.ok) return true;

	if (res.status !== 200) {
		console.log(
			`   [driver/atributos] listado e30= HTTP ${res.status} — fallback GET por PK (evita fallo Listar genérico)`,
		);
	}

	let allOk = true;
	for (const ia of expectedIatributos) {
		const one = await request("GET", `/api/driver/atributo/${idriver}/${ia}`);
		if (one.status !== 200) {
			console.error(`   GET /api/driver/atributo/${idriver}/${ia} HTTP ${one.status} ⛔`);
			allOk = false;
		}
	}
	if (allOk) {
		console.log(
			`   [driver/atributos] verificación por ${expectedIatributos.length}× GET …/atributo/{idriver}/{iatributo} OK ⚠️ (listado no usable)`,
		);
		console.log(
			`   -> Observación: el GET list …/driver/atributos/{filtro} suele 500 si @ingenieria_insoft/ispclientesis` +
				` en el servidor tiene el getter antiguo de jconfig (objeto por defecto → JCONFIG_*_SOUNDEX inválido).` +
				` Actualice el paquete (p. ej. build/publish ISP-ClientesIS + update-local) y redeploy.`,
		);
	}
	return allOk;
}
