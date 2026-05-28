<script lang="ts">
	import { Text } from "@ingenieria_insoft/ispsveltecomponents";
	import { ALL_LOCAL_ENDPOINTS, LOCAL_ENDPOINT_ROUTES } from "../../lib/patyia/apiEndpoints";

	const wiredNames = new Set(LOCAL_ENDPOINT_ROUTES.map((r) => r.name));
	const rows = ALL_LOCAL_ENDPOINTS.map((e) => ({
		...e,
		wired: wiredNames.has(e.name),
	}));
</script>

<div class="panel-wrap">
	<h2>Endpoints expuestos por server local</h2>
	<p>
		Base local: <code>http://localhost:7071</code>. La columna <strong>Wired</strong> indica si la ruta interna de
		ISA-DOC tiene mapeo en <code>LOCAL_ENDPOINT_ROUTES</code> y por tanto el switch <em>local</em> la redirige al
		server local.
	</p>

	<section class="run-summary">
		<header class="run-summary-head">
			<h3>Estado de recepción — última corrida verify-api-patyia</h3>
			<span class="run-pill run-pill-ok">12/12 OK · 0 FAIL</span>
		</header>
		<p class="run-meta">
			Corrida del <strong>2026-05-28 12:44:53</strong> contra <code>http://localhost:7071</code> con
			<code>codigotk=TKV999991</code>, <code>iconversacion=1802</code>, <code>itiquete=104</code>.
			Token cargado desde <code>token.patyia.json</code>. Cleanup completo (tiquete y conversación eliminados).
		</p>
		<ol class="run-steps">
			<li><span class="ok">✅</span> POST <code>/api/JWT</code> — autenticación</li>
			<li><span class="ok">✅</span> POST <code>/api/conversacion</code> — HTTP 200 (SSE, <code>iconversacion=1802</code>)</li>
			<li><span class="ok">✅</span> GET <code>/api/conversaciones</code> — HTTP 200</li>
			<li><span class="ok">✅</span> GET <code>/api/conversacion/1802</code> — HTTP 200</li>
			<li><span class="ok">✅</span> GET <code>/api/resumen_conversacion/1802</code> — HTTP 200</li>
			<li><span class="ok">✅</span> POST <code>/api/mensaje</code> — HTTP 201 (<code>imensaje=168</code>)</li>
			<li><span class="ok">✅</span> POST <code>/api/tiquete</code> — HTTP 201 (<code>itiquete=104</code>)</li>
			<li><span class="ok">✅</span> GET <code>/api/tiquete/104</code> — HTTP 200</li>
			<li><span class="ok">✅</span> GET <code>/api/tiquete/por-conversacion/1802</code> — HTTP 200</li>
			<li><span class="ok">✅</span> PATCH <code>/api/tiquete</code> — HTTP 200</li>
			<li><span class="ok">✅</span> GET <code>/api/timer_cerrarConversaciones</code> — HTTP 200</li>
			<li><span class="ok">✅</span> CLEANUP: DELETE <code>/api/tiquete/104</code> + DELETE <code>/api/conversacion/1802</code> — HTTP 200</li>
		</ol>
		<p class="run-foot">
			Toda la batería se ejecutó de extremo a extremo: creación, lecturas, mutaciones y limpieza.
			El POST de conversación retorna <em>Server-Sent Events</em> y el script extrae
			<code>iconversacion</code> del primer evento <code>data:</code> para marcar la conversación como propia
			y limpiarla en el cleanup.
		</p>
	</section>

	<div class="tbl-wrap">
		<table class="endpoints-tbl">
			<thead>
				<tr>
					<th title="Nombre del endpoint Azure Function"><Text lines={1}>Endpoint</Text></th>
					<th title="Método HTTP"><Text lines={1}>Método</Text></th>
					<th title="Ruta relativa expuesta por el server local"><Text lines={1}>Ruta local</Text></th>
					<th title="¿Está cableado en LOCAL_ENDPOINT_ROUTES del catálogo de ISA-DOC?"><Text lines={1}>Wired</Text></th>
				</tr>
			</thead>
			<tbody>
				{#each rows as r (r.name)}
					<tr>
						<td title={r.name}><Text lines={1}><code>{r.name}</code></Text></td>
						<td><span class="method method-{r.method.toLowerCase()}">{r.method}</span></td>
						<td title={r.path}><Text lines={1}><code>{r.path}</code></Text></td>
						<td class="cell-center">
							{#if r.wired}
								<span class="badge badge-ok" title="Mapeado en LOCAL_ENDPOINT_ROUTES">sí</span>
							{:else}
								<span class="badge badge-off" title="No mapeado todavía">no</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<h3>Mapeo interno → local</h3>
	<table class="endpoints-tbl">
		<thead>
			<tr>
				<th title="Ruta consumida internamente por el frontend de ISA-DOC"><Text lines={1}>Ruta interna ISA-DOC</Text></th>
				<th title="Método HTTP"><Text lines={1}>Método</Text></th>
				<th title="Nombre del endpoint local al que se redirige"><Text lines={1}>Nombre local</Text></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><Text lines={1}><code>/api/patyia/conversaciones</code></Text></td>
				<td><span class="method method-get">GET</span></td>
				<td><Text lines={1}><code>API_GET_ConversacionesTercero</code></Text></td>
			</tr>
			<tr>
				<td><Text lines={1}><code>/api/patyia/conversacion/{"{id}"}</code></Text></td>
				<td><span class="method method-get">GET</span></td>
				<td><Text lines={1}><code>API_GET_ObtenerConversacion</code></Text></td>
			</tr>
			<tr>
				<td><Text lines={1}><code>/api/patyia/staging/conversacion/new</code></Text></td>
				<td><span class="method method-post">POST</span></td>
				<td><Text lines={1}><code>API_POST_InsertarConversacion</code></Text></td>
			</tr>
			<tr>
				<td><Text lines={1}><code>/api/patyia/staging/conversacion/{"{id}"}/send-stream</code></Text></td>
				<td><span class="method method-post">POST</span></td>
				<td><Text lines={1}><code>API_POST_InsertarMensajeCalificado</code></Text></td>
			</tr>
		</tbody>
	</table>

	<h3>Convenciones visuales</h3>
	<ul>
		<li>Botón con color <code>danger</code> → la acción se ejecutará contra el server local.</li>
		<li><code>title</code> con sufijo <code>· LOCAL &lt;nombre&gt;</code> → indica el endpoint exacto del local que se invocará.</li>
		<li>Sin color y sin sufijo → la acción se ejecuta contra origin.</li>
	</ul>
</div>

<style>
	.panel-wrap { padding: 1rem 0.25rem; display: flex; flex-direction: column; gap: 1rem; }
	.tbl-wrap { overflow-x: auto; }
	.endpoints-tbl {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
		table-layout: auto;
	}
	.endpoints-tbl th, .endpoints-tbl td {
		text-align: left;
		padding: 0.4rem 0.6rem;
		border-bottom: 1px solid var(--is-b-color);
		vertical-align: middle;
	}
	.endpoints-tbl th {
		background: var(--is-bg-secondary, transparent);
		font-weight: 600;
		white-space: nowrap;
	}
	.endpoints-tbl code { font-size: 0.85em; }
	.cell-center { text-align: center; }
	.method {
		display: inline-block;
		padding: 0.1rem 0.45rem;
		border-radius: 0.35rem;
		font-size: 0.75rem;
		font-weight: 700;
		font-family: monospace;
		color: white;
	}
	.method-get { background: var(--is-info); }
	.method-post { background: var(--is-success); }
	.method-put { background: var(--is-warning); }
	.method-patch { background: var(--is-warning); }
	.method-delete { background: var(--is-danger); }
	.badge {
		display: inline-block;
		padding: 0.1rem 0.5rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
	}
	.badge-ok { background: color-mix(in srgb, var(--is-success), transparent 70%); color: var(--is-success); }
	.badge-off { background: color-mix(in srgb, var(--is-color), transparent 85%); color: var(--is-color); opacity: 0.7; }

	.run-summary {
		border: 1px solid color-mix(in srgb, var(--is-success), transparent 60%);
		background: color-mix(in srgb, var(--is-success), transparent 92%);
		border-radius: 0.6rem;
		padding: 0.85rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.run-summary-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
	}
	.run-summary-head h3 { margin: 0; font-size: 1rem; }
	.run-pill {
		display: inline-block;
		padding: 0.2rem 0.65rem;
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 700;
	}
	.run-pill-ok {
		background: var(--is-success);
		color: white;
	}
	.run-meta { margin: 0; font-size: 0.88rem; }
	.run-steps {
		margin: 0;
		padding-left: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		font-size: 0.88rem;
	}
	.run-steps .ok { margin-right: 0.35rem; }
	.run-foot { margin: 0; font-size: 0.82rem; opacity: 0.85; }
</style>
