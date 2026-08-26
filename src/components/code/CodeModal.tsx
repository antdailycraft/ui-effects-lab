import { useEffect, useRef } from "react";
import type { CodeLang } from "../../lib/codegen";
import { CopyButton } from "./CopyButton";
import { useLocale } from "../../i18n/LocaleContext";

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
  const { t } = useLocale();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remember what was focused so we can restore it on close.
    const opener = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Trap Tab within the dialog.
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
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
      <div className="code-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="code-modal-head">
          <span className="code-modal-title">{lang.toUpperCase()} — {t("fullCode", "full code")}</span>
          <div className="code-modal-actions">
            <CopyButton code={code} />
            <button className="code-modal-close" aria-label={t("close", "Close")} onClick={onClose}>
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
