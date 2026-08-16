import { useEffect, useRef, useState } from "react";
import { CursorsModal } from "./CursorsModal";

type Tool = "cursors" | null;

const ITEMS: { id: Exclude<Tool, null>; label: string; desc: string }[] = [
  { id: "cursors", label: "CSS Cursors", desc: "Preview & copy every cursor style." },
];

export function ReferenceMenu() {
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState<Tool>(null);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="resources" ref={ref}>
      <button
        ref={triggerRef}
        className="topbar-link"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg className="i i-sm" viewBox="0 0 24 24">
          <path d="M4 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z" />
          <path d="M20 3v14a2 2 0 0 0-2 2" />
        </svg>
        <span className="label">Reference</span>
      </button>

      {open && (
        <div className="resources-menu" role="menu">
          <div className="resources-group">
            <div className="resources-label">Reference</div>
            {ITEMS.map((it) => (
              <button
                key={it.id}
                className="resource-item"
                role="menuitem"
                onClick={() => {
                  setTool(it.id);
                  setOpen(false);
                }}
              >
                <div className="resource-name">{it.label}</div>
                <div className="resource-desc">{it.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {tool === "cursors" && <CursorsModal onClose={() => setTool(null)} />}
    </div>
  );
}
