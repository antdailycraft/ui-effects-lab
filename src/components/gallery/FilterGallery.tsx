import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Modal } from "../common/Modal";
import { usePlayground } from "../../state/PlaygroundContext";
import { EFFECTS, defaultParams } from "../../registry/effects";
import type { EffectDefinition } from "../../types/effects";
import { useInView } from "../../hooks/useInView";
import { DEFAULT_IMAGE } from "../../lib/sampleImage";

const galFilterId = (id: string) => `gal-${id}`;
// Hard cap on concurrent live WebGL generator tiles (browsers allow ~16 contexts).
const MAX_LIVE = 10;

/**
 * A generator tile that mounts its WebGL component only while on screen AND
 * while a live-context slot is available (acquire/release). Off-screen or
 * over-budget tiles show a shimmer placeholder.
 */
function GeneratorTile({
  effect,
  root,
  version,
  acquire,
  release,
  onOpen,
}: {
  effect: EffectDefinition;
  root: RefObject<Element | null>;
  version: number;
  acquire: (id: string) => boolean;
  release: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, root);
  const held = useRef(false);
  const [live, setLive] = useState(false);
  const Comp = effect.component;

  useEffect(() => {
    if (inView && !held.current) {
      if (acquire(effect.id)) {
        held.current = true;
        setLive(true);
      }
    } else if (!inView && held.current) {
      release(effect.id);
      held.current = false;
      setLive(false);
    }
    // `version` re-runs this when a slot frees up, so a waiting tile can claim it.
  }, [inView, version, effect.id, acquire, release]);

  useEffect(
    () => () => {
      if (held.current) release(effect.id);
    },
    [effect.id, release]
  );

  return (
    <button className="gal-tile" ref={ref} onClick={() => onOpen(effect.id)} title={effect.sub}>
      <div className="gal-stage gal-stage-gen">
        {live && Comp ? (
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const filters = EFFECTS.filter((e) => e.category === "svg-filter" && e.buildFilterInner);
  const generators = EFFECTS.filter((e) => e.kind === "generator" && e.component);

  // Live-context budget shared across generator tiles.
  const liveRef = useRef<Set<string>>(new Set());
  const [version, setVersion] = useState(0);
  const acquire = useCallback((id: string) => {
    const s = liveRef.current;
    if (s.has(id)) return true;
    if (s.size >= MAX_LIVE) return false;
    s.add(id);
    setVersion((v) => v + 1);
    return true;
  }, []);
  const release = useCallback((id: string) => {
    if (liveRef.current.delete(id)) setVersion((v) => v + 1);
  }, []);

  const open = (id: string) => {
    dispatch({ type: "SELECT_EFFECT", id });
    onClose();
  };

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

      <div className="gal-scroll" ref={scrollRef}>
        <div className="gal-section">SVG Filters</div>
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

        <div className="gal-section">Generators</div>
        <div className="gal-grid">
          {generators.map((e) => (
            <GeneratorTile
              key={e.id}
              effect={e}
              root={scrollRef}
              version={version}
              acquire={acquire}
              release={release}
              onOpen={open}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
