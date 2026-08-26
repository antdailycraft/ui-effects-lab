import { useState } from "react";
import { Modal } from "../common/Modal";
import { CURSORS } from "../../data/cursors";
import { CursorGlyph } from "./CursorGlyph";
import { copyText } from "../../lib/clipboard";
import { useLocale } from "../../i18n/LocaleContext";

export function CursorsModal({ onClose }: { onClose: () => void }) {
  const { locale, t } = useLocale();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    if (!(await copyText(`cursor: ${value};`))) return;
    setCopied(value);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <Modal label={locale === "ko" ? "CSS 커서" : "CSS cursors"} className="ref-modal" onClose={onClose}>
      <div className="ref-head">
        <div>
          <h2 className="ref-title">{locale === "ko" ? "CSS 커서" : "CSS cursors"}</h2>
          <p className="ref-sub">{locale === "ko" ? "타일에 마우스를 올려 커서를 미리 보고, 클릭해 선언을 복사하세요." : "Hover a tile to preview the cursor; click to copy the declaration."}</p>
        </div>
        <button className="ref-close" aria-label={t("close", "Close")} onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div className="cursor-grid">
        {CURSORS.map((c) => (
          <button
            key={c.value}
            className="cursor-tile"
            style={{ cursor: c.value }}
            title={`cursor: ${c.value};`}
            onClick={() => copy(c.value)}
          >
            <CursorGlyph value={c.value} />
            <span className="cursor-text">
              <span className="cursor-value mono">{copied === c.value ? (locale === "ko" ? "복사됨!" : "copied!") : c.value}</span>
              <span className="cursor-note">{c.note}</span>
            </span>
          </button>
        ))}
      </div>
    </Modal>
  );
}
