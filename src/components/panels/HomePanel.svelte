<script lang="ts">
	import { Card, FlexLayout, GridLayout, Iconify, Text } from "@ingenieria_insoft/ispsveltecomponents";

	const rawBase: string = (import.meta.env.BASE_URL as string) || "/";
	const base: string = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
	const link = (p: string): string => base + p || "/";

	interface Tool {
		label: string;
		path: string;
		desc: string;
		icon: string;
	}
	interface ProjectGroup {
		key: string;
		title: string;
		subtitle: string;
		color: "primary" | "secondary" | "info" | "success" | "warning" | "neutral";
		tools: Tool[];
	}

	const groups: ProjectGroup[] = [
		{
			key: "clientesis",
			title: "ClientesIS",
			subtitle: "Documentacion, SQL, bitacora y herramientas del workspace ClientesIS",
			color: "info",
			tools: [
				{ label: "SQL", path: "/clientesis/sql", icon: "mdi:database-outline", desc: "Explorador de fragmentos SQL, esquema de tablas y consultas." },
				{ label: "Bitacora", path: "/clientesis/bitacora", icon: "mdi:notebook-outline", desc: "Diario de avance: resumenes diarios, tickets y commits." },
				{ label: "Postman", path: "/clientesis/postman", icon: "mdi:email-fast-outline", desc: "Colecciones Postman renderizadas como documentacion navegable." },
				{ label: "Docs ContaPymeU", path: "/clientesis/contapymeu", icon: "mdi:book-open-page-variant-outline", desc: "Documentacion tecnica de ContaPymeU." },
				{ label: "Actions", path: "/clientesis/actions", icon: "mdi:lightning-bolt-outline", desc: "Acciones de proyecto: iconify, builds y utilidades por subproyecto." },
				{ label: "BDD Capacitacion", path: "/clientesis/db", icon: "mdi:table-cog", desc: "Esquema BDD del modulo de capacitacion." },
				{ label: "Tests Capacitacion", path: "/clientesis/test", icon: "mdi:check-circle-outline", desc: "Verificacion de API del modulo de capacitacion." },
			],
		},
		{
			key: "patyia",
			title: "PatyIA",
			subtitle: "Herramientas del workspace PatyIA con integraciones de OpenAI",
			color: "secondary",
			tools: [
				{ label: "SQL", path: "/patyia/sql", icon: "mdi:database-outline", desc: "Esquema SQL y consultas para PatyIA." },
				{ label: "Bitacora", path: "/patyia/bitacora", icon: "mdi:notebook-outline", desc: "Diario de avance especifico de PatyIA." },
				{ label: "Postman", path: "/patyia/postman", icon: "mdi:email-fast-outline", desc: "Colecciones Postman de PatyIA." },
				{ label: "Docs ContaPymeU", path: "/patyia/contapymeu", icon: "mdi:book-open-page-variant-outline", desc: "Documentacion enlazada desde PatyIA." },
				{ label: "Actions / OpenAI", path: "/patyia/actions", icon: "mdi:robot-outline", desc: "Generacion de imagenes, texto y conversaciones con OpenAI; historial persistente y pricing." },
				{ label: "Modelos OpenAI", path: "/patyia/modelos-openai", icon: "mdi:currency-usd", desc: "Catalogo de modelos OpenAI con pricing por 1M tokens." },
				{ label: "Test", path: "/patyia/test", icon: "mdi:flask-outline", desc: "Pagina de pruebas de PatyIA." },
			],
		},
	];

	const GRID_TEMPLATE: string = "repeat(auto-fill, minmax(260px, 1fr))";
</script>

<div class="home-wrap custom-scrollbar">
	<header class="home-head">
		<Text variant="h1" style="margin: 0;">ISA / Herramientas</Text>
		<Text color="neutral" style="margin: 0; opacity: 0.8;">
			Resumen de las herramientas disponibles en ISA-DOC. Selecciona un proyecto y una vista.
		</Text>
	</header>

	<FlexLayout direction="column">
		{#each groups as g (g.key)}
			<section class="grupo">
				<div class="grupo-head">
					<Text variant="h2" color={g.color} style="margin: 0;">{g.title}</Text>
					<Text color="neutral" style="margin: 0; opacity: 0.75; font-size: 0.92rem;">{g.subtitle}</Text>
				</div>

				<GridLayout cells={GRID_TEMPLATE} items="stretch">
					{#each g.tools as t (t.path)}
						<a class="tool-link" href={link(t.path)}>
							<Card variant="solid" style="height: 100%;">
								<FlexLayout direction="row" items="flex-start" style="gap: 0.75rem;">
									<span class="tool-icon" style="color: var(--is-{g.color});">
										<Iconify icon={t.icon} />
									</span>
									<FlexLayout direction="column" style="flex: 1 1 auto; min-width: 0; gap: 0.2rem;">
										<Text variant="strong" style="margin: 0;">{t.label}</Text>
										<Text color="neutral" style="margin: 0; opacity: 0.8; font-size: 0.88rem;">{t.desc}</Text>
									</FlexLayout>
								</FlexLayout>
							</Card>
						</a>
					{/each}
				</GridLayout>
			</section>
		{/each}
	</FlexLayout>
</div>

<style>
	.home-wrap {
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 1rem 1.5rem 2rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.home-head {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.grupo {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.grupo-head {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		border-bottom: 1px solid color-mix(in srgb, currentColor 18%, transparent);
		padding-bottom: 0.35rem;
	}
	.tool-link {
		display: block;
		color: inherit;
		text-decoration: none;
		transition: transform 0.15s;
	}
	.tool-link:hover {
		transform: translateY(-1px);
	}
	.tool-icon {
		font-size: 1.65rem;
		line-height: 1;
		flex: 0 0 auto;
	}
</style>
