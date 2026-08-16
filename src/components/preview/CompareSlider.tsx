import { useRef, useState, type ReactNode } from "react";

/**
 * A draggable before/after reveal. The "after" (effect) layer fills the frame;
 * the "before" (original) layer sits on top, clipped to the left of the handle.
 * Drag the divider — or focus it and use ← / → — to change the split.
 */
export function CompareSlider({ before, after }: { before: ReactNode; after: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const setFromClientX = (clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={frame}
      className="compare-slider"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      }}
    >
      <div className="cs-layer">{after}</div>
      <div className="cs-layer cs-clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>
      <span className="compare-cap cs-cap-l">Before</span>
      <span className="compare-cap after cs-cap-r">After</span>
      <div
        className="cs-divider"
        style={{ left: `${pos}%` }}
        role="slider"
        aria-label="Comparison split"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(pos)}% original`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
          else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
          else if (e.key === "PageDown") setPos((p) => Math.max(0, p - 10));
          else if (e.key === "PageUp") setPos((p) => Math.min(100, p + 10));
          else if (e.key === "Home") setPos(0);
          else if (e.key === "End") setPos(100);
        }}
      >
        <span className="cs-handle" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M9 7L5 12l4 5M15 7l4 5-4 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
