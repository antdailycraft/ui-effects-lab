import { Suspense, useMemo } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { EFFECTS, getEffect, defaultParams } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { rotateHueHex } from "../../lib/color";

const lfId = (id: string) => `lf-${id}`;

export function Landing({ onEnter }: { onEnter: () => void }) {
  const { dispatch } = usePlayground();
  const reduced = useReducedMotion();

  const filters = EFFECTS.filter((e) => e.category === "svg-filter" && e.buildFilterInner);
  const hero = getEffect("mesh-gradient");
  const HeroComp = hero?.component;
  // Only mount the WebGL hero where a context is actually available (skips
  // jsdom/no-WebGL, falling back to a static gradient).
  const webglOk = useMemo(() => {
    try {
      return !!document.createElement("canvas").getContext("webgl");
    } catch {
      return false;
    }
  }, []);

  // The mesh-gradient shader has no numeric seed, so we "seed" the hero once per
  // mount: randomize its shape params within their safe ranges and rotate the
  // base palette's hue, so the landing opens on a different gradient each visit.
  const heroProps = useMemo(() => {
    if (!hero?.buildProps) return {};
    const params = { ...defaultParams(hero) };
    for (const id of ["distortion", "swirl", "scale"] as const) {
      const c = hero.controls.find((x) => x.id === id);
      if (!c) continue;
      const [lo, hi] = c.random ?? [c.min ?? 0, c.max ?? 1];
      params[id] = Number((lo + Math.random() * (hi - lo)).toFixed(c.decimals ?? 2));
    }
    const props = hero.buildProps(params, !reduced) as Record<string, unknown>;
    const hue = Math.floor(Math.random() * 360);
    if (Array.isArray(props.colors)) {
      props.colors = props.colors.map((c) => (typeof c === "string" ? rotateHueHex(c, hue) : c));
    }
    return props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hero, reduced]);

  const openEffect = (id: string) => {
    dispatch({ type: "SELECT_EFFECT", id });
    onEnter();
  };

  // Duplicate the row so the marquee can loop seamlessly.
  const marquee = [...filters, ...filters];

  return (
    <div className="lp">
      {/* hidden filter defs for the marquee tiles */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          {filters.map((e) => (
            <filter
              key={e.id}
              id={lfId(e.id)}
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
              dangerouslySetInnerHTML={{ __html: e.buildFilterInner!(defaultParams(e), false) }}
            />
          ))}
        </defs>
      </svg>

      {/* ---------- hero ---------- */}
      <section className="lp-hero">
        <div className="lp-hero-bg" aria-hidden="true">
          {HeroComp && webglOk ? (
            <ErrorBoundary fallback={<div className="lp-hero-fallback" />}>
              <Suspense fallback={<div className="lp-hero-fallback" />}>
                <HeroComp {...heroProps} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <div className="lp-hero-fallback" />
          )}
        </div>
        <div className="lp-hero-scrim" aria-hidden="true" />

        <header className="lp-top">
          <span className="lp-mark">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 16c2-6 4-9 8-9s6 3 8 9" />
              <path d="M4 8c2 3 4 4 8 4s6-1 8-4" />
            </svg>
          </span>
          <span className="lp-brand">UI Effects Lab</span>
        </header>

        <div className="lp-hero-inner">
          <p className="lp-eyebrow">SVG · CSS · WebGL — {EFFECTS.length} live effects</p>
          <h1 className="lp-title">
            Explore. Tweak.
            <br />
            <em>Compare. Copy.</em>
          </h1>
          <p className="lp-sub">
            An interactive playground for visual effects. Find an effect, tune it live on a real UI,
            compare before/after, and copy production SVG / CSS / React.
          </p>
          <div className="lp-cta">
            <button className="lp-btn primary" onClick={onEnter}>
              Open the Lab →
            </button>
            <a
              className="lp-btn ghost"
              href="https://github.com/antdailycraft/ui-effects-lab"
              target="_blank"
              rel="noopener noreferrer"
            >
              View source
            </a>
          </div>
        </div>
      </section>

      {/* ---------- live effect marquee ---------- */}
      <section className="lp-marquee" aria-label="Effect gallery">
        <div className={"lp-track" + (reduced ? " still" : "")}>
          {marquee.map((e, i) => (
            <button
              key={e.id + "-" + i}
              className="lp-chip"
              onClick={() => openEffect(e.id)}
              title={`Open ${e.name}`}
              aria-label={`Open ${e.name}`}
              tabIndex={i < filters.length ? 0 : -1}
            >
              <span className="lp-chip-art" style={{ filter: `url(#${lfId(e.id)})` }}>
                Aa
              </span>
              <span className="lp-chip-name">{e.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ---------- the loop ---------- */}
      <section className="lp-loop">
        {[
          { n: "01", t: "Explore", d: "Browse 50 effects across SVG filters, CSS, retro & WebGL." },
          { n: "02", t: "Tweak", d: "Adjust parameters live — randomize, or load a built-in preset." },
          { n: "03", t: "Compare", d: "Before/after split or a drag slider on a real component." },
          { n: "04", t: "Copy", d: "Grab the generated SVG, CSS, or React — or share a link." },
        ].map((s) => (
          <div className="lp-step" key={s.n}>
            <span className="lp-step-n">{s.n}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </section>

      <section className="lp-foot">
        <button className="lp-btn primary" onClick={onEnter}>
          Open the Lab →
        </button>
      </section>
    </div>
  );
}
