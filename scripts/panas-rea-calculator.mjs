#!/usr/bin/env node
import process from 'node:process';

function computeVBT(v_inmueble, v_com, v_local_usdt, v_plus, w1=0.45, w2=0.25, w3=0.20, w4=0.10) {
  return w1 * v_inmueble + w2 * v_com + w3 * v_local_usdt + w4 * v_plus;
}

function recommendLTV(base, bonusOperativo, bonusLiquidez, penalidadRiesgo, cap=0.80, baseFloor=0.70) {
  const bruto = baseFloor + bonusOperativo + bonusLiquidez - penalidadRiesgo;
  return Math.max(0, Math.min(cap, bruto));
}

function main() {
  const [precio, avaluo, comparables, fiat_usdt, plusvalia] = process.argv.slice(2).map(Number);
  if ([precio, avaluo, comparables, fiat_usdt, plusvalia].some((v) => !Number.isFinite(v))) {
    console.error("Uso: panas-rea-calculator.mjs <precio> <avaluo> <comparables> <fiat_usdt> <plusvalia>");
    process.exit(1);
  }
  const bonusOperativo = Number(process.env.PANAS_REA_OP_HISTORY_BONUS || 0.05);
  const bonusLiquidez = Number(process.env.PANAS_REA_POOL_LIQ_BONUS || 0.02);
  const penalidadRiesgo = Number(process.env.PANAS_REA_REGION_RISK_PENALTY || 0.05);
  const cap = Number(process.env.PANAS_REA_LTV_CAP || 0.80);
  const baseFloor = Number(process.env.PANAS_REA_LTV_BASE || 0.70);

  const vbt = computeVBT(avaluo, comparables, fiat_usdt, plusvalia);
  const ltv = recommendLTV(baseFloor, bonusOperativo, bonusLiquidez, penalidadRiesgo, cap, baseFloor);
  const emision = vbt * ltv;

  console.log(`VBT: ${vbt.toFixed(2)}`);
  console.log(`LTV recomendado: ${(ltv*100).toFixed(2)}%`);
  console.log(`Monto de emisión: ${emision.toFixed(2)}`);
}

main();


