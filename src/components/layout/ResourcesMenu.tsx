import { useEffect, useRef, useState } from "react";
import { RESOURCE_GROUPS } from "../../data/resources";
import { COVERS } from "../../data/covers.generated";
import { localizedGroupLabel, useLocale } from "../../i18n/LocaleContext";

const THUMB_W = 260;
const THUMB_H = 163;
const THUMB_GAP = 16;

export function ResourcesMenu() {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [thumbOk, setThumbOk] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
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

  const preview = (url: string | null) => {
    setHovered((prev) => {
      if (prev !== url) setThumbOk(false); // reset only when the site changes
      return url;
    });
  };
  const cover = hovered ? COVERS[hovered] : undefined;

  // Place the thumbnail next to the pointer (to its left; flips right near the
  // left edge), clamped to the viewport.
  const thumbStyle = pos
    ? (() => {
        const vh = typeof window !== "undefined" ? window.innerHeight : 800;
        let left = pos.x - THUMB_W - THUMB_GAP;
        if (left < 8) left = pos.x + THUMB_GAP;
        const top = Math.max(8, Math.min(pos.y - THUMB_H / 2, vh - THUMB_H - 8));
        return { top, left };
      })()
    : undefined;

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
        <span className="label">{t("resources", "Resources")}</span>
      </button>

      {open && (
        <>
          {cover && thumbStyle && (
            <div className="resource-thumb-pop" aria-hidden="true" style={thumbStyle}>
              {!thumbOk && <div className="resource-thumb-sk" />}
              <img
                key={cover}
                className={"resource-thumb" + (thumbOk ? " ok" : "")}
                src={cover}
                alt=""
                loading="lazy"
                onLoad={() => setThumbOk(true)}
                onError={() => setHovered(null)}
              />
            </div>
          )}
          <div
            className="resources-menu"
            role="menu"
            onMouseLeave={() => {
              preview(null);
              setPos(null);
            }}
          >
            {RESOURCE_GROUPS.map((g) => (
              <div className="resources-group" key={g.label}>
                <div className="resources-label">{localizedGroupLabel(g.label, locale)}</div>
                {g.items.map((it) => (
                  <a
                    className="resource-item"
                    role="menuitem"
                    key={it.url}
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => {
                      preview(it.url);
                      setPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
                    onFocus={(e) => {
                      preview(it.url);
                      const r = e.currentTarget.getBoundingClientRect();
                      setPos({ x: r.left, y: r.top + r.height / 2 });
                    }}
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
        </>
      )}
    </div>
  );
}
