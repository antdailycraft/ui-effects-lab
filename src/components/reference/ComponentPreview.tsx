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
  Grid: (
    <div className="cp-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  ),
  Stack: (
    <div className="cp-stack">
      <span />
      <span />
      <span />
    </div>
  ),
  Table: (
    <div className="cp-table">
      <div className="cp-tr cp-th">
        <span>Name</span>
        <span>Role</span>
        <span>Status</span>
      </div>
      <div className="cp-tr">
        <span>Jane</span>
        <span>Admin</span>
        <span>Active</span>
      </div>
      <div className="cp-tr">
        <span>Max</span>
        <span>Editor</span>
        <span>Away</span>
      </div>
    </div>
  ),
  "Dropdown menu": (
    <div className="cp-dropdown">
      <span className="cp-dd-trigger">
        Actions <span className="cp-caret">▾</span>
      </span>
      <div className="cp-dd-menu">
        <span>Rename</span>
        <span>Duplicate</span>
        <span className="danger">Delete</span>
      </div>
    </div>
  ),
  Select: (
    <div className="cp-select">
      <span className="cp-select-field">
        <span>Korea</span>
        <span className="cp-caret">▾</span>
      </span>
    </div>
  ),
  Combobox: (
    <div className="cp-combobox">
      <span className="cp-combo-input">
        <span className="cp-combo-typed">San</span>
        <span className="cp-caret">▾</span>
      </span>
      <div className="cp-combo-list">
        <span className="on">
          <b>San</b> Francisco
        </span>
        <span>
          <b>San</b> Diego
        </span>
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
  Checkbox: (
    <div className="cp-checks">
      <label className="cp-check on">
        <span className="cp-box">✓</span>Apples
      </label>
      <label className="cp-check ind">
        <span className="cp-box">–</span>Some selected
      </label>
      <label className="cp-check">
        <span className="cp-box" />Oranges
      </label>
    </div>
  ),
  "Radio button": (
    <div className="cp-radios">
      <label className="cp-radio on">
        <span className="cp-dot" />Standard
      </label>
      <label className="cp-radio">
        <span className="cp-dot" />Express
      </label>
    </div>
  ),
  "Toggle button": (
    <div className="cp-togglebtn">
      <button className="tbtn on" aria-pressed="true">
        <b>B</b> Bold
      </button>
      <button className="tbtn" aria-pressed="false">
        <i>I</i> Italic
      </button>
    </div>
  ),
  "Toggle button group": (
    <div className="cp-tgroup" role="group" aria-label="Text align">
      <button aria-pressed="false" aria-label="Align left">L</button>
      <button className="on" aria-pressed="true" aria-label="Align center">C</button>
      <button aria-pressed="false" aria-label="Align right">R</button>
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
