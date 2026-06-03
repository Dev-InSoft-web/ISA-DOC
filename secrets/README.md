# Secretos locales (no versionar)

Solo **`api-keys.env`** vive aquí. Está en `.gitignore`.

## Uso

1. Copia `api-keys.env.example` → `api-keys.env`.
2. Rellena las llaves que necesites (OpenAI, Hugging Face, etc.).
3. El servidor Astro carga el archivo al arrancar rutas que llaman `loadApiKeysFromSecretsFile()` (`src/lib/core/secrets/loadApiKeys.ts`).

Las credenciales de **MSSQL** y reenvíos remotos siguen en **`.env`** en la raíz del repo (ver `.env.example`).

Los **JWT de prueba** van en `secrets/tokens/` (ver `secrets/tokens/README.md`).

## Qué sí va en git

- Todo **`public/static-api/`** (snapshots Postman, docs, tablas, codegen) — sin secretos en los JSON.
- Assets en **`public/assets/`**, docs fuente en **`public/content/docs/`**, datos en **`public/data/`**.

## Postman en static-api

Al ejecutar `npm run snapshot:data`, los entornos Postman se sanitizan: `CONTROLKEY`, `token` y campos `type: secret` quedan vacíos en el snapshot versionado.
