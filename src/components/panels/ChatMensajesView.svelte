<script lang="ts" context="module">
	export interface MsgVista {
		idMsg: string;
		rol: string;
		contenido: string;
		fecha: string;
		esUsuario: boolean;
	}
</script>

<script lang="ts">
	import { Card, FlexLayout } from "@ingenieria_insoft/ispsveltecomponents";

	export let mensajes: MsgVista[] = [];
</script>

<div class="chat-historial custom-scrollbar">
	{#each mensajes as m}
		<FlexLayout justify={m.esUsuario ? "end" : "start"} items="start" style="width: 100%;">
			<div class="msg-wrap">
				<Card
					variant="solid"
					style={m.esUsuario ? "background-color: var(--is-primary); color: #fff;" : ""}
				>
					<div class="msg-head">#{m.idMsg} · {m.rol}{m.fecha ? ` · ${m.fecha}` : ""}</div>
					<pre class="msg-body">{m.contenido}</pre>
				</Card>
			</div>
		</FlexLayout>
	{/each}
</div>

<style>
	.chat-historial {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		overflow: auto;
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		height: 100%;
	}
	.msg-wrap {
		max-width: 80%;
	}
	.msg-head {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.75;
		margin-bottom: 0.4rem;
	}
	.msg-body {
		white-space: pre-wrap;
		word-break: break-word;
		font-family: inherit;
		font-size: 0.92rem;
		line-height: 1.5;
		margin: 0;
	}
</style>
