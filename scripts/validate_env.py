#!/usr/bin/env python3
import json, os, sys, re
from typing import Dict, Any

REQUIRED_ALWAYS = [
    "DATABASE_URL",
    "OPENAI_API_KEY",
    "ALGORAND_NETWORK",
    "RELEASE_CHANNEL",
]

OPTIONAL_BOOL_FLAGS = {
    "ENABLE_TELEGRAM_BOT": False,
    "ENABLE_PANACEA_API": False,
    "ENABLE_DEFI_YIELD": False,
}

CHAIN_KEYS = {
    "ALGORAND": ["ALGORAND_MNEMONIC"],
    "TON": ["TON_RPC_URL", "TON_WALLET_ADDRESS"],
    "SOLANA": ["SOLANA_RPC_URL"],
    "BSC": ["BSC_RPC_URL"],
}

CI_KEYS = {
    "HEROKU": ["HEROKU_APP_NAME", "HEROKU_API_KEY"],
    "VERCEL": ["VERCEL_PROJECT_ID", "VERCEL_TOKEN"],
}

INDEX_KEYS = [
    "PANAS_INDEX_WEIGHTS",
    "GOVERNANCE_UPDATE_INTERVAL_DAYS",
    "DAO_MULTISIG_ADDRESS",
]

ADDR_REGEX = re.compile(r"^0x[a-fA-F0-9]{40}$|^[A-Za-z0-9_\-]{48,66}$")

def parse_bool(v: str, default=False) -> bool:
    if v is None:
        return default
    return v.strip().lower() in {"1", "true", "yes", "y", "on"}

def fail(msg: str):
    print(f"❌ {msg}", file=sys.stderr)
    sys.exit(1)

def warn(msg: str):
    print(f"⚠️  {msg}", file=sys.stderr)

def ok(msg: str):
    print(f"✅ {msg}")

def require_keys(keys):
    missing = [k for k in keys if not os.getenv(k)]
    if missing:
        fail(f"Faltan variables obligatorias: {', '.join(missing)}")

def validate_index_weights(raw: str):
    try:
        data: Dict[str, Any] = json.loads(raw)
    except Exception as e:
        fail(f"PANAS_INDEX_WEIGHTS debe ser JSON válido. Error: {e}")

    if not isinstance(data, dict) or not data:
        fail("PANAS_INDEX_WEIGHTS debe ser un objeto JSON no vacío.")

    total = 0.0
    for k, v in data.items():
        try:
            f = float(v)
        except Exception:
            fail(f"Peso inválido para '{k}': {v}")
        if f < 0 or f > 1:
            fail(f"Peso fuera de rango (0..1) para '{k}': {f}")
        total += f

    if abs(total - 1.0) > 1e-6:
        fail(f"La suma de PANAS_INDEX_WEIGHTS debe ser 1.0, ahora es {total:.6f}")

    ok(f"PANAS_INDEX_WEIGHTS OK (suma={total:.6f})")

def validate_days(var: str):
    v = os.getenv(var)
    if not v:
        fail(f"Falta {var}")
    try:
        d = int(v)
        if d <= 0:
            fail(f"{var} debe ser > 0")
    except Exception:
        fail(f"{var} debe ser entero")
    ok(f"{var} OK ({v})")

def validate_address(var: str):
    v = os.getenv(var)
    if not v:
        fail(f"Falta {var}")
    if not ADDR_REGEX.match(v):
        fail(f"{var} no parece una dirección válida (EVM/TON). Valor: {v}")
    ok(f"{var} OK")

def main():
    require_keys(REQUIRED_ALWAYS)
    ok("Claves base presentes")

    require_keys(INDEX_KEYS)
    validate_index_weights(os.getenv("PANAS_INDEX_WEIGHTS", ""))
    validate_days("GOVERNANCE_UPDATE_INTERVAL_DAYS")
    validate_address("DAO_MULTISIG_ADDRESS")

    flags = {k: parse_bool(os.getenv(k), default=v) for k, v in OPTIONAL_BOOL_FLAGS.items()}
    ok(f"Flags: {flags}")

    if flags["ENABLE_TELEGRAM_BOT"]:
        require_keys(["TELEGRAM_BOT_TOKEN"])
        ok("Telegram BOT listo")

    if flags["ENABLE_PANACEA_API"]:
        require_keys(["PANACEA_API_KEY"])
        ok("Panacea API listo")

    if flags["ENABLE_DEFI_YIELD"]:
        any_chain = any(os.getenv(x) for x in ["TON_RPC_URL", "SOLANA_RPC_URL", "BSC_RPC_URL"])
        if not any_chain:
            fail("ENABLE_DEFI_YIELD=on pero no hay RPC configurado (TON/SOLANA/BSC).")
        ok("DeFi yield prereqs OK")

    require_keys(CHAIN_KEYS["ALGORAND"])
    ok("Algorand OK")

    if os.getenv("TON_RPC_URL") or os.getenv("TON_WALLET_ADDRESS"):
        require_keys(CHAIN_KEYS["TON"])
        ok("TON OK")

    if os.getenv("SOLANA_RPC_URL"):
        ok("Solana RPC OK")

    if os.getenv("BSC_RPC_URL"):
        ok("BSC RPC OK")

    if os.getenv("HEROKU_APP_NAME") or os.getenv("HEROKU_API_KEY"):
        require_keys(CI_KEYS["HEROKU"])
        ok("Heroku CI/CD OK")
    if os.getenv("VERCEL_PROJECT_ID") or os.getenv("VERCEL_TOKEN"):
        require_keys(CI_KEYS["VERCEL"])
        ok("Vercel CI/CD OK")

    ok("Validación .env COMPLETADA ✔️")

if __name__ == "__main__":
    main()


