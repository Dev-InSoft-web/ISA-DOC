# Fragmentos de código en tickets

## Regla

Los fragmentos que se **muestran en el HTML del ticket** (bloques `codeBlock`, SQL en `cambiosBd`, celdas `compareTable` con `kind: "code"`) **no llevan comentarios**:

- TypeScript/JavaScript: sin líneas `//` ni bloques `/* … */`
- SQL: sin líneas `-- …`

La explicación va en notas del cuerpo (`note`, `intencion` de `cambiosBd`), no dentro del snippet.

## Dónde sí pueden ir comentarios

| Ubicación | Comentarios |
| --- | --- |
| Cabecera del archivo `TK-*.ts` (contexto interno) | Permitidos; no se renderizan en el ticket |
| `TK-*-sql.ts` — línea `/** … */` sobre el `export` | Solo documentación del archivo |
| Skill / `docs/` | Obligatorio documentar la regla aquí |

## Implementación

`lib/stripFragmentComments.ts` elimina comentarios al renderizar (`codeBlock`, `compareTable`). Aun así, **escribir el snippet ya limpio** evita sorpresas en imágenes carbon (`code-images:build`) y en revisiones.

## Ejemplo incorrecto (visible en ticket)

```typescript
prompt: {
  id: promptId, // PR_GENERAL
  variables: { ... }
}
```

## Ejemplo correcto

```typescript
prompt: {
  id: promptId,
  variables: {
    nombre_usuario: nombreSesion,
    instrucion_tipo: textoInstruccionBdResuelto
  }
}
```

Con la nota en el párrafo: «sin campo `instructions` en el body; solo variables del prompt».
