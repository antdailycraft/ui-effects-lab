import { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "../common/Modal";
import { EMOJI, EMOJI_GROUPS } from "../../data/emoji.generated";

const CELL = 46; // px, square emoji cell
const VIEWPORT = 380; // grid scroll-viewport height

interface Picked {
  c: string;
  n: string;
}

export function EmojiModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState(-1); // -1 = all groups
  const [selected, setSelected] = useState<Picked | null>(null);
  const [copied, setCopied] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [cols, setCols] = useState(10);
  const gridRef = useRef<HTMLDivElement>(null);

  const term = q.trim().toLowerCase();
  const items = useMemo(
    () => EMOJI.filter((e) => (group < 0 || e.g === group) && (!term || e.n.includes(term))),
    [term, group]
  );

  // Track the column count from the grid's width.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const measure = () => setCols(Math.max(1, Math.floor(el.clientWidth / CELL)));
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reset scroll when the filter changes.
  useEffect(() => {
    if (gridRef.current) gridRef.current.scrollTop = 0;
    setScrollTop(0);
  }, [term, group]);

  // Windowed rendering: only the rows near the viewport are in the DOM.
  const rows = Math.ceil(items.length / cols);
  const startRow = Math.max(0, Math.floor(scrollTop / CELL) - 2);
  const endRow = Math.min(rows, Math.ceil((scrollTop + VIEWPORT) / CELL) + 2);
  const visible = items.slice(startRow * cols, Math.min(items.length, endRow * cols));

  // Clicking a cell selects it; the explicit Copy button below does the copy.
  const pick = (e: Picked) => {
    setSelected(e);
    setCopied(false);
  };

  const copy = async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected.c);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <Modal label="Emoji" className="ref-modal emoji-modal" onClose={onClose}>
      <div className="ref-head">
        <div>
          <h2 className="ref-title">Emoji</h2>
          <p className="ref-sub">{EMOJI.length.toLocaleString()} symbols · pick one, then copy.</p>
        </div>
        <button className="ref-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="terms-controls">
        <input
          className="terms-search"
          type="text"
          placeholder="Search emoji…"
          aria-label="Search emoji"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="terms-cats">
          <button
            className={"terms-cat" + (group === -1 ? " on" : "")}
            aria-pressed={group === -1}
            onClick={() => setGroup(-1)}
          >
            All
          </button>
          {EMOJI_GROUPS.map((g, i) => (
            <button
              key={g}
              className={"terms-cat" + (group === i ? " on" : "")}
              aria-pressed={group === i}
              onClick={() => setGroup(i)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div
        className="emoji-grid"
        ref={gridRef}
        style={{ height: VIEWPORT }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        {items.length === 0 ? (
          <div className="terms-empty">No emoji match “{q}”.</div>
        ) : (
          <div style={{ height: rows * CELL, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: startRow * CELL,
                left: 0,
                right: 0,
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
              }}
            >
              {visible.map((e) => (
                <button
                  key={e.c + e.n}
                  className={"emoji-cell" + (selected?.c === e.c ? " sel" : "")}
                  style={{ height: CELL }}
                  title={e.n}
                  aria-label={e.n}
                  aria-pressed={selected?.c === e.c}
                  onClick={() => pick({ c: e.c, n: e.n })}
                  onDoubleClick={copy}
                >
                  {e.c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="emoji-foot">
        {selected ? (
          <div className="emoji-pick">
            <span className="emoji-pick-glyph" aria-hidden="true">
              {selected.c}
            </span>
            <span className="emoji-pick-name">{selected.n}</span>
          </div>
        ) : (
          <span className="emoji-hint">{items.length.toLocaleString()} emoji · select one to copy</span>
        )}
        <button
          className="emoji-copy"
          onClick={copy}
          disabled={!selected}
          aria-label={selected ? `Copy ${selected.n}` : "Copy"}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </Modal>
  );
}
