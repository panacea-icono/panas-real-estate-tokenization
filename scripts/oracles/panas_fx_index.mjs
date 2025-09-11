#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

function toNumber(v, d=0){ const n = Number(v); return Number.isFinite(n)?n:d; }

async function fetchJson(url){ const r = await fetch(url); if(!r.ok) throw new Error(`fetch ${url}: ${r.status}`); return r.json(); }

function computeIndex({ fx_official, fx_parallel, fx_crypto }, { w_official, w_parallel, w_crypto }){
  const sum = w_official + w_parallel + w_crypto;
  if (Math.abs(sum - 1) > 1e-6){ const k = 1/sum; w_official*=k; w_parallel*=k; w_crypto*=k; }
  return w_official*fx_official + w_parallel*fx_parallel + w_crypto*fx_crypto;
}

async function main(){
  const outDir = path.resolve(process.cwd(), 'data');
  const outFile = path.join(outDir, 'fx-index.json');
  await fs.mkdir(outDir, { recursive: true });

  const weights = {
    w_official: toNumber(process.env.PANAS_FX_WEIGHT_OFFICIAL || 0.2),
    w_parallel: toNumber(process.env.PANAS_FX_WEIGHT_PARALLEL || 0.4),
    w_crypto: toNumber(process.env.PANAS_FX_WEIGHT_CRYPTO || 0.4)
  };

  const [offRaw, parRaw, cryRaw] = await Promise.all([
    process.env.FX_API_OFFICIAL ? fetchJson(process.env.FX_API_OFFICIAL).catch(()=>null):Promise.resolve(null),
    process.env.FX_API_PARALLEL ? fetchJson(process.env.FX_API_PARALLEL).catch(()=>null):Promise.resolve(null),
    process.env.FX_API_CRYPTO ? fetchJson(process.env.FX_API_CRYPTO).catch(()=>null):Promise.resolve(null)
  ]);

  const rates = {
    fx_official: Number(offRaw?.rate || offRaw?.fx || process.env.FX_FALLBACK_OFFICIAL || 0),
    fx_parallel: Number(parRaw?.rate || parRaw?.fx || process.env.FX_FALLBACK_PARALLEL || 0),
    fx_crypto: Number(cryRaw?.price || cryRaw?.rate || process.env.FX_FALLBACK_CRYPTO || 0)
  };

  const index = computeIndex(rates, weights);
  const now = new Date().toISOString();
  const payload = { now, rates, weights, index };
  await fs.writeFile(outFile, JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(payload));
}

main().catch(err=>{ console.error(err); process.exit(1); });
