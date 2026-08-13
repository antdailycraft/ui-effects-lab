type Theme = "dark" | "light";
const THEME_KEY = "uifx.theme";
const EFFECT_KEY = "uifx.effect";

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export function loadTheme(): Theme {
  return safeGet(THEME_KEY) === "light" ? "light" : "dark";
}
export function saveTheme(t: Theme): void {
  safeSet(THEME_KEY, t);
}
export function loadLastEffectId(): string | null {
  return safeGet(EFFECT_KEY);
}
export function saveLastEffectId(id: string): void {
  safeSet(EFFECT_KEY, id);
}
