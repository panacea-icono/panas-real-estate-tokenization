# PANAS-REA Dataset – REA-BO-LPZ-2025-0001 (Ejemplo)

Este dataset ejemplifica cómo publicar evidencia y metadatos de una operación PANAS-REA en Hugging Face Datasets.

## Contenido
- `metadata.json`: Metadatos de la operación (avalúo, índice FX, VBT, LTV, oráculos, score IA)
- `evidence/` (referencias): hashes/CIDs a documentos y multimedia (no se adjuntan archivos sensibles, solo referencias)

## Campos clave (resumen)
- asset_id: REA-BO-LPZ-2025-0001
- fx_index: 11.30 (compuesto Oficial/Paralelo/USDT)
- vbt: 94,500
- ltv_recommended: 0.75
- issuance_panas: 70,875 PANAS
- risk_score: 27 (Apto)
- evidence:
  - title_docs_cid: ipfs://...
  - inspection_pack_cid: ipfs://...

## Uso sugerido
- Publicar este directorio como dataset: `panas-rea/REA-BO-LPZ-2025-0001`
- Exponer un Space que consuma `metadata.json` y visualice KPIs, evidencia y score

> Nota: Mantener PII cifrada y exponer solo hashes/CIDs públicos.
