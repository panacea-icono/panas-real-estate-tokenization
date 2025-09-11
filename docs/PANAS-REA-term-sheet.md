# Term Sheet – PANAS-REA #[ID]

```
OPERACIÓN: PANAS-REA #[ID] – [Ciudad, País]
ACTIVO: [Tipo, m², dirección (hash), coordenadas]
PROPIETARIO/TOKENIZADOR (NFD): [NFD-xxxxx]  CONTACTO: [–]
RIESGO: [R0/R1/R2/R3]  ESTADO REGISTRAL: [limpio/gravamen/remate]
VALORES BASE:
  V_inmueble: [ ]   V_com: [ ]   V_local→USDT: [ ]   V_plus: [ ]
  PESOS: w1=0.45 w2=0.25 w3=0.20 w4=0.10
  VBT: [calculado]
% TOKENIZABLE / LTV: [X%] (tope región: [70/80]%)   MONTO EMISIÓN: [VBT×%]
RETORNO:
  Modelo: [Fijo % APR | RevShare % NOI | Pool/Staking]
  Calendario pagos: [mensual/trimestral]   Prioridad: [senior/junior]
COVENANTS:
  Reporting: mensual (ocupación, NOI, gastos)
  Liquidez (si pool): lock [X] meses, min TVL [ ], slashing [reglas]
  Revaluación: cada [12] meses o desvío >15%
EVENTOS DE INCUMPLIMIENTO: [falta pago, caída NOI >X%, retiro pool anticipado, etc.]
REMEDIOS: [gracia X días, step-in operador, liquidación parcial, recompra]
ORÁCULOS: [registral, valuación, tipo de cambio, ocupación]
GOBERNANZA/REGIÓN: [cap originator, cap emisión anual, KYC/AML]
```

## Fórmulas clave

- VBT = w1·V_inmueble + w2·V_com + w3·V_local→USDT + w4·V_plus
- LTV_max_bruto = min(0.80, 0.70 + bonus_operativo + bonus_liquidez − penalidad_riesgo)

## Clasificación de riesgo

- R0 Limpia | R1 Gravamen menor | R2 Compleja | R3 Remate/Ejecución

## Notas

- Pagos y unidad de cuenta en PANAS estable.
- Revaluación y ajuste de LTV con triggers (>±15% KPIs/avalúo/FX/gravamen).


