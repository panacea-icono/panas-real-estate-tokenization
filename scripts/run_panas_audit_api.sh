#!/usr/bin/env bash
set -euo pipefail
export PYTHONUNBUFFERED=1
uvicorn src.backend.panas_audit_api.main:app --host 0.0.0.0 --port 8081


