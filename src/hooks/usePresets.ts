import { useCallback, useState } from "react";
import type { Params } from "../types/effects";
import { deletePreset, loadPresets, savePreset } from "../lib/presets";

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `p_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}

export function usePresets() {
  const [presets, setPresets] = useState(() => loadPresets());

  const add = useCallback((name: string, effectId: string, params: Params) => {
    setPresets(savePreset({ name, effectId, params }, Date.now(), newId()));
  }, []);

  const remove = useCallback((id: string) => {
    setPresets(deletePreset(id));
  }, []);

  return { presets, add, remove };
}
