const KEY = "uifx.favorites";

function safeRead(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]).filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function safeWrite(list: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore quota / disabled storage */
  }
}

export function loadFavorites(): string[] {
  return safeRead();
}

/** Toggle an effect's favorite state and persist; returns the new list. */
export function toggleFavorite(effectId: string): string[] {
  const list = safeRead();
  const next = list.includes(effectId)
    ? list.filter((id) => id !== effectId)
    : [...list, effectId];
  safeWrite(next);
  return next;
}
