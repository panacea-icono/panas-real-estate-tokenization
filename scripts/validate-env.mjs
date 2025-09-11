#!/usr/bin/env node
import process from "node:process";

const requiredAlways = [
  "DATABASE_URL",
  "OPENAI_API_KEY",
  "ALGORAND_NETWORK",
  "RELEASE_CHANNEL",
];

const optionalFlags = {
  ENABLE_TELEGRAM_BOT: false,
  ENABLE_PANACEA_API: false,
  ENABLE_DEFI_YIELD: false,
};

const chainKeys = {
  ALGORAND: ["ALGORAND_MNEMONIC"],
  TON: ["TON_RPC_URL", "TON_WALLET_ADDRESS"],
};

const ciKeys = {
  HEROKU: ["HEROKU_APP_NAME", "HEROKU_API_KEY"],
  VERCEL: ["VERCEL_PROJECT_ID", "VERCEL_TOKEN"],
};

const addrRegex = /^(0x[a-fA-F0-9]{40}|[A-Za-z0-9_\-]{48,66})$/;

function fail(msg) {
  console.error("❌ " + msg);
  process.exit(1);
}
function ok(msg) {
  console.log("✅ " + msg);
}
function requireKeys(keys) {
  const miss = keys.filter((k) => !process.env[k]);
  if (miss.length) fail(`Faltan variables: ${miss.join(", ")}`);
}

function parseBool(v, d = false) {
  if (v == null) return d;
  return ["1", "true", "yes", "y", "on"].includes(String(v).toLowerCase());
}

function validateIndexWeights(raw) {
  let obj;
  try {
    obj = JSON.parse(raw);
  } catch (e) {
    fail(`PANAS_INDEX_WEIGHTS inválido: ${e.message}`);
  }
  if (!obj || typeof obj !== "object") fail("PANAS_INDEX_WEIGHTS debe ser objeto JSON");
  const sum = Object.entries(obj).reduce((acc, [k, v]) => {
    const f = Number(v);
    if (!Number.isFinite(f) || f < 0 || f > 1) fail(`Peso inválido ${k}: ${v}`);
    return acc + f;
  }, 0);
  if (Math.abs(sum - 1) > 1e-6) fail(`Suma de pesos debe ser 1.0, ahora ${sum}`);
  ok("PANAS_INDEX_WEIGHTS OK");
}

function validateDays(name) {
  const v = process.env[name];
  if (!v) fail(`Falta ${name}`);
  const n = Number(v);
  if (!Number.isInteger(n) || n <= 0) fail(`${name} debe ser entero > 0`);
  ok(`${name} OK (${n})`);
}

function validateAddress(name) {
  const v = process.env[name];
  if (!v) fail(`Falta ${name}`);
  if (!addrRegex.test(v)) fail(`${name} con formato inválido: ${v}`);
  ok(`${name} OK`);
}

(function main() {
  requireKeys(requiredAlways);

  requireKeys(["PANAS_INDEX_WEIGHTS", "GOVERNANCE_UPDATE_INTERVAL_DAYS", "DAO_MULTISIG_ADDRESS"]);
  validateIndexWeights(process.env.PANAS_INDEX_WEIGHTS);
  validateDays("GOVERNANCE_UPDATE_INTERVAL_DAYS");
  validateAddress("DAO_MULTISIG_ADDRESS");

  const flags = Object.fromEntries(
    Object.entries(optionalFlags).map(([k, d]) => [k, parseBool(process.env[k], d)])
  );
  console.log("Flags:", flags);

  if (flags.ENABLE_TELEGRAM_BOT) requireKeys(["TELEGRAM_BOT_TOKEN"]);
  if (flags.ENABLE_PANACEA_API) requireKeys(["PANACEA_API_KEY"]);
  if (flags.ENABLE_DEFI_YIELD) {
    if (!process.env.TON_RPC_URL && !process.env.SOLANA_RPC_URL && !process.env.BSC_RPC_URL) {
      fail("ENABLE_DEFI_YIELD=on pero falta al menos un RPC (TON/SOLANA/BSC).");
    }
  }

  requireKeys(chainKeys.ALGORAND);
  if (process.env.TON_RPC_URL || process.env.TON_WALLET_ADDRESS) requireKeys(chainKeys.TON);

  if (process.env.HEROKU_APP_NAME || process.env.HEROKU_API_KEY) requireKeys(ciKeys.HEROKU);
  if (process.env.VERCEL_PROJECT_ID || process.env.VERCEL_TOKEN) requireKeys(ciKeys.VERCEL);

  ok("Validación .env COMPLETADA ✔️");
})();


