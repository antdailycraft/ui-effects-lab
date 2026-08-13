import type { ControlDefinition, ParamValue } from "../types/effects";

export const dec = (v: number, d: number): string => Number(v).toFixed(d);

export function formatValue(control: ControlDefinition, value: ParamValue): string {
  if (typeof value === "boolean") return value ? "on" : "off";
  return dec(value, control.decimals ?? 0) + (control.unit ?? "");
}
