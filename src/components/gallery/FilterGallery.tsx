import { Modal } from "../common/Modal";
import { usePlayground } from "../../state/PlaygroundContext";
import { EFFECTS, defaultParams } from "../../registry/effects";

const galFilterId = (id: string) => `gal-${id}`;

export function FilterGallery({ onClose }: { onClose: () => void }) {
  const { dispatch } = usePlayground();
  // The SVG Filters category, each rendered at its default parameters.
  const filters = EFFECTS.filter((e) => e.category === "svg-filter" && e.buildFilterInner);

  const open = (id: string) => {
    dispatch({ type: "SELECT_EFFECT", id });
    onClose();
  };

  return (
    <Modal label="SVG filter gallery" className="gal-modal" onClose={onClose}>
      <div className="ref-head">
        <div>
          <h2 className="ref-title">SVG Filters</h2>
          <p className="ref-sub">{filters.length} filters at their defaults — click one to open it.</p>
        </div>
        <button className="ref-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* One <filter> per effect, at default params (static — no animation). */}
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

      <div className="gal-grid">
        {filters.map((e) => (
          <button className="gal-tile" key={e.id} onClick={() => open(e.id)} title={e.sub}>
            <div className="gal-stage">
              <div className="gal-art" style={{ filter: `url(#${galFilterId(e.id)})` }}>
                <span className="gal-word">Aa</span>
              </div>
            </div>
            <div className="gal-name">{e.name}</div>
          </button>
        ))}
      </div>
    </Modal>
  );
}
