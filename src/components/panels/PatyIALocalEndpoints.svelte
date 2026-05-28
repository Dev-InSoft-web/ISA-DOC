<script lang="ts">
	import { Text } from "@ingenieria_insoft/ispsveltecomponents";
	import RevisadoCheck from "$comps/actions/RevisadoCheck.svelte";
	import { ALL_LOCAL_ENDPOINTS, LOCAL_ENDPOINT_ROUTES } from "../../lib/patyia/apiEndpoints";

	const wiredNames = new Set(LOCAL_ENDPOINT_ROUTES.map((r) => r.name));
	const rows = ALL_LOCAL_ENDPOINTS.map((e) => ({
		...e,
		wired: wiredNames.has(e.name),
		revisadoKey: `patyia.local-endpoints.${e.name}`,
	}));
</script>

<div class="panel-wrap">
	<h2>Endpoints expuestos por server local</h2>
	<p>
		Base local: <code>http://localhost:7071</code>. La columna <strong>Wired</strong> indica si la ruta interna de
		ISA-DOC tiene mapeo en <code>LOCAL_ENDPOINT_ROUTES</code> y por tanto el switch <em>local</em> la redirige al
		server local. La columna <strong>Probado</strong> persiste en
		<code>data/revisado.json</code>.
	</p>

	<div class="tbl-wrap">
		<table class="endpoints-tbl">
			<thead>
				<tr>
					<th title="Nombre del endpoint Azure Function"><Text lines={1}>Endpoint</Text></th>
					<th title="Método HTTP"><Text lines={1}>Método</Text></th>
					<th title="Ruta relativa expuesta por el server local"><Text lines={1}>Ruta local</Text></th>
					<th title="¿Está cableado en LOCAL_ENDPOINT_ROUTES del catálogo de ISA-DOC?"><Text lines={1}>Wired</Text></th>
					<th title="Probado end-to-end desde la UI de ISA-DOC apuntando al server local"><Text lines={1}>Probado</Text></th>
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
						<td class="cell-center"><RevisadoCheck key={r.revisadoKey} /></td>
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
</style>
