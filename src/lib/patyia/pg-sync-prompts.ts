import { readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";
import { loadLabLocalSettings } from "../core/load-lab-local-settings.ts";
import { PATY_AGENT_RAG_CORPUS } from "../features/patyia/patyia-agent-corpus.ts";
import { PATY_PROMPT_TIPOS, promptMdFilename } from "../features/patyia/050-prompts/prompt-files.ts";

function pgUrl(): string {
	loadLabLocalSettings();
	const url =
		process.env.PATY_DATABASE_URL?.trim() || process.env.DATABASE_URL?.trim() || "";
	if (!url) {
		throw new Error(
			"PATY_DATABASE_URL / DATABASE_URL no configurada (lab-langgraph/local.settings.json)",
		);
	}
	return url;
}

async function upsertInstruccion(
	client: pg.PoolClient,
	row: {
		iinstruccion: string;
		ninstruccion: string;
		instruccion: string;
		descripcion?: string;
		version?: string;
	},
): Promise<void> {
	await client.query(
		`INSERT INTO paty.instruccion (iinstruccion, ninstruccion, modelo, instruccion, descripcion, version, updated_at)
     VALUES ($1, $2, '', $3, $4, $5, NOW())
     ON CONFLICT (iinstruccion) DO UPDATE SET
       ninstruccion = EXCLUDED.ninstruccion,
       instruccion = EXCLUDED.instruccion,
       descripcion = EXCLUDED.descripcion,
       version = EXCLUDED.version,
       updated_at = NOW()`,
		[
			row.iinstruccion,
			row.ninstruccion,
			row.instruccion,
			row.descripcion ?? "",
			row.version ?? "ultra",
		],
	);
}

async function upsertTdConsulta(
	client: pg.PoolClient,
	itdconsulta: string,
	nconsulta: string,
): Promise<void> {
	await client.query(
		`INSERT INTO paty.tdconsulta (itdconsulta, nconsulta, descripcion)
     VALUES ($1, $2, $3)
     ON CONFLICT (itdconsulta) DO UPDATE SET nconsulta = EXCLUDED.nconsulta`,
		[itdconsulta, nconsulta, nconsulta],
	);
}

async function linkTdInstruccion(
	client: pg.PoolClient,
	itdconsulta: string,
	iinstruccion: string,
): Promise<void> {
	await client.query(
		`INSERT INTO paty.tdconsulta_x_instruccion (itdconsulta, iinstruccion, orden)
     VALUES ($1, $2, 1)
     ON CONFLICT DO NOTHING`,
		[itdconsulta, iinstruccion],
	);
}

async function setTdCorpus(client: pg.PoolClient, itdconsulta: string, corpusList: string[]): Promise<void> {
	await client.query(`DELETE FROM paty.tdconsulta_corpus WHERE itdconsulta = $1`, [itdconsulta]);
	for (let i = 0; i < corpusList.length; i += 1) {
		await client.query(
			`INSERT INTO paty.tdconsulta_corpus (itdconsulta, corpus, orden) VALUES ($1, $2, $3)`,
			[itdconsulta, corpusList[i], i + 1],
		);
	}
}

/** Ultra desde ISA-DOC → paty.* en PostgreSQL (sin HTTP a lab-langgraph). */
export async function syncPatyPromptsToPgFromIsaDoc(catalogRoot: string): Promise<{
	agents: number;
	syncedAt: string;
}> {
	const pool = new pg.Pool({
		connectionString: pgUrl(),
		ssl: { rejectUnauthorized: false },
	});
	const client = await pool.connect();
	try {
		const baseMarkdown = readFileSync(join(catalogRoot, "90-general.md"), "utf8");
		await upsertInstruccion(client, {
			iinstruccion: "PATY_BASE",
			ninstruccion: "PROMPT_PATY_BASE",
			instruccion: baseMarkdown,
			descripcion: "Base Paty · 90-general.md",
			version: "ultra",
		});

		for (const tipo of PATY_PROMPT_TIPOS) {
			const markdown = readFileSync(
				join(catalogRoot, "Ultra", promptMdFilename(tipo)),
				"utf8",
			);
			await upsertTdConsulta(client, tipo, `PROMPT_${tipo}`);
			await upsertInstruccion(client, {
				iinstruccion: tipo,
				ninstruccion: `PROMPT_${tipo}`,
				instruccion: markdown,
				descripcion: `Prompt Ultra · ${tipo}`,
				version: "ultra",
			});
			await linkTdInstruccion(client, tipo, tipo);
			const corpus = PATY_AGENT_RAG_CORPUS[tipo] ?? ["contapyme"];
			await setTdCorpus(client, tipo, corpus);
		}

		return {
			agents: PATY_PROMPT_TIPOS.length,
			syncedAt: new Date().toISOString(),
		};
	} finally {
		client.release();
		await pool.end();
	}
}
