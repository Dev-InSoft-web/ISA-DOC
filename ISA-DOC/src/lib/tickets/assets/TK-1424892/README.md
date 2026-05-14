# TK-1424892 — Imágenes pendientes

Coloca aquí la captura adjuntada por el ingeniero (estado esperado del
catálogo BtnRef en la pestaña Seguridad de cursos) y luego ejecuta:

```powershell
node scripts/upload-assets-imgbb.mjs
```

Sugerencias de nombre:

- `seguridadBtnRefEsperado.jpg` — captura del catálogo con la toolbar y las
  pestañas laterales correctamente alineadas.

Una vez subida, agrega la referencia con `img("seguridadBtnRefEsperado.jpg")`
en `TK-1424892.ts`.
