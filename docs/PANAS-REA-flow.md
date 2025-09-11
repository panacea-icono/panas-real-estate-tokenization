# PANAS-REA – Flujo de Validación y Emisión

## Diagrama ASCII

```
[Propietario/Tokenizador]
          |
          v
   (Carpeta Registral)
          |
          v
 [Avaluador Acreditado]
          |
      Firma NFD
          |
          v
   Señales de Valuación  ----+
 (V_inmueble, V_com, FX,      |
  V_plus, fotos/video,        |
  inspección GPS/hash)        |
          |                   |
          v                   |
     [Oráculo de Valor]       |
          |                   |
      Firma y Hash -----------+----> [On-chain: Oráculo Valor]
                                   (evento: valor_actualizado)

[Oráculo Registral/Legal] ------------------> [On-chain: Oráculo Legal]
 (gravámenes, litigios, estado)              (evento: riesgo_actualizado)

                 +---------------------------------------------+
                 |            Smart Contract PANAS-REA         |
                 |  - Lee VBT (índice) y riesgo               |
                 |  - Enforce LTV ≤ 80%                       |
                 |  - Pausa/condiciona pagos por riesgo       |
                 |  - Triggers de revaluación                 |
                 +--------------------+------------------------+
                                      |
                                      v
                              [Emisión PANAS-REA]
                                      |
                                      v
                                 [Inversores]
                                      |
                                      v
                            Pagos en PANAS Estable
                     (cupones / revshare / pool con covenants)
```

## Diagrama Mermaid (para docs renderizados)

```mermaid
flowchart TD
  A[Propietario/Tokenizador]
  B[Avaluador Acreditado\n(Firma NFD)]
  C[Oráculo de Valor\n(Valuación, FX, Pruebas)]
  D[On-chain: Oráculo Valor]
  E[Oráculo Registral/Legal]
  F[On-chain: Oráculo Legal]
  G[[Smart Contract PANAS-REA\nLTV<=80%, triggers, pausas]]
  H[Emisión PANAS-REA]
  I[Inversores]
  J[(Pagos en PANAS Estable)]

  A -->|Carpeta registral| B -->|Señales y evidencias| C -->|Firma+Hash| D
  E -->|Estado gravámenes/litigios| F
  D --> G
  F --> G
  G --> H --> I --> J
```

Notas:
- Las evidencias (fotos/vídeos con GPS, hashes de documentos) se anclan on-chain para trazabilidad.
- El contrato aplica límites de LTV, pausa pagos ante eventos de riesgo y exige revaluaciones periódicas.
- Los pagos a inversores se realizan siempre en PANAS estable.
