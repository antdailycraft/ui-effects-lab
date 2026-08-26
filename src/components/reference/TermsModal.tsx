import { useMemo, useState } from "react";
import { Modal } from "../common/Modal";
import { TERMS, TERM_CATEGORIES, type TermCategory } from "../../data/terms";
import { ComponentPreview } from "./ComponentPreview";
import { useLocale } from "../../i18n/LocaleContext";

export function TermsModal({ onClose }: { onClose: () => void }) {
  const { locale, t } = useLocale();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<TermCategory | "All">("All");

  const term = q.trim().toLowerCase();
  const list = useMemo(
    () =>
      TERMS.filter(
        (t) =>
          (cat === "All" || t.category === cat) &&
          (!term || `${t.term} ${t.def} ${t.example ?? ""}`.toLowerCase().includes(term))
      ),
    [term, cat]
  );

  return (
    <Modal label={locale === "ko" ? "UI/UX 용어" : "UI/UX terms"} className="ref-modal" onClose={onClose}>
      <div className="ref-head">
        <div>
          <h2 className="ref-title">{locale === "ko" ? "UI/UX 용어" : "UI/UX terms"}</h2>
          <p className="ref-sub">{locale === "ko" ? "인터페이스 용어, 컴포넌트 이름, UX 법칙을 정리했습니다." : "A glossary of interface vocabulary, component names & UX laws."}</p>
        </div>
        <button className="ref-close" aria-label={t("close", "Close")} onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="terms-controls">
        <input
          className="terms-search"
          type="text"
          placeholder={locale === "ko" ? "용어 검색…" : "Search terms…"}
          aria-label={locale === "ko" ? "용어 검색" : "Search terms"}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="terms-cats">
          {(["All", ...TERM_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              className={"terms-cat" + (cat === c ? " on" : "")}
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {locale === "ko" && c === "All" ? "전체" : c}
            </button>
          ))}
        </div>
      </div>

      <div className="terms-list">
        {list.length === 0 ? (
          <div className="terms-empty">{locale === "ko" ? `‘${q}’에 맞는 용어가 없습니다.` : `No terms match “${q}”.`}</div>
        ) : (
          list.map((t) => (
            <div className="term-card" key={t.term}>
              <div className="term-head">
                <span className="term-name">{t.term}</span>
                <span className="term-badge">{t.category}</span>
              </div>
              <p className="term-def">{t.def}</p>
              {t.example && <p className="term-eg">{t.example}</p>}
              <ComponentPreview term={t.term} />
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
