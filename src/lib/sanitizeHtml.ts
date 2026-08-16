/**
 * A light client-side sanitizer for the Custom preview markup.
 *
 * The markup is the user's own, lives only in their browser (never shared — the
 * share link carries params, not custom HTML), and `innerHTML` already refuses
 * to execute injected <script> tags. This still strips the things that *do* run
 * from innerHTML — inline event handlers and `javascript:` URLs — plus <script>
 * / <iframe> / <object> for good measure. It is intentionally a regex pass, not
 * a full HTML parser: defense-in-depth for a self-only surface, not a trust
 * boundary against hostile third-party input.
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== "string") return "";
  return (
    input
      // drop whole dangerous elements (with or without a closing tag)
      .replace(/<\s*(script|iframe|object|embed)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
      .replace(/<\s*(script|iframe|object|embed)\b[^>]*>/gi, "")
      // inline event handlers: on…="…" / on…='…' / on…=value
      .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
      .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
      .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
      // javascript: in href/src
      .replace(/((?:href|src)\s*=\s*")\s*javascript:[^"]*"/gi, '$1#"')
      .replace(/((?:href|src)\s*=\s*')\s*javascript:[^']*'/gi, "$1#'")
  );
}
