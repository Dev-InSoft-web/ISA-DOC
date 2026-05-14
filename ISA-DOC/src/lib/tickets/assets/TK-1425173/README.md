# TK-1425173 — Imágenes pendientes

Coloca aquí la captura adjuntada por el ingeniero (formulario del recurso
mostrando los campos "Dificultad" e "iplanpadre") y luego ejecuta:

```powershell
node scripts/upload-assets-imgbb.mjs
```

Sugerencias de nombre:

- `iplanpadreActual.jpg` — estado actual con captura numérica del padre.

Una vez subida, agrega la referencia con `img("iplanpadreActual.jpg")` en
`TK-1425173.ts`.
