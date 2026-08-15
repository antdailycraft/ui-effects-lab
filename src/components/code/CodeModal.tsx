import { useEffect } from "react";
import type { CodeLang } from "../../lib/codegen";
import { CopyButton } from "./CopyButton";

export function CodeModal({
  lang,
  code,
  html,
  onClose,
}: {
  lang: CodeLang;
  code: string;
  html: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="code-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${lang.toUpperCase()} code`}
      onClick={onClose}
    >
      <div className="code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="code-modal-head">
          <span className="code-modal-title">{lang.toUpperCase()} — full code</span>
          <div className="code-modal-actions">
            <CopyButton code={code} />
            <button className="code-modal-close" aria-label="Close" onClick={onClose}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
        <pre className="code-modal-pre mono" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
