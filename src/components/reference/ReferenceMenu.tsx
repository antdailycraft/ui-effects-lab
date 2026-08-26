import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { CursorsModal } from "./CursorsModal";
import { TermsModal } from "./TermsModal";
import { useLocale } from "../../i18n/LocaleContext";

// The emoji dataset is large (~240 KB), so load the picker + data on demand.
const EmojiModal = lazy(() => import("./EmojiModal").then((m) => ({ default: m.EmojiModal })));

type Tool = "cursors" | "terms" | "emoji" | null;

const ITEMS: { id: Exclude<Tool, null>; label: string; desc: string }[] = [
  { id: "terms", label: "UI/UX Terms", desc: "Glossary of interface vocabulary & UX laws." },
  { id: "cursors", label: "CSS Cursors", desc: "Preview & copy every cursor style." },
  { id: "emoji", label: "Emoji", desc: "Search 3,900+ emoji, click to copy." },
];

// Standalone WebGL demos bundled under public/showcase/, opened in a new tab.
const SHOWCASE: { file: string; name: string; desc: string }[] = [
  {
    file: "design-directions.html",
    name: "여덟 가지 디자인 방향",
    desc: "서로 다른 여덟 가지 시각 언어를 비교하는 디자인 표본 카탈로그.",
  },
  {
    file: "dissolve.html",
    name: "Dissolve — Three.js",
    desc: "A note dissolving into 46k GPU particles (WebGL).",
  },
  {
    file: "hero.html",
    name: "Cursor-Reveal Hero — WebGL",
    desc: "A paper hero that dissolves along the cursor to reveal beneath.",
  },
];

export function ReferenceMenu() {
  const { locale, t } = useLocale();
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
        <span className="label">{t("reference", "Reference")}</span>
      </button>

      {open && (
        <div className="resources-menu" role="menu">
          <div className="resources-group">
            <div className="resources-label">{t("reference", "Reference")}</div>
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
                <div className="resource-name">{locale === "ko" ? ({ "UI/UX Terms": "UI/UX 용어", "CSS Cursors": "CSS 커서", Emoji: "이모지" } as Record<string, string>)[it.label] : it.label}</div>
                <div className="resource-desc">{locale === "ko" ? ({ terms: "인터페이스 용어와 UX 법칙을 정리한 용어집입니다.", cursors: "모든 커서 스타일을 미리 보고 복사합니다.", emoji: "이모지 3,900여 개를 검색하고 복사합니다." } as Record<string, string>)[it.id] : it.desc}</div>
              </button>
            ))}
          </div>
          <div className="resources-group">
            <div className="resources-label">{locale === "ko" ? "쇼케이스" : "Showcase"}</div>
            {SHOWCASE.map((s) => (
              <a
                key={s.file}
                className="resource-item"
                role="menuitem"
                href={`${import.meta.env.BASE_URL}showcase/${s.file}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <div className="resource-name">
                  {s.name}
                  <svg className="i i-sm ext" viewBox="0 0 24 24">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </div>
                <div className="resource-desc">{s.desc}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {tool === "cursors" && <CursorsModal onClose={() => setTool(null)} />}
      {tool === "terms" && <TermsModal onClose={() => setTool(null)} />}
      {tool === "emoji" && (
        <Suspense fallback={null}>
          <EmojiModal onClose={() => setTool(null)} />
        </Suspense>
      )}
    </div>
  );
}
