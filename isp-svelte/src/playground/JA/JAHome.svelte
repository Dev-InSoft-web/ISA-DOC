<script lang="ts">
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";

   import DemoContainers from "./Containers/Containers.svelte";
   import DemoIconized from "./Iconized/Iconized.svelte";
   import DemoLayouts from "./Layouts/Layouts.svelte";
   import DemoOverlays from "./Overlays/Overlays.svelte";
   import DemoPrimitives from "./Primitives/Primitives.svelte";
   import DemoTypography from "./Typography/Typography.svelte";
</script>

<svelte:head>
   <title>Inicio · ISP Svelte Components</title>
   <meta name="description" content="Inicio del catálogo de ISP Svelte Components: contenedores, iconized, layouts, overlays, primitivas y tipografía." />
   <link rel="icon" type="image/jpeg" href="https://i.ibb.co/fVSYtgsT/images.jpg" />
   <meta property="og:title" content="Inicio · ISP Svelte Components" />
   <meta property="og:description" content="Inicio del catálogo de componentes Svelte de Ingeniería InSoft." />
   <meta property="og:image" content="https://i.ibb.co/fVSYtgsT/images.jpg" />
   <meta name="twitter:image" content="https://i.ibb.co/fVSYtgsT/images.jpg" />
</svelte:head>

<FlexLayout direction="column" style='font-family: Arial, Helvetica, "Segoe UI", Tahoma;'>
   <DemoContainers />
   <DemoIconized />
   <DemoLayouts />
   <DemoOverlays />
   <DemoPrimitives />
   <DemoTypography />
</FlexLayout>
