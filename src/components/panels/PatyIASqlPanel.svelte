<script lang="ts">
	import SqlSchemaTreeView from "./sql/SqlSchemaTreeView.svelte";
	import { patyiaSqlController } from "../../lib/sqlControllers/patyiaSqlController";
</script>

<SqlSchemaTreeView controller={patyiaSqlController} />
