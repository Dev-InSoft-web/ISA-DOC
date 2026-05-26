<script lang="ts">
	import { InputDate } from "$lib";

	import { fly } from "svelte/transition";

	let onChange = () => console.log("onChangeInput", value);
	let onTypingEnd = () => console.log("onTypingEnd", value);
	let id: string = "idComponent";
	let required: boolean = true;
	let readonly: boolean = false;
	let name: string = "nameComponent";
	let label: string = "Label a mostrar";
	let labelClass: string = "";
	let value: Date = new Date();
	let inputClass: string = "";
	let style: string = 'color:red'
	let svg: string = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<g stroke-width="0"></g>
						<g stroke-linecap="round" stroke-linejoin="round"></g>
						<g>
							<path
								d="M3,22H21a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H3A1,1,0,0,0,2,6V21A1,1,0,0,0,3,22ZM4,7H20v3H4Zm0,5H20v8H4Z"
							></path>
						</g>
					</svg>`;
	let maxLength: number = 255;

	let visible: boolean = false;
</script>

<article>
	<button on:click={() => (visible = !visible)}>
		Date {visible ? "▲" : "▼"}
	</button>
	{#if visible}
		<div in:fly={{ y: -50 }}>
			<h3>Propiedades</h3>
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Tipo</th>
						<th>Requerido</th>
						<th>Ejemplo</th>
						<th>Descripción</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>onChange</td>
						<td>function</td>
						<td>false</td>
						<td>{'let onChange = () => console.log("onChangeInput", value);'}</td>
						<td>Función que se ejecutará cuando el valor cambie por un usuario</td>
					</tr>
					<tr>
						<td>onTypingEnd</td>
						<td>function</td>
						<td>false</td>
						<td>{'let onTypingEnd = () => { console.log("onTypingEnd", value)'} </td>
						<td>Función que se ejecutará cuando termine de escribir, dando un tiempo de espera para que el usuario termine de escribir</td>
					</tr>
					<tr>
						<td>id</td>
						<td>string</td>
						<td>false</td>
						<td><input type="text" bind:value={id} /></td>
						<td>Identificador del componente</td>
					</tr>
					<tr>
						<td>required</td>
						<td>boolean</td>
						<td>false</td>
						<td><input type="checkbox" bind:checked={required} /></td>
						<td>Indica si el componente es requerido</td>
					</tr>
					<tr>
						<td>readonly</td>
						<td>boolean</td>
						<td>false</td>
						<td><input type="checkbox" bind:checked={readonly} /></td>
						<td>Indica si el componente es de solo lectura</td>
					</tr>
					<tr>
						<td>name</td>
						<td>string</td>
						<td>false</td>
						<td><input type="text" bind:value={name} /></td>
						<td>Asigna la propiedad name del componente</td>
					</tr>
					<tr>
						<td>label</td>
						<td>string</td>
						<td>false</td>
						<td><input type="text" bind:value={label} /></td>
						<td>Indica el label del componente</td>
					</tr>
					<tr>
						<td>value</td>
						<td>string</td>
						<td>false</td>
						<td><input type="date" bind:value /></td>
						<td>Indica el valor del input del componente</td>
					</tr>
					<tr>
						<td>inputClass</td>
						<td>string</td>
						<td>false</td>
						<td><input type="text" bind:value={inputClass} /></td>
						<td>Indica el valor del input del componente</td>
					</tr>
					<tr>
						<td>svg</td>
						<td>string</td>
						<td>false</td>
						<td><textarea bind:value={svg}></textarea></td>
						<td>Indica el nombre de una imagen que se encuentre en la carpeta public/icons/form</td>
					</tr>
					<tr>
						<td>maxLength</td>
						<td>number</td>
						<td>false</td>
						<td><input type="text" bind:value={maxLength} /></td>
						<td>Indica el tamaño máximo del input del componente</td>
					</tr>
				</tbody>
			</table>
			<h3>Previsualizacion</h3>
			<InputDate {id} {required} {readonly} {name} {label} {labelClass} {style} {inputClass} {maxLength} bind:value {onChange} {onTypingEnd}>
				<svelte:fragment slot="svg">
					{@html svg}
				</svelte:fragment>
			</InputDate>
		</div>
	{/if}
</article>
