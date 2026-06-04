<script lang="ts">
	import { Button, FlexLayout, InputDecorated, Modal, Text, toastError, toastSuccess } from "@ingenieria_insoft/ispsveltecomponents";
	import {
		cancelLabAuth,
		completeLabAuth,
		labAuthModalOpen,
		loginLabApi,
	} from "../../lib/core/lab-api/lab-auth-session.ts";

	let username = "JAGUDELOE";
	let password = "";
	let loading = false;

	async function submit(): Promise<void> {
		if (!username.trim() || !password) {
			toastError("Usuario y contraseña requeridos");
			return;
		}
		loading = true;
		try {
			const res = await loginLabApi(username.trim(), password);
			if (!res.token) throw new Error("Sin token en la respuesta");
			completeLabAuth(res.token, res.expiresAt);
			toastSuccess(`Sesión lab activa (${res.expiresInDays ?? 30} días)`);
			password = "";
		} catch (e) {
			toastError(e instanceof Error ? e.message : String(e));
		} finally {
			loading = false;
		}
	}

	function onClose(): void {
		if (loading) return;
		cancelLabAuth();
	}
</script>

<Modal bshow={$labAuthModalOpen} loading={loading} showCloseHeader on:close={onClose}>
	<FlexLayout direction="column" gap="md" style="min-width: 320px; max-width: 420px;">
		<Text as="p">
			La sesión con <strong>lab-langgraph</strong> expiró o no existe. Ingresa usuario y contraseña para obtener un JWT (30 días).
		</Text>
		<InputDecorated label="Usuario" bind:value={username} autocomplete="username" />
		<InputDecorated label="Contraseña" type="password" bind:value={password} autocomplete="current-password" />
		<FlexLayout gap="sm" justify="end">
			<Button variant="outlined" onClick={onClose} disabled={loading}>Cancelar</Button>
			<Button onClick={submit} disabled={loading}>Iniciar sesión</Button>
		</FlexLayout>
	</FlexLayout>
</Modal>
