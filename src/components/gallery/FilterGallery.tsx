import { Suspense, useState } from "react";
import { Modal } from "../common/Modal";
import { usePlayground } from "../../state/PlaygroundContext";
import { EFFECTS, defaultParams } from "../../registry/effects";
import type { EffectDefinition } from "../../types/effects";
import { DEFAULT_IMAGE } from "../../lib/sampleImage";

const galFilterId = (id: string) => `gal-${id}`;
const PAGE = 10; // items per page (also caps live WebGL generators per page)

/** A live WebGL generator tile — only mounted while its page is showing. */
function GeneratorTile({ effect, onOpen }: { effect: EffectDefinition; onOpen: (id: string) => void }) {
  const Comp = effect.component;
  return (
    <button className="gal-tile" onClick={() => onOpen(effect.id)} title={effect.sub}>
      <div className="gal-stage gal-stage-gen">
        {Comp ? (
          <Suspense fallback={<div className="gal-loading" />}>
            <Comp
              {...(effect.buildProps ? effect.buildProps(defaultParams(effect), false) : {})}
              {...(effect.usesImage ? { image: DEFAULT_IMAGE } : {})}
            />
          </Suspense>
        ) : (
          <div className="gal-loading" />
        )}
      </div>
      <div className="gal-name">{effect.name}</div>
    </button>
  );
}

export function FilterGallery({ onClose }: { onClose: () => void }) {
  const { dispatch } = usePlayground();
  const [page, setPage] = useState(0);

  const filters = EFFECTS.filter((e) => e.category === "svg-filter" && e.buildFilterInner);
  const generators = EFFECTS.filter((e) => e.kind === "generator" && e.component);
  const items = [...filters, ...generators];
  const pageCount = Math.ceil(items.length / PAGE);
  const current = items.slice(page * PAGE, page * PAGE + PAGE);
  // Pages split cleanly (20 filters, 30 generators, page 10), so a page is homogeneous.
  const section = current[0]?.category === "svg-filter" ? "SVG Filters" : "Generators";

  const open = (id: string) => {
    dispatch({ type: "SELECT_EFFECT", id });
    onClose();
  };
  const go = (p: number) => setPage(Math.max(0, Math.min(pageCount - 1, p)));

  return (
    <Modal label="Effect gallery" className="gal-modal" onClose={onClose}>
      <div className="ref-head">
        <div>
          <h2 className="ref-title">Gallery</h2>
          <p className="ref-sub">
            {filters.length} SVG filters &amp; {generators.length} generators at their defaults —
            click one to open it.
          </p>
        </div>
        <button className="ref-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* One <filter> per SVG effect, at default params (static). */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          {filters.map((e) => (
            <filter
              key={e.id}
              id={galFilterId(e.id)}
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
              dangerouslySetInnerHTML={{ __html: e.buildFilterInner!(defaultParams(e), false) }}
            />
          ))}
        </defs>
      </svg>

      <div className="gal-body">
        <div className="gal-section">{section}</div>
        <div className="gal-grid">
          {current.map((e) =>
            e.category === "svg-filter" ? (
              <button className="gal-tile" key={e.id} onClick={() => open(e.id)} title={e.sub}>
                <div className="gal-stage">
                  <div className="gal-art" style={{ filter: `url(#${galFilterId(e.id)})` }}>
                    <span className="gal-word">Aa</span>
                  </div>
                </div>
                <div className="gal-name">{e.name}</div>
              </button>
            ) : (
              <GeneratorTile key={e.id} effect={e} onOpen={open} />
            )
          )}
        </div>
      </div>

      <div className="gal-pager">
        <button
          className="gal-pager-arrow"
          aria-label="Previous page"
          disabled={page === 0}
          onClick={() => go(page - 1)}
        >
          ‹
        </button>
        <div className="gal-dots" role="tablist" aria-label="Gallery pages">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              className={"gal-dot" + (i === page ? " on" : "")}
              role="tab"
              aria-selected={i === page}
              aria-label={`Page ${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          className="gal-pager-arrow"
          aria-label="Next page"
          disabled={page === pageCount - 1}
          onClick={() => go(page + 1)}
        >
          ›
        </button>
      </div>
    </Modal>
  );
}
