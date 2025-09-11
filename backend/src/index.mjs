import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT_BACKEND || 3001;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const INDEX_FILE = path.join(DATA_DIR, 'fx-index.json');

async function ensureDir(p) {
  try { await fs.mkdir(p, { recursive: true }); } catch {}
}

function toNumber(v, def = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

function computeIndex({ fx_official, fx_parallel, fx_crypto }, { w_official, w_parallel, w_crypto }) {
  const sum = w_official + w_parallel + w_crypto;
  if (Math.abs(sum - 1) > 1e-6) {
    const k = 1 / sum;
    w_official *= k; w_parallel *= k; w_crypto *= k;
  }
  return w_official * fx_official + w_parallel * fx_parallel + w_crypto * fx_crypto;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
  return res.json();
}

async function fetchRates() {
  const fxOfficialUrl = process.env.FX_API_OFFICIAL;
  const fxParallelUrl = process.env.FX_API_PARALLEL;
  const fxCryptoUrl = process.env.FX_API_CRYPTO;

  const [offRaw, parRaw, cryRaw] = await Promise.all([
    fxOfficialUrl ? fetchJson(fxOfficialUrl).catch(() => null) : Promise.resolve(null),
    fxParallelUrl ? fetchJson(fxParallelUrl).catch(() => null) : Promise.resolve(null),
    fxCryptoUrl ? fetchJson(fxCryptoUrl).catch(() => null) : Promise.resolve(null)
  ]);

  // Adaptation layer — replace mappings as needed per API
  const fx_official = offRaw?.rate || offRaw?.fx || toNumber(process.env.FX_FALLBACK_OFFICIAL, 0);
  const fx_parallel = parRaw?.rate || parRaw?.fx || toNumber(process.env.FX_FALLBACK_PARALLEL, 0);
  const fx_crypto = cryRaw?.price || cryRaw?.rate || toNumber(process.env.FX_FALLBACK_CRYPTO, 0);

  return { fx_official: Number(fx_official), fx_parallel: Number(fx_parallel), fx_crypto: Number(fx_crypto) };
}

app.get('/metrics/index', async (_req, res) => {
  try {
    await ensureDir(DATA_DIR);

    const weights = {
      w_official: toNumber(process.env.PANAS_FX_WEIGHT_OFFICIAL || 0.2),
      w_parallel: toNumber(process.env.PANAS_FX_WEIGHT_PARALLEL || 0.4),
      w_crypto: toNumber(process.env.PANAS_FX_WEIGHT_CRYPTO || 0.4)
    };

    const rates = await fetchRates();
    const index = computeIndex(rates, weights);
    const now = new Date().toISOString();

    const payload = { now, rates, weights, index };
    await fs.writeFile(INDEX_FILE, JSON.stringify(payload, null, 2));
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`PANAS backend listening on :${PORT}`);
});
