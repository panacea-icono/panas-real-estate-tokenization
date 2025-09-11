#!/usr/bin/env python3
import argparse

def compute_vbt(v_inmueble: float, v_com: float, v_local_usdt: float, v_plus: float,
                w1: float = 0.45, w2: float = 0.25, w3: float = 0.20, w4: float = 0.10) -> float:
    return w1 * v_inmueble + w2 * v_com + w3 * v_local_usdt + w4 * v_plus

def recommend_ltv(base: float, bonus_operativo: float, bonus_liquidez: float, penalidad_riesgo: float,
                  cap: float = 0.80, base_floor: float = 0.70) -> float:
    bruto = base_floor + bonus_operativo + bonus_liquidez - penalidad_riesgo
    return max(0.0, min(cap, bruto))

def main():
    p = argparse.ArgumentParser(description="PANAS-REA Calculator")
    p.add_argument("precio", type=float, help="Precio de referencia")
    p.add_argument("avaluo", type=float, help="Avalúo técnico (V_inmueble)")
    p.add_argument("comparables", type=float, help="Comparables €/m² (V_com)")
    p.add_argument("fiat_usdt", type=float, help="Paridad FIAT→USDT (V_local→USDT)")
    p.add_argument("plusvalia", type=float, help="Plusvalía 12–24m (V_plus)")
    p.add_argument("--bonus_operativo", type=float, default=0.05)
    p.add_argument("--bonus_liquidez", type=float, default=0.02)
    p.add_argument("--penalidad_riesgo", type=float, default=0.05)
    p.add_argument("--cap", type=float, default=0.80)
    p.add_argument("--base_floor", type=float, default=0.70)
    args = p.parse_args()

    vbt = compute_vbt(args.avaluo, args.comparables, args.fiat_usdt, args.plusvalia)
    ltv = recommend_ltv(args.base_floor, args.bonus_operativo, args.bonus_liquidez, args.penalidad_riesgo, cap=args.cap, base_floor=args.base_floor)
    emision = vbt * ltv

    print(f"VBT: {vbt:.2f}")
    print(f"LTV recomendado: {ltv:.2%}")
    print(f"Monto de emisión: {emision:.2f}")

if __name__ == "__main__":
    main()


