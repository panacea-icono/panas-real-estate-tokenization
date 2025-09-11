# PANAS-REA – Estándar Técnico de Tokenización Inmobiliaria

PANAS-REA (Real Estate Assets) es un estándar de emisión de tokens fungibles dentro del ecosistema PANAS, diseñado para representar derechos económicos de activos inmobiliarios, con unidad de cuenta y liquidación en PANAS estable, integrando gobernanza y oráculos.

## 1) Descripción del estándar
- Unidad de cuenta: PANAS estable (puente a USDT y FIAT local).
- Integra y alimenta el Índice PANAS (estable) vía reservas y cash flows.
- Proceso operativo por capas L0–L3:
  - L0 Registro: validación registral y gravámenes.
  - L1 Valuación: cálculo de VBT.
  - L2 Estructuración/Emisión: % tokenizable, retorno, covenants.
  - L3 Operación: reportes, pagos, revaluaciones y ajustes.

## 2) Roles
- Tokenizador (originator): diseña la operación, documentación y modelo operativo.
- Propietario (tokenizado): cede derechos económicos sobre la porción tokenizada.
- Inversores: adquieren PANAS-REA y reciben el retorno definido.
- Valuadores/Oráculos (NFD): aportan señales (registro, avalúo, ocupación, FX).
- DAO PANAS Index: límites, sanciones, parámetros regionales del índice.

## 3) Metadatos del activo ("ERC-20 extendido")
Metadatos mínimos a adjuntar a la emisión (on-chain o referenciados off-chain):
- asset_id: identificador interno/externo del activo.
- title_hash: hash del folio real/escritura y carpeta registral.
- geo: { country, city, coords }.
- risk_class: R0/R1/R2/R3.
- appraisal: { v_inmueble, v_comparables, v_local_usdt, v_plus, weights }.
- vbt: valor base tokenizable calculado.
- ltv_caps: { regional_cap, hard_cap: 0.80 }.
- return_model: { type: fijo|revshare|pool, params }.
- covenants: reporting, liquidez mínima si pool, recompra, eventos de default.
- oracles: endpoints/IDs de oráculos (registral, valuación, FX, ocupación).
- governance: región, caps por originator, políticas KYC/AML.

Sugerencia: serializar en JSON y anclar a un hash (IPFS/Arweave o storage verificado) referenciado desde el contrato.

## 4) Fórmulas
- VBT = w1·V_inmueble + w2·V_com + w3·V_local→USDT + w4·V_plus
- LTV_max_bruto = min(0.80, 0.70 + bonus_operativo + bonus_liquidez − penalidad_riesgo)
  - bonus_operativo (0–10 pp), bonus_liquidez (0–5 pp), penalidad_riesgo (0–15 pp)

## 5) Reglas de emisión
- Tope absoluto LTV: 80%.
- Reglas regionales: caps por región y por originator.
- Si gravámenes: reducción de LTV y/o uso de fondos para cancelación.
- Remates (R3): emisiones en dos tramos (adquisición y operación post-saneamiento).

## 6) Modelos de retorno
- Fijo (cupones): 6–12% APR, calendario definido, ajustes anuales.
- Revenue share: % sobre ingresos brutos o NOI, con waterfall explícito.
- Pool/Staking: APR variable DeFi; covenants de lock, TVL mínimo y slashing.

## 7) Ciclo de vida L0–L3 (resumen)
- L0 Registro: subir evidencias (hash), clasificar riesgo (R0–R3).
- L1 Valuación: calcular VBT con pesos regionales; validar oráculos.
- L2 Emisión: fijar % tokenizable, retorno, covenants; publicar metadatos.
- L3 Operación: reportes mensuales, pagos, triggers de revaluación (>±15%), ajustes de LTV.

## 8) Interfaces (on/off-chain)
- On-chain (Algorand ASA + metadata reference):
  - Campos sugeridos: URL/IPFS hash, JSON metadata, autoridad emisora (Panacea | Icono SA), flags de congelación/pausa si aplican normativamente.
- Off-chain (APIs recomendadas):
  - GET /token/info: detalle del activo y emisión.
  - GET /metrics: KPIs (ocupación, NOI, LTV, TVL, flujos).
  - POST /oracles/update: señales de oráculos firmadas (NFD/clave autorizada).

## 9) Seguridad y cumplimiento
- KYC/AML: propietario e inversores según jurisdicción.
- Gobernanza: sanciones y caps regionales; auditoría semestral o por desvío >15%.
- Transparencia: reportes on/off-chain y evidencia de pagos en PANAS estable.

## 10) Variables de control (env)
Ver `.env.example` – sección PANAS-REA; claves principales:
- PANAS_REA_LTV_CAP, PANAS_REA_LTV_BASE, *_BONUS_MAX, *_PENALTY_MAX
- PANAS_REA_W_*, PANAS_REA_REPORTING_FREQ_DAYS, PANAS_REA_REAPPRAISAL_MONTHS
- Rango de retornos: PANAS_REA_FIXED_APR_MIN/MAX, PANAS_REA_REVSHARE_MIN/MAX

## 11) Ejemplos y tooling
- Plantilla de term sheet: `docs/PANAS-REA-term-sheet.md`.
- Calculadoras:
  - Python: `scripts/panas_rea_calculator.py`
  - Node: `scripts/panas-rea-calculator.mjs`

## 12) Roadmap de referencia
- v1: Estándar base y metadatos; endpoints `/token/info` y `/metrics`.
- v2: Oráculos firmados y actualizaciones automáticas de VBT/LTV.
- v3: Pools/staking con covenants on-chain y slashing configurable.

---

Este documento define el estándar operativo y técnico de PANAS-REA para emisiones consistentes, seguras y auditables dentro del ecosistema PANAS.

### Referencias
- Flujo de validación y emisión: `docs/PANAS-REA-flow.md`
- Ejemplo de metadatos: `docs/panas-rea-metadata.example.json`
- Esquema JSON (validación): `docs/panas-rea-metadata.schema.json`
