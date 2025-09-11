from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from datetime import datetime
import os

app = FastAPI(title="PANAS-AUDIT API", version="0.1.0")


class AuditScoreRequest(BaseModel):
    audit_id: str
    fx_index: float | None = None
    ltv_cap: float | None = None


@app.post("/audit/submit")
async def audit_submit(asset_id: str = Form(...), evidence: UploadFile = File(...)):
    audit_id = f"AUD-{int(datetime.utcnow().timestamp())}"
    # Stub: store file to /tmp (replace with object storage/IPFS)
    _ = await evidence.read()
    return {"audit_id": audit_id, "asset_id": asset_id, "received": True}


@app.post("/audit/score/{audit_id}")
async def audit_score(audit_id: str, body: AuditScoreRequest):
    # Stub scoring and attestation
    attestation = {
        "standard": "PANAS-AUDIT@0.1",
        "asset_id": body.audit_id,
        "fx_index": body.fx_index,
        "ltv_cap": body.ltv_cap,
        "risk_score": 27,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "signed_by": os.getenv("ORACLE_AUDIT_SIGNER", "nfd:oraculos/panas_audit_stub"),
        "signature": "stub"
    }
    return JSONResponse(attestation)


@app.post("/oracles/fx/update")
async def oracles_fx_update(payload: dict):
    # Accept precomputed FX index payload from oracle job
    payload["received_at"] = datetime.utcnow().isoformat() + "Z"
    return payload


