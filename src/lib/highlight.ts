function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Single-pass tokenizer: scans the escaped source left-to-right so inserted
// markup is never re-matched (avoids highlighter self-matching).
export function highlightSvg(code: string): string {
  const src = esc(code);
  const re = /(&lt;\/?)([a-zA-Z][\w-]*)|([a-zA-Z][\w-]*)=|("[^"]*")|(\/?&gt;)/g;
  return src.replace(re, (_m, open, tag, attr, str, close) => {
    if (tag) return `<span class="tk-punct">${open}</span><span class="tk-tag">${tag}</span>`;
    if (attr) return `<span class="tk-attr">${attr}</span><span class="tk-punct">=</span>`;
    if (str) return `<span class="tk-str">${str}</span>`;
    return `<span class="tk-punct">${close}</span>`;
  });
}

export { esc as escapeHtml };
