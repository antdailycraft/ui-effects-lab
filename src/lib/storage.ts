type Theme = "dark" | "light";
const THEME_KEY = "uifx.theme";
const EFFECT_KEY = "uifx.effect";
const CUSTOM_HTML_KEY = "uifx.customHtml";

export const DEFAULT_CUSTOM_HTML = `<div style="width:300px;padding:24px 26px;background:#fff;border-radius:16px;color:#191919;font-family:system-ui,sans-serif;box-shadow:0 12px 30px -12px rgba(0,0,0,.4)">
  <h3 style="margin:0 0 8px;font-size:20px">Your markup</h3>
  <p style="margin:0;color:#666;line-height:1.5;font-size:13px">Paste any HTML here — the effect applies to it live.</p>
</div>`;

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
export function loadCustomHtml(): string {
  const v = safeGet(CUSTOM_HTML_KEY);
  // Guard against a corrupted "undefined"/"null" string ever landing here.
  return v && v !== "undefined" && v !== "null" ? v : DEFAULT_CUSTOM_HTML;
}
export function saveCustomHtml(html: string): void {
  if (typeof html !== "string") return;
  safeSet(CUSTOM_HTML_KEY, html);
}
