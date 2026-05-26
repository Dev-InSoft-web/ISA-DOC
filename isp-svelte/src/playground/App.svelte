<script lang="ts">
   import { DarkMode } from "flowbite-svelte";
   import DemosRouter from "./JA/DemosRouter.svelte";
   import DemoToaster from "$lib/overlays/Toaster.svelte";
   import ViewAccordion from "./ViewAccordion.svelte";
   import ViewBtnRef from "./ViewBtnRef.svelte";
   import ViewBtnSubmit from "./ViewBtnSubmit.svelte";
   import ViewButton from "./ViewButton.svelte";
   import ViewCatalogoGen from "./ViewCatalogoGen.svelte";
   import ViewCheckBox from "./ViewCheckBox.svelte";
   import ViewDate from "./ViewDate.svelte";
   import ViewFromulario from "./ViewFromulario.svelte";
   import ViewInput from "./ViewInput.svelte";
   import ViewModalVerificacion from "./ViewModalVerificacion.svelte";
   import ViewMultiSelect from "./ViewMultiSelect.svelte";
   import ViewNumber from "./ViewNumber.svelte";
   import ViewPassword from "./ViewPassword.svelte";
   import ViewRichEditor from "./ViewRichEditor.svelte";
   import ViewSelectEnumString from "./ViewSelectEnum.svelte";
   import ViewSelectObject from "./ViewSelectObject.svelte";
   import ViewTabs from "./ViewTabs.svelte";
   import ViewVerMas from "./ViewVerMas.svelte";
   import ViewGrid from "./ViewGrid.svelte";
</script>

<DarkMode class="app-darkmode" style="width: 50px; position: fixed; top: 1rem; right: 1rem; z-index: 9999;" />

<DemosRouter>
   <ViewGrid />
   <ViewBtnRef />
   <ViewInput />
   <DemoToaster />
   <ViewSelectEnumString />
   <ViewSelectObject />
   <ViewTabs />
   <ViewMultiSelect />
   <ViewCatalogoGen />
   <ViewNumber />
   <ViewPassword />
   <ViewBtnRef />
   <ViewDate />
   <ViewCheckBox />
   <ViewRichEditor />
   <ViewModalVerificacion />
   <ViewFromulario />
   <ViewVerMas />
   <ViewButton />
   <ViewBtnSubmit />
   <ViewAccordion />
</DemosRouter>
