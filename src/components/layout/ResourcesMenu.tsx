import { useEffect, useRef, useState } from "react";
import { RESOURCE_GROUPS } from "../../data/resources";

export function ResourcesMenu() {
  const [open, setOpen] = useState(false);
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
          <path d="M12 2 2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span className="label">Resources</span>
      </button>

      {open && (
        <div className="resources-menu" role="menu">
          {RESOURCE_GROUPS.map((g) => (
            <div className="resources-group" key={g.label}>
              <div className="resources-label">{g.label}</div>
              {g.items.map((it) => (
                <a
                  className="resource-item"
                  role="menuitem"
                  key={it.url}
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="resource-name">
                    {it.name}
                    <svg className="i i-sm ext" viewBox="0 0 24 24">
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </div>
                  <div className="resource-desc">{it.desc}</div>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
