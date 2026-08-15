import type { Params } from "../types/effects";

export interface Preset {
  id: string;
  name: string;
  effectId: string;
  params: Params;
  createdAt: number;
}

const KEY = "uifx.presets";

function safeRead(): Preset[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Preset[]) : [];
  } catch {
    return [];
  }
}

function safeWrite(list: Preset[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore quota / disabled storage */
  }
}

export function loadPresets(): Preset[] {
  return safeRead();
}

/** Append a preset and persist. `now`/`id` are injected so callers stay deterministic in tests. */
export function savePreset(
  input: { name: string; effectId: string; params: Params },
  now: number,
  id: string
): Preset[] {
  const preset: Preset = {
    id,
    name: input.name,
    effectId: input.effectId,
    params: { ...input.params },
    createdAt: now,
  };
  const list = [...safeRead(), preset];
  safeWrite(list);
  return list;
}

export function deletePreset(id: string): Preset[] {
  const list = safeRead().filter((p) => p.id !== id);
  safeWrite(list);
  return list;
}

export function presetsForEffect(list: Preset[], effectId: string): Preset[] {
  return list.filter((p) => p.effectId === effectId);
}
