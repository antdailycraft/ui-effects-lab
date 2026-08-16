import { useState } from "react";
import { Modal } from "../common/Modal";
import { CURSORS } from "../../data/cursors";
import { CursorGlyph } from "./CursorGlyph";

export function CursorsModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(`cursor: ${value};`);
      setCopied(value);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <Modal label="CSS cursors" className="ref-modal" onClose={onClose}>
      <div className="ref-head">
        <div>
          <h2 className="ref-title">CSS cursors</h2>
          <p className="ref-sub">Hover a tile to preview the cursor; click to copy the declaration.</p>
        </div>
        <button className="ref-close" aria-label="Close" onClick={onClose}>
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
              <span className="cursor-value mono">{copied === c.value ? "copied!" : c.value}</span>
              <span className="cursor-note">{c.note}</span>
            </span>
          </button>
        ))}
      </div>
    </Modal>
  );
}
