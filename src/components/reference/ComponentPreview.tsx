import type { JSX } from "react";

/**
 * Tiny live previews for the Components-category glossary terms — real markup,
 * theme-aware, no image assets. Returns null for terms without a preview.
 */
const PREVIEWS: Record<string, JSX.Element> = {
  Toast: <div className="cp-toast">✓ Copied to clipboard</div>,
  Snackbar: (
    <div className="cp-snackbar">
      <span>Item deleted</span>
      <button>Undo</button>
    </div>
  ),
  Skeleton: (
    <div className="cp-skeleton">
      <span className="sk sk-line" />
      <span className="sk sk-line short" />
      <span className="sk sk-line" />
    </div>
  ),
  Tooltip: (
    <div className="cp-tooltip">
      <span className="cp-tip">Save changes</span>
      <span className="cp-tip-btn">💾</span>
    </div>
  ),
  Popover: (
    <div className="cp-popover">
      <span className="cp-anchor">Filters ▾</span>
      <div className="cp-pop">
        <span>Newest</span>
        <span>Price</span>
        <span>Rating</span>
      </div>
    </div>
  ),
  "Modal / Dialog": (
    <div className="cp-modal">
      <div className="cp-dlg">
        <b>Delete file?</b>
        <p>This can't be undone.</p>
        <div className="cp-dlg-row">
          <button>Cancel</button>
          <button className="danger">Delete</button>
        </div>
      </div>
    </div>
  ),
  "Drawer / Sheet": (
    <div className="cp-drawer">
      <div className="cp-drawer-panel">
        <span className="sk sk-line short" />
        <span className="sk sk-line" />
        <span className="sk sk-line" />
      </div>
    </div>
  ),
  Accordion: (
    <div className="cp-accordion">
      <div className="cp-ac-row">
        <span>Shipping</span>
        <span className="cp-chev open">›</span>
      </div>
      <div className="cp-ac-body">Ships in 2–3 business days.</div>
      <div className="cp-ac-row">
        <span>Returns</span>
        <span className="cp-chev">›</span>
      </div>
    </div>
  ),
  "Segmented control": (
    <div className="cp-seg">
      <button className="on">Day</button>
      <button>Week</button>
      <button>Month</button>
    </div>
  ),
  "Toggle / Switch": (
    <div className="cp-switch-row">
      <span className="cp-switch on" role="img" aria-label="Switch, on">
        <i />
      </span>
      <span className="cp-switch" role="img" aria-label="Switch, off">
        <i />
      </span>
    </div>
  ),
  "Command palette": (
    <div className="cp-cmd">
      <div className="cp-cmd-input">
        <span>Search commands…</span>
        <kbd>⌘K</kbd>
      </div>
      <div className="cp-cmd-row on">New file</div>
      <div className="cp-cmd-row">Open recent…</div>
    </div>
  ),
  "Chip / Tag / Badge": (
    <div className="cp-chips">
      <span className="cp-chip">React ✕</span>
      <span className="cp-chip">CSS ✕</span>
      <span className="cp-badge-wrap">
        Inbox<span className="cp-badge">3</span>
      </span>
    </div>
  ),
  Breadcrumb: (
    <div className="cp-crumb">
      <span>Home</span>
      <span className="sep">/</span>
      <span>Docs</span>
      <span className="sep">/</span>
      <b>API</b>
    </div>
  ),
  Stepper: (
    <div className="cp-stepper">
      <span className="cp-step done">1</span>
      <span className="cp-step-bar done" />
      <span className="cp-step done">2</span>
      <span className="cp-step-bar" />
      <span className="cp-step">3</span>
    </div>
  ),
  "Avatar Chip": (
    <div className="cp-avatar-chip">
      <span className="cp-avatar">JD</span>
      <span>Jane Doe</span>
      <span className="cp-x">✕</span>
    </div>
  ),
  "Avatar Stack": (
    <div className="cp-avatar-stack">
      <span className="cp-avatar">A</span>
      <span className="cp-avatar">B</span>
      <span className="cp-avatar">C</span>
      <span className="cp-avatar cp-avatar-more">+5</span>
    </div>
  ),
  "CTA (Call to action)": (
    <div className="cp-cta">
      <button className="primary">Get started →</button>
      <button className="ghost">Later</button>
    </div>
  ),
  Pagination: (
    <div className="cp-pagination">
      <button className="pg-arrow">‹</button>
      <span className="pg on">1</span>
      <span className="pg">2</span>
      <span className="pg">3</span>
      <button className="pg-arrow">›</button>
    </div>
  ),
  "Pagination dots": (
    <div className="cp-dots">
      <i className="on" />
      <i />
      <i />
      <i />
    </div>
  ),
};

export function ComponentPreview({ term }: { term: string }): JSX.Element | null {
  const preview = PREVIEWS[term];
  if (!preview) return null;
  return <div className="cp-frame">{preview}</div>;
}
