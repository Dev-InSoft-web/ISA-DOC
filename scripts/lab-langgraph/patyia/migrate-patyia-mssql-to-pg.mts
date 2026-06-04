/**
 * Operación puntual: SQL Server PatyIA → PostgreSQL (schema paty).
 * NO forma parte de lab-langgraph. Ejecutar desde ISA-DOC.
 */
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sql from "mssql";
import pg from "pg";
import { config as loadDotenv } from "dotenv";

const ISA_ROOT = resolve(join(dirname(fileURLToPath(import.meta.url)), "../../.."));
const LAB_ROOT = resolve(ISA_ROOT, "../lab-langgraph");
for (const rel of [".env", "secrets/api-keys.env", "secrets/patyia/lab-langgraph.env"]) {
	loadDotenv({ path: join(ISA_ROOT, rel), override: false });
}

const dryRun = process.argv.includes("--dry-run");

function pgUrl(): string {
	const url = process.env.DATABASE_URL?.trim();
	if (!url) throw new Error("DATABASE_URL no configurada (Render / lab-langgraph).");
	return url;
}

function mssqlConfig(): sql.config {
	const url = process.env.MSSQL_CONNECTION_STRING?.trim();
	if (url) return url as unknown as sql.config;
	const server = process.env.paty_server ?? process.env.PATY_SERVER;
	const database = process.env.paty_namedb ?? process.env.PATY_NAMEDB ?? "AYUDASCP_IA_STAGING";
	const user = process.env.paty_user ?? process.env.PATY_USER;
	const password = process.env.paty_password ?? process.env.PATY_PASSWORD;
	if (!server || !user || !password) {
		throw new Error("Configura MSSQL_CONNECTION_STRING o paty_* en ISA-DOC/.env");
	}
	return {
		server,
		database,
		user,
		password,
		options: { encrypt: true, trustServerCertificate: true },
	};
}

async function applySchema(pool: pg.Pool): Promise<void> {
	const schemaDir = join(LAB_ROOT, "db", "schema");
	for (const file of ["001_extensions.sql", "002_patyia.sql"]) {
		await pool.query(await readFile(join(schemaDir, file), "utf8"));
	}
}

const pgPool = new pg.Pool({
	connectionString: pgUrl(),
	ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
});
await applySchema(pgPool);

const mssqlConn = await sql.connect(mssqlConfig());

async function copyTable(
	label: string,
	selectSql: string,
	insertFn: (row: Record<string, unknown>) => Promise<void>,
): Promise<void> {
	const res = await mssqlConn.request().query(selectSql);
	let n = 0;
	for (const row of res.recordset as Record<string, unknown>[]) {
		if (!dryRun) await insertFn(row);
		n += 1;
	}
	console.log(`${dryRun ? "[dry] " : ""}${label}: ${n} filas`);
}

await copyTable(
	"INSTRUCCION",
	`SELECT IINSTRUCCION, NINSTRUCCION, ISNULL(MODELO,'') MODELO, INSTRUCCION,
    ISNULL(DESCRIPCION,'') DESCRIPCION, ISNULL(VERSION,'') VERSION, ISNULL(BACTIVO,1) BACTIVO FROM INSTRUCCION`,
	async (r) => {
		await pgPool.query(
			`INSERT INTO paty.instruccion (iinstruccion, ninstruccion, modelo, instruccion, descripcion, version, bactivo)
       VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (iinstruccion) DO UPDATE SET instruccion=EXCLUDED.instruccion, updated_at=NOW()`,
			[r.IINSTRUCCION, r.NINSTRUCCION, r.MODELO, r.INSTRUCCION, r.DESCRIPCION, r.VERSION || "ultra", Boolean(r.BACTIVO)],
		);
	},
);

await copyTable(
	"TDCONSULTA",
	`SELECT ITDCONSULTA, ISNULL(NCONSULTA,'') NCONSULTA, ISNULL(DESCRIPCION,'') DESCRIPCION, ISNULL(BACTIVO,1) BACTIVO FROM TDCONSULTA`,
	async (r) => {
		await pgPool.query(
			`INSERT INTO paty.tdconsulta (itdconsulta, nconsulta, descripcion, bactivo) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`,
			[r.ITDCONSULTA, r.NCONSULTA, r.DESCRIPCION, Boolean(r.BACTIVO)],
		);
	},
);

