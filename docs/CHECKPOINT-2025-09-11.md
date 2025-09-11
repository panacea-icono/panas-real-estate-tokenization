# Checkpoint – 2025-09-11

## Estado
- Repo inicializado, estructura base creada (.gitattributes, .gitmodules, .gitignore, CI).
- PANAS-REA docs: estándar técnico, flujo (ASCII+Mermaid), term sheet, metadata example + JSON Schema.
- Validadores `.env` (Python y Node), workflow de validación y pre-commit.
- FX Index:
  - Script oráculo (`scripts/oracles/panas_fx_index.mjs`).
  - Backend Node `/metrics/index` (local) y workflow cron diario.
- FastAPI PANAS-AUDIT: `/audit/submit`, `/audit/score/{id}`, `/oracles/fx/update`.
- Hugging Face: dataset ejemplo en `docs/hf-datasets/REA-EXAMPLE/` listo para publicar.
- Heroku: backend desplegado (FastAPI) con Procfile.
  - URL: https://panas-rea-backend-2079d92d655a.herokuapp.com/
  - Config vars mínimas sembradas (placeholders).

## Pendientes inmediatos
- Rotar y cargar secretos reales (GitHub Secrets/Heroku Config Vars/HF Repo Secrets):
  - `OPENAI_API_KEY`, `HF_TOKEN`, `HEROKU_API_KEY`, `DOCKER_TOKEN`, `VERCEL_TOKEN`, `TELEGRAM_BOT_TOKEN_*`.
- Space HF: conectar dashboard (Gradio) al endpoint `/metrics/index` y datasets.
- Endpoints backend adicionales: `/token/info`, `/metrics` agregadas (KPIs REA) y persistencia (Postgres/Redis).
- Seguridad: añadir `gitleaks` (pre-commit + workflow) y `SECURITY.md`.

## Decisiones requeridas
- Nombre(s) definitivos de apps Heroku (prod/staging) y región.
- ¿Procfile simple vs Docker para backend en producción?
- Fuentes definitivas de oráculos FX y autenticación.

## Siguientes pasos sugeridos
1) Cargar secretos en repos/Heroku y probar `/metrics/index` desde Space.
2) Implementar `/token/info` y `/metrics` con Postgres (docker-compose local, add-on en Heroku).
3) Publicar primer dataset REA real en HF (usando `metadata.schema.json`) y enlazar desde Space.
