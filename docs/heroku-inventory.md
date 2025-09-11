# Heroku Inventory (PANAS / Panacea Icono)

Nota: No incluir claves ni tokens aquí. Usar variables de entorno en CI/Local.

## Cuentas y organizaciones
- Cuenta personal: repositorios.panacea@gmail.com
- Cuenta empresa: panacea-icono (apps en dashboard)

## Apps detectadas (según referencias)

Cuenta personal (posible):
- https://fibonacci-b33f2f33a8ad.herokuapp.com
- https://kuchiuyas-algorand-d0bd2e62d823.herokuapp.com
- https://backend-developer-d160b40c29bc.herokuapp.com
- https://api-panacea-638dc550fab6.herokuapp.com

Cuenta empresa (posible):
- https://ton-telegram-orquestador-185e533131f8.herokuapp.com
- https://fibonacci-b33f2f33a8ad.herokuapp.com
- https://kuchiuyas-72a39bde11fc.herokuapp.com
- Dashboard: https://dashboard.heroku.com/apps/panacea-icono

## Pipelines (pendiente de descubrimiento)
- Recolectar pipelines vía API de Heroku
- Relacionar apps → pipeline → stage (review/dev/staging/prod)

## Próximos pasos
- Ejecutar script `scripts/heroku/list_apps.mjs` con `HEROKU_API_KEY` para inventario vivo
- Añadir pipelines con `scripts/heroku/list_pipelines.mjs`
- Exportar CSV/JSON para auditoría interna

## Seguridad
- Rotar API keys en Heroku y guardarlas en GitHub Secrets (`HEROKU_API_KEY`)
- No almacenar tokens ni SSH keys en texto plano
