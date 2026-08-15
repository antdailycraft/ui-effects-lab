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

// Single-pass CSS tokenizer. Order in the alternation matters: comments and
// strings first, then hex colors, at-rules, selectors, pseudos, properties
// (identifier before a single ':'), functions (identifier before '('), numbers
// with units, and finally punctuation. Bare value keywords stay uncolored.
export function highlightCss(code: string): string {
  const src = esc(code);
  const re =
    /(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*")|(#[0-9a-fA-F]{3,8})|(@[\w-]+)|(\.[A-Za-z_][\w-]*)|(:{1,2}[A-Za-z-]+)|([A-Za-z-][\w-]*)(?=\s*:(?!:))|([A-Za-z-][\w-]*)(?=\()|(-?(?:\d+\.?\d*|\.\d+)(?:px|%|deg|s|ms|em|rem|fr|vw|vh|ch)?)|([{}();:,])/g;
  return src.replace(re, (_m, comment, str, hex, at, cls, pseudo, prop, fn, num, punct) => {
    if (comment) return `<span class="tk-comment">${comment}</span>`;
    if (str) return `<span class="tk-str">${str}</span>`;
    if (hex) return `<span class="tk-num">${hex}</span>`;
    if (at) return `<span class="tk-tag">${at}</span>`;
    if (cls) return `<span class="tk-tag">${cls}</span>`;
    if (pseudo) return `<span class="tk-tag">${pseudo}</span>`;
    if (prop) return `<span class="tk-attr">${prop}</span>`;
    if (fn) return `<span class="tk-tag">${fn}</span>`;
    if (num) return `<span class="tk-num">${num}</span>`;
    return `<span class="tk-punct">${punct}</span>`;
  });
}

export { esc as escapeHtml };
