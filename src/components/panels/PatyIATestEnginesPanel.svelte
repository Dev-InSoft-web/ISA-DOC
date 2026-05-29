<script lang="ts">
	import { onMount } from "svelte";
	import {
		Button,
		ButtonIconify,
		Card,
		FlexLayout,
		Iconify,
		Loading,
		toastError,
		toastSuccess,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import ConfirmDialog from "$comps/overlays/ConfirmDialog.svelte";

	type TestType = "responses" | "agents-poc" | null;

	interface TestConfig {
		id: TestType;
		label: string;
		engine: string;
		baseEndpoint: string;
		description: string;
		costEstimate: string;
		durationEstimate: string;
		endpoints: string[];
	}

	const TEST_CONFIGS: Record<string, TestConfig> = {
		responses: {
			id: "responses",
			label: "Test Responses",
			engine: "responses",
			baseEndpoint: "/api/conversacion",
			description: "Prueba del engine Responses con 10 turnos de conversación usando gpt-5-mini. Se crearán conversación y registros de uso para análisis posterior.",
			costEstimate: "$0.05 – $0.07 USD",
			durationEstimate: "3–5 minutos",
			endpoints: [
				"POST /api/conversacion (crear + stream de respuestas)",
				"POST /api/mensaje (registrar calificaciones)",
				"GET /api/conversacion (recuperar datos finales)",
			],
		},
		"agents-poc": {
			id: "agents-poc",
			label: "Test Agents PoC",
			engine: "agents-poc",
			baseEndpoint: "/api/conversacion-agents",
			description: "Prueba del engine Agents PoC con 10 turnos de conversación usando gpt-5-mini. Incluye routing automático y procesamiento multi-etapa.",
			costEstimate: "$0.04 – $0.06 USD",
			durationEstimate: "3–5 minutos",
			endpoints: [
				"POST /api/conversacion-agents (crear + flujo de agentes)",
				"POST /api/mensaje (registrar calificaciones)",
				"GET /api/conversacion (recuperar datos finales)",
			],
		},
	};

	let confirmOpen = false;
	let selectedTest: TestConfig | null = null;
	let isRunning = false;
	let runOutput = "";
	let showOutput = false;

	function onConfirmTest(test: TestConfig): void {
		selectedTest = test;
		confirmOpen = true;
	}

	async function executeTest(): Promise<void> {
		if (!selectedTest) return;
		confirmOpen = false;
		isRunning = true;
		runOutput = `[${new Date().toLocaleTimeString()}] Iniciando test ${selectedTest.label}...\n`;
		showOutput = true;

		try {
			const response = await fetch("/api/patyia/test/run-engine", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					engine: selectedTest.engine,
				}),
			});

			const result = (await response.json()) as { ok: boolean; message?: string; error?: string; iconversacion?: number };
			if (!response.ok || !result.ok) {
				const errMsg = result.error || `HTTP ${response.status}`;
				toastError(`Falló el test: ${errMsg}`);
				runOutput += `[${new Date().toLocaleTimeString()}] ❌ Error: ${errMsg}\n`;
				return;
			}

			toastSuccess(`✅ Test ${selectedTest.label} completado. Conversación #${result.iconversacion}`);
			runOutput += `[${new Date().toLocaleTimeString()}] ✅ Éxito. Nueva conversación: ${result.iconversacion}\n`;
			runOutput += `[${new Date().toLocaleTimeString()}] 📊 Los resultados se han acumulado en la bitácora.\n`;
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			toastError(`Error de conexión: ${msg}`);
			runOutput += `[${new Date().toLocaleTimeString()}] ❌ Error: ${msg}\n`;
		} finally {
			isRunning = false;
		}
	}

	onMount(() => {
		// Inicialización si es necesaria
	});
</script>

<div class="tests-panel">
	<div class="tests-container">
		{#each Object.values(TEST_CONFIGS) as test (test.id)}
			<Card class="test-card">
				<div class="test-header">
					<h3>{test.label}</h3>
					<Button
						on:click={() => onConfirmTest(test)}
						disabled={isRunning}
						kind="primary"
						style="width: fit-content;"
					>
						Ejecutar
					</Button>
				</div>

				<div class="test-details">
					<p class="description">{test.description}</p>

					<div class="info-grid">
						<div class="info-item">
							<strong>Engine:</strong>
							<code>{test.engine}</code>
						</div>
						<div class="info-item">
							<strong>Endpoint base:</strong>
							<code>{test.baseEndpoint}</code>
						</div>
						<div class="info-item">
							<strong>Costo estimado:</strong>
							<span>{test.costEstimate}</span>
						</div>
						<div class="info-item">
							<strong>Duración estimada:</strong>
							<span>{test.durationEstimate}</span>
						</div>
					</div>

					<div class="endpoints">
						<strong>Endpoints probados:</strong>
						<ul>
							{#each test.endpoints as ep}
								<li>{ep}</li>
							{/each}
						</ul>
					</div>
				</div>
			</Card>
		{/each}
	</div>

	{#if showOutput}
		<div class="output-section">
			<div class="output-header">
				<h4>Salida de ejecución</h4>
				{#if isRunning}
					<FlexLayout items="center" style="gap: 0.5rem;">
						<Loading />
						<span>En progreso...</span>
					</FlexLayout>
				{:else}
					<span class="output-status">Completado</span>
				{/if}
			</div>
			<pre class="output-box">{runOutput || "(en ejecución...)"}</pre>
		</div>
	{/if}
</div>

<ConfirmDialog
	bind:open={confirmOpen}
	title={`Confirmar: ${selectedTest?.label || ""}`}
	message={selectedTest
		? `${selectedTest.description}\n\nCosto estimado: ${selectedTest.costEstimate}\nDuración estimada: ${selectedTest.durationEstimate}`
		: ""}
	confirmText="Ejecutar"
	cancelText="Cancelar"
	onConfirm={executeTest}
	kind="warning"
/>

<style>
	.tests-panel {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.tests-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.test-card {
		padding: 1.5rem;
		border-left: 4px solid var(--color-primary, #0078d4);
	}

	.test-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.test-header h3 {
		margin: 0;
		font-size: 1.125rem;
		flex: 1;
	}

	.description {
		margin: 1rem 0;
		line-height: 1.5;
		color: #666;
		font-size: 0.9rem;
	}

	.info-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1rem 0;
		padding: 1rem;
		background: #f5f5f5;
		border-radius: 0.375rem;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.875rem;
	}

	.info-item strong {
		font-weight: 600;
		color: #333;
	}

	.info-item code {
		font-family: monospace;
		padding: 0.25rem 0.5rem;
		background: #e8e8e8;
		border-radius: 0.25rem;
		font-size: 0.8rem;
	}

	.endpoints {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #ddd;
	}

	.endpoints strong {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.endpoints ul {
		margin: 0;
		padding-left: 1.5rem;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.endpoints li {
		margin-bottom: 0.25rem;
		color: #666;
	}

	.output-section {
		margin-top: 2rem;
		padding: 1.5rem;
		background: #f9f9f9;
		border-radius: 0.5rem;
		border: 1px solid #ddd;
	}

	.output-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.output-header h4 {
		margin: 0;
		font-size: 1rem;
	}

	.output-status {
		color: #28a745;
		font-weight: 600;
	}

	.output-box {
		margin: 0;
		padding: 1rem;
		background: #fff;
		border: 1px solid #ddd;
		border-radius: 0.375rem;
		font-size: 0.813rem;
		line-height: 1.4;
		overflow-x: auto;
		max-height: 300px;
		overflow-y: auto;
		font-family: monospace;
		color: #333;
	}
</style>
