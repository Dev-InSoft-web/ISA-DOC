<script lang="ts">
	import JsonViewer from "../viewers/JsonViewer.svelte";

	const items: ReadonlyArray<{ iatributo: number; natributo: string; jconfig: string }> = [
		{ iatributo: 1, natributo: "URL diapositivas", jconfig: '{"type":"InputText","descripcion":"URL pública de las diapositivas asociadas al recurso.","inputProps":{"placeholder":"https://...","maxlength":500}}' },
		{ iatributo: 2, natributo: "URL Imágen profesor", jconfig: '{"type":"InputText","descripcion":"URL pública de la imagen del profesor.","inputProps":{"placeholder":"https://...","maxlength":500}}' },
		{ iatributo: 3, natributo: "Driver de video", jconfig: '{"type":"SelectObject","options":{"1":"Lista con imagen pequeña","2":"Tarjeta con información completa","3":"Tarjeta solo con título","4":"Lista con imagen grande","5":"Lista pequeño"},"descripcion":"Componente Svelte que procesa los datos del video. Lista quemada (TTDriverRecurso); se actualizará cuando se aprueben otros controladores."}' },
		{ iatributo: 4, natributo: "Dificultad", jconfig: '{"type":"SelectObject","options":{"B":"Básico","M":"Medio","A":"Avanzado"},"descripcion":"Nivel de dificultad del contenido."}' },
		{ iatributo: 5, natributo: "iplanpadre", jconfig: '{"type":"BtnRef","controllername":"iplanpadre","descripcion":"Plan padre del contenido. Lista los hermanos del capítulo actual.","inputProps":{"maxlength":500}}' },
		{ iatributo: 6, natributo: "Documento", jconfig: '{"type":"InputText","descripcion":"URL pública del documento adjunto al plan.","inputProps":{"placeholder":"https://...","maxlength":500}}' },
	];
</script>

<div class="jconfig-matrix-wrap">
	<table class="jconfig-matrix">
		<thead>
			<tr>
				<th>IATRIBUTO</th>
				<th>NATRIBUTO</th>
				<th>JCONFIG (v2)</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item (item.iatributo)}
				<tr>
					<td class="jconfig-matrix__num">{item.iatributo}</td>
					<td class="jconfig-matrix__name">{item.natributo}</td>
					<td class="jconfig-matrix__json"><JsonViewer value={item.jconfig} height="160px" /></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.jconfig-matrix-wrap {
		display: block;
		width: 100%;
		max-width: 100%;
		overflow-x: auto;
		margin: 0.75rem 0 1rem;
	}
	.jconfig-matrix {
		width: 100%;
		min-width: 600px;
		border-collapse: collapse;
		margin: 0;
		font-size: 0.9rem;
	}
	.jconfig-matrix th,
	.jconfig-matrix td {
		border: 1px solid var(--is-outline, #ccc);
		padding: 0.4rem 0.6rem;
		vertical-align: top;
	}
	.jconfig-matrix th {
		background: var(--is-surface-variant, rgba(0, 0, 0, 0.05));
		text-align: left;
		font-weight: 600;
	}
	.jconfig-matrix__num {
		width: 5rem;
		text-align: center;
		font-variant-numeric: tabular-nums;
	}
	.jconfig-matrix__name {
		width: 12rem;
		font-weight: 600;
	}
	.jconfig-matrix__json {
		min-width: 0;
	}
</style>