await copyTable(
	"TDCONSULTAXINSTRUCCION",
	`SELECT ITDCONSULTA, IINSTRUCCION, ISNULL(ORDEN,1) ORDEN FROM TDCONSULTAXINSTRUCCION`,
	async (r) => {
		await pgPool.query(
			`INSERT INTO paty.tdconsulta_x_instruccion (itdconsulta, iinstruccion, orden) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
			[r.ITDCONSULTA, r.IINSTRUCCION, r.ORDEN],
		);
	},
);

await copyTable(
	"CONVERSACIONES",
	`SELECT ICONVERSACION, ITERCERO, ICONTACTO, ISNULL(TITULO,'') TITULO, ISNULL(HILO,'') HILO,
    ISNULL(MODELO_IA,'') MODELO_IA, ISNULL(VERSION_AYUDA,'') VERSION_AYUDA, ISNULL(ITDESTADO,0) ITDESTADO,
    ISNULL(PROMPT,'') PROMPT, ISNULL(RESPUESTA,'') RESPUESTA, ISNULL(QTOKENS,0) QTOKENS, ISNULL(QMENSAJES,0) QMENSAJES,
    FHCRE, FHULTACT FROM CONVERSACIONES`,
	async (r) => {
		await pgPool.query(
			`INSERT INTO paty.conversaciones (iconversacion, itercero, icontacto, nombre_usuario, titulo, hilo, modelo_ia, version_ayuda,
         itdestado, prompt, respuesta, qtokens, qmensajes, fhcre, fhultact)
       VALUES ($1,$2,$3,'Usuario',$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) ON CONFLICT (iconversacion) DO NOTHING`,
			[r.ICONVERSACION, r.ITERCERO, r.ICONTACTO, r.TITULO, r.HILO, r.MODELO_IA, r.VERSION_AYUDA, r.ITDESTADO, r.PROMPT, r.RESPUESTA, r.QTOKENS, r.QMENSAJES, r.FHCRE, r.FHULTACT],
		);
	},
);

await copyTable(
	"MENSAJESCALIFICADOS",
	`SELECT IMENSAJE, ICONVERSACION, IREFERENCIA, BUTIL, ISNULL(CONTENIDO,'') CONTENIDO FROM MENSAJESCALIFICADOS`,
	async (r) => {
		await pgPool.query(
			`INSERT INTO paty.mensajes_calificados (imensaje, iconversacion, ireferencia, butil, contenido)
       VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING`,
			[r.IMENSAJE, r.ICONVERSACION, r.IREFERENCIA, r.BUTIL, r.CONTENIDO],
		);
	},
);

const logs = await mssqlConn.request().query(`SELECT ICONVERSACION, CONTENT FROM CONVERSACION_LOG`);
for (const row of logs.recordset as { ICONVERSACION: number; CONTENT: string }[]) {
	if (dryRun) continue;
	try {
		const parsed = JSON.parse(row.CONTENT) as { mensajes?: Array<{ role?: string; content?: string }> };
		const lastUser = [...(parsed.mensajes ?? [])].reverse().find((m) => m.role === "user");
		const lastAsst = [...(parsed.mensajes ?? [])].reverse().find((m) => m.role === "assistant");
		await pgPool.query(
			`INSERT INTO paty.conversacion_turnos (iconversacion, prompt_text, response_text, meta) VALUES ($1,$2,$3,$4::jsonb)`,
			[row.ICONVERSACION, lastUser?.content ?? "", lastAsst?.content ?? "", JSON.stringify({ source: "CONVERSACION_LOG", raw: parsed })],
		);
	} catch {
		/* */
	}
}
console.log(`CONVERSACION_LOG: ${logs.recordset.length} filas`);

await mssqlConn.close();
await pgPool.end();
console.log("\nMigración finalizada (destino: PostgreSQL).");
